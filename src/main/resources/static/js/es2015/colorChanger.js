const AjaxReceiver = class{
	constructor(url){
		this.url = url;
	}
	getColor(colorChanger, callback){
		$.ajax({
			url:url,
			method:"GET",
			success:result=>{
				result = JSON.parse(result).color;
				callback && result && callback(colorChanger, result);
	                }
		});	
	}
};
const ColorChanger = class{
	constructor(receiver){
		this.setReceiver(receiver);
	}
	setReceiver(receiver){
		this.receiver = receiver;
	}
	receiverColor(callback/*color=>{}*/){ 
		this.receiver.getColor(this, callback);	
	}
};
const ColorChanger$ = class extends ColorChanger{
	constructor(receiver, jq){
		super(receiver);
		this.jq = jq;
	}
	on(eventType, callback){
		if(!this.jq) throw 1;
		this.jq.on(eventType, e=>this.receiverColor(this, callback));
	}
};

const cc = new ColorChanger$(
	new AjaxReceiver("/getRamdomColor"),
	$("#changeColor")
);
cc.on('click', (cc, color)=>{
	cc.jq.css("background-color", color);
});