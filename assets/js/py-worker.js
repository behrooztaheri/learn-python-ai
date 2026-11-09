/* Runs Python (Pyodide) in a Web Worker, so the page stays responsive and a run can be stopped.
   GitHub Pages cannot send the headers needed for SharedArrayBuffer, so stopping = terminating this worker. */
var PYODIDE = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/";
importScripts(PYODIDE + "pyodide.js");

var ready = (async function () {
  var py = await loadPyodide({ indexURL: PYODIDE });
  py.setStdout({ batched: function (s) { postMessage({ type: "out", text: s + "\n" }); } });
  py.setStderr({ batched: function (s) {
    if (/non-interactive|building the font cache/.test(s)) return;   // harmless matplotlib notices in the browser
    postMessage({ type: "err", text: s + "\n" });
  } });
  await py.runPythonAsync([
    "import os, builtins, io, base64, logging, warnings",
    "warnings.filterwarnings('ignore', message='.*non-interactive.*')",
    "logging.getLogger('matplotlib.font_manager').setLevel(logging.ERROR)",
    "os.environ['MPLBACKEND'] = 'AGG'",
    "_stdin = []",
    "def _input(prompt=''):",
    "    if prompt: print(prompt, end='')",
    "    value = _stdin.pop(0) if _stdin else ''",
    "    print(value)",
    "    return value",
    "builtins.input = _input",
    "def _figures():",
    "    import sys",
    "    if 'matplotlib.pyplot' not in sys.modules: return []",
    "    plt = sys.modules['matplotlib.pyplot']",
    "    out = []",
    "    for n in plt.get_fignums():",
    "        buf = io.BytesIO()",
    "        plt.figure(n).savefig(buf, format='png', dpi=110, bbox_inches='tight')",
    "        out.append(base64.b64encode(buf.getvalue()).decode())",
    "    plt.close('all')",
    "    return out"
  ].join("\n"));
  return py;
})();

ready.then(function () { postMessage({ type: "ready" }); }, function (e) { postMessage({ type: "fatal", text: String(e) }); });

onmessage = async function (ev) {
  var msg = ev.data;
  try {
    var py = await ready;
    await py.loadPackagesFromImports(msg.code, { messageCallback: function () {}, errorCallback: function () {} });
    py.globals.get("_stdin").clear();
    (msg.stdin || []).forEach(function (l) { py.globals.get("_stdin").append(l); });
    var scope = py.toPy({ __name__: "__main__" });
    await py.runPythonAsync(msg.code, { globals: scope });
    var figs = py.globals.get("_figures")().toJs();
    figs.forEach(function (b) { postMessage({ type: "img", data: b }); });
    postMessage({ type: "done" });
  } catch (e) {
    // Show only the part of the traceback that belongs to the student's code.
    var t = String(e.message || e), i = t.indexOf('File "<exec>"');
    postMessage({ type: "err", text: i >= 0 ? "Traceback:\n  " + t.slice(i) : t });
    postMessage({ type: "done", failed: true });
  }
};
