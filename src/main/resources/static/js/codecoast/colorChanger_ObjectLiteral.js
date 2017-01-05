/**
 * Created by jarvis on 2016. 12. 30..
 */
var CodeCoast = CodeCoast || {}

CodeCoast.AjaxReceiver = function(url){
    this.url = url;
}

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
            },
            error: function(result){
                console.log("실패..", result);
            }
        });
    }
};

CodeCoast.newColorChanger2 = function(pReceiver){
    var receiver = pReceiver;

    var self = {
        setReceiver : function(pReceiver){
            receiver = pReceiver;
        },
        receiverColor : function(callback) {
            console.log("리시버칼라 함수 실행");
            receiver.getColor(self, callback);
        }
    }
    return self;
};

CodeCoast.newColorChanger2$ = function(receiver, p_jq, target){
    var self = CodeCoast.newColorChanger2.apply(this, arguments);
    var jq = p_jq;
    self.target = target;

    self.on = function(eventType, callback){
        if(!jq) throw 1;
        jq.on(eventType, function(){self.receiverColor(callback);});
    };
    return self;
};


new CodeCoast.newColorChanger2$(
    new CodeCoast.AjaxReceiver("/getRamdomColor"), $("#changeColor"), $("#color-panel")
).on("click", function(cc, color){cc.target.css("background-color", color);});

