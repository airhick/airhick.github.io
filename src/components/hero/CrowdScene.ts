import * as THREE from "three";

/* ════════════════════════════════════════════════════════════════
   La foule du hero : de petits robots en pâte à modeler, ombrage
   « toon » à trois tons, contour encre (inverted hull), ombres douces.
   Tout est instancié : ~20 draw calls, quelle que soit la foule.
   ════════════════════════════════════════════════════════════════ */

export const MAX_BOTS = 72;

const INK = new THREE.Color("#14140f");
const WHITE = new THREE.Color("#ffffff");
const YELLOW = new THREE.Color("#f8e08a");

const LINES = {
  idle: [
    "200 ok",
    "captcha détecté",
    "j'ai trouvé un endpoint",
    "scraping…",
    "déployé",
    "404",
    "build ok",
    "416 000 prix",
    "export markdown",
    "genève",
    "retry",
    "ok",
    "données à jour",
    "async",
    "tests ok",
    "re-crawl ?",
    "cloudflare…",
    "sitemap.xml",
    "et voilà",
    "pipeline ok",
    "job terminé",
    "git push",
    "200 ok",
  ],
  noticed: ["bonjour", "nouvelle session", "visiteur détecté", "requête entrante", "bienvenue"],
  jump: ["job relancé", "go", "retry", "on relance", "exécution"],
  overload: ["429", "trop de requêtes", "latence élevée", "rate limit", "file saturée", "timeout"],
};

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const damp = (a: number, b: number, k: number, dt: number) => a + (b - a) * (1 - Math.exp(-k * dt));
const angleDelta = (a: number, b: number) => {
  let d = (b - a) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
};

interface Bot {
  x: number;
  z: number;
  heading: number;
  target: number;
  speed: number;
  baseSpeed: number;
  phase: number;
  gait: number;
  state: "walk" | "idle" | "enter" | "leave";
  timer: number;
  s: number;
  hat: boolean;
  vest: boolean;
  box: boolean;
  notice: number;
  noticed: boolean;
  lastNoticed: number;
  jumpT: number;
  headYaw: number;
  headTilt: number;
  dead: boolean;
  ndcX: number;
  ndcY: number;
  talking: boolean;
}

interface Bubble {
  el: HTMLDivElement;
  bot: Bot | null;
  until: number;
  half: number;
}

interface Part {
  fill: THREE.InstancedMesh;
  line?: THREE.InstancedMesh;
  tint: boolean;
}

export interface CrowdOptions {
  container: HTMLElement;
  bubbles: HTMLElement;
  events: HTMLElement;
  count: number;
  limit: number;
  reducedMotion: boolean;
  /* zones (ex. le panneau de contrôle) où les bulles ne doivent pas apparaître */
  avoid?: () => (HTMLElement | null)[];
  onReady?: () => void;
}

/* profil « haricot » du corps, tourné autour de Y */
function beanProfile(grow = 0) {
  const pts = [
    [0.0, 0.25],
    [0.15, 0.255],
    [0.225, 0.33],
    [0.252, 0.46],
    [0.25, 0.6],
    [0.232, 0.74],
    [0.19, 0.87],
    [0.11, 0.955],
    [0.0, 0.985],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  const curve = new THREE.SplineCurve(pts);
  return curve.getPoints(28).map((p, i, arr) => {
    const t = i / (arr.length - 1);
    const r = p.x > 0.001 ? p.x + grow : 0;
    const y = p.y + (t < 0.08 ? -grow : t > 0.92 ? grow : 0);
    return new THREE.Vector2(Math.max(0, r), y);
  });
}

function vestProfile() {
  const pts: THREE.Vector2[] = [];
  const prof = beanProfile(0.006);
  for (const p of prof) if (p.y > 0.47 && p.y < 0.79) pts.push(p);
  return pts;
}

export class CrowdScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private bots: Bot[] = [];
  private parts: Record<string, Part> = {};
  private shadows!: THREE.InstancedMesh;
  private contacts!: THREE.InstancedMesh;
  private ripples: { mesh: THREE.Mesh; t: number }[] = [];
  private bubbles: Bubble[] = [];
  private disposables: { dispose: () => void }[] = [];
  private raf = 0;
  private last = 0;
  private clock = 0;
  private nextTalk = 1.2;
  private active = true;
  private targetCount: number;
  private limit: number;
  private reduced: boolean;
  private pointer = new THREE.Vector2(9, 9);
  private pointerWorld: THREE.Vector3 | null = null;
  private pointerInside = false;
  private raycaster = new THREE.Raycaster();
  private planeMid = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.6);
  private planeGround = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private w = 1;
  private h = 1;
  private opts: CrowdOptions;
  private ro: ResizeObserver;

  /* matrices de travail */
  private mRoot = new THREE.Matrix4();
  private mBody = new THREE.Matrix4();
  private mHead = new THREE.Matrix4();
  private mTmp = new THREE.Matrix4();
  private mOut = new THREE.Matrix4();
  private mStem = new THREE.Matrix4();
  private q = new THREE.Quaternion();
  private e = new THREE.Euler();
  private v = new THREE.Vector3();
  private sc = new THREE.Vector3();
  private col = new THREE.Color();

  constructor(opts: CrowdOptions) {
    this.opts = opts;
    this.targetCount = opts.count;
    this.limit = opts.limit;
    this.reduced = opts.reducedMotion;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.setClearColor(0x000000, 0);
    opts.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(26, 1, 0.1, 200);
    const dist = 27;
    const elev = THREE.MathUtils.degToRad(53);
    this.camera.position.set(0, Math.sin(elev) * dist, Math.cos(elev) * dist);
    this.camera.lookAt(0, 0, 0.6);

    this.buildLights();
    this.buildParts();
    this.resize();

    for (let i = 0; i < this.targetCount; i++) this.bots.push(this.spawn(false));

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(opts.container);
    opts.events.addEventListener("pointermove", this.onMove);
    opts.events.addEventListener("pointerleave", this.onLeave);
    opts.events.addEventListener("pointerdown", this.onDown);
    document.addEventListener("visibilitychange", this.onVisibility);

    this.buildBubbles();
    this.renderFrame(0.016);
    opts.onReady?.();
    this.last = performance.now();
    if (!this.reduced) this.raf = requestAnimationFrame(this.tick);
  }

  /* ── construction ─────────────────────────────────────────── */

  private buildLights() {
    const amb = new THREE.AmbientLight(0xffffff, 1.25);
    const dir = new THREE.DirectionalLight(0xffffff, 2.05);
    dir.position.set(-5, 9, 6);
    this.scene.add(amb, dir);
  }

  private track<T extends { dispose: () => void }>(x: T) {
    this.disposables.push(x);
    return x;
  }

  private buildParts() {
    const grad = this.track(new THREE.DataTexture(new Uint8Array([84, 84, 84, 255, 176, 176, 176, 255, 255, 255, 255, 255]), 3, 1));
    grad.minFilter = THREE.NearestFilter;
    grad.magFilter = THREE.NearestFilter;
    grad.generateMipmaps = false;
    grad.needsUpdate = true;

    const toon = this.track(new THREE.MeshToonMaterial({ color: 0xffffff, gradientMap: grad }));
    const ink = this.track(new THREE.MeshBasicMaterial({ color: INK }));
    const line = this.track(new THREE.MeshBasicMaterial({ color: INK, side: THREE.BackSide }));

    const T = 0.03; // épaisseur du trait
    const mk = (name: string, geo: THREE.BufferGeometry, lineGeo: THREE.BufferGeometry | null, mat: THREE.Material, tint: boolean) => {
      this.track(geo);
      const fill = new THREE.InstancedMesh(geo, mat, MAX_BOTS * (name === "eye" || name === "leg" || name === "arm" ? 2 : 1));
      fill.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      fill.frustumCulled = false;
      if (tint) {
        for (let i = 0; i < fill.count; i++) fill.setColorAt(i, WHITE);
      }
      this.scene.add(fill);
      let lm: THREE.InstancedMesh | undefined;
      if (lineGeo) {
        this.track(lineGeo);
        lm = new THREE.InstancedMesh(lineGeo, line, MAX_BOTS * 2);
        lm.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        lm.frustumCulled = false;
        lm.renderOrder = -1;
        this.scene.add(lm);
      }
      this.parts[name] = { fill, line: lm, tint };
    };

    mk("body", new THREE.LatheGeometry(beanProfile(0), 28), new THREE.LatheGeometry(beanProfile(T), 20), toon, true);
    mk("vest", new THREE.LatheGeometry(vestProfile(), 28), null, ink, false);
    mk("head", new THREE.SphereGeometry(0.2, 26, 18), new THREE.SphereGeometry(0.2 + T, 18, 12), toon, true);
    mk("leg", new THREE.CapsuleGeometry(0.078, 0.14, 4, 12), new THREE.CapsuleGeometry(0.078 + T * 0.85, 0.14, 3, 8), toon, true);
    mk("arm", new THREE.CapsuleGeometry(0.062, 0.15, 4, 10), new THREE.CapsuleGeometry(0.062 + T * 0.8, 0.15, 3, 8), toon, true);
    mk("stem", new THREE.CylinderGeometry(0.016, 0.016, 0.17, 6), new THREE.CylinderGeometry(0.016 + 0.016, 0.016 + 0.016, 0.17, 6), toon, true);
    mk("ball", new THREE.SphereGeometry(0.048, 12, 8), new THREE.SphereGeometry(0.048 + T * 0.8, 10, 6), toon, true);
    mk("hat", new THREE.SphereGeometry(0.214, 24, 10, 0, Math.PI * 2, 0, Math.PI * 0.44), null, ink, false);
    mk("eye", new THREE.SphereGeometry(0.027, 8, 6), null, ink, false);
    mk("box", new THREE.BoxGeometry(0.3, 0.22, 0.22), new THREE.BoxGeometry(0.3 + T * 2, 0.22 + T * 2, 0.22 + T * 2), toon, false);

    // ombres portées : ovales doux, décalés à l'opposé de la lumière
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const rg = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    rg.addColorStop(0, "rgba(255,255,255,1)");
    rg.addColorStop(0.45, "rgba(255,255,255,0.65)");
    rg.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = rg;
    g.fillRect(0, 0, 128, 128);
    const tex = this.track(new THREE.CanvasTexture(c));
    tex.colorSpace = THREE.SRGBColorSpace;
    const plane = this.track(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2));
    const shMat = this.track(new THREE.MeshBasicMaterial({ color: INK, map: tex, transparent: true, opacity: 0.13, depthWrite: false }));
    const ctMat = this.track(new THREE.MeshBasicMaterial({ color: INK, map: tex, transparent: true, opacity: 0.2, depthWrite: false }));
    this.shadows = new THREE.InstancedMesh(plane, shMat, MAX_BOTS);
    this.contacts = new THREE.InstancedMesh(plane, ctMat, MAX_BOTS);
    for (const m of [this.shadows, this.contacts]) {
      m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      m.frustumCulled = false;
      m.renderOrder = -2;
      this.scene.add(m);
    }
  }

  private buildBubbles() {
    for (let i = 0; i < 7; i++) {
      const el = document.createElement("div");
      el.className = "bubble";
      el.setAttribute("aria-hidden", "true");
      this.opts.bubbles.appendChild(el);
      this.bubbles.push({ el, bot: null, until: 0, half: 0 });
    }
  }

  /* ── foule ────────────────────────────────────────────────── */

  private groundAt(nx: number, ny: number, out = new THREE.Vector3()) {
    this.raycaster.setFromCamera(new THREE.Vector2(nx, ny), this.camera);
    return this.raycaster.ray.intersectPlane(this.planeGround, out);
  }

  private spawn(fromEdge: boolean): Bot {
    let nx = rand(-0.98, 0.98);
    let ny = rand(-0.95, 0.9);
    if (fromEdge) {
      const side = Math.random() < 0.5 ? -1 : 1;
      nx = side * 1.18;
      ny = rand(-0.7, 0.75);
    }
    const p = this.groundAt(nx, ny) ?? new THREE.Vector3(rand(-6, 6), 0, rand(-4, 4));
    const toCenter = Math.atan2(-p.x, -p.z);
    const base = rand(0.5, 0.82);
    return {
      x: p.x,
      z: p.z,
      heading: fromEdge ? toCenter : rand(0, Math.PI * 2),
      target: fromEdge ? toCenter + rand(-0.4, 0.4) : rand(0, Math.PI * 2),
      speed: 0,
      baseSpeed: base,
      phase: rand(0, 10),
      gait: 0,
      state: fromEdge ? "enter" : Math.random() < 0.3 ? "idle" : "walk",
      timer: rand(0.5, 4),
      s: rand(0.9, 1.08),
      hat: Math.random() < 0.26,
      vest: Math.random() < 0.3,
      box: Math.random() < 0.12,
      notice: 0,
      noticed: false,
      lastNoticed: -10,
      jumpT: -1,
      headYaw: 0,
      headTilt: 0,
      dead: false,
      ndcX: 0,
      ndcY: 0,
      talking: false,
    };
  }

  setCount(n: number) {
    n = Math.max(0, Math.min(MAX_BOTS, n));
    this.targetCount = n;
    const alive = this.bots.filter((b) => b.state !== "leave");
    if (alive.length < n) {
      for (let i = alive.length; i < n; i++) this.bots.push(this.spawn(true));
    } else if (alive.length > n) {
      const byEdge = [...alive].sort((a, b) => Math.abs(b.ndcX) - Math.abs(a.ndcX));
      for (let i = 0; i < alive.length - n; i++) {
        const b = byEdge[i];
        b.state = "leave";
        b.target = b.ndcX >= 0 ? Math.atan2(1, 0.05) : Math.atan2(-1, 0.05);
      }
    }
    if (this.reduced) this.renderFrame(0);
  }

  setActive(on: boolean) {
    if (on === this.active) return;
    this.active = on;
    if (on && !this.reduced && !document.hidden) {
      this.last = performance.now();
      cancelAnimationFrame(this.raf);
      this.raf = requestAnimationFrame(this.tick);
    } else {
      cancelAnimationFrame(this.raf);
    }
  }

  /* ── événements ───────────────────────────────────────────── */

  private toNdc(e: PointerEvent) {
    const r = this.renderer.domElement.getBoundingClientRect();
    return new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  }

  private onMove = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    this.pointer.copy(this.toNdc(e));
    this.pointerInside = true;
  };

  private onLeave = () => {
    this.pointerInside = false;
    this.pointerWorld = null;
  };

  private onDown = (e: PointerEvent) => {
    const t = e.target as HTMLElement;
    if (t.closest("a, button, .hud")) return;
    const ndc = this.toNdc(e);
    this.raycaster.setFromCamera(ndc, this.camera);
    const p = this.raycaster.ray.intersectPlane(this.planeMid, new THREE.Vector3());
    const g = this.raycaster.ray.intersectPlane(this.planeGround, new THREE.Vector3());
    if (!p || !g) return;
    this.ripple(g);
    const near = this.bots
      .filter((b) => !b.dead && Math.hypot(b.x - p.x, b.z - p.z) < 1.9)
      .sort((a, b) => Math.hypot(a.x - p.x, a.z - p.z) - Math.hypot(b.x - p.x, b.z - p.z));
    near.forEach((b, i) => {
      if (b.jumpT < 0) b.jumpT = -0.05 - i * 0.06;
      b.lastNoticed = this.clock;
    });
    if (near[0]) this.say(near[0], pick(LINES.jump), 1.4, true);
    if (this.reduced) this.renderFrame(0);
  };

  private onVisibility = () => {
    if (document.hidden) cancelAnimationFrame(this.raf);
    else if (this.active && !this.reduced) {
      this.last = performance.now();
      cancelAnimationFrame(this.raf);
      this.raf = requestAnimationFrame(this.tick);
    }
  };

  private ripple(p: THREE.Vector3) {
    if (this.reduced) return;
    const geo = new THREE.RingGeometry(0.86, 1, 48).rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({ color: INK, transparent: true, opacity: 0.55, depthWrite: false });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(p.x, 0.01, p.z);
    mesh.scale.setScalar(0.1);
    this.scene.add(mesh);
    this.ripples.push({ mesh, t: 0 });
  }

  /* ── bulles ───────────────────────────────────────────────── */

  private say(bot: Bot, text: string, dur = 2.4, force = false) {
    if (bot.talking && !force) return;
    let b = this.bubbles.find((x) => x.bot === bot);
    if (!b) b = this.bubbles.find((x) => !x.bot);
    if (!b) {
      if (!force) return;
      b = this.bubbles.reduce((a, c) => (a.until < c.until ? a : c));
      if (b.bot) b.bot.talking = false;
    }
    b.bot = bot;
    b.until = this.clock + dur;
    b.el.textContent = text;
    b.half = b.el.offsetWidth / 2;
    b.el.classList.add("is-on");
    b.el.classList.toggle("is-noticed", bot.notice > 0.5);
    bot.talking = true;
  }

  private updateBubbles() {
    const rect = { w: this.w, h: this.h };
    for (const b of this.bubbles) {
      if (!b.bot) continue;
      const bot = b.bot;
      if (this.clock > b.until || bot.dead) {
        b.el.classList.remove("is-on");
        bot.talking = false;
        b.bot = null;
        continue;
      }
      const lift = bot.jumpT > 0 ? Math.max(0, 4 * 0.6 * (bot.jumpT / 0.6) * (1 - bot.jumpT / 0.6)) : 0;
      this.v.set(bot.x, (1.62 + lift) * bot.s, bot.z).project(this.camera);
      const half = b.half || 40;
      const x = Math.round(Math.min(rect.w - half - 8, Math.max(half + 8, (this.v.x * 0.5 + 0.5) * rect.w)));
      const y = Math.round((-this.v.y * 0.5 + 0.5) * rect.h);
      b.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
      b.el.classList.toggle("is-noticed", bot.notice > 0.5);
    }
  }

  private chatter(dt: number) {
    this.nextTalk -= dt;
    if (this.nextTalk > 0) return;
    this.nextTalk = rand(0.7, 1.6);
    const candidates = this.bots.filter((b) => {
      if (b.dead || b.talking || b.state === "leave" || b.state === "enter") return false;
      if (Math.abs(b.ndcX) > 0.88 || b.ndcY > 0.8 || b.ndcY < -0.86) return false;
      const inTitle = (b.ndcX / 0.5) ** 2 + (b.ndcY / 0.62) ** 2 < 1;
      return !inTitle || Math.random() < 0.12;
    });
    if (!candidates.length) return;
    const box = this.opts.container.getBoundingClientRect();
    const zones = (this.opts.avoid?.() ?? [])
      .filter((el): el is HTMLElement => !!el && el.offsetParent !== null)
      .map((el) => el.getBoundingClientRect());
    const free = candidates.filter((b) => {
      const x = (b.ndcX * 0.5 + 0.5) * this.w + box.left;
      const y = (-b.ndcY * 0.5 + 0.5) * this.h + box.top;
      return !zones.some((r) => x > r.left - 90 && x < r.right + 90 && y > r.top - 60 && y < r.bottom + 150);
    });
    if (!free.length) return;
    const bot = pick(free);
    const alive = this.bots.filter((b) => b.state !== "leave").length;
    const over = alive > this.limit;
    const text = over && Math.random() < 0.7 ? pick(LINES.overload) : pick(LINES.idle);
    this.say(bot, text, rand(1.8, 2.8));
  }

  /* ── simulation ───────────────────────────────────────────── */

  private tick = (now: number) => {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.clock += dt;
    this.step(dt);
    this.renderFrame(dt);
    this.raf = requestAnimationFrame(this.tick);
  };

  private step(dt: number) {
    // pointeur → sol (à mi-hauteur des robots)
    if (this.pointerInside) {
      this.raycaster.setFromCamera(this.pointer, this.camera);
      this.pointerWorld = this.raycaster.ray.intersectPlane(this.planeMid, this.pointerWorld ?? new THREE.Vector3());
    }
    const pw = this.pointerInside ? this.pointerWorld : null;

    for (const b of this.bots) {
      // position écran (pour les bords et les bulles)
      this.v.set(b.x, 0.6, b.z).project(this.camera);
      b.ndcX = this.v.x;
      b.ndcY = this.v.y;

      const dist = pw ? Math.hypot(b.x - pw.x, b.z - pw.z) : 99;
      const seen = dist < 1.75 && b.state !== "leave";
      if (seen && !b.noticed && this.clock - b.lastNoticed > 2.5 && Math.random() < 0.55) {
        this.say(b, pick(LINES.noticed), 1.6, false);
      }
      if (seen) b.lastNoticed = this.clock;
      b.noticed = seen || this.clock - b.lastNoticed < 1.1;
      b.notice = damp(b.notice, b.noticed ? 1 : 0, b.noticed ? 9 : 2.2, dt);

      b.timer -= dt;
      if (b.state === "walk" || b.state === "idle") {
        if (b.timer <= 0) {
          if (b.state === "walk" && Math.random() < 0.32) {
            b.state = "idle";
            b.timer = rand(1.2, 3.6);
          } else {
            b.state = "walk";
            b.timer = rand(2, 5.5);
            b.target = b.heading + rand(-1.6, 1.6);
          }
        }
        // bords de l'écran : on revient vers le centre
        const edge = Math.abs(b.ndcX) > 0.94 || b.ndcY > 0.86 || b.ndcY < -0.98;
        if (edge) {
          b.target = Math.atan2(-b.x, -b.z) + rand(-0.3, 0.3);
          if (b.state === "idle") {
            b.state = "walk";
            b.timer = rand(2, 4);
          }
        }
      } else if (b.state === "enter") {
        b.target = Math.atan2(-b.x, -b.z);
        if (Math.abs(b.ndcX) < 0.8) {
          b.state = "walk";
          b.timer = rand(1.5, 4);
        }
      } else if (b.state === "leave") {
        if (Math.abs(b.ndcX) > 1.25) b.dead = true;
      }

      let want = b.state === "idle" ? 0 : b.baseSpeed * (b.state === "leave" ? 1.6 : 1);
      if (b.noticed && b.state !== "leave") {
        want = 0;
        if (pw) b.target = Math.atan2(pw.x - b.x, pw.z - b.z);
      }
      if (b.jumpT >= 0) want *= 0.4;
      b.speed = damp(b.speed, want, 5, dt);

      // séparation douce
      for (const o of this.bots) {
        if (o === b || o.dead) continue;
        const dx = b.x - o.x;
        const dz = b.z - o.z;
        const d2 = dx * dx + dz * dz;
        if (d2 < 0.62 && d2 > 1e-5) {
          const d = Math.sqrt(d2);
          const push = ((0.79 - d) / 0.79) * 0.9 * dt;
          b.x += (dx / d) * push;
          b.z += (dz / d) * push;
        }
      }

      const turn = angleDelta(b.heading, b.target);
      b.heading += Math.sign(turn) * Math.min(Math.abs(turn), (b.noticed ? 7 : 2.4) * dt);
      b.x += Math.sin(b.heading) * b.speed * dt;
      b.z += Math.cos(b.heading) * b.speed * dt;

      b.gait = damp(b.gait, Math.min(1, b.speed / 0.5), 6, dt);
      b.phase += dt * (3 + b.speed * 9);

      if (b.jumpT !== -1) {
        b.jumpT += dt;
        if (b.jumpT > 0.62) b.jumpT = -1;
      }

      b.headTilt = damp(b.headTilt, b.noticed ? -0.32 : 0, 6, dt);
      b.headYaw = damp(b.headYaw, b.state === "idle" && !b.noticed ? Math.sin(this.clock * 0.7 + b.phase) * 0.5 : 0, 2, dt);
    }

    this.bots = this.bots.filter((b) => !b.dead);

    for (const r of this.ripples) {
      r.t += dt;
      const k = r.t / 0.7;
      r.mesh.scale.setScalar(0.2 + k * 1.6);
      (r.mesh.material as THREE.MeshBasicMaterial).opacity = 0.55 * (1 - k);
      if (k >= 1) {
        this.scene.remove(r.mesh);
        r.mesh.geometry.dispose();
        (r.mesh.material as THREE.Material).dispose();
      }
    }
    this.ripples = this.ripples.filter((r) => r.t < 0.7);

    this.chatter(dt);
  }

  /* ── rendu ────────────────────────────────────────────────── */

  private set(part: Part, i: number, m: THREE.Matrix4, color?: THREE.Color) {
    part.fill.setMatrixAt(i, m);
    part.line?.setMatrixAt(i, m);
    if (color && part.tint) part.fill.setColorAt(i, color);
  }

  private compose(out: THREE.Matrix4, x: number, y: number, z: number, rx: number, ry: number, rz: number, sx = 1, sy = 1, sz = 1) {
    this.e.set(rx, ry, rz, "YXZ");
    this.q.setFromEuler(this.e);
    this.v.set(x, y, z);
    this.sc.set(sx, sy, sz);
    return out.compose(this.v, this.q, this.sc);
  }

  private renderFrame(dt: number) {
    void dt;
    const P = this.parts;
    let n = 0;
    let nVest = 0;
    let nHat = 0;
    let nBox = 0;

    for (const b of this.bots) {
      // saut : parabole + écrasement
      let lift = 0;
      let squash = 1;
      if (b.jumpT >= 0) {
        const t = b.jumpT / 0.62;
        lift = 4 * 0.62 * t * (1 - t);
        squash = t < 0.1 ? 1 - t * 1.6 : t > 0.88 ? 0.9 + (t - 0.88) * 0.8 : 1.06;
      } else if (b.jumpT < -0.001 && b.jumpT > -1) {
        squash = 0.9; // anticipation
      }
      this.col.copy(WHITE).lerp(YELLOW, b.notice);

      const sw = Math.sin(b.phase) * b.gait;
      const bob = Math.abs(Math.cos(b.phase)) * 0.035 * b.gait;

      this.compose(this.mRoot, b.x, lift, b.z, 0, b.heading, 0, b.s, b.s * squash, b.s);
      this.compose(this.mTmp, 0, bob, 0, 0, 0, sw * 0.05);
      this.mBody.multiplyMatrices(this.mRoot, this.mTmp);

      this.set(P.body, n, this.mBody, this.col);
      if (b.vest) {
        this.set(P.vest, nVest++, this.mBody);
      }

      // tête
      this.compose(this.mTmp, 0, 1.14, 0, b.headTilt, b.headYaw, -sw * 0.04);
      this.mHead.multiplyMatrices(this.mBody, this.mTmp);
      this.set(P.head, n, this.mHead, this.col);

      for (const side of [-1, 1]) {
        this.compose(this.mTmp, side * 0.072, 0.025, 0.178, 0, 0, 0);
        this.mOut.multiplyMatrices(this.mHead, this.mTmp);
        P.eye.fill.setMatrixAt(n * 2 + (side < 0 ? 0 : 1), this.mOut);
      }

      if (b.hat) {
        this.compose(this.mTmp, 0, 0.004, -0.01, -0.28, 0, 0);
        this.mOut.multiplyMatrices(this.mHead, this.mTmp);
        this.set(P.hat, nHat++, this.mOut);
      }

      // antenne
      const wob = Math.sin(b.phase * 1.3) * 0.18 * (0.3 + b.gait) + (b.jumpT >= 0 ? Math.sin(b.jumpT * 30) * 0.3 : 0);
      this.compose(this.mTmp, 0, 0.19, 0, 0, 0, wob);
      this.mOut.multiplyMatrices(this.mHead, this.mTmp);
      this.compose(this.mTmp, 0, 0.085, 0, 0, 0, 0);
      this.mStem.multiplyMatrices(this.mOut, this.mTmp);
      this.set(P.stem, n, this.mStem, this.col);
      this.compose(this.mTmp, 0, 0.2, 0, 0, 0, 0);
      this.mTmp.premultiply(this.mOut);
      this.set(P.ball, n, this.mTmp, this.col);

      // jambes
      for (const side of [-1, 1]) {
        const swing = sw * 0.62 * side;
        this.compose(this.mTmp, side * 0.098, 0.31, 0, swing, 0, 0);
        this.mOut.multiplyMatrices(this.mRoot, this.mTmp);
        this.compose(this.mTmp, 0, -0.15, 0, 0, 0, 0);
        this.mOut.multiply(this.mTmp);
        this.set(P.leg, n * 2 + (side < 0 ? 0 : 1), this.mOut, this.col);
      }

      // bras
      for (const side of [-1, 1]) {
        const swing = b.box ? -1.15 : -sw * 0.5 * side;
        const spread = b.box ? 0.08 : 0.2 + (b.noticed ? 0.25 + Math.sin(this.clock * 14 + side) * 0.12 : 0);
        this.compose(this.mTmp, side * 0.218, 0.84, 0, swing, 0, side * spread);
        this.mOut.multiplyMatrices(this.mBody, this.mTmp);
        this.compose(this.mTmp, 0, -0.13, 0, 0, 0, 0);
        this.mOut.multiply(this.mTmp);
        this.set(P.arm, n * 2 + (side < 0 ? 0 : 1), this.mOut, this.col);
      }

      if (b.box) {
        this.compose(this.mTmp, 0, 0.7, 0.3, 0.05, 0, 0);
        this.mOut.multiplyMatrices(this.mBody, this.mTmp);
        this.set(P.box, nBox++, this.mOut);
      }

      // ombres (alignées au monde)
      const shrink = 1 - Math.min(0.5, lift * 0.8);
      this.compose(this.mTmp, b.x + 0.42 * b.s, 0.004, b.z - 0.12 * b.s, 0, -0.32, 0, 1.45 * b.s * shrink, 1, 0.62 * b.s * shrink);
      this.shadows.setMatrixAt(n, this.mTmp);
      this.compose(this.mTmp, b.x + 0.04, 0.006, b.z, 0, 0, 0, 0.62 * b.s * shrink, 1, 0.5 * b.s * shrink);
      this.contacts.setMatrixAt(n, this.mTmp);

      n++;
    }

    const counts: Record<string, number> = {
      body: n,
      head: n,
      stem: n,
      ball: n,
      leg: n * 2,
      arm: n * 2,
      eye: n * 2,
      vest: nVest,
      hat: nHat,
      box: nBox,
    };
    for (const [k, part] of Object.entries(P)) {
      part.fill.count = counts[k];
      part.fill.instanceMatrix.needsUpdate = true;
      if (part.fill.instanceColor) part.fill.instanceColor.needsUpdate = true;
      if (part.line) {
        part.line.count = counts[k];
        part.line.instanceMatrix.needsUpdate = true;
      }
    }
    this.shadows.count = n;
    this.contacts.count = n;
    this.shadows.instanceMatrix.needsUpdate = true;
    this.contacts.instanceMatrix.needsUpdate = true;

    this.updateBubbles();
    this.renderer.render(this.scene, this.camera);
  }

  private resize() {
    const r = this.opts.container.getBoundingClientRect();
    this.w = Math.max(1, r.width);
    this.h = Math.max(1, r.height);
    this.renderer.setSize(this.w, this.h, false);
    this.camera.aspect = this.w / this.h;
    // écran étroit : on recule un peu pour garder de l'air
    this.camera.fov = this.camera.aspect < 0.8 ? 34 : 26;
    this.camera.updateProjectionMatrix();
    if (this.reduced || !this.active) this.renderFrame(0);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.opts.events.removeEventListener("pointermove", this.onMove);
    this.opts.events.removeEventListener("pointerleave", this.onLeave);
    this.opts.events.removeEventListener("pointerdown", this.onDown);
    document.removeEventListener("visibilitychange", this.onVisibility);
    for (const r of this.ripples) {
      r.mesh.geometry.dispose();
      (r.mesh.material as THREE.Material).dispose();
    }
    for (const p of Object.values(this.parts)) {
      p.fill.dispose();
      p.line?.dispose();
    }
    this.shadows.dispose();
    this.contacts.dispose();
    this.disposables.forEach((d) => d.dispose());
    for (const b of this.bubbles) b.el.remove();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
