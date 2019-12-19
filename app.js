const employee_class = require("./lib/employee.js");
const manager_class = require("./lib/manager.js");
const engineer_class = require("./lib/engineer.js");
const intern_class = require("./lib/intern.js");
const inquirer = require("inquirer");
const fs=require("fs");

const util = require("util");
var cards_html="";


var this_manager = new manager_class(); //placeholders for later
var this_engineer = new engineer_class();
var this_intern = new intern_class();

const bob = new employee_class("Bob", 1, "bob@fakemail.com");
const norman = new manager_class("Norman", 2, "norman@fakemail.com", 4564345);


var employees = []; //array of employee objects
var another_employee = true;

async function init() {

    while (another_employee) {

        try {
            const answers = await getOneEmployee();
///////////////////////////////
            switch (answers.role) {
                case "Manager":
                    const officePhone = await getOneAnswer("What is this employee's Office Phone #?");
                    this_manager = new manager_class(answers.name, answers.ID, answers.email, officePhone.answer);
                    employees.push(this_manager);
                    break;
                case "Engineer":
                    const github = await getOneAnswer("What is this employee's github?");
                    this_engineer = new engineer_class(answers.name, answers.ID, answers.email, github.answer);
                    employees.push(this_engineer);
                    break;
                case "Intern":
                    const school = await getOneAnswer("What is this employee's school?");
                    this_intern = new intern_class(answers.name, answers.ID, answers.email, school.answer);
                    employees.push(this_intern);
                    break;
                default:
                    break;
            }
/////////////////////////////////
            const answer3 = await promptToContinue("Would you like to enter another employee?");
            another_employee = answer3.answer;

        } catch (err) {
            console.log(err);
        }
    }
}


async function writeTeamFile() {

    try {
        const nothing = await init();

        //populate the html
        var first="";
        var middle="";
        var last="";

        try {
            fs.unlinkSync("./output/index.html")
            //file removed
          } catch(err) {
            //console.error(err)   
            //fail quietly here since there might legitimately not be a file yet.
          }


        fs.readFile("./templates/main_begin.html", "utf8", function(error, data) {
            if (error) {
              return console.log(error);
            }
            first=data;

            fs.appendFile ("./output/index.html", first , function (err) {
                if (err) {
                  return console.log (err);
                }
              ////////////
              //cycle through the employee array, building up the cards
              /////////////
              cards_html="";
              for (let i=0;i<employees.length;i++){
                  console.log(employees[i].getRole());
                switch (employees[i].getRole()) {
                    case "Manager":
                        cards_html+=html_manager(employees[i]);   
                        break;
                    case "Engineer":
                        cards_html+=html_engineer(employees[i]);   
                        break;
                    case "Intern":
                        cards_html+=html_intern(employees[i]);   
                    break;
                    default:
                        break;
                }

               // console.log(cards_html);
              }
                fs.appendFile ("./output/index.html", cards_html , function (err) {
                    if (err) {
                      return console.log (err);
                    }
                  
                    fs.readFile("./templates/main_end.html", "utf8", function(error, data) {
                        if (error) {
                          return console.log(error);
                        }
                        last=data;

                        fs.appendFile ("./output/index.html", last , function (err) {
                            if (err) {
                              return console.log (err);
                            }
                          
                            console.log ('Success!');
                          });
                    });
                  });
              });


        });

    
       
    } catch (err) {
        console.log(err);
    }
}

writeTeamFile();

function getOneEmployee() {
    return inquirer.prompt([
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
        }
    ]);
};


function getOneAnswer(Prompt) {
    return inquirer.prompt([
        {
            type: "input",
            message: Prompt,
            name: "answer"
        }
    ]);
};

function promptToContinue(Prompt) {
    return inquirer.prompt([
        {
            type: "confirm",
            message: Prompt,
            name: "answer"
        }
    ]);
};


function getOneEmployee_old() {
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
        .then(function (response) {
            switch (response.role) {
                case "Manager":
                    this_manager = new manager_class(response.name, response.ID, "norman@fakemail.com", 4564345);
                    employees.push(this_manager);
                    break;
                case "Engineer":
                    this_engineer = new engineer_class(
                        response.name,
                        response.ID,
                        "norman@fakemail.com",
                        "gitstub"
                    );
                    employees.push(this_engineer);
                    break;
                case "Intern":
                    this_intern = new intern_class(
                        response.name,
                        response.ID,
                        "norman@fakemail.com",
                        "schoolstub"
                    );
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

function html_manager(manager){
var thing = 
`<div  class="col-sm-4">
<div class="card">
  <div class="card-body">
    <div class="card-top">
      <h5 class="card-title">${manager.name}</h5>
      <h5 class="card-title">
        <i class="fas fa-mug-hot"></i> Manager
      </h5>
    </div>

    <ul class="list-group list-group-flush">
      <li class="list-group-item">ID: ${manager.id}</li>
      <li class="list-group-item">Email: ${manager.email}</li>
      <li class="list-group-item">Office Number: ${manager.officeNumber}</li>
    </ul>
  </div>
  </div>
</div>`
return thing;

}


function html_engineer(engineer){
    var thing = 
    `<div  class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <div class="card-top">
          <h5 class="card-title">${engineer.name}</h5>
          <h5 class="card-title">
          <i class="fas fa-glasses"></i> Engineer
          </h5>
        </div>
        
        <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${engineer.id}</li>
          <li class="list-group-item">Email: ${engineer.email}</li>
          <li class="list-group-item">GitHub: ${engineer.github}</li>
        </ul>
      </div>
      </div>
    </div>`
    return thing;
    
    }

    function html_intern(intern){
        var thing = 
        `<div  class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <div class="card-top">
              <h5 class="card-title">${intern.name}</h5>
              <h5 class="card-title">
              <i class="fas fa-user-graduate"></i> intern
              </h5>
            </div>
            
            <ul class="list-group list-group-flush">
              <li class="list-group-item">ID: ${intern.id}</li>
              <li class="list-group-item">Email: ${intern.email}</li>
              <li class="list-group-item">School: ${intern.school}</li>
            </ul>
          </div>
          </div>
        </div>`
        return thing;
        
        }