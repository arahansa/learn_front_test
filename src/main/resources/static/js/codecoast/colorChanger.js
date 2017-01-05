/**
 * Created by jarvis on 2016. 12. 30..
 */
var CodeCoast = CodeCoast || {}
CodeCoast.ColorChanger = function(){
    var self = {
        init : function(){
            console.log("init");
            this.evtBindings();
        },
        evtBindings : function(){

            $("#changeColor").click(this.changeColor); // 버튼 체인지

        },
        changeColor : function(callback){
            $.ajax({
                url:"/getRamdomColor",
                method:"GET",
                success: function(result){
                    console.log("result" , result);
                    $("#color-panel").css("background-color", result);
                    if(callback != undefined) callback();
                },
                error : function(result){
                    console.log("result" , result);
                    if(callback != undefined) callback();
                }
            });
        }
    }
    return self;
};
;(function(){ new CodeCoast.ColorChanger().init(); }());