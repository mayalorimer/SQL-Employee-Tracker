// importing all the needed packages
const mysql = require('mysql2'); 
const inquirer = require('inquirer');
const console = require('console');
//require('dotenv').config();

const db = require('./db/connection');
const { query } = require('./db/connection');
//const sequelize = require('sequelize');



const PORT = process.env.PORT || 3001;



//function for inquirer prompts for app
async function prompts(){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do",
            name: "action", 
            choices: [
                "View employees",
                "View roles",
                "View departments",
                "Add department",
                "Add role",
                "Add employee",
                "Edit employee",
                "Exit"
            ]
        }
    ])
    .then(answers => {
        response(answers)
    })
}

prompts();
// function to determine what to do based on initial answer choice
function response(answers) {
    if (answers.action === "View employees"){
        viewEmployees();
    }
    else if(answers.action === "View roles"){
        viewRoles();
    }
    else if(answers.action === "View departments"){
        viewDepartment(); 
    }
    else if(answers.action === "Add department"){ 
        addDepartment();
    }
    else if(answers.action === "Add role"){
        addRole();
    }
    else if(answers.action === "Add employee"){
        addEmployee();
    }
    else if(answers.action === "Edit employee"){
        editEmployee();
    }
    // exit the program if exit is chosen
    else {
        db.close(); 
        return; 
    }
}


async function viewDepartment() {
    // select all the departments
    const sql = `SELECT * FROM department`;

    const rows = await db.promise().query(sql);
    console.table(rows);  
    //do I have to return rows???
    prompts();
};

async function viewRoles(){
    // select all the roles 
    const sql = `SELECT * FROM role`;

    const rows = await db.promise().query(sql);
    console.table(rows); 
    prompts(); 
};

async function viewEmployees(){
    const sql = `SELECT * FROM employee`;

    const rows = await db.promise().query(sql);
    console.table(rows); 
    prompts();
}

// function to add a new department
function addDepartment(){
    inquirer.prompt([
        {
            name: "name",
            message: "What is the name of the department?"
        }
    ])
    .then(res => {
        let name = res;

        db.promise().query("INSERT INTO department SET ?", name)
          .then(() => console.log(`Added to the database`))
          .then(() => 
          prompts())
      })

};

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the new role name?",
            name: 'name'
        },
        {
            type: 'input',
            message: "What is the salary for the new role",
            name: 'salary'
        },
        {
            type: 'input',
            message: "What is the department of the role?",
            name: 'department'
        }
    ])
    .then(res => {
        let name =  res.name;
        let salary = parseInt(res.salary);
        let department = parseInt(res.department); 

        db.promise().query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [name, salary, department])
            .then(() => console.log("New role added to the database"))
            .then(() => prompts())
    })
};

async function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the first name?",
            name: 'firstName'
        },
        {
            type: 'input',
            message: "What is the last name",
            name: 'lastName'
        },
        {
            type: 'input',
            message: "What is the new employee's role?",
            name: 'role'
        },
        {
            type: 'input',
            message: "Who is the new employee's manager?",
            name: 'manager'
        }
    ])
    .then(res => {
        let name =  res.firstName;
        let lastName = res.lastName
        let role = parseInt(res.role);
        let manager = parseInt(res.manager); 

        db.promise().query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [name, lastName, role, manager])
            .then(() => console.log("New employee added to the database"))
            .then(() => prompts())
    })
}

// prompted to select an employee to update and their new role which is then updated in the database
async function editEmployee(){
    const rows =  await db.promise().query('SELECT * FROM employee');
    console.table(rows);

    let employeeList = []; 
    for(let i = 0; i < employees.length; i++){
        employeeList.push(employees[i].first_name + " " + employees[i].last_name);
    }
         inquirer.prompt([
            {
              type: 'list',
              name: 'Employeename',
              message: "Which employee would you like to update?",
              choices: employeeList
            },
            {
                type: "input",
                name: "role",
                message: "What is the employee's new role?"
            }
          ])
    };

  //  prompts();

    



