// Math track, part 1: foundations and linear algebra.
M("math", "mfound", "پیش‌نیازها", "Foundations");

L({ id: "math-why",
  fa: ["چرا ریاضی؟ نقشه راه و نمادها", R`## ریاضی کجای هوش مصنوعی است؟
هر مدل یادگیری ماشین سه کار می‌کند: داده را به **عدد** تبدیل می‌کند، با یک **فرمول** پیش‌بینی می‌کند، و با **کم کردن خطا** یاد می‌گیرد. هر کدام از این سه کار یک شاخه ریاضی لازم دارد:

[[fig:math_map.png|چهار ستون ریاضیِ یادگیری ماشین و کاری که هر کدام انجام می‌دهد.]]

| شاخه | سؤالی که جواب می‌دهد | کجا استفاده می‌شود |
|---|---|---|
| جبر خطی | داده و مدل را چطور بنویسیم و سریع حساب کنیم؟ | رگرسیون، PCA، شبکه عصبی، embedding |
| حساب دیفرانسیل | وزن‌ها را به کدام سمت تغییر دهیم تا خطا کم شود؟ | گرادیان کاهشی، پس‌انتشار خطا |
| احتمال | با عدم قطعیت و نویز چه کنیم؟ | بیز ساده، مدل‌های مولد، dropout |
| آمار و نظریه اطلاعات | «بهترین مدل» یعنی چه و خطا را چطور بسنجیم؟ | MSE، آنتروپی متقاطع، ارزیابی مدل |

!لازم نیست ریاضی‌دان باشی. در این مسیر هر مفهوم با یک **مثال عددی** که با دست حساب می‌شود، یک **شکل**، یک **آزمایشگاه تعاملی** و یک **کد پایتون** می‌آید.

## نمادهایی که همه جا می‌بینی
| نماد | خوانده می‌شود | معنی | مثال |
|---|---|---|---|
| $x_i$ | ایکسِ آی | عضو شماره i | اگر $x=(2,4,6)$ آنگاه $x_2=4$ |
| $\sum_{i=1}^{n} x_i$ | سیگما | جمع همه عضوها | $2+4+6=12$ |
| $\prod_{i=1}^{n} x_i$ | پی | ضرب همه عضوها | $2\times4\times6=48$ |
| $\bar{x}$ | ایکس‌بار | میانگین | $12/3=4$ |
| $\mathbb{R}^n$ | آر به توان n | همه بردارهای n عددی | $(2,4,6)\in\mathbb{R}^3$ |
| $\hat{y}$ | وای‌هت | پیش‌بینی مدل | $\hat{y}=w x+b$ |
| $\theta$ | تتا | همه پارامترهای مدل | وزن‌ها و بایاس‌ها |
| $\arg\min_\theta L$ | آرگ‌مین | مقداری از θ که L را کمینه می‌کند | هدف آموزش |
| $\nabla L$ | نابلا یا گرادیان | بردار مشتق‌های جزئی | جهت بیشترین افزایش |
| $P(A \mid B)$ | احتمال A به شرط B | احتمال شرطی | احتمال بیماری اگر آزمایش مثبت باشد |

## مثال عددی: سیگما یعنی حلقه for
میانگین مربعات خطا را در نظر بگیر:

$$\text{MSE}=\frac{1}{n}\sum_{i=1}^{n}(y_i-\hat{y}_i)^2$$

اگر $y=(3,5,7)$ و $\hat{y}=(2,5,9)$ باشد:

| i | $y_i$ | $\hat{y}_i$ | $y_i-\hat{y}_i$ | مربع |
|---|---|---|---|---|
| 1 | 3 | 2 | 1 | 1 |
| 2 | 5 | 5 | 0 | 0 |
| 3 | 7 | 9 | −2 | 4 |

جمع مربع‌ها $1+0+4=5$ و $\text{MSE}=5/3\approx1.667$. در پایتون همین فرمول یک خط است:

[[c:0]]

## چطور این مسیر را بخوانیم؟
- اگر پایتون بلد نیستی، اول چند درس اول مسیر پایتون را ببین؛ کدهای این مسیر ساده‌اند.
- هر درس را با آزمایشگاهش بخوان: اول با اسلایدرها بازی کن، بعد فرمول را ببین.
- مثال‌های عددی را خودت روی کاغذ حساب کن و با خروجی کد مقایسه کن.`],
  en: ["Why math? A roadmap and the notation", R`## Where is the math in AI?
Every machine-learning model does three things: it turns data into **numbers**, it predicts with a **formula**, and it learns by **reducing an error**. Each of these needs one branch of math:

[[fig:math_map.png|The four pillars of math for machine learning and what each one does.]]

| Branch | The question it answers | Where it is used |
|---|---|---|
| Linear algebra | How do we write data and models, and compute fast? | Regression, PCA, neural networks, embeddings |
| Calculus | Which way should the weights move to reduce the error? | Gradient descent, backpropagation |
| Probability | How do we handle uncertainty and noise? | Naive Bayes, generative models, dropout |
| Statistics and information theory | What does "best model" mean, and how do we measure error? | MSE, cross-entropy, model evaluation |

!You do not need to be a mathematician. In this path every idea comes with a **worked numeric example**, a **figure**, an **interactive lab** and **Python code**.

## Notation you will see everywhere
| Symbol | Read as | Meaning | Example |
|---|---|---|---|
| $x_i$ | x sub i | Element number i | If $x=(2,4,6)$ then $x_2=4$ |
| $\sum_{i=1}^{n} x_i$ | sigma | Sum of all elements | $2+4+6=12$ |
| $\prod_{i=1}^{n} x_i$ | pi | Product of all elements | $2\times4\times6=48$ |
| $\bar{x}$ | x bar | Mean | $12/3=4$ |
| $\mathbb{R}^n$ | R n | All vectors of n numbers | $(2,4,6)\in\mathbb{R}^3$ |
| $\hat{y}$ | y hat | The model's prediction | $\hat{y}=w x+b$ |
| $\theta$ | theta | All parameters of the model | Weights and biases |
| $\arg\min_\theta L$ | arg min | The θ that makes L smallest | The goal of training |
| $\nabla L$ | nabla, gradient | Vector of partial derivatives | Direction of steepest increase |
| $P(A \mid B)$ | probability of A given B | Conditional probability | Chance of disease if the test is positive |

## Worked example: sigma is a for loop
Take the mean squared error:

$$\text{MSE}=\frac{1}{n}\sum_{i=1}^{n}(y_i-\hat{y}_i)^2$$

With $y=(3,5,7)$ and $\hat{y}=(2,5,9)$:

| i | $y_i$ | $\hat{y}_i$ | $y_i-\hat{y}_i$ | squared |
|---|---|---|---|---|
| 1 | 3 | 2 | 1 | 1 |
| 2 | 5 | 5 | 0 | 0 |
| 3 | 7 | 9 | −2 | 4 |

The squares add to $1+0+4=5$, so $\text{MSE}=5/3\approx1.667$. In Python the same formula is one line:

[[c:0]]

## How to read this path
- If you do not know Python yet, read the first lessons of the Python path first; the code here is simple.
- Read each lesson with its lab: play with the sliders first, then look at the formula.
- Work the numeric examples on paper and compare with the code output.`],
  code: [`import numpy as np

y     = np.array([3, 5, 7])
y_hat = np.array([2, 5, 9])

# Sigma written as a loop
total = 0
for i in range(len(y)):
    total += (y[i] - y_hat[i]) ** 2
print("sum of squares:", total)
print("MSE with a loop:", total / len(y))

# The same thing, vectorized
print("MSE with NumPy :", np.mean((y - y_hat) ** 2))

x = np.array([2, 4, 6])
print("sum:", x.sum(), " product:", x.prod(), " mean:", x.mean())`],
  ex: [E("برای $y=(1,2,3,4)$ و $\\hat{y}=(1,3,2,6)$ مقدار MSE را با دست حساب کن و با کد بررسی کن.", "For $y=(1,2,3,4)$ and $\\hat{y}=(1,3,2,6)$ compute the MSE by hand, then check it with code.", `import numpy as np
y = np.array([1, 2, 3, 4]); y_hat = np.array([1, 3, 2, 6])
print(np.mean((y - y_hat) ** 2))   # (0 + 1 + 1 + 4) / 4 = 1.5`, "خطاها 0، −1، 1، −2 هستند؛ مربع‌ها 0، 1، 1، 4 و میانگین 1.5.", "The errors are 0, −1, 1, −2; the squares are 0, 1, 1, 4 and their mean is 1.5.")],
  quiz: [Q("کدام شاخه ریاضی می‌گوید وزن‌ها را به کدام سمت تغییر دهیم؟", "Which branch tells us which way to change the weights?", ["حساب دیفرانسیل (گرادیان)", "جبر خطی", "احتمال"], ["Calculus (the gradient)", "Linear algebra", "Probability"], 0),
    Q("مقدار $\\sum_{i=1}^{4} i^2$ چند است؟", "What is $\\sum_{i=1}^{4} i^2$?", ["30", "10", "16"], ["30", "10", "16"], 0, "1 + 4 + 9 + 16 = 30", "1 + 4 + 9 + 16 = 30")]
});

L({ id: "math-functions",
  fa: ["تابع‌ها: خطی، نمایی، لگاریتم و سیگموید", R`## تابع یعنی چه؟
تابع یک **ماشین** است: یک عدد می‌گیرد و یک عدد می‌دهد. مدل یادگیری ماشین هم یک تابع است: ویژگی‌ها را می‌گیرد و پیش‌بینی می‌دهد. $f(x)=2x+1$ یعنی «ورودی را دو برابر کن و یکی اضافه کن»: $f(3)=7$.

[[fig:math_functions.png|شش تابعی که در یادگیری ماشین مدام می‌بینی.]]

## تابع‌های پرکاربرد
| تابع | فرمول | مقدار در 0 | برد | کاربرد |
|---|---|---|---|---|
| خطی | $wx+b$ | $b$ | همه اعداد | رگرسیون خطی، هر نورون قبل از فعال‌سازی |
| درجه دو | $x^2$ | 0 | نامنفی | مربع خطا |
| نمایی | $e^x$ | 1 | مثبت | softmax، رشد |
| لگاریتم | $\ln x$ | تعریف‌نشده | همه اعداد | آنتروپی، درست‌نمایی |
| سیگموید | $\dfrac{1}{1+e^{-x}}$ | 0.5 | بین 0 و 1 | احتمال در رگرسیون لجستیک |
| tanh | $\tanh x$ | 0 | بین −1 و 1 | شبکه‌های بازگشتی |
| ReLU | $\max(0,x)$ | 0 | نامنفی | لایه‌های پنهان شبکه عمیق |

## نمایی و لگاریتم وارون هم‌اند
$e\approx2.718$ عدد اویلر است. لگاریتم طبیعی می‌پرسد: «e را به چه توانی برسانم تا x شود؟»

| عبارت | مقدار | چرا |
|---|---|---|
| $e^0$ | 1 | هر عدد به توان صفر |
| $\ln 1$ | 0 | چون $e^0=1$ |
| $\ln e^3$ | 3 | لگاریتم و نمایی هم را خنثی می‌کنند |
| $\log_2 8$ | 3 | چون $2^3=8$ |
| $\ln 0.5$ | −0.693 | لگاریتم عددهای کمتر از 1 منفی است |

## سه قانون لگاریتم که هر روز لازم می‌شود
| قانون | مثال عددی |
|---|---|
| $\ln(ab)=\ln a+\ln b$ | $\ln(2\times3)=0.693+1.099=1.792=\ln 6$ |
| $\ln(a/b)=\ln a-\ln b$ | $\ln(6/2)=1.792-0.693=1.099=\ln 3$ |
| $\ln(a^k)=k\ln a$ | $\ln(2^3)=3\times0.693=2.079=\ln 8$ |

!قانون اول مهم‌ترین است: **ضرب را به جمع تبدیل می‌کند**. احتمال هزار نمونه مستقل، ضرب هزار عدد کوچک است (مثلاً $0.01^{1000}$) که کامپیوتر آن را صفر می‌بیند. با لگاریتم، ضرب به جمع تبدیل می‌شود و مشکل حل می‌شود. به همین دلیل همیشه با **log-likelihood** کار می‌کنیم.

## سیگموید: هر عدد را به احتمال تبدیل می‌کند
$$\sigma(x)=\frac{1}{1+e^{-x}}$$

| x | −4 | −2 | 0 | 2 | 4 |
|---|---|---|---|---|---|
| $e^{-x}$ | 54.60 | 7.389 | 1 | 0.135 | 0.018 |
| $\sigma(x)$ | 0.018 | 0.119 | 0.500 | 0.881 | 0.982 |

دو ویژگی مهم: $\sigma(-x)=1-\sigma(x)$ (مثلاً $0.119+0.881=1$) و مشتق ساده $\sigma'(x)=\sigma(x)(1-\sigma(x))$ که در درس مشتق می‌بینیم.

[[c:0]]

## ترکیب تابع‌ها
شبکه عصبی چیزی جز **تابعِ تابع** نیست: $f(g(x))$. اگر $g(x)=2x+1$ و $f(u)=u^2$ باشد، $f(g(3))=f(7)=49$. شبکه سه‌لایه یعنی $f_3(f_2(f_1(x)))$. بعداً با «قاعده زنجیره‌ای» از چنین ترکیبی مشتق می‌گیریم.`],
  en: ["Functions: linear, exponential, logarithm and sigmoid", R`## What is a function?
A function is a **machine**: it takes a number and returns a number. A machine-learning model is also a function: it takes features and returns a prediction. $f(x)=2x+1$ means "double the input and add one": $f(3)=7$.

[[fig:math_functions.png|Six functions you meet all the time in machine learning.]]

## The common functions
| Function | Formula | Value at 0 | Range | Used for |
|---|---|---|---|---|
| Linear | $wx+b$ | $b$ | all numbers | Linear regression, every neuron before activation |
| Quadratic | $x^2$ | 0 | non-negative | Squared error |
| Exponential | $e^x$ | 1 | positive | Softmax, growth |
| Logarithm | $\ln x$ | undefined | all numbers | Entropy, likelihood |
| Sigmoid | $\dfrac{1}{1+e^{-x}}$ | 0.5 | between 0 and 1 | Probability in logistic regression |
| tanh | $\tanh x$ | 0 | between −1 and 1 | Recurrent networks |
| ReLU | $\max(0,x)$ | 0 | non-negative | Hidden layers of deep networks |

## Exponential and logarithm undo each other
$e\approx2.718$ is Euler's number. The natural logarithm asks: "to what power must I raise e to get x?"

| Expression | Value | Why |
|---|---|---|
| $e^0$ | 1 | Anything to the power zero |
| $\ln 1$ | 0 | Because $e^0=1$ |
| $\ln e^3$ | 3 | Log and exponential cancel |
| $\log_2 8$ | 3 | Because $2^3=8$ |
| $\ln 0.5$ | −0.693 | Logs of numbers below 1 are negative |

## Three log rules you need every day
| Rule | Numeric example |
|---|---|
| $\ln(ab)=\ln a+\ln b$ | $\ln(2\times3)=0.693+1.099=1.792=\ln 6$ |
| $\ln(a/b)=\ln a-\ln b$ | $\ln(6/2)=1.792-0.693=1.099=\ln 3$ |
| $\ln(a^k)=k\ln a$ | $\ln(2^3)=3\times0.693=2.079=\ln 8$ |

!The first rule matters most: it **turns products into sums**. The probability of a thousand independent samples is a product of a thousand small numbers (say $0.01^{1000}$), which a computer rounds to zero. Taking logs turns the product into a sum and the problem disappears. That is why we always work with the **log-likelihood**.

## Sigmoid: turns any number into a probability
$$\sigma(x)=\frac{1}{1+e^{-x}}$$

| x | −4 | −2 | 0 | 2 | 4 |
|---|---|---|---|---|---|
| $e^{-x}$ | 54.60 | 7.389 | 1 | 0.135 | 0.018 |
| $\sigma(x)$ | 0.018 | 0.119 | 0.500 | 0.881 | 0.982 |

Two useful facts: $\sigma(-x)=1-\sigma(x)$ (for example $0.119+0.881=1$), and the simple derivative $\sigma'(x)=\sigma(x)(1-\sigma(x))$, which we meet in the derivative lesson.

[[c:0]]

## Composing functions
A neural network is nothing but a **function of a function**: $f(g(x))$. If $g(x)=2x+1$ and $f(u)=u^2$ then $f(g(3))=f(7)=49$. A three-layer network is $f_3(f_2(f_1(x)))$. Later the chain rule tells us how to differentiate such a composition.`],
  code: [`import numpy as np
import matplotlib.pyplot as plt

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

for x in [-4, -2, 0, 2, 4]:
    print(f"x = {x:2d}   e^-x = {np.exp(-x):7.3f}   sigmoid = {sigmoid(x):.3f}")

# Log rules
print("ln(2*3) =", round(np.log(6), 3), "  ln2 + ln3 =", round(np.log(2) + np.log(3), 3))

# Why logs: a product of many small numbers underflows, a sum of logs does not
p = np.full(1000, 0.01)
print("product:", np.prod(p), "   sum of logs:", np.sum(np.log(p)))

x = np.linspace(-6, 6, 200)
plt.plot(x, sigmoid(x), label="sigmoid")
plt.plot(x, np.tanh(x), label="tanh")
plt.plot(x, np.maximum(0, x), label="ReLU")
plt.ylim(-1.5, 3); plt.grid(alpha=0.3); plt.legend(); plt.show()`],
  ex: [E("بدون ماشین‌حساب: $\\ln(e^2\\cdot e^5)$ و $\\log_{10} 1000$ چند است؟ سپس $\\sigma(1)$ را با کد حساب کن.", "Without a calculator: what are $\\ln(e^2\\cdot e^5)$ and $\\log_{10} 1000$? Then compute $\\sigma(1)$ with code.", `import numpy as np
print(np.log(np.exp(2) * np.exp(5)))   # 7
print(np.log10(1000))                  # 3
print(1 / (1 + np.exp(-1)))            # 0.731`, "$\\ln(e^2 e^5)=2+5=7$ و $\\log_{10}1000=3$ و $\\sigma(1)\\approx0.731$.", "$\\ln(e^2 e^5)=2+5=7$, $\\log_{10}1000=3$ and $\\sigma(1)\\approx0.731$.")],
  quiz: [Q("چرا به جای ضرب احتمال‌ها، لگاریتم آن‌ها را جمع می‌کنیم؟", "Why do we add log-probabilities instead of multiplying probabilities?", ["چون ضرب عددهای خیلی کوچک در کامپیوتر صفر می‌شود", "چون لگاریتم همیشه مثبت است", "چون جمع کندتر است"], ["Because a product of tiny numbers underflows to zero", "Because logs are always positive", "Because addition is slower"], 0),
    Q("$\\sigma(0)$ چند است؟", "What is $\\sigma(0)$?", ["0.5", "0", "1"], ["0.5", "0", "1"], 0, "$1/(1+e^0)=1/2$", "$1/(1+e^0)=1/2$")]
});

M("math", "mlinalg", "جبر خطی", "Linear algebra");

L({ id: "math-vectors",
  fa: ["بردارها، نُرم و ضرب داخلی", R`## بردار یعنی چه؟
بردار یک **فهرست مرتب از عددها** است. در یادگیری ماشین هر نمونه یک بردار است: خانه‌ای با متراژ 120، 3 اتاق و 10 سال ساخت می‌شود $x=(120, 3, 10)\in\mathbb{R}^3$. از نظر هندسی، بردار یک **پیکان** از مبدأ به آن نقطه است.

[[lab:m_vec]]

## عملیات پایه
برای $a=(3,4)$ و $b=(4,3)$:

| عملیات | فرمول | محاسبه | نتیجه |
|---|---|---|---|
| جمع | $a+b$ | $(3+4,\ 4+3)$ | $(7,7)$ |
| تفریق | $a-b$ | $(3-4,\ 4-3)$ | $(-1,1)$ |
| ضرب در عدد | $2a$ | $(2\times3,\ 2\times4)$ | $(6,8)$ |
| نُرم (طول) | $\lVert a\rVert=\sqrt{a_1^2+a_2^2}$ | $\sqrt{9+16}$ | 5 |
| ضرب داخلی | $a\cdot b=\sum a_i b_i$ | $3\times4+4\times3$ | 24 |
| بردار یکه | $a/\lVert a\rVert$ | $(3/5,\ 4/5)$ | $(0.6, 0.8)$ |
| فاصله | $\lVert a-b\rVert$ | $\sqrt{1+1}$ | 1.414 |

## ضرب داخلی: مهم‌ترین عمل در یادگیری ماشین
ضرب داخلی دو معنی دارد که هر دو را باید بدانی:

$$a\cdot b=\sum_i a_i b_i=\lVert a\rVert\,\lVert b\rVert\cos\theta$$

- **معنی جبری:** جمع وزن‌دار. پیش‌بینی یک نورون $w\cdot x+b$ دقیقاً همین است.
- **معنی هندسی:** چقدر دو بردار هم‌جهت‌اند.

برای مثال بالا: $\cos\theta=\dfrac{24}{5\times5}=0.96$ پس $\theta\approx16.3^\circ$.

| مقدار $a\cdot b$ | زاویه | معنی |
|---|---|---|
| مثبت و بزرگ | نزدیک 0° | هم‌جهت، شبیه |
| صفر | 90° | عمود، بی‌ربط |
| منفی | بیشتر از 90° | مخالف |

## شباهت کسینوسی
اگر فقط **جهت** مهم باشد نه طول (مثلاً در متن، که طول سند نباید اثر بگذارد):

$$\text{cos-sim}(a,b)=\frac{a\cdot b}{\lVert a\rVert\,\lVert b\rVert}$$

موتورهای جستجو و مدل‌های زبانی با همین فرمول «نزدیک‌ترین معنی» را پیدا می‌کنند.

## نُرم‌های مختلف
[[fig:math_norms.png|چپ: همه بردارهایی که نُرمشان 1 است. راست: دو روش اندازه‌گیری فاصله.]]

| نُرم | فرمول | برای $(3,-4)$ | کاربرد |
|---|---|---|---|
| L1 (منهتن) | $\sum \lvert x_i\rvert$ | 7 | Lasso، مقاوم به داده پرت |
| L2 (اقلیدسی) | $\sqrt{\sum x_i^2}$ | 5 | فاصله معمولی، Ridge |
| L∞ (بیشینه) | $\max \lvert x_i\rvert$ | 4 | بدترین حالت |

## تصویر یک بردار روی دیگری
طول سایه a روی b برابر $\dfrac{a\cdot b}{\lVert b\rVert}=\dfrac{24}{5}=4.8$ است. PCA و رگرسیون هر دو بر پایه همین تصویر کردن ساخته شده‌اند.

[[c:0]]`],
  en: ["Vectors, norms and the dot product", R`## What is a vector?
A vector is an **ordered list of numbers**. In machine learning every sample is a vector: a house with 120 m², 3 rooms and 10 years of age becomes $x=(120, 3, 10)\in\mathbb{R}^3$. Geometrically a vector is an **arrow** from the origin to that point.

[[lab:m_vec]]

## Basic operations
For $a=(3,4)$ and $b=(4,3)$:

| Operation | Formula | Calculation | Result |
|---|---|---|---|
| Addition | $a+b$ | $(3+4,\ 4+3)$ | $(7,7)$ |
| Subtraction | $a-b$ | $(3-4,\ 4-3)$ | $(-1,1)$ |
| Scalar multiple | $2a$ | $(2\times3,\ 2\times4)$ | $(6,8)$ |
| Norm (length) | $\lVert a\rVert=\sqrt{a_1^2+a_2^2}$ | $\sqrt{9+16}$ | 5 |
| Dot product | $a\cdot b=\sum a_i b_i$ | $3\times4+4\times3$ | 24 |
| Unit vector | $a/\lVert a\rVert$ | $(3/5,\ 4/5)$ | $(0.6, 0.8)$ |
| Distance | $\lVert a-b\rVert$ | $\sqrt{1+1}$ | 1.414 |

## The dot product: the most important operation in ML
The dot product has two meanings, and you need both:

$$a\cdot b=\sum_i a_i b_i=\lVert a\rVert\,\lVert b\rVert\cos\theta$$

- **Algebraic meaning:** a weighted sum. A neuron's output $w\cdot x+b$ is exactly this.
- **Geometric meaning:** how much the two vectors point the same way.

For the example above: $\cos\theta=\dfrac{24}{5\times5}=0.96$, so $\theta\approx16.3^\circ$.

| Value of $a\cdot b$ | Angle | Meaning |
|---|---|---|
| Large and positive | near 0° | Same direction, similar |
| Zero | 90° | Perpendicular, unrelated |
| Negative | more than 90° | Opposite |

## Cosine similarity
When only the **direction** matters and not the length (in text, for example, where document length should not count):

$$\text{cos-sim}(a,b)=\frac{a\cdot b}{\lVert a\rVert\,\lVert b\rVert}$$

Search engines and language models use this formula to find the "closest meaning".

## Different norms
[[fig:math_norms.png|Left: all vectors whose norm is 1. Right: two ways to measure distance.]]

| Norm | Formula | For $(3,-4)$ | Used for |
|---|---|---|---|
| L1 (Manhattan) | $\sum \lvert x_i\rvert$ | 7 | Lasso, robust to outliers |
| L2 (Euclidean) | $\sqrt{\sum x_i^2}$ | 5 | Ordinary distance, Ridge |
| L∞ (max) | $\max \lvert x_i\rvert$ | 4 | Worst case |

## Projecting one vector on another
The length of the shadow of a on b is $\dfrac{a\cdot b}{\lVert b\rVert}=\dfrac{24}{5}=4.8$. Both PCA and regression are built on this projection.

[[c:0]]`],
  code: [`import numpy as np

a = np.array([3, 4])
b = np.array([4, 3])

print("a + b      =", a + b)
print("2a         =", 2 * a)
print("|a|        =", np.linalg.norm(a))
print("a . b      =", a @ b)                   # same as np.dot(a, b)
cos = a @ b / (np.linalg.norm(a) * np.linalg.norm(b))
print("cos(theta) =", cos, "  theta =", round(np.degrees(np.arccos(cos)), 2), "degrees")
print("distance   =", round(np.linalg.norm(a - b), 3))
print("projection of a on b =", a @ b / np.linalg.norm(b))

v = np.array([3, -4])
print("L1, L2, Linf =", np.linalg.norm(v, 1), np.linalg.norm(v, 2), np.linalg.norm(v, np.inf))

# Cosine similarity of word-count vectors: which document is closest to the query?
#                 [python, data, football]
docs = np.array([[5, 3, 0], [1, 0, 6], [10, 6, 1]])
query = np.array([2, 1, 0])
sim = docs @ query / (np.linalg.norm(docs, axis=1) * np.linalg.norm(query))
print("cosine similarity to the query:", sim.round(3))`],
  ex: [E("برای $u=(1,2,2)$ و $v=(2,0,1)$ طول هر دو، ضرب داخلی و زاویه بین آن‌ها را حساب کن.", "For $u=(1,2,2)$ and $v=(2,0,1)$ find both lengths, the dot product and the angle between them.", `import numpy as np
u = np.array([1, 2, 2]); v = np.array([2, 0, 1])
nu, nv = np.linalg.norm(u), np.linalg.norm(v)
print(nu, round(nv, 3), u @ v)                       # 3.0  2.236  4
print(round(np.degrees(np.arccos(u @ v / (nu * nv))), 1))   # 53.4`, "$\\lVert u\\rVert=3$، $\\lVert v\\rVert=\\sqrt5\\approx2.236$، $u\\cdot v=4$ و $\\theta\\approx53.4^\\circ$.", "$\\lVert u\\rVert=3$, $\\lVert v\\rVert=\\sqrt5\\approx2.236$, $u\\cdot v=4$ and $\\theta\\approx53.4^\\circ$."),
    E("در آزمایشگاه، b را طوری قرار بده که $a\\cdot b=0$ شود. چه زاویه‌ای می‌بینی؟", "In the lab, place b so that $a\\cdot b=0$. What angle do you see?", null, "زاویه 90 درجه می‌شود: دو بردار عمودند و طول تصویر صفر است.", "The angle is 90 degrees: the vectors are perpendicular and the projection has length zero.")],
  quiz: [Q("اگر $a\\cdot b=0$ باشد دو بردار چه وضعی دارند؟", "If $a\\cdot b=0$, how are the two vectors related?", ["عمودند", "هم‌جهت‌اند", "هم‌طول‌اند"], ["Perpendicular", "Same direction", "Same length"], 0),
    Q("نُرم L2 بردار $(6,8)$ چند است؟", "What is the L2 norm of $(6,8)$?", ["10", "14", "8"], ["10", "14", "8"], 0, "$\\sqrt{36+64}=10$", "$\\sqrt{36+64}=10$"),
    Q("شباهت کسینوسی به چه چیزی حساس نیست؟", "Cosine similarity ignores what?", ["طول بردارها", "جهت بردارها", "علامت درایه‌ها"], ["The lengths of the vectors", "Their directions", "The signs of the entries"], 0)]
});

L({ id: "math-matrices",
  fa: ["ماتریس‌ها و ضرب ماتریسی", R`## ماتریس یعنی چه؟
ماتریس یک **جدول مستطیلی از عددها** است. کل مجموعه داده یک ماتریس $X$ با $n$ سطر (نمونه‌ها) و $d$ ستون (ویژگی‌ها) است. درایه $X_{ij}$ یعنی ویژگی j از نمونه i.

| | متراژ (×100) | اتاق |
|---|---|---|
| خانه 1 | 1.0 | 2 |
| خانه 2 | 1.5 | 3 |
| خانه 3 | 0.8 | 1 |

این جدول ماتریس $X$ با شکل $3\times2$ است.

## عملیات
| عملیات | شرط | مثال |
|---|---|---|
| جمع $A+B$ | هم‌شکل باشند | درایه به درایه |
| ضرب در عدد $cA$ | همیشه | هر درایه ضرب در c |
| ترانهاده $A^\top$ | همیشه | سطر و ستون جابه‌جا: شکل $m\times n$ می‌شود $n\times m$ |
| ضرب $AB$ | ستون‌های A = سطرهای B | $(m\times n)(n\times p)=(m\times p)$ |

## ضرب ماتریسی قدم به قدم
درایه $(i,j)$ حاصل‌ضرب، **ضرب داخلی سطر i از A در ستون j از B** است:

[[fig:math_matmul.png|درایه سطر 1 و ستون 2 حاصل‌ضرب از سطر 1 ماتریس A و ستون 2 ماتریس B به دست می‌آید.]]

| درایه | محاسبه | نتیجه |
|---|---|---|
| $(1,1)$ | $1\times7+2\times9+3\times11$ | 58 |
| $(1,2)$ | $1\times8+2\times10+3\times12$ | 64 |
| $(2,1)$ | $4\times7+5\times9+6\times11$ | 139 |
| $(2,2)$ | $4\times8+5\times10+6\times12$ | 154 |

!ضرب ماتریسی **جابه‌جایی ندارد**: معمولاً $AB\ne BA$. در مثال بالا $AB$ ماتریس $2\times2$ است ولی $BA$ ماتریس $3\times3$.

## چرا این‌قدر مهم است؟ پیش‌بینی برای همه نمونه‌ها با یک ضرب
اگر وزن‌ها $w=(2,\ 0.5)$ باشند، پیش‌بینی قیمت هر سه خانه می‌شود $\hat{y}=Xw$:

| خانه | محاسبه | $\hat{y}$ |
|---|---|---|
| 1 | $1.0\times2+2\times0.5$ | 3.0 |
| 2 | $1.5\times2+3\times0.5$ | 4.5 |
| 3 | $0.8\times2+1\times0.5$ | 2.1 |

یک لایه شبکه عصبی هم همین است: $h=\sigma(Wx+b)$. کارت گرافیک (GPU) دقیقاً برای انجام سریع همین ضرب‌ها ساخته شده است.

## ماتریس به‌عنوان «تبدیل»
هر ماتریس $2\times2$ صفحه را تغییر شکل می‌دهد: می‌کشد، می‌چرخاند، برش می‌دهد یا له می‌کند. ستون‌های ماتریس می‌گویند بردارهای پایه $(1,0)$ و $(0,1)$ کجا می‌روند.

[[lab:m_mat]]

| ماتریس | اثر | دترمینان |
|---|---|---|
| $\begin{bmatrix}1&0\\0&1\end{bmatrix}$ | همانی: هیچ تغییری | 1 |
| $\begin{bmatrix}2&0\\0&0.5\end{bmatrix}$ | کشیدن افقی، فشردن عمودی | 1 |
| $\begin{bmatrix}0&-1\\1&0\end{bmatrix}$ | چرخش 90 درجه | 1 |
| $\begin{bmatrix}1&1\\0&1\end{bmatrix}$ | برش | 1 |
| $\begin{bmatrix}1&2\\0.5&1\end{bmatrix}$ | له شدن روی یک خط | 0 |

## ماتریس‌های خاص
| نام | تعریف | ویژگی |
|---|---|---|
| همانی $I$ | 1 روی قطر، بقیه صفر | $AI=IA=A$ |
| قطری | فقط قطر غیرصفر | ضرب و وارون خیلی ساده |
| متقارن | $A=A^\top$ | ماتریس کوواریانس همیشه متقارن است |
| متعامد | $Q^\top Q=I$ | طول و زاویه را حفظ می‌کند (چرخش) |

[[c:0]]`],
  en: ["Matrices and matrix multiplication", R`## What is a matrix?
A matrix is a **rectangular table of numbers**. A whole dataset is a matrix $X$ with $n$ rows (samples) and $d$ columns (features). The entry $X_{ij}$ is feature j of sample i.

| | Area (×100) | Rooms |
|---|---|---|
| House 1 | 1.0 | 2 |
| House 2 | 1.5 | 3 |
| House 3 | 0.8 | 1 |

This table is a matrix $X$ of shape $3\times2$.

## Operations
| Operation | Condition | Example |
|---|---|---|
| Sum $A+B$ | Same shape | Entry by entry |
| Scalar multiple $cA$ | Always | Every entry times c |
| Transpose $A^\top$ | Always | Rows and columns swap: $m\times n$ becomes $n\times m$ |
| Product $AB$ | Columns of A = rows of B | $(m\times n)(n\times p)=(m\times p)$ |

## Matrix multiplication step by step
Entry $(i,j)$ of the product is the **dot product of row i of A with column j of B**:

[[fig:math_matmul.png|The entry in row 1, column 2 of the product comes from row 1 of A and column 2 of B.]]

| Entry | Calculation | Result |
|---|---|---|
| $(1,1)$ | $1\times7+2\times9+3\times11$ | 58 |
| $(1,2)$ | $1\times8+2\times10+3\times12$ | 64 |
| $(2,1)$ | $4\times7+5\times9+6\times11$ | 139 |
| $(2,2)$ | $4\times8+5\times10+6\times12$ | 154 |

!Matrix multiplication is **not commutative**: usually $AB\ne BA$. In the example above $AB$ is $2\times2$ but $BA$ is $3\times3$.

## Why it matters: predictions for every sample in one product
With weights $w=(2,\ 0.5)$, the predicted prices of all three houses are $\hat{y}=Xw$:

| House | Calculation | $\hat{y}$ |
|---|---|---|
| 1 | $1.0\times2+2\times0.5$ | 3.0 |
| 2 | $1.5\times2+3\times0.5$ | 4.5 |
| 3 | $0.8\times2+1\times0.5$ | 2.1 |

One layer of a neural network is the same thing: $h=\sigma(Wx+b)$. Graphics cards (GPUs) are built to do exactly these products fast.

## A matrix as a "transformation"
Every $2\times2$ matrix reshapes the plane: it stretches, rotates, shears or squashes it. The columns of the matrix say where the basis vectors $(1,0)$ and $(0,1)$ go.

[[lab:m_mat]]

| Matrix | Effect | Determinant |
|---|---|---|
| $\begin{bmatrix}1&0\\0&1\end{bmatrix}$ | Identity: nothing changes | 1 |
| $\begin{bmatrix}2&0\\0&0.5\end{bmatrix}$ | Stretch across, squeeze up | 1 |
| $\begin{bmatrix}0&-1\\1&0\end{bmatrix}$ | Rotate 90 degrees | 1 |
| $\begin{bmatrix}1&1\\0&1\end{bmatrix}$ | Shear | 1 |
| $\begin{bmatrix}1&2\\0.5&1\end{bmatrix}$ | Collapse onto a line | 0 |

## Special matrices
| Name | Definition | Property |
|---|---|---|
| Identity $I$ | 1 on the diagonal, 0 elsewhere | $AI=IA=A$ |
| Diagonal | Only the diagonal is non-zero | Products and inverses are easy |
| Symmetric | $A=A^\top$ | A covariance matrix is always symmetric |
| Orthogonal | $Q^\top Q=I$ | Keeps lengths and angles (a rotation) |

[[c:0]]`],
  code: [`import numpy as np

A = np.array([[1, 2, 3],
              [4, 5, 6]])          # 2 x 3
B = np.array([[7, 8],
              [9, 10],
              [11, 12]])           # 3 x 2

print("A @ B =")
print(A @ B)                       # 2 x 2
print("B @ A has shape", (B @ A).shape, "-> AB and BA are different")
print("A transpose =")
print(A.T)

# Predictions for all houses at once: y_hat = X w
X = np.array([[1.0, 2], [1.5, 3], [0.8, 1]])
w = np.array([2, 0.5])
print("X w =", X @ w)

# One layer of a neural network: h = sigmoid(W x + b)
W = np.array([[0.1, 0.2], [0.3, 0.4], [-0.5, 0.6]])   # 3 neurons, 2 inputs
b = np.array([0.0, 0.1, -0.1])
x = np.array([1.0, 2.0])
h = 1 / (1 + np.exp(-(W @ x + b)))
print("layer output:", h.round(3))`],
  ex: [E("$C=\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}$ و $D=\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$. $CD$ و $DC$ را با دست حساب کن. چه اتفاقی می‌افتد؟", "$C=\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}$ and $D=\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$. Compute $CD$ and $DC$ by hand. What happens?", `import numpy as np
C = np.array([[1, 2], [3, 4]]); D = np.array([[0, 1], [1, 0]])
print(C @ D)   # columns of C swapped: [[2 1] [4 3]]
print(D @ C)   # rows of C swapped:    [[3 4] [1 2]]`, "$CD$ ستون‌های C را جابه‌جا می‌کند و $DC$ سطرها را؛ پس $CD\\ne DC$.", "$CD$ swaps the columns of C and $DC$ swaps its rows, so $CD\\ne DC$.")],
  quiz: [Q("حاصل‌ضرب ماتریس $4\\times3$ در ماتریس $3\\times5$ چه شکلی دارد؟", "What is the shape of a $4\\times3$ matrix times a $3\\times5$ matrix?", ["$4\\times5$", "$3\\times3$", "تعریف نشده"], ["$4\\times5$", "$3\\times3$", "Undefined"], 0),
    Q("ستون‌های یک ماتریس $2\\times2$ چه چیزی را نشان می‌دهند؟", "What do the columns of a $2\\times2$ matrix show?", ["جای جدید بردارهای پایه", "مقدارهای ویژه", "مساحت"], ["Where the basis vectors land", "The eigenvalues", "The area"], 0)]
});

L({ id: "math-systems",
  fa: ["دستگاه معادلات، وارون، دترمینان و رتبه", R`## دستگاه خطی به شکل ماتریسی
دو معادله با دو مجهول:

$$2x+y=5 \qquad x+3y=10$$

به شکل $A\mathbf{x}=\mathbf{b}$ نوشته می‌شود:

$$\begin{bmatrix}2&1\\1&3\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}=\begin{bmatrix}5\\10\end{bmatrix}$$

## سه حالت ممکن
[[fig:math_systems.png|هر معادله یک خط است. جواب، نقطه برخورد خط‌هاست.]]

| حالت | هندسه | دترمینان | تعداد جواب |
|---|---|---|---|
| خط‌ها متقاطع | یک نقطه مشترک | غیرصفر | دقیقاً یکی |
| خط‌ها موازی | هیچ نقطه مشترکی نیست | صفر | هیچ |
| خط‌ها منطبق | همه نقاط مشترک | صفر | بی‌نهایت |

## دترمینان
برای ماتریس $2\times2$:

$$\det\begin{bmatrix}a&b\\c&d\end{bmatrix}=ad-bc$$

در مثال ما $\det A=2\times3-1\times1=5$. دترمینان می‌گوید ماتریس **مساحت را چند برابر می‌کند**. اگر صفر باشد، صفحه روی یک خط له شده و اطلاعات از بین رفته است؛ چنین ماتریسی **تکین** است و وارون ندارد.

## ماتریس وارون
$A^{-1}$ ماتریسی است که اثر A را خنثی می‌کند: $A^{-1}A=I$. برای $2\times2$:

$$A^{-1}=\frac{1}{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}$$

| گام | محاسبه |
|---|---|
| 1. دترمینان | $2\times3-1\times1=5$ |
| 2. وارون | $\dfrac{1}{5}\begin{bmatrix}3&-1\\-1&2\end{bmatrix}=\begin{bmatrix}0.6&-0.2\\-0.2&0.4\end{bmatrix}$ |
| 3. جواب $A^{-1}b$ | $x=0.6\times5-0.2\times10=1$ و $y=-0.2\times5+0.4\times10=3$ |
| 4. بررسی | $2(1)+3=5$ ✓ و $1+3(3)=10$ ✓ |

!در عمل هیچ‌وقت وارون را مستقیم حساب نکن. ~np.linalg.solve(A, b)~ هم سریع‌تر است و هم خطای عددی کمتری دارد.

## رتبه (rank)
رتبه یعنی **تعداد سطرها (یا ستون‌های) واقعاً مستقل**. اگر یک ستون ترکیبی از بقیه باشد، اطلاعات تازه‌ای ندارد.

| ماتریس | رتبه | چرا |
|---|---|---|
| $\begin{bmatrix}2&1\\1&3\end{bmatrix}$ | 2 (کامل) | ستون‌ها مستقل‌اند |
| $\begin{bmatrix}1&2\\2&4\end{bmatrix}$ | 1 | ستون دوم = 2 × ستون اول |
| $\begin{bmatrix}1&2&3\\4&5&6\\5&7&9\end{bmatrix}$ | 2 | سطر سوم = سطر اول + سطر دوم |

## این‌ها در یادگیری ماشین کجا می‌آیند؟
- **هم‌خطی چندگانه:** اگر دو ویژگی تقریباً یکی باشند (مثلاً قد به سانتی‌متر و قد به اینچ)، ماتریس $X^\top X$ تقریباً تکین می‌شود و ضرایب رگرسیون ناپایدار می‌شوند. Ridge با اضافه کردن $\lambda I$ این مشکل را حل می‌کند.
- **معادلات بیشتر از مجهول:** در رگرسیون معمولاً صدها نمونه و چند وزن داریم؛ جواب دقیق وجود ندارد و دنبال **بهترین جواب تقریبی** (کمترین مربعات) می‌گردیم: ~np.linalg.lstsq~.
- **عدد وضعیت (condition number):** هر چه بزرگ‌تر باشد، جواب به خطای کوچک در داده حساس‌تر است.

[[c:0]]`],
  en: ["Linear systems, inverse, determinant and rank", R`## A linear system in matrix form
Two equations with two unknowns:

$$2x+y=5 \qquad x+3y=10$$

are written as $A\mathbf{x}=\mathbf{b}$:

$$\begin{bmatrix}2&1\\1&3\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}=\begin{bmatrix}5\\10\end{bmatrix}$$

## Three possible cases
[[fig:math_systems.png|Each equation is a line. The solution is where the lines meet.]]

| Case | Geometry | Determinant | Solutions |
|---|---|---|---|
| Lines cross | One common point | Non-zero | Exactly one |
| Lines are parallel | No common point | Zero | None |
| Lines coincide | Every point is common | Zero | Infinitely many |

## The determinant
For a $2\times2$ matrix:

$$\det\begin{bmatrix}a&b\\c&d\end{bmatrix}=ad-bc$$

In our example $\det A=2\times3-1\times1=5$. The determinant says **how much the matrix scales areas**. If it is zero, the plane has been squashed onto a line and information is lost; such a matrix is **singular** and has no inverse.

## The inverse matrix
$A^{-1}$ is the matrix that undoes A: $A^{-1}A=I$. For $2\times2$:

$$A^{-1}=\frac{1}{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}$$

| Step | Calculation |
|---|---|
| 1. Determinant | $2\times3-1\times1=5$ |
| 2. Inverse | $\dfrac{1}{5}\begin{bmatrix}3&-1\\-1&2\end{bmatrix}=\begin{bmatrix}0.6&-0.2\\-0.2&0.4\end{bmatrix}$ |
| 3. Solution $A^{-1}b$ | $x=0.6\times5-0.2\times10=1$ and $y=-0.2\times5+0.4\times10=3$ |
| 4. Check | $2(1)+3=5$ ✓ and $1+3(3)=10$ ✓ |

!In practice never compute the inverse directly. ~np.linalg.solve(A, b)~ is both faster and numerically safer.

## Rank
The rank is the **number of truly independent rows (or columns)**. A column that is a combination of the others carries no new information.

| Matrix | Rank | Why |
|---|---|---|
| $\begin{bmatrix}2&1\\1&3\end{bmatrix}$ | 2 (full) | The columns are independent |
| $\begin{bmatrix}1&2\\2&4\end{bmatrix}$ | 1 | Column 2 = 2 × column 1 |
| $\begin{bmatrix}1&2&3\\4&5&6\\5&7&9\end{bmatrix}$ | 2 | Row 3 = row 1 + row 2 |

## Where does this appear in machine learning?
- **Multicollinearity:** if two features are almost the same (height in centimetres and height in inches), $X^\top X$ becomes nearly singular and the regression coefficients become unstable. Ridge fixes this by adding $\lambda I$.
- **More equations than unknowns:** in regression we usually have hundreds of samples and a few weights; there is no exact solution, so we look for the **best approximate one** (least squares): ~np.linalg.lstsq~.
- **Condition number:** the larger it is, the more the solution reacts to small errors in the data.

[[c:0]]`],
  code: [`import numpy as np

A = np.array([[2.0, 1.0],
              [1.0, 3.0]])
b = np.array([5.0, 10.0])

print("det A   =", round(np.linalg.det(A), 3))
print("inverse =")
print(np.linalg.inv(A))
print("solution:", np.linalg.solve(A, b))          # preferred over inv(A) @ b
print("check A @ x =", A @ np.linalg.solve(A, b))

# A singular matrix: second column = 2 * first column
S = np.array([[1.0, 2.0], [2.0, 4.0]])
print("det S =", np.linalg.det(S), "  rank S =", np.linalg.matrix_rank(S))

R3 = np.array([[1, 2, 3], [4, 5, 6], [5, 7, 9]])
print("rank of the 3x3 example:", np.linalg.matrix_rank(R3))

# More equations than unknowns: least squares finds the best line through 4 points
x = np.array([0.0, 1.0, 2.0, 3.0]); y = np.array([1.1, 2.9, 5.2, 6.8])
X = np.c_[np.ones(4), x]                           # column of ones for the intercept
w, *_ = np.linalg.lstsq(X, y, rcond=None)
print("intercept, slope =", w.round(3))

# Nearly identical features -> huge condition number
H = np.c_[x, x * 1.0001 + 1e-6]
print("condition number:", f"{np.linalg.cond(H.T @ H):.2e}")`],
  ex: [E("دستگاه $3x+2y=12$ و $x-y=-1$ را با دست (با فرمول وارون) و سپس با کد حل کن.", "Solve $3x+2y=12$ and $x-y=-1$ by hand (with the inverse formula), then with code.", `import numpy as np
A = np.array([[3.0, 2.0], [1.0, -1.0]]); b = np.array([12.0, -1.0])
print(np.linalg.det(A))        # -5
print(np.linalg.solve(A, b))   # [2. 3.]`, "$\\det=-3-2=-5$، وارون $=\\frac{1}{-5}\\begin{bmatrix}-1&-2\\\\-1&3\\end{bmatrix}$ و جواب $x=2,\\ y=3$.", "$\\det=-3-2=-5$, the inverse is $\\frac{1}{-5}\\begin{bmatrix}-1&-2\\\\-1&3\\end{bmatrix}$ and the solution is $x=2,\\ y=3$.")],
  quiz: [Q("اگر $\\det A=0$ باشد چه نتیجه‌ای می‌گیریم؟", "If $\\det A=0$, what follows?", ["A وارون ندارد", "A همانی است", "دستگاه همیشه یک جواب دارد"], ["A has no inverse", "A is the identity", "The system always has one solution"], 0),
    Q("رتبه ماتریس $\\begin{bmatrix}1&3\\\\2&6\\end{bmatrix}$ چند است؟", "What is the rank of $\\begin{bmatrix}1&3\\\\2&6\\end{bmatrix}$?", ["1", "2", "0"], ["1", "2", "0"], 0, "سطر دوم دو برابر سطر اول است.", "Row 2 is twice row 1.")]
});

L({ id: "math-eigen",
  fa: ["مقدار ویژه و بردار ویژه", R`## ایده اصلی
وقتی ماتریس A روی یک بردار اثر می‌کند، معمولاً هم **طول** و هم **جهت** آن را عوض می‌کند. ولی برای بعضی بردارهای خاص، جهت عوض نمی‌شود و فقط طول ضرب در یک عدد می‌شود:

$$A v=\lambda v$$

به $v$ **بردار ویژه** و به $\lambda$ **مقدار ویژه** می‌گویند. بردارهای ویژه «محورهای طبیعی» یک ماتریس‌اند.

[[lab:m_eig]]

## محاسبه با دست
برای $A=\begin{bmatrix}2&1\\1&2\end{bmatrix}$ باید $\det(A-\lambda I)=0$ را حل کنیم:

| گام | محاسبه |
|---|---|
| 1. معادله مشخصه | $\det\begin{bmatrix}2-\lambda&1\\1&2-\lambda\end{bmatrix}=(2-\lambda)^2-1=0$ |
| 2. ساده کردن | $\lambda^2-4\lambda+3=0\ \Rightarrow\ (\lambda-3)(\lambda-1)=0$ |
| 3. مقدارهای ویژه | $\lambda_1=3,\quad \lambda_2=1$ |
| 4. بردار ویژه $\lambda_1=3$ | $(A-3I)v=0\Rightarrow -v_1+v_2=0\Rightarrow v=(1,1)$ |
| 5. بردار ویژه $\lambda_2=1$ | $(A-I)v=0\Rightarrow v_1+v_2=0\Rightarrow v=(1,-1)$ |
| 6. بررسی | $A(1,1)=(3,3)=3(1,1)$ ✓ |

[[fig:math_eigen.png|چپ: بردارهای ویژه ماتریس کوواریانس، جهت‌های اصلی پراکندگی داده‌اند. راست: ماتریس A دایره واحد را در امتداد بردارهای ویژه می‌کشد.]]

## دو میان‌بر برای بررسی جواب
| ویژگی | فرمول | در مثال |
|---|---|---|
| جمع مقدارهای ویژه = اثر (trace) | $\lambda_1+\lambda_2=a+d$ | $3+1=2+2$ ✓ |
| ضرب مقدارهای ویژه = دترمینان | $\lambda_1\lambda_2=ad-bc$ | $3\times1=4-1$ ✓ |

## ماتریس‌های متقارن خوش‌رفتارند
اگر $A=A^\top$ باشد (مثل ماتریس کوواریانس):
- همه مقدارهای ویژه **حقیقی** هستند.
- بردارهای ویژه بر هم **عمودند**: $(1,1)\cdot(1,-1)=0$.
- می‌توان نوشت $A=Q\Lambda Q^\top$ که Q ستون‌هایش بردارهای ویژه یکه و Λ قطری است.

## کاربردها
| کاربرد | مقدار/بردار ویژهِ چه چیزی؟ | معنی |
|---|---|---|
| PCA | ماتریس کوواریانس | بردار ویژه = جهت بیشترین پراکندگی، مقدار ویژه = واریانس در آن جهت |
| PageRank گوگل | ماتریس پیوندهای وب | بردار ویژه با λ = 1 رتبه صفحه‌هاست |
| پایداری آموزش | ماتریس هسین تابع خطا | بزرگ‌ترین λ سقف نرخ یادگیری را تعیین می‌کند |
| خوشه‌بندی طیفی | لاپلاسین گراف | بردارهای ویژه کوچک، خوشه‌ها را جدا می‌کنند |
| شبکه بازگشتی | ماتریس وزن | $\lvert\lambda\rvert>1$ انفجار گرادیان، $\lvert\lambda\rvert<1$ محو شدن آن |

## روش توانی: ساده‌ترین الگوریتم
اگر یک بردار دلخواه را بارها در A ضرب و هر بار نرمال کنیم، به بردار ویژهِ بزرگ‌ترین مقدار ویژه می‌رسیم:

[[c:0]]`],
  en: ["Eigenvalues and eigenvectors", R`## The main idea
When a matrix A acts on a vector it usually changes both its **length** and its **direction**. For some special vectors the direction stays the same and only the length is multiplied by a number:

$$A v=\lambda v$$

$v$ is an **eigenvector** and $\lambda$ is its **eigenvalue**. Eigenvectors are the "natural axes" of a matrix.

[[lab:m_eig]]

## Computing by hand
For $A=\begin{bmatrix}2&1\\1&2\end{bmatrix}$ we solve $\det(A-\lambda I)=0$:

| Step | Calculation |
|---|---|
| 1. Characteristic equation | $\det\begin{bmatrix}2-\lambda&1\\1&2-\lambda\end{bmatrix}=(2-\lambda)^2-1=0$ |
| 2. Simplify | $\lambda^2-4\lambda+3=0\ \Rightarrow\ (\lambda-3)(\lambda-1)=0$ |
| 3. Eigenvalues | $\lambda_1=3,\quad \lambda_2=1$ |
| 4. Eigenvector for $\lambda_1=3$ | $(A-3I)v=0\Rightarrow -v_1+v_2=0\Rightarrow v=(1,1)$ |
| 5. Eigenvector for $\lambda_2=1$ | $(A-I)v=0\Rightarrow v_1+v_2=0\Rightarrow v=(1,-1)$ |
| 6. Check | $A(1,1)=(3,3)=3(1,1)$ ✓ |

[[fig:math_eigen.png|Left: the eigenvectors of a covariance matrix are the main directions of spread in the data. Right: A stretches the unit circle along its eigenvectors.]]

## Two shortcuts to check an answer
| Property | Formula | In the example |
|---|---|---|
| Sum of eigenvalues = trace | $\lambda_1+\lambda_2=a+d$ | $3+1=2+2$ ✓ |
| Product of eigenvalues = determinant | $\lambda_1\lambda_2=ad-bc$ | $3\times1=4-1$ ✓ |

## Symmetric matrices behave well
If $A=A^\top$ (like a covariance matrix):
- All eigenvalues are **real**.
- The eigenvectors are **perpendicular**: $(1,1)\cdot(1,-1)=0$.
- We can write $A=Q\Lambda Q^\top$, where the columns of Q are unit eigenvectors and Λ is diagonal.

## Applications
| Application | Eigen-things of what? | Meaning |
|---|---|---|
| PCA | Covariance matrix | Eigenvector = direction of largest spread, eigenvalue = variance along it |
| Google PageRank | Web link matrix | The eigenvector with λ = 1 ranks the pages |
| Training stability | Hessian of the loss | The largest λ limits the learning rate |
| Spectral clustering | Graph Laplacian | The small eigenvectors separate the clusters |
| Recurrent networks | Weight matrix | $\lvert\lambda\rvert>1$ exploding gradients, $\lvert\lambda\rvert<1$ vanishing gradients |

## Power iteration: the simplest algorithm
Multiply any starting vector by A again and again, normalizing each time, and it converges to the eigenvector of the largest eigenvalue:

[[c:0]]`],
  code: [`import numpy as np

A = np.array([[2.0, 1.0],
              [1.0, 2.0]])

vals, vecs = np.linalg.eig(A)
print("eigenvalues :", vals)
print("eigenvectors (columns):")
print(vecs.round(3))
for lam, v in zip(vals, vecs.T):
    print("A v =", (A @ v).round(3), "  lambda v =", (lam * v).round(3))
print("trace =", np.trace(A), "  det =", round(np.linalg.det(A), 3))

# Power iteration
v = np.array([1.0, 0.0])
for step in range(1, 9):
    v = A @ v
    v = v / np.linalg.norm(v)
    print(step, v.round(4), "  Rayleigh quotient =", round(v @ A @ v, 4))

# Covariance matrix of data -> principal directions
rng = np.random.default_rng(0)
X = rng.multivariate_normal([0, 0], [[3, 1.6], [1.6, 1.5]], 500)
C = np.cov(X.T)
w, V = np.linalg.eigh(C)            # eigh is for symmetric matrices
print("variances along the principal axes:", w[::-1].round(3))
print("first principal direction:", V[:, -1].round(3))`],
  ex: [E("مقدارها و بردارهای ویژه $\\begin{bmatrix}4&1\\\\2&3\\end{bmatrix}$ را با دست پیدا کن و با ~np.linalg.eig~ بررسی کن.", "Find the eigenvalues and eigenvectors of $\\begin{bmatrix}4&1\\\\2&3\\end{bmatrix}$ by hand and check with ~np.linalg.eig~.", `import numpy as np
vals, vecs = np.linalg.eig(np.array([[4.0, 1.0], [2.0, 3.0]]))
print(vals)            # 5 and 2
print(vecs.round(3))   # directions (1, 1) and (1, -2)`, "$\\lambda^2-7\\lambda+10=0$ پس $\\lambda=5,2$. بردارها: $(1,1)$ و $(1,-2)$.", "$\\lambda^2-7\\lambda+10=0$, so $\\lambda=5,2$. Eigenvectors: $(1,1)$ and $(1,-2)$."),
    E("در آزمایشگاه ماتریس چرخش را انتخاب کن. چرا هیچ بردار ویژه حقیقی‌ای پیدا نمی‌شود؟", "Pick the rotation matrix in the lab. Why is there no real eigenvector?", null, "چرخش 90 درجه جهت همه بردارها را عوض می‌کند؛ پس هیچ برداری هم‌راستا با تصویرش نمی‌ماند و مقدارهای ویژه مختلط‌اند ($\\pm i$).", "A 90-degree rotation changes the direction of every vector, so none stays aligned with its image; the eigenvalues are complex ($\\pm i$).")],
  quiz: [Q("اگر $Av=\\lambda v$ باشد، A با بردار v چه می‌کند؟", "If $Av=\\lambda v$, what does A do to v?", ["فقط طولش را λ برابر می‌کند", "آن را 90 درجه می‌چرخاند", "آن را صفر می‌کند"], ["Only scales its length by λ", "Rotates it 90 degrees", "Sends it to zero"], 0),
    Q("در PCA مقدار ویژه بزرگ‌تر یعنی چه؟", "In PCA, what does a larger eigenvalue mean?", ["واریانس بیشتر در آن جهت", "خطای بیشتر", "ویژگی کم‌اهمیت‌تر"], ["More variance along that direction", "More error", "A less important feature"], 0),
    Q("مقدارهای ویژه $\\begin{bmatrix}5&0\\\\0&2\\end{bmatrix}$ کدام‌اند؟", "What are the eigenvalues of $\\begin{bmatrix}5&0\\\\0&2\\end{bmatrix}$?", ["5 و 2", "7 و 10", "0 و 0"], ["5 and 2", "7 and 10", "0 and 0"], 0, "در ماتریس قطری، مقدارهای ویژه همان درایه‌های قطرند.", "For a diagonal matrix the eigenvalues are the diagonal entries.")]
});

L({ id: "math-svd",
  fa: ["تجزیه مقدارهای تکین (SVD) و فشرده‌سازی", R`## چرا SVD؟
بردار ویژه فقط برای ماتریس مربعی تعریف می‌شود، ولی داده‌های ما معمولاً مستطیلی‌اند ($n$ نمونه × $d$ ویژگی). SVD برای **هر** ماتریسی کار می‌کند:

$$A=U\Sigma V^\top$$

| بخش | شکل | چیست |
|---|---|---|
| $U$ | $m\times m$ | ستون‌ها متعامد؛ «الگوهای سطرها» |
| $\Sigma$ | $m\times n$ قطری | مقدارهای تکین $\sigma_1\ge\sigma_2\ge\dots\ge0$؛ اهمیت هر الگو |
| $V^\top$ | $n\times n$ | سطرها متعامد؛ «الگوهای ستون‌ها» |

از نظر هندسی هر ماتریس = **چرخش** ($V^\top$) + **کشیدن در راستای محورها** ($\Sigma$) + **چرخش دوباره** ($U$).

## مثال عددی
برای $A=\begin{bmatrix}3&2&2\\2&3&-2\end{bmatrix}$:

| گام | محاسبه |
|---|---|
| 1. $AA^\top$ | $\begin{bmatrix}17&8\\8&17\end{bmatrix}$ |
| 2. مقدارهای ویژه $AA^\top$ | $(17-\lambda)^2-64=0\Rightarrow\lambda=25,\ 9$ |
| 3. مقدارهای تکین | $\sigma_1=\sqrt{25}=5,\quad\sigma_2=\sqrt9=3$ |
| 4. ستون‌های U | $\frac{1}{\sqrt2}(1,1)$ و $\frac{1}{\sqrt2}(1,-1)$ |

پس مقدارهای تکین، **جذر مقدارهای ویژه $A^\top A$** هستند.

## تقریب با رتبه پایین
SVD ماتریس را به جمع چند «لایه» ساده می‌شکند:

$$A=\sigma_1 u_1 v_1^\top+\sigma_2 u_2 v_2^\top+\dots$$

اگر فقط $k$ جمله اول را نگه داریم، **بهترین تقریب ممکن با رتبه k** را داریم (قضیه اکارت–یانگ). چون مقدارهای تکین به‌سرعت کوچک می‌شوند، چند جمله اول بیشتر اطلاعات را دارند.

[[fig:math_svd_img.png|یک عکس سیاه‌وسفید که با k مقدار تکین اول بازسازی شده است. با 20 مقدار، تصویر قابل تشخیص است.]]

[[fig:math_svd_energy.png|چپ: مقدارهای تکین خیلی سریع کوچک می‌شوند. راست: سهم تجمعی «انرژی».]]

## چقدر صرفه‌جویی؟
یک تصویر $m\times n$ در حالت عادی $mn$ عدد است. با رتبه k فقط $k(m+n+1)$ عدد لازم است:

| تصویر $200\times300$ | تعداد عدد | درصد |
|---|---|---|
| اصلی | 60,000 | 100٪ |
| k = 50 | $50\times501=25{,}050$ | 42٪ |
| k = 20 | $20\times501=10{,}020$ | 17٪ |
| k = 5 | $5\times501=2{,}505$ | 4٪ |

## کاربردها
| کاربرد | چطور |
|---|---|
| PCA | SVD روی داده مرکزی‌شده؛ ستون‌های V مؤلفه‌های اصلی‌اند و $\sigma_i^2/(n-1)$ واریانس هر کدام |
| سیستم توصیه‌گر | ماتریس کاربر × فیلم را با رتبه پایین تقریب می‌زنیم تا امتیازهای خالی پیش‌بینی شوند |
| تحلیل معنایی متن (LSA) | SVD روی ماتریس سند × واژه، «موضوع‌ها» را پیدا می‌کند |
| شبه‌وارون | $A^+=V\Sigma^+U^\top$؛ حل کمترین مربعات حتی وقتی $X^\top X$ تکین است |
| LoRA در مدل‌های زبانی | تغییر وزن‌ها را با دو ماتریس کوچک رتبه پایین نشان می‌دهند |

[[c:0]]`],
  en: ["Singular value decomposition (SVD) and compression", R`## Why SVD?
Eigenvectors exist only for square matrices, but our data is usually rectangular ($n$ samples × $d$ features). The SVD works for **any** matrix:

$$A=U\Sigma V^\top$$

| Part | Shape | What it is |
|---|---|---|
| $U$ | $m\times m$ | Orthogonal columns; "row patterns" |
| $\Sigma$ | $m\times n$ diagonal | Singular values $\sigma_1\ge\sigma_2\ge\dots\ge0$; the weight of each pattern |
| $V^\top$ | $n\times n$ | Orthogonal rows; "column patterns" |

Geometrically every matrix = a **rotation** ($V^\top$) + a **stretch along the axes** ($\Sigma$) + **another rotation** ($U$).

## Worked example
For $A=\begin{bmatrix}3&2&2\\2&3&-2\end{bmatrix}$:

| Step | Calculation |
|---|---|
| 1. $AA^\top$ | $\begin{bmatrix}17&8\\8&17\end{bmatrix}$ |
| 2. Eigenvalues of $AA^\top$ | $(17-\lambda)^2-64=0\Rightarrow\lambda=25,\ 9$ |
| 3. Singular values | $\sigma_1=\sqrt{25}=5,\quad\sigma_2=\sqrt9=3$ |
| 4. Columns of U | $\frac{1}{\sqrt2}(1,1)$ and $\frac{1}{\sqrt2}(1,-1)$ |

So the singular values are the **square roots of the eigenvalues of $A^\top A$**.

## Low-rank approximation
The SVD splits a matrix into a sum of simple "layers":

$$A=\sigma_1 u_1 v_1^\top+\sigma_2 u_2 v_2^\top+\dots$$

Keeping only the first $k$ terms gives the **best possible rank-k approximation** (the Eckart–Young theorem). Because singular values shrink quickly, the first few terms carry most of the information.

[[fig:math_svd_img.png|A grayscale photo rebuilt from its first k singular values. With 20 of them the picture is already recognizable.]]

[[fig:math_svd_energy.png|Left: the singular values fall off very fast. Right: the cumulative share of the "energy".]]

## How much do we save?
An $m\times n$ image normally needs $mn$ numbers. At rank k it needs only $k(m+n+1)$:

| A $200\times300$ image | Numbers stored | Share |
|---|---|---|
| Original | 60,000 | 100% |
| k = 50 | $50\times501=25{,}050$ | 42% |
| k = 20 | $20\times501=10{,}020$ | 17% |
| k = 5 | $5\times501=2{,}505$ | 4% |

## Applications
| Application | How |
|---|---|
| PCA | SVD of the centred data; the columns of V are the principal components and $\sigma_i^2/(n-1)$ their variances |
| Recommender systems | Approximate the user × movie matrix at low rank to predict the missing ratings |
| Latent semantic analysis | SVD of the document × word matrix finds "topics" |
| Pseudo-inverse | $A^+=V\Sigma^+U^\top$; solves least squares even when $X^\top X$ is singular |
| LoRA in language models | Weight updates are stored as two small low-rank matrices |

[[c:0]]`],
  code: [`import numpy as np
import matplotlib.pyplot as plt

A = np.array([[3.0, 2.0, 2.0],
              [2.0, 3.0, -2.0]])
U, s, Vt = np.linalg.svd(A, full_matrices=False)
print("singular values:", s)                       # [5. 3.]
print("U ="); print(U.round(3))
print("rebuilt A ="); print(((U * s) @ Vt).round(6))
print("sqrt of eigenvalues of A A^T:", np.sqrt(np.linalg.eigvalsh(A @ A.T))[::-1])

# Rank-1 approximation: keep only the largest singular value
A1 = s[0] * np.outer(U[:, 0], Vt[0])
print("rank-1 approximation ="); print(A1.round(3))
print("error (Frobenius norm) =", round(np.linalg.norm(A - A1), 3), " = second singular value")

# Compress a synthetic 120 x 160 "image": smooth pattern + a bright square + a little noise
rng = np.random.default_rng(0)
yy, xx = np.mgrid[0:120, 0:160]
img = np.sin(xx / 14) * np.cos(yy / 18) + 0.05 * rng.normal(size=(120, 160))
img[40:80, 60:110] += 1.5
U, s, Vt = np.linalg.svd(img, full_matrices=False)

fig, axes = plt.subplots(1, 4, figsize=(11, 2.8))
for ax, k in zip(axes, [1, 3, 10, 120]):
    approx = (U[:, :k] * s[:k]) @ Vt[:k]
    err = np.linalg.norm(img - approx) / np.linalg.norm(img)
    ax.imshow(approx, cmap="gray"); ax.axis("off")
    ax.set_title(f"k = {k}, error {100 * err:.1f}%")
plt.tight_layout(); plt.show()
print("energy kept by the first 10:", round(np.sum(s[:10] ** 2) / np.sum(s ** 2), 4))`],
  ex: [E("ماتریس امتیاز 4 کاربر به 3 فیلم $\\begin{bmatrix}5&4&1\\\\4&5&1\\\\1&1&5\\\\2&1&4\\end{bmatrix}$ را با رتبه 2 تقریب بزن. خطای نسبی چقدر است؟", "Approximate the 4 users × 3 movies rating matrix $\\begin{bmatrix}5&4&1\\\\4&5&1\\\\1&1&5\\\\2&1&4\\end{bmatrix}$ at rank 2. What is the relative error?", `import numpy as np
R = np.array([[5, 4, 1], [4, 5, 1], [1, 1, 5], [2, 1, 4.0]])
U, s, Vt = np.linalg.svd(R, full_matrices=False)
print("singular values:", s.round(3))
R2 = (U[:, :2] * s[:2]) @ Vt[:2]
print(R2.round(2))
print("relative error:", round(np.linalg.norm(R - R2) / np.linalg.norm(R), 4))`, "دو مقدار تکین اول تقریباً همه اطلاعات را دارند (دو «سلیقه»: اکشن‌دوست و درام‌دوست) و خطای نسبی حدود 10٪ است.", "The first two singular values carry almost everything (two \"tastes\"), and the relative error is about 10%.")],
  quiz: [Q("SVD برای چه ماتریس‌هایی وجود دارد؟", "For which matrices does the SVD exist?", ["هر ماتریسی", "فقط مربعی", "فقط متقارن"], ["Any matrix", "Only square ones", "Only symmetric ones"], 0),
    Q("مقدارهای تکین A چه رابطه‌ای با $A^\\top A$ دارند؟", "How are the singular values of A related to $A^\\top A$?", ["جذر مقدارهای ویژه آن هستند", "برابر دترمینان آن‌اند", "ربطی ندارند"], ["They are the square roots of its eigenvalues", "They equal its determinant", "They are unrelated"], 0),
    Q("برای تقریب رتبه k کدام جمله‌ها را نگه می‌داریم؟", "For a rank-k approximation, which terms do we keep?", ["k مقدار تکین بزرگ‌تر", "k مقدار تکین کوچک‌تر", "k سطر اول ماتریس"], ["The k largest singular values", "The k smallest singular values", "The first k rows of the matrix"], 0)]
});
FinishCourse();
