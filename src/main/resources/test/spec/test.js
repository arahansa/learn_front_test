/**
 * Created by jarvis on 2016. 12. 29..
 */
'use strict'; 
// 테스트 샘플 예제
 describe('테스트 환경 샘플 예제', function(){ 
     var calculator;

     beforeEach(function(){
         calculator = new CodeCoast.Calculator(); 
     });  

     it("sum 은 값을 더한다. ", function() {
         expect(calculator.sum(1,2)).toEqual(3);
     });
   });
