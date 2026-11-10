// Course data model. The files in /data call M() to open a module, L() to add a lesson, and X() to deepen one.
window.COURSE = {
  tracks: {
    python: { fa: "پایتون", en: "Python", modules: [] },
    math: { fa: "ریاضیات هوش مصنوعی", en: "Math for AI", modules: [] },
    ai: { fa: "هوش مصنوعی", en: "Artificial Intelligence", modules: [] }
  },
  lessons: []
};
window.R = String.raw;
(function () {
  var cur = null, curTrack = null;
  function byId(id) { return COURSE.lessons.filter(function (l) { return l.id === id; })[0]; }
  function norm(c) { return typeof c === "string" ? { src: c.trim() } : Object.assign({}, c, { src: c.src.trim() }); }

  // M(track, id, fa, en, {before: "moduleId"}). Calling it with an existing id reopens that module.
  window.M = function (track, id, fa, en, opt) {
    curTrack = track;
    var list = COURSE.tracks[track].modules;
    var ex = list.filter(function (m) { return m.id === id; })[0];
    if (ex) { cur = ex; return; }
    cur = { id: id, fa: fa, en: en, lessons: [] };
    var at = opt && opt.before ? list.map(function (m) { return m.id; }).indexOf(opt.before) : -1;
    if (at >= 0) list.splice(at, 0, cur); else list.push(cur);
  };

  // L({id, fa:[title,text], en:[title,text], code:[...], demo:"name", quiz:[Q(...)], ex:[E(...)], after:"lessonId", project:true})
  window.L = function (o) {
    o.track = curTrack;
    o.module = cur.id;
    o.code = (o.code || []).map(norm);
    o.quiz = o.quiz || [];
    o.ex = o.ex || [];
    var ids = cur.lessons.map(function (l) { return l.id; });
    var at = o.after ? ids.indexOf(o.after) : -1, bt = o.before ? ids.indexOf(o.before) : -1;
    if (at >= 0) cur.lessons.splice(at + 1, 0, o); else if (bt >= 0) cur.lessons.splice(bt, 0, o); else cur.lessons.push(o);
    COURSE.lessons.push(o);
  };

  // X(id, {fa, en, code, ex, quiz}) appends a deeper part to a lesson. [[c:n]] in its text refers to its own code list.
  window.X = function (id, o) {
    var l = byId(id);
    if (!l) throw new Error("Unknown lesson " + id);
    var off = l.code.length;
    var shift = function (t) { return t.replace(/\[\[c:(\d+)\]\]/g, function (_, n) { return "[[c:" + (off + Number(n)) + "]]"; }); };
    l.fa[1] += "\n\n" + shift(o.fa); l.en[1] += "\n\n" + shift(o.en);
    l.code = l.code.concat((o.code || []).map(norm));
    l.ex = l.ex.concat(o.ex || []);
    l.quiz = l.quiz.concat(o.quiz || []);
  };

  // DROP("id", ...) removes lessons that a newer, more detailed set of lessons replaces.
  window.DROP = function () {
    var ids = [].slice.call(arguments);
    Object.keys(COURSE.tracks).forEach(function (t) { COURSE.tracks[t].modules.forEach(function (m) { m.lessons = m.lessons.filter(function (l) { return ids.indexOf(l.id) < 0; }); }); });
    COURSE.lessons = COURSE.lessons.filter(function (l) { return ids.indexOf(l.id) < 0; });
  };

  // Rebuild the reading order after all data files have loaded.
  window.FinishCourse = function () {
    var all = [];
    Object.keys(COURSE.tracks).forEach(function (t) { COURSE.tracks[t].modules.forEach(function (m) { all = all.concat(m.lessons); }); });
    COURSE.lessons = all;
  };

  // Q(questionFa, questionEn, optionsFa, optionsEn, indexOfAnswer, whyFa, whyEn)
  window.Q = function (qf, qe, of, oe, a, wf, we) {
    return { q: { fa: qf, en: qe }, o: { fa: of, en: oe || of }, a: a, why: { fa: wf || "", en: we || "" } };
  };
  // E(taskFa, taskEn, solutionCode, answerFa, answerEn): an exercise with a hidden worked answer.
  window.E = function (tf, te, code, af, ae) { return { t: { fa: tf, en: te }, code: code ? code.trim() : null, a: { fa: af || "", en: ae || af || "" } }; };
  window.SH = function (src) { return { src: src, lang: "bash", run: false }; };
  window.COLAB = function (src) { return { src: src, colabOnly: true }; };
})();
