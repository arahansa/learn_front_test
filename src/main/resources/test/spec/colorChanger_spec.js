/**
 * Created by jarvis on 2016. 12. 30..
 */


describe('색깔 변환기 테스트', function(){
    var colorChanger = null;

    beforeEach(function(){

        colorChanger = new CodeCoast.ColorChanger();
        spyOn(colorChanger, 'init').and.callThrough();
        spyOn(colorChanger, 'evtBindings');
        colorChanger.init();

        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("init 이 실행되면 이벤트 바인딩도 같이 실행된다. ", function() {
        expect(colorChanger.init).toHaveBeenCalled();
        expect(colorChanger.evtBindings).toHaveBeenCalled();
    });

    it('changeColor 버튼이 클릭된 경우 ', function(){
        // Given (픽스쳐 로딩때문에 뭔가 좀 꼬임)
        setFixtures('<button id="changeColor">색깔 변경</button>');
        colorChanger = new CodeCoast.ColorChanger();
        spyOn(colorChanger, 'changeColor');

        var spyEvent = spyOnEvent('#changeColor', 'click');
        colorChanger.evtBindings();

        // When
        $('#changeColor').click();

        // Then
        expect(colorChanger.changeColor).toHaveBeenCalled();
        expect('click').toHaveBeenTriggeredOn('#changeColor');
        expect(spyEvent).toHaveBeenTriggered();
    });


    // http://stackoverflow.com/questions/4662641/how-do-i-verify-jquery-ajax-events-with-jasmine
    it('색상 바꾸기 ajax 성공 테스트 ',  function(done){
        jasmine.Ajax.stubRequest('/getRamdomColor').andReturn({
            "status": 200,
            "contentType": 'text/json',
            "responseText": '#eeeeee'
        });

        var success = jasmine.createSpy('success');
        success.and.callFake(function(xml_content)
        {
            expect(success).toHaveBeenCalled();
            done();
        });

        spyOn($, "ajax").and.callFake(function(options) {
            options.success();
        });

        setFixtures('<div id="color-panel"></div>');
        $("#color-panel").css("background-color", "blue");

        colorChanger = new CodeCoast.ColorChanger();

        colorChanger.changeColor(success);
        expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual("/getRamdomColor");

        setTimeout(function(){
            expect($("#color-panel").css("background-color")).toEqual('#eeeeee');
            done();
        }, 500);

    });

    it('색상 바꾸기 ajax 실패 테스트 ',  function(done){
        jasmine.Ajax.stubRequest('/getRamdomColor').andReturn({
            "status": 500,
            "contentType": 'text/json',
            "responseText": 'error'
        });

        var error = jasmine.createSpy('error');
        error.and.callFake(function(xml_content)
        {
            expect(error).toHaveBeenCalled();
            done();
        });

        setFixtures('<div id="color-panel"></div>');
        $("#color-panel").css("background-color", "blue");

        colorChanger = new CodeCoast.ColorChanger();

        colorChanger.changeColor(error);
        expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual("/getRamdomColor");

    });



});
