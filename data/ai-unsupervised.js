// Unsupervised learning, one lesson per method.
DROP("ai-hier-dbscan");
M("ai", "unsupervised");

L({ id: "ai-unsup-what", before: "ai-kmeans",
  fa: ["یادگیری بدون ناظر چیست؟", R`## ایده در یک نگاه
در یادگیری **بدون ناظر** برچسب نداریم؛ فقط داده. هدف کشف **ساختار پنهان** است:

| کار | سؤال | روش‌ها |
|---|---|---|
| خوشه‌بندی | کدام نمونه‌ها شبیه هم‌اند؟ | K-Means، سلسله‌مراتبی، DBSCAN، GMM |
| کاهش بعد | چطور داده را با ویژگی کمتر نشان دهیم؟ | PCA، t-SNE |
| تشخیص ناهنجاری | کدام نمونه‌ها عجیب‌اند؟ | Isolation Forest، LOF |

[[fig:ch5_unsup.png|یادگیری بدون ناظر: گروه‌ها را بدون برچسب پیدا می‌کنیم.]]

## کاربردها
- **بخش‌بندی مشتری:** گروه‌های مشتری با رفتار خرید مشابه برای تبلیغ هدفمند.
- **فشرده‌سازی تصویر:** هر پیکسل با رنگ مرکز خوشه‌اش.
- **پیشنهاددهی:** کاربران مشابه.
- **کشف تقلب:** تراکنش‌هایی که به هیچ گروهی نمی‌خورند.
- **پیش‌پردازش:** کاهش بعد قبل از مدل نظارتی.

## خوشه‌بندی خوب یعنی چه؟
- نمونه‌های **یک خوشه به هم نزدیک** (فشردگی).
- **خوشه‌های مختلف از هم دور** (جدایی).

| معیار | بدون برچسب واقعی؟ | بهتر |
|---|---|---|
| WCSS (اینرسی) | بله | کمتر (ولی با k بیشتر همیشه کم می‌شود) |
| سیلوئت | بله | نزدیک ۱ |
| Davies-Bouldin | بله | کمتر |
| ARI | خیر، برچسب لازم است | نزدیک ۱ |

## انتخاب روش
| شکل داده | روش مناسب |
|---|---|
| خوشه‌های گرد و هم‌اندازه، k معلوم | K-Means |
| می‌خواهی سلسله‌مراتب را ببینی، داده کم | سلسله‌مراتبی |
| شکل‌های دلخواه و نویز | DBSCAN |
| خوشه‌های بیضوی و عضویت نرم | GMM |

[[fig:kmeans_vs_dbscan.png|K-Means خوشه‌های گرد فرض می‌کند و هلال‌ها را اشتباه می‌بُرد؛ DBSCAN شکل را دنبال می‌کند و نویز را جدا می‌کند.]]

!همه روش‌های مبتنی بر فاصله به **مقیاس‌بندی** نیاز دارند.`],
  en: ["What is unsupervised learning?", R`## The idea in one look
In **unsupervised** learning there are no labels, only data. The goal is to discover **hidden structure**:

| Task | Question | Methods |
|---|---|---|
| Clustering | Which samples are alike? | K-Means, hierarchical, DBSCAN, GMM |
| Dimensionality reduction | How can we show the data with fewer features? | PCA, t-SNE |
| Anomaly detection | Which samples are strange? | Isolation Forest, LOF |

[[fig:ch5_unsup.png|Unsupervised learning: we find groups without labels.]]

## Uses
- **Customer segmentation:** groups of customers with similar buying habits, for targeted marketing.
- **Image compression:** each pixel replaced by its cluster center's color.
- **Recommendation:** similar users.
- **Fraud detection:** transactions that fit no group.
- **Preprocessing:** reduce dimensions before a supervised model.

## What makes a good clustering?
- Samples **in one cluster are close** (compactness).
- **Different clusters are far apart** (separation).

| Measure | Without true labels? | Better |
|---|---|---|
| WCSS (inertia) | Yes | Lower (but always drops as k grows) |
| Silhouette | Yes | Close to 1 |
| Davies-Bouldin | Yes | Lower |
| ARI | No, labels needed | Close to 1 |

## Choosing a method
| Shape of the data | Suitable method |
|---|---|
| Round, similar-size clusters, known k | K-Means |
| You want to see the hierarchy, little data | Hierarchical |
| Arbitrary shapes and noise | DBSCAN |
| Elliptical clusters and soft membership | GMM |

[[fig:kmeans_vs_dbscan.png|K-Means assumes round clusters and cuts the moons wrongly; DBSCAN follows the shape and separates the noise.]]

!All distance-based methods need **scaling**.`]
});

L({ id: "ai-hier", after: "ai-kmeans",
  fa: ["خوشه‌بندی سلسله‌مراتبی", R`## ایده در یک نگاه
خوشه‌بندی **تجمعی** (agglomerative) از پایین شروع می‌کند: هر نقطه یک خوشه است. در هر گام **دو خوشه نزدیک‌تر** را ادغام می‌کند تا همه یکی شوند. نتیجه یک درخت به نام **دندروگرام** است که نشان می‌دهد چه چیزی، کی و در چه فاصله‌ای ادغام شد. k را بعداً با **بریدن** دندروگرام انتخاب می‌کنیم.

[[fig:hier_dendro.png|چپ: ۱۴ نقطه. راست: دندروگرام؛ ارتفاع هر اتصال فاصله ادغام است. برش در خط قرمز سه خوشه می‌دهد.]]

## الگوریتم
- ماتریس فاصله همه جفت نقاط را بساز.
- دو خوشه با کمترین فاصله را ادغام کن.
- فاصله خوشه جدید تا بقیه را به‌روز کن (طبق روش پیوند).
- تا وقتی یک خوشه بماند تکرار کن.

## فاصله دو خوشه: روش پیوند
| پیوند | فاصله دو خوشه A و B | ویژگی |
|---|---|---|
| single | نزدیک‌ترین جفت | زنجیره‌ای؛ شکل‌های دراز را می‌گیرد |
| complete | دورترین جفت | خوشه‌های فشرده و هم‌قطر |
| average | میانگین همه جفت‌ها | میانه دو تای قبل |
| ward | افزایش واریانس درون‌خوشه‌ای | مثل K-Means؛ پیش‌فرض sklearn |

[[fig:hier_linkage.png|چهار روش پیوند روی هلال‌ها: فقط single شکل را درست دنبال می‌کند.]]

## مثال عددی
نقاط یک‌بعدی ۱، ۲، ۶، ۱۰، ۱۱ با پیوند single:

| گام | ادغام | فاصله |
|---|---|---|
| ۱ | {1} و {2} | 1 |
| ۲ | {10} و {11} | 1 |
| ۳ | {1,2} و {6} | 4 |
| ۴ | {1,2,6} و {10,11} | 4 |

برش در ارتفاع ۲ ← سه خوشه: {1,2}، {6}، {10,11}.

[[c:0]]

[[lab:hier]]

در آزمایشگاه روش پیوند را عوض کن و ببین دندروگرام و خوشه‌ها چطور تغییر می‌کنند.

[[c:1]]

| مزایا | معایب |
|---|---|
| لازم نیست k از قبل معلوم باشد | کند: حافظه $O(n^2)$؛ برای بیش از چند ده هزار نمونه مناسب نیست |
| دندروگرام ساختار را نشان می‌دهد | ادغام‌ها برگشت‌ناپذیرند |
| هر معیار فاصله‌ای | حساس به نویز (به‌خصوص single) |`],
  en: ["Hierarchical clustering", R`## The idea in one look
**Agglomerative** clustering starts from the bottom: every point is its own cluster. Each step **merges the two closest clusters** until only one remains. The result is a tree called a **dendrogram** that shows what merged, when, and at what distance. We choose k afterwards by **cutting** the dendrogram.

[[fig:hier_dendro.png|Left: 14 points. Right: the dendrogram; the height of each link is the merge distance. Cutting at the red line gives three clusters.]]

## The algorithm
- Build the distance matrix of all pairs of points.
- Merge the two clusters with the smallest distance.
- Update the distances from the new cluster to the others (by the linkage rule).
- Repeat until one cluster remains.

## The distance between two clusters: linkage
| Linkage | Distance between A and B | Behavior |
|---|---|---|
| single | Closest pair | Chaining; captures long shapes |
| complete | Farthest pair | Compact clusters of similar diameter |
| average | Mean of all pairs | Between the two above |
| ward | Increase of within-cluster variance | Like K-Means; scikit-learn's default |

[[fig:hier_linkage.png|Four linkages on the moons: only single follows the shapes correctly.]]

## A worked example
1-D points 1, 2, 6, 10, 11 with single linkage:

| Step | Merge | Distance |
|---|---|---|
| 1 | {1} and {2} | 1 |
| 2 | {10} and {11} | 1 |
| 3 | {1,2} and {6} | 4 |
| 4 | {1,2,6} and {10,11} | 4 |

Cutting at height 2 gives three clusters: {1,2}, {6}, {10,11}.

[[c:0]]

[[lab:hier]]

In the lab, switch the linkage and watch how the dendrogram and the clusters change.

[[c:1]]

| Pros | Cons |
|---|---|
| No need to know k in advance | Slow: $O(n^2)$ memory; not for more than tens of thousands of samples |
| The dendrogram shows the structure | Merges cannot be undone |
| Any distance measure | Sensitive to noise (especially single) |`],
  code: [`import numpy as np
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import dendrogram, fcluster, linkage

x = np.array([[1], [2], [6], [10], [11]])
Z = linkage(x, method="single")
print("Each row: cluster a, cluster b, distance, size")
print(Z)
print("Cut at height 2:", fcluster(Z, t=2, criterion="distance"))
dendrogram(Z, labels=[1, 2, 6, 10, 11])
plt.axhline(2, color="r", ls="--"); plt.title("Single linkage"); plt.show()`,
`from sklearn.cluster import AgglomerativeClustering
from sklearn.datasets import load_iris
from sklearn.metrics import adjusted_rand_score, silhouette_score
from sklearn.preprocessing import StandardScaler

iris = load_iris()
X = StandardScaler().fit_transform(iris.data)
for link in ["single", "complete", "average", "ward"]:
    labels = AgglomerativeClustering(n_clusters=3, linkage=link).fit_predict(X)
    print(f"{link:8s} silhouette={silhouette_score(X, labels):.3f}  ARI vs species={adjusted_rand_score(iris.target, labels):.3f}")`],
  ex: [E("مثال عددی را با پیوند complete تکرار کن. ترتیب ادغام‌ها و فاصله‌ها چه تغییری می‌کند؟", "Repeat the worked example with complete linkage. How do the merges and distances change?",
    `import numpy as np\nfrom scipy.cluster.hierarchy import linkage\nprint(linkage(np.array([[1], [2], [6], [10], [11]]), method="complete"))`, "دو ادغام اول یکسان‌اند، ولی {1,2} با {6} در فاصله ۵ ادغام می‌شود (دورترین جفت) و ادغام آخر در فاصله ۱۰.", "The first two merges are the same, but {1,2} joins {6} at distance 5 (the farthest pair) and the last merge happens at 10.")],
  quiz: [Q("کدام پیوند خوشه‌های زنجیره‌ای و دراز می‌سازد؟", "Which linkage creates chain-like long clusters?", ["single", "complete", "ward"], ["single", "complete", "ward"], 0)]
});

L({ id: "ai-dbscan", after: "ai-hier",
  fa: ["DBSCAN: خوشه‌بندی بر اساس چگالی", R`## ایده در یک نگاه
خوشه یعنی **ناحیه پرتراکم** از نقاط که با ناحیه کم‌تراکم از بقیه جدا شده است. DBSCAN لازم نیست k را بداند، خوشه‌هایی با **هر شکلی** پیدا می‌کند و نقاط تنها را **نویز** اعلام می‌کند.

## دو پارامتر و سه نوع نقطه
- ~eps~ ($\varepsilon$): شعاع همسایگی.
- ~min_samples~: حداقل تعداد نقطه در همسایگی (شامل خود نقطه).

| نوع | تعریف |
|---|---|
| **هسته** | حداقل ~min_samples~ نقطه در شعاع eps دارد |
| **مرزی** | هسته نیست ولی در همسایگی یک نقطه هسته است |
| **نویز** | نه هسته است، نه مرزی |

## الگوریتم
- یک نقطه هسته که هنوز برچسب ندارد پیدا کن؛ خوشه جدید بساز.
- همه نقاطی که از آن با زنجیره‌ای از نقاط هسته (هر گام کمتر از eps) قابل دسترسی‌اند به همین خوشه بده.
- تکرار کن؛ نقاط باقی‌مانده نویزند.

[[lab:dbscan]]

## مثال عددی
نقاط یک‌بعدی ۱، ۲، ۳، ۸، ۹، ۲۰ با $\varepsilon=1.5$ و min_samples = 2:

| نقطه | همسایه‌ها در شعاع 1.5 | نوع |
|---|---|---|
| 1 | 1، 2 | هسته |
| 2 | 1، 2، 3 | هسته |
| 3 | 2، 3 | هسته |
| 8 | 8، 9 | هسته |
| 9 | 8، 9 | هسته |
| 20 | 20 | **نویز** |

دو خوشه: {1,2,3} و {8,9}؛ و ۲۰ نویز است.

[[c:0]]

[[fig:dbscan_eps.png|eps خیلی کوچک: همه چیز نویز. مناسب: دو هلال. خیلی بزرگ: همه یک خوشه.]]

## انتخاب eps: نمودار k-فاصله
برای هر نقطه فاصله تا k‌امین همسایه (k = min_samples) را حساب کن، مرتب کن و رسم کن. جایی که نمودار ناگهان بالا می‌رود (**زانو**) مقدار خوبی برای eps است.

[[c:1]]

| مزایا | معایب |
|---|---|
| شکل دلخواه | خوشه‌هایی با چگالی متفاوت را خوب جدا نمی‌کند |
| تشخیص نویز | حساس به eps |
| بدون نیاز به k | در ابعاد بالا ضعیف |

!برای چگالی‌های متفاوت، ~HDBSCAN~ (در sklearn از نسخه 1.3) را امتحان کن؛ eps لازم ندارد.`],
  en: ["DBSCAN: density-based clustering", R`## The idea in one look
A cluster is a **dense region** of points separated from others by sparse regions. DBSCAN does not need k, finds clusters of **any shape**, and labels lonely points as **noise**.

## Two parameters and three kinds of points
- ~eps~ ($\varepsilon$): the neighborhood radius.
- ~min_samples~: the minimum number of points in the neighborhood (including the point itself).

| Kind | Definition |
|---|---|
| **Core** | Has at least ~min_samples~ points within eps |
| **Border** | Not core, but in the neighborhood of a core point |
| **Noise** | Neither core nor border |

## The algorithm
- Find an unlabeled core point; start a new cluster.
- Add every point reachable from it through a chain of core points (each step shorter than eps).
- Repeat; the remaining points are noise.

[[lab:dbscan]]

## A worked example
1-D points 1, 2, 3, 8, 9, 20 with $\varepsilon=1.5$ and min_samples = 2:

| Point | Neighbors within 1.5 | Kind |
|---|---|---|
| 1 | 1, 2 | Core |
| 2 | 1, 2, 3 | Core |
| 3 | 2, 3 | Core |
| 8 | 8, 9 | Core |
| 9 | 8, 9 | Core |
| 20 | 20 | **Noise** |

Two clusters: {1,2,3} and {8,9}; 20 is noise.

[[c:0]]

[[fig:dbscan_eps.png|eps too small: everything is noise. Right size: two moons. Too large: one cluster.]]

## Choosing eps: the k-distance plot
For every point, compute the distance to its k-th neighbor (k = min_samples), sort and plot. Where the curve suddenly rises (the **knee**) is a good eps.

[[c:1]]

| Pros | Cons |
|---|---|
| Any shape | Struggles with clusters of different densities |
| Detects noise | Sensitive to eps |
| No k needed | Weak in high dimensions |

!For varying densities, try ~HDBSCAN~ (in scikit-learn since 1.3); it needs no eps.`],
  code: [`import numpy as np
from sklearn.cluster import DBSCAN

x = np.array([[1], [2], [3], [8], [9], [20]])
db = DBSCAN(eps=1.5, min_samples=2).fit(x)
print("labels (-1 = noise):", db.labels_)
print("core points:", x[db.core_sample_indices_].ravel())`,
`import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import DBSCAN
from sklearn.datasets import make_moons
from sklearn.neighbors import NearestNeighbors

X, _ = make_moons(300, noise=0.07, random_state=0)
k = 5
dist, _ = NearestNeighbors(n_neighbors=k).fit(X).kneighbors(X)
d = np.sort(dist[:, -1])
plt.plot(d); plt.ylabel(f"distance to neighbor {k}"); plt.xlabel("points, sorted"); plt.title("k-distance plot: look for the knee"); plt.show()

for eps in [0.05, 0.1, 0.2, 0.5]:
    lab = DBSCAN(eps=eps, min_samples=k).fit_predict(X)
    print(f"eps={eps}: clusters={lab.max() + 1}, noise={np.sum(lab == -1)}")`],
  ex: [E("HDBSCAN را روی همان داده هلال‌ها امتحان کن.", "Try HDBSCAN on the same moons data.",
    `import numpy as np\nfrom sklearn.cluster import HDBSCAN\nfrom sklearn.datasets import make_moons\nX, _ = make_moons(300, noise=0.07, random_state=0)\nlab = HDBSCAN(min_cluster_size=10).fit_predict(X)\nprint("clusters:", lab.max() + 1, " noise:", np.sum(lab == -1))`)],
  quiz: [Q("نقطه‌ای که هسته نیست ولی همسایه یک نقطه هسته است:", "A point that is not core but neighbors a core point is:", ["مرزی", "نویز", "مرکز"], ["Border", "Noise", "A center"], 0)]
});

L({ id: "ai-gmm", after: "ai-dbscan",
  fa: ["مدل مخلوط گاوسی (GMM)", R`## ایده در یک نگاه
فرض می‌کنیم داده از **چند توزیع نرمال (گاوسی)** آمده است؛ هر خوشه یک گاوسی با میانگین $\mu_k$، ماتریس کوواریانس $\Sigma_k$ (شکل و جهت بیضی) و وزن $\pi_k$:

$$p(\mathbf x)=\sum_{k=1}^{K}\pi_k\,\mathcal N(\mathbf x\mid\mu_k,\Sigma_k)$$

برخلاف K-Means که هر نقطه را **قطعاً** به یک خوشه می‌دهد، GMM **احتمال عضویت** می‌دهد (خوشه‌بندی نرم)؛ و خوشه‌ها می‌توانند **بیضوی و کشیده** باشند.

[[fig:gmm.png|K-Means خوشه‌های گرد و برچسب قطعی؛ GMM بیضی‌های کشیده و رنگ‌های ترکیبی (عضویت نرم).]]

## الگوریتم EM
دو گام تکرار می‌شوند:
- **E (امید):** برای هر نقطه احتمال عضویت در هر مؤلفه: $r_{ik}=\frac{\pi_k\mathcal N(x_i\mid\mu_k,\Sigma_k)}{\sum_j\pi_j\mathcal N(x_i\mid\mu_j,\Sigma_j)}$
- **M (بیشینه‌سازی):** با این وزن‌ها پارامترها را دوباره حساب کن: $\mu_k=\frac{\sum_ir_{ik}x_i}{\sum_ir_{ik}}$، $\pi_k=\frac1n\sum_ir_{ik}$ و کوواریانس وزن‌دار.

هر دور EM، **درست‌نمایی** را کم نمی‌کند؛ پس همگرا می‌شود (ولی شاید به بهینه محلی).

[[lab:gmm]]

در آزمایشگاه «یک گام EM» را چند بار بزن و ببین بیضی‌ها چطور جای خود را پیدا می‌کنند و log-likelihood بالا می‌رود.

## مثال عددی یک گام E (یک‌بعدی)
دو مؤلفه با $\mu_1=0$، $\mu_2=4$، $\sigma=1$ و $\pi=0.5$. برای $x=1$:

| | چگالی $\mathcal N(1\mid\mu,1)$ | عضویت |
|---|---|---|
| مؤلفه ۱ | 0.242 | 0.242/(0.242+0.0044) = **0.982** |
| مؤلفه ۲ | 0.0044 | **0.018** |

[[c:0]]

## انتخاب تعداد مؤلفه: BIC
$\text{BIC}=-2\ln L+p\ln n$؛ $p$ تعداد پارامترهاست. مدلی با **کمترین BIC** را انتخاب کن؛ جمله دوم مدل پیچیده را جریمه می‌کند.

| ~covariance_type~ | شکل خوشه |
|---|---|
| ~full~ | هر بیضی با هر جهت (پیش‌فرض) |
| ~tied~ | همه یک شکل |
| ~diag~ | بیضی موازی محورها |
| ~spherical~ | دایره (شبیه K-Means) |

[[c:1]]

!GMM یک **مدل مولد** است: با ~sample()~ می‌توانی داده جدید شبیه داده اصلی بسازی؛ و با ~score_samples~ نقاط کم‌احتمال (ناهنجار) را پیدا کنی.`],
  en: ["Gaussian mixture models (GMM)", R`## The idea in one look
We assume the data comes from **several normal (Gaussian) distributions**; each cluster is a Gaussian with mean $\mu_k$, covariance matrix $\Sigma_k$ (the shape and direction of an ellipse) and weight $\pi_k$:

$$p(\mathbf x)=\sum_{k=1}^{K}\pi_k\,\mathcal N(\mathbf x\mid\mu_k,\Sigma_k)$$

Unlike K-Means, which assigns each point **definitely** to one cluster, GMM gives a **membership probability** (soft clustering), and clusters can be **elliptical and stretched**.

[[fig:gmm.png|K-Means: round clusters and hard labels. GMM: stretched ellipses and mixed colors (soft membership).]]

## The EM algorithm
Two steps repeat:
- **E (expectation):** the membership probability of each point in each component: $r_{ik}=\frac{\pi_k\mathcal N(x_i\mid\mu_k,\Sigma_k)}{\sum_j\pi_j\mathcal N(x_i\mid\mu_j,\Sigma_j)}$
- **M (maximization):** recompute the parameters with these weights: $\mu_k=\frac{\sum_ir_{ik}x_i}{\sum_ir_{ik}}$, $\pi_k=\frac1n\sum_ir_{ik}$ and the weighted covariance.

Each EM round never lowers the **likelihood**, so it converges (perhaps to a local optimum).

[[lab:gmm]]

In the lab, press "One EM step" a few times and watch the ellipses settle while the log-likelihood rises.

## A worked E step (1-D)
Two components with $\mu_1=0$, $\mu_2=4$, $\sigma=1$ and $\pi=0.5$. For $x=1$:

| | Density $\mathcal N(1\mid\mu,1)$ | Membership |
|---|---|---|
| Component 1 | 0.242 | 0.242/(0.242+0.0044) = **0.982** |
| Component 2 | 0.0044 | **0.018** |

[[c:0]]

## Choosing the number of components: BIC
$\text{BIC}=-2\ln L+p\ln n$, where $p$ is the number of parameters. Choose the model with the **lowest BIC**; the second term penalizes complex models.

| ~covariance_type~ | Cluster shape |
|---|---|
| ~full~ | Any ellipse in any direction (default) |
| ~tied~ | All the same shape |
| ~diag~ | Axis-parallel ellipses |
| ~spherical~ | Circles (like K-Means) |

[[c:1]]

!GMM is a **generative model**: ~sample()~ makes new data that looks like the original, and ~score_samples~ finds low-probability (anomalous) points.`],
  code: [`import numpy as np
from scipy.stats import norm

x = 1.0
d1, d2 = norm.pdf(x, 0, 1), norm.pdf(x, 4, 1)
r1 = 0.5 * d1 / (0.5 * d1 + 0.5 * d2)
print(f"densities: {d1:.4f}, {d2:.4f}")
print(f"membership: component 1 = {r1:.3f}, component 2 = {1 - r1:.3f}")`,
`import numpy as np
from sklearn.mixture import GaussianMixture

rng = np.random.default_rng(0)
X = np.r_[rng.multivariate_normal([0, 0], [[3, 2.2], [2.2, 2]], 200),
          rng.multivariate_normal([5, 0], [[0.5, 0], [0, 2]], 200),
          rng.multivariate_normal([2, 5], [[1, 0], [0, 0.4]], 200)]
for k in range(1, 7):
    g = GaussianMixture(k, random_state=0).fit(X)
    print(f"K={k}  BIC={g.bic(X):8.1f}")
best = GaussianMixture(3, random_state=0).fit(X)
print("weights:", best.weights_.round(3))
print("soft labels of 3 points:\\n", best.predict_proba(X[[0, 250, 500]]).round(3))`],
  quiz: [Q("تفاوت اصلی GMM با K-Means؟", "The main difference between GMM and K-Means?", ["عضویت نرم و خوشه‌های بیضوی", "نیاز نداشتن به داده", "سرعت بیشتر"], ["Soft membership and elliptical clusters", "Needs no data", "More speed"], 0),
    Q("با BIC کدام مدل را انتخاب می‌کنیم؟", "With BIC, which model do we choose?", ["کمترین BIC", "بیشترین BIC", "بیشترین K"], ["The lowest BIC", "The highest BIC", "The largest K"], 0)]
});

L({ id: "ai-tsne", after: "ai-pca",
  fa: ["t-SNE و نمایش داده‌های چندبعدی", R`## ایده در یک نگاه
PCA یک تصویر **خطی** است و فاصله‌های بزرگ را حفظ می‌کند. وقتی داده روی یک سطح خمیده قرار دارد (مثل ارقام دست‌نویس در ۶۴ بعد)، PCA گروه‌ها را روی هم می‌اندازد. **t-SNE** روشی غیرخطی است که **همسایگی‌ها** را حفظ می‌کند: نقاطی که در فضای اصلی نزدیک‌اند، در تصویر دوبعدی هم نزدیک می‌مانند.

## چطور کار می‌کند؟
- در فضای اصلی، برای هر جفت نقطه یک **احتمال شباهت** $p_{ij}$ با توزیع گاوسی می‌سازد.
- در فضای دوبعدی، شباهت $q_{ij}$ را با توزیع **t-استیودنت** (دم سنگین) تعریف می‌کند.
- جای نقاط دوبعدی را با گرادیان کاهشی طوری تغییر می‌دهد که **واگرایی KL** بین $P$ و $Q$ کم شود.

دم سنگین توزیع t اجازه می‌دهد نقاط دور واقعاً دور بیفتند و خوشه‌ها از هم جدا دیده شوند.

| پارامتر | معنی | معمول |
|---|---|---|
| ~perplexity~ | تقریباً تعداد همسایه‌هایی که در نظر می‌گیرد | 5 تا 50 |
| ~learning_rate~ | سرعت جابه‌جایی | ~"auto"~ |
| ~max_iter~ | تعداد تکرار | 1000 |

[[c:0]]

## هشدارهای مهم
| اشتباه رایج | واقعیت |
|---|---|
| «فاصله بین خوشه‌ها معنا دارد» | خیر؛ فقط همسایگی محلی حفظ می‌شود |
| «اندازه خوشه‌ها معنا دارد» | خیر؛ t-SNE چگالی را یکسان می‌کند |
| «می‌توانم با t-SNE نقطه جدید را تبدیل کنم» | خیر؛ ~transform~ ندارد؛ فقط برای نمایش است |
| «یک بار اجرا کافی است» | با random_state و perplexity مختلف امتحان کن |

!UMAP جایگزین سریع‌تری است که ساختار کلی را هم بهتر نگه می‌دارد (کتابخانه umap-learn، در Colab).

| | PCA | t-SNE |
|---|---|---|
| نوع | خطی | غیرخطی |
| حفظ می‌کند | واریانس و فاصله‌های بزرگ | همسایگی محلی |
| سرعت | خیلی سریع | کند |
| داده جدید | ~transform~ دارد | ندارد |
| کاربرد | پیش‌پردازش، فشرده‌سازی | فقط نمایش |`],
  en: ["t-SNE and visualizing high-dimensional data", R`## The idea in one look
PCA is a **linear** projection that keeps large distances. When the data lies on a curved surface (like handwritten digits in 64 dimensions), PCA piles the groups on top of each other. **t-SNE** is a non-linear method that keeps **neighborhoods**: points close in the original space stay close in the 2-D picture.

## How does it work?
- In the original space, it builds a **similarity probability** $p_{ij}$ for each pair with a Gaussian.
- In 2-D, it defines the similarity $q_{ij}$ with a **Student-t** distribution (heavy-tailed).
- It moves the 2-D points by gradient descent to reduce the **KL divergence** between $P$ and $Q$.

The heavy tail of the t distribution lets distant points fall truly far apart, so clusters appear separated.

| Parameter | Meaning | Typical |
|---|---|---|
| ~perplexity~ | Roughly how many neighbors it considers | 5 to 50 |
| ~learning_rate~ | Speed of the movement | ~"auto"~ |
| ~max_iter~ | Number of iterations | 1000 |

[[c:0]]

## Important warnings
| Common mistake | Reality |
|---|---|
| "Distances between clusters mean something" | No; only local neighborhoods are kept |
| "Cluster sizes mean something" | No; t-SNE evens out density |
| "I can map new points with t-SNE" | No; it has no ~transform~; it is for display only |
| "One run is enough" | Try different random_state and perplexity values |

!UMAP is a faster alternative that also keeps the global structure better (the umap-learn library, in Colab).

| | PCA | t-SNE |
|---|---|---|
| Kind | Linear | Non-linear |
| Keeps | Variance and large distances | Local neighborhoods |
| Speed | Very fast | Slow |
| New data | Has ~transform~ | Does not |
| Use | Preprocessing, compression | Display only |`],
  code: [`import matplotlib.pyplot as plt
from sklearn.datasets import load_digits
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE

digits = load_digits()
X, y = digits.data[:600], digits.target[:600]   # a subset keeps it quick in the browser
pca = PCA(2).fit_transform(X)
tsne = TSNE(2, perplexity=30, init="pca", random_state=0).fit_transform(X)

fig, ax = plt.subplots(1, 2, figsize=(11, 4.5))
for a, Z, t in [(ax[0], pca, "PCA"), (ax[1], tsne, "t-SNE")]:
    s = a.scatter(Z[:, 0], Z[:, 1], c=y, cmap="tab10", s=10)
    a.set_title(t + ": 64-D digits in 2-D"); a.set_xticks([]); a.set_yticks([])
fig.colorbar(s, ax=ax, label="digit")
plt.show()`],
  quiz: [Q("t-SNE چه چیزی را حفظ می‌کند؟", "What does t-SNE preserve?", ["همسایگی‌های محلی", "فاصله بین خوشه‌ها", "واریانس کل"], ["Local neighborhoods", "Distances between clusters", "Total variance"], 0)]
});

L({ id: "ai-anomaly", before: "ap-unsupervised",
  fa: ["تشخیص ناهنجاری", R`## ایده در یک نگاه
**ناهنجاری** (Anomaly یا Outlier) نمونه‌ای است که با بقیه فرق دارد: تراکنش تقلبی، دستگاه معیوب، حمله شبکه. معمولاً برچسب نداریم و ناهنجاری‌ها خیلی کم‌اند؛ پس مسئله بدون ناظر است.

## روش‌ها
| روش | ایده | sklearn |
|---|---|---|
| آماری (Z-score، IQR) | فاصله از میانگین یا چارک‌ها | دستی |
| Isolation Forest | نقطه عجیب با برش‌های تصادفی **زود جدا** می‌شود | ~IsolationForest~ |
| LOF | چگالی اطراف نقطه در مقایسه با همسایه‌ها | ~LocalOutlierFactor~ |
| مبتنی بر مدل | احتمال کم در GMM | ~GaussianMixture.score_samples~ |
| One-Class SVM | مرزی دور داده عادی | ~OneClassSVM~ |

## روش IQR (ساده و پرکاربرد)
چارک اول $Q_1$ و سوم $Q_3$؛ $IQR=Q_3-Q_1$. نقاط بیرون از $[Q_1-1.5IQR,\ Q_3+1.5IQR]$ ناهنجارند (همان نقاط نمودار جعبه‌ای).

| داده | $Q_1$ | $Q_3$ | IQR | بازه مجاز | ناهنجار |
|---|---|---|---|---|---|
| 10، 12، 12، 13، 14، 15، 40 | 12 | 14.5 | 2.5 | [8.25, 18.25] | 40 |

[[c:0]]

## Isolation Forest
درخت‌های تصادفی می‌سازد: ویژگی تصادفی و برش تصادفی. نقطه عادی در وسط جمعیت است و برای جدا شدن **برش‌های زیادی** لازم دارد؛ نقطه ناهنجار با **چند برش** تنها می‌شود. امتیاز ناهنجاری از **میانگین عمق** جداسازی در همه درخت‌ها به دست می‌آید.

[[c:1]]

!پارامتر ~contamination~ سهم ناهنجاری‌ها را مشخص می‌کند و آستانه را تعیین می‌کند. اگر نمی‌دانی، به جای برچسب از ~score_samples~ استفاده کن و بیشترین امتیازها را بررسی کن.`],
  en: ["Anomaly detection", R`## The idea in one look
An **anomaly** (or outlier) is a sample unlike the others: a fraudulent transaction, a faulty machine, a network attack. Usually there are no labels and anomalies are rare, so the problem is unsupervised.

## Methods
| Method | Idea | scikit-learn |
|---|---|---|
| Statistical (Z-score, IQR) | Distance from the mean or the quartiles | By hand |
| Isolation Forest | A strange point is **isolated quickly** by random cuts | ~IsolationForest~ |
| LOF | Density around a point compared with its neighbors | ~LocalOutlierFactor~ |
| Model-based | Low probability under a GMM | ~GaussianMixture.score_samples~ |
| One-Class SVM | A boundary around the normal data | ~OneClassSVM~ |

## The IQR rule (simple and widely used)
First quartile $Q_1$, third quartile $Q_3$, $IQR=Q_3-Q_1$. Points outside $[Q_1-1.5IQR,\ Q_3+1.5IQR]$ are anomalies (the dots in a box plot).

| Data | $Q_1$ | $Q_3$ | IQR | Allowed range | Anomaly |
|---|---|---|---|---|---|
| 10, 12, 12, 13, 14, 15, 40 | 12 | 14.5 | 2.5 | [8.25, 18.25] | 40 |

[[c:0]]

## Isolation Forest
It builds random trees: a random feature and a random cut. A normal point sits in the crowd and needs **many cuts** to be isolated; an anomaly is alone after **a few cuts**. The anomaly score comes from the **average isolation depth** over all trees.

[[c:1]]

!The ~contamination~ parameter sets the share of anomalies and so the threshold. If you do not know it, use ~score_samples~ instead of labels and inspect the highest scores.`],
  code: [`import numpy as np

x = np.array([10, 12, 12, 13, 14, 15, 40])
q1, q3 = np.percentile(x, [25, 75])
iqr = q3 - q1
low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr
print(f"Q1={q1}, Q3={q3}, IQR={iqr}, allowed=[{low}, {high}]")
print("anomalies:", x[(x < low) | (x > high)])
z = (x - x.mean()) / x.std()
print("z-scores:", z.round(2))`,
`import numpy as np
import matplotlib.pyplot as plt
from sklearn.ensemble import IsolationForest
from sklearn.neighbors import LocalOutlierFactor

rng = np.random.default_rng(0)
normal = rng.normal(0, 1, (300, 2))
odd = rng.uniform(-6, 6, (15, 2))
X = np.r_[normal, odd]

iso = IsolationForest(contamination=0.05, random_state=0).fit(X)
lab_iso = iso.predict(X)                 # -1 = anomaly
lab_lof = LocalOutlierFactor(n_neighbors=20, contamination=0.05).fit_predict(X)
print("Isolation Forest found", np.sum(lab_iso == -1), "anomalies;", np.sum(lab_iso[300:] == -1), "of the 15 planted ones")
print("LOF found", np.sum(lab_lof == -1), "anomalies;", np.sum(lab_lof[300:] == -1), "of the 15 planted ones")

fig, ax = plt.subplots(1, 2, figsize=(10, 4))
for a, lab, t in [(ax[0], lab_iso, "Isolation Forest"), (ax[1], lab_lof, "LOF")]:
    a.scatter(X[:, 0], X[:, 1], c=np.where(lab == -1, "red", "lightgray"), s=12); a.set_title(t)
plt.show()`],
  quiz: [Q("در Isolation Forest، ناهنجاری‌ها:", "In Isolation Forest, anomalies:", ["با برش‌های کمتری جدا می‌شوند", "در عمق زیاد درخت‌اند", "برچسب لازم دارند"], ["Are isolated with fewer cuts", "Sit deep in the trees", "Need labels"], 0)]
});
FinishCourse();
