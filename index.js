// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const cTable = require('console.table'); 
const db = require('./db/connection');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3306;
const start =['View All Departments', 'View All Roles',
 'View All Employees', 'Add A Department', 'Add a Role',
'Add an Employee','Update an Employee Role', 'exit']

//express middleware

//Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

//Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });


const startApp = () => {
    inquirer.prompt(
      {
        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: start

 }
    ).then(answers => {
      if (answers.type === 'View All Departments') {
        //show all dept table
        showDepts();

      } else if (answers.type === 'View All Roles') {
        //show all roles table
        showRoles();

    } else if (answers.type === 'View All Employees') {
        //show all roles table
        showEmployees();

      } else if (answers.type === 'Add a Department') {
        //add a dept
        addDept();

    } else if (answers.type === 'Add a Role') {
        addRole();

    } else if (answers.type === 'Add an Employee') {
        //add an employee
        addEmployee();

    } else if (answers.type === 'Update an Employee Role') {
        //update an employee
        updateEmployee();

      } else {
        //exit
        connectionEnd();
      }
    })
  };
  // An array of questions for user input

  //addDept
  const addDept = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'department',
        message: 'Department name? (Required)',
        validate: departmentInput => {
          if (departmentInput) {
            return true;
          } else {
            console.log('Please enter department!');
            return false;
          }
        }
      },

    ]).then(answers => {
      console.log(answers);
      const department = new Department(answers.name);
      team.push(department);
      mainMenu();
    })

  };
  //ADD ROLE
  const addRole = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is name of the role? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter role name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Please enter the salary',
        validate: salaryInput => {
          if (salaryInput) {
            return true;
          } else {
            console.log('Please enter the salary');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'role dept',
        message: 'What is the department for the role? (Required)',
        validate: roleInput => {
          if (roleInput) {
            return true;
          } else {
            console.log('Please enter the role!');
            return false;
          }
        }
      },
     
    ]).then(answers => {
      console.log(answers);
      const Role = new Role(answers.name, answers.role, answers.salary);
      team.push(Role);
      mainMenu();
    });
  }
  //INTERN
  const addEmployee = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the first name? (Required)',
        validate: first_nameInput => {
          if (first_nameInput) {
            return true;
          } else {
            console.log('Please enter your first name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the last name? (Required)',
        validate: last_nameInput => {
          if (last_nameInput) {
            return true;
          } else {
            console.log('Please enter your last name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'role',
        message: 'Please enter role (Required)',
        validate: roleInput => {
          if (roleInput) {
            return true;
          } else {
            console.log('Please enter the role!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'manager',
        message: 'Who is the manager? (Required)',
        validate: managerInput => {
          if (managerInput) {
            return true;
          } else {
            console.log('Please enter the manager!');
            return false;
          }
        }
      },

    ]).then(answers => {
      console.log(answers);
      const addEmployee = new Employee(answers.first_name, answers.last_name, answers.role, answers.manager);
      team.push(employee);
      mainMenu();
    });
  }

  const connectionEnd = () => {
    console.log(`complete`);
  

}

mainMenu();
}
  

startApp();