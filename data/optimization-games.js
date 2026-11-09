M("ai", "optimization", "الگوریتم‌های بهینه‌سازی", "Optimization algorithms", { before: "practice" });

L({ id: "op-intro",
  fa: ["مسئله بهینه‌سازی", R`بهینه‌سازی یعنی یافتن بهترین تصمیم با توجه به محدودیت‌ها. آموزش مدل، زمان‌بندی، مسیریابی و طراحی همگی مسئله بهینه‌سازی‌اند.

$$\min_x\ f(x)\quad s.t.\ \ g_i(x)\le0,\ \ h_j(x)=0$$

| اصطلاح | معنی | مثال |
|---|---|---|
| متغیر تصمیم | آنچه تعیین می‌کنیم | تعداد تولید |
| تابع هدف | آنچه بهتر می‌کنیم | سود |
| قید | محدودیت | بودجه |
| شدنی | جوابی که قیدها را رعایت کند | |
| بهینه محلی | بهتر از همسایه‌ها | |
| بهینه سراسری | بهترین در کل فضا | |

[[fig:landscape.png|تابع محدب یک کمینه دارد، ولی تابع Rastrigin پر از کمینه محلی است.]]

## انتخاب روش
| نوع مسئله | روش پیشنهادی |
|---|---|
| خطی | Simplex، نقطه درونی |
| محدب و مشتق‌پذیر | گرادیان، نیوتن، BFGS |
| غیرمحدب با گرادیان | Adam، چند نقطه شروع |
| بدون گرادیان یا گسسته | GA، PSO، SA، DE |
| ابرپارامتر گران | جستجوی تصادفی، بیزی |`],
  en: ["The optimization problem", R`Optimization means finding the best decision subject to limits. Training models, scheduling, routing and design are all optimization problems.

$$\min_x\ f(x)\quad s.t.\ \ g_i(x)\le0,\ \ h_j(x)=0$$

| Term | Meaning | Example |
|---|---|---|
| Decision variable | What we choose | Units produced |
| Objective | What we improve | Profit |
| Constraint | A limit | Budget |
| Feasible | Satisfies all constraints | |
| Local optimum | Better than neighbors | |
| Global optimum | Best overall | |

[[fig:landscape.png|A convex function has one minimum, while Rastrigin is full of local minima.]]

## Choosing a method
| Problem | Suggested method |
|---|---|
| Linear | Simplex, interior point |
| Convex, differentiable | Gradient, Newton, BFGS |
| Non-convex with gradients | Adam, multiple starts |
| No gradients or discrete | GA, PSO, SA, DE |
| Costly hyperparameters | Random or Bayesian search |`],
  quiz: [Q("بهینه محلی یعنی چه؟", "What is a local optimum?", ["بهترین جواب در همسایگی خود", "بهترین جواب ممکن", "جواب نشدنی"], ["The best answer in its neighborhood", "The best possible answer", "An infeasible answer"], 0)]
});

L({ id: "op-lp",
  fa: ["برنامه‌ریزی خطی", R`در برنامه‌ریزی خطی هدف و قیدها خطی‌اند. جواب بهینه روی یک گوشه ناحیه شدنی است.

## مثال
کارخانه‌ای دو محصول دارد و می‌خواهد سود را بیشینه کند:

$$\max\ 3x+5y\quad s.t.\ x\le4,\ 2y\le12,\ 3x+2y\le18,\ x,y\ge0$$

| گوشه | سود $3x+5y$ |
|---|---|
| (0,0) | 0 |
| (4,0) | 12 |
| (4,3) | 27 |
| (2,6) | **36** |
| (0,6) | 30 |

[[c:0]]

!~linprog~ کمینه‌سازی می‌کند، برای بیشینه‌سازی ضرایب هدف را منفی کن.`],
  en: ["Linear programming", R`In linear programming, the objective and constraints are linear. The best solution lies at a corner of the feasible region.

## Example
A factory makes two products and wants maximum profit:

$$\max\ 3x+5y\quad s.t.\ x\le4,\ 2y\le12,\ 3x+2y\le18,\ x,y\ge0$$

| Corner | Profit $3x+5y$ |
|---|---|
| (0,0) | 0 |
| (4,0) | 12 |
| (4,3) | 27 |
| (2,6) | **36** |
| (0,6) | 30 |

[[c:0]]

!~linprog~ minimizes, so negate the objective to maximize.`],
  code: [`from scipy.optimize import linprog\n\nresult = linprog(c=[-3, -5], A_ub=[[1, 0], [0, 2], [3, 2]], b_ub=[4, 12, 18], bounds=[(0, None), (0, None)])\nprint("x, y =", result.x.round(3), "profit =", round(-result.fun, 3))`],
  ex: [E("اگر سود محصول دوم ۲ باشد، جواب بهینه چیست؟", "If the second product's profit is 2, what is the optimum?", `from scipy.optimize import linprog\nr = linprog([-3, -2], A_ub=[[1, 0], [0, 2], [3, 2]], b_ub=[4, 12, 18], bounds=[(0, None), (0, None)])\nprint(r.x.round(3), round(-r.fun, 3))`, "سود بیشینه ۱۸ است و جواب‌های بهینه متعددند، روی ضلع 3x+2y=18.", "The maximum is 18, with several optima on the edge 3x+2y=18.")]
});

L({ id: "op-gradient",
  fa: ["روش‌های مبتنی بر مشتق", R`| روش | به‌روزرسانی | ویژگی |
|---|---|---|
| گرادیان | $x-\eta\nabla f$ | ساده |
| نیوتن | $x-H^{-1}\nabla f$ | هم‌گرایی سریع، هزینه هسین |
| BFGS | تقریب هسین | تعادل خوب |

نیوتن برای تابع درجه دو در یک گام به جواب می‌رسد: $f(x)=x^2-4x$ با $x_0=10$: مشتق ۱۶ و مشتق دوم ۲ است، پس $x_1=10-16/2=2$.

[[c:0]]`],
  en: ["Derivative-based methods", R`| Method | Update | Property |
|---|---|---|
| Gradient | $x-\eta\nabla f$ | Simple |
| Newton | $x-H^{-1}\nabla f$ | Fast, costly Hessian |
| BFGS | Approximates the Hessian | Good balance |

Newton reaches the minimum of a quadratic in one step: for $f(x)=x^2-4x$ from $x_0=10$, the slope is 16 and the second derivative 2, so $x_1=10-16/2=2$.

[[c:0]]`],
  code: [`from scipy.optimize import minimize, rosen\n\nfor method in ["Nelder-Mead", "BFGS"]:\n    r = minimize(rosen, [-1.2, 1.0], method=method)\n    print(method, r.x.round(4), "function calls:", r.nfev)`]
});

var RAST = R`
import numpy as np

def rastrigin(x):
    x = np.atleast_2d(x)
    return 10 * x.shape[1] + np.sum(x ** 2 - 10 * np.cos(2 * np.pi * x), axis=1)

LOW, HIGH, DIM = -5.12, 5.12, 2
rng = np.random.default_rng(1)
`.trim() + "\n\n";

L({ id: "op-ga",
  fa: ["الگوریتم ژنتیک", R`الگوریتم ژنتیک از تکامل الهام گرفته است.

| مرحله | کار |
|---|---|
| جمعیت اولیه | چند جواب تصادفی |
| ارزیابی | شایستگی هر جواب |
| انتخاب | جواب‌های بهتر شانس بیشتری دارند |
| تقاطع | ترکیب دو والد |
| جهش | تغییر کوچک تصادفی |
| نخبه‌گرایی | حفظ بهترین جواب |

[[c:0]]

| پارامتر | زیاد | کم |
|---|---|---|
| اندازه جمعیت | جستجوی بهتر، کندتر | سریع، خطر محلی |
| نرخ جهش | تنوع زیاد | گیرکردن |`],
  en: ["Genetic algorithms", R`A genetic algorithm is inspired by evolution.

| Stage | Action |
|---|---|
| Initial population | Several random solutions |
| Evaluation | Fitness of each solution |
| Selection | Better solutions get more chances |
| Crossover | Combine two parents |
| Mutation | A small random change |
| Elitism | Keep the best solution |

[[c:0]]

| Parameter | High | Low |
|---|---|---|
| Population size | Better search, slower | Fast, local risk |
| Mutation rate | Much diversity | Getting stuck |`],
  code: [RAST + `pop = rng.uniform(LOW, HIGH, (60, DIM))\nfor gen in range(120):\n    fit = rastrigin(pop)\n    elite = pop[fit.argmin()].copy()\n    a, b = rng.integers(0, 60, (2, 60))            # tournament selection\n    parents = pop[np.where(fit[a] < fit[b], a, b)]\n    alpha = rng.random((60, 1))                    # blend crossover\n    children = alpha * parents + (1 - alpha) * parents[::-1]\n    mask = rng.random(children.shape) < 0.15       # mutation\n    children[mask] += rng.normal(0, 0.4, mask.sum())\n    pop = np.clip(children, LOW, HIGH)\n    pop[0] = elite                                 # elitism\nbest = pop[rastrigin(pop).argmin()]\nprint("best:", best.round(4), "value:", rastrigin(best).round(5))`]
});

L({ id: "op-pso",
  fa: ["ازدحام ذرات (PSO)", R`هر ذره موقعیت و سرعت دارد و به بهترین تجربه خودش و بهترین تجربه گروه کشیده می‌شود.

$$v\leftarrow wv+c_1r_1(p_{best}-x)+c_2r_2(g_{best}-x),\quad x\leftarrow x+v$$

| پارامتر | نقش | مقدار رایج |
|---|---|---|
| $w$ | اینرسی | 0.4 تا 0.9 |
| $c_1$ | تجربه شخصی | 1.5 تا 2 |
| $c_2$ | تجربه جمعی | 1.5 تا 2 |`],
  en: ["Particle swarm optimization", R`Each particle has a position and velocity, and is pulled toward its own best experience and the group's best.

$$v\leftarrow wv+c_1r_1(p_{best}-x)+c_2r_2(g_{best}-x),\quad x\leftarrow x+v$$

| Parameter | Role | Usual value |
|---|---|---|
| $w$ | Inertia | 0.4 to 0.9 |
| $c_1$ | Personal experience | 1.5 to 2 |
| $c_2$ | Group experience | 1.5 to 2 |`],
  demo: "pso",
  code: [RAST + `x = rng.uniform(LOW, HIGH, (40, DIM))\nv = np.zeros_like(x)\npbest, pval = x.copy(), rastrigin(x)\nfor it in range(150):\n    g = pbest[pval.argmin()]\n    r1, r2 = rng.random((2, 40, DIM))\n    v = 0.7 * v + 1.5 * r1 * (pbest - x) + 1.5 * r2 * (g - x)\n    x = np.clip(x + v, LOW, HIGH)\n    f = rastrigin(x)\n    better = f < pval\n    pbest[better], pval[better] = x[better], f[better]\nprint("best:", pbest[pval.argmin()].round(4), "value:", round(float(pval.min()), 5))`]
});

L({ id: "op-sa-de",
  fa: ["شبیه‌سازی تبرید و تکامل تفاضلی", R`## شبیه‌سازی تبرید
حرکت بهتر همیشه پذیرفته می‌شود و حرکت بدتر با احتمال زیر؛ بنابراین می‌تواند از کمینه محلی فرار کند:

$$P=e^{-\Delta f/T}$$

دما $T$ به‌تدریج کم می‌شود.

| $\Delta f$ | T | P |
|---|---|---|
| 1 | 10 | 0.905 |
| 1 | 1 | 0.368 |
| 1 | 0.1 | 0.00005 |

## تکامل تفاضلی
فرزند از اختلاف اعضای جمعیت ساخته می‌شود: $v=x_a+F(x_b-x_c)$.

[[c:0]]

## مقایسه
| الگوریتم | نوع | مناسب برای |
|---|---|---|
| GA | جمعیتی | فضای گسسته و ترکیبیاتی |
| PSO | جمعیتی | فضای پیوسته |
| SA | تک‌جوابی | مسئله ساده با بودجه کم |
| DE | جمعیتی | فضای پیوسته و دشوار |

!طبق قضیه No Free Lunch هیچ الگوریتمی روی همه مسئله‌ها بهترین نیست.`],
  en: ["Simulated annealing and differential evolution", R`## Simulated annealing
A better move is always accepted, and a worse one with the probability below, so it can escape local minima:

$$P=e^{-\Delta f/T}$$

The temperature $T$ falls gradually.

| $\Delta f$ | T | P |
|---|---|---|
| 1 | 10 | 0.905 |
| 1 | 1 | 0.368 |
| 1 | 0.1 | 0.00005 |

## Differential evolution
A child is built from population differences: $v=x_a+F(x_b-x_c)$.

[[c:0]]

## Comparison
| Algorithm | Kind | Good for |
|---|---|---|
| GA | Population | Discrete, combinatorial spaces |
| PSO | Population | Continuous spaces |
| SA | Single solution | Simple problems, low budget |
| DE | Population | Hard continuous spaces |

!By the No Free Lunch theorem, no algorithm is best on all problems.`],
  code: [`import numpy as np\nfrom scipy.optimize import differential_evolution\n\nf = lambda x: 10 * len(x) + np.sum(x ** 2 - 10 * np.cos(2 * np.pi * x))\nrng = np.random.default_rng(0)\n\nx = rng.uniform(-5.12, 5.12, 2)\nbest, fbest, T = x.copy(), f(x), 10.0\nfor i in range(5000):\n    y = np.clip(x + rng.normal(0, 0.5, 2), -5.12, 5.12)\n    d = f(y) - f(x)\n    if d < 0 or rng.random() < np.exp(-d / T):\n        x = y\n        if f(x) < fbest:\n            best, fbest = x.copy(), f(x)\n    T = max(T * 0.999, 1e-3)\nprint("SA:", best.round(3), round(fbest, 4))\n\nr = differential_evolution(f, [(-5.12, 5.12)] * 2, seed=0)\nprint("DE:", r.x.round(4), round(r.fun, 6))`]
});

M("ai", "games", "نظریه بازی‌ها", "Game theory", { before: "practice" });

L({ id: "gt-basics",
  fa: ["مفاهیم پایه و معمای زندانی", R`نظریه بازی‌ها تصمیم‌گیری وقتی نتیجه به انتخاب دیگران هم بستگی دارد را مطالعه می‌کند.

| اصطلاح | معنی |
|---|---|
| بازیکن | تصمیم‌گیرنده |
| راهبرد | طرح انتخاب بازیکن |
| پاداش | سود هر نتیجه |
| بهترین پاسخ | بهترین انتخاب با فرض انتخاب دیگران |
| راهبرد غالب | همیشه بهتر، فارغ از انتخاب دیگران |

## معمای زندانی
عدد اول سود بازیکن ۱ و عدد دوم سود بازیکن ۲ است.

| | سکوت | اعتراف |
|---|---|---|
| **سکوت** | (−1, −1) | (−3, 0) |
| **اعتراف** | (0, −3) | (−2, −2) |

اعتراف برای هر بازیکن راهبرد غالب است: اگر طرف مقابل سکوت کند، ۰ بهتر از ۱− است و اگر اعتراف کند، ۲− بهتر از ۳− است. پس هر دو اعتراف می‌کنند، هرچند سکوت هر دو برایشان بهتر بود.

!این تضاد بین منفعت فردی و جمعی در رقابت قیمت، آلودگی و مسابقه تسلیحاتی دیده می‌شود.`],
  en: ["Basics and the prisoner's dilemma", R`Game theory studies decisions when outcomes also depend on others' choices.

| Term | Meaning |
|---|---|
| Player | A decision maker |
| Strategy | A player's plan |
| Payoff | The gain from an outcome |
| Best response | The best choice given others' choices |
| Dominant strategy | Always better, whatever others do |

## The prisoner's dilemma
The first number is player 1's payoff and the second is player 2's.

| | Silent | Confess |
|---|---|---|
| **Silent** | (−1, −1) | (−3, 0) |
| **Confess** | (0, −3) | (−2, −2) |

Confessing is dominant for each player: if the other stays silent, 0 beats −1; if the other confesses, −2 beats −3. So both confess, although both staying silent would have been better.

!This conflict between individual and group interest appears in price wars, pollution and arms races.`],
  demo: "game",
  quiz: [Q("راهبرد غالب چیست؟", "What is a dominant strategy?", ["فارغ از انتخاب دیگران بهترین است", "فقط یک بار بهترین است", "همیشه بدترین است"], ["Best whatever others choose", "Best only once", "Always the worst"], 0)]
});

L({ id: "gt-nash",
  fa: ["تعادل نش", R`در **تعادل نش** هیچ بازیکنی با تغییر یک‌طرفه راهبردش سود بیشتری نمی‌برد. جان نش ثابت کرد هر بازی متناهی دست‌کم یک تعادل (شاید مختلط) دارد.

## روش یافتن تعادل خالص
برای هر ستون، بهترین پاسخ بازیکن ۱ و برای هر سطر، بهترین پاسخ بازیکن ۲ را علامت بزن. خانه‌ای که هر دو علامت را دارد تعادل نش است.

| بازی | تعادل خالص | ویژگی |
|---|---|---|
| معمای زندانی | (اعتراف، اعتراف) | یک تعادل ناکارا |
| نبرد زوج‌ها | دو تعادل | مسئله هماهنگی |
| شکار گوزن | دو تعادل | امن در برابر پربازده |
| سکه‌بازی | ندارد | فقط مختلط |

[[c:0]]`],
  en: ["Nash equilibrium", R`In a **Nash equilibrium**, no player gains by changing strategy alone. John Nash proved that every finite game has at least one equilibrium (possibly mixed).

## Finding pure equilibria
For each column mark player 1's best response, and for each row mark player 2's. A cell with both marks is a Nash equilibrium.

| Game | Pure equilibria | Note |
|---|---|---|
| Prisoner's dilemma | (Confess, Confess) | One, inefficient |
| Battle of the Sexes | Two | A coordination problem |
| Stag Hunt | Two | Safe versus rewarding |
| Matching Pennies | None | Only mixed |

[[c:0]]`],
  demo: "game",
  code: [`import numpy as np\n\ndef pure_nash(A, B):\n    """Cells where both players are playing a best response."""\n    out = []\n    for i in range(A.shape[0]):\n        for j in range(A.shape[1]):\n            if A[i, j] == A[:, j].max() and B[i, j] == B[i, :].max():\n                out.append((i, j))\n    return out\n\nprisoners_A = np.array([[-1, -3], [0, -2]])\nprint("Prisoner's dilemma:", pure_nash(prisoners_A, prisoners_A.T))\nsexes_A = np.array([[2, 0], [0, 1]])\nsexes_B = np.array([[1, 0], [0, 2]])\nprint("Battle of the sexes:", pure_nash(sexes_A, sexes_B))`],
  ex: [E("بازی شکار گوزن با پاداش‌های (4,4)، (0,3)، (3,0)، (3,3) چند تعادل خالص دارد؟", "How many pure equilibria does Stag Hunt with (4,4), (0,3), (3,0), (3,3) have?", `import numpy as np\nA = np.array([[4, 0], [3, 3]])\nprint([(i, j) for i in range(2) for j in range(2) if A[i, j] == A[:, j].max() and A.T[i, j] == A.T[i, :].max()])`, "دو تعادل: هر دو گوزن یا هر دو خرگوش.", "Two: both hunt stag or both hunt hare.")]
});

L({ id: "gt-mixed",
  fa: ["راهبرد مختلط", R`گاهی بازیکن باید تصادفی بازی کند تا قابل پیش‌بینی نباشد. در تعادل مختلط، احتمال هر بازیکن طوری است که **طرف مقابل بین گزینه‌هایش بی‌تفاوت شود**.

## مثال: نبرد زوج‌ها
| | ستون A | ستون B |
|---|---|---|
| **سطر A** | (2, 1) | (0, 0) |
| **سطر B** | (0, 0) | (1, 2) |

بازیکن ۱ با احتمال p گزینه A را بازی می‌کند. بازیکن ۲ باید بی‌تفاوت شود:

$$1\cdot p=2(1-p)\Rightarrow p=\tfrac{2}{3}$$

به همین ترتیب بازیکن ۲ با $q$ بازیکن ۱ را بی‌تفاوت می‌کند: $2q=1-q$، پس $q=\tfrac{1}{3}$.

[[c:0]]`],
  en: ["Mixed strategies", R`Sometimes a player must randomize to stay unpredictable. In a mixed equilibrium, each player's probabilities make **the opponent indifferent** between options.

## Example: Battle of the Sexes
| | Column A | Column B |
|---|---|---|
| **Row A** | (2, 1) | (0, 0) |
| **Row B** | (0, 0) | (1, 2) |

Player 1 plays A with probability p. Player 2 must be indifferent:

$$1\cdot p=2(1-p)\Rightarrow p=\tfrac{2}{3}$$

Likewise player 2's $q$ makes player 1 indifferent: $2q=1-q$, so $q=\tfrac{1}{3}$.

[[c:0]]`],
  demo: "game",
  code: [`from fractions import Fraction as F\n\na, b, c, d = F(1), F(0), F(0), F(2)   # player 2's payoffs for rows A,B and columns A,B\np = (d - c) / (a - b - c + d)\nA, C = F(2), F(1)\nq = C / (A + C)\nprint("p =", p, "q =", q)\nprint("Expected payoff of player 1:", A * q)`]
});

L({ id: "gt-minimax",
  fa: ["بازی مجموع صفر و Minimax", R`در بازی **مجموع صفر** سود یکی زیان دیگری است. فون نویمان نشان داد ارزش بازی با راهبرد مختلط یکتا است:

$$\max_p\min_q\ p^TAq=\min_q\max_p\ p^TAq$$

## مثال
برای ماتریس $A=\begin{bmatrix}3&-1\\-2&4\end{bmatrix}$ با برابر قرار دادن پاداش دو ستون: $3p-2(1-p)=-p+4(1-p)$، پس $p=0.6$ و ارزش بازی ۱ است.

این مسئله با برنامه‌ریزی خطی هم حل می‌شود:

[[c:0]]

## جستجوی Minimax در بازی‌ها
در بازی‌های نوبتی مثل دوز، درخت حالت‌ها پیمایش می‌شود. **هرس آلفا-بتا** شاخه‌های بی‌فایده را حذف می‌کند.

[[c:1]]`],
  en: ["Zero-sum games and minimax", R`In a **zero-sum** game, one player's gain is the other's loss. Von Neumann showed that with mixed strategies the game has a unique value:

$$\max_p\min_q\ p^TAq=\min_q\max_p\ p^TAq$$

## Example
For $A=\begin{bmatrix}3&-1\\-2&4\end{bmatrix}$, equating the two columns' payoffs gives $3p-2(1-p)=-p+4(1-p)$, so $p=0.6$ and the value is 1.

Linear programming also solves it:

[[c:0]]

## Minimax search in games
In turn-based games such as tic-tac-toe, the state tree is searched. **Alpha-beta pruning** removes useless branches.

[[c:1]]`],
  code: [`import numpy as np\nfrom scipy.optimize import linprog\n\ndef solve_zero_sum(A):\n    A = np.array(A, float)\n    m, n = A.shape\n    c = [0] * m + [-1]                  # maximize the value v\n    A_ub = np.c_[-A.T, np.ones(n)]\n    A_eq = [[1] * m + [0]]\n    r = linprog(c, A_ub=A_ub, b_ub=np.zeros(n), A_eq=A_eq, b_eq=[1], bounds=[(0, 1)] * m + [(None, None)])\n    return r.x[:m].round(3), round(r.x[-1], 3)\n\nprint(solve_zero_sum([[3, -1], [-2, 4]]))\nprint("Rock-paper-scissors:", solve_zero_sum([[0, -1, 1], [1, 0, -1], [-1, 1, 0]]))`,
    `from functools import lru_cache\n\nLINES = [(0,1,2),(3,4,5),(6,7,8),(0,3,6),(1,4,7),(2,5,8),(0,4,8),(2,4,6)]\n\ndef winner(b):\n    for i, j, k in LINES:\n        if b[i] != "." and b[i] == b[j] == b[k]:\n            return b[i]\n    return None\n\n@lru_cache(maxsize=None)\ndef value(b, player):\n    w = winner(b)\n    if w:\n        return 1 if w == "X" else -1\n    if "." not in b:\n        return 0\n    other = "O" if player == "X" else "X"\n    scores = [value(b[:i] + player + b[i+1:], other) for i, c in enumerate(b) if c == "."]\n    return max(scores) if player == "X" else min(scores)\n\nprint("Value of tic-tac-toe with perfect play:", value("." * 9, "X"))`]
});

L({ id: "gt-repeated",
  fa: ["بازی تکرارشونده و همکاری", R`وقتی بازی تکرار شود، همکاری می‌تواند پایدار شود، چون خیانت امروز تنبیه فردا دارد. در مسابقه معروف آکسلرود، راهبرد ساده **Tit for Tat** بسیار موفق بود.

| راهبرد | قاعده |
|---|---|
| Always Cooperate | همیشه همکاری |
| Always Defect | همیشه خیانت |
| Tit for Tat | حرکت قبلی طرف مقابل را تکرار کن |
| Grim Trigger | پس از یک خیانت، برای همیشه خیانت |

[[c:0]]`],
  en: ["Repeated games and cooperation", R`When a game repeats, cooperation can be stable because today's betrayal is punished tomorrow. In Axelrod's famous tournament, the simple **Tit for Tat** strategy did very well.

| Strategy | Rule |
|---|---|
| Always Cooperate | Always cooperate |
| Always Defect | Always defect |
| Tit for Tat | Repeat the opponent's last move |
| Grim Trigger | After one betrayal, defect forever |

[[c:0]]`],
  code: [`PAY = {("C", "C"): 3, ("C", "D"): 0, ("D", "C"): 5, ("D", "D"): 1}\n\ndef always_c(me, you): return "C"\ndef always_d(me, you): return "D"\ndef tit_for_tat(me, you): return you[-1] if you else "C"\ndef grim(me, you): return "D" if "D" in you else "C"\n\ndef play(f, g, rounds=100):\n    a, b, sa, sb = [], [], 0, 0\n    for _ in range(rounds):\n        x, y = f(a, b), g(b, a)\n        a.append(x); b.append(y)\n        sa += PAY[(x, y)]; sb += PAY[(y, x)]\n    return sa, sb\n\nplayers = [always_c, always_d, tit_for_tat, grim]\ntotal = {p.__name__: sum(play(p, q)[0] for q in players) for p in players}\nprint(sorted(total.items(), key=lambda kv: -kv[1]))`]
});

L({ id: "gt-ai",
  fa: ["نظریه بازی‌ها در هوش مصنوعی و زندگی", R`| حوزه | ارتباط |
|---|---|
| GAN | بازی مینیمکس مولد و تمیزدهنده |
| یادگیری چندعاملی | هر عامل نسبت به عامل‌های دیگر بهینه می‌شود |
| Shapley و SHAP | تقسیم منصفانه سهم ویژگی‌ها در پیش‌بینی |
| مزایده | طراحی قانون برای رفتار صادقانه |
| امنیت | مدل‌سازی مهاجم و مدافع |

$$\min_G\max_D\ E_x[\log D(x)]+E_z[\log(1-D(G(z)))]$$

## مقدار Shapley
سهم هر بازیکن میانگین ارزش افزوده او در همه ترتیب‌های ورود است.

[[c:0]]

در **مزایده ویکری** برنده قیمت دوم را می‌پردازد و گفتن قیمت واقعی بهترین راهبرد است.`],
  en: ["Game theory in AI and life", R`| Area | Connection |
|---|---|
| GANs | A minimax game of generator and discriminator |
| Multi-agent learning | Each agent adapts to the others |
| Shapley and SHAP | Fairly dividing feature contributions |
| Auctions | Designing rules for honest behavior |
| Security | Modeling attackers and defenders |

$$\min_G\max_D\ E_x[\log D(x)]+E_z[\log(1-D(G(z)))]$$

## Shapley value
A player's share is their average added value over all orders of arrival.

[[c:0]]

In a **Vickrey auction**, the winner pays the second price, and bidding your true value is the best strategy.`],
  code: [`from itertools import permutations\n\nv = {(): 0, ("A",): 10, ("B",): 20, ("C",): 30, ("A", "B"): 40, ("A", "C"): 50, ("B", "C"): 60, ("A", "B", "C"): 90}\nval = lambda s: v[tuple(sorted(s))]\n\nshap = dict.fromkeys("ABC", 0.0)\norders = list(permutations("ABC"))\nfor order in orders:\n    seen = []\n    for p in order:\n        shap[p] += val(seen + [p]) - val(seen)\n        seen.append(p)\nprint({k: round(s / len(orders), 2) for k, s in shap.items()})`]
});
