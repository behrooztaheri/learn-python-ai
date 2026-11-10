/* Interactive labs for the Math track: vectors, matrices, eigenvectors, derivatives, gradient descent,
   the chain rule, integrals, Bayes' rule, the normal distribution, the central limit theorem,
   correlation, entropy, softmax and maximum likelihood. Plain JavaScript on a canvas. */
(function () {
  var C = { a: "#5b34c4", b: "#e8590c", c: "#16834f", d: "#1f6f8b", g: "#c9c4d6", k: "#2b2440", r: "#c92a3a", m: "#c2255c" };
  function tx(lang, fa, en) { return lang === "fa" ? fa : en; }
  function canvas(host, w, h) {
    var c = document.createElement("canvas"); c.width = w * 2; c.height = h * 2; c.style.width = w + "px"; c.style.aspectRatio = w + "/" + h;
    var x = c.getContext("2d"); x.scale(2, 2); host.appendChild(c); return { el: c, x: x, w: w, h: h };
  }
  function panel(host) { var d = document.createElement("div"); d.className = "ctl"; host.appendChild(d); return d; }
  function slider(p, label, min, max, step, val, fn, fmt) {
    var l = document.createElement("label"), s = document.createElement("span"), i = document.createElement("input");
    i.type = "range"; i.min = min; i.max = max; i.step = step; i.value = val;
    var show = function () { s.textContent = label + " = " + (fmt ? fmt(+i.value) : +i.value); };
    i.oninput = function () { show(); fn(+i.value); }; show(); l.appendChild(s); l.appendChild(i); p.appendChild(l);
    l.set = function (v) { i.value = v; show(); };
    return l;
  }
  function select(p, label, opts, val, fn) {
    var l = document.createElement("label"), s = document.createElement("span"), e = document.createElement("select");
    s.textContent = label; opts.forEach(function (o) { var q = document.createElement("option"); q.value = o[0]; q.textContent = o[1]; e.appendChild(q); });
    e.value = val; e.onchange = function () { fn(e.value); }; l.appendChild(s); l.appendChild(e); p.appendChild(l); return e;
  }
  function button(p, label, fn) { var b = document.createElement("button"); b.textContent = label; b.onclick = fn; p.appendChild(b); return b; }
  function row(p) { var d = document.createElement("div"); d.className = "row"; p.appendChild(d); return d; }
  function readout(p) { var r = document.createElement("div"); r.className = "readout"; p.appendChild(r); return r; }
  function key(host, html) { var k = document.createElement("p"); k.className = "labkey"; k.innerHTML = html; host.appendChild(k); }
  function pos(c, e) { var r = c.el.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * c.w, (e.clientY - r.top) / r.height * c.h]; }
  function f(v, d) { return isFinite(v) ? (+v).toFixed(d === undefined ? 2 : d) : "—"; }
  function seeded(s) { return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function gauss(r) { return Math.sqrt(-2 * Math.log(r() + 1e-12)) * Math.cos(6.283185 * r()); }
  function line(x, a, b, c, d, col, w, dash) { x.beginPath(); x.setLineDash(dash || []); x.moveTo(a, b); x.lineTo(c, d); x.strokeStyle = col; x.lineWidth = w || 1; x.stroke(); x.setLineDash([]); }
  function dot(x, a, b, r, col) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fillStyle = col; x.fill(); }
  function text(x, s, a, b, col, size, align) { x.fillStyle = col || C.k; x.font = (size || 12) + "px JetBrains Mono, monospace"; x.textAlign = align || "left"; x.fillText(s, a, b); }
  function arrow(x, a, b, c, d, col, w) {
    line(x, a, b, c, d, col, w || 2.5);
    var t = Math.atan2(d - b, c - a), s = 9;
    x.beginPath(); x.moveTo(c, d); x.lineTo(c - s * Math.cos(t - 0.4), d - s * Math.sin(t - 0.4)); x.lineTo(c - s * Math.cos(t + 0.4), d - s * Math.sin(t + 0.4)); x.closePath(); x.fillStyle = col; x.fill();
  }
  // A square plane from -R to R with a grid. Returns functions that map math coordinates to pixels and back.
  function plane(cv, R) {
    var x = cv.x, W = cv.w, H = cv.h, s = Math.min(W, H) / (2 * R);
    var X = function (u) { return W / 2 + u * s; }, Y = function (v) { return H / 2 - v * s; };
    x.clearRect(0, 0, W, H);
    for (var i = -R; i <= R; i++) { line(x, X(i), 0, X(i), H, "#eeeaf5"); line(x, 0, Y(i), W, Y(i), "#eeeaf5"); }
    line(x, 0, Y(0), W, Y(0), "#a7a2b8", 1.2); line(x, X(0), 0, X(0), H, "#a7a2b8", 1.2);
    return { X: X, Y: Y, ux: function (px) { return (px - W / 2) / s; }, uy: function (py) { return (H / 2 - py) / s; }, s: s };
  }
  // A plot area for y = f(x) with axes and tick labels.
  function axes(cv, x0, x1, y0, y1, pad) {
    var x = cv.x, W = cv.w, H = cv.h; pad = pad || 30;
    var X = function (u) { return pad + (u - x0) / (x1 - x0) * (W - pad - 8); }, Y = function (v) { return H - pad - (v - y0) / (y1 - y0) * (H - pad - 10); };
    x.clearRect(0, 0, W, H);
    var ax = Math.min(Math.max(0, y0), y1), ay = Math.min(Math.max(0, x0), x1);
    line(x, pad, Y(ax), W - 8, Y(ax), "#a7a2b8", 1.2); line(x, X(ay), 10, X(ay), H - pad, "#a7a2b8", 1.2);
    for (var i = 0; i <= 4; i++) {
      var u = x0 + (x1 - x0) * i / 4, v = y0 + (y1 - y0) * i / 4;
      text(x, f(u, Math.abs(x1 - x0) < 4 ? 1 : 0), X(u), H - pad + 14, "#7d788c", 10, "center");
      text(x, f(v, Math.abs(y1 - y0) < 4 ? 1 : 0), pad - 4, Y(v) + 3, "#7d788c", 10, "right");
    }
    return { X: X, Y: Y, ux: function (px) { return x0 + (px - pad) / (W - pad - 8) * (x1 - x0); } };
  }
  function curve(cv, A, fn, x0, x1, col, w, dash) {
    var x = cv.x; x.beginPath(); x.setLineDash(dash || []);
    for (var i = 0; i <= 240; i++) { var u = x0 + (x1 - x0) * i / 240, px = A.X(u), py = A.Y(fn(u)); if (i) x.lineTo(px, py); else x.moveTo(px, py); }
    x.strokeStyle = col; x.lineWidth = w || 2.5; x.stroke(); x.setLineDash([]);
  }
  function drag(cv, fn) {
    var on = false;
    cv.el.addEventListener("pointerdown", function (e) { on = true; cv.el.setPointerCapture(e.pointerId); fn(pos(cv, e), true); });
    cv.el.addEventListener("pointermove", function (e) { if (on) fn(pos(cv, e), false); });
    cv.el.addEventListener("pointerup", function () { on = false; });
  }
  function erf(z) { var t = 1 / (1 + 0.3275911 * Math.abs(z)), y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-z * z); return z >= 0 ? y : -y; }
  function Phi(z) { return 0.5 * (1 + erf(z / Math.SQRT2)); }
  function sig(z) { return 1 / (1 + Math.exp(-z)); }
  function bars(cv, x0, y0, w, h, vals, cols, labels, max) {
    var x = cv.x, n = vals.length, bw = w / n;
    line(x, x0, y0 + h, x0 + w, y0 + h, "#a7a2b8", 1.2);
    vals.forEach(function (v, i) {
      var bh = Math.max(0, v / (max || 1)) * h;
      x.fillStyle = cols[i % cols.length]; x.fillRect(x0 + i * bw + bw * 0.18, y0 + h - bh, bw * 0.64, bh);
      text(x, f(v, 2), x0 + i * bw + bw / 2, y0 + h - bh - 5, C.k, 11, "center");
      if (labels) text(x, labels[i], x0 + i * bw + bw / 2, y0 + h + 14, "#7d788c", 11, "center");
    });
  }

  var D = {};
  function L(fa, en, hfa, hen, mount) { return { title: { fa: fa, en: en }, help: { fa: hfa, en: hen }, mount: mount }; }

  /* ---------- Vectors: sum, dot product, angle, projection ---------- */
  D.m_vec = L("بردارها، ضرب داخلی و زاویه", "Vectors, dot product and angle",
    "نوک هر بردار را بکش. جمع، ضرب داخلی، زاویه و تصویر a روی b همان لحظه حساب می‌شود.", "Drag the tip of each vector. The sum, dot product, angle and projection of a on b update live.",
    function (h, lang) {
      var cv = canvas(h, 380, 380), p = panel(h), out = readout(p), a = [3, 2], b = [1, 3], R = 5;
      key(p, tx(lang, "<b style='color:#5b34c4'>a</b>، <b style='color:#e8590c'>b</b>، <b style='color:#16834f'>a+b</b> و خط‌چین سبزآبی تصویر a روی b است. اگر a·b = 0 باشد دو بردار عمودند.", "<b style='color:#5b34c4'>a</b>, <b style='color:#e8590c'>b</b>, <b style='color:#16834f'>a+b</b>; the teal dashed line is the projection of a on b. If a·b = 0 the vectors are perpendicular."));
      function draw() {
        var P = plane(cv, R), x = cv.x, O = [P.X(0), P.Y(0)];
        var dp = a[0] * b[0] + a[1] * b[1], na = Math.hypot(a[0], a[1]), nb = Math.hypot(b[0], b[1]), cs = dp / (na * nb || 1), k = dp / (nb * nb || 1);
        line(x, P.X(a[0]), P.Y(a[1]), P.X(a[0] + b[0]), P.Y(a[1] + b[1]), C.g, 1.5, [5, 4]); line(x, P.X(b[0]), P.Y(b[1]), P.X(a[0] + b[0]), P.Y(a[1] + b[1]), C.g, 1.5, [5, 4]);
        arrow(x, O[0], O[1], P.X(a[0] + b[0]), P.Y(a[1] + b[1]), C.c, 2);
        line(x, P.X(a[0]), P.Y(a[1]), P.X(k * b[0]), P.Y(k * b[1]), C.d, 1.5, [4, 3]); line(x, O[0], O[1], P.X(k * b[0]), P.Y(k * b[1]), C.d, 5);
        arrow(x, O[0], O[1], P.X(a[0]), P.Y(a[1]), C.a, 3); arrow(x, O[0], O[1], P.X(b[0]), P.Y(b[1]), C.b, 3);
        text(x, "a", P.X(a[0]) + 6, P.Y(a[1]) - 6, C.a, 14); text(x, "b", P.X(b[0]) + 6, P.Y(b[1]) - 6, C.b, 14);
        out.textContent = "a = (" + f(a[0], 1) + ", " + f(a[1], 1) + ")   |a| = " + f(na) + "\nb = (" + f(b[0], 1) + ", " + f(b[1], 1) + ")   |b| = " + f(nb) +
          "\na + b = (" + f(a[0] + b[0], 1) + ", " + f(a[1] + b[1], 1) + ")\na·b = " + f(a[0], 1) + "×" + f(b[0], 1) + " + " + f(a[1], 1) + "×" + f(b[1], 1) + " = " + f(dp) +
          "\ncos θ = " + f(cs, 3) + "   θ = " + f(Math.acos(Math.max(-1, Math.min(1, cs))) * 180 / Math.PI, 1) + "°\n" + tx(lang, "طول تصویر a روی b", "length of a projected on b") + " = " + f(dp / (nb || 1));
      }
      var which = a;
      drag(cv, function (q, first) {
        var P = plane(cv, R), u = Math.round(P.ux(q[0]) * 2) / 2, v = Math.round(P.uy(q[1]) * 2) / 2;
        if (first) which = Math.hypot(u - a[0], v - a[1]) <= Math.hypot(u - b[0], v - b[1]) ? a : b;
        which[0] = Math.max(-R, Math.min(R, u)); which[1] = Math.max(-R, Math.min(R, v)); draw();
      });
      draw();
    });

  /* ---------- A 2×2 matrix as a transformation of the plane ---------- */
  D.m_mat = L("ماتریس یعنی تبدیل صفحه", "A matrix is a transformation",
    "چهار درایه ماتریس را تغییر بده و ببین شبکه و مربع واحد چطور کشیده، چرخانده یا له می‌شود.", "Change the four entries and watch the grid and the unit square stretch, rotate or collapse.",
    function (h, lang) {
      var cv = canvas(h, 380, 380), p = panel(h), M = [1.5, 0.5, 0.5, 1], S = [], R = 4;
      var names = ["a", "b", "c", "d"];
      select(p, tx(lang, "نمونه آماده", "Preset"), [["x", "—"], ["1,0,0,1", tx(lang, "همانی", "identity")], ["2,0,0,0.5", tx(lang, "کشیدن", "scale")], ["0.71,-0.71,0.71,0.71", tx(lang, "چرخش ۴۵°", "rotate 45°")], ["1,1,0,1", tx(lang, "برش", "shear")], ["-1,0,0,1", tx(lang, "بازتاب", "reflection")], ["1,2,0.5,1", tx(lang, "تکین (det=0)", "singular (det=0)")]], "x",
        function (v) { if (v === "x") return; M = v.split(",").map(Number); S.forEach(function (s, i) { s.set(M[i]); }); draw(); });
      names.forEach(function (n, i) { S.push(slider(p, n, -2, 2, 0.05, M[i], function (v) { M[i] = v; draw(); })); });
      var out = readout(p);
      key(p, tx(lang, "ماتریس A = [[a, b], [c, d]]. ستون اول جای جدید بردار <b style='color:#5b34c4'>(1,0)</b> و ستون دوم جای جدید <b style='color:#e8590c'>(0,1)</b> است. مساحت مربع بنفش = |det A|.", "A = [[a, b], [c, d]]. Column 1 is where <b style='color:#5b34c4'>(1,0)</b> lands, column 2 is where <b style='color:#e8590c'>(0,1)</b> lands. The area of the purple square = |det A|."));
      function draw() {
        var P = plane(cv, R), x = cv.x, a = M[0], b = M[1], c = M[2], d = M[3];
        var T = function (u, v) { return [P.X(a * u + b * v), P.Y(c * u + d * v)]; };
        for (var i = -6; i <= 6; i++) { var q1 = T(i, -6), q2 = T(i, 6), q3 = T(-6, i), q4 = T(6, i); line(x, q1[0], q1[1], q2[0], q2[1], "#cdbff5", 1); line(x, q3[0], q3[1], q4[0], q4[1], "#cdbff5", 1); }
        var s = [T(0, 0), T(1, 0), T(1, 1), T(0, 1)];
        x.beginPath(); s.forEach(function (q, i) { if (i) x.lineTo(q[0], q[1]); else x.moveTo(q[0], q[1]); }); x.closePath(); x.fillStyle = "rgba(91,52,196,.28)"; x.fill();
        x.strokeStyle = "#8d87a3"; x.setLineDash([4, 3]); x.strokeRect(P.X(0), P.Y(1), P.s, P.s); x.setLineDash([]);
        arrow(x, P.X(0), P.Y(0), s[1][0], s[1][1], C.a, 3); arrow(x, P.X(0), P.Y(0), s[3][0], s[3][1], C.b, 3);
        var det = a * d - b * c, tr = a + d, disc = tr * tr - 4 * det, ev;
        if (disc >= 0) ev = "λ₁ = " + f((tr + Math.sqrt(disc)) / 2) + "   λ₂ = " + f((tr - Math.sqrt(disc)) / 2);
        else ev = "λ = " + f(tr / 2) + " ± " + f(Math.sqrt(-disc) / 2) + "i  (" + tx(lang, "چرخش", "rotation") + ")";
        out.textContent = "A = [ " + f(a) + "  " + f(b) + " ]\n    [ " + f(c) + "  " + f(d) + " ]\ndet A = ad − bc = " + f(det) + "\n" +
          (Math.abs(det) < 0.03 ? tx(lang, "det ≈ 0: صفحه روی یک خط له می‌شود؛ وارون ندارد.", "det ≈ 0: the plane collapses onto a line; no inverse.") : det < 0 ? tx(lang, "det منفی: جهت صفحه برعکس شده است.", "negative det: orientation is flipped.") : tx(lang, "مساحت‌ها " + f(Math.abs(det)) + " برابر می‌شوند.", "areas are scaled by " + f(Math.abs(det)) + ".")) + "\n" + ev;
      }
      draw();
    });

  /* ---------- Eigenvectors: directions that the matrix does not turn ---------- */
  D.m_eig = L("بردار ویژه: جهتی که نمی‌چرخد", "Eigenvectors: directions that do not turn",
    "زاویه بردار v را عوض کن. هر وقت Av با v هم‌راستا شد، v یک بردار ویژه است.", "Change the angle of v. Whenever Av lines up with v, v is an eigenvector.",
    function (h, lang) {
      var cv = canvas(h, 380, 380), p = panel(h), M = [2, 1, 1, 2], th = 20, R = 4;
      select(p, tx(lang, "ماتریس", "Matrix"), [["2,1,1,2", "[[2,1],[1,2]]"], ["3,0,0,1", "[[3,0],[0,1]]"], ["1,1,0,1", "[[1,1],[0,1]] " + tx(lang, "برش", "shear")], ["2,-1,-1,2", "[[2,-1],[-1,2]]"], ["0,-1,1,0", "[[0,-1],[1,0]] " + tx(lang, "چرخش", "rotation")], ["1.5,0.5,0.2,0.8", "[[1.5,0.5],[0.2,0.8]]"]], "2,1,1,2", function (v) { M = v.split(",").map(Number); draw(); });
      slider(p, tx(lang, "زاویه v (درجه)", "angle of v (degrees)"), 0, 180, 1, th, function (v) { th = v; draw(); });
      var out = readout(p);
      key(p, tx(lang, "<b style='color:#1f6f8b'>v</b> بردار واحد، <b style='color:#e8590c'>Av</b> نتیجه ضرب. بیضی خاکستری همه Avها را نشان می‌دهد. خط‌های سبز جهت بردارهای ویژه‌اند.", "<b style='color:#1f6f8b'>v</b> is a unit vector, <b style='color:#e8590c'>Av</b> is the product. The grey ellipse shows every Av. Green lines are the eigenvector directions."));
      function draw() {
        var P = plane(cv, R), x = cv.x, a = M[0], b = M[1], c = M[2], d = M[3], t = th * Math.PI / 180;
        x.beginPath(); for (var i = 0; i <= 120; i++) { var q = i / 120 * 6.2832, u = Math.cos(q), w = Math.sin(q); var px = P.X(a * u + b * w), py = P.Y(c * u + d * w); if (i) x.lineTo(px, py); else x.moveTo(px, py); } x.strokeStyle = "#b9b4c7"; x.lineWidth = 1.5; x.stroke();
        x.beginPath(); x.arc(P.X(0), P.Y(0), P.s, 0, 7); x.strokeStyle = "#d9d5e6"; x.stroke();
        var tr = a + d, det = a * d - b * c, disc = tr * tr - 4 * det, info;
        if (disc >= 0) {
          var l1 = (tr + Math.sqrt(disc)) / 2, l2 = (tr - Math.sqrt(disc)) / 2;
          [l1, l2].forEach(function (l) { var e = Math.abs(b) > 1e-9 ? [b, l - a] : Math.abs(c) > 1e-9 ? [l - d, c] : (Math.abs(l - a) < 1e-9 ? [1, 0] : [0, 1]); var n = Math.hypot(e[0], e[1]) || 1; line(x, P.X(-6 * e[0] / n), P.Y(-6 * e[1] / n), P.X(6 * e[0] / n), P.Y(6 * e[1] / n), "rgba(22,131,79,.55)", 1.5, [6, 4]); });
          info = "λ₁ = " + f(l1) + "   λ₂ = " + f(l2);
        } else info = tx(lang, "مقدار ویژه حقیقی ندارد (چرخش خالص).", "No real eigenvalues (pure rotation).");
        var v = [Math.cos(t), Math.sin(t)], Av = [a * v[0] + b * v[1], c * v[0] + d * v[1]], n = Math.hypot(Av[0], Av[1]);
        var cr = v[0] * Av[1] - v[1] * Av[0], ang = Math.asin(Math.max(-1, Math.min(1, cr / (n || 1)))) * 180 / Math.PI, dp = v[0] * Av[0] + v[1] * Av[1];
        arrow(x, P.X(0), P.Y(0), P.X(Av[0]), P.Y(Av[1]), C.b, 3); arrow(x, P.X(0), P.Y(0), P.X(v[0]), P.Y(v[1]), C.d, 3);
        var hit = Math.abs(ang) < 1.5;
        out.textContent = "v  = (" + f(v[0]) + ", " + f(v[1]) + ")\nAv = (" + f(Av[0]) + ", " + f(Av[1]) + ")\n" + tx(lang, "زاویه بین v و Av", "angle between v and Av") + " = " + f(Math.abs(ang), 1) + "°\n|Av| / |v| = " + f(n) + "\n" + info +
          (hit ? "\n★ " + tx(lang, "بردار ویژه! Av = ", "Eigenvector! Av = ") + f(dp) + " v" : "");
      }
      draw();
    });

  /* ---------- Derivative: secant line becomes the tangent line ---------- */
  var FN = {
    sq: ["x²", function (x) { return x * x; }, function (x) { return 2 * x; }, -3, 3, -1, 9],
    cu: ["x³ − 3x", function (x) { return x * x * x - 3 * x; }, function (x) { return 3 * x * x - 3; }, -2.5, 2.5, -5, 5],
    sn: ["sin x", Math.sin, Math.cos, -4, 4, -1.5, 1.5],
    ex: ["eˣ", Math.exp, Math.exp, -3, 2.2, -1, 9],
    sg: ["sigmoid σ(x)", sig, function (x) { return sig(x) * (1 - sig(x)); }, -6, 6, -0.2, 1.2]
  };
  D.m_deriv = L("مشتق: شیب خط مماس", "Derivative: slope of the tangent",
    "h را کوچک کن تا خط قاطع (نارنجی) به خط مماس (بنفش) برسد.", "Shrink h so the secant line (orange) becomes the tangent line (purple).",
    function (h, lang) {
      var cv = canvas(h, 420, 320), p = panel(h), fn = "sq", x0 = 1, hh = 1;
      select(p, tx(lang, "تابع", "Function"), Object.keys(FN).map(function (k) { return [k, "f(x) = " + FN[k][0]]; }), fn, function (v) { fn = v; x0 = Math.max(FN[v][3], Math.min(FN[v][4], x0)); draw(); });
      slider(p, "x₀", -1, 1, 0.01, 0.33, function (v) { var F = FN[fn]; x0 = (F[3] + F[4]) / 2 + v * (F[4] - F[3]) / 2 * 0.9; draw(); }, function (v) { var F = FN[fn]; return f((F[3] + F[4]) / 2 + v * (F[4] - F[3]) / 2 * 0.9); });
      slider(p, "h", 0.01, 2, 0.01, hh, function (v) { hh = v; draw(); });
      var out = readout(p);
      function draw() {
        var F = FN[fn], A = axes(cv, F[3], F[4], F[5], F[6]), x = cv.x, g = F[1], y0 = g(x0), y1 = g(x0 + hh), ms = (y1 - y0) / hh, mt = F[2](x0);
        curve(cv, A, g, F[3], F[4], C.k, 2.5);
        var ln = function (m, col, w) { line(x, A.X(F[3]), A.Y(y0 + m * (F[3] - x0)), A.X(F[4]), A.Y(y0 + m * (F[4] - x0)), col, w); };
        x.save(); x.beginPath(); x.rect(30, 10, cv.w - 38, cv.h - 40); x.clip();
        ln(ms, C.b, 2); ln(mt, C.a, 2.5); x.restore();
        line(x, A.X(x0), A.Y(y0), A.X(x0 + hh), A.Y(y0), C.g, 1.2, [4, 3]); line(x, A.X(x0 + hh), A.Y(y0), A.X(x0 + hh), A.Y(y1), C.g, 1.2, [4, 3]);
        dot(x, A.X(x0), A.Y(y0), 5, C.a); dot(x, A.X(x0 + hh), A.Y(y1), 5, C.b);
        out.textContent = "x₀ = " + f(x0) + "   f(x₀) = " + f(y0, 3) + "\n" + tx(lang, "شیب قاطع", "secant slope") + " = (f(x₀+h) − f(x₀)) / h\n          = (" + f(y1, 3) + " − " + f(y0, 3) + ") / " + f(hh) + " = " + f(ms, 4) +
          "\n" + tx(lang, "مشتق دقیق", "exact derivative") + " f′(x₀) = " + f(mt, 4) + "\n" + tx(lang, "خطا", "error") + " = " + f(Math.abs(ms - mt), 4);
      }
      draw();
    });

  /* ---------- Gradient descent on a 2D surface ---------- */
  var SURF = {
    bowl: [function (x, y) { return x * x + y * y; }, function (x, y) { return [2 * x, 2 * y]; }],
    valley: [function (x, y) { return 0.5 * x * x + 5 * y * y; }, function (x, y) { return [x, 10 * y]; }],
    two: [function (x, y) { return 0.25 * Math.pow(x * x - 4, 2) + y * y + 0.6 * x; }, function (x, y) { return [x * (x * x - 4) + 0.6, 2 * y]; }],
    saddle: [function (x, y) { return x * x - y * y + 0.15 * Math.pow(y, 4); }, function (x, y) { return [2 * x, -2 * y + 0.6 * y * y * y]; }]
  };
  D.m_gd2d = L("گرادیان کاهشی روی نقشه هم‌تراز", "Gradient descent on a contour map",
    "روی نقشه کلیک کن تا نقطه شروع عوض شود. نرخ یادگیری و مومنتوم را تغییر بده و مسیر را ببین.", "Click the map to move the starting point. Change the learning rate and momentum and watch the path.",
    function (h, lang) {
      var cv = canvas(h, 400, 360), p = panel(h), sf = "valley", lr = 0.08, mo = 0, start = [-3.2, 1.6], path, vel, timer = null, R = 4;
      select(p, tx(lang, "تابع", "Function"), [["bowl", tx(lang, "کاسه گرد: x² + y²", "round bowl: x² + y²")], ["valley", tx(lang, "دره باریک: ½x² + 5y²", "narrow valley: ½x² + 5y²")], ["two", tx(lang, "دو کمینه (غیرمحدب)", "two minima (non-convex)")], ["saddle", tx(lang, "نقطه زینی", "saddle point")]], sf, function (v) { sf = v; reset(); });
      slider(p, tx(lang, "نرخ یادگیری η", "learning rate η"), 0.005, 0.25, 0.005, lr, function (v) { lr = v; reset(); });
      slider(p, tx(lang, "مومنتوم β", "momentum β"), 0, 0.95, 0.05, mo, function (v) { mo = v; reset(); });
      var r = row(p);
      button(r, tx(lang, "یک گام", "One step"), function () { step(); draw(); });
      button(r, tx(lang, "اجرا", "Run"), function () { clearInterval(timer); var n = 0; timer = setInterval(function () { step(); draw(); if (++n > 120 || !document.body.contains(cv.el)) clearInterval(timer); }, 50); });
      button(r, tx(lang, "از نو", "Reset"), function () { reset(); });
      var out = readout(p), bg = null;
      function reset() { clearInterval(timer); path = [start.slice()]; vel = [0, 0]; bg = null; draw(); }
      function step() { var q = path[path.length - 1], g = SURF[sf][1](q[0], q[1]); vel = [mo * vel[0] - lr * g[0], mo * vel[1] - lr * g[1]]; var n = [q[0] + vel[0], q[1] + vel[1]]; if (Math.abs(n[0]) > 50 || Math.abs(n[1]) > 50) return; path.push(n); }
      function draw() {
        var x = cv.x, W = cv.w, H = cv.h, X = function (u) { return (u + R) / (2 * R) * W; }, Y = function (v) { return H - (v + R * 0.9) / (2 * R * 0.9) * H; }, F = SURF[sf][0];
        if (!bg) {
          var im = x.createImageData(W * 2, H * 2), lo = 1e9, hi = -1e9, vals = new Float32Array(W * H);
          for (var j = 0; j < H; j++) for (var i = 0; i < W; i++) { var v = F(i / W * 2 * R - R, (H - j) / H * 2 * R * 0.9 - R * 0.9); vals[j * W + i] = v; if (v < lo) lo = v; if (v > hi) hi = v; }
          for (j = 0; j < H * 2; j++) for (i = 0; i < W * 2; i++) {
            var t = Math.sqrt((vals[(j >> 1) * W + (i >> 1)] - lo) / (hi - lo)), band = Math.abs((t * 14) % 1 - 0.5) < 0.06 ? 0.82 : 1, o = (j * W * 2 + i) * 4;
            im.data[o] = (245 - 150 * t) * band; im.data[o + 1] = (240 - 190 * t) * band; im.data[o + 2] = (255 - 60 * t) * band; im.data[o + 3] = 255;
          }
          bg = im;
        }
        x.putImageData(bg, 0, 0);
        x.beginPath(); path.forEach(function (q, i) { if (i) x.lineTo(X(q[0]), Y(q[1])); else x.moveTo(X(q[0]), Y(q[1])); }); x.strokeStyle = C.b; x.lineWidth = 2; x.stroke();
        path.forEach(function (q, i) { dot(x, X(q[0]), Y(q[1]), i === path.length - 1 ? 5.5 : 2.5, i === path.length - 1 ? C.r : C.b); });
        var q = path[path.length - 1], g = SURF[sf][1](q[0], q[1]);
        out.textContent = tx(lang, "گام", "step") + " " + (path.length - 1) + "\n(x, y) = (" + f(q[0], 3) + ", " + f(q[1], 3) + ")\nf = " + f(F(q[0], q[1]), 4) + "\n∇f = (" + f(g[0], 3) + ", " + f(g[1], 3) + ")\n|∇f| = " + f(Math.hypot(g[0], g[1]), 4) +
          "\n" + tx(lang, "قاعده: θ ← θ − η∇f", "rule: θ ← θ − η∇f");
      }
      cv.el.addEventListener("click", function (e) { var q = pos(cv, e); start = [q[0] / cv.w * 2 * R - R, (cv.h - q[1]) / cv.h * 2 * R * 0.9 - R * 0.9]; reset(); });
      reset();
    });

  /* ---------- Chain rule on a computation graph (one neuron) ---------- */
  D.m_chain = L("قاعده زنجیره‌ای روی گراف محاسبه", "The chain rule on a computation graph",
    "مقادیر را عوض کن. عددهای بالا رفت (forward) و عددهای نارنجی پایین، مشتق خطا نسبت به هر گره (backward) هستند.", "Change the values. Top numbers are the forward pass; orange numbers below are the derivative of the loss with respect to each node (backward pass).",
    function (h, lang) {
      var cv = canvas(h, 520, 290), p = panel(h), v = { x: 2, w: 0.5, b: -0.5, y: 1 }, S = {};
      cv.el.style.minWidth = "460px";   // on a phone the graph scrolls sideways instead of shrinking until it is unreadable
      [["x", -3, 3], ["w", -3, 3], ["b", -3, 3], ["y", 0, 1]].forEach(function (s) { S[s[0]] = slider(p, s[0], s[1], s[2], s[0] === "y" ? 1 : 0.1, v[s[0]], function (q) { v[s[0]] = q; draw(); }); });
      button(p, tx(lang, "یک گام گرادیان کاهشی (η = 0.5)", "One gradient-descent step (η = 0.5)"), function () { var g = grads(); v.w = Math.max(-3, Math.min(3, v.w - 0.5 * g.w)); v.b = Math.max(-3, Math.min(3, v.b - 0.5 * g.b)); S.w.set(f(v.w)); S.b.set(f(v.b)); draw(); });
      var out = readout(p);
      function grads() { var z = v.w * v.x + v.b, a = sig(z), Ls = (a - v.y) * (a - v.y), da = 2 * (a - v.y), dz = da * a * (1 - a); return { z: z, a: a, L: Ls, da: da, dz: dz, w: dz * v.x, b: dz, x: dz * v.w }; }
      function node(x, cx, cy, name, val, grad, col) {
        x.fillStyle = "#fff"; x.strokeStyle = col || C.a; x.lineWidth = 2; x.beginPath(); x.roundRect(cx - 44, cy - 26, 88, 52, 9); x.fill(); x.stroke();
        text(x, name, cx, cy - 8, C.k, 12, "center"); text(x, f(val, 3), cx, cy + 9, C.a, 13, "center");
        if (grad !== null) text(x, "∂L/∂ = " + f(grad, 3), cx, cy + 44, C.b, 11, "center");
      }
      function draw() {
        var x = cv.x, g = grads(); x.clearRect(0, 0, cv.w, cv.h);
        var N = { x: [55, 38], w: [55, 133], b: [55, 228], z: [200, 133], a: [335, 133], L: [465, 133] };
        [["x", "z"], ["w", "z"], ["b", "z"], ["z", "a"], ["a", "L"]].forEach(function (e) { arrow(x, N[e[0]][0] + 44, N[e[0]][1], N[e[1]][0] - 46, N[e[1]][1], "#a7a2b8", 1.5); });
        node(x, N.x[0], N.x[1], "x", v.x, g.x, C.d); node(x, N.w[0], N.w[1], "w", v.w, g.w, C.d); node(x, N.b[0], N.b[1], "b", v.b, g.b, C.d);
        node(x, N.z[0], N.z[1], "z = wx + b", g.z, g.dz); node(x, N.a[0], N.a[1], "a = σ(z)", g.a, g.da); node(x, N.L[0], N.L[1], "L = (a−y)²", g.L, 1, C.r);
        out.textContent = "∂L/∂a = 2(a − y) = " + f(g.da, 3) + "\n∂a/∂z = a(1 − a) = " + f(g.a * (1 - g.a), 3) + "\n∂z/∂w = x = " + f(v.x, 1) + "\n" +
          "∂L/∂w = " + f(g.da, 3) + " × " + f(g.a * (1 - g.a), 3) + " × " + f(v.x, 1) + " = " + f(g.w, 4) + "\n∂L/∂b = " + f(g.b, 4) + "\nL = " + f(g.L, 4);
      }
      draw();
    });

  /* ---------- Integral as the area under a curve (Riemann sum) ---------- */
  D.m_integral = L("انتگرال: مساحت زیر منحنی", "Integral: area under the curve",
    "تعداد مستطیل‌ها را زیاد کن تا مجموع مساحت آن‌ها به مقدار دقیق انتگرال برسد.", "Increase the number of rectangles until their total area reaches the exact integral.",
    function (h, lang) {
      var cv = canvas(h, 420, 300), p = panel(h), fn = "sq", n = 6, a = 0, b = 2;
      var G = { sq: ["x²", function (x) { return x * x; }, function (x) { return x * x * x / 3; }, 0, 3, 0, 9], sn: ["sin x + 1", function (x) { return Math.sin(x) + 1; }, function (x) { return -Math.cos(x) + x; }, 0, 6.28, 0, 2.2], nm: ["φ(x) " + tx(lang, "نرمال استاندارد", "standard normal"), function (x) { return Math.exp(-x * x / 2) / 2.5066; }, Phi, -4, 4, 0, 0.45] };
      select(p, tx(lang, "تابع", "Function"), Object.keys(G).map(function (k) { return [k, "f(x) = " + G[k][0]]; }), fn, function (v) { fn = v; a = G[v][3] + (G[v][4] - G[v][3]) * 0.25; b = G[v][3] + (G[v][4] - G[v][3]) * 0.75; draw(); });
      slider(p, tx(lang, "تعداد مستطیل n", "rectangles n"), 1, 80, 1, n, function (v) { n = v; draw(); });
      slider(p, tx(lang, "پهنای بازه", "interval width"), 0.1, 1, 0.01, 0.5, function (v) { var F = G[fn], m = (F[3] + F[4]) / 2, w = (F[4] - F[3]) * v / 2; a = m - w; b = m + w; draw(); }, function (v) { return f(v * 100, 0) + "%"; });
      var out = readout(p);
      function draw() {
        var F = G[fn], A = axes(cv, F[3], F[4], F[5], F[6]), x = cv.x, g = F[1], dx = (b - a) / n, s = 0;
        for (var i = 0; i < n; i++) { var u = a + (i + 0.5) * dx, y = g(u); s += y * dx; x.fillStyle = "rgba(91,52,196,.25)"; x.strokeStyle = C.a; x.lineWidth = 1; x.fillRect(A.X(a + i * dx), A.Y(y), A.X(a + (i + 1) * dx) - A.X(a + i * dx), A.Y(0) - A.Y(y)); x.strokeRect(A.X(a + i * dx), A.Y(y), A.X(a + (i + 1) * dx) - A.X(a + i * dx), A.Y(0) - A.Y(y)); }
        curve(cv, A, g, F[3], F[4], C.k, 2.5);
        var ex = F[2](b) - F[2](a);
        out.textContent = tx(lang, "بازه", "interval") + " [" + f(a) + ", " + f(b) + "]   Δx = " + f(dx, 3) + "\n" + tx(lang, "مجموع مستطیل‌ها", "sum of rectangles") + " Σ f(xᵢ)Δx = " + f(s, 5) + "\n" + tx(lang, "انتگرال دقیق", "exact integral") + " = " + f(ex, 5) + "\n" + tx(lang, "خطا", "error") + " = " + f(Math.abs(s - ex), 5);
      }
      draw();
    });

  /* ---------- Bayes' rule with a medical test ---------- */
  D.m_bayes = L("قاعده بیز با آزمایش پزشکی", "Bayes' rule with a medical test",
    "شیوع بیماری و دقت آزمایش را عوض کن. هر نقطه یک نفر از ۱۰۰۰ نفر است.", "Change how common the disease is and how accurate the test is. Each dot is one of 1000 people.",
    function (h, lang) {
      var cv = canvas(h, 400, 260), p = panel(h), pr = 1, se = 95, sp = 90;
      slider(p, tx(lang, "شیوع بیماری P(D) ٪", "prevalence P(D) %"), 0.5, 50, 0.5, pr, function (v) { pr = v; draw(); });
      slider(p, tx(lang, "حساسیت P(+|D) ٪", "sensitivity P(+|D) %"), 50, 100, 1, se, function (v) { se = v; draw(); });
      slider(p, tx(lang, "ویژگی P(−|سالم) ٪", "specificity P(−|healthy) %"), 50, 100, 1, sp, function (v) { sp = v; draw(); });
      var out = readout(p);
      key(p, tx(lang, "<b style='color:#c92a3a'>●</b> بیمار و مثبت، <b style='color:#c92a3a'>○</b> بیمار ولی منفی، <b style='color:#e8590c'>●</b> سالم ولی مثبت (مثبت کاذب)، <b style='color:#b9b4c7'>●</b> سالم و منفی.", "<b style='color:#c92a3a'>●</b> sick and positive, <b style='color:#c92a3a'>○</b> sick but negative, <b style='color:#e8590c'>●</b> healthy but positive (false positive), <b style='color:#b9b4c7'>●</b> healthy and negative."));
      function draw() {
        var x = cv.x; x.clearRect(0, 0, cv.w, cv.h);
        var nd = Math.round(10 * pr), tp = Math.round(nd * se / 100), fn = nd - tp, nh = 1000 - nd, fp = Math.round(nh * (100 - sp) / 100);
        for (var i = 0; i < 1000; i++) {
          var cx = 8 + (i % 50) * 7.8, cy = 10 + Math.floor(i / 50) * 12.4;
          if (i < tp) dot(x, cx, cy, 3, C.r);
          else if (i < nd) { x.beginPath(); x.arc(cx, cy, 2.5, 0, 7); x.strokeStyle = C.r; x.lineWidth = 1.3; x.stroke(); }
          else if (i < nd + fp) dot(x, cx, cy, 3, C.b);
          else dot(x, cx, cy, 2.2, "#cfcbdb");
        }
        var post = tp / ((tp + fp) || 1), pd = pr / 100, exact = (se / 100 * pd) / (se / 100 * pd + (1 - sp / 100) * (1 - pd));
        out.textContent = tx(lang, "از ۱۰۰۰ نفر:", "Out of 1000 people:") + "\n" + tx(lang, " بیمار", " sick") + " = " + nd + "  →  TP = " + tp + ", FN = " + fn + "\n" + tx(lang, " سالم", " healthy") + " = " + nh + "  →  FP = " + fp + ", TN = " + (nh - fp) +
          "\n" + tx(lang, "مثبت‌ها", "positives") + " = " + tp + " + " + fp + " = " + (tp + fp) + "\nP(D | +) = " + tp + " / " + (tp + fp) + " = " + f(post * 100, 1) + "%\n" + tx(lang, "با فرمول بیز", "by Bayes' formula") + " = " + f(exact * 100, 1) + "%";
      }
      draw();
    });

  /* ---------- Normal distribution and probabilities as areas ---------- */
  D.m_normal = L("توزیع نرمال و احتمال به‌صورت مساحت", "The normal distribution: probability as area",
    "میانگین و انحراف معیار را عوض کن. مساحت بنفش احتمال قرار گرفتن X بین a و b است.", "Change the mean and standard deviation. The purple area is the probability that X falls between a and b.",
    function (h, lang) {
      var cv = canvas(h, 420, 290), p = panel(h), mu = 0, sd = 1, a = -1, b = 1;
      slider(p, "μ", -3, 3, 0.1, mu, function (v) { mu = v; draw(); }); slider(p, "σ", 0.3, 3, 0.05, sd, function (v) { sd = v; draw(); });
      slider(p, "a", -6, 6, 0.1, a, function (v) { a = v; draw(); }); slider(p, "b", -6, 6, 0.1, b, function (v) { b = v; draw(); });
      var r = row(p);
      [1, 2, 3].forEach(function (k) { button(r, "μ ± " + k + "σ", function () { a = mu - k * sd; b = mu + k * sd; draw(); }); });
      var out = readout(p);
      function draw() {
        var A = axes(cv, -6, 6, 0, Math.max(0.45, 0.44 / sd)), x = cv.x, pdf = function (u) { return Math.exp(-0.5 * Math.pow((u - mu) / sd, 2)) / (sd * 2.5066); };
        var lo = Math.min(a, b), hi = Math.max(a, b);
        x.beginPath(); x.moveTo(A.X(lo), A.Y(0)); for (var i = 0; i <= 100; i++) { var u = lo + (hi - lo) * i / 100; x.lineTo(A.X(u), A.Y(pdf(u))); } x.lineTo(A.X(hi), A.Y(0)); x.closePath(); x.fillStyle = "rgba(91,52,196,.35)"; x.fill();
        curve(cv, A, pdf, -6, 6, C.k, 2.5); line(x, A.X(mu), A.Y(0), A.X(mu), A.Y(pdf(mu)), C.b, 1.5, [4, 3]);
        var za = (lo - mu) / sd, zb = (hi - mu) / sd, pr = Phi(zb) - Phi(za);
        out.textContent = "X ~ N(μ = " + f(mu, 1) + ", σ² = " + f(sd * sd) + ")\nz = (x − μ) / σ\nz(a) = " + f(za) + "   z(b) = " + f(zb) + "\nP(" + f(lo, 1) + " < X < " + f(hi, 1) + ") = Φ(" + f(zb) + ") − Φ(" + f(za) + ")\n                = " + f(pr, 4) + " = " + f(pr * 100, 1) + "%";
      }
      draw();
    });

  /* ---------- Central limit theorem ---------- */
  D.m_clt = L("قضیه حد مرکزی", "The central limit theorem",
    "یک توزیع انتخاب کن و اندازه نمونه n را عوض کن. هیستوگرام، توزیع میانگین نمونه‌هاست.", "Pick a distribution and change the sample size n. The histogram is the distribution of the sample means.",
    function (h, lang) {
      var cv = canvas(h, 420, 320), p = panel(h), ds = "exp", n = 2, rnd = seeded(7);
      var DS = {
        uni: [tx(lang, "یکنواخت [0,1]", "uniform [0,1]"), function () { return rnd(); }, 0.5, Math.sqrt(1 / 12), 0, 1],
        exp: [tx(lang, "نمایی (چوله)", "exponential (skewed)"), function () { return Math.min(5, -Math.log(1 - rnd())); }, 1, 1, 0, 5],
        bi: [tx(lang, "دوقله‌ای", "two peaks"), function () { return (rnd() < 0.5 ? 1 : 4) + 0.4 * gauss(rnd); }, 2.5, Math.sqrt(1.5 * 1.5 + 0.16), 0, 5],
        die: [tx(lang, "تاس", "a die"), function () { return 1 + Math.floor(rnd() * 6); }, 3.5, Math.sqrt(35 / 12), 0.5, 6.5]
      };
      select(p, tx(lang, "توزیع جامعه", "Population"), Object.keys(DS).map(function (k) { return [k, DS[k][0]]; }), ds, function (v) { ds = v; draw(); });
      slider(p, tx(lang, "اندازه هر نمونه n", "size of each sample n"), 1, 60, 1, n, function (v) { n = v; draw(); });
      button(p, tx(lang, "نمونه‌گیری دوباره", "Sample again"), function () { draw(); });
      var out = readout(p);
      key(p, tx(lang, "بالا: شکل خود جامعه. پایین: هیستوگرام ۳۰۰۰ میانگین نمونه و منحنی نرمال N(μ, σ²/n).", "Top: the population itself. Bottom: histogram of 3000 sample means with the normal curve N(μ, σ²/n)."));
      function hist(vals, lo, hi, nb) { var c = new Array(nb).fill(0); vals.forEach(function (v) { var i = Math.floor((v - lo) / (hi - lo) * nb); if (i >= 0 && i < nb) c[i]++; }); return c; }
      function draw() {
        var x = cv.x, D0 = DS[ds], W = cv.w; x.clearRect(0, 0, W, cv.h);
        var pop = [], means = [], i, j;
        for (i = 0; i < 4000; i++) pop.push(D0[1]());
        for (i = 0; i < 3000; i++) { var s = 0; for (j = 0; j < n; j++) s += D0[1](); means.push(s / n); }
        var lo = D0[4], hi = D0[5], nb = 48, bw = (W - 40) / nb, X = function (u) { return 30 + (u - lo) / (hi - lo) * (W - 40); };
        var hp = hist(pop, lo, hi, nb), mp = Math.max.apply(null, hp);
        hp.forEach(function (c, k) { x.fillStyle = "#c9c4d6"; x.fillRect(30 + k * bw, 95 - c / mp * 80, bw - 1, c / mp * 80); });
        text(x, tx(lang, "جامعه", "population"), 34, 22, "#7d788c", 11);
        var hm = hist(means, lo, hi, nb), mm = Math.max.apply(null, hm);
        hm.forEach(function (c, k) { x.fillStyle = "rgba(91,52,196,.55)"; x.fillRect(30 + k * bw, 290 - c / mm * 170, bw - 1, c / mm * 170); });
        line(x, 30, 95, W - 10, 95, "#a7a2b8"); line(x, 30, 290, W - 10, 290, "#a7a2b8");
        for (i = 0; i <= 5; i++) text(x, f(lo + (hi - lo) * i / 5, 1), X(lo + (hi - lo) * i / 5), 304, "#7d788c", 10, "center");
        var se = D0[3] / Math.sqrt(n), peak = 3000 * (hi - lo) / nb / (se * 2.5066);
        x.beginPath(); for (i = 0; i <= 200; i++) { var u = lo + (hi - lo) * i / 200, y = 3000 * (hi - lo) / nb * Math.exp(-0.5 * Math.pow((u - D0[2]) / se, 2)) / (se * 2.5066); var py = 290 - Math.min(y, mm * 1.2) / mm * 170; if (i) x.lineTo(X(u), py); else x.moveTo(X(u), py); } x.strokeStyle = C.b; x.lineWidth = 2.2; x.stroke();
        text(x, tx(lang, "میانگین نمونه‌ها", "sample means") + "  n = " + n, 34, 118, C.a, 11);
        var m = means.reduce(function (q, v) { return q + v; }, 0) / means.length, sdm = Math.sqrt(means.reduce(function (q, v) { return q + (v - m) * (v - m); }, 0) / means.length);
        out.textContent = tx(lang, "جامعه", "population") + ": μ = " + f(D0[2]) + ", σ = " + f(D0[3], 3) + "\n" + tx(lang, "میانگینِ میانگین‌ها", "mean of the means") + " = " + f(m, 3) + "\n" + tx(lang, "انحراف معیار میانگین‌ها", "std of the means") + " = " + f(sdm, 3) + "\nσ / √n = " + f(D0[3], 3) + " / √" + n + " = " + f(se, 3);
      }
      draw();
    });

  /* ---------- Covariance and correlation ---------- */
  D.m_corr = L("کوواریانس و همبستگی", "Covariance and correlation",
    "ضریب همبستگی هدف را عوض کن یا روی صفحه کلیک کن تا نقطه اضافه شود (مثلاً یک داده پرت).", "Change the target correlation, or click the plot to add a point (an outlier, for example).",
    function (h, lang) {
      var cv = canvas(h, 380, 340), p = panel(h), rho = 0.7, pts = [], extra = [];
      slider(p, tx(lang, "همبستگی هدف ρ", "target correlation ρ"), -1, 1, 0.05, rho, function (v) { rho = v; extra = []; gen(); draw(); });
      button(p, tx(lang, "پاک کردن نقطه‌های اضافه", "Remove added points"), function () { extra = []; draw(); });
      var out = readout(p);
      function gen() { var r = seeded(11); pts = []; for (var i = 0; i < 60; i++) { var a = gauss(r), b = gauss(r); pts.push([a, rho * a + Math.sqrt(1 - rho * rho) * b]); } }
      function draw() {
        var A = axes(cv, -4, 4, -4, 4), x = cv.x, all = pts.concat(extra), n = all.length;
        var mx = all.reduce(function (s, q) { return s + q[0]; }, 0) / n, my = all.reduce(function (s, q) { return s + q[1]; }, 0) / n, sxy = 0, sxx = 0, syy = 0;
        all.forEach(function (q) { sxy += (q[0] - mx) * (q[1] - my); sxx += (q[0] - mx) * (q[0] - mx); syy += (q[1] - my) * (q[1] - my); });
        var cov = sxy / (n - 1), sx = Math.sqrt(sxx / (n - 1)), sy = Math.sqrt(syy / (n - 1)), r = cov / (sx * sy), m = sxy / sxx;
        line(x, A.X(mx), A.Y(-4), A.X(mx), A.Y(4), C.g, 1, [4, 3]); line(x, A.X(-4), A.Y(my), A.X(4), A.Y(my), C.g, 1, [4, 3]);
        line(x, A.X(-4), A.Y(my + m * (-4 - mx)), A.X(4), A.Y(my + m * (4 - mx)), C.b, 2);
        pts.forEach(function (q) { dot(x, A.X(q[0]), A.Y(q[1]), 3.5, (q[0] - mx) * (q[1] - my) >= 0 ? C.a : C.d); });
        extra.forEach(function (q) { dot(x, A.X(q[0]), A.Y(q[1]), 5, C.r); });
        out.textContent = "n = " + n + "\nx̄ = " + f(mx) + "   ȳ = " + f(my) + "\ns_x = " + f(sx) + "   s_y = " + f(sy) + "\ncov(x, y) = " + f(cov, 3) + "\nr = cov / (s_x s_y) = " + f(r, 3) + "\n" + tx(lang, "شیب خط", "line slope") + " = " + f(m, 3);
      }
      cv.el.addEventListener("click", function (e) { var q = pos(cv, e), A = axes(cv, -4, 4, -4, 4); extra.push([A.ux(q[0]), -4 + (cv.h - 30 - q[1]) / (cv.h - 40) * 8]); draw(); });
      gen(); draw();
    });

  /* ---------- Entropy, cross-entropy and KL divergence ---------- */
  D.m_entropy = L("آنتروپی، آنتروپی متقاطع و KL", "Entropy, cross-entropy and KL divergence",
    "p توزیع واقعی و q پیش‌بینی مدل است. هر چه q به p نزدیک‌تر شود، آنتروپی متقاطع کمتر می‌شود.", "p is the true distribution and q is the model's prediction. The closer q gets to p, the lower the cross-entropy.",
    function (h, lang) {
      var cv = canvas(h, 400, 280), p = panel(h), P = [1, 0, 0], Q = [5, 3, 2], SP = [], SQ = [];
      select(p, tx(lang, "توزیع واقعی p", "True distribution p"), [["1,0,0", tx(lang, "برچسب قطعی (one-hot)", "certain label (one-hot)")], ["1,1,1", tx(lang, "یکنواخت", "uniform")], ["6,3,1", "0.6, 0.3, 0.1"], ["1,1,0", "0.5, 0.5, 0"]], "1,0,0", function (v) { P = v.split(",").map(Number); draw(); });
      ["A", "B", "C"].forEach(function (n, i) { SQ.push(slider(p, tx(lang, "وزن q برای کلاس ", "weight of q for class ") + n, 0.01, 10, 0.01, Q[i], function (v) { Q[i] = v; draw(); })); });
      button(p, tx(lang, "q را برابر p کن", "Set q equal to p"), function () { Q = P.map(function (v) { return Math.max(0.01, v); }); SQ.forEach(function (s, i) { s.set(Q[i]); }); draw(); });
      var out = readout(p);
      function nrm(a) { var s = a.reduce(function (q, v) { return q + v; }, 0); return a.map(function (v) { return v / s; }); }
      function draw() {
        var x = cv.x; x.clearRect(0, 0, cv.w, cv.h);
        var pp = nrm(P), qq = nrm(Q), Hp = 0, Hpq = 0;
        pp.forEach(function (v, i) { if (v > 0) { Hp -= v * Math.log2(v); Hpq -= v * Math.log2(qq[i]); } });
        text(x, "p (" + tx(lang, "واقعی", "true") + ")", 100, 20, C.a, 12, "center"); text(x, "q (" + tx(lang, "مدل", "model") + ")", 300, 20, C.b, 12, "center");
        bars(cv, 15, 35, 170, 200, pp, [C.a], ["A", "B", "C"], 1); bars(cv, 215, 35, 170, 200, qq, [C.b], ["A", "B", "C"], 1);
        out.textContent = "p = (" + pp.map(function (v) { return f(v); }).join(", ") + ")\nq = (" + qq.map(function (v) { return f(v); }).join(", ") + ")\nH(p) = −Σ p log₂ p = " + f(Hp, 3) + " bit\nH(p, q) = −Σ p log₂ q = " + f(Hpq, 3) + " bit\nKL(p‖q) = H(p,q) − H(p) = " + f(Hpq - Hp, 3) + " bit";
      }
      draw();
    });

  /* ---------- Softmax ---------- */
  D.m_softmax = L("Softmax: از نمره به احتمال", "Softmax: from scores to probabilities",
    "نمره (logit) هر کلاس و دما را عوض کن. جمع احتمال‌ها همیشه ۱ است.", "Change each class score (logit) and the temperature. The probabilities always sum to 1.",
    function (h, lang) {
      var cv = canvas(h, 400, 280), p = panel(h), Z = [2, 1, 0.1], Tm = 1;
      ["z₁", "z₂", "z₃"].forEach(function (n, i) { slider(p, n, -5, 5, 0.1, Z[i], function (v) { Z[i] = v; draw(); }); });
      slider(p, tx(lang, "دما T", "temperature T"), 0.1, 5, 0.1, Tm, function (v) { Tm = v; draw(); });
      var out = readout(p);
      function draw() {
        var x = cv.x; x.clearRect(0, 0, cv.w, cv.h);
        var e = Z.map(function (z) { return Math.exp(z / Tm); }), s = e[0] + e[1] + e[2], pr = e.map(function (v) { return v / s; });
        text(x, tx(lang, "نمره‌ها z", "scores z"), 100, 20, C.d, 12, "center"); text(x, "softmax(z / T)", 300, 20, C.a, 12, "center");
        var x0 = 15, w = 170, bw = w / 3, mid = 135;
        line(x, x0, mid, x0 + w, mid, "#a7a2b8", 1.2);
        Z.forEach(function (z, i) { var bh = z / 5 * 95; x.fillStyle = C.d; x.fillRect(x0 + i * bw + bw * 0.18, bh >= 0 ? mid - bh : mid, bw * 0.64, Math.abs(bh)); text(x, f(z, 1), x0 + i * bw + bw / 2, bh >= 0 ? mid - bh - 5 : mid - bh + 14, C.k, 11, "center"); text(x, "z" + (i + 1), x0 + i * bw + bw / 2, 250, "#7d788c", 11, "center"); });
        bars(cv, 215, 35, 170, 200, pr, [C.a], ["p₁", "p₂", "p₃"], 1);
        out.textContent = "e^(z/T) = (" + e.map(function (v) { return f(v, 3); }).join(", ") + ")\n" + tx(lang, "جمع", "sum") + " = " + f(s, 3) + "\np = (" + pr.map(function (v) { return f(v, 3); }).join(", ") + ")\nΣp = " + f(pr[0] + pr[1] + pr[2], 3) + "\n" +
          (Tm < 0.5 ? tx(lang, "دمای کم: تقریباً فقط بزرگ‌ترین (argmax).", "low T: almost only the largest (argmax).") : Tm > 3 ? tx(lang, "دمای زیاد: تقریباً یکنواخت.", "high T: almost uniform.") : "");
      }
      draw();
    });

  /* ---------- Maximum likelihood for a coin ---------- */
  D.m_mle = L("بیشینه درست‌نمایی برای سکه", "Maximum likelihood for a coin",
    "تعداد شیرها را مشخص کن و θ را حرکت بده تا منحنی درست‌نمایی به قله برسد.", "Set the number of heads, then move θ until the likelihood curve reaches its peak.",
    function (h, lang) {
      var cv = canvas(h, 420, 300), p = panel(h), n = 10, k = 7, th = 0.4, SK;
      slider(p, tx(lang, "تعداد پرتاب n", "tosses n"), 1, 50, 1, n, function (v) { n = v; if (k > n) { k = n; SK.set(k); } draw(); });
      SK = slider(p, tx(lang, "تعداد شیر k", "heads k"), 0, 50, 1, k, function (v) { k = Math.min(v, n); SK.set(k); draw(); });
      slider(p, "θ = P(" + tx(lang, "شیر", "heads") + ")", 0.01, 0.99, 0.01, th, function (v) { th = v; draw(); });
      var out = readout(p);
      key(p, tx(lang, "منحنی بنفش L(θ) (مقیاس‌شده) و منحنی سبزآبی log L(θ). خط‌چین نارنجی برآورد بیشینه درست‌نمایی k/n است.", "Purple: L(θ) (rescaled). Teal: log L(θ). The orange dashed line is the maximum-likelihood estimate k/n."));
      function draw() {
        var A = axes(cv, 0, 1, 0, 1.1), x = cv.x, ll = function (t) { return k * Math.log(t) + (n - k) * Math.log(1 - t); };
        var hat = k / n, th0 = Math.min(0.999, Math.max(0.001, hat)), top = ll(th0), lo = Math.min(ll(0.02), ll(0.98), top - 1);
        curve(cv, A, function (t) { t = Math.min(0.999, Math.max(0.001, t)); return Math.exp(ll(t) - top); }, 0, 1, C.a, 2.5);
        curve(cv, A, function (t) { t = Math.min(0.995, Math.max(0.005, t)); return Math.max(0, (ll(t) - lo) / (top - lo)); }, 0, 1, C.d, 1.8, [5, 3]);
        line(x, A.X(hat), A.Y(0), A.X(hat), A.Y(1.05), C.b, 1.5, [5, 4]);
        dot(x, A.X(th), A.Y(Math.exp(ll(th) - top)), 5.5, C.r);
        out.textContent = tx(lang, "داده", "data") + ": " + k + " " + tx(lang, "شیر از", "heads in") + " " + n + "\nL(θ) = θ^" + k + " (1−θ)^" + (n - k) + "\nθ = " + f(th) + ":  L = " + Math.exp(ll(th)).toExponential(3) + "\n          log L = " + f(ll(th), 3) + "\nθ̂ = k / n = " + f(hat, 3) + ":  log L = " + f(top, 3);
      }
      draw();
    });

  Object.assign(window.Demos, D);
})();
