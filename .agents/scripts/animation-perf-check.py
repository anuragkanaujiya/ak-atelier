#!/usr/bin/env python3
"""
Animation, 3D & Scrollytelling Performance Hook Linter
Scans edited files for common performance anti-patterns.
"""
import sys, json, os, re

def main():
    try:
        input_data = json.load(sys.stdin)
    except Exception:
        print(json.dumps({"decision": "allow"}))
        return

    tool_call = input_data.get("toolCall", {})
    tool_name = tool_call.get("name", "")
    args = tool_call.get("args", {})
    file_path = args.get("Path") or args.get("path")

    if not file_path or not os.path.exists(file_path):
        print(json.dumps({"decision": "allow"}))
        return

    # Only inspect JS, TS, JSX, TSX, CSS files
    if not re.search(r'\.(tsx?|jsx?|css|html)$', file_path):
        print(json.dumps({"decision": "allow"}))
        return

    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
    except Exception:
        print(json.dumps({"decision": "allow"}))
        return

    warnings = []

    # 1. Check for scroll-behavior: smooth with GSAP / ScrollTrigger
    if ("ScrollTrigger" in content or "gsap" in content or "lenis" in content) and "scroll-behavior: smooth" in content:
        warnings.append("[PERF WARNING] Found 'scroll-behavior: smooth' alongside GSAP/Lenis. Remove it from CSS to prevent stutter and trigger misalignment.")

    # 2. Check for useState inside mousemove or scroll
    if ("addEventListener('mousemove'" in content or 'addEventListener("mousemove"' in content or
        "addEventListener('scroll'" in content or 'addEventListener("scroll"' in content) and "setState" in content:
        warnings.append("[PERF WARNING] Calling React setState inside scroll/mousemove causes 60-120 re-renders/sec. Use useRef, gsap.quickTo, or Motion useMotionValue instead.")

    # 3. Check for uncapped devicePixelRatio in WebGL/Three.js
    if "setPixelRatio(window.devicePixelRatio)" in content and "Math.min" not in content:
        warnings.append("[PERF WARNING] Uncapped 'setPixelRatio(window.devicePixelRatio)' causes GPU melting on 3x/4x Retina screens. Cap with Math.min(window.devicePixelRatio, 1.5).")

    # 4. Check for independent RAF in Lenis when GSAP is imported
    if "lenis" in content and "gsap" in content and "requestAnimationFrame" in content and "ticker.add" not in content:
        warnings.append("[PERF TIP] Drive Lenis via GSAP master ticker: 'gsap.ticker.add((time) => lenis.raf(time * 1000))' to prevent frame desync.")

    # 5. Check for useState inside canvas image sequence tick / draw loops
    if ("drawImage" in content or "canvas" in content) and ("setActiveFrameIndex" in content or "setFrameIndex" in content or "setActiveFrame" in content):
        warnings.append("[PERF WARNING] Found React state setter (e.g. setActiveFrameIndex) inside a canvas frame loop. This re-renders React 60x/sec! Mutate a DOM ref (.textContent) directly.")

    # 6. Check for canvas getContext('2d') without alpha: false on full-screen cover animations
    if "getContext('2d')" in content and "alpha" not in content and ("Sequence" in file_path or "Canvas" in file_path or "Frame" in file_path):
        warnings.append("[PERF TIP] Add '{ alpha: false }' to canvas.getContext('2d') for opaque frame sequences to skip GPU alpha-blending and boost FPS.")

    if warnings:
        feedback = "\n".join(warnings)
        print(json.dumps({
            "decision": "allow",
            "message": feedback
        }))
    else:
        print(json.dumps({"decision": "allow"}))

if __name__ == "__main__":
    main()
