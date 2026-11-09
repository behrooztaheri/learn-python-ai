/* Step-by-step illustrated guides. The screens are simplified drawings of the real programs,
   so a menu may look slightly different on your computer. */
(function () {
  function hl(html, n) { return '<span class="m-hl">' + html + (n ? '<i class="m-num">' + n + "</i>" : "") + "</span>"; }
  function win(title, body, cls) { return '<div class="m-win ' + (cls || "") + '"><div class="m-title"><span>' + title + '</span><b>&#8211; &#9633; &#10005;</b></div><div class="m-body">' + body + "</div></div>"; }
  function browser(url, body) { return '<div class="m-win"><div class="m-url"><i></i><i></i><i></i><span>' + url + '</span></div><div class="m-body m-page">' + body + "</div></div>"; }
  function term(lines, title) {
    return '<div class="m-win"><div class="m-title dark"><span>' + (title || "PowerShell") + '</span><b>&#8211; &#9633; &#10005;</b></div><div class="m-term">' + lines.map(function (l) {
      if (l[0] === ">") return '<div><span class="m-p">' + (l[2] || "PS C:\\Users\\you>") + "</span> " + (l[3] ? hl(l[1]) : l[1]) + "</div>";
      return '<div class="m-o">' + l + "</div>";
    }).join("") + "</div></div>";
  }
  function C(cmd, prompt, mark) { return [">", cmd, prompt, mark]; }
  function vs(tab, side, editor, bottom, extra) {
    var ic = ["explorer", "search", "git", "debug", "ext"].map(function (n, i) { return '<span class="' + (n === tab ? "on" : "") + '">' + "EQGDX"[i] + "</span>"; }).join("");
    return '<div class="m-win m-vs"><div class="m-title dark"><span>File &nbsp; Edit &nbsp; View &nbsp; Run &nbsp; Terminal &nbsp; Help</span><b>&#8211; &#9633; &#10005;</b></div>' + (extra || "") + '<div class="m-vsb"><div class="m-act">' + ic + '</div><div class="m-side">' + side + '</div><div class="m-ed"><div class="m-code">' + editor + "</div>" + (bottom ? '<div class="m-bot">' + bottom + "</div>" : "") + "</div></div></div>";
  }
  var HELLO = '<div class="m-tabs"><span>hello.py</span>RUN</div><pre>1  name = "Sara"\n2  print("Hello", name)</pre>';
  var HELLO_RUN = '<div class="m-tabs"><span>hello.py</span>' + hl("&#9654;", 1) + '</div><pre>1  name = "Sara"\n2  print("Hello", name)</pre>';
  var FILES = '<h6>MY_PROJECT</h6><p>hello.py</p>';
  function colab(body, extra) { return '<div class="m-win m-colab"><div class="m-url"><i></i><i></i><i></i><span>colab.research.google.com</span></div><div class="m-cbar"><b>CO</b> Untitled0.ipynb<small>File &nbsp; Edit &nbsp; View &nbsp; Insert &nbsp; Runtime &nbsp; Tools</small></div><div class="m-body">' + body + "</div>" + (extra || "") + "</div>"; }
  function cell(code, out, mark) { return '<div class="m-cell"><span class="m-play">' + (mark ? hl("&#9654;", 1) : "&#9654;") + "</span><pre>" + code + "</pre></div>" + (out ? '<pre class="m-out">' + out + "</pre>" : ""); }
  function dialog(title, body) { return '<div class="m-dialog"><h5>' + title + "</h5>" + body + "</div>"; }

  window.WALK = {
    win: [
      { t: ["صفحه دانلود را باز کن", "Open the download page"], d: ["به python.org/downloads برو و روی دکمه زرد **Download Python install manager** بزن. پایتون رسمی ویندوز اکنون با همین برنامه نصب می‌شود.", "Go to python.org/downloads and press the yellow **Download Python install manager** button. Official Python for Windows is now installed with this program."],
        s: browser("python.org/downloads", '<div class="m-py"><h4>Download the latest version for Windows</h4>' + hl('<button class="m-y">Download Python install manager</button>', 1) + "<p>Or get the standalone installer</p></div>") },
      { t: ["برنامه را نصب کن", "Install the manager"], d: ["فایل دانلودشده با پسوند ~msix~ را دو بار کلیک کن و **Install** را بزن.", "Double-click the downloaded ~msix~ file and press **Install**."],
        s: win("Python install manager", '<div class="m-app"><h4>Install Python install manager?</h4><p>Publisher: Python Software Foundation</p><div class="m-r">' + hl('<button class="m-b">Install</button>', 1) + "</div></div>") },
      { t: ["ترمینال را باز کن", "Open a terminal"], d: ["کلید Windows را بزن، **Terminal** یا **PowerShell** را تایپ کن و Enter بزن.", "Press the Windows key, type **Terminal** or **PowerShell**, and press Enter."],
        s: '<div class="m-win"><div class="m-title"><span>Search</span></div><div class="m-search">' + hl("Terminal", 1) + "<p>Best match</p><div class='m-list on'>Windows Terminal</div><div class='m-list'>Windows PowerShell</div></div></div>" },
      { t: ["پایتون را نصب کن", "Install Python itself"], d: ["دستور ~py install~ جدیدترین نسخه پایدار را نصب می‌کند. اگر پرسید پوشه به PATH اضافه شود، این کار اختیاری است؛ می‌توانی y را بزنی.", "The ~py install~ command installs the latest stable version. If it asks to add a folder to PATH, this is optional; you can press y."],
        s: term([C("py install", null, 1), "Installing Python 3.15...", "Extracting: 100%", "Python 3.15 is now installed."]) },
      { t: ["نصب را بررسی کن", "Check the installation"], d: ["با ~python --version~ نسخه را ببین و با ~py list~ نسخه‌های نصب‌شده را. عدد روی سیستم تو ممکن است فرق داشته باشد.", "See the version with ~python --version~ and the installed versions with ~py list~. Your number may differ."],
        s: term([C("python --version", null, 1), "Python 3.15.2", C("py list"), "Tag      Name            Managed By   Version", "3.15[*]  Python 3.15      PythonCore   3.15.2"]) },
      { t: ["اگر دستور کار نکرد", "If the command fails"], d: ["اگر python پیدا نشد یا Microsoft Store باز شد، از منوی Start گزینه **Manage app execution aliases** را باز کن و گزینه‌های **Python (default)** را خاموش و دوباره روشن کن.", "If python is not found or the Store opens, open **Manage app execution aliases** from Start and switch the **Python (default)** entries off and on again."],
        s: win("Settings > App execution aliases", '<div class="m-set"><div class="m-sw">' + hl("Python (default)", 1) + "<em></em></div><div class='m-sw'>Python (default windowed)<em></em></div><div class='m-sw'>Python install manager<em></em></div></div>") }
    ],
    winfull: [
      { t: ["نصب‌کننده کامل (روش قدیمی)", "The full installer (older method)"], d: ["این روش فقط وقتی لازم است که Install Manager روی سیستم کار نکند. این نصب‌کننده منسوخ شده و برای پایتون ۳٫۱۶ به بعد عرضه نمی‌شود. گزینه **Add python.exe to PATH** را تیک بزن.", "Use this only when the install manager does not work on your system. It is deprecated and will not be produced for Python 3.16 or later. Tick **Add python.exe to PATH**."],
        s: win("Python 3.15 (64-bit) Setup", '<div class="m-inst"><h4>Install Python 3.15 (64-bit)</h4><p class="m-lnk">Install Now</p><p class="m-lnk">Customize installation</p><p>Use admin privileges when installing py.exe</p>' + hl('<label><input type="checkbox" checked disabled> Add python.exe to PATH</label>', 1) + "</div>") }
    ],
    mac: [
      { t: ["مک: نصب از python.org", "macOS: install from python.org"], d: ["فایل ~pkg~ را از python.org/downloads بگیر و مراحل نصب را با Continue جلو ببر. بعد ترمینال را باز کن و ~python3 --version~ را بزن.", "Get the ~pkg~ file from python.org/downloads and follow the installer. Then open Terminal and run ~python3 --version~."],
        s: term([C("python3 --version", "you@mac ~ %", 1), "Python 3.15.2"], "Terminal") },
      { t: ["لینوکس: نصب با apt", "Linux: install with apt"], d: ["روی اوبونتو و دبیان، این دو دستور پایتون و ابزارهای لازم را نصب می‌کنند.", "On Ubuntu and Debian, these two commands install Python and its tools."],
        s: term([C("sudo apt update", "you@pc:~$"), C("sudo apt install python3 python3-pip python3-venv", "you@pc:~$", 1), C("python3 --version", "you@pc:~$"), "Python 3.x"], "Terminal") }
    ],
    terminal: [
      { t: ["کجا هستم؟", "Where am I?"], d: ["مسیر سمت چپ پوشه فعلی است. ~ls~ محتوای آن را نشان می‌دهد.", "The path on the left is your current folder. ~ls~ lists it."], s: term([C("ls", null, 1), "Desktop", "Documents", "Downloads"]) },
      { t: ["پوشه بساز و وارد شو", "Make a folder and enter it"], d: ["با ~mkdir~ پوشه بساز و با ~cd~ وارد آن شو. به تغییر مسیر سمت چپ نگاه کن.", "Create a folder with ~mkdir~ and enter it with ~cd~. Notice how the path changes."], s: term([C("mkdir my_project"), C("cd my_project", null, 1), C("", "PS C:\\Users\\you\\my_project>")]) },
      { t: ["برنامه را اجرا کن", "Run a program"], d: ["وقتی فایل ~hello.py~ در این پوشه است، با این دستور اجرا می‌شود.", "With ~hello.py~ in this folder, this command runs it."], s: term([C("python hello.py", "PS C:\\Users\\you\\my_project>", 1), "Hello Sara"]) }
    ],
    vscode: [
      { t: ["VS Code را نصب کن", "Install VS Code"], d: ["از سایت code.visualstudio.com نسخه سیستم خود را بگیر و نصب کن. گزینه **Add to PATH** را فعال نگه دار.", "Get your system's version from code.visualstudio.com and install it. Keep **Add to PATH** enabled."],
        s: browser("code.visualstudio.com", '<div class="m-py light"><h4>Your code editor. Redefined.</h4>' + hl('<button class="m-b">Download for Windows</button>', 1) + "</div>") },
      { t: ["افزونه پایتون", "The Python extension"], d: ["روی آیکن Extensions کلیک کن، **Python** را جستجو کن و افزونه ساخت Microsoft را Install کن.", "Click the Extensions icon, search for **Python**, and install the one by Microsoft."],
        s: vs("ext", '<h6>EXTENSIONS</h6><div class="m-inp">Python</div><div class="m-ext"><b>Python</b><small>Microsoft</small>' + hl('<button class="m-b sm">Install</button>', 1) + '</div><div class="m-ext"><b>Jupyter</b><small>Microsoft</small></div>', '<pre class="m-empty">VS Code</pre>') },
      { t: ["پوشه پروژه را باز کن", "Open the project folder"], d: ["از منوی File گزینه **Open Folder** را بزن و پوشه پروژه را انتخاب کن. سپس فایل ~hello.py~ را بساز.", "Choose **Open Folder** from the File menu, pick your project, and create ~hello.py~."],
        s: vs("explorer", FILES.replace("hello.py", hl("hello.py", 1)), HELLO) },
      { t: ["انتخاب مفسر", "Select the interpreter"], d: ["کلیدهای Ctrl+Shift+P را بزن، **Python: Select Interpreter** را بنویس و نسخه پایتون یا محیط مجازی را انتخاب کن.", "Press Ctrl+Shift+P, type **Python: Select Interpreter**, and choose your Python or virtual environment."],
        s: vs("explorer", FILES, HELLO, null, '<div class="m-pal"><div class="m-inp">' + hl("&gt; Python: Select Interpreter", 1) + '</div><div class="m-list on">Python 3.15.2 (.venv)</div><div class="m-list">Python 3.15.2 Global</div></div>') },
      { t: ["برنامه را اجرا کن", "Run the program"], d: ["مثلث بالا سمت راست را بزن. خروجی در ترمینال پایین صفحه دیده می‌شود.", "Press the triangle at the top right. The output appears in the terminal below."],
        s: vs("explorer", FILES, HELLO_RUN, "<b>TERMINAL</b><pre>Hello Sara</pre>") },
      { t: ["عیب‌یابی با Breakpoint", "Debugging with a breakpoint"], d: ["کنار شماره خط کلیک کن تا نقطه قرمز بیاید. F5 را بزن؛ برنامه آنجا می‌ایستد و مقدار متغیرها را نشان می‌دهد.", "Click beside a line number to set a red dot. Press F5; the program pauses and shows its variables."],
        s: vs("debug", '<h6>VARIABLES</h6><p>name = "Sara"</p>', '<div class="m-tabs"><span>hello.py</span>F5</div><pre>1  name = "Sara"\n' + hl('<span class="m-bp"></span>2  print("Hello", name)', 1) + "</pre>") },
      { t: ["نوت‌بوک در VS Code", "Notebooks in VS Code"], d: ["افزونه **Jupyter** را نصب کن و فایلی با پسوند ~ipynb~ بساز. هر سلول با Shift+Enter اجرا می‌شود.", "Install the **Jupyter** extension and create an ~ipynb~ file. Run each cell with Shift+Enter."],
        s: vs("explorer", FILES.replace("hello.py", "lesson.ipynb"), '<div class="m-tabs"><span>lesson.ipynb</span>Run All</div>' + cell("print(2 + 3)", "5", 1)) }
    ],
    colab: [
      { t: ["نوت‌بوک جدید", "A new notebook"], d: ["به colab.research.google.com برو، با حساب گوگل وارد شو و **New notebook** را بزن.", "Go to colab.research.google.com, sign in with Google, and press **New notebook**."],
        s: colab(cell("", ""), dialog("Open notebook", hl('<button class="m-b">+ New notebook</button>', 1))) },
      { t: ["اجرای سلول", "Run a cell"], d: ["کد را بنویس و مثلث کنار سلول را بزن یا Shift+Enter را فشار بده. خروجی زیر سلول می‌آید.", "Write code and press the triangle beside the cell, or Shift+Enter. The output appears below."],
        s: colab(cell('print("Hello Colab")', "Hello Colab", 1)) },
      { t: ["فعال کردن GPU", "Enable a GPU"], d: ["از منوی **Runtime** گزینه **Change runtime type** را بزن و یک GPU انتخاب کن. برای یادگیری عمیق مفید است؛ سهمیه رایگان محدود است.", "Choose **Runtime > Change runtime type** and pick a GPU. It helps deep learning, and the free quota is limited."],
        s: colab(cell("import torch\nprint(torch.cuda.is_available())", "True"), dialog("Change runtime type", '<p>Hardware accelerator</p><label><input type="radio" disabled> CPU</label>' + hl('<label><input type="radio" checked disabled> GPU</label>', 1) + '<div class="m-r"><button class="m-b">Save</button></div>')) },
      { t: ["نصب کتابخانه", "Install a library"], d: ["برای اجرای دستور ترمینال در Colab، اول آن علامت تعجب بگذار.", "To run a terminal command in Colab, begin it with an exclamation mark."],
        s: colab(cell("!pip install scikit-fuzzy", "Successfully installed scikit-fuzzy", 1)) },
      { t: ["ذخیره کار", "Save your work"], d: ["نوت‌بوکی که از این سایت باز کرده‌ای را با **File > Save a copy in Drive** در Drive خودت ذخیره کن. فایل‌های داخل نشست پس از پایان آن پاک می‌شوند.", "Save a notebook opened from this site with **File > Save a copy in Drive**. Files in the session are removed when it ends."],
        s: colab(cell("# your work", ""), dialog("File", '<div class="m-list">New notebook</div><div class="m-list">Open notebook</div>' + hl('<div class="m-list on">Save a copy in Drive</div>', 1))) }
    ],
    venv: [
      { t: ["ساخت محیط", "Create the environment"], d: ["در پوشه پروژه این دستور پوشه ~.venv~ را می‌سازد.", "In your project folder, this creates a ~.venv~ folder."], s: term([C("python -m venv .venv", "PS C:\\my_project>", 1)]) },
      { t: ["فعال‌سازی", "Activate it"], d: ["پس از فعال‌سازی، ابتدای خط عبارت ~(.venv)~ دیده می‌شود. در مک و لینوکس دستور ~source .venv/bin/activate~ است.", "Once active, the line starts with ~(.venv)~. On macOS and Linux the command is ~source .venv/bin/activate~."], s: term([C(".venv\\Scripts\\activate", "PS C:\\my_project>", 1), C("", "(.venv) PS C:\\my_project>")]) },
      { t: ["نصب کتابخانه‌ها", "Install libraries"], d: ["حالا کتابخانه‌ها فقط داخل همین پروژه نصب می‌شوند.", "Now libraries are installed only inside this project."], s: term([C("pip install numpy pandas", "(.venv) PS C:\\my_project>", 1), "Successfully installed numpy pandas"]) },
      { t: ["ثبت نسخه‌ها", "Record the versions"], d: ["با ~pip freeze~ فهرست را ذخیره کن تا دیگران با ~pip install -r requirements.txt~ همان محیط را بسازند.", "Save the list with ~pip freeze~ so others can recreate it with ~pip install -r requirements.txt~."], s: term([C("pip freeze > requirements.txt", "(.venv) PS C:\\my_project>", 1), C("pip install -r requirements.txt", "(.venv) PS C:\\other>")]) }
    ]
  };

  var UI = { prev: ["قبلی", "Back"], next: ["بعدی", "Next"], step: ["مرحله", "Step"], note: ["تصویرها شبیه‌سازی ساده برنامه‌ها هستند و ممکن است روی سیستم تو کمی متفاوت باشند.", "These pictures are simplified drawings, so your screen may look slightly different."] };
  function text(s) { return s.replace(/~([^~]+)~/g, '<code dir="ltr">$1</code>').replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"); }

  window.mountWalk = function (host, name, lang) {
    var steps = WALK[name], L = lang === "fa" ? 0 : 1, i = 0;
    if (!steps) return;
    host.innerHTML = '<div class="w-stage" dir="ltr"></div><div class="w-info"><p class="w-count"></p><h4></h4><p class="w-desc"></p></div><div class="w-nav"><button class="w-p">' + UI.prev[L] + '</button><div class="w-dots"></div><button class="w-n">' + UI.next[L] + '</button></div><p class="w-note">' + UI.note[L] + "</p>";
    var dots = host.querySelector(".w-dots");
    steps.forEach(function (_, k) { var d = document.createElement("button"); d.setAttribute("aria-label", UI.step[L] + " " + (k + 1)); d.onclick = function () { show(k); }; dots.appendChild(d); });
    function show(k) {
      i = k;
      host.querySelector(".w-stage").innerHTML = steps[i].s;
      host.querySelector(".w-count").textContent = UI.step[L] + " " + (i + 1) + " / " + steps.length;
      host.querySelector(".w-info h4").textContent = steps[i].t[L];
      host.querySelector(".w-desc").innerHTML = text(steps[i].d[L]);
      host.querySelector(".w-p").disabled = i === 0;
      host.querySelector(".w-n").disabled = i === steps.length - 1;
      [].forEach.call(dots.children, function (d, j) { d.className = j === i ? "on" : ""; });
    }
    host.querySelector(".w-p").onclick = function () { show(i - 1); };
    host.querySelector(".w-n").onclick = function () { show(i + 1); };
    show(0);
  };
})();
