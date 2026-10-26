/**
 * ==============================================================================
 * AK ATELIER — FIGJAM & FIGMA BACKEND ARCHITECTURE GENERATOR
 * ==============================================================================
 * Run this directly in FigJam (or Figma):
 * 1. Open FigJam (or Figma) -> Open Console (Plugins > Development > Open Console)
 * 2. Paste this entire code and press ENTER.
 * 3. It will automatically construct the complete Backend Architecture diagram,
 *    connected with native FigJam connectors, color-coded tiers, and metadata.
 * ==============================================================================
 */

(async function () {
  console.log("Starting AK Atelier Backend Architecture Generation in FigJam...");

  // 1. Load Fonts
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  // 2. Color Palette
  const C = {
    gold: { r: 0.87, g: 0.75, b: 0.50 },       // #DFBE7F
    goldLight: { r: 0.95, g: 0.88, b: 0.72 },  // #F3E0B8
    onyx: { r: 0.08, g: 0.07, b: 0.09 },        // #141217
    slateDark: { r: 0.12, g: 0.15, b: 0.20 },   // #1F2633
    slateCard: { r: 0.16, g: 0.20, b: 0.27 },   // #293345
    emerald: { r: 0.06, g: 0.40, b: 0.28 },     // #0F6647
    wine: { r: 0.45, g: 0.11, b: 0.18 },        // #731C2E
    purple: { r: 0.35, g: 0.18, b: 0.55 },      // #592E8C
    blue: { r: 0.12, g: 0.38, b: 0.65 },        // #1F61A6
    white: { r: 1.0, g: 1.0, b: 1.0 },
    textMuted: { r: 0.75, g: 0.78, b: 0.85 }
  };

  // Helper to detect if running in FigJam
  const isFigJam = figma.editorType === 'figjam';

  // Created Nodes map for connectors
  const nodes = {};

  // Helper: Create FigJam Shape / Box
  function createCard(id, title, subtitle, details, x, y, w, h, bgColor, strokeColor) {
    if (isFigJam && typeof figma.createShapeWithText === 'function') {
      const shape = figma.createShapeWithText();
      shape.shapeType = 'ROUNDED_RECTANGLE';
      shape.x = x;
      shape.y = y;
      shape.resize(w, h);
      shape.cornerRadius = 14;
      shape.fills = [{ type: 'SOLID', color: bgColor }];
      shape.strokes = [{ type: 'SOLID', color: strokeColor }];
      shape.strokeWeight = 2;
      
      const fullText = `${title}\n${subtitle ? subtitle + '\n' : ''}${details ? '\n' + details : ''}`;
      shape.text.characters = fullText;
      
      // Styling text inside shape
      shape.text.fontName = { family: "Inter", style: "Bold" };
      shape.text.fills = [{ type: 'SOLID', color: C.white }];
      
      nodes[id] = shape;
      return shape;
    } else {
      // Fallback for standard Figma Canvas
      const frame = figma.createFrame();
      frame.name = title;
      frame.x = x;
      frame.y = y;
      frame.resize(w, h);
      frame.cornerRadius = 14;
      frame.fills = [{ type: 'SOLID', color: bgColor }];
      frame.strokes = [{ type: 'SOLID', color: strokeColor }];
      frame.strokeWeight = 2;
      frame.layoutMode = 'VERTICAL';
      frame.paddingTop = 14;
      frame.paddingBottom = 14;
      frame.paddingLeft = 16;
      frame.paddingRight = 16;
      frame.itemSpacing = 6;

      const titleNode = figma.createText();
      titleNode.fontName = { family: "Inter", style: "Bold" };
      titleNode.fontSize = 14;
      titleNode.characters = title;
      titleNode.fills = [{ type: 'SOLID', color: C.white }];
      frame.appendChild(titleNode);

      if (subtitle) {
        const subNode = figma.createText();
        subNode.fontName = { family: "Inter", style: "Medium" };
        subNode.fontSize = 11;
        subNode.characters = subtitle;
        subNode.fills = [{ type: 'SOLID', color: C.gold }];
        frame.appendChild(subNode);
      }

      if (details) {
        const detNode = figma.createText();
        detNode.fontName = { family: "Inter", style: "Regular" };
        detNode.fontSize = 10;
        detNode.characters = details;
        detNode.fills = [{ type: 'SOLID', color: C.textMuted }];
        frame.appendChild(detNode);
      }

      nodes[id] = frame;
      return frame;
    }
  }

  // Helper: Create Section Header
  function createSectionBanner(title, x, y, w) {
    if (isFigJam && typeof figma.createSection === 'function') {
      const section = figma.createSection();
      section.x = x;
      section.y = y;
      section.name = title;
      section.resizeWithoutConstraints(w, 420);
      return section;
    } else {
      const banner = figma.createFrame();
      banner.name = `Section: ${title}`;
      banner.x = x;
      banner.y = y - 44;
      banner.resize(w, 36);
      banner.fills = [{ type: 'SOLID', color: C.onyx }];
      banner.cornerRadius = 8;
      banner.strokes = [{ type: 'SOLID', color: C.gold }];
      banner.strokeWeight = 1;

      const txt = figma.createText();
      txt.fontName = { family: "Inter", style: "Bold" };
      txt.fontSize = 12;
      txt.characters = `❖  ${title.toUpperCase()}`;
      txt.fills = [{ type: 'SOLID', color: C.goldLight }];
      txt.x = 14;
      txt.y = 10;
      banner.appendChild(txt);
      return banner;
    }
  }

  // Helper: Connect two nodes in FigJam
  function connect(startId, endId, startMagnet = 'BOTTOM', endMagnet = 'TOP', strokeColor = C.gold) {
    if (!isFigJam || typeof figma.createConnector !== 'function') return;
    const startNode = nodes[startId];
    const endNode = nodes[endId];
    if (!startNode || !endNode) return;

    const conn = figma.createConnector();
    conn.connectorStart = { endpointNodeId: startNode.id, magnet: startMagnet };
    conn.connectorEnd = { endpointNodeId: endNode.id, magnet: endMagnet };
    conn.strokes = [{ type: 'SOLID', color: strokeColor }];
    conn.strokeWeight = 2;
    conn.connectorLineType = 'ELBOWED';
  }

  // ============================================================================
  // TIER 1: CLIENT & EDGE PRESENTATION (Y: 100)
  // ============================================================================
  createSectionBanner("Tier 1: Client & Next.js 16 Edge Layer", 100, 40, 1500);

  createCard(
    "client_ui",
    "Client Browser / Mobile PWA",
    "Next.js 16 App Router · React 19",
    "• Apple-style Canvas Scroller (120 WebP frames)\n• Lenis Smooth Momentum Scroll (120 FPS)\n• GSAP useGSAP Scoped Micro-Parallax\n• Cart & Wishlist Optimistic Contexts",
    150, 100, 340, 150,
    C.slateCard, C.gold
  );

  createCard(
    "edge_gateway",
    "Next.js Edge Middleware",
    "Vercel Edge / Cloudflare Workers",
    "• Geo-IP Detection (INR / USD / EUR)\n• JWT Client Session Verification\n• Upstash Sliding-Window Rate Limiting\n• Bot Protection & CSRF Validation",
    570, 100, 340, 150,
    C.slateCard, C.gold
  );

  createCard(
    "cdn_pipeline",
    "Global Media CDN Pipeline",
    "AWS S3 + CloudFront Edge Cache",
    "• 120 WebP Boutique Hero Frames (Lanczos scaled)\n• 4K Editorial Zoom & Fabric Drapes (Unsplash CDN)\n• 3D GLTF/GLB Mannequin Models\n• Edge Image Optimization & AVIF Fallbacks",
    990, 100, 360, 150,
    C.slateCard, C.gold
  );

  // ============================================================================
  // TIER 2: API ROUTING & MICROSERVICES (Y: 340)
  // ============================================================================
  createSectionBanner("Tier 2: Backend RESTful API Microservices (/api/v1)", 100, 280, 1500);

  createCard(
    "api_products",
    "Catalog & Product Engine",
    "GET /api/v1/products",
    "• Unified Product Architecture (Rule 7)\n• Category & Mood Filtering (Kanjivaram, Banarasi)\n• Full-text Search & Dynamic Price Faceting\n• Area-Specific sectionMetadata reflections",
    150, 340, 340, 160,
    C.slateCard, C.emerald
  );

  createCard(
    "api_atelier",
    "VIP Atelier & Salon Concierge",
    "POST /api/v1/atelier/book-appointment",
    "• Bespoke Bridal Trousseau Bookings\n• Salon Slot Allocation (New Delhi, Mumbai, Paris)\n• Verified Client Diaries & Royal Commissions\n• 24K Gold Zari Karigari Credentials",
    570, 340, 340, 160,
    C.wine, C.gold
  );

  createCard(
    "api_orders",
    "Order & Checkout Engine",
    "POST /api/v1/orders/checkout",
    "• Multi-step Bridal & Occasionwear Checkout\n• Razorpay / Stripe Payment Webhook Listeners\n• Inventory Lock & Stock Decrement\n• Automated Order Confirmation Dispatches",
    990, 340, 360, 160,
    C.blue, C.white
  );

  // ============================================================================
  // TIER 3: DATA PERSISTENCE & PRISMA ORM (Y: 580)
  // ============================================================================
  createSectionBanner("Tier 3: PostgreSQL Database Models (Prisma ORM)", 100, 520, 1500);

  createCard(
    "db_catalog",
    "Model: Product & ProductVariant",
    "PostgreSQL Relational Catalog",
    "• id, slug, name, tagline, description\n• price (Decimal), originalPrice, fabric, embroidery\n• sectionMetadata (campaignTag, audioTrack, features)\n• variants (colorHex, size: 34-42, stockCount)",
    150, 580, 340, 170,
    C.slateDark, C.emerald
  );

  createCard(
    "db_atelier",
    "Model: AtelierBooking & ClientDiary",
    "PostgreSQL High-Touch Salon Schema",
    "• bookingReference (MNR-YYYYMM-XXXX)\n• clientName, email, phone, locationSlug\n• experienceType: BRIDAL_TROUSSEAU\n• craftTechnique, verifiedWeddingDate, quote",
    570, 580, 340, 170,
    C.wine, C.gold
  );

  createCard(
    "db_orders",
    "Model: Order, OrderItem & User",
    "PostgreSQL Transactional Ledger",
    "• orderNumber, status: CONFIRMED / IN_ATELIER\n• paymentProvider: RAZORPAY / STRIPE\n• items (productId, variantId, qty, priceSnapshot)\n• shippingAddress, trackingId, deliveryDays",
    990, 580, 360, 170,
    C.blue, C.white
  );

  // ============================================================================
  // TIER 4: CACHING & EXTERNAL INTEGRATIONS (Y: 830)
  // ============================================================================
  createSectionBanner("Tier 4: Distributed Cache & External VIP Gateways", 100, 770, 1500);

  createCard(
    "cache_layer",
    "Redis / Upstash Cache Layer",
    "In-Memory Sub-millisecond Store",
    "• SWR & ISR Cache for Catalog Drops (3600s TTL)\n• Persistent Anonymous Cart & Bag State\n• Session & Idempotency Key Tracking\n• Real-Time Best Sellers Velocity Counters",
    150, 830, 340, 150,
    C.purple, C.white
  );

  createCard(
    "ext_crm",
    "VIP CRM & Concierge Sync",
    "Salesforce / Chatverce / HubSpot",
    "• Automatic Lead Creation from Atelier Bookings\n• VIP Bridal Stylist Assignment Notification\n• Private Trunk Show Invitation Dispatch\n• Client Diary Review & Approval Workflow",
    570, 830, 340, 150,
    C.slateCard, C.gold
  );

  createCard(
    "ext_payments",
    "Payments & Notifications",
    "Razorpay · Stripe · WhatsApp API",
    "• 3D Secure 2.0 Payment Authentication\n• Webhook Signature Verification\n• WhatsApp Automated Fitting Reminders\n• PDF Invoice & Karigari Provenance Certificate",
    990, 830, 360, 150,
    C.slateCard, C.white
  );

  // ============================================================================
  // FIGJAM CONNECTORS (Inter-tier Architecture Flow)
  // ============================================================================
  if (isFigJam) {
    // Client to Edge & CDN
    connect("client_ui", "edge_gateway", "RIGHT", "LEFT");
    connect("client_ui", "cdn_pipeline", "BOTTOM", "TOP");

    // Edge to APIs
    connect("edge_gateway", "api_products", "BOTTOM", "TOP");
    connect("edge_gateway", "api_atelier", "BOTTOM", "TOP");
    connect("edge_gateway", "api_orders", "BOTTOM", "TOP");

    // APIs to Database
    connect("api_products", "db_catalog", "BOTTOM", "TOP");
    connect("api_atelier", "db_atelier", "BOTTOM", "TOP");
    connect("api_orders", "db_orders", "BOTTOM", "TOP");

    // Databases & APIs to Cache & External
    connect("api_products", "cache_layer", "BOTTOM", "TOP");
    connect("api_atelier", "ext_crm", "BOTTOM", "TOP");
    connect("api_orders", "ext_payments", "BOTTOM", "TOP");
  }

  // 3. Zoom into view
  const allNodes = Object.values(nodes);
  if (allNodes.length > 0) {
    figma.viewport.scrollAndZoomIntoView(allNodes);
  }

  console.log("✅ AK Atelier Backend Architecture Generated Successfully in FigJam!");
})();
