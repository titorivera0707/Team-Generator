const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
let response1;
let response2;

const OUTPUT_DIR = path.resolve(__dirname, "templates");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamMembers = []

const questions = () => {
    var responseQ = response1
inquirer.prompt([
    {
    type: 'input',
    message: 'What is your name?',
    name: 'name'
    },
    {
    type: 'input',
    message: "ID Number?",
    name: 'id'
    },
    {
    type: 'input',
    message: "What is your email?",
    name: 'email'
    },
]).then((response)=> {
console.log(response)
if (responseQ === "Engineer"){
    console.log("Engineer")
    const engineer = new Engineer(response.name, response.id, response.email, response2)
    teamMembers.push(engineer)
}
if (responseQ === "Manager"){
    console.log("Manager")
    const manager = new Manager(response.name, response.id, response.email, response2)
    teamMembers.push(manager)
}
if (responseQ === "Intern"){
    console.log("Intern")
    const intern = new Intern(response.name, response.id, response.email, response2)
    teamMembers.push(intern)
}
console.log(teamMembers)
role1()
})
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

const role1 = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: "What is your role?",
            name: 'role',
            choices: ["Engineer", "Intern", "Manager", "Finished, create team!"]
        }
    ]).then((response)=> {
        if(response.role === "Finished, create team!"){
            finished()
        }
        if(response.role === "Engineer"){
            response1 = response.role
            engineer()
        }
        if(response.role === "Intern"){
            response1 = response.role
            intern()
        }
        if(response.role === "Manager"){
            response1 = response.role
            manager()
        }
})
}

const engineer = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is your Github User?",
            name: 'github'
            }
    ]).then((response)=> {
        response2 = response.github
        questions();
    })
}

const intern = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: "What school did you attend?",
            name: 'school'
            }
    ]).then((response)=> {
        response2 = response.school
        questions();
    })
}

const manager = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is your Office Number?",
            name: 'officeNumber'
            }
    ]).then((response)=> {
        response2 = response.officeNumber
        questions();
    })
}

const finished = () => {
    fs.writeFile(outputPath, render(teamMembers), (err) => {
        if (err) throw err;
        console.log("Team Complete.")

        render(teamMembers);
})
}


role1()
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```