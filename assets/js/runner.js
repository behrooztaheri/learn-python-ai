/* Editable code cells: copy, reset, run in the browser, open in Google Colab. */
window.Runner = (function () {
  var worker = null, state = "off", queue = null, current = null, onState = [], onFiles = [], gets = {};

  function setState(s) { state = s; onState.forEach(function (f) { f(s); }); }
  function start() {
    worker = new Worker("assets/js/py-worker.js?v=" + (window.SITE_VERSION || 1));
    setState("loading");
    worker.onmessage = function (e) {
      var m = e.data;
      if (m.type === "ready") { setState("ready"); if (queue) { var q = queue; queue = null; send(q); } return; }
      if (m.type === "files") { onFiles.forEach(function (f) { f(m.list); }); return; }
      if (m.type === "file") { if (gets[m.name]) { gets[m.name](m.data); delete gets[m.name]; } return; }
      if (m.type === "fatal") { setState("failed"); if (current) current.fail(m.text); return; }
      if (!current) return;
      if (m.type === "clear") { if (current.clear) current.clear(); return; }
      if (m.type === "ask" || m.type === "need") { ask(current, m); return; }
      if (m.type === "info") { if (current.info) current.info(m.text); return; }
      if (m.type === "out") current.out(m.text, false);
      if (m.type === "err") current.out(m.text, true);
      if (m.type === "img") current.img(m.data);
      if (m.type === "done") {
        var c = current; current = null; setState("ready"); c.done(m.failed);
        if (queue) { var n = queue; queue = null; send(n); }
      }
    };
    worker.onerror = function () { setState("failed"); if (current) { current.fail(); current = null; } };
  }
  function send(job) {
    current = job; setState("running");
    if (!job.seed) job.seed = 1 + Math.floor(Math.random() * 1e9);
    job.stdin = (job.stdin || []).slice();
    while (job.stdin.length && job.stdin[job.stdin.length - 1] === "") job.stdin.pop();   // an empty box is not an empty answer
    worker.postMessage({ code: job.code, stdin: job.stdin, seed: job.seed });
  }
  // input() in the program: show a small answer box in the output.
  function ask(job, m) {
    function reply(v) {
      if (current !== job) return;
      if (m.type === "ask") { worker.postMessage({ type: "answer", value: v }); return; }
      job.stdin.push(v);                              // older browsers: run again with all answers so far
      if (job.clear) job.clear();
      worker.postMessage({ code: job.code, stdin: job.stdin, seed: job.seed });
    }
    if (job.ask) { job.ask(m.prompt, reply); return; }
    var v = window.prompt(m.prompt || "input()");
    if (v === null) stop(); else reply(v);
  }
  // The answer box. cb(value) is called once, when the user presses Enter or the button.
  function askBox(prompt, cb) {
    var f = document.createElement("form"); f.className = "askbox"; f.dir = "ltr";
    var s = document.createElement("span"); s.textContent = prompt || "input()";
    var i = document.createElement("input"); i.autocomplete = "off"; i.spellcheck = false;
    var b = document.createElement("button"); b.className = "cbtn"; b.type = "submit"; b.textContent = "↵";
    f.appendChild(s); f.appendChild(i); f.appendChild(b);
    f.onsubmit = function (e) { e.preventDefault(); var v = i.value; f.remove(); cb(v); };
    setTimeout(function () { try { i.focus({ preventScroll: false }); } catch (x) {} }, 0);
    return f;
  }
  function run(job) {
    if (!worker) start();
    if (state === "failed") { job.fail(); return; }
    if (state === "loading" || state === "running") {
      // Only one program runs at a time. The latest request waits for its turn.
      if (queue) queue.stopped();
      queue = job; job.waiting(); return;
    }
    send(job);
  }
  function stop() {
    document.querySelectorAll(".askbox").forEach(function (f) { f.remove(); });
    if (worker) worker.terminate();
    worker = null;
    var c = current, q = queue; current = null; queue = null;
    setState("off");
    if (c) c.stopped();
    if (q) q.stopped();
  }

  // Files in the browser's Python folder: upload, download, delete, list.
  function ensure() { if (!worker) start(); return worker; }
  function put(name, buf) { ensure().postMessage({ type: "put", name: name, data: buf }, [buf]); }
  function get(name) { return new Promise(function (res) { gets[name] = res; ensure().postMessage({ type: "get", name: name }); }); }
  function rm(name) { ensure().postMessage({ type: "rm", name: name }); }
  function ls() { if (worker) worker.postMessage({ type: "ls" }); }

  function colabUrl(id, lang) {
    var owner = SITE.owner, repo = SITE.repo, h = location.hostname;
    if (!owner && /\.github\.io$/.test(h)) {
      owner = h.split(".")[0];
      repo = location.pathname.split("/").filter(Boolean)[0] || h;
    }
    if (!owner || !repo) return null;
    return "https://colab.research.google.com/github/" + owner + "/" + repo + "/blob/" + SITE.branch + "/notebooks/" + lang + "/" + id + ".ipynb";
  }

  function btn(cls, label, icon) {
    var b = document.createElement("button");
    b.className = "cbtn " + cls;
    b.innerHTML = (icon || "") + "<span>" + label + "</span>";
    return b;
  }
  var ICON = {
    run: '<svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z" fill="currentColor" stroke="none"/></svg>',
    copy: '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/></svg>',
    reset: '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.500-5.800M4 4v5h5"/></svg>',
    stop: '<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" stroke="none"/></svg>',
    colab: '<svg viewBox="0 0 24 24"><circle cx="8" cy="12" r="5"/><circle cx="16" cy="12" r="5"/></svg>'
  };

  // Build one code cell. T = translation function, id = lesson id.
  function cell(item, id, T, lang) {
    var wrap = document.createElement("div");
    wrap.className = "cell"; wrap.dir = "ltr";
    var bar = document.createElement("div"); bar.className = "cell-bar";
    var tag = document.createElement("span"); tag.className = "cell-tag";
    tag.textContent = item.lang === "bash" ? "terminal" : "python";
    bar.appendChild(tag);
    var actions = document.createElement("div"); actions.className = "cell-actions"; bar.appendChild(actions);
    wrap.appendChild(bar);

    var runnable = item.run !== false && item.lang !== "bash" && !item.colabOnly;
    var editable = item.lang !== "bash";
    var host = document.createElement("div"); host.className = "cell-code"; wrap.appendChild(host);
    var ed = null, ta = null;
    if (editable && window.CodeMirror) {
      ed = CodeMirror(host, { value: item.src, mode: "python", lineNumbers: true, indentUnit: 4, viewportMargin: Infinity, lineWrapping: false, direction: "ltr",
        extraKeys: { "Shift-Enter": function () { if (runnable) doRun(); }, Tab: function (c) { c.replaceSelection("    "); } } });
    } else {
      ta = document.createElement("textarea"); ta.value = item.src; ta.spellcheck = false; ta.className = "plain-code";
      ta.rows = item.src.split("\n").length + 1; ta.readOnly = !editable; host.appendChild(ta);
    }
    var get = function () { return ed ? ed.getValue() : ta.value; };
    var set = function (v) { if (ed) ed.setValue(v); else ta.value = v; };
    wrap._refresh = function () { if (ed) ed.refresh(); };

    var stdinWrap = null, stdin = null;
    if (runnable && /\binput\s*\(/.test(item.src)) {
      stdinWrap = document.createElement("label"); stdinWrap.className = "stdin"; stdinWrap.dir = lang === "fa" ? "rtl" : "ltr";
      stdinWrap.innerHTML = "<span>" + T("stdin") + "</span>";
      stdin = document.createElement("textarea"); stdin.rows = 2; stdin.dir = "ltr"; stdin.value = item.stdin || "";
      stdinWrap.appendChild(stdin); wrap.appendChild(stdinWrap);
    }
    var out = document.createElement("div"); out.className = "cell-out"; out.hidden = true; wrap.appendChild(out);
    var status = document.createElement("div"); status.className = "cell-status"; status.dir = lang === "fa" ? "rtl" : "ltr"; status.hidden = true; wrap.appendChild(status);
    function say(s) { status.hidden = !s; status.textContent = s || ""; }
    function pre(t, err) {
      out.hidden = false;
      var last = out.lastChild;
      if (last && last.tagName === "PRE" && last.classList.contains("err") === !!err) last.textContent += t;
      else { var p = document.createElement("pre"); if (err) p.className = "err"; p.textContent = t; out.appendChild(p); }
    }

    var bCopy = btn("", T("copy"), ICON.copy);
    bCopy.onclick = function () {
      var done = function () { var s = bCopy.querySelector("span"); s.textContent = T("copied"); setTimeout(function () { s.textContent = T("copy"); }, 1400); };
      if (navigator.clipboard) navigator.clipboard.writeText(get()).then(done, fallback); else fallback();
      function fallback() { var t = document.createElement("textarea"); t.value = get(); document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); done(); }
    };
    actions.appendChild(bCopy);
    if (editable) {
      var bReset = btn("", T("reset"), ICON.reset);
      bReset.onclick = function () { set(item.src); out.innerHTML = ""; out.hidden = true; say(""); };
      actions.appendChild(bReset);
    }
    if (editable && window.Playground) {
      var bPg = btn("", T("toPg"), '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/></svg>');
      bPg.title = T("toPg");
      bPg.onclick = function () { Playground.adopt((id || "exercise") + ".py", get()); };
      actions.appendChild(bPg);
    }
    var url = editable && id ? colabUrl(id, lang) : null;
    if (url) {
      var a = document.createElement("a"); a.className = "cbtn colab"; a.href = url; a.target = "_blank"; a.rel = "noopener";
      a.innerHTML = ICON.colab + "<span>Colab</span>"; actions.appendChild(a);
    }
    var bRun = null;
    function doRun() {
      if (bRun.classList.contains("stop")) { stop(); return; }
      out.innerHTML = ""; out.hidden = true; say(T("running"));
      setBtn(true);
      Runner.run({
        code: get(), stdin: stdin ? stdin.value.split("\n") : [],
        waiting: function () { say(T("loadingPy")); },
        info: function (t) { say(T(t === "installing" ? "installing" : "running")); },
        clear: function () { out.innerHTML = ""; out.hidden = true; },
        ask: function (p, cb) { out.hidden = false; say(T("typeAnswer")); out.appendChild(askBox(p, function (v) { say(T("running")); cb(v); })); },
        out: function (t, e) { say(T("running")); pre(t, e); },
        img: function (d) { out.hidden = false; var i = new Image(); i.src = "data:image/png;base64," + d; i.alt = "plot"; out.appendChild(i); },
        done: function (failed) { setBtn(false); say(failed ? T("runError") : ""); if (!failed && !out.childNodes.length) say(T("noOutput")); },
        fail: function () { setBtn(false); say(T("pyFail")); },
        stopped: function () { setBtn(false); say(T("stopped")); }
      });
    }
    function setBtn(on) {
      bRun.classList.toggle("stop", on);
      bRun.innerHTML = (on ? ICON.stop : ICON.run) + "<span>" + T(on ? "stop" : "run") + "</span>";
    }
    if (runnable) {
      bRun = btn("run", T("run"), ICON.run);
      bRun.title = "Shift+Enter";
      bRun.onclick = doRun;
      actions.appendChild(bRun);
    } else if (item.colabOnly) {
      var n = document.createElement("span"); n.className = "cell-note"; n.dir = lang === "fa" ? "rtl" : "ltr"; n.textContent = T("colabOnly"); bar.insertBefore(n, actions);
    }
    return wrap;
  }

  return { run: run, stop: stop, cell: cell, askBox: askBox, colabUrl: colabUrl, put: put, get: get, rm: rm, ls: ls, ICON: ICON,
    onFiles: function (f) { onFiles.push(f); }, offFiles: function (f) { onFiles = onFiles.filter(function (g) { return g !== f; }); },
    state: function () { return state; } };
})();
