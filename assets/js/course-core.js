// Course data model. The files in /data call M() to open a module and L() to add a lesson.
window.COURSE = {
  tracks: {
    python: { fa: "پایتون", en: "Python", modules: [] },
    ai: { fa: "هوش مصنوعی", en: "Artificial Intelligence", modules: [] }
  },
  lessons: []
};
window.R = String.raw;
(function () {
  var cur = null, curTrack = null;
  window.M = function (track, id, fa, en) {
    curTrack = track;
    cur = { id: id, fa: fa, en: en, lessons: [] };
    COURSE.tracks[track].modules.push(cur);
  };
  // L({id, fa:[title,text], en:[title,text], code:[...], demo:"name", quiz:[Q(...)]})
  window.L = function (o) {
    o.track = curTrack;
    o.module = cur.id;
    o.code = (o.code || []).map(function (c) { return typeof c === "string" ? { src: c.trim() } : Object.assign({}, c, { src: c.src.trim() }); });
    o.quiz = o.quiz || [];
    cur.lessons.push(o);
    COURSE.lessons.push(o);
  };
  // Q(questionFa, questionEn, optionsFa, optionsEn, indexOfAnswer, whyFa, whyEn)
  window.Q = function (qf, qe, of, oe, a, wf, we) {
    return { q: { fa: qf, en: qe }, o: { fa: of, en: oe || of }, a: a, why: { fa: wf || "", en: we || "" } };
  };
  // A shell block that is shown and copied, but not run.
  window.SH = function (src) { return { src: src, lang: "bash", run: false }; };
  // Real Python that only makes sense in Colab or on your own computer (for example PyTorch).
  window.COLAB = function (src) { return { src: src, colabOnly: true }; };
})();
