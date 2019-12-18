const employee_class = require("./lib/employee.js");
const manager_class = require("./lib/manager.js");
const engineer_class = require("./lib/engineer.js");
const intern_class = require("./lib/intern.js");
const inquirer = require("inquirer");

const util = require("util");



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

        //     console.log(`name was: ${answers.name}`);
        //    // console.log(`alien was: ${answer2.answer}`);
        //     console.log(`another was: ${answer3.answer}`);

            another_employee = answer3.answer;

        } catch (err) {
            console.log(err);
        }
    }
}
//const getInputsAsync = util.promisify(init);

async function writeTeamFile() {

    try {
        const nothing = await init();
        console.log("Successfully wrote to index.html");
        console.log(`second name is ${employees[1].getName()}`);
    } catch (error) {

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
