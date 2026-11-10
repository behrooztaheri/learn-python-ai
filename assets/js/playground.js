/* The free playground: several tabs (files), saved on this device only (localStorage + IndexedDB), never on a server.
   Users can download their code (.py or .ipynb), open their own .py/.ipynb files, upload data files that Python can read,
   and install extra packages from PyPI. */
window.Playground = (function () {
  var KEY = "pg-tabs-v2", FILES_DB = "pg-files";
  var S = {
    newTab: ["تب جدید", "New tab"], run: ["اجرا", "Run"], stop: ["توقف", "Stop"], dlPy: ["دانلود .py", "Download .py"], dlNb: ["دانلود نوت‌بوک", "Download notebook"],
    open: ["باز کردن فایل کد", "Open code file"], upload: ["آپلود فایل داده", "Upload data file"], clear: ["پاک کردن خروجی", "Clear output"],
    install: ["نصب کتابخانه", "Install package"], pkgPh: ["مثلاً seaborn", "e.g. seaborn"], files: ["فایل‌های پایتون در مرورگر", "Python's files in this browser"],
    noFiles: ["هنوز فایلی نیست. فایل CSV یا Excel خودت را آپلود کن یا با کد فایل بساز.", "No files yet. Upload your own CSV or Excel file, or create one with code."],
    saved: ["ذخیره شد روی همین مرورگر", "Saved in this browser"], rename: ["نام تب را بنویس:", "Tab name:"], closeQ: ["این تب بسته و کدش پاک شود؟", "Close this tab and delete its code?"],
    running: ["در حال اجرا...", "Running..."], installing: ["در حال نصب کتابخانه‌ها...", "Installing packages..."], loading: ["در حال بارگذاری پایتون؛ بار اول چند ثانیه طول می‌کشد...", "Loading Python. The first time takes a few seconds..."],
    ok: ["اجرا شد.", "Done."], err: ["برنامه با خطا متوقف شد. پیام قرمز را بخوان.", "The program stopped with an error. Read the red message."], stopped: ["متوقف شد.", "Stopped."],
    fail: ["پایتون بارگذاری نشد. اتصال اینترنت را بررسی کن.", "Python could not be loaded. Check your connection."],
    stdin: ["ورودی‌های input() (هر خط یک ورودی)", "Values for input() (one per line)"], resetAll: ["حذف همه تب‌ها", "Delete all tabs"], resetQ: ["همه تب‌ها و کدها از این مرورگر پاک شوند؟", "Delete all tabs and code from this browser?"],
    examples: ["نمونه‌ها", "Examples"], tip: ["کلیدها: Ctrl+Enter یا Shift+Enter برای اجرا. کدها فقط روی همین مرورگر ذخیره می‌شوند؛ برای نگه‌داشتن همیشگی، دانلود کن.",
      "Keys: Ctrl+Enter or Shift+Enter to run. Code is saved only in this browser; download it to keep it for good."]
  };
  var EXAMPLES = [
    ["plot.py", "import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(0, 10, 200)\nplt.plot(x, np.sin(x), label=\"sin\")\nplt.plot(x, np.cos(x), label=\"cos\")\nplt.legend()\nplt.title(\"Hello from your browser\")\nplt.show()"],
    ["pandas.py", "import pandas as pd\n\ndf = pd.DataFrame({\n    \"name\": [\"Ali\", \"Sara\", \"Reza\", \"Mina\"],\n    \"math\": [17, 19, 12, 15],\n    \"physics\": [14, 18, 11, 16],\n})\ndf[\"average\"] = df[[\"math\", \"physics\"]].mean(axis=1)\nprint(df.sort_values(\"average\", ascending=False))\ndf.to_csv(\"grades.csv\", index=False)\nprint(\"Saved grades.csv. Look at the file list below.\")"],
    ["seaborn.py", "%pip install seaborn\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\nimport pandas as pd, numpy as np\nrng = np.random.default_rng(0)\ndf = pd.DataFrame({\"x\": rng.normal(size=200), \"group\": rng.choice([\"A\", \"B\"], 200)})\ndf[\"y\"] = 2 * df.x + rng.normal(size=200)\nsns.scatterplot(data=df, x=\"x\", y=\"y\", hue=\"group\")\nplt.show()"],
    ["sklearn.py", "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.metrics import accuracy_score\n\nX, y = load_iris(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0)\nmodel = DecisionTreeClassifier(max_depth=3).fit(X_tr, y_tr)\nprint(\"Accuracy:\", accuracy_score(y_te, model.predict(X_te)))"],
    ["read_my_csv.py", "# 1) Click 'Upload data file' and choose a CSV file from your computer.\n# 2) Put its name below and run.\nimport pandas as pd\n\nname = \"grades.csv\"\ndf = pd.read_csv(name)\nprint(df.head())\nprint(df.describe())"],
    ["sympy.py", "import sympy as sp\n\nx = sp.symbols(\"x\")\nf = x**3 - 6*x**2 + 9*x + 1\nprint(\"f'(x) =\", sp.diff(f, x))\nprint(\"Critical points:\", sp.solve(sp.diff(f, x), x))\nprint(\"Integral:\", sp.integrate(f, x))"]
  ];

  function load() {
    try { var d = JSON.parse(localStorage.getItem(KEY)); if (d && d.tabs && d.tabs.length) return d; } catch (e) {}
    var old = null; try { old = localStorage.getItem("pg"); } catch (e) {}
    return { tabs: [{ id: 1, name: "main.py", code: old || EXAMPLES[0][1] }], active: 1, next: 2 };
  }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); return true; } catch (e) { return false; } }

  // Small IndexedDB store, so uploaded data files come back after a page reload or a stopped run.
  function db() {
    return new Promise(function (res, rej) {
      if (!window.indexedDB) return rej();
      var r = indexedDB.open(FILES_DB, 1);
      r.onupgradeneeded = function () { r.result.createObjectStore("f"); };
      r.onsuccess = function () { res(r.result); }; r.onerror = rej;
    });
  }
  function idb(mode, fn) { return db().then(function (d) { return new Promise(function (res, rej) { var t = d.transaction("f", mode), s = t.objectStore("f"), q = fn(s); t.oncomplete = function () { res(q && q.result); }; t.onerror = rej; }); }); }
  var putFile = function (n, b) { return idb("readwrite", function (s) { return s.put(b, n); }).catch(function () {}); };
  var delFile = function (n) { return idb("readwrite", function (s) { return s.delete(n); }).catch(function () {}); };
  var allFiles = function () {
    return db().then(function (d) {
      return new Promise(function (res) {
        var out = [], c = d.transaction("f").objectStore("f").openCursor();
        c.onsuccess = function () { var x = c.result; if (x) { out.push([x.key, x.value]); x.continue(); } else res(out); };
        c.onerror = function () { res(out); };
      });
    }).catch(function () { return []; });
  };

  function download(name, text, type) {
    var b = text instanceof Blob ? text : new Blob([text], { type: type || "text/plain" });
    var a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function notebook(tabs) {
    // Each tab becomes one titled code cell; "%pip install" lines stay valid in Colab and Jupyter.
    var cells = [];
    tabs.forEach(function (t) {
      cells.push({ cell_type: "markdown", metadata: {}, source: ["## " + t.name] });
      cells.push({ cell_type: "code", metadata: {}, execution_count: null, outputs: [], source: t.code.split("\n").map(function (l, i, a) { return i < a.length - 1 ? l + "\n" : l; }) });
    });
    return JSON.stringify({ cells: cells, metadata: { kernelspec: { display_name: "Python 3", language: "python", name: "python3" }, language_info: { name: "python" } }, nbformat: 4, nbformat_minor: 5 }, null, 1);
  }
  function fromNotebook(text) {
    var nb = JSON.parse(text);
    return nb.cells.filter(function (c) { return c.cell_type === "code"; }).map(function (c) { return [].concat(c.source).join(""); }).join("\n\n# ----- next cell -----\n\n");
  }
  function size(n) { return n < 1024 ? n + " B" : n < 1048576 ? (n / 1024).toFixed(1) + " KB" : (n / 1048576).toFixed(1) + " MB"; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }

  function mount(host, lang) {
    var L = lang === "fa" ? 0 : 1, t = function (k) { return S[k][L]; };
    var data = load(), outs = {}, ed, timer;
    var I = Runner.ICON;
    host.innerHTML = "";
    var box = el("div", "pg"); box.dir = "ltr"; host.appendChild(box);
    var tabsBar = el("div", "pg-tabs"); box.appendChild(tabsBar);
    var tools = el("div", "pg-tools"); box.appendChild(tools);
    var edHost = el("div", "pg-ed"); box.appendChild(edHost);
    var stdinBox = el("details", "pg-stdin", "<summary>" + t("stdin") + "</summary>"); stdinBox.dir = lang === "fa" ? "rtl" : "ltr";
    var stdin = el("textarea"); stdin.rows = 3; stdin.dir = "ltr"; stdinBox.appendChild(stdin); box.appendChild(stdinBox);
    var status = el("div", "pg-status"); status.dir = lang === "fa" ? "rtl" : "ltr"; box.appendChild(status);
    var out = el("div", "cell-out pg-out"); box.appendChild(out);
    var filesBox = el("div", "pg-files"); filesBox.dir = lang === "fa" ? "rtl" : "ltr"; box.appendChild(filesBox);
    var tip = el("p", "pg-tip", t("tip")); tip.dir = lang === "fa" ? "rtl" : "ltr"; box.appendChild(tip);

    function cur() { return data.tabs.filter(function (x) { return x.id === data.active; })[0] || data.tabs[0]; }
    function persist() {
      cur().code = ed ? ed.getValue() : ta.value;
      clearTimeout(timer);
      timer = setTimeout(function () { if (save(data)) { status.textContent = t("saved"); status.className = "pg-status ok"; setTimeout(function () { if (status.textContent === t("saved")) status.textContent = ""; }, 1300); } }, 400);
    }
    function drawTabs() {
      tabsBar.innerHTML = "";
      data.tabs.forEach(function (x) {
        var b = el("div", "pg-tab" + (x.id === data.active ? " on" : ""));
        var n = el("span", "", ""); n.textContent = x.name; n.title = lang === "fa" ? "دوبار کلیک برای تغییر نام" : "Double-click to rename";
        n.onclick = function () { if (x.id !== data.active) { persist(); data.active = x.id; save(data); show(); } };
        n.ondblclick = function () { var v = prompt(t("rename"), x.name); if (v && v.trim()) { x.name = v.trim().replace(/[\\/:*?"<>|]/g, "_"); if (!/\.\w+$/.test(x.name)) x.name += ".py"; save(data); drawTabs(); } };
        b.appendChild(n);
        if (data.tabs.length > 1) {
          var c = el("button", "pg-x", "×"); c.title = "Close";
          c.onclick = function (e) { e.stopPropagation(); if (x.code.trim() && !confirm(t("closeQ"))) return; data.tabs = data.tabs.filter(function (y) { return y !== x; }); if (data.active === x.id) data.active = data.tabs[0].id; save(data); show(); };
          b.appendChild(c);
        }
        tabsBar.appendChild(b);
      });
      var add = el("button", "pg-add", "+"); add.title = t("newTab");
      add.onclick = function () { persist(); newTab("tab" + data.next + ".py", "# " + t("newTab") + "\n"); };
      tabsBar.appendChild(add);
    }
    function newTab(name, code) { var x = { id: data.next++, name: name, code: code }; data.tabs.push(x); data.active = x.id; save(data); show(); }
    var ta = null;
    if (window.CodeMirror) {
      ed = CodeMirror(edHost, { value: "", mode: "python", lineNumbers: true, indentUnit: 4, viewportMargin: Infinity, direction: "ltr",
        extraKeys: { "Shift-Enter": run, "Ctrl-Enter": run, "Cmd-Enter": run, Tab: function (c) { if (c.somethingSelected()) c.indentSelection("add"); else c.replaceSelection("    "); } } });
      ed.on("change", persist);
    } else {
      ta = el("textarea", "plain-code"); ta.rows = 18; ta.oninput = persist; edHost.appendChild(ta);
    }
    function show() {
      drawTabs();
      var c = cur(); data.active = c.id;
      if (ed) { ed.off("change", persist); ed.setValue(c.code); ed.clearHistory(); ed.on("change", persist); setTimeout(function () { ed.refresh(); }, 0); } else ta.value = c.code;
      out.innerHTML = ""; out.hidden = true;
      if (outs[c.id]) { outs[c.id].forEach(function (n) { out.appendChild(n); }); out.hidden = !outs[c.id].length; }
    }

    function btn(label, icon, fn, cls) { var b = el("button", "cbtn " + (cls || ""), (icon || "") + "<span>" + label + "</span>"); b.onclick = fn; tools.appendChild(b); return b; }
    var bRun = btn(t("run"), I.run, run, "run");
    btn(t("dlPy"), '<svg viewBox="0 0 24 24"><path d="M12 4v11m-5-5 5 5 5-5M5 20h14"/></svg>', function () { persist(); var c = cur(); download(/\.\w+$/.test(c.name) ? c.name : c.name + ".py", c.code); });
    btn(t("dlNb"), '<svg viewBox="0 0 24 24"><path d="M12 4v11m-5-5 5 5 5-5M5 20h14"/></svg>', function () { persist(); download("playground.ipynb", notebook(data.tabs), "application/json"); });
    var pick = el("input"); pick.type = "file"; pick.accept = ".py,.ipynb,.txt"; pick.hidden = true; box.appendChild(pick);
    btn(t("open"), '<svg viewBox="0 0 24 24"><path d="M4 7h6l2 2h8v10H4z"/></svg>', function () { pick.click(); });
    pick.onchange = function () {
      var f = pick.files[0]; if (!f) return; var r = new FileReader();
      r.onload = function () { var txt = r.result; try { if (/\.ipynb$/i.test(f.name)) txt = fromNotebook(txt); } catch (e) {} persist(); newTab(f.name.replace(/\.ipynb$/i, ".py"), txt); };
      r.readAsText(f); pick.value = "";
    };
    var up = el("input"); up.type = "file"; up.multiple = true; up.hidden = true; box.appendChild(up);
    btn(t("upload"), '<svg viewBox="0 0 24 24"><path d="M12 20V9m-5 5 5-5 5 5M5 4h14"/></svg>', function () { up.click(); });
    up.onchange = function () {
      [].forEach.call(up.files, function (f) {
        var r = new FileReader();
        r.onload = function () { putFile(f.name, r.result.slice(0)); Runner.put(f.name, r.result); };
        r.readAsArrayBuffer(f);
      });
      up.value = "";
    };
    btn(t("clear"), "", function () { out.innerHTML = ""; out.hidden = true; outs[cur().id] = []; });
    var ex = el("select", "pg-ex"); ex.innerHTML = "<option value=''>" + t("examples") + "…</option>" + EXAMPLES.map(function (e, i) { return "<option value='" + i + "'>" + e[0] + "</option>"; }).join("");
    ex.onchange = function () { if (ex.value === "") return; persist(); var e = EXAMPLES[+ex.value]; newTab(e[0], e[1]); ex.value = ""; };
    tools.appendChild(ex);
    var pip = el("form", "pg-pip"); pip.innerHTML = '<input placeholder="' + t("pkgPh") + '" dir="ltr"><button class="cbtn">' + t("install") + "</button>"; tools.appendChild(pip);
    pip.onsubmit = function (e) {
      e.preventDefault(); var v = pip.querySelector("input").value.trim(); if (!v) return;
      runCode("%pip install " + v.replace(/[^\w\-.=<>\[\], ]/g, "") + "\nprint('OK')");
      pip.querySelector("input").value = "";
    };
    btn(t("resetAll"), "", function () { if (!confirm(t("resetQ"))) return; try { localStorage.removeItem(KEY); localStorage.removeItem("pg"); } catch (e) {} data = load(); outs = {}; show(); }, "ghost");

    function setStatus(k, cls) { status.textContent = k ? t(k) : ""; status.className = "pg-status " + (cls || ""); }
    function addOut(node) { out.hidden = false; out.appendChild(node); (outs[cur().id] = outs[cur().id] || []).push(node); }
    function pre(text, err) {
      var last = out.lastChild;
      if (last && last.tagName === "PRE" && last.classList.contains("err") === !!err) { last.textContent += text; return; }
      var p = el("pre", err ? "err" : ""); p.textContent = text; addOut(p);
    }
    function setRun(on) { bRun.classList.toggle("stop", on); bRun.innerHTML = (on ? I.stop : I.run) + "<span>" + t(on ? "stop" : "run") + "</span>"; }
    function run() { persist(); runCode(cur().code); }
    function runCode(code) {
      if (bRun.classList.contains("stop")) { Runner.stop(); return; }
      out.innerHTML = ""; outs[cur().id] = []; out.hidden = true; setRun(true); setStatus("running");
      Runner.run({
        code: code, stdin: stdin.value ? stdin.value.split("\n") : [],
        waiting: function () { setStatus("loading"); },
        info: function (k) { setStatus(k === "installing" ? "installing" : "running"); },
        clear: function () { out.innerHTML = ""; out.hidden = true; outs[cur().id] = []; },
        out: function (s, e) { pre(s, e); },
        img: function (d) { var i = new Image(); i.src = "data:image/png;base64," + d; i.alt = "plot"; addOut(i); },
        done: function (failed) { setRun(false); setStatus(failed ? "err" : "ok", failed ? "bad" : "ok"); },
        fail: function () { setRun(false); setStatus("fail", "bad"); },
        stopped: function () { setRun(false); setStatus("stopped"); }
      });
    }

    // The worker's file list, with download and delete buttons.
    function drawFiles(list) {
      filesBox.innerHTML = "<h4>" + t("files") + "</h4>";
      if (!list.length) { filesBox.appendChild(el("p", "pg-none", t("noFiles"))); return; }
      var ul = el("ul"); filesBox.appendChild(ul);
      list.forEach(function (f) {
        var li = el("li"); var n = el("code"); n.textContent = f[0]; li.appendChild(n); li.appendChild(el("small", "", size(f[1])));
        var d = el("button", "cbtn", "⬇"); d.title = "Download"; d.onclick = function () { Runner.get(f[0]).then(function (buf) { download(f[0].split("/").pop(), new Blob([buf])); }); };
        var x = el("button", "cbtn", "×"); x.title = "Delete"; x.onclick = function () { delFile(f[0]); Runner.rm(f[0]); };
        li.appendChild(d); li.appendChild(x); ul.appendChild(li);
      });
    }
    Runner.onFiles(drawFiles);
    drawFiles([]);
    // Saved data files go back into Python's folder every time it starts.
    var lastState = null;
    function restore() { allFiles().then(function (fs) { fs.forEach(function (x) { Runner.put(x[0], x[1].slice(0)); }); if (!fs.length) Runner.ls(); }); }
    var watch = setInterval(function () {
      if (!document.body.contains(box)) { clearInterval(watch); Runner.offFiles(drawFiles); return; }
      var s = Runner.state(); if (s !== lastState) { if ((s === "loading" || s === "ready") && (lastState === null || lastState === "off" || lastState === "failed")) restore(); lastState = s; }
    }, 400);
    show();
  }
  // Copies a lesson's code into a new playground tab and opens the playground.
  function adopt(name, code) { var d = load(); var x = { id: d.next++, name: name, code: code }; d.tabs.push(x); d.active = x.id; save(d); location.hash = "#/play"; }
  return { mount: mount, download: download, adopt: adopt };
})();
