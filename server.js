// importing all the needed packages
const mysql = require('mysql2'); 
const inquirer = require('inquirer');
const console = require('console');

const db = require('./db/connection');


const PORT = process.env.PROT || 3001;



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


async function getDepartmentName(){
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the new department name?",
            name: 'departmentName'
        }
    ])
    .then(answers => {
        return answers.departmentName;
    })
}

async function roleInfo(){
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
    .then(answers => {
        return answers;
    })
}

async function employeeInfo(){
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
    .then(answers => {
        response(answers)
    })
}

async function viewDepartment() {
    // select all the departments
    const sql = `SELECT * FROM department`;

    const rows = await db.query(sql);
    console.table(rows);  
    //do I have to return rows???
    prompts();
};

async function viewRoles(){
    // select all the roles 
    const sql = `SELECT * FROM role`;

    const rows = await db.query(sql);
    console.table(rows); 
    prompts(); 
};

async function viewEmployees(){
    const sql = `SELECT * FROM employee`;

    const rows = await db.query(sql);
    console.table(rows); 
    prompts();
}

// function to add a new department
function addDepartment(){
    const departmentName = getDepartmentName();
    console.log(departmentName);
    const sql = `INSERT INTO department (name) VALUES = ?`;
    const rows = db.query(sql, departmentName);
    console.log(`New department added named ${departmentName}`);
    prompts();  
}

async function addRole() {
    const role = roleInfo(); 
    const departmentId = await role.department;
    const salary = role.salary;
    const name = role.title;
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const rows = await db.query(sql, [name, salary, departmentId]);
    console.log(`Added role ${name}`); 
    prompts();
}

async function addEmployee(employee){
    const roleId = await employee.role;
    const managerId = await employee.manager;
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const args = [employee.first_name, employee.last_name, roleId, managerId];
    const rows = await db.query(sql, args);
    console.log(`${employee.first_name} ${employee.last_name} was added`);
    prompts();
}

// prompted to select an employee to update and their new role which is then updated in the database
async function editEmployee(employeeInfo){


  //  prompts();
}
    



