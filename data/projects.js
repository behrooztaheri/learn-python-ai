/* One project at the end of every section. Each has an exercise with a full worked solution. */
function P(track, mod, id, faT, enT, faText, enText, starter, solution) {
  M(track, mod);
  L({ id: id, project: true, fa: [faT, faText], en: [enT, enText], code: starter ? [starter] : [], ex: [E("راه‌حل کامل را اجرا و با کد خودت مقایسه کن.", "Run the full solution and compare it with yours.", solution)] });
}

P("python", "start", "pp-start", "پروژه: آماده‌سازی محیط", "Project: set up your workspace",
R`هدف این است که یک پروژه واقعی روی کامپیوتر خودت بسازی.

- پوشه ~first_project~ را بساز و با VS Code باز کن.
- محیط مجازی بساز و فعال کن.
- ~numpy~ را نصب و ~requirements.txt~ را تولید کن.
- برنامه را به شکل فایل ~main.py~ اجرا کن.
- همان کد را در Colab هم اجرا کن.`,
R`Build a real project on your own computer.

- Create a ~first_project~ folder and open it in VS Code.
- Create and activate a virtual environment.
- Install ~numpy~ and generate ~requirements.txt~.
- Run the program as a file named ~main.py~.
- Run the same code in Colab too.`,
null, `import sys\nimport numpy as np\n\nprint("Python", sys.version.split()[0])\nprint("NumPy", np.__version__)\nprint("Mean:", np.mean([1, 2, 3]))`);

P("python", "basics", "pp-basics", "پروژه: بازی حدس عدد", "Project: number guessing",
R`برنامه‌ای بنویس که یک عدد مخفی داشته باشد، حدس‌ها را بررسی کند، «بزرگ‌تر» یا «کوچک‌تر» بگوید و تعداد تلاش را بشمارد. در این نسخه، حدس‌ها را به‌جای ورودی کاربر از یک راهبرد دودویی می‌گیریم.

**امتیاز اضافه:** حداکثر تعداد تلاش تعیین کن.`,
R`Write a program with a secret number that checks guesses, says "higher" or "lower", and counts attempts. In this version, the guesses come from a binary-search strategy instead of the user.

**Bonus:** set a maximum number of attempts.`,
`secret = 37\nlow, high = 1, 100\n# TODO: use a loop to guess the middle value and narrow the range`,
`secret = 37\nlow, high = 1, 100\nattempts = 0\nwhile True:\n    guess = (low + high) // 2\n    attempts += 1\n    if guess == secret:\n        print("Found", guess, "in", attempts, "attempts")\n        break\n    elif guess < secret:\n        print(guess, "higher")\n        low = guess + 1\n    else:\n        print(guess, "lower")\n        high = guess - 1`);

P("python", "structures", "pp-structures", "پروژه: تحلیل متن", "Project: text analyzer",
R`تعداد کل کلمات، کلمات یکتا و پنج کلمه پرتکرار یک متن را پیدا کن. علامت‌ها را حذف و حروف را کوچک کن.`,
R`Find the total words, the unique words, and the five most frequent words in a text. Remove punctuation and use lowercase.`,
`text = "Data is the new oil. Data needs cleaning, and clean data needs care."\n# TODO: clean, split, count`,
`text = "Data is the new oil. Data needs cleaning, and clean data needs care."\nfor ch in ".,":\n    text = text.replace(ch, "")\nwords = text.lower().split()\ncounts = {}\nfor w in words:\n    counts[w] = counts.get(w, 0) + 1\nprint(len(words), len(counts))\nprint(sorted(counts.items(), key=lambda kv: -kv[1])[:5])`);

P("python", "functions", "pp-functions", "پروژه: دفترچه دانشجو", "Project: student gradebook",
R`کلاس ~Gradebook~ بساز که نمره ثبت کند، میانگین بدهد، نمره نامعتبر را با خطا رد کند و داده را در فایل JSON ذخیره و بازیابی کند.`,
R`Build a ~Gradebook~ class that records grades, gives means, rejects invalid grades with an error, and saves to and loads from a JSON file.`,
`class Gradebook:\n    def __init__(self):\n        self.data = {}\n    # TODO: add(name, grade), mean(name), save(path), load(path)`,
`import json\n\nclass Gradebook:\n    def __init__(self):\n        self.data = {}\n    def add(self, name, grade):\n        if not 0 <= grade <= 20:\n            raise ValueError("Grade must be between 0 and 20")\n        self.data.setdefault(name, []).append(grade)\n    def mean(self, name):\n        g = self.data[name]\n        return sum(g) / len(g)\n    def save(self, path):\n        with open(path, "w", encoding="utf-8") as f:\n            json.dump(self.data, f)\n    def load(self, path):\n        with open(path, encoding="utf-8") as f:\n            self.data = json.load(f)\n\nb = Gradebook()\nb.add("Sara", 18); b.add("Sara", 16)\nb.save("grades.json")\nc = Gradebook(); c.load("grades.json")\nprint(c.mean("Sara"))\ntry:\n    b.add("Ali", 25)\nexcept ValueError as e:\n    print(e)`);

P("ai", "found", "ap-found", "پروژه: پیش‌پردازش و خط پایه", "Project: preprocessing and a baseline",
R`روی داده Wine یک مدل مبنا بساز و با مدل دارای مقیاس‌بندی مقایسه کن.

- داده را طبقه‌ای تقسیم کن.
- ~DummyClassifier~ را مبنا بگیر.
- یک ~Pipeline~ با مقیاس‌بندی بساز.
- با اعتبارسنجی متقابل و ماتریس درهم‌ریختگی گزارش بده.`,
R`On the Wine data, build a baseline and compare it with a scaled model.

- Split with stratification.
- Use ~DummyClassifier~ as the baseline.
- Build a ~Pipeline~ with scaling.
- Report cross-validation and a confusion matrix.`,
`from sklearn.datasets import load_wine\nX, y = load_wine(return_X_y=True)\n# TODO: split, baseline, pipeline, report`,
`from sklearn.datasets import load_wine\nfrom sklearn.dummy import DummyClassifier\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import confusion_matrix\nfrom sklearn.model_selection import cross_val_score, train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\n\nX, y = load_wine(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=0)\nbase = DummyClassifier(strategy="most_frequent").fit(X_tr, y_tr)\nmodel = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))\nprint("baseline", round(base.score(X_te, y_te), 3))\nprint("CV", round(cross_val_score(model, X_tr, y_tr, cv=5).mean(), 3))\nmodel.fit(X_tr, y_tr)\nprint("test", round(model.score(X_te, y_te), 3))\nprint(confusion_matrix(y_te, model.predict(X_te)))`);

P("ai", "regression", "ap-regression", "پروژه: مقایسه رگرسیون‌ها", "Project: comparing regressors",
R`روی داده Diabetes چند مدل را با اعتبارسنجی پنج‌بخشی مقایسه کن و مدل برتر را روی داده آزمون بسنج. نمودار پیش‌بینی در برابر واقعی رسم کن.`,
R`On the Diabetes data, compare several models with 5-fold validation and test the best one. Plot predictions against actual values.`,
null, `import matplotlib.pyplot as plt\nfrom sklearn.datasets import load_diabetes\nfrom sklearn.ensemble import RandomForestRegressor\nfrom sklearn.linear_model import LassoCV, LinearRegression, RidgeCV\nfrom sklearn.metrics import r2_score\nfrom sklearn.model_selection import cross_val_score, train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\n\nX, y = load_diabetes(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=1)\nmodels = {"Linear": LinearRegression(), "Ridge": make_pipeline(StandardScaler(), RidgeCV()), "Lasso": make_pipeline(StandardScaler(), LassoCV(cv=5)), "Forest": RandomForestRegressor(200, min_samples_leaf=3, random_state=0)}\nscores = {n: cross_val_score(m, X_tr, y_tr, cv=5, scoring="r2").mean() for n, m in models.items()}\nprint({k: round(v, 3) for k, v in scores.items()})\nbest = max(scores, key=scores.get)\np = models[best].fit(X_tr, y_tr).predict(X_te)\nprint(best, "test R2:", round(r2_score(y_te, p), 3))\nplt.scatter(y_te, p, s=15, color="#5b34c4")\nplt.plot([y.min(), y.max()], [y.min(), y.max()], "--", color="#e8590c")\nplt.xlabel("Actual"); plt.ylabel("Predicted")\nplt.show()`);

P("ai", "classification", "ap-classification", "پروژه: غربال و انتخاب آستانه", "Project: screening and thresholds",
R`روی داده Breast Cancer در این داده کلاس ۰ بدخیم است. آن را کلاس مثبت بگیر، مدل بساز و آستانه‌ای پیدا کن که Recall حداقل ۰٫۹۵ باشد و Precision بیشینه شود.`,
R`In the Breast Cancer data, class 0 is malignant. Treat it as positive, build a model, and find a threshold with Recall of at least 0.95 and the best Precision.`,
null, `import numpy as np\nfrom sklearn.datasets import load_breast_cancer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import confusion_matrix, precision_recall_curve\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\n\nX, y = load_breast_cancer(return_X_y=True)\ny = 1 - y                     # now 1 means malignant\nX_a, X_te, y_a, y_te = train_test_split(X, y, test_size=0.3, stratify=y, random_state=0)\nX_tr, X_v, y_tr, y_v = train_test_split(X_a, y_a, test_size=0.3, stratify=y_a, random_state=0)\nm = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)).fit(X_tr, y_tr)\npr, re, th = precision_recall_curve(y_v, m.predict_proba(X_v)[:, 1])\nok = np.where(re[:-1] >= 0.95)[0]\nt = th[ok[pr[ok].argmax()]]\nprint("threshold:", round(float(t), 3))\nprint(confusion_matrix(y_te, m.predict_proba(X_te)[:, 1] >= t, labels=[1, 0]))`);

P("ai", "unsupervised", "ap-unsupervised", "پروژه: کشف گروه‌های پنهان", "Project: discovering hidden groups",
R`داده Wine را بدون برچسب خوشه‌بندی کن: بعد را با PCA کم کن، بهترین k را با Silhouette انتخاب کن و در پایان خوشه‌ها را با برچسب‌های واقعی مقایسه کن.`,
R`Cluster the Wine data without labels: reduce dimensions with PCA, choose k by silhouette, and finally compare clusters to the true labels.`,
null, `from sklearn.cluster import KMeans\nfrom sklearn.datasets import load_wine\nfrom sklearn.decomposition import PCA\nfrom sklearn.metrics import adjusted_rand_score, silhouette_score\nfrom sklearn.preprocessing import StandardScaler\n\nd = load_wine()\nZ = PCA(n_components=0.85).fit_transform(StandardScaler().fit_transform(d.data))\nprint("components:", Z.shape[1])\nscores = {k: silhouette_score(Z, KMeans(k, n_init=10, random_state=0).fit_predict(Z)) for k in range(2, 8)}\nprint({k: round(v, 3) for k, v in scores.items()})\nbest = max(scores, key=scores.get)\nlabels = KMeans(best, n_init=10, random_state=0).fit_predict(Z)\nprint("k =", best, "ARI =", round(adjusted_rand_score(d.target, labels), 3))`);

P("ai", "deep", "ap-deep", "پروژه: تشخیص رقم با شبکه عصبی", "Project: digit recognition with a network",
R`با ~MLPClassifier~ یک شبکه برای داده Digits بساز، اندازه لایه را با اعتبارسنجی انتخاب کن، دقت آزمون را گزارش بده و نمونه‌های اشتباه را ببین. نسخه پیشرفته: همین کار را با PyTorch در Colab انجام بده.`,
R`Build a network for the Digits data with ~MLPClassifier~, choose the layer size by validation, report test accuracy, and view mistakes. Advanced: repeat it with PyTorch in Colab.`,
null, `import matplotlib.pyplot as plt\nimport numpy as np\nfrom sklearn.datasets import load_digits\nfrom sklearn.model_selection import GridSearchCV, train_test_split\nfrom sklearn.neural_network import MLPClassifier\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\n\nX, y = load_digits(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=0)\ng = GridSearchCV(make_pipeline(StandardScaler(), MLPClassifier(max_iter=80, random_state=0)), {"mlpclassifier__hidden_layer_sizes": [(16,), (64,)]}, cv=3).fit(X_tr, y_tr)\nprint(g.best_params_, "test:", round(g.score(X_te, y_te), 3))\nwrong = np.where(g.predict(X_te) != y_te)[0][:8]\nfig, ax = plt.subplots(1, len(wrong), figsize=(9, 1.6))\nfor a, i in zip(ax, wrong):\n    a.imshow(X_te[i].reshape(8, 8), cmap="Purples"); a.axis("off")\nplt.show()`);

P("ai", "fuzzy", "ap-fuzzy", "پروژه: انعام رستوران با منطق فازی", "Project: a fuzzy tipping system",
R`سیستمی بساز که از کیفیت غذا و خدمات (۰ تا ۱۰)، درصد انعام را پیش‌بینی کند. سه قاعده بنویس و سطح خروجی را رسم کن.`,
R`Build a system that predicts a tip percentage from food and service quality (0 to 10). Write three rules and plot the output surface.`,
null, `import matplotlib.pyplot as plt\nimport numpy as np\n\ndef tri(x, a, b, c):\n    return np.maximum(np.minimum((x - a) / (b - a + 1e-9), (c - x) / (c - b + 1e-9)), 0)\n\nz = np.linspace(0, 30, 301)\nlow, med, high = tri(z, -1, 0, 13), tri(z, 0, 13, 25), tri(z, 13, 25, 31)\n\ndef tip(food, service):\n    poor = max(tri(food, -1, 0, 5), tri(service, -1, 0, 5))\n    ok = tri(service, 0, 5, 10)\n    great = max(tri(food, 5, 10, 11), tri(service, 5, 10, 11))\n    a = np.maximum.reduce([np.minimum(poor, low), np.minimum(ok, med), np.minimum(great, high)])\n    return float((z * a).sum() / a.sum())\n\nprint(round(tip(6.5, 9.8), 2))\ng = np.linspace(0, 10, 25)\nS = np.array([[tip(a, b) for a in g] for b in g])\nplt.imshow(S, origin="lower", extent=[0, 10, 0, 10], cmap="plasma")\nplt.colorbar(label="Tip %")\nplt.xlabel("Food"); plt.ylabel("Service")\nplt.show()`);

P("ai", "optimization", "ap-opt", "پروژه: مسئله کوله‌پشتی با الگوریتم ژنتیک", "Project: knapsack with a genetic algorithm",
R`چند کالا با وزن و ارزش داریم و ظرفیت محدود است. با الگوریتم ژنتیک بهترین مجموعه را پیدا کن و با جواب برنامه‌ریزی پویا مقایسه کن.`,
R`Items have weights and values, and capacity is limited. Find the best set with a genetic algorithm and compare with the exact dynamic-programming answer.`,
null, `import numpy as np\n\nrng = np.random.default_rng(0)\nw = rng.integers(5, 40, 25)\nv = rng.integers(10, 100, 25)\nC = int(w.sum() * 0.4)\n\ndef fit(pop):\n    tw, tv = pop @ w, pop @ v\n    return np.where(tw <= C, tv, 0)\n\npop = (rng.random((100, 25)) < 0.3).astype(int)\nfor g in range(300):\n    f = fit(pop)\n    elite = pop[f.argmax()].copy()\n    a, b = rng.integers(0, 100, (2, 100))\n    parents = pop[np.where(f[a] > f[b], a, b)]\n    mask = rng.random(parents.shape) < 0.5\n    child = np.where(mask, parents, parents[::-1])\n    flip = rng.random(child.shape) < 0.02\n    pop = np.where(flip, 1 - child, child)\n    pop[0] = elite\nga = int(fit(pop).max())\n\nbest = [0] * (C + 1)\nfor i in range(25):\n    for c in range(C, int(w[i]) - 1, -1):\n        best[c] = max(best[c], best[c - int(w[i])] + int(v[i]))\nprint("GA:", ga, "exact:", best[C])`);

P("ai", "games", "ap-games", "پروژه: تورنمنت راهبردها", "Project: strategy tournament",
R`یک راهبرد برای معمای زندانی تکراری بنویس و در تورنمنت با راهبردهای دیگر شرکت بده. راهبرد ~pavlov~ اگر نتیجه دور قبل خوب بود حرکتش را تکرار می‌کند و در غیر این صورت تغییر می‌دهد.`,
R`Write a strategy for the repeated prisoner's dilemma and enter it into a tournament. A ~pavlov~ strategy repeats its move if the last round went well, otherwise it switches.`,
null, `PAY = {("C", "C"): 3, ("C", "D"): 0, ("D", "C"): 5, ("D", "D"): 1}\n\ndef always_c(me, you): return "C"\ndef always_d(me, you): return "D"\ndef tit_for_tat(me, you): return you[-1] if you else "C"\ndef pavlov(me, you):\n    if not me:\n        return "C"\n    if PAY[(me[-1], you[-1])] >= 3:\n        return me[-1]\n    return "D" if me[-1] == "C" else "C"\n\ndef play(f, g, n=200):\n    a, b, s = [], [], 0\n    for _ in range(n):\n        x, y = f(a, b), g(b, a)\n        a.append(x); b.append(y); s += PAY[(x, y)]\n    return s\n\nP = [always_c, always_d, tit_for_tat, pavlov]\nprint(sorted(((sum(play(p, q) for q in P), p.__name__) for p in P), reverse=True))`);

FinishCourse();
