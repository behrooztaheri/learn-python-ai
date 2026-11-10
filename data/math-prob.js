// Math track, part 3: probability, statistics and information theory.
M("math", "mprob", "احتمال، آمار و اطلاعات", "Probability, statistics and information");

L({ id: "math-prob",
  fa: ["احتمال، احتمال شرطی و قاعده بیز", R`## چرا احتمال؟
داده‌ها نویز دارند، برچسب‌ها گاهی غلط‌اند و آینده قطعی نیست. مدل خوب به جای «این ایمیل هرزنامه است» می‌گوید «**با احتمال 97٪** هرزنامه است». احتمال، زبانِ حرف زدن درباره عدم قطعیت است.

## مفاهیم پایه با یک تاس
| مفهوم | تعریف | مثال با تاس |
|---|---|---|
| فضای نمونه $\Omega$ | همه نتیجه‌های ممکن | $\{1,2,3,4,5,6\}$ |
| پیشامد | زیرمجموعه‌ای از فضای نمونه | A = «زوج» = $\{2,4,6\}$ |
| احتمال | عددی بین 0 و 1 | $P(A)=3/6=0.5$ |
| متمم | رخ ندادن A | $P(A^c)=1-0.5=0.5$ |

## قانون‌های احتمال
A = «زوج» = $\{2,4,6\}$ و B = «بزرگ‌تر از 4» = $\{5,6\}$:

| قانون | فرمول | محاسبه |
|---|---|---|
| متمم | $P(A^c)=1-P(A)$ | $1-\frac36=\frac12$ |
| اشتراک (و) | $P(A\cap B)$ | فقط $\{6\}$: $\frac16$ |
| اجتماع (یا) | $P(A\cup B)=P(A)+P(B)-P(A\cap B)$ | $\frac36+\frac26-\frac16=\frac46$ |
| شرطی | $P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}$ | $\dfrac{1/6}{2/6}=\frac12$ |
| ضرب | $P(A\cap B)=P(A\mid B)\,P(B)$ | $\frac12\times\frac26=\frac16$ |

## احتمال شرطی
$P(A\mid B)$ یعنی «احتمال A **وقتی می‌دانیم** B رخ داده است». دانستن B فضای نمونه را کوچک می‌کند: اگر بدانیم عدد بزرگ‌تر از 4 آمده، فقط $\{5,6\}$ ممکن است و از این دو، یکی زوج است.

## استقلال
دو پیشامد **مستقل**‌اند اگر دانستن یکی چیزی درباره دیگری نگوید:

$$P(A\cap B)=P(A)\,P(B)\quad\Longleftrightarrow\quad P(A\mid B)=P(A)$$

در مثال بالا $P(A)P(B)=\frac12\times\frac13=\frac16=P(A\cap B)$؛ پس «زوج بودن» و «بزرگ‌تر از 4 بودن» مستقل‌اند. دو پرتاب سکه هم مستقل‌اند: $P(\text{HH})=0.5\times0.5=0.25$.

## قاعده بیز
مهم‌ترین فرمول این درس. اغلب $P(\text{evidence}\mid\text{cause})$ را می‌دانیم ولی $P(\text{cause}\mid\text{evidence})$ را می‌خواهیم:

$$P(H\mid E)=\frac{P(E\mid H)\,P(H)}{P(E)}$$

| جزء | نام | معنی |
|---|---|---|
| $P(H)$ | پیشین (prior) | باور ما قبل از دیدن شاهد |
| $P(E\mid H)$ | درست‌نمایی (likelihood) | اگر فرضیه درست باشد، شاهد چقدر محتمل است |
| $P(E)$ | شاهد (evidence) | احتمال کلی دیدن شاهد |
| $P(H\mid E)$ | پسین (posterior) | باور به‌روزشده |

## مثال: آزمایش پزشکی
بیماری‌ای 1٪ مردم را دارد. آزمایش 90٪ بیماران را درست تشخیص می‌دهد (حساسیت) و برای 10٪ افراد سالم هم به‌اشتباه مثبت می‌شود. جواب آزمایش تو مثبت است. احتمال بیمار بودنت چقدر است؟

بیشتر مردم می‌گویند 90٪. بیا با 1000 نفر بشماریم:

[[fig:math_bayes_tree.png|از 108 نفری که آزمایششان مثبت است، فقط 9 نفر واقعاً بیمارند.]]

| گام | محاسبه | مقدار |
|---|---|---|
| $P(+\mid D)P(D)$ | $0.9\times0.01$ | 0.009 |
| $P(+\mid\text{healthy})P(\text{healthy})$ | $0.1\times0.99$ | 0.099 |
| $P(+)$ | $0.009+0.099$ | 0.108 |
| $P(D\mid+)$ | $0.009/0.108$ | 0.083 |

فقط **8.3٪**! چون بیماری کمیاب است، مثبت‌های کاذب از مثبت‌های واقعی خیلی بیشترند. این خطای رایج را «نادیده گرفتن نرخ پایه» می‌گویند.

[[lab:m_bayes]]

!در آزمایشگاه شیوع را از 1٪ به 20٪ ببر: همان آزمایش حالا خیلی قابل‌اعتمادتر است. در یادگیری ماشین هم همین است: وقتی کلاس مثبت کمیاب است، precision پایین می‌آید حتی اگر مدل «دقیق» باشد.

## بیز در یادگیری ماشین
| جا | چطور |
|---|---|
| بیز ساده | $P(\text{class}\mid\text{features})\propto P(\text{class})\prod_i P(x_i\mid\text{class})$ |
| فیلتر هرزنامه | احتمال هرزنامه با دیدن هر واژه به‌روز می‌شود |
| منظم‌سازی | prior روی وزن‌ها = جریمه L2 یا L1 |
| مدل‌های مولد | $P(x\mid z)P(z)$ |

مثال هرزنامه: 40٪ ایمیل‌ها هرزنامه‌اند. واژه «رایگان» در 50٪ هرزنامه‌ها و 5٪ ایمیل‌های سالم هست. اگر ایمیلی «رایگان» داشته باشد:

$$P(\text{spam}\mid\text{free})=\frac{0.5\times0.4}{0.5\times0.4+0.05\times0.6}=\frac{0.20}{0.23}\approx0.87$$

[[c:0]]`],
  en: ["Probability, conditional probability and Bayes' rule", R`## Why probability?
Data is noisy, labels are sometimes wrong and the future is not certain. A good model does not say "this email is spam"; it says "this is spam **with probability 97%**". Probability is the language for talking about uncertainty.

## The basics with one die
| Concept | Definition | Example with a die |
|---|---|---|
| Sample space $\Omega$ | All possible outcomes | $\{1,2,3,4,5,6\}$ |
| Event | A subset of the sample space | A = "even" = $\{2,4,6\}$ |
| Probability | A number between 0 and 1 | $P(A)=3/6=0.5$ |
| Complement | A does not happen | $P(A^c)=1-0.5=0.5$ |

## The rules of probability
A = "even" = $\{2,4,6\}$ and B = "greater than 4" = $\{5,6\}$:

| Rule | Formula | Calculation |
|---|---|---|
| Complement | $P(A^c)=1-P(A)$ | $1-\frac36=\frac12$ |
| Intersection (and) | $P(A\cap B)$ | Only $\{6\}$: $\frac16$ |
| Union (or) | $P(A\cup B)=P(A)+P(B)-P(A\cap B)$ | $\frac36+\frac26-\frac16=\frac46$ |
| Conditional | $P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}$ | $\dfrac{1/6}{2/6}=\frac12$ |
| Product | $P(A\cap B)=P(A\mid B)\,P(B)$ | $\frac12\times\frac26=\frac16$ |

## Conditional probability
$P(A\mid B)$ is "the probability of A **when we know** B happened". Knowing B shrinks the sample space: if we know the roll was greater than 4, only $\{5,6\}$ is possible, and one of those two is even.

## Independence
Two events are **independent** if knowing one says nothing about the other:

$$P(A\cap B)=P(A)\,P(B)\quad\Longleftrightarrow\quad P(A\mid B)=P(A)$$

In the example above $P(A)P(B)=\frac12\times\frac13=\frac16=P(A\cap B)$, so "even" and "greater than 4" are independent. Two coin flips are independent too: $P(\text{HH})=0.5\times0.5=0.25$.

## Bayes' rule
The most important formula of this lesson. We often know $P(\text{evidence}\mid\text{cause})$ but want $P(\text{cause}\mid\text{evidence})$:

$$P(H\mid E)=\frac{P(E\mid H)\,P(H)}{P(E)}$$

| Part | Name | Meaning |
|---|---|---|
| $P(H)$ | Prior | What we believe before seeing the evidence |
| $P(E\mid H)$ | Likelihood | How likely the evidence is if the hypothesis is true |
| $P(E)$ | Evidence | The overall chance of seeing the evidence |
| $P(H\mid E)$ | Posterior | The updated belief |

## Example: a medical test
A disease affects 1% of people. A test detects 90% of sick people (sensitivity) and also wrongly comes out positive for 10% of healthy people. Your test is positive. How likely is it that you are sick?

Most people say 90%. Let us count with 1000 people:

[[fig:math_bayes_tree.png|Of the 108 people who test positive, only 9 are really sick.]]

| Step | Calculation | Value |
|---|---|---|
| $P(+\mid D)P(D)$ | $0.9\times0.01$ | 0.009 |
| $P(+\mid\text{healthy})P(\text{healthy})$ | $0.1\times0.99$ | 0.099 |
| $P(+)$ | $0.009+0.099$ | 0.108 |
| $P(D\mid+)$ | $0.009/0.108$ | 0.083 |

Only **8.3%**! Because the disease is rare, false positives far outnumber true positives. This common mistake is called "base-rate neglect".

[[lab:m_bayes]]

!In the lab raise the prevalence from 1% to 20%: the same test is now far more trustworthy. Machine learning behaves the same way: when the positive class is rare, precision drops even for an "accurate" model.

## Bayes in machine learning
| Where | How |
|---|---|
| Naive Bayes | $P(\text{class}\mid\text{features})\propto P(\text{class})\prod_i P(x_i\mid\text{class})$ |
| Spam filters | The spam probability is updated with every word seen |
| Regularization | A prior on the weights = an L2 or L1 penalty |
| Generative models | $P(x\mid z)P(z)$ |

Spam example: 40% of emails are spam. The word "free" appears in 50% of spam and 5% of normal emails. If an email contains "free":

$$P(\text{spam}\mid\text{free})=\frac{0.5\times0.4}{0.5\times0.4+0.05\times0.6}=\frac{0.20}{0.23}\approx0.87$$

[[c:0]]`],
  code: [`import numpy as np

rng = np.random.default_rng(0)

# Rules of probability, checked by rolling a die one million times
rolls = rng.integers(1, 7, 1_000_000)
A = rolls % 2 == 0          # even
B = rolls > 4               # greater than 4
print("P(A)        =", A.mean().round(3), "  (exact 0.5)")
print("P(A and B)  =", (A & B).mean().round(3), "  (exact 0.167)")
print("P(A or B)   =", (A | B).mean().round(3), "  (exact 0.667)")
print("P(A | B)    =", A[B].mean().round(3), "  (exact 0.5)")

def bayes(prior, sensitivity, false_positive):
    evidence = sensitivity * prior + false_positive * (1 - prior)
    return sensitivity * prior / evidence

print("P(sick | +) with 1% prevalence :", round(bayes(0.01, 0.9, 0.1), 4))
print("P(sick | +) with 20% prevalence:", round(bayes(0.20, 0.9, 0.1), 4))
print("P(spam | 'free')               :", round(bayes(0.4, 0.5, 0.05), 4))

# Simulation of the medical test with 1,000,000 people
sick = rng.random(1_000_000) < 0.01
positive = np.where(sick, rng.random(1_000_000) < 0.9, rng.random(1_000_000) < 0.1)
print("simulated P(sick | +):", sick[positive].mean().round(4))

# A second positive test: yesterday's posterior becomes today's prior
p = 0.01
for test in range(1, 4):
    p = bayes(p, 0.9, 0.1)
    print(f"after {test} positive test(s): {p:.3f}")`],
  ex: [E("در یک کارخانه ماشین A 60٪ و ماشین B 40٪ قطعات را می‌سازد. 2٪ قطعات A و 5٪ قطعات B خراب‌اند. اگر قطعه‌ای خراب باشد، با چه احتمالی از B آمده است؟", "In a factory machine A makes 60% of the parts and machine B 40%. 2% of A's parts and 5% of B's are defective. If a part is defective, what is the probability it came from B?", `pB, pA = 0.4, 0.6
p_def = 0.05 * pB + 0.02 * pA
print(p_def, 0.05 * pB / p_def)   # 0.032  0.625`, "$P(\\text{def})=0.05\\times0.4+0.02\\times0.6=0.032$ و $P(B\\mid\\text{def})=0.02/0.032=0.625$.", "$P(\\text{def})=0.05\\times0.4+0.02\\times0.6=0.032$ and $P(B\\mid\\text{def})=0.02/0.032=0.625$."),
    E("در آزمایشگاه حساسیت را 99٪ و ویژگی را 99٪ بگذار و شیوع را 0.5٪. آیا آزمایش مثبت یعنی بیمار؟", "In the lab set sensitivity and specificity to 99% and prevalence to 0.5%. Does a positive test mean you are sick?", null, "نه کاملاً: از هر 1000 نفر حدود 5 مثبت واقعی و 10 مثبت کاذب داریم؛ پس احتمال بیماری فقط حدود 33٪ است.", "Not quite: out of 1000 people there are about 5 true positives and 10 false positives, so the chance of being sick is only about 33%.")],
  quiz: [Q("اگر A و B مستقل باشند و $P(A)=0.5$، $P(B)=0.4$، آنگاه $P(A\\cap B)$ چند است؟", "If A and B are independent with $P(A)=0.5$ and $P(B)=0.4$, what is $P(A\\cap B)$?", ["0.2", "0.9", "0.1"], ["0.2", "0.9", "0.1"], 0),
    Q("در قاعده بیز، $P(H)$ چه نام دارد؟", "In Bayes' rule, what is $P(H)$ called?", ["پیشین", "پسین", "درست‌نمایی"], ["The prior", "The posterior", "The likelihood"], 0),
    Q("چرا در بیماری کمیاب، آزمایش مثبت قابل‌اعتماد نیست؟", "Why is a positive test unreliable for a rare disease?", ["مثبت‌های کاذب از مثبت‌های واقعی بیشترند", "آزمایش همیشه غلط است", "حساسیت پایین است"], ["False positives outnumber true positives", "The test is always wrong", "The sensitivity is low"], 0)]
});

L({ id: "math-rv",
  fa: ["متغیر تصادفی، امید ریاضی، واریانس و توزیع‌ها", R`## متغیر تصادفی
متغیر تصادفی عددی است که مقدارش به شانس بستگی دارد: عدد تاس، قد یک نفر تصادفی، خطای مدل روی یک نمونه.

| نوع | مقدارها | تابع | مثال |
|---|---|---|---|
| گسسته | قابل شمارش | تابع جرم احتمال $P(X=k)$ | تاس، تعداد کلیک |
| پیوسته | هر عدد در یک بازه | تابع چگالی $p(x)$؛ احتمال = مساحت | قد، دما، خطا |

## امید ریاضی و واریانس
**امید ریاضی** میانگین بلندمدت است و **واریانس** میزان پراکندگی حول آن:

$$E[X]=\sum_k k\,P(X=k)\qquad \mathrm{Var}(X)=E[(X-\mu)^2]=E[X^2]-\mu^2$$

مثال با تاس سالم (هر وجه با احتمال $\frac16$):

| کمیت | محاسبه | مقدار |
|---|---|---|
| $E[X]$ | $(1+2+3+4+5+6)/6$ | 3.5 |
| $E[X^2]$ | $(1+4+9+16+25+36)/6$ | 15.167 |
| $\mathrm{Var}(X)$ | $15.167-3.5^2$ | 2.917 |
| انحراف معیار $\sigma$ | $\sqrt{2.917}$ | 1.708 |

## قانون‌های کاربردی
| قانون | فرمول | مثال |
|---|---|---|
| خطی بودن امید | $E[aX+b]=aE[X]+b$ | $E[2X+1]=8$ برای تاس |
| واریانس و ضریب | $\mathrm{Var}(aX+b)=a^2\,\mathrm{Var}(X)$ | $\mathrm{Var}(2X+1)=4\times2.917$ |
| جمع امیدها | $E[X+Y]=E[X]+E[Y]$ | همیشه درست است |
| جمع واریانس‌ها | $\mathrm{Var}(X+Y)=\mathrm{Var}(X)+\mathrm{Var}(Y)$ | فقط اگر X و Y مستقل باشند |

## توزیع‌های مهم
[[fig:math_dists.png|چهار توزیعی که در یادگیری ماشین بیشترین کاربرد را دارند.]]

| توزیع | چه چیزی را مدل می‌کند | پارامتر | میانگین | واریانس |
|---|---|---|---|---|
| برنولی | یک آزمایش بله/نه | $p$ | $p$ | $p(1-p)$ |
| دوجمله‌ای | تعداد موفقیت در n آزمایش | $n,p$ | $np$ | $np(1-p)$ |
| دسته‌ای | یکی از K کلاس | $p_1,\dots,p_K$ | | |
| یکنواخت | همه مقادیر $[a,b]$ هم‌شانس | $a,b$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ |
| نرمال | جمع اثرهای کوچک زیاد | $\mu,\sigma$ | $\mu$ | $\sigma^2$ |
| نمایی | زمان انتظار | $\lambda$ | $1/\lambda$ | $1/\lambda^2$ |

## دوجمله‌ای: مثال عددی
احتمال دقیقاً 7 شیر در 10 پرتاب سکه سالم:

$$P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}=\binom{10}{7}0.5^{10}=\frac{120}{1024}\approx0.117$$

## توزیع نرمال
$$p(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$$

$\mu$ مرکز زنگوله و $\sigma$ پهنای آن است.

[[lab:m_normal]]

[[fig:math_normal_rule.png|قاعده 68–95–99.7: سهم داده‌ها در فاصله یک، دو و سه انحراف معیار از میانگین.]]

## نمره z
برای مقایسه با هر توزیع نرمال، مقدار را **استاندارد** می‌کنیم: $z=\dfrac{x-\mu}{\sigma}$ یعنی «چند انحراف معیار از میانگین فاصله دارد».

مثال: قد افراد $N(170, 10^2)$ است.

| پرسش | z | احتمال |
|---|---|---|
| $P(X<185)$ | $(185-170)/10=1.5$ | $\Phi(1.5)=0.933$ |
| $P(160<X<180)$ | از −1 تا 1 | 0.683 |
| $P(X>190)$ | 2 | $1-0.977=0.023$ |

!StandardScaler در scikit-learn دقیقاً همین نمره z را برای هر ویژگی حساب می‌کند.

## چرا نرمال همه جا هست؟
- **قضیه حد مرکزی:** جمع تعداد زیادی اثر مستقل کوچک، تقریباً نرمال است (درس بعد).
- وزن‌های شبکه عصبی معمولاً با نرمال مقداردهی می‌شوند.
- اگر نویز داده را نرمال فرض کنیم، بهترین تابع خطا **MSE** می‌شود (درس درست‌نمایی).

[[c:0]]`],
  en: ["Random variables, expectation, variance and distributions", R`## Random variables
A random variable is a number whose value depends on chance: the roll of a die, the height of a random person, the error of a model on one sample.

| Kind | Values | Described by | Example |
|---|---|---|---|
| Discrete | Countable | Probability mass function $P(X=k)$ | A die, number of clicks |
| Continuous | Any number in an interval | Density $p(x)$; probability = area | Height, temperature, error |

## Expectation and variance
The **expectation** is the long-run average, and the **variance** measures the spread around it:

$$E[X]=\sum_k k\,P(X=k)\qquad \mathrm{Var}(X)=E[(X-\mu)^2]=E[X^2]-\mu^2$$

Example with a fair die (each face with probability $\frac16$):

| Quantity | Calculation | Value |
|---|---|---|
| $E[X]$ | $(1+2+3+4+5+6)/6$ | 3.5 |
| $E[X^2]$ | $(1+4+9+16+25+36)/6$ | 15.167 |
| $\mathrm{Var}(X)$ | $15.167-3.5^2$ | 2.917 |
| Standard deviation $\sigma$ | $\sqrt{2.917}$ | 1.708 |

## Useful rules
| Rule | Formula | Example |
|---|---|---|
| Linearity of expectation | $E[aX+b]=aE[X]+b$ | $E[2X+1]=8$ for a die |
| Variance and scaling | $\mathrm{Var}(aX+b)=a^2\,\mathrm{Var}(X)$ | $\mathrm{Var}(2X+1)=4\times2.917$ |
| Sum of expectations | $E[X+Y]=E[X]+E[Y]$ | Always true |
| Sum of variances | $\mathrm{Var}(X+Y)=\mathrm{Var}(X)+\mathrm{Var}(Y)$ | Only if X and Y are independent |

## The important distributions
[[fig:math_dists.png|The four distributions used most in machine learning.]]

| Distribution | What it models | Parameters | Mean | Variance |
|---|---|---|---|---|
| Bernoulli | One yes/no trial | $p$ | $p$ | $p(1-p)$ |
| Binomial | Successes in n trials | $n,p$ | $np$ | $np(1-p)$ |
| Categorical | One of K classes | $p_1,\dots,p_K$ | | |
| Uniform | All values in $[a,b]$ equally likely | $a,b$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ |
| Normal | The sum of many small effects | $\mu,\sigma$ | $\mu$ | $\sigma^2$ |
| Exponential | Waiting times | $\lambda$ | $1/\lambda$ | $1/\lambda^2$ |

## Binomial: a numeric example
The probability of exactly 7 heads in 10 flips of a fair coin:

$$P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}=\binom{10}{7}0.5^{10}=\frac{120}{1024}\approx0.117$$

## The normal distribution
$$p(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$$

$\mu$ is the centre of the bell and $\sigma$ is its width.

[[lab:m_normal]]

[[fig:math_normal_rule.png|The 68–95–99.7 rule: the share of data within one, two and three standard deviations of the mean.]]

## The z-score
To compare against any normal distribution we **standardize** the value: $z=\dfrac{x-\mu}{\sigma}$, "how many standard deviations away from the mean".

Example: heights follow $N(170, 10^2)$.

| Question | z | Probability |
|---|---|---|
| $P(X<185)$ | $(185-170)/10=1.5$ | $\Phi(1.5)=0.933$ |
| $P(160<X<180)$ | from −1 to 1 | 0.683 |
| $P(X>190)$ | 2 | $1-0.977=0.023$ |

!StandardScaler in scikit-learn computes exactly this z-score for every feature.

## Why is the normal distribution everywhere?
- **Central limit theorem:** the sum of many small independent effects is approximately normal (next lesson).
- Neural-network weights are usually initialized from a normal distribution.
- If we assume normal noise in the data, the best loss function turns out to be **MSE** (the likelihood lesson).

[[c:0]]`],
  code: [`import numpy as np
from scipy import stats

# Expectation and variance of a fair die, from the definition
k = np.arange(1, 7); p = np.full(6, 1 / 6)
mean = np.sum(k * p); var = np.sum(k ** 2 * p) - mean ** 2
print(f"die: E = {mean:.3f}  Var = {var:.3f}  std = {np.sqrt(var):.3f}")

rng = np.random.default_rng(0)
rolls = rng.integers(1, 7, 100_000)
print(f"100,000 rolls: mean = {rolls.mean():.3f}  var = {rolls.var():.3f}")
print("E[2X + 1] =", (2 * rolls + 1).mean().round(3), "  Var(2X + 1) =", (2 * rolls + 1).var().round(3))

# Binomial: exactly 7 heads in 10 flips
print("P(7 heads in 10) =", round(stats.binom.pmf(7, 10, 0.5), 4))
print("mean and variance of Binomial(10, 0.5):", stats.binom.stats(10, 0.5))

# Normal distribution: heights ~ N(170, 10^2)
h = stats.norm(170, 10)
print("P(X < 185)       =", round(h.cdf(185), 4))
print("P(160 < X < 180) =", round(h.cdf(180) - h.cdf(160), 4))
print("P(X > 190)       =", round(1 - h.cdf(190), 4))
print("95th percentile  =", round(h.ppf(0.95), 2), "cm")

# z-scores are what StandardScaler computes
x = np.array([150.0, 165, 170, 182, 195])
print("z-scores:", ((x - x.mean()) / x.std()).round(2))`],
  ex: [E("نمره‌های یک آزمون $N(60, 15^2)$ است. چه درصدی بالای 90 می‌گیرند؟ نمره صدک 90 چند است؟", "Exam scores follow $N(60, 15^2)$. What share scores above 90? What is the 90th percentile?", `from scipy import stats
s = stats.norm(60, 15)
print(1 - s.cdf(90))    # 0.0228
print(s.ppf(0.90))      # 79.2`, "$z=(90-60)/15=2$ پس حدود 2.3٪. صدک 90 برابر $60+1.2816\\times15\\approx79.2$ است.", "$z=(90-60)/15=2$, so about 2.3%. The 90th percentile is $60+1.2816\\times15\\approx79.2$."),
    E("یک سکه ناسالم با $p=0.3$ را 20 بار می‌اندازیم. میانگین و انحراف معیار تعداد شیرها چقدر است؟", "A biased coin with $p=0.3$ is flipped 20 times. What are the mean and standard deviation of the number of heads?", `import numpy as np
n, p = 20, 0.3
print(n * p, np.sqrt(n * p * (1 - p)))   # 6.0  2.049`, "$np=6$ و $\\sqrt{np(1-p)}=\\sqrt{4.2}\\approx2.05$.", "$np=6$ and $\\sqrt{np(1-p)}=\\sqrt{4.2}\\approx2.05$.")],
  quiz: [Q("امید ریاضی یک تاس سالم چند است؟", "What is the expected value of a fair die?", ["3.5", "3", "6"], ["3.5", "3", "6"], 0),
    Q("اگر $\\mathrm{Var}(X)=4$ باشد، $\\mathrm{Var}(3X)$ چند است؟", "If $\\mathrm{Var}(X)=4$, what is $\\mathrm{Var}(3X)$?", ["36", "12", "4"], ["36", "12", "4"], 0, "$3^2\\times4=36$", "$3^2\\times4=36$"),
    Q("حدود چند درصد داده نرمال در فاصله $\\mu\\pm2\\sigma$ است؟", "About what share of normal data lies within $\\mu\\pm2\\sigma$?", ["95٪", "68٪", "99.7٪"], ["95%", "68%", "99.7%"], 0)]
});

L({ id: "math-stats",
  fa: ["آمار توصیفی، کوواریانس، همبستگی و حد مرکزی", R`## از احتمال به آمار
احتمال می‌گوید «اگر توزیع را بدانیم، داده چه شکلی خواهد بود». آمار برعکس است: «داده را داریم؛ درباره توزیع چه می‌توان گفت؟». یادگیری ماشین هم همین است.

## خلاصه کردن یک ستون داده
داده: 2، 4، 4، 4، 5، 5، 7، 9

| آماره | محاسبه | مقدار |
|---|---|---|
| میانگین $\bar{x}$ | $40/8$ | 5 |
| میانه | وسط 4 و 5 | 4.5 |
| مد | پرتکرارترین | 4 |
| جمع مربع انحراف‌ها | $9+1+1+1+0+0+4+16$ | 32 |
| واریانس جامعه | $32/8$ | 4 |
| انحراف معیار جامعه | $\sqrt4$ | 2 |
| واریانس نمونه $s^2$ | $32/7$ | 4.571 |
| انحراف معیار نمونه $s$ | $\sqrt{4.571}$ | 2.138 |

!چرا تقسیم بر $n-1$؟ چون میانگین را از همان داده حساب کرده‌ایم و یک «درجه آزادی» مصرف شده است. در NumPy پیش‌فرض ~np.var~ تقسیم بر n است؛ برای نمونه ~ddof=1~ بده. پانداس پیش‌فرض $n-1$ دارد.

| میانگین | میانه |
|---|---|
| همه داده‌ها را به کار می‌گیرد | فقط به ترتیب حساس است |
| به داده پرت حساس | مقاوم به داده پرت |
| برای توزیع متقارن | برای درآمد، قیمت خانه و هر توزیع چوله |

## کوواریانس: دو متغیر با هم چطور تغییر می‌کنند؟
$$\mathrm{cov}(x,y)=\frac{1}{n-1}\sum_i(x_i-\bar{x})(y_i-\bar{y})$$

مثال: $x=(1,2,3,4,5)$ و $y=(2,4,5,4,5)$ با $\bar{x}=3$ و $\bar{y}=4$:

| $x_i-\bar{x}$ | $y_i-\bar{y}$ | حاصل‌ضرب |
|---|---|---|
| −2 | −2 | 4 |
| −1 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 2 | 1 | 2 |

جمع = 6، پس $\mathrm{cov}=6/4=1.5$. مثبت یعنی با زیاد شدن x، y هم معمولاً زیاد می‌شود.

## همبستگی: کوواریانس بدون واحد
مقدار کوواریانس به واحد اندازه‌گیری بستگی دارد. با تقسیم بر انحراف معیارها عددی بین −1 و 1 می‌گیریم:

$$r=\frac{\mathrm{cov}(x,y)}{s_x\,s_y}=\frac{1.5}{1.581\times1.225}=0.775$$

[[lab:m_corr]]

[[fig:math_corr.png|ضریب همبستگی از −1 (خط نزولی کامل) تا 1 (خط صعودی کامل).]]

| r | معنی |
|---|---|
| نزدیک 1 | رابطه خطی مثبت قوی |
| نزدیک 0 | رابطه **خطی** ندارد (شاید رابطه غیرخطی داشته باشد!) |
| نزدیک −1 | رابطه خطی منفی قوی |

## دو هشدار مهم
[[fig:math_anscombe.png|سه مجموعه داده با همبستگی تقریباً یکسان و شکل‌های کاملاً متفاوت.]]

- **همیشه داده را رسم کن.** عدد r نه منحنی بودن را نشان می‌دهد و نه داده پرت را.
- **همبستگی علیت نیست.** فروش بستنی و غرق‌شدگی همبسته‌اند، چون هر دو به گرما وابسته‌اند.

## ماتریس کوواریانس
برای d ویژگی، همه کوواریانس‌ها در یک ماتریس $d\times d$ متقارن جمع می‌شوند. قطر آن واریانس‌هاست:

$$\Sigma=\frac{1}{n-1}X_c^\top X_c=\begin{bmatrix}2.5&1.5\\1.5&1.5\end{bmatrix}$$

که $X_c$ داده مرکزی‌شده است. بردارهای ویژه همین ماتریس، مؤلفه‌های اصلی PCA هستند.

## قضیه حد مرکزی
میانگینِ n نمونه مستقل از **هر** توزیعی (با واریانس محدود)، وقتی n بزرگ شود، تقریباً نرمال است:

$$\bar{X}\approx N\!\left(\mu,\ \frac{\sigma^2}{n}\right)$$

[[lab:m_clt]]

انحراف معیار میانگین را **خطای استاندارد** می‌گویند: $SE=\sigma/\sqrt{n}$.

| n | خطای استاندارد وقتی $\sigma=10$ |
|---|---|
| 4 | 5 |
| 25 | 2 |
| 100 | 1 |
| 10000 | 0.1 |

برای نصف کردن خطا، داده را باید **چهار برابر** کرد. به همین دلیل دقت مدل روی مجموعه آزمون کوچک قابل‌اعتماد نیست: با 100 نمونه آزمون و دقت 90٪، خطای استاندارد $\sqrt{0.9\times0.1/100}=0.03$ است؛ یعنی دقت واقعی می‌تواند بین 84٪ و 96٪ باشد.

[[c:0]]`],
  en: ["Descriptive statistics, covariance, correlation and the central limit theorem", R`## From probability to statistics
Probability says "if we know the distribution, what will the data look like". Statistics goes the other way: "we have the data; what can we say about the distribution?" Machine learning is the same task.

## Summarizing one column of data
Data: 2, 4, 4, 4, 5, 5, 7, 9

| Statistic | Calculation | Value |
|---|---|---|
| Mean $\bar{x}$ | $40/8$ | 5 |
| Median | Between 4 and 5 | 4.5 |
| Mode | Most frequent | 4 |
| Sum of squared deviations | $9+1+1+1+0+0+4+16$ | 32 |
| Population variance | $32/8$ | 4 |
| Population standard deviation | $\sqrt4$ | 2 |
| Sample variance $s^2$ | $32/7$ | 4.571 |
| Sample standard deviation $s$ | $\sqrt{4.571}$ | 2.138 |

!Why divide by $n-1$? Because the mean was computed from the same data, which uses up one "degree of freedom". In NumPy ~np.var~ divides by n by default; pass ~ddof=1~ for a sample. Pandas uses $n-1$ by default.

| Mean | Median |
|---|---|
| Uses every value | Depends only on the order |
| Sensitive to outliers | Robust to outliers |
| For symmetric distributions | For income, house prices and any skewed distribution |

## Covariance: how do two variables move together?
$$\mathrm{cov}(x,y)=\frac{1}{n-1}\sum_i(x_i-\bar{x})(y_i-\bar{y})$$

Example: $x=(1,2,3,4,5)$ and $y=(2,4,5,4,5)$ with $\bar{x}=3$ and $\bar{y}=4$:

| $x_i-\bar{x}$ | $y_i-\bar{y}$ | Product |
|---|---|---|
| −2 | −2 | 4 |
| −1 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 2 | 1 | 2 |

The sum is 6, so $\mathrm{cov}=6/4=1.5$. Positive means that when x goes up, y usually goes up too.

## Correlation: covariance without units
The size of a covariance depends on the units. Dividing by the standard deviations gives a number between −1 and 1:

$$r=\frac{\mathrm{cov}(x,y)}{s_x\,s_y}=\frac{1.5}{1.581\times1.225}=0.775$$

[[lab:m_corr]]

[[fig:math_corr.png|The correlation coefficient from −1 (a perfect falling line) to 1 (a perfect rising line).]]

| r | Meaning |
|---|---|
| Near 1 | Strong positive linear relation |
| Near 0 | No **linear** relation (there may be a non-linear one!) |
| Near −1 | Strong negative linear relation |

## Two important warnings
[[fig:math_anscombe.png|Three datasets with almost the same correlation and completely different shapes.]]

- **Always plot the data.** The number r shows neither curvature nor outliers.
- **Correlation is not causation.** Ice-cream sales and drownings are correlated because both depend on hot weather.

## The covariance matrix
For d features, all the covariances fit in a symmetric $d\times d$ matrix. Its diagonal holds the variances:

$$\Sigma=\frac{1}{n-1}X_c^\top X_c=\begin{bmatrix}2.5&1.5\\1.5&1.5\end{bmatrix}$$

where $X_c$ is the centred data. The eigenvectors of this matrix are the principal components of PCA.

## The central limit theorem
The mean of n independent samples from **any** distribution (with finite variance) is approximately normal when n is large:

$$\bar{X}\approx N\!\left(\mu,\ \frac{\sigma^2}{n}\right)$$

[[lab:m_clt]]

The standard deviation of the mean is called the **standard error**: $SE=\sigma/\sqrt{n}$.

| n | Standard error when $\sigma=10$ |
|---|---|
| 4 | 5 |
| 25 | 2 |
| 100 | 1 |
| 10000 | 0.1 |

To halve the error you need **four times** the data. This is why accuracy on a small test set is unreliable: with 100 test samples and 90% accuracy the standard error is $\sqrt{0.9\times0.1/100}=0.03$, so the true accuracy could be anywhere between 84% and 96%.

[[c:0]]`],
  code: [`import numpy as np

d = np.array([2, 4, 4, 4, 5, 5, 7, 9])
print("mean:", d.mean(), " median:", np.median(d))
print("population variance:", d.var(), "  std:", d.std())
print("sample variance    :", round(d.var(ddof=1), 3), "  std:", round(d.std(ddof=1), 3))

# An outlier moves the mean but hardly moves the median
salaries = np.array([30, 32, 35, 36, 40, 41, 45, 900])
print("salaries: mean =", salaries.mean(), "  median =", np.median(salaries))

x = np.array([1.0, 2, 3, 4, 5]); y = np.array([2.0, 4, 5, 4, 5])
cov = np.sum((x - x.mean()) * (y - y.mean())) / (len(x) - 1)
r = cov / (x.std(ddof=1) * y.std(ddof=1))
print("cov =", cov, "  r =", round(r, 4))
print("covariance matrix:"); print(np.cov(x, y))
print("correlation matrix:"); print(np.corrcoef(x, y).round(4))

# Correlation only measures LINEAR relations
t = np.linspace(-3, 3, 101)
print("r between t and t^2:", round(np.corrcoef(t, t ** 2)[0, 1], 4))

# Central limit theorem with a very skewed distribution (exponential: mean 1, std 1)
rng = np.random.default_rng(0)
for n in [1, 4, 25, 100]:
    means = rng.exponential(1.0, size=(20_000, n)).mean(axis=1)
    print(f"n = {n:3d}: std of the means = {means.std():.3f}   sigma / sqrt(n) = {1 / np.sqrt(n):.3f}")

# Standard error of an accuracy measured on a test set
for n_test in [100, 1000, 10_000]:
    se = np.sqrt(0.9 * 0.1 / n_test)
    print(f"test size {n_test:6d}: accuracy 0.90 +/- {2 * se:.3f}")`],
  ex: [E("برای $x=(2,4,6,8)$ و $y=(1,3,2,5)$ کوواریانس نمونه و ضریب همبستگی را با دست حساب کن.", "For $x=(2,4,6,8)$ and $y=(1,3,2,5)$ compute the sample covariance and the correlation coefficient by hand.", `import numpy as np
x = np.array([2.0, 4, 6, 8]); y = np.array([1.0, 3, 2, 5])
print(np.cov(x, y)[0, 1], np.corrcoef(x, y)[0, 1])   # 3.667  0.832`, "$\\bar{x}=5,\\ \\bar{y}=2.75$. جمع حاصل‌ضرب‌ها $=11$ پس $\\mathrm{cov}=11/3=3.667$ و $r\\approx0.832$.", "$\\bar{x}=5,\\ \\bar{y}=2.75$. The products sum to 11, so $\\mathrm{cov}=11/3=3.667$ and $r\\approx0.832$."),
    E("در آزمایشگاه همبستگی، ρ را 0.9 بگذار و یک نقطه دور در گوشه پایین-راست اضافه کن. r چه می‌شود؟", "In the correlation lab set ρ to 0.9, then add one far point in the bottom-right corner. What happens to r?", null, "r به‌شدت کم می‌شود. فقط یک داده پرت می‌تواند همبستگی را خراب کند؛ پس همیشه داده را رسم کن.", "r drops sharply. A single outlier can ruin a correlation, so always plot the data.")],
  quiz: [Q("کدام آماره به داده پرت مقاوم‌تر است؟", "Which statistic is more robust to outliers?", ["میانه", "میانگین", "واریانس"], ["The median", "The mean", "The variance"], 0),
    Q("اگر $r=0$ باشد چه می‌توان گفت؟", "If $r=0$, what can we say?", ["رابطه خطی وجود ندارد", "هیچ رابطه‌ای وجود ندارد", "دو متغیر مستقل‌اند"], ["There is no linear relation", "There is no relation at all", "The variables are independent"], 0),
    Q("برای نصف کردن خطای استاندارد، اندازه نمونه باید چند برابر شود؟", "To halve the standard error, the sample size must be multiplied by...", ["4", "2", "10"], ["4", "2", "10"], 0)]
});

L({ id: "math-mle",
  fa: ["درست‌نمایی بیشینه: تابع‌های خطا از کجا می‌آیند؟", R`## پرسش اصلی
چرا در رگرسیون **مربع** خطا را کمینه می‌کنیم و نه قدر مطلق یا توان چهارم؟ چرا در طبقه‌بندی از **آنتروپی متقاطع** استفاده می‌کنیم؟ جواب هر دو یکی است: **برآورد درست‌نمایی بیشینه**.

## درست‌نمایی
فرض کن مدلی با پارامتر $\theta$ داریم. **درست‌نمایی** می‌گوید «اگر $\theta$ این مقدار بود، دیدن همین داده‌ها چقدر محتمل بود؟»:

$$L(\theta)=P(\text{data}\mid\theta)=\prod_{i=1}^{n}P(x_i\mid\theta)$$

بهترین پارامتر آن است که داده‌های دیده‌شده را **محتمل‌ترین** کند: $\hat\theta=\arg\max_\theta L(\theta)$.

## مثال: سکه
سکه‌ای را 10 بار انداخته‌ایم و 7 شیر آمده است. $\theta$ (احتمال شیر) چقدر است؟

$$L(\theta)=\theta^7(1-\theta)^3$$

| $\theta$ | $L(\theta)$ | $\ln L(\theta)$ |
|---|---|---|
| 0.3 | 0.000075 | −9.50 |
| 0.5 | 0.000977 | −6.93 |
| 0.7 | 0.002224 | −6.11 |
| 0.9 | 0.000478 | −7.65 |

[[lab:m_mle]]

## حل با مشتق
لگاریتم می‌گیریم (ضرب به جمع تبدیل می‌شود و جای بیشینه عوض نمی‌شود):

$$\ln L=7\ln\theta+3\ln(1-\theta)\ \Rightarrow\ \frac{d\ln L}{d\theta}=\frac7\theta-\frac{3}{1-\theta}=0\ \Rightarrow\ \hat\theta=\frac{7}{10}$$

در حالت کلی $\hat\theta=k/n$: همان نسبت ساده‌ای که شهود می‌گوید.

## مثال: توزیع نرمال
[[fig:math_mle.png|چپ: سه زنگوله مختلف برای شش داده. راست: لگاریتم درست‌نمایی در میانگین نمونه بیشینه می‌شود.]]

اگر داده‌ها از $N(\mu,\sigma^2)$ باشند:

$$\ln L=-\frac{n}{2}\ln(2\pi\sigma^2)-\frac{1}{2\sigma^2}\sum_i(x_i-\mu)^2$$

| پارامتر | برآورد MLE | برای داده 4.2، 5.1، 5.6، 6.0، 6.3، 7.4 |
|---|---|---|
| $\hat\mu$ | $\frac1n\sum x_i$ | 5.767 |
| $\hat\sigma^2$ | $\frac1n\sum(x_i-\hat\mu)^2$ | 0.989 |

## از MLE به MSE
فرض رگرسیون: $y_i=f_\theta(x_i)+\varepsilon_i$ که نویز $\varepsilon_i\sim N(0,\sigma^2)$ است. پس $y_i\sim N(f_\theta(x_i),\sigma^2)$ و:

$$\ln L(\theta)=\text{const}-\frac{1}{2\sigma^2}\sum_i\big(y_i-f_\theta(x_i)\big)^2$$

بیشینه کردن این عبارت دقیقاً یعنی **کمینه کردن جمع مربعات خطا**. پس MSE یک انتخاب دلبخواهی نیست: نتیجه مستقیم فرض «نویز نرمال» است.

## از MLE به آنتروپی متقاطع
در طبقه‌بندی دودویی، مدل احتمال $\hat{p}_i$ را برای کلاس 1 می‌دهد و برچسب $y_i\in\{0,1\}$ برنولی است:

$$L=\prod_i\hat{p}_i^{\,y_i}(1-\hat{p}_i)^{1-y_i}\ \Rightarrow\ -\ln L=-\sum_i\big[y_i\ln\hat{p}_i+(1-y_i)\ln(1-\hat{p}_i)\big]$$

این همان **آنتروپی متقاطع دودویی** (log loss) است.

| فرض درباره داده | تابع خطای حاصل |
|---|---|
| نویز نرمال | MSE (مربع خطا) |
| نویز لاپلاس | MAE (قدر مطلق خطا) |
| برچسب برنولی | آنتروپی متقاطع دودویی |
| برچسب دسته‌ای (K کلاس) | آنتروپی متقاطع چندکلاسه |
| شمارش پواسون | خطای پواسون |

## MAP: درست‌نمایی + باور پیشین
اگر درباره پارامترها باور قبلی داشته باشیم (مثلاً «وزن‌ها باید کوچک باشند»)، از بیز استفاده می‌کنیم:

$$\hat\theta_{\text{MAP}}=\arg\max_\theta\big[\ln P(\text{data}\mid\theta)+\ln P(\theta)\big]$$

| پیشین روی وزن‌ها | جمله اضافه در تابع خطا | نام |
|---|---|---|
| نرمال $N(0,\tau^2)$ | $\lambda\sum w_j^2$ | Ridge (L2) |
| لاپلاس | $\lambda\sum\lvert w_j\rvert$ | Lasso (L1) |
| یکنواخت (بدون باور) | هیچ | MLE ساده |

پس منظم‌سازی هم ریشه احتمالاتی دارد.

[[c:0]]`],
  en: ["Maximum likelihood: where loss functions come from", R`## The main question
Why does regression minimize the **squared** error and not the absolute value or the fourth power? Why does classification use **cross-entropy**? Both have the same answer: **maximum likelihood estimation**.

## Likelihood
Suppose a model has a parameter $\theta$. The **likelihood** says "if $\theta$ had this value, how probable would it be to see exactly this data?":

$$L(\theta)=P(\text{data}\mid\theta)=\prod_{i=1}^{n}P(x_i\mid\theta)$$

The best parameter is the one that makes the observed data **most probable**: $\hat\theta=\arg\max_\theta L(\theta)$.

## Example: a coin
We flipped a coin 10 times and got 7 heads. What is $\theta$ (the probability of heads)?

$$L(\theta)=\theta^7(1-\theta)^3$$

| $\theta$ | $L(\theta)$ | $\ln L(\theta)$ |
|---|---|---|
| 0.3 | 0.000075 | −9.50 |
| 0.5 | 0.000977 | −6.93 |
| 0.7 | 0.002224 | −6.11 |
| 0.9 | 0.000478 | −7.65 |

[[lab:m_mle]]

## Solving with a derivative
Take the logarithm (products become sums and the location of the maximum does not move):

$$\ln L=7\ln\theta+3\ln(1-\theta)\ \Rightarrow\ \frac{d\ln L}{d\theta}=\frac7\theta-\frac{3}{1-\theta}=0\ \Rightarrow\ \hat\theta=\frac{7}{10}$$

In general $\hat\theta=k/n$: the simple ratio that intuition suggests.

## Example: the normal distribution
[[fig:math_mle.png|Left: three different bells for six data points. Right: the log-likelihood peaks at the sample mean.]]

If the data comes from $N(\mu,\sigma^2)$:

$$\ln L=-\frac{n}{2}\ln(2\pi\sigma^2)-\frac{1}{2\sigma^2}\sum_i(x_i-\mu)^2$$

| Parameter | MLE | For the data 4.2, 5.1, 5.6, 6.0, 6.3, 7.4 |
|---|---|---|
| $\hat\mu$ | $\frac1n\sum x_i$ | 5.767 |
| $\hat\sigma^2$ | $\frac1n\sum(x_i-\hat\mu)^2$ | 0.989 |

## From MLE to MSE
The regression assumption: $y_i=f_\theta(x_i)+\varepsilon_i$ with noise $\varepsilon_i\sim N(0,\sigma^2)$. So $y_i\sim N(f_\theta(x_i),\sigma^2)$ and:

$$\ln L(\theta)=\text{const}-\frac{1}{2\sigma^2}\sum_i\big(y_i-f_\theta(x_i)\big)^2$$

Maximizing this is exactly **minimizing the sum of squared errors**. So MSE is not an arbitrary choice: it follows directly from assuming normal noise.

## From MLE to cross-entropy
In binary classification the model outputs a probability $\hat{p}_i$ for class 1, and the label $y_i\in\{0,1\}$ is Bernoulli:

$$L=\prod_i\hat{p}_i^{\,y_i}(1-\hat{p}_i)^{1-y_i}\ \Rightarrow\ -\ln L=-\sum_i\big[y_i\ln\hat{p}_i+(1-y_i)\ln(1-\hat{p}_i)\big]$$

This is the **binary cross-entropy** (log loss).

| Assumption about the data | Resulting loss |
|---|---|
| Normal noise | MSE (squared error) |
| Laplace noise | MAE (absolute error) |
| Bernoulli labels | Binary cross-entropy |
| Categorical labels (K classes) | Multi-class cross-entropy |
| Poisson counts | Poisson loss |

## MAP: likelihood plus a prior belief
If we have a prior belief about the parameters ("the weights should be small"), we use Bayes:

$$\hat\theta_{\text{MAP}}=\arg\max_\theta\big[\ln P(\text{data}\mid\theta)+\ln P(\theta)\big]$$

| Prior on the weights | Extra term in the loss | Name |
|---|---|---|
| Normal $N(0,\tau^2)$ | $\lambda\sum w_j^2$ | Ridge (L2) |
| Laplace | $\lambda\sum\lvert w_j\rvert$ | Lasso (L1) |
| Uniform (no belief) | None | Plain MLE |

So regularization has a probabilistic origin too.

[[c:0]]`],
  code: [`import numpy as np
from scipy import stats, optimize

# 1) Coin: 7 heads in 10 flips
for theta in [0.3, 0.5, 0.7, 0.9]:
    L = theta ** 7 * (1 - theta) ** 3
    print(f"theta = {theta}:  L = {L:.6f}   ln L = {np.log(L):.2f}")
grid = np.linspace(0.01, 0.99, 981)
print("theta that maximizes ln L on a grid:", round(grid[np.argmax(7 * np.log(grid) + 3 * np.log(1 - grid))], 3))

# 2) Normal distribution: MLE is the sample mean and the 1/n variance
d = np.array([4.2, 5.1, 5.6, 6.0, 6.3, 7.4])
print("mu_hat =", round(d.mean(), 3), "  sigma2_hat =", round(d.var(), 3))
neg_ll = lambda p: -np.sum(stats.norm.logpdf(d, p[0], np.exp(p[1])))     # p[1] = ln(sigma)
best = optimize.minimize(neg_ll, [0.0, 0.0])
print("numerical optimizer:  mu =", round(best.x[0], 3), "  sigma2 =", round(np.exp(best.x[1]) ** 2, 3))

# 3) Regression: maximizing the Gaussian likelihood = least squares
rng = np.random.default_rng(1)
x = rng.uniform(0, 10, 50); y = 2 + 0.8 * x + rng.normal(0, 1, 50)
neg_ll_line = lambda p: -np.sum(stats.norm.logpdf(y, p[0] + p[1] * x, 1.0))
mle = optimize.minimize(neg_ll_line, [0.0, 0.0]).x
slope, intercept = np.polyfit(x, y, 1)
print("MLE (intercept, slope)          :", mle.round(4))
print("least squares (intercept, slope):", np.array([intercept, slope]).round(4))

# 4) Binary cross-entropy is the negative log-likelihood of Bernoulli labels
labels = np.array([1, 0, 1, 1])
probs  = np.array([0.9, 0.2, 0.6, 0.3])
likelihood = np.prod(np.where(labels == 1, probs, 1 - probs))
bce = -np.mean(labels * np.log(probs) + (1 - labels) * np.log(1 - probs))
print("likelihood =", round(likelihood, 4), "  -ln(likelihood)/n =", round(-np.log(likelihood) / 4, 4), "  BCE =", round(bce, 4))`],
  ex: [E("در 20 بازدید از یک صفحه، 3 نفر خرید کرده‌اند. برآورد درست‌نمایی بیشینه نرخ خرید چقدر است؟ $\\ln L$ را در آن نقطه حساب کن.", "Out of 20 visits to a page, 3 people bought. What is the maximum-likelihood estimate of the purchase rate? Compute $\\ln L$ there.", `import numpy as np
k, n = 3, 20
t = k / n
print(t, k * np.log(t) + (n - k) * np.log(1 - t))   # 0.15  -8.454`, "$\\hat\\theta=3/20=0.15$ و $\\ln L=3\\ln0.15+17\\ln0.85\\approx-8.45$.", "$\\hat\\theta=3/20=0.15$ and $\\ln L=3\\ln0.15+17\\ln0.85\\approx-8.45$.")],
  quiz: [Q("چرا به جای L با $\\ln L$ کار می‌کنیم؟", "Why do we work with $\\ln L$ instead of L?", ["ضرب به جمع تبدیل می‌شود و جای بیشینه عوض نمی‌شود", "چون $\\ln L$ همیشه مثبت است", "چون L وجود ندارد"], ["Products become sums and the maximum stays in the same place", "Because $\\ln L$ is always positive", "Because L does not exist"], 0),
    Q("فرض «نویز نرمال» به کدام تابع خطا می‌رسد؟", "Assuming normal noise leads to which loss?", ["MSE", "MAE", "آنتروپی متقاطع"], ["MSE", "MAE", "Cross-entropy"], 0),
    Q("پیشین نرمال روی وزن‌ها معادل کدام منظم‌سازی است؟", "A normal prior on the weights is equivalent to which regularization?", ["L2 (Ridge)", "L1 (Lasso)", "Dropout"], ["L2 (Ridge)", "L1 (Lasso)", "Dropout"], 0)]
});

L({ id: "math-info",
  fa: ["آنتروپی، آنتروپی متقاطع و واگرایی KL", R`## اطلاعات یعنی غافلگیری
اگر بگویم «فردا خورشید طلوع می‌کند» چیزی یاد نگرفته‌ای. اگر بگویم «فردا در کویر برف می‌بارد» خیلی غافلگیر می‌شوی. **هر چه پیشامد نامحتمل‌تر، اطلاعات بیشتر**:

$$I(x)=-\log_2 P(x)\quad\text{[bit]}$$

| احتمال | اطلاعات (بیت) | مثال |
|---|---|---|
| 1 | 0 | پیشامد قطعی |
| 0.5 | 1 | نتیجه یک سکه |
| 0.25 | 2 | دو سکه |
| 0.01 | 6.64 | پیشامد کمیاب |

## آنتروپی: میانگین غافلگیری
$$H(p)=-\sum_k p_k\log_2 p_k$$

آنتروپی می‌گوید یک توزیع چقدر **نامطمئن** است.

| توزیع | محاسبه | آنتروپی (بیت) |
|---|---|---|
| سکه سالم (0.5، 0.5) | $-2\times0.5\log_2 0.5$ | 1 |
| سکه ناسالم (0.9، 0.1) | $-0.9\log_2 0.9-0.1\log_2 0.1$ | 0.469 |
| سکه دو رو شیر (1، 0) | 0 | 0 |
| تاس سالم | $\log_2 6$ | 2.585 |

[[fig:math_entropy.png|چپ: آنتروپی سکه در $p=0.5$ بیشینه است. راست: هر چه مدل به کلاس درست احتمال کمتری بدهد، جریمه شدیدتر می‌شود.]]

## آنتروپی متقاطع
اگر توزیع واقعی $p$ باشد ولی مدل $q$ را پیش‌بینی کند:

$$H(p,q)=-\sum_k p_k\log q_k$$

همیشه $H(p,q)\ge H(p)$ و فقط وقتی برابرند که $q=p$. پس کمینه کردن آنتروپی متقاطع یعنی نزدیک کردن q به p.

در طبقه‌بندی، برچسب واقعی one-hot است (مثلاً $p=(1,0,0)$)؛ پس فرمول ساده می‌شود به **منفی لگاریتم احتمالی که مدل به کلاس درست داده است**:

| پیش‌بینی مدل $q$ | احتمال کلاس درست | خطا $-\ln q$ |
|---|---|---|
| (0.9, 0.05, 0.05) | 0.9 | 0.105 |
| (0.7, 0.2, 0.1) | 0.7 | 0.357 |
| (0.34, 0.33, 0.33) | 0.34 | 1.079 |
| (0.1, 0.2, 0.7) | 0.1 | 2.303 |

!مدلی که با اطمینان زیاد اشتباه می‌کند، جریمه بسیار سنگینی می‌گیرد: اگر به کلاس درست احتمال 0.001 بدهد، خطا 6.9 است. این ویژگی آنتروپی متقاطع را از «دقت» که فقط درست/غلط می‌شمارد متمایز می‌کند.

[[lab:m_entropy]]

## واگرایی KL
«هزینه اضافه» استفاده از q به جای p:

$$D_{KL}(p\,\Vert\,q)=\sum_k p_k\log\frac{p_k}{q_k}=H(p,q)-H(p)\ \ge0$$

مثال با $p=(0.5,0.5)$ و $q=(0.9,0.1)$:

| کمیت | محاسبه | مقدار (بیت) |
|---|---|---|
| $D_{KL}(p\Vert q)$ | $0.5\log_2\frac{0.5}{0.9}+0.5\log_2\frac{0.5}{0.1}$ | 0.737 |
| $D_{KL}(q\Vert p)$ | $0.9\log_2\frac{0.9}{0.5}+0.1\log_2\frac{0.1}{0.5}$ | 0.531 |

!KL **متقارن نیست** ($0.737\ne0.531$)؛ پس «فاصله» به معنی ریاضی نیست.

## کجاها استفاده می‌شود؟
| جا | چه چیزی |
|---|---|
| تابع خطای طبقه‌بندی | آنتروپی متقاطع بین برچسب و خروجی softmax |
| درخت تصمیم | بهره اطلاعاتی = کاهش آنتروپی پس از شکستن گره |
| VAE | جمله KL بین توزیع پنهان و نرمال استاندارد |
| t-SNE | کمینه کردن KL بین شباهت‌ها در دو فضا |
| تقطیر دانش | KL بین خروجی مدل معلم و دانش‌آموز |
| مدل‌های زبانی | perplexity $=2^{H}$ |

## بهره اطلاعاتی در درخت تصمیم
گره‌ای با 5 نمونه مثبت و 5 منفی داریم؛ آنتروپی آن 1 بیت است. آن را به دو شاخه (4 مثبت، 1 منفی) و (1 مثبت، 4 منفی) می‌شکنیم:

| گره | توزیع | آنتروپی |
|---|---|---|
| والد | (0.5, 0.5) | 1.000 |
| هر فرزند | (0.8, 0.2) | 0.722 |
| میانگین وزنی فرزندان | $0.5\times0.722+0.5\times0.722$ | 0.722 |
| بهره اطلاعاتی | $1-0.722$ | 0.278 |

[[c:0]]`],
  en: ["Entropy, cross-entropy and KL divergence", R`## Information is surprise
If I say "the sun will rise tomorrow" you learn nothing. If I say "it will snow in the desert tomorrow" you are very surprised. **The less probable an event, the more information it carries**:

$$I(x)=-\log_2 P(x)\quad\text{[bits]}$$

| Probability | Information (bits) | Example |
|---|---|---|
| 1 | 0 | A certain event |
| 0.5 | 1 | One coin flip |
| 0.25 | 2 | Two coins |
| 0.01 | 6.64 | A rare event |

## Entropy: the average surprise
$$H(p)=-\sum_k p_k\log_2 p_k$$

Entropy says how **uncertain** a distribution is.

| Distribution | Calculation | Entropy (bits) |
|---|---|---|
| Fair coin (0.5, 0.5) | $-2\times0.5\log_2 0.5$ | 1 |
| Biased coin (0.9, 0.1) | $-0.9\log_2 0.9-0.1\log_2 0.1$ | 0.469 |
| Two-headed coin (1, 0) | 0 | 0 |
| Fair die | $\log_2 6$ | 2.585 |

[[fig:math_entropy.png|Left: the entropy of a coin peaks at $p=0.5$. Right: the less probability the model gives to the true class, the harsher the penalty.]]

## Cross-entropy
If the true distribution is $p$ but the model predicts $q$:

$$H(p,q)=-\sum_k p_k\log q_k$$

Always $H(p,q)\ge H(p)$, with equality only when $q=p$. So minimizing the cross-entropy pulls q toward p.

In classification the true label is one-hot (for example $p=(1,0,0)$), so the formula reduces to **minus the log of the probability the model gave to the correct class**:

| Model prediction $q$ | Probability of the true class | Loss $-\ln q$ |
|---|---|---|
| (0.9, 0.05, 0.05) | 0.9 | 0.105 |
| (0.7, 0.2, 0.1) | 0.7 | 0.357 |
| (0.34, 0.33, 0.33) | 0.34 | 1.079 |
| (0.1, 0.2, 0.7) | 0.1 | 2.303 |

!A model that is confidently wrong is punished very hard: giving the true class a probability of 0.001 costs 6.9. This is what separates cross-entropy from "accuracy", which only counts right and wrong.

[[lab:m_entropy]]

## KL divergence
The "extra cost" of using q in place of p:

$$D_{KL}(p\,\Vert\,q)=\sum_k p_k\log\frac{p_k}{q_k}=H(p,q)-H(p)\ \ge0$$

Example with $p=(0.5,0.5)$ and $q=(0.9,0.1)$:

| Quantity | Calculation | Value (bits) |
|---|---|---|
| $D_{KL}(p\Vert q)$ | $0.5\log_2\frac{0.5}{0.9}+0.5\log_2\frac{0.5}{0.1}$ | 0.737 |
| $D_{KL}(q\Vert p)$ | $0.9\log_2\frac{0.9}{0.5}+0.1\log_2\frac{0.1}{0.5}$ | 0.531 |

!KL is **not symmetric** ($0.737\ne0.531$), so it is not a "distance" in the mathematical sense.

## Where is it used?
| Where | What |
|---|---|
| Classification loss | Cross-entropy between the label and the softmax output |
| Decision trees | Information gain = the drop in entropy after a split |
| VAE | A KL term between the latent distribution and a standard normal |
| t-SNE | Minimizes the KL between similarities in two spaces |
| Knowledge distillation | KL between teacher and student outputs |
| Language models | perplexity $=2^{H}$ |

## Information gain in a decision tree
A node has 5 positive and 5 negative samples; its entropy is 1 bit. We split it into two branches (4 positive, 1 negative) and (1 positive, 4 negative):

| Node | Distribution | Entropy |
|---|---|---|
| Parent | (0.5, 0.5) | 1.000 |
| Each child | (0.8, 0.2) | 0.722 |
| Weighted average of the children | $0.5\times0.722+0.5\times0.722$ | 0.722 |
| Information gain | $1-0.722$ | 0.278 |

[[c:0]]`],
  code: [`import numpy as np

def entropy(p):
    p = np.asarray(p, dtype=float); p = p[p > 0]
    return -np.sum(p * np.log2(p))

def cross_entropy(p, q):
    p, q = np.asarray(p, dtype=float), np.asarray(q, dtype=float)
    return -np.sum(p[p > 0] * np.log2(q[p > 0]))

def kl(p, q):
    return cross_entropy(p, q) - entropy(p)

for name, p in [("fair coin", [0.5, 0.5]), ("biased coin", [0.9, 0.1]), ("certain", [1.0, 0.0]), ("fair die", [1 / 6] * 6)]:
    print(f"{name:12s} H = {entropy(p):.3f} bits")

# Cross-entropy loss for a one-hot label (natural log, as deep-learning libraries use)
for q in [[0.9, 0.05, 0.05], [0.7, 0.2, 0.1], [0.34, 0.33, 0.33], [0.1, 0.2, 0.7]]:
    print("q =", q, "  loss =", round(-np.log(q[0]), 3))

p, q = [0.5, 0.5], [0.9, 0.1]
print("KL(p||q) =", round(kl(p, q), 3), "   KL(q||p) =", round(kl(q, p), 3), "   KL(p||p) =", kl(p, p))

# Information gain of a split in a decision tree
parent = entropy([0.5, 0.5])
children = 0.5 * entropy([0.8, 0.2]) + 0.5 * entropy([0.2, 0.8])
print("information gain =", round(parent - children, 3))

# The same loss with scikit-learn
from sklearn.metrics import log_loss
y_true = [0, 0, 1, 2]
y_prob = [[0.9, 0.05, 0.05], [0.7, 0.2, 0.1], [0.2, 0.6, 0.2], [0.1, 0.2, 0.7]]
print("mean cross-entropy (sklearn log_loss):", round(log_loss(y_true, y_prob), 4))`],
  ex: [E("آنتروپی توزیع $(0.5, 0.25, 0.25)$ چند بیت است؟ اگر مدل $(0.25, 0.5, 0.25)$ را پیش‌بینی کند، آنتروپی متقاطع و KL چقدر است؟", "What is the entropy of $(0.5, 0.25, 0.25)$ in bits? If the model predicts $(0.25, 0.5, 0.25)$, what are the cross-entropy and the KL divergence?", `import numpy as np
p = np.array([0.5, 0.25, 0.25]); q = np.array([0.25, 0.5, 0.25])
H = -np.sum(p * np.log2(p)); Hpq = -np.sum(p * np.log2(q))
print(H, Hpq, Hpq - H)   # 1.5  1.75  0.25`, "$H(p)=0.5\\times1+2\\times0.25\\times2=1.5$، $H(p,q)=0.5\\times2+0.25\\times1+0.25\\times2=1.75$ و $KL=0.25$ بیت.", "$H(p)=0.5\\times1+2\\times0.25\\times2=1.5$, $H(p,q)=0.5\\times2+0.25\\times1+0.25\\times2=1.75$ and $KL=0.25$ bits."),
    E("در آزمایشگاه برچسب one-hot را انتخاب کن و وزن کلاس A را در q به نزدیک صفر برسان. آنتروپی متقاطع چه می‌شود؟", "In the lab pick the one-hot label and push the weight of class A in q toward zero. What happens to the cross-entropy?", null, "به‌سرعت بزرگ می‌شود، چون $-\\log q_A$ وقتی $q_A\\to0$ به بی‌نهایت میل می‌کند.", "It grows very fast, because $-\\log q_A$ goes to infinity as $q_A\\to0$.")],
  quiz: [Q("کدام توزیع بیشترین آنتروپی را دارد؟", "Which distribution has the highest entropy?", ["یکنواخت", "قطعی (یک کلاس با احتمال 1)", "چوله"], ["Uniform", "Certain (one class with probability 1)", "Skewed"], 0),
    Q("برای برچسب one-hot، آنتروپی متقاطع برابر چیست؟", "For a one-hot label, the cross-entropy equals...", ["منفی لگاریتم احتمال کلاس درست", "تعداد اشتباه‌ها", "میانگین مربعات خطا"], ["minus the log of the true-class probability", "the number of mistakes", "the mean squared error"], 0),
    Q("کدام گزاره درباره KL درست است؟", "Which statement about KL is true?", ["متقارن نیست و همیشه نامنفی است", "متقارن است", "می‌تواند منفی باشد"], ["It is not symmetric and never negative", "It is symmetric", "It can be negative"], 0)]
});
FinishCourse();
