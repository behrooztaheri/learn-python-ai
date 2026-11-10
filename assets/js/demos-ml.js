/* Interactive machine-learning labs, written from scratch in JavaScript so they run instantly without Python.
   Two engines cover most models:
   - REG: one input x, one output y. Models: linear, polynomial, ridge, lasso, elastic net, KNN, tree, forest, boosting, SVR.
   - CLS: two inputs, two classes. Models: logistic, KNN, naive Bayes, tree, forest, AdaBoost, linear SVM, kernel SVM.
   Each lesson mounts one engine with a preset model; the labs page lets the user switch models freely.
   Plus clustering labs (hierarchical, DBSCAN, Gaussian mixture), and optimization and algorithm labs. */
(function () {
  var C = { a: "#5b34c4", b: "#e8590c", c: "#16834f", d: "#1f6f8b", g: "#b9b4c7", k: "#2b2440", r: "#c92a3a" };
  var PAL = ["#5b34c4", "#e8590c", "#16834f", "#1f6f8b", "#c92a3a", "#b08900", "#d6336c", "#495057"];
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
    i.oninput = function () { show(); fn(+i.value); }; show(); l.appendChild(s); l.appendChild(i); p.appendChild(l); return l;
  }
  function select(p, label, opts, val, fn) {
    var l = document.createElement("label"), s = document.createElement("span"), e = document.createElement("select");
    s.textContent = label; opts.forEach(function (o) { var q = document.createElement("option"); q.value = o[0]; q.textContent = o[1]; e.appendChild(q); });
    e.value = val; e.onchange = function () { fn(e.value); }; l.appendChild(s); l.appendChild(e); p.appendChild(l); return e;
  }
  function button(p, label, fn) { var b = document.createElement("button"); b.textContent = label; b.onclick = fn; p.appendChild(b); return b; }
  function row(p) { var d = document.createElement("div"); d.className = "row"; p.appendChild(d); return d; }
  function readout(p) { var r = document.createElement("div"); r.className = "readout"; p.appendChild(r); return r; }
  function pos(c, e) { var r = c.el.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * c.w, (e.clientY - r.top) / r.height * c.h]; }
  function dot(x, a, b, r, col, ring) { x.beginPath(); x.arc(a, b, r, 0, 7); if (ring) { x.strokeStyle = col; x.lineWidth = 2; x.stroke(); x.lineWidth = 1; } else { x.fillStyle = col; x.fill(); } }
  function seeded(s) { return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function gauss(r) { return Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(6.2832 * r()); }
  function f(v, d) { return isFinite(v) ? (+v).toFixed(d === undefined ? 3 : d) : "—"; }
  function solve(A, b) {
    var n = A.length, M = A.map(function (r, i) { return r.concat([b[i]]); });
    for (var i = 0; i < n; i++) {
      var p = i; for (var j = i + 1; j < n; j++) if (Math.abs(M[j][i]) > Math.abs(M[p][i])) p = j;
      var t = M[i]; M[i] = M[p]; M[p] = t; var d = M[i][i] || 1e-12;
      for (j = i; j <= n; j++) M[i][j] /= d;
      for (var k = 0; k < n; k++) if (k !== i) { var c = M[k][i]; for (j = i; j <= n; j++) M[k][j] -= c * M[i][j]; }
    }
    return M.map(function (r) { return r[n]; });
  }
  function mean(a) { return a.reduce(function (s, v) { return s + v; }, 0) / (a.length || 1); }

  /* ---------- Regression models on one input. Each fit(X, Y, p) returns predict(x). x is in [0, 1]. ---------- */
  function polyFeat(x, d) { var o = []; for (var i = 1; i <= d; i++) o.push(Math.pow(2 * x - 1, i)); return o; }
  function linearFit(F, Y, lam, l1, ratio) {
    // Least squares on features F, with optional L2 (ridge) and L1 (lasso) penalties; solved by coordinate descent when L1 is used.
    var n = F.length, d = F[0].length, mu = [], sd = [], ym = mean(Y);
    for (var j = 0; j < d; j++) { var col = F.map(function (r) { return r[j]; }); mu[j] = mean(col); sd[j] = Math.sqrt(mean(col.map(function (v) { return (v - mu[j]) * (v - mu[j]); }))) || 1; }
    var Z = F.map(function (r) { return r.map(function (v, j) { return (v - mu[j]) / sd[j]; }); }), yc = Y.map(function (v) { return v - ym; }), w = [];
    var a1 = l1 ? lam * ratio : 0, a2 = l1 ? lam * (1 - ratio) : lam;
    if (!a1) {
      var A = [], b = [];
      for (j = 0; j < d; j++) { A.push([]); for (var k = 0; k < d; k++) { var s = 0; for (var i = 0; i < n; i++) s += Z[i][j] * Z[i][k]; A[j].push(s / n + (j === k ? a2 : 0)); } var t = 0; for (i = 0; i < n; i++) t += Z[i][j] * yc[i]; b.push(t / n); }
      w = solve(A, b);
    } else {
      for (j = 0; j < d; j++) w.push(0);
      var r = yc.slice();
      for (var it = 0; it < 300; it++) for (j = 0; j < d; j++) {
        var rho = 0, zz = 0; for (i = 0; i < n; i++) { rho += Z[i][j] * (r[i] + Z[i][j] * w[j]); zz += Z[i][j] * Z[i][j]; }
        rho /= n; zz /= n;
        var nw = Math.sign(rho) * Math.max(Math.abs(rho) - a1, 0) / (zz + a2);
        for (i = 0; i < n; i++) r[i] -= Z[i][j] * (nw - w[j]); w[j] = nw;
      }
    }
    return { w: w, predict: function (row) { var s = ym; row.forEach(function (v, j) { s += w[j] * (v - mu[j]) / sd[j]; }); return s; } };
  }
  function treeFit(X, Y, depth, minLeaf) {
    function build(idx, d) {
      var ys = idx.map(function (i) { return Y[i]; }), m = mean(ys);
      if (d === 0 || idx.length < 2 * minLeaf) return { v: m };
      var s = idx.slice().sort(function (a, b) { return X[a] - X[b]; }), best = null, tot = 0, tot2 = 0;
      s.forEach(function (i) { tot += Y[i]; tot2 += Y[i] * Y[i]; });
      var l = 0, l2 = 0;
      for (var k = 0; k < s.length - 1; k++) {
        l += Y[s[k]]; l2 += Y[s[k]] * Y[s[k]];
        var nl = k + 1, nr = s.length - nl; if (nl < minLeaf || nr < minLeaf || X[s[k]] === X[s[k + 1]]) continue;
        var sse = (l2 - l * l / nl) + ((tot2 - l2) - (tot - l) * (tot - l) / nr);
        if (!best || sse < best.sse) best = { sse: sse, t: (X[s[k]] + X[s[k + 1]]) / 2, k: k };
      }
      if (!best) return { v: m };
      return { t: best.t, L: build(s.slice(0, best.k + 1), d - 1), R: build(s.slice(best.k + 1), d - 1) };
    }
    var root = build(X.map(function (_, i) { return i; }), depth);
    return function (x) { var n = root; while (n.t !== undefined) n = x <= n.t ? n.L : n.R; return n.v; };
  }
  function kern(g) { return function (a, b) { var d = a - b; return Math.exp(-g * d * d); }; }
  var REGM = {
    linear: function (X, Y) { var m = linearFit(X.map(function (x) { return [x]; }), Y, 0); return { p: function (x) { return m.predict([x]); }, info: "w = " + f(m.w[0] / Math.sqrt(mean(X.map(function (x) { return (x - mean(X)) * (x - mean(X)); }))), 2) }; },
    poly: function (X, Y, p) { var m = linearFit(X.map(function (x) { return polyFeat(x, p.deg); }), Y, 1e-9); return { p: function (x) { return m.predict(polyFeat(x, p.deg)); }, w: m.w }; },
    ridge: function (X, Y, p) { var m = linearFit(X.map(function (x) { return polyFeat(x, p.deg); }), Y, p.lam); return { p: function (x) { return m.predict(polyFeat(x, p.deg)); }, w: m.w }; },
    lasso: function (X, Y, p) { var m = linearFit(X.map(function (x) { return polyFeat(x, p.deg); }), Y, p.lam, true, 1); return { p: function (x) { return m.predict(polyFeat(x, p.deg)); }, w: m.w }; },
    enet: function (X, Y, p) { var m = linearFit(X.map(function (x) { return polyFeat(x, p.deg); }), Y, p.lam, true, p.ratio); return { p: function (x) { return m.predict(polyFeat(x, p.deg)); }, w: m.w }; },
    knn: function (X, Y, p) {
      return { p: function (x) {
        var d = X.map(function (v, i) { return [Math.abs(v - x), Y[i]]; }).sort(function (a, b) { return a[0] - b[0]; }).slice(0, p.k);
        if (p.wt === "distance") { var s = 0, ws = 0; for (var i = 0; i < d.length; i++) { if (d[i][0] < 1e-9) return d[i][1]; s += d[i][1] / d[i][0]; ws += 1 / d[i][0]; } return s / ws; }
        return mean(d.map(function (q) { return q[1]; }));
      } };
    },
    tree: function (X, Y, p) { return { p: treeFit(X, Y, p.depth, p.leaf) }; },
    forest: function (X, Y, p) {
      var r = seeded(11), trees = [];
      for (var t = 0; t < p.n; t++) { var bx = [], by = []; for (var i = 0; i < X.length; i++) { var j = Math.floor(r() * X.length); bx.push(X[j]); by.push(Y[j]); } trees.push(treeFit(bx, by, p.depth, 1)); }
      return { p: function (x) { return mean(trees.map(function (t) { return t(x); })); }, trees: trees };
    },
    gbr: function (X, Y, p) {
      var base = mean(Y), F = Y.map(function () { return base; }), trees = [];
      for (var m = 0; m < p.rounds; m++) {
        var res = Y.map(function (y, i) { return y - F[i]; }), t = treeFit(X, res, p.depth, 1); trees.push(t);
        F = F.map(function (v, i) { return v + p.lr * t(X[i]); });
      }
      return { p: function (x) { var s = base; trees.forEach(function (t) { s += p.lr * t(x); }); return s; }, trees: trees, base: base };
    },
    svr: function (X, Y, p) {
      // Kernel SVR solved in the dual by coordinate ascent. beta_i = alpha_i - alpha_i*, limited to [-C, C].
      // Adding 1 to the kernel takes care of the bias b. Points with beta_i != 0 are the support vectors.
      var n = X.length, k = kern(p.gamma), K = X.map(function (a) { return X.map(function (b) { return k(a, b) + 1; }); }), be = X.map(function () { return 0; });
      for (var it = 0; it < 200; it++) for (var i = 0; i < n; i++) {
        var g = Y[i]; for (var j = 0; j < n; j++) if (j !== i) g -= K[i][j] * be[j];
        var v = Math.sign(g) * Math.max(Math.abs(g) - p.eps, 0) / K[i][i];
        be[i] = Math.max(-p.C, Math.min(p.C, v));
      }
      var pr = function (x) { var s = 0; for (var i = 0; i < n; i++) if (be[i]) s += be[i] * (k(X[i], x) + 1); return s; };
      return { p: pr, sv: be.map(function (b) { return Math.abs(b) > 1e-6; }) };
    }
  };
  function regData(kind, seed, n) {
    var r = seeded(seed), X = [], Y = [];
    for (var i = 0; i < n; i++) {
      var x = r(), y;
      if (kind === "linear") y = 1.6 * x - 0.8 + gauss(r) * 0.18;
      else if (kind === "step") y = (x < 0.35 ? -0.7 : x < 0.7 ? 0.5 : 0.1) + gauss(r) * 0.12;
      else if (kind === "outlier") { y = 1.4 * x - 0.7 + gauss(r) * 0.1; if (i % 9 === 4) y += 1.3; }
      else y = Math.sin(6.2832 * x * 0.95) * 0.8 + gauss(r) * 0.2;
      X.push(x); Y.push(y);
    }
    return [X, Y];
  }

  var REG_PARAMS = {
    linear: [], poly: [["deg", 1, 15, 1, 3, "degree"]],
    ridge: [["deg", 1, 15, 1, 12, "degree"], ["lam", -6, 1, 0.1, -2, "log10(alpha)"]],
    lasso: [["deg", 1, 15, 1, 12, "degree"], ["lam", -6, 0, 0.1, -2.5, "log10(alpha)"]],
    enet: [["deg", 1, 15, 1, 12, "degree"], ["lam", -6, 0, 0.1, -2.5, "log10(alpha)"], ["ratio", 0, 1, 0.05, 0.5, "l1_ratio"]],
    knn: [["k", 1, 30, 1, 5, "k"]], tree: [["depth", 1, 8, 1, 3, "max_depth"], ["leaf", 1, 10, 1, 1, "min_samples_leaf"]],
    forest: [["n", 1, 60, 1, 20, "n_estimators"], ["depth", 1, 8, 1, 5, "max_depth"]],
    gbr: [["rounds", 1, 150, 1, 30, "n_estimators"], ["lr", 0.02, 1, 0.02, 0.2, "learning_rate"], ["depth", 1, 4, 1, 2, "max_depth"]],
    svr: [["C", -1, 3, 0.1, 1.5, "log10(C)"], ["eps", 0, 0.6, 0.02, 0.15, "epsilon"], ["gamma", 0, 3, 0.1, 1.5, "log10(gamma)"]]
  };
  var REG_NAMES = { linear: "Linear", poly: "Polynomial", ridge: "Ridge", lasso: "Lasso", enet: "Elastic Net", knn: "KNN", tree: "Decision tree", forest: "Random forest", gbr: "Gradient boosting", svr: "SVR (RBF)" };
  function regLab(model, data, free) {
    return function (h, lang) {
      var c = canvas(h, 470, 320), p = panel(h), seed = 3, kind = data || "sine", nTrain = 30, P = {}, X, Y, TX, TY, out, ctlBox, coefC = null;
      var sx = function (x) { return 20 + x * 430; }, sy = function (y) { return 160 - y * 95; };
      function load() { var d = regData(kind, seed, nTrain + 40); X = d[0].slice(0, nTrain); Y = d[1].slice(0, nTrain); TX = d[0].slice(nTrain); TY = d[1].slice(nTrain); }
      function params() {
        ctlBox.innerHTML = ""; P = {};
        (REG_PARAMS[model] || []).forEach(function (q) {
          P[q[0]] = q[4];
          var log = /log10/.test(q[5]);
          slider(ctlBox, q[5].replace("log10(", "").replace(")", ""), q[1], q[2], q[3], q[4], function (v) { P[q[0]] = v; draw(); }, log ? function (v) { return Math.pow(10, v).toPrecision(2); } : null);
        });
        if (model === "knn") { P.wt = "uniform"; select(ctlBox, "weights", [["uniform", "uniform"], ["distance", "distance"]], "uniform", function (v) { P.wt = v; draw(); }); }
      }
      function real(q) { var o = {}; Object.keys(q).forEach(function (k) { o[k] = /^(lam|C|gamma)$/.test(k) ? Math.pow(10, q[k]) : q[k]; }); return o; }
      function draw() {
        var x = c.x; x.clearRect(0, 0, c.w, c.h);
        x.strokeStyle = "#eee"; for (var g = -1.5; g <= 1.5; g += 0.5) { x.beginPath(); x.moveTo(20, sy(g)); x.lineTo(450, sy(g)); x.stroke(); }
        var m = REGM[model](X, Y, real(P)), pr = m.p;
        if (m.trees && model === "forest") { x.strokeStyle = "rgba(91,52,196,.13)"; m.trees.slice(0, 25).forEach(function (t) { x.beginPath(); for (var u = 0; u <= 1.0001; u += 0.004) x.lineTo(sx(u), sy(Math.max(-1.6, Math.min(1.6, t(u))))); x.stroke(); }); }
        if (model === "svr") { var e = real(P).eps; x.fillStyle = "rgba(91,52,196,.1)"; x.beginPath(); for (var u = 0; u <= 1.0001; u += 0.005) x.lineTo(sx(u), sy(pr(u) + e)); for (u = 1; u >= -0.0001; u -= 0.005) x.lineTo(sx(u), sy(pr(u) - e)); x.fill(); }
        x.strokeStyle = C.a; x.lineWidth = 3; x.beginPath();
        for (u = 0; u <= 1.0001; u += 0.003) x.lineTo(sx(u), sy(Math.max(-1.7, Math.min(1.7, pr(u)))));
        x.stroke(); x.lineWidth = 1;
        TX.forEach(function (v, i) { dot(x, sx(v), sy(TY[i]), 4, C.b, true); });
        X.forEach(function (v, i) { dot(x, sx(v), sy(Y[i]), 4.5, m.sv && m.sv[i] ? C.r : C.d); if (m.sv && m.sv[i]) dot(x, sx(v), sy(Y[i]), 7.5, C.r, true); });
        var mse = function (A, B) { return mean(A.map(function (v, i) { var e = pr(v) - B[i]; return e * e; })); };
        var tr = mse(X, Y), te = mse(TX, TY), vy = mean(TY.map(function (v) { var mm = mean(TY); return (v - mm) * (v - mm); }));
        var txt = tx(lang, "مدل: ", "Model: ") + REG_NAMES[model] + "\n" + tx(lang, "خطای آموزش ", "Train ") + "RMSE = " + f(Math.sqrt(tr)) + "\n" + tx(lang, "خطای آزمون ", "Test ") + "RMSE = " + f(Math.sqrt(te)) + "\n" + tx(lang, "آزمون ", "Test ") + "R² = " + f(1 - te / vy);
        if (m.sv) txt += "\n" + tx(lang, "بردارهای پشتیبان: ", "Support vectors: ") + m.sv.filter(Boolean).length + " / " + X.length;
        if (m.w) {
          var nz = m.w.filter(function (v) { return Math.abs(v) > 1e-6; }).length;
          txt += "\n" + tx(lang, "ضرایب غیرصفر: ", "Non-zero coefficients: ") + nz + " / " + m.w.length + "\n" + tx(lang, "بزرگ‌ترین |w| = ", "Largest |w| = ") + f(Math.max.apply(null, m.w.map(Math.abs)), 2);
          drawCoef(m.w);
        } else if (coefC) { coefC.el.style.display = "none"; }
        out.textContent = txt;
      }
      function drawCoef(w) {
        if (!coefC) { coefC = canvas(p, 230, 90); coefC.el.style.cursor = "default"; }
        coefC.el.style.display = ""; var x = coefC.x, mx = Math.max(0.5, Math.max.apply(null, w.map(Math.abs)));
        x.clearRect(0, 0, 230, 90); x.strokeStyle = "#999"; x.beginPath(); x.moveTo(0, 45); x.lineTo(230, 45); x.stroke();
        var bw = 220 / w.length;
        w.forEach(function (v, i) { x.fillStyle = Math.abs(v) < 1e-6 ? "#ccc" : v > 0 ? C.a : C.b; var hgt = v / mx * 40; x.fillRect(5 + i * bw, hgt > 0 ? 45 - hgt : 45, bw - 2, Math.max(1, Math.abs(hgt))); });
        x.fillStyle = "#666"; x.font = "10px sans-serif"; x.fillText(tx(lang, "ضرایب w1..wd", "coefficients w1..wd"), 4, 10);
      }
      c.el.onclick = function (e) { var q = pos(c, e); X.push((q[0] - 20) / 430); Y.push((160 - q[1]) / 95); draw(); };
      if (free) select(p, tx(lang, "مدل", "Model"), Object.keys(REG_NAMES).map(function (k) { return [k, REG_NAMES[k]]; }), model, function (v) { model = v; params(); draw(); });
      select(p, tx(lang, "داده", "Data"), [["sine", tx(lang, "سینوسی", "sine wave")], ["linear", tx(lang, "خطی", "linear")], ["step", tx(lang, "پله‌ای", "steps")], ["outlier", tx(lang, "با داده پرت", "with outliers")]], kind, function (v) { kind = v; load(); draw(); });
      slider(p, tx(lang, "تعداد داده آموزش", "training points"), 8, 120, 1, nTrain, function (v) { nTrain = v; load(); draw(); });
      ctlBox = document.createElement("div"); ctlBox.className = "ctl"; ctlBox.style.minWidth = "0"; p.appendChild(ctlBox);
      var rw = row(p);
      button(rw, tx(lang, "داده جدید", "New sample"), function () { seed += 7; load(); draw(); });
      out = readout(p);
      var lg = document.createElement("p"); lg.className = "labkey"; lg.innerHTML = tx(lang, "● آبی: داده آموزش (کلیک = افزودن) &nbsp; ○ نارنجی: داده آزمون &nbsp; خط بنفش: پیش‌بینی مدل", "● blue: training data (click to add) &nbsp; ○ orange: test data &nbsp; purple line: model prediction"); h.appendChild(lg);
      load(); params(); draw();
    };
  }

  /* ---------- Classification models on two inputs. Each fit(P, y, p) returns prob(x1, x2) = P(class 1). ---------- */
  function sig(z) { return 1 / (1 + Math.exp(-z)); }
  function features(q, deg) { var a = q[0] * 2 - 1, b = q[1] * 2 - 1, o = []; for (var i = 0; i <= deg; i++) for (var j = 0; j <= deg - i; j++) if (i + j) o.push(Math.pow(a, i) * Math.pow(b, j)); return o; }
  function gini(c1, n) { if (!n) return 0; var p = c1 / n; return 2 * p * (1 - p); }
  function ctree(P, y, depth, minLeaf, rnd, weights) {
    var W = weights || P.map(function () { return 1; });
    function build(idx, d) {
      var w1 = 0, wt = 0; idx.forEach(function (i) { wt += W[i]; if (y[i]) w1 += W[i]; });
      var prob = wt ? w1 / wt : 0.5;
      if (d === 0 || idx.length < 2 * minLeaf || prob === 0 || prob === 1) return { v: prob };
      var feats = rnd ? [Math.floor(rnd() * 2)] : [0, 1], best = null;
      feats.forEach(function (fi) {
        var s = idx.slice().sort(function (a, b) { return P[a][fi] - P[b][fi]; }), l1 = 0, lt = 0;
        for (var k = 0; k < s.length - 1; k++) {
          lt += W[s[k]]; if (y[s[k]]) l1 += W[s[k]];
          if (k + 1 < minLeaf || s.length - k - 1 < minLeaf || P[s[k]][fi] === P[s[k + 1]][fi]) continue;
          var sc = lt * gini(l1, lt) + (wt - lt) * gini(w1 - l1, wt - lt);
          if (!best || sc < best.sc) best = { sc: sc, f: fi, t: (P[s[k]][fi] + P[s[k + 1]][fi]) / 2, L: s.slice(0, k + 1), R: s.slice(k + 1) };
        }
      });
      if (!best) return { v: prob };
      return { f: best.f, t: best.t, L: build(best.L, d - 1), R: build(best.R, d - 1) };
    }
    var root = build(P.map(function (_, i) { return i; }), depth), leaves = 0;
    (function cnt(n) { if (n.f === undefined) leaves++; else { cnt(n.L); cnt(n.R); } })(root);
    var fn = function (a, b) { var n = root, q = [a, b]; while (n.f !== undefined) n = q[n.f] <= n.t ? n.L : n.R; return n.v; };
    fn.leaves = leaves; return fn;
  }
  function kernelMachine(P, y, gamma, C, linear) {
    // Soft-margin SVM by subgradient descent on the hinge loss (labels -1/+1).
    var n = P.length, t = y.map(function (v) { return v ? 1 : -1; });
    if (linear) {
      var w = [0, 0], b = 0, lam = 1 / (C * n);
      for (var it = 1; it <= 3000; it++) {
        var eta = 1 / (lam * it + 50), gw = [lam * w[0], lam * w[1]], gb = 0;
        for (var i = 0; i < n; i++) { var m = t[i] * (w[0] * P[i][0] + w[1] * P[i][1] + b); if (m < 1) { gw[0] -= t[i] * P[i][0] / n; gw[1] -= t[i] * P[i][1] / n; gb -= t[i] / n; } }
        w[0] -= eta * gw[0]; w[1] -= eta * gw[1]; b -= eta * gb * 5;
      }
      var df = function (a, c) { return w[0] * a + w[1] * c + b; };
      return { df: df, w: w, b: b, sv: P.map(function (q, i) { return t[i] * df(q[0], q[1]) <= 1.0001; }) };
    }
    var K = function (a, c) { var d0 = a[0] - c[0], d1 = a[1] - c[1]; return Math.exp(-gamma * (d0 * d0 + d1 * d1)); };
    var G = P.map(function (a) { return P.map(function (c) { return K(a, c); }); }), al = P.map(function () { return 0; }), bb = 0;
    for (it = 0; it < 350; it++) {
      var lr = 0.5 / (1 + it * 0.02), g = al.map(function (v) { return 0; }), gbb = 0;
      for (i = 0; i < n; i++) {
        var fi = bb; for (var j = 0; j < n; j++) fi += al[j] * G[i][j];
        if (t[i] * fi < 1) { for (j = 0; j < n; j++) g[j] -= C * t[i] * G[i][j] / n; gbb -= C * t[i] / n; }
      }
      for (i = 0; i < n; i++) { var reg = 0; for (j = 0; j < n; j++) reg += G[i][j] * al[j]; al[i] -= lr * (g[i] + reg / n); }
      bb -= lr * gbb;
    }
    var df2 = function (a, c) { var s = bb; for (var i = 0; i < n; i++) s += al[i] * K(P[i], [a, c]); return s; };
    return { df: df2, sv: P.map(function (q, i) { return t[i] * df2(q[0], q[1]) <= 1.0001; }) };
  }
  var CLSM = {
    logistic: function (P, y, p) {
      var F = P.map(function (q) { return features(q, p.deg); }), d = F[0].length, w = F[0].map(function () { return 0; }), b = 0, lam = 1 / Math.pow(10, p.C) / P.length;
      for (var it = 0; it < 900; it++) {
        var g = w.map(function () { return 0; }), gb = 0;
        F.forEach(function (r, i) { var e = sig(b + r.reduce(function (s, v, j) { return s + v * w[j]; }, 0)) - y[i]; r.forEach(function (v, j) { g[j] += e * v; }); gb += e; });
        for (var j = 0; j < d; j++) w[j] -= 1.5 * (g[j] / P.length + lam * w[j] * P.length / P.length * 1); b -= 1.5 * gb / P.length;
      }
      return { prob: function (a, c) { var r = features([a, c], p.deg); return sig(b + r.reduce(function (s, v, j) { return s + v * w[j]; }, 0)); } };
    },
    knn: function (P, y, p) {
      return { prob: function (a, c) {
        var d = P.map(function (q, i) { return [(q[0] - a) * (q[0] - a) + (q[1] - c) * (q[1] - c), y[i]]; }).sort(function (u, v) { return u[0] - v[0]; }).slice(0, p.k);
        return mean(d.map(function (q) { return q[1]; }));
      } };
    },
    nb: function (P, y) {
      var st = [0, 1].map(function (k) {
        var Q = P.filter(function (_, i) { return y[i] === k; }), pri = Q.length / P.length;
        return { pri: pri, m: [0, 1].map(function (j) { return mean(Q.map(function (q) { return q[j]; })); }), v: [0, 1].map(function (j) { var mm = mean(Q.map(function (q) { return q[j]; })); return mean(Q.map(function (q) { return (q[j] - mm) * (q[j] - mm); })) + 1e-3; }) };
      });
      function ll(s, a, c) { var q = [a, c], l = Math.log(s.pri + 1e-9); for (var j = 0; j < 2; j++) l += -0.5 * Math.log(6.2832 * s.v[j]) - (q[j] - s.m[j]) * (q[j] - s.m[j]) / (2 * s.v[j]); return l; }
      return { prob: function (a, c) { var l0 = ll(st[0], a, c), l1 = ll(st[1], a, c); return sig(l1 - l0); }, stats: st };
    },
    tree: function (P, y, p) { var t = ctree(P, y, p.depth, p.leaf); return { prob: t, info: "leaves = " + t.leaves }; },
    forest: function (P, y, p) {
      var r = seeded(5), trees = [];
      for (var k = 0; k < p.n; k++) { var bp = [], by = []; for (var i = 0; i < P.length; i++) { var j = Math.floor(r() * P.length); bp.push(P[j]); by.push(y[j]); } trees.push(ctree(bp, by, p.depth, 1, r)); }
      return { prob: function (a, c) { return mean(trees.map(function (t) { return t(a, c); })); } };
    },
    ada: function (P, y, p) {
      var n = P.length, W = P.map(function () { return 1 / n; }), st = [];
      for (var m = 0; m < p.rounds; m++) {
        var t = ctree(P, y, 1, 1, null, W), err = 0;
        P.forEach(function (q, i) { if ((t(q[0], q[1]) > 0.5 ? 1 : 0) !== y[i]) err += W[i]; });
        err = Math.min(Math.max(err, 1e-6), 0.999);
        var al = 0.5 * Math.log((1 - err) / err); st.push([t, al]);
        var s = 0; P.forEach(function (q, i) { var h = t(q[0], q[1]) > 0.5 ? 1 : -1, yy = y[i] ? 1 : -1; W[i] *= Math.exp(-al * h * yy); s += W[i]; });
        W = W.map(function (v) { return v / s; });
      }
      return { prob: function (a, c) { var s = 0; st.forEach(function (q) { s += q[1] * (q[0](a, c) > 0.5 ? 1 : -1); }); return sig(2 * s); }, weights: W };
    },
    svm: function (P, y, p) { var m = kernelMachine(P, y, 0, Math.pow(10, p.C), true); return { prob: function (a, c) { return sig(3 * m.df(a, c)); }, df: m.df, sv: m.sv, lin: m }; },
    ksvm: function (P, y, p) { var m = kernelMachine(P, y, Math.pow(10, p.gamma), Math.pow(10, p.C), false); return { prob: function (a, c) { return sig(3 * m.df(a, c)); }, df: m.df, sv: m.sv }; }
  };
  var CLS_PARAMS = {
    logistic: [["deg", 1, 5, 1, 1, "polynomial degree"], ["C", -2, 3, 0.1, 1, "log10(C)"]],
    knn: [["k", 1, 40, 1, 5, "k"]], nb: [],
    tree: [["depth", 1, 10, 1, 3, "max_depth"], ["leaf", 1, 15, 1, 1, "min_samples_leaf"]],
    forest: [["n", 1, 60, 1, 25, "n_estimators"], ["depth", 1, 10, 1, 6, "max_depth"]],
    ada: [["rounds", 1, 100, 1, 20, "n_estimators"]],
    svm: [["C", -2, 2, 0.1, 0, "log10(C)"]],
    ksvm: [["C", -1, 3, 0.1, 1, "log10(C)"], ["gamma", -1, 2.5, 0.1, 1, "log10(gamma)"]]
  };
  var CLS_NAMES = { logistic: "Logistic regression", knn: "KNN", nb: "Gaussian naive Bayes", tree: "Decision tree", forest: "Random forest", ada: "AdaBoost", svm: "Linear SVM", ksvm: "Kernel SVM (RBF)" };
  function clsData(kind, seed, n, noise) {
    var r = seeded(seed), P = [], y = [];
    for (var i = 0; i < n; i++) {
      var k = i % 2, a, b;
      if (kind === "moons") { var t = r() * Math.PI; a = k ? 1 - Math.cos(t) : Math.cos(t); b = k ? 0.5 - Math.sin(t) : Math.sin(t); a = 0.27 + a * 0.24; b = 0.38 + b * 0.3; }
      else if (kind === "circles") { var ang = r() * 6.2832, rad = k ? 0.13 : 0.34; a = 0.5 + rad * Math.cos(ang); b = 0.5 + rad * Math.sin(ang); }
      else if (kind === "xor") { var qa = r() < 0.5, qb = k ? !qa : qa; a = (qa ? 0.7 : 0.3) + (r() - 0.5) * 0.32; b = (qb ? 0.7 : 0.3) + (r() - 0.5) * 0.32; }
      else { a = k ? 0.66 : 0.36; b = k ? 0.62 : 0.38; a += gauss(r) * 0.1; b += gauss(r) * 0.1; }
      a += gauss(r) * noise; b += gauss(r) * noise;
      P.push([Math.min(0.99, Math.max(0.01, a)), Math.min(0.99, Math.max(0.01, b))]); y.push(k);
    }
    return [P, y];
  }
  function clsLab(model, data, free) {
    return function (h, lang) {
      var S = 340, c = canvas(h, S, S), p = panel(h), seed = 4, kind = data || "moons", n = 90, noise = 0.05, P = {}, D, T, out, ctlBox, cls = 1, showProb = true;
      function load() { var d = clsData(kind, seed, n + 60, noise); D = [d[0].slice(0, n), d[1].slice(0, n)]; T = [d[0].slice(n), d[1].slice(n)]; }
      function params() {
        ctlBox.innerHTML = ""; P = {};
        (CLS_PARAMS[model] || []).forEach(function (q) { P[q[0]] = q[4]; var log = /log10/.test(q[5]); slider(ctlBox, q[5].replace("log10(", "").replace(")", ""), q[1], q[2], q[3], q[4], function (v) { P[q[0]] = v; draw(); }, log ? function (v) { return Math.pow(10, v).toPrecision(2); } : null); });
      }
      function draw() {
        var x = c.x, m = CLSM[model](D[0], D[1], P), G = 56, cs = S / G;
        for (var i = 0; i < G; i++) for (var j = 0; j < G; j++) {
          var pr = m.prob((i + 0.5) / G, 1 - (j + 0.5) / G), a = showProb ? Math.abs(pr - 0.5) * 0.9 + 0.08 : 0.35;
          x.fillStyle = pr >= 0.5 ? "rgba(232,89,12," + a * 0.55 + ")" : "rgba(91,52,196," + a * 0.55 + ")";
          x.clearRect(i * cs, j * cs, cs + 0.5, cs + 0.5); x.fillRect(i * cs, j * cs, cs + 0.5, cs + 0.5);
        }
        if (m.lin) {
          // Decision line and the two margin lines of the linear SVM.
          [0, 1, -1].forEach(function (lv, k) {
            x.strokeStyle = k ? "rgba(43,36,64,.6)" : C.k; x.setLineDash(k ? [5, 4] : []); x.lineWidth = k ? 1.3 : 2.2; x.beginPath();
            var w = m.lin.w, b = m.lin.b;
            if (Math.abs(w[1]) > 1e-9) { x.moveTo(0, S - S * ((lv - b) / w[1])); x.lineTo(S, S - S * ((lv - b - w[0]) / w[1])); }
            x.stroke();
          });
          x.setLineDash([]); x.lineWidth = 1;
        }
        T[0].forEach(function (q, i) { dot(x, q[0] * S, S - q[1] * S, 3.6, T[1][i] ? C.b : C.a, true); });
        D[0].forEach(function (q, i) { dot(x, q[0] * S, S - q[1] * S, 4.2, D[1][i] ? C.b : C.a); x.strokeStyle = "#fff"; x.beginPath(); x.arc(q[0] * S, S - q[1] * S, 4.2, 0, 7); x.stroke(); if (m.sv && m.sv[i]) dot(x, q[0] * S, S - q[1] * S, 7.5, C.k, true); });
        var acc = function (A) { var ok = 0; A[0].forEach(function (q, i) { if ((m.prob(q[0], q[1]) >= 0.5 ? 1 : 0) === A[1][i]) ok++; }); return ok / (A[0].length || 1); };
        var tp = 0, fp = 0, fn = 0, tn = 0; T[0].forEach(function (q, i) { var pr = m.prob(q[0], q[1]) >= 0.5 ? 1 : 0; if (pr && T[1][i]) tp++; else if (pr) fp++; else if (T[1][i]) fn++; else tn++; });
        var txt = tx(lang, "مدل: ", "Model: ") + CLS_NAMES[model] + "\n" + tx(lang, "دقت آموزش = ", "Train accuracy = ") + f(acc(D), 3) + "\n" + tx(lang, "دقت آزمون = ", "Test accuracy = ") + f(acc(T), 3) + "\n" + tx(lang, "ماتریس درهم‌ریختگی آزمون:", "Test confusion matrix:") + "\n  TP=" + tp + "  FP=" + fp + "\n  FN=" + fn + "  TN=" + tn;
        if (m.sv) txt += "\n" + tx(lang, "بردارهای پشتیبان: ", "Support vectors: ") + m.sv.filter(Boolean).length;
        if (m.prob.leaves) txt += "\n" + tx(lang, "تعداد برگ‌ها: ", "Leaves: ") + m.prob.leaves;
        out.textContent = txt;
      }
      c.el.onclick = function (e) { var q = pos(c, e); D[0].push([q[0] / S, 1 - q[1] / S]); D[1].push(cls); draw(); };
      if (free) select(p, tx(lang, "مدل", "Model"), Object.keys(CLS_NAMES).map(function (k) { return [k, CLS_NAMES[k]]; }), model, function (v) { model = v; params(); draw(); });
      select(p, tx(lang, "داده", "Data"), [["moons", tx(lang, "دو هلال", "two moons")], ["blobs", tx(lang, "دو خوشه", "two blobs")], ["circles", tx(lang, "دایره‌های تودرتو", "nested circles")], ["xor", "XOR"]], kind, function (v) { kind = v; load(); draw(); });
      slider(p, tx(lang, "نویز", "noise"), 0, 0.2, 0.01, noise, function (v) { noise = v; load(); draw(); });
      ctlBox = document.createElement("div"); ctlBox.className = "ctl"; ctlBox.style.minWidth = "0"; p.appendChild(ctlBox);
      var rw = row(p);
      var cb = button(rw, "", function () { cls = 1 - cls; lab(); }); function lab() { cb.textContent = tx(lang, "کلیک = کلاس ", "Click adds class ") + (cls ? tx(lang, "نارنجی", "orange") : tx(lang, "بنفش", "purple")); } lab();
      button(rw, tx(lang, "داده جدید", "New sample"), function () { seed += 5; load(); draw(); });
      var pb = button(rw, tx(lang, "نمایش احتمال", "Show probability"), function () { showProb = !showProb; pb.classList.toggle("on", showProb); draw(); }); pb.classList.add("on");
      out = readout(p);
      var lg = document.createElement("p"); lg.className = "labkey"; lg.innerHTML = tx(lang, "● نقطه پر: داده آموزش &nbsp; ○ نقطه توخالی: داده آزمون &nbsp; رنگ زمینه: پیش‌بینی مدل؛ هرچه پررنگ‌تر، مطمئن‌تر", "● filled: training data &nbsp; ○ hollow: test data &nbsp; background: model prediction; darker = more confident"); h.appendChild(lg);
      load(); params(); draw();
    };
  }

  /* ---------- Clustering labs ---------- */
  function blobPoints(seed, n, k, spread) {
    var r = seeded(seed), cs = [], P = [];
    for (var i = 0; i < k; i++) cs.push([0.18 + r() * 0.64, 0.18 + r() * 0.64]);
    for (i = 0; i < n; i++) { var c = cs[i % k]; P.push([c[0] + gauss(r) * spread, c[1] + gauss(r) * spread]); }
    return P;
  }
  function hierLab(h, lang) {
    var c = canvas(h, 300, 300), dg = canvas(h, 300, 300), p = panel(h), seed = 2, n = 14, link = "average", cut = 3, P, merges, out;
    function d(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }
    function cluster() {
      var groups = P.map(function (_, i) { return { m: [i], id: i, x: 0, h: 0 }; }); merges = [];
      while (groups.length > 1) {
        var best = null;
        for (var i = 0; i < groups.length; i++) for (var j = i + 1; j < groups.length; j++) {
          var ds = []; groups[i].m.forEach(function (a) { groups[j].m.forEach(function (b) { ds.push(d(P[a], P[b])); }); });
          var v = link === "single" ? Math.min.apply(null, ds) : link === "complete" ? Math.max.apply(null, ds) : mean(ds);
          if (link === "ward") { var ca = [mean(groups[i].m.map(function (a) { return P[a][0]; })), mean(groups[i].m.map(function (a) { return P[a][1]; }))], cb = [mean(groups[j].m.map(function (a) { return P[a][0]; })), mean(groups[j].m.map(function (a) { return P[a][1]; }))]; v = Math.sqrt(2 * groups[i].m.length * groups[j].m.length / (groups[i].m.length + groups[j].m.length)) * d(ca, cb); }
          if (!best || v < best.v) best = { i: i, j: j, v: v };
        }
        var A = groups[best.i], B = groups[best.j], N = { m: A.m.concat(B.m), a: A, b: B, h: best.v };
        merges.push(N); groups.splice(best.j, 1); groups.splice(best.i, 1, N);
      }
      return groups[0];
    }
    function draw() {
      var root = cluster(), x = dg.x, order = [];
      (function walk(g) { if (g.a) { walk(g.a); walk(g.b); } else order.push(g.m[0]); })(root);
      var H = root.h, sxp = function (i) { return 15 + order.indexOf(i) * (270 / (n - 1)); }, syh = function (v) { return 280 - v / H * 250; };
      x.clearRect(0, 0, 300, 300);
      // Cutting the tree to keep `cut` clusters: undo the last cut-1 merges.
      var thr = cut > 1 ? (merges[merges.length - cut].h + merges[merges.length - cut + 1].h) / 2 : H * 1.02;
      var labels = {}, cid = 0;
      (function assign(g) { if (g.h <= thr || !g.a) { g.m.forEach(function (i) { labels[i] = cid; }); cid++; } else { assign(g.a); assign(g.b); } })(root);
      (function line(g) {
        if (!g.a) return { x: sxp(g.m[0]), y: 280 };
        var A = line(g.a), B = line(g.b), y = syh(g.h);
        x.strokeStyle = g.h <= thr ? PAL[labels[g.m[0]] % 8] : "#888"; x.lineWidth = 1.6;
        x.beginPath(); x.moveTo(A.x, A.y); x.lineTo(A.x, y); x.lineTo(B.x, y); x.lineTo(B.x, B.y); x.stroke();
        return { x: (A.x + B.x) / 2, y: y };
      })(root);
      x.strokeStyle = C.r; x.setLineDash([5, 4]); x.beginPath(); x.moveTo(0, syh(thr)); x.lineTo(300, syh(thr)); x.stroke(); x.setLineDash([]);
      order.forEach(function (i) { x.fillStyle = "#555"; x.font = "10px sans-serif"; x.textAlign = "center"; x.fillText(i, sxp(i), 294); });
      var y2 = c.x; y2.clearRect(0, 0, 300, 300);
      P.forEach(function (q, i) { dot(y2, q[0] * 300, 300 - q[1] * 300, 6, PAL[labels[i] % 8]); y2.fillStyle = "#fff"; y2.font = "9px sans-serif"; y2.textAlign = "center"; y2.fillText(i, q[0] * 300, 303 - q[1] * 300); });
      out.textContent = tx(lang, "پیوند: ", "Linkage: ") + link + "\n" + tx(lang, "تعداد خوشه: ", "Clusters: ") + cut + "\n" + tx(lang, "ارتفاع برش = ", "Cut height = ") + f(thr, 3);
    }
    function load() { P = blobPoints(seed, n, 3, 0.08); }
    select(p, "linkage", [["single", "single"], ["complete", "complete"], ["average", "average"], ["ward", "ward"]], link, function (v) { link = v; draw(); });
    slider(p, tx(lang, "تعداد خوشه", "clusters"), 1, 8, 1, cut, function (v) { cut = v; draw(); });
    slider(p, tx(lang, "تعداد نقطه", "points"), 6, 30, 1, n, function (v) { n = v; load(); draw(); });
    button(row(p), tx(lang, "داده جدید", "New sample"), function () { seed += 3; load(); draw(); });
    out = readout(p); load(); draw();
  }
  function dbscanLab(h, lang) {
    var c = canvas(h, 380, 380), p = panel(h), seed = 6, eps = 0.07, minPts = 5, kind = "moons", P, out;
    function load() {
      if (kind === "blobs") P = blobPoints(seed, 150, 3, 0.05);
      else { var d = clsData(kind, seed, 160, 0.03); P = d[0]; }
      var r = seeded(seed + 9); for (var i = 0; i < 14; i++) P.push([r(), r()]);
    }
    function draw() {
      var n = P.length, nb = P.map(function (a) { var o = []; P.forEach(function (b, j) { if (Math.hypot(a[0] - b[0], a[1] - b[1]) <= eps) o.push(j); }); return o; });
      var core = nb.map(function (o) { return o.length >= minPts; }), lab = P.map(function () { return -1; }), k = 0;
      for (var i = 0; i < n; i++) {
        if (!core[i] || lab[i] >= 0) continue;
        var q = [i]; lab[i] = k;
        while (q.length) { var j = q.pop(); if (!core[j]) continue; nb[j].forEach(function (t) { if (lab[t] < 0) { lab[t] = k; q.push(t); } }); }
        k++;
      }
      var x = c.x; x.clearRect(0, 0, 380, 380);
      P.forEach(function (a, i) {
        if (core[i]) { x.fillStyle = "rgba(0,0,0,.035)"; x.beginPath(); x.arc(a[0] * 380, 380 - a[1] * 380, eps * 380, 0, 7); x.fill(); }
      });
      var noise = 0, border = 0;
      P.forEach(function (a, i) {
        if (lab[i] < 0) { noise++; x.strokeStyle = "#333"; x.beginPath(); x.moveTo(a[0] * 380 - 4, 376 - a[1] * 380); x.lineTo(a[0] * 380 + 4, 384 - a[1] * 380); x.moveTo(a[0] * 380 + 4, 376 - a[1] * 380); x.lineTo(a[0] * 380 - 4, 384 - a[1] * 380); x.stroke(); }
        else if (core[i]) dot(x, a[0] * 380, 380 - a[1] * 380, 4.5, PAL[lab[i] % 8]);
        else { border++; dot(x, a[0] * 380, 380 - a[1] * 380, 4.5, PAL[lab[i] % 8], true); }
      });
      out.textContent = tx(lang, "خوشه‌ها: ", "Clusters: ") + k + "\n" + tx(lang, "نقاط هسته: ", "Core points: ") + core.filter(Boolean).length + "\n" + tx(lang, "نقاط مرزی: ", "Border points: ") + border + "\n" + tx(lang, "نویز (×): ", "Noise (×): ") + noise;
    }
    select(p, tx(lang, "داده", "Data"), [["moons", tx(lang, "دو هلال", "two moons")], ["circles", tx(lang, "دایره‌ها", "circles")], ["blobs", tx(lang, "سه خوشه", "three blobs")]], kind, function (v) { kind = v; load(); draw(); });
    slider(p, "eps", 0.01, 0.2, 0.005, eps, function (v) { eps = v; draw(); });
    slider(p, "min_samples", 1, 15, 1, minPts, function (v) { minPts = v; draw(); });
    c.el.onclick = function (e) { var q = pos(c, e); P.push([q[0] / 380, 1 - q[1] / 380]); draw(); };
    out = readout(p);
    var lg = document.createElement("p"); lg.className = "labkey"; lg.innerHTML = tx(lang, "● پر: نقطه هسته &nbsp; ○ توخالی: نقطه مرزی &nbsp; ×: نویز &nbsp; سایه: همسایگی eps", "● filled: core point &nbsp; ○ hollow: border point &nbsp; ×: noise &nbsp; shading: eps neighborhood"); h.appendChild(lg);
    load(); draw();
  }
  function gmmLab(h, lang) {
    var c = canvas(h, 380, 380), p = panel(h), seed = 8, K = 3, P, M, out, it = 0;
    function load() {
      var r = seeded(seed); P = [];
      var spec = [[0.3, 0.65, 0.09, 0.03, 0.8], [0.62, 0.35, 0.05, 0.1, -0.6], [0.72, 0.75, 0.05, 0.05, 0]];
      for (var i = 0; i < 210; i++) { var s = spec[i % 3], a = gauss(r) * s[2], b = gauss(r) * s[3], cs = Math.cos(s[4]), sn = Math.sin(s[4]); P.push([s[0] + a * cs - b * sn, s[1] + a * sn + b * cs]); }
      init();
    }
    function init() {
      var r = seeded(seed + it + 1); it = 0;
      M = []; for (var k = 0; k < K; k++) { var q = P[Math.floor(r() * P.length)]; M.push({ m: [q[0], q[1]], S: [[0.02, 0], [0, 0.02]], w: 1 / K }); }
    }
    function pdf(g, q) {
      var a = g.S[0][0], b = g.S[0][1], d = g.S[1][1], det = a * d - b * b, dx = q[0] - g.m[0], dy = q[1] - g.m[1];
      return Math.exp(-0.5 * (d * dx * dx - 2 * b * dx * dy + a * dy * dy) / det) / (6.2832 * Math.sqrt(det));
    }
    function step() {
      var R = P.map(function (q) { var v = M.map(function (g) { return g.w * pdf(g, q); }), s = v.reduce(function (u, t) { return u + t; }, 0) || 1e-300; return v.map(function (t) { return t / s; }); });
      M.forEach(function (g, k) {
        var nk = 0, mx = 0, my = 0; P.forEach(function (q, i) { nk += R[i][k]; mx += R[i][k] * q[0]; my += R[i][k] * q[1]; });
        nk = Math.max(nk, 1e-6); g.m = [mx / nk, my / nk]; var a = 0, b = 0, d = 0;
        P.forEach(function (q, i) { var dx = q[0] - g.m[0], dy = q[1] - g.m[1]; a += R[i][k] * dx * dx; b += R[i][k] * dx * dy; d += R[i][k] * dy * dy; });
        g.S = [[a / nk + 1e-4, b / nk], [b / nk, d / nk + 1e-4]]; g.w = nk / P.length;
      });
      it++; draw();
    }
    function draw() {
      var x = c.x, ll = 0; x.clearRect(0, 0, 380, 380);
      P.forEach(function (q) {
        var v = M.map(function (g) { return g.w * pdf(g, q); }), s = v.reduce(function (u, t) { return u + t; }, 0); ll += Math.log(s + 1e-300);
        var col = [0, 0, 0]; v.forEach(function (t, k) { var hx = PAL[k]; col[0] += t / s * parseInt(hx.substr(1, 2), 16); col[1] += t / s * parseInt(hx.substr(3, 2), 16); col[2] += t / s * parseInt(hx.substr(5, 2), 16); });
        dot(x, q[0] * 380, 380 - q[1] * 380, 3.5, "rgb(" + col.map(Math.round).join(",") + ")");
      });
      M.forEach(function (g, k) {
        var a = g.S[0][0], b = g.S[0][1], d = g.S[1][1], tr = (a + d) / 2, df = Math.sqrt(Math.max(0, (a - d) * (a - d) / 4 + b * b)), l1 = tr + df, l2 = tr - df, ang = Math.atan2(l1 - a, b || 1e-12);
        x.save(); x.translate(g.m[0] * 380, 380 - g.m[1] * 380); x.rotate(-ang); x.strokeStyle = PAL[k]; x.lineWidth = 2;
        [1, 2].forEach(function (s) { x.beginPath(); x.ellipse(0, 0, s * Math.sqrt(Math.max(l1, 1e-6)) * 380, s * Math.sqrt(Math.max(l2, 1e-6)) * 380, 0, 0, 7); x.stroke(); });
        x.restore(); dot(x, g.m[0] * 380, 380 - g.m[1] * 380, 5, "#000");
      });
      out.textContent = tx(lang, "تکرار EM: ", "EM iteration: ") + it + "\nlog-likelihood = " + f(ll, 1) + "\n" + M.map(function (g, k) { return "π" + (k + 1) + " = " + f(g.w, 2); }).join("  ");
    }
    var t = null;
    slider(p, tx(lang, "تعداد مؤلفه K", "components K"), 1, 6, 1, K, function (v) { K = v; init(); draw(); });
    var rw = row(p);
    button(rw, tx(lang, "یک گام EM", "One EM step"), step);
    button(rw, tx(lang, "اجرای خودکار", "Auto run"), function () { if (t) { clearInterval(t); t = null; return; } t = setInterval(function () { if (!document.body.contains(c.el) || it > 80) { clearInterval(t); t = null; return; } step(); }, 160); });
    button(rw, tx(lang, "شروع دوباره", "Restart"), function () { seed += 1; init(); draw(); });
    out = readout(p); load(); draw();
  }

  /* ---------- Optimization and algorithms ---------- */
  function rastr(x) { return 0.5 * x * x + 2.2 * (1 - Math.cos(2.4 * x)) ; }
  function saLab(h, lang) {
    var c = canvas(h, 470, 290), p = panel(h), T0 = 6, cool = 0.97, x0 = -4.2, state, out, timer = null;
    var X = function (v) { return 235 + v * 45; }, Y = function (v) { return 270 - v * 12; };
    function reset() { state = { x: x0, best: x0, T: T0, k: 0, acc: 0, rej: 0, path: [x0] }; draw(); }
    function step() {
      var r = Math.random, cand = state.x + (r() - 0.5) * 1.6, d = rastr(cand) - rastr(state.x);
      if (d < 0 || r() < Math.exp(-d / Math.max(state.T, 1e-9))) { state.x = Math.max(-5, Math.min(5, cand)); state.acc++; } else state.rej++;
      if (rastr(state.x) < rastr(state.best)) state.best = state.x;
      state.T *= cool; state.k++; state.path.push(state.x); if (state.path.length > 60) state.path.shift(); draw();
    }
    function draw() {
      var x = c.x; x.clearRect(0, 0, 470, 290); x.strokeStyle = C.g; x.lineWidth = 2; x.beginPath();
      for (var v = -5; v <= 5; v += 0.02) x.lineTo(X(v), Y(rastr(v))); x.stroke(); x.lineWidth = 1;
      state.path.forEach(function (v, i) { dot(x, X(v), Y(rastr(v)), 2.5, "rgba(232,89,12," + (i / state.path.length) + ")"); });
      dot(x, X(state.x), Y(rastr(state.x)), 7, C.b); dot(x, X(state.best), Y(rastr(state.best)), 6, C.c, true);
      x.fillStyle = C.k; x.font = "12px sans-serif"; x.fillText("T = " + f(state.T, 3), 10, 16);
      out.textContent = tx(lang, "تکرار: ", "Iteration: ") + state.k + "\nT = " + f(state.T, 3) + "\nx = " + f(state.x, 3) + "   f(x) = " + f(rastr(state.x), 3) + "\n" + tx(lang, "بهترین: ", "Best: ") + "f = " + f(rastr(state.best), 3) + "\n" + tx(lang, "پذیرفته/رد: ", "accepted/rejected: ") + state.acc + "/" + state.rej;
    }
    slider(p, tx(lang, "دمای اولیه T0", "initial temperature T0"), 0.05, 15, 0.05, T0, function (v) { T0 = v; reset(); });
    slider(p, tx(lang, "ضریب سرد شدن", "cooling factor"), 0.8, 0.999, 0.001, cool, function (v) { cool = v; });
    var rw = row(p); button(rw, tx(lang, "یک گام", "One step"), step);
    button(rw, tx(lang, "اجرا / توقف", "Run / pause"), function () { if (timer) { clearInterval(timer); timer = null; return; } timer = setInterval(function () { if (!document.body.contains(c.el) || state.k > 600) { clearInterval(timer); timer = null; return; } step(); }, 40); });
    button(rw, tx(lang, "شروع دوباره", "Restart"), reset);
    out = readout(p); reset();
  }
  function gaLab(h, lang) {
    var c = canvas(h, 470, 290), p = panel(h), N = 16, pm = 0.05, pop, gen = 0, out, hist = [];
    var fit = function (v) { return 2 + Math.sin(v * 0.11) * Math.cos(v * 0.037) * 1.6 + v / 300; };   // v in 0..255 (8-bit chromosome)
    var X = function (v) { return 20 + v / 255 * 430; }, Y = function (v) { return 270 - v * 55; };
    function rnd() { return Math.floor(Math.random() * 256); }
    function reset() { pop = []; for (var i = 0; i < N; i++) pop.push(rnd()); gen = 0; hist = []; draw(); }
    function pick() { var a = pop[Math.floor(Math.random() * N)], b = pop[Math.floor(Math.random() * N)]; return fit(a) > fit(b) ? a : b; }   // tournament of two
    function step() {
      var best = pop.reduce(function (a, b) { return fit(a) > fit(b) ? a : b; }), next = [best];   // elitism keeps the best
      while (next.length < N) {
        var a = pick(), b = pick(), cut = 1 + Math.floor(Math.random() * 7), mask = (0xff << cut) & 0xff, child = (a & mask) | (b & ~mask & 0xff);
        for (var k = 0; k < 8; k++) if (Math.random() < pm) child ^= 1 << k;
        next.push(child);
      }
      pop = next; gen++; draw();
    }
    function draw() {
      var x = c.x; x.clearRect(0, 0, 470, 290); x.strokeStyle = C.g; x.lineWidth = 2; x.beginPath();
      for (var v = 0; v <= 255; v++) x.lineTo(X(v), Y(fit(v))); x.stroke(); x.lineWidth = 1;
      pop.forEach(function (v) { dot(x, X(v), Y(fit(v)), 5, C.b); });
      var best = pop.reduce(function (a, b) { return fit(a) > fit(b) ? a : b; }), avg = mean(pop.map(fit)); hist.push([fit(best), avg]);
      dot(x, X(best), Y(fit(best)), 9, C.c, true);
      out.textContent = tx(lang, "نسل: ", "Generation: ") + gen + "\n" + tx(lang, "بهترین کروموزوم: ", "Best chromosome: ") + ("00000000" + best.toString(2)).slice(-8) + " (" + best + ")\n" + tx(lang, "بهترین برازندگی = ", "Best fitness = ") + f(fit(best), 3) + "\n" + tx(lang, "میانگین برازندگی = ", "Mean fitness = ") + f(avg, 3) + "\n" + tx(lang, "جمعیت: ", "Population: ") + pop.slice(0, 6).map(function (v) { return ("00000000" + v.toString(2)).slice(-8); }).join(" ") + " …";
    }
    slider(p, tx(lang, "اندازه جمعیت", "population size"), 4, 40, 1, N, function (v) { N = v; reset(); });
    slider(p, tx(lang, "احتمال جهش هر بیت", "mutation rate per bit"), 0, 0.3, 0.01, pm, function (v) { pm = v; });
    var rw = row(p); button(rw, tx(lang, "نسل بعد", "Next generation"), step); button(rw, tx(lang, "۱۰ نسل", "10 generations"), function () { for (var i = 0; i < 10; i++) step(); }); button(rw, tx(lang, "شروع دوباره", "Restart"), reset);
    out = readout(p); reset();
  }
  function sortLab(h, lang) {
    var c = canvas(h, 470, 230), p = panel(h), algo = "bubble", n = 18, A, steps, k, out, timer = null;
    function gen() {
      A = []; for (var i = 0; i < n; i++) A.push(1 + Math.floor(Math.random() * 30));
      var a = A.slice(), s = []; var cmp = 0, sw = 0;
      function snap(i, j, kind) { s.push({ a: a.slice(), i: i, j: j, kind: kind, cmp: cmp, sw: sw }); }
      if (algo === "bubble") { for (var x = 0; x < a.length; x++) for (var y = 0; y < a.length - 1 - x; y++) { cmp++; snap(y, y + 1, "cmp"); if (a[y] > a[y + 1]) { var t = a[y]; a[y] = a[y + 1]; a[y + 1] = t; sw++; snap(y, y + 1, "swap"); } } }
      else if (algo === "selection") { for (x = 0; x < a.length; x++) { var m = x; for (y = x + 1; y < a.length; y++) { cmp++; snap(m, y, "cmp"); if (a[y] < a[m]) m = y; } if (m !== x) { t = a[x]; a[x] = a[m]; a[m] = t; sw++; snap(x, m, "swap"); } } }
      else { for (x = 1; x < a.length; x++) { y = x; while (y > 0) { cmp++; snap(y - 1, y, "cmp"); if (a[y - 1] > a[y]) { t = a[y]; a[y] = a[y - 1]; a[y - 1] = t; sw++; snap(y - 1, y, "swap"); y--; } else break; } } }
      snap(-1, -1, "done"); steps = s; k = 0; draw();
    }
    function draw() {
      var s = steps[k], x = c.x, w = 450 / s.a.length; x.clearRect(0, 0, 470, 230);
      s.a.forEach(function (v, i) { x.fillStyle = s.kind === "done" ? C.c : (i === s.i || i === s.j) ? (s.kind === "swap" ? C.r : C.b) : C.a; x.fillRect(10 + i * w, 220 - v * 6.5, w - 3, v * 6.5); x.fillStyle = "#fff"; x.font = "10px sans-serif"; x.textAlign = "center"; if (w > 16) x.fillText(v, 10 + i * w + (w - 3) / 2, 216); });
      out.textContent = tx(lang, "گام ", "Step ") + k + " / " + (steps.length - 1) + "\n" + tx(lang, "مقایسه‌ها: ", "Comparisons: ") + s.cmp + "\n" + tx(lang, "جابه‌جایی‌ها: ", "Swaps: ") + s.sw + "\n" + (s.kind === "swap" ? tx(lang, "جابه‌جا شد (قرمز)", "swapped (red)") : s.kind === "cmp" ? tx(lang, "مقایسه (نارنجی)", "comparing (orange)") : tx(lang, "مرتب شد!", "sorted!"));
    }
    select(p, tx(lang, "الگوریتم", "Algorithm"), [["bubble", "bubble sort"], ["selection", "selection sort"], ["insertion", "insertion sort"]], algo, function (v) { algo = v; gen(); });
    slider(p, tx(lang, "تعداد عدد", "how many numbers"), 5, 40, 1, n, function (v) { n = v; gen(); });
    var rw = row(p); button(rw, tx(lang, "گام بعد", "Next step"), function () { if (k < steps.length - 1) { k++; draw(); } });
    button(rw, tx(lang, "پخش / توقف", "Play / pause"), function () { if (timer) { clearInterval(timer); timer = null; return; } timer = setInterval(function () { if (!document.body.contains(c.el) || k >= steps.length - 1) { clearInterval(timer); timer = null; return; } k++; draw(); }, 70); });
    button(rw, tx(lang, "اعداد جدید", "New numbers"), gen);
    out = readout(p); gen();
  }
  function bsearchLab(h, lang) {
    var c = canvas(h, 470, 140), p = panel(h), A = [], target = 0, lo, hi, mid, found, steps, out;
    function gen() { var v = 2; A = []; for (var i = 0; i < 16; i++) { v += 1 + Math.floor(Math.random() * 6); A.push(v); } target = A[Math.floor(Math.random() * 16)]; reset(); }
    function reset() { lo = 0; hi = A.length - 1; mid = -1; found = null; steps = 0; draw(); }
    function step() {
      if (found !== null || lo > hi) return; mid = Math.floor((lo + hi) / 2); steps++;
      if (A[mid] === target) found = mid; else if (A[mid] < target) lo = mid + 1; else hi = mid - 1;
      if (lo > hi && found === null) found = -1; draw();
    }
    function draw() {
      var x = c.x; x.clearRect(0, 0, 470, 140);
      A.forEach(function (v, i) {
        var on = i >= lo && i <= hi && found === null;
        x.fillStyle = i === found ? C.c : i === mid ? C.b : on ? "#e5def8" : "#f1f1f1"; x.fillRect(8 + i * 28.5, 40, 26, 40);
        x.fillStyle = i === mid || i === found ? "#fff" : on ? C.k : "#bbb"; x.font = "700 13px monospace"; x.textAlign = "center"; x.fillText(v, 21 + i * 28.5, 65);
        x.fillStyle = "#888"; x.font = "10px monospace"; x.fillText(i, 21 + i * 28.5, 96);
      });
      x.fillStyle = C.k; x.font = "13px sans-serif"; x.textAlign = "left"; x.fillText(tx(lang, "دنبال ", "Looking for ") + target, 8, 22);
      out.textContent = "low = " + lo + "   high = " + hi + "   mid = " + (mid < 0 ? "-" : mid) + "\n" + tx(lang, "تعداد گام: ", "Steps: ") + steps + "\n" + (found === null ? tx(lang, "هر گام نیمی از بازه حذف می‌شود.", "Each step throws away half of the range.") : found >= 0 ? tx(lang, "پیدا شد در اندیس ", "Found at index ") + found : tx(lang, "پیدا نشد", "Not found"));
    }
    slider(p, tx(lang, "عدد هدف", "target value"), 0, 100, 1, 0, function (v) { target = v; reset(); });
    var rw = row(p); button(rw, tx(lang, "گام بعد", "Next step"), step); button(rw, tx(lang, "از اول", "Restart"), reset); button(rw, tx(lang, "لیست جدید", "New list"), gen);
    out = readout(p); gen();
  }
  function loopLab(h, lang) {
    // Shows a for loop over range(start, stop, step) one iteration at a time, with the running total.
    var c = canvas(h, 470, 120), p = panel(h), a = 0, b = 10, s = 1, k = -1, out;
    function vals() { var o = []; if (s > 0) for (var i = a; i < b && o.length < 40; i += s) o.push(i); else for (i = a; i > b && o.length < 40; i += s) o.push(i); return o; }
    function draw() {
      var v = vals(), x = c.x; x.clearRect(0, 0, 470, 120);
      v.forEach(function (n, i) { x.fillStyle = i === k ? C.b : i < k ? "#d9cff5" : "#f1f1f1"; x.fillRect(8 + (i % 16) * 28.5, 20 + Math.floor(i / 16) * 34, 26, 28); x.fillStyle = i === k ? "#fff" : C.k; x.font = "700 12px monospace"; x.textAlign = "center"; x.fillText(n, 21 + (i % 16) * 28.5, 39 + Math.floor(i / 16) * 34); });
      var total = v.slice(0, k + 1).reduce(function (q, t) { return q + t; }, 0);
      out.textContent = "for i in range(" + a + ", " + b + ", " + s + "):\n    total += i\n\n" + (k < 0 ? tx(lang, "هنوز شروع نشده", "not started") : "i = " + v[k] + "    total = " + total) + "\n" + tx(lang, "تعداد تکرار: ", "Iterations: ") + v.length + (v.length === 0 ? tx(lang, "  (حلقه هیچ‌وقت اجرا نمی‌شود)", "  (the loop never runs)") : "");
    }
    slider(p, "start", -5, 15, 1, a, function (v) { a = v; k = -1; draw(); });
    slider(p, "stop", -5, 25, 1, b, function (v) { b = v; k = -1; draw(); });
    slider(p, "step", -3, 4, 1, s, function (v) { s = v || 1; k = -1; draw(); });
    var rw = row(p); button(rw, tx(lang, "تکرار بعد", "Next iteration"), function () { if (k < vals().length - 1) k++; draw(); }); button(rw, tx(lang, "از اول", "Restart"), function () { k = -1; draw(); });
    out = readout(p); draw();
  }
  function truthLab(h, lang) {
    var p = panel(h), A = true, B = false, out;
    function draw() {
      var rows = [["A and B", A && B], ["A or B", A || B], ["not A", !A], ["A != B  (xor)", A !== B], ["not (A and B)", !(A && B)], ["(not A) or B", !A || B]];
      out.textContent = "A = " + (A ? "True" : "False") + "    B = " + (B ? "True" : "False") + "\n\n" + rows.map(function (r) { return (r[0] + "              ").slice(0, 16) + "→ " + (r[1] ? "True" : "False"); }).join("\n");
    }
    var rw = row(p);
    var ba = button(rw, "", function () { A = !A; lab(); draw(); }), bb = button(rw, "", function () { B = !B; lab(); draw(); });
    function lab() { ba.textContent = "A = " + (A ? "True" : "False"); bb.textContent = "B = " + (B ? "True" : "False"); ba.classList.toggle("on", A); bb.classList.toggle("on", B); }
    out = readout(p); lab(); draw();
  }
  function scaleLab(h, lang) {
    // Feature scaling: KNN distance dominated by the feature with the larger range.
    var c = canvas(h, 330, 330), p = panel(h), mode = "none", out, r = seeded(9), P = [];
    for (var i = 0; i < 40; i++) P.push([20 + r() * 60, 1000 + r() * 4000]);   // age, salary
    var q = [50, 3000];
    function tf(v) {
      if (mode === "none") return v;
      var s = [0, 1].map(function (j) { var col = P.map(function (t) { return t[j]; }); return { min: Math.min.apply(null, col), max: Math.max.apply(null, col), m: mean(col), sd: Math.sqrt(mean(col.map(function (u) { return (u - mean(col)) * (u - mean(col)); }))) }; });
      return v.map(function (u, j) { return mode === "minmax" ? (u - s[j].min) / (s[j].max - s[j].min) : (u - s[j].m) / s[j].sd; });
    }
    function draw() {
      var x = c.x; x.clearRect(0, 0, 330, 330);
      var T = P.map(tf), tq = tf(q), d = T.map(function (t, i) { return [Math.hypot(t[0] - tq[0], t[1] - tq[1]), i]; }).sort(function (a, b) { return a[0] - b[0]; }).slice(0, 5).map(function (z) { return z[1]; });
      var all = T.concat([tq]), mn = [0, 1].map(function (j) { return Math.min.apply(null, all.map(function (t) { return t[j]; })); }), mx = [0, 1].map(function (j) { return Math.max.apply(null, all.map(function (t) { return t[j]; })); });
      var span = mode === "none" ? Math.max(mx[0] - mn[0], mx[1] - mn[1]) : 0, sxx = function (t) { var w = span || (mx[0] - mn[0]); return 20 + (t[0] - mn[0]) / w * 290; }, syy = function (t) { var w = span || (mx[1] - mn[1]); return 310 - (t[1] - mn[1]) / w * 290; };
      T.forEach(function (t, i) { dot(x, sxx(t), syy(t), 4, d.indexOf(i) >= 0 ? C.b : C.a); });
      dot(x, sxx(tq), syy(tq), 7, C.c);
      out.textContent = tx(lang, "مقیاس‌بندی: ", "Scaling: ") + mode + "\n" + tx(lang, "۵ همسایه نزدیک (نارنجی) به نقطه سبز:", "5 nearest neighbors (orange) of the green point:") + "\n" + d.map(function (i) { return tx(lang, "سن ", "age ") + Math.round(P[i][0]) + ", " + tx(lang, "حقوق ", "salary ") + Math.round(P[i][1]); }).join("\n");
    }
    select(p, tx(lang, "روش", "Method"), [["none", tx(lang, "بدون مقیاس‌بندی", "no scaling")], ["minmax", "MinMaxScaler"], ["standard", "StandardScaler"]], mode, function (v) { mode = v; draw(); });
    out = readout(p);
    var lg = document.createElement("p"); lg.className = "labkey"; lg.innerHTML = tx(lang, "محور افقی: سن (۲۰ تا ۸۰)، محور عمودی: حقوق (۱۰۰۰ تا ۵۰۰۰). بدون مقیاس‌بندی، محورها با یک مقیاس رسم شده‌اند تا ببینی حقوق فاصله را تعیین می‌کند.", "x: age (20–80), y: salary (1000–5000). Without scaling both axes use the same units, so you can see salary decides the distance."); h.appendChild(lg);
    draw();
  }

  var L = function (fa, en, hfa, hen, mount) { return { title: { fa: fa, en: en }, help: { fa: hfa, en: hen }, mount: mount }; };
  var RH = ["مدل را روی داده آموزش (آبی) می‌سازیم و روی داده آزمون (نارنجی) می‌سنجیم. پارامترها را تغییر بده و خطای آزمون را دنبال کن. با کلیک نقطه اضافه کن.", "The model is fitted on the training data (blue) and checked on the test data (orange). Change the settings and watch the test error. Click to add points."];
  var CH = ["مرز تصمیم را ببین. پارامترها، داده و نویز را تغییر بده و دقت آموزش و آزمون را مقایسه کن. با کلیک نقطه اضافه کن.", "Watch the decision boundary. Change the settings, data and noise, and compare train and test accuracy. Click to add points."];
  Object.assign(window.Demos, {
    reg_linear: L("رگرسیون خطی ساده", "Simple linear regression", RH[0], RH[1], regLab("linear", "linear")),
    reg_poly: L("رگرسیون چندجمله‌ای", "Polynomial regression", RH[0], RH[1], regLab("poly", "sine")),
    reg_ridge: L("Ridge و اندازه ضرایب", "Ridge and coefficient size", RH[0] + " نمودار پایین اندازه ضرایب است.", RH[1] + " The bar chart shows the coefficients.", regLab("ridge", "sine")),
    reg_lasso: L("Lasso و صفر شدن ضرایب", "Lasso and zero coefficients", RH[0] + " ضرایب خاکستری صفر شده‌اند.", RH[1] + " Grey bars are coefficients that became exactly zero.", regLab("lasso", "sine")),
    reg_enet: L("Elastic Net", "Elastic Net", RH[0], RH[1], regLab("enet", "sine")),
    reg_knn: L("رگرسیون KNN", "KNN regression", RH[0], RH[1], regLab("knn", "sine")),
    reg_tree: L("درخت تصمیم رگرسیون", "Regression tree", RH[0], RH[1], regLab("tree", "step")),
    reg_forest: L("جنگل تصادفی رگرسیون", "Random forest regression", RH[0] + " خطوط کم‌رنگ درخت‌های تکی هستند.", RH[1] + " Faint lines are single trees.", regLab("forest", "sine")),
    reg_gbr: L("گرادیان بوستینگ رگرسیون", "Gradient boosting regression", RH[0], RH[1], regLab("gbr", "sine")),
    reg_svr: L("رگرسیون بردار پشتیبان (SVR)", "Support vector regression (SVR)", RH[0] + " نوار بنفش لوله ε است و نقاط قرمز بردار پشتیبان.", RH[1] + " The purple band is the ε-tube and red points are support vectors.", regLab("svr", "sine")),
    reg_all: L("مقایسه همه مدل‌های رگرسیون", "Compare all regression models", RH[0], RH[1], regLab("poly", "sine", true)),
    cls_logistic: L("رگرسیون لجستیک", "Logistic regression", CH[0], CH[1], clsLab("logistic", "blobs")),
    cls_knn: L("طبقه‌بندی KNN", "KNN classification", CH[0], CH[1], clsLab("knn", "moons")),
    cls_nb: L("بیز ساده گاوسی", "Gaussian naive Bayes", CH[0], CH[1], clsLab("nb", "blobs")),
    cls_tree: L("درخت تصمیم طبقه‌بندی", "Classification tree", CH[0], CH[1], clsLab("tree", "moons")),
    cls_forest: L("جنگل تصادفی", "Random forest", CH[0], CH[1], clsLab("forest", "moons")),
    cls_ada: L("AdaBoost", "AdaBoost", CH[0], CH[1], clsLab("ada", "circles")),
    cls_svm: L("SVM خطی و حاشیه", "Linear SVM and the margin", CH[0] + " خط پر مرز تصمیم، خط‌چین‌ها حاشیه و نقاط حلقه‌دار بردار پشتیبان هستند.", CH[1] + " The solid line is the boundary, dashed lines are the margin, ringed points are support vectors.", clsLab("svm", "blobs")),
    cls_ksvm: L("SVM با کرنل RBF", "SVM with an RBF kernel", CH[0], CH[1], clsLab("ksvm", "circles")),
    cls_all: L("مقایسه همه طبقه‌بندها", "Compare all classifiers", CH[0], CH[1], clsLab("logistic", "moons", true)),
    hier: L("خوشه‌بندی سلسله‌مراتبی و دندروگرام", "Hierarchical clustering and the dendrogram", "روش پیوند و تعداد خوشه را تغییر بده؛ خط‌چین قرمز جای برش دندروگرام است.", "Change the linkage and the number of clusters; the red dashed line is where the dendrogram is cut.", hierLab),
    dbscan: L("DBSCAN", "DBSCAN", "eps و min_samples را تغییر بده و ببین خوشه‌ها و نویز چطور عوض می‌شوند.", "Change eps and min_samples and watch the clusters and the noise change.", dbscanLab),
    gmm: L("مدل مخلوط گاوسی (EM)", "Gaussian mixture (EM)", "گام EM را بزن: بیضی‌ها جابه‌جا و کشیده می‌شوند تا داده را توضیح دهند. رنگ هر نقطه، احتمال عضویت است.", "Press the EM step: the ellipses move and stretch to explain the data. Each point's color is its membership probability.", gmmLab),
    sa: L("تبرید شبیه‌سازی‌شده", "Simulated annealing", "دمای بالا یعنی پذیرش حرکت‌های بد و فرار از کمینه محلی. دمای اولیه و سرعت سرد شدن را تغییر بده.", "High temperature means accepting bad moves and escaping local minima. Change the start temperature and the cooling speed.", saLab),
    ga: L("الگوریتم ژنتیک", "Genetic algorithm", "هر نقطه یک کروموزوم ۸ بیتی است. انتخاب، ترکیب و جهش را نسل‌به‌نسل ببین.", "Each point is an 8-bit chromosome. Watch selection, crossover and mutation generation by generation.", gaLab),
    sorting: L("الگوریتم‌های مرتب‌سازی", "Sorting algorithms", "گام‌به‌گام ببین هر الگوریتم چه مقایسه و جابه‌جایی‌ای انجام می‌دهد.", "See each comparison and swap step by step.", sortLab),
    bsearch: L("جستجوی دودویی", "Binary search", "در لیست مرتب، هر گام نیمی از بازه را کنار می‌گذارد.", "In a sorted list, each step discards half of the range.", bsearchLab),
    loop: L("حلقه for و range", "The for loop and range", "start، stop و step را تغییر بده و حلقه را تکرار‌به‌تکرار اجرا کن.", "Change start, stop and step, then run the loop one iteration at a time.", loopLab),
    truth: L("جدول درستی", "Truth table", "A و B را روشن و خاموش کن و نتیجه عملگرهای منطقی را ببین.", "Toggle A and B and see the logical operators' results.", truthLab),
    scaling: L("چرا مقیاس‌بندی ویژگی‌ها؟", "Why scale features?", "روش مقیاس‌بندی را عوض کن و ببین نزدیک‌ترین همسایه‌ها چطور تغییر می‌کنند.", "Switch the scaling method and see how the nearest neighbors change.", scaleLab)
  });
})();
