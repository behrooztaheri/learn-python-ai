// Extra lessons and interactive labs added to existing lessons.
X("py-loops", { fa: "## آزمایشگاه حلقه\n[[lab:loop]]", en: "## Loop lab\n[[lab:loop]]" });
X("op-ga", { fa: R`## آزمایشگاه الگوریتم ژنتیک
هر نقطه نارنجی یک کروموزوم ۸ بیتی است (عددی بین ۰ تا ۲۵۵). «نسل بعد» را بزن و ببین جمعیت چطور به سمت قله می‌رود. احتمال جهش را صفر کن: جمعیت زود یکسان می‌شود و ممکن است در قله محلی گیر کند.

[[lab:ga]]`, en: R`## Genetic algorithm lab
Each orange point is an 8-bit chromosome (a number from 0 to 255). Press "Next generation" and watch the population climb toward the peak. Set the mutation rate to zero: the population quickly becomes identical and may get stuck on a local peak.

[[lab:ga]]` });
X("op-sa-de", { fa: R`## آزمایشگاه تبرید شبیه‌سازی‌شده
[[fig:sa_accept.png|احتمال پذیرش حرکت بدتر برای دماهای مختلف.]]

[[lab:sa]]

دمای اولیه را خیلی کم کن (مثلاً ۰٫۱): الگوریتم در اولین دره محلی گیر می‌کند. با دمای بالا و سرد شدن آهسته (۰٫۹۹۵)، به کمینه سراسری در وسط می‌رسد.`, en: R`## Simulated annealing lab
[[fig:sa_accept.png|Probability of accepting a worse move at different temperatures.]]

[[lab:sa]]

Set the start temperature very low (say 0.1): the algorithm gets stuck in the first local valley. With a high temperature and slow cooling (0.995) it reaches the global minimum in the middle.` });

M("ai", "found");
L({ id: "ai-scaling", after: "ai-data",
  fa: ["مقیاس‌بندی و کدگذاری ویژگی‌ها", R`## چرا مقیاس‌بندی؟
فرض کن دو ویژگی داری: سن (۲۰ تا ۸۰) و حقوق (۱۰۰۰ تا ۵۰۰۰). در فاصله اقلیدسی، اختلاف ۱۰۰۰ تومانی حقوق ۱۰۰۰ برابر اختلاف یک سال سن حساب می‌شود؛ یعنی **سن عملاً نادیده گرفته می‌شود**.

[[lab:scaling]]

## کدام مدل‌ها نیاز دارند؟
| نیاز دارند | نیاز ندارند |
|---|---|
| KNN، K-Means، DBSCAN (فاصله) | درخت تصمیم |
| SVM، SVR | جنگل تصادفی |
| رگرسیون با منظم‌سازی (Ridge، Lasso) | گرادیان بوستینگ |
| شبکه عصبی و هر مدل با گرادیان کاهشی | بیز ساده |
| PCA | |

## روش‌ها
| روش | فرمول | نتیجه | مناسب برای |
|---|---|---|---|
| ~StandardScaler~ | $z=(x-\mu)/\sigma$ | میانگین ۰، انحراف معیار ۱ | پیش‌فرض خوب |
| ~MinMaxScaler~ | $(x-\min)/(\max-\min)$ | بین ۰ و ۱ | تصویر، شبکه عصبی |
| ~RobustScaler~ | $(x-\text{median})/IQR$ | مقاوم به داده پرت | داده با پرت |
| تبدیل لگاریتم | $\log(1+x)$ | چولگی کمتر | درآمد، قیمت، شمارش |

## مثال عددی
سن‌ها: 20، 30، 40، 50، 60. میانگین 40 و انحراف معیار 14.14:

| سن | Standard | MinMax |
|---|---|---|
| 20 | −1.41 | 0.00 |
| 30 | −0.71 | 0.25 |
| 40 | 0.00 | 0.50 |
| 50 | 0.71 | 0.75 |
| 60 | 1.41 | 1.00 |

[[c:0]]

## کدگذاری ویژگی‌های دسته‌ای
| روش | مثال | کی |
|---|---|---|
| One-Hot | رنگ ← سه ستون قرمز/سبز/آبی با ۰ و ۱ | دسته‌های بدون ترتیب |
| Ordinal | کم=۰، متوسط=۱، زیاد=۲ | دسته‌های **ترتیب‌دار** |
| Target encoding | میانگین هدف برای هر دسته | تعداد دسته خیلی زیاد (با احتیاط) |

!دادن عدد ۰، ۱، ۲ به «تهران، شیراز، تبریز» یعنی به مدل بگویی شیراز بین تهران و تبریز است! برای دسته‌های بی‌ترتیب One-Hot لازم است.

## نشت داده
مقیاس‌کننده را **فقط روی داده آموزش** fit کن؛ وگرنه اطلاعات داده آزمون (میانگین و انحراف معیارش) به آموزش نشت می‌کند. ~Pipeline~ و ~ColumnTransformer~ این را خودکار درست انجام می‌دهند:

[[c:1]]`],
  en: ["Feature scaling and encoding", R`## Why scale?
Suppose you have two features: age (20 to 80) and salary (1000 to 5000). In Euclidean distance, a 1000 difference in salary counts 1000 times more than one year of age, so **age is practically ignored**.

[[lab:scaling]]

## Which models need it?
| Need it | Do not need it |
|---|---|
| KNN, K-Means, DBSCAN (distances) | Decision trees |
| SVM, SVR | Random forests |
| Regularized regression (Ridge, Lasso) | Gradient boosting |
| Neural networks and anything trained by gradient descent | Naive Bayes |
| PCA | |

## Methods
| Method | Formula | Result | Good for |
|---|---|---|---|
| ~StandardScaler~ | $z=(x-\mu)/\sigma$ | Mean 0, standard deviation 1 | A good default |
| ~MinMaxScaler~ | $(x-\min)/(\max-\min)$ | Between 0 and 1 | Images, neural networks |
| ~RobustScaler~ | $(x-\text{median})/IQR$ | Robust to outliers | Data with outliers |
| Log transform | $\log(1+x)$ | Less skew | Income, prices, counts |

## A worked example
Ages: 20, 30, 40, 50, 60. Mean 40, standard deviation 14.14:

| Age | Standard | MinMax |
|---|---|---|
| 20 | −1.41 | 0.00 |
| 30 | −0.71 | 0.25 |
| 40 | 0.00 | 0.50 |
| 50 | 0.71 | 0.75 |
| 60 | 1.41 | 1.00 |

[[c:0]]

## Encoding categorical features
| Method | Example | When |
|---|---|---|
| One-hot | color → three 0/1 columns red/green/blue | Unordered categories |
| Ordinal | low=0, medium=1, high=2 | **Ordered** categories |
| Target encoding | Mean target per category | Very many categories (with care) |

!Giving 0, 1, 2 to "Tehran, Shiraz, Tabriz" tells the model that Shiraz lies between Tehran and Tabriz! Unordered categories need one-hot encoding.

## Data leakage
Fit the scaler **on the training data only**; otherwise information from the test data (its mean and standard deviation) leaks into training. ~Pipeline~ and ~ColumnTransformer~ do this correctly by themselves:

[[c:1]]`],
  code: [`import numpy as np
from sklearn.preprocessing import MinMaxScaler, RobustScaler, StandardScaler

age = np.array([[20], [30], [40], [50], [60], [95]])   # 95 is an outlier
for s in [StandardScaler(), MinMaxScaler(), RobustScaler()]:
    print(f"{type(s).__name__:15s}", s.fit_transform(age).ravel().round(2))`,
`import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder, StandardScaler

df = pd.DataFrame({
    "age": [25, 32, 47, 51, 23, 36, 60, 29, 41, 55],
    "salary": [1800, 2500, 4100, 3900, 1500, 3000, 4500, 2100, 3300, 4200],
    "city": ["Tehran", "Shiraz", "Tehran", "Tabriz", "Shiraz", "Tabriz", "Tehran", "Shiraz", "Tabriz", "Tehran"],
    "level": ["low", "medium", "high", "high", "low", "medium", "high", "low", "medium", "high"],
    "bought": [0, 0, 1, 1, 0, 1, 1, 0, 1, 1],
})
X, y = df.drop(columns="bought"), df["bought"]
prep = ColumnTransformer([
    ("num", StandardScaler(), ["age", "salary"]),
    ("city", OneHotEncoder(handle_unknown="ignore"), ["city"]),
    ("level", OrdinalEncoder(categories=[["low", "medium", "high"]]), ["level"]),
])
model = Pipeline([("prep", prep), ("clf", LogisticRegression())])
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
model.fit(X_tr, y_tr)                 # the scaler only sees the training rows
print(prep.get_feature_names_out())
print("Test accuracy:", model.score(X_te, y_te))`],
  quiz: [Q("کدام مدل به مقیاس‌بندی نیاز ندارد؟", "Which model does not need scaling?", ["جنگل تصادفی", "KNN", "SVM"], ["Random forest", "KNN", "SVM"], 0),
    Q("برای ستون «شهر» کدام کدگذاری مناسب است؟", "Which encoding suits a 'city' column?", ["One-Hot", "Ordinal", "MinMax"], ["One-hot", "Ordinal", "MinMax"], 0)]
});
FinishCourse();
