X("dl-neuron", {
  fa: R`[[fig:activations.png|توابع فعال‌سازی پرکاربرد.]]

| تابع | بازه | محل استفاده | نکته |
|---|---|---|---|
| ReLU | $[0,\infty)$ | لایه پنهان | سریع؛ خطر مرگ نورون |
| Leaky ReLU | $(-\infty,\infty)$ | لایه پنهان | شیب کوچک در منفی‌ها |
| Sigmoid | $(0,1)$ | خروجی دودویی | محو گرادیان |
| Tanh | $(-1,1)$ | RNN | صفرمرکز |
| Softmax | جمع برابر ۱ | خروجی چندکلاسه | احتمال کلاس‌ها |

## انتخاب تابع خروجی و هزینه
| مسئله | خروجی | هزینه |
|---|---|---|
| رگرسیون | خطی | MSE |
| دودویی | Sigmoid | Binary Cross-Entropy |
| چندکلاسه | Softmax | Cross-Entropy |`,
  en: R`[[fig:activations.png|Common activation functions.]]

| Function | Range | Where | Note |
|---|---|---|---|
| ReLU | $[0,\infty)$ | Hidden layers | Fast; dying neurons risk |
| Leaky ReLU | $(-\infty,\infty)$ | Hidden layers | Small slope for negatives |
| Sigmoid | $(0,1)$ | Binary output | Vanishing gradients |
| Tanh | $(-1,1)$ | RNNs | Zero-centered |
| Softmax | Sums to 1 | Multi-class output | Class probabilities |

## Choosing output and loss
| Problem | Output | Loss |
|---|---|---|
| Regression | Linear | MSE |
| Binary | Sigmoid | Binary cross-entropy |
| Multi-class | Softmax | Cross-entropy |`
});

X("dl-mlp", {
  fa: R`## یک گام کامل با اعداد
نورون سیگموید با $x=1$، $y=1$، $w=0.5$، $b=0$ و نرخ یادگیری ۱:

| مرحله | محاسبه | نتیجه |
|---|---|---|
| امتیاز | $z=wx+b$ | 0.5 |
| خروجی | $\hat y=1/(1+e^{-z})$ | 0.6225 |
| خطا | $L=-\ln\hat y$ | 0.474 |
| گرادیان | $\partial L/\partial w=(\hat y-y)x$ | −0.3775 |
| به‌روزرسانی | $w\leftarrow w-\eta g$ | 0.8775 |

[[c:0]]

## تعداد پارامتر
شبکه‌ای با ورودی ۷۸۴، لایه پنهان ۱۲۸ و خروجی ۱۰: $(784\times128+128)+(128\times10+10)=101{,}770$ پارامتر دارد.`,
  en: R`## One full step with numbers
A sigmoid neuron with $x=1$, $y=1$, $w=0.5$, $b=0$ and learning rate 1:

| Stage | Calculation | Result |
|---|---|---|
| Score | $z=wx+b$ | 0.5 |
| Output | $\hat y=1/(1+e^{-z})$ | 0.6225 |
| Loss | $L=-\ln\hat y$ | 0.474 |
| Gradient | $\partial L/\partial w=(\hat y-y)x$ | −0.3775 |
| Update | $w\leftarrow w-\eta g$ | 0.8775 |

[[c:0]]

## Counting parameters
A network with 784 inputs, 128 hidden units and 10 outputs has $(784\times128+128)+(128\times10+10)=101{,}770$ parameters.`,
  code: [`import numpy as np\n\nx, y, w, b, lr = 1.0, 1.0, 0.5, 0.0, 1.0\nz = w * x + b\np = 1 / (1 + np.exp(-z))\nloss = -np.log(p)\ngrad = (p - y) * x\nprint(round(p, 4), round(loss, 3), round(grad, 4), round(w - lr * grad, 4))`]
});

X("dl-optim", {
  fa: R`[[fig:optim.gif|رفتار SGD، Momentum و Adam در یک دره باریک.]]

| بهینه‌ساز | ایده | پیش‌فرض رایج |
|---|---|---|
| SGD | گرادیان دسته کوچک | نرخ ۰٫۱ تا ۰٫۰۰۱ |
| Momentum | حرکت با اینرسی | ضریب ۰٫۹ |
| RMSProp | مقیاس با میانگین مربع گرادیان | نرخ ۰٫۰۰۱ |
| Adam | ترکیب هر دو | نرخ ۰٫۰۰۱ |

$$v_{t+1}=\beta v_t-\eta\nabla J,\quad \theta_{t+1}=\theta_t+v_{t+1}$$

## راهنمای کنترل بیش‌برازش
| ابزار | چگونه کمک می‌کند |
|---|---|
| Dropout | خاموشی تصادفی نورون‌ها |
| Weight Decay | جریمه وزن بزرگ |
| Early Stopping | توقف در بهترین اعتبارسنجی |
| Batch Norm | پایداری آموزش |
| Augmentation | داده متنوع‌تر |`,
  en: R`[[fig:optim.gif|SGD, Momentum and Adam in a narrow valley.]]

| Optimizer | Idea | Common default |
|---|---|---|
| SGD | Mini-batch gradient | Rate 0.1 to 0.001 |
| Momentum | Moves with inertia | Factor 0.9 |
| RMSProp | Scales by mean squared gradient | Rate 0.001 |
| Adam | Combines both | Rate 0.001 |

$$v_{t+1}=\beta v_t-\eta\nabla J,\quad \theta_{t+1}=\theta_t+v_{t+1}$$

## Guide to controlling overfitting
| Tool | How it helps |
|---|---|
| Dropout | Randomly silences neurons |
| Weight decay | Penalizes large weights |
| Early stopping | Stops at the best validation |
| Batch norm | Stabilizes training |
| Augmentation | More varied data |`
});

X("dl-cnn", {
  fa: R`[[fig:conv.gif|کرنل روی تصویر می‌لغزد و نقشه ویژگی ساخته می‌شود.]]

[[fig:filters.png|اثر فیلترهای لبه روی یک تصویر واقعی.]]

## محاسبه اندازه خروجی
$$n_{out}=\Big\lfloor\frac{n+2p-k}{s}\Big\rfloor+1$$

| لایه | پارامترها | خروجی برای تصویر ۲۸×۲۸ |
|---|---|---|
| Conv | k=3, p=1, s=1, 32 فیلتر | 28×28×32 |
| MaxPool | k=2, s=2 | 14×14×32 |
| Conv | k=3, p=1, s=1, 64 فیلتر | 14×14×64 |
| MaxPool | k=2, s=2 | 7×7×64 |

پارامتر یک لایه: $(k\times k\times C_{in}+1)\times C_{out}$؛ لایه اول $(3\times3\times1+1)\times32=320$ پارامتر دارد.

**Transfer Learning:** مدل از پیش‌آموخته‌ای مثل ResNet را بگیر و فقط لایه آخر را آموزش بده؛ برای داده کم بسیار مؤثر است.`,
  en: R`[[fig:conv.gif|A kernel slides over the image and creates a feature map.]]

[[fig:filters.png|Edge filters applied to a real photo.]]

## Output size
$$n_{out}=\Big\lfloor\frac{n+2p-k}{s}\Big\rfloor+1$$

| Layer | Settings | Output for a 28×28 image |
|---|---|---|
| Conv | k=3, p=1, s=1, 32 filters | 28×28×32 |
| MaxPool | k=2, s=2 | 14×14×32 |
| Conv | k=3, p=1, s=1, 64 filters | 14×14×64 |
| MaxPool | k=2, s=2 | 7×7×64 |

Parameters of a layer: $(k\times k\times C_{in}+1)\times C_{out}$; the first layer has $(3\times3\times1+1)\times32=320$.

**Transfer learning:** take a pretrained model such as ResNet and train only the last layer; it is very effective with little data.`
});

X("dl-rnn", {
  fa: R`## گیت‌های LSTM
| گیت | نقش |
|---|---|
| Forget | چه چیزی از حافظه حذف شود |
| Input | چه چیزی ذخیره شود |
| Output | چه چیزی خروجی شود |

## RNN، LSTM یا GRU؟
| مدل | حافظه بلند | پارامتر | چه زمانی |
|---|---|---|---|
| RNN | ضعیف | کم | دنباله کوتاه |
| LSTM | خوب | زیاد | دنباله بلند |
| GRU | خوب | متوسط | گزینه سبک‌تر |

!در سری زمانی همیشه با یک قاعده ساده مثل «مقدار ساعت قبل» مقایسه کن.`,
  en: R`## LSTM gates
| Gate | Role |
|---|---|
| Forget | What to drop from memory |
| Input | What to store |
| Output | What to emit |

## RNN, LSTM or GRU?
| Model | Long memory | Parameters | When |
|---|---|---|---|
| RNN | Weak | Few | Short sequences |
| LSTM | Good | Many | Long sequences |
| GRU | Good | Medium | A lighter choice |

!For time series, always compare with a simple rule such as "the previous value".`
});

X("dl-transformer", {
  fa: R`## اجزای Transformer
| جزء | نقش |
|---|---|
| Embedding | تبدیل توکن به بردار |
| Positional Encoding | افزودن اطلاعات ترتیب |
| Multi-Head Attention | چند نوع توجه موازی |
| Feed Forward | پردازش هر توکن |
| Residual و Layer Norm | آموزش پایدار شبکه عمیق |

در توجه، **Query** می‌پرسد، **Key** معرفی می‌کند و **Value** محتوا را می‌دهد. هرچه Query و Key شبیه‌تر باشند، وزن بیشتری می‌گیرند.`,
  en: R`## Parts of a Transformer
| Part | Role |
|---|---|
| Embedding | Token to vector |
| Positional encoding | Adds order information |
| Multi-head attention | Several kinds of attention in parallel |
| Feed forward | Processes each token |
| Residual and layer norm | Stable deep training |

In attention, a **query** asks, a **key** advertises and a **value** supplies content. The more similar a query and key, the higher the weight.`
});

X("fz-sets", {
  fa: R`[[fig:crisp.png|مرز تیز مجموعه کلاسیک در برابر انتقال تدریجی مجموعه فازی.]]

[[fig:mf.png|توابع عضویت رایج.]]

## فرمول توابع عضویت
| نام | فرمول |
|---|---|
| مثلثی | $\max(\min(\frac{x-a}{b-a},\frac{c-x}{c-b}),0)$ |
| گوسی | $e^{-(x-c)^2/2\sigma^2}$ |
| زنگوله‌ای | $1/(1+\vert \frac{x-c}{a}\vert ^{2b})$ |

[[fig:ops.png|عملگرهای AND، OR و NOT.]]`,
  en: R`[[fig:crisp.png|A classical set's sharp edge against a fuzzy set's gradual change.]]

[[fig:mf.png|Common membership functions.]]

## Membership formulas
| Name | Formula |
|---|---|
| Triangular | $\max(\min(\frac{x-a}{b-a},\frac{c-x}{c-b}),0)$ |
| Gaussian | $e^{-(x-c)^2/2\sigma^2}$ |
| Bell | $1/(1+\vert \frac{x-c}{a}\vert ^{2b})$ |

[[fig:ops.png|The AND, OR and NOT operators.]]`
});

X("fz-mamdani", {
  fa: R`## روش‌های نافازی‌سازی
[[fig:defuzz.png|مقایسه روش‌های نافازی‌سازی روی یک خروجی.]]

| روش | ایده | ویژگی |
|---|---|---|
| Centroid | مرکز ثقل | هموار، رایج |
| Bisector | تقسیم مساحت | نزدیک مرکز ثقل |
| MOM | میانگین بیشینه‌ها | سریع |
| SOM و LOM | ابتدای یا انتهای بیشینه | حساس |

[[fig:surface.png|سطح کنترلی: چند قاعده زبانی یک نگاشت غیرخطی می‌سازند.]]`,
  en: R`## Defuzzification methods
[[fig:defuzz.png|Comparing defuzzification methods on one output.]]

| Method | Idea | Property |
|---|---|---|
| Centroid | Center of gravity | Smooth, common |
| Bisector | Halves the area | Near centroid |
| MOM | Mean of maxima | Fast |
| SOM and LOM | Start or end of maxima | Sensitive |

[[fig:surface.png|A control surface: a few word rules form a non-linear mapping.]]`
});

X("fz-sugeno", {
  fa: R`| ویژگی | ممدانی | سوگنو |
|---|---|---|
| تالی قاعده | مجموعه فازی | تابع |
| نافازی‌سازی | مرکز ثقل | میانگین وزنی |
| تفسیرپذیری | زیاد | متوسط |
| محاسبات | زیاد | کم |
| آموزش با داده | دشوار | مناسب |`,
  en: R`| Property | Mamdani | Sugeno |
|---|---|---|
| Rule consequent | Fuzzy set | Function |
| Defuzzification | Centroid | Weighted average |
| Interpretability | High | Medium |
| Computation | Heavy | Light |
| Training on data | Difficult | Suitable |`
});

X("fz-anfis", {
  fa: R`## مثال لایه‌به‌لایه
با $x=3$ و $y=4$، توابع گوسی با $\sigma=2$ و مراکز A1=2، A2=6، B1=3، B2=7، و $f_1=0.5x+0.2y+1$ و $f_2=-0.3x+0.8y+2$:

| لایه | محاسبه | نتیجه |
|---|---|---|
| ۱ | درجه عضویت | μA1=μB1=0.882، μA2=μB2=0.325 |
| ۲ | ضرب | w1=0.779، w2=0.105 |
| ۳ | نرمال‌سازی | 0.881 و 0.119 |
| ۴ | خروجی قاعده | 0.881×3.3=2.907 و 0.119×4.3=0.513 |
| ۵ | جمع | 3.419 |

[[fig:anfis_mf.gif|تغییر توابع عضویت هنگام آموزش روی تابع sinc.]]

[[fig:anfis_surf.png|هدف، خروجی پیش از آموزش و خروجی پس از آموزش.]]

[[fig:anfis_curve.png|منحنی خطا و توابع عضویت پیش و پس از آموزش.]]

## تعداد پارامتر
با M تابع عضویت گوسی برای هر یک از n ورودی و تالی مرتبه اول:

| بخش | تعداد |
|---|---|
| قواعد | $M^n$ |
| مقدم | $2Mn$ |
| تالی | $(n+1)M^n$ |`,
  en: R`## Layer by layer
With $x=3$ and $y=4$, Gaussian functions with $\sigma=2$ and centers A1=2, A2=6, B1=3, B2=7, and $f_1=0.5x+0.2y+1$ and $f_2=-0.3x+0.8y+2$:

| Layer | Calculation | Result |
|---|---|---|
| 1 | Membership | μA1=μB1=0.882, μA2=μB2=0.325 |
| 2 | Product | w1=0.779, w2=0.105 |
| 3 | Normalization | 0.881 and 0.119 |
| 4 | Rule output | 0.881×3.3=2.907 and 0.119×4.3=0.513 |
| 5 | Sum | 3.419 |

[[fig:anfis_mf.gif|Membership functions evolving while training on the sinc function.]]

[[fig:anfis_surf.png|The target, the output before training, and after training.]]

[[fig:anfis_curve.png|The error curve and membership functions before and after training.]]

## Counting parameters
With M Gaussian functions for each of n inputs and first-order consequents:

| Part | Count |
|---|---|
| Rules | $M^n$ |
| Premise | $2Mn$ |
| Consequent | $(n+1)M^n$ |`
});
