const employee_class= require("./lib/employee.js");
const manager_class=require("./lib/manager.js");


const bob =new employee_class("Bob",1,"bob@fakemail.com");
const norman=new manager_class("Norman",2,"norman@fakemail.com",4564345);

bob.printathing();
console.log(bob.getName());
console.log(bob.getId());
console.log(bob.getEmail());
console.log(bob.getRole());

console.log(norman.getOfficeNumber());
console.log("hi");