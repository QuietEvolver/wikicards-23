/* DeckPage.js Splash load*/
//jsi-cards-container
var $ = require("jquery");
console.log($);
var RENDERER = {
	ROW : 4,
	COLUMN : 12,
	MAX_STATUS_COUNT : 100,
	MAX_WAITING_COUNT : 30,
	MAX_STATUS : 8,
	
	init : function(){
		this.setParameters();
		this.createCards();
		this.reconstructMethods();
		this.render();
	},
	setParameters : function(){
		this.$container = $('#jsi-cards-container');
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.$canvas = $('<canvas />').attr({width : this.width, height : this.height, zIndex:0}).appendTo(this.$container);
		this.context = this.$canvas.get(0).getContext('2d');
		this.cards = [];
		this.status = 0;
		this.statusCount = 0;
		this.waitingCount = 0;
		this.gradient = this.context.createRadialGradient(this.width / 2, this.height / 2, 0, this.width / 2, this.height / 2, Math.sqrt(Math.pow(this.width / 2, 2) + Math.pow(this.height / 2, 2)));
		this.gradient.addColorStop(0, 'hsl(210, 100%, 30%)');
		this.gradient.addColorStop(1, 'hsl(210, 100%, 10%)');
	},
	createCards : function(){
		for(var i = 0; i < this.ROW; i++){
			for(var j = 0; j < this.COLUMN; j++){
				this.cards.push(new CARD(this, i, j));
			}
		}
		this.cards.sort(function(card1, card2){
			return card2.radian[0] - card1.radian[0];
		});
	},
	reconstructMethods : function(){
		this.render = this.render.bind(this);
	},
	controlStatus : function(){
		if(++this.statusCount > this.MAX_STATUS_COUNT){
			if(++this.waitingCount > this.MAX_WAITING_COUNT){
				if(++this.status > this.MAX_STATUS){
					this.status = 1;
				}
				this.statusCount = 0;
				this.waitingCount = 0;
			}
		}
	},
	easeInOutQuad: function(t){
		return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	},
	render : function(){
		requestAnimationFrame(this.render);
		this.context.fillStyle = this.gradient;
		this.context.fillRect(0, 0, this.width, this.height);
		var rate = this.easeInOutQuad(Math.min(1, this.statusCount / this.MAX_STATUS_COUNT));
		
		for(var i = 0, length = this.cards.length; i < length; i++){
			this.cards[i].render(this.context, this.status, rate);
		}
		this.controlStatus();
	}
};
var CARD = function(renderer, row, column){
	 this.renderer = renderer;
	 this.row = row;
	 this.column = column;
	 this.init();
};
CARD.prototype = {
	WIDTH_RATIO : 1 / 12,
	HEIGHT_RATIO : 1 / 8,
	SCALE_RATIO : 4 / 5,
	
	init : function(){
		var index = this.column * this.renderer.ROW + this.row;
		this.width = Math.min(this.renderer.width, this.renderer.height) * this.WIDTH_RATIO;
		this.height = Math.min(this.renderer.width, this.renderer.height) * this.HEIGHT_RATIO;
		this.axis = [
			{x : this.renderer.width / 2, y : this.renderer.height / 2},
			{x : this.renderer.width / 4 + this.renderer.width / 2 * (this.row % 2), y : this.renderer.height / 4 + this.renderer.height / 2 * Math.floor(this.row / 2)},
			{x : this.width * 2, y : this.renderer.height / 8 + this.height / 2 + this.renderer.height / 4 * this.row},
			{x : this.width / 2 + (this.renderer.width - this.width * 3 / 2) * this.column / this.renderer.COLUMN, y : this.renderer.height / 8 + this.height / 2 + this.renderer.height / 4 * this.row},
			{x : this.width / 2 + (this.renderer.width - this.width * 2) * index / this.renderer.ROW / this.renderer.COLUMN, y : this.renderer.height / 2 + this.height / 2},
			{x : this.width / 2 + (this.renderer.width - this.width * 2) * index / this.renderer.ROW / this.renderer.COLUMN, y : this.height * 3 / 2 + (this.renderer.height - this.height * 2) * (1 - Math.abs(1 - index / this.renderer.ROW / this.renderer.COLUMN * 2))},
			{x : this.renderer.width / 6 + this.renderer.width / 3 * (this.column % 3), y : this.renderer.height / 10 + this.height / 2 + this.renderer.height / 4 * Math.floor(this.column / 3)},
			{x : this.renderer.width / 2, y : this.renderer.height / 2}
		];
		this.radian = [index / this.renderer.ROW / this.renderer.COLUMN, this.column / this.renderer.COLUMN, this.row / (this.renderer.ROW - 1)];
		this.scale = this.SCALE_RATIO * this.row / (this.renderer.ROW - 1);
		this.hue = this.radian[0] * 360 | 0;
	},
	controlStatus : function(context, status, rate){
		if(status == 0){
			this.x = this.axis[status].x;
	 		this.y = this.axis[status].y;
		}else{
			var next = (status == this.renderer.MAX_STATUS) ? 0 : status;
			this.x = this.axis[status - 1].x + (this.axis[next].x - this.axis[status - 1].x) * rate;
	 		this.y = this.axis[status - 1].y + (this.axis[next].y - this.axis[status - 1].y) * rate;
		}
		switch(status){
		case 0:
			context.rotate(this.radian[0] * Math.PI * 2 * rate);
			context.translate(0, -this.height);
			break;
		case 1:
			context.rotate(this.translateAngle(this.radian[0] * Math.PI * 2, this.radian[1] * Math.PI * 2, rate));
	 		context.translate(0, -this.height * (1 - rate));
	 		break;
	 	case 2:
		 	context.rotate(this.translateAngle(this.radian[1] * Math.PI * 2, Math.PI * 2, rate));
	 		break;
	 	case 6:
	 		context.rotate((this.radian[2] * Math.PI / 2 - Math.PI / 4) * rate);
	 		context.translate(-this.width / 2 * rate, 0);
	 		break;
	 	case 7:
	 		context.rotate(this.translateAngle(this.radian[2] * Math.PI / 2 - Math.PI / 4, this.radian[1] * Math.PI * 2, rate));
	 		context.scale(1 - this.scale * rate, 1 - this.scale * rate);
	 		context.translate(-this.width / 2, -this.height * 3 * rate);
	 		break;
	 	case 8:
	 		context.rotate(this.translateAngle(this.radian[1] * Math.PI * 2, this.radian[0] * Math.PI * 2, rate));
	 		context.scale(1 - this.scale * (1 - rate), 1 - this.scale * (1 - rate));
	 		context.translate(-this.width / 2 * (1 - rate), this.height * (2 * rate - 3));
	 	}
	},
	translateAngle : function(source, destination, rate){
		return source + (destination - source) * rate;
	},
	render : function(context, status, rate){
		context.save();
		context.translate(this.x, this.y);
		this.controlStatus(context, status, rate);
		context.lineWidth = this.width / 20;
		context.strokeStyle = 'hsl(' + this.hue + ', 60%, 90%)';
		context.fillStyle = 'hsl(' + this.hue + ', 60%, 60%)';
		context.fillRect(0, -this.height, this.width, this.height);
		context.strokeRect(0, -this.height, this.width, this.height);
		context.restore();
	}
};

export default RENDERER;
