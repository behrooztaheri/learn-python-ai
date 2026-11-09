X("py-vars", {
  fa: R`## قواعد نام‌گذاری
| درست | نادرست | دلیل |
|---|---|---|
| ~total_price~ | ~total price~ | فاصله مجاز نیست |
| ~score2~ | ~2score~ | با عدد شروع نمی‌شود |
| ~_count~ | ~class~ | کلمه رزرو‌شده پایتون است |

قرارداد رایج پایتون برای نام متغیر، حروف کوچک همراه با خط زیر (~snake_case~) است.

## متغیر، برچسب است
در پایتون متغیر جعبه نیست؛ برچسبی است که به یک شیء اشاره می‌کند. با دستور زیر مقدار کپی نمی‌شود و دو نام به یک لیست اشاره می‌کنند.

[[c:0]]

## جدول تبدیل نوع
| ورودی | تبدیل | نتیجه |
|---|---|---|
| ~"3.5"~ | ~float~ | ~3.5~ |
| ~3.9~ | ~int~ | ~3~ (بخش اعشاری حذف می‌شود) |
| ~0~ | ~bool~ | ~False~ |
| ~"abc"~ | ~int~ | خطای ~ValueError~ |`,
  en: R`## Naming rules
| Valid | Invalid | Why |
|---|---|---|
| ~total_price~ | ~total price~ | Spaces are not allowed |
| ~score2~ | ~2score~ | Cannot begin with a digit |
| ~_count~ | ~class~ | A reserved Python word |

The usual Python convention is lowercase with underscores (~snake_case~).

## A variable is a label
In Python a variable is not a box. It is a label pointing to an object. The statement below does not copy anything; two names point to one list.

[[c:0]]

## Conversion table
| Input | Conversion | Result |
|---|---|---|
| ~"3.5"~ | ~float~ | ~3.5~ |
| ~3.9~ | ~int~ | ~3~ (the decimal part is dropped) |
| ~0~ | ~bool~ | ~False~ |
| ~"abc"~ | ~int~ | ~ValueError~ |`,
  code: [`a = [1, 2]\nb = a\nb.append(3)\nprint(a, a is b)\n\nc = a.copy()\nc.append(4)\nprint(a, c, a is c)`],
  ex: [E("برنامه‌ای بنویس که دمای سلسیوس را به فارنهایت تبدیل کند.", "Write code that converts Celsius to Fahrenheit.", `c = 25\nf = c * 9 / 5 + 32\nprint(f)`, "فرمول: F = C × 9/5 + 32", "Formula: F = C × 9/5 + 32")]
});

X("py-numbers-strings", {
  fa: R`## متدهای پرکاربرد رشته
| متد | کار | مثال | نتیجه |
|---|---|---|---|
| ~strip~ | حذف فاصله دو سر | ~" a ".strip()~ | ~"a"~ |
| ~lower~ | حروف کوچک | ~"Ab".lower()~ | ~"ab"~ |
| ~split~ | شکستن به لیست | ~"a,b".split(",")~ | ~["a","b"]~ |
| ~join~ | چسباندن لیست | ~"-".join(["a","b"])~ | ~"a-b"~ |
| ~replace~ | جایگزینی | ~"cat".replace("c","b")~ | ~"bat"~ |
| ~find~ | محل زیررشته | ~"data".find("t")~ | ~2~ |

## اولویت عملگرها
به‌ترتیب: پرانتز، توان، ضرب و تقسیم، جمع و تفریق. وقتی تردید داری پرانتز بگذار.

!اعداد اعشاری در دودویی دقیق ذخیره نمی‌شوند. برای مقایسه از ~math.isclose~ استفاده کن.

[[c:0]]`,
  en: R`## Useful string methods
| Method | Purpose | Example | Result |
|---|---|---|---|
| ~strip~ | Trim spaces | ~" a ".strip()~ | ~"a"~ |
| ~lower~ | Lowercase | ~"Ab".lower()~ | ~"ab"~ |
| ~split~ | Break into a list | ~"a,b".split(",")~ | ~["a","b"]~ |
| ~join~ | Glue a list | ~"-".join(["a","b"])~ | ~"a-b"~ |
| ~replace~ | Replace text | ~"cat".replace("c","b")~ | ~"bat"~ |
| ~find~ | Locate text | ~"data".find("t")~ | ~2~ |

## Operator precedence
In order: parentheses, power, multiply and divide, add and subtract. When unsure, add parentheses.

!Decimal numbers are not stored exactly in binary. Compare them with ~math.isclose~.

[[c:0]]`,
  code: [`import math\n\nprint(0.1 + 0.2 == 0.3, 0.1 + 0.2)\nprint(math.isclose(0.1 + 0.2, 0.3))\nprint(2 + 3 * 4, (2 + 3) * 4, 2 ** 3 ** 2)\nprint("-".join(["a", "b", "c"]), "  hi ".strip())`],
  ex: [E("تعداد حروف صدادار (a,e,i,o,u) متن ~\"machine learning\"~ را بشمار.", "Count the vowels in ~\"machine learning\"~.", `text = "machine learning"\nprint(sum(ch in "aeiou" for ch in text))`, "جواب ۶ است.", "The answer is 6.")]
});

X("py-if", {
  fa: R`## جدول درستی
| A | B | A and B | A or B | not A |
|---|---|---|---|---|
| True | True | True | True | False |
| True | False | False | True | False |
| False | True | False | True | True |
| False | False | False | False | True |

## مقدارهای معادل نادرست
~0~، ~""~، ~[]~، ~{}~ و ~None~ در شرط نادرست حساب می‌شوند. پس ~if items:~ یعنی «اگر لیست خالی نیست».

## شرط یک‌خطی
[[c:0]]`,
  en: R`## Truth table
| A | B | A and B | A or B | not A |
|---|---|---|---|---|
| True | True | True | True | False |
| True | False | False | True | False |
| False | True | False | True | True |
| False | False | False | False | True |

## Falsy values
~0~, ~""~, ~[]~, ~{}~ and ~None~ count as false. So ~if items:~ means "if the list is not empty".

## One-line condition
[[c:0]]`,
  code: [`items = []\nprint("has items" if items else "empty")\n\nage = 20\nlabel = "adult" if age >= 18 else "minor"\nprint(label)\n\nname = ""\nprint(name or "Anonymous")`],
  ex: [E("سال کبیسه: عددی که بر ۴ بخش‌پذیر باشد، ولی اگر بر ۱۰۰ بخش‌پذیر است باید بر ۴۰۰ هم بخش‌پذیر باشد. تابعی برای آن بنویس.", "Leap year: divisible by 4, but if divisible by 100 it must also be divisible by 400. Write a function.", `def is_leap(y):\n    return y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)\n\nprint([y for y in [1900, 2000, 2024, 2026] if is_leap(y)])`)]
});

X("py-loops", {
  fa: R`## الگوهای پرکاربرد
| الگو | کد | کاربرد |
|---|---|---|
| شمارش | ~for i in range(n)~ | تکرار n بار |
| با شماره | ~enumerate(items)~ | شماره و مقدار |
| دو لیست با هم | ~zip(a, b)~ | پیمایش موازی |
| معکوس | ~reversed(items)~ | از انتها |

## ردگیری یک حلقه
برای فهمیدن حلقه، مقدارها را دور به دور بنویس. در محاسبه ~total += n~ برای اعداد ۱ تا ۴:

| دور | n | total بعد از اجرا |
|---|---|---|
| ۱ | 1 | 1 |
| ۲ | 2 | 3 |
| ۳ | 3 | 6 |
| ۴ | 4 | 10 |

[[c:0]]`,
  en: R`## Common patterns
| Pattern | Code | Use |
|---|---|---|
| Counting | ~for i in range(n)~ | Repeat n times |
| With position | ~enumerate(items)~ | Position and value |
| Two lists | ~zip(a, b)~ | Walk in parallel |
| Reverse | ~reversed(items)~ | From the end |

## Tracing a loop
To understand a loop, write the values round by round. For ~total += n~ over 1 to 4:

| Round | n | total after |
|---|---|---|
| 1 | 1 | 1 |
| 2 | 2 | 3 |
| 3 | 3 | 6 |
| 4 | 4 | 10 |

[[c:0]]`,
  code: [`names = ["Ali", "Sara"]\nscores = [17, 19]\nfor n, s in zip(names, scores):\n    print(n, s)\n\nfor row in range(1, 4):\n    print(" ".join(str(row * col) for col in range(1, 4)))\n\nfor n in range(2, 12):\n    if all(n % d for d in range(2, n)):\n        print(n, end=" ")`],
  ex: [E("میانگین یک لیست را بدون ~sum~ و ~len~ حساب کن.", "Compute a list's mean without ~sum~ or ~len~.", `nums = [4, 8, 15, 16]\ntotal = 0\ncount = 0\nfor n in nums:\n    total += n\n    count += 1\nprint(total / count)`), E("بزرگ‌ترین عدد لیست را با حلقه پیدا کن.", "Find the largest number with a loop.", `nums = [3, 9, 2, 7]\nbest = nums[0]\nfor n in nums[1:]:\n    if n > best:\n        best = n\nprint(best)`)]
});

X("py-lists", {
  fa: R`## متدهای لیست
| متد | کار | لیست را تغییر می‌دهد؟ |
|---|---|---|
| ~append(x)~ | افزودن به انتها | بله |
| ~insert(i, x)~ | افزودن در محل i | بله |
| ~pop(i)~ | حذف و برگرداندن | بله |
| ~sort()~ | مرتب‌سازی | بله |
| ~sorted(lst)~ | لیست مرتب جدید | خیر |
| ~count(x)~ | شمارش | خیر |

!خطای رایج: تغییر لیست هنگام پیمایش همان لیست. روی کپی پیمایش کن یا لیست جدید بساز.

[[c:0]]`,
  en: R`## List methods
| Method | Purpose | Changes the list? |
|---|---|---|
| ~append(x)~ | Add at the end | Yes |
| ~insert(i, x)~ | Add at position i | Yes |
| ~pop(i)~ | Remove and return | Yes |
| ~sort()~ | Sort in place | Yes |
| ~sorted(lst)~ | New sorted list | No |
| ~count(x)~ | Count | No |

!A common mistake is changing a list while looping over it. Loop over a copy or build a new list.

[[c:0]]`,
  code: [`nums = [1, 2, 2, 3, 2]\n\nresult = [n for n in nums if n != 2]\nprint(result)\n\nmatrix = [[1, 2, 3], [4, 5, 6]]\nprint([row[1] for row in matrix])\nprint([x for row in matrix for x in row])`],
  ex: [E("از لیستی از اعداد، مربع عددهای زوج را بساز.", "From a list, build the squares of even numbers.", `nums = [1, 2, 3, 4, 5, 6]\nprint([n ** 2 for n in nums if n % 2 == 0])`)]
});

X("py-dicts", {
  fa: R`## کدام ساختار؟
| ساختار | ترتیب | تغییرپذیر | تکرار | مناسب برای |
|---|---|---|---|---|
| list | دارد | بله | مجاز | دنباله داده |
| tuple | دارد | خیر | مجاز | داده ثابت |
| set | ندارد | بله | مجاز نیست | یکتاسازی و عضویت |
| dict | ترتیب درج | بله | کلید یکتا | نگاشت کلید به مقدار |

## الگوی شمارش
[[c:0]]`,
  en: R`## Which structure?
| Structure | Ordered | Mutable | Duplicates | Good for |
|---|---|---|---|---|
| list | Yes | Yes | Allowed | Sequences |
| tuple | Yes | No | Allowed | Fixed data |
| set | No | Yes | Not allowed | Uniqueness and membership |
| dict | Insertion order | Yes | Unique keys | Key to value maps |

## Counting pattern
[[c:0]]`,
  code: [`text = "to be or not to be"\ncounts = {}\nfor w in text.split():\n    counts[w] = counts.get(w, 0) + 1\nprint(counts)\nprint(sorted(counts.items(), key=lambda kv: kv[1], reverse=True))\n\na, b = {1, 2, 3}, {2, 3, 4}\nprint(a & b, a | b, a - b)`],
  ex: [E("دیکشنری نمره‌ها را بر اساس نمره نزولی چاپ کن.", "Print a grades dictionary sorted by grade, high to low.", `g = {"Ali": 15, "Sara": 19, "Reza": 12}\nfor name, mark in sorted(g.items(), key=lambda kv: -kv[1]):\n    print(name, mark)`)]
});

X("py-functions", {
  fa: R`## اجزای تابع
| بخش | معنی |
|---|---|
| پارامتر | نام ورودی در تعریف تابع |
| آرگومان | مقدار واقعی هنگام فراخوانی |
| مقدار پیش‌فرض | اگر آرگومان داده نشود |
| ~*args~ | تعداد دلخواه ورودی موقعیتی |
| ~**kwargs~ | تعداد دلخواه ورودی نام‌دار |

## حوزه متغیر
متغیری که داخل تابع ساخته می‌شود بیرون آن وجود ندارد. داده را با پارامتر بگیر و با ~return~ برگردان.

!مقدار پیش‌فرض را لیست نگذار. به‌جای ~def f(a=[])~ از ~def f(a=None)~ استفاده کن.

[[c:0]]`,
  en: R`## Parts of a function
| Part | Meaning |
|---|---|
| Parameter | The input's name in the definition |
| Argument | The actual value when calling |
| Default value | Used if no argument is given |
| ~*args~ | Any number of positional inputs |
| ~**kwargs~ | Any number of named inputs |

## Variable scope
A variable created inside a function does not exist outside it. Take data as parameters and give it back with ~return~.

!Never use a list as a default. Write ~def f(a=None)~ instead of ~def f(a=[])~.

[[c:0]]`,
  code: [`def stats(*values, precision=2):\n    mean = sum(values) / len(values)\n    return round(mean, precision), max(values)\n\navg, top = stats(3, 7, 8, precision=1)\nprint(avg, top)\n\ndef describe(**info):\n    for k, v in info.items():\n        print(k, "->", v)\n\ndescribe(name="Ali", city="Rasht")`],
  ex: [E("تابعی بنویس که فاکتوریل n را برگرداند.", "Write a function returning n factorial.", `def factorial(n):\n    result = 1\n    for k in range(2, n + 1):\n        result *= k\n    return result\n\nprint(factorial(5))`)]
});

X("py-errors", {
  fa: R`## خطاهای رایج و درمان
| خطا | معنی | معمولاً |
|---|---|---|
| ~SyntaxError~ | جمله‌بندی نادرست | دونقطه یا پرانتز جا افتاده |
| ~IndentationError~ | تورفتگی نادرست | ترکیب نادرست فاصله‌ها |
| ~NameError~ | نام تعریف نشده | غلط تایپی |
| ~TypeError~ | نوع نامناسب | جمع متن و عدد |
| ~IndexError~ | شماره خارج از بازه | لیست کوتاه‌تر است |
| ~KeyError~ | کلید پیدا نشد | از ~get~ استفاده کن |
| ~FileNotFoundError~ | فایل نیست | مسیر نادرست |

## روش عیب‌یابی
- آخرین خط پیام را بخوان.
- شماره خطی را که از کد خودت است پیدا کن.
- مقدار متغیرها را با ~print~ یا Debugger ببین.
- مسئله را به کوچک‌ترین نمونه تکرارپذیر برسان.`,
  en: R`## Common errors and fixes
| Error | Meaning | Usually |
|---|---|---|
| ~SyntaxError~ | Invalid grammar | A missing colon or bracket |
| ~IndentationError~ | Bad indentation | Mixed spacing |
| ~NameError~ | Name not defined | A typo |
| ~TypeError~ | Wrong type | Adding text and a number |
| ~IndexError~ | Position out of range | The list is shorter |
| ~KeyError~ | Key not found | Use ~get~ |
| ~FileNotFoundError~ | File missing | A wrong path |

## Debugging routine
- Read the last line of the message.
- Find the line number that belongs to your code.
- Inspect variables with ~print~ or a debugger.
- Reduce the problem to the smallest example that fails.`,
  ex: [E("تابعی بنویس که لیست رشته‌ها را به عدد تبدیل کند و موارد نامعتبر را نادیده بگیرد.", "Write a function converting strings to numbers and skipping invalid ones.", `def to_numbers(items):\n    out = []\n    for s in items:\n        try:\n            out.append(float(s))\n        except ValueError:\n            pass\n    return out\n\nprint(to_numbers(["1", "x", "2.5"]))`)]
});

X("py-oop", {
  fa: R`## چهار ایده اصلی
| ایده | معنی |
|---|---|
| کپسوله‌سازی | داده و رفتار کنار هم |
| وراثت | کلاس فرزند از کلاس والد استفاده می‌کند |
| چندریختی | متد هم‌نام، رفتار متفاوت |
| انتزاع | کاربر فقط رابط را می‌بیند |

متد ~__str__~ مشخص می‌کند شیء هنگام چاپ چگونه نمایش داده شود.

[[c:0]]`,
  en: R`## Four main ideas
| Idea | Meaning |
|---|---|
| Encapsulation | Data and behavior together |
| Inheritance | A child class reuses a parent class |
| Polymorphism | Same method name, different behavior |
| Abstraction | Users see only the interface |

The ~__str__~ method controls how an object prints.

[[c:0]]`,
  code: [`class Shape:\n    def area(self):\n        raise NotImplementedError\n    def __str__(self):\n        return f"{type(self).__name__} area = {self.area():.2f}"\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n    def area(self):\n        return 3.14159 * self.r ** 2\n\nclass Square(Shape):\n    def __init__(self, a):\n        self.a = a\n    def area(self):\n        return self.a ** 2\n\nfor s in [Circle(1), Square(2)]:\n    print(s)`],
  ex: [E("کلاس ~Stack~ با متدهای ~push~ و ~pop~ بنویس.", "Write a ~Stack~ class with ~push~ and ~pop~.", `class Stack:\n    def __init__(self):\n        self.items = []\n    def push(self, x):\n        self.items.append(x)\n    def pop(self):\n        return self.items.pop()\n\ns = Stack()\ns.push(1); s.push(2)\nprint(s.pop(), s.items)`)]
});

X("py-numpy", {
  fa: R`## ساختن آرایه
| تابع | نتیجه |
|---|---|
| ~np.zeros((2,3))~ | ماتریس صفر |
| ~np.ones(4)~ | بردار یک |
| ~np.arange(0,10,2)~ | گام مشخص |
| ~np.linspace(0,1,5)~ | تعداد نقطه مشخص |
| ~np.eye(3)~ | ماتریس همانی |

## Broadcasting در عمل
آرایه‌ای با ابعاد ~(2,3)~ را می‌توان با آرایه ~(3,)~ جمع کرد، چون بعد آخر برابر است و سطر کوچک‌تر تکرار می‌شود.

[[c:0]]`,
  en: R`## Creating arrays
| Function | Result |
|---|---|
| ~np.zeros((2,3))~ | Zero matrix |
| ~np.ones(4)~ | Vector of ones |
| ~np.arange(0,10,2)~ | With a set step |
| ~np.linspace(0,1,5)~ | With a set count |
| ~np.eye(3)~ | Identity matrix |

## Broadcasting in action
A ~(2,3)~ array can be added to a ~(3,)~ array because the last dimensions match and the smaller row is repeated.

[[c:0]]`,
  code: [`import numpy as np\n\nA = np.array([[1, 2, 3], [4, 5, 6]])\nprint(A + np.array([10, 20, 30]))\nprint(A[:, 1], A[1, :], A[0, 2])\n\nB = np.array([[2, 1], [1, 3]])\nb = np.array([3, 5])\nprint("solve Bx=b:", np.linalg.solve(B, b))\nprint("inverse:\\n", np.linalg.inv(B).round(2))`],
  ex: [E("هر ستون ماتریس را نرمال کن: میانگین صفر و انحراف معیار یک.", "Standardize each matrix column to mean 0 and std 1.", `import numpy as np\nA = np.array([[1.0, 10], [2, 20], [3, 30]])\nZ = (A - A.mean(axis=0)) / A.std(axis=0)\nprint(Z.round(3))`)]
});

X("py-pandas", {
  fa: R`## عملیات کلیدی
| کار | کد |
|---|---|
| انتخاب ستون | ~df["a"]~ |
| فیلتر | ~df[df.a > 3]~ |
| ستون جدید | ~df["c"] = df.a * 2~ |
| مرتب‌سازی | ~df.sort_values("a")~ |
| گروه‌بندی | ~df.groupby("g").a.mean()~ |
| ادغام | ~pd.merge(a, b, on="id")~ |
| تابع روی ستون | ~df.a.apply(f)~ |

[[c:0]]`,
  en: R`## Key operations
| Task | Code |
|---|---|
| Select a column | ~df["a"]~ |
| Filter | ~df[df.a > 3]~ |
| New column | ~df["c"] = df.a * 2~ |
| Sort | ~df.sort_values("a")~ |
| Group | ~df.groupby("g").a.mean()~ |
| Merge | ~pd.merge(a, b, on="id")~ |
| Apply a function | ~df.a.apply(f)~ |

[[c:0]]`,
  code: [`import pandas as pd\n\nstudents = pd.DataFrame({"id": [1, 2, 3], "name": ["Ali", "Sara", "Reza"]})\ngrades = pd.DataFrame({"id": [1, 1, 2, 3], "course": ["AI", "Math", "AI", "AI"], "mark": [18, 15, 20, 12]})\n\ndf = pd.merge(students, grades, on="id")\nprint(df)\nprint(df.groupby("name")["mark"].agg(["mean", "max", "count"]))\nprint(df.pivot_table(index="name", columns="course", values="mark"))`],
  ex: [E("میانگین نمره هر درس را از جدول بالا حساب کن.", "Compute each course's mean mark from the table above.", `import pandas as pd\ng = pd.DataFrame({"course": ["AI", "Math", "AI", "AI"], "mark": [18, 15, 20, 12]})\nprint(g.groupby("course")["mark"].mean())`)]
});

X("py-matplotlib", {
  fa: R`## کدام نمودار؟
| هدف | نمودار | تابع |
|---|---|---|
| روند زمانی | خطی | ~plot~ |
| رابطه دو متغیر | پراکندگی | ~scatter~ |
| توزیع | هیستوگرام | ~hist~ |
| مقایسه گروه‌ها | میله‌ای | ~bar~ |
| داده پرت | جعبه‌ای | ~boxplot~ |
| شدت یک ماتریس | نقشه حرارتی | ~imshow~ |

ذخیره نمودار: ~plt.savefig("fig.png", dpi=200)~`,
  en: R`## Which plot?
| Goal | Plot | Function |
|---|---|---|
| Trend over time | Line | ~plot~ |
| Relation of two variables | Scatter | ~scatter~ |
| Distribution | Histogram | ~hist~ |
| Comparing groups | Bar | ~bar~ |
| Outliers | Box | ~boxplot~ |
| Matrix intensity | Heat map | ~imshow~ |

To save: ~plt.savefig("fig.png", dpi=200)~`,
  ex: [E("نمودار میله‌ای فروش چهار فصل را با عنوان و نام محور رسم کن.", "Draw a bar chart of four seasons' sales, with a title and axis labels.", `import matplotlib.pyplot as plt\nplt.bar(["Q1", "Q2", "Q3", "Q4"], [12, 18, 9, 15], color="#1f6f8b")\nplt.title("Sales")\nplt.xlabel("Quarter")\nplt.ylabel("Units")\nplt.show()`)]
});
