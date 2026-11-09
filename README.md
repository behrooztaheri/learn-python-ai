# Python and AI School

An interactive, bilingual (Persian and English) course on Python and artificial intelligence, by Dr. Behrooz Taheri.

- Runs entirely on GitHub Pages, with no server.
- Code cells can be edited and run in the browser (Pyodide).
- Every lesson has a notebook that opens in Google Colab (the repository must be public).

## Publish

1. Upload all files in this folder to the root of a public GitHub repository.
2. In the repository, open Settings > Pages.
3. Set Source to "Deploy from a branch", Branch to "main", folder "/ (root)", and save.
4. After a minute or two, the site is at `https://USERNAME.github.io/REPOSITORY/`.

## Structure

| Path | Purpose |
|---|---|
| `data/*.js` | Lessons, quizzes and glossary |
| `assets/js/demos.js` | Interactive labs |
| `assets/js/runner.js`, `py-worker.js` | Code editor and browser Python |
| `assets/js/config.js` | Author details and optional repository name |
| `notebooks/fa`, `notebooks/en` | Google Colab notebooks |

## Add a lesson

Add an `L({...})` entry in a file under `data/`. If it has code, also add a matching notebook in `notebooks/fa` and `notebooks/en` named after the lesson `id`.
