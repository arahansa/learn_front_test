/**
 * Created by jarvis on 2016. 12. 30..
 */

var CodeCoast = CodeCoast || {};
CodeCoast.ColorChanger = function(){ this.init();};
CodeCoast.ColorChanger.prototype = {
    init : function(){
        console.log("init");
        this.evtBindings();
    },
    evtBindings : function(){

        $("#changeColor").click(this.changeColor); // 버튼 체인지

    },
    changeColor : function(){
        $.ajax({
            url:"/getRamdomColor",
            method:"GET",
            success: function(result){
                console.log("result" , result);
                $("#color-panel").css("background-color", result);
            },
            error : function(result){
                console.log("result" , result);
            }
        });
    }
}

;(function(){ new CodeCoast.ColorChanger(); }());

