
// Yo, this is a simple YUI class that builds a Modal window for external content.
// I, Jeff Micklos, built it so please let me know if you need help! jeffmicklos at gmail dot com
// Feel free to check out my portfolio too, www.onwebtape.com/me

Modal = function(url,config){
	this.url= url,
	this.config= config,
	this.close_label= '<img src="modal_close.jpg" alt="close window" />',
	this.width= 300,
	this.height= 300,
	this.show_until= null,
	this.show_always= false,
	this.show_onload= true;
	
	var $ = YAHOO.util.Dom.get;
	var setStyle=YAHOO.util.Dom.setStyle;
	
	if(this.config !== false){
		for(var i in this.config){ this[i] = this.config[i]; }
	}
	
	
	this.checkDate= function() {
		if(this.show_until!=null) {
			if(new Date()>this.show_until){ return false; }
			else { return true; }
		}
	}
				
	this.Elem = function(type, object) {
		var element= document.createElement(type);
		if (object) { element.setAttribute('id',object.id); }
		return element;
	 }
	 
	this.makeRequest= function() {
		
		var handleSuccess= function(o){ $('modal_body').innerHTML=o.responseText; }
		
		var handleFailure= function(o){ $('modal_body').innerHTML='Oops, something went terribly wrong...'; }
		
		var callback= {success:handleSuccess,failure:handleFailure}; 
		
		var request = YAHOO.util.Connect.asyncRequest('GET',this.url,callback);
	}
	
		
	this.build= function() { 
		
		if(this.show_until==null) { YAHOO.util.Cookie.set("seen", "1"); }
		else { YAHOO.util.Cookie.set("seen", "1", { expires: this.show_until }); }
		
		var page = this.Elem("div", {id: 'modal_page'});
		var bg = this.Elem("div", {id: 'modal_bg'});
		var container = this.Elem("div", {id: 'modal_container'});
		var modal = this.Elem("div", {id: 'modal'});
		var top = this.Elem("div", {id: 'modal_top'});
		var button = this.Elem("span", {id: 'close'});
		var content = this.Elem("div", {id: 'modal_body'});

		document.body.appendChild(page);
		page.appendChild(bg);
		bg.appendChild(container);
		container.appendChild(modal);
		modal.appendChild(top);
		top.appendChild(button);
		modal.appendChild(content);
		
		button.innerHTML=this.close_label;
		YAHOO.util.Event.addListener('close', "click", function() { 
		
			var fadeOut= new YAHOO.util.Anim(
			  'modal_page' ,
			  { opacity: {from: 1, to: 0 } },
			  0.25,YAHOO.util.Easing.easeOut);
			
			fadeOut.animate();
			fadeOut.onComplete.subscribe(function(){
				setStyle('modal_page', 'display', 'none');
			});
		});
		
		if(this.height!=300) {
			setStyle('modal', 'height', this.height+'px');
			setStyle('modal', 'top', '-'+this.height/2+'px'); 
		}
		if(this.width!=300) {
			setStyle('modal', 'width', this.width+'px');
			setStyle('modal', 'left', '-'+this.width/2+'px');
		}
		
		
		if(navigator.appName=='Microsoft Internet Explorer') {
			setStyle('modal_bg', 'left', document.documentElement.scrollLeft + "px"); 
			setStyle('modal_bg', 'top',  document.documentElement.scrollTop + "px"); 
			setStyle('modal_bg', 'width', document.documentElement.clientWidth + "px"); 
			setStyle('modal_bg', 'height', document.documentElement.clientHeight + "px"); 
			setStyle('modal_bg', 'background', 'transparent url(modal_bg.gif) repeat'); 
		}
		
		setStyle('modal_page', 'display', 'block');
		
		var fadeIn= new YAHOO.util.Anim(
		  'modal_page' ,
		  { opacity: {from: 0, to: 1 } },
		  0.25,YAHOO.util.Easing.easeIn);
		
		fadeIn.animate();
		
		setStyle('modal_page', 'top', document.body.scrollTop);
		this.makeRequest();
			
	}
	
	this.manual= function() {
		if(this.checkDate()==false) { return; }
		else { this.build(); }
	}
	
	this.automatic= function() {
		if(this.show_onload!=false) {
			if(this.show_always==true) {this.build(); }
			
			if(YAHOO.util.Cookie.get("seen")=='1' && this.show_always==false) { return; }
			else if(this.checkDate()==false) { return; }
			else { this.build(); }
		}
	}
	
	YAHOO.util.Event.addListener("show_modal", "click", function() { this.build(); },this,true);
	YAHOO.util.Event.onDOMReady(function() { this.automatic();},this,true); 

}
