/* Single-page app. Routing uses the URL hash, because GitHub Pages only serves static files. */
(function () {
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var lang = store.get("lang", "fa");
  var done = {};
  try { done = JSON.parse(store.get("done", "{}")) || {}; } catch (e) {}

  var STR = {
    brand: ["مدرسه پایتون و هوش مصنوعی", "Python and AI School"],
    home: ["خانه", "Home"], python: ["پایتون", "Python"], ai: ["هوش مصنوعی", "AI"], labs: ["آزمایشگاه‌ها", "Labs"], playground: ["محیط کدنویسی", "Playground"], glossary: ["واژه‌نامه", "Glossary"], about: ["مدرس", "Instructor"],
    search: ["جستجو در درس‌ها", "Search lessons"], langOther: ["English", "فارسی"],
    heroKick: ["آموزش تعاملی، رایگان و از صفر", "Interactive, free, and from zero"],
    heroT: ["از کجا می‌خواهی شروع کنی؟", "Where do you want to start?"],
    heroP: ["کد را همین‌جا بنویس و اجرا کن، با آزمایشگاه‌ها مفهوم را لمس کن و هر جا خواستی برگرد.", "Write and run code right here, feel each idea in a hands-on lab, and move around freely."],
    pyDesc: ["از نصب پایتون، VS Code و Google Colab تا NumPy، Pandas و نوشتن یک پروژه کامل", "From installing Python, VS Code and Google Colab to NumPy, Pandas and a complete project"],
    aiDesc: ["از مفاهیم پایه تا رگرسیون، طبقه‌بندی، خوشه‌بندی، یادگیری عمیق، منطق فازی و ANFIS", "From the basics to regression, classification, clustering, deep learning, fuzzy logic and ANFIS"],
    start: ["شروع مسیر", "Start this path"], cont: ["ادامه", "Continue"], lessons: ["درس", "lessons"], modules: ["بخش", "sections"],
    f1t: ["اجرا در مرورگر", "Runs in your browser"], f1p: ["بدون نصب؛ کد را تغییر بده و اجرا کن.", "No installation. Edit the code and run it."],
    f2t: ["باز کردن در Colab", "Open in Colab"], f2p: ["هر درس یک نوت‌بوک آماده دارد.", "Every lesson has a ready notebook."],
    f3t: ["آزمایشگاه تعاملی", "Interactive labs"], f3p: ["با کلیک و اسلایدر مفهوم را ببین.", "See the ideas with clicks and sliders."],
    f4t: ["آزمون و پیشرفت", "Quizzes and progress"], f4p: ["پیشرفت تو روی همین دستگاه ذخیره می‌شود.", "Your progress is saved on this device."],
    prev: ["درس قبلی", "Previous"], next: ["درس بعدی", "Next"], backHome: ["بازگشت به اول سایت", "Back to start"], backTrack: ["فهرست مسیر", "Path overview"],
    exT: ["تمرین", "Exercises"], showAns: ["دیدن پاسخ", "Show the answer"], projectBadge: ["پروژه این بخش", "Section project"],
    cmActual: ["کلاس واقعی", "Actual class"], cmPred: ["پیش‌بینی مدل", "Predicted"], cmPos: ["مثبت", "Positive"], cmNeg: ["منفی", "Negative"],
    markDone: ["این درس را تمام کردم", "Mark as finished"], isDone: ["تمام شده", "Finished"],
    code: ["کد", "Code"], quiz: ["آزمون کوتاه", "Quick quiz"], lab: ["آزمایشگاه تعاملی", "Interactive lab"], correct: ["درست است.", "Correct."], wrong: ["درست نیست، دوباره فکر کن.", "Not quite, try again."],
    copy: ["کپی", "Copy"], copied: ["کپی شد", "Copied"], reset: ["بازنشانی", "Reset"], run: ["اجرا", "Run"], stop: ["توقف", "Stop"],
    running: ["در حال اجرا...", "Running..."], loadingPy: ["در حال بارگذاری پایتون؛ بار اول چند ثانیه طول می‌کشد...", "Loading Python. The first time takes a few seconds..."],
    noOutput: ["اجرا شد؛ خروجی چاپی نداشت.", "Ran successfully, with no printed output."], runError: ["برنامه با خطا متوقف شد. پیام بالا را بخوان.", "The program stopped with an error. Read the message above."],
    pyFail: ["پایتون بارگذاری نشد. اتصال اینترنت را بررسی کن یا از دکمه Colab استفاده کن.", "Python could not be loaded. Check your connection or use the Colab button."],
    stopped: ["اجرا متوقف شد.", "Stopped."], stdin: ["ورودی برنامه (هر خط یک ورودی):", "Program input (one value per line):"], colabOnly: ["این کد فقط در Colab یا کامپیوتر خودت اجرا می‌شود", "This code runs in Colab or on your own computer"],
    labsT: ["آزمایشگاه‌های تعاملی", "Interactive labs"], labsP: ["هر آزمایشگاه یک مفهوم را زنده نشان می‌دهد.", "Each lab shows one idea live."], openLesson: ["رفتن به درس", "Open the lesson"],
    pgT: ["محیط کدنویسی آزاد", "Free playground"], pgP: ["هر کد پایتونی را اینجا بنویس. numpy، pandas، matplotlib و scikit-learn در دسترس هستند.", "Write any Python here. numpy, pandas, matplotlib and scikit-learn are available."],
    gloT: ["واژه‌نامه", "Glossary"], results: ["نتیجه جستجو برای", "Results for"], none: ["چیزی پیدا نشد.", "Nothing found."],
    aboutT: ["درباره مدرس", "About the instructor"], aboutRole: ["نویسنده، طراح و مدرس این دوره", "Author, designer and instructor of this course"],
    aboutP: ["این مجموعه برای دانشجویان و علاقه‌مندان همه رشته‌ها طراحی شده است تا پایتون و هوش مصنوعی را از پایه و با تمرین عملی یاد بگیرند.", "This course is designed for students and enthusiasts from every field, to learn Python and AI from the ground up through practice."],
    email: ["ایمیل", "Email"], foot: ["طراحی و تدریس:", "Created and taught by"], notFound: ["این صفحه پیدا نشد.", "This page was not found."], progress: ["پیشرفت", "Progress"], clearSearch: ["", ""],
    resetProg: ["پاک کردن پیشرفت", "Clear progress"]
  };
  function T(k) { var v = STR[k]; return v ? v[lang === "fa" ? 0 : 1] : k; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function name(o) { return o[lang]; }
  function title(l) { return l[lang][0]; }
  var $ = function (id) { return document.getElementById(id); };
  var app = $("app");

  // Small Markdown: "## heading", "- list", "!note", **bold**, ~inline code~, blank line = new paragraph. $math$ is left for KaTeX.
  function inline(t) {
    return esc(t).replace(/~([^~]+)~/g, '<code dir="ltr">$1</code>').replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }
  function table(b) {
    var rows = b.split("\n").map(function (r) { return r.trim().replace(/^\||\|$/g, "").split("|").map(function (c) { return c.trim(); }); })
      .filter(function (r) { return !/^-+$/.test(r[0]); });
    return '<div class="tablewrap"><table><thead><tr>' + rows[0].map(function (c) { return "<th>" + inline(c) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      rows.slice(1).map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + inline(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
  }
  function confusion(v) {
    return '<div class="cm" dir="ltr"><div></div><div class="ch" style="grid-column:span 2">' + T("cmActual") + '</div><div class="cv">' + T("cmPred") + '</div><div class="ch2">' + T("cmPos") + '</div><div class="ch2">' + T("cmNeg") + '</div>' +
      '<div class="cs">' + T("cmPos") + '</div><div class="g"><b>TP</b>' + v[0] + '</div><div class="r"><b>FP</b>' + v[1] + "</div>" +
      '<div class="cs">' + T("cmNeg") + '</div><div class="r"><b>FN</b>' + v[2] + '</div><div class="g"><b>TN</b>' + v[3] + "</div></div>";
  }
  function md(src) {
    var out = [], list = null;
    src.trim().replace(/^(?!\|)(.+)\n(?=\|)/gm, "$1\n\n").split(/\n\s*\n|\n(?=- |## |!|\[\[|\$\$)/).forEach(function (raw) {
      var b = raw.trim();
      if (!b) return;
      if (b.indexOf("- ") === 0) { if (!list) { list = []; } list.push("<li>" + inline(b.slice(2)) + "</li>"); return; }
      if (list) { out.push("<ul>" + list.join("") + "</ul>"); list = null; }
      if (b.indexOf("## ") === 0) out.push("<h3>" + inline(b.slice(3)) + "</h3>");
      else if (b[0] === "!") out.push('<aside class="note">' + inline(b.slice(1).trim()) + "</aside>");
      else if (b[0] === "|") out.push(table(b));
      else if (/^\[\[c:\d+\]\]$/.test(b)) out.push('<div class="codeslot" data-c="' + b.match(/\d+/)[0] + '"></div>');
      else if (b.indexOf("[[fig:") === 0) { var f = b.slice(6, -2).split("|"); out.push('<figure><img loading="lazy" src="assets/img/lessons/' + esc(f[0]) + '" alt="' + esc(f[1] || "") + '"><figcaption>' + inline(f[1] || "") + "</figcaption></figure>"); }
      else if (b.indexOf("[[walk:") === 0) out.push('<div class="walk" data-w="' + esc(b.slice(7, -2)) + '"></div>');
      else if (b.indexOf("[[cm:") === 0) out.push(confusion(b.slice(5, -2).split(",").map(Number)));
      else if (b.indexOf("$$") === 0) out.push('<div class="math" dir="ltr">' + esc(b) + "</div>");
      else out.push("<p>" + inline(b) + "</p>");
    });
    if (list) out.push("<ul>" + list.join("") + "</ul>");
    return out.join("");
  }
  function math(el) {
    if (window.renderMathInElement) renderMathInElement(el, { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }], throwOnError: false });
  }
  window.addEventListener("load", function () { math(app); });

  function trackStats(tr) {
    var ls = COURSE.lessons.filter(function (l) { return l.track === tr; });
    var d = ls.filter(function (l) { return done[l.id]; }).length;
    return { n: ls.length, d: d, pct: ls.length ? Math.round(100 * d / ls.length) : 0, ls: ls };
  }
  function nextOf(tr) { var s = trackStats(tr); return (s.ls.filter(function (l) { return !done[l.id]; })[0] || s.ls[0]); }

  function chrome() {
    document.documentElement.lang = lang; document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    $("brandText").textContent = T("brand");
    $("langBtn").textContent = T("langOther");
    $("searchInput").placeholder = T("search");
    var r = location.hash;
    $("topnav").innerHTML = [["#/", "home"], ["#/t/python", "python"], ["#/t/ai", "ai"], ["#/labs", "labs"], ["#/play", "playground"], ["#/glossary", "glossary"], ["#/about", "about"]]
      .map(function (x) { var on = x[0] === "#/" ? (r === "#/" || r === "") : r.indexOf(x[0]) === 0; return '<a href="' + x[0] + '"' + (on ? ' class="on"' : "") + ">" + T(x[1]) + "</a>"; }).join("");
    $("footer").innerHTML = "<span>" + T("foot") + ' <a href="#/about">' + esc(SITE.author.name[lang]) + "</a></span>" +
      '<span class="links"><a href="mailto:' + SITE.author.email + '">Email</a><a href="' + SITE.author.linkedin + '" target="_blank" rel="noopener">LinkedIn</a><a href="' + SITE.author.scholar + '" target="_blank" rel="noopener">Google Scholar</a></span>';
  }

  function viewHome() {
    function card(tr, cls, desc, art) {
      var s = trackStats(tr), n = nextOf(tr), mods = COURSE.tracks[tr].modules.length;
      return '<a class="pathcard ' + cls + '" href="#/t/' + tr + '">' + art + "<h2>" + esc(name(COURSE.tracks[tr])) + "</h2><p>" + T(desc) + '</p><div class="pathmeta"><span>' + num(mods) + " " + T("modules") + "</span><span>" + num(s.n) + " " + T("lessons") + "</span></div>" +
        '<div class="bar"><i style="width:' + s.pct + '%"></i></div><span class="pathgo">' + T(s.d ? "cont" : "start") + (s.d ? ": " + esc(title(n)) : "") + "</span></a>";
    }
    var pyArt = '<pre class="art" dir="ltr" aria-hidden="true">for idea in ideas:\n    print(idea.run())</pre>';
    var aiArt = '<svg class="art net" viewBox="0 0 240 70" aria-hidden="true">' + netArt() + "</svg>";
    app.innerHTML = '<section class="hero"><p class="kick">' + T("heroKick") + "</p><h1>" + T("heroT") + "</h1><p>" + T("heroP") + '</p></section><section class="paths">' + card("python", "py", "pyDesc", pyArt) + card("ai", "aip", "aiDesc", aiArt) + '</section><section class="feats">' +
      [1, 2, 3, 4].map(function (i) { return "<div><h3>" + T("f" + i + "t") + "</h3><p>" + T("f" + i + "p") + "</p></div>"; }).join("") + "</section>";
  }
  function netArt() {
    var c = [[20, [15, 35, 55]], [85, [10, 28, 45, 62]], [150, [10, 28, 45, 62]], [220, [25, 45]]], s = "";
    for (var i = 0; i < 3; i++) c[i][1].forEach(function (a) { c[i + 1][1].forEach(function (b) { s += '<line x1="' + c[i][0] + '" y1="' + a + '" x2="' + c[i + 1][0] + '" y2="' + b + '"/>'; }); });
    c.forEach(function (l) { l[1].forEach(function (y) { s += '<circle cx="' + l[0] + '" cy="' + y + '" r="5"/>'; }); });
    return s;
  }
  function num(n) { return lang === "fa" ? String(n).replace(/\d/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[d]; }) : String(n); }

  function sidebar(tr, curId) {
    return '<aside class="side" id="side"><a class="sideback" href="#/">' + T("backHome") + '</a><a class="sidetrack" href="#/t/' + tr + '">' + esc(name(COURSE.tracks[tr])) + "</a>" +
      COURSE.tracks[tr].modules.map(function (m) {
        var open = m.lessons.some(function (l) { return l.id === curId; }) || !curId;
        return "<details" + (open ? " open" : "") + "><summary>" + esc(name(m)) + "</summary>" + m.lessons.map(function (l) {
          return '<a href="#/l/' + l.id + '" class="' + (l.id === curId ? "cur " : "") + (done[l.id] ? "ok" : "") + '">' + esc(title(l)) + "</a>";
        }).join("") + "</details>";
      }).join("") + "</aside>";
  }

  function viewTrack(tr) {
    if (!COURSE.tracks[tr]) return view404();
    var s = trackStats(tr), n = nextOf(tr);
    app.innerHTML = '<div class="layout">' + sidebar(tr) + '<main class="main"><nav class="crumb"><a href="#/">' + T("home") + "</a><span>/</span><b>" + esc(name(COURSE.tracks[tr])) + "</b></nav><h1>" + esc(name(COURSE.tracks[tr])) + '</h1><div class="progress"><span>' + T("progress") + ": " + num(s.d) + " / " + num(s.n) + '</span><div class="bar"><i style="width:' + s.pct + '%"></i></div><a class="primary" href="#/l/' + n.id + '">' + T(s.d ? "cont" : "start") + '</a></div><div class="modgrid">' +
      COURSE.tracks[tr].modules.map(function (m, i) {
        return '<section class="mod"><h2><span>' + num(i + 1) + "</span>" + esc(name(m)) + "</h2><ol>" + m.lessons.map(function (l) { return '<li class="' + (done[l.id] ? "ok" : "") + '"><a href="#/l/' + l.id + '">' + esc(title(l)) + "</a></li>"; }).join("") + "</ol></section>";
      }).join("") + "</div></main></div>";
  }

  function viewLesson(id) {
    var l = COURSE.lessons.filter(function (x) { return x.id === id; })[0];
    if (!l) return view404();
    var seq = COURSE.lessons.filter(function (x) { return x.track === l.track; }), i = seq.indexOf(l), p = seq[i - 1], n = seq[i + 1];
    var mod = COURSE.tracks[l.track].modules.filter(function (m) { return m.id === l.module; })[0];
    function pager() {
      return '<nav class="pager">' + (p ? '<a href="#/l/' + p.id + '"><small>' + T("prev") + "</small>" + esc(title(p)) + "</a>" : "<span></span>") + '<a class="mid" href="#/">' + T("backHome") + "</a>" + (n ? '<a href="#/l/' + n.id + '" class="nx"><small>' + T("next") + "</small>" + esc(title(n)) + "</a>" : '<a href="#/t/' + l.track + '" class="nx"><small>' + T("backTrack") + "</small>" + esc(name(COURSE.tracks[l.track])) + "</a>") + "</nav>";
    }
    var badge = l.project ? '<p class="pbadge">' + T("projectBadge") + "</p>" : "";
    app.innerHTML = '<div class="layout">' + sidebar(l.track, l.id) + '<main class="main lesson"><nav class="crumb"><a href="#/">' + T("home") + '</a><span>/</span><a href="#/t/' + l.track + '">' + esc(name(COURSE.tracks[l.track])) + "</a><span>/</span><b>" + esc(name(mod)) + "</b></nav>" + badge + "<h1>" + esc(title(l)) + '</h1><article class="prose">' + md(l[lang][1]) + '</article><div id="labHost"></div><div id="codeHost"></div><div id="exHost"></div><div id="quizHost"></div><button class="finish ' + (done[id] ? "is" : "") + '" id="finish">' + T(done[id] ? "isDone" : "markDone") + "</button>" + pager() + "</main></div>";
    var cells = [];
    app.querySelectorAll(".walk").forEach(function (w) { mountWalk(w, w.dataset.w, lang); });
    var placed = {};
    app.querySelectorAll(".codeslot").forEach(function (s) {
      var i = +s.dataset.c; if (!l.code[i]) return;
      placed[i] = 1; var el = Runner.cell(l.code[i], l.id, T, lang); s.appendChild(el); cells.push(el);
    });
    var rest = l.code.filter(function (c, i) { return !placed[i]; });
    if (rest.length) {
      var ch = $("codeHost"); ch.innerHTML = "<h2>" + T("code") + "</h2>";
      rest.forEach(function (c) { var el = Runner.cell(c, l.id, T, lang); ch.appendChild(el); cells.push(el); });
    }
    if (l.ex.length) renderEx($("exHost"), l);
    if (l.demo && Demos[l.demo]) mountLab($("labHost"), l.demo);
    if (l.quiz.length) renderQuiz($("quizHost"), l);
    $("finish").onclick = function () {
      if (done[id]) delete done[id]; else done[id] = 1;
      store.set("done", JSON.stringify(done));
      route();
    };
    math(app);
    cells.forEach(function (c) { c._refresh(); });
    store.set("last", id);
  }
  function renderEx(host, l) {
    host.innerHTML = "<h2>" + T("exT") + "</h2>";
    l.ex.forEach(function (x, i) {
      var b = document.createElement("div"); b.className = "exercise";
      b.innerHTML = '<p><span class="exn">' + num(i + 1) + "</span>" + inline(x.t[lang]) + "</p>";
      var d = document.createElement("details"); d.innerHTML = "<summary>" + T("showAns") + "</summary>" + (x.a[lang] ? "<p>" + inline(x.a[lang]) + "</p>" : "");
      if (x.code) {
        var el = Runner.cell({ src: x.code }, null, T, lang); d.appendChild(el);
        d.addEventListener("toggle", function () { el._refresh(); });
      }
      b.appendChild(d); host.appendChild(b);
    });
    math(host);
  }
  function mountLab(host, key) {
    var d = Demos[key];
    var box = document.createElement("section"); box.className = "lab";
    box.innerHTML = "<h2>" + T("lab") + ": " + esc(d.title[lang]) + '</h2><p class="labhelp">' + esc(d.help[lang]) + '</p><div class="labbody" dir="ltr"></div>';
    host.appendChild(box);
    d.mount(box.querySelector(".labbody"), lang);
  }
  function renderQuiz(host, l) {
    host.innerHTML = "<h2>" + T("quiz") + "</h2>";
    l.quiz.forEach(function (q) {
      var b = document.createElement("div"); b.className = "quiz";
      b.innerHTML = "<p>" + inline(q.q[lang]) + "</p>";
      var res = document.createElement("p"); res.className = "qres"; res.hidden = true;
      q.o[lang].forEach(function (o, i) {
        var x = document.createElement("button"); x.innerHTML = inline(o);
        x.onclick = function () {
          b.querySelectorAll("button").forEach(function (y) { y.classList.remove("yes", "no"); });
          x.classList.add(i === q.a ? "yes" : "no");
          res.hidden = false; res.className = "qres " + (i === q.a ? "yes" : "no");
          res.innerHTML = T(i === q.a ? "correct" : "wrong") + (i === q.a && q.why[lang] ? " " + inline(q.why[lang]) : "");
          math(res);
        };
        b.appendChild(x);
      });
      b.appendChild(res); host.appendChild(b); math(b);
    });
  }

  function viewLabs() {
    var byDemo = {};
    COURSE.lessons.forEach(function (l) { if (l.demo && !byDemo[l.demo]) byDemo[l.demo] = l; });
    app.innerHTML = '<main class="page"><h1>' + T("labsT") + "</h1><p>" + T("labsP") + '</p><div id="labs"></div></main>';
    var h = $("labs");
    Object.keys(Demos).forEach(function (k) {
      mountLab(h, k);
      if (byDemo[k]) { var a = document.createElement("a"); a.className = "lablink"; a.href = "#/l/" + byDemo[k].id; a.textContent = T("openLesson"); h.lastChild.appendChild(a); }
    });
  }
  function viewPlay() {
    app.innerHTML = '<main class="page"><h1>' + T("pgT") + "</h1><p>" + T("pgP") + '</p><div id="pg"></div></main>';
    var el = Runner.cell({ src: store.get("pg", 'import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(0, 10, 200)\nplt.plot(x, np.sin(x))\nplt.title("Hello from your browser")\nplt.show()\nprint("Mean of sin(x):", np.sin(x).mean().round(4))') }, null, T, lang);
    $("pg").appendChild(el); el._refresh();
    var cm = el.querySelector(".CodeMirror");
    if (cm && cm.CodeMirror) cm.CodeMirror.on("change", function (c) { store.set("pg", c.getValue()); });
  }
  function viewGlossary() {
    app.innerHTML = '<main class="page"><h1>' + T("gloT") + '</h1><dl class="glossary">' + window.GLOSSARY.map(function (g) { return "<div><dt>" + esc(g[0]) + " <small dir='ltr'>" + esc(g[1]) + "</small></dt><dd>" + esc(lang === "fa" ? g[2] : g[3]) + "</dd></div>"; }).join("") + "</dl></main>";
  }
  function viewAbout() {
    var a = SITE.author;
    app.innerHTML = '<main class="page about"><img src="' + a.photo + '" alt="' + esc(a.name[lang]) + '"><div><p class="kick">' + T("aboutT") + "</p><h1>" + esc(a.name[lang]) + '</h1><p class="altname">' + esc(a.name[lang === "fa" ? "en" : "fa"]) + "</p><p><b>" + T("aboutRole") + "</b></p><p>" + T("aboutP") + '</p><div class="abtn"><a class="primary" href="mailto:' + a.email + '">' + T("email") + '</a><a href="' + a.linkedin + '" target="_blank" rel="noopener">LinkedIn</a><a href="' + a.scholar + '" target="_blank" rel="noopener">Google Scholar</a></div><p class="mail" dir="ltr">' + a.email + "</p></div></main>";
  }
  function viewSearch(q) {
    var w = q.toLowerCase();
    var hits = COURSE.lessons.filter(function (l) { return (l.fa[0] + " " + l.en[0] + " " + l.fa[1] + " " + l.en[1]).toLowerCase().indexOf(w) >= 0; });
    app.innerHTML = '<main class="page"><h1>' + T("results") + " «" + esc(q) + '»</h1><ul class="hits">' + (hits.map(function (l) { return '<li><a href="#/l/' + l.id + '">' + esc(title(l)) + "</a><small>" + esc(name(COURSE.tracks[l.track])) + "</small></li>"; }).join("") || "<li>" + T("none") + "</li>") + "</ul></main>";
  }
  function view404() { app.innerHTML = '<main class="page"><h1>' + T("notFound") + '</h1><a class="primary" href="#/">' + T("backHome") + "</a></main>"; }

  function route() {
    var h = decodeURIComponent(location.hash.replace(/^#\/?/, "")), p = h.split("/");
    chrome();
    document.body.classList.remove("menu");
    if (!p[0]) viewHome();
    else if (p[0] === "t") viewTrack(p[1]);
    else if (p[0] === "l") viewLesson(p[1]);
    else if (p[0] === "labs") viewLabs();
    else if (p[0] === "play") viewPlay();
    else if (p[0] === "glossary") viewGlossary();
    else if (p[0] === "about") viewAbout();
    else if (p[0] === "search") viewSearch(p.slice(1).join("/"));
    else view404();
    window.scrollTo(0, 0);
    document.title = (document.querySelector("#app h1") ? document.querySelector("#app h1").textContent + " | " : "") + T("brand");
  }

  window.addEventListener("hashchange", route);
  $("langBtn").onclick = function () { lang = lang === "fa" ? "en" : "fa"; store.set("lang", lang); route(); };
  $("themeBtn").onclick = function () { var t = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = t; store.set("theme", t); };
  $("menuBtn").onclick = function () { document.body.classList.toggle("menu"); };
  $("searchInput").addEventListener("keydown", function (e) { if (e.key === "Enter" && this.value.trim()) { location.hash = "#/search/" + encodeURIComponent(this.value.trim()); this.blur(); } });
  route();
})();
