M("python", "start", "شروع و ابزارها", "Getting started and tools");

L({ id: "py-why",
  fa: ["برنامه‌نویسی و پایتون", R`برنامه‌نویسی یعنی نوشتن دستورهایی دقیق که کامپیوتر آن‌ها را مرحله‌به‌مرحله اجرا کند. برنامه‌نویسی فقط برای مهندسان نرم‌افزار نیست؛ پزشک، اقتصاددان، زیست‌شناس و مهندس هم با آن کارهای تکراری را خودکار و داده را تحلیل می‌کنند.

پایتون زبانی خوانا و رایگان است و برای تحلیل داده و هوش مصنوعی کتابخانه‌های قدرتمندی دارد.

- **خوانایی:** کد آن به زبان ساده نزدیک است.
- **اکوسیستم:** NumPy، Pandas، scikit-learn و PyTorch.
- **کاربرد:** داده، هوش مصنوعی، وب، اتوماسیون و پژوهش.

!همین حالا دکمه «اجرا» را بزن. بعد متن داخل کد را تغییر بده و دوباره اجرا کن؛ چیزی خراب نمی‌شود.`],
  en: ["Programming and Python", R`Programming means writing precise instructions that a computer carries out step by step. It is not only for software engineers: doctors, economists, biologists and engineers use it to automate work and analyze data.

Python is readable, free, and has powerful libraries for data and AI.

- **Readable:** the code looks close to plain language.
- **Ecosystem:** NumPy, Pandas, scikit-learn and PyTorch.
- **Used for:** data, AI, the web, automation and research.

!Press Run now. Then change the text in the code and run it again. You cannot break anything.`],
  code: [`print("Hello, world!")\nprint("2 + 3 =", 2 + 3)`],
  quiz: [Q("کدام گزینه درست است؟", "Which statement is true?", ["پایتون فقط برای برنامه‌نویسان حرفه‌ای است", "پایتون رایگان است و در رشته‌های مختلف کاربرد دارد", "پایتون فقط برای ساخت سایت است"], ["Python is only for professional programmers", "Python is free and useful in many fields", "Python is only for building websites"], 1)]
});

L({ id: "py-install",
  fa: ["نصب پایتون", R`## ویندوز
روش رسمی و فعلی python.org برای ویندوز، برنامه **Python Install Manager** است. مراحل را تصویری دنبال کن:

[[walk:win]]

## روش قدیمی ویندوز
نصب‌کننده کامل منسوخ شده و برای نسخه ۳٫۱۶ به بعد ساخته نمی‌شود؛ فقط اگر روش بالا روی سیستمت کار نکرد از آن استفاده کن.

[[walk:winfull]]

## مک و لینوکس
[[walk:mac]]

!در مک و لینوکس معمولاً به‌جای ~python~ از ~python3~ و به‌جای ~pip~ از ~pip3~ استفاده می‌شود.`],
  en: ["Installing Python", R`## Windows
The current official way from python.org is the **Python Install Manager**. Follow the steps visually:

[[walk:win]]

## The older Windows method
The full installer is deprecated and will not be produced for Python 3.16 or later. Use it only if the method above does not work on your system.

[[walk:winfull]]

## macOS and Linux
[[walk:mac]]

!On macOS and Linux, use ~python3~ instead of ~python~ and ~pip3~ instead of ~pip~.`],
  code: [SH(`# Windows\npy install\npython --version\npy list\n\n# macOS and Linux\npython3 --version`), SH(`# Ubuntu / Debian\nsudo apt update\nsudo apt install python3 python3-pip python3-venv`)],
  quiz: [Q("اگر در ویندوز با تایپ python فروشگاه Microsoft باز شد چه کنیم؟", "If typing python on Windows opens the Microsoft Store, what should you do?", ["App execution aliases را بررسی کنیم", "ویندوز را دوباره نصب کنیم", "دستور را بزرگ بنویسیم"], ["Check App execution aliases", "Reinstall Windows", "Write the command in capitals"], 0, "این گزینه‌ها تعیین می‌کنند دستور python به کدام برنامه برود.", "These settings decide which program the python command opens.")]
});

L({ id: "py-terminal",
  fa: ["کار با ترمینال", R`[[walk:terminal]]

ترمینال پنجره‌ای است که با تایپ دستور با سیستم کار می‌کنی. برای اجرای برنامه‌ها و نصب کتابخانه‌ها به چند دستور ساده نیاز داری.

- ~cd~ رفتن به پوشه
- ~ls~ دیدن فایل‌های پوشه (در خط فرمان قدیمی ویندوز ~dir~)
- ~mkdir~ ساختن پوشه
- ~python file.py~ اجرای یک برنامه

!کلید Tab نام فایل را کامل می‌کند و کلید بالا دستور قبلی را برمی‌گرداند.`],
  en: ["Using the terminal", R`[[walk:terminal]]

The terminal is a window where you control the system by typing commands. You only need a few to run programs and install libraries.

- ~cd~ change folder
- ~ls~ list files (~dir~ in the old Windows command prompt)
- ~mkdir~ make a folder
- ~python file.py~ run a program

!The Tab key completes file names, and the Up arrow brings back the previous command.`],
  code: [SH(`mkdir my_project\ncd my_project\npython hello.py`)]
});

L({ id: "py-vscode",
  fa: ["کار با VS Code", R`[[walk:vscode]]

VS Code ویرایشگری رایگان و محبوب است.

## راه‌اندازی
- آن را از [code.visualstudio.com](https://code.visualstudio.com/) نصب کن.
- از بخش Extensions افزونه **Python** ساخت Microsoft را نصب کن. برای نوت‌بوک، افزونه **Jupyter** را هم بگیر.
- با File > Open Folder پوشه پروژه را باز کن و فایلی مثل ~hello.py~ بساز.
- با Ctrl+Shift+P دستور **Python: Select Interpreter** را اجرا کن و مفسر مناسب را انتخاب کن.

## اجرا و عیب‌یابی
- مثلث Run بالا سمت راست فایل را اجرا می‌کند.
- کلیدهای Ctrl و علامت بک‌تیک، ترمینال داخلی را باز می‌کنند.
- روی شماره خط کلیک کن تا Breakpoint بگذاری، سپس F5 را بزن تا برنامه خط‌به‌خط اجرا شود.
- فایل با پسوند ~ipynb~ در VS Code به‌صورت نوت‌بوک باز می‌شود.`],
  en: ["Using VS Code", R`[[walk:vscode]]

VS Code is a free and popular editor.

## Setup
- Install it from [code.visualstudio.com](https://code.visualstudio.com/).
- In Extensions, install **Python** by Microsoft. For notebooks, also install **Jupyter**.
- Use File > Open Folder to open your project and create a file such as ~hello.py~.
- Press Ctrl+Shift+P, run **Python: Select Interpreter**, and choose your Python.

## Running and debugging
- The Run triangle at the top right runs the file.
- Ctrl plus the backtick key opens the built-in terminal.
- Click beside a line number to set a breakpoint, then press F5 to step through the program.
- Files ending in ~ipynb~ open as notebooks inside VS Code.`],
  quiz: [Q("Breakpoint برای چیست؟", "What is a breakpoint for?", ["توقف برنامه در یک خط برای بررسی آن", "حذف یک خط", "نصب کتابخانه"], ["Pausing the program at a line to inspect it", "Deleting a line", "Installing a library"], 0)]
});

L({ id: "py-colab",
  fa: ["کار با Google Colab", R`[[walk:colab]]

Colab یک نوت‌بوک پایتون رایگان در مرورگر است و به نصب نیاز ندارد. با حساب گوگل به [colab.research.google.com](https://colab.research.google.com/) برو.

- هر نوت‌بوک از **سلول کد** و **سلول متن** ساخته شده است.
- Shift+Enter سلول را اجرا می‌کند.
- برای GPU از Runtime > Change runtime type استفاده کن.
- کتابخانه‌ها را با علامت تعجب و pip نصب کن.
- فایل‌های Colab پس از پایان نشست پاک می‌شوند؛ نتیجه مهم را در Google Drive ذخیره کن.

!در هر درس این سایت، دکمه Colab نوت‌بوک همان درس را باز می‌کند. با File > Save a copy in Drive نسخه خودت را نگه دار.`],
  en: ["Using Google Colab", R`[[walk:colab]]

Colab is a free Python notebook in your browser, with nothing to install. Sign in with Google at [colab.research.google.com](https://colab.research.google.com/).

- A notebook is made of **code cells** and **text cells**.
- Shift+Enter runs a cell.
- For a GPU, use Runtime > Change runtime type.
- Install libraries with an exclamation mark and pip.
- Colab files vanish when the session ends, so save important results to Google Drive.

!On every lesson of this site, the Colab button opens that lesson's notebook. Use File > Save a copy in Drive to keep your own version.`],
  code: [COLAB(`# Run these inside Google Colab\n!pip install seaborn\n\nfrom google.colab import drive\ndrive.mount("/content/drive")`)]
});

L({ id: "py-venv",
  fa: ["pip و محیط مجازی", R`[[walk:venv]]

~pip~ کتابخانه‌ها را نصب می‌کند. **محیط مجازی** برای هر پروژه پوشه‌ای جدا می‌سازد تا نسخه کتابخانه‌های پروژه‌ها با هم تداخل نکنند.

فایل ~requirements.txt~ فهرست کتابخانه‌ها را نگه می‌دارد تا پروژه روی کامپیوتر دیگر هم آماده شود.

!اگر PowerShell اجرای activate را مسدود کرد، این دستور را یک بار اجرا کن: ~Set-ExecutionPolicy -Scope CurrentUser RemoteSigned~`],
  en: ["pip and virtual environments", R`[[walk:venv]]

~pip~ installs libraries. A **virtual environment** gives each project its own folder, so library versions of different projects do not clash.

The file ~requirements.txt~ lists the libraries so that the project can be set up on another computer.

!If PowerShell blocks activation, run this once: ~Set-ExecutionPolicy -Scope CurrentUser RemoteSigned~`],
  code: [SH(`python -m venv .venv\n\n# Windows\n.venv\\Scripts\\activate\n\n# macOS and Linux\nsource .venv/bin/activate\n\npip install numpy pandas matplotlib scikit-learn\npip freeze > requirements.txt`)],
  quiz: [Q("چرا محیط مجازی می‌سازیم؟", "Why create a virtual environment?", ["برای جدا کردن کتابخانه‌های هر پروژه", "برای سریع‌تر شدن اینترنت", "برای حذف پایتون"], ["To keep each project's libraries separate", "To speed up the internet", "To remove Python"], 0)]
});

M("python", "basics", "مبانی زبان", "Language basics");

L({ id: "py-vars",
  fa: ["متغیرها و نوع داده", R`متغیر نامی است که به یک مقدار اشاره می‌کند. پایتون نوع را از روی مقدار تشخیص می‌دهد.

- ~int~ عدد صحیح
- ~float~ عدد اعشاری
- ~str~ متن
- ~bool~ درست یا نادرست

نام متغیر با عدد شروع نمی‌شود و به حروف بزرگ و کوچک حساس است.`],
  en: ["Variables and data types", R`A variable is a name that refers to a value. Python works out the type from the value.

- ~int~ whole number
- ~float~ decimal number
- ~str~ text
- ~bool~ true or false

A variable name cannot begin with a digit, and names are case-sensitive.`],
  code: [`age = 25\nheight = 1.78\nname = "Sara"\nis_student = True\n\nprint(type(age), type(height), type(name), type(is_student))\n\n# Converting between types\nprint(int("42") + 1)\nprint(str(3.5) + " meters")`],
  quiz: [Q("نوع مقدار ~3.0~ چیست؟", "What is the type of ~3.0~?", ["int", "float", "str"], null, 1)]
});

L({ id: "py-numbers-strings",
  fa: ["عدد و رشته", R`عملگرهای عددی: ~+~ و ~-~ و ~*~ و ~/~ (تقسیم اعشاری)، ~//~ (تقسیم صحیح)، ~%~ (باقی‌مانده) و ~**~ (توان).

رشته دنباله‌ای از کاراکترهاست و شماره‌گذاری آن از صفر شروع می‌شود. **f-string** ساده‌ترین راه قرار دادن مقدار داخل متن است.

با آزمایشگاه زیر ببین برش ~[start:stop:step]~ دقیقاً چه چیزی را انتخاب می‌کند.`],
  en: ["Numbers and strings", R`Numeric operators: ~+~, ~-~, ~*~, ~/~ (decimal division), ~//~ (whole division), ~%~ (remainder) and ~**~ (power).

A string is a sequence of characters, indexed from zero. An **f-string** is the easiest way to put values inside text.

Use the lab below to see exactly what the slice ~[start:stop:step]~ selects.`],
  demo: "slice",
  code: [`print(7 / 2, 7 // 2, 7 % 2, 2 ** 10)\n\ntext = "Machine Learning"\nprint(text[0], text[-1], text[0:7])\nprint(text.upper(), text.replace("Machine", "Deep"))\nprint(len(text), text.split())\n\nscore = 18.456\nprint(f"Score: {score:.1f} out of 20")`],
  quiz: [Q("حاصل ~7 % 3~ چیست؟", "What is ~7 % 3~?", ["1", "2", "2.33"], null, 0, "باقی‌مانده تقسیم ۷ بر ۳ برابر ۱ است.", "The remainder of 7 divided by 3 is 1.")]
});

L({ id: "py-input",
  fa: ["ورودی و خروجی", R`~print~ چیزی را نمایش می‌دهد و ~input~ از کاربر متن می‌گیرد. خروجی ~input~ همیشه رشته است؛ برای محاسبه باید آن را به عدد تبدیل کنی.

!در این سایت مقدار ورودی را در کادر زیر کد بنویس، هر خط برای یک ~input~.`],
  en: ["Input and output", R`~print~ displays something and ~input~ reads text from the user. The result of ~input~ is always a string, so convert it to a number before calculating.

!On this site, write input values in the box below the code, one line per ~input~.`],
  code: [{ src: `name = input("Your name: ")\nyear = int(input("Birth year: "))\nprint(f"Hello {name}, you are about {2026 - year} years old.")`, stdin: "Sara\n2000" }]
});

L({ id: "py-if",
  fa: ["شرط‌ها", R`با ~if~، ~elif~ و ~else~ برنامه تصمیم می‌گیرد. **تورفتگی** (چهار فاصله) در پایتون بخشی از دستور زبان است و بدنه شرط را مشخص می‌کند.

عملگرهای مقایسه: ~==~ و ~!=~ و ~<~ و ~>~ و ~<=~ و ~>=~. برای ترکیب شرط‌ها: ~and~ و ~or~ و ~not~.`],
  en: ["Conditions", R`With ~if~, ~elif~ and ~else~ a program makes decisions. **Indentation** (four spaces) is part of Python's grammar and marks the body of a condition.

Comparisons: ~==~, ~!=~, ~<~, ~>~, ~<=~, ~>=~. To combine conditions: ~and~, ~or~, ~not~.`],
  code: [`grade = 15\n\nif grade >= 17:\n    result = "Excellent"\nelif grade >= 10:\n    result = "Passed"\nelse:\n    result = "Failed"\n\nprint(result)\nprint("In range:", 0 <= grade <= 20)`],
  quiz: [Q("برای مقایسه برابری از کدام استفاده می‌شود؟", "Which one tests equality?", ["=", "==", "=>"], null, 1, "علامت = برای مقداردهی است.", "A single = assigns a value.")]
});

L({ id: "py-loops",
  fa: ["حلقه‌ها", R`~for~ روی اعضای یک مجموعه می‌گردد و ~while~ تا زمانی که شرط درست باشد تکرار می‌کند.

- ~range(n)~ اعداد ۰ تا n منهای ۱ را می‌دهد.
- ~enumerate~ شماره و مقدار را با هم می‌دهد.
- ~break~ از حلقه خارج می‌شود و ~continue~ به دور بعد می‌رود.

!اگر حلقه ~while~ تمام نشد، دکمه «توقف» را بزن.`],
  en: ["Loops", R`~for~ goes through the items of a collection, and ~while~ repeats as long as a condition is true.

- ~range(n)~ gives 0 up to n minus 1.
- ~enumerate~ gives the position and the value together.
- ~break~ leaves the loop and ~continue~ jumps to the next round.

!If a ~while~ loop never ends, press Stop.`],
  code: [`total = 0\nfor n in range(1, 6):\n    total += n\nprint("Sum:", total)\n\nfor i, fruit in enumerate(["apple", "kiwi", "plum"]):\n    print(i, fruit)\n\nn = 100\nsteps = 0\nwhile n > 1:\n    n = n // 2\n    steps += 1\nprint("Halvings:", steps)`],
  quiz: [Q("~range(3)~ چه اعدادی می‌دهد؟", "What does ~range(3)~ give?", ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3"], null, 1)]
});

M("python", "structures", "ساختارهای داده", "Data structures");

L({ id: "py-lists",
  fa: ["لیست", R`لیست مجموعه‌ای مرتب و قابل تغییر است. شماره‌گذاری از صفر است و شماره منفی از انتها می‌شمارد.

**List comprehension** راهی کوتاه برای ساختن لیست جدید از روی لیست دیگر است.`],
  en: ["Lists", R`A list is an ordered, changeable collection. Positions start at zero and negative positions count from the end.

A **list comprehension** is a short way to build a new list from another one.`],
  demo: "slice",
  code: [`nums = [5, 2, 9, 1]\nnums.append(7)\nnums.remove(2)\nnums.sort()\nprint(nums, nums[-1], nums[1:3])\nprint(len(nums), sum(nums), max(nums))\n\nsquares = [n ** 2 for n in nums]\nevens = [n for n in range(10) if n % 2 == 0]\nprint(squares, evens)`],
  quiz: [Q("~[1, 2, 3][-1]~ چیست؟", "What is ~[1, 2, 3][-1]~?", ["1", "3", "خطا"], ["1", "3", "An error"], 1)]
});

L({ id: "py-dicts",
  fa: ["دیکشنری، تاپل و مجموعه", R`- **دیکشنری** هر کلید را به یک مقدار نسبت می‌دهد.
- **تاپل** شبیه لیست است ولی تغییر نمی‌کند.
- **مجموعه** عضو تکراری ندارد و برای عضویت و حذف تکرار سریع است.`],
  en: ["Dictionaries, tuples and sets", R`- A **dictionary** maps each key to a value.
- A **tuple** is like a list but cannot be changed.
- A **set** has no duplicates and is fast for membership tests.`],
  code: [`student = {"name": "Ali", "grade": 18}\nstudent["city"] = "Tehran"\nfor key, value in student.items():\n    print(key, "=", value)\nprint(student.get("age", "unknown"))\n\npoint = (3, 4)\nx, y = point\nprint(x + y)\n\nwords = ["a", "b", "a", "c", "b"]\nprint(set(words), len(set(words)))`],
  quiz: [Q("کدام ساختار تکرار را حذف می‌کند؟", "Which structure removes duplicates?", ["list", "tuple", "set"], null, 2)]
});

M("python", "functions", "تابع، خطا و فایل", "Functions, errors and files");

L({ id: "py-functions",
  fa: ["تابع", R`تابع قطعه‌ای کد با نام است که ورودی می‌گیرد و با ~return~ نتیجه برمی‌گرداند. با تابع، کد تکرار نمی‌شود و خواناتر است.

ورودی‌ها می‌توانند مقدار پیش‌فرض داشته باشند. ~lambda~ تابعی کوتاه و بدون نام است.`],
  en: ["Functions", R`A function is a named block of code that takes inputs and gives back a result with ~return~. Functions avoid repetition and make code easier to read.

Inputs may have default values. ~lambda~ makes a short unnamed function.`],
  code: [`def bmi(weight, height=1.70):\n    """Return body mass index."""\n    return weight / height ** 2\n\nprint(round(bmi(70), 1))\nprint(round(bmi(70, height=1.85), 1))\n\npeople = [("Ali", 20), ("Sara", 18), ("Reza", 25)]\nprint(sorted(people, key=lambda p: p[1]))`],
  quiz: [Q("تابعی بدون ~return~ چه برمی‌گرداند؟", "What does a function without ~return~ give back?", ["0", "None", "خطا می‌دهد"], ["0", "None", "It raises an error"], 1)]
});

L({ id: "py-errors",
  fa: ["مدیریت خطا و خواندن پیام خطا", R`پیام خطا دشمن نیست. **آخرین خط** آن نوع خطا را می‌گوید و خط‌های بالاتر محل آن را نشان می‌دهند.

خطاهای رایج: ~SyntaxError~ و ~NameError~ و ~TypeError~ و ~IndexError~ و ~KeyError~.

با ~try~ و ~except~ خطای قابل پیش‌بینی را مدیریت کن، ولی همه خطاها را کورکورانه پنهان نکن.`],
  en: ["Handling and reading errors", R`An error message is not your enemy. Its **last line** names the error and the lines above show where it happened.

Common errors: ~SyntaxError~, ~NameError~, ~TypeError~, ~IndexError~, ~KeyError~.

Use ~try~ and ~except~ for errors you expect, but do not blindly hide every error.`],
  code: [`def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        print("Cannot divide by zero")\n        return None\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))\n\nfor text in ["12", "abc"]:\n    try:\n        print(int(text) * 2)\n    except ValueError as err:\n        print("Bad value:", err)`]
});

L({ id: "py-files",
  fa: ["کار با فایل", R`~with open~ فایل را باز می‌کند و در پایان خودکار می‌بندد. حالت ~w~ می‌نویسد، ~a~ به انتها اضافه می‌کند و ~r~ می‌خواند. برای متن فارسی ~encoding="utf-8"~ را بگذار.

ماژول ~pathlib~ با مسیرها در همه سیستم‌عامل‌ها درست کار می‌کند و ~json~ داده ساختاریافته را ذخیره می‌کند.`],
  en: ["Working with files", R`~with open~ opens a file and closes it automatically. Mode ~w~ writes, ~a~ appends and ~r~ reads. Always set ~encoding="utf-8"~ for text.

The ~pathlib~ module handles paths correctly on every operating system, and ~json~ stores structured data.`],
  code: [`from pathlib import Path\nimport json\n\npath = Path("notes.txt")\nwith open(path, "w", encoding="utf-8") as f:\n    f.write("first line\\nsecond line\\n")\n\nfor line in path.read_text(encoding="utf-8").splitlines():\n    print(line.upper())\n\ndata = {"course": "Python", "lessons": 20}\nPath("data.json").write_text(json.dumps(data))\nprint(json.loads(Path("data.json").read_text())["lessons"])`]
});

L({ id: "py-modules",
  fa: ["ماژول و کتابخانه", R`هر فایل پایتون یک ماژول است. با ~import~ از کد آماده استفاده می‌کنیم. کتابخانه استاندارد همراه پایتون نصب می‌شود؛ مانند ~math~ و ~random~ و ~datetime~ و ~collections~.

بلوک ~if __name__ == "__main__":~ فقط هنگام اجرای مستقیم فایل اجرا می‌شود، نه هنگام import.`],
  en: ["Modules and libraries", R`Every Python file is a module. ~import~ gives access to existing code. The standard library comes with Python, for example ~math~, ~random~, ~datetime~ and ~collections~.

The block ~if __name__ == "__main__":~ runs only when the file is executed directly, not when it is imported.`],
  code: [`import math\nimport random\nfrom collections import Counter\nfrom datetime import date\n\nprint(math.sqrt(144), round(math.pi, 4))\nrandom.seed(1)\nprint(random.randint(1, 6))\nprint(Counter("mississippi").most_common(2))\nprint(date(2026, 1, 1).strftime("%A"))`]
});

L({ id: "py-oop",
  fa: ["کلاس و شیء", R`کلاس نقشه ساخت یک نوع شیء است و داده (ویژگی) و رفتار (متد) را کنار هم نگه می‌دارد. ~__init__~ هنگام ساخت شیء اجرا می‌شود و ~self~ به همان شیء اشاره می‌کند.

مدل‌های scikit-learn هم کلاس‌اند؛ برای همین می‌نویسیم ~model.fit(X, y)~.`],
  en: ["Classes and objects", R`A class is a blueprint for objects and keeps data (attributes) and behavior (methods) together. ~__init__~ runs when an object is created, and ~self~ refers to that object.

scikit-learn models are classes too, which is why we write ~model.fit(X, y)~.`],
  code: [`class Account:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("Amount must be positive")\n        self.balance += amount\n        return self.balance\n\na = Account("Mina")\na.deposit(50)\nprint(a.owner, a.balance)\n\nclass Savings(Account):\n    def add_interest(self, rate):\n        return self.deposit(self.balance * rate)\n\ns = Savings("Omid", 100)\nprint(s.add_interest(0.1))`]
});

M("python", "science", "کتابخانه‌های داده", "Data libraries");

L({ id: "py-numpy",
  fa: ["NumPy", R`NumPy آرایه چندبعدی و محاسبات سریع می‌دهد. عملیات روی کل آرایه بدون حلقه انجام می‌شود (**برداری‌سازی**) و **Broadcasting** آرایه‌های هم‌خوان با اندازه متفاوت را ترکیب می‌کند.

- ~shape~ ابعاد آرایه
- ~axis=0~ در امتداد سطرها (هر ستون) و ~axis=1~ در امتداد ستون‌ها (هر سطر)
- ~@~ ضرب ماتریسی`],
  en: ["NumPy", R`NumPy provides multi-dimensional arrays and fast computing. Operations work on whole arrays without loops (**vectorization**), and **broadcasting** combines compatible arrays of different sizes.

- ~shape~ the array's dimensions
- ~axis=0~ along rows (per column), ~axis=1~ along columns (per row)
- ~@~ matrix multiplication`],
  code: [`import numpy as np\n\na = np.array([[1, 2, 3], [4, 5, 6]])\nprint(a.shape, a.mean(), a.mean(axis=0))\nprint(a * 10)\nprint(a[a > 2])\nprint(a @ a.T)\n\nx = np.linspace(0, 1, 5)\nprint(x, x.reshape(5, 1).shape)\nrng = np.random.default_rng(0)\nprint(rng.normal(size=3).round(3))`],
  quiz: [Q("برداری‌سازی چه مزیتی دارد؟", "What is the benefit of vectorization?", ["کد کوتاه‌تر و بسیار سریع‌تر از حلقه", "حذف داده‌ها", "تبدیل کد به متن"], ["Shorter code that is much faster than loops", "Deleting data", "Turning code into text"], 0)]
});

L({ id: "py-pandas",
  fa: ["Pandas", R`Pandas برای داده جدولی است. ~DataFrame~ یک جدول و ~Series~ یک ستون است.

- خواندن: ~read_csv~ و ~read_excel~
- شناخت داده: ~head~ و ~info~ و ~describe~
- انتخاب: ~loc~ با نام و ~iloc~ با شماره
- مقدار گمشده: ~isna~ و ~fillna~ و ~dropna~
- گروه‌بندی: ~groupby~`],
  en: ["Pandas", R`Pandas is for tabular data. A ~DataFrame~ is a table and a ~Series~ is a column.

- Reading: ~read_csv~, ~read_excel~
- Knowing the data: ~head~, ~info~, ~describe~
- Selecting: ~loc~ by label, ~iloc~ by position
- Missing values: ~isna~, ~fillna~, ~dropna~
- Grouping: ~groupby~`],
  code: [`import pandas as pd\n\ndf = pd.DataFrame({\n    "city": ["Tehran", "Shiraz", "Tehran", "Tabriz", "Shiraz"],\n    "sales": [120, 85, None, 60, 95],\n    "year": [2024, 2024, 2025, 2025, 2025],\n})\nprint(df.isna().sum())\ndf["sales"] = df["sales"].fillna(df["sales"].mean())\nprint(df.head(3))\nprint(df[df.sales > 90])\nprint(df.groupby("city")["sales"].mean().round(1))\nprint(df.describe().round(1))`]
});

L({ id: "py-matplotlib",
  fa: ["رسم نمودار با Matplotlib", R`نمودار خوب الگوهایی را نشان می‌دهد که در جدول دیده نمی‌شوند. پرکاربردها: خطی برای روند، پراکندگی برای رابطه، هیستوگرام برای توزیع و میله‌ای برای مقایسه.

همیشه برای نمودار عنوان و نام محورها بگذار.`],
  en: ["Plotting with Matplotlib", R`A good plot shows patterns a table hides. The most useful kinds are line for trends, scatter for relationships, histogram for distributions, and bar for comparisons.

Always give a plot a title and axis labels.`],
  code: [`import matplotlib.pyplot as plt\nimport numpy as np\n\nrng = np.random.default_rng(1)\nx = rng.normal(170, 8, 300)\ny = 0.9 * x - 90 + rng.normal(0, 6, 300)\n\nfig, ax = plt.subplots(1, 2, figsize=(9, 3.5))\nax[0].hist(x, bins=25, color="#e8590c")\nax[0].set(title="Height distribution", xlabel="Height (cm)", ylabel="Count")\nax[1].scatter(x, y, s=10, color="#5b34c4")\nax[1].set(title="Height vs weight", xlabel="Height (cm)", ylabel="Weight (kg)")\nplt.tight_layout()\nplt.show()`]
});

L({ id: "py-git",
  fa: ["Git و GitHub در یک نگاه", R`Git نسخه‌های کد را ذخیره می‌کند و GitHub میزبانی آنلاین و همکاری را ممکن می‌کند.

- ~git add~ تغییرها را آماده می‌کند.
- ~git commit~ یک نقطه ذخیره می‌سازد.
- ~git push~ آن را روی GitHub می‌فرستد.
- ~git pull~ تغییرها را از GitHub می‌گیرد.

!رمزها و فایل‌های حجیم را در مخزن نگذار و آن‌ها را در ~.gitignore~ بنویس.`],
  en: ["Git and GitHub at a glance", R`Git stores versions of your code, and GitHub adds online hosting and collaboration.

- ~git add~ stages changes.
- ~git commit~ creates a save point.
- ~git push~ sends it to GitHub.
- ~git pull~ brings changes from GitHub.

!Never put passwords or huge files in a repository; list them in ~.gitignore~.`],
  code: [SH(`git init\ngit add .\ngit commit -m "First version"\ngit branch -M main\ngit remote add origin https://github.com/USERNAME/REPOSITORY.git\ngit push -u origin main`)]
});

L({ id: "py-project",
  fa: ["پروژه پایانی: تحلیل نمرات", R`در این پروژه همه چیز کنار هم می‌آید: ساخت داده، پاک‌سازی، تحلیل، تابع و نمودار. کد را تغییر بده؛ مثلاً تعداد دانش‌آموزان یا مرز قبولی را عوض کن.

**تمرین:** میانگین هر درس را جدا حساب کن و درسی را که کمترین میانگین دارد چاپ کن.`],
  en: ["Final project: analyzing grades", R`This project brings everything together: creating data, cleaning, analysis, functions and a plot. Change the code, for example the number of students or the pass mark.

**Exercise:** compute the mean of each subject and print the subject with the lowest mean.`],
  code: [`import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\nrng = np.random.default_rng(7)\nn = 60\ndf = pd.DataFrame({\n    "math": rng.normal(14, 3, n).clip(0, 20).round(1),\n    "physics": rng.normal(13, 3.5, n).clip(0, 20).round(1),\n    "study_hours": rng.uniform(0, 12, n).round(1),\n})\ndf.loc[rng.choice(n, 4, replace=False), "physics"] = np.nan\ndf["physics"] = df["physics"].fillna(df["physics"].median())\n\ndef status(avg, passing=10):\n    return "pass" if avg >= passing else "fail"\n\ndf["average"] = df[["math", "physics"]].mean(axis=1).round(2)\ndf["status"] = df["average"].apply(status)\nprint(df["status"].value_counts())\nprint("Correlation of hours and average:", round(df.study_hours.corr(df.average), 3))\n\nplt.hist(df["average"], bins=12, color="#1f6f8b")\nplt.title("Average grades")\nplt.xlabel("Average")\nplt.ylabel("Students")\nplt.show()`]
});
