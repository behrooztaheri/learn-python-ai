M("ai", "deep", "یادگیری عمیق", "Deep learning");

L({ id: "dl-neuron",
  fa: ["نورون مصنوعی و تابع فعال‌سازی", R`نورون ورودی‌ها را وزن‌دار جمع می‌کند و از تابع فعال‌سازی می‌گذراند.

$$\hat y=f\Big(\sum_i w_ix_i+b\Big)$$

بدون تابع غیرخطی، چند لایه معادل یک تبدیل خطی می‌شوند. **ReLU** انتخاب رایج لایه‌های پنهان است.`],
  en: ["Artificial neurons and activation", R`A neuron adds up weighted inputs and passes the result through an activation function.

$$\hat y=f\Big(\sum_i w_ix_i+b\Big)$$

Without a non-linear function, several layers collapse into one linear map. **ReLU** is the usual choice for hidden layers.`],
  demo: "neuron",
  code: [`import numpy as np\n\ndef sigmoid(z): return 1 / (1 + np.exp(-z))\ndef relu(z): return np.maximum(z, 0)\n\nx = np.array([0.5, -1.2, 3.0])\nw = np.array([0.8, 0.1, -0.4])\nz = w @ x + 0.2\nprint("score:", round(z, 3))\nprint("sigmoid:", round(sigmoid(z), 3), "relu:", relu(z))`],
  quiz: [Q("چرا تابع فعال‌سازی غیرخطی لازم است؟", "Why are non-linear activations needed?", ["تا شبکه بتواند الگوی غیرخطی یاد بگیرد", "تا حافظه کم مصرف شود", "فقط برای زیبایی"], ["So the network can learn non-linear patterns", "To save memory", "Only for looks"], 0)]
});

L({ id: "dl-mlp",
  fa: ["شبکه چندلایه و پس‌انتشار", R`چند لایه نورون یک **MLP** می‌سازند. آموزش چهار مرحله دارد:

- عبور رو به جلو و محاسبه خروجی
- محاسبه خطا
- پس‌انتشار و محاسبه گرادیان با قاعده زنجیره‌ای
- به‌روزرسانی وزن‌ها

$$\frac{\partial J}{\partial w}=\frac{\partial J}{\partial \hat y}\cdot\frac{\partial \hat y}{\partial h}\cdot\frac{\partial h}{\partial w}$$

در آزمایشگاه یک شبکه واقعی را آموزش بده و مرز تصمیمش را ببین.`],
  en: ["Multilayer networks and backpropagation", R`Several layers of neurons form an **MLP**. Training has four steps:

- Forward pass to compute the output
- Compute the loss
- Backpropagation to compute gradients with the chain rule
- Update the weights

$$\frac{\partial J}{\partial w}=\frac{\partial J}{\partial \hat y}\cdot\frac{\partial \hat y}{\partial h}\cdot\frac{\partial h}{\partial w}$$

In the lab, train a real network and watch its decision boundary form.`],
  demo: "nn",
  code: [`import numpy as np\n\n# XOR: a problem one neuron cannot solve\nX = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], float)\ny = np.array([[0], [1], [1], [0]], float)\n\nrng = np.random.default_rng(1)\nW1, b1 = rng.normal(size=(2, 4)), np.zeros((1, 4))\nW2, b2 = rng.normal(size=(4, 1)), np.zeros((1, 1))\nsig = lambda z: 1 / (1 + np.exp(-z))\n\nfor epoch in range(5001):\n    h = np.tanh(X @ W1 + b1)                # forward\n    p = sig(h @ W2 + b2)\n    loss = -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))\n    g2 = p - y                              # backward\n    dW2, db2 = h.T @ g2 / 4, g2.mean(0, keepdims=True)\n    g1 = (g2 @ W2.T) * (1 - h ** 2)\n    dW1, db1 = X.T @ g1 / 4, g1.mean(0, keepdims=True)\n    W1 -= 0.5 * dW1; b1 -= 0.5 * db1        # update\n    W2 -= 0.5 * dW2; b2 -= 0.5 * db2\n    if epoch % 1000 == 0:\n        print(epoch, round(float(loss), 4))\n\nprint(p.round(3).ravel())`]
});

L({ id: "dl-optim",
  fa: ["بهینه‌ساز و منظم‌سازی", R`- **SGD:** گرادیان روی دسته‌های کوچک
- **Momentum:** میانگین گرادیان‌ها برای کاهش نوسان
- **Adam:** گام تطبیقی و نقطه شروع خوب

ابزارهای کنترل بیش‌برازش: **Dropout**، **Weight Decay**، **Early Stopping**، **Batch Normalization** و افزایش داده.`],
  en: ["Optimizers and regularization", R`- **SGD:** gradients on small batches
- **Momentum:** averages gradients to reduce oscillation
- **Adam:** adaptive steps and a good starting point

Tools against overfitting: **Dropout**, **Weight Decay**, **Early Stopping**, **Batch Normalization** and data augmentation.`],
  demo: "gd",
  code: [`from sklearn.datasets import load_digits\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.neural_network import MLPClassifier\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\n\nX, y = load_digits(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=0)\nfor solver in ["sgd", "adam"]:\n    m = make_pipeline(StandardScaler(), MLPClassifier((64,), solver=solver, max_iter=60, random_state=0))\n    print(solver, round(m.fit(X_tr, y_tr).score(X_te, y_te), 3))`]
});

L({ id: "dl-pytorch",
  fa: ["شروع PyTorch", R`PyTorch کتابخانه اصلی یادگیری عمیق است. مشتق‌ها با **autograd** خودکار حساب می‌شوند.

حلقه آموزش چهار خط اصلی دارد: ~zero_grad~، محاسبه خطا، ~backward~ و ~step~.

!PyTorch در مرورگر اجرا نمی‌شود. دکمه Colab را بزن یا آن را با ~pip install torch~ روی کامپیوتر نصب کن.`],
  en: ["Getting started with PyTorch", R`PyTorch is the main deep learning library. Derivatives are computed automatically by **autograd**.

The training loop has four key lines: ~zero_grad~, compute the loss, ~backward~ and ~step~.

!PyTorch cannot run in the browser. Use the Colab button or install it with ~pip install torch~.`],
  code: [COLAB(`import torch, torch.nn as nn\nfrom sklearn.datasets import load_digits\n\nX, y = load_digits(return_X_y=True)\nX = torch.tensor(X / 16, dtype=torch.float32)\ny = torch.tensor(y)\n\nmodel = nn.Sequential(nn.Linear(64, 128), nn.ReLU(), nn.Dropout(0.2), nn.Linear(128, 10))\nloss_fn = nn.CrossEntropyLoss()\nopt = torch.optim.Adam(model.parameters(), lr=1e-3)\n\nfor epoch in range(60):\n    model.train()\n    opt.zero_grad()\n    loss = loss_fn(model(X[:1400]), y[:1400])\n    loss.backward()\n    opt.step()\n\nmodel.eval()\nwith torch.no_grad():\n    acc = (model(X[1400:]).argmax(1) == y[1400:]).float().mean()\nprint(f"Test accuracy: {acc:.3f}")`)]
});

L({ id: "dl-cnn",
  fa: ["شبکه کانولوشنی", R`کرنل کوچکی روی تصویر می‌لغزد و **نقشه ویژگی** می‌سازد. **اشتراک وزن** تعداد پارامترها را کم می‌کند. Pooling اندازه را کم می‌کند و لایه‌های عمیق‌تر الگوهای بزرگ‌تر را می‌بینند.

کرنل را عوض کن و روی شبکه پیکسل نقاشی کن.`],
  en: ["Convolutional networks", R`A small kernel slides over an image and produces a **feature map**. **Weight sharing** keeps parameters few. Pooling reduces size, so deeper layers see larger patterns.

Change the kernel and paint on the pixel grid.`],
  demo: "conv",
  code: [COLAB(`import torch, torch.nn as nn\n\nmodel = nn.Sequential(\n    nn.Conv2d(1, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),\n    nn.Conv2d(16, 32, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),\n    nn.Flatten(), nn.Linear(32 * 7 * 7, 10),\n)\nx = torch.zeros(4, 1, 28, 28)\nprint(model(x).shape, sum(p.numel() for p in model.parameters()))`)]
});

L({ id: "dl-rnn",
  fa: ["RNN و LSTM", R`شبکه بازگشتی با **حالت پنهان** دنباله را گام‌به‌گام می‌خواند. RNN ساده در دنباله بلند با محو گرادیان مشکل دارد. **LSTM** و **GRU** با گیت‌ها وابستگی‌های بلندتر را یاد می‌گیرند.

$$h_t=\tanh(W_xx_t+W_hh_{t-1}+b)$$`],
  en: ["RNNs and LSTMs", R`A recurrent network reads a sequence step by step with a **hidden state**. A plain RNN suffers from vanishing gradients on long sequences. **LSTM** and **GRU** use gates to learn longer dependencies.

$$h_t=\tanh(W_xx_t+W_hh_{t-1}+b)$$`],
  code: [COLAB(`import torch, torch.nn as nn\n\nclass Forecaster(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.lstm = nn.LSTM(1, 32, batch_first=True)\n        self.out = nn.Linear(32, 1)\n    def forward(self, x):\n        s, _ = self.lstm(x)\n        return self.out(s[:, -1])\n\nt = torch.linspace(0, 60, 1200)\ns = torch.sin(t).unsqueeze(1)\nX = torch.stack([s[i:i + 30] for i in range(1100)])\ny = s[30:1130]\nm, f = Forecaster(), nn.MSELoss()\nopt = torch.optim.Adam(m.parameters(), lr=0.01)\nfor e in range(80):\n    opt.zero_grad(); l = f(m(X), y); l.backward(); opt.step()\nprint(round(l.item(), 5))`)]
});

L({ id: "dl-transformer",
  fa: ["Transformer و مدل‌های زبانی", R`در **Self-Attention** هر توکن به همه توکن‌ها نگاه می‌کند.

$$Attention(Q,K,V)=softmax\Big(\frac{QK^T}{\sqrt{d_k}}\Big)V$$

مدل‌های زبانی بزرگ روی این معماری ساخته شده‌اند: متن به توکن تبدیل می‌شود و مدل توکن بعدی را احتمالاتی پیش‌بینی می‌کند.

!مدل زبانی ممکن است پاسخ نادرست ولی مطمئن تولید کند. نتیجه مهم را همیشه بررسی کن.`],
  en: ["Transformers and language models", R`In **self-attention**, every token looks at all tokens.

$$Attention(Q,K,V)=softmax\Big(\frac{QK^T}{\sqrt{d_k}}\Big)V$$

Large language models are built on this architecture: text becomes tokens and the model predicts the next token probabilistically.

!A language model may produce a wrong answer confidently. Always verify important results.`],
  code: [`import numpy as np\n\n# Scaled dot-product attention on three tokens\nQ = K = V = np.array([[1.0, 0.0], [0.9, 0.1], [0.0, 1.0]])\nscores = Q @ K.T / np.sqrt(K.shape[1])\nexp = np.exp(scores - scores.max(axis=1, keepdims=True))\nweights = exp / exp.sum(axis=1, keepdims=True)\nprint(weights.round(3))\nprint((weights @ V).round(3))`]
});

L({ id: "dl-ethics",
  fa: ["کار مسئولانه با هوش مصنوعی", R`مدل خوب فقط دقیق نیست.

- **سوگیری:** داده ناعادلانه، نتیجه ناعادلانه می‌سازد.
- **حریم خصوصی:** داده حساس را بدون مجوز به کار نبر.
- **تفسیرپذیری:** در تصمیم‌های مهم باید بتوان نتیجه را توضیح داد.
- **ارزیابی واقعی:** مدل را در شرایط واقعی و برای گروه‌های مختلف بسنج.`],
  en: ["Using AI responsibly", R`A good model is more than accurate.

- **Bias:** unfair data produces unfair results.
- **Privacy:** do not use sensitive data without permission.
- **Interpretability:** important decisions must be explainable.
- **Realistic evaluation:** test the model in real conditions and across different groups.`]
});

M("ai", "fuzzy", "منطق فازی و ANFIS", "Fuzzy logic and ANFIS");

L({ id: "fz-sets",
  fa: ["مجموعه و منطق فازی", R`در مجموعه کلاسیک عضویت صفر یا یک است. لطفی زاده در سال ۱۹۶۵ **مجموعه فازی** را معرفی کرد: عضویت درجه‌ای بین صفر و یک است.

**تابع عضویت** این درجه را می‌دهد؛ مثلثی، ذوزنقه‌ای، گوسی و زنگوله‌ای رایج‌اند.

عملگرها: AND با min، OR با max و NOT با $1-\mu$.

!فازی با احتمال فرق دارد: درجه درستی یک مفهوم است، نه شانس رخ دادن.`],
  en: ["Fuzzy sets and logic", R`In a classical set, membership is 0 or 1. Lotfi Zadeh introduced **fuzzy sets** in 1965: membership is a degree between 0 and 1.

A **membership function** gives this degree; triangular, trapezoidal, Gaussian and bell shapes are common.

Operators: AND with min, OR with max, and NOT with $1-\mu$.

!Fuzziness differs from probability: it is a degree of truth, not a chance of occurring.`],
  code: [`import numpy as np\n\ndef tri(x, a, b, c):\n    return np.maximum(np.minimum((x - a) / (b - a), (c - x) / (c - b)), 0)\n\nx = np.array([10, 20, 25, 30])\nwarm = tri(x, 15, 25, 35)\nhot = tri(x, 25, 35, 45)\nprint("warm", warm.round(2))\nprint("hot ", hot.round(2))\nprint("warm AND hot", np.minimum(warm, hot).round(2))\nprint("warm OR hot ", np.maximum(warm, hot).round(2))`]
});

L({ id: "fz-mamdani",
  fa: ["سیستم استنتاج ممدانی", R`قواعد به زبان ساده نوشته می‌شوند: «اگر هوا گرم است، آنگاه سرعت فن زیاد است.»

- **فازی‌سازی:** درجه عضویت ورودی‌ها
- **ارزیابی قواعد:** برش خروجی‌ها با قدرت قاعده
- **تجمیع:** ترکیب نتیجه‌ها با max
- **نافازی‌سازی:** تبدیل به عدد با مرکز ثقل

$$z^*=\frac{\int\mu(z)z\,dz}{\int\mu(z)\,dz}$$`],
  en: ["Mamdani inference", R`Rules are written in plain words: "If the weather is warm, then the fan speed is high."

- **Fuzzification:** membership degrees of the inputs
- **Rule evaluation:** clipping outputs by rule strength
- **Aggregation:** combining results with max
- **Defuzzification:** back to a number with the centroid

$$z^*=\frac{\int\mu(z)z\,dz}{\int\mu(z)\,dz}$$`],
  demo: "fuzzy",
  code: [`import numpy as np\n\ndef tri(x, a, b, c):\n    return np.maximum(np.minimum((x - a) / (b - a + 1e-9), (c - x) / (c - b + 1e-9)), 0)\n\nz = np.linspace(0, 100, 1001)\nslow, medium, fast = tri(z, -1, 0, 50), tri(z, 0, 50, 100), tri(z, 50, 100, 101)\n\ndef fan_speed(t):\n    cold, warm, hot = tri(t, 0, 10, 25), tri(t, 15, 25, 35), tri(t, 25, 40, 55)\n    agg = np.maximum.reduce([np.minimum(cold, slow), np.minimum(warm, medium), np.minimum(hot, fast)])\n    return (z * agg).sum() / agg.sum()\n\nfor t in [12.0, 22.0, 30.0, 40.0]:\n    print(f"{t} C -> fan {fan_speed(t):.1f}%")`]
});

L({ id: "fz-sugeno",
  fa: ["سیستم سوگنو", R`در سوگنو تالی قاعده یک تابع است:

$$IF\ x\ is\ A\ AND\ y\ is\ B\ THEN\ z=px+qy+r$$

خروجی میانگین وزنی است و محاسبه‌اش ساده‌تر از ممدانی است. برای همین پایه ANFIS است.`],
  en: ["Sugeno systems", R`In a Sugeno system, the rule consequent is a function:

$$IF\ x\ is\ A\ AND\ y\ is\ B\ THEN\ z=px+qy+r$$

The output is a weighted average and is simpler to compute than Mamdani. That is why it underlies ANFIS.`],
  demo: "sugeno",
  code: [`import numpy as np\n\ngauss = lambda x, c, s: np.exp(-(x - c) ** 2 / (2 * s ** 2))\n\nx, y = 3.0, 4.0\nw1 = gauss(x, 2, 2) * gauss(y, 3, 2)\nw2 = gauss(x, 6, 2) * gauss(y, 7, 2)\nf1 = 0.5 * x + 0.2 * y + 1\nf2 = -0.3 * x + 0.8 * y + 2\nprint("output:", round((w1 * f1 + w2 * f2) / (w1 + w2), 3))`]
});

L({ id: "fz-anfis",
  fa: ["ANFIS", R`**ANFIS** (جانگ، ۱۹۹۳) سیستم سوگنو را به شکل شبکه‌ای پنج‌لایه درمی‌آورد تا از داده یاد بگیرد.

- لایه ۱: درجه عضویت (پارامترهای مقدم)
- لایه ۲: قدرت قاعده با ضرب
- لایه ۳: نرمال‌سازی
- لایه ۴: خروجی قاعده (پارامترهای تالی)
- لایه ۵: جمع نهایی

## یادگیری ترکیبی
در گذر رو به جلو تالی‌ها با کمترین مربعات و در گذر رو به عقب مقدم‌ها با گرادیان به‌روز می‌شوند.

!تعداد قواعد $M^n$ است؛ با ورودی زیاد نفرین ابعاد ظاهر می‌شود. انتخاب ورودی یا خوشه‌بندی کمک می‌کند.`],
  en: ["ANFIS", R`**ANFIS** (Jang, 1993) turns a Sugeno system into a five-layer network that learns from data.

- Layer 1: membership degrees (premise parameters)
- Layer 2: rule strength by product
- Layer 3: normalization
- Layer 4: rule output (consequent parameters)
- Layer 5: final sum

## Hybrid learning
In the forward pass, consequents are found by least squares; in the backward pass, premises are updated by gradient.

!There are $M^n$ rules, so many inputs bring the curse of dimensionality. Input selection or clustering helps.`],
  demo: "sugeno",
  code: [`import numpy as np\n\nrng = np.random.default_rng(0)\nX = rng.uniform(-3, 3, (400, 2))\ny = np.sin(X[:, 0]) * np.cos(X[:, 1])\n\ncenters = np.tile(np.array([-3.0, 0.0, 3.0]), (2, 1))\nsigmas = np.full((2, 3), 1.5)\n\ndef design(X, c, s):\n    m = np.exp(-(X[:, :, None] - c) ** 2 / (2 * s ** 2))\n    w = (m[:, 0, :, None] * m[:, 1, None, :]).reshape(len(X), -1)\n    nw = w / w.sum(1, keepdims=True)\n    A = np.c_[X, np.ones(len(X))]\n    return (nw[:, :, None] * A[:, None, :]).reshape(len(X), -1)\n\ndef solve(c, s):\n    A = design(X, c, s)\n    q = np.linalg.lstsq(A, y, rcond=None)[0]\n    return q, float(np.sqrt(np.mean((A @ q - y) ** 2)))\n\nq, e = solve(centers, sigmas)\nprint("start RMSE", round(e, 4))\nlr = 0.1\nfor epoch in range(40):\n    q, e = solve(centers, sigmas)\n    g = np.zeros_like(centers)\n    for i in np.ndindex(g.shape):\n        c2 = centers.copy(); c2[i] += 1e-4\n        g[i] = (solve(c2, sigmas)[1] - e) / 1e-4\n    trial = centers - lr * g\n    if solve(trial, sigmas)[1] < e: centers, lr = trial, lr * 1.2\n    else: lr *= 0.5\nprint("final RMSE", round(solve(centers, sigmas)[1], 4))\nprint(centers.round(2))`],
  quiz: [Q("در یادگیری ترکیبی، تالی‌ها چگونه یافته می‌شوند؟", "In hybrid learning, how are consequents found?", ["کمترین مربعات", "نمونه‌گیری تصادفی", "حذف قاعده"], ["Least squares", "Random sampling", "Removing rules"], 0)]
});

M("ai", "practice", "از مدل تا پروژه", "From model to project");

L({ id: "ai-project",
  fa: ["پروژه کامل: از داده تا گزارش", R`مراحل یک پروژه واقعی: تعریف مسئله، شناخت داده، خط لوله، انتخاب مدل با اعتبارسنجی، ارزیابی نهایی و گزارش صادقانه.

!داده آزمون را فقط در پایان استفاده کن. اگر بعد از دیدن نتیجه آزمون مدل را تغییر بدهی، برآوردت خوش‌بینانه می‌شود.

**تمرین:** ~load_wine~ را جایگزین کن و یک مدل جدید به فهرست اضافه کن.`],
  en: ["Complete project: from data to report", R`The steps of a real project: define the problem, understand the data, build a pipeline, select a model with validation, do a final evaluation, and report honestly.

!Use the test set only at the end. If you change the model after seeing test results, your estimate becomes optimistic.

**Exercise:** swap in ~load_wine~ and add a new model to the list.`],
  code: [`import matplotlib.pyplot as plt\nfrom sklearn.datasets import load_breast_cancer\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import ConfusionMatrixDisplay, classification_report\nfrom sklearn.model_selection import cross_val_score, train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.svm import SVC\n\nX, y = load_breast_cancer(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, stratify=y, random_state=42)\n\nmodels = {\n    "logistic": make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)),\n    "svm": make_pipeline(StandardScaler(), SVC()),\n    "forest": RandomForestClassifier(200, random_state=42),\n}\nscores = {n: cross_val_score(m, X_tr, y_tr, cv=5, scoring="f1").mean() for n, m in models.items()}\nprint({n: round(s, 4) for n, s in scores.items()})\n\nbest = max(scores, key=scores.get)\nfinal = models[best].fit(X_tr, y_tr)\nprint("Best model:", best)\nprint(classification_report(y_te, final.predict(X_te), digits=3))\nConfusionMatrixDisplay.from_estimator(final, X_te, y_te, cmap="Purples")\nplt.show()`]
});

L({ id: "ai-next",
  fa: ["قدم بعدی", R`- یک داده مربوط به رشته خودت پیدا کن.
- یک مسئله ساده تعریف کن و با مدل مبنا شروع کن.
- کدت را روی GitHub بگذار و نتیجه را منصفانه بنویس.
- منابع ادامه: مستندات [scikit-learn](https://scikit-learn.org/) و [PyTorch](https://pytorch.org/tutorials/)، و کتاب Deep Learning نوشته Goodfellow و همکاران.`],
  en: ["What to do next", R`- Find a dataset from your own field.
- Define a simple problem and start with a baseline model.
- Put your code on GitHub and report the results fairly.
- Further resources: the [scikit-learn](https://scikit-learn.org/) and [PyTorch](https://pytorch.org/tutorials/) documentation, and the book Deep Learning by Goodfellow et al.`]
});

window.GLOSSARY = [
  ["الگوریتم", "Algorithm", "دنباله‌ای از گام‌های مشخص برای حل مسئله", "A defined sequence of steps that solves a problem"],
  ["ویژگی", "Feature", "ستون ورودی مدل", "An input column of a model"],
  ["برچسب", "Label", "جواب درست هر نمونه", "The correct answer for a sample"],
  ["پارامتر", "Parameter", "مقداری که مدل از داده یاد می‌گیرد", "A value the model learns from data"],
  ["ابرپارامتر", "Hyperparameter", "تنظیمی که پیش از آموزش انتخاب می‌شود", "A setting chosen before training"],
  ["بیش‌برازش", "Overfitting", "حفظ نویز داده آموزش", "Memorizing noise in the training data"],
  ["کم‌برازش", "Underfitting", "مدل بیش از حد ساده", "A model that is too simple"],
  ["نشت داده", "Data leakage", "ورود اطلاعات آزمون به آموزش", "Test information entering training"],
  ["منظم‌سازی", "Regularization", "جریمه پیچیدگی مدل", "A penalty on model complexity"],
  ["اعتبارسنجی متقابل", "Cross-validation", "ارزیابی روی چند تقسیم مختلف داده", "Evaluating over several data splits"],
  ["تابع هزینه", "Loss function", "اندازه خطای مدل", "A measure of the model's error"],
  ["گرادیان", "Gradient", "جهت بیشترین افزایش تابع", "The direction of steepest increase"],
  ["نرخ یادگیری", "Learning rate", "اندازه گام به‌روزرسانی", "The size of each update step"],
  ["دوره", "Epoch", "یک عبور کامل از داده", "One complete pass over the data"],
  ["دسته", "Batch", "گروه کوچک نمونه‌ها در هر گام", "A small group of samples per step"],
  ["پس‌انتشار", "Backpropagation", "محاسبه گرادیان با قاعده زنجیره‌ای", "Computing gradients with the chain rule"],
  ["کرنل", "Kernel", "ماتریس کوچک در CNN یا تابع شباهت در SVM", "A small matrix in CNNs or a similarity function in SVMs"],
  ["توکن", "Token", "واحد متن برای مدل زبانی", "A unit of text for a language model"],
  ["تابع عضویت", "Membership function", "نگاشت مقدار به درجه عضویت", "Maps a value to a degree of membership"],
  ["نفرین ابعاد", "Curse of dimensionality", "مشکلات ناشی از زیاد شدن ویژگی‌ها", "Problems caused by having many features"]
];
