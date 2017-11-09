const {Builder, By, Key, until} = require('selenium-webdriver');
var faker = require('faker');
var randomDay = require('random-day');
var randomInt = require('random-int');

let driver = new Builder().forBrowser('chrome') .build();
driver.get("http://localhost:3000");

//creates random generated username
var name = faker.name.findName();

var random;
var sum;
var r = 0;
function test_sum(a, b) {
  return a + b;
}

//signup
driver.findElement(By.id("signupUsername")).sendKeys(name);
driver.findElement(By.id("signupPassword")).sendKeys("password");
driver.findElement(By.id("signupButton")).click();

//creating expenses
driver.wait(until.elementLocated(By.id('expense')));
for(var i = 0; i < 5; i++){
  random = randomInt(50);
  driver.findElement(By.id("date")).sendKeys("2010-01-" + randomDay());
  driver.findElement(By.id("time")).sendKeys("01:30 pm");
  driver.findElement(By.id("amount")).sendKeys(random);
  driver.findElement(By.id("description")).sendKeys("test");
  driver.findElement(By.id("expenseButton")).click();
  r = random + r;
  random = r;
}

//generating report
driver.findElement(By.id("start")).sendKeys("2010-01-01");
driver.findElement(By.id("end")).sendKeys("2010-01-31");
driver.findElement(By.id("reportbutton")).click();

//calculate the amount
driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'" + "Week subtotal" + "')]")));
driver.findElements(By.xpath("//*[contains(text(),'" + "Week subtotal" + "')]")).then(
  function(elems){
   var count = 0;	  
   var s = 0;
    elems.forEach(function (elem) {
	elem.getText().then(function(textValue){
        var value = parseInt(textValue.split("$")[1]);
	sum = s;
	sum = test_sum(sum, value);
	s = sum;
	count = count + 1;
	if(count == elems.length){
          console.log("Expected Output - " + random);
	  console.log("Actual output - " + sum);
	  if(sum == random){
            console.log("Subtotal is equal to all the expenses!");
	  }else{
	    console.log("Subtotal is not equal to all the expenses!");
	  }
	}
       });
    }); 
});
driver.close();
