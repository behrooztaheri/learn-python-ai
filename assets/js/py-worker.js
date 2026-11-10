/* Runs Python (Pyodide) in a Web Worker, so the page stays responsive and a run can be stopped.
   GitHub Pages cannot send the headers needed for SharedArrayBuffer, so stopping = terminating this worker.
   Before each run the worker installs what the code needs:
   - packages built into Pyodide (numpy, pandas, scipy, scikit-learn, matplotlib, sympy, statsmodels, ...)
   - pure-Python packages from PyPI through micropip (seaborn, scikit-fuzzy, ...)
   - lines such as "%pip install name" or "!pip install name" are run as installs and removed from the code. */
var PYODIDE = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/";
importScripts(PYODIDE + "pyodide.js");

var py = null;
var ready = (async function () {
  py = await loadPyodide({ indexURL: PYODIDE });
  py.setStdout({ batched: function (s) {
    if (/^(Loading |Loaded |Didn't find package|.* already loaded from )/.test(s)) return;   // package-loader chatter
    postMessage({ type: "out", text: s + "\n" });
  } });
  py.setStderr({ batched: function (s) {
    if (/non-interactive|building the font cache|Matplotlib is building/.test(s)) return;   // harmless notices in the browser
    postMessage({ type: "err", text: s + "\n" });
  } });
  await py.loadPackage("micropip", { messageCallback: function () {} });
  await py.runPythonAsync([
    "import os, sys, builtins, io, base64, logging, warnings, importlib",
    "warnings.filterwarnings('ignore', message='.*non-interactive.*')",
    "logging.getLogger('matplotlib.font_manager').setLevel(logging.ERROR)",
    "os.environ['MPLBACKEND'] = 'AGG'",
    "os.makedirs('/home/pyodide/work', exist_ok=True)",
    "os.chdir('/home/pyodide/work')",
    "_stdin = []",
    "def _input(prompt=''):",
    "    if prompt: print(prompt, end='')",
    "    value = _stdin.pop(0) if _stdin else ''",
    "    print(value)",
    "    return value",
    "builtins.input = _input",
    "def _figures():",
    "    if 'matplotlib.pyplot' not in sys.modules: return []",
    "    plt = sys.modules['matplotlib.pyplot']",
    "    out = []",
    "    for n in plt.get_fignums():",
    "        buf = io.BytesIO()",
    "        plt.figure(n).savefig(buf, format='png', dpi=110, bbox_inches='tight')",
    "        out.append(base64.b64encode(buf.getvalue()).decode())",
    "    plt.close('all')",
    "    return out",
    // Import name -> package name, for packages whose names differ.
    "_DEPS = {'skfuzzy': ['scipy', 'networkx'], 'seaborn': ['scipy'], 'statsmodels': ['scipy', 'patsy']}",
    "_ALIAS = {'sklearn': 'scikit-learn', 'skfuzzy': 'scikit-fuzzy', 'PIL': 'pillow', 'cv2': 'opencv-python', 'yaml': 'pyyaml', 'bs4': 'beautifulsoup4',",
    "          'skimage': 'scikit-image', 'dateutil': 'python-dateutil', 'Bio': 'biopython', 'docx': 'python-docx', 'sns': 'seaborn'}",
    "_NO_BROWSER = {'torch', 'tensorflow', 'keras', 'jax', 'cupy', 'pyspark', 'xgboost', 'lightgbm', 'catboost', 'tkinter'}",
    "_PIP = __import__('re').compile(r'^\\s*[%!]?\\s*(?:python\\s+-m\\s+)?pip3?\\s+install\\s+(.+)$')",
    "def _prepare(code):",
    "    from pyodide.code import find_imports",
    "    lines, wanted, kept = code.split('\\n'), [], []",
    "    for ln in lines:",
    "        m = _PIP.match(ln)",
    "        if m:",
    "            wanted += [w for w in m.group(1).split() if not w.startswith('-')]",
    "            kept.append('')",
    "        else:",
    "            kept.append(ln)",
    "    code = '\\n'.join(kept)",
    "    try: mods = find_imports(code)",
    "    except Exception: mods = []",
    "    missing = []",
    "    for m in mods:",
    "        if m in _NO_BROWSER: continue",
    "        mods_extra = _DEPS.get(m, [])",
    "        missing += [d for d in mods_extra if importlib.util.find_spec(d) is None]",
    "        try:",
    "            if importlib.util.find_spec(m) is None: missing.append(m)",
    "        except Exception: missing.append(m)",
    "    extra = []",
    "    if 'excel' in code: extra.append('openpyxl')",
    "    if '.plot(' in code or '.hist(' in code: extra.append('matplotlib')",
    "    if 'http://' in code or 'https://' in code: extra.append('pyodide-http')",
    "    return code, wanted, missing, extra, [m for m in mods if m in _NO_BROWSER]",
    "async def _install(names, report):",
    "    import micropip",
    "    for n in names:",
    "        pkg = _ALIAS.get(n, n)",
    "        try:",
    "            await micropip.install(pkg)",
    "            if report: print(f'[installed {pkg}]')",
    "        except Exception as e:",
    "            if report: print(f'[could not install {pkg}: {str(e).splitlines()[0][:160]}]', file=sys.stderr)",
    "    importlib.invalidate_caches()",
    "def _patch_http():",
    "    try:",
    "        import pyodide_http; pyodide_http.patch_all()",
    "    except Exception: pass",
    "def _files():",
    "    out = []",
    "    for root, dirs, fs in os.walk('.'):",
    "        for f in fs:",
    "            p = os.path.join(root, f)[2:].replace(os.sep, '/')",
    "            out.append([p, os.path.getsize(p)])",
    "    return out"
  ].join("\n"));
  return py;
})();

ready.then(function () { postMessage({ type: "ready" }); }, function (e) { postMessage({ type: "fatal", text: String(e) }); });

function note(text) { postMessage({ type: "info", text: text }); }

async function runCode(msg) {
  var prep = py.globals.get("_prepare")(msg.code).toJs();
  var code = prep[0], wanted = prep[1], missing = prep[2], extra = prep[3], blocked = prep[4];
  if (blocked.length) {
    postMessage({ type: "err", text: "Note: " + blocked.join(", ") + " cannot run inside a web browser. Use the Colab button or your own computer.\n" });
  }
  // Packages that ship with Pyodide load fastest; the rest come from PyPI through micropip.
  if (missing.length || extra.length) note("installing");
  await py.loadPackagesFromImports(code, { messageCallback: function () {}, errorCallback: function () {} });
  var still = py.globals.get("_prepare")(code).toJs()[2];
  var need = still.concat(extra.filter(function (e) { return e === "openpyxl" || e === "pyodide-http"; }));
  if (need.length) await py.globals.get("_install")(py.toPy(need), false);
  if (wanted.length) { note("installing"); await py.globals.get("_install")(py.toPy(wanted), true); }
  if (extra.indexOf("pyodide-http") >= 0) py.globals.get("_patch_http")();
  var left = py.globals.get("_prepare")(code).toJs()[2];
  if (left.length) {
    // One more try with the exact names, for packages the alias table does not know.
    await py.globals.get("_install")(py.toPy(left), true);
  }
  note("running");
  py.globals.get("_stdin").clear();
  (msg.stdin || []).forEach(function (l) { py.globals.get("_stdin").append(l); });
  // If a library needs another module that was not installed yet, install it and run the code again (at most 3 times).
  var tried = {};
  for (var attempt = 0; ; attempt++) {
    var scope = py.toPy({ __name__: "__main__" });
    try { await py.runPythonAsync(code, { globals: scope }); return; }
    catch (e) {
      var m = /No module named '([\w.]+)'/.exec(String(e.message || e));
      if (!m || attempt >= 3 || tried[m[1].split(".")[0]]) throw e;
      tried[m[1].split(".")[0]] = 1;
      var mod = m[1].split(".")[0];
      note("installing");
      try { await py.loadPackage(mod, { messageCallback: function () {} }); } catch (x) {}
      await py.globals.get("_install")(py.toPy([mod]), false);
      try { py.globals.get("_figures")(); } catch (x) {}
      postMessage({ type: "clear" });
      note("running");
      py.globals.get("_stdin").clear();
      (msg.stdin || []).forEach(function (l) { py.globals.get("_stdin").append(l); });
    }
  }
}

onmessage = async function (ev) {
  var msg = ev.data;
  try {
    await ready;
    if (msg.type === "put") {
      // A file chosen by the user is written into the working folder, so open("name.csv") works.
      py.FS.writeFile("/home/pyodide/work/" + msg.name, new Uint8Array(msg.data));
      postMessage({ type: "files", list: py.globals.get("_files")().toJs() });
      return;
    }
    if (msg.type === "get") {
      var data = py.FS.readFile("/home/pyodide/work/" + msg.name);
      postMessage({ type: "file", name: msg.name, data: data.buffer }, [data.buffer]);
      return;
    }
    if (msg.type === "rm") {
      try { py.FS.unlink("/home/pyodide/work/" + msg.name); } catch (e) {}
      postMessage({ type: "files", list: py.globals.get("_files")().toJs() });
      return;
    }
    if (msg.type === "ls") { postMessage({ type: "files", list: py.globals.get("_files")().toJs() }); return; }
    if (msg.type === "pip") {
      note("installing");
      await py.globals.get("_install")(py.toPy(msg.names), true);
      postMessage({ type: "done" });
      return;
    }
    await runCode(msg);
    var figs = py.globals.get("_figures")().toJs();
    figs.forEach(function (b) { postMessage({ type: "img", data: b }); });
    postMessage({ type: "files", list: py.globals.get("_files")().toJs() });
    postMessage({ type: "done" });
  } catch (e) {
    // Show only the part of the traceback that belongs to the student's code.
    var t = String(e.message || e), i = t.indexOf('File "<exec>"');
    var hint = "";
    if (/unknown url type: https|NetworkError|Failed to execute 'send'|CORS/.test(t)) hint = "\nHint: this website blocks downloads from other sites (CORS). Download the file to your computer, then use the Upload file button.";
    if (/No module named/.test(t)) hint = "\nHint: this package is not available for the browser. Try the Colab button.";
    try { py.globals.get("_figures")(); } catch (x) {}
    postMessage({ type: "err", text: (i >= 0 ? "Traceback:\n  " + t.slice(i) : t) + hint });
    postMessage({ type: "done", failed: true });
  }
};
