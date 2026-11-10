// Regression, one lesson per model. Replaces the older combined lessons.
DROP("ai-linear", "ai-poly", "ai-regularized", "ai-reg-nonlinear");
M("ai", "regression");

L({ id: "ai-reg-what", before: "ai-datasets",
  fa: ["رگرسیون چیست؟", R`## ایده در یک نگاه
**رگرسیون** یعنی پیش‌بینی یک **عدد پیوسته**: قیمت خانه، دمای فردا، میزان فروش ماه بعد، یا نمره یک دانشجو. ورودی‌ها را **ویژگی** ($x$) و خروجی را **هدف** ($y$) می‌نامیم. مدل تابعی مثل $\hat y=f(x)$ یاد می‌گیرد که تا حد ممکن به $y$ واقعی نزدیک باشد.

| سؤال | نوع مسئله |
|---|---|
| قیمت این خانه چند است؟ | رگرسیون (عدد) |
| این ایمیل اسپم است یا نه؟ | طبقه‌بندی (برچسب) |
| فروش هفته بعد چقدر است؟ | رگرسیون |
| این عکس گربه است یا سگ؟ | طبقه‌بندی |

[[fig:ch5_cls_reg.png|تفاوت رگرسیون (پیش‌بینی عدد) و طبقه‌بندی (پیش‌بینی برچسب).]]

## مراحل هر پروژه رگرسیون
- **شناخت داده:** چند نمونه و چند ویژگی داریم؟ داده گمشده هست؟
- **تقسیم داده:** بخشی برای آموزش و بخشی برای آزمون.
- **انتخاب مدل:** از ساده (خطی) شروع کن.
- **آموزش:** مدل پارامترهایش را طوری تنظیم می‌کند که خطا کم شود.
- **ارزیابی:** با معیارهایی مثل MAE، RMSE و $R^2$ روی داده آزمون.
- **بهبود:** مدل یا ویژگی‌های بهتر، تنظیم هایپرپارامترها.

## خطا را چطور اندازه بگیریم؟
اختلاف پیش‌بینی و مقدار واقعی را **باقی‌مانده** یا خطا می‌نامیم: $e_i=y_i-\hat y_i$.

| معیار | فرمول | معنی |
|---|---|---|
| MAE | $\frac1n\sum\vert y_i-\hat y_i\vert$ | میانگین اندازه خطا، با واحد خود داده |
| MSE | $\frac1n\sum(y_i-\hat y_i)^2$ | خطاهای بزرگ را بیشتر جریمه می‌کند |
| RMSE | $\sqrt{MSE}$ | مثل MSE ولی با واحد خود داده |
| $R^2$ | $1-\frac{\sum(y_i-\hat y_i)^2}{\sum(y_i-\bar y)^2}$ | چه سهمی از تغییرات $y$ توضیح داده شده (۱ یعنی کامل) |

!$R^2=0$ یعنی مدل بهتر از «همیشه میانگین را بگو» نیست. $R^2$ منفی یعنی حتی بدتر از آن.

## مدل‌هایی که در این بخش می‌بینیم
| مدل | ایده اصلی | درس |
|---|---|---|
| خطی ساده و چندگانه | یک خط یا صفحه | دو درس بعدی |
| چندجمله‌ای | منحنی با توان‌های $x$ | چندجمله‌ای |
| Ridge، Lasso، Elastic Net | خطی + جریمه برای ضرایب بزرگ | سه درس جدا |
| KNN | میانگین نزدیک‌ترین همسایه‌ها | KNN |
| درخت تصمیم | پرسش‌های بله/خیر پشت سر هم | درخت |
| جنگل تصادفی | میانگین درخت‌های زیاد | جنگل |
| گرادیان بوستینگ | درخت‌هایی که خطای قبلی را اصلاح می‌کنند | بوستینگ |
| SVR | لوله‌ای به پهنای ε دور داده | SVR |

[[lab:reg_all]]

اول با آزمایشگاه بالا بازی کن: مدل را عوض کن و ببین هر مدل چه شکلی از منحنی می‌سازد. در درس‌های بعدی هر مدل را دقیق یاد می‌گیری.

[[c:0]]`],
  en: ["What is regression?", R`## The idea in one look
**Regression** means predicting a **continuous number**: a house price, tomorrow's temperature, next month's sales, or a student's grade. The inputs are **features** ($x$) and the output is the **target** ($y$). The model learns a function $\hat y=f(x)$ that comes as close as possible to the real $y$.

| Question | Kind of problem |
|---|---|
| What is this house's price? | Regression (a number) |
| Is this email spam? | Classification (a label) |
| How much will we sell next week? | Regression |
| Is this photo a cat or a dog? | Classification |

[[fig:ch5_cls_reg.png|Regression predicts a number; classification predicts a label.]]

## Steps of every regression project
- **Know the data:** how many samples and features? Any missing values?
- **Split the data:** one part for training and one part for testing.
- **Choose a model:** start simple (linear).
- **Train:** the model sets its parameters to make the error small.
- **Evaluate:** with MAE, RMSE and $R^2$ on the test data.
- **Improve:** better models or features, tuned hyperparameters.

## How do we measure error?
The difference between the real value and the prediction is the **residual**: $e_i=y_i-\hat y_i$.

| Metric | Formula | Meaning |
|---|---|---|
| MAE | $\frac1n\sum\vert y_i-\hat y_i\vert$ | Average size of the error, in the data's own unit |
| MSE | $\frac1n\sum(y_i-\hat y_i)^2$ | Punishes large errors more |
| RMSE | $\sqrt{MSE}$ | Like MSE but in the data's unit |
| $R^2$ | $1-\frac{\sum(y_i-\hat y_i)^2}{\sum(y_i-\bar y)^2}$ | Share of the variation in $y$ that is explained (1 = perfect) |

!$R^2=0$ means the model is no better than "always predict the mean". A negative $R^2$ is even worse.

## Models in this section
| Model | Main idea | Lesson |
|---|---|---|
| Simple and multiple linear | A line or a plane | Next two lessons |
| Polynomial | A curve with powers of $x$ | Polynomial |
| Ridge, Lasso, Elastic Net | Linear + a penalty on large coefficients | Three separate lessons |
| KNN | Average of the nearest neighbors | KNN |
| Decision tree | A chain of yes/no questions | Tree |
| Random forest | Average of many trees | Forest |
| Gradient boosting | Trees that fix the previous errors | Boosting |
| SVR | A tube of width ε around the data | SVR |

[[lab:reg_all]]

Play with the lab first: switch the model and see what kind of curve each one draws. The next lessons explain every model in detail.

[[c:0]]`],
  code: [`import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

y_true = np.array([200, 250, 310, 400, 520])   # real prices
y_pred = np.array([210, 240, 330, 380, 500])   # model predictions

print("Residuals:", y_true - y_pred)
print("MAE :", mean_absolute_error(y_true, y_pred))
print("MSE :", mean_squared_error(y_true, y_pred))
print("RMSE:", round(mean_squared_error(y_true, y_pred) ** 0.5, 2))
print("R2  :", round(r2_score(y_true, y_pred), 4))

# A model that always predicts the mean has R2 = 0
print("R2 of the mean:", r2_score(y_true, np.full(5, y_true.mean())))`],
  ex: [E("MAE و RMSE را برای مقادیر واقعی [3, 5, 7] و پیش‌بینی [4, 5, 9] با دست حساب کن و با کد بررسی کن.", "Compute MAE and RMSE by hand for real values [3, 5, 7] and predictions [4, 5, 9], then check with code.",
    `import numpy as np\ny, p = np.array([3, 5, 7]), np.array([4, 5, 9])\nprint("MAE", np.mean(abs(y - p)))\nprint("RMSE", np.sqrt(np.mean((y - p) ** 2)))`, "خطاها ۱، ۰ و ۲ هستند. MAE = 1 و RMSE = √(5/3) ≈ 1.29.", "The errors are 1, 0 and 2. MAE = 1 and RMSE = √(5/3) ≈ 1.29.")],
  quiz: [Q("پیش‌بینی «تعداد مشتری فردا» چه نوع مسئله‌ای است؟", "Predicting tomorrow's number of customers is which kind of problem?", ["رگرسیون", "طبقه‌بندی", "خوشه‌بندی"], ["Regression", "Classification", "Clustering"], 0, "خروجی یک عدد است.", "The output is a number."),
    Q("R² منفی یعنی چه؟", "What does a negative R² mean?", ["مدل از پیش‌بینی میانگین هم بدتر است", "مدل کامل است", "خطا صفر است"], ["The model is worse than predicting the mean", "The model is perfect", "The error is zero"], 0)]
});

L({ id: "ai-linear", before: "ai-gd",
  fa: ["رگرسیون خطی ساده", R`## ایده در یک نگاه
فرض کن می‌خواهی قیمت خانه را از روی متراژ حدس بزنی. اگر نقاط داده تقریباً روی یک خط باشند، بهترین خط را پیدا می‌کنیم:

$$\hat y = b + w\,x$$

- $w$ (**شیب** یا وزن): با یک واحد افزایش $x$، پیش‌بینی چقدر تغییر می‌کند.
- $b$ (**عرض از مبدأ**): مقدار پیش‌بینی وقتی $x=0$.

## «بهترین» خط کدام است؟
خطی که **مجموع مربعات خطا** کمترین باشد. به این روش **کمترین مربعات** (Least Squares) می‌گوییم:

$$J(w,b)=\frac1n\sum_{i=1}^{n}\big(y_i-(b+w x_i)\big)^2$$

چرا مربع؟ چون خطاهای مثبت و منفی همدیگر را خنثی نمی‌کنند، خطای بزرگ جریمه بیشتری می‌گیرد، و جواب یک فرمول بسته دارد.

[[fig:lin_simple.png|چپ: خط کمترین مربعات و باقی‌مانده‌ها (خطوط نارنجی). راست: نمودار باقی‌مانده؛ اگر الگو نداشته باشد، مدل خطی مناسب است.]]

## فرمول بسته
با مشتق گرفتن از $J$ و برابر صفر قرار دادن:

$$w=\frac{\sum(x_i-\bar x)(y_i-\bar y)}{\sum(x_i-\bar x)^2},\qquad b=\bar y-w\bar x$$

## یک مثال کامل با دست
متراژ (۱۰ متر مربع) و قیمت (میلیارد):

| $x$ | $y$ | $x-\bar x$ | $y-\bar y$ | $(x-\bar x)(y-\bar y)$ | $(x-\bar x)^2$ |
|---|---|---|---|---|---|
| 5 | 3 | -2 | -2 | 4 | 4 |
| 6 | 4 | -1 | -1 | 1 | 1 |
| 7 | 5 | 0 | 0 | 0 | 0 |
| 8 | 5 | 1 | 0 | 0 | 1 |
| 9 | 8 | 2 | 3 | 6 | 4 |
| میانگین 7 | میانگین 5 | | | جمع 11 | جمع 10 |

پس $w=11/10=1.1$ و $b=5-1.1\times7=-2.7$. مدل: $\hat y=-2.7+1.1x$. برای خانه ۱۰۰ متری ($x=10$): $\hat y=8.3$ میلیارد.

[[c:0]]

## آزمایشگاه: خودت خط را بساز
[[lab:reg_linear]]

در آزمایشگاه دوم روی بوم کلیک کن تا نقطه اضافه شود و ببین یک نقطه دور (داده پرت) چطور خط را به سمت خودش می‌کشد:

[[lab:linreg]]

## فرض‌های مدل خطی (LINE)
| فرض | یعنی | اگر برقرار نباشد |
|---|---|---|
| **L**inearity | رابطه واقعاً خطی است | از چندجمله‌ای یا درخت استفاده کن |
| **I**ndependence | نمونه‌ها مستقل‌اند | در سری زمانی مراقب باش |
| **N**ormality | خطاها تقریباً نرمال‌اند | بازه‌های اطمینان نادرست می‌شوند |
| **E**qual variance | پراکندگی خطا ثابت است | تبدیل لگاریتمی $y$ را امتحان کن |

!رگرسیون خطی به **داده پرت** حساس است، چون خطا به توان ۲ می‌رسد. اگر داده پرت داری، ~HuberRegressor~ را امتحان کن.

## با scikit-learn
[[c:1]]

## مزایا و معایب
| مزایا | معایب |
|---|---|
| خیلی سریع و ساده | فقط رابطه خطی را می‌بیند |
| ضرایب قابل تفسیرند | به داده پرت حساس است |
| نقطه شروع خوب برای مقایسه | با ویژگی‌های همبسته ناپایدار می‌شود |`],
  en: ["Simple linear regression", R`## The idea in one look
Suppose you want to guess a house's price from its size. If the data points lie roughly on a line, we look for the best line:

$$\hat y = b + w\,x$$

- $w$ (the **slope** or weight): how much the prediction changes when $x$ grows by one unit.
- $b$ (the **intercept**): the prediction when $x=0$.

## Which line is "best"?
The line with the smallest **sum of squared errors**. This is called **least squares**:

$$J(w,b)=\frac1n\sum_{i=1}^{n}\big(y_i-(b+w x_i)\big)^2$$

Why squares? Positive and negative errors do not cancel, large errors get a larger penalty, and the answer has a closed formula.

[[fig:lin_simple.png|Left: the least squares line and the residuals (orange). Right: the residual plot; if it shows no pattern, a linear model fits.]]

## The closed formula
Take the derivatives of $J$ and set them to zero:

$$w=\frac{\sum(x_i-\bar x)(y_i-\bar y)}{\sum(x_i-\bar x)^2},\qquad b=\bar y-w\bar x$$

## A full example by hand
Size (tens of square meters) and price (billions):

| $x$ | $y$ | $x-\bar x$ | $y-\bar y$ | $(x-\bar x)(y-\bar y)$ | $(x-\bar x)^2$ |
|---|---|---|---|---|---|
| 5 | 3 | -2 | -2 | 4 | 4 |
| 6 | 4 | -1 | -1 | 1 | 1 |
| 7 | 5 | 0 | 0 | 0 | 0 |
| 8 | 5 | 1 | 0 | 0 | 1 |
| 9 | 8 | 2 | 3 | 6 | 4 |
| mean 7 | mean 5 | | | sum 11 | sum 10 |

So $w=11/10=1.1$ and $b=5-1.1\times7=-2.7$. The model is $\hat y=-2.7+1.1x$. For a 100 m² house ($x=10$): $\hat y=8.3$ billion.

[[c:0]]

## Lab: build the line yourself
[[lab:reg_linear]]

In the second lab, click the canvas to add points and see how one far-away point (an outlier) pulls the line toward itself:

[[lab:linreg]]

## Assumptions of the linear model (LINE)
| Assumption | Meaning | If it fails |
|---|---|---|
| **L**inearity | The relation really is linear | Use a polynomial or a tree |
| **I**ndependence | Samples are independent | Take care with time series |
| **N**ormality | Errors are roughly normal | Confidence intervals become wrong |
| **E**qual variance | The error spread is constant | Try a log transform of $y$ |

!Linear regression is sensitive to **outliers**, because the error is squared. If you have outliers, try ~HuberRegressor~.

## With scikit-learn
[[c:1]]

## Pros and cons
| Pros | Cons |
|---|---|
| Very fast and simple | Only sees linear relations |
| Coefficients can be interpreted | Sensitive to outliers |
| A good baseline for comparison | Unstable with correlated features |`],
  code: [`import numpy as np

# The worked example from the table, computed from the formula
x = np.array([5, 6, 7, 8, 9])
y = np.array([3, 4, 5, 5, 8])

w = np.sum((x - x.mean()) * (y - y.mean())) / np.sum((x - x.mean()) ** 2)
b = y.mean() - w * x.mean()
print(f"w = {w:.2f}, b = {b:.2f}")
print("Prediction for x = 10:", b + w * 10)

residuals = y - (b + w * x)
print("Residuals:", residuals.round(2), " sum =", residuals.sum().round(10))`,
`import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

rng = np.random.default_rng(0)
size = rng.uniform(50, 200, 60)                      # square meters
price = 0.9 + 0.045 * size + rng.normal(0, 0.8, 60)   # billions

X = size.reshape(-1, 1)          # scikit-learn wants a 2-D table of features
model = LinearRegression().fit(X, price)
print("slope w     =", model.coef_[0].round(4))
print("intercept b =", model.intercept_.round(3))
print("MAE =", round(mean_absolute_error(price, model.predict(X)), 3))
print("R2  =", round(r2_score(price, model.predict(X)), 3))
print("Price of a 120 m2 house:", model.predict([[120]]).round(2))

plt.scatter(size, price, s=15)
xs = np.array([[50], [200]])
plt.plot(xs, model.predict(xs), color="C1", lw=3)
plt.xlabel("size (m2)"); plt.ylabel("price"); plt.title("Simple linear regression")
plt.show()`],
  ex: [E("در کد اول، یک نقطه پرت (x=7, y=15) اضافه کن. w و b چقدر تغییر می‌کنند؟", "In the first code, add an outlier (x=7, y=15). How much do w and b change?",
    `import numpy as np\nx = np.array([5, 6, 7, 8, 9, 7])\ny = np.array([3, 4, 5, 5, 8, 15])\nw = np.sum((x - x.mean()) * (y - y.mean())) / np.sum((x - x.mean()) ** 2)\nb = y.mean() - w * x.mean()\nprint(w, b)`, "شیب تقریباً ثابت می‌ماند (چون x=7 وسط است) ولی b بالا می‌رود؛ کل خط به سمت نقطه پرت کشیده می‌شود.", "The slope stays about the same (x=7 is in the middle), but b rises: the whole line is pulled toward the outlier."),
    E("با LinearRegression، رابطه سال‌های تجربه [1,2,3,5,8] و حقوق [30,35,41,50,66] را مدل کن و حقوق ۱۰ سال تجربه را پیش‌بینی کن.", "With LinearRegression, model experience [1,2,3,5,8] against salary [30,35,41,50,66] and predict the salary for 10 years.",
    `from sklearn.linear_model import LinearRegression\nimport numpy as np\nX = np.array([1, 2, 3, 5, 8]).reshape(-1, 1)\ny = [30, 35, 41, 50, 66]\nm = LinearRegression().fit(X, y)\nprint(m.coef_, m.intercept_, m.predict([[10]]))`)],
  quiz: [Q("در مدل ŷ = 2 + 3x، اگر x یک واحد زیاد شود ŷ چقدر تغییر می‌کند؟", "In ŷ = 2 + 3x, how much does ŷ change when x grows by one?", ["3", "2", "5"], ["3", "2", "5"], 0, "شیب همین را می‌گوید.", "That is what the slope means."),
    Q("چرا در کمترین مربعات خطا را به توان ۲ می‌رسانیم؟", "Why does least squares square the errors?", ["تا خطاهای مثبت و منفی همدیگر را خنثی نکنند", "تا محاسبه کندتر شود", "تا داده پرت اثر کمتری داشته باشد"], ["So positive and negative errors do not cancel", "To make it slower", "So outliers matter less"], 0, "توان ۲ در واقع اثر داده پرت را بیشتر می‌کند.", "Squaring actually makes outliers matter more.")]
});

L({ id: "ai-multi", before: "ai-gd",
  fa: ["رگرسیون خطی چندگانه", R`## ایده در یک نگاه
در دنیای واقعی قیمت خانه فقط به متراژ بستگی ندارد؛ تعداد اتاق، سن بنا و فاصله تا مترو هم مهم‌اند. با چند ویژگی، مدل خطی این شکل را دارد:

$$\hat y=b+w_1x_1+w_2x_2+\dots+w_dx_d$$

با دو ویژگی، مدل به جای خط یک **صفحه** است:

[[fig:lin_multi.png|با دو ویژگی، مدل خطی یک صفحه در فضای سه‌بعدی است.]]

## شکل ماتریسی
اگر ستونی از ۱ به داده اضافه کنیم، $X$ ماتریس $n\times(d+1)$ و $\mathbf w$ بردار ضرایب است:

$$\hat{\mathbf y}=X\mathbf w,\qquad \mathbf w^*=(X^\top X)^{-1}X^\top\mathbf y$$

به فرمول دوم **معادله نرمال** می‌گویند. وقتی تعداد ویژگی‌ها خیلی زیاد است، به جای وارون کردن ماتریس از گرادیان کاهشی (درس بعد) استفاده می‌کنیم.

| تعداد ویژگی | روش مناسب |
|---|---|
| کم تا چند هزار | معادله نرمال یا ~LinearRegression~ |
| خیلی زیاد یا داده خیلی بزرگ | گرادیان کاهشی، ~SGDRegressor~ |

## تفسیر ضرایب
$w_j$ یعنی: «اگر $x_j$ یک واحد زیاد شود **و بقیه ویژگی‌ها ثابت بمانند**، پیش‌بینی $w_j$ واحد تغییر می‌کند.»

!ضرایب را فقط وقتی با هم مقایسه کن که ویژگی‌ها **مقیاس‌بندی** شده باشند. ضریب «متراژ به متر» و «متراژ به سانتی‌متر» صد برابر فرق دارد ولی اهمیتشان یکی است.

## مثال: داده دیابت
داده Diabetes ده ویژگی دارد (سن، جنس، BMI، فشار خون و شش آزمایش خون) و هدف، پیشرفت بیماری یک سال بعد است.

[[c:0]]

## هم‌خطی (Multicollinearity)
اگر دو ویژگی خیلی به هم وابسته باشند (مثلاً متراژ و تعداد اتاق)، مدل نمی‌داند اثر را به کدام بدهد: ضرایب ناپایدار می‌شوند و حتی علامتشان برعکس می‌شود، هرچند پیش‌بینی خوب می‌ماند.

| نشانه | ابزار تشخیص | راه حل |
|---|---|---|
| ضرایب با تغییر کوچک داده عوض می‌شوند | ماتریس همبستگی | حذف یکی از ویژگی‌ها |
| علامت ضریب غیرمنطقی است | VIF بزرگ‌تر از ۵ تا ۱۰ | Ridge (درس‌های بعد) |
| | | PCA |

[[c:1]]

## ویژگی‌های دسته‌ای
ستونی مثل «شهر» عدد نیست. با **One-Hot** برای هر شهر یک ستون ۰/۱ می‌سازیم. یکی از ستون‌ها را حذف می‌کنیم (~drop="first"~) تا هم‌خطی کامل پیش نیاید.

[[c:2]]`],
  en: ["Multiple linear regression", R`## The idea in one look
In real life a house price depends on more than its size: the number of rooms, the age of the building and the distance to the metro matter too. With several features, the linear model is:

$$\hat y=b+w_1x_1+w_2x_2+\dots+w_dx_d$$

With two features the model is a **plane** instead of a line:

[[fig:lin_multi.png|With two features, the linear model is a plane in 3-D space.]]

## The matrix form
Add a column of ones to the data; then $X$ is an $n\times(d+1)$ matrix and $\mathbf w$ is the coefficient vector:

$$\hat{\mathbf y}=X\mathbf w,\qquad \mathbf w^*=(X^\top X)^{-1}X^\top\mathbf y$$

The second formula is the **normal equation**. With very many features, we use gradient descent (next lesson) instead of inverting the matrix.

| Number of features | Suitable method |
|---|---|
| Few up to a few thousand | Normal equation or ~LinearRegression~ |
| Very many, or huge data | Gradient descent, ~SGDRegressor~ |

## Interpreting the coefficients
$w_j$ means: "if $x_j$ grows by one unit **and the other features stay the same**, the prediction changes by $w_j$."

!Compare coefficients only after **scaling** the features. The coefficient of "size in meters" and "size in centimeters" differ by a factor of 100, yet they are equally important.

## Example: the diabetes data
The Diabetes data has ten features (age, sex, BMI, blood pressure and six blood tests). The target is disease progression one year later.

[[c:0]]

## Multicollinearity
If two features depend strongly on each other (for example size and number of rooms), the model cannot decide which one deserves the effect. The coefficients become unstable and may even flip sign, although the predictions stay good.

| Symptom | How to detect | Remedy |
|---|---|---|
| Coefficients change with small data changes | Correlation matrix | Drop one of the features |
| A coefficient has a nonsensical sign | VIF above 5 to 10 | Ridge (next lessons) |
| | | PCA |

[[c:1]]

## Categorical features
A column like "city" is not a number. **One-hot** encoding makes a 0/1 column for each city. We drop one column (~drop="first"~) to avoid perfect collinearity.

[[c:2]]`],
  code: [`import numpy as np
import pandas as pd
from sklearn.datasets import load_diabetes
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error

data = load_diabetes(as_frame=True)
X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)

model = LinearRegression().fit(X_tr, y_tr)
coef = pd.Series(model.coef_, index=X.columns).sort_values()
print(coef.round(1))
print("Test MAE:", round(mean_absolute_error(y_te, model.predict(X_te)), 1))
print("Test R2 :", round(r2_score(y_te, model.predict(X_te)), 3))

# The same answer from the normal equation
A = np.c_[np.ones(len(X_tr)), X_tr]
w = np.linalg.solve(A.T @ A, A.T @ y_tr)
print("Same intercept?", np.isclose(w[0], model.intercept_))`,
`import numpy as np
import pandas as pd
from sklearn.datasets import load_diabetes
from sklearn.linear_model import LinearRegression

X = load_diabetes(as_frame=True).data
print(X.corr().round(2).loc[["s1", "s2", "s3", "s4"], ["s1", "s2", "s3", "s4"]])

# Variance inflation factor: VIF_j = 1 / (1 - R2 of x_j predicted from the other features)
vif = {}
for col in X.columns:
    others = X.drop(columns=col)
    r2 = LinearRegression().fit(others, X[col]).score(others, X[col])
    vif[col] = 1 / (1 - r2)
print(pd.Series(vif).round(1).sort_values(ascending=False))`,
`import pandas as pd
from sklearn.compose import make_column_transformer
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import OneHotEncoder

df = pd.DataFrame({
    "size": [80, 120, 95, 150, 60, 110],
    "city": ["Tehran", "Shiraz", "Tehran", "Tabriz", "Shiraz", "Tabriz"],
    "price": [9.5, 7.8, 10.6, 9.0, 4.1, 6.9],
})
prep = make_column_transformer((OneHotEncoder(drop="first"), ["city"]), remainder="passthrough")
model = make_pipeline(prep, LinearRegression()).fit(df[["size", "city"]], df["price"])
print(prep.get_feature_names_out())
print(model[-1].coef_.round(3))
print(model.predict(pd.DataFrame({"size": [100], "city": ["Tehran"]})).round(2))`],
  ex: [E("در داده دیابت فقط با سه ویژگی bmi، bp و s5 مدل بساز. R² آزمون چقدر کم می‌شود؟", "On the diabetes data, use only bmi, bp and s5. How much does the test R² drop?",
    `from sklearn.datasets import load_diabetes\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\nd = load_diabetes(as_frame=True)\nX = d.data[["bmi", "bp", "s5"]]\nX_tr, X_te, y_tr, y_te = train_test_split(X, d.target, test_size=0.25, random_state=0)\nprint(LinearRegression().fit(X_tr, y_tr).score(X_te, y_te))`, "R² فقط کمی کم می‌شود؛ بیشتر اطلاعات در همین سه ویژگی است.", "R² drops only a little; most of the information is in these three features.")],
  quiz: [Q("VIF بزرگ نشانه چیست؟", "What does a large VIF indicate?", ["هم‌خطی", "بیش‌برازش", "داده گمشده"], ["Multicollinearity", "Overfitting", "Missing data"], 0),
    Q("ضریب w_j در مدل چندگانه چه می‌گوید؟", "What does w_j say in a multiple model?", ["اثر x_j وقتی بقیه ثابت‌اند", "همبستگی x_j با y", "اهمیت x_j بدون توجه به مقیاس"], ["The effect of x_j with the others held fixed", "The correlation of x_j with y", "The importance of x_j regardless of scale"], 0)]
});

L({ id: "ai-poly", before: "ap-regression",
  fa: ["رگرسیون چندجمله‌ای", R`## ایده در یک نگاه
وقتی رابطه منحنی است (مثلاً مصرف سوخت بر حسب سرعت)، یک خط کافی نیست. ترفند ساده: ویژگی‌های جدید $x^2, x^3, \dots$ می‌سازیم و **همان رگرسیون خطی** را روی آن‌ها اجرا می‌کنیم:

$$\hat y=b+w_1x+w_2x^2+\dots+w_dx^d$$

مدل نسبت به $x$ منحنی است، ولی نسبت به ضرایب $w$ هنوز خطی است؛ برای همین همان روش کمترین مربعات کار می‌کند.

## درجه را چطور انتخاب کنیم؟
| درجه | نتیجه |
|---|---|
| خیلی کم (۱) | **کم‌برازش**: منحنی را نمی‌بیند؛ خطای آموزش و آزمون هر دو زیاد |
| مناسب (۳ تا ۵ برای سینوس) | خطای آزمون کمینه |
| خیلی زیاد (۱۵) | **بیش‌برازش**: از تک‌تک نقاط می‌گذرد؛ خطای آموزش کم ولی آزمون زیاد |

[[fig:overfit.png|کم‌برازش، برازش مناسب و بیش‌برازش.]]

[[lab:reg_poly]]

در آزمایشگاه درجه را از ۱ تا ۱۵ ببر و RMSE آموزش و آزمون را یادداشت کن. خطای آموزش همیشه کم می‌شود ولی خطای آزمون اول کم و بعد زیاد می‌شود. این همان **منحنی اعتبارسنجی** است:

[[c:0]]

## چند ویژگی و ضرب‌ها
با دو ویژگی و درجه ۲، ~PolynomialFeatures~ این‌ها را می‌سازد: $x_1, x_2, x_1^2, x_1x_2, x_2^2$. جمله $x_1x_2$ **اثر متقابل** است: اثر یک ویژگی به مقدار دیگری بستگی دارد.

| ویژگی اولیه | درجه | تعداد ستون جدید |
|---|---|---|
| 2 | 2 | 5 |
| 10 | 2 | 65 |
| 10 | 3 | 285 |

!تعداد ستون‌ها سریع زیاد می‌شود. با درجه بالا همیشه مقیاس‌بندی و منظم‌سازی (Ridge یا Lasso، درس‌های بعد) لازم است.

[[c:1]]

[[fig:r_poly.png|رگرسیون چندجمله‌ای روی داده واقعی.]]`],
  en: ["Polynomial regression", R`## The idea in one look
When the relation is curved (for example fuel use against speed), a line is not enough. A simple trick: build new features $x^2, x^3, \dots$ and run **the same linear regression** on them:

$$\hat y=b+w_1x+w_2x^2+\dots+w_dx^d$$

The model is curved in $x$ but still linear in the coefficients $w$, so least squares still works.

## How do we choose the degree?
| Degree | Result |
|---|---|
| Too low (1) | **Underfitting**: misses the curve; train and test error both high |
| Suitable (3 to 5 for a sine) | Lowest test error |
| Too high (15) | **Overfitting**: passes through every point; low train error, high test error |

[[fig:overfit.png|Underfitting, a good fit and overfitting.]]

[[lab:reg_poly]]

In the lab, move the degree from 1 to 15 and write down the train and test RMSE. The train error always goes down, but the test error first falls and then rises. That is the **validation curve**:

[[c:0]]

## Several features and products
With two features and degree 2, ~PolynomialFeatures~ builds $x_1, x_2, x_1^2, x_1x_2, x_2^2$. The term $x_1x_2$ is an **interaction**: the effect of one feature depends on the value of the other.

| Original features | Degree | New columns |
|---|---|---|
| 2 | 2 | 5 |
| 10 | 2 | 65 |
| 10 | 3 | 285 |

!The number of columns grows fast. With a high degree you always need scaling and regularization (Ridge or Lasso, next lessons).

[[c:1]]

[[fig:r_poly.png|Polynomial regression on real data.]]`],
  code: [`import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import mean_squared_error

rng = np.random.default_rng(1)
x = rng.uniform(0, 1, 30); y = np.sin(2 * np.pi * x) + rng.normal(0, 0.25, 30)
xt = rng.uniform(0, 1, 200); yt = np.sin(2 * np.pi * xt) + rng.normal(0, 0.25, 200)

degrees = range(1, 16)
train, test = [], []
for d in degrees:
    m = make_pipeline(PolynomialFeatures(d), LinearRegression()).fit(x[:, None], y)
    train.append(mean_squared_error(y, m.predict(x[:, None])))
    test.append(mean_squared_error(yt, m.predict(xt[:, None])))

best = degrees[int(np.argmin(test))]
print("Best degree on the test data:", best)
plt.plot(degrees, train, "o-", label="train")
plt.plot(degrees, test, "o-", label="test")
plt.yscale("log"); plt.xlabel("degree"); plt.ylabel("MSE"); plt.legend()
plt.title("Validation curve"); plt.show()`,
`import numpy as np
from sklearn.preprocessing import PolynomialFeatures

X = np.array([[2, 3]])
p = PolynomialFeatures(degree=2, include_bias=False)
print(p.fit_transform(X))
print(p.get_feature_names_out(["x1", "x2"]))
print("10 features, degree 3 ->", PolynomialFeatures(3, include_bias=False).fit(np.zeros((1, 10))).n_output_features_, "columns")`],
  ex: [E("با cross_val_score و ۵ تا، درجه بهینه را برای همان داده سینوسی پیدا کن.", "Use cross_val_score with 5 folds to find the best degree for the same sine data.",
    `import numpy as np\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import PolynomialFeatures\nrng = np.random.default_rng(1)\nx = rng.uniform(0, 1, 60); y = np.sin(2 * np.pi * x) + rng.normal(0, 0.25, 60)\nfor d in range(1, 11):\n    s = cross_val_score(make_pipeline(PolynomialFeatures(d), LinearRegression()), x[:, None], y, cv=5, scoring="neg_mean_squared_error")\n    print(d, round(-s.mean(), 4))`)],
  quiz: [Q("رگرسیون چندجمله‌ای نسبت به چه چیزی خطی است؟", "Polynomial regression is linear in what?", ["ضرایب w", "ورودی x", "هیچ‌کدام"], ["The coefficients w", "The input x", "Neither"], 0),
    Q("خطای آموزش کم و خطای آزمون زیاد یعنی:", "Low train error and high test error means:", ["بیش‌برازش", "کم‌برازش", "مدل عالی"], ["Overfitting", "Underfitting", "A great model"], 0)]
});

L({ id: "ai-ridge", before: "ap-regression",
  fa: ["رگرسیون Ridge (منظم‌سازی L2)", R`## ایده در یک نگاه
در بیش‌برازش، ضرایب مدل خیلی بزرگ می‌شوند (مثلاً ۸۰۰۰+ و ۷۹۹۰−) تا منحنی از همه نقاط بگذرد. Ridge به تابع هزینه یک **جریمه** برای ضرایب بزرگ اضافه می‌کند:

$$J(\mathbf w)=\underbrace{\sum_i(y_i-\hat y_i)^2}_{\text{error}}+\alpha\underbrace{\sum_j w_j^2}_{\text{L2 penalty}}$$

- $\alpha=0$: همان رگرسیون خطی معمولی.
- $\alpha$ بزرگ: ضرایب به سمت صفر کوچک می‌شوند و منحنی صاف‌تر می‌شود.
- $\alpha$ خیلی بزرگ: همه ضرایب تقریباً صفر؛ مدل فقط میانگین را می‌گوید (کم‌برازش).

!جریمه روی $b$ (عرض از مبدأ) اعمال نمی‌شود.

## فرمول بسته
$$\mathbf w^*=(X^\top X+\alpha I)^{-1}X^\top\mathbf y$$

اضافه شدن $\alpha I$ ماتریس را همیشه وارون‌پذیر می‌کند. برای همین Ridge درمان خوبی برای **هم‌خطی** هم هست.

## مسیر ضرایب
وقتی $\alpha$ را زیاد می‌کنیم، همه ضرایب **به‌آرامی** کوچک می‌شوند ولی هیچ‌کدام دقیقاً صفر نمی‌شود:

[[fig:ridge_path.png|مسیر ضرایب Ridge روی داده دیابت.]]

## آزمایشگاه
چندجمله‌ای درجه ۱۲ را با $\alpha$ های مختلف ببین. وقتی $\alpha$ خیلی کوچک است منحنی دیوانه‌وار نوسان می‌کند و ضرایب (نمودار میله‌ای) بزرگ‌اند:

[[lab:reg_ridge]]

## مقیاس‌بندی واجب است
جریمه $\sum w_j^2$ با همه ضرایب یکسان رفتار می‌کند. اگر یک ویژگی بر حسب متر و دیگری بر حسب میلی‌متر باشد، جریمه عادلانه نیست. پس همیشه قبل از Ridge از ~StandardScaler~ استفاده کن.

[[c:0]]

## انتخاب α با اعتبارسنجی
~RidgeCV~ چند مقدار α را با اعتبارسنجی متقاطع امتحان می‌کند:

[[c:1]]

| هایپرپارامتر | اثر | مقدار معمول برای شروع |
|---|---|---|
| ~alpha~ | قدرت جریمه | 0.1 تا 100، روی مقیاس لگاریتمی جستجو کن |
| ~solver~ | روش حل | ~auto~ |

## مقایسه با رگرسیون خطی
| | خطی | Ridge |
|---|---|---|
| بیش‌برازش با ویژگی زیاد | زیاد | کمتر |
| هم‌خطی | ضرایب ناپایدار | ضرایب پایدار |
| انتخاب ویژگی | ندارد | ندارد (ضرایب صفر نمی‌شوند) |
| نیاز به مقیاس‌بندی | خیر | **بله** |`],
  en: ["Ridge regression (L2 regularization)", R`## The idea in one look
When a model overfits, its coefficients become huge (say +8000 and −7990) so the curve can pass through every point. Ridge adds a **penalty** on large coefficients to the cost:

$$J(\mathbf w)=\underbrace{\sum_i(y_i-\hat y_i)^2}_{\text{error}}+\alpha\underbrace{\sum_j w_j^2}_{\text{L2 penalty}}$$

- $\alpha=0$: ordinary linear regression.
- Large $\alpha$: coefficients shrink toward zero and the curve becomes smoother.
- Very large $\alpha$: all coefficients are nearly zero and the model just predicts the mean (underfitting).

!The intercept $b$ is not penalized.

## The closed formula
$$\mathbf w^*=(X^\top X+\alpha I)^{-1}X^\top\mathbf y$$

Adding $\alpha I$ makes the matrix always invertible. That is why Ridge is also a good cure for **multicollinearity**.

## The coefficient path
As $\alpha$ grows, all coefficients shrink **smoothly**, but none becomes exactly zero:

[[fig:ridge_path.png|Ridge coefficient paths on the diabetes data.]]

## Lab
See a degree-12 polynomial with different values of $\alpha$. When $\alpha$ is tiny the curve swings wildly and the coefficients (bar chart) are large:

[[lab:reg_ridge]]

## Scaling is required
The penalty $\sum w_j^2$ treats all coefficients the same. If one feature is in meters and another in millimeters, the penalty is unfair. So always use ~StandardScaler~ before Ridge.

[[c:0]]

## Choosing α by cross-validation
~RidgeCV~ tries several values of α with cross-validation:

[[c:1]]

| Hyperparameter | Effect | Typical start |
|---|---|---|
| ~alpha~ | Strength of the penalty | 0.1 to 100; search on a log scale |
| ~solver~ | How it is solved | ~auto~ |

## Compared with linear regression
| | Linear | Ridge |
|---|---|---|
| Overfitting with many features | High | Lower |
| Multicollinearity | Unstable coefficients | Stable coefficients |
| Feature selection | No | No (coefficients do not become zero) |
| Needs scaling | No | **Yes** |`],
  code: [`import numpy as np
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler

rng = np.random.default_rng(1)
x = rng.uniform(0, 1, 20)[:, None]
y = np.sin(2 * np.pi * x.ravel()) + rng.normal(0, 0.2, 20)

for name, reg in [("Linear", LinearRegression()), ("Ridge a=0.001", Ridge(0.001)), ("Ridge a=1", Ridge(1)), ("Ridge a=100", Ridge(100))]:
    m = make_pipeline(PolynomialFeatures(12, include_bias=False), StandardScaler(), reg).fit(x, y)
    w = m[-1].coef_
    print(f"{name:14s} largest |w| = {abs(w).max():12.2f}   sum of w^2 = {np.sum(w ** 2):14.2f}")`,
`import numpy as np
from sklearn.datasets import load_diabetes
from sklearn.linear_model import RidgeCV
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_diabetes(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
model = make_pipeline(StandardScaler(), RidgeCV(alphas=np.logspace(-3, 3, 30))).fit(X_tr, y_tr)
print("Chosen alpha:", round(model[-1].alpha_, 3))
print("Test R2:", round(model.score(X_te, y_te), 3))`],
  ex: [E("Ridge را با فرمول بسته (X^T X + αI)^-1 X^T y روی داده دیابت مقیاس‌شده پیاده کن و با sklearn مقایسه کن.", "Implement Ridge with the closed formula on the scaled diabetes data and compare with scikit-learn.",
    `import numpy as np\nfrom sklearn.datasets import load_diabetes\nfrom sklearn.linear_model import Ridge\nfrom sklearn.preprocessing import StandardScaler\nX, y = load_diabetes(return_X_y=True)\nX = StandardScaler().fit_transform(X); yc = y - y.mean()\nalpha = 10\nw = np.linalg.solve(X.T @ X + alpha * np.eye(X.shape[1]), X.T @ yc)\nprint(np.allclose(w, Ridge(alpha).fit(X, y).coef_))`, "باید True چاپ شود. توجه کن که y را مرکزی کردیم چون عرض از مبدأ جریمه نمی‌شود.", "It should print True. We centered y because the intercept is not penalized.")],
  quiz: [Q("با α خیلی بزرگ در Ridge چه می‌شود؟", "What happens with a very large α in Ridge?", ["ضرایب نزدیک صفر و کم‌برازش", "بیش‌برازش", "ضرایب دقیقاً صفر و انتخاب ویژگی"], ["Coefficients near zero, underfitting", "Overfitting", "Exactly zero coefficients and feature selection"], 0),
    Q("چرا قبل از Ridge مقیاس‌بندی لازم است؟", "Why scale before Ridge?", ["چون جریمه با همه ضرایب یکسان رفتار می‌کند", "چون Ridge فقط عدد صحیح می‌پذیرد", "لازم نیست"], ["Because the penalty treats all coefficients alike", "Because Ridge accepts only integers", "It is not needed"], 0)]
});

L({ id: "ai-lasso", before: "ap-regression",
  fa: ["رگرسیون Lasso (منظم‌سازی L1)", R`## ایده در یک نگاه
Lasso هم ضرایب بزرگ را جریمه می‌کند، ولی با **قدر مطلق** به جای مربع:

$$J(\mathbf w)=\frac{1}{2n}\sum_i(y_i-\hat y_i)^2+\alpha\sum_j\vert w_j\vert$$

این تفاوت کوچک نتیجه بزرگی دارد: Lasso بسیاری از ضرایب را **دقیقاً صفر** می‌کند. یعنی خودش ویژگی‌های بی‌فایده را کنار می‌گذارد؛ **انتخاب ویژگی خودکار**.

## چرا صفر می‌شود؟ (تصویر هندسی)
جواب جایی است که منحنی‌های تراز خطا (بیضی‌های نارنجی) به ناحیه مجاز ضرایب برخورد می‌کنند. ناحیه L2 دایره است و برخورد معمولاً جایی است که هر دو ضریب غیرصفرند. ناحیه L1 لوزی است و **گوشه‌هایش روی محورها** هستند؛ برخورد اغلب در گوشه رخ می‌دهد، یعنی یکی از ضرایب صفر است.

[[fig:l1_l2.png|چپ: Ridge (دایره). راست: Lasso (لوزی) که در گوشه، w1 را صفر می‌کند.]]

## چطور حل می‌شود؟ (کاهش مختصاتی)
قدر مطلق در صفر مشتق ندارد، پس فرمول بسته وجود ندارد. scikit-learn هر بار یک ضریب را بهینه می‌کند و از **آستانه نرم** استفاده می‌کند:

$$w_j\leftarrow S(\rho_j,\alpha)=\text{sign}(\rho_j)\max(\vert\rho_j\vert-\alpha,0)$$

که $\rho_j$ همبستگی ویژگی $j$ با باقی‌مانده فعلی است. اگر $\vert\rho_j\vert\le\alpha$ باشد، ضریب دقیقاً صفر می‌شود.

| $\rho_j$ | $\alpha$ | ضریب جدید |
|---|---|---|
| 3.0 | 1.0 | 2.0 |
| 0.6 | 1.0 | 0 |
| −2.5 | 1.0 | −1.5 |

## مسیر ضرایب
با زیاد شدن $\alpha$ ضرایب **یکی‌یکی** صفر می‌شوند. آخرین ضرایبی که زنده می‌مانند، مهم‌ترین ویژگی‌ها هستند:

[[fig:lasso_path.png|مسیر Lasso روی داده دیابت.]]

[[lab:reg_lasso]]

در آزمایشگاه، $\alpha$ را زیاد کن و تعداد «ضرایب غیرصفر» را دنبال کن. میله‌های خاکستری ضرایبی هستند که صفر شده‌اند.

[[c:0]]

## Lasso یا Ridge؟
| موقعیت | انتخاب بهتر |
|---|---|
| فکر می‌کنی فقط چند ویژگی واقعاً مهم‌اند | Lasso |
| همه ویژگی‌ها کمی اثر دارند | Ridge |
| ویژگی‌های خیلی همبسته داری | Ridge یا Elastic Net (Lasso یکی را تصادفی برمی‌دارد) |
| ویژگی‌ها از نمونه‌ها بیشترند | Lasso حداکثر n ویژگی انتخاب می‌کند؛ Elastic Net بهتر است |

[[c:1]]`],
  en: ["Lasso regression (L1 regularization)", R`## The idea in one look
Lasso also penalizes large coefficients, but with the **absolute value** instead of the square:

$$J(\mathbf w)=\frac{1}{2n}\sum_i(y_i-\hat y_i)^2+\alpha\sum_j\vert w_j\vert$$

This small change has a big effect: Lasso sets many coefficients to **exactly zero**. It drops useless features by itself: **automatic feature selection**.

## Why exactly zero? (the geometric picture)
The solution is where the error contours (orange ellipses) first touch the allowed region of coefficients. The L2 region is a circle, and the touch point usually has both coefficients non-zero. The L1 region is a diamond whose **corners lie on the axes**; the touch often happens at a corner, where one coefficient is zero.

[[fig:l1_l2.png|Left: Ridge (circle). Right: Lasso (diamond), which sets w1 to zero at a corner.]]

## How is it solved? (coordinate descent)
The absolute value has no derivative at zero, so there is no closed formula. scikit-learn optimizes one coefficient at a time using **soft thresholding**:

$$w_j\leftarrow S(\rho_j,\alpha)=\text{sign}(\rho_j)\max(\vert\rho_j\vert-\alpha,0)$$

where $\rho_j$ is the correlation of feature $j$ with the current residual. If $\vert\rho_j\vert\le\alpha$, the coefficient becomes exactly zero.

| $\rho_j$ | $\alpha$ | New coefficient |
|---|---|---|
| 3.0 | 1.0 | 2.0 |
| 0.6 | 1.0 | 0 |
| −2.5 | 1.0 | −1.5 |

## The coefficient path
As $\alpha$ grows, coefficients drop to zero **one by one**. The last survivors are the most important features:

[[fig:lasso_path.png|Lasso path on the diabetes data.]]

[[lab:reg_lasso]]

In the lab, raise $\alpha$ and follow the number of "non-zero coefficients". Grey bars are coefficients that became zero.

[[c:0]]

## Lasso or Ridge?
| Situation | Better choice |
|---|---|
| You think only a few features really matter | Lasso |
| All features have a small effect | Ridge |
| Strongly correlated features | Ridge or Elastic Net (Lasso picks one at random) |
| More features than samples | Lasso picks at most n features; Elastic Net is better |

[[c:1]]`],
  code: [`import numpy as np
import pandas as pd
from sklearn.datasets import load_diabetes
from sklearn.linear_model import Lasso
from sklearn.preprocessing import StandardScaler

d = load_diabetes(as_frame=True)
X = StandardScaler().fit_transform(d.data); y = d.target
table = {}
for a in [0.01, 1, 5, 20, 50]:
    table[f"alpha={a}"] = Lasso(alpha=a).fit(X, y).coef_
coef = pd.DataFrame(table, index=d.data.columns).round(1)
print(coef)
print("Non-zero per alpha:", (coef != 0).sum().to_dict())`,
`import numpy as np
from sklearn.datasets import load_diabetes
from sklearn.linear_model import LassoCV
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

d = load_diabetes(as_frame=True)
X_tr, X_te, y_tr, y_te = train_test_split(d.data, d.target, test_size=0.25, random_state=0)
m = make_pipeline(StandardScaler(), LassoCV(cv=5, random_state=0)).fit(X_tr, y_tr)
print("Chosen alpha:", round(m[-1].alpha_, 3))
print("Kept features:", list(d.data.columns[m[-1].coef_ != 0]))
print("Test R2:", round(m.score(X_te, y_te), 3))`],
  ex: [E("تابع آستانه نرم soft(rho, alpha) را بنویس و جدول درس را با آن بازتولید کن.", "Write soft(rho, alpha) and reproduce the table in the lesson.",
    `import numpy as np\ndef soft(rho, alpha):\n    return np.sign(rho) * max(abs(rho) - alpha, 0)\nfor r in [3.0, 0.6, -2.5]:\n    print(r, soft(r, 1.0))`),
    E("۵۰ ویژگی تصادفی بی‌فایده به داده دیابت اضافه کن. Lasso چند تا از آن‌ها را نگه می‌دارد؟", "Add 50 useless random features to the diabetes data. How many does Lasso keep?",
    `import numpy as np\nfrom sklearn.datasets import load_diabetes\nfrom sklearn.linear_model import LassoCV\nfrom sklearn.preprocessing import StandardScaler\nX, y = load_diabetes(return_X_y=True)\nnoise = np.random.default_rng(0).normal(size=(len(X), 50))\nXa = StandardScaler().fit_transform(np.c_[X, noise])\nm = LassoCV(cv=5, random_state=0).fit(Xa, y)\nprint("real kept:", np.sum(m.coef_[:10] != 0), " noise kept:", np.sum(m.coef_[10:] != 0))`, "بیشتر ستون‌های نویز صفر می‌شوند؛ این همان انتخاب ویژگی است.", "Most noise columns get zero weight: that is feature selection.")],
  quiz: [Q("تفاوت اصلی Lasso با Ridge؟", "The main difference between Lasso and Ridge?", ["Lasso ضرایب را دقیقاً صفر می‌کند", "Lasso نیاز به مقیاس‌بندی ندارد", "Lasso فرمول بسته دارد"], ["Lasso sets coefficients to exactly zero", "Lasso needs no scaling", "Lasso has a closed formula"], 0),
    Q("اگر |ρ| = 0.4 و α = 0.5 باشد، ضریب Lasso چقدر می‌شود؟", "If |ρ| = 0.4 and α = 0.5, what is the Lasso coefficient?", ["0", "0.1", "0.9"], ["0", "0.1", "0.9"], 0)]
});

L({ id: "ai-enet", before: "ap-regression",
  fa: ["رگرسیون Elastic Net", R`## ایده در یک نگاه
Elastic Net ترکیبی از Ridge و Lasso است:

$$J=\frac{1}{2n}\sum(y_i-\hat y_i)^2+\alpha\Big(\rho\sum\vert w_j\vert+\frac{1-\rho}{2}\sum w_j^2\Big)$$

- $\rho$ همان ~l1_ratio~ است: ۱ یعنی Lasso خالص، ۰ یعنی Ridge خالص.
- از Lasso: ضرایب صفر و انتخاب ویژگی.
- از Ridge: پایداری با ویژگی‌های همبسته.

## مشکلی که حل می‌کند
فرض کن سه ویژگی تقریباً یکسان داری (مثلاً دما به سلسیوس، فارنهایت و کلوین). Lasso یکی را تصادفی نگه می‌دارد و دو تای دیگر را صفر می‌کند؛ با تغییر کوچک داده ممکن است دیگری را انتخاب کند. Elastic Net هر سه را **با هم** نگه می‌دارد و وزن را بینشان تقسیم می‌کند (**اثر گروهی**).

[[c:0]]

[[fig:enet_path.png|مسیر ضرایب Elastic Net با l1_ratio = 0.5.]]

[[lab:reg_enet]]

در آزمایشگاه، ~l1_ratio~ را از ۰ به ۱ ببر: تعداد ضرایب صفر بیشتر می‌شود.

## جدول مقایسه سه روش
| | Ridge | Lasso | Elastic Net |
|---|---|---|---|
| جریمه | $\sum w^2$ | $\sum\vert w\vert$ | هر دو |
| ضریب صفر | خیر | بله | بله |
| ویژگی‌های همبسته | تقسیم وزن | یکی را برمی‌دارد | تقسیم وزن |
| هایپرپارامتر | α | α | α و l1_ratio |
| فرمول بسته | دارد | ندارد | ندارد |

## تنظیم دو هایپرپارامتر
~ElasticNetCV~ هر دو را با اعتبارسنجی جستجو می‌کند:

[[c:1]]

!در عمل، اگر نمی‌دانی کدام روش، Elastic Net با ~l1_ratio~ در [0.1, 0.5, 0.9, 1] انتخاب امنی است.`],
  en: ["Elastic Net regression", R`## The idea in one look
Elastic Net combines Ridge and Lasso:

$$J=\frac{1}{2n}\sum(y_i-\hat y_i)^2+\alpha\Big(\rho\sum\vert w_j\vert+\frac{1-\rho}{2}\sum w_j^2\Big)$$

- $\rho$ is ~l1_ratio~: 1 means pure Lasso, 0 means pure Ridge.
- From Lasso: zero coefficients and feature selection.
- From Ridge: stability with correlated features.

## The problem it solves
Suppose you have three nearly identical features (say temperature in Celsius, Fahrenheit and Kelvin). Lasso keeps one at random and zeroes the other two, and a small change in the data may make it choose another. Elastic Net keeps all three **together** and shares the weight among them (the **grouping effect**).

[[c:0]]

[[fig:enet_path.png|Elastic Net coefficient paths with l1_ratio = 0.5.]]

[[lab:reg_enet]]

In the lab, move ~l1_ratio~ from 0 to 1: more coefficients become zero.

## The three methods side by side
| | Ridge | Lasso | Elastic Net |
|---|---|---|---|
| Penalty | $\sum w^2$ | $\sum\vert w\vert$ | Both |
| Zero coefficients | No | Yes | Yes |
| Correlated features | Shares the weight | Picks one | Shares the weight |
| Hyperparameters | α | α | α and l1_ratio |
| Closed formula | Yes | No | No |

## Tuning two hyperparameters
~ElasticNetCV~ searches both with cross-validation:

[[c:1]]

!In practice, if you are unsure which method to use, Elastic Net with ~l1_ratio~ in [0.1, 0.5, 0.9, 1] is a safe choice.`],
  code: [`import numpy as np
from sklearn.linear_model import Lasso, ElasticNet

rng = np.random.default_rng(0)
t = rng.normal(size=200)
# three almost identical copies of the same signal, plus one useless feature
X = np.c_[t + rng.normal(0, 0.01, 200), t + rng.normal(0, 0.01, 200), t + rng.normal(0, 0.01, 200), rng.normal(size=200)]
y = 3 * t + rng.normal(0, 0.5, 200)

print("Lasso      :", Lasso(alpha=0.1).fit(X, y).coef_.round(2))
print("ElasticNet :", ElasticNet(alpha=0.1, l1_ratio=0.3).fit(X, y).coef_.round(2))`,
`from sklearn.datasets import load_diabetes
from sklearn.linear_model import ElasticNetCV
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_diabetes(return_X_y=True)
m = make_pipeline(StandardScaler(), ElasticNetCV(l1_ratio=[0.1, 0.5, 0.9, 1.0], cv=5, random_state=0)).fit(X, y)
print("alpha =", round(m[-1].alpha_, 4), " l1_ratio =", m[-1].l1_ratio_)
print("Non-zero coefficients:", (m[-1].coef_ != 0).sum(), "of", len(m[-1].coef_))`],
  ex: [E("در کد اول، l1_ratio را 1، 0.5 و 0.1 کن و ضرایب سه ستون اول را مقایسه کن.", "In the first code, set l1_ratio to 1, 0.5 and 0.1 and compare the first three coefficients.",
    `import numpy as np\nfrom sklearn.linear_model import ElasticNet\nrng = np.random.default_rng(0)\nt = rng.normal(size=200)\nX = np.c_[t + rng.normal(0, 0.01, 200), t + rng.normal(0, 0.01, 200), t + rng.normal(0, 0.01, 200)]\ny = 3 * t + rng.normal(0, 0.5, 200)\nfor r in [1, 0.5, 0.1]:\n    print(r, ElasticNet(alpha=0.1, l1_ratio=r).fit(X, y).coef_.round(2))`)],
  quiz: [Q("l1_ratio = 0 در Elastic Net معادل کدام است؟", "l1_ratio = 0 in Elastic Net equals:", ["Ridge", "Lasso", "رگرسیون خطی"], ["Ridge", "Lasso", "Linear regression"], 0)]
});

L({ id: "ai-knn-reg", before: "ap-regression",
  fa: ["رگرسیون KNN (نزدیک‌ترین همسایه‌ها)", R`## ایده در یک نگاه
برای پیش‌بینی قیمت یک خانه، به **k خانه مشابه** نگاه کن و میانگین قیمتشان را بگو. KNN مدلی نمی‌سازد؛ فقط داده آموزش را **به خاطر می‌سپارد** و موقع پیش‌بینی جستجو می‌کند (یادگیری تنبل).

$$\hat y(x)=\frac1k\sum_{i\in N_k(x)}y_i$$

## گام‌ها
- فاصله نقطه جدید تا همه نقاط آموزش را حساب کن (معمولاً فاصله اقلیدسی $\sqrt{\sum(x_j-x'_j)^2}$).
- k نقطه نزدیک‌تر را انتخاب کن.
- میانگین (یا میانگین وزن‌دار) $y$ آن‌ها را برگردان.

## مثال عددی
متراژ و قیمت پنج خانه؛ می‌خواهیم قیمت خانه ۹۰ متری را با $k=3$ پیش‌بینی کنیم:

| متراژ | قیمت | فاصله تا ۹۰ |
|---|---|---|
| 60 | 5.0 | 30 |
| 80 | 6.5 | **10** |
| 95 | 7.4 | **5** |
| 100 | 7.9 | **10** |
| 150 | 11.0 | 60 |

سه همسایه: 95، 80 و 100. پیش‌بینی: $(7.4+6.5+7.9)/3=7.27$.

با **وزن فاصله** (~weights="distance"~)، همسایه نزدیک‌تر وزن $1/d$ بیشتری دارد: $(7.4/5+6.5/10+7.9/10)/(1/5+1/10+1/10)=7.33$.

## اثر k
[[fig:knn_reg_k.png|k کوچک: منحنی پله‌ای پرنوسان (بیش‌برازش). k بزرگ: منحنی صاف و تخت (کم‌برازش).]]

| k | بایاس | واریانس |
|---|---|---|
| 1 | کم | خیلی زیاد؛ هر نویز را دنبال می‌کند |
| متوسط | متعادل | متعادل |
| نزدیک n | زیاد؛ همه جا میانگین کل | کم |

[[lab:reg_knn]]

[[c:0]]

## نکته‌های مهم
- **مقیاس‌بندی واجب است:** فاصله بر حسب ویژگی‌ای که عددهای بزرگ‌تری دارد تعیین می‌شود (درس مقیاس‌بندی را ببین).
- **نفرین ابعاد:** در ابعاد بالا همه نقاط تقریباً هم‌فاصله‌اند و KNN ضعیف می‌شود.
- **برون‌یابی نمی‌کند:** بیرون از محدوده داده، پیش‌بینی ثابت می‌ماند.
- پیش‌بینی کند است، چون برای هر نقطه جدید باید فاصله تا همه داده‌ها حساب شود.

[[c:1]]`],
  en: ["KNN regression (nearest neighbors)", R`## The idea in one look
To predict a house's price, look at the **k most similar houses** and report the mean of their prices. KNN builds no model; it **memorizes** the training data and searches it when asked to predict (lazy learning).

$$\hat y(x)=\frac1k\sum_{i\in N_k(x)}y_i$$

## Steps
- Compute the distance from the new point to every training point (usually Euclidean, $\sqrt{\sum(x_j-x'_j)^2}$).
- Pick the k closest points.
- Return the mean (or a weighted mean) of their $y$.

## A worked example
Size and price of five houses. Predict the price of a 90 m² house with $k=3$:

| Size | Price | Distance to 90 |
|---|---|---|
| 60 | 5.0 | 30 |
| 80 | 6.5 | **10** |
| 95 | 7.4 | **5** |
| 100 | 7.9 | **10** |
| 150 | 11.0 | 60 |

The three neighbors are 95, 80 and 100. Prediction: $(7.4+6.5+7.9)/3=7.27$.

With **distance weights** (~weights="distance"~), closer neighbors get a larger weight $1/d$: $(7.4/5+6.5/10+7.9/10)/(1/5+1/10+1/10)=7.33$.

## The effect of k
[[fig:knn_reg_k.png|Small k: a jumpy step curve (overfitting). Large k: a smooth flat curve (underfitting).]]

| k | Bias | Variance |
|---|---|---|
| 1 | Low | Very high; follows every bit of noise |
| Medium | Balanced | Balanced |
| Close to n | High; the overall mean everywhere | Low |

[[lab:reg_knn]]

[[c:0]]

## Important notes
- **Scaling is required:** the distance is decided by the feature with the biggest numbers (see the scaling lesson).
- **Curse of dimensionality:** in high dimensions all points are almost equally far, and KNN weakens.
- **No extrapolation:** outside the range of the data the prediction stays flat.
- Prediction is slow, because each new point needs the distance to all the data.

[[c:1]]`],
  code: [`import numpy as np
from sklearn.neighbors import KNeighborsRegressor

size = np.array([[60], [80], [95], [100], [150]])
price = np.array([5.0, 6.5, 7.4, 7.9, 11.0])

for w in ["uniform", "distance"]:
    m = KNeighborsRegressor(n_neighbors=3, weights=w).fit(size, price)
    print(w, "->", m.predict([[90]]).round(2))
dist, idx = m.kneighbors([[90]])
print("neighbors:", size[idx].ravel(), " distances:", dist.round(1))`,
`import numpy as np
from sklearn.datasets import load_diabetes
from sklearn.model_selection import GridSearchCV
from sklearn.neighbors import KNeighborsRegressor
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_diabetes(return_X_y=True)
pipe = make_pipeline(StandardScaler(), KNeighborsRegressor())
grid = GridSearchCV(pipe, {"kneighborsregressor__n_neighbors": [1, 3, 5, 10, 20, 40], "kneighborsregressor__weights": ["uniform", "distance"]}, cv=5, scoring="r2")
grid.fit(X, y)
print("Best:", grid.best_params_, " R2 =", round(grid.best_score_, 3))
for k, s in zip(grid.cv_results_["params"], grid.cv_results_["mean_test_score"]):
    print(k["kneighborsregressor__n_neighbors"], k["kneighborsregressor__weights"], round(s, 3))`],
  ex: [E("KNN را از صفر با numpy پیاده کن و جواب مثال درس (7.27) را بگیر.", "Implement KNN regression from scratch with numpy and reproduce 7.27.",
    `import numpy as np\nsize = np.array([60, 80, 95, 100, 150]); price = np.array([5.0, 6.5, 7.4, 7.9, 11.0])\ndef knn_predict(x, k=3):\n    d = np.abs(size - x)\n    nearest = np.argsort(d)[:k]\n    return price[nearest].mean()\nprint(round(knn_predict(90), 2))`)],
  quiz: [Q("KNN با k=1 معمولاً دچار چه مشکلی است؟", "KNN with k=1 usually suffers from:", ["بیش‌برازش", "کم‌برازش", "هیچ مشکلی"], ["Overfitting", "Underfitting", "Nothing"], 0),
    Q("چرا KNN به مقیاس‌بندی نیاز دارد؟", "Why does KNN need scaling?", ["چون بر اساس فاصله کار می‌کند", "چون ضریب دارد", "نیاز ندارد"], ["Because it works with distances", "Because it has coefficients", "It does not"], 0)]
});

L({ id: "ai-tree-reg", before: "ap-regression",
  fa: ["درخت تصمیم برای رگرسیون", R`## ایده در یک نگاه
درخت تصمیم مثل بازی «بیست سؤالی» است: «متراژ کمتر از ۸۰ است؟ بله ← سن بنا بیشتر از ۲۰ است؟ ...». در هر **برگ**، پیش‌بینی برابر **میانگین** $y$ نمونه‌هایی است که به آن برگ رسیده‌اند. نتیجه یک تابع **پله‌ای** است.

[[fig:tree_reg_struct.png|یک درخت رگرسیون با عمق ۲. هر گره یک پرسش است؛ value میانگین آن ناحیه است.]]

## درخت چطور سؤال را انتخاب می‌کند؟
برای هر ویژگی و هر نقطه برش ممکن $t$، داده را به دو گروه چپ ($x\le t$) و راست تقسیم می‌کند و **کاهش مجموع مربعات خطا** را حساب می‌کند. بهترین برش، کمترین مقدار این را دارد:

$$\text{SSE}=\sum_{i\in L}(y_i-\bar y_L)^2+\sum_{i\in R}(y_i-\bar y_R)^2$$

سپس همین کار را برای هر گروه تکرار می‌کند (**تقسیم بازگشتی**) تا به شرط توقف برسد.

## مثال عددی یک برش
$x=[1,2,3,4]$ و $y=[1,1,5,6]$:

| برش | گروه چپ | گروه راست | SSE |
|---|---|---|---|
| $x\le1.5$ | [1] | [1, 5, 6] | $0+14=14$ |
| $x\le2.5$ | [1, 1] | [5, 6] | $0+0.5=0.5$ |
| $x\le3.5$ | [1, 1, 5] | [6] | $10.67+0=10.67$ |

بهترین برش $x\le2.5$ است: چپ پیش‌بینی ۱ و راست ۵.۵.

[[c:0]]

## عمق درخت و بیش‌برازش
[[fig:tree_reg_depth.png|عمق ۱: فقط دو پله. عمق ۳: خوب. بدون محدودیت: از هر نقطه می‌گذرد (بیش‌برازش).]]

[[lab:reg_tree]]

| هایپرپارامتر | اثر |
|---|---|
| ~max_depth~ | حداکثر عمق؛ کمتر یعنی ساده‌تر |
| ~min_samples_leaf~ | حداقل نمونه در هر برگ؛ بیشتر یعنی صاف‌تر |
| ~min_samples_split~ | حداقل نمونه برای اینکه گره تقسیم شود |
| ~ccp_alpha~ | هرس با پیچیدگی؛ شاخه‌های کم‌فایده حذف می‌شوند |

## مزایا و معایب
| مزایا | معایب |
|---|---|
| قابل فهم و قابل رسم | ناپایدار: تغییر کوچک داده، درخت کاملاً متفاوت |
| نیاز به مقیاس‌بندی ندارد | خروجی پله‌ای، نه صاف |
| روابط غیرخطی و اثر متقابل را خودش پیدا می‌کند | به‌تنهایی زود بیش‌برازش می‌کند |
| ویژگی‌های عددی و دسته‌ای | برون‌یابی نمی‌کند |

!راه حل ناپایداری درخت، ترکیب درخت‌های زیاد است: جنگل تصادفی و بوستینگ (دو درس بعد).

[[c:1]]`],
  en: ["Decision trees for regression", R`## The idea in one look
A decision tree is like the game "twenty questions": "Is the size below 80? Yes → is the building older than 20 years? ...". In each **leaf**, the prediction is the **mean** $y$ of the samples that reached that leaf. The result is a **step** function.

[[fig:tree_reg_struct.png|A regression tree of depth 2. Each node is a question; value is the mean of that region.]]

## How does the tree choose a question?
For every feature and every possible cut $t$, it splits the data into a left group ($x\le t$) and a right group and computes the **sum of squared errors**. The best cut gives the smallest value:

$$\text{SSE}=\sum_{i\in L}(y_i-\bar y_L)^2+\sum_{i\in R}(y_i-\bar y_R)^2$$

Then it repeats the same thing inside each group (**recursive splitting**) until a stopping rule is met.

## A worked example of one split
$x=[1,2,3,4]$ and $y=[1,1,5,6]$:

| Cut | Left group | Right group | SSE |
|---|---|---|---|
| $x\le1.5$ | [1] | [1, 5, 6] | $0+14=14$ |
| $x\le2.5$ | [1, 1] | [5, 6] | $0+0.5=0.5$ |
| $x\le3.5$ | [1, 1, 5] | [6] | $10.67+0=10.67$ |

The best cut is $x\le2.5$: the left side predicts 1 and the right side 5.5.

[[c:0]]

## Tree depth and overfitting
[[fig:tree_reg_depth.png|Depth 1: only two steps. Depth 3: good. No limit: passes through every point (overfitting).]]

[[lab:reg_tree]]

| Hyperparameter | Effect |
|---|---|
| ~max_depth~ | Maximum depth; lower is simpler |
| ~min_samples_leaf~ | Minimum samples per leaf; higher is smoother |
| ~min_samples_split~ | Minimum samples needed to split a node |
| ~ccp_alpha~ | Cost-complexity pruning; removes weak branches |

## Pros and cons
| Pros | Cons |
|---|---|
| Easy to understand and to draw | Unstable: a small data change gives a very different tree |
| Needs no scaling | Step-shaped output, not smooth |
| Finds non-linear relations and interactions by itself | Overfits quickly on its own |
| Numeric and categorical features | Does not extrapolate |

!The cure for an unstable tree is to combine many trees: random forests and boosting (next two lessons).

[[c:1]]`],
  code: [`import numpy as np

# Find the best cut by trying every possible threshold
x = np.array([1, 2, 3, 4]); y = np.array([1, 1, 5, 6])
for t in [1.5, 2.5, 3.5]:
    L, R = y[x <= t], y[x > t]
    sse = np.sum((L - L.mean()) ** 2) + np.sum((R - R.mean()) ** 2)
    print(f"x <= {t}: left {L}, right {R}, SSE = {sse:.2f}")`,
`import numpy as np
from sklearn.datasets import load_diabetes
from sklearn.model_selection import cross_val_score
from sklearn.tree import DecisionTreeRegressor, export_text

d = load_diabetes(as_frame=True)
for depth in [1, 2, 3, 4, 6, 10, None]:
    s = cross_val_score(DecisionTreeRegressor(max_depth=depth, random_state=0), d.data, d.target, cv=5, scoring="r2")
    print(f"max_depth={depth}: R2 = {s.mean():.3f}")

tree = DecisionTreeRegressor(max_depth=2, random_state=0).fit(d.data, d.target)
print(export_text(tree, feature_names=list(d.data.columns)))`],
  ex: [E("یک DecisionTreeRegressor با min_samples_leaf=20 روی داده دیابت بساز و R² اعتبارسنجی را با max_depth=None مقایسه کن.", "Build a DecisionTreeRegressor with min_samples_leaf=20 on diabetes and compare its CV R² with max_depth=None.",
    `from sklearn.datasets import load_diabetes\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.tree import DecisionTreeRegressor\nX, y = load_diabetes(return_X_y=True)\nfor leaf in [1, 5, 20, 40]:\n    print(leaf, cross_val_score(DecisionTreeRegressor(min_samples_leaf=leaf, random_state=0), X, y, cv=5).mean().round(3))`)],
  quiz: [Q("پیش‌بینی هر برگ درخت رگرسیون چیست؟", "What does each leaf of a regression tree predict?", ["میانگین y نمونه‌های آن برگ", "بیشترین y", "یک خط"], ["The mean y of its samples", "The largest y", "A line"], 0),
    Q("کدام برای درخت لازم نیست؟", "Which does a tree not need?", ["مقیاس‌بندی", "داده آموزش", "شرط توقف"], ["Scaling", "Training data", "A stopping rule"], 0)]
});

L({ id: "ai-forest-reg", before: "ap-regression",
  fa: ["جنگل تصادفی برای رگرسیون", R`## ایده در یک نگاه
یک درخت تنها ناپایدار است، ولی **میانگین صدها درخت متفاوت** پایدار و دقیق است. مثل اینکه به جای پرسیدن از یک نفر، از جمع زیادی بپرسی و میانگین بگیری (**خرد جمعی**).

## دو منبع تصادف
- **Bagging:** هر درخت روی یک **نمونه بوت‌استرپ** آموزش می‌بیند: n نمونه با جایگذاری از داده برمی‌داریم. حدود ۶۳٪ نمونه‌ها در هر بوت‌استرپ هستند و بقیه (**خارج از کیسه**، OOB) برای ارزیابی رایگان استفاده می‌شوند.
- **انتخاب تصادفی ویژگی:** در هر گره فقط زیرمجموعه تصادفی از ویژگی‌ها بررسی می‌شود (~max_features~). این کار درخت‌ها را از هم **مستقل‌تر** می‌کند.

$$\hat y(x)=\frac1B\sum_{b=1}^{B}T_b(x)$$

## چرا میانگین کمک می‌کند؟
اگر $B$ پیش‌بینی با واریانس $\sigma^2$ و همبستگی $\rho$ داشته باشیم، واریانس میانگین:

$$\text{Var}=\rho\sigma^2+\frac{1-\rho}{B}\sigma^2$$

با زیاد کردن $B$ جمله دوم صفر می‌شود؛ با کم کردن همبستگی $\rho$ (ویژگی تصادفی) جمله اول هم کم می‌شود.

[[fig:forest_reg_n.png|۱ درخت: پله‌ای و پرنویز. ۱۰ درخت: بهتر. ۲۰۰ درخت: صاف و پایدار.]]

[[lab:reg_forest]]

در آزمایشگاه خطوط کم‌رنگ درخت‌های تکی‌اند؛ خط پررنگ میانگین آن‌هاست. تعداد درخت را از ۱ زیاد کن.

## هایپرپارامترها
| هایپرپارامتر | پیش‌فرض | توضیح |
|---|---|---|
| ~n_estimators~ | 100 | تعداد درخت؛ بیشتر بهتر ولی کندتر (بیش‌برازش ایجاد نمی‌کند) |
| ~max_features~ | 1.0 در رگرسیون | سهم ویژگی‌ها در هر گره؛ 0.3 تا 0.5 را امتحان کن |
| ~max_depth~ / ~min_samples_leaf~ | بدون محدودیت / 1 | پیچیدگی هر درخت |
| ~oob_score~ | False | ارزیابی رایگان با نمونه‌های خارج از کیسه |

[[c:0]]

## اهمیت ویژگی‌ها
جنگل می‌گوید هر ویژگی چقدر خطا را کم کرده است. ولی این اهمیت برای ویژگی‌هایی با مقادیر یکتای زیاد سوگیری دارد؛ **اهمیت جایگشتی** (~permutation_importance~) قابل اعتمادتر است:

[[c:1]]

| مزایا | معایب |
|---|---|
| دقیق با تنظیم کم | تفسیر سخت‌تر از یک درخت |
| مقاوم در برابر بیش‌برازش | حجم و زمان پیش‌بینی بیشتر |
| بدون نیاز به مقیاس‌بندی | برون‌یابی نمی‌کند |
| ارزیابی OOB رایگان | |`],
  en: ["Random forests for regression", R`## The idea in one look
A single tree is unstable, but **the average of hundreds of different trees** is stable and accurate. It is like asking a large crowd instead of one person and taking the average (the **wisdom of crowds**).

## Two sources of randomness
- **Bagging:** each tree is trained on a **bootstrap sample**: n samples drawn with replacement. About 63% of the samples land in each bootstrap; the rest (**out-of-bag**, OOB) give a free evaluation.
- **Random feature choice:** at each node, only a random subset of the features is considered (~max_features~). This makes the trees **more independent**.

$$\hat y(x)=\frac1B\sum_{b=1}^{B}T_b(x)$$

## Why does averaging help?
For $B$ predictions with variance $\sigma^2$ and correlation $\rho$, the variance of their mean is:

$$\text{Var}=\rho\sigma^2+\frac{1-\rho}{B}\sigma^2$$

More trees ($B$) remove the second term; lower correlation $\rho$ (random features) reduces the first.

[[fig:forest_reg_n.png|1 tree: jumpy and noisy. 10 trees: better. 200 trees: smooth and stable.]]

[[lab:reg_forest]]

In the lab, the faint lines are single trees and the bold line is their average. Raise the number of trees from 1.

## Hyperparameters
| Hyperparameter | Default | Meaning |
|---|---|---|
| ~n_estimators~ | 100 | Number of trees; more is better but slower (it does not cause overfitting) |
| ~max_features~ | 1.0 for regression | Share of features per node; try 0.3 to 0.5 |
| ~max_depth~ / ~min_samples_leaf~ | none / 1 | Complexity of each tree |
| ~oob_score~ | False | Free evaluation on the out-of-bag samples |

[[c:0]]

## Feature importance
The forest reports how much each feature reduced the error. This measure is biased toward features with many unique values; **permutation importance** (~permutation_importance~) is more reliable:

[[c:1]]

| Pros | Cons |
|---|---|
| Accurate with little tuning | Harder to interpret than one tree |
| Resistant to overfitting | Larger, slower to predict |
| Needs no scaling | Does not extrapolate |
| Free OOB evaluation | |`],
  code: [`import numpy as np
from sklearn.datasets import load_diabetes
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score

X, y = load_diabetes(return_X_y=True)
for n in [1, 10, 50, 200]:
    rf = RandomForestRegressor(n_estimators=n, min_samples_leaf=5, max_features=0.5, oob_score=n > 20, random_state=0)
    cv = cross_val_score(rf, X, y, cv=5, scoring="r2").mean()
    rf.fit(X, y)
    oob = f"{rf.oob_score_:.3f}" if n > 20 else "-"
    print(f"{n:4d} trees: CV R2 = {cv:.3f}   OOB R2 = {oob}")

# Share of unique samples in one bootstrap sample
rng = np.random.default_rng(0)
print("unique share:", len(np.unique(rng.integers(0, 1000, 1000))) / 1000)`,
`import pandas as pd
from sklearn.datasets import load_diabetes
from sklearn.ensemble import RandomForestRegressor
from sklearn.inspection import permutation_importance
from sklearn.model_selection import train_test_split

d = load_diabetes(as_frame=True)
X_tr, X_te, y_tr, y_te = train_test_split(d.data, d.target, random_state=0)
rf = RandomForestRegressor(300, min_samples_leaf=5, random_state=0).fit(X_tr, y_tr)
imp = pd.DataFrame({"impurity": rf.feature_importances_,
                    "permutation": permutation_importance(rf, X_te, y_te, n_repeats=10, random_state=0).importances_mean},
                   index=d.data.columns)
print(imp.sort_values("permutation", ascending=False).round(3))`],
  ex: [E("max_features را 0.2، 0.5 و 1.0 بگذار و R² اعتبارسنجی را مقایسه کن.", "Try max_features 0.2, 0.5 and 1.0 and compare the CV R².",
    `from sklearn.datasets import load_diabetes\nfrom sklearn.ensemble import RandomForestRegressor\nfrom sklearn.model_selection import cross_val_score\nX, y = load_diabetes(return_X_y=True)\nfor mf in [0.2, 0.5, 1.0]:\n    print(mf, cross_val_score(RandomForestRegressor(200, max_features=mf, min_samples_leaf=5, random_state=0), X, y, cv=5).mean().round(3))`)],
  quiz: [Q("نمونه‌های خارج از کیسه (OOB) به چه کاری می‌آیند؟", "What are out-of-bag samples used for?", ["ارزیابی بدون داده آزمون جدا", "آموزش درخت‌ها", "مقیاس‌بندی"], ["Evaluation without a separate test set", "Training the trees", "Scaling"], 0),
    Q("زیاد کردن n_estimators در جنگل تصادفی:", "Raising n_estimators in a random forest:", ["بیش‌برازش ایجاد نمی‌کند ولی کندتر می‌شود", "حتماً بیش‌برازش می‌دهد", "دقت را کم می‌کند"], ["Does not overfit but is slower", "Surely overfits", "Lowers accuracy"], 0)]
});

L({ id: "ai-gbr", before: "ap-regression",
  fa: ["گرادیان بوستینگ برای رگرسیون", R`## ایده در یک نگاه
جنگل تصادفی درخت‌ها را **موازی و مستقل** می‌سازد. بوستینگ درخت‌ها را **پشت سر هم** می‌سازد: هر درخت جدید یاد می‌گیرد **خطای باقی‌مانده** درخت‌های قبلی را درست کند. مثل دانش‌آموزی که بعد از هر امتحان فقط روی اشتباه‌هایش کار می‌کند.

## الگوریتم
- شروع: $F_0(x)=\bar y$ (میانگین).
- برای $m=1,\dots,M$:
- باقی‌مانده را حساب کن: $r_i=y_i-F_{m-1}(x_i)$.
- یک درخت کوچک $h_m$ روی $(x_i, r_i)$ آموزش بده.
- به‌روز کن: $F_m(x)=F_{m-1}(x)+\eta\,h_m(x)$.

$\eta$ **نرخ یادگیری** است (مثلاً 0.1): هر درخت فقط بخش کوچکی از اصلاح را انجام می‌دهد. چرا «گرادیان»؟ چون باقی‌مانده دقیقاً منفی گرادیان خطای مربعی است؛ پس بوستینگ همان گرادیان کاهشی در فضای توابع است.

## مثال عددی
$y=[3, 5, 10]$، $\eta=0.5$:

| مرحله | پیش‌بینی | باقی‌مانده |
|---|---|---|
| $F_0$ | [6, 6, 6] | [−3, −1, 4] |
| درخت ۱ یاد می‌گیرد | [−2, −2, 4] | |
| $F_1=F_0+0.5h_1$ | [5, 5, 8] | [−2, 0, 2] |
| درخت ۲ ... | | خطا کمتر و کمتر |

[[fig:gbr_stages.png|بعد از ۱ و ۲۰ درخت، و خطای آموزش و آزمون بر حسب تعداد درخت. خطای آزمون از جایی به بعد زیاد می‌شود.]]

[[lab:reg_gbr]]

## هایپرپارامترها و توازنشان
| هایپرپارامتر | معمول | نکته |
|---|---|---|
| ~n_estimators~ | 100 تا 1000 | برخلاف جنگل، زیاد بودنش بیش‌برازش می‌دهد |
| ~learning_rate~ | 0.01 تا 0.1 | کمتر = درخت بیشتر لازم، معمولاً دقیق‌تر |
| ~max_depth~ | 2 تا 5 | درخت‌های **کوچک** |
| ~subsample~ | 0.5 تا 1 | کمتر از ۱ = بوستینگ تصادفی، مقاوم‌تر |
| ~n_iter_no_change~ | مثلاً 10 | **توقف زودهنگام** با داده اعتبارسنجی |

!قاعده طلایی: learning_rate را کم کن و n_estimators را با توقف زودهنگام پیدا کن.

[[c:0]]

## نسخه‌های سریع‌تر
~HistGradientBoostingRegressor~ ویژگی‌ها را دسته‌بندی (histogram) می‌کند و روی داده بزرگ بسیار سریع است؛ داده گمشده را هم مستقیم می‌پذیرد. کتابخانه‌های XGBoost، LightGBM و CatBoost هم همین ایده را دارند و در مسابقات داده‌های جدولی بسیار موفق‌اند (این‌ها را در Colab اجرا کن).

[[c:1]]

| جنگل تصادفی | گرادیان بوستینگ |
|---|---|
| درخت‌های عمیق و مستقل | درخت‌های کوچک و پشت سر هم |
| واریانس را کم می‌کند | بایاس را کم می‌کند |
| تنظیم کم | تنظیم دقیق‌تر لازم |
| بیش‌برازش سخت | با درخت زیاد بیش‌برازش می‌کند |`],
  en: ["Gradient boosting for regression", R`## The idea in one look
A random forest builds its trees **in parallel and independently**. Boosting builds them **one after another**: each new tree learns to fix the **remaining error** of the previous ones. Like a student who, after each exam, practices only their mistakes.

## The algorithm
- Start: $F_0(x)=\bar y$ (the mean).
- For $m=1,\dots,M$:
- Compute the residuals: $r_i=y_i-F_{m-1}(x_i)$.
- Train a small tree $h_m$ on $(x_i, r_i)$.
- Update: $F_m(x)=F_{m-1}(x)+\eta\,h_m(x)$.

$\eta$ is the **learning rate** (say 0.1): each tree makes only a small part of the correction. Why "gradient"? Because the residual is exactly the negative gradient of the squared error, so boosting is gradient descent in the space of functions.

## A worked example
$y=[3, 5, 10]$, $\eta=0.5$:

| Stage | Prediction | Residual |
|---|---|---|
| $F_0$ | [6, 6, 6] | [−3, −1, 4] |
| Tree 1 learns | [−2, −2, 4] | |
| $F_1=F_0+0.5h_1$ | [5, 5, 8] | [−2, 0, 2] |
| Tree 2 ... | | smaller and smaller |

[[fig:gbr_stages.png|After 1 and 20 trees, and the train and test error against the number of trees. The test error rises after a point.]]

[[lab:reg_gbr]]

## Hyperparameters and their balance
| Hyperparameter | Typical | Note |
|---|---|---|
| ~n_estimators~ | 100 to 1000 | Unlike a forest, too many trees overfit |
| ~learning_rate~ | 0.01 to 0.1 | Smaller = more trees needed, usually more accurate |
| ~max_depth~ | 2 to 5 | **Small** trees |
| ~subsample~ | 0.5 to 1 | Below 1 = stochastic boosting, more robust |
| ~n_iter_no_change~ | e.g. 10 | **Early stopping** on validation data |

!The golden rule: lower the learning rate and find n_estimators with early stopping.

[[c:0]]

## Faster versions
~HistGradientBoostingRegressor~ bins the features into histograms and is very fast on big data; it also accepts missing values directly. XGBoost, LightGBM and CatBoost follow the same idea and win many competitions on tabular data (run those in Colab).

[[c:1]]

| Random forest | Gradient boosting |
|---|---|
| Deep, independent trees | Small trees, one after another |
| Reduces variance | Reduces bias |
| Little tuning | Needs more careful tuning |
| Hard to overfit | Overfits with too many trees |`],
  code: [`import numpy as np
from sklearn.tree import DecisionTreeRegressor

# Gradient boosting written by hand, on a noisy sine
rng = np.random.default_rng(0)
x = rng.uniform(0, 1, 80)[:, None]; y = np.sin(2 * np.pi * x.ravel()) + rng.normal(0, 0.2, 80)
xt = rng.uniform(0, 1, 300)[:, None]; yt = np.sin(2 * np.pi * xt.ravel()) + rng.normal(0, 0.2, 300)

lr, F, Ft = 0.1, np.full(80, y.mean()), np.full(300, y.mean())
for m in range(1, 301):
    tree = DecisionTreeRegressor(max_depth=2).fit(x, y - F)   # learn the residuals
    F += lr * tree.predict(x); Ft += lr * tree.predict(xt)
    if m in (1, 10, 50, 100, 300):
        print(f"trees={m:3d}  train MSE={np.mean((y - F) ** 2):.3f}  test MSE={np.mean((yt - Ft) ** 2):.3f}")`,
`from sklearn.datasets import load_diabetes
from sklearn.ensemble import GradientBoostingRegressor, HistGradientBoostingRegressor
from sklearn.model_selection import cross_val_score

X, y = load_diabetes(return_X_y=True)
gb = GradientBoostingRegressor(n_estimators=2000, learning_rate=0.02, max_depth=2, subsample=0.8,
                               validation_fraction=0.2, n_iter_no_change=20, random_state=0).fit(X, y)
print("Trees chosen by early stopping:", gb.n_estimators_)
for name, m in [("GradientBoosting", GradientBoostingRegressor(n_estimators=gb.n_estimators_, learning_rate=0.02, max_depth=2, subsample=0.8, random_state=0)),
                ("HistGradientBoosting", HistGradientBoostingRegressor(learning_rate=0.05, max_depth=3, random_state=0))]:
    print(name, round(cross_val_score(m, X, y, cv=5, scoring="r2").mean(), 3))`],
  ex: [E("در کد اول learning_rate را 1.0 و 0.01 بگذار. کدام سریع‌تر بیش‌برازش می‌کند؟", "In the first code, try learning_rate 1.0 and 0.01. Which overfits sooner?",
    `import numpy as np\nfrom sklearn.ensemble import GradientBoostingRegressor\nrng = np.random.default_rng(0)\nx = rng.uniform(0, 1, 80)[:, None]; y = np.sin(2 * np.pi * x.ravel()) + rng.normal(0, 0.2, 80)\nxt = rng.uniform(0, 1, 300)[:, None]; yt = np.sin(2 * np.pi * xt.ravel()) + rng.normal(0, 0.2, 300)\nfor lr in [1.0, 0.1, 0.01]:\n    g = GradientBoostingRegressor(n_estimators=300, learning_rate=lr, max_depth=2).fit(x, y)\n    err = [np.mean((yt - p) ** 2) for p in g.staged_predict(xt)]\n    print(lr, "best trees:", int(np.argmin(err)) + 1, " best test MSE:", round(min(err), 4))`, "با نرخ ۱ خیلی زود (چند درخت) به بهترین نقطه می‌رسد و بعد بدتر می‌شود؛ با ۰٫۰۱ صدها درخت لازم است.", "With rate 1 it reaches its best after a few trees and then worsens; with 0.01 it needs hundreds of trees.")],
  quiz: [Q("هر درخت جدید در گرادیان بوستینگ روی چه چیزی آموزش می‌بیند؟", "What does each new tree in gradient boosting learn?", ["باقی‌مانده خطای مدل فعلی", "داده اصلی با بوت‌استرپ", "برچسب‌های تصادفی"], ["The residuals of the current model", "The original data with a bootstrap", "Random labels"], 0),
    Q("بوستینگ بیشتر چه چیزی را کم می‌کند؟", "Boosting mainly reduces:", ["بایاس", "تعداد ویژگی", "زمان آموزش"], ["Bias", "The number of features", "Training time"], 0)]
});

L({ id: "ai-svr", before: "ap-regression",
  fa: ["رگرسیون بردار پشتیبان (SVR)", R`## ایده در یک نگاه
SVR دور منحنی پیش‌بینی یک **لوله** به پهنای $\varepsilon$ می‌کشد. خطاهای داخل لوله **رایگان‌اند**؛ فقط نقاط بیرون لوله جریمه می‌شوند. هدف: صاف‌ترین تابعی که بیشتر نقاط را داخل لوله نگه دارد.

## تابع خطای حساس نبودن به ε
$$L_\varepsilon(y,\hat y)=\max(0,\ \vert y-\hat y\vert-\varepsilon)$$

[[fig:svr_loss.png|خطای مربعی همه خطاها را جریمه می‌کند؛ خطای SVR تا ε صفر است و بعد خطی رشد می‌کند (مقاوم‌تر در برابر داده پرت).]]

مسئله بهینه‌سازی:

$$\min_{\mathbf w,b}\ \frac12\Vert\mathbf w\Vert^2+C\sum_i L_\varepsilon(y_i,\hat y_i)$$

- $\frac12\Vert\mathbf w\Vert^2$: تابع را صاف نگه می‌دارد.
- $C$: چقدر برای نقاط بیرون لوله جریمه بدهیم.

## بردارهای پشتیبان
فقط نقاطی که روی مرز لوله یا بیرون آن هستند در جواب نقش دارند؛ به آن‌ها **بردار پشتیبان** می‌گوییم. نقاط داخل لوله را می‌شود حذف کرد و مدل تغییر نمی‌کند.

[[fig:svr_eps.png|با ε بزرگ‌تر، لوله پهن‌تر و بردارهای پشتیبان (دایره قرمز) کمتر می‌شوند.]]

## ترفند کرنل
با کرنل، SVR بدون ساختن ویژگی‌های جدید، روابط غیرخطی را یاد می‌گیرد. کرنل RBF شباهت دو نقطه است:

$$K(x,x')=\exp(-\gamma\Vert x-x'\Vert^2)$$

و پیش‌بینی: $\hat y(x)=\sum_{i\in SV}\beta_iK(x_i,x)+b$.

[[lab:reg_svr]]

## سه هایپرپارامتر
| هایپرپارامتر | کوچک | بزرگ |
|---|---|---|
| ~C~ | تابع صاف، خطای بیشتر (کم‌برازش) | دنبال کردن نقاط (بیش‌برازش) |
| ~epsilon~ | لوله باریک، بردار پشتیبان زیاد | لوله پهن، مدل ساده‌تر |
| ~gamma~ (RBF) | هر نقطه روی ناحیه بزرگی اثر دارد؛ صاف | اثر محلی؛ پرپیچ‌وخم |

!SVR خیلی به مقیاس حساس است: همیشه ~StandardScaler~ را هم روی X بزن. برای داده بیش از ده‌ها هزار نمونه کند است.

[[c:0]]

| مزایا | معایب |
|---|---|
| مقاوم در برابر داده پرت (نسبت به MSE) | کند روی داده بزرگ ($O(n^2)$ تا $O(n^3)$) |
| با کرنل، روابط غیرخطی | سه هایپرپارامتر حساس |
| روی داده کوچک و متوسط عالی | تفسیر سخت |`],
  en: ["Support vector regression (SVR)", R`## The idea in one look
SVR draws a **tube** of width $\varepsilon$ around the prediction curve. Errors inside the tube are **free**; only points outside the tube are penalized. The goal: the flattest function that keeps most points inside the tube.

## The ε-insensitive loss
$$L_\varepsilon(y,\hat y)=\max(0,\ \vert y-\hat y\vert-\varepsilon)$$

[[fig:svr_loss.png|Squared error punishes every error; the SVR loss is zero up to ε and then grows linearly (more robust to outliers).]]

The optimization problem:

$$\min_{\mathbf w,b}\ \frac12\Vert\mathbf w\Vert^2+C\sum_i L_\varepsilon(y_i,\hat y_i)$$

- $\frac12\Vert\mathbf w\Vert^2$ keeps the function flat.
- $C$ sets how much points outside the tube cost.

## Support vectors
Only points on the edge of the tube or outside it shape the answer; these are the **support vectors**. Points inside the tube could be removed without changing the model.

[[fig:svr_eps.png|With a larger ε, the tube is wider and there are fewer support vectors (red circles).]]

## The kernel trick
With a kernel, SVR learns non-linear relations without building new features. The RBF kernel measures how similar two points are:

$$K(x,x')=\exp(-\gamma\Vert x-x'\Vert^2)$$

and the prediction is $\hat y(x)=\sum_{i\in SV}\beta_iK(x_i,x)+b$.

[[lab:reg_svr]]

## Three hyperparameters
| Hyperparameter | Small | Large |
|---|---|---|
| ~C~ | Flat function, more error (underfitting) | Chases the points (overfitting) |
| ~epsilon~ | Narrow tube, many support vectors | Wide tube, simpler model |
| ~gamma~ (RBF) | Each point affects a wide area; smooth | Local effect; wiggly |

!SVR is very sensitive to scale: always apply ~StandardScaler~ to X. It is slow beyond tens of thousands of samples.

[[c:0]]

| Pros | Cons |
|---|---|
| Robust to outliers (compared with MSE) | Slow on big data ($O(n^2)$ to $O(n^3)$) |
| Non-linear relations with kernels | Three sensitive hyperparameters |
| Excellent on small and medium data | Hard to interpret |`],
  code: [`import numpy as np
from sklearn.datasets import load_diabetes
from sklearn.model_selection import GridSearchCV
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVR

X, y = load_diabetes(return_X_y=True)
pipe = make_pipeline(StandardScaler(), SVR(kernel="rbf"))
grid = GridSearchCV(pipe, {"svr__C": [1, 10, 100, 300], "svr__epsilon": [1, 10, 30], "svr__gamma": ["scale", 0.01, 0.1]}, cv=5, scoring="r2")
grid.fit(X, y)
print("Best:", grid.best_params_, " R2 =", round(grid.best_score_, 3))
best = grid.best_estimator_[-1]
print("Support vectors:", len(best.support_), "of", len(X))`],
  ex: [E("روی داده سینوسی، اثر epsilon را بر تعداد بردارهای پشتیبان چاپ کن.", "On a sine data set, print how epsilon changes the number of support vectors.",
    `import numpy as np\nfrom sklearn.svm import SVR\nrng = np.random.default_rng(0)\nx = rng.uniform(0, 1, 60)[:, None]; y = np.sin(2 * np.pi * x.ravel()) + rng.normal(0, 0.2, 60)\nfor e in [0.01, 0.1, 0.3, 0.6]:\n    print(e, len(SVR(C=10, epsilon=e, gamma=5).fit(x, y).support_))`)],
  quiz: [Q("در SVR کدام نقاط جریمه نمی‌شوند؟", "Which points cost nothing in SVR?", ["نقاط داخل لوله ε", "بردارهای پشتیبان", "همه نقاط"], ["Points inside the ε-tube", "Support vectors", "All points"], 0),
    Q("gamma بزرگ در کرنل RBF چه اثری دارد؟", "What does a large gamma do in an RBF kernel?", ["مدل پرپیچ‌وخم و محلی", "مدل خطی", "حذف بردارهای پشتیبان"], ["A wiggly, local model", "A linear model", "Removes support vectors"], 0)]
});

L({ id: "ai-reg-compare", before: "ap-regression",
  fa: ["مقایسه و انتخاب مدل رگرسیون", R`## کدام مدل را انتخاب کنم؟
هیچ مدلی همیشه بهترین نیست (**قضیه ناهار مجانی وجود ندارد**). راه درست: چند مدل را با **اعتبارسنجی متقاطع یکسان** مقایسه کن.

[[fig:reg_compare.png|R² میانگین ۵ تای اعتبارسنجی روی داده دیابت. روی این داده کوچک و تقریباً خطی، مدل‌های خطی برنده‌اند.]]

جالب است: روی داده دیابت، مدل‌های ساده خطی از جنگل و بوستینگ بهترند. داده کوچک است (۴۴۲ نمونه) و رابطه تقریباً خطی؛ مدل‌های پیچیده فقط نویز بیشتری یاد می‌گیرند.

## جدول راهنما
| مدل | مقیاس‌بندی لازم؟ | غیرخطی؟ | تفسیر | سرعت آموزش | داده بزرگ |
|---|---|---|---|---|---|
| خطی | خیر | خیر | عالی | خیلی سریع | عالی |
| Ridge / Lasso / ENet | **بله** | خیر | عالی | خیلی سریع | عالی |
| چندجمله‌ای | **بله** | بله | متوسط | سریع | ویژگی‌ها زیاد می‌شوند |
| KNN | **بله** | بله | کم | فوری (پیش‌بینی کند) | ضعیف |
| درخت | خیر | بله | عالی | سریع | خوب |
| جنگل تصادفی | خیر | بله | متوسط | متوسط | خوب |
| گرادیان بوستینگ | خیر | بله | متوسط | متوسط | عالی (Hist) |
| SVR | **بله** | بله | کم | کند | ضعیف |

## یک دستور کار عملی
- همیشه با یک **مدل پایه** شروع کن: ~DummyRegressor~ (میانگین) و رگرسیون خطی.
- اگر رابطه غیرخطی است، جنگل تصادفی را امتحان کن (تنظیم کم).
- برای بهترین دقت روی داده جدولی، گرادیان بوستینگ با توقف زودهنگام.
- اگر تفسیر مهم است، Lasso یا یک درخت کم‌عمق.
- مدل نهایی را **یک بار** روی داده آزمون بسنج.

[[lab:reg_all]]

در آزمایشگاه، همه مدل‌ها را روی داده‌های «پله‌ای» و «با داده پرت» امتحان کن. کدام مدل روی داده پله‌ای بهترین است؟ چرا؟

[[c:0]]

## نمودار پیش‌بینی در برابر واقعی
یک ابزار تشخیصی خوب: اگر نقاط روی خط $y=x$ باشند، مدل خوب است. الگوهای منظم در باقی‌مانده یعنی مدل چیزی را ندیده است.

[[c:1]]`],
  en: ["Comparing and choosing a regression model", R`## Which model should I choose?
No model is always best (the **no free lunch theorem**). The right approach: compare several models with **the same cross-validation**.

[[fig:reg_compare.png|Mean 5-fold R² on the diabetes data. On this small, nearly linear data set, linear models win.]]

Interesting: on the diabetes data the simple linear models beat forests and boosting. The data is small (442 samples) and the relation is nearly linear, so complex models only learn more noise.

## A guide table
| Model | Needs scaling? | Non-linear? | Interpretation | Training speed | Big data |
|---|---|---|---|---|---|
| Linear | No | No | Excellent | Very fast | Excellent |
| Ridge / Lasso / ENet | **Yes** | No | Excellent | Very fast | Excellent |
| Polynomial | **Yes** | Yes | Medium | Fast | Features explode |
| KNN | **Yes** | Yes | Low | Instant (slow prediction) | Poor |
| Tree | No | Yes | Excellent | Fast | Good |
| Random forest | No | Yes | Medium | Medium | Good |
| Gradient boosting | No | Yes | Medium | Medium | Excellent (Hist) |
| SVR | **Yes** | Yes | Low | Slow | Poor |

## A practical recipe
- Always start with a **baseline**: ~DummyRegressor~ (the mean) and linear regression.
- If the relation is non-linear, try a random forest (little tuning).
- For the best accuracy on tabular data, gradient boosting with early stopping.
- If interpretation matters, Lasso or a shallow tree.
- Test the final model **once** on the test data.

[[lab:reg_all]]

In the lab, try every model on the "steps" and "with outliers" data. Which model is best on the step data? Why?

[[c:0]]

## Predicted against actual
A good diagnostic: if the points lie on the line $y=x$, the model is good. Regular patterns in the residuals mean the model missed something.

[[c:1]]`],
  code: [`import pandas as pd
from sklearn.datasets import load_diabetes
from sklearn.dummy import DummyRegressor
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
from sklearn.linear_model import LinearRegression, LassoCV, RidgeCV
from sklearn.model_selection import KFold, cross_validate
from sklearn.neighbors import KNeighborsRegressor
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVR
from sklearn.tree import DecisionTreeRegressor

X, y = load_diabetes(return_X_y=True)
models = {
    "Dummy (mean)": DummyRegressor(),
    "Linear": LinearRegression(),
    "Ridge": make_pipeline(StandardScaler(), RidgeCV()),
    "Lasso": make_pipeline(StandardScaler(), LassoCV(random_state=0)),
    "KNN": make_pipeline(StandardScaler(), KNeighborsRegressor(15)),
    "Tree": DecisionTreeRegressor(max_depth=3, random_state=0),
    "Forest": RandomForestRegressor(200, min_samples_leaf=5, random_state=0),
    "Boosting": GradientBoostingRegressor(n_estimators=150, learning_rate=0.05, max_depth=2, random_state=0),
    "SVR": make_pipeline(StandardScaler(), SVR(C=100, epsilon=10)),
}
cv = KFold(5, shuffle=True, random_state=0)   # the same folds for every model
rows = []
for name, m in models.items():
    r = cross_validate(m, X, y, cv=cv, scoring=["r2", "neg_mean_absolute_error"])
    rows.append([name, r["test_r2"].mean(), -r["test_neg_mean_absolute_error"].mean(), r["fit_time"].mean() * 1000])
print(pd.DataFrame(rows, columns=["model", "R2", "MAE", "fit ms"]).sort_values("R2", ascending=False).round(3).to_string(index=False))`,
`import matplotlib.pyplot as plt
from sklearn.datasets import load_diabetes
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_val_predict

X, y = load_diabetes(return_X_y=True)
pred = cross_val_predict(LinearRegression(), X, y, cv=5)
fig, ax = plt.subplots(1, 2, figsize=(10, 4))
ax[0].scatter(y, pred, s=12); ax[0].plot([25, 346], [25, 346], "r--")
ax[0].set(xlabel="actual", ylabel="predicted", title="Predicted vs actual")
ax[1].scatter(pred, y - pred, s=12); ax[1].axhline(0, color="r", ls="--")
ax[1].set(xlabel="predicted", ylabel="residual", title="Residuals")
plt.tight_layout(); plt.show()`],
  quiz: [Q("اولین مدلی که باید بسازی چیست؟", "What is the first model you should build?", ["یک مدل پایه ساده", "پیچیده‌ترین مدل", "شبکه عصبی"], ["A simple baseline", "The most complex model", "A neural network"], 0),
    Q("چرا همه مدل‌ها را با تاهای یکسان مقایسه می‌کنیم؟", "Why compare all models on the same folds?", ["تا مقایسه منصفانه باشد", "تا سریع‌تر شود", "لازم نیست"], ["So the comparison is fair", "To be faster", "It is not needed"], 0)]
});

FinishCourse();
