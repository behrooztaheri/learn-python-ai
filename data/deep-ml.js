X("ai-datasets", {
  fa: R`## چگونه با یک داده جدید آشنا شویم؟
- ابعاد و نوع ستون‌ها را ببین.
- مقدار گمشده و تکراری را بشمار.
- توزیع خروجی را رسم کن.
- همبستگی ورودی‌ها و خروجی را بررسی کن.

!همبستگی زیاد لزوماً به معنی رابطه علت و معلولی نیست.`,
  en: R`## Getting to know a new dataset
- Check the shape and column types.
- Count missing and duplicate rows.
- Plot the output's distribution.
- Check correlations with the output.

!High correlation does not by itself mean cause and effect.`
});

X("ai-linear", {
  fa: R`[[fig:ch5_reg_fit.png|خط‌های نارنجی خطای هر نمونه هستند و مدل مجموع مربع آن‌ها را کمینه می‌کند.]]

## مثال دستی
نقاط $(1,2)$، $(2,4)$ و $(3,5)$ را در نظر بگیر. میانگین‌ها $\bar x=2$ و $\bar y=3.667$ هستند.

| x | y | $x-\bar x$ | $y-\bar y$ | ضرب | مربع $x-\bar x$ |
|---|---|---|---|---|---|
| 1 | 2 | −1 | −1.667 | 1.667 | 1 |
| 2 | 4 | 0 | 0.333 | 0 | 0 |
| 3 | 5 | 1 | 1.333 | 1.333 | 1 |
| جمع | | | | 3 | 2 |

$$b_1=\frac{3}{2}=1.5,\qquad b_0=3.667-1.5\times2=0.667$$

[[c:0]]

## حالت چندمتغیره
با ماتریس X جواب بسته وجود دارد:

$$\hat w=(X^TX)^{-1}X^Ty$$

## تفسیر وزن
اگر $b_1=1.5$ باشد، با یک واحد افزایش x و ثابت بودن بقیه ورودی‌ها، پیش‌بینی ۱٫۵ واحد زیاد می‌شود.

## فرض‌ها و بررسی آن‌ها
| فرض | بررسی |
|---|---|
| رابطه خطی | نمودار باقی‌مانده بدون الگو باشد |
| استقلال خطاها | در داده زمانی بررسی شود |
| واریانس ثابت خطا | پراکندگی باقی‌مانده یکنواخت باشد |
| هم‌خطی کم | ویژگی‌های بسیار هم‌بسته وزن‌ها را ناپایدار می‌کنند |`,
  en: R`[[fig:ch5_reg_fit.png|The orange lines are each sample's error, and the model minimizes the sum of their squares.]]

## Worked by hand
Take the points $(1,2)$, $(2,4)$ and $(3,5)$. The means are $\bar x=2$ and $\bar y=3.667$.

| x | y | $x-\bar x$ | $y-\bar y$ | Product | Square of $x-\bar x$ |
|---|---|---|---|---|---|
| 1 | 2 | −1 | −1.667 | 1.667 | 1 |
| 2 | 4 | 0 | 0.333 | 0 | 0 |
| 3 | 5 | 1 | 1.333 | 1.333 | 1 |
| Sum | | | | 3 | 2 |

$$b_1=\frac{3}{2}=1.5,\qquad b_0=3.667-1.5\times2=0.667$$

[[c:0]]

## Multiple inputs
With a matrix X there is a closed-form solution:

$$\hat w=(X^TX)^{-1}X^Ty$$

## Interpreting a weight
If $b_1=1.5$, then one more unit of x, with other inputs fixed, raises the prediction by 1.5.

## Assumptions and how to check them
| Assumption | Check |
|---|---|
| Linear relation | Residual plot shows no pattern |
| Independent errors | Check with time-ordered data |
| Constant error variance | Residual spread is even |
| Low collinearity | Highly correlated features destabilize weights |`,
  code: [`import numpy as np\n\nX = np.array([[1, 1], [1, 2], [1, 3]], float)\ny = np.array([2, 4, 5], float)\nw = np.linalg.solve(X.T @ X, X.T @ y)\nprint("b0, b1 =", w.round(3))\nprint("predictions:", (X @ w).round(3))`],
  ex: [E("برای نقاط (0,1)، (1,3)، (2,5) ضریب‌ها را دستی حساب و با کد بررسی کن.", "For (0,1), (1,3), (2,5), find the coefficients by hand and check by code.", `import numpy as np\nprint(np.polyfit([0, 1, 2], [1, 3, 5], 1).round(3))`, "شیب ۲ و عرض از مبدأ ۱.", "Slope 2 and intercept 1.")]
});

X("ai-gd", {
  fa: R`[[fig:gd.gif|مسیر واقعی پارامترها روی سطح تابع هزینه.]]

## سه نوع گرادیان کاهشی
| نوع | داده هر گام | مزیت | عیب |
|---|---|---|---|
| Batch | همه داده | پایدار | کند روی داده بزرگ |
| Stochastic | یک نمونه | بسیار سریع | پرنوسان |
| Mini-batch | چند ده نمونه | تعادل خوب | نیاز به تنظیم اندازه دسته |

## یک گام دستی
برای $J(x)=x^2$ با $x=4$ و $\eta=0.1$: گرادیان $2x=8$ است و $x_{new}=4-0.1\times8=3.2$.

| نرخ یادگیری | رفتار |
|---|---|
| خیلی کوچک | پیشرفت بسیار کند |
| مناسب | هم‌گرایی سریع |
| زیاد | نوسان |
| خیلی زیاد | واگرایی |

!همیشه ورودی‌ها را مقیاس‌بندی کن؛ در غیر این صورت سطح هزینه کشیده می‌شود و گرادیان کند حرکت می‌کند.`,
  en: R`[[fig:gd.gif|The real path of the parameters on the cost surface.]]

## Three kinds of gradient descent
| Kind | Data per step | Advantage | Drawback |
|---|---|---|---|
| Batch | All data | Stable | Slow on big data |
| Stochastic | One sample | Very fast | Noisy |
| Mini-batch | Tens of samples | Good balance | Batch size needs tuning |

## One step by hand
For $J(x)=x^2$ with $x=4$ and $\eta=0.1$: the gradient is $2x=8$, so $x_{new}=4-0.1\times8=3.2$.

| Learning rate | Behavior |
|---|---|
| Too small | Very slow progress |
| Good | Fast convergence |
| Large | Oscillation |
| Too large | Divergence |

!Always scale the inputs; otherwise the cost surface stretches and gradient descent crawls.`,
  ex: [E("سه گام گرادیان کاهشی برای $J(x)=x^2$ از $x=5$ با $\\eta=0.2$ را بنویس.", "Write three gradient steps for $J(x)=x^2$ from $x=5$ with $\\eta=0.2$.", `x = 5.0\nfor i in range(3):\n    x = x - 0.2 * 2 * x\n    print(i + 1, round(x, 4))`, "مقادیر 3، 1.8 و 1.08.", "Values 3, 1.8 and 1.08.")]
});

X("ai-poly", {
  fa: R`[[fig:r_poly.png|با افزایش درجه، مدل انعطاف بیشتری پیدا می‌کند.]]

## رشد تعداد ویژگی
تعداد جمله‌ها برای n ورودی و درجه d برابر $\binom{n+d}{d}$ است.

| ورودی n | d=2 | d=3 | d=5 |
|---|---|---|---|
| 2 | 6 | 10 | 21 |
| 10 | 66 | 286 | 3003 |
| 50 | 1326 | 23426 | 3478761 |

!با درجه بالا حتماً منظم‌سازی و مقیاس‌بندی به کار ببر.`,
  en: R`[[fig:r_poly.png|As the degree rises, the model becomes more flexible.]]

## Growth in features
The number of terms for n inputs and degree d is $\binom{n+d}{d}$.

| Inputs n | d=2 | d=3 | d=5 |
|---|---|---|---|
| 2 | 6 | 10 | 21 |
| 10 | 66 | 286 | 3003 |
| 50 | 1326 | 23426 | 3478761 |

!At high degrees, always use regularization and scaling.`
});

X("ai-regularized", {
  fa: R`[[fig:r_ridge.png|قید دایره‌ای Ridge.]]

[[fig:r_lasso.png|گوشه‌های لوزی Lasso روی محورها هستند و وزن صفر می‌سازند.]]

## مقایسه
| ویژگی | Ridge | Lasso | Elastic Net |
|---|---|---|---|
| جریمه | مربع وزن | قدرمطلق وزن | هر دو |
| صفر کردن وزن | به‌ندرت | بله | بله |
| ویژگی هم‌بسته | تقسیم وزن | یکی را نگه می‌دارد | گروهی نگه می‌دارد |
| جواب بسته | دارد | ندارد | ندارد |

## اثر آلفا
| آلفا | نتیجه |
|---|---|
| صفر | همان کمترین مربعات |
| کوچک | جریمه ملایم |
| بزرگ | وزن‌ها نزدیک صفر، خطر کم‌برازش |

[[c:0]]`,
  en: R`[[fig:r_ridge.png|Ridge's circular constraint.]]

[[fig:r_lasso.png|Lasso's diamond has corners on the axes, which produce zero weights.]]

## Comparison
| Property | Ridge | Lasso | Elastic Net |
|---|---|---|---|
| Penalty | Squared weights | Absolute weights | Both |
| Zero weights | Rarely | Yes | Yes |
| Correlated features | Shares weight | Keeps one | Keeps groups |
| Closed form | Yes | No | No |

## The effect of alpha
| Alpha | Result |
|---|---|
| Zero | Plain least squares |
| Small | A gentle penalty |
| Large | Weights near zero, risk of underfitting |

[[c:0]]`,
  code: [`import numpy as np\nfrom sklearn.datasets import load_diabetes\nfrom sklearn.linear_model import LassoCV, RidgeCV\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\n\nX, y = load_diabetes(return_X_y=True)\nridge = make_pipeline(StandardScaler(), RidgeCV(np.logspace(-2, 3, 30))).fit(X, y)\nlasso = make_pipeline(StandardScaler(), LassoCV(cv=5)).fit(X, y)\nprint("Ridge alpha:", round(ridge[-1].alpha_, 3))\nprint("Lasso alpha:", round(lasso[-1].alpha_, 3), "kept:", int((lasso[-1].coef_ != 0).sum()), "of 10")`]
});

X("ai-reg-nonlinear", {
  fa: R`[[fig:r_svr.png|خطای داخل لوله جریمه نمی‌شود و نقاط بیرون بردار پشتیبان‌اند.]]

[[fig:r_tree.png|درخت رگرسیونی تابعی پله‌ای می‌سازد.]]

[[fig:r_forest.png|میانگین درخت‌ها پله‌ها را هموار می‌کند.]]

[[fig:r_knn.png|k کوچک ناهموار و k بزرگ هموار است.]]

## مقایسه مدل‌ها
| مدل | مقیاس‌بندی | تفسیرپذیری | داده بزرگ | برون‌یابی |
|---|---|---|---|---|
| خطی | پیشنهادی | زیاد | عالی | خطی |
| SVR | لازم | کم | ضعیف | محدود |
| درخت | لازم نیست | زیاد | خوب | ندارد |
| جنگل | لازم نیست | متوسط | خوب | ندارد |
| KNN | لازم | کم | ضعیف | ندارد |`,
  en: R`[[fig:r_svr.png|Errors inside the tube are free, and points outside are support vectors.]]

[[fig:r_tree.png|A regression tree builds a step function.]]

[[fig:r_forest.png|Averaging trees smooths the steps.]]

[[fig:r_knn.png|Small k is rough and large k is smooth.]]

## Model comparison
| Model | Scaling | Interpretability | Big data | Extrapolation |
|---|---|---|---|---|
| Linear | Suggested | High | Excellent | Linear |
| SVR | Required | Low | Weak | Limited |
| Tree | Not needed | High | Good | None |
| Forest | Not needed | Medium | Good | None |
| KNN | Required | Low | Weak | None |`
});

X("ai-logistic", {
  fa: R`[[fig:logistic.png|تابع سیگموید و مرز تصمیم خطی.]]

## مثال عددی
با $w=2$، $b=-1$ و $x=1$: امتیاز $z=2(1)-1=1$ است، پس $P=1/(1+e^{-1})=0.731$.

## تابع هزینه
$$J=-\frac{1}{n}\sum\big[y\log\hat y+(1-y)\log(1-\hat y)\big]$$

| y | $\hat y$ | هزینه |
|---|---|---|
| 1 | 0.9 | 0.105 |
| 1 | 0.1 | 2.303 |
| 0 | 0.1 | 0.105 |

پیش‌بینی مطمئن و غلط شدیداً جریمه می‌شود. برای چند کلاس از **Softmax** استفاده می‌شود.

تفسیر وزن: با یک واحد افزایش ورودی، **لگاریتم شانس** به اندازه وزن زیاد می‌شود.`,
  en: R`[[fig:logistic.png|The sigmoid and a linear decision boundary.]]

## Numeric example
With $w=2$, $b=-1$ and $x=1$: the score is $z=2(1)-1=1$, so $P=1/(1+e^{-1})=0.731$.

## The cost function
$$J=-\frac{1}{n}\sum\big[y\log\hat y+(1-y)\log(1-\hat y)\big]$$

| y | $\hat y$ | Cost |
|---|---|---|
| 1 | 0.9 | 0.105 |
| 1 | 0.1 | 2.303 |
| 0 | 0.1 | 0.105 |

Confident wrong predictions are punished heavily. For several classes, **softmax** is used.

Interpreting a weight: one more unit of input raises the **log-odds** by that weight.`
});

X("ai-knn", {
  fa: R`[[fig:knn.png|اثر k بر مرز تصمیم.]]

## فاصله‌ها
| نام | فرمول |
|---|---|
| اقلیدسی | $\sqrt{\sum(x_i-y_i)^2}$ |
| منهتن | $\sum\vert x_i-y_i\vert $ |
| کسینوسی | $1-\frac{x\cdot y}{\Vert x\Vert \Vert y\Vert }$ |

## مثال دستی با k=3
نقطه جدید $(2,2)$ است.

| نمونه | کلاس | فاصله اقلیدسی |
|---|---|---|
| (1,1) | A | 1.41 |
| (2,3) | A | 1.00 |
| (4,4) | B | 2.83 |
| (3,1) | B | 1.41 |
| (6,5) | B | 5.00 |

سه نزدیک‌ترین: $(2,3)$ از A و دو نمونه با فاصله ۱٫۴۱ که یکی A و دیگری B است. رأی ۲ به ۱ برای **A**.`,
  en: R`[[fig:knn.png|The effect of k on the decision boundary.]]

## Distances
| Name | Formula |
|---|---|
| Euclidean | $\sqrt{\sum(x_i-y_i)^2}$ |
| Manhattan | $\sum\vert x_i-y_i\vert $ |
| Cosine | $1-\frac{x\cdot y}{\Vert x\Vert \Vert y\Vert }$ |

## Worked example with k=3
The new point is $(2,2)$.

| Sample | Class | Euclidean distance |
|---|---|---|
| (1,1) | A | 1.41 |
| (2,3) | A | 1.00 |
| (4,4) | B | 2.83 |
| (3,1) | B | 1.41 |
| (6,5) | B | 5.00 |

The three nearest are $(2,3)$ from A and the two at 1.41, one A and one B. The vote is 2 to 1 for **A**.`
});

X("ai-nb", {
  fa: R`## مثال اسپم
| مقدار | عدد |
|---|---|
| P(اسپم) | 0.4 |
| P(غیراسپم) | 0.6 |
| P(کلمه free، اگر اسپم) | 0.5 |
| P(کلمه free، اگر غیراسپم) | 0.1 |

$$P(spam|free)=\frac{0.5\times0.4}{0.5\times0.4+0.1\times0.6}=\frac{0.20}{0.26}=0.769$$

| نوع | مناسب برای |
|---|---|
| GaussianNB | ویژگی عددی |
| MultinomialNB | شمارش کلمات |
| BernoulliNB | ویژگی دودویی |`,
  en: R`## Spam example
| Quantity | Value |
|---|---|
| P(spam) | 0.4 |
| P(not spam) | 0.6 |
| P("free" given spam) | 0.5 |
| P("free" given not spam) | 0.1 |

$$P(spam|free)=\frac{0.5\times0.4}{0.5\times0.4+0.1\times0.6}=\frac{0.20}{0.26}=0.769$$

| Type | Good for |
|---|---|
| GaussianNB | Numeric features |
| MultinomialNB | Word counts |
| BernoulliNB | Binary features |`
});

X("ai-trees", {
  fa: R`[[fig:tree_forest.png|مرز درخت تکی در برابر جنگل تصادفی.]]

## محاسبه کاهش Gini
گره‌ای با ۱۰ نمونه: ۶ مثبت و ۴ منفی. $Gini=1-0.6^2-0.4^2=0.48$.

یک تقسیم، دو فرزند ۵تایی می‌سازد:

| فرزند | مثبت / منفی | Gini |
|---|---|---|
| چپ | 5 / 0 | 0 |
| راست | 1 / 4 | $1-0.04-0.64=0.32$ |

میانگین وزنی برابر $0.5\times0+0.5\times0.32=0.16$ است و کاهش ناخالصی $0.48-0.16=0.32$.

## ابرپارامترها
| پارامتر | اثر |
|---|---|
| ~max_depth~ | محدود کردن عمق |
| ~min_samples_leaf~ | حداقل نمونه هر برگ |
| ~ccp_alpha~ | هرس درخت |`,
  en: R`[[fig:tree_forest.png|A single tree's boundary against a random forest.]]

## Computing the Gini decrease
A node has 10 samples: 6 positive and 4 negative. $Gini=1-0.6^2-0.4^2=0.48$.

A split makes two children of five:

| Child | Positive / negative | Gini |
|---|---|---|
| Left | 5 / 0 | 0 |
| Right | 1 / 4 | $1-0.04-0.64=0.32$ |

The weighted mean is $0.5\times0+0.5\times0.32=0.16$, so the impurity decrease is $0.48-0.16=0.32$.

## Hyperparameters
| Parameter | Effect |
|---|---|
| ~max_depth~ | Limits depth |
| ~min_samples_leaf~ | Minimum samples per leaf |
| ~ccp_alpha~ | Prunes the tree |`
});

X("ai-ensembles", {
  fa: R`| ویژگی | Bagging / جنگل | Boosting |
|---|---|---|
| ساخت مدل‌ها | موازی | پشت سر هم |
| کاهش می‌دهد | واریانس | بایاس و واریانس |
| حساسیت به نویز | کم | بیشتر |
| پارامتر مهم | تعداد درخت، ~max_features~ | نرخ یادگیری، عمق، تعداد مراحل |

در Gradient Boosting هر درخت جدید گرادیان منفی تابع هزینه، یعنی برای MSE همان باقی‌مانده، را یاد می‌گیرد.`,
  en: R`| Property | Bagging / forest | Boosting |
|---|---|---|
| Model building | Parallel | Sequential |
| Reduces | Variance | Bias and variance |
| Noise sensitivity | Low | Higher |
| Key parameters | Trees, ~max_features~ | Learning rate, depth, stages |

In Gradient Boosting, each new tree learns the negative gradient of the loss, which for MSE is the residual.`
});

X("ai-svm", {
  fa: R`[[fig:svm.png|حاشیه بیشینه و مرز غیرخطی با کرنل RBF.]]

$$\min_{w,b}\ \frac{1}{2}\|w\|^2+C\sum_i\max(0,1-y_i(w^Tx_i+b))$$

عرض حاشیه برابر $2/\|w\|$ است؛ پس کوچک کردن وزن حاشیه را بزرگ می‌کند.

| کرنل | فرمول | کاربرد |
|---|---|---|
| خطی | $x^Tz$ | ویژگی زیاد، متن |
| چندجمله‌ای | $(x^Tz+c)^d$ | تعامل ویژگی‌ها |
| RBF | $e^{-\gamma\Vert x-z\Vert ^2}$ | پیش‌فرض خوب |

| پارامتر | مقدار زیاد |
|---|---|
| C | حاشیه سخت‌گیر، خطر بیش‌برازش |
| gamma | اثر محلی، خطر بیش‌برازش |`,
  en: R`[[fig:svm.png|The maximum margin and a non-linear RBF boundary.]]

$$\min_{w,b}\ \frac{1}{2}\|w\|^2+C\sum_i\max(0,1-y_i(w^Tx_i+b))$$

The margin width is $2/\|w\|$, so shrinking the weights widens the margin.

| Kernel | Formula | Use |
|---|---|---|
| Linear | $x^Tz$ | Many features, text |
| Polynomial | $(x^Tz+c)^d$ | Feature interactions |
| RBF | $e^{-\gamma\Vert x-z\Vert ^2}$ | A good default |

| Parameter | When large |
|---|---|
| C | Strict margin, overfitting risk |
| gamma | Local influence, overfitting risk |`
});

X("ai-kmeans", {
  fa: R`[[fig:kmeans.gif|هم‌گرایی K-Means از مراکز اولیه نامناسب.]]

## مثال با شش نقطه و k=2
[[fig:ch5_kmeans6.png|دو خوشه و مرکز آن‌ها.]]

| خوشه | نقطه‌ها | مرکز |
|---|---|---|
| A | (1,1.2)، (0.8,0.9)، (1.5,1.3) | (1.10, 1.13) |
| B | (4,4.2)، (3.8,3.9)، (4.5,4.6) | (4.10, 4.23) |

## محدودیت‌ها
| مشکل | راه‌حل |
|---|---|
| حساس به مقدار اولیه | ~k-means++~ و ~n_init~ |
| خوشه غیرکروی | DBSCAN |
| حساس به پرت | K-Medoids |
| نیاز به تعیین k | روش آرنج و Silhouette |`,
  en: R`[[fig:kmeans.gif|K-Means converging from poor initial centers.]]

## Example with six points and k=2
[[fig:ch5_kmeans6.png|Two clusters and their centers.]]

| Cluster | Points | Center |
|---|---|---|
| A | (1,1.2), (0.8,0.9), (1.5,1.3) | (1.10, 1.13) |
| B | (4,4.2), (3.8,3.9), (4.5,4.6) | (4.10, 4.23) |

## Limitations
| Problem | Remedy |
|---|---|
| Sensitive to initialization | ~k-means++~ and ~n_init~ |
| Non-spherical clusters | DBSCAN |
| Sensitive to outliers | K-Medoids |
| k must be chosen | Elbow and silhouette |`
});

L({ id: "ai-cluster-eval", after: "ai-kmeans",
  fa: ["ارزیابی خوشه‌بندی", R`در خوشه‌بندی برچسب واقعی نداریم، پس کیفیت را با معیارهای داخلی می‌سنجیم.

| معیار | فرمول | بهتر |
|---|---|---|
| WCSS | $\sum_j\sum_{x\in C_j}\Vert x-\mu_j\Vert ^2$ | کمتر |
| Silhouette | $s(i)=\frac{b(i)-a(i)}{\max(a(i),b(i))}$ | نزدیک ۱ |
| Davies-Bouldin | $\frac{1}{k}\sum_i\max_{j\ne i}\frac{S_i+S_j}{M_{ij}}$ | کمتر |

## Silhouette با یک عدد
$a$ میانگین فاصله نقطه تا هم‌خوشه‌ای‌هاست و $b$ میانگین فاصله تا نزدیک‌ترین خوشه دیگر. اگر $a=2$ و $b=5$ باشد:

$$s=\frac{5-2}{5}=0.6$$

| مقدار s | معنی |
|---|---|
| نزدیک ۱ | نقطه در خوشه درست است |
| نزدیک ۰ | نزدیک مرز دو خوشه |
| منفی | احتمالاً در خوشه اشتباه |

[[fig:cluster_eval.png|روش آرنج، میانگین Silhouette و نمودار Silhouette هر نمونه روی داده Iris.]]

[[c:0]]

!اگر برچسب واقعی برای بررسی داشته باشی، از معیارهای خارجی مثل Adjusted Rand Index استفاده کن.`],
  en: ["Evaluating clusters", R`Clustering has no true labels, so quality is measured with internal metrics.

| Metric | Formula | Better |
|---|---|---|
| WCSS | $\sum_j\sum_{x\in C_j}\Vert x-\mu_j\Vert ^2$ | Lower |
| Silhouette | $s(i)=\frac{b(i)-a(i)}{\max(a(i),b(i))}$ | Near 1 |
| Davies-Bouldin | $\frac{1}{k}\sum_i\max_{j\ne i}\frac{S_i+S_j}{M_{ij}}$ | Lower |

## Silhouette with one number
$a$ is the mean distance to the point's own cluster and $b$ is the mean distance to the nearest other cluster. If $a=2$ and $b=5$:

$$s=\frac{5-2}{5}=0.6$$

| Value of s | Meaning |
|---|---|
| Near 1 | The point is in the right cluster |
| Near 0 | Near the border of two clusters |
| Negative | Probably in the wrong cluster |

[[fig:cluster_eval.png|The elbow method, mean silhouette, and silhouette per sample on Iris.]]

[[c:0]]

!When true labels are available for checking, use external metrics such as the Adjusted Rand Index.`],
  code: [`from sklearn.cluster import KMeans\nfrom sklearn.datasets import load_iris\nfrom sklearn.metrics import adjusted_rand_score, davies_bouldin_score, silhouette_score\nfrom sklearn.preprocessing import StandardScaler\n\nd = load_iris()\nX = StandardScaler().fit_transform(d.data)\nfor k in [2, 3, 4]:\n    l = KMeans(k, n_init=10, random_state=0).fit_predict(X)\n    print(k, round(silhouette_score(X, l), 3), round(davies_bouldin_score(X, l), 3), round(adjusted_rand_score(d.target, l), 3))`]
});

X("ai-hier-dbscan", {
  fa: R`[[fig:ch5_algos.png|روی داده هلالی فقط DBSCAN شکل واقعی را پیدا می‌کند.]]

## روش‌های اتصال در سلسله‌مراتبی
| اتصال | فاصله دو خوشه |
|---|---|
| Single | نزدیک‌ترین دو نقطه |
| Complete | دورترین دو نقطه |
| Average | میانگین فاصله‌ها |
| Ward | کمترین افزایش واریانس |

## انواع نقطه در DBSCAN
| نوع | تعریف |
|---|---|
| هسته | حداقل ~min_samples~ نقطه در فاصله ~eps~ |
| مرزی | نزدیک هسته ولی خودش هسته نیست |
| نویز | نه هسته و نه مرزی |

برای انتخاب ~eps~ فاصله تا kامین همسایه را مرتب و رسم کن و محل شکستگی را بردار.`,
  en: R`[[fig:ch5_algos.png|On moon-shaped data, only DBSCAN finds the true shape.]]

## Linkage in hierarchical clustering
| Linkage | Distance between clusters |
|---|---|
| Single | The two nearest points |
| Complete | The two farthest points |
| Average | The mean distance |
| Ward | The smallest increase in variance |

## Point types in DBSCAN
| Type | Definition |
|---|---|
| Core | At least ~min_samples~ points within ~eps~ |
| Border | Near a core point, not core itself |
| Noise | Neither core nor border |

To choose ~eps~, sort and plot the distance to the k-th neighbor and take the bend.`
});

X("ai-pca", {
  fa: R`[[fig:pca.png|داده ۶۴بعدی ارقام و درصد واریانس تجمعی.]]

## مراحل
- داده را میانگین صفر و معمولاً استاندارد کن.
- ماتریس کوواریانس را بساز.
- بردارها و مقدارهای ویژه را پیدا کن.
- مقدار ویژه‌ها را مرتب و k بردار اول را انتخاب کن.
- داده را روی آن‌ها تصویر کن.

## مثال دو بعدی
اگر کوواریانس $\begin{bmatrix}2&1\\1&2\end{bmatrix}$ باشد، مقدار ویژه‌ها ۳ و ۱ هستند. پس مؤلفه اول $3/(3+1)=75\%$ واریانس را دارد.

[[c:0]]`,
  en: R`[[fig:pca.png|The 64-dimensional digits data and cumulative variance.]]

## Steps
- Center the data, and usually standardize it.
- Build the covariance matrix.
- Find eigenvectors and eigenvalues.
- Sort the eigenvalues and keep the first k vectors.
- Project the data onto them.

## A 2-D example
If the covariance is $\begin{bmatrix}2&1\\1&2\end{bmatrix}$, the eigenvalues are 3 and 1. So the first component holds $3/(3+1)=75\%$ of the variance.

[[c:0]]`,
  code: [`import numpy as np\n\nvalues, vectors = np.linalg.eigh(np.array([[2.0, 1.0], [1.0, 2.0]]))\norder = values.argsort()[::-1]\nprint("eigenvalues:", values[order])\nprint("first direction:", vectors[:, order[0]].round(3))\nprint("variance ratio:", (values[order] / values.sum()).round(3))`]
});
