const {Builder, By, Key, until} = require('selenium-webdriver');
var faker = require('faker');
var retry = require('webdriverjs-retry');
var randomDay = require('random-day');

let driver = new Builder().forBrowser('chrome') .build();

var name = faker.name.findName();
var sum = 0;

driver.get("http://localhost:3000");
driver.findElement(By.id("signupUsername")).sendKeys(name);
driver.findElement(By.id("signupPassword")).sendKeys("password");
driver.findElement(By.id("signupButton")).click();

driver.wait(until.elementLocated(By.id('expense')));
for(var i = 0; i < 5; i++){
  driver.findElement(By.id("date")).sendKeys("2010-01-" + randomDay());
  driver.findElement(By.id("time")).sendKeys("01:30 pm");
  driver.findElement(By.id("amount")).sendKeys("5");
  driver.findElement(By.id("description")).sendKeys("test");
  driver.findElement(By.id("expenseButton")).click();
}

driver.findElement(By.id("start")).sendKeys("2010-01-01");
driver.findElement(By.id("end")).sendKeys("2010-01-31");
driver.findElement(By.id("reportbutton")).click();

driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'" + "Week subtotal" + "')]")));
driver.findElements(By.xpath("//*[contains(text(),'" + "Week subtotal" + "')]")).then(
  function(elems){
    elems.forEach(function (elem) {
	elem.getText().then(function(textValue){
           console.log(parseInt((textValue.split("$")[1])));
       });
    });
}); 
