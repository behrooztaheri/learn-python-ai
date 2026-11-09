M("ai", "found", "مبانی هوش مصنوعی", "AI foundations");

L({ id: "ai-what",
  fa: ["هوش مصنوعی چیست؟", R`**هوش مصنوعی** حوزه ساخت سیستم‌هایی است که کارهای نیازمند هوش را انجام می‌دهند. **یادگیری ماشین** زیرمجموعه آن است و به‌جای قانون دستی، الگو را از داده یاد می‌گیرد. **یادگیری عمیق** زیرمجموعه یادگیری ماشین است و از شبکه‌های عصبی چندلایه استفاده می‌کند.

## کاربرد در رشته‌های مختلف
- پزشکی: کمک به تشخیص از روی تصویر
- کشاورزی: تشخیص بیماری گیاه
- مالی: شناسایی تقلب
- زبان: ترجمه و دستیارهای گفت‌وگو

## چه زمانی مناسب نیست؟
اگر قانون ساده کافی است، داده کافی نداری، یا خطا پیامد سنگین دارد و توضیح‌پذیری لازم است، باید با احتیاط تصمیم بگیری.`],
  en: ["What is AI?", R`**Artificial intelligence** is the field of building systems that perform tasks requiring intelligence. **Machine learning** is a part of it that learns patterns from data instead of hand-written rules. **Deep learning** is a part of machine learning that uses multi-layer neural networks.

## Uses across fields
- Medicine: supporting diagnosis from images
- Agriculture: detecting plant disease
- Finance: spotting fraud
- Language: translation and chat assistants

## When is it a poor fit?
If a simple rule is enough, data is scarce, or errors are costly and explanations are required, decide with care.`],
  quiz: [Q("رابطه این سه مفهوم کدام است؟", "How are these related?", ["یادگیری عمیق ⊂ یادگیری ماشین ⊂ هوش مصنوعی", "هوش مصنوعی ⊂ یادگیری عمیق", "هر سه یکی هستند"], ["Deep learning ⊂ machine learning ⊂ AI", "AI ⊂ deep learning", "All three are identical"], 0)]
});

L({ id: "ai-types",
  fa: ["انواع یادگیری", R`- **با نظارت:** داده برچسب دارد. اگر خروجی عدد باشد **رگرسیون** و اگر دسته باشد **طبقه‌بندی** است.
- **بدون نظارت:** برچسبی نیست و مدل ساختار داده را پیدا می‌کند؛ مانند خوشه‌بندی و کاهش بعد.
- **نیمه‌نظارتی:** مقدار کمی برچسب کنار داده زیاد بدون برچسب.
- **تقویتی:** عامل با آزمون و خطا و دریافت پاداش یاد می‌گیرد.`],
  en: ["Kinds of learning", R`- **Supervised:** data has labels. A numeric output means **regression**, a category means **classification**.
- **Unsupervised:** no labels; the model finds structure, as in clustering and dimensionality reduction.
- **Semi-supervised:** a few labels alongside many unlabeled samples.
- **Reinforcement:** an agent learns by trial, error and reward.`],
  quiz: [Q("پیش‌بینی قیمت خانه از چه نوعی است؟", "Predicting a house price is:", ["طبقه‌بندی", "رگرسیون", "خوشه‌بندی"], ["Classification", "Regression", "Clustering"], 1)]
});

L({ id: "ai-math",
  fa: ["ریاضی لازم، به زبان ساده", R`برای شروع فقط چند ایده لازم است.

- **بردار و ماتریس:** هر نمونه یک بردار و کل داده یک ماتریس است.
- **مشتق و گرادیان:** گرادیان جهت بیشترین افزایش تابع را نشان می‌دهد.
- **میانگین و واریانس:** مرکز و پراکندگی داده.
- **احتمال:** برای بیان عدم قطعیت پیش‌بینی.

ضرب داخلی پایه مدل‌های خطی است:

$$w^Tx=\sum_{i=1}^{n}w_ix_i$$`],
  en: ["The math you need, simply", R`A few ideas are enough to begin.

- **Vectors and matrices:** each sample is a vector and the dataset is a matrix.
- **Derivative and gradient:** the gradient points where a function rises fastest.
- **Mean and variance:** the center and spread of data.
- **Probability:** expresses how uncertain a prediction is.

The dot product is the heart of linear models:

$$w^Tx=\sum_{i=1}^{n}w_ix_i$$`],
  code: [`import numpy as np\n\nw = np.array([0.5, -1.0, 2.0])\nx = np.array([4.0, 1.0, 3.0])\nprint("dot product:", w @ x)\n\nf = lambda t: t ** 2 + 3 * t\nt, h = 2.0, 1e-5\nprint("numerical derivative at 2:", round((f(t + h) - f(t - h)) / (2 * h), 4))\n\ndata = np.array([2, 4, 4, 4, 5, 5, 7, 9])\nprint("mean:", data.mean(), "std:", data.std())`]
});

L({ id: "ai-data",
  fa: ["داده و پیش‌پردازش", R`کیفیت مدل به کیفیت داده وابسته است.

- **مقدار گمشده:** حذف، یا جایگزینی با میانگین یا میانه.
- **داده پرت:** بررسی کن خطای ثبت است یا پدیده واقعی.
- **متغیر دسته‌ای:** با One-Hot به عدد تبدیل می‌شود.
- **مقیاس‌بندی:** برای مدل‌های حساس به فاصله و گرادیان لازم است.

$$z=\frac{x-\mu}{\sigma}$$

!**نشت داده:** پیش‌پردازش را فقط روی داده آموزش fit کن. ~Pipeline~ این کار را خودکار و امن انجام می‌دهد.`],
  en: ["Data and preprocessing", R`A model is only as good as its data.

- **Missing values:** drop them, or fill with the mean or median.
- **Outliers:** check whether they are recording errors or real events.
- **Categorical variables:** convert to numbers with one-hot encoding.
- **Scaling:** needed for models that use distances or gradients.

$$z=\frac{x-\mu}{\sigma}$$

!**Data leakage:** fit preprocessing on training data only. A ~Pipeline~ does this automatically and safely.`],
  code: [`import pandas as pd\nfrom sklearn.compose import make_column_transformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\n\ndf = pd.DataFrame({"age": [25, 32, None, 51], "city": ["A", "B", "A", "C"]})\n\nnumeric = make_pipeline(SimpleImputer(strategy="median"), StandardScaler())\nprep = make_column_transformer((numeric, ["age"]), (OneHotEncoder(), ["city"]))\nprint(prep.fit_transform(df).round(2))`],
  quiz: [Q("نشت داده یعنی چه؟", "What is data leakage?", ["اطلاعات داده آزمون وارد آموزش شود", "حذف فایل داده", "کم بودن حافظه"], ["Test-set information enters training", "Deleting the data file", "Running out of memory"], 0)]
});

L({ id: "ai-split",
  fa: ["تقسیم داده و اعتبارسنجی", R`مدل باید روی داده‌ای ارزیابی شود که ندیده است.

- **آموزش:** یادگیری پارامترها
- **اعتبارسنجی:** انتخاب مدل و تنظیم ابرپارامتر
- **آزمون:** ارزیابی نهایی، فقط یک بار

در **k-Fold** داده به k بخش تقسیم می‌شود و هر بخش یک بار نقش اعتبارسنجی را دارد. در سری زمانی باید ترتیب زمان حفظ شود.`],
  en: ["Splitting data and validation", R`A model must be judged on data it has not seen.

- **Training:** learning the parameters
- **Validation:** choosing models and tuning hyperparameters
- **Test:** the final evaluation, used once

In **k-fold** the data is divided into k parts, and each part serves once as validation. With time series, keep the time order.`],
  code: [`from sklearn.datasets import load_iris\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import cross_val_score, train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\n\nX, y = load_iris(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, stratify=y, random_state=0)\n\nmodel = make_pipeline(StandardScaler(), LogisticRegression(max_iter=500))\nscores = cross_val_score(model, X_tr, y_tr, cv=5)\nprint("CV accuracy:", scores.round(3), "mean:", scores.mean().round(3))\nprint("Test accuracy:", round(model.fit(X_tr, y_tr).score(X_te, y_te), 3))`]
});

L({ id: "ai-overfit",
  fa: ["کم‌برازش و بیش‌برازش", R`- **کم‌برازش:** مدل بیش از حد ساده است و خطای آموزش و آزمون هر دو زیادند.
- **بیش‌برازش:** مدل نویز را حفظ کرده؛ خطای آموزش کم و خطای آزمون زیاد است.

با حرکت اسلایدر درجه را تغییر بده و ببین از جایی به بعد خطای آزمون بالا می‌رود.`],
  en: ["Underfitting and overfitting", R`- **Underfitting:** the model is too simple, so train and test errors are both high.
- **Overfitting:** the model memorized noise, so train error is low and test error is high.

Move the slider and notice that test error starts rising beyond a certain degree.`],
  demo: "poly",
  quiz: [Q("خطای آموزش خیلی کم و خطای آزمون خیلی زیاد نشانه چیست؟", "Very low train error with high test error signals:", ["کم‌برازش", "بیش‌برازش", "مدل کامل"], ["Underfitting", "Overfitting", "A perfect model"], 1)]
});

L({ id: "ai-metrics-reg",
  fa: ["معیارهای رگرسیون", R`$$MAE=\frac{1}{n}\sum|y_i-\hat y_i|\qquad RMSE=\sqrt{\frac{1}{n}\sum(y_i-\hat y_i)^2}$$

$$R^2=1-\frac{\sum(y_i-\hat y_i)^2}{\sum(y_i-\bar y)^2}$$

- **MAE** میانگین اندازه خطا با واحد خروجی است.
- **RMSE** به خطای بزرگ حساس‌تر است.
- **R²** سهم تغییرات توضیح‌داده‌شده است و می‌تواند منفی شود.

!R² برابر ۰٫۹ یعنی ۹۰٪ تغییرات توضیح داده شده؛ نه اینکه ۹۰٪ پیش‌بینی‌ها درست باشند.`],
  en: ["Regression metrics", R`$$MAE=\frac{1}{n}\sum|y_i-\hat y_i|\qquad RMSE=\sqrt{\frac{1}{n}\sum(y_i-\hat y_i)^2}$$

$$R^2=1-\frac{\sum(y_i-\hat y_i)^2}{\sum(y_i-\bar y)^2}$$

- **MAE** is the average error size, in output units.
- **RMSE** is more sensitive to large errors.
- **R²** is the share of variation explained, and it can be negative.

!R² of 0.9 means 90% of the variation is explained, not that 90% of predictions are right.`],
  code: [`import numpy as np\n\ny = np.array([100, 150, 200, 250])\np = np.array([110, 140, 210, 240])\ne = y - p\n\nprint("MAE :", np.mean(np.abs(e)))\nprint("RMSE:", np.sqrt(np.mean(e ** 2)))\nprint("R2  :", 1 - np.sum(e ** 2) / np.sum((y - y.mean()) ** 2))`]
});

L({ id: "ai-metrics-cls",
  fa: ["معیارهای طبقه‌بندی", R`ماتریس اغتشاش چهار حالت دارد: TP و TN درست، FP هشدار کاذب و FN مورد جاافتاده.

$$Precision=\frac{TP}{TP+FP}\qquad Recall=\frac{TP}{TP+FN}$$

$$F_1=\frac{2\cdot Precision\cdot Recall}{Precision+Recall}$$

- وقتی هشدار کاذب گران است، Precision مهم است.
- وقتی جاافتادن گران است، Recall مهم است.
- در داده نامتوازن Accuracy گمراه‌کننده است.

اعداد را تغییر بده و اثرش را روی معیارها ببین.`],
  en: ["Classification metrics", R`A confusion matrix has four cases: TP and TN are correct, FP is a false alarm and FN is a miss.

$$Precision=\frac{TP}{TP+FP}\qquad Recall=\frac{TP}{TP+FN}$$

$$F_1=\frac{2\cdot Precision\cdot Recall}{Precision+Recall}$$

- When false alarms are costly, Precision matters.
- When misses are costly, Recall matters.
- On imbalanced data, Accuracy is misleading.

Change the numbers and watch the metrics respond.`],
  demo: "confusion",
  quiz: [Q("در غربال یک بیماری جدی کدام معیار معمولاً مهم‌تر است؟", "For screening a serious disease, which usually matters most?", ["Precision", "Recall", "حجم فایل"], ["Precision", "Recall", "File size"], 1, "جا افتادن بیمار هزینه زیادی دارد.", "Missing a patient is very costly.")]
});

L({ id: "ai-curse",
  fa: ["نفرین ابعاد", R`اصطلاح **نفرین ابعاد** را ریچارد بلمن در سال ۱۹۵۷ هنگام کار روی برنامه‌ریزی پویا مطرح کرد. با افزایش ویژگی‌ها حجم فضا نمایی رشد می‌کند و داده پراکنده می‌شود.

## نشانه‌ها
- تعداد نمونه به ازای هر ویژگی کم است.
- با افزودن ویژگی دقت کم می‌شود.
- نزدیک‌ترین و دورترین نقطه تقریباً هم‌فاصله می‌شوند.
- مدل‌های فاصله‌محور افت می‌کنند.

## راه‌حل‌ها
انتخاب ویژگی، استخراج ویژگی مثل PCA، منظم‌سازی، داده بیشتر و دانش تخصصی.`],
  en: ["The curse of dimensionality", R`Richard Bellman introduced the term **curse of dimensionality** in 1957 while working on dynamic programming. As features increase, the volume of the space grows exponentially and data becomes sparse.

## Signs
- Few samples per feature.
- Accuracy drops as features are added.
- The nearest and farthest points become almost equally far.
- Distance-based models degrade.

## Remedies
Feature selection, feature extraction such as PCA, regularization, more data, and domain knowledge.`],
  demo: "curse",
  code: [`import numpy as np\nfrom sklearn.datasets import load_wine\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\n\nX, y = load_wine(return_X_y=True)\nrng = np.random.default_rng(0)\nfor extra in [0, 20, 100, 500]:\n    Z = np.hstack([StandardScaler().fit_transform(X), rng.normal(size=(len(X), extra))])\n    acc = cross_val_score(KNeighborsClassifier(5), Z, y, cv=5).mean()\n    print(f"{extra:4d} useless features -> accuracy {acc:.3f}")`]
});
