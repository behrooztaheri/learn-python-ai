// Math track, part 4: the math inside the models.
M("math", "mmodels", "ریاضیِ پشت مدل‌ها", "The math inside the models");

L({ id: "math-linreg",
  fa: ["ریاضی رگرسیون خطی: معادله نرمال", R`## مسئله به زبان ماتریس
n نمونه و d ویژگی داریم. با اضافه کردن یک ستون 1 (برای عرض از مبدأ)، همه پیش‌بینی‌ها یک ضرب ماتریسی‌اند:

$$\hat{y}=Xw\qquad L(w)=\lVert Xw-y\rVert^2=\sum_i(\hat{y}_i-y_i)^2$$

## گرفتن گرادیان
با قاعده زنجیره‌ای (یا بسط دادن $(Xw-y)^\top(Xw-y)$):

$$\nabla L=2X^\top(Xw-y)$$

با برابر صفر گذاشتن آن، **معادله نرمال** به دست می‌آید:

$$X^\top X\,w=X^\top y\quad\Rightarrow\quad w=(X^\top X)^{-1}X^\top y$$

چون L محدب است (یک کاسه)، این تنها کمینه و بهترین جواب است.

## مثال عددی کامل
سه نقطه $(1,2)$، $(2,4)$، $(3,5)$:

$$X=\begin{bmatrix}1&1\\1&2\\1&3\end{bmatrix}\qquad y=\begin{bmatrix}2\\4\\5\end{bmatrix}$$

| گام | محاسبه | نتیجه |
|---|---|---|
| 1. $X^\top X$ | $\begin{bmatrix}1+1+1&1+2+3\\1+2+3&1+4+9\end{bmatrix}$ | $\begin{bmatrix}3&6\\6&14\end{bmatrix}$ |
| 2. $X^\top y$ | $(2+4+5,\ 2+8+15)$ | $(11,\ 25)$ |
| 3. دترمینان | $3\times14-6\times6$ | 6 |
| 4. وارون | $\dfrac16\begin{bmatrix}14&-6\\-6&3\end{bmatrix}$ | |
| 5. عرض از مبدأ | $(14\times11-6\times25)/6$ | 0.667 |
| 6. شیب | $(-6\times11+3\times25)/6$ | 1.5 |

پس $\hat{y}=0.667+1.5x$.

| $x$ | $y$ | $\hat{y}$ | باقی‌مانده $e=y-\hat{y}$ |
|---|---|---|---|
| 1 | 2 | 2.167 | −0.167 |
| 2 | 4 | 3.667 | 0.333 |
| 3 | 5 | 5.167 | −0.167 |

دو ویژگی مهم را بررسی کن: جمع باقی‌مانده‌ها صفر است، و $\sum e_i x_i=-0.167+0.667-0.5=0$. یعنی $X^\top e=0$.

## معنی هندسی: تصویر کردن
[[fig:math_projection.png|بردار y روی صفحه‌ای که ستون‌های X می‌سازند تصویر می‌شود. خطا بر آن صفحه عمود است.]]

$Xw$ فقط می‌تواند در «فضای ستون‌های X» باشد. نزدیک‌ترین نقطه این فضا به y، **تصویر عمودی** y است. شرط عمود بودن خطا بر همه ستون‌ها یعنی $X^\top(y-Xw)=0$ که همان معادله نرمال است. پس «کمترین مربعات» و «تصویر عمودی» یک چیزند.

## معادله نرمال یا گرادیان کاهشی؟
| | معادله نرمال | گرادیان کاهشی |
|---|---|---|
| تعداد گام | یک محاسبه | تکراری |
| هزینه | حدود $d^3$ (وارون) | حدود $nd$ در هر گام |
| ابرپارامتر | ندارد | نرخ یادگیری |
| ویژگی‌های زیاد (d > 10000) | کند یا ناممکن | خوب |
| داده خیلی بزرگ | باید در حافظه جا شود | با mini-batch کار می‌کند |
| برای مدل‌های غیرخطی | کار نمی‌کند | کار می‌کند |

## وقتی $X^\top X$ وارون ندارد
اگر ویژگی‌ها هم‌خط باشند یا $d>n$ باشد، $X^\top X$ تکین است. دو راه‌حل:
- **Ridge:** $w=(X^\top X+\lambda I)^{-1}X^\top y$. اضافه کردن $\lambda$ به قطر، همه مقدارهای ویژه را از صفر دور می‌کند.
- **شبه‌وارون با SVD:** ~np.linalg.pinv~ یا ~np.linalg.lstsq~ که scikit-learn هم از آن استفاده می‌کند.

## ضریب تعیین $R^2$
$$R^2=1-\frac{\sum(y_i-\hat{y}_i)^2}{\sum(y_i-\bar{y})^2}=1-\frac{0.167}{4.667}=0.964$$

یعنی مدل 96.4٪ از واریانس y را توضیح می‌دهد.

[[c:0]]`],
  en: ["The math of linear regression: the normal equation", R`## The problem in matrix language
We have n samples and d features. After adding a column of ones (for the intercept), all predictions are one matrix product:

$$\hat{y}=Xw\qquad L(w)=\lVert Xw-y\rVert^2=\sum_i(\hat{y}_i-y_i)^2$$

## Taking the gradient
With the chain rule (or by expanding $(Xw-y)^\top(Xw-y)$):

$$\nabla L=2X^\top(Xw-y)$$

Setting it to zero gives the **normal equation**:

$$X^\top X\,w=X^\top y\quad\Rightarrow\quad w=(X^\top X)^{-1}X^\top y$$

Because L is convex (a bowl), this is the only minimum and the best answer.

## A complete numeric example
Three points $(1,2)$, $(2,4)$, $(3,5)$:

$$X=\begin{bmatrix}1&1\\1&2\\1&3\end{bmatrix}\qquad y=\begin{bmatrix}2\\4\\5\end{bmatrix}$$

| Step | Calculation | Result |
|---|---|---|
| 1. $X^\top X$ | $\begin{bmatrix}1+1+1&1+2+3\\1+2+3&1+4+9\end{bmatrix}$ | $\begin{bmatrix}3&6\\6&14\end{bmatrix}$ |
| 2. $X^\top y$ | $(2+4+5,\ 2+8+15)$ | $(11,\ 25)$ |
| 3. Determinant | $3\times14-6\times6$ | 6 |
| 4. Inverse | $\dfrac16\begin{bmatrix}14&-6\\-6&3\end{bmatrix}$ | |
| 5. Intercept | $(14\times11-6\times25)/6$ | 0.667 |
| 6. Slope | $(-6\times11+3\times25)/6$ | 1.5 |

So $\hat{y}=0.667+1.5x$.

| $x$ | $y$ | $\hat{y}$ | Residual $e=y-\hat{y}$ |
|---|---|---|---|
| 1 | 2 | 2.167 | −0.167 |
| 2 | 4 | 3.667 | 0.333 |
| 3 | 5 | 5.167 | −0.167 |

Check two important facts: the residuals add to zero, and $\sum e_i x_i=-0.167+0.667-0.5=0$. In other words $X^\top e=0$.

## The geometric meaning: a projection
[[fig:math_projection.png|The vector y is projected onto the plane spanned by the columns of X. The error is perpendicular to that plane.]]

$Xw$ can only lie in the "column space of X". The point of that space closest to y is the **perpendicular projection** of y. Requiring the error to be perpendicular to every column means $X^\top(y-Xw)=0$, which is the normal equation. So "least squares" and "perpendicular projection" are the same thing.

## Normal equation or gradient descent?
| | Normal equation | Gradient descent |
|---|---|---|
| Steps | One calculation | Iterative |
| Cost | About $d^3$ (the inverse) | About $nd$ per step |
| Hyperparameters | None | The learning rate |
| Many features (d > 10000) | Slow or impossible | Fine |
| Very large data | Must fit in memory | Works with mini-batches |
| Non-linear models | Does not apply | Works |

## When $X^\top X$ has no inverse
If features are collinear or $d>n$, $X^\top X$ is singular. Two fixes:
- **Ridge:** $w=(X^\top X+\lambda I)^{-1}X^\top y$. Adding $\lambda$ to the diagonal moves every eigenvalue away from zero.
- **Pseudo-inverse via SVD:** ~np.linalg.pinv~ or ~np.linalg.lstsq~, which is what scikit-learn uses.

## The coefficient of determination $R^2$
$$R^2=1-\frac{\sum(y_i-\hat{y}_i)^2}{\sum(y_i-\bar{y})^2}=1-\frac{0.167}{4.667}=0.964$$

The model explains 96.4% of the variance of y.

[[c:0]]`],
  code: [`import numpy as np
from sklearn.linear_model import LinearRegression

x = np.array([1.0, 2.0, 3.0]); y = np.array([2.0, 4.0, 5.0])
X = np.c_[np.ones(3), x]

print("X^T X ="); print(X.T @ X)
print("X^T y =", X.T @ y)
w = np.linalg.solve(X.T @ X, X.T @ y)            # the normal equation
print("w (intercept, slope) =", w.round(4))

e = y - X @ w
print("residuals:", e.round(4), "  sum:", round(e.sum(), 10), "  X^T e:", (X.T @ e).round(10))
print("R^2 =", round(1 - np.sum(e ** 2) / np.sum((y - y.mean()) ** 2), 4))

sk = LinearRegression().fit(x.reshape(-1, 1), y)
print("scikit-learn:", round(sk.intercept_, 4), sk.coef_.round(4))

# Gradient descent reaches the same answer
w_gd = np.zeros(2)
for _ in range(5000):
    w_gd -= 0.05 * 2 * X.T @ (X @ w_gd - y) / 3
print("gradient descent:", w_gd.round(4))

# Collinear features: X^T X is singular, Ridge and the pseudo-inverse still work
rng = np.random.default_rng(0)
a = rng.normal(size=30)
Xc = np.c_[np.ones(30), a, 2 * a]                 # third column = 2 * second column
yc = 1 + 3 * a + rng.normal(0, 0.1, 30)
print("rank of X^T X:", np.linalg.matrix_rank(Xc.T @ Xc), "of 3")
print("ridge        :", np.linalg.solve(Xc.T @ Xc + 0.01 * np.eye(3), Xc.T @ yc).round(3))
print("pseudo-inverse:", (np.linalg.pinv(Xc) @ yc).round(3))`],
  ex: [E("برای نقاط $(0,1)$، $(1,3)$، $(2,4)$، $(3,4)$ معادله نرمال را با دست حل کن.", "Solve the normal equation by hand for the points $(0,1)$, $(1,3)$, $(2,4)$, $(3,4)$.", `import numpy as np
x = np.array([0.0, 1, 2, 3]); y = np.array([1.0, 3, 4, 4])
X = np.c_[np.ones(4), x]
print(X.T @ X, X.T @ y)                       # [[4 6] [6 14]]  [12 23]
print(np.linalg.solve(X.T @ X, X.T @ y))      # [1.5 1.0]`, "$X^\\top X=\\begin{bmatrix}4&6\\\\6&14\\end{bmatrix}$، $X^\\top y=(12,23)$، دترمینان 20؛ جواب: عرض از مبدأ 1.5 و شیب 1.", "$X^\\top X=\\begin{bmatrix}4&6\\\\6&14\\end{bmatrix}$, $X^\\top y=(12,23)$, determinant 20; the answer is intercept 1.5 and slope 1.")],
  quiz: [Q("معادله نرمال کدام است؟", "Which one is the normal equation?", ["$X^\\top Xw=X^\\top y$", "$Xw=y$", "$w=X^\\top y$"], ["$X^\\top Xw=X^\\top y$", "$Xw=y$", "$w=X^\\top y$"], 0),
    Q("در جواب کمترین مربعات، بردار خطا نسبت به ستون‌های X چه وضعی دارد؟", "In the least-squares solution, how is the error vector related to the columns of X?", ["بر آن‌ها عمود است", "با آن‌ها موازی است", "برابر صفر است"], ["It is perpendicular to them", "It is parallel to them", "It is zero"], 0),
    Q("چه زمانی گرادیان کاهشی بهتر از معادله نرمال است؟", "When is gradient descent better than the normal equation?", ["وقتی تعداد ویژگی‌ها خیلی زیاد است", "وقتی فقط سه نمونه داریم", "هیچ‌وقت"], ["When there are very many features", "When we have only three samples", "Never"], 0)]
});

L({ id: "math-logit",
  fa: ["ریاضی طبقه‌بندی: سیگموید، softmax و گرادیان", R`## از نمره به احتمال
طبقه‌بند خطی اول یک **نمره** می‌سازد: $z=w\cdot x+b$. این نمره هر عددی می‌تواند باشد؛ برای تبدیل آن به احتمال از سیگموید استفاده می‌کنیم:

$$p=\sigma(z)=\frac{1}{1+e^{-z}}$$

معنی z: **لگاریتم بخت** (log-odds). اگر $p=0.8$ باشد، بخت $0.8/0.2=4$ و $z=\ln4=1.386$.

| z | −3 | −1 | 0 | 1 | 3 |
|---|---|---|---|---|---|
| p | 0.047 | 0.269 | 0.5 | 0.731 | 0.953 |
| بخت $p/(1-p)$ | 0.05 | 0.37 | 1 | 2.72 | 20.1 |

## تابع خطا
از درس درست‌نمایی: آنتروپی متقاطع دودویی

$$L=-\big[y\ln p+(1-y)\ln(1-p)\big]$$

[[fig:logit_loss.png|خطای لگاریتمی: اگر مدل با اطمینان اشتباه کند، جریمه بسیار بزرگ می‌شود.]]

## گرادیان: یک نتیجه زیبا
با قاعده زنجیره‌ای $\dfrac{\partial L}{\partial z}=\dfrac{\partial L}{\partial p}\cdot\dfrac{\partial p}{\partial z}$:

| جزء | مقدار |
|---|---|
| $\partial L/\partial p$ | $-\dfrac{y}{p}+\dfrac{1-y}{1-p}=\dfrac{p-y}{p(1-p)}$ |
| $\partial p/\partial z$ | $p(1-p)$ |
| حاصل‌ضرب | $p-y$ |

$$\frac{\partial L}{\partial z}=p-y\qquad\frac{\partial L}{\partial w}=(p-y)\,x\qquad\frac{\partial L}{\partial b}=p-y$$

گرادیان فقط «پیش‌بینی منهای واقعیت» ضرب در ورودی است؛ دقیقاً همان شکلی که در رگرسیون خطی داشتیم.

## مثال عددی: یک گام آموزش
$x=(2,1)$، $y=1$، $w=(0.5,-1)$، $b=0.5$، $\eta=0.1$:

| گام | محاسبه | مقدار |
|---|---|---|
| نمره z | $0.5\times2-1\times1+0.5$ | 0.5 |
| احتمال p | $\sigma(0.5)$ | 0.622 |
| خطا | $-\ln0.622$ | 0.474 |
| $p-y$ | $0.622-1$ | −0.378 |
| $\partial L/\partial w$ | $-0.378\times(2,1)$ | $(-0.755,\ -0.378)$ |
| w جدید | $(0.5,-1)-0.1(-0.755,-0.378)$ | $(0.576,\ -0.962)$ |
| b جدید | $0.5+0.0378$ | 0.538 |
| p جدید | $\sigma(0.727)$ | 0.674 |
| خطای جدید | $-\ln0.674$ | 0.394 |

خطا از 0.474 به 0.394 رسید.

## بیش از دو کلاس: softmax
برای K کلاس، K نمره داریم و softmax آن‌ها را به توزیع احتمال تبدیل می‌کند:

$$p_k=\frac{e^{z_k}}{\sum_j e^{z_j}}$$

[[lab:m_softmax]]

مثال با $z=(2,\ 1,\ 0.1)$:

| کلاس | $z_k$ | $e^{z_k}$ | $p_k$ |
|---|---|---|---|
| 1 | 2 | 7.389 | 0.659 |
| 2 | 1 | 2.718 | 0.242 |
| 3 | 0.1 | 1.105 | 0.099 |
| جمع | | 11.212 | 1 |

اگر کلاس درست کلاس 1 باشد: خطا $=-\ln0.659=0.417$ و گرادیان باز هم همان شکل ساده را دارد:

$$\frac{\partial L}{\partial z}=p-y=(0.659-1,\ 0.242,\ 0.099)=(-0.341,\ 0.242,\ 0.099)$$

## ویژگی‌های softmax
| ویژگی | توضیح |
|---|---|
| جمع = 1 | یک توزیع احتمال معتبر |
| حفظ ترتیب | بزرگ‌ترین نمره، بزرگ‌ترین احتمال |
| حساس به اختلاف | اضافه کردن یک عدد ثابت به همه نمره‌ها چیزی را عوض نمی‌کند |
| دما T | $z/T$: دمای کم = قاطع‌تر، دمای زیاد = یکنواخت‌تر (در مدل‌های زبانی، «خلاقیت») |
| K = 2 | همان سیگموید است |

!در کد هیچ‌وقت $e^{z}$ را مستقیم حساب نکن: برای $z=1000$ سرریز می‌شود. اول بزرگ‌ترین نمره را کم کن (~z - z.max()~). کتابخانه‌ها softmax و لگاریتم را با هم و به‌صورت پایدار حساب می‌کنند (log-sum-exp).

## مرز تصمیم
مدل وقتی کلاس 1 را انتخاب می‌کند که $p>0.5$ یعنی $z>0$ یعنی $w\cdot x+b>0$. پس مرز تصمیم **یک خط** (یا ابرصفحه) است که بر w عمود است؛ به همین دلیل رگرسیون لجستیک یک طبقه‌بند **خطی** است.

[[c:0]]`],
  en: ["The math of classification: sigmoid, softmax and gradients", R`## From a score to a probability
A linear classifier first builds a **score**: $z=w\cdot x+b$. The score can be any number; the sigmoid turns it into a probability:

$$p=\sigma(z)=\frac{1}{1+e^{-z}}$$

The meaning of z is the **log-odds**. If $p=0.8$, the odds are $0.8/0.2=4$ and $z=\ln4=1.386$.

| z | −3 | −1 | 0 | 1 | 3 |
|---|---|---|---|---|---|
| p | 0.047 | 0.269 | 0.5 | 0.731 | 0.953 |
| odds $p/(1-p)$ | 0.05 | 0.37 | 1 | 2.72 | 20.1 |

## The loss
From the likelihood lesson: the binary cross-entropy

$$L=-\big[y\ln p+(1-y)\ln(1-p)\big]$$

[[fig:logit_loss.png|Log loss: if the model is confidently wrong, the penalty becomes very large.]]

## The gradient: a beautiful result
With the chain rule $\dfrac{\partial L}{\partial z}=\dfrac{\partial L}{\partial p}\cdot\dfrac{\partial p}{\partial z}$:

| Part | Value |
|---|---|
| $\partial L/\partial p$ | $-\dfrac{y}{p}+\dfrac{1-y}{1-p}=\dfrac{p-y}{p(1-p)}$ |
| $\partial p/\partial z$ | $p(1-p)$ |
| Product | $p-y$ |

$$\frac{\partial L}{\partial z}=p-y\qquad\frac{\partial L}{\partial w}=(p-y)\,x\qquad\frac{\partial L}{\partial b}=p-y$$

The gradient is just "prediction minus truth" times the input; exactly the form we had in linear regression.

## Worked example: one training step
$x=(2,1)$, $y=1$, $w=(0.5,-1)$, $b=0.5$, $\eta=0.1$:

| Step | Calculation | Value |
|---|---|---|
| Score z | $0.5\times2-1\times1+0.5$ | 0.5 |
| Probability p | $\sigma(0.5)$ | 0.622 |
| Loss | $-\ln0.622$ | 0.474 |
| $p-y$ | $0.622-1$ | −0.378 |
| $\partial L/\partial w$ | $-0.378\times(2,1)$ | $(-0.755,\ -0.378)$ |
| New w | $(0.5,-1)-0.1(-0.755,-0.378)$ | $(0.576,\ -0.962)$ |
| New b | $0.5+0.0378$ | 0.538 |
| New p | $\sigma(0.727)$ | 0.674 |
| New loss | $-\ln0.674$ | 0.394 |

The loss went from 0.474 to 0.394.

## More than two classes: softmax
For K classes we have K scores, and softmax turns them into a probability distribution:

$$p_k=\frac{e^{z_k}}{\sum_j e^{z_j}}$$

[[lab:m_softmax]]

Example with $z=(2,\ 1,\ 0.1)$:

| Class | $z_k$ | $e^{z_k}$ | $p_k$ |
|---|---|---|---|
| 1 | 2 | 7.389 | 0.659 |
| 2 | 1 | 2.718 | 0.242 |
| 3 | 0.1 | 1.105 | 0.099 |
| Sum | | 11.212 | 1 |

If the true class is class 1, the loss is $-\ln0.659=0.417$ and the gradient again has the same simple form:

$$\frac{\partial L}{\partial z}=p-y=(0.659-1,\ 0.242,\ 0.099)=(-0.341,\ 0.242,\ 0.099)$$

## Properties of softmax
| Property | Explanation |
|---|---|
| Sums to 1 | A valid probability distribution |
| Keeps the order | The largest score gets the largest probability |
| Depends on differences | Adding a constant to every score changes nothing |
| Temperature T | $z/T$: low T = more decisive, high T = more uniform ("creativity" in language models) |
| K = 2 | It is the sigmoid |

!In code never compute $e^{z}$ directly: for $z=1000$ it overflows. Subtract the largest score first (~z - z.max()~). Libraries compute softmax and the log together in a stable way (log-sum-exp).

## The decision boundary
The model picks class 1 when $p>0.5$, that is $z>0$, that is $w\cdot x+b>0$. So the decision boundary is **a line** (or hyperplane) perpendicular to w, which is why logistic regression is a **linear** classifier.

[[c:0]]`],
  code: [`import numpy as np

sigmoid = lambda z: 1 / (1 + np.exp(-z))

# One training step of logistic regression, as in the lesson
x = np.array([2.0, 1.0]); y = 1.0
w = np.array([0.5, -1.0]); b = 0.5; eta = 0.1
for step in range(3):
    z = w @ x + b; p = sigmoid(z)
    loss = -(y * np.log(p) + (1 - y) * np.log(1 - p))
    print(f"step {step}: z = {z:.3f}  p = {p:.3f}  loss = {loss:.3f}  grad_w = {((p - y) * x).round(3)}")
    w = w - eta * (p - y) * x
    b = b - eta * (p - y)

# Check that dL/dz = p - y with a numerical derivative
L = lambda z: -np.log(sigmoid(z))               # y = 1
h = 1e-6
print("numeric dL/dz at z = 0.5:", round((L(0.5 + h) - L(0.5 - h)) / (2 * h), 4), "   p - y =", round(sigmoid(0.5) - 1, 4))

def softmax(z, T=1.0):
    z = np.asarray(z, dtype=float) / T
    e = np.exp(z - z.max())                      # subtract the max: numerically stable
    return e / e.sum()

z = np.array([2.0, 1.0, 0.1])
p = softmax(z)
print("softmax:", p.round(3), "  sum =", p.sum())
print("loss if class 1 is true:", round(-np.log(p[0]), 3), "  gradient p - y:", (p - np.array([1, 0, 0])).round(3))
for T in [0.2, 1, 5]:
    print(f"T = {T}:", softmax(z, T).round(3))
print("huge scores still work:", softmax([1000, 999, 0]).round(3))

# Train logistic regression from scratch on two clouds of points
rng = np.random.default_rng(0)
X = np.r_[rng.normal([-1, -1], 1, (100, 2)), rng.normal([1.5, 1], 1, (100, 2))]
t = np.r_[np.zeros(100), np.ones(100)]
w = np.zeros(2); b = 0.0
for epoch in range(300):
    p = sigmoid(X @ w + b)
    w -= 0.1 * X.T @ (p - t) / 200
    b -= 0.1 * np.mean(p - t)
print("w =", w.round(3), " b =", round(b, 3), " accuracy =", np.mean((sigmoid(X @ w + b) > 0.5) == t))`],
  ex: [E("برای $z=(1,2,3)$ خروجی softmax را با دست حساب کن. اگر کلاس درست کلاس 3 باشد خطا چقدر است؟", "Compute the softmax of $z=(1,2,3)$ by hand. If the true class is class 3, what is the loss?", `import numpy as np
z = np.array([1.0, 2, 3]); p = np.exp(z) / np.exp(z).sum()
print(p.round(3), -np.log(p[2]).round(3))   # [0.09 0.245 0.665]  0.408`, "$e^1+e^2+e^3=2.718+7.389+20.086=30.193$؛ احتمال‌ها 0.090، 0.245 و 0.665؛ خطا $-\\ln0.665=0.408$.", "$e^1+e^2+e^3=2.718+7.389+20.086=30.193$; the probabilities are 0.090, 0.245 and 0.665; the loss is $-\\ln0.665=0.408$."),
    E("در آزمایشگاه دما را به 0.1 و سپس به 5 ببر. چه تفاوتی می‌بینی؟", "In the lab move the temperature to 0.1 and then to 5. What changes?", null, "در دمای 0.1 تقریباً همه احتمال به بزرگ‌ترین نمره می‌رسد (argmax). در دمای 5 احتمال‌ها تقریباً برابر می‌شوند.", "At T = 0.1 almost all the probability goes to the largest score (argmax). At T = 5 the probabilities become almost equal.")],
  quiz: [Q("گرادیان خطای آنتروپی متقاطع نسبت به z در رگرسیون لجستیک چیست؟", "In logistic regression, what is the gradient of the cross-entropy with respect to z?", ["$p-y$", "$p(1-p)$", "$y/p$"], ["$p-y$", "$p(1-p)$", "$y/p$"], 0),
    Q("اگر به همه نمره‌ها عدد 5 اضافه کنیم، خروجی softmax چه می‌شود؟", "If we add 5 to every score, what happens to the softmax output?", ["تغییری نمی‌کند", "5 برابر می‌شود", "یکنواخت می‌شود"], ["Nothing changes", "It is multiplied by 5", "It becomes uniform"], 0),
    Q("$z=0$ معادل چه احتمالی است؟", "Which probability corresponds to $z=0$?", ["0.5", "0", "1"], ["0.5", "0", "1"], 0)]
});

L({ id: "math-backprop",
  fa: ["پس‌انتشار خطا با عدد واقعی", R`## شبکه ما
یک شبکه کوچک: 2 ورودی، 2 نورون پنهان با سیگموید، 1 خروجی با سیگموید و خطای $L=\frac12(\hat{y}-y)^2$. برای ساده بودن بایاس نداریم.

[[fig:math_backprop.png|شبکه 2-2-1 با همه مقادیر گذر رفت (داخل گره‌ها) و خطاهای δ در گذر برگشت (سبز).]]

## گام 1: گذر رفت (forward)
| کمیت | فرمول | محاسبه | مقدار |
|---|---|---|---|
| $z_1$ | $w_{11}x_1+w_{12}x_2$ | $0.1\times1+0.2\times2$ | 0.5 |
| $h_1$ | $\sigma(z_1)$ | | 0.622 |
| $z_2$ | $w_{21}x_1+w_{22}x_2$ | $0.3\times1+0.4\times2$ | 1.1 |
| $h_2$ | $\sigma(z_2)$ | | 0.750 |
| $z_o$ | $v_1h_1+v_2h_2$ | $0.5\times0.622+0.6\times0.750$ | 0.761 |
| $\hat{y}$ | $\sigma(z_o)$ | | 0.682 |
| $L$ | $\frac12(\hat{y}-y)^2$ | $\frac12(0.682-1)^2$ | 0.0507 |

## گام 2: خطای لایه خروجی
«خطای» هر نورون را $\delta=\partial L/\partial z$ تعریف می‌کنیم:

$$\delta_o=(\hat{y}-y)\cdot\hat{y}(1-\hat{y})=(-0.318)(0.682)(0.318)=-0.0691$$

## گام 3: برگرداندن خطا به لایه پنهان
هر نورون پنهان به اندازه **وزنی که به خروجی وصلش می‌کند** در خطا سهم دارد:

$$\delta_j=\delta_o\cdot v_j\cdot h_j(1-h_j)$$

| نورون | محاسبه | مقدار |
|---|---|---|
| $\delta_1$ | $-0.0691\times0.5\times0.622\times0.378$ | −0.0081 |
| $\delta_2$ | $-0.0691\times0.6\times0.750\times0.250$ | −0.0078 |

## گام 4: گرادیان هر وزن
قاعده طلایی: **گرادیان وزن = خطای نورون مقصد × خروجی نورون مبدأ**.

| وزن | فرمول | مقدار گرادیان | وزن جدید با $\eta=0.5$ |
|---|---|---|---|
| $v_1$ | $\delta_o h_1$ | −0.0430 | 0.5215 |
| $v_2$ | $\delta_o h_2$ | −0.0518 | 0.6259 |
| $w_{11}$ | $\delta_1 x_1$ | −0.0081 | 0.1041 |
| $w_{12}$ | $\delta_1 x_2$ | −0.0162 | 0.2081 |
| $w_{21}$ | $\delta_2 x_1$ | −0.0078 | 0.3039 |
| $w_{22}$ | $\delta_2 x_2$ | −0.0155 | 0.4078 |

همه گرادیان‌ها منفی‌اند؛ پس همه وزن‌ها کمی زیاد می‌شوند تا خروجی از 0.682 به سمت 1 برود. بعد از این یک گام، خطا از 0.0507 به حدود 0.0481 می‌رسد.

## فرمول کلی به زبان ماتریس
برای لایه $l$ با ورودی $a^{(l-1)}$، وزن $W^{(l)}$ و فعال‌سازی f:

| مرحله | فرمول |
|---|---|
| رفت | $z^{(l)}=W^{(l)}a^{(l-1)}+b^{(l)},\quad a^{(l)}=f(z^{(l)})$ |
| خطای لایه آخر | $\delta^{(L)}=\nabla_a L\odot f'(z^{(L)})$ |
| خطای لایه‌های قبل | $\delta^{(l)}=\big(W^{(l+1)\top}\delta^{(l+1)}\big)\odot f'(z^{(l)})$ |
| گرادیان وزن | $\partial L/\partial W^{(l)}=\delta^{(l)}\,a^{(l-1)\top}$ |
| گرادیان بایاس | $\partial L/\partial b^{(l)}=\delta^{(l)}$ |

$\odot$ ضرب درایه به درایه است. توجه کن که در برگشت از **ترانهاده** همان ماتریس وزنِ گذر رفت استفاده می‌شود.

## چرا گرادیان محو یا منفجر می‌شود؟
در هر لایه، δ در $W^\top$ و در $f'(z)$ ضرب می‌شود. بعد از L لایه، L بار ضرب شده است:

| وضعیت | نتیجه | راه‌حل |
|---|---|---|
| $f'$ کوچک (سیگموید: حداکثر 0.25) | گرادیان محو می‌شود | ReLU، اتصال میان‌بر (ResNet)، نرمال‌سازی دسته‌ای |
| وزن‌های بزرگ | گرادیان منفجر می‌شود | بریدن گرادیان (clipping)، مقداردهی اولیه درست |
| وزن‌های اولیه همه صفر | همه نورون‌ها یکسان می‌مانند | مقداردهی تصادفی |

| مقداردهی اولیه | واریانس وزن‌ها | مناسب برای |
|---|---|---|
| Xavier / Glorot | $\dfrac{2}{n_{in}+n_{out}}$ | سیگموید، tanh |
| He | $\dfrac{2}{n_{in}}$ | ReLU |

## بررسی گرادیان
همیشه می‌توان پس‌انتشار را با مشتق عددی بررسی کرد: یک وزن را کمی تغییر بده و ببین خطا چقدر عوض می‌شود. کد زیر همین کار را می‌کند و سپس شبکه را برای حل مسئله XOR آموزش می‌دهد.

[[c:0]]`],
  en: ["Backpropagation with real numbers", R`## Our network
A tiny network: 2 inputs, 2 hidden sigmoid neurons, 1 sigmoid output and the loss $L=\frac12(\hat{y}-y)^2$. To keep it simple there are no biases.

[[fig:math_backprop.png|A 2-2-1 network with every forward value (inside the nodes) and the errors δ of the backward pass (green).]]

## Step 1: the forward pass
| Quantity | Formula | Calculation | Value |
|---|---|---|---|
| $z_1$ | $w_{11}x_1+w_{12}x_2$ | $0.1\times1+0.2\times2$ | 0.5 |
| $h_1$ | $\sigma(z_1)$ | | 0.622 |
| $z_2$ | $w_{21}x_1+w_{22}x_2$ | $0.3\times1+0.4\times2$ | 1.1 |
| $h_2$ | $\sigma(z_2)$ | | 0.750 |
| $z_o$ | $v_1h_1+v_2h_2$ | $0.5\times0.622+0.6\times0.750$ | 0.761 |
| $\hat{y}$ | $\sigma(z_o)$ | | 0.682 |
| $L$ | $\frac12(\hat{y}-y)^2$ | $\frac12(0.682-1)^2$ | 0.0507 |

## Step 2: the error of the output layer
Define the "error" of a neuron as $\delta=\partial L/\partial z$:

$$\delta_o=(\hat{y}-y)\cdot\hat{y}(1-\hat{y})=(-0.318)(0.682)(0.318)=-0.0691$$

## Step 3: sending the error back to the hidden layer
Each hidden neuron shares in the error in proportion to **the weight that connects it to the output**:

$$\delta_j=\delta_o\cdot v_j\cdot h_j(1-h_j)$$

| Neuron | Calculation | Value |
|---|---|---|
| $\delta_1$ | $-0.0691\times0.5\times0.622\times0.378$ | −0.0081 |
| $\delta_2$ | $-0.0691\times0.6\times0.750\times0.250$ | −0.0078 |

## Step 4: the gradient of each weight
The golden rule: **weight gradient = error of the destination neuron × output of the source neuron**.

| Weight | Formula | Gradient | New weight with $\eta=0.5$ |
|---|---|---|---|
| $v_1$ | $\delta_o h_1$ | −0.0430 | 0.5215 |
| $v_2$ | $\delta_o h_2$ | −0.0518 | 0.6259 |
| $w_{11}$ | $\delta_1 x_1$ | −0.0081 | 0.1041 |
| $w_{12}$ | $\delta_1 x_2$ | −0.0162 | 0.2081 |
| $w_{21}$ | $\delta_2 x_1$ | −0.0078 | 0.3039 |
| $w_{22}$ | $\delta_2 x_2$ | −0.0155 | 0.4078 |

Every gradient is negative, so every weight grows a little and the output moves from 0.682 toward 1. After this single step the loss drops from 0.0507 to about 0.0481.

## The general formulas in matrix form
For layer $l$ with input $a^{(l-1)}$, weights $W^{(l)}$ and activation f:

| Stage | Formula |
|---|---|
| Forward | $z^{(l)}=W^{(l)}a^{(l-1)}+b^{(l)},\quad a^{(l)}=f(z^{(l)})$ |
| Error of the last layer | $\delta^{(L)}=\nabla_a L\odot f'(z^{(L)})$ |
| Error of earlier layers | $\delta^{(l)}=\big(W^{(l+1)\top}\delta^{(l+1)}\big)\odot f'(z^{(l)})$ |
| Weight gradient | $\partial L/\partial W^{(l)}=\delta^{(l)}\,a^{(l-1)\top}$ |
| Bias gradient | $\partial L/\partial b^{(l)}=\delta^{(l)}$ |

$\odot$ is the element-wise product. Notice that the backward pass uses the **transpose** of the same weight matrix as the forward pass.

## Why gradients vanish or explode
At each layer δ is multiplied by $W^\top$ and by $f'(z)$. After L layers it has been multiplied L times:

| Situation | Result | Fix |
|---|---|---|
| Small $f'$ (sigmoid: at most 0.25) | The gradient vanishes | ReLU, skip connections (ResNet), batch normalization |
| Large weights | The gradient explodes | Gradient clipping, proper initialization |
| All initial weights zero | All neurons stay identical | Random initialization |

| Initialization | Variance of the weights | Suited to |
|---|---|---|
| Xavier / Glorot | $\dfrac{2}{n_{in}+n_{out}}$ | Sigmoid, tanh |
| He | $\dfrac{2}{n_{in}}$ | ReLU |

## Gradient checking
Backpropagation can always be checked with a numerical derivative: nudge one weight and see how much the loss changes. The code below does that and then trains the network to solve XOR.

[[c:0]]`],
  code: [`import numpy as np

sig = lambda z: 1 / (1 + np.exp(-z))

x = np.array([1.0, 2.0]); y = 1.0
W = np.array([[0.1, 0.2],        # weights into hidden neuron 1
              [0.3, 0.4]])       # weights into hidden neuron 2
v = np.array([0.5, 0.6])         # hidden -> output

def forward(W, v):
    h = sig(W @ x); y_hat = sig(v @ h)
    return h, y_hat, 0.5 * (y_hat - y) ** 2

h, y_hat, L = forward(W, v)
print("h =", h.round(4), "  y_hat =", round(y_hat, 4), "  L =", round(L, 4))

delta_o = (y_hat - y) * y_hat * (1 - y_hat)
delta_h = delta_o * v * h * (1 - h)
grad_v = delta_o * h
grad_W = np.outer(delta_h, x)
print("delta_o =", round(delta_o, 4), "  delta_h =", delta_h.round(4))
print("grad_v =", grad_v.round(4)); print("grad_W ="); print(grad_W.round(4))

# Gradient check for w11
eps = 1e-6; Wp = W.copy(); Wp[0, 0] += eps; Wm = W.copy(); Wm[0, 0] -= eps
print("numeric dL/dw11 =", round((forward(Wp, v)[2] - forward(Wm, v)[2]) / (2 * eps), 6), "  backprop =", round(grad_W[0, 0], 6))

W2, v2 = W - 0.5 * grad_W, v - 0.5 * grad_v
print("loss after one step:", round(forward(W2, v2)[2], 4))

# Train a 2-4-1 network on XOR with the matrix formulas
rng = np.random.default_rng(1)
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float); T = np.array([[0], [1], [1], [0]], dtype=float)
W1 = rng.normal(0, 1, (2, 4)); b1 = np.zeros(4); W2 = rng.normal(0, 1, (4, 1)); b2 = np.zeros(1)
for epoch in range(1, 5001):
    H = sig(X @ W1 + b1); Y = sig(H @ W2 + b2)                  # forward
    d2 = (Y - T) * Y * (1 - Y); d1 = (d2 @ W2.T) * H * (1 - H)  # backward
    W2 -= 1.0 * H.T @ d2; b2 -= 1.0 * d2.sum(0); W1 -= 1.0 * X.T @ d1; b1 -= 1.0 * d1.sum(0)
    if epoch % 1000 == 0: print(f"epoch {epoch}: loss = {0.5 * np.sum((Y - T) ** 2):.4f}")
print("XOR predictions:", Y.ravel().round(2))`],
  ex: [E("در همین شبکه اگر $y=0$ بود، $\\delta_o$ و گرادیان $v_1$ چه می‌شد؟ علامت‌ها چه چیزی را نشان می‌دهند؟", "In the same network, if $y=0$, what would $\\delta_o$ and the gradient of $v_1$ be? What do the signs tell you?", `import numpy as np
sig = lambda z: 1 / (1 + np.exp(-z))
h = sig(np.array([0.5, 1.1])); y_hat = sig(np.array([0.5, 0.6]) @ h)
d = (y_hat - 0) * y_hat * (1 - y_hat)
print(round(d, 4), round(d * h[0], 4))   # 0.1479  0.0921`, "$\\delta_o=0.682\\times0.682\\times0.318=0.148$ و $\\partial L/\\partial v_1=0.148\\times0.622=0.092$. مثبت‌اند؛ پس وزن‌ها باید کم شوند تا خروجی به 0 نزدیک شود.", "$\\delta_o=0.682\\times0.682\\times0.318=0.148$ and $\\partial L/\\partial v_1=0.148\\times0.622=0.092$. They are positive, so the weights must decrease to bring the output toward 0.")],
  quiz: [Q("گرادیان یک وزن در پس‌انتشار چیست؟", "In backpropagation, the gradient of a weight is...", ["خطای نورون مقصد × خروجی نورون مبدأ", "خروجی شبکه × ورودی", "همیشه 0.25"], ["the error of the destination neuron × the output of the source neuron", "the network output × the input", "always 0.25"], 0),
    Q("چرا در شبکه عمیق با سیگموید گرادیان محو می‌شود؟", "Why does the gradient vanish in a deep sigmoid network?", ["مشتق سیگموید حداکثر 0.25 است و بارها ضرب می‌شود", "چون وزن‌ها مثبت‌اند", "چون داده کم است"], ["The sigmoid derivative is at most 0.25 and is multiplied many times", "Because the weights are positive", "Because there is little data"], 0),
    Q("اگر همه وزن‌های اولیه صفر باشند چه می‌شود؟", "What happens if all initial weights are zero?", ["همه نورون‌های یک لایه یکسان می‌مانند", "شبکه سریع‌تر یاد می‌گیرد", "گرادیان منفجر می‌شود"], ["All neurons in a layer stay identical", "The network learns faster", "The gradient explodes"], 0)]
});

L({ id: "math-optim",
  fa: ["بهینه‌سازها: مومنتوم، RMSProp و Adam", R`## مشکل گرادیان کاهشی ساده
در دره‌های باریک (وقتی انحنا در جهت‌های مختلف خیلی فرق دارد)، گرادیان کاهشی ساده **زیگزاگ** می‌رود: در جهت تند نوسان می‌کند و در جهت کم‌شیب آهسته پیش می‌رود.

[[fig:math_optimizers.png|چهار بهینه‌ساز از یک نقطه شروع روی دره باریک $f=\frac12x^2+12.5y^2$. ستاره قرمز کمینه است.]]

## مومنتوم: توپی که سرعت می‌گیرد
به جای گام مستقیم، **سرعت** را به‌روز می‌کنیم که میانگین متحرک گرادیان‌های قبلی است:

$$v\leftarrow\beta v-\eta\nabla L\qquad\theta\leftarrow\theta+v$$

- در جهتی که گرادیان‌ها هم‌علامت‌اند، سرعت **جمع می‌شود**.
- در جهتی که علامت عوض می‌شود (زیگزاگ)، **خنثی می‌شوند**.

با $\beta=0.9$ سرعت نهایی تا $\dfrac{1}{1-\beta}=10$ برابر یک گام ساده می‌شود.

## مثال عددی مومنتوم
گرادیان ثابت $g=1$، $\eta=0.1$، $\beta=0.9$:

| گام | $v=0.9v-0.1$ | جابه‌جایی کل |
|---|---|---|
| 1 | −0.100 | −0.100 |
| 2 | −0.190 | −0.290 |
| 3 | −0.271 | −0.561 |
| 4 | −0.344 | −0.905 |
| ∞ | −1.000 | |

## RMSProp: نرخ یادگیری جدا برای هر پارامتر
میانگین متحرک **مربع** گرادیان را نگه می‌دارد و گام را بر جذر آن تقسیم می‌کند:

$$s\leftarrow\rho s+(1-\rho)(\nabla L)^2\qquad\theta\leftarrow\theta-\frac{\eta}{\sqrt{s}+\epsilon}\nabla L$$

پارامتری که گرادیان‌های بزرگ دارد گام کوچک‌تر می‌گیرد و برعکس؛ یعنی مقیاس‌بندی خودکار.

## Adam = مومنتوم + RMSProp
| گام | فرمول | معنی |
|---|---|---|
| 1 | $m\leftarrow\beta_1m+(1-\beta_1)g$ | میانگین گرادیان (جهت) |
| 2 | $s\leftarrow\beta_2s+(1-\beta_2)g^2$ | میانگین مربع گرادیان (مقیاس) |
| 3 | $\hat{m}=\dfrac{m}{1-\beta_1^t},\quad\hat{s}=\dfrac{s}{1-\beta_2^t}$ | تصحیح بایاس شروع از صفر |
| 4 | $\theta\leftarrow\theta-\eta\dfrac{\hat{m}}{\sqrt{\hat{s}}+\epsilon}$ | گام |

مقادیر پیش‌فرض: $\beta_1=0.9$، $\beta_2=0.999$، $\eta=0.001$، $\epsilon=10^{-8}$.

## مثال عددی: گام اول Adam
با $g=4$ و $\eta=0.1$:

| کمیت | محاسبه | مقدار |
|---|---|---|
| $m$ | $0.1\times4$ | 0.4 |
| $s$ | $0.001\times16$ | 0.016 |
| $\hat{m}$ | $0.4/(1-0.9)$ | 4 |
| $\hat{s}$ | $0.016/(1-0.999)$ | 16 |
| گام | $0.1\times4/\sqrt{16}$ | 0.1 |

!نتیجه جالب: گام اول Adam همیشه تقریباً برابر $\eta$ است، **مستقل از بزرگی گرادیان**. اگر گرادیان 4000 بود هم گام 0.1 می‌شد. به همین دلیل Adam به مقیاس تابع خطا حساس نیست و نرخ یادگیری پیش‌فرض آن اغلب خوب کار می‌کند.

## مقایسه
| بهینه‌ساز | حافظه اضافه | نقطه قوت | نقطه ضعف |
|---|---|---|---|
| SGD | هیچ | ساده؛ تعمیم خوب | کند در دره‌ها؛ حساس به η |
| SGD + مومنتوم | v | سریع‌تر؛ انتخاب رایج در بینایی ماشین | یک ابرپارامتر بیشتر |
| RMSProp | s | مناسب شبکه‌های بازگشتی | بدون مومنتوم |
| Adam | m و s | پیش‌فرض خوب؛ تنظیم کم | گاهی تعمیم کمی ضعیف‌تر |
| AdamW | m و s | Adam با weight decay درست؛ استاندارد ترنسفورمرها | |

## برنامه نرخ یادگیری
| برنامه | رفتار | کاربرد |
|---|---|---|
| ثابت | همیشه η | ساده |
| پله‌ای | هر چند epoch تقسیم بر 10 | شبکه‌های کانولوشنی کلاسیک |
| کسینوسی | کاهش نرم تا صفر | آموزش‌های مدرن |
| Warmup | شروع از صفر و افزایش تدریجی | ترنسفورمرها |
| کاهش روی فلات | وقتی خطای اعتبارسنجی بهتر نمی‌شود | عمومی |

[[c:0]]`],
  en: ["Optimizers: momentum, RMSProp and Adam", R`## The trouble with plain gradient descent
In narrow valleys (when the curvature differs a lot between directions) plain gradient descent **zigzags**: it oscillates along the steep direction and creeps along the shallow one.

[[fig:math_optimizers.png|Four optimizers from the same start on the narrow valley $f=\frac12x^2+12.5y^2$. The red star is the minimum.]]

## Momentum: a ball that picks up speed
Instead of stepping directly, we update a **velocity** that is a running average of past gradients:

$$v\leftarrow\beta v-\eta\nabla L\qquad\theta\leftarrow\theta+v$$

- Along a direction where gradients keep the same sign, the velocity **builds up**.
- Along a direction where the sign flips (the zigzag), they **cancel**.

With $\beta=0.9$ the final speed is up to $\dfrac{1}{1-\beta}=10$ times a plain step.

## Momentum by numbers
Constant gradient $g=1$, $\eta=0.1$, $\beta=0.9$:

| Step | $v=0.9v-0.1$ | Total movement |
|---|---|---|
| 1 | −0.100 | −0.100 |
| 2 | −0.190 | −0.290 |
| 3 | −0.271 | −0.561 |
| 4 | −0.344 | −0.905 |
| ∞ | −1.000 | |

## RMSProp: a separate learning rate for each parameter
It keeps a running average of the **squared** gradient and divides the step by its square root:

$$s\leftarrow\rho s+(1-\rho)(\nabla L)^2\qquad\theta\leftarrow\theta-\frac{\eta}{\sqrt{s}+\epsilon}\nabla L$$

A parameter with large gradients takes smaller steps and the other way round: automatic scaling.

## Adam = momentum + RMSProp
| Step | Formula | Meaning |
|---|---|---|
| 1 | $m\leftarrow\beta_1m+(1-\beta_1)g$ | Average gradient (direction) |
| 2 | $s\leftarrow\beta_2s+(1-\beta_2)g^2$ | Average squared gradient (scale) |
| 3 | $\hat{m}=\dfrac{m}{1-\beta_1^t},\quad\hat{s}=\dfrac{s}{1-\beta_2^t}$ | Corrects the bias of starting at zero |
| 4 | $\theta\leftarrow\theta-\eta\dfrac{\hat{m}}{\sqrt{\hat{s}}+\epsilon}$ | The step |

Defaults: $\beta_1=0.9$, $\beta_2=0.999$, $\eta=0.001$, $\epsilon=10^{-8}$.

## Worked example: the first Adam step
With $g=4$ and $\eta=0.1$:

| Quantity | Calculation | Value |
|---|---|---|
| $m$ | $0.1\times4$ | 0.4 |
| $s$ | $0.001\times16$ | 0.016 |
| $\hat{m}$ | $0.4/(1-0.9)$ | 4 |
| $\hat{s}$ | $0.016/(1-0.999)$ | 16 |
| Step | $0.1\times4/\sqrt{16}$ | 0.1 |

!A striking result: the first Adam step is always about $\eta$, **whatever the size of the gradient**. With a gradient of 4000 the step would still be 0.1. This is why Adam does not care about the scale of the loss and its default learning rate often just works.

## Comparison
| Optimizer | Extra memory | Strength | Weakness |
|---|---|---|---|
| SGD | None | Simple; generalizes well | Slow in valleys; sensitive to η |
| SGD + momentum | v | Faster; common in computer vision | One more hyperparameter |
| RMSProp | s | Good for recurrent networks | No momentum |
| Adam | m and s | A good default; little tuning | Sometimes generalizes slightly worse |
| AdamW | m and s | Adam with correct weight decay; the standard for transformers | |

## Learning-rate schedules
| Schedule | Behaviour | Used in |
|---|---|---|
| Constant | Always η | Simple cases |
| Step | Divide by 10 every few epochs | Classic convolutional networks |
| Cosine | Smooth decay to zero | Modern training |
| Warmup | Start at zero and ramp up | Transformers |
| Reduce on plateau | When the validation loss stops improving | General |

[[c:0]]`],
  code: [`import numpy as np
import matplotlib.pyplot as plt

f    = lambda p: 0.5 * p[0] ** 2 + 12.5 * p[1] ** 2       # a narrow valley: 25 times steeper along y
grad = lambda p: np.array([p[0], 25 * p[1]])

def run(name, steps=80):
    p = np.array([-3.5, 1.5]); path = [p.copy()]
    v = np.zeros(2); s = np.zeros(2); m = np.zeros(2)
    for t in range(1, steps + 1):
        g = grad(p)
        if name == "GD":
            p = p - 0.07 * g                      # must stay below 2/25 = 0.08 or it diverges
        elif name == "Momentum":
            v = 0.8 * v - 0.02 * g; p = p + v
        elif name == "RMSProp":
            s = 0.9 * s + 0.1 * g ** 2; p = p - 0.1 * g / (np.sqrt(s) + 1e-8)
        elif name == "Adam":
            m = 0.9 * m + 0.1 * g; s = 0.999 * s + 0.001 * g ** 2
            p = p - 0.2 * (m / (1 - 0.9 ** t)) / (np.sqrt(s / (1 - 0.999 ** t)) + 1e-8)
        path.append(p.copy())
    return np.array(path)

u, w = np.meshgrid(np.linspace(-4, 1.5, 200), np.linspace(-2, 2, 200))
plt.contour(u, w, 0.5 * u ** 2 + 12.5 * w ** 2, levels=12, colors="lightgray")
for name in ["GD", "Momentum", "RMSProp", "Adam"]:
    path = run(name)
    plt.plot(path[:, 0], path[:, 1], marker="o", ms=2, label=name)
    values = np.array([f(q) for q in path])
    hit = np.argmax(values < 0.01) if (values < 0.01).any() else "never"
    print(f"{name:9s} f after 80 steps = {values[-1]:.2e}   first step with f < 0.01: {hit}")
plt.legend(); plt.title("Optimizers on a narrow valley"); plt.show()

# Momentum with a constant gradient: the velocity approaches -eta / (1 - beta)
v = 0.0
for step in range(1, 5):
    v = 0.9 * v - 0.1 * 1.0
    print(f"step {step}: v = {v:.3f}")

# The first Adam step has size eta, whatever the gradient
for g in [0.004, 4.0, 4000.0]:
    m = 0.1 * g; s = 0.001 * g ** 2
    print(f"g = {g:8}: first Adam step = {0.1 * (m / 0.1) / np.sqrt(s / 0.001):.4f}")`],
  ex: [E("با $\\beta=0.5$، $\\eta=0.1$ و گرادیان ثابت $g=2$، سرعت مومنتوم را برای سه گام حساب کن. سرعت نهایی چقدر است؟", "With $\\beta=0.5$, $\\eta=0.1$ and a constant gradient $g=2$, compute the momentum velocity for three steps. What is the final speed?", `v = 0.0
for k in range(3):
    v = 0.5 * v - 0.1 * 2
    print(k + 1, v)        # -0.2, -0.3, -0.35
print(-0.1 * 2 / (1 - 0.5))   # limit -0.4`, "سرعت‌ها −0.2، −0.3 و −0.35 هستند و به $-\\eta g/(1-\\beta)=-0.4$ میل می‌کنند.", "The velocities are −0.2, −0.3 and −0.35, approaching $-\\eta g/(1-\\beta)=-0.4$."),
    E("در آزمایشگاه گرادیان کاهشی (درس قبل) دره باریک را با $\\eta=0.15$ بدون مومنتوم و سپس با $\\beta=0.8$ اجرا کن.", "In the gradient-descent lab (earlier lesson) run the narrow valley with $\\eta=0.15$ without momentum, then with $\\beta=0.8$.", null, "بدون مومنتوم مسیر در جهت y به‌شدت نوسان می‌کند. با مومنتوم نوسان‌ها خنثی و حرکت در جهت x سریع‌تر می‌شود.", "Without momentum the path oscillates strongly along y. With momentum the oscillations cancel and the motion along x speeds up.")],
  quiz: [Q("مومنتوم چه کاری می‌کند؟", "What does momentum do?", ["گرادیان‌های هم‌جهت را جمع و نوسان‌ها را خنثی می‌کند", "نرخ یادگیری را صفر می‌کند", "داده را مقیاس‌بندی می‌کند"], ["Accumulates consistent gradients and cancels oscillations", "Sets the learning rate to zero", "Scales the data"], 0),
    Q("Adam ترکیب کدام دو ایده است؟", "Adam combines which two ideas?", ["مومنتوم و RMSProp", "Ridge و Lasso", "Dropout و Batch Norm"], ["Momentum and RMSProp", "Ridge and Lasso", "Dropout and batch norm"], 0),
    Q("اندازه گام اول Adam تقریباً چقدر است؟", "About how large is the first Adam step?", ["برابر η، مستقل از بزرگی گرادیان", "برابر گرادیان", "صفر"], ["η, whatever the size of the gradient", "Equal to the gradient", "Zero"], 0)]
});

L({ id: "math-regular",
  fa: ["ریاضی بیش‌برازش: بایاس، واریانس و منظم‌سازی", R`## تجزیه خطا
خطای مورد انتظار یک مدل روی داده جدید به سه بخش تقسیم می‌شود:

$$E\big[(y-\hat{f}(x))^2\big]=\underbrace{\text{Bias}^2}_{\text{too simple}}+\underbrace{\text{Variance}}_{\text{too sensitive}}+\underbrace{\sigma^2}_{\text{noise}}$$

| جزء | یعنی چه | چه وقت بزرگ است |
|---|---|---|
| بایاس | فاصله «میانگین مدل‌ها» از واقعیت | مدل خیلی ساده (کم‌برازش) |
| واریانس | تغییر مدل وقتی داده آموزش عوض می‌شود | مدل خیلی پیچیده (بیش‌برازش) |
| نویز $\sigma^2$ | خطای ذاتی داده | همیشه؛ قابل حذف نیست |

[[fig:math_biasvar.png|25 مدل که هر کدام روی یک نمونه 20 تایی متفاوت آموزش دیده‌اند. خط نارنجی میانگین آن‌هاست.]]

| | درجه 1 | درجه 4 | درجه 12 |
|---|---|---|---|
| بایاس | زیاد | کم | خیلی کم |
| واریانس | کم | متوسط | خیلی زیاد |
| خطای آموزش | زیاد | کم | نزدیک صفر |
| خطای آزمون | زیاد | کمترین | زیاد |

## منظم‌سازی L2 (Ridge): کوچک کردن وزن‌ها
$$L_{\text{ridge}}=\sum_i(y_i-\hat{y}_i)^2+\lambda\sum_j w_j^2$$

برای یک ویژگی (بدون عرض از مبدأ) جواب بسته دارد:

$$w_{\text{ridge}}=\frac{\sum x_iy_i}{\sum x_i^2+\lambda}$$

مثال: اگر $\sum x_iy_i=20$ و $\sum x_i^2=10$ باشد:

| $\lambda$ | محاسبه | $w$ |
|---|---|---|
| 0 | $20/10$ | 2.00 |
| 10 | $20/20$ | 1.00 |
| 90 | $20/100$ | 0.20 |
| 990 | $20/1000$ | 0.02 |

وزن کوچک می‌شود ولی **هیچ‌وقت دقیقاً صفر نمی‌شود**. در گرادیان کاهشی، جمله L2 در هر گام وزن را در $(1-2\eta\lambda)$ ضرب می‌کند؛ به همین دلیل به آن **weight decay** هم می‌گویند.

## منظم‌سازی L1 (Lasso): صفر کردن وزن‌ها
$$L_{\text{lasso}}=\sum_i(y_i-\hat{y}_i)^2+\lambda\sum_j\lvert w_j\rvert$$

جواب آن «آستانه نرم» است: وزن را به اندازه t به سمت صفر می‌کشد و اگر از صفر رد شد، همان‌جا نگهش می‌دارد:

$$w_{\text{lasso}}=\mathrm{sign}(w_{\text{ols}})\cdot\max\big(0,\ \lvert w_{\text{ols}}\rvert-t\big),\qquad t=\frac{\lambda}{2\sum x_i^2}$$

| $w_{\text{ols}}$ | $t=0.5$ | $t=1.5$ | $t=2.5$ |
|---|---|---|---|
| 2.0 | 1.5 | 0.5 | 0 |
| −0.8 | −0.3 | 0 | 0 |
| 0.3 | 0 | 0 | 0 |

وزن‌های کوچک **دقیقاً صفر** می‌شوند؛ یعنی Lasso انتخاب ویژگی انجام می‌دهد.

## چرا L1 صفر می‌کند و L2 نه؟
[[fig:l1_l2.png|ناحیه مجاز L1 لوزی است و گوشه‌هایش روی محورها قرار دارد؛ ناحیه L2 دایره است.]]

| | L2 | L1 |
|---|---|---|
| شکل قید | دایره | لوزی |
| نقطه تماس با خطوط هم‌تراز خطا | معمولاً جایی روی کمان | معمولاً روی گوشه (یک وزن = 0) |
| مشتق جریمه نزدیک صفر | $2\lambda w\to0$: فشار کم می‌شود | $\pm\lambda$: فشار ثابت تا خود صفر |
| پیشین بیزی | نرمال | لاپلاس |

## روش‌های دیگر منظم‌سازی
| روش | ایده ریاضی |
|---|---|
| توقف زودهنگام | آموزش را وقتی خطای اعتبارسنجی بالا می‌رود قطع کن؛ اثری شبیه L2 دارد |
| Dropout | هر نورون با احتمال p حذف می‌شود؛ مثل میانگین‌گیری از تعداد زیادی زیرشبکه |
| افزایش داده | نمونه‌های بیشتر، واریانس را کم می‌کند (خطای استاندارد $\propto1/\sqrt{n}$) |
| Bagging | میانگین M مدل مستقل، واریانس را بر M تقسیم می‌کند |

[[c:0]]`],
  en: ["The math of overfitting: bias, variance and regularization", R`## Decomposing the error
The expected error of a model on new data splits into three parts:

$$E\big[(y-\hat{f}(x))^2\big]=\underbrace{\text{Bias}^2}_{\text{too simple}}+\underbrace{\text{Variance}}_{\text{too sensitive}}+\underbrace{\sigma^2}_{\text{noise}}$$

| Part | What it means | When it is large |
|---|---|---|
| Bias | Distance of the "average model" from the truth | The model is too simple (underfitting) |
| Variance | How much the model changes when the training data changes | The model is too complex (overfitting) |
| Noise $\sigma^2$ | The error built into the data | Always; it cannot be removed |

[[fig:math_biasvar.png|25 models, each trained on a different sample of 20 points. The orange line is their average.]]

| | Degree 1 | Degree 4 | Degree 12 |
|---|---|---|---|
| Bias | High | Low | Very low |
| Variance | Low | Medium | Very high |
| Training error | High | Low | Near zero |
| Test error | High | Lowest | High |

## L2 regularization (Ridge): shrinking the weights
$$L_{\text{ridge}}=\sum_i(y_i-\hat{y}_i)^2+\lambda\sum_j w_j^2$$

For one feature (no intercept) there is a closed form:

$$w_{\text{ridge}}=\frac{\sum x_iy_i}{\sum x_i^2+\lambda}$$

Example: if $\sum x_iy_i=20$ and $\sum x_i^2=10$:

| $\lambda$ | Calculation | $w$ |
|---|---|---|
| 0 | $20/10$ | 2.00 |
| 10 | $20/20$ | 1.00 |
| 90 | $20/100$ | 0.20 |
| 990 | $20/1000$ | 0.02 |

The weight shrinks but **never becomes exactly zero**. In gradient descent the L2 term multiplies the weight by $(1-2\eta\lambda)$ at every step, which is why it is also called **weight decay**.

## L1 regularization (Lasso): zeroing weights
$$L_{\text{lasso}}=\sum_i(y_i-\hat{y}_i)^2+\lambda\sum_j\lvert w_j\rvert$$

Its solution is "soft thresholding": pull the weight toward zero by t, and if it would cross zero, leave it there:

$$w_{\text{lasso}}=\mathrm{sign}(w_{\text{ols}})\cdot\max\big(0,\ \lvert w_{\text{ols}}\rvert-t\big),\qquad t=\frac{\lambda}{2\sum x_i^2}$$

| $w_{\text{ols}}$ | $t=0.5$ | $t=1.5$ | $t=2.5$ |
|---|---|---|---|
| 2.0 | 1.5 | 0.5 | 0 |
| −0.8 | −0.3 | 0 | 0 |
| 0.3 | 0 | 0 | 0 |

Small weights become **exactly zero**, so Lasso performs feature selection.

## Why does L1 give zeros and L2 does not?
[[fig:l1_l2.png|The L1 region is a diamond with its corners on the axes; the L2 region is a circle.]]

| | L2 | L1 |
|---|---|---|
| Shape of the constraint | Circle | Diamond |
| Where the loss contours touch it | Usually somewhere on the arc | Usually at a corner (one weight = 0) |
| Derivative of the penalty near zero | $2\lambda w\to0$: the push fades | $\pm\lambda$: a constant push all the way to zero |
| Bayesian prior | Normal | Laplace |

## Other ways to regularize
| Method | The mathematical idea |
|---|---|
| Early stopping | Stop training when the validation error rises; acts much like L2 |
| Dropout | Each neuron is dropped with probability p; like averaging many sub-networks |
| More data | More samples reduce the variance (standard error $\propto1/\sqrt{n}$) |
| Bagging | Averaging M independent models divides the variance by M |

[[c:0]]`],
  code: [`import numpy as np

rng = np.random.default_rng(0)
truth = lambda x: np.sin(2 * np.pi * x)
x_test = np.linspace(0.1, 0.9, 50)

# Bias and variance measured by training 300 models on 300 different samples
print("degree   bias^2   variance   total (+ noise 0.09)")
for degree in [1, 4, 12]:
    preds = []
    for _ in range(300):
        x = rng.uniform(0, 1, 40); y = truth(x) + rng.normal(0, 0.3, 40)
        preds.append(np.polyval(np.polyfit(x, y, degree), x_test))
    preds = np.array(preds)
    bias2 = np.mean((preds.mean(axis=0) - truth(x_test)) ** 2)
    var = np.mean(preds.var(axis=0))
    print(f"{degree:5d}   {bias2:7.4f}   {var:8.4f}   {bias2 + var + 0.09:.4f}")

# Ridge with one feature: w = sum(xy) / (sum(x^2) + lambda)
for lam in [0, 10, 90, 990]:
    print(f"lambda = {lam:4d}:  w = {20 / (10 + lam):.2f}")

# Lasso: soft thresholding
soft = lambda w, t: np.sign(w) * np.maximum(0, np.abs(w) - t)
w_ols = np.array([2.0, -0.8, 0.3])
for t in [0.5, 1.5, 2.5]:
    print(f"t = {t}:", soft(w_ols, t))

# The same effect with scikit-learn on 10 features, only 3 of which matter
from sklearn.linear_model import Lasso, LinearRegression, Ridge
X = rng.normal(size=(60, 10)); y = 3 * X[:, 0] - 2 * X[:, 1] + X[:, 2] + rng.normal(0, 0.5, 60)
for name, model in [("OLS  ", LinearRegression()), ("Ridge", Ridge(alpha=20)), ("Lasso", Lasso(alpha=0.2))]:
    w = model.fit(X, y).coef_
    print(name, w.round(2), "  zeros:", int(np.sum(np.abs(w) < 1e-8)))

# Averaging M independent models divides the variance by M
single = rng.normal(0, 1, (10_000, 25))
print("variance of one model:", single[:, 0].var().round(3), "  of the average of 25:", single.mean(axis=1).var().round(3))`],
  ex: [E("اگر $\\sum x_iy_i=30$ و $\\sum x_i^2=15$ باشد، وزن Ridge را برای $\\lambda=0,\\ 15,\\ 45$ حساب کن.", "If $\\sum x_iy_i=30$ and $\\sum x_i^2=15$, compute the Ridge weight for $\\lambda=0,\\ 15,\\ 45$.", `for lam in [0, 15, 45]:
    print(lam, 30 / (15 + lam))   # 2.0, 1.0, 0.5`, "$30/15=2$، $30/30=1$ و $30/60=0.5$.", "$30/15=2$, $30/30=1$ and $30/60=0.5$."),
    E("آستانه نرم را با $t=1$ روی وزن‌های $(3,\\ -0.5,\\ 1,\\ -2)$ اعمال کن.", "Apply soft thresholding with $t=1$ to the weights $(3,\\ -0.5,\\ 1,\\ -2)$.", `import numpy as np
w = np.array([3, -0.5, 1, -2.0])
print(np.sign(w) * np.maximum(0, np.abs(w) - 1))   # [2, -0, 0, -1]`, "نتیجه: $(2,\\ 0,\\ 0,\\ -1)$. دو وزن دقیقاً صفر شدند.", "The result is $(2,\\ 0,\\ 0,\\ -1)$. Two weights became exactly zero.")],
  quiz: [Q("مدل خیلی پیچیده معمولاً چه مشکلی دارد؟", "A very complex model usually suffers from...", ["واریانس زیاد", "بایاس زیاد", "نویز زیاد"], ["high variance", "high bias", "high noise"], 0),
    Q("کدام منظم‌سازی وزن‌ها را دقیقاً صفر می‌کند؟", "Which regularization sets weights exactly to zero?", ["L1", "L2", "هیچ‌کدام"], ["L1", "L2", "Neither"], 0),
    Q("کدام بخش خطا با هیچ مدلی کم نمی‌شود؟", "Which part of the error can no model reduce?", ["نویز $\\sigma^2$", "بایاس", "واریانس"], ["The noise $\\sigma^2$", "The bias", "The variance"], 0)]
});

L({ id: "math-project", project: true,
  fa: ["پروژه: PCA و طبقه‌بند softmax فقط با NumPy", R`## هدف
در این پروژه همه چیزهایی را که یاد گرفتی کنار هم می‌گذاری و **بدون scikit-learn** دو الگوریتم واقعی می‌سازی. داده: گل‌های زنبق (150 نمونه، 4 ویژگی، 3 کلاس).

| بخش | ریاضی‌ای که استفاده می‌شود | درس مربوط |
|---|---|---|
| استانداردسازی | میانگین، انحراف معیار، نمره z | آمار توصیفی |
| PCA | ماتریس کوواریانس، بردار ویژه، SVD | مقدار ویژه، SVD |
| طبقه‌بند | ضرب ماتریسی، softmax | ماتریس‌ها، ریاضی طبقه‌بندی |
| تابع خطا | آنتروپی متقاطع | درست‌نمایی، آنتروپی |
| آموزش | گرادیان، گرادیان کاهشی | مشتق جزئی، گرادیان کاهشی |
| بررسی | مشتق عددی | مشتق |

## بخش 1: PCA در چهار گام
| گام | فرمول |
|---|---|
| 1. استانداردسازی | $Z=(X-\mu)/\sigma$ |
| 2. ماتریس کوواریانس | $C=\dfrac{1}{n-1}Z^\top Z$ |
| 3. تجزیه ویژه | $C=V\Lambda V^\top$ و مرتب‌سازی نزولی |
| 4. تصویر کردن | $T=ZV_k$ |

سهم هر مؤلفه از واریانس: $\lambda_i/\sum_j\lambda_j$.

[[fig:math_pca_iris.png|چپ: چهار ویژگی گل زنبق که به دو مؤلفه اصلی تصویر شده‌اند. راست: سهم هر مؤلفه از واریانس.]]

[[c:0]]

دو مؤلفه اول حدود 96٪ واریانس را نگه می‌دارند. SVD همان جواب را می‌دهد: $\lambda_i=\sigma_i^2/(n-1)$.

## بخش 2: رگرسیون softmax
مدل برای n نمونه، d ویژگی و K کلاس:

$$Z=XW+b\qquad P=\mathrm{softmax}(Z)\qquad L=-\frac1n\sum_i\ln P_{i,y_i}$$

گرادیان‌ها (از درس ریاضی طبقه‌بندی، به شکل ماتریسی):

$$\frac{\partial L}{\partial W}=\frac1nX^\top(P-Y)\qquad\frac{\partial L}{\partial b}=\frac1n\sum_i(P_i-Y_i)$$

که Y ماتریس one-hot برچسب‌هاست.

| نماد | شکل | در این پروژه |
|---|---|---|
| X | $n\times d$ | $120\times4$ |
| W | $d\times K$ | $4\times3$ |
| b | K | 3 |
| P و Y | $n\times K$ | $120\times3$ |

[[c:1]]

## چه چیزی را بررسی کنیم؟
- خطای اولیه باید نزدیک $\ln3=1.099$ باشد (مدل هنوز هیچ نمی‌داند و به هر کلاس احتمال یک‌سوم می‌دهد).
- گرادیان تحلیلی و عددی باید تا چند رقم اعشار یکی باشند.
- خطا باید در هر epoch کم شود؛ اگر زیاد شد نرخ یادگیری بزرگ است.
- دقت نهایی باید به scikit-learn نزدیک باشد.

## ادامه بده
- یک لایه پنهان با ReLU اضافه کن و پس‌انتشار آن را بنویس.
- جریمه L2 به خطا و گرادیان اضافه کن: $\lambda\lVert W\rVert^2$ و $2\lambda W$.
- به جای گرادیان کاهشی ساده، Adam را پیاده کن.
- همین طبقه‌بند را روی دو مؤلفه اصلی PCA آموزش بده و دقت را مقایسه کن.`],
  en: ["Project: PCA and a softmax classifier with NumPy only", R`## The goal
In this project you put everything together and build two real algorithms **without scikit-learn**. The data: iris flowers (150 samples, 4 features, 3 classes).

| Part | Math used | Lesson |
|---|---|---|
| Standardization | Mean, standard deviation, z-score | Descriptive statistics |
| PCA | Covariance matrix, eigenvectors, SVD | Eigenvalues, SVD |
| The classifier | Matrix products, softmax | Matrices, math of classification |
| The loss | Cross-entropy | Likelihood, entropy |
| Training | Gradient, gradient descent | Partial derivatives, gradient descent |
| Checking | Numerical derivative | Derivatives |

## Part 1: PCA in four steps
| Step | Formula |
|---|---|
| 1. Standardize | $Z=(X-\mu)/\sigma$ |
| 2. Covariance matrix | $C=\dfrac{1}{n-1}Z^\top Z$ |
| 3. Eigendecomposition | $C=V\Lambda V^\top$, sorted in decreasing order |
| 4. Project | $T=ZV_k$ |

The share of variance of each component is $\lambda_i/\sum_j\lambda_j$.

[[fig:math_pca_iris.png|Left: the four iris features projected onto two principal components. Right: the share of variance of each component.]]

[[c:0]]

The first two components keep about 96% of the variance. The SVD gives the same answer: $\lambda_i=\sigma_i^2/(n-1)$.

## Part 2: softmax regression
The model for n samples, d features and K classes:

$$Z=XW+b\qquad P=\mathrm{softmax}(Z)\qquad L=-\frac1n\sum_i\ln P_{i,y_i}$$

The gradients (from the classification-math lesson, in matrix form):

$$\frac{\partial L}{\partial W}=\frac1nX^\top(P-Y)\qquad\frac{\partial L}{\partial b}=\frac1n\sum_i(P_i-Y_i)$$

where Y is the one-hot matrix of the labels.

| Symbol | Shape | In this project |
|---|---|---|
| X | $n\times d$ | $120\times4$ |
| W | $d\times K$ | $4\times3$ |
| b | K | 3 |
| P and Y | $n\times K$ | $120\times3$ |

[[c:1]]

## What to check
- The initial loss should be close to $\ln3=1.099$ (the model knows nothing yet and gives each class one third).
- The analytic and numerical gradients should agree to several decimals.
- The loss should fall every epoch; if it rises, the learning rate is too large.
- The final accuracy should be close to scikit-learn's.

## Keep going
- Add a hidden ReLU layer and write its backpropagation.
- Add an L2 penalty to the loss and the gradient: $\lambda\lVert W\rVert^2$ and $2\lambda W$.
- Replace plain gradient descent with Adam.
- Train the same classifier on the two PCA components and compare the accuracy.`],
  code: [`import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris          # used only to load the data

iris = load_iris(); X, y = iris.data, iris.target
Z = (X - X.mean(axis=0)) / X.std(axis=0)                 # 1. standardize
C = Z.T @ Z / (len(Z) - 1)                               # 2. covariance matrix
vals, vecs = np.linalg.eigh(C)                           # 3. eigendecomposition (ascending)
order = np.argsort(vals)[::-1]; vals, vecs = vals[order], vecs[:, order]
T = Z @ vecs[:, :2]                                      # 4. project on 2 components

print("eigenvalues:", vals.round(3))
print("variance explained:", (vals / vals.sum()).round(3), " first two:", round(vals[:2].sum() / vals.sum(), 3))
print("first component:", vecs[:, 0].round(3))

# The SVD gives the same eigenvalues
s = np.linalg.svd(Z, compute_uv=False)
print("from the SVD:", (s ** 2 / (len(Z) - 1)).round(3))

for k, name in enumerate(iris.target_names):
    plt.scatter(T[y == k, 0], T[y == k, 1], s=15, label=name)
plt.xlabel("PC 1"); plt.ylabel("PC 2"); plt.legend(); plt.title("PCA from scratch"); plt.show()`,
`import numpy as np
from sklearn.datasets import load_iris

iris = load_iris(); X, y = iris.data, iris.target
rng = np.random.default_rng(0)
idx = rng.permutation(150); tr, te = idx[:120], idx[120:]
mu, sd = X[tr].mean(axis=0), X[tr].std(axis=0)           # statistics from the training set only
Xtr, Xte = (X[tr] - mu) / sd, (X[te] - mu) / sd
Y = np.eye(3)[y[tr]]                                     # one-hot labels, 120 x 3

def softmax(Z):
    E = np.exp(Z - Z.max(axis=1, keepdims=True))
    return E / E.sum(axis=1, keepdims=True)

def loss_and_grads(W, b):
    P = softmax(Xtr @ W + b)
    loss = -np.mean(np.log(P[np.arange(120), y[tr]]))
    return loss, Xtr.T @ (P - Y) / 120, (P - Y).mean(axis=0)

W = np.zeros((4, 3)); b = np.zeros(3)
print("initial loss:", round(loss_and_grads(W, b)[0], 4), "  ln 3 =", round(np.log(3), 4))

# Gradient check on one weight, at a random point
Wr = rng.normal(0, 0.5, (4, 3)); eps = 1e-6
Wp = Wr.copy(); Wp[1, 2] += eps; Wm = Wr.copy(); Wm[1, 2] -= eps
numeric = (loss_and_grads(Wp, b)[0] - loss_and_grads(Wm, b)[0]) / (2 * eps)
print("gradient check:", round(numeric, 6), "vs", round(loss_and_grads(Wr, b)[1][1, 2], 6))

for epoch in range(1, 501):
    loss, gW, gb = loss_and_grads(W, b)
    W -= 0.5 * gW; b -= 0.5 * gb
    if epoch in (1, 10, 100, 500): print(f"epoch {epoch:3d}: loss = {loss:.4f}")

acc = lambda A, t: np.mean(np.argmax(softmax(A @ W + b), axis=1) == t)
print("train accuracy:", round(acc(Xtr, y[tr]), 3), "  test accuracy:", round(acc(Xte, y[te]), 3))

from sklearn.linear_model import LogisticRegression
print("scikit-learn test accuracy:", round(LogisticRegression(max_iter=1000).fit(Xtr, y[tr]).score(Xte, y[te]), 3))`],
  quiz: [Q("خطای آنتروپی متقاطع یک مدل سه‌کلاسه که هنوز چیزی یاد نگرفته تقریباً چقدر است؟", "What is the cross-entropy of an untrained three-class model, roughly?", ["$\\ln3\\approx1.10$", "0", "3"], ["$\\ln3\\approx1.10$", "0", "3"], 0),
    Q("در PCA، داده روی چه چیزی تصویر می‌شود؟", "In PCA the data is projected onto...", ["بردارهای ویژه ماتریس کوواریانس با بزرگ‌ترین مقدار ویژه", "ستون‌های اول داده", "بردارهای تصادفی"], ["the eigenvectors of the covariance matrix with the largest eigenvalues", "the first columns of the data", "random vectors"], 0)]
});
FinishCourse();
