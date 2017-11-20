const {Builder, By, Key, until} = require('selenium-webdriver');
var faker = require('faker');
var randomDay = require('random-day');

let driver = new Builder().forBrowser('chrome') .build();
driver.get("http://localhost:3000");

#creates random generated username
var name = faker.name.findName();

#signup
driver.findElement(By.id("signupUsername")).sendKeys(name);
driver.findElement(By.id("signupPassword")).sendKeys("password");
driver.findElement(By.id("signupButton")).click();

#creating expenses
driver.wait(until.elementLocated(By.id('expense')));
for(var i = 0; i < 5; i++){
	 driver.findElement(By.id("date")).sendKeys("2010-01-" + randomDay());
	    driver.findElement(By.id("time")).sendKeys("01:30 pm");
	      driver.findElement(By.id("amount")).sendKeys("5");
	        driver.findElement(By.id("description")).sendKeys("test");
		  driver.findElement(By.id("expenseButton")).click();
}

#generating report
driver.findElement(By.id("start")).sendKeys("2010-01-01");
driver.findElement(By.id("end")).sendKeys("2010-01-31");
driver.findElement(By.id("reportbutton")).click();

#calculate the amount
driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'" + "Week subtotal" + "')]")));
driver.findElements(By.xpath("//*[contains(text(),'" + "Week subtotal" + "')]")).then(
		  function(elems){
			      elems.forEach(function (elem) {
				      	elem.getText().then(function(textValue){
						           console.log(parseInt((textValue.split("$")[1])));
							          });
					    });
		  }); 
