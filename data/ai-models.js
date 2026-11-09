var FIT_REG = R`
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
X, y = load_diabetes(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
`.trim() + "\n\n";
var FIT_CLS = R`
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, stratify=y, random_state=0)
`.trim() + "\n\n";

M("ai", "regression", "رگرسیون", "Regression");

L({ id: "ai-datasets",
  fa: ["داده‌های این بخش‌ها", R`مثال‌ها از داده‌های آماده scikit-learn استفاده می‌کنند تا بدون دانلود، در مرورگر هم اجرا شوند.

- **Diabetes:** ۴۴۲ بیمار، ۱۰ ویژگی؛ پیش‌بینی شاخص پیشرفت بیماری (رگرسیون).
- **Breast Cancer:** ۵۶۹ نمونه، ۳۰ ویژگی؛ خوش‌خیم یا بدخیم (طبقه‌بندی).
- **Iris و Wine:** طبقه‌بندی چندکلاسه.
- **Digits:** تصاویر ۸ در ۸ از ارقام.`],
  en: ["Datasets used here", R`The examples use datasets bundled with scikit-learn, so they run in the browser with no download.

- **Diabetes:** 442 patients, 10 features; predicts a disease progression score (regression).
- **Breast Cancer:** 569 samples, 30 features; benign or malignant (classification).
- **Iris and Wine:** multi-class classification.
- **Digits:** 8×8 images of digits.`],
  code: [`from sklearn.datasets import load_diabetes\nimport pandas as pd\n\nd = load_diabetes(as_frame=True)\nprint(d.frame.shape)\nprint(d.frame.head(3).round(3))\nprint(d.frame.corr()["target"].sort_values().round(2))`]
});

L({ id: "ai-linear",
  fa: ["رگرسیون خطی", R`رگرسیون خطی خروجی را با ترکیب خطی ورودی‌ها تخمین می‌زند و وزن‌ها را طوری می‌یابد که مجموع مربع خطا کمینه شود.

$$\hat y=b_0+b_1x_1+\dots+b_px_p$$

روی بوم کلیک کن تا نقطه اضافه شود و ببین خط چگونه تغییر می‌کند. یک نقطه پرت هم بگذار!`],
  en: ["Linear regression", R`Linear regression estimates the output as a linear combination of inputs, choosing weights that minimize the squared error.

$$\hat y=b_0+b_1x_1+\dots+b_px_p$$

Click the canvas to add points and watch the line respond. Try adding an outlier!`],
  demo: "linreg",
  code: [FIT_REG + `from sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error, r2_score\nimport numpy as np\n\nmodel = LinearRegression().fit(X_tr, y_tr)\np = model.predict(X_te)\nprint("RMSE:", round(np.sqrt(mean_squared_error(y_te, p)), 2))\nprint("R2  :", round(r2_score(y_te, p), 3))`],
  quiz: [Q("رگرسیون خطی چه چیزی را کمینه می‌کند؟", "What does linear regression minimize?", ["مجموع مربع خطا", "تعداد ویژگی‌ها", "حجم داده"], ["The sum of squared errors", "The number of features", "The data size"], 0)]
});

L({ id: "ai-gd",
  fa: ["گرادیان کاهشی", R`گرادیان کاهشی با گام‌های کوچک در خلاف جهت گرادیان، کمینه تابع هزینه را پیدا می‌کند.

$$\theta_{t+1}=\theta_t-\eta\nabla J(\theta_t)$$

نرخ یادگیری $\eta$ را تغییر بده: خیلی کوچک کند است و خیلی بزرگ واگرا می‌شود.`],
  en: ["Gradient descent", R`Gradient descent finds the minimum of a cost function with small steps against the gradient.

$$\theta_{t+1}=\theta_t-\eta\nabla J(\theta_t)$$

Change the learning rate $\eta$: too small is slow, too large diverges.`],
  demo: "gd",
  code: [`import numpy as np\n\nrng = np.random.default_rng(0)\nx = rng.uniform(-1, 1, 100)\ny = 3 * x + 2 + rng.normal(0, 0.2, 100)\n\nw, b, lr = 0.0, 0.0, 0.1\nfor step in range(201):\n    e = (w * x + b) - y\n    w -= lr * 2 * np.mean(e * x)\n    b -= lr * 2 * np.mean(e)\n    if step % 50 == 0:\n        print(step, round(np.mean(e ** 2), 4), round(w, 3), round(b, 3))`]
});

L({ id: "ai-poly",
  fa: ["رگرسیون چندجمله‌ای", R`با افزودن توان ورودی‌ها رابطه منحنی را مدل می‌کنیم. مدل نسبت به وزن‌ها هنوز خطی است.

$$\hat y=b_0+b_1x+b_2x^2+\dots+b_dx^d$$

درجه را با اعتبارسنجی انتخاب کن.`],
  en: ["Polynomial regression", R`Adding powers of the inputs lets us model curves. The model is still linear in its weights.

$$\hat y=b_0+b_1x+b_2x^2+\dots+b_dx^d$$

Choose the degree with validation.`],
  demo: "poly",
  code: [`import numpy as np\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import PolynomialFeatures\n\nrng = np.random.default_rng(1)\nX = np.sort(rng.uniform(0, 1, 60)).reshape(-1, 1)\ny = np.sin(2 * np.pi * X.ravel()) + rng.normal(0, 0.2, 60)\n\nfor d in [1, 3, 5, 15]:\n    m = make_pipeline(PolynomialFeatures(d), LinearRegression())\n    s = -cross_val_score(m, X, y, cv=5, scoring="neg_root_mean_squared_error").mean()\n    print(f"degree {d:2d}: CV RMSE = {s:.3f}")`]
});

L({ id: "ai-regularized",
  fa: ["Ridge، Lasso و Elastic Net", R`منظم‌سازی با جریمه وزن‌ها جلوی بیش‌برازش را می‌گیرد.

$$Ridge:\ \sum(y-\hat y)^2+\alpha\sum w_j^2$$

$$Lasso:\ \tfrac{1}{2n}\sum(y-\hat y)^2+\alpha\sum|w_j|$$

- **Ridge** وزن‌ها را کوچک می‌کند و برای ویژگی‌های هم‌بسته خوب است.
- **Lasso** بعضی وزن‌ها را دقیقاً صفر می‌کند و ویژگی انتخاب می‌کند.
- **Elastic Net** ترکیب هر دو است.

ورودی‌ها باید مقیاس‌بندی شوند.`],
  en: ["Ridge, Lasso and Elastic Net", R`Regularization penalizes weights to prevent overfitting.

$$Ridge:\ \sum(y-\hat y)^2+\alpha\sum w_j^2$$

$$Lasso:\ \tfrac{1}{2n}\sum(y-\hat y)^2+\alpha\sum|w_j|$$

- **Ridge** shrinks weights and suits correlated features.
- **Lasso** sets some weights exactly to zero, selecting features.
- **Elastic Net** combines both.

Inputs must be scaled.`],
  code: [FIT_REG + `import numpy as np\nfrom sklearn.linear_model import ElasticNet, Lasso, LinearRegression, Ridge\nfrom sklearn.metrics import mean_squared_error\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\n\nmodels = {"OLS": LinearRegression(), "Ridge": Ridge(alpha=10), "Lasso": Lasso(alpha=1), "ElasticNet": ElasticNet(alpha=0.5, l1_ratio=0.5)}\nfor name, reg in models.items():\n    m = make_pipeline(StandardScaler(), reg).fit(X_tr, y_tr)\n    rmse = np.sqrt(mean_squared_error(y_te, m.predict(X_te)))\n    nz = int(np.sum(np.abs(m[-1].coef_) > 1e-8))\n    print(f"{name:11s} RMSE={rmse:.2f} non-zero weights={nz}")`],
  quiz: [Q("کدام روش می‌تواند وزن‌ها را دقیقاً صفر کند؟", "Which can set weights exactly to zero?", ["Ridge", "Lasso", "OLS"], null, 1)]
});

L({ id: "ai-reg-nonlinear",
  fa: ["SVR، درخت، جنگل و KNN رگرسیونی", R`- **SVR:** خطای داخل لوله‌ای به عرض $\varepsilon$ را نادیده می‌گیرد.
- **درخت رگرسیونی:** هر برگ میانگین نمونه‌هایش را پیش‌بینی می‌کند.
- **جنگل تصادفی:** میانگین درخت‌های متنوع.
- **KNN رگرسیونی:** میانگین k همسایه نزدیک.

همیشه با مدل خطی ساده مقایسه کن.`],
  en: ["SVR, tree, forest and KNN regression", R`- **SVR:** ignores errors inside a tube of width $\varepsilon$.
- **Regression tree:** each leaf predicts the mean of its samples.
- **Random forest:** the average of diverse trees.
- **KNN regression:** the mean of k nearest neighbors.

Always compare with a simple linear model.`],
  code: [FIT_REG + `import numpy as np\nfrom sklearn.ensemble import RandomForestRegressor\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error\nfrom sklearn.neighbors import KNeighborsRegressor\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.svm import SVR\nfrom sklearn.tree import DecisionTreeRegressor\n\nmodels = {\n    "Linear": LinearRegression(),\n    "SVR": make_pipeline(StandardScaler(), SVR(C=100, gamma=0.05)),\n    "Tree": DecisionTreeRegressor(max_depth=3, random_state=0),\n    "Forest": RandomForestRegressor(200, min_samples_leaf=3, random_state=0),\n    "KNN": make_pipeline(StandardScaler(), KNeighborsRegressor(15)),\n}\nfor name, m in models.items():\n    print(f"{name:7s} RMSE = {np.sqrt(mean_squared_error(y_te, m.fit(X_tr, y_tr).predict(X_te))):.2f}")`]
});

M("ai", "classification", "طبقه‌بندی", "Classification");

L({ id: "ai-logistic",
  fa: ["رگرسیون لجستیک", R`با وجود نامش، برای طبقه‌بندی است. امتیاز خطی با تابع سیگموید به احتمال تبدیل می‌شود.

$$P(y=1|x)=\frac{1}{1+e^{-(w^Tx+b)}}$$

آستانه تصمیم به‌طور پیش‌فرض ۰٫۵ است و می‌تواند بر اساس هزینه خطاها تغییر کند.`],
  en: ["Logistic regression", R`Despite its name, it is for classification. A linear score becomes a probability through the sigmoid function.

$$P(y=1|x)=\frac{1}{1+e^{-(w^Tx+b)}}$$

The decision threshold defaults to 0.5 and can move according to the cost of errors.`],
  demo: "sigmoid",
  code: [FIT_CLS + `from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import classification_report\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\n\nm = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)).fit(X_tr, y_tr)\nprint(classification_report(y_te, m.predict(X_te), digits=3))\nprint(m.predict_proba(X_te[:3]).round(3))`]
});

L({ id: "ai-knn",
  fa: ["K نزدیک‌ترین همسایه", R`نمونه جدید با رأی k همسایه نزدیک برچسب می‌گیرد. ایده ساده است، ولی مقیاس‌بندی ضروری است. k کوچک به نویز حساس و k بزرگ بیش از حد هموار است.

روی بوم کلیک کن تا نقطه جدید بگذاری و با اسلایدر k مرز را ببین.`],
  en: ["K-nearest neighbors", R`A new sample takes the majority vote of its k nearest neighbors. The idea is simple but scaling is essential. Small k is noise-sensitive and large k is overly smooth.

Click the canvas to place a query and use the k slider to see the boundary.`],
  demo: "knn",
  code: [`from sklearn.datasets import load_wine\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\n\nX, y = load_wine(return_X_y=True)\nfor k in [1, 3, 5, 15, 45]:\n    raw = cross_val_score(KNeighborsClassifier(k), X, y, cv=5).mean()\n    scaled = cross_val_score(make_pipeline(StandardScaler(), KNeighborsClassifier(k)), X, y, cv=5).mean()\n    print(f"k={k:2d} raw={raw:.3f} scaled={scaled:.3f}")`]
});

L({ id: "ai-nb",
  fa: ["بیز ساده", R`بیز ساده با قضیه بیز احتمال هر کلاس را حساب می‌کند و فرض می‌کند ویژگی‌ها به شرط کلاس مستقل‌اند. این فرض ساده است، ولی مدل سریع است و برای متن و داده کم خوب کار می‌کند.

$$P(c|x)\propto P(c)\prod_i P(x_i|c)$$`],
  en: ["Naive Bayes", R`Naive Bayes computes each class's probability with Bayes' theorem, assuming that features are independent given the class. The assumption is simple, but the model is fast and works well on text and small data.

$$P(c|x)\propto P(c)\prod_i P(x_i|c)$$`],
  code: [FIT_CLS + `from sklearn.naive_bayes import GaussianNB\n\nm = GaussianNB().fit(X_tr, y_tr)\nprint("Test accuracy:", round(m.score(X_te, y_te), 3))`]
});

L({ id: "ai-trees",
  fa: ["درخت تصمیم", R`درخت با پرسش‌های پی‌درپی داده را تقسیم می‌کند و معیارهایی مثل **Gini** خلوص گروه‌ها را می‌سنجند.

$$Gini=1-\sum_k p_k^2$$

درخت تفسیرپذیر است و به مقیاس‌بندی نیاز ندارد، ولی بدون محدودیت عمق به‌راحتی بیش‌برازش می‌کند.`],
  en: ["Decision trees", R`A tree splits data with a series of questions, and criteria such as **Gini** measure group purity.

$$Gini=1-\sum_k p_k^2$$

Trees are interpretable and need no scaling, but with unlimited depth they easily overfit.`],
  code: [`from sklearn.datasets import load_iris\nfrom sklearn.tree import DecisionTreeClassifier, export_text\n\nd = load_iris()\nm = DecisionTreeClassifier(max_depth=2, random_state=0).fit(d.data, d.target)\nprint(export_text(m, feature_names=list(d.feature_names)))`]
});

L({ id: "ai-ensembles",
  fa: ["جنگل تصادفی و Boosting", R`**یادگیری جمعی** چند مدل را ترکیب می‌کند.

- **Bagging و جنگل تصادفی:** درخت‌های مستقل روی نمونه‌های تصادفی؛ واریانس را کم می‌کند.
- **Boosting:** هر مدل خطای مدل‌های قبلی را اصلاح می‌کند؛ مانند Gradient Boosting، XGBoost و LightGBM.

روی داده جدولی، این روش‌ها یکی از قوی‌ترین گزینه‌ها هستند.`],
  en: ["Random forests and boosting", R`**Ensemble learning** combines several models.

- **Bagging and random forests:** independent trees on random samples, reducing variance.
- **Boosting:** each model corrects the errors of earlier ones, as in Gradient Boosting, XGBoost and LightGBM.

On tabular data, these are among the strongest options.`],
  code: [FIT_CLS + `from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier\nfrom sklearn.tree import DecisionTreeClassifier\n\nfor name, m in [("Tree", DecisionTreeClassifier(random_state=0)), ("Forest", RandomForestClassifier(200, random_state=0)), ("Boosting", GradientBoostingClassifier(random_state=0))]:\n    print(name, round(m.fit(X_tr, y_tr).score(X_te, y_te), 3))`],
  quiz: [Q("در Boosting مدل‌ها چگونه ساخته می‌شوند؟", "How are boosting models built?", ["پشت سر هم، برای اصلاح خطای قبلی", "کاملاً مستقل", "فقط یک مدل ساخته می‌شود"], ["In sequence, correcting earlier errors", "Fully independently", "Only one model is built"], 0)]
});

L({ id: "ai-svm",
  fa: ["ماشین بردار پشتیبان", R`SVM مرزی با بیشترین حاشیه پیدا می‌کند و فقط **بردارهای پشتیبان** آن را تعیین می‌کنند. ترفند کرنل مرز غیرخطی می‌سازد. ~C~ تحمل خطا و ~gamma~ دامنه اثر هر نمونه را تنظیم می‌کند.`],
  en: ["Support vector machines", R`An SVM finds the boundary with the largest margin, and only the **support vectors** determine it. The kernel trick makes curved boundaries. ~C~ sets error tolerance and ~gamma~ sets each sample's reach.`],
  code: [`from sklearn.datasets import load_digits\nfrom sklearn.model_selection import GridSearchCV, train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.svm import SVC\n\nX, y = load_digits(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=0)\ngrid = GridSearchCV(make_pipeline(StandardScaler(), SVC()), {"svc__C": [1, 10], "svc__gamma": ["scale", 0.01]}, cv=3).fit(X_tr, y_tr)\nprint(grid.best_params_)\nprint("Test accuracy:", round(grid.score(X_te, y_te), 3))`]
});

M("ai", "unsupervised", "یادگیری بدون نظارت", "Unsupervised learning");

L({ id: "ai-kmeans",
  fa: ["K-Means", R`دو مرحله تکرار می‌شود: هر نقطه به نزدیک‌ترین مرکز می‌رود و مرکز به میانگین نقطه‌هایش منتقل می‌شود.

$$J=\sum_{j=1}^{k}\sum_{x\in C_j}\|x-\mu_j\|^2$$

با دکمه «گام بعد» الگوریتم را مرحله‌به‌مرحله ببین.`],
  en: ["K-Means", R`Two steps repeat: each point joins its nearest center, and each center moves to the mean of its points.

$$J=\sum_{j=1}^{k}\sum_{x\in C_j}\|x-\mu_j\|^2$$

Use Next step to watch the algorithm in action.`],
  demo: "kmeans",
  code: [`from sklearn.cluster import KMeans\nfrom sklearn.datasets import load_iris\nfrom sklearn.metrics import silhouette_score\nfrom sklearn.preprocessing import StandardScaler\n\nX = StandardScaler().fit_transform(load_iris().data)\nfor k in range(2, 7):\n    m = KMeans(k, n_init=10, random_state=0).fit(X)\n    print(k, "WCSS", round(m.inertia_, 1), "silhouette", round(silhouette_score(X, m.labels_), 3))`]
});

L({ id: "ai-hier-dbscan",
  fa: ["خوشه‌بندی سلسله‌مراتبی و DBSCAN", R`- **سلسله‌مراتبی:** خوشه‌ها را مرحله‌به‌مرحله ادغام می‌کند و نتیجه را با دندروگرام نشان می‌دهد.
- **DBSCAN:** ناحیه‌های چگال را خوشه می‌داند، شکل دلخواه را پیدا می‌کند و نویز را جدا می‌کند. ~eps~ و ~min_samples~ پارامترهای اصلی‌اند.`],
  en: ["Hierarchical clustering and DBSCAN", R`- **Hierarchical:** merges clusters step by step and shows the result as a dendrogram.
- **DBSCAN:** treats dense regions as clusters, finds arbitrary shapes and isolates noise. ~eps~ and ~min_samples~ are its main parameters.`],
  code: [`import matplotlib.pyplot as plt\nfrom sklearn.cluster import AgglomerativeClustering, DBSCAN, KMeans\nfrom sklearn.datasets import make_moons\n\nX, _ = make_moons(300, noise=0.06, random_state=0)\nmodels = [("KMeans", KMeans(2, n_init=10, random_state=0)), ("Ward", AgglomerativeClustering(2)), ("DBSCAN", DBSCAN(eps=0.2, min_samples=5))]\nfig, ax = plt.subplots(1, 3, figsize=(10, 3))\nfor a, (name, m) in zip(ax, models):\n    a.scatter(X[:, 0], X[:, 1], c=m.fit_predict(X), s=12, cmap="viridis")\n    a.set_title(name)\nplt.show()`]
});

L({ id: "ai-pca",
  fa: ["PCA و کاهش بعد", R`PCA جهت‌هایی با بیشترین واریانس پیدا می‌کند و داده را روی چند جهت اول تصویر می‌کند. برای نمایش، فشرده‌سازی و کاهش هم‌خطی مفید است. PCA برچسب‌ها را نمی‌بیند.

زاویه محور را تغییر بده و ببین در کدام جهت واریانس بیشینه می‌شود.`],
  en: ["PCA and dimensionality reduction", R`PCA finds the directions of maximum variance and projects data onto the first few. It helps visualization, compression and reducing collinearity. PCA ignores labels.

Rotate the axis and see which direction maximizes the variance.`],
  demo: "pca",
  code: [`import numpy as np\nfrom sklearn.datasets import load_digits\nfrom sklearn.decomposition import PCA\nfrom sklearn.preprocessing import StandardScaler\n\nX = StandardScaler().fit_transform(load_digits().data)\np = PCA().fit(X)\ncum = np.cumsum(p.explained_variance_ratio_)\nprint("Components for 95%:", int(np.searchsorted(cum, 0.95) + 1), "of", X.shape[1])\nprint("First 3 ratios:", p.explained_variance_ratio_[:3].round(3))`]
});
