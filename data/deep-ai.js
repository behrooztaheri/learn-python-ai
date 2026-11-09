M("ai", "found");

X("ai-types", {
  fa: R`## با نظارت و بدون نظارت، کنار هم
| معیار | با نظارت | بدون نظارت |
|---|---|---|
| برچسب خروجی | دارد | ندارد |
| هدف | پیش‌بینی برای داده جدید | کشف ساختار داده |
| نمونه روش | رگرسیون، SVM، درخت | K-Means، DBSCAN، PCA |
| ارزیابی | مقایسه با جواب واقعی | معیارهای داخلی |
| نمونه کاربرد | تشخیص اسپم | بخش‌بندی مشتری |

[[fig:ch5_sup.png|در یادگیری با نظارت، مدل مرز بین کلاس‌های برچسب‌دار را یاد می‌گیرد.]]

[[fig:ch5_unsup.png|در یادگیری بدون نظارت، گروه‌ها بدون برچسب پیدا می‌شوند.]]

## طبقه‌بندی یا رگرسیون؟
| پرسش | طبقه‌بندی | رگرسیون |
|---|---|---|
| خروجی | دسته | عدد |
| مثال | سالم یا بیمار | قیمت یا دما |
| معیار | Accuracy، F1 | MAE، RMSE، R² |

[[fig:ch5_cls_reg.png|طبقه‌بندی مرز می‌سازد و رگرسیون یک تابع عددی برازش می‌کند.]]

!برای انتخاب نوع مسئله بپرس: خروجی نهایی من چه شکلی است؟ یک برچسب یا یک عدد؟`,
  en: R`## Supervised and unsupervised, side by side
| Aspect | Supervised | Unsupervised |
|---|---|---|
| Output labels | Yes | No |
| Goal | Predict for new data | Discover structure |
| Example methods | Regression, SVM, trees | K-Means, DBSCAN, PCA |
| Evaluation | Compare to true answers | Internal metrics |
| Example use | Spam detection | Customer segmentation |

[[fig:ch5_sup.png|In supervised learning, the model learns boundaries between labeled classes.]]

[[fig:ch5_unsup.png|In unsupervised learning, groups are found without labels.]]

## Classification or regression?
| Question | Classification | Regression |
|---|---|---|
| Output | A category | A number |
| Example | Healthy or ill | Price or temperature |
| Metrics | Accuracy, F1 | MAE, RMSE, R² |

[[fig:ch5_cls_reg.png|Classification builds a boundary and regression fits a numeric function.]]

!To choose the problem type, ask: what does my final output look like, a label or a number?`,
  ex: [E("این مسئله‌ها را دسته‌بندی کن: پیش‌بینی فروش ماه بعد، تشخیص ایمیل اسپم، گروه‌بندی مقاله‌ها بدون موضوع.", "Classify these: predicting next month's sales, detecting spam, grouping articles with no topics.", null, "به‌ترتیب رگرسیون، طبقه‌بندی و خوشه‌بندی.", "Respectively regression, classification and clustering.")]
});

X("ai-data", {
  fa: R`## روش برخورد با مقدار گمشده
| روش | چه زمانی | ریسک |
|---|---|---|
| حذف سطر | گمشده بسیار کم و تصادفی | از دست رفتن داده |
| میانگین | داده تقریباً متقارن | کاهش پراکندگی |
| میانه | داده چوله یا دارای پرت | کاهش پراکندگی |
| پرتکرارترین مقدار | متغیر دسته‌ای | سوگیری به کلاس غالب |

## تشخیص داده پرت با IQR
مقدار خارج از بازه زیر را مشکوک بدان:

$$[Q_1-1.5\,IQR,\ Q_3+1.5\,IQR],\quad IQR=Q_3-Q_1$$

[[c:0]]

## مقیاس‌بندی
| روش | فرمول | مناسب برای |
|---|---|---|
| استانداردسازی | $(x-\mu)/\sigma$ | بیشتر مدل‌ها |
| Min-Max | $(x-x_{min})/(x_{max}-x_{min})$ | ورودی با بازه محدود |
| Robust | $(x-median)/IQR$ | داده دارای پرت |

## کدگذاری متغیر دسته‌ای
| روش | چه زمانی |
|---|---|
| One-Hot | دسته‌های بدون ترتیب، مثل شهر |
| Ordinal | دسته‌های دارای ترتیب، مثل کم، متوسط، زیاد |`,
  en: R`## Handling missing values
| Method | When | Risk |
|---|---|---|
| Drop rows | Very few and random | Losing data |
| Mean | Roughly symmetric data | Reduces spread |
| Median | Skewed data or outliers | Reduces spread |
| Most frequent | Categorical variables | Bias toward the main class |

## Detecting outliers with IQR
Treat values outside this range as suspicious:

$$[Q_1-1.5\,IQR,\ Q_3+1.5\,IQR],\quad IQR=Q_3-Q_1$$

[[c:0]]

## Scaling
| Method | Formula | Good for |
|---|---|---|
| Standardization | $(x-\mu)/\sigma$ | Most models |
| Min-Max | $(x-x_{min})/(x_{max}-x_{min})$ | Bounded inputs |
| Robust | $(x-median)/IQR$ | Data with outliers |

## Encoding categories
| Method | When |
|---|---|
| One-Hot | Unordered categories such as city |
| Ordinal | Ordered categories such as low, medium, high |`,
  code: [`import numpy as np\n\nx = np.array([12, 13, 14, 15, 15, 16, 17, 58])\nq1, q3 = np.percentile(x, [25, 75])\niqr = q3 - q1\nlow, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr\nprint("range:", low, high)\nprint("outliers:", x[(x < low) | (x > high)])\nprint("mean:", x.mean(), "median:", np.median(x))`],
  ex: [E("چرا در داده بالا میانه به میانگین ترجیح دارد؟", "Why is the median preferred to the mean for the data above?", null, "یک مقدار پرت (۵۸) میانگین را بالا می‌کشد، ولی میانه تقریباً ثابت می‌ماند.", "One outlier (58) pulls the mean up, while the median barely moves.")]
});

X("ai-split", {
  fa: R`[[fig:kfold.png|در هر دور، یک بخش برای اعتبارسنجی و بقیه برای آموزش است.]]

## کدام روش؟
| روش | چه زمانی |
|---|---|
| ~train_test_split~ | داده زیاد و بررسی سریع |
| ~KFold~ | داده متوسط |
| ~StratifiedKFold~ | طبقه‌بندی، به‌ویژه نامتوازن |
| ~GroupKFold~ | چند نمونه از یک بیمار یا کاربر |
| ~TimeSeriesSplit~ | داده زمانی |

## تنظیم ابرپارامتر
~GridSearchCV~ همه ترکیب‌ها و ~RandomizedSearchCV~ نمونه‌ای تصادفی را می‌آزماید. جستجوی تصادفی وقتی پارامتر زیاد است معمولاً به‌صرفه‌تر است.

!تقسیم تصادفی برای سری زمانی نادرست است، چون مدل از آینده اطلاعات می‌گیرد.`,
  en: R`[[fig:kfold.png|In each round, one part validates and the others train.]]

## Which method?
| Method | When |
|---|---|
| ~train_test_split~ | Lots of data, quick check |
| ~KFold~ | Moderate data |
| ~StratifiedKFold~ | Classification, especially imbalanced |
| ~GroupKFold~ | Several samples per patient or user |
| ~TimeSeriesSplit~ | Time-ordered data |

## Tuning hyperparameters
~GridSearchCV~ tries all combinations and ~RandomizedSearchCV~ tries a random sample. Random search is usually more economical with many parameters.

!A random split is wrong for time series, because the model gains information from the future.`
});

X("ai-overfit", {
  fa: R`[[fig:overfit.png|از چپ به راست: کم‌برازش، برازش مناسب و بیش‌برازش.]]

## موازنه بایاس و واریانس
خطای مورد انتظار روی داده جدید از سه بخش ساخته می‌شود:

$$E[(y-\hat f)^2]=Bias^2+Variance+\sigma^2$$

- **بایاس:** خطای ناشی از ساده بودن مدل.
- **واریانس:** حساسیت مدل به نمونه آموزش.
- $\sigma^2$: نویزی که هیچ مدلی آن را حذف نمی‌کند.

[[fig:bias_variance.png|با افزایش پیچیدگی، بایاس کم و واریانس زیاد می‌شود.]]

## جدول تشخیص
| خطای آموزش | خطای اعتبارسنجی | تشخیص | درمان |
|---|---|---|---|
| زیاد | زیاد | کم‌برازش | مدل قوی‌تر، ویژگی بهتر |
| کم | زیاد | بیش‌برازش | داده بیشتر، منظم‌سازی، مدل ساده‌تر |
| کم | کم | مناسب | آزمون نهایی |

[[fig:curves.png|منحنی یادگیری: جدا شدن منحنی آموزش و اعتبارسنجی نشانه بیش‌برازش است.]]`,
  en: R`[[fig:overfit.png|Left to right: underfitting, a good fit, and overfitting.]]

## The bias-variance trade-off
Expected error on new data has three parts:

$$E[(y-\hat f)^2]=Bias^2+Variance+\sigma^2$$

- **Bias:** error from an overly simple model.
- **Variance:** sensitivity to the training sample.
- $\sigma^2$: noise no model can remove.

[[fig:bias_variance.png|As complexity rises, bias falls and variance grows.]]

## Diagnosis table
| Train error | Validation error | Diagnosis | Remedy |
|---|---|---|---|
| High | High | Underfitting | Stronger model, better features |
| Low | High | Overfitting | More data, regularization, simpler model |
| Low | Low | Good | Final test |

[[fig:curves.png|Learning curves: a growing gap between train and validation signals overfitting.]]`
});

X("ai-metrics-reg", {
  fa: R`## مثال کامل با چهار خانه
| خانه | واقعی y | پیش‌بینی ŷ | خطا | قدرمطلق | مربع |
|---|---|---|---|---|---|
| ۱ | 100 | 110 | −10 | 10 | 100 |
| ۲ | 150 | 140 | 10 | 10 | 100 |
| ۳ | 200 | 210 | −10 | 10 | 100 |
| ۴ | 250 | 240 | 10 | 10 | 100 |

- میانگین قدرمطلق خطا: $MAE=40/4=10$
- میانگین مربعات: $MSE=400/4=100$
- ریشه آن: $RMSE=\sqrt{100}=10$
- میانگین واقعی ۱۷۵ است، پس $\sum(y-\bar y)^2=12500$ و $R^2=1-400/12500=0.968$

## کدام معیار؟
| معیار | بهتر | واحد | چه زمانی |
|---|---|---|---|
| MAE | نزدیک صفر | واحد خروجی | بیان ساده خطا |
| MSE | نزدیک صفر | مربع واحد | تابع هزینه آموزش |
| RMSE | نزدیک صفر | واحد خروجی | خطای بزرگ پرهزینه |
| R² | نزدیک ۱ | بدون واحد | مقایسه با پیش‌بینی میانگین |
| MAPE | نزدیک صفر | درصد | خروجی‌های دور از صفر |

!اگر R² منفی شد، مدل از پیش‌بینی ساده میانگین هم بدتر است.`,
  en: R`## Worked example with four houses
| House | Actual y | Predicted ŷ | Error | Absolute | Square |
|---|---|---|---|---|---|
| 1 | 100 | 110 | −10 | 10 | 100 |
| 2 | 150 | 140 | 10 | 10 | 100 |
| 3 | 200 | 210 | −10 | 10 | 100 |
| 4 | 250 | 240 | 10 | 10 | 100 |

- Mean absolute error: $MAE=40/4=10$
- Mean squared error: $MSE=400/4=100$
- Its root: $RMSE=\sqrt{100}=10$
- The actual mean is 175, so $\sum(y-\bar y)^2=12500$ and $R^2=1-400/12500=0.968$

## Which metric?
| Metric | Better | Unit | When |
|---|---|---|---|
| MAE | Near 0 | Output unit | Simple error statement |
| MSE | Near 0 | Squared unit | Training loss |
| RMSE | Near 0 | Output unit | Large errors are costly |
| R² | Near 1 | None | Comparing with predicting the mean |
| MAPE | Near 0 | Percent | Outputs far from zero |

!A negative R² means the model is worse than simply predicting the mean.`,
  ex: [E("برای y=[3,5,7] و ŷ=[2,5,9] مقدار MAE و RMSE را حساب کن.", "For y=[3,5,7] and ŷ=[2,5,9], compute MAE and RMSE.", `import numpy as np\ny, p = np.array([3, 5, 7]), np.array([2, 5, 9])\nprint(np.mean(abs(y - p)), np.sqrt(np.mean((y - p) ** 2)))`, "MAE = 1 و RMSE ≈ 1.291", "MAE = 1 and RMSE ≈ 1.291")]
});

L({ id: "ai-confusion", after: "ai-metrics-reg",
  fa: ["ماتریس درهم‌ریختگی، کامل", R`ماتریس درهم‌ریختگی (Confusion Matrix) نشان می‌دهد مدل طبقه‌بندی در هر کلاس چند پیش‌بینی درست و نادرست داشته است. فقط گفتن «دقت ۹۰٪» نوع خطا را نمی‌گوید؛ این جدول می‌گوید.

## چهار خانه جدول
فرض کن کلاس **مثبت** چیزی است که دنبالش هستیم، مثلاً بیماری.

| خانه | نام کامل | معنی | در مثال بیماری |
|---|---|---|---|
| TP | True Positive | مثبت واقعی، درست پیدا شد | بیمار، بیمار تشخیص داده شد |
| TN | True Negative | منفی واقعی، درست رد شد | سالم، سالم تشخیص داده شد |
| FP | False Positive، خطای نوع اول | منفی بود، مثبت اعلام شد | سالم، بیمار اعلام شد (هشدار کاذب) |
| FN | False Negative، خطای نوع دوم | مثبت بود، منفی اعلام شد | بیمار، سالم اعلام شد (جاافتادن) |

## مثال عددی
مدلی روی ۱۰۰ تصویر، گربه (مثبت) را از سگ تشخیص می‌دهد:

[[cm:45,5,8,42]]

## محاسبه گام‌به‌گام
| معیار | پرسشی که پاسخ می‌دهد | فرمول | محاسبه | نتیجه |
|---|---|---|---|---|
| Accuracy | چند درصد کل پیش‌بینی‌ها درست بود؟ | $\frac{TP+TN}{کل}$ | $\frac{45+42}{100}$ | 0.870 |
| Precision | از مواردی که مثبت گفتیم، چند درصد واقعاً مثبت بود؟ | $\frac{TP}{TP+FP}$ | $\frac{45}{50}$ | 0.900 |
| Recall | از مثبت‌های واقعی، چند درصد را پیدا کردیم؟ | $\frac{TP}{TP+FN}$ | $\frac{45}{53}$ | 0.849 |
| Specificity | از منفی‌های واقعی، چند درصد را درست رد کردیم؟ | $\frac{TN}{TN+FP}$ | $\frac{42}{47}$ | 0.894 |
| F1 | میانگین هماهنگ Precision و Recall | $\frac{2PR}{P+R}$ | $\frac{2(0.9)(0.849)}{1.749}$ | 0.874 |

## در پایتون
[[c:0]]

## چه زمانی کدام معیار؟
| موقعیت | هزینه بیشتر | معیار کلیدی |
|---|---|---|
| غربال بیماری | جاافتادن بیمار | Recall |
| فیلتر اسپم | حذف ایمیل مهم | Precision |
| تشخیص تقلب | هر دو، داده نامتوازن | F1، منحنی PR |
| کلاس‌های متوازن | یکسان | Accuracy |

## تله داده نامتوازن
اگر ۹۹۰ نفر سالم و ۱۰ نفر بیمار باشند، مدلی که همیشه «سالم» بگوید Accuracy برابر ۰٫۹۹ دارد ولی Recall آن صفر است و حتی یک بیمار را پیدا نمی‌کند.

[[cm:0,0,10,990]]

## ماتریس چندکلاسه
با K کلاس جدول K در K می‌شود: سطر کلاس واقعی و ستون پیش‌بینی (قرارداد scikit-learn). قطر اصلی پیش‌بینی درست است و هر خانه دیگر نشان می‌دهد کدام کلاس با کدام اشتباه می‌شود.

| روش میانگین | معنی |
|---|---|
| macro | میانگین ساده معیار کلاس‌ها؛ همه کلاس‌ها هم‌وزن |
| weighted | میانگین با وزن تعداد نمونه هر کلاس |
| micro | شمارش کل TP و FP و FN |

[[c:1]]

!در scikit-learn ترتیب پیش‌فرض ~[[TN, FP], [FN, TP]]~ است و سطرها کلاس واقعی‌اند. این با جدول بالا فرق دارد، پس همیشه برچسب محورها را بررسی کن.`],
  en: ["The confusion matrix, in full", R`A confusion matrix shows how many correct and wrong predictions a classifier made per class. Saying "90% accurate" does not reveal the kind of error; this table does.

## The four cells
Let the **positive** class be what we are looking for, such as a disease.

| Cell | Full name | Meaning | Disease example |
|---|---|---|---|
| TP | True Positive | Actually positive, found | Ill, diagnosed ill |
| TN | True Negative | Actually negative, rejected | Healthy, diagnosed healthy |
| FP | False Positive, Type I error | Negative, called positive | Healthy, called ill (false alarm) |
| FN | False Negative, Type II error | Positive, called negative | Ill, called healthy (a miss) |

## Numeric example
A model tells cats (positive) from dogs on 100 images:

[[cm:45,5,8,42]]

## Step-by-step calculation
| Metric | Question it answers | Formula | Calculation | Result |
|---|---|---|---|---|
| Accuracy | What share of all predictions was right? | $\frac{TP+TN}{total}$ | $\frac{45+42}{100}$ | 0.870 |
| Precision | Of those we called positive, how many were? | $\frac{TP}{TP+FP}$ | $\frac{45}{50}$ | 0.900 |
| Recall | Of the true positives, how many did we find? | $\frac{TP}{TP+FN}$ | $\frac{45}{53}$ | 0.849 |
| Specificity | Of the true negatives, how many did we reject? | $\frac{TN}{TN+FP}$ | $\frac{42}{47}$ | 0.894 |
| F1 | Harmonic mean of Precision and Recall | $\frac{2PR}{P+R}$ | $\frac{2(0.9)(0.849)}{1.749}$ | 0.874 |

## In Python
[[c:0]]

## Which metric, when?
| Situation | Costlier mistake | Key metric |
|---|---|---|
| Disease screening | Missing a patient | Recall |
| Spam filter | Deleting real mail | Precision |
| Fraud detection | Both, imbalanced data | F1, PR curve |
| Balanced classes | Equal | Accuracy |

## The imbalance trap
With 990 healthy people and 10 ill, a model that always says "healthy" scores 0.99 Accuracy but its Recall is zero: it finds nobody.

[[cm:0,0,10,990]]

## Multi-class matrices
With K classes the table is K by K: rows are true classes and columns are predictions (the scikit-learn convention). The diagonal is correct, and every other cell shows which class is mistaken for which.

| Average | Meaning |
|---|---|
| macro | Plain mean over classes; each class counts equally |
| weighted | Mean weighted by class size |
| micro | Counts all TP, FP and FN globally |

[[c:1]]

!scikit-learn's default layout is ~[[TN, FP], [FN, TP]]~, with true classes in rows. It differs from the table above, so always check the axis labels.`],
  code: [`import numpy as np\nfrom sklearn.metrics import accuracy_score, confusion_matrix, f1_score, precision_score, recall_score\n\n# 1 = cat (positive), 0 = dog\ny_true = np.array([1] * 53 + [0] * 47)\ny_pred = np.array([1] * 45 + [0] * 8 + [1] * 5 + [0] * 42)\n\ntn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()\nprint("TP, FP, FN, TN =", tp, fp, fn, tn)\nprint("accuracy ", accuracy_score(y_true, y_pred))\nprint("precision", precision_score(y_true, y_pred))\nprint("recall   ", round(recall_score(y_true, y_pred), 3))\nprint("f1       ", round(f1_score(y_true, y_pred), 3))`,
    `import matplotlib.pyplot as plt\nfrom sklearn.datasets import load_digits\nfrom sklearn.metrics import ConfusionMatrixDisplay, classification_report\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\n\nX, y = load_digits(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=0)\nm = DecisionTreeClassifier(max_depth=8, random_state=0).fit(X_tr, y_tr)\nprint(classification_report(y_te, m.predict(X_te), digits=3))\nConfusionMatrixDisplay.from_estimator(m, X_te, y_te, cmap="Purples")\nplt.show()`],
  demo: "confusion",
  quiz: [Q("اگر FN زیاد باشد کدام معیار آسیب می‌بیند؟", "A high FN mainly hurts which metric?", ["Precision", "Recall", "Specificity"], null, 1), Q("در خانه FP چه اتفاقی افتاده؟", "What happened in the FP cell?", ["نمونه منفی، مثبت پیش‌بینی شده", "نمونه مثبت، درست پیش‌بینی شده", "نمونه مثبت، منفی پیش‌بینی شده"], ["A negative was predicted positive", "A positive was predicted correctly", "A positive was predicted negative"], 0)],
  ex: [E("با TP=30، FP=10، FN=20، TN=40 همه معیارها را حساب کن.", "With TP=30, FP=10, FN=20, TN=40, compute all metrics.", `tp, fp, fn, tn = 30, 10, 20, 40\nacc = (tp + tn) / (tp + fp + fn + tn)\np, r = tp / (tp + fp), tp / (tp + fn)\nprint(acc, p, r, 2 * p * r / (p + r))`, "Accuracy=0.70، Precision=0.75، Recall=0.60، F1≈0.667", "Accuracy=0.70, Precision=0.75, Recall=0.60, F1≈0.667")]
});

L({ id: "ai-roc", after: "ai-confusion",
  fa: ["آستانه تصمیم، ROC و PR", R`بیشتر طبقه‌بندها یک امتیاز یا احتمال می‌دهند و **آستانه** آن را به برچسب تبدیل می‌کند. با تغییر آستانه، ماتریس درهم‌ریختگی عوض می‌شود.

[[fig:threshold.png|بالا بردن آستانه معمولاً Precision را زیاد و Recall را کم می‌کند.]]

## منحنی ROC
روی هر آستانه نرخ مثبت واقعی را برحسب نرخ مثبت کاذب رسم می‌کند.

$$TPR=\frac{TP}{TP+FN}\qquad FPR=\frac{FP}{FP+TN}$$

**AUC** مساحت زیر منحنی است و احتمال آن است که یک نمونه مثبت تصادفی امتیاز بیشتری از یک نمونه منفی تصادفی بگیرد. مقدار ۰٫۵ معادل حدس تصادفی است.

[[fig:roc_pr.png|منحنی ROC و منحنی Precision-Recall روی داده واقعی سرطان سینه.]]

## ROC یا PR؟
| موقعیت | پیشنهاد |
|---|---|
| کلاس‌ها تقریباً متوازن | ROC |
| کلاس مثبت بسیار کم | PR |

[[c:0]]`],
  en: ["Decision thresholds, ROC and PR", R`Most classifiers output a score or probability, and a **threshold** turns it into a label. Moving the threshold changes the confusion matrix.

[[fig:threshold.png|Raising the threshold usually increases Precision and lowers Recall.]]

## The ROC curve
It plots the true positive rate against the false positive rate at every threshold.

$$TPR=\frac{TP}{TP+FN}\qquad FPR=\frac{FP}{FP+TN}$$

**AUC** is the area under the curve: the probability that a random positive scores above a random negative. A value of 0.5 equals random guessing.

[[fig:roc_pr.png|ROC and precision-recall curves on real breast cancer data.]]

## ROC or PR?
| Situation | Suggestion |
|---|---|
| Roughly balanced classes | ROC |
| Very few positives | PR |

[[c:0]]`],
  code: [`from sklearn.datasets import load_breast_cancer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import average_precision_score, precision_score, recall_score, roc_auc_score\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\n\nX, y = load_breast_cancer(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=0)\nm = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)).fit(X_tr, y_tr)\np = m.predict_proba(X_te)[:, 1]\nprint("ROC AUC:", round(roc_auc_score(y_te, p), 4), "AP:", round(average_precision_score(y_te, p), 4))\nfor t in [0.2, 0.5, 0.8, 0.95]:\n    pred = p >= t\n    print(t, "precision", round(precision_score(y_te, pred), 3), "recall", round(recall_score(y_te, pred), 3))`],
  ex: [E("اگر FN گران‌تر از FP است، آستانه را کمتر از ۰٫۵ می‌گذاری یا بیشتر؟", "If FN costs more than FP, should the threshold go below or above 0.5?", null, "کمتر؛ مدل راحت‌تر مثبت اعلام می‌کند و Recall زیاد می‌شود.", "Below it; the model says positive more easily and Recall rises.")]
});

X("ai-curse", {
  fa: R`## چقدر نمونه لازم است؟
با ۱۰ نقطه در هر محور:

| تعداد بعد | تعداد نمونه |
|---|---|
| ۱ | 10 |
| ۲ | 100 |
| ۳ | 1,000 |
| ۱۰ | 10,000,000,000 |

برای پوشاندن ۱۰٪ حجم یک مکعب واحد در d بعد، ضلع $0.1^{1/d}$ لازم است: در ۱۰ بعد ۰٫۷۹ و در ۱۰۰ بعد ۰٫۹۸. یعنی «همسایگی» تقریباً کل بازه را می‌گیرد.`,
  en: R`## How many samples?
With 10 points per axis:

| Dimensions | Samples |
|---|---|
| 1 | 10 |
| 2 | 100 |
| 3 | 1,000 |
| 10 | 10,000,000,000 |

To cover 10% of a unit cube in d dimensions, the edge must be $0.1^{1/d}$: 0.79 for 10 dimensions and 0.98 for 100. A "neighborhood" spans almost the whole range.`
});
