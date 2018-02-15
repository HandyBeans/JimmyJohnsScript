
var casper = require('casper').create({   
    verbose: true, 
    logLevel: 'debug',
    pageSettings: {
         loadImages:  false,         // The WebPage instance used by Casper will
         loadPlugins: false,         // use these settings
         userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
});

casper.selectOptionByValue = function(selector, valueToMatch){
    this.evaluate(function(selector, valueToMatch){
        var select = document.querySelector(selector),
            found = false;
        Array.prototype.forEach.call(select.children, function(opt, i){
            if (!found && opt.value.indexOf(valueToMatch) !== -1) {
                select.selectedIndex = i;
                found = true;
            }
        });
        // dispatch change event in case there is some kind of validation
        var evt = document.createEvent("UIEvents"); // or "HTMLEvents"
        evt.initUIEvent("change", true, true);
        select.dispatchEvent(evt);
    }, selector, valueToMatch);
};


// print out all the messages in the headless browser context
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

// print out all the messages in the headless browser context
casper.on("page.error", function(msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});

var url = 'https://online.jimmyjohns.com/#/login';

casper.start(url, function() {
   console.log("page loaded");
// this.test.assertExists('form#loginForm', 'form is found');

this.waitForSelector("form input[name='email']", function(){
  //add your saved email address and password below
   this.fillSelectors("form[name='loginForm']", {
	'input#email' : '',
	'input#loginPassword' : ''
	}, true);
   
   console.log("Logging in...")
   this.click('#loginButton.redBtn');
   
   this.wait(5000, function(){
	this.echo(this.getCurrentUrl());
   });
});
//uses saved delivery address
this.waitForSelector("#startSavedDeliveryOrder.shadedBtn.deliveryBtn", function(){   

   console.log("Clicking saved delivery address button")
   this.click('#startSavedDeliveryOrder.shadedBtn.deliveryBtn');
   
   this.wait(5000, function(){
	this.echo(this.getCurrentUrl());
   });
});

this.waitForSelector("#favoritesLink", function(){

   console.log("Clicking Favorites Link")
   this.click('#favoritesLink');

   this.wait(5000, function(){
	this.echo(this.getCurrentUrl());
   });
});

this.waitForSelector(".redBtn", function(){

   console.log("Clicking order favorite button")
   this.click('.redBtn');

   this.wait(5000, function(){
	this.echo(this.getCurrentUrl());
   });
});

this.waitForSelector("#gotoCheckoutBtn.redBtn.firstBut", function(){

   console.log("Clicking checkout button")
   this.click('#gotoCheckoutBtn.redBtn.firstBut');

   this.wait(5000, function(){
	this.echo(this.getCurrentUrl());
//	this.capture('currentPage.png');
   });
});

this.waitForSelector("#selectPaymentType", function(){

   console.log("clicking dropdown")
   this.selectOptionByValue('select#selectPaymentType', "1");

   this.wait(5000, function(){
//        this.capture('currentPage2.png');

   });   
});

this.wait(5000, function(){
//input security code for card
   this.fillSelectors("form[name='myCCForm']", {
        'input#securityCode1' : ''
   });
//input tip amount
   this.fillSelectors("form[name='tipForm']", {
	'input#tipAmount' : ''
   });

   console.log("entered security code and tip")
   this.capture('CurrentPage3.png');
   this.click('.redBtn');   

   this.wait(5000, function(){
        this.echo(this.getCurrentUrl());
   });
});

this.wait(3000, function(){
   console.log("Submit Order")
//   this.click('#checkoutBtn.redBtn');

   this.wait((3000, function(){
	this.echo(this.getCurrentUrl());
   });
   this.capture('CurrentPage4.png');
});




});

casper.run();
JJorder2.js
Displaying JJorder2.js.