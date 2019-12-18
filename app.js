const employee_class = require("./lib/employee.js");
const manager_class = require("./lib/manager.js");
const engineer_class = require("./lib/engineer.js");
const intern_class = require("./lib/intern.js");
const inquirer = require("inquirer");

var this_manager = new manager_class();              //placeholders for later
var this_engineer = new engineer_class();              
var this_intern = new intern_class();              

const bob = new employee_class("Bob", 1, "bob@fakemail.com");
const norman = new manager_class("Norman", 2, "norman@fakemail.com", 4564345);

// bob.printathing();
// console.log(bob.getName());
// console.log(bob.getId());
// console.log(bob.getEmail());
// console.log(bob.getRole());

// console.log(norman.getOfficeNumber());
// console.log("hi");

getOneEmployee();
//console.log(employees);

var employees = []; //array of employee objects

function getOneEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is this employee's name?",
        name: "name"
      },
      {
        type: "number",
        message: "What is this employee's Employee ID?",
        name: "ID"
      },
      {
        type: "input",
        message: "What is this employee's email address?",
        name: "email"
      },
      {
        type: "list",
        message: "What is this employee's role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"]
      },
      {
        type: "confirm",
        message: "Add another employee?",
        name: "not_done"
      }
    ])
    .then(function(response) {
     
      switch (response.role) {
         
        case "Manager":
            this_manager =new manager_class(response.name, response.ID, "norman@fakemail.com", 4564345);
            employees.push(this_manager);
          break;
        case "Engineer":
            this_engineer = new engineer_class(response.name, response.ID, "norman@fakemail.com", "gitstub");
            employees.push(this_engineer);
          break;
        case "Intern":
            this_intern = new intern_class(response.name, response.ID, "norman@fakemail.com", "schoolstub");
            employees.push(this_intern);          
        break;

        default:
          break;
      }

      

      if (response.not_done) {
        getOneEmployee();
      } else {
        //data input is done here.
        
        console.log("inputs done.  showing the first name here: ");
        console.log(employees[1].getName());

      }
    });
}

// inquirer
//   .prompt([
//     {
//       type: "input",
//       message: "What is yourname?",
//       name: "username"
//     },
//     {
//       type: "password",
//       message: "What is your password?",
//       name: "password"
//     },
//     {
//       type: "password",
//       message: "Re-enter password to confirm:",
//       name: "confirm"
//     }
//   ])
//   .then(function(response) {

//     if (response.confirm === response.password) {
//       console.log("Success!");
//     }
//     else {
//       console.log("You forgot your password already?!");
//     }
//   });
