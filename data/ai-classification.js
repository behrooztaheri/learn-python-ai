// Classification, one lesson per model. Replaces the older combined lessons.
DROP("ai-logistic", "ai-knn", "ai-nb", "ai-trees", "ai-ensembles", "ai-svm");
M("ai", "classification");

L({ id: "ai-cls-what", before: "ap-classification",
  fa: ["طبقه‌بندی چیست؟", R`## ایده در یک نگاه
**طبقه‌بندی** یعنی پیش‌بینی یک **برچسب** از میان چند گزینه: اسپم یا عادی، بیمار یا سالم، گربه یا سگ یا پرنده.

| نوع | تعداد کلاس | مثال |
|---|---|---|
| دودویی | ۲ | تقلب در تراکنش بانکی: بله/خیر |
| چندکلاسه | بیش از ۲ | تشخیص رقم دست‌نویس ۰ تا ۹ |
| چندبرچسبی | چند برچسب هم‌زمان | موضوعات یک خبر: ورزش و اقتصاد |

## مرز تصمیم
مدل فضای ویژگی‌ها را به ناحیه‌هایی تقسیم می‌کند؛ هر ناحیه یک کلاس. خطی که ناحیه‌ها را جدا می‌کند **مرز تصمیم** است. هر مدل مرزی با شکل خاص خودش می‌سازد:

| مدل | شکل مرز |
|---|---|
| لجستیک، SVM خطی | خط راست (یا صفحه) |
| KNN | نامنظم و محلی |
| درخت | پله‌ای، موازی محورها |
| جنگل و بوستینگ | پله‌ای ولی نرم‌تر |
| SVM با کرنل | منحنی صاف |
| بیز ساده گاوسی | منحنی درجه دو |

[[fig:cls_compare.png|هفت طبقه‌بند روی سه داده؛ عدد گوشه، دقت آزمون است. هیچ مدلی روی همه داده‌ها بهترین نیست.]]

## احتمال، نه فقط برچسب
بیشتر مدل‌ها برای هر کلاس یک **احتمال** می‌دهند (~predict_proba~). برچسب با یک **آستانه** به دست می‌آید (پیش‌فرض ۰٫۵). در کاربردهای حساس (پزشکی، تقلب) آستانه را عوض می‌کنیم؛ درس‌های ماتریس درهم‌ریختگی و ROC را ببین.

## ارزیابی
دقت (Accuracy) ساده است ولی با داده **نامتوازن** فریبنده است: اگر ۹۹٪ تراکنش‌ها سالم باشند، مدلی که همیشه «سالم» می‌گوید ۹۹٪ دقت دارد ولی بی‌فایده است. برای همین از Precision، Recall، F1 و ماتریس درهم‌ریختگی استفاده می‌کنیم.

[[lab:cls_all]]

با آزمایشگاه بالا بازی کن: مدل و داده را عوض کن و شکل مرز تصمیم را ببین. در درس‌های بعد هر مدل را جداگانه و دقیق یاد می‌گیری.

[[c:0]]`],
  en: ["What is classification?", R`## The idea in one look
**Classification** means predicting a **label** from a few options: spam or normal, sick or healthy, cat or dog or bird.

| Kind | Number of classes | Example |
|---|---|---|
| Binary | 2 | Bank fraud: yes/no |
| Multi-class | More than 2 | Recognizing handwritten digits 0 to 9 |
| Multi-label | Several labels at once | Topics of a news story: sport and economy |

## The decision boundary
The model divides the feature space into regions, one per class. The line between regions is the **decision boundary**. Each model draws a boundary with its own shape:

| Model | Boundary shape |
|---|---|
| Logistic, linear SVM | Straight line (or plane) |
| KNN | Irregular and local |
| Tree | Steps parallel to the axes |
| Forest and boosting | Steps, but smoother |
| Kernel SVM | Smooth curve |
| Gaussian naive Bayes | Quadratic curve |

[[fig:cls_compare.png|Seven classifiers on three data sets; the number in the corner is the test accuracy. No model is best everywhere.]]

## Probabilities, not just labels
Most models give a **probability** for each class (~predict_proba~). The label comes from a **threshold** (0.5 by default). In sensitive uses (medicine, fraud) we move the threshold; see the confusion matrix and ROC lessons.

## Evaluation
Accuracy is simple but misleading on **imbalanced** data: if 99% of transactions are fine, a model that always says "fine" has 99% accuracy and is useless. That is why we use precision, recall, F1 and the confusion matrix.

[[lab:cls_all]]

Play with the lab: switch the model and the data and watch the boundary's shape. The next lessons explain each model separately and in detail.

[[c:0]]`],
  code: [`from sklearn.datasets import load_breast_cancer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, stratify=y, random_state=0)
model = make_pipeline(StandardScaler(), LogisticRegression()).fit(X_tr, y_tr)

print("Probabilities of the first 3 test samples:\\n", model.predict_proba(X_te[:3]).round(3))
pred = model.predict(X_te)
print("Accuracy:", round(accuracy_score(y_te, pred), 3))
print(confusion_matrix(y_te, pred))
print(classification_report(y_te, pred, target_names=["malignant", "benign"]))`],
  quiz: [Q("اگر ۹۵٪ داده یک کلاس باشد، دقت ۹۵٪:", "If 95% of the data is one class, 95% accuracy:", ["ممکن است بی‌ارزش باشد", "حتماً عالی است", "غیرممکن است"], ["May be worthless", "Is surely great", "Is impossible"], 0)]
});

L({ id: "ai-logistic", before: "ap-classification",
  fa: ["رگرسیون لجستیک", R`## ایده در یک نگاه
با وجود اسمش، رگرسیون لجستیک یک مدل **طبقه‌بندی** است. ابتدا مثل رگرسیون خطی یک امتیاز می‌سازد، بعد آن را با تابع **سیگموید** به احتمالی بین ۰ و ۱ تبدیل می‌کند:

$$z=b+w_1x_1+\dots+w_dx_d,\qquad p=\sigma(z)=\frac{1}{1+e^{-z}}$$

اگر $p\ge0.5$ (یعنی $z\ge0$)، کلاس ۱. پس مرز تصمیم $z=0$ است: یک **خط** (یا صفحه).

[[lab:sigmoid]]

| $z$ | $\sigma(z)$ |
|---|---|
| −4 | 0.018 |
| −1 | 0.269 |
| 0 | 0.5 |
| 1 | 0.731 |
| 4 | 0.982 |

## تفسیر ضرایب: نسبت شانس
$z$ لگاریتم **شانس** است: $z=\ln\frac{p}{1-p}$. اگر $w_j=0.7$ باشد، با یک واحد افزایش $x_j$، شانس $e^{0.7}\approx2$ برابر می‌شود.

## تابع هزینه: آنتروپی متقاطع
MSE برای احتمال مناسب نیست. از **لاگ‌لاس** استفاده می‌کنیم که پیش‌بینی مطمئن ولی غلط را به شدت جریمه می‌کند:

$$J=-\frac1n\sum_i\big[y_i\ln p_i+(1-y_i)\ln(1-p_i)\big]$$

[[fig:logit_loss.png|چپ: لاگ‌لاس؛ وقتی کلاس واقعی ۱ است و مدل می‌گوید p≈0، خطا بی‌نهایت می‌شود. راست: با ویژگی‌های چندجمله‌ای، مرز لجستیک منحنی می‌شود.]]

گرادیان این تابع ساده است: $\nabla_w J=\frac1n X^\top(p-y)$؛ با گرادیان کاهشی کمینه می‌شود.

## مثال عددی
$w=2$، $b=-3$. برای $x=2$: $z=1$ و $p=0.731$ ← کلاس ۱. اگر برچسب واقعی ۱ باشد، خطا $-\ln0.731=0.313$ است؛ اگر ۰ باشد، $-\ln0.269=1.313$.

[[c:0]]

## آزمایشگاه مرز تصمیم
با درجه ۱ مرز خط راست است. روی داده «دو هلال» درجه را ۳ کن. ~C~ عکس قدرت منظم‌سازی است: C کوچک یعنی منظم‌سازی قوی.

[[lab:cls_logistic]]

## چندکلاسه: Softmax
برای $K$ کلاس، برای هر کلاس یک امتیاز $z_k$ می‌سازیم و احتمال‌ها:

$$p_k=\frac{e^{z_k}}{\sum_j e^{z_j}}$$

| هایپرپارامتر | معنی |
|---|---|
| ~C~ | عکس منظم‌سازی (پیش‌فرض ۱)؛ کوچک‌تر = ساده‌تر |
| ~penalty~ | ~l2~ (پیش‌فرض)، ~l1~ (انتخاب ویژگی)، ~elasticnet~ |
| ~class_weight~ | ~balanced~ برای داده نامتوازن |
| ~max_iter~ | اگر هشدار همگرایی گرفتی زیادش کن |

[[c:1]]

| مزایا | معایب |
|---|---|
| احتمال خوش‌کالیبره | فقط مرز خطی (مگر ویژگی بسازی) |
| سریع و قابل تفسیر | به مقیاس‌بندی نیاز دارد |
| پایه عالی برای مقایسه | با ویژگی‌های همبسته ناپایدار |`],
  en: ["Logistic regression", R`## The idea in one look
Despite its name, logistic regression is a **classification** model. It first builds a score as linear regression does, then turns it into a probability between 0 and 1 with the **sigmoid** function:

$$z=b+w_1x_1+\dots+w_dx_d,\qquad p=\sigma(z)=\frac{1}{1+e^{-z}}$$

If $p\ge0.5$ (that is, $z\ge0$), predict class 1. So the decision boundary is $z=0$: a **line** (or plane).

[[lab:sigmoid]]

| $z$ | $\sigma(z)$ |
|---|---|
| −4 | 0.018 |
| −1 | 0.269 |
| 0 | 0.5 |
| 1 | 0.731 |
| 4 | 0.982 |

## Interpreting coefficients: odds ratios
$z$ is the log of the **odds**: $z=\ln\frac{p}{1-p}$. If $w_j=0.7$, one more unit of $x_j$ multiplies the odds by $e^{0.7}\approx2$.

## The cost: cross-entropy
MSE does not suit probabilities. We use **log loss**, which heavily punishes confident wrong predictions:

$$J=-\frac1n\sum_i\big[y_i\ln p_i+(1-y_i)\ln(1-p_i)\big]$$

[[fig:logit_loss.png|Left: log loss; when the true class is 1 and the model says p≈0, the error goes to infinity. Right: with polynomial features the logistic boundary becomes curved.]]

Its gradient is simple: $\nabla_w J=\frac1n X^\top(p-y)$, minimized by gradient descent.

## A worked example
$w=2$, $b=-3$. For $x=2$: $z=1$ and $p=0.731$ → class 1. If the true label is 1, the loss is $-\ln0.731=0.313$; if it is 0, the loss is $-\ln0.269=1.313$.

[[c:0]]

## Decision boundary lab
With degree 1 the boundary is straight. On the "two moons" data, set the degree to 3. ~C~ is the inverse of the regularization strength: small C means strong regularization.

[[lab:cls_logistic]]

## Multi-class: softmax
For $K$ classes, we build one score $z_k$ per class and the probabilities are:

$$p_k=\frac{e^{z_k}}{\sum_j e^{z_j}}$$

| Hyperparameter | Meaning |
|---|---|
| ~C~ | Inverse regularization (default 1); smaller = simpler |
| ~penalty~ | ~l2~ (default), ~l1~ (feature selection), ~elasticnet~ |
| ~class_weight~ | ~balanced~ for imbalanced data |
| ~max_iter~ | Raise it if you get a convergence warning |

[[c:1]]

| Pros | Cons |
|---|---|
| Well-calibrated probabilities | Only a linear boundary (unless you build features) |
| Fast and interpretable | Needs scaling |
| A great baseline | Unstable with correlated features |`],
  code: [`import numpy as np

# Logistic regression from scratch with gradient descent
rng = np.random.default_rng(0)
hours = rng.uniform(0, 10, 100)                       # study hours
passed = (hours + rng.normal(0, 1.5, 100) > 5).astype(int)

x = (hours - hours.mean()) / hours.std()              # scaling helps gradient descent
w, b, lr = 0.0, 0.0, 0.5
for step in range(500):
    p = 1 / (1 + np.exp(-(w * x + b)))
    w -= lr * np.mean((p - passed) * x)
    b -= lr * np.mean(p - passed)
loss = -np.mean(passed * np.log(p) + (1 - passed) * np.log(1 - p))
print(f"w = {w:.3f}, b = {b:.3f}, log loss = {loss:.3f}")
h = 6
print("P(pass | 6 hours) =", round(1 / (1 + np.exp(-(w * (h - hours.mean()) / hours.std() + b))), 3))
print("Odds multiply by", round(np.exp(w / hours.std()), 2), "for each extra hour")`,
`import numpy as np
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

iris = load_iris()
model = make_pipeline(StandardScaler(), LogisticRegression(C=1.0)).fit(iris.data, iris.target)
print("Accuracy (5-fold):", cross_val_score(model, iris.data, iris.target, cv=5).mean().round(3))
probs = model.predict_proba(iris.data[[0, 75, 140]])
for row, name in zip(probs.round(3), ["sample 0", "sample 75", "sample 140"]):
    print(name, dict(zip(iris.target_names, row)), "sum =", row.sum().round(3))`],
  ex: [E("احتمال و لاگ‌لاس مثال درس (w=2، b=-3، x=2) را با numpy حساب کن.", "Compute the probability and the log loss of the lesson's example (w=2, b=-3, x=2) with numpy.",
    `import numpy as np\nz = 2 * 2 - 3\np = 1 / (1 + np.exp(-z))\nprint(p, -np.log(p), -np.log(1 - p))`),
    E("روی داده سرطان سینه، LogisticRegression با penalty='l1' و solver='liblinear' و C=0.1 بساز. چند ضریب صفر شد؟", "On breast cancer, fit LogisticRegression with penalty='l1', solver='liblinear', C=0.1. How many coefficients are zero?",
    `from sklearn.datasets import load_breast_cancer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.preprocessing import StandardScaler\nX, y = load_breast_cancer(return_X_y=True)\nm = LogisticRegression(penalty="l1", solver="liblinear", C=0.1).fit(StandardScaler().fit_transform(X), y)\nprint((m.coef_ == 0).sum(), "of", m.coef_.size)`)],
  quiz: [Q("مرز تصمیم لجستیک ساده کجاست؟", "Where is the plain logistic decision boundary?", ["جایی که z = 0", "جایی که p = 1", "جایی که x = 0"], ["Where z = 0", "Where p = 1", "Where x = 0"], 0),
    Q("ضریب w = 0.7 یعنی:", "A coefficient w = 0.7 means:", ["شانس با هر واحد x حدود ۲ برابر می‌شود", "احتمال ۷۰٪ است", "دقت ۷۰٪ است"], ["The odds roughly double per unit of x", "The probability is 70%", "The accuracy is 70%"], 0)]
});

L({ id: "ai-knn", before: "ap-classification",
  fa: ["طبقه‌بندی KNN", R`## ایده در یک نگاه
«بگو دوستانت کیستند تا بگویم کیستی.» برای نقطه جدید، k نزدیک‌ترین نقطه آموزش را پیدا کن و **رأی اکثریت** آن‌ها را برگردان. احتمال هر کلاس = سهم آن کلاس بین همسایه‌ها.

[[lab:knn]]

## گام‌ها
- فاصله را تا همه نمونه‌ها حساب کن.
- k نزدیک‌ترین را انتخاب کن.
- رأی‌گیری کن (با ~weights="distance"~ رأی نزدیک‌ترها سنگین‌تر است).

## معیارهای فاصله
| فاصله | فرمول | کاربرد |
|---|---|---|
| اقلیدسی | $\sqrt{\sum(x_j-x'_j)^2}$ | پیش‌فرض |
| منهتن | $\sum\vert x_j-x'_j\vert$ | ابعاد بالا، داده شبکه‌ای |
| مینکوفسکی | $(\sum\vert x_j-x'_j\vert^p)^{1/p}$ | تعمیم دو تای بالا |
| کسینوسی | $1-\cos\theta$ | متن و بردارهای جاسازی |

## مثال عددی
میوه‌ها با (وزن، شیرینی). نقطه جدید (۱۵۰، ۶)، $k=3$:

| میوه | وزن | شیرینی | فاصله |
|---|---|---|---|
| سیب | 140 | 7 | **10.0** |
| سیب | 160 | 6 | **10.0** |
| پرتقال | 155 | 4 | **5.4** |
| پرتقال | 200 | 3 | 50.1 |

سه همسایه: ۲ سیب، ۱ پرتقال ← **سیب**، با احتمال ۲/۳. ولی دقت کن: وزن (صدها) فاصله را تعیین می‌کند و شیرینی تقریباً بی‌اثر است. **مقیاس‌بندی** را فراموش نکن:

[[lab:scaling]]

[[fig:knn.png|مرز تصمیم KNN برای k های مختلف.]]

## انتخاب k
[[lab:cls_knn]]

| k | اثر |
|---|---|
| ۱ | مرز پرپیچ‌وخم؛ دقت آموزش ۱۰۰٪ (بیش‌برازش) |
| متوسط (۵ تا ۱۵) | معمولاً بهترین |
| خیلی بزرگ | همه چیز به سمت کلاس پرتعداد |

!در مسئله دودویی، k را **فرد** انتخاب کن تا رأی مساوی نشود.

[[c:0]]

| مزایا | معایب |
|---|---|
| بدون آموزش؛ ساده | پیش‌بینی کند روی داده بزرگ |
| مرزهای پیچیده | حساس به مقیاس و ویژگی‌های بی‌ربط |
| چندکلاسه طبیعی | نفرین ابعاد |`],
  en: ["KNN classification", R`## The idea in one look
"Tell me who your friends are and I will tell you who you are." For a new point, find the k nearest training points and return their **majority vote**. The probability of each class is its share among the neighbors.

[[lab:knn]]

## Steps
- Compute the distance to every sample.
- Pick the k nearest.
- Vote (with ~weights="distance"~, closer neighbors vote more strongly).

## Distance measures
| Distance | Formula | Use |
|---|---|---|
| Euclidean | $\sqrt{\sum(x_j-x'_j)^2}$ | The default |
| Manhattan | $\sum\vert x_j-x'_j\vert$ | High dimensions, grid-like data |
| Minkowski | $(\sum\vert x_j-x'_j\vert^p)^{1/p}$ | Generalizes the two above |
| Cosine | $1-\cos\theta$ | Text and embedding vectors |

## A worked example
Fruits described by (weight, sweetness). New point (150, 6), $k=3$:

| Fruit | Weight | Sweetness | Distance |
|---|---|---|---|
| Apple | 140 | 7 | **10.0** |
| Apple | 160 | 6 | **10.0** |
| Orange | 155 | 4 | **5.4** |
| Orange | 200 | 3 | 50.1 |

Three neighbors: 2 apples and 1 orange → **apple**, with probability 2/3. But notice: weight (hundreds) decides the distance and sweetness hardly matters. Do not forget **scaling**:

[[lab:scaling]]

[[fig:knn.png|KNN decision boundaries for different k.]]

## Choosing k
[[lab:cls_knn]]

| k | Effect |
|---|---|
| 1 | Wiggly boundary; 100% train accuracy (overfitting) |
| Medium (5 to 15) | Usually best |
| Very large | Everything drifts toward the larger class |

!For a binary problem, choose an **odd** k to avoid ties.

[[c:0]]

| Pros | Cons |
|---|---|
| No training; simple | Slow prediction on big data |
| Complex boundaries | Sensitive to scale and irrelevant features |
| Naturally multi-class | Curse of dimensionality |`],
  code: [`import numpy as np
from sklearn.datasets import load_wine
from sklearn.model_selection import cross_val_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_wine(return_X_y=True)
print("Feature ranges:", X.min(0).round(1)[:5], "...", X.max(0).round(1)[:5])
for k in [1, 3, 5, 9, 15, 31]:
    raw = cross_val_score(KNeighborsClassifier(k), X, y, cv=5).mean()
    scaled = cross_val_score(make_pipeline(StandardScaler(), KNeighborsClassifier(k)), X, y, cv=5).mean()
    print(f"k={k:2d}  without scaling: {raw:.3f}   with scaling: {scaled:.3f}")`],
  ex: [E("KNN طبقه‌بندی را از صفر بنویس و مثال میوه را با و بدون مقیاس‌بندی امتحان کن.", "Write KNN classification from scratch and try the fruit example with and without scaling.",
    `import numpy as np\nfrom collections import Counter\nX = np.array([[140, 7], [160, 6], [155, 4], [200, 3]], dtype=float)\ny = ["apple", "apple", "orange", "orange"]\nq = np.array([150, 6.0])\ndef knn(X, q, k=3):\n    d = np.sqrt(((X - q) ** 2).sum(1))\n    return Counter(y[i] for i in np.argsort(d)[:k]).most_common(1)[0][0]\nprint("raw:", knn(X, q))\nmu, sd = X.mean(0), X.std(0)\nprint("scaled:", knn((X - mu) / sd, (q - mu) / sd))`)],
  quiz: [Q("KNN در مرحله آموزش چه می‌کند؟", "What does KNN do during training?", ["فقط داده را ذخیره می‌کند", "ضرایب را با گرادیان پیدا می‌کند", "درخت می‌سازد"], ["Only stores the data", "Finds coefficients with gradients", "Builds a tree"], 0)]
});

L({ id: "ai-nb", before: "ap-classification",
  fa: ["بیز ساده (Naive Bayes)", R`## ایده در یک نگاه
بیز ساده از **قضیه بیز** استفاده می‌کند تا احتمال هر کلاس را با دیدن ویژگی‌ها حساب کند:

$$P(c\mid x)=\frac{P(x\mid c)\,P(c)}{P(x)}$$

- $P(c)$: احتمال **پیشین**؛ قبل از دیدن داده (مثلاً ۳۰٪ ایمیل‌ها اسپم‌اند).
- $P(x\mid c)$: **درست‌نمایی**؛ این ویژگی‌ها در کلاس $c$ چقدر رایج‌اند.
- $P(c\mid x)$: احتمال **پسین**؛ بعد از دیدن داده.

## فرض «ساده»
محاسبه $P(x_1,\dots,x_d\mid c)$ سخت است. فرض می‌کنیم ویژگی‌ها **با دانستن کلاس، مستقل‌اند**:

$$P(c\mid x)\propto P(c)\prod_{j=1}^{d}P(x_j\mid c)$$

این فرض معمولاً درست نیست («رایگان» و «جایزه» در اسپم با هم می‌آیند)، ولی مدل در عمل خیلی خوب کار می‌کند، چون برای تصمیم فقط **ترتیب** احتمال‌ها مهم است.

## مثال کامل: فیلتر اسپم
از ۱۰۰ ایمیل، ۳۰ تا اسپم. ایمیل جدید شامل «رایگان» و «جلسه» است:

| کلمه | P(کلمه ∣ اسپم) | P(کلمه ∣ عادی) |
|---|---|---|
| رایگان | 0.60 | 0.05 |
| جلسه | 0.10 | 0.40 |

- اسپم: $0.3\times0.6\times0.1=0.018$
- عادی: $0.7\times0.05\times0.4=0.014$

نرمال‌سازی: $P(\text{spam}\mid x)=0.018/(0.018+0.014)=0.56$ ← **اسپم**.

[[c:0]]

## سه نوع رایج
| نوع | ویژگی‌ها | $P(x_j\mid c)$ | کاربرد |
|---|---|---|---|
| ~GaussianNB~ | پیوسته | توزیع نرمال با میانگین و واریانس هر کلاس | داده عددی |
| ~MultinomialNB~ | شمارش | فراوانی کلمه | دسته‌بندی متن |
| ~BernoulliNB~ | ۰/۱ | بود یا نبود کلمه | متن کوتاه |

[[fig:nb_gauss.png|بیز گاوسی در یک بعد: چگالی هر کلاس ضرب در پیشین، و احتمال پسین که از ۰٫۵ می‌گذرد.]]

## هموارسازی لاپلاس
اگر کلمه‌ای در آموزش هرگز در اسپم نیامده باشد، $P=0$ و کل حاصل‌ضرب صفر می‌شود. با ~alpha=1~ به همه شمارش‌ها ۱ اضافه می‌کنیم:

$$P(w\mid c)=\frac{\text{count}(w,c)+\alpha}{\text{count}(c)+\alpha V}$$

[[lab:cls_nb]]

[[c:1]]

| مزایا | معایب |
|---|---|
| فوق‌العاده سریع، حتی با میلیون‌ها ویژگی | فرض استقلال |
| با داده کم کار می‌کند | احتمال‌ها معمولاً خیلی نزدیک ۰ یا ۱ (بدکالیبره) |
| پایه عالی برای متن | مرزهای ساده |`],
  en: ["Naive Bayes", R`## The idea in one look
Naive Bayes uses **Bayes' theorem** to compute the probability of each class after seeing the features:

$$P(c\mid x)=\frac{P(x\mid c)\,P(c)}{P(x)}$$

- $P(c)$: the **prior**, before seeing the data (e.g. 30% of emails are spam).
- $P(x\mid c)$: the **likelihood**, how common these features are in class $c$.
- $P(c\mid x)$: the **posterior**, after seeing the data.

## The "naive" assumption
Computing $P(x_1,\dots,x_d\mid c)$ is hard. We assume the features are **independent given the class**:

$$P(c\mid x)\propto P(c)\prod_{j=1}^{d}P(x_j\mid c)$$

This is usually false ("free" and "prize" appear together in spam), yet the model works very well in practice, because only the **order** of the probabilities matters for the decision.

## A full example: a spam filter
Of 100 emails, 30 are spam. A new email contains "free" and "meeting":

| Word | P(word ∣ spam) | P(word ∣ normal) |
|---|---|---|
| free | 0.60 | 0.05 |
| meeting | 0.10 | 0.40 |

- Spam: $0.3\times0.6\times0.1=0.018$
- Normal: $0.7\times0.05\times0.4=0.014$

Normalize: $P(\text{spam}\mid x)=0.018/(0.018+0.014)=0.56$ → **spam**.

[[c:0]]

## Three common kinds
| Kind | Features | $P(x_j\mid c)$ | Use |
|---|---|---|---|
| ~GaussianNB~ | Continuous | Normal distribution with each class's mean and variance | Numeric data |
| ~MultinomialNB~ | Counts | Word frequency | Text classification |
| ~BernoulliNB~ | 0/1 | Word present or not | Short texts |

[[fig:nb_gauss.png|Gaussian naive Bayes in 1-D: each class density times its prior, and the posterior crossing 0.5.]]

## Laplace smoothing
If a word never appeared in spam during training, $P=0$ and the whole product becomes zero. With ~alpha=1~ we add 1 to every count:

$$P(w\mid c)=\frac{\text{count}(w,c)+\alpha}{\text{count}(c)+\alpha V}$$

[[lab:cls_nb]]

[[c:1]]

| Pros | Cons |
|---|---|
| Extremely fast, even with millions of features | The independence assumption |
| Works with little data | Probabilities pushed near 0 or 1 (poorly calibrated) |
| A great baseline for text | Simple boundaries |`],
  code: [`# The spam example, step by step
prior = {"spam": 0.3, "normal": 0.7}
like = {"spam": {"free": 0.60, "meeting": 0.10}, "normal": {"free": 0.05, "meeting": 0.40}}
email = ["free", "meeting"]

score = {}
for c in prior:
    s = prior[c]
    for w in email:
        s *= like[c][w]
    score[c] = s
total = sum(score.values())
for c in score:
    print(c, "score =", round(score[c], 4), " posterior =", round(score[c] / total, 3))`,
`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

texts = ["win a free prize now", "free money click now", "meeting at ten tomorrow", "project meeting notes",
         "claim your free gift", "lunch with the team tomorrow", "cheap prize offer now", "notes from the team meeting"]
labels = ["spam", "spam", "normal", "normal", "spam", "normal", "spam", "normal"]

model = make_pipeline(CountVectorizer(), MultinomialNB(alpha=1.0)).fit(texts, labels)
for t in ["free prize meeting", "team lunch tomorrow", "click now for money"]:
    p = model.predict_proba([t])[0]
    print(f"{t!r:25} -> {model.predict([t])[0]:7s}", dict(zip(model.classes_, p.round(3))))`],
  ex: [E("GaussianNB را روی داده سرطان سینه با ۵ تا ارزیابی کن و با LogisticRegression مقایسه کن.", "Evaluate GaussianNB on breast cancer with 5 folds and compare it with LogisticRegression.",
    `from sklearn.datasets import load_breast_cancer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.naive_bayes import GaussianNB\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nX, y = load_breast_cancer(return_X_y=True)\nprint("NB", cross_val_score(GaussianNB(), X, y, cv=5).mean().round(3))\nprint("LR", cross_val_score(make_pipeline(StandardScaler(), LogisticRegression()), X, y, cv=5).mean().round(3))`)],
  quiz: [Q("فرض «ساده» در بیز ساده چیست؟", "What is the naive assumption?", ["ویژگی‌ها با دانستن کلاس مستقل‌اند", "کلاس‌ها هم‌اندازه‌اند", "داده نرمال است"], ["Features are independent given the class", "Classes have equal size", "The data is normal"], 0),
    Q("هموارسازی لاپلاس چه مشکلی را حل می‌کند؟", "What does Laplace smoothing fix?", ["احتمال صفر برای کلمه دیده‌نشده", "بیش‌برازش درخت", "مقیاس ویژگی‌ها"], ["Zero probability for unseen words", "Tree overfitting", "Feature scale"], 0)]
});

L({ id: "ai-trees", before: "ap-classification",
  fa: ["درخت تصمیم برای طبقه‌بندی", R`## ایده در یک نگاه
درخت با پرسش‌های بله/خیر داده را تقسیم می‌کند تا هر برگ تا حد ممکن **خالص** باشد (همه یک کلاس). پیش‌بینی هر برگ، کلاس اکثریت آن است و احتمال، سهم هر کلاس در برگ.

[[fig:tree_cls_struct.png|درخت عمق ۲ روی داده Iris. gini ناخالصی، samples تعداد نمونه و value تعداد هر کلاس در گره است.]]

## معیار ناخالصی
برای گره‌ای که سهم کلاس $k$ در آن $p_k$ است:

| معیار | فرمول | گره خالص | بیشترین (دو کلاس) |
|---|---|---|---|
| Gini | $1-\sum_k p_k^2$ | 0 | 0.5 |
| آنتروپی | $-\sum_k p_k\log_2p_k$ | 0 | 1 |

[[fig:impurity.png|ناخالصی گره دوکلاسه بر حسب سهم کلاس ۱.]]

## انتخاب بهترین برش
برش‌ای انتخاب می‌شود که **میانگین وزن‌دار ناخالصی** فرزندان را کمینه کند (یا **بهره اطلاعات** را بیشینه):

$$\text{Gain}=G(\text{parent})-\frac{n_L}{n}G(L)-\frac{n_R}{n}G(R)$$

## مثال عددی
۱۰ نمونه: ۵ سالم و ۵ بیمار. Gini والد $=1-0.5^2-0.5^2=0.5$.

| برش | چپ | راست | Gini وزن‌دار |
|---|---|---|---|
| سن ≤ ۴۰ | ۴ سالم، ۱ بیمار (Gini=0.32) | ۱ سالم، ۴ بیمار (0.32) | 0.32 |
| فشار ≤ ۱۲ | ۳ سالم، ۲ بیمار (0.48) | ۲ سالم، ۳ بیمار (0.48) | 0.48 |

برش «سن» بهتر است: بهره $0.5-0.32=0.18$.

[[c:0]]

## عمق و بیش‌برازش
[[fig:tree_cls_depth.png|عمق ۱: یک برش. عمق ۴: خوب. بدون محدودیت: هر نقطه نویز یک ناحیه جدا می‌گیرد.]]

[[lab:cls_tree]]

در آزمایشگاه، ~max_depth~ را زیاد کن تا دقت آموزش به ۱ برسد؛ حالا دقت آزمون را ببین.

## هرس (Pruning)
| روش | پارامتر |
|---|---|
| پیش‌هرس: توقف زودتر | ~max_depth~، ~min_samples_leaf~، ~max_leaf_nodes~ |
| پس‌هرس: ساخت درخت کامل و حذف شاخه‌های کم‌فایده | ~ccp_alpha~ |

[[c:1]]

| مزایا | معایب |
|---|---|
| مثل قوانین «اگر-آنگاه» قابل خواندن | ناپایدار |
| بدون مقیاس‌بندی | مرزهای پله‌ای موازی محور |
| اهمیت ویژگی‌ها | زود بیش‌برازش می‌کند |`],
  en: ["Decision trees for classification", R`## The idea in one look
A tree splits the data with yes/no questions so that each leaf becomes as **pure** as possible (all one class). A leaf predicts its majority class, and its probabilities are the class shares in the leaf.

[[fig:tree_cls_struct.png|A depth-2 tree on the Iris data. gini is the impurity, samples the count and value the count of each class in the node.]]

## Impurity measures
For a node where class $k$ has share $p_k$:

| Measure | Formula | Pure node | Maximum (two classes) |
|---|---|---|---|
| Gini | $1-\sum_k p_k^2$ | 0 | 0.5 |
| Entropy | $-\sum_k p_k\log_2p_k$ | 0 | 1 |

[[fig:impurity.png|Impurity of a two-class node as a function of the share of class 1.]]

## Choosing the best split
The chosen split minimizes the **weighted average impurity** of the children (equivalently maximizes the **information gain**):

$$\text{Gain}=G(\text{parent})-\frac{n_L}{n}G(L)-\frac{n_R}{n}G(R)$$

## A worked example
10 samples: 5 healthy and 5 sick. Parent Gini $=1-0.5^2-0.5^2=0.5$.

| Split | Left | Right | Weighted Gini |
|---|---|---|---|
| age ≤ 40 | 4 healthy, 1 sick (Gini=0.32) | 1 healthy, 4 sick (0.32) | 0.32 |
| pressure ≤ 12 | 3 healthy, 2 sick (0.48) | 2 healthy, 3 sick (0.48) | 0.48 |

The "age" split is better: gain $0.5-0.32=0.18$.

[[c:0]]

## Depth and overfitting
[[fig:tree_cls_depth.png|Depth 1: one cut. Depth 4: good. No limit: every noisy point gets its own region.]]

[[lab:cls_tree]]

In the lab, raise ~max_depth~ until the train accuracy reaches 1, then look at the test accuracy.

## Pruning
| Method | Parameters |
|---|---|
| Pre-pruning: stop earlier | ~max_depth~, ~min_samples_leaf~, ~max_leaf_nodes~ |
| Post-pruning: grow the full tree, then cut weak branches | ~ccp_alpha~ |

[[c:1]]

| Pros | Cons |
|---|---|
| Readable as "if-then" rules | Unstable |
| No scaling needed | Axis-parallel step boundaries |
| Feature importance | Overfits quickly |`],
  code: [`import numpy as np

def gini(counts):
    p = np.array(counts) / sum(counts)
    return 1 - np.sum(p ** 2)

def weighted(left, right):
    n = sum(left) + sum(right)
    return sum(left) / n * gini(left) + sum(right) / n * gini(right)

print("parent gini:", gini([5, 5]))
print("split on age     :", round(weighted([4, 1], [1, 4]), 3))
print("split on pressure:", round(weighted([3, 2], [2, 3]), 3))
entropy = lambda c: -sum(q * np.log2(q) for q in np.array(c) / sum(c) if q > 0)
print("entropy of [5, 5]:", entropy([5, 5]), " of [4, 1]:", round(entropy([4, 1]), 3))`,
`import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.tree import DecisionTreeClassifier

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=0)
path = DecisionTreeClassifier(random_state=0).cost_complexity_pruning_path(X_tr, y_tr)
for a in path.ccp_alphas[::4]:
    t = DecisionTreeClassifier(ccp_alpha=a, random_state=0).fit(X_tr, y_tr)
    print(f"ccp_alpha={a:.4f}  leaves={t.get_n_leaves():2d}  train={t.score(X_tr, y_tr):.3f}  test={t.score(X_te, y_te):.3f}")`],
  ex: [E("آنتروپی و بهره اطلاعات برش «سن» در مثال را حساب کن.", "Compute the entropy and the information gain of the 'age' split in the example.",
    `import numpy as np\nH = lambda c: -sum(q * np.log2(q) for q in np.array(c) / sum(c) if q > 0)\nprint("gain =", round(H([5, 5]) - 0.5 * H([4, 1]) - 0.5 * H([1, 4]), 3))`, "بهره ≈ 0.278 بیت.", "Gain ≈ 0.278 bits."),
    E("با export_text قوانین یک درخت عمق ۳ روی Iris را چاپ کن.", "Print the rules of a depth-3 tree on Iris with export_text.",
    `from sklearn.datasets import load_iris\nfrom sklearn.tree import DecisionTreeClassifier, export_text\nd = load_iris()\nt = DecisionTreeClassifier(max_depth=3, random_state=0).fit(d.data, d.target)\nprint(export_text(t, feature_names=d.feature_names))`)],
  quiz: [Q("Gini یک گره خالص چقدر است؟", "What is the Gini of a pure node?", ["0", "0.5", "1"], ["0", "0.5", "1"], 0),
    Q("ccp_alpha بزرگ‌تر یعنی:", "A larger ccp_alpha means:", ["درخت کوچک‌تر", "درخت عمیق‌تر", "بدون تغییر"], ["A smaller tree", "A deeper tree", "No change"], 0)]
});

L({ id: "ai-forest", before: "ap-classification",
  fa: ["جنگل تصادفی برای طبقه‌بندی", R`## ایده در یک نگاه
صدها درخت متفاوت بساز و **رأی** بگیر. هر درخت روی نمونه بوت‌استرپ و با زیرمجموعه تصادفی از ویژگی‌ها در هر گره ساخته می‌شود. خطاهای درخت‌ها تا حدی مستقل‌اند و در رأی‌گیری همدیگر را خنثی می‌کنند.

$$\hat p(c\mid x)=\frac1B\sum_{b=1}^{B}\hat p_b(c\mid x)$$

## چرا رأی‌گیری قوی است؟ (مثال)
اگر هر درخت مستقلاً با احتمال ۰٫۷ درست بگوید، اکثریت ۲۵ درخت با احتمال حدود **۰٫۹۸** درست می‌گوید (توزیع دوجمله‌ای). البته درخت‌ها کاملاً مستقل نیستند، پس بهبود واقعی کمتر است؛ برای همین ویژگی تصادفی (~max_features~) مهم است.

[[c:0]]

[[fig:forest_cls.png|یک درخت عمیق در برابر جنگل ۳۰۰ درختی: مرز جنگل نرم‌تر و قابل اعتمادتر است.]]

[[lab:cls_forest]]

## هایپرپارامترها
| پارامتر | پیش‌فرض طبقه‌بندی | اثر |
|---|---|---|
| ~n_estimators~ | 100 | بیشتر = پایدارتر (بیش‌برازش نمی‌دهد) |
| ~max_features~ | ~"sqrt"~ | کمتر = درخت‌های مستقل‌تر |
| ~max_depth~، ~min_samples_leaf~ | بدون محدودیت، 1 | پیچیدگی هر درخت |
| ~class_weight~ | None | ~"balanced"~ برای داده نامتوازن |
| ~n_jobs~ | None | ~-1~ = همه هسته‌های CPU |

## اهمیت ویژگی‌ها
[[fig:forest_importance.png|ده ویژگی مهم برای تشخیص سرطان سینه.]]

[[c:1]]

## Bagging در برابر جنگل تصادفی
| | Bagging | جنگل تصادفی |
|---|---|---|
| نمونه بوت‌استرپ | بله | بله |
| ویژگی تصادفی در هر گره | خیر | بله |
| همبستگی درخت‌ها | بیشتر | کمتر |
| مدل پایه | هر مدلی | فقط درخت |
| کلاس sklearn | ~BaggingClassifier~ | ~RandomForestClassifier~ |

!~ExtraTreesClassifier~ از این هم تصادفی‌تر است: نقطه برش را هم تصادفی انتخاب می‌کند؛ سریع‌تر و گاهی دقیق‌تر.`],
  en: ["Random forests for classification", R`## The idea in one look
Build hundreds of different trees and let them **vote**. Each tree is trained on a bootstrap sample and with a random subset of features at each node. The trees' errors are partly independent and cancel out in the vote.

$$\hat p(c\mid x)=\frac1B\sum_{b=1}^{B}\hat p_b(c\mid x)$$

## Why is voting strong? (an example)
If each tree is right with probability 0.7, independently, the majority of 25 trees is right with probability about **0.98** (binomial distribution). Real trees are not fully independent, so the gain is smaller; that is why random features (~max_features~) matter.

[[c:0]]

[[fig:forest_cls.png|One deep tree against a 300-tree forest: the forest's boundary is smoother and more reliable.]]

[[lab:cls_forest]]

## Hyperparameters
| Parameter | Classification default | Effect |
|---|---|---|
| ~n_estimators~ | 100 | More = more stable (does not overfit) |
| ~max_features~ | ~"sqrt"~ | Fewer = more independent trees |
| ~max_depth~, ~min_samples_leaf~ | none, 1 | Complexity of each tree |
| ~class_weight~ | None | ~"balanced"~ for imbalanced data |
| ~n_jobs~ | None | ~-1~ = all CPU cores |

## Feature importance
[[fig:forest_importance.png|The ten most important features for breast cancer diagnosis.]]

[[c:1]]

## Bagging against random forests
| | Bagging | Random forest |
|---|---|---|
| Bootstrap samples | Yes | Yes |
| Random features per node | No | Yes |
| Correlation between trees | Higher | Lower |
| Base model | Any model | Trees only |
| scikit-learn class | ~BaggingClassifier~ | ~RandomForestClassifier~ |

!~ExtraTreesClassifier~ is even more random: it also picks the cut point at random. It is faster and sometimes more accurate.`],
  code: [`from math import comb

# Probability that the majority of n independent voters is right, when each is right with probability p
def majority(n, p):
    return sum(comb(n, k) * p ** k * (1 - p) ** (n - k) for k in range(n // 2 + 1, n + 1))

for n in [1, 5, 25, 101]:
    print(f"{n:3d} trees -> {majority(n, 0.7):.4f}")`,
`from sklearn.datasets import load_breast_cancer
from sklearn.ensemble import ExtraTreesClassifier, RandomForestClassifier
from sklearn.model_selection import cross_val_score
from sklearn.tree import DecisionTreeClassifier

X, y = load_breast_cancer(return_X_y=True)
for name, m in [("one tree", DecisionTreeClassifier(random_state=0)),
                ("forest 300", RandomForestClassifier(300, random_state=0)),
                ("extra trees 300", ExtraTreesClassifier(300, random_state=0))]:
    print(f"{name:16s} accuracy = {cross_val_score(m, X, y, cv=5).mean():.3f}")

rf = RandomForestClassifier(300, oob_score=True, random_state=0).fit(X, y)
print("OOB accuracy:", round(rf.oob_score_, 3))`],
  ex: [E("max_features را 1، 'sqrt' و None بگذار و دقت OOB را مقایسه کن.", "Compare the OOB accuracy for max_features 1, 'sqrt' and None.",
    `from sklearn.datasets import load_breast_cancer\nfrom sklearn.ensemble import RandomForestClassifier\nX, y = load_breast_cancer(return_X_y=True)\nfor mf in [1, "sqrt", None]:\n    print(mf, RandomForestClassifier(300, max_features=mf, oob_score=True, random_state=0).fit(X, y).oob_score_)`)],
  quiz: [Q("چه چیزی جنگل تصادفی را از Bagging ساده جدا می‌کند؟", "What separates a random forest from plain bagging?", ["انتخاب تصادفی ویژگی در هر گره", "استفاده از بوت‌استرپ", "رأی‌گیری"], ["Random features at each node", "Using bootstrap samples", "Voting"], 0)]
});

L({ id: "ai-boost", before: "ap-classification",
  fa: ["بوستینگ: AdaBoost و گرادیان بوستینگ", R`## ایده در یک نگاه
بوستینگ مدل‌های **ضعیف** (کمی بهتر از شانس، مثلاً درخت یک‌برشی یا «کنده») را **پشت سر هم** می‌سازد؛ هر مدل روی اشتباه‌های قبلی تمرکز می‌کند. جمع وزن‌دار آن‌ها یک مدل **قوی** می‌شود.

## AdaBoost گام‌به‌گام
- همه نمونه‌ها وزن برابر $w_i=1/n$ دارند.
- برای $m=1..M$:
- یک کنده با وزن‌ها آموزش بده؛ خطای وزن‌دار $\varepsilon_m$ را حساب کن.
- وزن مدل: $\alpha_m=\frac12\ln\frac{1-\varepsilon_m}{\varepsilon_m}$ (خطای کمتر = رأی بیشتر).
- وزن نمونه‌های **غلط** را زیاد و درست‌ها را کم کن: $w_i\leftarrow w_i e^{-\alpha_m y_ih_m(x_i)}$، سپس نرمال کن.
- پیش‌بینی نهایی: $\text{sign}\big(\sum_m\alpha_mh_m(x)\big)$.

## مثال عددی یک دور
۱۰ نمونه، کنده اول ۳ تا را غلط می‌گوید: $\varepsilon=0.3$ و $\alpha=\frac12\ln\frac{0.7}{0.3}=0.42$.

| نمونه | وزن قبل | ضریب | وزن بعد (نرمال‌شده) |
|---|---|---|---|
| ۷ نمونه درست | 0.1 | $e^{-0.42}=0.65$ | 0.071 |
| ۳ نمونه غلط | 0.1 | $e^{0.42}=1.53$ | 0.167 |

حالا ۳ نمونه غلط در مجموع **نیمی** از وزن را دارند؛ کنده بعدی مجبور است آن‌ها را درست کند.

[[c:0]]

[[fig:boost_cls.png|AdaBoost با ۱، ۵ و ۱۰۰ کنده روی دایره‌ها. مرزهای ساده موازی محور، کنار هم یک دایره می‌سازند.]]

[[lab:cls_ada]]

## گرادیان بوستینگ برای طبقه‌بندی
مثل درس رگرسیون، ولی درخت‌ها **گرادیان لاگ‌لاس** را یاد می‌گیرند ($y-p$) و خروجی با سیگموید به احتمال تبدیل می‌شود. ~HistGradientBoostingClassifier~ سریع‌ترین گزینه sklearn است و XGBoost، LightGBM و CatBoost نسخه‌های مشهور آن‌اند.

[[c:1]]

| | AdaBoost | گرادیان بوستینگ |
|---|---|---|
| روش تمرکز | وزن دادن به نمونه‌های غلط | آموزش روی گرادیان خطا |
| تابع خطا | نمایی | هر تابع مشتق‌پذیر |
| حساسیت به نویز و داده پرت | زیاد | کمتر |
| کاربرد امروز | آموزشی، داده کوچک | استاندارد داده جدولی |`],
  en: ["Boosting: AdaBoost and gradient boosting", R`## The idea in one look
Boosting builds **weak** models (a bit better than chance, such as one-split trees or "stumps") **one after another**; each one focuses on the previous mistakes. Their weighted sum becomes a **strong** model.

## AdaBoost step by step
- Every sample starts with the same weight $w_i=1/n$.
- For $m=1..M$:
- Train a stump with the weights; compute its weighted error $\varepsilon_m$.
- Model weight: $\alpha_m=\frac12\ln\frac{1-\varepsilon_m}{\varepsilon_m}$ (lower error = bigger vote).
- Increase the weights of **wrong** samples and decrease the right ones: $w_i\leftarrow w_i e^{-\alpha_m y_ih_m(x_i)}$, then normalize.
- Final prediction: $\text{sign}\big(\sum_m\alpha_mh_m(x)\big)$.

## A worked round
10 samples; the first stump gets 3 wrong: $\varepsilon=0.3$ and $\alpha=\frac12\ln\frac{0.7}{0.3}=0.42$.

| Samples | Weight before | Factor | Weight after (normalized) |
|---|---|---|---|
| 7 correct | 0.1 | $e^{-0.42}=0.65$ | 0.071 |
| 3 wrong | 0.1 | $e^{0.42}=1.53$ | 0.167 |

The 3 wrong samples now hold **half** of the total weight, so the next stump has to get them right.

[[c:0]]

[[fig:boost_cls.png|AdaBoost with 1, 5 and 100 stumps on circles. Simple axis-parallel cuts together build a circle.]]

[[lab:cls_ada]]

## Gradient boosting for classification
As in the regression lesson, but the trees learn the **gradient of the log loss** ($y-p$) and the output goes through a sigmoid to become a probability. ~HistGradientBoostingClassifier~ is scikit-learn's fastest option, and XGBoost, LightGBM and CatBoost are its famous versions.

[[c:1]]

| | AdaBoost | Gradient boosting |
|---|---|---|
| How it focuses | Reweights wrong samples | Trains on the gradient of the loss |
| Loss | Exponential | Any differentiable loss |
| Sensitivity to noise and outliers | High | Lower |
| Use today | Teaching, small data | The standard for tabular data |`],
  code: [`import numpy as np

# One AdaBoost round by hand: 10 samples, 3 mistakes
w = np.full(10, 0.1)
wrong = np.array([1, 1, 1, 0, 0, 0, 0, 0, 0, 0], bool)
eps = w[wrong].sum()
alpha = 0.5 * np.log((1 - eps) / eps)
w = w * np.exp(np.where(wrong, alpha, -alpha))
w /= w.sum()
print("error =", eps, " alpha =", round(alpha, 3))
print("new weights:", w.round(3), " weight of wrong samples:", w[wrong].sum().round(3))`,
`from sklearn.datasets import load_breast_cancer
from sklearn.ensemble import AdaBoostClassifier, GradientBoostingClassifier, HistGradientBoostingClassifier
from sklearn.model_selection import cross_val_score

X, y = load_breast_cancer(return_X_y=True)
for name, m in [("AdaBoost 200", AdaBoostClassifier(n_estimators=200, random_state=0)),
                ("GradientBoosting", GradientBoostingClassifier(n_estimators=200, learning_rate=0.1, max_depth=2, random_state=0)),
                ("HistGradientBoosting", HistGradientBoostingClassifier(random_state=0))]:
    print(f"{name:22s} accuracy = {cross_val_score(m, X, y, cv=5).mean():.3f}")`],
  ex: [E("با staged_score دقت آزمون AdaBoost را بعد از هر کنده روی داده سرطان سینه رسم کن.", "Use staged_score to plot AdaBoost's test accuracy after each stump on breast cancer.",
    `import matplotlib.pyplot as plt\nfrom sklearn.datasets import load_breast_cancer\nfrom sklearn.ensemble import AdaBoostClassifier\nfrom sklearn.model_selection import train_test_split\nX, y = load_breast_cancer(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, random_state=0)\nm = AdaBoostClassifier(n_estimators=300, random_state=0).fit(X_tr, y_tr)\nplt.plot(list(m.staged_score(X_te, y_te)))\nplt.xlabel("stumps"); plt.ylabel("test accuracy"); plt.show()`)],
  quiz: [Q("در AdaBoost وزن نمونه‌های غلط‌پیش‌بینی‌شده:", "In AdaBoost, the weights of misclassified samples:", ["زیاد می‌شود", "کم می‌شود", "ثابت می‌ماند"], ["Increase", "Decrease", "Stay the same"], 0),
    Q("اگر خطای وزن‌دار یک کنده ۰٫۵ باشد، α چقدر است؟", "If a stump's weighted error is 0.5, what is α?", ["0", "1", "بی‌نهایت"], ["0", "1", "Infinity"], 0, "مدلی که مثل سکه است رأیی ندارد.", "A coin-flip model gets no vote.")]
});

L({ id: "ai-svm", before: "ap-classification",
  fa: ["ماشین بردار پشتیبان (SVM خطی)", R`## ایده در یک نگاه
بین دو کلاس خطوط جداکننده زیادی وجود دارد. SVM خطی را انتخاب می‌کند که **بیشترین فاصله** (حاشیه یا margin) را از نزدیک‌ترین نقاط هر دو کلاس داشته باشد. حاشیه پهن یعنی مدل در برابر داده جدید مقاوم‌تر است.

[[fig:svm.png|خط با بیشترین حاشیه و بردارهای پشتیبان.]]

## ریاضی
مرز: $\mathbf w^\top\mathbf x+b=0$. با برچسب‌های $y_i\in\{-1,+1\}$ می‌خواهیم $y_i(\mathbf w^\top\mathbf x_i+b)\ge1$. پهنای حاشیه $2/\Vert\mathbf w\Vert$ است؛ پس:

$$\min_{\mathbf w,b}\ \frac12\Vert\mathbf w\Vert^2+C\sum_i\max\big(0,\ 1-y_i(\mathbf w^\top\mathbf x_i+b)\big)$$

جمله دوم **Hinge loss** است: نقاطی که درست و بیرون حاشیه‌اند خطای صفر دارند؛ بقیه جریمه می‌شوند.

## بردارهای پشتیبان
فقط نقاط روی حاشیه یا داخل آن (یا سمت غلط) جواب را تعیین می‌کنند. اگر بقیه نقاط را حذف کنی، مرز تغییر نمی‌کند.

## مثال عددی
$\mathbf w=(1,1)$، $b=-3$:

| نقطه | برچسب | $y(\mathbf w^\top x+b)$ | وضعیت | Hinge |
|---|---|---|---|---|
| (3, 2) | +1 | 2 | بیرون حاشیه | 0 |
| (2, 2) | +1 | 1 | روی حاشیه (بردار پشتیبان) | 0 |
| (1, 1) | −1 | 1 | روی حاشیه (بردار پشتیبان) | 0 |
| (2, 1.5) | −1 | −0.5 | سمت غلط | 1.5 |

پهنای حاشیه: $2/\sqrt2=1.41$.

[[c:0]]

## نقش C
[[fig:svm_C.png|C کوچک: حاشیه پهن، خطای آموزش بیشتر و بردارهای پشتیبان زیاد. C بزرگ: حاشیه باریک و تلاش برای درست کردن همه نقاط.]]

[[lab:cls_svm]]

| C | حاشیه | خطر |
|---|---|---|
| کوچک (0.01) | پهن (حاشیه نرم) | کم‌برازش |
| بزرگ (100) | باریک (نزدیک حاشیه سخت) | بیش‌برازش، حساس به داده پرت |

!SVM به مقیاس حساس است و به طور پیش‌فرض احتمال نمی‌دهد (~decision_function~ فاصله تا مرز است). برای احتمال ~probability=True~ بگذار (کندتر).

[[c:1]]`],
  en: ["Support vector machines (linear SVM)", R`## The idea in one look
Many lines can separate two classes. SVM picks the one with the **largest distance** (the margin) to the nearest points of both classes. A wide margin makes the model more robust on new data.

[[fig:svm.png|The maximum-margin line and the support vectors.]]

## The math
The boundary is $\mathbf w^\top\mathbf x+b=0$. With labels $y_i\in\{-1,+1\}$ we want $y_i(\mathbf w^\top\mathbf x_i+b)\ge1$. The margin width is $2/\Vert\mathbf w\Vert$, so:

$$\min_{\mathbf w,b}\ \frac12\Vert\mathbf w\Vert^2+C\sum_i\max\big(0,\ 1-y_i(\mathbf w^\top\mathbf x_i+b)\big)$$

The second term is the **hinge loss**: points that are correct and outside the margin cost nothing; the rest are penalized.

## Support vectors
Only the points on the margin, inside it, or on the wrong side decide the answer. Remove all other points and the boundary does not move.

## A worked example
$\mathbf w=(1,1)$, $b=-3$:

| Point | Label | $y(\mathbf w^\top x+b)$ | Status | Hinge |
|---|---|---|---|---|
| (3, 2) | +1 | 2 | Outside the margin | 0 |
| (2, 2) | +1 | 1 | On the margin (support vector) | 0 |
| (1, 1) | −1 | 1 | On the margin (support vector) | 0 |
| (2, 1.5) | −1 | −0.5 | Wrong side | 1.5 |

Margin width: $2/\sqrt2=1.41$.

[[c:0]]

## The role of C
[[fig:svm_C.png|Small C: a wide margin, more training error and many support vectors. Large C: a narrow margin that tries to get every point right.]]

[[lab:cls_svm]]

| C | Margin | Risk |
|---|---|---|
| Small (0.01) | Wide (soft margin) | Underfitting |
| Large (100) | Narrow (close to a hard margin) | Overfitting, sensitive to outliers |

!SVM is sensitive to scale and gives no probabilities by default (~decision_function~ is the distance to the boundary). Set ~probability=True~ for probabilities (slower).

[[c:1]]`],
  code: [`import numpy as np

w, b = np.array([1.0, 1.0]), -3.0
points = np.array([[3, 2], [2, 2], [1, 1], [2, 1.5]])
labels = np.array([1, 1, -1, -1])
margins = labels * (points @ w + b)
print("y * (w.x + b):", margins)
print("hinge loss   :", np.maximum(0, 1 - margins))
print("margin width :", round(2 / np.linalg.norm(w), 3))`,
`from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import LinearSVC, SVC

X, y = load_breast_cancer(return_X_y=True)
for C in [0.001, 0.01, 0.1, 1, 10, 100]:
    m = make_pipeline(StandardScaler(), SVC(kernel="linear", C=C))
    s = cross_val_score(m, X, y, cv=5).mean()
    n_sv = m.fit(X, y)[-1].n_support_.sum()
    print(f"C={C:<6} accuracy={s:.3f}  support vectors={n_sv}")
print("LinearSVC (fast for big data):", cross_val_score(make_pipeline(StandardScaler(), LinearSVC(C=0.1)), X, y, cv=5).mean().round(3))`],
  ex: [E("بدون StandardScaler، SVC خطی را روی داده سرطان سینه امتحان کن. چه تفاوتی می‌بینی؟", "Try a linear SVC on breast cancer without StandardScaler. What changes?",
    `from sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.svm import SVC\nX, y = load_breast_cancer(return_X_y=True)\nprint(cross_val_score(SVC(kernel="linear", C=1), X, y, cv=5).mean().round(3))`, "دقت کمی کمتر است و آموزش خیلی کندتر می‌شود، چون مقیاس ویژگی‌ها خیلی متفاوت است.", "Accuracy is a bit lower and training is much slower, because the features have very different scales.")],
  quiz: [Q("بردار پشتیبان چیست؟", "What is a support vector?", ["نقطه‌ای روی حاشیه یا داخل آن", "هر نقطه آموزشی", "مرکز هر کلاس"], ["A point on or inside the margin", "Every training point", "The center of each class"], 0),
    Q("پهنای حاشیه SVM:", "The SVM margin width is:", ["2/‖w‖", "‖w‖", "C"], ["2/‖w‖", "‖w‖", "C"], 0)]
});

L({ id: "ai-ksvm", before: "ap-classification",
  fa: ["SVM با کرنل", R`## ایده در یک نگاه
بعضی داده‌ها با خط راست جدا نمی‌شوند (مثلاً دایره‌ای درون دایره دیگر). ایده: داده را به **فضای بالاتر** ببریم که در آن جدا شود. مثلاً با ویژگی جدید $z=x_1^2+x_2^2$ (فاصله از مرکز)، دایره داخلی و بیرونی با یک صفحه ساده $z=c$ جدا می‌شوند.

## ترفند کرنل
SVM در فرم دوگان فقط به **ضرب داخلی** نقاط نیاز دارد: $\mathbf x_i^\top\mathbf x_j$. اگر آن را با یک **کرنل** $K(\mathbf x_i,\mathbf x_j)$ عوض کنیم، مثل این است که در یک فضای خیلی بزرگ (حتی بی‌نهایت‌بعدی) کار کنیم، **بدون اینکه آن فضا را بسازیم**.

$$f(\mathbf x)=\sum_{i\in SV}\alpha_iy_iK(\mathbf x_i,\mathbf x)+b$$

| کرنل | فرمول | پارامتر |
|---|---|---|
| خطی | $\mathbf x^\top\mathbf x'$ | — |
| چندجمله‌ای | $(\gamma\,\mathbf x^\top\mathbf x'+r)^d$ | ~degree~، ~coef0~ |
| RBF (گاوسی) | $\exp(-\gamma\Vert\mathbf x-\mathbf x'\Vert^2)$ | ~gamma~ |
| سیگموید | $\tanh(\gamma\,\mathbf x^\top\mathbf x'+r)$ | کمتر استفاده می‌شود |

[[fig:svm_kernels.png|سه کرنل روی داده دایره‌ای: خطی شکست می‌خورد؛ چندجمله‌ای و RBF موفق‌اند.]]

[[c:0]]

## gamma و C با هم
- **gamma:** شعاع اثر هر بردار پشتیبان. کوچک = اثر گسترده و مرز صاف؛ بزرگ = اثر محلی و مرز پرپیچ‌وخم.
- **C:** چقدر برای خطای آموزش جریمه بدهیم.

[[lab:cls_ksvm]]

در آزمایشگاه، gamma را خیلی بزرگ کن: دور هر نقطه یک «جزیره» شکل می‌گیرد (بیش‌برازش).

| | gamma کوچک | gamma بزرگ |
|---|---|---|
| C کوچک | خیلی ساده | محلی ولی نرم |
| C بزرگ | مرز صاف و دقیق | بیش‌برازش شدید |

!همیشه gamma و C را **با هم** روی شبکه لگاریتمی جستجو کن، مثلاً $C\in\{0.1,1,10,100\}$ و $\gamma\in\{0.001,0.01,0.1,1\}$.

[[c:1]]

| مزایا | معایب |
|---|---|
| مرزهای غیرخطی دقیق | کند روی بیش از ده‌ها هزار نمونه |
| با ابعاد بالا (متن) خوب کار می‌کند | انتخاب کرنل و پارامترها |
| حافظه کم: فقط بردارهای پشتیبان | تفسیر سخت |`],
  en: ["Kernel SVM", R`## The idea in one look
Some data cannot be separated by a straight line (say a circle inside another circle). The idea: lift the data to a **higher space** where it becomes separable. With a new feature $z=x_1^2+x_2^2$ (the distance from the center), the inner and outer circles are split by a simple plane $z=c$.

## The kernel trick
In its dual form, SVM only needs **inner products** of points: $\mathbf x_i^\top\mathbf x_j$. Replace them with a **kernel** $K(\mathbf x_i,\mathbf x_j)$ and it is as if we worked in a huge (even infinite-dimensional) space, **without ever building that space**.

$$f(\mathbf x)=\sum_{i\in SV}\alpha_iy_iK(\mathbf x_i,\mathbf x)+b$$

| Kernel | Formula | Parameters |
|---|---|---|
| Linear | $\mathbf x^\top\mathbf x'$ | — |
| Polynomial | $(\gamma\,\mathbf x^\top\mathbf x'+r)^d$ | ~degree~, ~coef0~ |
| RBF (Gaussian) | $\exp(-\gamma\Vert\mathbf x-\mathbf x'\Vert^2)$ | ~gamma~ |
| Sigmoid | $\tanh(\gamma\,\mathbf x^\top\mathbf x'+r)$ | Rarely used |

[[fig:svm_kernels.png|Three kernels on circular data: linear fails; polynomial and RBF succeed.]]

[[c:0]]

## gamma and C together
- **gamma:** the reach of each support vector. Small = wide reach and a smooth boundary; large = local reach and a wiggly boundary.
- **C:** how much training errors cost.

[[lab:cls_ksvm]]

In the lab, make gamma very large: an "island" forms around each point (overfitting).

| | Small gamma | Large gamma |
|---|---|---|
| Small C | Very simple | Local but soft |
| Large C | Smooth and accurate | Severe overfitting |

!Always search gamma and C **together** on a log grid, e.g. $C\in\{0.1,1,10,100\}$ and $\gamma\in\{0.001,0.01,0.1,1\}$.

[[c:1]]

| Pros | Cons |
|---|---|
| Accurate non-linear boundaries | Slow beyond tens of thousands of samples |
| Works well in high dimensions (text) | Choosing the kernel and parameters |
| Small memory: only support vectors | Hard to interpret |`],
  code: [`import numpy as np
from sklearn.datasets import make_circles
from sklearn.svm import SVC

X, y = make_circles(300, noise=0.08, factor=0.5, random_state=0)
print("linear on x1, x2       :", round(SVC(kernel="linear").fit(X, y).score(X, y), 3))
# Add the feature z = x1^2 + x2^2 by hand: now a linear SVM works
Z = np.c_[X, (X ** 2).sum(1)]
print("linear on x1, x2, z    :", round(SVC(kernel="linear").fit(Z, y).score(Z, y), 3))
print("RBF kernel on x1, x2   :", round(SVC(kernel="rbf").fit(X, y).score(X, y), 3))

# The RBF kernel value between two points
a, b = np.array([0, 0]), np.array([1, 1])
for g in [0.1, 1, 10]:
    print(f"K(a, b) with gamma={g}: {np.exp(-g * np.sum((a - b) ** 2)):.4f}")`,
`import pandas as pd
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import GridSearchCV
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

X, y = load_breast_cancer(return_X_y=True)
grid = GridSearchCV(make_pipeline(StandardScaler(), SVC()), {"svc__C": [0.1, 1, 10, 100], "svc__gamma": [0.001, 0.01, 0.1, 1]}, cv=5)
grid.fit(X, y)
print("Best:", grid.best_params_, round(grid.best_score_, 3))
table = pd.DataFrame(grid.cv_results_)[["param_svc__C", "param_svc__gamma", "mean_test_score"]]
print(table.pivot(index="param_svc__C", columns="param_svc__gamma", values="mean_test_score").round(3))`],
  ex: [E("روی داده دو هلال (make_moons) کرنل‌های linear، poly و rbf را مقایسه کن.", "Compare the linear, poly and rbf kernels on make_moons.",
    `from sklearn.datasets import make_moons\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.svm import SVC\nX, y = make_moons(300, noise=0.25, random_state=0)\nfor k in ["linear", "poly", "rbf"]:\n    print(k, cross_val_score(SVC(kernel=k, C=3), X, y, cv=5).mean().round(3))`)],
  quiz: [Q("ترفند کرنل چه می‌کند؟", "What does the kernel trick do?", ["ضرب داخلی در فضای بزرگ را بدون ساختن آن حساب می‌کند", "تعداد نمونه‌ها را کم می‌کند", "داده را نرمال می‌کند"], ["Computes inner products in a big space without building it", "Reduces the number of samples", "Normalizes the data"], 0)]
});

L({ id: "ai-cls-compare", before: "ap-classification",
  fa: ["مقایسه طبقه‌بندها، چندکلاسه و داده نامتوازن", R`## جدول راهنما
| مدل | مقیاس‌بندی | مرز | احتمال خوب | سرعت پیش‌بینی | داده بزرگ |
|---|---|---|---|---|---|
| لجستیک | **بله** | خطی | عالی | خیلی سریع | عالی |
| KNN | **بله** | نامنظم | متوسط | کند | ضعیف |
| بیز ساده | خیر | ساده | ضعیف | خیلی سریع | عالی |
| درخت | خیر | پله‌ای | ضعیف | خیلی سریع | خوب |
| جنگل | خیر | پله‌ای نرم | خوب | متوسط | خوب |
| بوستینگ | خیر | پیچیده | خوب | سریع | عالی |
| SVM کرنل | **بله** | منحنی صاف | با تنظیم | متوسط | ضعیف |

[[lab:cls_all]]

## مسائل چندکلاسه
مدل‌های دودویی (مثل SVM) با دو راهبرد چندکلاسه می‌شوند:

| راهبرد | تعداد مدل برای K کلاس | ایده |
|---|---|---|
| یکی در برابر بقیه (OvR) | K | هر کلاس در برابر همه |
| یکی در برابر یکی (OvO) | K(K−1)/2 | هر جفت کلاس؛ رأی‌گیری |
| Softmax | ۱ | لجستیک چندجمله‌ای مستقیم |

[[c:0]]

## داده نامتوازن
وقتی یک کلاس خیلی کمیاب است (تقلب ۱٪):

| راه حل | چطور |
|---|---|
| معیار مناسب | F1، Recall، Precision-Recall AUC به جای Accuracy |
| وزن کلاس | ~class_weight="balanced"~ |
| تغییر آستانه | آستانه کمتر از ۰٫۵ برای Recall بیشتر |
| نمونه‌گیری | کم کردن کلاس بزرگ یا افزایش کلاس کوچک (SMOTE در imbalanced-learn) |
| تقسیم طبقه‌ای | ~stratify=y~ و ~StratifiedKFold~ |

[[c:1]]

!هرگز قبل از تقسیم داده نمونه‌گیری مجدد نکن؛ فقط روی داده آموزش و داخل اعتبارسنجی.`],
  en: ["Comparing classifiers, multi-class and imbalanced data", R`## A guide table
| Model | Scaling | Boundary | Good probabilities | Prediction speed | Big data |
|---|---|---|---|---|---|
| Logistic | **Yes** | Linear | Excellent | Very fast | Excellent |
| KNN | **Yes** | Irregular | Medium | Slow | Poor |
| Naive Bayes | No | Simple | Poor | Very fast | Excellent |
| Tree | No | Steps | Poor | Very fast | Good |
| Forest | No | Soft steps | Good | Medium | Good |
| Boosting | No | Complex | Good | Fast | Excellent |
| Kernel SVM | **Yes** | Smooth curve | With tuning | Medium | Poor |

[[lab:cls_all]]

## Multi-class problems
Binary models (such as SVM) become multi-class with two strategies:

| Strategy | Models for K classes | Idea |
|---|---|---|
| One-vs-rest (OvR) | K | Each class against all others |
| One-vs-one (OvO) | K(K−1)/2 | Each pair of classes; a vote |
| Softmax | 1 | Multinomial logistic, directly |

[[c:0]]

## Imbalanced data
When one class is rare (1% fraud):

| Remedy | How |
|---|---|
| A suitable metric | F1, recall, precision-recall AUC instead of accuracy |
| Class weights | ~class_weight="balanced"~ |
| Move the threshold | A threshold below 0.5 for more recall |
| Resampling | Shrink the big class or grow the small one (SMOTE in imbalanced-learn) |
| Stratified splits | ~stratify=y~ and ~StratifiedKFold~ |

[[c:1]]

!Never resample before splitting the data; only on the training data, inside cross-validation.`],
  code: [`from sklearn.datasets import load_digits
from sklearn.model_selection import cross_val_score
from sklearn.multiclass import OneVsOneClassifier, OneVsRestClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import LinearSVC
from sklearn.linear_model import LogisticRegression

X, y = load_digits(return_X_y=True)   # 10 classes
for name, m in [("OvR  (10 models)", OneVsRestClassifier(LinearSVC(C=0.05))),
                ("OvO  (45 models)", OneVsOneClassifier(LinearSVC(C=0.05))),
                ("Softmax (1 model)", LogisticRegression(max_iter=2000))]:
    s = cross_val_score(make_pipeline(StandardScaler(), m), X, y, cv=5).mean()
    print(f"{name}: accuracy = {s:.3f}")`,
`import numpy as np
from sklearn.datasets import make_classification
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split

X, y = make_classification(5000, n_features=10, weights=[0.97], flip_y=0.01, random_state=0)
print("Share of class 1:", y.mean().round(3))
X_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=0)
for cw in [None, "balanced"]:
    m = LogisticRegression(class_weight=cw, max_iter=1000).fit(X_tr, y_tr)
    print("class_weight =", cw)
    print(classification_report(y_te, m.predict(X_te), digits=3))`],
  quiz: [Q("برای ۵ کلاس، OvO چند مدل می‌سازد؟", "How many models does OvO build for 5 classes?", ["10", "5", "25"], ["10", "5", "25"], 0),
    Q("با داده خیلی نامتوازن، کدام معیار گمراه‌کننده‌تر است؟", "With very imbalanced data, which metric misleads most?", ["Accuracy", "Recall", "F1"], ["Accuracy", "Recall", "F1"], 0)]
});
FinishCourse();
