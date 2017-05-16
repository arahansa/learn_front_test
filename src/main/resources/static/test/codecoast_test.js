/**
 * Created by jarvis on 2017. 5. 15..
 *
 * mocha 로 해보는 테스트
 */

var chai = require('chai')
    , spies = require('chai-spies');
chai.use(spies);
var should = chai.should() , expect = chai.expect;

require('jsdom-global')();
var CodeCoast = require('../js/codecoast/colorChanger');
var sinon = require('sinon');


describe('컬러체인저 메소드 호출 테스트 ', () => {

    var colorChanger,spy, server;

    // jsdom 으로 jquery $ 전역객체 공유
    before(() => {
        var fixture = '<!doctype html><html><head><meta charset="utf-8">' +
            '</head><body><div id="color-panel"></div><button id="changeColor">색깔 변경</button></body></html>';
        this.jsdom = require('jsdom-global')(fixture, {});
        global.$ = require('jquery');
        colorChanger = new CodeCoast.ColorChanger();
    });

    after(()=>{
        this.jsdom();
    });

    beforeEach(function() {
        global.window.XMLHttpRequest =  sinon.useFakeXMLHttpRequest();
        server = sinon.fakeServer.create();
    });

    afterEach(function () {
        server.restore();
    });


    it("should fake a jQuery ajax request ( ajax 네트웤 학습 테스트 ) ", function () {
        server.respondWith("GET", "/something",
            [200, { "Content-Type": "application/json" },
                '{ "stuff": "is", "awesome": "in here" }']);
        var callbacks = [sinon.spy(), sinon.spy()];

        $.ajax({
            url: "/something",
            type:'GET',
            data: {},
            dataType: "json",
            success: callbacks[0],
            error: function(request,status,error){
                console.log("에러.");
                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });

        $.ajax({
            url: "/other",
            type:'GET',
            data: {},
            dataType: "json",
            success: callbacks[0],
            error: function(){
                callbacks[1]();
            }
        });

        server.respond(); // Process all requests so far

        expect(callbacks[0].calledOnce).to.be.true;
        expect(callbacks[1].calledOnce).to.be.true;
    });

    it('ajax test', ()=>{
        // given
        server.respondWith("GET", "/getRamdomColor",
            [200, { "Content-Type": "text/html" } , 'black']);
        spy = sinon.spy(()=>{console.log("콜백 실행되었습니다.");});

        // when
        colorChanger.changeColor(spy);
        server.respond(); // Process all requests so far

        // then
        expect(spy.called).to.be.true;
    });


    it("init 이 실행되면 이벤트 바인딩도 같이 실행된다. ", () => {
        spy = sinon.spy(colorChanger, 'evtBindings');

        colorChanger.init();

        expect(spy.called).to.be.true;
    });


    it('test1', function(){

    });

    it('click 이벤트 발생시 컬러 체인저가 발동하는가?', ()=>{
        console.log("컬러 체인저.. 네트워크까지 포함한 테스트.");
        // given
        colorChanger = new CodeCoast.ColorChanger();
        var spy2 = sinon.spy(colorChanger, 'changeColor');
        var evtBindingspy = sinon.spy(colorChanger, 'evtBindings');
        server.respondWith("GET", "/getRamdomColor", [200, { "Content-Type": "text/html" } , 'black']);
        colorChanger.init();

        console.log("스파이 콜드  : ", evtBindingspy.called);
        expect(evtBindingspy.called).to.be.true;

        console.log("$ : ", $);
        // when
        $('#changeColor').click();

        // then
        expect(spy2.called).to.be.true;
        expect($("#color-panel").css("background-color")).to.eql('black');
    });




});



