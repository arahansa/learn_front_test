/**
 * Created by jarvis on 2016. 12. 30..
 */
var CodeCoast = CodeCoast || {}

CodeCoast.AjaxReceiver = function(url){ this.url = url;};
CodeCoast.AjaxReceiver.prototype = {
    getColor : function(callback){
        var $this = this;
        $.ajax({
            url:$this.url,
            method:"GET",
            success:function(result){
                console.log("result : ", result);
                console.log("callback: ", callback);
                if(callback && result){
                    callback(result);
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
        this.receiver.getColor(callback);
    }
};

// http://www.nextree.co.kr/p7323/
// Object.create 는 아마 es5 였지?
CodeCoast.newColorChanger$ = function(receiver, jq){
    CodeCoast.newColorChanger.apply(this, arguments);
    this.jq = jq;
};
CodeCoast.newColorChanger$.prototype = CodeCoast.newColorChanger.prototype;
CodeCoast.newColorChanger$.prototype.on = function(eventType, callback){
    var $this = this;
    if(!this.jq) throw 1;
    this.jq.on(eventType, function(){$this.receiverColor(callback)});
};

new CodeCoast.newColorChanger$(
new CodeCoast.AjaxReceiver("/getRamdomColor"), $("#changeColor")
).on("click", function(color){ $("#color-panel").css("background-color", color);});