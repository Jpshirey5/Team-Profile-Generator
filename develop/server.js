const inquirer = require('inquirer');
const fs = require('fs');
const generateHTML = require('./genHTML');

class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return "Employee";
    }
}

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole() {
        return "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getRole() {
        return "Engineer";
    }

    getGithub() {
        return this.github;
    }
}

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getRole() {
        return "Intern";
    }

    getSchool() {
        return this.school;
    }
}

const teamMembers = [];

function promptManager() {
    console.log('Please enter the following information for the team manager:');
    inquirer.prompt([
      {
        type: 'input',
        message: 'Name:',
        name: 'name',
      },
      {
        type: 'input',
        message: 'Employee ID:',
        name: 'id',
      },
      {
        type: 'input',
        message: 'Email address:',
        name: 'email',
      },
      {
        type: 'input',
        message: 'Office number:',
        name: 'officeNumber',
      },
    ])
      .then((answers) => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        teamMembers.push(manager);
        showMenu();
      });
  }

  function showMenu() {
    console.log('What would you like to do next?');
    inquirer.prompt([
      {
        type: 'list',
        message: 'Please select an option:',
        name: 'menu',
        choices: [
          'Add Engineer',
          'Add Intern',
          'Finish Building Team',
        ],
      },
    ])
      .then((answers) => {
        switch (answers.menu) {
          case 'Add Engineer':
            promptEngineer();
            break;
          case 'Add Intern':
            promptIntern();
            break;
          case 'Finish Building Team':
            generateHTML(teamMembers);
            break;
          default:
            break;
        }
        return finish();
      });
  }

  function promptEngineer() {
    console.log('Please enter the following information for the engineer:');
    inquirer.prompt([
      {
        type: 'input',
        message: 'Name:',
        name: 'name',
      },
      {
        type: 'input',
        message: 'Employee ID:',
        name: 'id',
      },
      {
        type: 'input',
        message: 'Email address:',
        name: 'email',
      },
      {
        type: 'input',
        message: 'GitHub username:',
        name: 'github',
      },
    ])
      .then((answers) => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
        teamMembers.push(engineer);
        showMenu();
      });
  }
  
  function promptIntern() {
    console.log('Please enter the following information for the intern:');
    inquirer.prompt([
      {
        type: 'input',
        message: 'Name:',
        name: 'name',
      },
      {
        type: 'input',
        message: 'Employee ID:',
        name: 'id',
      },
      {
        type: 'input',
        message: 'Email address:',
        name: 'email',
      },
      {
        type: 'input',
        message: 'School:',
        name: 'school',
      },
    ])
      .then((answers) => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
        teamMembers.push(intern);
        showMenu();
      });
  }

  function getInfo() {
    promptManager()
  }
  
  function finish() {
    const gerneratePage = generateHTML(teamMembers)
    const fileName = 'index.html'
  
    writeFile(fileName, gerneratePage)
  }
  
  function writeFile(fileName, gerneratePage) {
    fs.writeFileSync(fileName, gerneratePage, (err) => {
      if (err) {
        console.log(err)
      } else {
        console("done")
      }
    })
  }
  getInfo()
  module.exports = promptManager