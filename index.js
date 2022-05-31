// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db/connection");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3306;
const start = [
  "View All Departments",
  "View All Roles",
  "View All Employees",
  "Add a Department",
  "Add a Role",
  "Add an Employee",
  "Update an Employee Role",
  "Remove Employee",
  "exit",
];

const startApp = () => {
  inquirer
    .prompt({
      type: "list",
      name: "type",
      message: "What would you like to do?",
      choices: start,
    })
    .then((answers) => {
      if (answers.type === "View All Departments") {
        //show all dept table
        showDepts();
      } else if (answers.type === "View All Roles") {
        //show all roles table
        showRoles();
      } else if (answers.type === "View All Employees") {
        //show all roles table
        showEmployees();
      } else if (answers.type === "Add a Department") {
        //add a dept
        addDept();
      } else if (answers.type === "Add a Role") {
        addRole();
      } else if (answers.type === "Add an Employee") {
        //add an employee
        addEmployee();
      } else if (answers.type === "Update an Employee Role") {
        //update an employee
        updateEmployee();
      } else if (answers.type === "Remove Employee") {
        //remove an employee
        removeEmployee();
      } else {
        //exit
        db.end();
      }
    });
};
////////////
const showDepts = () => {
  const sql = `SELECT department.id AS id, department.department_name AS department FROM department`;
  db.query(sql, (error, response) => {
    if (error) throw error;
    console.table(response);
    startApp();
  });
};

// showRoles()
const showRoles = () => {
  const sql = `SELECT roles.id, roles.title, department.department_name AS department
                  FROM roles INNER JOIN department ON roles.department_id = department.id`;
  db.query(sql, (error, response) => {
    if (error) throw error;
    console.table(response);
    startApp();
  });
};

// showEmployees())
const showEmployees = () => {
  let sql = `SELECT employee.id,  employee.first_name,   employee.last_name,  roles.title, 
                  department.department_name AS 'department', roles.salary FROM employee, roles, department 
                  WHERE department.id = roles.department_id  AND roles.id = employee.role_id
                  ORDER BY employee.id`;
  db.query(sql, (error, response) => {
    if (error) throw error;
    console.table(response);
    startApp();
  });
};

/////addDept///

const addDept = () => {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "What is the name of your new Department?",
      },
    ])
    .then((answer) => {
      let sql = `INSERT INTO department (department_name) VALUES (?)`;
      db.query(sql, answer.newDepartment, (error, response) => {
        if (error) throw error;
        console.log("dept added");
        console.table(response);
        showDepts();
      });
    });
};

//ADD ROLE
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is name of the role? (Required)",
        validate: (titleInput) => {
          if (titleInput) {
            return true;
          } else {
            console.log("Please enter role name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter the salary",
        validate: (salaryInput) => {
          if (salaryInput) {
            return true;
          } else {
            console.log("Please enter the salary");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "deptId",
        message: "What is the department for the role ID? (Required)",
        validate: (deptIdInput) => {
          if (deptIdInput) {
            return true;
          } else {
            console.log("Please enter the department role!");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
        [answer.title, answer.salary, answer.deptId],

        function (err, response) {
          if (err) throw err;

          console.table(response);
          console.log("Role Inserted!");
          showRoles();
        });
    });
};

//add employee
const addEmployee = () => 
{
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name? (Required)",
        validate: (first_nameInput) => {
          if (first_nameInput) {
            return true;
          } else {
            console.log("Please enter first name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name? (Required)",
        validate: (last_nameInput) => {
          if (last_nameInput) {
            return true;
          } else {
            console.log("Please enter last name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "roleId",
        message: "Please enter role ID(Required)",
        validate: (roleInput) => {
          if (roleInput) {
            return true;
          } else {
            console.log("Please enter the role ID!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the managers ID? (Required)",
        validate: (managerInput) => {
          if (managerInput) {
            return true;
          } else {
            console.log("Please enter manager ID!");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answer.first_name, answer.last_name, answer.roleId, answer.managerId],

        function (err, response) {
          if (err) throw err;
          console.table(response);

          showEmployees();
        });
    });
};


const updateEmployee = () => 
{
  inquirer
    .prompt([
      {
        type: "input",
        name: "updateEmployee",
        message: "Which employee would you like to update?",
      },

      {
        type: "input",
        name: "updateRole",
        message: "What do you want to update role to?",
      },
    ])
    .then(function (answer) {
      db.query(
        "UPDATE employee SET role_id=? WHERE first_name= ?",
        [answer.updateRole, answer.updateEmployee],

        function (err, response) {
          if (err) throw err;
          console.table(response);
          showEmployees();
        });
    });
};


async function removeEmployee () {

  const answer = await inquirer.prompt([
      {
          name: "employeeId",
          type: "input",
          message: "Enter the employee ID you want to delete  "
      }
  ]);

  db.query('DELETE FROM employee WHERE ?',
      {
          id: answer.employeeId
      },
      function (err) {
          if (err) throw err;
      }
  )
  console.log('Employee has been deleted in the database!');
   showEmployees();

};
startApp();
