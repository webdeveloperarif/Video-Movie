/*!
 * VERSION: 1.7.5
 * DATE: 2015-02-26
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  var t = document.documentElement,
    e = window,
    i = function (i, r) {
      var s = "x" === r ? "Width" : "Height",
        n = "scroll" + s,
        a = "client" + s,
        o = document.body;
      return i === e || i === t || i === o
        ? Math.max(t[n], o[n]) - (e["inner" + s] || t[a] || o[a])
        : i[n] - i["offset" + s];
    },
    r = _gsScope._gsDefine.plugin({
      propName: "scrollTo",
      API: 2,
      version: "1.7.5",
      init: function (t, r, s) {
        return (
          (this._wdw = t === e),
          (this._target = t),
          (this._tween = s),
          "object" != typeof r && (r = { y: r }),
          (this.vars = r),
          (this._autoKill = r.autoKill !== !1),
          (this.x = this.xPrev = this.getX()),
          (this.y = this.yPrev = this.getY()),
          null != r.x
            ? (this._addTween(
                this,
                "x",
                this.x,
                "max" === r.x ? i(t, "x") : r.x,
                "scrollTo_x",
                !0
              ),
              this._overwriteProps.push("scrollTo_x"))
            : (this.skipX = !0),
          null != r.y
            ? (this._addTween(
                this,
                "y",
                this.y,
                "max" === r.y ? i(t, "y") : r.y,
                "scrollTo_y",
                !0
              ),
              this._overwriteProps.push("scrollTo_y"))
            : (this.skipY = !0),
          !0
        );
      },
      set: function (t) {
        this._super.setRatio.call(this, t);
        var r = this._wdw || !this.skipX ? this.getX() : this.xPrev,
          s = this._wdw || !this.skipY ? this.getY() : this.yPrev,
          n = s - this.yPrev,
          a = r - this.xPrev;
        this._autoKill &&
          (!this.skipX &&
            (a > 7 || -7 > a) &&
            i(this._target, "x") > r &&
            (this.skipX = !0),
          !this.skipY &&
            (n > 7 || -7 > n) &&
            i(this._target, "y") > s &&
            (this.skipY = !0),
          this.skipX &&
            this.skipY &&
            (this._tween.kill(),
            this.vars.onAutoKill &&
              this.vars.onAutoKill.apply(
                this.vars.onAutoKillScope || this._tween,
                this.vars.onAutoKillParams || []
              ))),
          this._wdw
            ? e.scrollTo(this.skipX ? r : this.x, this.skipY ? s : this.y)
            : (this.skipY || (this._target.scrollTop = this.y),
              this.skipX || (this._target.scrollLeft = this.x)),
          (this.xPrev = this.x),
          (this.yPrev = this.y);
      },
    }),
    s = r.prototype;
  (r.max = i),
    (s.getX = function () {
      return this._wdw
        ? null != e.pageXOffset
          ? e.pageXOffset
          : null != t.scrollLeft
          ? t.scrollLeft
          : document.body.scrollLeft
        : this._target.scrollLeft;
    }),
    (s.getY = function () {
      return this._wdw
        ? null != e.pageYOffset
          ? e.pageYOffset
          : null != t.scrollTop
          ? t.scrollTop
          : document.body.scrollTop
        : this._target.scrollTop;
    }),
    (s._kill = function (t) {
      return (
        t.scrollTo_x && (this.skipX = !0),
        t.scrollTo_y && (this.skipY = !0),
        this._super._kill.call(this, t)
      );
    });
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()();
