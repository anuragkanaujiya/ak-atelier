---
name: scrollytelling-canvas-sequence
description: >-
  Authoritative guide and production architecture for building buttery-smooth,
  Retina HD Apple-style scrollytelling canvas image sequences and video frame scrubbing.
  Covers high-fidelity WebP/AVIF asset pipelines with FFmpeg, off-thread GPU decoding
  via createImageBitmap, Retina backing-store scaling, skip-sampling preloading,
  mobile VRAM budget protection, and GSAP ScrollTrigger scrub synchronization with zero React re-renders.
  Invoke whenever creating, auditing, or fixing scroll-bound canvas frame animations or video scrubbers.
---

# Scrollytelling Canvas Sequence & Frame Scrubbing Architecture

The definitive engineering standard for creating Apple AirPods Pro / Mac Pro-style scroll-driven frame sequences with pin-sharp Retina HD visual quality, instant interactivity, and 60–120 FPS performance across desktop and mobile.

---

## 1. Why Video Elements (`<video>`) Fail for Scrubbing

Standard video codecs (H.264, VP9) use **temporal inter-frame compression**. They store full frames (**I-frames / Keyframes**) only once every 2–3 seconds (every 60–90 frames), and only record pixel deltas (**P-frames and B-frames**) in between.

* **The Scrubbing Freeze:** Scrubbing with `video.currentTime` forces the browser to jump back to the nearest keyframe and decode all intermediate frames on the fly. On iOS Safari and Android, seeking is throttled and asynchronous, causing severe stutter and dropped frames.
* **The Solution:** An **Image Sequence on HTML5 `<canvas>`** offers deterministic, frame-exact, zero-latency painting.

---

## 2. The 5 Golden Rules of Smooth Canvas Sequences

| Rule | Problem Prevented | Solution |
| :--- | :--- | :--- |
| **1. No React State in RAF/Scrub** | Eliminates 60–120 Virtual DOM re-renders/sec | Mutate DOM text nodes directly using `.textContent` via `useRef`. |
| **2. Decode Off Main Thread** | Prevents synchronous CPU decoding freezes | Use `createImageBitmap(blob)` instead of `new Image()`. |
| **3. Skip-Sampling Preloader** | Eliminates long initial loading screens | Load Frame 0 $\rightarrow$ load every 4th frame $\rightarrow$ background stream the rest. |
| **4. Retina Backing Store Scaling** | Eliminates blurry/muddy pixels on High-DPI screens | Scale canvas buffer by `Math.min(window.devicePixelRatio, 2)` and call `ctx.scale(dpr, dpr)`. |
| **5. Subpixel Snapping** | Eliminates fractional pixel anti-aliasing blur | Wrap all drawing coordinates (`offsetX`, `offsetY`, `renderW`, `renderH`) in `Math.round()`. |

---

## 3. High-Definition Asset Pipeline (FFmpeg)

Never export raw JPEGs or uncompressed PNGs. A sequence of 150 JPEGs is ~12 MB, while WebP is ~3 MB with identical visual fidelity.

To prevent compression from softening fine edges (text, metallic reflections, glass), apply an **unsharp mask** and **Lanczos scaling** during export:

```bash
ffmpeg -i source_video.mp4 \
  -vf "scale=1920:-1:flags=lanczos,unsharp=5:5:0.8:5:5:0.0" \
  -vcodec libwebp \
  -quality 82 \
  -sharp_yuv 1 \
  -compression_level 4 \
  public/frames/frame_%03d.webp
```

* **`-flags=lanczos`**: High-precision resampling filter.
* **`unsharp=5:5:0.8...`**: Restores micro-contrast and crisp edges.
* **`-sharp_yuv 1`**: Prevents color-edge bleeding in YUV420 color conversion.
* **`-quality 82`**: Perceptually lossless sweet spot (~20–25 KB per 1080p frame).

---

## 4. Canvas Retina HD Setup & P3 Wide Gamut

```javascript
function setupCanvas(canvas) {
  // Cap at 2.0 to maintain crispness without wasting VRAM on 3x/4x screens
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;

  // 1. Backing-store buffer (physical pixels)
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);

  // 2. CSS display size (logical pixels)
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // 3. High-performance context with Display P3 wide gamut
  const ctx = canvas.getContext('2d', {
    alpha: false, // ⚡ Bypasses compositor alpha blending (15-25% faster)
    colorSpace: 'display-p3', // ⚡ Richer, luxury Retina colors
  });

  // 4. Align coordinate space with logical CSS pixels
  ctx.scale(dpr, dpr);

  // 5. High-grade bicubic resampling
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  return { ctx, dpr, width, height };
}
```

---

## 5. Pixel-Perfect Object-Fit (Cover) Math

Avoid fractional coordinates that cause subpixel anti-aliasing blur:

```javascript
function renderCoverFrame(ctx, frame, canvasWidth, canvasHeight) {
  const imgW = frame.width;
  const imgH = frame.height;

  const hRatio = canvasWidth / imgW;
  const vRatio = canvasHeight / imgH;
  const ratio = Math.max(hRatio, vRatio);

  const renderW = Math.round(imgW * ratio);
  const renderH = Math.round(imgH * ratio);
  const offsetX = Math.round((canvasWidth - renderW) / 2);
  const offsetY = Math.round((canvasHeight - renderH) / 2);

  ctx.drawImage(frame, offsetX, offsetY, renderW, renderH);
}
```

---

## 6. Staged Skip-Sampling Preloader

Never force the user to wait for 150 frames. Use a 3-tier progressive waterfall:

```javascript
async function loadSingleBitmap(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  return await createImageBitmap(blob); // ⚡ GPU background thread decode
}

export function startProgressiveLoad(framePaths, onFirstFrame, onReadyToScroll) {
  const total = framePaths.length;
  const framesCache = new Array(total).fill(null);

  // Stage 1: Load Frame 0 (First Paint in <100ms)
  loadSingleBitmap(framePaths[0]).then((firstBitmap) => {
    framesCache[0] = firstBitmap;
    onFirstFrame(firstBitmap);

    // Stage 2: Load every 4th frame (Frames 0, 4, 8, 12... = only 25% of data)
    const keyframeIndices = [];
    for (let i = 4; i < total; i += 4) keyframeIndices.push(i);

    Promise.all(
      keyframeIndices.map(async (idx) => {
        framesCache[idx] = await loadSingleBitmap(framePaths[idx]);
      })
    ).then(() => {
      // ⚡ Enable scrolling immediately!
      onReadyToScroll(framesCache);

      // Stage 3: Background stream remaining frames during idle time
      let remainingIdx = 1;
      const streamNext = () => {
        while (remainingIdx < total && framesCache[remainingIdx] !== null) {
          remainingIdx++;
        }
        if (remainingIdx >= total) return;

        const current = remainingIdx++;
        loadSingleBitmap(framePaths[current]).then((bitmap) => {
          framesCache[current] = bitmap;
          if ('requestIdleCallback' in window) {
            requestIdleCallback(streamNext, { timeout: 300 });
          } else {
            setTimeout(streamNext, 50);
          }
        });
      };

      streamNext();
    });
  });

  return framesCache;
}
```

---

## 7. Nearest-Loaded Frame Fallback Helper

If the user scrolls before in-between frames have downloaded, display the closest loaded keyframe so there are **zero blank frames**:

```javascript
function getNearestFrame(frames, targetIdx) {
  if (frames[targetIdx]) return frames[targetIdx];

  // Scan backwards
  for (let i = targetIdx - 1; i >= 0; i--) {
    if (frames[i]) return frames[i];
  }
  // Scan forwards
  for (let i = targetIdx + 1; i < frames.length; i++) {
    if (frames[i]) return frames[i];
  }
  return null;
}
```

---

## 8. GSAP ScrollTrigger Scrubbing (Zero-Rerender Pattern)

```javascript
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const playhead = { frame: 0 };

gsap.to(playhead, {
  frame: totalFrames - 1,
  ease: "none",
  scrollTrigger: {
    trigger: containerRef.current,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.5, // ⚡ 0.5s smooth inertial scrub
    onUpdate: () => {
      const idx = Math.round(playhead.frame);
      const frame = getNearestFrame(framesCache, idx);
      if (frame) {
        renderCoverFrame(ctx, frame, window.innerWidth, window.innerHeight);
      }

      // ⚡ Direct DOM text update without triggering React render cycles:
      if (hudRef.current) {
        hudRef.current.textContent = `FRAME ${idx + 1} / ${totalFrames}`;
      }
    },
  },
});
```

---

## 9. Mobile VRAM Protection

* **1080p Image Uncompressed in VRAM:** $1920 \times 1080 \times 4\text{ bytes} \approx 8.3\text{ MB}$.
* **150 Frames in VRAM:** $\sim 1.25\text{ GB}$ (can crash Mobile Safari).
* **Mobile Guard Rule:**
  ```javascript
  const isMobile = window.innerWidth < 768;

  // On mobile: Sample every 2nd frame (halves memory)
  const activeFramePaths = isMobile
    ? allPaths.filter((_, i) => i % 2 === 0)
    : allPaths;
  ```

---

## 10. Pre-Flight Audit Checklist

- [ ] Assets are **WebP or AVIF** exported with unsharp mask and Lanczos scaling.
- [ ] Canvas is created with `{ alpha: false, colorSpace: 'display-p3' }`.
- [ ] Backing-store buffer is scaled by `Math.min(devicePixelRatio, 2)`.
- [ ] Drawing coordinates are rounded with `Math.round()` to prevent subpixel blur.
- [ ] Frames are decoded off-thread with `createImageBitmap()`.
- [ ] HUD counters and overlays update via `ref.current.textContent` (NO `useState`).
- [ ] Scrubbing is driven by GSAP ScrollTrigger with `scrub: 0.5` or `1`.
- [ ] Frames are halved on mobile devices (`innerWidth < 768px`).
