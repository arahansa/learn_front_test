/**
 * Created by jarvis on 2016. 12. 30..
 */
var CodeCoast = CodeCoast || {}

CodeCoast.AjaxReceiver = function(url){ this.url = url;};
CodeCoast.AjaxReceiver.prototype = {
    getColor : function(colorChanger, callback){
        var $this = this;
        $.ajax({
            url:$this.url,
            method:"GET",
            success:function(result){
                if(callback && result){
                    callback(colorChanger, result);
                }
            }
        });
    }
};

CodeCoast.newColorChanger = function(receiver){
    this.receiver = receiver;
};
CodeCoast.newColorChanger.prototype = {
    setReceiver : function(receiver){
        this.receiver = receiver;
    },
    receiverColor : function(callback){
        this.receiver.getColor(this, callback);
    }
};

// http://www.nextree.co.kr/p7323/
// Object.create 는 아마 es5 였지?
CodeCoast.newColorChanger$ = function(receiver, jq, target){
    CodeCoast.newColorChanger.apply(this, arguments);
    this.jq = jq;
    this.target = target;
};
CodeCoast.newColorChanger$.prototype = CodeCoast.newColorChanger.prototype;
CodeCoast.newColorChanger$.prototype.on = function(eventType, callback){
    var $this = this;
    if(!this.jq) throw 1;
    this.jq.on(eventType, function(){$this.receiverColor(callback)});
};

new CodeCoast.newColorChanger$(
new CodeCoast.AjaxReceiver("/getRamdomColor"), $("#changeColor"), $("#color-panel")
).on("click", function(cc, color){cc.target.css("background-color", color);});