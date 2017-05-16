/**
 * Created by jarvis on 2016. 12. 30..
 */
var CodeCoast = CodeCoast || {}
CodeCoast.ColorChanger = function(){
    var self = {
        init : function(){
            console.log("init!");
            this.evtBindings();
        },
        evtBindings : function(){

            $("#changeColor").click(this.changeColor); // 버튼 체인지

        },
        changeColor : function(callback){
            console.log("컬러 체인저 클릭");

            $.ajax({
                url:"/getRamdomColor",
                method:"GET",
                success: function(result){
                    console.log("result" , result);
                    $("#color-panel").css("background-color", result);
                    if(callback != undefined && typeof callback =="function") callback();
                },
                error : function(result){
                    console.log("fail result" , result);
                    console.log("fail result...", result.statusCode());
                    if(callback != undefined  && typeof callback =="function") callback();
                }
            });
        }
    }
    return self;
};
;

if (typeof module !== 'undefined' && module.exports != null) { module.exports = CodeCoast }