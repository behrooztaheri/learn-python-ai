/* Interactive labs in plain JavaScript and canvas. Each lab has a title, a help line and mount(host, lang). */
window.Demos = (function () {
  var C = { a: "#5b34c4", b: "#e8590c", c: "#16834f", d: "#1f6f8b", g: "#b9b4c7", k: "#2b2440", la: "rgba(91,52,196,.16)", lb: "rgba(232,89,12,.16)" };
  function canvas(host, w, h) {
    var c = document.createElement("canvas"); c.width = w * 2; c.height = h * 2; c.style.width = w + "px"; c.style.aspectRatio = w + "/" + h;
    var x = c.getContext("2d"); x.scale(2, 2); host.appendChild(c); return { el: c, x: x, w: w, h: h };
  }
  function panel(host) { var d = document.createElement("div"); d.className = "ctl"; host.appendChild(d); return d; }
  function slider(p, label, min, max, step, val, fn) {
    var l = document.createElement("label"); var s = document.createElement("span"); var i = document.createElement("input");
    i.type = "range"; i.min = min; i.max = max; i.step = step; i.value = val;
    function up() { s.textContent = label + " = " + (+i.value); fn(+i.value); }
    i.oninput = up; l.appendChild(s); l.appendChild(i); p.appendChild(l); s.textContent = label + " = " + val; return i;
  }
  function button(p, label, fn) { var b = document.createElement("button"); b.textContent = label; b.onclick = fn; p.appendChild(b); return b; }
  function readout(p) { var r = document.createElement("div"); r.className = "readout"; p.appendChild(r); return r; }
  function pos(c, e) { var r = c.el.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * c.w, (e.clientY - r.top) / r.height * c.h]; }
  function dot(x, a, b, r, col) { x.fillStyle = col; x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); }
  function clear(c) { c.x.clearRect(0, 0, c.w, c.h); }
  function seeded(s) { return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function gauss(r) { return Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(6.2832 * r()); }
  function f(v, d) { return (+v).toFixed(d === undefined ? 3 : d); }
  function tx(lang, fa, en) { return lang === "fa" ? fa : en; }

  // Solve a small linear system by Gaussian elimination.
  function solve(A, b) {
    var n = A.length, M = A.map(function (r, i) { return r.concat([b[i]]); });
    for (var i = 0; i < n; i++) {
      var p = i; for (var j = i + 1; j < n; j++) if (Math.abs(M[j][i]) > Math.abs(M[p][i])) p = j;
      var t = M[i]; M[i] = M[p]; M[p] = t;
      var d = M[i][i] || 1e-12;
      for (j = i; j <= n; j++) M[i][j] /= d;
      for (var k = 0; k < n; k++) if (k !== i) { var c = M[k][i]; for (j = i; j <= n; j++) M[k][j] -= c * M[i][j]; }
    }
    return M.map(function (r) { return r[n]; });
  }

  return {
    slice: { title: { fa: "برش لیست", en: "List slicing" }, help: { fa: "با اسلایدرها ببین [start:stop:step] کدام خانه‌ها را انتخاب می‌کند.", en: "Use the sliders to see which cells [start:stop:step] selects." },
      mount: function (h, lang) {
        var L = ["P", "Y", "T", "H", "O", "N", "!", "3"], c = canvas(h, 460, 120), p = panel(h), st = 0, sp = 6, se = 1, r;
        function draw() {
          clear(c); var x = c.x; var picked = []; for (var i = st; se > 0 ? i < sp : i > sp; i += se) if (i >= 0 && i < L.length) picked.push(i);
          L.forEach(function (ch, i) { x.fillStyle = picked.indexOf(i) >= 0 ? C.b : "#eee9f6"; x.fillRect(18 + i * 54, 34, 48, 48); x.fillStyle = picked.indexOf(i) >= 0 ? "#fff" : C.k; x.font = "700 21px monospace"; x.textAlign = "center"; x.fillText(ch, 42 + i * 54, 66); x.fillStyle = "#777"; x.font = "12px monospace"; x.fillText(i, 42 + i * 54, 24); x.fillText(i - 8, 42 + i * 54, 100); });
          r.textContent = 's[' + st + ":" + sp + ":" + se + '] = "' + picked.map(function (i) { return L[i]; }).join("") + '"';
        }
        slider(p, "start", 0, 7, 1, st, function (v) { st = v; draw(); }); slider(p, "stop", 0, 8, 1, sp, function (v) { sp = v; draw(); }); slider(p, "step", 1, 4, 1, se, function (v) { se = v; draw(); });
        r = readout(p); draw();
      } },

    linreg: { title: { fa: "برازش خط", en: "Fitting a line" }, help: { fa: "روی بوم کلیک کن تا نقطه اضافه شود.", en: "Click the canvas to add points." },
      mount: function (h, lang) {
        var c = canvas(h, 460, 320), p = panel(h), r = seeded(5), pts = [], res;
        for (var i = 0; i < 14; i++) { var a = 40 + r() * 380; pts.push([a, 270 - a * 0.48 + gauss(r) * 18]); }
        function draw() {
          clear(c); var n = pts.length, sx = 0, sy = 0, sxx = 0, sxy = 0;
          pts.forEach(function (q) { sx += q[0]; sy += q[1]; sxx += q[0] * q[0]; sxy += q[0] * q[1]; });
          var den = n * sxx - sx * sx, b = den ? (n * sxy - sx * sy) / den : 0, a0 = (sy - b * sx) / (n || 1), ym = sy / (n || 1), sr = 0, st = 0;
          pts.forEach(function (q) { var e = q[1] - (a0 + b * q[0]); sr += e * e; st += (q[1] - ym) * (q[1] - ym); c.x.strokeStyle = C.b; c.x.beginPath(); c.x.moveTo(q[0], q[1]); c.x.lineTo(q[0], a0 + b * q[0]); c.x.stroke(); });
          c.x.strokeStyle = C.a; c.x.lineWidth = 3; c.x.beginPath(); c.x.moveTo(0, a0); c.x.lineTo(c.w, a0 + b * c.w); c.x.stroke(); c.x.lineWidth = 1;
          pts.forEach(function (q) { dot(c.x, q[0], q[1], 5, C.d); });
          res.textContent = "n = " + n + "\nRMSE = " + f(Math.sqrt(sr / (n || 1)), 2) + "\nR2 = " + f(st ? 1 - sr / st : 0);
        }
        c.el.onclick = function (e) { pts.push(pos(c, e)); draw(); };
        res = readout(p); button(p, tx(lang, "پاک کردن نقطه‌ها", "Clear points"), function () { pts = []; draw(); }); draw();
      } },

    gd: { title: { fa: "گرادیان کاهشی", en: "Gradient descent" }, help: { fa: "نرخ یادگیری را تغییر بده و گام بزن. بیش از ۱ روی این تابع واگرا می‌شود.", en: "Change the learning rate and step. Above 1 it diverges on this function." },
      mount: function (h, lang) {
        var c = canvas(h, 460, 300), p = panel(h), lr = 0.1, x = -4, path = [x], t = null, res;
        var X = function (v) { return 230 + v * 42; }, Y = function (v) { return 280 - v * v * 10.5; };
        function draw() {
          clear(c); c.x.strokeStyle = C.g; c.x.lineWidth = 2; c.x.beginPath(); for (var v = -5.4; v <= 5.4; v += .05) { c.x.lineTo(X(v), Y(v)); } c.x.stroke(); c.x.lineWidth = 1.5;
          c.x.strokeStyle = C.b; c.x.beginPath(); path.forEach(function (q) { var a = Math.max(-5.4, Math.min(5.4, q)); c.x.lineTo(X(a), Y(a)); }); c.x.stroke();
          path.forEach(function (q) { var a = Math.max(-5.4, Math.min(5.4, q)); dot(c.x, X(a), Y(a), 4, C.a); });
          res.textContent = "J(x) = x^2\nstep = " + (path.length - 1) + "\nx = " + f(x) + "\nJ = " + f(x * x);
        }
        function step() { x = x - lr * 2 * x; path.push(x); if (Math.abs(x) > 1e4 || path.length > 80) stop(); draw(); }
        function stop() { clearInterval(t); t = null; }
        slider(p, "learning rate", 0.01, 1.1, 0.01, lr, function (v) { lr = v; reset(); });
        function reset() { stop(); x = -4; path = [x]; draw(); }
        var row = document.createElement("div"); row.className = "row"; p.appendChild(row);
        button(row, tx(lang, "یک گام", "One step"), step);
        button(row, tx(lang, "اجرا", "Run"), function () { if (!t) t = setInterval(step, 220); });
        button(row, tx(lang, "از نو", "Reset"), reset);
        res = readout(p); draw();
      } },

    poly: { title: { fa: "درجه مدل", en: "Model degree" }, help: { fa: "نقاط بنفش آموزش و نارنجی آزمون هستند.", en: "Purple points are training data, orange points are test data." },
      mount: function (h, lang) {
        var c = canvas(h, 460, 300), p = panel(h), r = seeded(11), d = 3, res, tr = [], te = [];
        for (var i = 0; i < 18; i++) { var a = (i + .5) / 18; tr.push([a, Math.sin(6.28 * a) + gauss(r) * .22]); } for (i = 0; i < 40; i++) { a = (i + .5) / 40; te.push([a, Math.sin(6.28 * a) + gauss(r) * .22]); }
        // Legendre-like scaled basis keeps the normal equations well-behaved.
        function bas(x, n) { var z = 2 * x - 1, o = [1, z]; for (var k = 2; k <= n; k++) o.push(((2 * k - 1) * z * o[k - 1] - (k - 1) * o[k - 2]) / k); return o.slice(0, n + 1); }
        function draw() {
          var n = d + 1, A = [], b = [], w, i, j;
          for (i = 0; i < n; i++) { A.push(new Array(n).fill(0)); b.push(0); A[i][i] = 1e-9; }
          tr.forEach(function (q) { var v = bas(q[0], d); for (i = 0; i < n; i++) { b[i] += v[i] * q[1]; for (j = 0; j < n; j++) A[i][j] += v[i] * v[j]; } });
          w = solve(A, b);
          var pr = function (x) { return bas(x, d).reduce(function (s, v, k) { return s + v * w[k]; }, 0); };
          var X = function (v) { return 14 + v * 432; }, Y = function (v) { return 150 - v * 62; };
          clear(c); c.x.strokeStyle = C.g; c.x.setLineDash([5, 5]); c.x.beginPath(); for (var x = 0; x <= 1; x += .01) c.x.lineTo(X(x), Y(Math.sin(6.28 * x))); c.x.stroke(); c.x.setLineDash([]);
          c.x.save(); c.x.beginPath(); c.x.rect(0, 0, c.w, c.h); c.x.clip(); c.x.strokeStyle = C.c; c.x.lineWidth = 3; c.x.beginPath(); for (x = 0; x <= 1; x += .002) c.x.lineTo(X(x), Math.max(-50, Math.min(350, Y(pr(x))))); c.x.stroke(); c.x.restore(); c.x.lineWidth = 1;
          te.forEach(function (q) { dot(c.x, X(q[0]), Y(q[1]), 3, C.b); }); tr.forEach(function (q) { dot(c.x, X(q[0]), Y(q[1]), 5, C.a); });
          var e = function (S) { return Math.sqrt(S.reduce(function (s, q) { var u = pr(q[0]) - q[1]; return s + u * u; }, 0) / S.length); };
          res.textContent = "degree = " + d + "\ntrain RMSE = " + f(e(tr)) + "\ntest RMSE  = " + f(e(te));
        }
        slider(p, tx(lang, "درجه", "degree"), 1, 16, 1, d, function (v) { d = v; draw(); }); res = readout(p); draw();
      } },

    confusion: { title: { fa: "ماتریس اغتشاش", en: "Confusion matrix" }, help: { fa: "مقدارها را تغییر بده.", en: "Change the values." },
      mount: function (h, lang) {
        var p = panel(h), v = { TP: 45, FP: 5, FN: 8, TN: 42 }, r;
        function up() { var t = v.TP + v.FP + v.FN + v.TN, a = (v.TP + v.TN) / (t || 1), pr = v.TP / ((v.TP + v.FP) || 1), re = v.TP / ((v.TP + v.FN) || 1), f1 = 2 * pr * re / ((pr + re) || 1); r.textContent = "Accuracy  = " + f(a) + "\nPrecision = " + f(pr) + "\nRecall    = " + f(re) + "\nF1        = " + f(f1); }
        Object.keys(v).forEach(function (k) { slider(p, k, 0, k === "TN" ? 950 : 100, 1, v[k], function (x) { v[k] = x; up(); }); });
        var q = panel(h); r = readout(q); button(q, tx(lang, "داده نامتوازن", "Imbalanced data"), function () { var ins = p.querySelectorAll("input"); [0, 0, 50, 950].forEach(function (x, i) { ins[i].value = x; ins[i].oninput(); }); }); up();
      } },

    curse: { title: { fa: "نفرین ابعاد", en: "Curse of dimensionality" }, help: { fa: "بعد را زیاد کن: دورترین و نزدیک‌ترین فاصله به هم نزدیک می‌شوند.", en: "Raise the dimension: nearest and farthest distances approach each other." },
      mount: function (h, lang) {
        var c = canvas(h, 460, 220), p = panel(h), d = 2, res;
        function draw() {
          var r = seeded(3 + d), q = [], i, j, D = [], n = 400; for (j = 0; j < d; j++) q.push(r());
          for (i = 0; i < n; i++) { var s = 0; for (j = 0; j < d; j++) { var u = r() - q[j]; s += u * u; } D.push(Math.sqrt(s)); }
          var mn = Math.min.apply(null, D), mx = Math.max.apply(null, D); clear(c);
          var bins = new Array(46).fill(0); D.forEach(function (v) { bins[Math.min(45, Math.floor(v / mx * 46))]++; });
          var m = Math.max.apply(null, bins); c.x.fillStyle = C.a; bins.forEach(function (b, i) { c.x.fillRect(i * 10, 210 - b / m * 196, 8, b / m * 196); });
          res.textContent = "dimensions = " + d + "\nmin = " + f(mn) + "\nmax = " + f(mx) + "\n(max-min)/min = " + f((mx - mn) / mn) + "\n" + tx(lang, "محور افقی: فاصله تقسیم بر بیشینه", "x axis: distance / max");
        }
        slider(p, tx(lang, "تعداد بعد", "dimensions"), 1, 1000, 1, d, function (v) { d = v; draw(); }); res = readout(p); draw();
      } },

    sigmoid: { title: { fa: "تابع سیگموید", en: "Sigmoid function" }, help: { fa: "وزن و عرض از مبدأ را تغییر بده.", en: "Change the weight and the intercept." },
      mount: function (h, lang) {
        var c = canvas(h, 460, 260), p = panel(h), w = 1, b = 0, x0 = 2, r;
        var X = function (v) { return 230 + v * 28; }, Y = function (v) { return 235 - v * 210; };
        function draw() { var s = function (v) { return 1 / (1 + Math.exp(-(w * v + b))); }; clear(c); c.x.strokeStyle = C.g; c.x.setLineDash([4, 4]); c.x.beginPath(); c.x.moveTo(0, Y(.5)); c.x.lineTo(460, Y(.5)); c.x.stroke(); c.x.setLineDash([]); c.x.strokeStyle = C.a; c.x.lineWidth = 3; c.x.beginPath(); for (var v = -8; v <= 8; v += .05) c.x.lineTo(X(v), Y(s(v))); c.x.stroke(); c.x.lineWidth = 1; dot(c.x, X(x0), Y(s(x0)), 7, C.b); r.textContent = "P(y=1 | x=" + x0 + ") = " + f(s(x0)) + "\n" + tx(lang, "تصمیم: کلاس ", "decision: class ") + (s(x0) >= .5 ? 1 : 0); }
        slider(p, "w", -4, 4, .1, w, function (v) { w = v; draw(); }); slider(p, "b", -6, 6, .1, b, function (v) { b = v; draw(); }); slider(p, "x", -8, 8, .5, x0, function (v) { x0 = v; draw(); }); r = readout(p); draw();
      } },

    knn: { title: { fa: "KNN", en: "KNN" }, help: { fa: "روی بوم کلیک کن تا نقطه جدید طبقه‌بندی شود.", en: "Click the canvas to classify a new point." },
      mount: function (h, lang) {
        var c = canvas(h, 420, 320), p = panel(h), r = seeded(9), k = 5, q = [210, 160], pts = [], res, i;
        for (i = 0; i < 40; i++) pts.push([130 + gauss(r) * 62, 110 + gauss(r) * 60, 0]); for (i = 0; i < 40; i++) pts.push([290 + gauss(r) * 62, 210 + gauss(r) * 60, 1]);
        function vote(a, b) { var D = pts.map(function (s) { return [(s[0] - a) * (s[0] - a) + (s[1] - b) * (s[1] - b), s]; }).sort(function (u, v) { return u[0] - v[0]; }).slice(0, k); var o = D.filter(function (x) { return x[1][2]; }).length; return { D: D, cls: o * 2 > k ? 1 : 0, o: o }; }
        function draw() {
          clear(c); for (var a = 0; a < 420; a += 7) for (var b = 0; b < 320; b += 7) { c.x.fillStyle = vote(a + 3, b + 3).cls ? C.lb : C.la; c.x.fillRect(a, b, 7, 7); }
          var v = vote(q[0], q[1]); c.x.strokeStyle = C.k; v.D.forEach(function (x) { c.x.beginPath(); c.x.moveTo(q[0], q[1]); c.x.lineTo(x[1][0], x[1][1]); c.x.stroke(); });
          pts.forEach(function (s) { dot(c.x, s[0], s[1], 4, s[2] ? C.b : C.a); }); dot(c.x, q[0], q[1], 8, C.k);
          res.textContent = "k = " + k + "\nvotes: " + (k - v.o) + " / " + v.o + "\nclass: " + (v.cls ? "orange" : "purple");
        }
        c.el.onclick = function (e) { q = pos(c, e); draw(); };
        slider(p, "k", 1, 39, 2, k, function (v) { k = v; draw(); }); res = readout(p); draw();
      } },

    kmeans: { title: { fa: "K-Means گام‌به‌گام", en: "K-Means step by step" }, help: { fa: "«گام بعد» را بزن.", en: "Press Next step." },
      mount: function (h, lang) {
        var c = canvas(h, 420, 320), p = panel(h), k = 3, pts, cen, lab, it, res, COL = [C.a, C.b, C.c, C.d, "#c92a3a", "#555"];
        function init() { var r = seeded(Math.floor(Math.random() * 1e6) + 1); pts = []; [[100, 90], [320, 100], [210, 240], [80, 250]].forEach(function (m) { for (var i = 0; i < 40; i++) pts.push([m[0] + gauss(r) * 34, m[1] + gauss(r) * 34]); }); cen = []; for (var i = 0; i < k; i++) cen.push([40 + r() * 340, 40 + r() * 240]); lab = pts.map(function () { return -1; }); it = 0; draw(); }
        function next() { lab = pts.map(function (q) { var b = 0, m = 1e18; cen.forEach(function (s, i) { var d = (q[0] - s[0]) * (q[0] - s[0]) + (q[1] - s[1]) * (q[1] - s[1]); if (d < m) { m = d; b = i; } }); return b; }); draw(); setTimeout(function () { cen = cen.map(function (s, i) { var g = pts.filter(function (_, j) { return lab[j] === i; }); if (!g.length) return s; return [g.reduce(function (a, q) { return a + q[0]; }, 0) / g.length, g.reduce(function (a, q) { return a + q[1]; }, 0) / g.length]; }); it++; draw(); }, 320); }
        function draw() { clear(c); pts.forEach(function (q, i) { dot(c.x, q[0], q[1], 4, lab[i] < 0 ? C.g : COL[lab[i]]); }); cen.forEach(function (s, i) { c.x.fillStyle = COL[i]; c.x.strokeStyle = C.k; c.x.lineWidth = 2; c.x.fillRect(s[0] - 8, s[1] - 8, 16, 16); c.x.strokeRect(s[0] - 8, s[1] - 8, 16, 16); c.x.lineWidth = 1; }); var J = lab[0] < 0 ? 0 : pts.reduce(function (a, q, i) { var s = cen[lab[i]]; return a + (q[0] - s[0]) * (q[0] - s[0]) + (q[1] - s[1]) * (q[1] - s[1]); }, 0); res.textContent = "iteration = " + it + "\nWCSS = " + Math.round(J); }
        slider(p, "k", 2, 6, 1, k, function (v) { k = v; init(); }); var row = document.createElement("div"); row.className = "row"; p.appendChild(row); button(row, tx(lang, "گام بعد", "Next step"), next); button(row, tx(lang, "داده جدید", "New data"), init); res = readout(p); init();
      } },

    pca: { title: { fa: "جهت بیشترین واریانس", en: "Direction of maximum variance" }, help: { fa: "محور را بچرخان تا واریانس تصویر بیشینه شود.", en: "Rotate the axis to maximize projected variance." },
      mount: function (h, lang) {
        var c = canvas(h, 400, 320), p = panel(h), r = seeded(4), pts = [], ang = 90, res, i;
        for (i = 0; i < 120; i++) { var a = gauss(r) * 74, b = gauss(r) * 20; pts.push([a * .82 - b * .57, a * .57 + b * .82]); }
        function vr(t) { var u = [Math.cos(t), Math.sin(t)], s = 0, m = 0; pts.forEach(function (q) { m += q[0] * u[0] + q[1] * u[1]; }); m /= pts.length; pts.forEach(function (q) { var z = q[0] * u[0] + q[1] * u[1] - m; s += z * z; }); return s / pts.length; }
        var best = 0, bestAng = 0; for (i = 0; i < 180; i++) { var v = vr(i * Math.PI / 180); if (v > best) { best = v; bestAng = i; } }
        function draw() { var t = ang * Math.PI / 180, u = [Math.cos(t), Math.sin(t)]; clear(c); c.x.save(); c.x.translate(200, 160); c.x.strokeStyle = C.b; c.x.lineWidth = 2.5; c.x.beginPath(); c.x.moveTo(-220 * u[0], 220 * u[1]); c.x.lineTo(220 * u[0], -220 * u[1]); c.x.stroke(); c.x.lineWidth = .7; pts.forEach(function (q) { var z = q[0] * u[0] + q[1] * u[1]; c.x.strokeStyle = C.g; c.x.beginPath(); c.x.moveTo(q[0], -q[1]); c.x.lineTo(z * u[0], -z * u[1]); c.x.stroke(); dot(c.x, z * u[0], -z * u[1], 2.5, C.b); dot(c.x, q[0], -q[1], 3.5, C.a); }); c.x.restore(); var s = vr(t); res.textContent = "angle = " + ang + "\nvariance = " + Math.round(s) + "\n" + tx(lang, "از بیشینه: ", "of maximum: ") + Math.round(100 * s / best) + "%"; }
        slider(p, tx(lang, "زاویه", "angle"), 0, 179, 1, ang, function (v) { ang = v; draw(); }); res = readout(p); button(p, tx(lang, "نمایش جواب PCA", "Show PCA answer"), function () { var i = p.querySelector("input"); i.value = bestAng; i.oninput(); }); draw();
      } },

    neuron: { title: { fa: "یک نورون", en: "One neuron" }, help: { fa: "ورودی، وزن و تابع فعال‌سازی را تغییر بده.", en: "Change the inputs, weights and activation." },
      mount: function (h, lang) {
        var c = canvas(h, 430, 230), p = panel(h), v = { x1: 1, x2: -.5, w1: .8, w2: 1.2, b: .1 }, fn = "relu", r;
        var F = { relu: function (z) { return Math.max(z, 0); }, sigmoid: function (z) { return 1 / (1 + Math.exp(-z)); }, tanh: Math.tanh };
        function draw() { var z = v.x1 * v.w1 + v.x2 * v.w2 + v.b, y = F[fn](z); clear(c); var X = function (q) { return 215 + q * 42; }, Y = function (q) { return 130 - q * 42; }; c.x.strokeStyle = C.g; c.x.beginPath(); c.x.moveTo(0, Y(0)); c.x.lineTo(430, Y(0)); c.x.moveTo(X(0), 0); c.x.lineTo(X(0), 230); c.x.stroke(); c.x.strokeStyle = C.a; c.x.lineWidth = 3; c.x.beginPath(); for (var q = -5; q <= 5; q += .05) c.x.lineTo(X(q), Y(F[fn](q))); c.x.stroke(); c.x.lineWidth = 1; dot(c.x, X(Math.max(-5, Math.min(5, z))), Y(F[fn](Math.max(-5, Math.min(5, z)))), 7, C.b); r.textContent = "z = w1*x1 + w2*x2 + b = " + f(z) + "\ny = " + fn + "(z) = " + f(y); }
        Object.keys(v).forEach(function (k) { slider(p, k, -2, 2, .1, v[k], function (x) { v[k] = x; draw(); }); });
        var s = document.createElement("select"); Object.keys(F).forEach(function (k) { var o = document.createElement("option"); o.textContent = k; s.appendChild(o); }); s.onchange = function () { fn = s.value; draw(); }; p.appendChild(s); r = readout(p); draw();
      } },

    nn: { title: { fa: "آموزش شبکه عصبی", en: "Training a neural network" }, help: { fa: "«آموزش» را بزن و شکل‌گیری مرز تصمیم را ببین. تعداد نورون را تغییر بده.", en: "Press Train and watch the decision boundary form. Try different neuron counts." },
      mount: function (h, lang) {
        var c = canvas(h, 340, 340), p = panel(h), H = 8, kind = "circle", D, W, t = null, it = 0, res;
        function data() { var r = seeded(21); D = []; for (var i = 0; i < 180; i++) { var x, y, l; if (kind === "circle") { var a = r() * 6.283, cl = i % 2, q = cl ? .25 + r() * .25 : .68 + r() * .28; x = q * Math.cos(a); y = q * Math.sin(a); l = cl; } else if (kind === "xor") { x = r() * 2 - 1; y = r() * 2 - 1; l = x * y > 0 ? 1 : 0; } else { var cl2 = i % 2, u = i / 180 * 2 * 6.283 * 1.2 + r() * .2, ra = (i % 180) / 180 * .95 + .05; x = ra * Math.cos(u + (cl2 ? 3.14 : 0)); y = ra * Math.sin(u + (cl2 ? 3.14 : 0)); l = cl2; } D.push([x, y, l]); } }
        function init() { var r = seeded(7 + H); W = { a: [], b: [], v: [], c: 0 }; for (var i = 0; i < H; i++) { W.a.push([gauss(r) * 2, gauss(r) * 2]); W.b.push(gauss(r)); W.v.push(gauss(r)); } it = 0; }
        function net(x, y) { var h = W.a.map(function (w, i) { return Math.tanh(w[0] * x + w[1] * y + W.b[i]); }), z = h.reduce(function (s, v, i) { return s + v * W.v[i]; }, W.c); return { h: h, p: 1 / (1 + Math.exp(-z)) }; }
        function train() { var lr = .35; for (var e = 0; e < 12; e++) { var ga = W.a.map(function () { return [0, 0]; }), gb = new Array(H).fill(0), gv = new Array(H).fill(0), gc = 0, loss = 0; D.forEach(function (d) { var o = net(d[0], d[1]), g = o.p - d[2]; loss -= d[2] * Math.log(o.p + 1e-9) + (1 - d[2]) * Math.log(1 - o.p + 1e-9); gc += g; o.h.forEach(function (v, i) { gv[i] += g * v; var s = g * W.v[i] * (1 - v * v); ga[i][0] += s * d[0]; ga[i][1] += s * d[1]; gb[i] += s; }); }); var n = D.length; W.c -= lr * gc / n; for (var i = 0; i < H; i++) { W.v[i] -= lr * gv[i] / n; W.b[i] -= lr * gb[i] / n; W.a[i][0] -= lr * ga[i][0] / n; W.a[i][1] -= lr * ga[i][1] / n; } it++; W.loss = loss / n; } draw(); }
        function draw() { clear(c); for (var a = 0; a < 340; a += 6) for (var b = 0; b < 340; b += 6) { var q = net(a / 170 - 1, b / 170 - 1).p; c.x.fillStyle = "rgba(" + (q > .5 ? "232,89,12," + (q - .5) * .9 : "91,52,196," + (.5 - q) * .9) + ")"; c.x.fillRect(a, b, 6, 6); } D.forEach(function (d) { dot(c.x, (d[0] + 1) * 170, (d[1] + 1) * 170, 3.5, d[2] ? C.b : C.a); }); var ok = D.filter(function (d) { return (net(d[0], d[1]).p > .5) === !!d[2]; }).length; res.textContent = "epoch = " + it + "\nloss = " + f(W.loss || 0) + "\naccuracy = " + f(ok / D.length); }
        function stop() { clearInterval(t); t = null; }
        slider(p, tx(lang, "نورون پنهان", "hidden neurons"), 1, 30, 1, H, function (v) { H = v; stop(); init(); draw(); });
        var s = document.createElement("select"); [["circle", "circle"], ["xor", "XOR"], ["spiral", "spiral"]].forEach(function (k) { var o = document.createElement("option"); o.value = k[0]; o.textContent = k[1]; s.appendChild(o); }); s.onchange = function () { kind = s.value; stop(); data(); init(); draw(); }; p.appendChild(s);
        var row = document.createElement("div"); row.className = "row"; p.appendChild(row); var go = button(row, tx(lang, "آموزش / توقف", "Train / Pause"), function () { if (t) stop(); else t = setInterval(train, 60); }); button(row, tx(lang, "از نو", "Reset"), function () { stop(); init(); draw(); });
        res = readout(p); data(); init(); draw();
        var ob = new MutationObserver(function () { if (!document.body.contains(c.el)) { stop(); ob.disconnect(); } }); ob.observe(document.getElementById("app"), { childList: true });
      } },

    conv: { title: { fa: "کانولوشن", en: "Convolution" }, help: { fa: "روی شبکه چپ بکش تا نقاشی کنی.", en: "Drag on the left grid to paint." },
      mount: function (h, lang) {
        var c = canvas(h, 460, 220), p = panel(h), N = 16, G = [], i, down = false, K = { "edge x": [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], "edge y": [[-1, -2, -1], [0, 0, 0], [1, 2, 1]], blur: [[.1, .1, .1], [.1, .2, .1], [.1, .1, .1]], sharpen: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]] }, cur = "edge x";
        for (i = 0; i < N; i++) G.push(new Array(N).fill(0)); for (i = 3; i < 13; i++) { G[i][5] = 1; G[i][10] = 1; } for (i = 5; i < 11; i++) { G[3][i] = 1; G[12][i] = 1; }
        var S = 13;
        function draw() { clear(c); var r, q; for (r = 0; r < N; r++) for (q = 0; q < N; q++) { var v = G[r][q]; c.x.fillStyle = "rgb(" + (255 - v * 180) + "," + (255 - v * 200) + "," + (255 - v * 60) + ")"; c.x.fillRect(q * S + 8, r * S + 8, S - 1, S - 1); } var k = K[cur]; for (r = 1; r < N - 1; r++) for (q = 1; q < N - 1; q++) { var s = 0; for (var a = -1; a <= 1; a++) for (var b = -1; b <= 1; b++) s += k[a + 1][b + 1] * G[r + a][q + b]; var t = Math.max(-1, Math.min(1, s / (cur.indexOf("edge") === 0 ? 3 : 1))); c.x.fillStyle = t >= 0 ? "rgb(" + (255 - t * 20) + "," + (255 - t * 150) + "," + (255 - t * 240) + ")" : "rgb(" + (255 + t * 180) + "," + (255 + t * 200) + "," + (255 + t * 60) + ")"; c.x.fillRect(q * S + 242, r * S + 8, S - 1, S - 1); } }
        function paint(e) { var o = pos(c, e), q = Math.floor((o[0] - 8) / S), r = Math.floor((o[1] - 8) / S); if (r >= 0 && r < N && q >= 0 && q < N) { G[r][q] = 1; draw(); } }
        c.el.onpointerdown = function (e) { down = true; paint(e); }; c.el.onpointermove = function (e) { if (down) paint(e); }; window.addEventListener("pointerup", function () { down = false; });
        var s = document.createElement("select"); Object.keys(K).forEach(function (k) { var o = document.createElement("option"); o.textContent = k; s.appendChild(o); }); s.onchange = function () { cur = s.value; draw(); show(); }; p.appendChild(s); var r = readout(p); function show() { r.textContent = K[cur].map(function (x) { return x.join("\t"); }).join("\n"); } button(p, tx(lang, "پاک کردن", "Clear"), function () { G.forEach(function (x) { x.fill(0); }); draw(); }); show(); draw();
      } },

    fuzzy: { title: { fa: "استنتاج ممدانی", en: "Mamdani inference" }, help: { fa: "دما را تغییر بده؛ برش قواعد و مرکز ثقل تغییر می‌کنند.", en: "Change the temperature; rule clipping and the centroid respond." },
      mount: function (h, lang) {
        var c = canvas(h, 460, 300), p = panel(h), T = 22, r;
        var tri = function (x, a, b, d) { return Math.max(Math.min((x - a) / (b - a + 1e-9), (d - x) / (d - b + 1e-9)), 0); };
        function draw() {
          var cold = tri(T, 0, 10, 25), warm = tri(T, 15, 25, 35), hot = tri(T, 25, 40, 55), x = c.x; clear(c);
          var X1 = function (v) { return 20 + v / 55 * 420; }, Y1 = function (v) { return 120 - v * 100; };
          [[0, 10, 25, C.d], [15, 25, 35, C.c], [25, 40, 55, C.b]].forEach(function (s) { x.strokeStyle = s[3]; x.lineWidth = 2; x.beginPath(); x.moveTo(X1(s[0]), Y1(0)); x.lineTo(X1(s[1]), Y1(1)); x.lineTo(X1(s[2]), Y1(0)); x.stroke(); });
          x.strokeStyle = C.k; x.setLineDash([4, 4]); x.beginPath(); x.moveTo(X1(T), 12); x.lineTo(X1(T), 122); x.stroke(); x.setLineDash([]);
          var X2 = function (v) { return 20 + v * 4.2; }, Y2 = function (v) { return 285 - v * 120; }, sum = 0, mom = 0, z;
          x.fillStyle = "rgba(91,52,196,.35)"; x.beginPath(); x.moveTo(X2(0), Y2(0));
          for (z = 0; z <= 100; z += .5) { var a = Math.max(Math.min(cold, tri(z, -1, 0, 50)), Math.min(warm, tri(z, 0, 50, 100)), Math.min(hot, tri(z, 50, 100, 101))); sum += a; mom += a * z; x.lineTo(X2(z), Y2(a)); }
          x.lineTo(X2(100), Y2(0)); x.fill(); var cog = mom / (sum || 1); x.strokeStyle = C.c; x.lineWidth = 3; x.beginPath(); x.moveTo(X2(cog), 160); x.lineTo(X2(cog), 287); x.stroke(); x.lineWidth = 1;
          r.textContent = "cold = " + f(cold, 2) + "\nwarm = " + f(warm, 2) + "\nhot  = " + f(hot, 2) + "\nfan speed = " + f(cog, 1) + " %";
        }
        slider(p, tx(lang, "دما", "temperature"), 0, 55, .5, T, function (v) { T = v; draw(); }); r = readout(p); draw();
      } },

    pso: { title: { fa: "ازدحام ذرات", en: "Particle swarm" }, help: { fa: "«گام» را بزن و ببین ذرات چگونه کمینه سراسری را پیدا می‌کنند.", en: "Press Step and watch the particles find the global minimum." },
      mount: function (h, lang) {
        var c = canvas(h, 340, 340), p = panel(h), r = seeded(17), P = [], t = null, it = 0, best, w = .7, cc = 1.5, res;
        var F = function (a, b) { return 20 + a * a + b * b - 10 * (Math.cos(6.283 * a) + Math.cos(6.283 * b)); };
        var bg = document.createElement("canvas"); bg.width = bg.height = 170; var bx = bg.getContext("2d");
        for (var a = 0; a < 170; a++) for (var b = 0; b < 170; b++) { var v = F(a / 170 * 10.24 - 5.12, b / 170 * 10.24 - 5.12); var g = 255 - Math.min(1, v / 80) * 185; bx.fillStyle = "rgb(" + g + "," + (g - 25) + ",255)"; bx.fillRect(a, b, 1, 1); }
        function init() { P = []; best = { f: 1e9 }; it = 0; for (var i = 0; i < 26; i++) { var x = r() * 10.24 - 5.12, y = r() * 10.24 - 5.12, q = { x: x, y: y, vx: 0, vy: 0, bx: x, by: y, bf: F(x, y) }; P.push(q); if (q.bf < best.f) best = { f: q.bf, x: x, y: y }; } draw(); }
        function step() { P.forEach(function (q) { q.vx = w * q.vx + cc * r() * (q.bx - q.x) + cc * r() * (best.x - q.x); q.vy = w * q.vy + cc * r() * (q.by - q.y) + cc * r() * (best.y - q.y); q.x = Math.max(-5.12, Math.min(5.12, q.x + q.vx)); q.y = Math.max(-5.12, Math.min(5.12, q.y + q.vy)); var fv = F(q.x, q.y); if (fv < q.bf) { q.bf = fv; q.bx = q.x; q.by = q.y; } if (fv < best.f) best = { f: fv, x: q.x, y: q.y }; }); it++; draw(); if (it > 150) halt(); }
        function halt() { clearInterval(t); t = null; }
        function draw() { c.x.imageSmoothingEnabled = true; c.x.drawImage(bg, 0, 0, 340, 340); var S = function (v) { return (v + 5.12) / 10.24 * 340; }; P.forEach(function (q) { dot(c.x, S(q.x), S(q.y), 4, C.b); }); dot(c.x, S(best.x), S(best.y), 7, C.c); res.textContent = "iteration = " + it + "\nbest f = " + f(best.f) + "\nglobal minimum = 0"; }
        slider(p, "inertia w", 0, 1, .05, w, function (v) { w = v; }); slider(p, "c1 = c2", 0, 2.5, .1, cc, function (v) { cc = v; });
        var row = document.createElement("div"); row.className = "row"; p.appendChild(row); button(row, tx(lang, "گام", "Step"), step); button(row, tx(lang, "اجرا / توقف", "Run / Pause"), function () { if (t) halt(); else t = setInterval(step, 120); }); button(row, tx(lang, "از نو", "Reset"), function () { halt(); init(); });
        res = readout(p); init();
        var ob = new MutationObserver(function () { if (!document.body.contains(c.el)) { halt(); ob.disconnect(); } }); ob.observe(document.getElementById("app"), { childList: true });
      } },

    game: { title: { fa: "جدول پاداش و تعادل نش", en: "Payoff table and Nash equilibrium" }, help: { fa: "پاداش‌ها را عوض کن. بهترین پاسخ هر بازیکن پررنگ می‌شود و خانه سبز تعادل نش خالص است.", en: "Edit the payoffs. Best responses become bold, and a green cell is a pure Nash equilibrium." },
      mount: function (h, lang) {
        var G = [[[-1, -1], [-3, 0]], [[0, -3], [-2, -2]]], grid = document.createElement("div"); grid.className = "gameg"; h.appendChild(grid); var p = panel(h), r = readout(p);
        function up() {
          var nash = [], html = ""; var names = [tx(lang, "A", "A"), tx(lang, "B", "B")];
          grid.innerHTML = '<div></div><div class="gh">P2: ' + names[0] + '</div><div class="gh">P2: ' + names[1] + "</div>";
          [0, 1].forEach(function (i) { var l = document.createElement("div"); l.className = "gh"; l.textContent = "P1: " + names[i]; grid.appendChild(l); [0, 1].forEach(function (j) {
            var br1 = G[i][j][0] >= G[1 - i][j][0], br2 = G[i][j][1] >= G[i][1 - j][1], cell = document.createElement("div"); cell.className = "gc" + (br1 && br2 ? " eq" : "");
            [0, 1].forEach(function (k) { var inp = document.createElement("input"); inp.type = "number"; inp.value = G[i][j][k]; if (k ? br2 : br1) inp.className = "br"; inp.onchange = function () { G[i][j][k] = +inp.value; up(); }; cell.appendChild(inp); });
            grid.appendChild(cell); if (br1 && br2) nash.push("(" + names[i] + ", " + names[j] + ")"); }); });
          var a = G[0][0][1] - G[0][1][1] - G[1][0][1] + G[1][1][1], b = G[0][0][0] - G[1][0][0] - G[0][1][0] + G[1][1][0], ps = a ? (G[1][1][1] - G[1][0][1]) / a : NaN, qs = b ? (G[1][1][0] - G[0][1][0]) / b : NaN, mix = ps > 0 && ps < 1 && qs > 0 && qs < 1;
          r.textContent = tx(lang, "نش خالص: ", "Pure Nash: ") + (nash.join(" ") || tx(lang, "ندارد", "none")) + "\n" + tx(lang, "نش مختلط: ", "Mixed Nash: ") + (mix ? "P1 plays A with p = " + f(ps) + "\nP2 plays A with q = " + f(qs) : tx(lang, "ندارد (درونی)", "no interior one"));
        }
        [["Prisoner's Dilemma", [[[-1, -1], [-3, 0]], [[0, -3], [-2, -2]]]], ["Matching Pennies", [[[1, -1], [-1, 1]], [[-1, 1], [1, -1]]]], ["Battle of the Sexes", [[[2, 1], [0, 0]], [[0, 0], [1, 2]]]], ["Stag Hunt", [[[4, 4], [0, 3]], [[3, 0], [3, 3]]]]].forEach(function (x) { button(p, x[0], function () { G = JSON.parse(JSON.stringify(x[1])); up(); }); }); p.appendChild(r); up();
      } },

    sugeno: { title: { fa: "محاسبه لایه‌به‌لایه ANFIS", en: "ANFIS layer by layer" }, help: { fa: "یک سیستم دو قاعده‌ای سوگنو؛ ورودی‌ها را تغییر بده.", en: "A two-rule Sugeno system; change the inputs." },
      mount: function (h, lang) {
        var p = panel(h), x = 3, y = 4, q = panel(h), r = readout(q);
        var g = function (v, c, s) { return Math.exp(-(v - c) * (v - c) / (2 * s * s)); };
        function up() { var A1 = g(x, 2, 2), A2 = g(x, 6, 2), B1 = g(y, 3, 2), B2 = g(y, 7, 2), w1 = A1 * B1, w2 = A2 * B2, n1 = w1 / (w1 + w2), n2 = w2 / (w1 + w2), f1 = .5 * x + .2 * y + 1, f2 = -.3 * x + .8 * y + 2; r.textContent = "Layer 1  A1=" + f(A1) + " A2=" + f(A2) + " B1=" + f(B1) + " B2=" + f(B2) + "\nLayer 2  w1=" + f(w1) + " w2=" + f(w2) + "\nLayer 3  n1=" + f(n1) + " n2=" + f(n2) + "\nLayer 4  n1*f1=" + f(n1 * f1) + " n2*f2=" + f(n2 * f2) + "\nLayer 5  f=" + f(n1 * f1 + n2 * f2); }
        slider(p, "x", 0, 10, .1, x, function (v) { x = v; up(); }); slider(p, "y", 0, 10, .1, y, function (v) { y = v; up(); }); up();
      } }
  };
})();
