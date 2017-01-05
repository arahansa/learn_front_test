"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null){
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}
	subClass.prototype = Object.create(superClass && superClass.prototype,
		{ constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });

	if (superClass)
		Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AjaxReceiver = function () {
	function AjaxReceiver(url) {
		_classCallCheck(this, AjaxReceiver);

		this.url = url;
	}

	_createClass(AjaxReceiver, [{
		key: "getColor",
		value: function getColor(colorChanger, callback) {
			$.ajax({
				url: url,
				method: "GET",
				success: function success(result) {
					result = JSON.parse(result).color;
					callback && result && callback(colorChanger, result);
				}
			});
		}
	}]);

	return AjaxReceiver;
}();
var ColorChanger = function () {
	function ColorChanger(receiver) {
		_classCallCheck(this, ColorChanger);

		this.setReceiver(receiver);
	}

	_createClass(ColorChanger, [{
		key: "setReceiver",
		value: function setReceiver(receiver) {
			this.receiver = receiver;
		}
	}, {
		key: "receiverColor",
		value: function receiverColor(callback /*color=>{}*/) {
			this.receiver.getColor(this, callback);
		}
	}]);

	return ColorChanger;
}();
var ColorChanger$ = function (_ColorChanger) {
	_inherits(ColorChanger$, _ColorChanger);

	function ColorChanger$(receiver, jq) {
		_classCallCheck(this, ColorChanger$);

		var _this = _possibleConstructorReturn(this, (ColorChanger$.__proto__ || Object.getPrototypeOf(ColorChanger$)).call(this, receiver));

		_this.jq = jq;
		return _this;
	}

	_createClass(ColorChanger$, [{
		key: "on",
		value: function on(eventType, callback) {
			var _this2 = this;

			if (!this.jq) throw 1;
			this.jq.on(eventType, function (e) {
				return _this2.receiverColor(_this2, callback);
			});
		}
	}]);

	return ColorChanger$;
}(ColorChanger);

var cc = new ColorChanger$(new AjaxReceiver("/getRamdomColor"), $("#changeColor"));
cc.on('click', function (cc, color) {
	cc.jq.css("background-color", color);
});
//# sourceMappingURL=colorChanger.js.map
