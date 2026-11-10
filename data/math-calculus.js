// Math track, part 2: calculus for optimization.
M("math", "mcalc", "حساب دیفرانسیل و بهینه‌سازی", "Calculus and optimization");

L({ id: "math-derivative",
  fa: ["مشتق: نرخ تغییر و شیب", R`## مشتق چه می‌گوید؟
مشتق می‌گوید «اگر ورودی را **کمی** زیاد کنم، خروجی **چقدر** تغییر می‌کند؟». در آموزش مدل، ورودی یک وزن و خروجی خطاست؛ پس مشتق می‌گوید هر وزن را به کدام سمت و با چه شدتی تغییر دهیم.

از نظر هندسی، مشتق **شیب خط مماس** بر منحنی است.

$$f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}$$

[[lab:m_deriv]]

## مثال عددی: مشتق $x^2$ در $x=1$
شیب خط قاطع بین $x=1$ و $x=1+h$ را برای hهای کوچک‌تر حساب می‌کنیم:

| h | $f(1+h)$ | $\dfrac{f(1+h)-f(1)}{h}$ |
|---|---|---|
| 1 | 4 | 3 |
| 0.5 | 2.25 | 2.5 |
| 0.1 | 1.21 | 2.1 |
| 0.01 | 1.0201 | 2.01 |
| 0.001 | 1.002001 | 2.001 |

شیب به 2 نزدیک می‌شود. با جبر هم همین را می‌بینیم: $\dfrac{(1+h)^2-1}{h}=2+h\to2$. پس $f'(1)=2$ و در حالت کلی $(x^2)'=2x$.

[[fig:math_tangent.png|با کوچک شدن h، خط قاطع به خط مماس تبدیل می‌شود.]]

## جدول مشتق‌های لازم
| تابع | مشتق | مثال |
|---|---|---|
| عدد ثابت $c$ | 0 | $(5)'=0$ |
| $x^n$ | $n x^{n-1}$ | $(x^3)'=3x^2$ |
| $e^x$ | $e^x$ | خودش! |
| $\ln x$ | $1/x$ | در $x=2$ برابر 0.5 |
| $\sin x$ | $\cos x$ | |
| $\sigma(x)$ سیگموید | $\sigma(x)(1-\sigma(x))$ | در $x=0$ برابر 0.25 |
| $\tanh x$ | $1-\tanh^2 x$ | در $x=0$ برابر 1 |
| ReLU | 0 اگر $x<0$، 1 اگر $x>0$ | |

## قاعده‌های ترکیب
| قاعده | فرمول | مثال |
|---|---|---|
| ضرب در عدد | $(cf)'=cf'$ | $(5x^2)'=10x$ |
| جمع | $(f+g)'=f'+g'$ | $(x^2+3x)'=2x+3$ |
| ضرب | $(fg)'=f'g+fg'$ | $(x\,e^x)'=e^x+x e^x$ |
| تقسیم | $(f/g)'=\dfrac{f'g-fg'}{g^2}$ | $(1/x)'=-1/x^2$ |
| زنجیره‌ای | $(f(g(x)))'=f'(g(x))\,g'(x)$ | $((3x+1)^2)'=6(3x+1)$ |

## کمینه و بیشینه
در نقطه کمینه یا بیشینه، خط مماس **افقی** است: $f'(x)=0$. مشتق دوم نوع نقطه را مشخص می‌کند:

| $f'(x)$ | $f''(x)$ | نوع نقطه |
|---|---|---|
| 0 | مثبت | کمینه (دره) |
| 0 | منفی | بیشینه (قله) |
| 0 | صفر | نامشخص (مثلاً نقطه عطف) |

مثال: $f(x)=x^2-4x+7$. داریم $f'(x)=2x-4=0\Rightarrow x=2$ و $f''=2>0$، پس کمینه در $x=2$ با مقدار $f(2)=3$ است.

## چرا مشتق تابع فعال‌سازی مهم است؟
[[fig:math_act_deriv.png|تابع‌های فعال‌سازی (بنفش) و مشتق آن‌ها (نارنجی).]]

بیشترین مشتق سیگموید فقط **0.25** است. در شبکه 10 لایه، گرادیان در بدترین حالت $0.25^{10}\approx0.00000095$ برابر می‌شود: لایه‌های اول تقریباً یاد نمی‌گیرند. این همان **محو شدن گرادیان** است و دلیل محبوبیت ReLU که مشتقش برای ورودی مثبت 1 است.

## مشتق عددی
وقتی فرمول مشتق را نداریم یا می‌خواهیم کدمان را بررسی کنیم، از **تفاضل مرکزی** استفاده می‌کنیم که دقیق‌تر از تفاضل یک‌طرفه است:

$$f'(x)\approx\frac{f(x+h)-f(x-h)}{2h}$$

[[c:0]]`],
  en: ["Derivatives: rate of change and slope", R`## What does a derivative say?
The derivative answers: "if I increase the input **a little**, **how much** does the output change?" In training, the input is a weight and the output is the error, so the derivative tells us which way and how strongly to change each weight.

Geometrically the derivative is the **slope of the tangent line** to the curve.

$$f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}$$

[[lab:m_deriv]]

## Worked example: the derivative of $x^2$ at $x=1$
Compute the slope of the secant line between $x=1$ and $x=1+h$ for smaller and smaller h:

| h | $f(1+h)$ | $\dfrac{f(1+h)-f(1)}{h}$ |
|---|---|---|
| 1 | 4 | 3 |
| 0.5 | 2.25 | 2.5 |
| 0.1 | 1.21 | 2.1 |
| 0.01 | 1.0201 | 2.01 |
| 0.001 | 1.002001 | 2.001 |

The slope approaches 2. Algebra says the same: $\dfrac{(1+h)^2-1}{h}=2+h\to2$. So $f'(1)=2$, and in general $(x^2)'=2x$.

[[fig:math_tangent.png|As h shrinks, the secant line becomes the tangent line.]]

## The derivatives you need
| Function | Derivative | Example |
|---|---|---|
| Constant $c$ | 0 | $(5)'=0$ |
| $x^n$ | $n x^{n-1}$ | $(x^3)'=3x^2$ |
| $e^x$ | $e^x$ | Itself! |
| $\ln x$ | $1/x$ | 0.5 at $x=2$ |
| $\sin x$ | $\cos x$ | |
| Sigmoid $\sigma(x)$ | $\sigma(x)(1-\sigma(x))$ | 0.25 at $x=0$ |
| $\tanh x$ | $1-\tanh^2 x$ | 1 at $x=0$ |
| ReLU | 0 if $x<0$, 1 if $x>0$ | |

## Rules for combining
| Rule | Formula | Example |
|---|---|---|
| Constant multiple | $(cf)'=cf'$ | $(5x^2)'=10x$ |
| Sum | $(f+g)'=f'+g'$ | $(x^2+3x)'=2x+3$ |
| Product | $(fg)'=f'g+fg'$ | $(x\,e^x)'=e^x+x e^x$ |
| Quotient | $(f/g)'=\dfrac{f'g-fg'}{g^2}$ | $(1/x)'=-1/x^2$ |
| Chain | $(f(g(x)))'=f'(g(x))\,g'(x)$ | $((3x+1)^2)'=6(3x+1)$ |

## Minima and maxima
At a minimum or maximum the tangent line is **flat**: $f'(x)=0$. The second derivative tells us which kind of point it is:

| $f'(x)$ | $f''(x)$ | Kind of point |
|---|---|---|
| 0 | positive | Minimum (a valley) |
| 0 | negative | Maximum (a peak) |
| 0 | zero | Undecided (an inflection point, for example) |

Example: $f(x)=x^2-4x+7$. We get $f'(x)=2x-4=0\Rightarrow x=2$ and $f''=2>0$, so the minimum is at $x=2$ with value $f(2)=3$.

## Why the derivative of an activation function matters
[[fig:math_act_deriv.png|Activation functions (purple) and their derivatives (orange).]]

The largest derivative of the sigmoid is only **0.25**. In a 10-layer network the gradient is multiplied by at most $0.25^{10}\approx0.00000095$: the first layers barely learn. This is the **vanishing gradient** problem, and the reason ReLU, whose derivative is 1 for positive inputs, became popular.

## Numerical derivatives
When we have no formula, or want to check our code, we use the **central difference**, which is more accurate than the one-sided one:

$$f'(x)\approx\frac{f(x+h)-f(x-h)}{2h}$$

[[c:0]]`],
  code: [`import numpy as np

f = lambda x: x ** 2

print("Secant slopes of x^2 at x = 1:")
for h in [1, 0.5, 0.1, 0.01, 0.001]:
    print(f"  h = {h:<6} slope = {(f(1 + h) - f(1)) / h:.4f}")

def numeric_derivative(func, x, h=1e-5):
    return (func(x + h) - func(x - h)) / (2 * h)       # central difference

sigmoid = lambda x: 1 / (1 + np.exp(-x))
tests = [("x^3 at 2", lambda x: x ** 3, 2.0, 3 * 2.0 ** 2),
         ("exp at 1", np.exp, 1.0, np.exp(1.0)),
         ("ln at 2", np.log, 2.0, 0.5),
         ("sigmoid at 0", sigmoid, 0.0, 0.25),
         ("tanh at 0.5", np.tanh, 0.5, 1 - np.tanh(0.5) ** 2)]
for name, func, x, exact in tests:
    print(f"{name:13s} numeric = {numeric_derivative(func, x):.6f}   exact = {exact:.6f}")

# Minimum of f(x) = x^2 - 4x + 7: where the derivative is zero
g = lambda x: x ** 2 - 4 * x + 7
xs = np.linspace(-1, 5, 601)
print("minimum near x =", xs[np.argmin(g(xs))], " f =", g(2))

# Vanishing gradient: product of sigmoid derivatives through 10 layers
print("0.25 ** 10 =", 0.25 ** 10)`],
  ex: [E("مشتق $f(x)=3x^2+2x-5$ را بگیر، نقطه کمینه را پیدا کن و با مشتق عددی در $x=1$ بررسی کن.", "Differentiate $f(x)=3x^2+2x-5$, find its minimum, and check the derivative at $x=1$ numerically.", `f = lambda x: 3 * x ** 2 + 2 * x - 5
h = 1e-5
print((f(1 + h) - f(1 - h)) / (2 * h))   # 8.0 = 6*1 + 2
print("minimum at x =", -2 / 6, " f =", f(-1 / 3))`, "$f'(x)=6x+2$؛ در $x=1$ برابر 8. کمینه در $x=-1/3$ با مقدار $-5.333$.", "$f'(x)=6x+2$; at $x=1$ it is 8. The minimum is at $x=-1/3$ with value $-5.333$."),
    E("در آزمایشگاه تابع سیگموید را انتخاب کن. مشتق در کجا بیشترین است و در $x=5$ چقدر است؟", "Choose the sigmoid in the lab. Where is the derivative largest, and what is it at $x=5$?", null, "بیشترین مشتق در $x=0$ و برابر 0.25 است. در $x=5$ حدود 0.0066 است: نورون «اشباع» شده و تقریباً یاد نمی‌گیرد.", "The derivative peaks at $x=0$ with value 0.25. At $x=5$ it is about 0.0066: the neuron is \"saturated\" and barely learns.")],
  quiz: [Q("مشتق از نظر هندسی چیست؟", "Geometrically, what is the derivative?", ["شیب خط مماس", "مساحت زیر منحنی", "طول منحنی"], ["The slope of the tangent line", "The area under the curve", "The length of the curve"], 0),
    Q("مشتق $x^4$ چیست؟", "What is the derivative of $x^4$?", ["$4x^3$", "$x^3$", "$4x^4$"], ["$4x^3$", "$x^3$", "$4x^4$"], 0),
    Q("اگر $f'(a)=0$ و $f''(a)>0$ باشد، a چیست؟", "If $f'(a)=0$ and $f''(a)>0$, what is a?", ["کمینه", "بیشینه", "نقطه زینی"], ["A minimum", "A maximum", "A saddle point"], 0)]
});

L({ id: "math-partial",
  fa: ["مشتق جزئی و گرادیان", R`## تابع چندمتغیره
تابع خطای یک مدل به **همه وزن‌ها** بستگی دارد: $L(w_1,w_2,\dots,w_n)$. یک شبکه بزرگ میلیون‌ها وزن دارد. می‌خواهیم بدانیم تغییر **هر کدام** چه اثری روی خطا دارد.

## مشتق جزئی
مشتق جزئی نسبت به $x$ یعنی: **بقیه متغیرها را ثابت بگیر** و فقط نسبت به $x$ مشتق بگیر. نماد: $\dfrac{\partial f}{\partial x}$.

مثال: $f(x,y)=x^2y+3y$

| مشتق | y یا x را ثابت بگیر | نتیجه | در نقطه $(2,1)$ |
|---|---|---|---|
| $\partial f/\partial x$ | y عدد ثابت است | $2xy$ | $2\times2\times1=4$ |
| $\partial f/\partial y$ | x عدد ثابت است | $x^2+3$ | $4+3=7$ |

## گرادیان
گرادیان، **بردارِ همه مشتق‌های جزئی** است:

$$\nabla f=\left(\frac{\partial f}{\partial x_1},\ \frac{\partial f}{\partial x_2},\ \dots,\ \frac{\partial f}{\partial x_n}\right)$$

در مثال بالا $\nabla f(2,1)=(4,7)$.

[[fig:math_gradient.png|پیکان‌های نارنجی گرادیان‌اند: همیشه بر خط‌های هم‌تراز عمودند و به سمت سربالایی اشاره می‌کنند.]]

سه ویژگی مهم گرادیان:

| ویژگی | معنی |
|---|---|
| جهت | سریع‌ترین **افزایش** تابع |
| اندازه $\lVert\nabla f\rVert$ | تندی شیب در آن جهت |
| $\nabla f=0$ | نقطه بحرانی: کمینه، بیشینه یا زینی |

!چون می‌خواهیم خطا **کم** شود، در جهت **منفی گرادیان** حرکت می‌کنیم. این تمام ایده گرادیان کاهشی است.

## مثال عددی: $f(x,y)=x^2+2y^2$ در $(1,1)$
| کمیت | محاسبه | مقدار |
|---|---|---|
| $\partial f/\partial x$ | $2x$ | 2 |
| $\partial f/\partial y$ | $4y$ | 4 |
| $\nabla f$ | | $(2,4)$ |
| $\lVert\nabla f\rVert$ | $\sqrt{4+16}$ | 4.47 |
| یک گام با $\eta=0.1$ | $(1,1)-0.1(2,4)$ | $(0.8,\ 0.6)$ |
| مقدار تابع قبل و بعد | $3\to0.64+0.72$ | $3\to1.36$ |

## گرادیان تابع خطای رگرسیون خطی
مدل $\hat{y}=wx+b$ و خطا $L=\dfrac1n\sum(\hat{y}_i-y_i)^2$:

$$\frac{\partial L}{\partial w}=\frac2n\sum(\hat{y}_i-y_i)\,x_i\qquad\frac{\partial L}{\partial b}=\frac2n\sum(\hat{y}_i-y_i)$$

با داده $(1,2),(2,4),(3,5)$ و شروع از $w=1,\ b=0$:

| $x_i$ | $y_i$ | $\hat{y}_i$ | $\hat{y}_i-y_i$ | $(\hat{y}_i-y_i)x_i$ |
|---|---|---|---|---|
| 1 | 2 | 1 | −1 | −1 |
| 2 | 4 | 2 | −2 | −4 |
| 3 | 5 | 3 | −2 | −6 |
| جمع | | | −5 | −11 |

پس $L=(1+4+4)/3=3$، $\partial L/\partial w=\frac23(-11)=-7.33$ و $\partial L/\partial b=\frac23(-5)=-3.33$. هر دو منفی‌اند: باید w و b را **زیاد** کنیم.

## ژاکوبی و هسین
| نام | چیست | شکل | کاربرد |
|---|---|---|---|
| گرادیان $\nabla f$ | مشتق‌های اول یک تابع عددی | بردار n تایی | گرادیان کاهشی |
| ژاکوبی $J$ | مشتق‌های اول یک تابع برداری | ماتریس $m\times n$ | پس‌انتشار در لایه‌ها |
| هسین $H$ | مشتق‌های دوم | ماتریس $n\times n$ | انحنا؛ روش نیوتن؛ تشخیص کمینه |

برای $f=x^2+2y^2$ هسین $\begin{bmatrix}2&0\\0&4\end{bmatrix}$ است. مقدارهای ویژه مثبت (2 و 4) یعنی نقطه بحرانی $(0,0)$ یک **کمینه** است. اگر یکی مثبت و یکی منفی بود، **نقطه زینی** داشتیم.

[[c:0]]`],
  en: ["Partial derivatives and the gradient", R`## Functions of several variables
The loss of a model depends on **all of its weights**: $L(w_1,w_2,\dots,w_n)$. A large network has millions of them. We want to know how changing **each one** affects the loss.

## Partial derivatives
The partial derivative with respect to $x$ means: **hold the other variables fixed** and differentiate with respect to $x$ only. Notation: $\dfrac{\partial f}{\partial x}$.

Example: $f(x,y)=x^2y+3y$

| Derivative | Hold fixed | Result | At the point $(2,1)$ |
|---|---|---|---|
| $\partial f/\partial x$ | y is a constant | $2xy$ | $2\times2\times1=4$ |
| $\partial f/\partial y$ | x is a constant | $x^2+3$ | $4+3=7$ |

## The gradient
The gradient is the **vector of all partial derivatives**:

$$\nabla f=\left(\frac{\partial f}{\partial x_1},\ \frac{\partial f}{\partial x_2},\ \dots,\ \frac{\partial f}{\partial x_n}\right)$$

In the example above $\nabla f(2,1)=(4,7)$.

[[fig:math_gradient.png|The orange arrows are gradients: always perpendicular to the contour lines and pointing uphill.]]

Three key facts about the gradient:

| Property | Meaning |
|---|---|
| Direction | The fastest **increase** of the function |
| Size $\lVert\nabla f\rVert$ | How steep it is in that direction |
| $\nabla f=0$ | A critical point: minimum, maximum or saddle |

!Because we want the loss to go **down**, we move along the **negative gradient**. That is the whole idea of gradient descent.

## Worked example: $f(x,y)=x^2+2y^2$ at $(1,1)$
| Quantity | Calculation | Value |
|---|---|---|
| $\partial f/\partial x$ | $2x$ | 2 |
| $\partial f/\partial y$ | $4y$ | 4 |
| $\nabla f$ | | $(2,4)$ |
| $\lVert\nabla f\rVert$ | $\sqrt{4+16}$ | 4.47 |
| One step with $\eta=0.1$ | $(1,1)-0.1(2,4)$ | $(0.8,\ 0.6)$ |
| Function value before and after | $3\to0.64+0.72$ | $3\to1.36$ |

## The gradient of the linear-regression loss
Model $\hat{y}=wx+b$ and loss $L=\dfrac1n\sum(\hat{y}_i-y_i)^2$:

$$\frac{\partial L}{\partial w}=\frac2n\sum(\hat{y}_i-y_i)\,x_i\qquad\frac{\partial L}{\partial b}=\frac2n\sum(\hat{y}_i-y_i)$$

With the data $(1,2),(2,4),(3,5)$ and starting from $w=1,\ b=0$:

| $x_i$ | $y_i$ | $\hat{y}_i$ | $\hat{y}_i-y_i$ | $(\hat{y}_i-y_i)x_i$ |
|---|---|---|---|---|
| 1 | 2 | 1 | −1 | −1 |
| 2 | 4 | 2 | −2 | −4 |
| 3 | 5 | 3 | −2 | −6 |
| Sum | | | −5 | −11 |

So $L=(1+4+4)/3=3$, $\partial L/\partial w=\frac23(-11)=-7.33$ and $\partial L/\partial b=\frac23(-5)=-3.33$. Both are negative: we must **increase** w and b.

## Jacobian and Hessian
| Name | What it is | Shape | Used for |
|---|---|---|---|
| Gradient $\nabla f$ | First derivatives of a scalar function | Vector of n | Gradient descent |
| Jacobian $J$ | First derivatives of a vector function | $m\times n$ matrix | Backpropagation through layers |
| Hessian $H$ | Second derivatives | $n\times n$ matrix | Curvature; Newton's method; testing for a minimum |

For $f=x^2+2y^2$ the Hessian is $\begin{bmatrix}2&0\\0&4\end{bmatrix}$. Positive eigenvalues (2 and 4) mean that the critical point $(0,0)$ is a **minimum**. One positive and one negative would give a **saddle point**.

[[c:0]]`],
  code: [`import numpy as np

def numeric_gradient(f, p, h=1e-5):
    """Central differences, one coordinate at a time."""
    p = np.array(p, dtype=float); g = np.zeros_like(p)
    for i in range(len(p)):
        e = np.zeros_like(p); e[i] = h
        g[i] = (f(p + e) - f(p - e)) / (2 * h)
    return g

f1 = lambda p: p[0] ** 2 * p[1] + 3 * p[1]
print("grad of x^2 y + 3y at (2, 1):", numeric_gradient(f1, [2, 1]).round(4), " exact (4, 7)")

f2 = lambda p: p[0] ** 2 + 2 * p[1] ** 2
g = numeric_gradient(f2, [1, 1])
print("grad of x^2 + 2y^2 at (1, 1):", g.round(4), "  size:", round(np.linalg.norm(g), 3))
new = np.array([1, 1]) - 0.1 * g
print("after one step:", new.round(3), "  f:", f2([1, 1]), "->", round(f2(new), 3))

# Gradient of the MSE loss for y_hat = w x + b
x = np.array([1.0, 2.0, 3.0]); y = np.array([2.0, 4.0, 5.0])
def loss(p):
    return np.mean((p[0] * x + p[1] - y) ** 2)
w, b = 1.0, 0.0
err = w * x + b - y
print("loss:", loss([w, b]))
print("formula  dL/dw, dL/db:", round(2 * np.mean(err * x), 3), round(2 * np.mean(err), 3))
print("numeric  dL/dw, dL/db:", numeric_gradient(loss, [w, b]).round(3))

# Hessian eigenvalues tell the kind of critical point
for name, H in [("x^2 + 2y^2", [[2, 0], [0, 4]]), ("x^2 - y^2 ", [[2, 0], [0, -2]])]:
    ev = np.linalg.eigvalsh(np.array(H, dtype=float))
    print(name, "eigenvalues", ev, "->", "minimum" if ev.min() > 0 else "saddle point")`],
  ex: [E("گرادیان $f(x,y)=3x^2-2xy+y^2$ را در $(1,2)$ با دست حساب کن و با کد بررسی کن.", "Compute the gradient of $f(x,y)=3x^2-2xy+y^2$ at $(1,2)$ by hand and check with code.", `import numpy as np
f = lambda p: 3 * p[0] ** 2 - 2 * p[0] * p[1] + p[1] ** 2
h = 1e-5; p = np.array([1.0, 2.0])
print([round(float((f(p + h * e) - f(p - h * e)) / (2 * h)), 4) for e in np.eye(2)])   # [2.0, 2.0]`, "$\\partial f/\\partial x=6x-2y=2$ و $\\partial f/\\partial y=-2x+2y=2$؛ پس $\\nabla f=(2,2)$.", "$\\partial f/\\partial x=6x-2y=2$ and $\\partial f/\\partial y=-2x+2y=2$, so $\\nabla f=(2,2)$.")],
  quiz: [Q("گرادیان به کدام سمت اشاره می‌کند؟", "Which way does the gradient point?", ["سریع‌ترین افزایش تابع", "سریع‌ترین کاهش تابع", "به سمت مبدأ"], ["The fastest increase of the function", "The fastest decrease", "Toward the origin"], 0),
    Q("$\\partial(x^2y)/\\partial y$ چیست؟", "What is $\\partial(x^2y)/\\partial y$?", ["$x^2$", "$2xy$", "$2x$"], ["$x^2$", "$2xy$", "$2x$"], 0),
    Q("اگر مقدارهای ویژه هسین در یک نقطه بحرانی یکی مثبت و یکی منفی باشد، آن نقطه چیست؟", "If the Hessian at a critical point has one positive and one negative eigenvalue, the point is a...", ["نقطه زینی", "کمینه", "بیشینه"], ["saddle point", "minimum", "maximum"], 0)]
});

L({ id: "math-chain",
  fa: ["قاعده زنجیره‌ای و گراف محاسبه", R`## مسئله
شبکه عصبی یک تابع تو در تو است: خروجی هر لایه ورودی لایه بعد می‌شود. برای آموزش باید بدانیم خطا نسبت به وزنی که چند لایه عقب‌تر است چقدر حساس است. **قاعده زنجیره‌ای** همین را می‌دهد.

## قاعده
اگر $y=f(u)$ و $u=g(x)$ باشد:

$$\frac{dy}{dx}=\frac{dy}{du}\cdot\frac{du}{dx}$$

یعنی: حساسیت‌ها در طول مسیر **در هم ضرب می‌شوند**. مثل چرخ‌دنده: اگر چرخ A هر دور، چرخ B را 3 دور بچرخاند و B هر دور، C را 2 دور، آنگاه A هر دور C را $3\times2=6$ دور می‌چرخاند.

## مثال عددی
$y=(3x+1)^2$ را به دو قدم می‌شکنیم: $u=3x+1$ و $y=u^2$.

| قدم | فرمول | در $x=1$ |
|---|---|---|
| رفت: u | $3x+1$ | 4 |
| رفت: y | $u^2$ | 16 |
| $dy/du$ | $2u$ | 8 |
| $du/dx$ | 3 | 3 |
| $dy/dx$ | $2u\times3$ | 24 |

بررسی: $y=9x^2+6x+1\Rightarrow y'=18x+6=24$ ✓.

## گراف محاسبه: یک نورون
یک نورون با خطای مربعی را به قدم‌های ساده می‌شکنیم:

$$z=wx+b\qquad a=\sigma(z)\qquad L=(a-y)^2$$

[[lab:m_chain]]

با $x=2,\ w=0.5,\ b=-0.5,\ y=1$:

| گذر رفت (forward) | مقدار | گذر برگشت (backward) | مقدار |
|---|---|---|---|
| $z=wx+b$ | 0.5 | $\partial L/\partial a=2(a-y)$ | −0.755 |
| $a=\sigma(z)$ | 0.622 | $\partial a/\partial z=a(1-a)$ | 0.235 |
| $L=(a-y)^2$ | 0.143 | $\partial L/\partial z=-0.755\times0.235$ | −0.177 |
| | | $\partial L/\partial w=\partial L/\partial z\times x$ | −0.355 |
| | | $\partial L/\partial b=\partial L/\partial z\times1$ | −0.177 |

!توجه کن که $\partial L/\partial z$ یک بار حساب شد و برای هر دو مشتق w و b **دوباره استفاده** شد. پس‌انتشار خطا (backpropagation) همین است: قاعده زنجیره‌ای + ذخیره نتیجه‌های میانی. به همین دلیل محاسبه گرادیان میلیون‌ها وزن تقریباً به اندازه یک گذر رفت هزینه دارد.

## چند مسیر: جمع کن
اگر یک متغیر از **چند مسیر** روی خروجی اثر بگذارد، سهم همه مسیرها جمع می‌شود:

$$\frac{\partial L}{\partial x}=\sum_{\text{paths}}\frac{\partial L}{\partial u_k}\frac{\partial u_k}{\partial x}$$

مثال: $L=u+v$ با $u=x^2$ و $v=3x$. آنگاه $dL/dx=1\times2x+1\times3=2x+3$.

## مشتق‌های محلی گره‌های رایج
| گره | رفت | برگشت: گرادیان ورودی‌ها |
|---|---|---|
| جمع $c=a+b$ | جمع | گرادیان را بدون تغییر به هر دو می‌دهد |
| ضرب $c=ab$ | ضرب | به a می‌دهد $g\cdot b$ و به b می‌دهد $g\cdot a$ (جابه‌جا) |
| max | بزرگ‌تر | فقط به ورودی بزرگ‌تر می‌رسد |
| ReLU | $\max(0,z)$ | اگر $z>0$ عبور می‌کند، وگرنه صفر |
| سیگموید | $\sigma(z)$ | ضرب در $a(1-a)$ |

## مشتق‌گیری خودکار (autograd)
کتابخانه‌هایی مثل PyTorch و TensorFlow همین کار را خودکار انجام می‌دهند: هنگام محاسبه، گراف را می‌سازند و سپس از آخر به اول قاعده زنجیره‌ای را اعمال می‌کنند. کد زیر یک نسخه 30 خطی از این ایده است:

[[c:0]]`],
  en: ["The chain rule and computation graphs", R`## The problem
A neural network is a nested function: the output of each layer is the input of the next. To train it we need to know how sensitive the loss is to a weight that sits several layers back. The **chain rule** gives exactly that.

## The rule
If $y=f(u)$ and $u=g(x)$:

$$\frac{dy}{dx}=\frac{dy}{du}\cdot\frac{du}{dx}$$

In words: sensitivities along a path **multiply**. Think of gears: if one turn of gear A turns gear B three times, and one turn of B turns C twice, then one turn of A turns C $3\times2=6$ times.

## Worked example
Split $y=(3x+1)^2$ into two steps: $u=3x+1$ and $y=u^2$.

| Step | Formula | At $x=1$ |
|---|---|---|
| Forward: u | $3x+1$ | 4 |
| Forward: y | $u^2$ | 16 |
| $dy/du$ | $2u$ | 8 |
| $du/dx$ | 3 | 3 |
| $dy/dx$ | $2u\times3$ | 24 |

Check: $y=9x^2+6x+1\Rightarrow y'=18x+6=24$ ✓.

## A computation graph: one neuron
Break a neuron with squared error into simple steps:

$$z=wx+b\qquad a=\sigma(z)\qquad L=(a-y)^2$$

[[lab:m_chain]]

With $x=2,\ w=0.5,\ b=-0.5,\ y=1$:

| Forward pass | Value | Backward pass | Value |
|---|---|---|---|
| $z=wx+b$ | 0.5 | $\partial L/\partial a=2(a-y)$ | −0.755 |
| $a=\sigma(z)$ | 0.622 | $\partial a/\partial z=a(1-a)$ | 0.235 |
| $L=(a-y)^2$ | 0.143 | $\partial L/\partial z=-0.755\times0.235$ | −0.177 |
| | | $\partial L/\partial w=\partial L/\partial z\times x$ | −0.355 |
| | | $\partial L/\partial b=\partial L/\partial z\times1$ | −0.177 |

!Notice that $\partial L/\partial z$ was computed once and **reused** for both w and b. That is backpropagation: the chain rule plus storing intermediate results. It is why the gradient of millions of weights costs about as much as one forward pass.

## Several paths: add them
If a variable affects the output through **several paths**, the contributions add:

$$\frac{\partial L}{\partial x}=\sum_{\text{paths}}\frac{\partial L}{\partial u_k}\frac{\partial u_k}{\partial x}$$

Example: $L=u+v$ with $u=x^2$ and $v=3x$. Then $dL/dx=1\times2x+1\times3=2x+3$.

## Local derivatives of common nodes
| Node | Forward | Backward: gradient to the inputs |
|---|---|---|
| Sum $c=a+b$ | add | Passes the gradient unchanged to both |
| Product $c=ab$ | multiply | Gives $g\cdot b$ to a and $g\cdot a$ to b (swapped) |
| max | the larger one | Only the larger input receives it |
| ReLU | $\max(0,z)$ | Passes if $z>0$, otherwise zero |
| Sigmoid | $\sigma(z)$ | Multiplies by $a(1-a)$ |

## Automatic differentiation (autograd)
Libraries such as PyTorch and TensorFlow do this automatically: they record the graph while computing, then apply the chain rule from the end back to the start. The code below is a 30-line version of that idea:

[[c:0]]`],
  code: [`import math

class Value:
    """A number that remembers how it was computed, so it can backpropagate."""
    def __init__(self, data, parents=(), name=""):
        self.data, self.grad, self.parents, self.name = data, 0.0, parents, name
        self._backward = lambda: None
    def __add__(self, other):
        out = Value(self.data + other.data, (self, other))
        def back():
            self.grad += out.grad; other.grad += out.grad
        out._backward = back; return out
    def __mul__(self, other):
        out = Value(self.data * other.data, (self, other))
        def back():
            self.grad += other.data * out.grad; other.grad += self.data * out.grad
        out._backward = back; return out
    def sigmoid(self):
        s = 1 / (1 + math.exp(-self.data)); out = Value(s, (self,))
        def back():
            self.grad += s * (1 - s) * out.grad
        out._backward = back; return out
    def sq_error(self, y):
        out = Value((self.data - y) ** 2, (self,))
        def back():
            self.grad += 2 * (self.data - y) * out.grad
        out._backward = back; return out
    def backward(self):
        order, seen = [], set()
        def visit(v):
            if v not in seen:
                seen.add(v)
                for p in v.parents: visit(p)
                order.append(v)
        visit(self); self.grad = 1.0
        for v in reversed(order): v._backward()

x, w, b = Value(2.0), Value(0.5), Value(-0.5)
z = w * x + b
a = z.sigmoid()
L = a.sq_error(1.0)
L.backward()
print(f"z = {z.data:.3f}  a = {a.data:.3f}  L = {L.data:.4f}")
print(f"dL/dz = {z.grad:.4f}  dL/dw = {w.grad:.4f}  dL/db = {b.grad:.4f}  dL/dx = {x.grad:.4f}")

# Check dL/dw with a numerical derivative
def loss(wv):
    a = 1 / (1 + math.exp(-(wv * 2.0 - 0.5))); return (a - 1.0) ** 2
h = 1e-6
print("numeric dL/dw =", round((loss(0.5 + h) - loss(0.5 - h)) / (2 * h), 4))`],
  ex: [E("برای $y=\\ln(1+e^{2x})$ با قاعده زنجیره‌ای مشتق بگیر و مقدار آن را در $x=0$ حساب کن.", "Differentiate $y=\\ln(1+e^{2x})$ with the chain rule and evaluate it at $x=0$.", `import math
f = lambda x: math.log(1 + math.exp(2 * x))
h = 1e-6
print((f(h) - f(-h)) / (2 * h))   # 1.0`, "$u=2x$، $v=1+e^u$، $y=\\ln v$. پس $y'=\\frac{1}{v}\\cdot e^u\\cdot2=\\dfrac{2e^{2x}}{1+e^{2x}}$ که در $x=0$ برابر 1 است.", "$u=2x$, $v=1+e^u$, $y=\\ln v$. So $y'=\\frac{1}{v}\\cdot e^u\\cdot2=\\dfrac{2e^{2x}}{1+e^{2x}}$, which is 1 at $x=0$."),
    E("در آزمایشگاه چند بار دکمه «یک گام گرادیان کاهشی» را بزن. L چه می‌شود و چرا؟", "Press \"One gradient-descent step\" in the lab several times. What happens to L, and why?", null, "L کم می‌شود، چون w و b در جهت منفی گرادیان حرکت می‌کنند و خروجی a به y نزدیک می‌شود.", "L decreases, because w and b move along the negative gradient and the output a approaches y.")],
  quiz: [Q("در قاعده زنجیره‌ای، مشتق‌ها در طول یک مسیر چه می‌شوند؟", "In the chain rule, what happens to derivatives along one path?", ["در هم ضرب می‌شوند", "با هم جمع می‌شوند", "میانگین گرفته می‌شوند"], ["They are multiplied", "They are added", "They are averaged"], 0),
    Q("اگر x از دو مسیر روی L اثر بگذارد، سهم دو مسیر چه می‌شود؟", "If x affects L through two paths, the two contributions are...", ["جمع می‌شوند", "ضرب می‌شوند", "بزرگ‌تر انتخاب می‌شود"], ["added", "multiplied", "the larger one is taken"], 0),
    Q("چرا پس‌انتشار سریع است؟", "Why is backpropagation fast?", ["نتیجه‌های میانی را دوباره استفاده می‌کند", "مشتق نمی‌گیرد", "فقط لایه آخر را آموزش می‌دهد"], ["It reuses intermediate results", "It takes no derivatives", "It only trains the last layer"], 0)]
});

L({ id: "math-gd",
  fa: ["گرادیان کاهشی، نرخ یادگیری و تحدب", R`## ایده
در کوهستانی مه‌آلود ایستاده‌ای و می‌خواهی به پایین دره برسی. فقط شیب زیر پایت را حس می‌کنی. بهترین کار: **یک قدم در جهت سرازیری** بردار و تکرار کن.

$$\theta\leftarrow\theta-\eta\,\nabla L(\theta)$$

| نماد | نام | نقش |
|---|---|---|
| $\theta$ | پارامترها | چیزی که یاد گرفته می‌شود |
| $\nabla L$ | گرادیان | جهت سربالایی |
| $\eta$ | نرخ یادگیری | اندازه قدم |

## مثال عددی کامل
$f(x)=(x-3)^2$ را از $x_0=0$ با $\eta=0.1$ کمینه می‌کنیم. مشتق: $f'(x)=2(x-3)$.

| گام | $x$ | $f'(x)$ | $x-\eta f'(x)$ | $f$ جدید |
|---|---|---|---|---|
| 1 | 0 | −6 | 0.6 | 5.76 |
| 2 | 0.6 | −4.8 | 1.08 | 3.686 |
| 3 | 1.08 | −3.84 | 1.464 | 2.359 |
| 4 | 1.464 | −3.072 | 1.771 | 1.510 |
| 5 | 1.771 | −2.458 | 2.017 | 0.966 |

فاصله تا جواب ($x=3$) در هر گام در $1-2\eta=0.8$ ضرب می‌شود: $3\to2.4\to1.92\to\dots$ پس همگرایی **هندسی** است.

## نرخ یادگیری: مهم‌ترین تنظیم
[[fig:math_lr.png|سه نرخ یادگیری روی $f(x)=x^2$ از یک نقطه شروع.]]

| $\eta$ | رفتار | نشانه در نمودار خطا |
|---|---|---|
| خیلی کوچک | همگرایی بسیار کند | خطا خیلی آهسته پایین می‌آید |
| مناسب | سریع و پایدار | کاهش نرم |
| کمی بزرگ | نوسان دور کمینه | بالا و پایین رفتن |
| خیلی بزرگ | واگرایی | خطا زیاد می‌شود یا nan |

برای $f(x)=x^2$ هر گام می‌شود $x\leftarrow(1-2\eta)x$؛ پس فقط وقتی $\lvert1-2\eta\rvert<1$ یعنی $0<\eta<1$ همگرا می‌شود. در حالت کلی سقف نرخ یادگیری $2/\lambda_{\max}$ است که $\lambda_{\max}$ بزرگ‌ترین مقدار ویژه هسین است.

## در دو بعد: دره‌های باریک
[[lab:m_gd2d]]

در آزمایشگاه «دره باریک» را انتخاب کن. چون شیب در جهت y ده برابر جهت x است، مسیر **زیگزاگ** می‌شود و آهسته پیش می‌رود. مومنتوم را زیاد کن: زیگزاگ‌ها هم را خنثی می‌کنند. این مشکل وقتی پیش می‌آید که ویژگی‌ها مقیاس‌های متفاوت دارند؛ دلیل دیگر برای **مقیاس‌بندی ویژگی‌ها**.

## تابع محدب و غیرمحدب
[[fig:math_convex.png|چپ: تابع محدب فقط یک کمینه دارد. راست: تابع غیرمحدب کمینه‌های محلی دارد.]]

| | محدب | غیرمحدب |
|---|---|---|
| شکل | کاسه | کوهستان |
| کمینه محلی | همان سراسری است | ممکن است سراسری نباشد |
| تضمین GD | به بهترین جواب می‌رسد | به نقطه شروع بستگی دارد |
| مثال | رگرسیون خطی، لجستیک، SVM | شبکه‌های عصبی |

## سه نسخه از گرادیان کاهشی
| نسخه | داده در هر گام | مزیت | عیب |
|---|---|---|---|
| Batch | همه n نمونه | گرادیان دقیق | کند برای داده بزرگ |
| SGD (تصادفی) | 1 نمونه | سریع، از کمینه محلی فرار می‌کند | پرنویز |
| Mini-batch | 32 تا 256 نمونه | تعادل؛ مناسب GPU | یک ابرپارامتر بیشتر |

یک **epoch** یعنی یک بار دیدن کل داده. با 1000 نمونه و دسته 100 تایی، هر epoch ده گام دارد.

[[c:0]]`],
  en: ["Gradient descent, learning rate and convexity", R`## The idea
You are standing on a foggy mountain and want to reach the valley. All you can feel is the slope under your feet. The best move: take **one step downhill** and repeat.

$$\theta\leftarrow\theta-\eta\,\nabla L(\theta)$$

| Symbol | Name | Role |
|---|---|---|
| $\theta$ | Parameters | What is being learned |
| $\nabla L$ | Gradient | The uphill direction |
| $\eta$ | Learning rate | The step size |

## A complete numeric example
Minimize $f(x)=(x-3)^2$ from $x_0=0$ with $\eta=0.1$. The derivative is $f'(x)=2(x-3)$.

| Step | $x$ | $f'(x)$ | $x-\eta f'(x)$ | new $f$ |
|---|---|---|---|---|
| 1 | 0 | −6 | 0.6 | 5.76 |
| 2 | 0.6 | −4.8 | 1.08 | 3.686 |
| 3 | 1.08 | −3.84 | 1.464 | 2.359 |
| 4 | 1.464 | −3.072 | 1.771 | 1.510 |
| 5 | 1.771 | −2.458 | 2.017 | 0.966 |

The distance to the answer ($x=3$) is multiplied by $1-2\eta=0.8$ at every step: $3\to2.4\to1.92\to\dots$, so convergence is **geometric**.

## The learning rate: the most important setting
[[fig:math_lr.png|Three learning rates on $f(x)=x^2$ from the same starting point.]]

| $\eta$ | Behaviour | Sign in the loss curve |
|---|---|---|
| Too small | Very slow convergence | The loss creeps down |
| Good | Fast and stable | A smooth decrease |
| A bit large | Oscillates around the minimum | Goes up and down |
| Too large | Diverges | The loss grows or becomes nan |

For $f(x)=x^2$ each step is $x\leftarrow(1-2\eta)x$, so it converges only when $\lvert1-2\eta\rvert<1$, that is $0<\eta<1$. In general the limit is $2/\lambda_{\max}$, where $\lambda_{\max}$ is the largest eigenvalue of the Hessian.

## In two dimensions: narrow valleys
[[lab:m_gd2d]]

Choose the "narrow valley" in the lab. Because the slope along y is ten times the slope along x, the path **zigzags** and moves slowly. Increase the momentum: the zigzags cancel. This happens when features have different scales, which is one more reason to **scale your features**.

## Convex and non-convex functions
[[fig:math_convex.png|Left: a convex function has a single minimum. Right: a non-convex function has local minima.]]

| | Convex | Non-convex |
|---|---|---|
| Shape | A bowl | A mountain range |
| Local minimum | Is the global one | May not be global |
| Guarantee for GD | Reaches the best answer | Depends on the starting point |
| Examples | Linear and logistic regression, SVM | Neural networks |

## Three versions of gradient descent
| Version | Data per step | Advantage | Drawback |
|---|---|---|---|
| Batch | All n samples | Exact gradient | Slow on large data |
| SGD (stochastic) | 1 sample | Fast, can escape local minima | Noisy |
| Mini-batch | 32 to 256 samples | A balance; suits GPUs | One more hyperparameter |

One **epoch** is one pass over all the data. With 1000 samples and batches of 100, each epoch has ten steps.

[[c:0]]`],
  code: [`import numpy as np
import matplotlib.pyplot as plt

# 1) The table from the lesson: f(x) = (x - 3)^2
x, eta = 0.0, 0.1
for step in range(1, 6):
    grad = 2 * (x - 3)
    x = x - eta * grad
    print(f"step {step}: grad = {grad:7.3f}   x = {x:.3f}   f = {(x - 3) ** 2:.3f}")

# 2) Effect of the learning rate on f(x) = x^2
for eta in [0.05, 0.4, 0.95, 1.05]:
    x = 2.5
    for _ in range(20): x -= eta * 2 * x
    print(f"eta = {eta:<5} after 20 steps x = {x:.4g}")

# 3) Mini-batch gradient descent for linear regression  y = 4 + 3x + noise
rng = np.random.default_rng(0)
X = rng.uniform(0, 2, 200); y = 4 + 3 * X + rng.normal(0, 0.5, 200)
w, b, eta, history = 0.0, 0.0, 0.1, []
for epoch in range(30):
    order = rng.permutation(200)
    for start in range(0, 200, 20):                  # batches of 20
        i = order[start:start + 20]
        err = w * X[i] + b - y[i]
        w -= eta * 2 * np.mean(err * X[i])
        b -= eta * 2 * np.mean(err)
    history.append(np.mean((w * X + b - y) ** 2))
print(f"learned w = {w:.3f}, b = {b:.3f}   (true 3 and 4)")

plt.plot(history, marker="o"); plt.xlabel("epoch"); plt.ylabel("MSE"); plt.yscale("log")
plt.title("Training loss"); plt.grid(alpha=0.3); plt.show()`],
  ex: [E("برای $f(x)=x^2$ با $x_0=4$ و $\\eta=0.25$ سه گام را با دست حساب کن. چه چیزی می‌بینی؟", "For $f(x)=x^2$ with $x_0=4$ and $\\eta=0.25$, do three steps by hand. What do you notice?", `x = 4.0
for k in range(3):
    x = x - 0.25 * 2 * x
    print(k + 1, x)    # 2.0, 1.0, 0.5`, "هر گام $x\\leftarrow(1-0.5)x$ است؛ پس x در هر گام نصف می‌شود: 2، 1، 0.5.", "Each step is $x\\leftarrow(1-0.5)x$, so x halves every time: 2, 1, 0.5."),
    E("در آزمایشگاه «دو کمینه» را انتخاب کن. از دو نقطه شروع مختلف اجرا کن. به یک جواب می‌رسی؟", "Choose \"two minima\" in the lab and run from two different starting points. Do you reach the same answer?", null, "نه. از سمت راست به کمینه محلی و از سمت چپ به کمینه سراسری می‌رسی؛ در تابع غیرمحدب نتیجه به نقطه شروع بستگی دارد.", "No. Starting on the right ends in the local minimum, starting on the left reaches the global one; on a non-convex function the result depends on the starting point.")],
  quiz: [Q("اگر نرخ یادگیری خیلی بزرگ باشد چه می‌شود؟", "What happens if the learning rate is too large?", ["خطا نوسان می‌کند یا واگرا می‌شود", "آموزش کندتر می‌شود", "هیچ تغییری نمی‌کند"], ["The loss oscillates or diverges", "Training becomes slower", "Nothing changes"], 0),
    Q("در تابع محدب، هر کمینه محلی چیست؟", "On a convex function, every local minimum is...", ["کمینه سراسری", "نقطه زینی", "بیشینه"], ["the global minimum", "a saddle point", "a maximum"], 0),
    Q("با 5000 نمونه و دسته 50 تایی، هر epoch چند گام دارد؟", "With 5000 samples and batches of 50, how many steps are in one epoch?", ["100", "50", "5000"], ["100", "50", "5000"], 0)]
});

L({ id: "math-integral",
  fa: ["انتگرال: مساحت، احتمال و میانگین", R`## انتگرال یعنی چه؟
اگر مشتق «نرخ تغییر» است، انتگرال «**جمع کردن تکه‌های کوچک**» است. از نظر هندسی، انتگرال **مساحت زیر منحنی** است:

$$\int_a^b f(x)\,dx\approx\sum_{i=1}^{n}f(x_i)\,\Delta x$$

سطح زیر منحنی را به n مستطیل باریک می‌بُریم و مساحت‌ها را جمع می‌کنیم. هر چه مستطیل‌ها باریک‌تر، جواب دقیق‌تر.

[[lab:m_integral]]

[[fig:math_integral.png|مساحت زیر $x^2$ از 0 تا 2 با 4 و 20 مستطیل.]]

## مثال عددی: $\int_0^2 x^2\,dx$
با 4 مستطیل به پهنای 0.5 و ارتفاع در وسط هر بازه:

| مستطیل | وسط بازه $x_i$ | ارتفاع $x_i^2$ | مساحت |
|---|---|---|---|
| 1 | 0.25 | 0.0625 | 0.03125 |
| 2 | 0.75 | 0.5625 | 0.28125 |
| 3 | 1.25 | 1.5625 | 0.78125 |
| 4 | 1.75 | 3.0625 | 1.53125 |
| جمع | | | 2.625 |

جواب دقیق از قضیه اساسی حساب: پادمشتق $x^2$ برابر $x^3/3$ است، پس $\dfrac{2^3}{3}-\dfrac{0^3}{3}=\dfrac83\approx2.667$. با 4 مستطیل خطا فقط 1.6٪ است.

## قضیه اساسی حساب
مشتق و انتگرال **وارون** هم‌اند. اگر $F'(x)=f(x)$ باشد:

$$\int_a^b f(x)\,dx=F(b)-F(a)$$

| $f(x)$ | پادمشتق $F(x)$ |
|---|---|
| $x^n$ | $\dfrac{x^{n+1}}{n+1}$ |
| $1/x$ | $\ln x$ |
| $e^x$ | $e^x$ |
| $\cos x$ | $\sin x$ |

## چرا در یادگیری ماشین لازم است؟
| کاربرد | فرمول | معنی |
|---|---|---|
| احتمال متغیر پیوسته | $P(a<X<b)=\int_a^b p(x)\,dx$ | احتمال = مساحت زیر تابع چگالی |
| نرمال بودن چگالی | $\int_{-\infty}^{\infty}p(x)\,dx=1$ | کل احتمال 1 است |
| امید ریاضی | $E[X]=\int x\,p(x)\,dx$ | میانگین وزن‌دار |
| AUC | مساحت زیر منحنی ROC | کیفیت طبقه‌بند |
| خطای مورد انتظار | $E[L]=\int L(x)\,p(x)\,dx$ | چیزی که واقعاً می‌خواهیم کمینه کنیم |

!در آزمایشگاه تابع «نرمال استاندارد» را انتخاب کن و بازه را از −1 تا 1 بگذار: مساحت حدود 0.683 می‌شود. این همان قاعده معروف «68٪ داده‌ها در یک انحراف معیار از میانگین» است.

## انتگرال‌گیری با نمونه‌گیری (مونت‌کارلو)
در ابعاد بالا مستطیل‌بندی ممکن نیست. به جایش **نمونه تصادفی** می‌گیریم و میانگین می‌گیریم:

$$E[g(X)]\approx\frac1N\sum_{i=1}^{N}g(x_i),\qquad x_i\sim p$$

خطای مدل روی داده آزمون دقیقاً همین است: میانگین خطا روی نمونه‌ها، به‌عنوان تقریبی از خطای مورد انتظار روی کل دنیا.

[[c:0]]`],
  en: ["Integrals: area, probability and averages", R`## What is an integral?
If the derivative is a "rate of change", the integral is "**adding up small pieces**". Geometrically the integral is the **area under a curve**:

$$\int_a^b f(x)\,dx\approx\sum_{i=1}^{n}f(x_i)\,\Delta x$$

We slice the region under the curve into n thin rectangles and add their areas. The thinner the rectangles, the more exact the answer.

[[lab:m_integral]]

[[fig:math_integral.png|The area under $x^2$ from 0 to 2 with 4 and 20 rectangles.]]

## Worked example: $\int_0^2 x^2\,dx$
With 4 rectangles of width 0.5 and heights taken at the midpoints:

| Rectangle | Midpoint $x_i$ | Height $x_i^2$ | Area |
|---|---|---|---|
| 1 | 0.25 | 0.0625 | 0.03125 |
| 2 | 0.75 | 0.5625 | 0.28125 |
| 3 | 1.25 | 1.5625 | 0.78125 |
| 4 | 1.75 | 3.0625 | 1.53125 |
| Sum | | | 2.625 |

The exact answer comes from the fundamental theorem of calculus: the antiderivative of $x^2$ is $x^3/3$, so $\dfrac{2^3}{3}-\dfrac{0^3}{3}=\dfrac83\approx2.667$. With only 4 rectangles the error is 1.6%.

## The fundamental theorem of calculus
Differentiation and integration **undo** each other. If $F'(x)=f(x)$:

$$\int_a^b f(x)\,dx=F(b)-F(a)$$

| $f(x)$ | Antiderivative $F(x)$ |
|---|---|
| $x^n$ | $\dfrac{x^{n+1}}{n+1}$ |
| $1/x$ | $\ln x$ |
| $e^x$ | $e^x$ |
| $\cos x$ | $\sin x$ |

## Why machine learning needs it
| Use | Formula | Meaning |
|---|---|---|
| Probability of a continuous variable | $P(a<X<b)=\int_a^b p(x)\,dx$ | Probability = area under the density |
| A density is normalized | $\int_{-\infty}^{\infty}p(x)\,dx=1$ | Total probability is 1 |
| Expected value | $E[X]=\int x\,p(x)\,dx$ | A weighted average |
| AUC | Area under the ROC curve | Quality of a classifier |
| Expected loss | $E[L]=\int L(x)\,p(x)\,dx$ | What we really want to minimize |

!In the lab pick the "standard normal" function and set the interval from −1 to 1: the area is about 0.683. This is the famous rule "68% of the data lies within one standard deviation of the mean".

## Integration by sampling (Monte Carlo)
In many dimensions rectangles are hopeless. Instead we draw **random samples** and average:

$$E[g(X)]\approx\frac1N\sum_{i=1}^{N}g(x_i),\qquad x_i\sim p$$

The test error of a model is exactly this: the average loss over samples, as an estimate of the expected loss over the whole world.

[[c:0]]`],
  code: [`import numpy as np
from scipy import integrate

f = lambda x: x ** 2

# Midpoint rule with more and more rectangles
for n in [4, 20, 100, 1000]:
    dx = 2 / n
    mid = np.arange(n) * dx + dx / 2
    print(f"n = {n:5d}   sum = {np.sum(f(mid) * dx):.6f}")
print("exact 8/3 =", round(8 / 3, 6))

value, err = integrate.quad(f, 0, 2)
print("scipy quad:", round(value, 6))

# Probability as an area: standard normal between -1 and 1
pdf = lambda x: np.exp(-x ** 2 / 2) / np.sqrt(2 * np.pi)
for k in [1, 2, 3]:
    print(f"P(-{k} < Z < {k}) =", round(integrate.quad(pdf, -k, k)[0], 4))
print("total area:", round(integrate.quad(pdf, -np.inf, np.inf)[0], 6))

# Expected value E[X^2] for Z ~ N(0, 1): exact integral vs Monte Carlo
exact = integrate.quad(lambda x: x ** 2 * pdf(x), -np.inf, np.inf)[0]
rng = np.random.default_rng(0)
for N in [100, 10_000, 1_000_000]:
    print(f"Monte Carlo with N = {N:>9,}: {np.mean(rng.normal(size=N) ** 2):.4f}   (exact {exact:.4f})")

# Monte Carlo estimate of pi: share of random points inside the quarter circle
pts = rng.uniform(0, 1, (200_000, 2))
print("pi is about", 4 * np.mean(np.sum(pts ** 2, axis=1) < 1))`],
  ex: [E("$\\int_1^3 (2x+1)\\,dx$ را با پادمشتق حساب کن و با ~integrate.quad~ بررسی کن.", "Compute $\\int_1^3 (2x+1)\\,dx$ with an antiderivative and check it with ~integrate.quad~.", `from scipy import integrate
print(integrate.quad(lambda x: 2 * x + 1, 1, 3)[0])   # 10.0`, "پادمشتق $x^2+x$ است: $(9+3)-(1+1)=10$.", "The antiderivative is $x^2+x$: $(9+3)-(1+1)=10$.")],
  quiz: [Q("انتگرال معین از نظر هندسی چیست؟", "Geometrically, a definite integral is...", ["مساحت زیر منحنی", "شیب منحنی", "بیشترین مقدار تابع"], ["the area under the curve", "the slope of the curve", "the maximum of the function"], 0),
    Q("مساحت کل زیر هر تابع چگالی احتمال چقدر است؟", "What is the total area under any probability density?", ["1", "0.5", "بستگی به توزیع دارد"], ["1", "0.5", "It depends on the distribution"], 0),
    Q("روش مونت‌کارلو انتگرال را چطور تقریب می‌زند؟", "How does Monte Carlo approximate an integral?", ["با میانگین گرفتن روی نمونه‌های تصادفی", "با مشتق‌گیری", "با حل دستگاه معادلات"], ["By averaging over random samples", "By differentiating", "By solving a linear system"], 0)]
});
FinishCourse();
