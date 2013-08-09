var casper = require('casper').create({
	viewportSize: {
        width: 1024,
        height: 768
    }
});
//setting cookies
casper.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');

//opening amazon login page
casper.start('https://www.amazon.de/ap/signin?_encoding=UTF8&openid.assoc_handle=deflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.de%2Fgp%2Fyourstore%2Fhome%3Fie%3DUTF8%26ref_%3Dgno_signin');

//performing login. Mind that the email & password doesn't work ;)
casper.thenEvaluate(function(){
	document.querySelector('input[name="email"]').setAttribute('value', "shopperbot@gmail.com");
	document.querySelector('input[name="password"]').setAttribute('value', "password_here");
	document.querySelector('form[name="signIn"]').submit();
}, 'CasperJS');

//getting random word


//Performing search
casper.thenEvaluate(function(){
	document.querySelector('input[name="field-keywords"]').setAttribute('value', "keyboard");
	document.querySelector('form[name="site-search"]').submit();
}, 'CasperJS');


//Checking, out of all the results, which one is less than the max amount( 20 bucks)

casper.thenEvaluate(function(){
	
	var i = 0;
	var selector = '';
	var text = "";
	var price = 0.0;
	do{
		selector = '#result_' + i + ' ul li a span';
		text = document.querySelector(selector).innerText; 
		text = text.split(" ");
		text = text[1].split(",");
		price = parseFloat(text[0]) + (parseFloat(text[1])/100);
		//__utils__.echo(price);
		//__utils__.echo(i);
		i = i + 1;
		if (i > 16) {
			i = 0;
			//__utils__.echo("next page");
			casper.thenClick('#pagnNextLink');
		};

	}while(price > 21);
	var res = '#result_' + (i-1) + ' h3 a';
	//__utils__.echo(res);
	
	//The following line does not work. I am not able to click on the link
	document.querySelector(res).click();
	
	
}, 'CasperJS');




//taking screenshot - used for debug
casper.then(function(){
	this.viewport(1280, 1024);
	this.wait(5000);

});

casper.then(function(){
	this.capture('amazon.png',{
		top: 0,
		left: 0,
		width: 1280,
		height: 1024
	});
});

casper.run();
