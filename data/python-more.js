// More Python lessons, so a complete beginner can learn step by step.
M("python", "start");

L({ id: "py-playground", after: "py-colab",
  fa: ["محیط کدنویسی همین سایت", R`## بدون نصب، همین حالا
این سایت یک **پایتون کامل داخل مرورگر** دارد (با فناوری Pyodide). کد روی کامپیوتر خودت اجرا می‌شود، نه روی سرور؛ پس رایگان است و کدهایت پیش خودت می‌ماند. از منوی بالا **محیط کدنویسی** را باز کن.

## امکانات
| امکان | چطور |
|---|---|
| چند فایل (تب) | دکمه **+** کنار تب‌ها؛ دوبار کلیک روی نام تب برای تغییر نام |
| ذخیره خودکار | هر تغییر روی **همین مرورگر** ذخیره می‌شود؛ دفعه بعد که بیایی سر جایش است |
| دانلود کد | **دانلود .py** برای تب فعلی، **دانلود نوت‌بوک** برای همه تب‌ها (قابل باز شدن در Colab و Jupyter) |
| باز کردن فایل | فایل .py یا .ipynb خودت را باز کن |
| آپلود داده | فایل CSV یا Excel را آپلود کن و با ~pd.read_csv("name.csv")~ بخوان |
| دانلود خروجی | فایل‌هایی که کد می‌سازد (مثل ~df.to_csv~) در فهرست فایل‌ها با دکمه ⬇ دانلود می‌شوند |
| نصب کتابخانه | در کادر نصب نام کتابخانه را بنویس یا در کد بنویس ~%pip install seaborn~ |
| ورودی | برای ~input()~ مقدارها را در بخش «ورودی‌ها» بنویس |
| کلید میانبر | Ctrl+Enter یا Shift+Enter برای اجرا |

## کتابخانه‌های آماده
numpy، pandas، scipy، scikit-learn، matplotlib، sympy، statsmodels، networkx، Pillow و ده‌ها کتابخانه دیگر **خودکار** با اولین import بارگذاری می‌شوند. کتابخانه‌های پایتون خالص از PyPI (مثل seaborn و scikit-fuzzy) هم با ~%pip install~ نصب می‌شوند.

## محدودیت‌ها (صادقانه)
| محدودیت | دلیل | راه حل |
|---|---|---|
| PyTorch و TensorFlow اجرا نمی‌شوند | این کتابخانه‌ها نسخه مرورگر ندارند | دکمه **Colab** |
| دانلود مستقیم از بعضی سایت‌ها خطا می‌دهد | سیاست امنیتی مرورگر (CORS) | فایل را دانلود و آپلود کن |
| ذخیره فقط روی همین مرورگر | سایت روی GitHub Pages است و سرور ندارد | کدت را دانلود کن |
| پاک کردن داده‌های مرورگر، کدها را پاک می‌کند | ذخیره محلی است | نسخه پشتیبان دانلود کن |
| اجرای اول کند است | بارگذاری پایتون (حدود ۱۰ مگابایت) | بار بعد از حافظه مرورگر می‌آید |

!در هر درس دکمه **محیط کدنویسی** کنار هر کد، آن کد را در یک تب جدید محیط کدنویسی باز می‌کند تا آزادانه تغییرش دهی.

[[c:0]]`],
  en: ["This site's playground", R`## No installation, right now
This site has a **complete Python inside your browser** (powered by Pyodide). Code runs on your own computer, not on a server, so it is free and your code stays with you. Open **Playground** from the top menu.

## Features
| Feature | How |
|---|---|
| Several files (tabs) | The **+** button next to the tabs; double-click a tab's name to rename it |
| Automatic saving | Every change is saved **in this browser**; it is still there next time |
| Download code | **Download .py** for the current tab, **Download notebook** for all tabs (opens in Colab and Jupyter) |
| Open a file | Open your own .py or .ipynb file |
| Upload data | Upload a CSV or Excel file and read it with ~pd.read_csv("name.csv")~ |
| Download output | Files your code creates (e.g. ~df.to_csv~) appear in the file list with a ⬇ button |
| Install packages | Type the name in the install box, or write ~%pip install seaborn~ in the code |
| Input | Values for ~input()~ go in the "Values for input()" box |
| Shortcut | Ctrl+Enter or Shift+Enter to run |

## Ready libraries
numpy, pandas, scipy, scikit-learn, matplotlib, sympy, statsmodels, networkx, Pillow and dozens more load **automatically** on the first import. Pure-Python packages from PyPI (such as seaborn and scikit-fuzzy) install with ~%pip install~.

## Limits (honestly)
| Limit | Reason | Way around |
|---|---|---|
| PyTorch and TensorFlow do not run | They have no browser version | The **Colab** button |
| Downloading straight from some websites fails | The browser's security policy (CORS) | Download the file, then upload it |
| Saved only in this browser | The site is on GitHub Pages and has no server | Download your code |
| Clearing browser data deletes the code | Storage is local | Keep a downloaded backup |
| The first run is slow | Python (about 10 MB) is loading | Later it comes from the browser cache |

!In every lesson, the **Playground** button next to each code cell opens that code in a new playground tab, so you can change it freely.

[[c:0]]`],
  code: [`%pip install seaborn
import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({"hours": [1, 2, 3, 4, 5, 6, 7, 8], "grade": [9, 11, 12, 14, 13, 16, 18, 19]})
sns.regplot(data=df, x="hours", y="grade")
plt.title("Installed seaborn inside the browser")
plt.show()
df.to_csv("my_grades.csv", index=False)
print("my_grades.csv was created. In the playground it appears in the file list.")`]
});

M("python", "basics");

L({ id: "py-first", before: "py-vars",
  fa: ["اولین برنامه", R`## برنامه چیست؟
برنامه فهرستی از **دستورها** است که کامپیوتر **خط به خط، از بالا به پایین** اجرا می‌کند. پایتون زبانی است که این دستورها را نزدیک به زبان انسان می‌نویسد.

## print: نمایش چیزی روی صفحه
[[c:0]]

دکمه **اجرا** را بزن. هر ~print~ یک خط چاپ می‌کند. متن باید داخل گیومه باشد (~"..."~ یا ~'...'~)؛ عدد نه.

| کد | خروجی |
|---|---|
| ~print("سلام")~ | سلام |
| ~print(2 + 3)~ | 5 |
| ~print("2 + 3")~ | 2 + 3 (متن است، حساب نمی‌شود) |
| ~print("a", "b", 7)~ | a b 7 |
| ~print("a", "b", sep="-")~ | a-b |

## توضیح (کامنت)
هر چیزی بعد از ~#~ را پایتون نادیده می‌گیرد. کامنت برای انسان‌هاست: توضیح بده کد **چرا** این کار را می‌کند.

## خطا دوست توست
وقتی اشتباه کنی، پایتون پیام خطا می‌دهد. **آخرین خط** پیام را بخوان: نوع خطا و توضیحش آن‌جاست.

| خطا | معنی | مثال |
|---|---|---|
| ~SyntaxError~ | دستور زبان غلط | گیومه یا پرانتز جا افتاده |
| ~NameError~ | نامی که تعریف نشده | ~prin("hi")~ یا متغیر ساخته‌نشده |
| ~IndentationError~ | تورفتگی غلط | فاصله اضافه اول خط |
| ~TypeError~ | نوع نامناسب | ~"2" + 3~ |

[[c:1]]

کد بالا را اجرا کن و خطا را بخوان؛ بعد اشتباه را درست کن و دوباره اجرا کن. این مهم‌ترین مهارت برنامه‌نویسی است!

!بزرگ و کوچک بودن حروف مهم است: ~Print~ با ~print~ فرق دارد.`],
  en: ["Your first program", R`## What is a program?
A program is a list of **instructions** that the computer runs **line by line, from top to bottom**. Python is a language that writes these instructions close to human language.

## print: show something on the screen
[[c:0]]

Press **Run**. Each ~print~ prints one line. Text must be inside quotes (~"..."~ or ~'...'~); numbers do not need them.

| Code | Output |
|---|---|
| ~print("Hello")~ | Hello |
| ~print(2 + 3)~ | 5 |
| ~print("2 + 3")~ | 2 + 3 (text, not computed) |
| ~print("a", "b", 7)~ | a b 7 |
| ~print("a", "b", sep="-")~ | a-b |

## Comments
Python ignores everything after ~#~. Comments are for people: explain **why** the code does what it does.

## Errors are your friends
When you make a mistake, Python shows an error message. Read its **last line**: the kind of error and its explanation are there.

| Error | Meaning | Example |
|---|---|---|
| ~SyntaxError~ | Broken grammar | A missing quote or bracket |
| ~NameError~ | A name that was never defined | ~prin("hi")~ or a variable not yet created |
| ~IndentationError~ | Wrong indentation | Extra spaces at the start of a line |
| ~TypeError~ | Wrong type | ~"2" + 3~ |

[[c:1]]

Run the code above and read the error; then fix the mistake and run it again. This is the most important programming skill!

!Upper and lower case matter: ~Print~ is not ~print~.`],
  code: [`# This is a comment. Python skips it.
print("Hello, world!")
print("My first program in Python")
print(2 + 3)
print("2 + 3")
print("Python", "is", "fun", sep=" * ")`,
`print("This line works")
print("This line has a mistake)
print("Python never reaches this line")`],
  ex: [E("برنامه‌ای بنویس که نام، شهر و سن تو را در سه خط چاپ کند و سن تو را در ۱۲ ضرب کند تا تعداد ماه‌ها چاپ شود.", "Write a program that prints your name, city and age on three lines, then multiplies your age by 12 to print the months.",
    `print("Name: Sara")\nprint("City: Shiraz")\nprint("Age:", 20)\nprint("Months lived:", 20 * 12)`)],
  quiz: [Q("پایتون خطوط برنامه را به چه ترتیبی اجرا می‌کند؟", "In what order does Python run the lines?", ["از بالا به پایین", "از پایین به بالا", "تصادفی"], ["Top to bottom", "Bottom to top", "Randomly"], 0),
    Q("خروجی print(\"3\" * 3) چیست؟", "What does print(\"3\" * 3) show?", ["333", "9", "خطا"], ["333", "9", "An error"], 0, "ضرب متن در عدد، متن را تکرار می‌کند.", "Multiplying text by a number repeats it.")]
});

L({ id: "py-bool", after: "py-input",
  fa: ["مقایسه و منطق (True و False)", R`## بولی: درست یا نادرست
نوع ~bool~ فقط دو مقدار دارد: ~True~ و ~False~. هر **سؤال بله/خیر** در برنامه یک بولی است.

## عملگرهای مقایسه
| عملگر | معنی | مثال | نتیجه |
|---|---|---|---|
| ~==~ | مساوی | ~5 == 5~ | True |
| ~!=~ | نامساوی | ~5 != 3~ | True |
| ~<~ ، ~>~ | کوچک‌تر، بزرگ‌تر | ~3 > 7~ | False |
| ~<=~ ، ~>=~ | کوچک‌تر یا مساوی | ~4 <= 4~ | True |
| ~in~ | عضویت | ~"a" in "cat"~ | True |

!~=~ یعنی «بگذار» (انتساب)، ~==~ یعنی «آیا مساوی است؟» (مقایسه). این دو را قاطی نکن.

## عملگرهای منطقی
| عملگر | کی True است؟ |
|---|---|
| ~A and B~ | هر دو True |
| ~A or B~ | حداقل یکی True |
| ~not A~ | A نادرست باشد |

[[lab:truth]]

## جدول درستی کامل
| A | B | A and B | A or B | not A |
|---|---|---|---|---|
| True | True | True | True | False |
| True | False | False | True | False |
| False | True | False | True | True |
| False | False | False | False | True |

[[c:0]]

## درستی (Truthiness)
در شرط‌ها، پایتون هر مقدار را به بولی تبدیل می‌کند. **نادرست** حساب می‌شوند: ~0~، ~0.0~، ~""~ (متن خالی)، ~[]~، ~{}~، ~None~. بقیه درست‌اند.

[[c:1]]

## مقایسه زنجیره‌ای
پایتون اجازه می‌دهد بنویسی ~0 <= x <= 100~ به جای ~x >= 0 and x <= 100~.`],
  en: ["Comparisons and logic (True and False)", R`## Booleans: true or false
The ~bool~ type has only two values: ~True~ and ~False~. Every **yes/no question** in a program is a boolean.

## Comparison operators
| Operator | Meaning | Example | Result |
|---|---|---|---|
| ~==~ | Equal | ~5 == 5~ | True |
| ~!=~ | Not equal | ~5 != 3~ | True |
| ~<~ , ~>~ | Less, greater | ~3 > 7~ | False |
| ~<=~ , ~>=~ | Less or equal | ~4 <= 4~ | True |
| ~in~ | Membership | ~"a" in "cat"~ | True |

!~=~ means "put" (assignment); ~==~ means "are they equal?" (comparison). Do not mix them up.

## Logical operators
| Operator | When is it True? |
|---|---|
| ~A and B~ | Both are True |
| ~A or B~ | At least one is True |
| ~not A~ | A is False |

[[lab:truth]]

## The full truth table
| A | B | A and B | A or B | not A |
|---|---|---|---|---|
| True | True | True | True | False |
| True | False | False | True | False |
| False | True | False | True | True |
| False | False | False | False | True |

[[c:0]]

## Truthiness
In conditions Python turns any value into a boolean. These count as **false**: ~0~, ~0.0~, ~""~ (empty text), ~[]~, ~{}~, ~None~. Everything else is true.

[[c:1]]

## Chained comparisons
Python lets you write ~0 <= x <= 100~ instead of ~x >= 0 and x <= 100~.`],
  code: [`age = 20
has_ticket = True
print("Adult?", age >= 18)
print("Can enter?", age >= 18 and has_ticket)
print("Child or senior?", age < 12 or age > 65)
print("No ticket?", not has_ticket)
grade = 17.5
print("Valid grade?", 0 <= grade <= 20)
print("'py' in 'python':", "py" in "python")`,
`for value in [0, 1, -3, "", "hi", [], [0], None, 0.0]:
    print(repr(value).ljust(6), "->", bool(value))`],
  ex: [E("سال کبیسه: سالی کبیسه است که بر ۴ بخش‌پذیر باشد و بر ۱۰۰ نه، مگر اینکه بر ۴۰۰ بخش‌پذیر باشد. یک عبارت بولی بنویس و برای 1900، 2000 و 2024 امتحان کن.", "Leap years: divisible by 4 and not by 100, unless divisible by 400. Write one boolean expression and test 1900, 2000 and 2024.",
    `for year in [1900, 2000, 2024, 2023]:\n    leap = (year % 4 == 0 and year % 100 != 0) or year % 400 == 0\n    print(year, leap)`)],
  quiz: [Q("نتیجه True and not False چیست؟", "What is True and not False?", ["True", "False", "خطا"], ["True", "False", "An error"], 0),
    Q("کدام نادرست (falsy) است؟", "Which is falsy?", ["[]", "[0]", "\"0\""], ["[]", "[0]", "\"0\""], 0)]
});

L({ id: "py-while", after: "py-loops",
  fa: ["حلقه while، break و continue", R`## while: تا وقتی که...
~for~ برای وقتی است که می‌دانی روی چه چیزی تکرار کنی. ~while~ تا وقتی یک شرط درست است تکرار می‌کند؛ وقتی **نمی‌دانی چند بار** لازم است.

[[c:0]]

## گام‌به‌گام: سپرده بانکی
| سال | موجودی اول سال | سود ۲۰٪ | موجودی آخر سال |
|---|---|---|---|
| 1 | 100 | 20 | 120 |
| 2 | 120 | 24 | 144 |
| 3 | 144 | 28.8 | 172.8 |
| 4 | 172.8 | 34.6 | 207.4 ← بیشتر از ۲۰۰، حلقه تمام |

!اگر شرط هیچ‌وقت نادرست نشود، حلقه **بی‌نهایت** می‌شود. همیشه مطمئن شو چیزی داخل حلقه شرط را به سمت پایان می‌برد. اگر گیر کردی، دکمه **توقف** را بزن.

## break و continue
| دستور | کار |
|---|---|
| ~break~ | فوراً از حلقه بیرون برو |
| ~continue~ | بقیه این دور را رد کن و برو دور بعد |
| ~else~ بعد از حلقه | فقط اگر حلقه **بدون break** تمام شود اجرا می‌شود |

[[c:1]]

## حلقه for را دوباره ببین
[[lab:loop]]

## الگوی «تا جواب درست»
[[c:2]]`],
  en: ["while loops, break and continue", R`## while: as long as...
~for~ is for when you know what to repeat over. ~while~ repeats as long as a condition is true; use it when you **do not know how many times** you need.

[[c:0]]

## Step by step: a bank deposit
| Year | Start of year | 20% interest | End of year |
|---|---|---|---|
| 1 | 100 | 20 | 120 |
| 2 | 120 | 24 | 144 |
| 3 | 144 | 28.8 | 172.8 |
| 4 | 172.8 | 34.6 | 207.4 ← above 200, the loop ends |

!If the condition never becomes false, the loop runs **forever**. Always make sure something inside the loop moves toward the end. If you get stuck, press **Stop**.

## break and continue
| Statement | What it does |
|---|---|
| ~break~ | Leave the loop immediately |
| ~continue~ | Skip the rest of this round and go to the next |
| ~else~ after a loop | Runs only if the loop finished **without break** |

[[c:1]]

## The for loop again
[[lab:loop]]

## The "until correct" pattern
[[c:2]]`],
  code: [`balance = 100
year = 0
while balance <= 200:
    balance = balance * 1.2
    year += 1
    print(f"year {year}: {balance:.1f}")
print("Years needed:", year)`,
`# Find the first number divisible by 7 and by 11, skipping odd numbers
n = 0
while True:
    n += 1
    if n % 2 == 1:
        continue
    if n % 7 == 0 and n % 11 == 0:
        break
print("Found:", n)

for d in range(2, 10):
    if 97 % d == 0:
        print("97 is divisible by", d)
        break
else:
    print("97 has no divisor between 2 and 9")`,
{ stdin: "5\n9\n7", src: `secret = 7
guess = None
tries = 0
while guess != secret:
    guess = int(input("Guess a number from 1 to 10: "))
    tries += 1
    if guess < secret:
        print("Too small")
    elif guess > secret:
        print("Too big")
print("Correct in", tries, "tries")` }],
  ex: [E("برنامه‌ای بنویس که از ۱ شروع کند و عددها را جمع بزند تا مجموع از ۱۰۰ بیشتر شود. آخرین عدد و مجموع را چاپ کن.", "Add 1, 2, 3, ... until the total exceeds 100. Print the last number and the total.",
    `total = 0\nn = 0\nwhile total <= 100:\n    n += 1\n    total += n\nprint(n, total)`, "آخرین عدد ۱۴ و مجموع ۱۰۵ است.", "The last number is 14 and the total is 105.")],
  quiz: [Q("continue چه می‌کند؟", "What does continue do?", ["بقیه این دور را رد می‌کند", "از حلقه خارج می‌شود", "برنامه را تمام می‌کند"], ["Skips the rest of this round", "Leaves the loop", "Ends the program"], 0)]
});

L({ id: "py-strings", after: "py-numbers-strings",
  fa: ["کار با متن (رشته‌ها)", R`## رشته دنباله‌ای از کاراکترهاست
هر کاراکتر یک **اندیس** دارد که از ۰ شروع می‌شود؛ اندیس منفی از آخر می‌شمارد. رشته‌ها **تغییرناپذیرند**: متدها یک رشته جدید برمی‌گردانند.

| P | y | t | h | o | n |
|---|---|---|---|---|---|
| 0 | 1 | 2 | 3 | 4 | 5 |
| −6 | −5 | −4 | −3 | −2 | −1 |

## متدهای پرکاربرد
| متد | کار | مثال ← نتیجه |
|---|---|---|
| ~upper()~ ، ~lower()~ | حروف بزرگ/کوچک | ~"Hi".upper()~ ← ~"HI"~ |
| ~strip()~ | حذف فاصله دو طرف | ~"  a "~ ← ~"a"~ |
| ~replace(a, b)~ | جایگزینی | ~"2024".replace("4", "5")~ ← ~"2025"~ |
| ~split(sep)~ | شکستن به لیست | ~"a,b,c".split(",")~ ← ~['a','b','c']~ |
| ~sep.join(list)~ | چسباندن لیست | ~"-".join(["a","b"])~ ← ~"a-b"~ |
| ~find(x)~ | اندیس اولین x یا −1 | ~"hello".find("l")~ ← 2 |
| ~count(x)~ | تعداد تکرار | ~"banana".count("a")~ ← 3 |
| ~startswith~ ، ~endswith~ | شروع/پایان | ~"data.csv".endswith(".csv")~ ← True |
| ~isdigit()~ | فقط رقم؟ | ~"123".isdigit()~ ← True |

[[c:0]]

## f-string و قالب‌بندی عدد
| قالب | مقدار | نتیجه |
|---|---|---|
| ~{x:.2f}~ | 3.14159 | 3.14 |
| ~{x:,}~ | 1234567 | 1,234,567 |
| ~{x:%}~ | 0.256 | 25.600000% |
| ~{x:.1%}~ | 0.256 | 25.6% |
| ~{x:>8}~ | "ab" | "      ab" |
| ~{x:05d}~ | 42 | 00042 |

[[c:1]]

## برش (Slicing)
[[lab:slice]]`],
  en: ["Working with text (strings)", R`## A string is a sequence of characters
Each character has an **index** starting at 0; negative indexes count from the end. Strings are **immutable**: methods return a new string.

| P | y | t | h | o | n |
|---|---|---|---|---|---|
| 0 | 1 | 2 | 3 | 4 | 5 |
| −6 | −5 | −4 | −3 | −2 | −1 |

## Common methods
| Method | Does | Example → result |
|---|---|---|
| ~upper()~ , ~lower()~ | Upper/lower case | ~"Hi".upper()~ → ~"HI"~ |
| ~strip()~ | Remove spaces at both ends | ~"  a "~ → ~"a"~ |
| ~replace(a, b)~ | Replace | ~"2024".replace("4", "5")~ → ~"2025"~ |
| ~split(sep)~ | Break into a list | ~"a,b,c".split(",")~ → ~['a','b','c']~ |
| ~sep.join(list)~ | Glue a list | ~"-".join(["a","b"])~ → ~"a-b"~ |
| ~find(x)~ | Index of the first x, or −1 | ~"hello".find("l")~ → 2 |
| ~count(x)~ | Number of occurrences | ~"banana".count("a")~ → 3 |
| ~startswith~ , ~endswith~ | Start/end check | ~"data.csv".endswith(".csv")~ → True |
| ~isdigit()~ | Only digits? | ~"123".isdigit()~ → True |

[[c:0]]

## f-strings and number formats
| Format | Value | Result |
|---|---|---|
| ~{x:.2f}~ | 3.14159 | 3.14 |
| ~{x:,}~ | 1234567 | 1,234,567 |
| ~{x:%}~ | 0.256 | 25.600000% |
| ~{x:.1%}~ | 0.256 | 25.6% |
| ~{x:>8}~ | "ab" | "      ab" |
| ~{x:05d}~ | 42 | 00042 |

[[c:1]]

## Slicing
[[lab:slice]]`],
  code: [`sentence = "  Python is easy and Python is powerful  "
s = sentence.strip()
print(s)
print(s.lower())
print("Count of Python:", s.count("Python"))
words = s.split()
print(words, len(words), "words")
print(" | ".join(words))
print(s.replace("Python", "AI"))
print("First 'is' at index", s.find("is"))
email = "student@uni.ac.ir"
user, domain = email.split("@")
print("user:", user, " domain:", domain, " academic:", domain.endswith(".ac.ir"))`,
`name, score, total = "Sara", 18.456, 1234567
print(f"{name} scored {score:.1f} out of 20 ({score / 20:.1%})")
print(f"Population: {total:,}")
print(f"[{name:>8}] [{name:<8}] [{name:^8}]")
print(f"Student number {42:05d}")`],
  ex: [E("یک جمله بگیر و تعداد کلمه‌ها، طولانی‌ترین کلمه و جمله برعکس (کلمه به کلمه) را چاپ کن.", "Take a sentence and print the word count, the longest word and the sentence reversed word by word.",
    `text = "machine learning makes computers learn from data"\nwords = text.split()\nprint(len(words))\nprint(max(words, key=len))\nprint(" ".join(reversed(words)))`),
    E("بررسی کن یک کلمه پالیندروم است یا نه (از دو طرف یکسان خوانده شود)، بدون توجه به حروف بزرگ و کوچک.", "Check whether a word is a palindrome, ignoring case.",
    `for w in ["Level", "Python", "Racecar"]:\n    print(w, w.lower() == w.lower()[::-1])`)],
  quiz: [Q("\"data\"[-1] چیست؟", "What is \"data\"[-1]?", ["a", "d", "خطا"], ["a", "d", "An error"], 0),
    Q("\"a,b,,c\".split(\",\") چند عضو دارد؟", "How many items does \"a,b,,c\".split(\",\") have?", ["4", "3", "5"], ["4", "3", "5"], 0)]
});

M("python", "structures");

L({ id: "py-tuples-sets", after: "py-dicts",
  fa: ["تاپل و مجموعه", R`## چهار ساختار داده اصلی
| ساختار | نماد | ترتیب دارد؟ | قابل تغییر؟ | تکراری؟ | مثال کاربرد |
|---|---|---|---|---|---|
| لیست | ~[1, 2]~ | بله | بله | بله | فهرست نمره‌ها |
| تاپل | ~(1, 2)~ | بله | **خیر** | بله | مختصات، رکورد ثابت |
| مجموعه | ~{1, 2}~ | خیر | بله | **خیر** | عضوهای یکتا |
| دیکشنری | ~{"a": 1}~ | بله (ترتیب درج) | بله | کلید خیر | جستجو با کلید |

## تاپل
مثل لیست است ولی بعد از ساخته شدن **عوض نمی‌شود**. برای داده‌ای که نباید تغییر کند و برای برگرداندن چند مقدار از تابع استفاده می‌شود. **باز کردن** (unpacking) تاپل خیلی کاربردی است.

[[c:0]]

## مجموعه (set)
مجموعه‌ای از مقادیر **یکتا** بدون ترتیب. بررسی عضویت (~x in s~) در مجموعه خیلی سریع‌تر از لیست است.

| عمل | متد | معنی |
|---|---|---|
| اجتماع | ~a.union(b)~ | در a یا b |
| اشتراک | ~a & b~ | در هر دو |
| تفاضل | ~a - b~ | در a ولی نه b |
| تفاضل متقارن | ~a ^ b~ | فقط در یکی |

اجتماع را با عملگر خط عمودی هم می‌شود نوشت (در کد پایین ببین).

[[c:1]]

!مجموعه خالی ~set()~ است، نه ~{}~ (که دیکشنری خالی است).`],
  en: ["Tuples and sets", R`## The four main data structures
| Structure | Syntax | Ordered? | Changeable? | Duplicates? | Typical use |
|---|---|---|---|---|---|
| List | ~[1, 2]~ | Yes | Yes | Yes | A list of grades |
| Tuple | ~(1, 2)~ | Yes | **No** | Yes | Coordinates, a fixed record |
| Set | ~{1, 2}~ | No | Yes | **No** | Unique members |
| Dictionary | ~{"a": 1}~ | Yes (insertion order) | Yes | Keys no | Look-up by key |

## Tuples
Like a list, but **cannot change** once created. Used for data that must not change and to return several values from a function. **Unpacking** a tuple is very handy.

[[c:0]]

## Sets
A collection of **unique** values without order. Membership checks (~x in s~) are much faster on a set than on a list.

| Operation | Operator | Meaning |
|---|---|---|
| Union | ~a.union(b)~ | In a or b |
| Intersection | ~a & b~ | In both |
| Difference | ~a - b~ | In a but not b |
| Symmetric difference | ~a ^ b~ | In exactly one |

Union can also be written with the vertical-bar operator (see the code below).

[[c:1]]

!An empty set is ~set()~, not ~{}~ (that is an empty dictionary).`],
  code: [`point = (3, 4)
x, y = point                       # unpacking
print("x =", x, " y =", y)

def min_max(numbers):
    return min(numbers), max(numbers)   # returns a tuple

low, high = min_max([7, 2, 9, 4])
print("low:", low, " high:", high)

a, b = 1, 2
a, b = b, a                        # swap in one line
print(a, b)

try:
    point[0] = 10
except TypeError as e:
    print("Tuples cannot change:", e)`,
`python_class = {"Ali", "Sara", "Reza", "Mina"}
ai_class = {"Sara", "Mina", "Omid"}
print("Both classes:", python_class & ai_class)
print("Any class:", python_class | ai_class)
print("Only Python:", python_class - ai_class)
print("Exactly one:", python_class ^ ai_class)

grades = [18, 15, 18, 20, 15, 12]
print("Unique grades:", sorted(set(grades)))
print("Is 'Omid' in the Python class?", "Omid" in python_class)`],
  ex: [E("دو جمله داری. کلمه‌های مشترک و کلمه‌هایی که فقط در جمله اول هستند را پیدا کن.", "Given two sentences, find the shared words and the words only in the first.",
    `a = set("the cat sat on the mat".split())\nb = set("the dog sat on the log".split())\nprint(a & b)\nprint(a - b)`)],
  quiz: [Q("کدام قابل تغییر نیست؟", "Which cannot be changed?", ["تاپل", "لیست", "مجموعه"], ["Tuple", "List", "Set"], 0),
    Q("len({1, 1, 2, 2, 3}) چیست؟", "What is len({1, 1, 2, 2, 3})?", ["3", "5", "2"], ["3", "5", "2"], 0)]
});

L({ id: "py-comprehension", after: "py-tuples-sets",
  fa: ["List comprehension و ابزارهای حلقه", R`## ساختن لیست در یک خط
به جای چهار خط حلقه، می‌توانی بنویسی:

$$\text{[expression for item in iterable if condition]}$$

| حلقه معمولی | comprehension |
|---|---|
| ~out = []~ ، ~for x in nums:~ ، ~out.append(x * x)~ | ~[x * x for x in nums]~ |
| همراه با ~if x % 2 == 0~ | ~[x * x for x in nums if x % 2 == 0]~ |

[[c:0]]

## دیکشنری و مجموعه هم
- ~{k: v for ...}~ دیکشنری می‌سازد.
- ~{x for ...}~ مجموعه می‌سازد.

## ابزارهای مفید حلقه
| تابع | کار | مثال |
|---|---|---|
| ~enumerate(seq)~ | اندیس و مقدار با هم | ~for i, name in enumerate(names)~ |
| ~zip(a, b)~ | دو لیست کنار هم | ~for n, g in zip(names, grades)~ |
| ~sorted(seq, key=...)~ | مرتب‌سازی با معیار | ~sorted(words, key=len)~ |
| ~sum~ ، ~min~ ، ~max~ | تجمیع | ~sum(g for g in grades)~ |
| ~any~ ، ~all~ | آیا یکی/همه درست است | ~all(g >= 10 for g in grades)~ |

[[c:1]]

!comprehension برای کارهای ساده عالی است. اگر طولانی و پیچیده شد، همان حلقه معمولی خواناتر است.`],
  en: ["List comprehensions and loop tools", R`## Building a list in one line
Instead of four lines of loop, you can write:

$$\text{[expression for item in iterable if condition]}$$

| Plain loop | Comprehension |
|---|---|
| ~out = []~ , ~for x in nums:~ , ~out.append(x * x)~ | ~[x * x for x in nums]~ |
| With ~if x % 2 == 0~ | ~[x * x for x in nums if x % 2 == 0]~ |

[[c:0]]

## Dictionaries and sets too
- ~{k: v for ...}~ builds a dictionary.
- ~{x for ...}~ builds a set.

## Useful loop tools
| Function | Does | Example |
|---|---|---|
| ~enumerate(seq)~ | Index and value together | ~for i, name in enumerate(names)~ |
| ~zip(a, b)~ | Two lists side by side | ~for n, g in zip(names, grades)~ |
| ~sorted(seq, key=...)~ | Sort by a rule | ~sorted(words, key=len)~ |
| ~sum~ , ~min~ , ~max~ | Aggregate | ~sum(g for g in grades)~ |
| ~any~ , ~all~ | Is one/every item true? | ~all(g >= 10 for g in grades)~ |

[[c:1]]

!Comprehensions are great for simple jobs. If one gets long and complicated, a plain loop is easier to read.`],
  code: [`nums = [1, 2, 3, 4, 5, 6, 7, 8]
squares = [x * x for x in nums]
even_squares = [x * x for x in nums if x % 2 == 0]
print(squares)
print(even_squares)

words = ["apple", "kiwi", "banana", "fig"]
lengths = {w: len(w) for w in words}
first_letters = {w[0] for w in words}
print(lengths)
print(first_letters)
print([w.upper() if len(w) > 3 else w for w in words])`,
`names = ["Ali", "Sara", "Reza"]
grades = [14, 19, 9]
for i, (n, g) in enumerate(zip(names, grades), start=1):
    print(i, n, g, "pass" if g >= 10 else "fail")
print("Everyone passed?", all(g >= 10 for g in grades))
print("Anyone above 18?", any(g > 18 for g in grades))
print("Best student:", max(zip(grades, names))[1])
print("Sorted by grade:", sorted(zip(names, grades), key=lambda p: p[1], reverse=True))`],
  ex: [E("با comprehension همه عددهای اول کمتر از ۵۰ را پیدا کن.", "Use a comprehension to list all primes below 50.",
    `primes = [n for n in range(2, 50) if all(n % d != 0 for d in range(2, int(n ** 0.5) + 1))]\nprint(primes)`)],
  quiz: [Q("[x for x in range(5) if x > 2] چیست؟", "What is [x for x in range(5) if x > 2]?", ["[3, 4]", "[2, 3, 4]", "[0, 1, 2]"], ["[3, 4]", "[2, 3, 4]", "[0, 1, 2]"], 0)]
});

L({ id: "py-algorithms", after: "py-comprehension",
  fa: ["الگوریتم: جستجو و مرتب‌سازی", R`## الگوریتم چیست؟
الگوریتم دستورالعمل **گام‌به‌گام و دقیق** برای حل یک مسئله است، مثل دستور پخت غذا. دو الگوریتم درست ممکن است سرعت‌های خیلی متفاوتی داشته باشند.

## جستجوی خطی و دودویی
- **خطی:** از اول لیست یکی‌یکی نگاه کن. برای n عضو، در بدترین حالت n مقایسه.
- **دودویی:** فقط روی لیست **مرتب**. وسط را نگاه کن؛ اگر هدف کوچک‌تر است نیمه چپ، وگرنه نیمه راست. هر گام نصف لیست حذف می‌شود.

[[lab:bsearch]]

| تعداد عضو | جستجوی خطی (بدترین) | جستجوی دودویی (بدترین) |
|---|---|---|
| 16 | 16 | 4 |
| 1,000 | 1,000 | 10 |
| 1,000,000 | 1,000,000 | 20 |

[[c:0]]

## مرتب‌سازی
[[lab:sorting]]

| الگوریتم | ایده | پیچیدگی |
|---|---|---|
| حبابی | جفت‌های کنار هم را مقایسه و جابه‌جا کن؛ بزرگ‌ها به آخر می‌روند | $O(n^2)$ |
| انتخابی | کوچک‌ترین را پیدا کن و اول بگذار | $O(n^2)$ |
| درجی | هر عضو را در جای درستش در بخش مرتب‌شده قرار بده | $O(n^2)$؛ روی داده تقریباً مرتب سریع |
| ادغامی، سریع | تقسیم و حل | $O(n\log n)$ |
| ~sorted()~ پایتون | Timsort | $O(n\log n)$ |

## نماد O بزرگ
O بزرگ می‌گوید با بزرگ شدن داده، زمان **چطور رشد می‌کند**:

| نماد | نام | n = 1000 |
|---|---|---|
| $O(1)$ | ثابت | 1 |
| $O(\log n)$ | لگاریتمی | 10 |
| $O(n)$ | خطی | 1,000 |
| $O(n\log n)$ | | 10,000 |
| $O(n^2)$ | درجه دو | 1,000,000 |

[[c:1]]

!در عمل همیشه از ~sorted()~ و ~list.sort()~ استفاده کن؛ پیاده‌سازی دستی فقط برای یادگیری است.`],
  en: ["Algorithms: searching and sorting", R`## What is an algorithm?
An algorithm is a **precise, step-by-step** recipe for solving a problem, like a cooking recipe. Two correct algorithms can have very different speeds.

## Linear and binary search
- **Linear:** look at the items one by one from the start. For n items, n comparisons in the worst case.
- **Binary:** only on a **sorted** list. Look at the middle; if the target is smaller go left, otherwise go right. Each step discards half the list.

[[lab:bsearch]]

| Items | Linear search (worst) | Binary search (worst) |
|---|---|---|
| 16 | 16 | 4 |
| 1,000 | 1,000 | 10 |
| 1,000,000 | 1,000,000 | 20 |

[[c:0]]

## Sorting
[[lab:sorting]]

| Algorithm | Idea | Complexity |
|---|---|---|
| Bubble | Compare neighbors and swap; big items move to the end | $O(n^2)$ |
| Selection | Find the smallest and put it first | $O(n^2)$ |
| Insertion | Put each item in its place in the sorted part | $O(n^2)$; fast on nearly sorted data |
| Merge, quick | Divide and conquer | $O(n\log n)$ |
| Python's ~sorted()~ | Timsort | $O(n\log n)$ |

## Big O notation
Big O says how the time **grows** as the data grows:

| Notation | Name | n = 1000 |
|---|---|---|
| $O(1)$ | Constant | 1 |
| $O(\log n)$ | Logarithmic | 10 |
| $O(n)$ | Linear | 1,000 |
| $O(n\log n)$ | | 10,000 |
| $O(n^2)$ | Quadratic | 1,000,000 |

[[c:1]]

!In practice always use ~sorted()~ and ~list.sort()~; writing your own is for learning only.`],
  code: [`def linear_search(items, target):
    steps = 0
    for i, v in enumerate(items):
        steps += 1
        if v == target:
            return i, steps
    return -1, steps

def binary_search(items, target):
    low, high, steps = 0, len(items) - 1, 0
    while low <= high:
        steps += 1
        mid = (low + high) // 2
        if items[mid] == target:
            return mid, steps
        if items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1, steps

data = list(range(0, 2_000_000, 2))      # one million sorted even numbers
print("linear:", linear_search(data, 1_999_998))
print("binary:", binary_search(data, 1_999_998))`,
`import time, random

def bubble_sort(a):
    a = a[:]
    for i in range(len(a)):
        for j in range(len(a) - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
    return a

for n in [500, 1000, 2000]:
    data = [random.random() for _ in range(n)]
    t = time.perf_counter(); bubble_sort(data); t1 = time.perf_counter() - t
    t = time.perf_counter(); sorted(data); t2 = time.perf_counter() - t
    print(f"n={n}: bubble {t1:.3f} s, sorted() {t2:.5f} s")`],
  ex: [E("مرتب‌سازی انتخابی را پیاده کن و تعداد مقایسه‌ها را برای لیست ۱۰ عضوی بشمار.", "Implement selection sort and count the comparisons for a 10-item list.",
    `def selection_sort(a):\n    a, comps = a[:], 0\n    for i in range(len(a)):\n        m = i\n        for j in range(i + 1, len(a)):\n            comps += 1\n            if a[j] < a[m]:\n                m = j\n        a[i], a[m] = a[m], a[i]\n    return a, comps\nprint(selection_sort([5, 2, 9, 1, 7, 3, 8, 6, 4, 0]))`, "همیشه n(n−1)/2 = 45 مقایسه.", "Always n(n−1)/2 = 45 comparisons.")],
  quiz: [Q("جستجوی دودویی برای یک میلیون عضو حداکثر چند گام لازم دارد؟", "How many steps does binary search need for a million items at most?", ["حدود ۲۰", "حدود ۱۰۰۰", "یک میلیون"], ["About 20", "About 1000", "One million"], 0),
    Q("پیش‌شرط جستجوی دودویی چیست؟", "What does binary search require?", ["لیست مرتب باشد", "لیست کوتاه باشد", "عددها مثبت باشند"], ["A sorted list", "A short list", "Positive numbers"], 0)]
});

M("python", "functions");

L({ id: "py-scope", after: "py-functions",
  fa: ["تابع پیشرفته: حوزه، آرگومان‌ها، lambda و بازگشت", R`## حوزه متغیر (Scope)
متغیری که **داخل** تابع ساخته شود محلی است و بیرون تابع وجود ندارد. تابع می‌تواند متغیر بیرونی را **بخواند**، ولی برای تغییرش باید ~global~ بنویسد (که معمولاً بهتر است نکنی؛ مقدار را برگردان).

[[c:0]]

## انواع آرگومان
| نوع | مثال تعریف | مثال صدا زدن |
|---|---|---|
| موقعیتی | ~def f(a, b)~ | ~f(1, 2)~ |
| با نام | | ~f(b=2, a=1)~ |
| پیش‌فرض | ~def f(a, b=10)~ | ~f(1)~ |
| تعداد دلخواه | ~def f(*args)~ | ~f(1, 2, 3)~ ← args تاپل است |
| با نام دلخواه | ~def f(**kwargs)~ | ~f(x=1, y=2)~ ← kwargs دیکشنری است |

!هرگز لیست یا دیکشنری را مقدار پیش‌فرض نگذار (~def f(a=[])~)؛ بین همه صدا زدن‌ها مشترک می‌شود. از ~None~ استفاده کن.

[[c:1]]

## lambda: تابع یک‌خطی بی‌نام
~lambda x: x * 2~ همان ~def f(x): return x * 2~ است. بیشتر به عنوان آرگومان ~key~ در ~sorted~، ~max~ و ~map~ به کار می‌رود.

## بازگشت (Recursion)
تابعی که **خودش را صدا می‌زند**. دو بخش لازم دارد: **حالت پایه** (توقف) و **گام بازگشتی** (مسئله کوچک‌تر).

| فراخوانی | محاسبه |
|---|---|
| ~factorial(4)~ | 4 × factorial(3) |
| ~factorial(3)~ | 3 × factorial(2) |
| ~factorial(2)~ | 2 × factorial(1) |
| ~factorial(1)~ | 1 (حالت پایه) |
| نتیجه | 4 × 3 × 2 × 1 = 24 |

[[c:2]]`],
  en: ["Advanced functions: scope, arguments, lambda and recursion", R`## Variable scope
A variable created **inside** a function is local and does not exist outside it. A function can **read** an outside variable, but to change it you would need ~global~ (usually better avoided; return the value instead).

[[c:0]]

## Kinds of arguments
| Kind | Definition | Call |
|---|---|---|
| Positional | ~def f(a, b)~ | ~f(1, 2)~ |
| Keyword | | ~f(b=2, a=1)~ |
| Default | ~def f(a, b=10)~ | ~f(1)~ |
| Any number | ~def f(*args)~ | ~f(1, 2, 3)~ → args is a tuple |
| Any keywords | ~def f(**kwargs)~ | ~f(x=1, y=2)~ → kwargs is a dictionary |

!Never use a list or dictionary as a default value (~def f(a=[])~); it is shared between calls. Use ~None~ instead.

[[c:1]]

## lambda: a one-line nameless function
~lambda x: x * 2~ is the same as ~def f(x): return x * 2~. It is mostly passed as the ~key~ argument to ~sorted~, ~max~ and ~map~.

## Recursion
A function that **calls itself**. It needs two parts: a **base case** (stop) and a **recursive step** (a smaller problem).

| Call | Computes |
|---|---|
| ~factorial(4)~ | 4 × factorial(3) |
| ~factorial(3)~ | 3 × factorial(2) |
| ~factorial(2)~ | 2 × factorial(1) |
| ~factorial(1)~ | 1 (base case) |
| Result | 4 × 3 × 2 × 1 = 24 |

[[c:2]]`],
  code: [`rate = 0.09            # a global variable

def price_with_tax(price):
    tax = price * rate  # tax is local; rate is read from outside
    return price + tax

print(price_with_tax(100))
try:
    print(tax)
except NameError as e:
    print("Outside the function:", e)`,
`def describe(name, *skills, city="Tehran", **extra):
    print(name, "from", city)
    print("  skills:", skills)
    print("  extra :", extra)

describe("Sara", "Python", "SQL", city="Shiraz", age=21, remote=True)
describe("Ali")

def add_item(item, basket=None):      # the safe way to have a default list
    if basket is None:
        basket = []
    basket.append(item)
    return basket
print(add_item("apple"), add_item("pear"))`,
`def factorial(n):
    if n <= 1:          # base case
        return 1
    return n * factorial(n - 1)

def fibonacci(n):
    return n if n < 2 else fibonacci(n - 1) + fibonacci(n - 2)

print([factorial(i) for i in range(1, 8)])
print([fibonacci(i) for i in range(12)])
students = [("Ali", 14), ("Sara", 19), ("Reza", 16)]
print(sorted(students, key=lambda s: s[1], reverse=True))
print(list(map(lambda s: s[0].upper(), students)))`],
  ex: [E("یک تابع بازگشتی بنویس که مجموع ارقام یک عدد را حساب کند (مثلاً 1234 ← 10).", "Write a recursive function for the digit sum of a number (1234 → 10).",
    `def digit_sum(n):\n    return n if n < 10 else n % 10 + digit_sum(n // 10)\nprint(digit_sum(1234))`),
    E("تابعی با *args بنویس که میانگین هر تعداد عدد را برگرداند.", "Write a function with *args that returns the mean of any number of values.",
    `def mean(*values):\n    return sum(values) / len(values) if values else None\nprint(mean(2, 4, 9), mean())`)],
  quiz: [Q("بدون حالت پایه، تابع بازگشتی:", "Without a base case, a recursive function:", ["تا خطای RecursionError ادامه می‌دهد", "صفر برمی‌گرداند", "یک بار اجرا می‌شود"], ["Runs until a RecursionError", "Returns zero", "Runs once"], 0)]
});

L({ id: "py-inheritance", after: "py-oop",
  fa: ["وراثت و متدهای ویژه در کلاس‌ها", R`## وراثت
کلاس **فرزند** همه ویژگی‌ها و متدهای کلاس **والد** را به ارث می‌برد و می‌تواند متدی را **بازنویسی** (override) کند یا متد جدید اضافه کند. ~super()~ متد والد را صدا می‌زند.

| مفهوم | مثال |
|---|---|
| والد | ~class Animal:~ |
| فرزند | ~class Dog(Animal):~ |
| بازنویسی | ~Dog~ متد ~speak~ خودش را دارد |
| ~super().__init__(...)~ | سازنده والد را اجرا کن |
| ~isinstance(d, Animal)~ | True؛ سگ یک حیوان است |

[[c:0]]

## متدهای ویژه (dunder)
متدهایی با دو زیرخط که پایتون خودش در موقعیت‌های خاص صدا می‌زند:

| متد | کی صدا زده می‌شود |
|---|---|
| ~__init__~ | ساخت شیء |
| ~__str__~ | ~print(obj)~ و ~str(obj)~ |
| ~__repr__~ | نمایش در کنسول و لیست‌ها |
| ~__len__~ | ~len(obj)~ |
| ~__eq__~ ، ~__lt__~ | ~==~ و ~<~ (مثلاً برای مرتب‌سازی) |
| ~__add__~ | ~a + b~ |

[[c:1]]

!scikit-learn دقیقاً همین ایده را دارد: همه مدل‌ها از کلاس‌های پایه ارث می‌برند و متدهای یکسان ~fit~ و ~predict~ دارند. برای همین می‌توانی مدل‌ها را راحت عوض کنی.`],
  en: ["Inheritance and special methods", R`## Inheritance
A **child** class inherits every attribute and method of its **parent**, and can **override** a method or add new ones. ~super()~ calls the parent's method.

| Concept | Example |
|---|---|
| Parent | ~class Animal:~ |
| Child | ~class Dog(Animal):~ |
| Override | ~Dog~ has its own ~speak~ |
| ~super().__init__(...)~ | Run the parent's constructor |
| ~isinstance(d, Animal)~ | True; a dog is an animal |

[[c:0]]

## Special (dunder) methods
Methods with double underscores that Python calls by itself in certain situations:

| Method | Called when |
|---|---|
| ~__init__~ | An object is created |
| ~__str__~ | ~print(obj)~ and ~str(obj)~ |
| ~__repr__~ | Shown in the console and inside lists |
| ~__len__~ | ~len(obj)~ |
| ~__eq__~ , ~__lt__~ | ~==~ and ~<~ (e.g. for sorting) |
| ~__add__~ | ~a + b~ |

[[c:1]]

!scikit-learn uses exactly this idea: every model inherits from base classes and has the same ~fit~ and ~predict~ methods. That is why swapping models is easy.`],
  code: [`class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "..."
    def introduce(self):
        return f"I am {self.name} and I say {self.speak()}"

class Dog(Animal):
    def speak(self):
        return "Woof"

class Cat(Animal):
    def __init__(self, name, indoor=True):
        super().__init__(name)
        self.indoor = indoor
    def speak(self):
        return "Meow"

for pet in [Dog("Rex"), Cat("Luna"), Animal("Generic")]:
    print(pet.introduce())
print(isinstance(Dog("x"), Animal), isinstance(Cat("y"), Dog))`,
`class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    def __mul__(self, k):
        return Vector(self.x * k, self.y * k)
    def __abs__(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

a, b = Vector(3, 4), Vector(1, 2)
print(a + b, a * 2, abs(a), a == Vector(3, 4))
print(sorted([a, b, Vector(0, 1)], key=abs))`],
  ex: [E("کلاس BankAccount با deposit و withdraw بساز؛ کلاس SavingsAccount از آن ارث ببرد و متد add_interest داشته باشد.", "Build BankAccount with deposit and withdraw; SavingsAccount inherits it and adds add_interest.",
    `class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner, self.balance = owner, balance\n    def deposit(self, x):\n        self.balance += x\n    def withdraw(self, x):\n        if x > self.balance:\n            raise ValueError("Not enough money")\n        self.balance -= x\n    def __str__(self):\n        return f"{self.owner}: {self.balance:,.0f}"\n\nclass SavingsAccount(BankAccount):\n    def __init__(self, owner, balance=0, rate=0.2):\n        super().__init__(owner, balance)\n        self.rate = rate\n    def add_interest(self):\n        self.deposit(self.balance * self.rate)\n\ns = SavingsAccount("Sara", 1000)\ns.add_interest(); s.withdraw(100)\nprint(s)`)],
  quiz: [Q("print(obj) کدام متد را صدا می‌زند؟", "Which method does print(obj) call?", ["__str__", "__init__", "__len__"], ["__str__", "__init__", "__len__"], 0)]
});

M("python", "science");

L({ id: "py-pandas-clean", after: "py-pandas",
  fa: ["Pandas: انتخاب و پاک‌سازی داده", R`## انتخاب سطر و ستون
| کد | نتیجه |
|---|---|
| ~df["city"]~ | یک ستون (Series) |
| ~df[["city", "sales"]]~ | چند ستون (DataFrame) |
| ~df.loc[2, "sales"]~ | با **برچسب** سطر و نام ستون |
| ~df.iloc[0:3, 1]~ | با **شماره** سطر و ستون |
| ~df[df.sales > 100]~ | فیلتر با شرط |
| ~df.query("sales > 100 and city == 'Tehran'")~ | فیلتر با متن |
| ~df.sort_values("sales", ascending=False)~ | مرتب‌سازی |

[[c:0]]

## مشکلات رایج داده و راه حل
| مشکل | تشخیص | راه حل |
|---|---|---|
| مقدار گمشده | ~df.isna().sum()~ | ~fillna~ (میانگین، میانه) یا ~dropna~ |
| سطر تکراری | ~df.duplicated().sum()~ | ~drop_duplicates()~ |
| نوع غلط ("12" به جای 12) | ~df.dtypes~ | ~pd.to_numeric(..., errors="coerce")~ |
| فاصله و حروف ناهمگون | ~df.city.unique()~ | ~str.strip().str.title()~ |
| تاریخ متنی | ~df.dtypes~ | ~pd.to_datetime~ |
| مقدار پرت | ~describe()~، نمودار جعبه‌ای | بررسی، حذف یا محدود کردن (~clip~) |

[[c:1]]

## ستون جدید
- محاسبه برداری: ~df["total"] = df.price * df.qty~
- شرطی: ~np.where(df.total > 100, "big", "small")~
- با تابع: ~df.name.apply(len)~
- دسته‌بندی عدد: ~pd.cut(df.age, bins=[0, 18, 40, 100])~

!هرگز روی سطرها با حلقه for کار نکن اگر عمل برداری وجود دارد؛ صدها برابر کندتر است.`],
  en: ["Pandas: selecting and cleaning data", R`## Selecting rows and columns
| Code | Result |
|---|---|
| ~df["city"]~ | One column (a Series) |
| ~df[["city", "sales"]]~ | Several columns (a DataFrame) |
| ~df.loc[2, "sales"]~ | By row **label** and column name |
| ~df.iloc[0:3, 1]~ | By row and column **position** |
| ~df[df.sales > 100]~ | Filter with a condition |
| ~df.query("sales > 100 and city == 'Tehran'")~ | Filter with text |
| ~df.sort_values("sales", ascending=False)~ | Sorting |

[[c:0]]

## Common data problems and fixes
| Problem | Detect | Fix |
|---|---|---|
| Missing values | ~df.isna().sum()~ | ~fillna~ (mean, median) or ~dropna~ |
| Duplicate rows | ~df.duplicated().sum()~ | ~drop_duplicates()~ |
| Wrong type ("12" instead of 12) | ~df.dtypes~ | ~pd.to_numeric(..., errors="coerce")~ |
| Spaces and mixed case | ~df.city.unique()~ | ~str.strip().str.title()~ |
| Dates stored as text | ~df.dtypes~ | ~pd.to_datetime~ |
| Outliers | ~describe()~, box plot | Inspect, drop or cap (~clip~) |

[[c:1]]

## New columns
- Vectorized: ~df["total"] = df.price * df.qty~
- Conditional: ~np.where(df.total > 100, "big", "small")~
- With a function: ~df.name.apply(len)~
- Binning numbers: ~pd.cut(df.age, bins=[0, 18, 40, 100])~

!Never loop over rows with for when a vectorized operation exists; it is hundreds of times slower.`],
  code: [`import pandas as pd

df = pd.DataFrame({
    "city": ["Tehran", "Shiraz", "Tehran", "Tabriz", "Shiraz", "Tehran"],
    "month": ["Jan", "Jan", "Feb", "Feb", "Mar", "Mar"],
    "sales": [120, 85, 140, 60, 95, 160],
})
print(df.loc[2, "sales"], "|", df.iloc[0, 0])
print(df[df.sales > 100])
print(df.query("city == 'Tehran' and sales >= 140"))
print(df.sort_values("sales", ascending=False).head(3))`,
`import numpy as np
import pandas as pd

raw = pd.DataFrame({
    "name": [" ali ", "Sara", "sara", "Reza", "Mina", "Reza"],
    "age": ["21", "19", "19", "abc", None, "abc"],
    "date": ["2024-01-05", "2024-02-11", "2024-02-11", "2024-03-01", "2024-03-09", "2024-03-01"],
    "income": [12, 15, 15, 400, 14, 400],
})
df = raw.copy()
df["name"] = df["name"].str.strip().str.title()
df["age"] = pd.to_numeric(df["age"], errors="coerce")
df["date"] = pd.to_datetime(df["date"])
df = df.drop_duplicates()
df["age"] = df["age"].fillna(df["age"].median())
df["income"] = df["income"].clip(upper=df["income"].quantile(0.75) * 3)
df["group"] = pd.cut(df["age"], bins=[0, 20, 30, 100], labels=["teen", "twenties", "older"])
print(df)
print(df.dtypes)`],
  ex: [E("در جدول بالا، ستون month_name را از ستون date بساز (df.date.dt.month_name()) و تعداد هر ماه را بشمار.", "In the table above, build month_name from the date column (df.date.dt.month_name()) and count each month.",
    `import pandas as pd\ndf = pd.DataFrame({"date": pd.to_datetime(["2024-01-05", "2024-02-11", "2024-03-01", "2024-03-09"])})\ndf["month_name"] = df.date.dt.month_name()\nprint(df.month_name.value_counts())`)],
  quiz: [Q("تفاوت loc و iloc؟", "The difference between loc and iloc?", ["loc با برچسب، iloc با شماره", "هیچ", "iloc فقط ستون"], ["loc by label, iloc by position", "None", "iloc only for columns"], 0)]
});

L({ id: "py-pandas-group", after: "py-pandas-clean",
  fa: ["Pandas: گروه‌بندی، ادغام و جدول محوری", R`## الگوی تقسیم، اعمال، ترکیب
~groupby~ داده را بر اساس یک ستون **تقسیم** می‌کند، روی هر گروه یک تابع **اعمال** می‌کند و نتیجه‌ها را **ترکیب** می‌کند.

| شهر | فروش‌ها | میانگین |
|---|---|---|
| Tehran | 120، 140، 160 | 140 |
| Shiraz | 85، 95 | 90 |
| Tabriz | 60 | 60 |

[[c:0]]

| تابع | کار |
|---|---|
| ~agg(["mean", "max"])~ | چند آماره هم‌زمان |
| ~agg(total=("sales", "sum"))~ | نام‌گذاری خروجی |
| ~transform("mean")~ | نتیجه هم‌اندازه داده اصلی (برای ستون جدید) |
| ~value_counts()~ | شمارش مقادیر |

## ادغام جدول‌ها
| ~how~ | نتیجه |
|---|---|
| ~inner~ | فقط کلیدهای مشترک |
| ~left~ | همه سطرهای جدول چپ |
| ~right~ | همه سطرهای جدول راست |
| ~outer~ | همه |

[[c:1]]

## جدول محوری و reshape
~pivot_table~ مثل Excel: سطرها یک ستون، ستون‌ها ستون دیگر، و خانه‌ها تجمیع. ~melt~ برعکس، جدول پهن را بلند می‌کند.

[[c:2]]`],
  en: ["Pandas: grouping, merging and pivot tables", R`## Split, apply, combine
~groupby~ **splits** the data by a column, **applies** a function to each group, and **combines** the results.

| City | Sales | Mean |
|---|---|---|
| Tehran | 120, 140, 160 | 140 |
| Shiraz | 85, 95 | 90 |
| Tabriz | 60 | 60 |

[[c:0]]

| Function | Does |
|---|---|
| ~agg(["mean", "max"])~ | Several statistics at once |
| ~agg(total=("sales", "sum"))~ | Named outputs |
| ~transform("mean")~ | A result the same size as the data (for a new column) |
| ~value_counts()~ | Count values |

## Merging tables
| ~how~ | Result |
|---|---|
| ~inner~ | Only shared keys |
| ~left~ | Every row of the left table |
| ~right~ | Every row of the right table |
| ~outer~ | Everything |

[[c:1]]

## Pivot tables and reshaping
~pivot_table~ works like Excel: rows from one column, columns from another, cells aggregated. ~melt~ does the reverse and turns a wide table into a long one.

[[c:2]]`],
  code: [`import pandas as pd

df = pd.DataFrame({
    "city": ["Tehran", "Shiraz", "Tehran", "Tabriz", "Shiraz", "Tehran"],
    "month": ["Jan", "Jan", "Feb", "Feb", "Mar", "Mar"],
    "sales": [120, 85, 140, 60, 95, 160],
})
print(df.groupby("city")["sales"].mean())
print(df.groupby("city").agg(total=("sales", "sum"), best=("sales", "max"), n=("sales", "count")))
df["share_of_city"] = (df.sales / df.groupby("city").sales.transform("sum")).round(2)
print(df)`,
`import pandas as pd

students = pd.DataFrame({"id": [1, 2, 3, 4], "name": ["Ali", "Sara", "Reza", "Mina"]})
grades = pd.DataFrame({"id": [1, 1, 2, 3, 5], "course": ["AI", "Math", "AI", "AI", "Math"], "mark": [18, 15, 20, 12, 17]})
for how in ["inner", "left", "outer"]:
    m = pd.merge(students, grades, on="id", how=how)
    print(how, "->", len(m), "rows")
print(pd.merge(students, grades, on="id", how="left"))`,
`import pandas as pd

df = pd.DataFrame({
    "city": ["Tehran", "Shiraz", "Tehran", "Tabriz", "Shiraz", "Tehran"],
    "month": ["Jan", "Jan", "Feb", "Feb", "Mar", "Mar"],
    "sales": [120, 85, 140, 60, 95, 160],
})
wide = df.pivot_table(index="city", columns="month", values="sales", aggfunc="sum", fill_value=0)
print(wide)
long = wide.reset_index().melt(id_vars="city", value_name="sales")
print(long.head())`],
  ex: [E("برای هر درس در جدول grades، میانگین و تعداد نمره را حساب کن و دانشجویی که در هیچ درسی نمره ندارد را پیدا کن.", "For each course in grades, compute the mean mark and count; then find the student with no grades.",
    `import pandas as pd\nstudents = pd.DataFrame({"id": [1, 2, 3, 4], "name": ["Ali", "Sara", "Reza", "Mina"]})\ngrades = pd.DataFrame({"id": [1, 1, 2, 3, 5], "course": ["AI", "Math", "AI", "AI", "Math"], "mark": [18, 15, 20, 12, 17]})\nprint(grades.groupby("course").mark.agg(["mean", "count"]))\nm = pd.merge(students, grades, on="id", how="left")\nprint(m[m.mark.isna()].name.tolist())`)],
  quiz: [Q("merge با how=\"left\" چه سطرهایی نگه می‌دارد؟", "Which rows does merge with how=\"left\" keep?", ["همه سطرهای جدول چپ", "فقط مشترک‌ها", "همه سطرهای هر دو"], ["All rows of the left table", "Only shared ones", "All rows of both"], 0)]
});

L({ id: "py-seaborn", after: "py-matplotlib",
  fa: ["نمودارهای آماری با seaborn", R`## seaborn چیست؟
seaborn روی matplotlib ساخته شده و با **یک خط** نمودارهای آماری زیبا از DataFrame می‌سازد. در این سایت با ~%pip install seaborn~ نصب می‌شود (در Colab از قبل نصب است).

## کدام نمودار؟
| سؤال | نمودار | تابع |
|---|---|---|
| توزیع یک متغیر عددی | هیستوگرام، KDE | ~histplot~، ~kdeplot~ |
| مقایسه توزیع بین گروه‌ها | جعبه‌ای، ویولن | ~boxplot~، ~violinplot~ |
| رابطه دو متغیر عددی | پراکندگی، خط رگرسیون | ~scatterplot~، ~regplot~ |
| میانگین در گروه‌ها | میله‌ای با بازه اطمینان | ~barplot~ |
| شمارش دسته‌ها | میله‌ای شمارش | ~countplot~ |
| همبستگی همه ستون‌ها | نقشه حرارتی | ~heatmap~ |
| همه جفت‌ها | ماتریس پراکندگی | ~pairplot~ |

[[c:0]]

## خواندن نمودار جعبه‌ای
| بخش | معنی |
|---|---|
| خط وسط | میانه |
| لبه‌های جعبه | چارک اول و سوم (۵۰٪ وسط داده) |
| سبیل‌ها | تا ۱٫۵ برابر IQR |
| نقاط جدا | داده‌های پرت |

[[c:1]]

!بیشتر توابع seaborn پارامتر ~hue~ دارند: یک ستون دسته‌ای را با رنگ نشان می‌دهند.`],
  en: ["Statistical plots with seaborn", R`## What is seaborn?
seaborn is built on matplotlib and makes good-looking statistical plots from a DataFrame in **one line**. On this site you install it with ~%pip install seaborn~ (Colab has it already).

## Which plot?
| Question | Plot | Function |
|---|---|---|
| Distribution of one numeric variable | Histogram, KDE | ~histplot~, ~kdeplot~ |
| Compare distributions between groups | Box, violin | ~boxplot~, ~violinplot~ |
| Relation of two numeric variables | Scatter, regression line | ~scatterplot~, ~regplot~ |
| Mean per group | Bars with a confidence interval | ~barplot~ |
| Counting categories | Count bars | ~countplot~ |
| Correlation of all columns | Heat map | ~heatmap~ |
| Every pair | Scatter matrix | ~pairplot~ |

[[c:0]]

## Reading a box plot
| Part | Meaning |
|---|---|
| Middle line | Median |
| Box edges | First and third quartiles (the middle 50%) |
| Whiskers | Up to 1.5 × IQR |
| Separate dots | Outliers |

[[c:1]]

!Most seaborn functions have a ~hue~ parameter that shows a category column with color.`],
  code: [`%pip install seaborn
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_iris

iris = load_iris(as_frame=True)
df = iris.frame
df["species"] = df.target.map(dict(enumerate(iris.target_names)))

fig, ax = plt.subplots(1, 3, figsize=(14, 4))
sns.histplot(data=df, x="petal length (cm)", hue="species", ax=ax[0])
sns.boxplot(data=df, x="species", y="sepal width (cm)", ax=ax[1])
sns.scatterplot(data=df, x="petal length (cm)", y="petal width (cm)", hue="species", ax=ax[2])
plt.tight_layout(); plt.show()`,
`%pip install seaborn
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_diabetes

df = load_diabetes(as_frame=True).frame
plt.figure(figsize=(8, 6))
sns.heatmap(df.corr(), annot=True, fmt=".1f", cmap="coolwarm", center=0)
plt.title("Correlation of the diabetes features and the target")
plt.show()`],
  quiz: [Q("خط وسط نمودار جعبه‌ای چیست؟", "What is the middle line of a box plot?", ["میانه", "میانگین", "بیشینه"], ["The median", "The mean", "The maximum"], 0)]
});
FinishCourse();
