function F() {
    const e = document.querySelector(".hamburger-menu")
      , t = document.querySelector(".menu-icon")
      , o = document.querySelector("#menu-items");
    e?.addEventListener("click", ()=>{
        const n = e.getAttribute("aria-expanded") === "true";
        t?.classList.toggle("is-active"),
        e.setAttribute("aria-expanded", n ? "false" : "true"),
        e.setAttribute("aria-label", n ? "Open Menu" : "Close Menu"),
        o?.classList.toggle("display-none")
    }
    )
}
F(),
document.addEventListener("astro:after-swap", F);
const Q = "astro:before-preparation"
  , Z = "astro:after-preparation"
  , ee = "astro:before-swap"
  , te = "astro:after-swap"
  , ne = e=>document.dispatchEvent(new Event(e));
class $ extends Event {
    from;
    to;
    direction;
    navigationType;
    sourceElement;
    info;
    newDocument;
    constructor(t, o, n, a, s, l, f, r, d) {
        super(t, o),
        this.from = n,
        this.to = a,
        this.direction = s,
        this.navigationType = l,
        this.sourceElement = f,
        this.info = r,
        this.newDocument = d,
        Object.defineProperties(this, {
            from: {
                enumerable: !0
            },
            to: {
                enumerable: !0,
                writable: !0
            },
            direction: {
                enumerable: !0,
                writable: !0
            },
            navigationType: {
                enumerable: !0
            },
            sourceElement: {
                enumerable: !0
            },
            info: {
                enumerable: !0
            },
            newDocument: {
                enumerable: !0,
                writable: !0
            }
        })
    }
}
class oe extends $ {
    formData;
    loader;
    constructor(t, o, n, a, s, l, f, r, d) {
        super(Q, {
            cancelable: !0
        }, t, o, n, a, s, l, f),
        this.formData = r,
        this.loader = d.bind(this, this),
        Object.defineProperties(this, {
            formData: {
                enumerable: !0
            },
            loader: {
                enumerable: !0,
                writable: !0
            }
        })
    }
}
class re extends $ {
    direction;
    viewTransition;
    swap;
    constructor(t, o, n) {
        super(ee, void 0, t.from, t.to, t.direction, t.navigationType, t.sourceElement, t.info, t.newDocument),
        this.direction = t.direction,
        this.viewTransition = o,
        this.swap = n.bind(this, this),
        Object.defineProperties(this, {
            direction: {
                enumerable: !0
            },
            viewTransition: {
                enumerable: !0
            },
            swap: {
                enumerable: !0,
                writable: !0
            }
        })
    }
}
async function ie(e, t, o, n, a, s, l, f) {
    const r = new oe(e,t,o,n,a,s,window.document,l,f);
    return document.dispatchEvent(r) && (await r.loader(),
    r.defaultPrevented || (ne(Z),
    r.navigationType !== "traverse" && x({
        scrollX,
        scrollY
    }))),
    r
}
async function se(e, t, o) {
    const n = new re(e,t,o);
    return document.dispatchEvent(n),
    n.swap(),
    n
}
const ae = history.pushState.bind(history)
  , D = history.replaceState.bind(history)
  , x = e=>{
    history.state && (history.scrollRestoration = "manual",
    D({
        ...history.state,
        ...e
    }, ""))
}
  , R = !!document.startViewTransition
  , k = ()=>!!document.querySelector('[name="astro-view-transitions-enabled"]')
  , C = (e,t)=>e.pathname === t.pathname && e.search === t.search;
let A, y, T = !1, _;
const U = e=>document.dispatchEvent(new Event(e))
  , B = ()=>U("astro:page-load")
  , ce = ()=>{
    let e = document.createElement("div");
    e.setAttribute("aria-live", "assertive"),
    e.setAttribute("aria-atomic", "true"),
    e.className = "astro-route-announcer",
    document.body.append(e),
    setTimeout(()=>{
        let t = document.title || document.querySelector("h1")?.textContent || location.pathname;
        e.textContent = t
    }
    , 60)
}
  , p = "data-astro-transition-persist"
  , V = "data-astro-transition"
  , W = "data-astro-transition-fallback";
let I, b = 0;
history.state ? (b = history.state.index,
scrollTo({
    left: history.state.scrollX,
    top: history.state.scrollY
})) : k() && (D({
    index: b,
    scrollX,
    scrollY
}, ""),
history.scrollRestoration = "manual");
const le = (e,t)=>{
    let o = !1
      , n = !1;
    return (...a)=>{
        if (o) {
            n = !0;
            return
        }
        e(...a),
        o = !0,
        setTimeout(()=>{
            n && (n = !1,
            e(...a)),
            o = !1
        }
        , t)
    }
}
;
async function ue(e, t) {
    try {
        const o = await fetch(e, t)
          , n = (o.headers.get("content-type") ?? "").split(";", 1)[0].trim();
        return n !== "text/html" && n !== "application/xhtml+xml" ? null : {
            html: await o.text(),
            redirected: o.redirected ? o.url : void 0,
            mediaType: n
        }
    } catch {
        return null
    }
}
function X() {
    const e = document.querySelector('[name="astro-view-transitions-fallback"]');
    return e ? e.getAttribute("content") : "animate"
}
function fe() {
    let e = Promise.resolve();
    for (const t of Array.from(document.scripts)) {
        if (t.dataset.astroExec === "")
            continue;
        const o = document.createElement("script");
        o.innerHTML = t.innerHTML;
        for (const n of t.attributes) {
            if (n.name === "src") {
                const a = new Promise(s=>{
                    o.onload = s
                }
                );
                e = e.then(()=>a)
            }
            o.setAttribute(n.name, n.value)
        }
        o.dataset.astroExec = "",
        t.replaceWith(o)
    }
    return e
}
const Y = (e,t,o,n)=>{
    const a = C(t, e);
    let s = !1;
    if (e.href !== location.href && !n)
        if (o.history === "replace") {
            const l = history.state;
            D({
                ...o.state,
                index: l.index,
                scrollX: l.scrollX,
                scrollY: l.scrollY
            }, "", e.href)
        } else
            ae({
                ...o.state,
                index: ++b,
                scrollX: 0,
                scrollY: 0
            }, "", e.href);
    A = e,
    a || (scrollTo({
        left: 0,
        top: 0,
        behavior: "instant"
    }),
    s = !0),
    n ? scrollTo(n.scrollX, n.scrollY) : (e.hash ? (history.scrollRestoration = "auto",
    location.href = e.href) : s || scrollTo({
        left: 0,
        top: 0,
        behavior: "instant"
    }),
    history.scrollRestoration = "manual")
}
;
function de(e) {
    const t = [];
    for (const o of e.querySelectorAll("head link[rel=stylesheet]"))
        if (!document.querySelector(`[${p}="${o.getAttribute(p)}"], link[rel=stylesheet][href="${o.getAttribute("href")}"]`)) {
            const n = document.createElement("link");
            n.setAttribute("rel", "preload"),
            n.setAttribute("as", "style"),
            n.setAttribute("href", o.getAttribute("href")),
            t.push(new Promise(a=>{
                ["load", "error"].forEach(s=>n.addEventListener(s, a)),
                document.head.append(n)
            }
            ))
        }
    return t
}
async function O(e, t, o, n) {
    const a = (i,u)=>{
        const m = i.getAttribute(p)
          , w = m && u.head.querySelector(`[${p}="${m}"]`);
        if (w)
            return w;
        if (i.matches("link[rel=stylesheet]")) {
            const g = i.getAttribute("href");
            return u.head.querySelector(`link[rel=stylesheet][href="${g}"]`)
        }
        return null
    }
      , s = ()=>{
        const i = document.activeElement;
        if (i?.closest(`[${p}]`)) {
            if (i instanceof HTMLInputElement || i instanceof HTMLTextAreaElement) {
                const u = i.selectionStart
                  , m = i.selectionEnd;
                return {
                    activeElement: i,
                    start: u,
                    end: m
                }
            }
            return {
                activeElement: i
            }
        } else
            return {
                activeElement: null
            }
    }
      , l = ({activeElement: i, start: u, end: m})=>{
        i && (i.focus(),
        (i instanceof HTMLInputElement || i instanceof HTMLTextAreaElement) && (i.selectionStart = u,
        i.selectionEnd = m))
    }
      , f = i=>{
        const u = document.documentElement
          , m = [...u.attributes].filter(({name: c})=>(u.removeAttribute(c),
        c.startsWith("data-astro-")));
        [...i.newDocument.documentElement.attributes, ...m].forEach(({name: c, value: h})=>u.setAttribute(c, h));
        for (const c of document.scripts)
            for (const h of i.newDocument.scripts)
                if (!c.src && c.textContent === h.textContent || c.src && c.type === h.type && c.src === h.src) {
                    h.dataset.astroExec = "";
                    break
                }
        for (const c of Array.from(document.head.children)) {
            const h = a(c, i.newDocument);
            h ? h.remove() : c.remove()
        }
        document.head.append(...i.newDocument.head.children);
        const w = document.body
          , g = s();
        document.body.replaceWith(i.newDocument.body);
        for (const c of w.querySelectorAll(`[${p}]`)) {
            const h = c.getAttribute(p)
              , S = document.querySelector(`[${p}="${h}"]`);
            S && S.replaceWith(c)
        }
        l(g)
    }
    ;
    async function r(i) {
        function u(g) {
            const c = g.effect;
            return !c || !(c instanceof KeyframeEffect) || !c.target ? !1 : window.getComputedStyle(c.target, c.pseudoElement).animationIterationCount === "infinite"
        }
        const m = document.getAnimations();
        document.documentElement.setAttribute(W, i);
        const w = document.getAnimations().filter(g=>!m.includes(g) && !u(g));
        return Promise.all(w.map(g=>g.finished))
    }
    if (!T)
        document.documentElement.setAttribute(V, e.direction),
        n === "animate" && await r("old");
    else
        throw new DOMException("Transition was skipped");
    const d = await se(e, y, f);
    Y(d.to, d.from, t, o),
    U(te),
    n === "animate" && !T && r("new").then(()=>_())
}
async function K(e, t, o, n, a) {
    if (!k() || location.origin !== o.origin) {
        location.href = o.href;
        return
    }
    const s = a ? "traverse" : n.history === "replace" ? "replace" : "push";
    if (s !== "traverse" && x({
        scrollX,
        scrollY
    }),
    C(t, o) && o.hash) {
        Y(o, t, n, a);
        return
    }
    const l = await ie(t, o, e, s, n.sourceElement, n.info, n.formData, f);
    if (l.defaultPrevented) {
        location.href = o.href;
        return
    }
    async function f(r) {
        const d = r.to.href
          , i = {};
        if (r.formData) {
            i.method = "POST";
            const w = r.sourceElement instanceof HTMLFormElement ? r.sourceElement : r.sourceElement instanceof HTMLElement && "form"in r.sourceElement ? r.sourceElement.form : r.sourceElement?.closest("form");
            i.body = w?.attributes.getNamedItem("enctype")?.value === "application/x-www-form-urlencoded" ? new URLSearchParams(r.formData) : r.formData
        }
        const u = await ue(d, i);
        if (u === null) {
            r.preventDefault();
            return
        }
        if (u.redirected && (r.to = new URL(u.redirected)),
        I ??= new DOMParser,
        r.newDocument = I.parseFromString(u.html, u.mediaType),
        r.newDocument.querySelectorAll("noscript").forEach(w=>w.remove()),
        !r.newDocument.querySelector('[name="astro-view-transitions-enabled"]') && !r.formData) {
            r.preventDefault();
            return
        }
        const m = de(r.newDocument);
        m.length && await Promise.all(m)
    }
    if (T = !1,
    R)
        y = document.startViewTransition(async()=>await O(l, n, a));
    else {
        const r = (async()=>{
            await new Promise(d=>setTimeout(d)),
            await O(l, n, a, X())
        }
        )();
        y = {
            updateCallbackDone: r,
            ready: r,
            finished: new Promise(d=>_ = d),
            skipTransition: ()=>{
                T = !0
            }
        }
    }
    y.ready.then(async()=>{
        await fe(),
        B(),
        ce()
    }
    ),
    y.finished.then(()=>{
        document.documentElement.removeAttribute(V),
        document.documentElement.removeAttribute(W)
    }
    ),
    await y.ready
}
async function M(e, t) {
    await K("forward", A, new URL(e,location.href), t ?? {})
}
function me(e) {
    if (!k() && e.state) {
        location.reload();
        return
    }
    if (e.state === null)
        return;
    const t = history.state
      , o = t.index
      , n = o > b ? "forward" : "back";
    b = o,
    K(n, A, new URL(location.href), {}, t)
}
const H = ()=>{
    x({
        scrollX,
        scrollY
    })
}
;
{
    (R || X() !== "none") && (A = new URL(location.href),
    addEventListener("popstate", me),
    addEventListener("load", B),
    "onscrollend"in window ? addEventListener("scrollend", H) : addEventListener("scroll", le(H, 350), {
        passive: !0
    }));
    for (const e of document.scripts)
        e.dataset.astroExec = ""
}
const j = new Set
  , v = new WeakSet;
let L, G, N = !1;
function he(e) {
    N || (N = !0,
    L ??= e?.prefetchAll ?? !1,
    G ??= e?.defaultStrategy ?? "hover",
    we(),
    pe(),
    ye())
}
function we() {
    for (const e of ["touchstart", "mousedown"])
        document.body.addEventListener(e, t=>{
            E(t.target, "tap") && P(t.target.href, {
                with: "fetch",
                ignoreSlowConnection: !0
            })
        }
        , {
            passive: !0
        })
}
function pe() {
    let e;
    document.body.addEventListener("focusin", n=>{
        E(n.target, "hover") && t(n)
    }
    , {
        passive: !0
    }),
    document.body.addEventListener("focusout", o, {
        passive: !0
    }),
    J(()=>{
        for (const n of document.getElementsByTagName("a"))
            v.has(n) || E(n, "hover") && (v.add(n),
            n.addEventListener("mouseenter", t, {
                passive: !0
            }),
            n.addEventListener("mouseleave", o, {
                passive: !0
            }))
    }
    );
    function t(n) {
        const a = n.target.href;
        e && clearTimeout(e),
        e = setTimeout(()=>{
            P(a, {
                with: "fetch"
            })
        }
        , 80)
    }
    function o() {
        e && (clearTimeout(e),
        e = 0)
    }
}
function ye() {
    let e;
    J(()=>{
        for (const t of document.getElementsByTagName("a"))
            v.has(t) || E(t, "viewport") && (v.add(t),
            e ??= ge(),
            e.observe(t))
    }
    )
}
function ge() {
    const e = new WeakMap;
    return new IntersectionObserver((t,o)=>{
        for (const n of t) {
            const a = n.target
              , s = e.get(a);
            n.isIntersecting ? (s && clearTimeout(s),
            e.set(a, setTimeout(()=>{
                o.unobserve(a),
                e.delete(a),
                P(a.href, {
                    with: "link"
                })
            }
            , 300))) : s && (clearTimeout(s),
            e.delete(a))
        }
    }
    )
}
function P(e, t) {
    const o = t?.ignoreSlowConnection ?? !1;
    if (be(e, o))
        if (j.add(e),
        (t?.with ?? "link") === "link") {
            const n = document.createElement("link");
            n.rel = "prefetch",
            n.setAttribute("href", e),
            document.head.append(n)
        } else
            fetch(e).catch(n=>{
                console.log(`[astro] Failed to prefetch ${e}`),
                console.error(n)
            }
            )
}
function be(e, t) {
    if (!navigator.onLine || !t && z())
        return !1;
    try {
        const o = new URL(e,location.href);
        return location.origin === o.origin && (location.pathname !== o.pathname || location.search !== o.search) && !j.has(e)
    } catch {}
    return !1
}
function E(e, t) {
    if (e?.tagName !== "A")
        return !1;
    const o = e.dataset.astroPrefetch;
    return o === "false" ? !1 : t === "tap" && (o != null || L) && z() ? !0 : o == null && L || o === "" ? t === G : o === t
}
function z() {
    if ("connection"in navigator) {
        const e = navigator.connection;
        return e.saveData || /(2|3)g/.test(e.effectiveType)
    }
    return !1
}
function J(e) {
    e();
    let t = !1;
    document.addEventListener("astro:page-load", ()=>{
        if (!t) {
            t = !0;
            return
        }
        e()
    }
    )
}
function Te() {
    const e = document.querySelector('[name="astro-view-transitions-fallback"]');
    return e ? e.getAttribute("content") : "animate"
}
function q(e) {
    return e.dataset.astroReload !== void 0
}
(R || Te() !== "none") && (document.addEventListener("click", e=>{
    let t = e.target;
    if (t instanceof Element && (t = t.closest("a, area")),
    !(t instanceof HTMLAnchorElement) && !(t instanceof SVGAElement) && !(t instanceof HTMLAreaElement))
        return;
    const o = t instanceof HTMLElement ? t.target : t.target.baseVal
      , n = t instanceof HTMLElement ? t.href : t.href.baseVal
      , a = new URL(n,location.href).origin;
    q(t) || t.hasAttribute("download") || !t.href || o && o !== "_self" || a !== location.origin || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.defaultPrevented || (e.preventDefault(),
    M(n, {
        history: t.dataset.astroHistory === "replace" ? "replace" : "auto",
        sourceElement: t
    }))
}
),
document.addEventListener("submit", e=>{
    let t = e.target;
    if (t.tagName !== "FORM" || e.defaultPrevented || q(t))
        return;
    const o = t
      , n = e.submitter
      , a = new FormData(o,n);
    let s = n?.getAttribute("formaction") ?? o.action ?? location.pathname;
    const l = n?.getAttribute("formmethod") ?? o.method;
    if (l === "dialog")
        return;
    const f = {
        sourceElement: n ?? o
    };
    if (l === "get") {
        const r = new URLSearchParams(a)
          , d = new URL(s);
        d.search = r.toString(),
        s = d.toString()
    } else
        f.formData = a;
    e.preventDefault(),
    M(s, f)
}
),
he({
    prefetchAll: !0
}));
