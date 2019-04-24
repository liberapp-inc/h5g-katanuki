var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var PushMark = (function (_super) {
    __extends(PushMark, _super);
    function PushMark(x, y, width, height, lineColor) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.expansion = true;
        PushMark.I = _this;
        _this.adjustmentCompornent();
        _this.setCircleShape(_this.compornent.anchorOffsetX, _this.compornent.anchorOffsetY, width / 2);
        return _this;
    }
    PushMark.prototype.setCircleShape = function (x, y, radius) {
        var shape = new egret.Shape();
        shape.x = x;
        shape.y = y;
        shape.graphics.lineStyle(6, this.lineColor);
        shape.graphics.drawCircle(0, 0, radius);
        this.compornent.addChild(shape);
        GameStage.display.addChild(this.compornent);
        this.shapes.push(shape);
    };
    PushMark.prototype.adjustmentCompornent = function () {
        this.compornent.anchorOffsetX += this.compornent.width / 2;
        this.compornent.anchorOffsetY += this.compornent.height / 2;
        /*        let s = Util.setRect(0,0,this.compornent.width, this.compornent.height, 0xff0000, 0);
                this.compornent.addChild(s);*/
    };
    PushMark.prototype.push = function (x, y) {
        this.compornent.scaleX = this.compornent.scaleY = 0.01;
        this.compornent.x = x;
        this.compornent.y = y;
    };
    PushMark.prototype.release = function () {
        this.expansion = true;
        this.compornent.scaleX = this.compornent.scaleY = 0;
        var newArray = Mark.mark.filter(function (obj) { return obj.destroyFlag !== true; });
        Mark.mark = newArray;
    };
    PushMark.prototype.switchExpansion = function () {
        if (UILayer.pushFlag) {
            if (this.compornent.scaleX > 1) {
                this.expansion = false;
            }
            else if (this.compornent.scaleX < 0.01) {
                this.expansion = true;
            }
            if (this.expansion) {
                this.compornent.scaleX = this.compornent.scaleY += 0.005;
            }
            else {
                this.compornent.scaleX = this.compornent.scaleY -= 0.005;
            }
        }
    };
    PushMark.prototype.checkHit = function () {
        var _this = this;
        if (UILayer.pushFlag) {
            Mark.mark.forEach(function (m) {
                if (_this.compornent.hitTestPoint(m.compornent.x, m.compornent.y)) {
                    m.isHit = true;
                }
                else {
                    m.isHit = false;
                }
                /*                if(this.compornent.x <= m.compornent.x && this.compornent.x + this.compornent.width >= m.compornent.x ){
                                if(this.compornent.y <= m.compornent.y && this.compornent.y + this.compornent.height >= m.compornent.y ){
                                    m.isHit = true;
                                }
                                }*/
            });
        }
    };
    PushMark.prototype.updateContent = function () {
        this.switchExpansion();
        this.checkHit();
    };
    PushMark.I = null;
    return PushMark;
}(UICompornent));
__reflect(PushMark.prototype, "PushMark");
//# sourceMappingURL=PushMark.js.map