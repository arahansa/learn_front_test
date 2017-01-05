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
            }
        });
    }
};



CodeCoast.newColorChanger = function(receiver){
    console.log("생성자 호출.컬러..");
    this.receiver = receiver;
};
CodeCoast.newColorChanger.prototype.setReceiver = function(receiver) {
    console.log("리시버 설정되었어요~ 어디에 ? ", this);
    this.receiver = receiver;
    console.log("리시버 설정되었어요~",this.receiver);
};
CodeCoast.newColorChanger.prototype.receiverColor = function(callback){

        console.log("클릭 눌림", this.receiver, this);
        this.receiver.getColor(this, callback);
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

$(function(){
    var cc = new CodeCoast.newColorChanger$(
        new CodeCoast.AjaxReceiver("/getRamdomColor"),
        $("#changeColor"), $("#color-panel"));
    cc.on("click", function(cc, color){cc.target.css("background-color", color);});

});