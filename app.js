const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const outputStyling = path.join(OUTPUT_DIR, "style.css");
const styleDir = path.resolve(__dirname, "./style");
const cssOnPage = fs.readFileSync(path.resolve(styleDir, "style.css"), "utf8");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

function createManager() {
    return inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?",
        },
        {
            type: "input",
            name: "managerID",
            message: "What is your manager's ID?",
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?",
        },
        {
            type: "input",
            name: "managerOffice",
            message: "What is your manager's office number?",
        },
        {
            type: "list",
            name: "roleSelect",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer", "Intern", "None"],
        },
    ]);
}

function askEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is your engineer's name?",
        },
        {
            type: "input",
            name: "engineerID",
            message: "What is your engineer's ID?",
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your engineer's email?",
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is your engineer's Github profile name?",
        },
        {
            type: "list",
            name: "roleSelect",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer", "Intern", "None"],
        },
    ]).then((answers) => {
                        const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
                        teamMembers.push(engineer);
                        answers.roleSelect === "Engineer" ? askEngineer() : answers.roleSelect === "Intern" ? askIntern() : buildTeam()
    })
    .catch((err) => console.error(err));
}

function askIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is your intern's name?",
        },
        {
            type: "input",
            name: "internID",
            message: "What is your intern's ID?",
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your intern's email?",
        },
        {
            type: "input",
            name: "internSchool",
            message: "What school does your intern attend?",
        },
        {
            type: "list",
            name: "roleSelect",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer", "Intern", "None"],
        },
    ]).then((answers) => {
                        const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
                        teamMembers.push(intern);
                        answers.roleSelect === "Engineer" ? askEngineer() : answers.roleSelect === "Intern" ? askIntern() : buildTeam()
    })
    .catch((err) => console.error(err));
}
      
        

createManager()
            .then((answers) => {
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOffice);
            teamMembers.push(manager);
            answers.roleSelect === "Engineer" ? askEngineer() : answers.roleSelect === "Intern" ? askIntern() : buildTeam()
    })
    .catch((err) => console.error(err));

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

        // const OUTPUT_DIR = path.resolve(__dirname, "output");
        // const outputPath = path.join(OUTPUT_DIR, "team.html");

        // function buildTeam() {
        //     if (!fs.existsSync(OUTPUT_DIR)) {
        //         fs.mkdirSync(OUTPUT_DIR)
        //     }
        //     fs.writeFileSync(OUTPUT_DIR, render(teamMembers), "utf-8")
        // }


// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

//build team
function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    fs.writeFileSync(outputStyling, cssOnPage, "utf-8")
    //fs.writeFileSync(OUTPUT_DIR, render(teamMembers), "utf-8")
    
}

// start()