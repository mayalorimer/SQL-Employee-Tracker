// importing all the needed packages
const express = require('express');
const Sequelize = require('sequelize');
const mysql = require('mysql2'); 
const inquirer = require('inquirer');
const console = require('console');

require('dotenv').config(); 

const PORT = process.env.PROT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    },
    console.log("Connected to the buisness database")
);


//function for inquirer prompts for app
async function prompts(){
    return inquirer.prompt([
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
                "Remove employee",
                "Exit"
            ]
        }
    ])
}

async function viewDepartment() {
    // select all the departments
    const sql = `SELECT * FROM department`;

    // asks the query then returns the data in a table
    const rows = await db.query(sql);
    console.table(rows); 
    //do I have to return rows???
};

async function viewRoles(){
    // select all the roles 
    const sql = `SELECT * FROM role`;

    const rows = await db.query(sql);
    console.table(rows); 
};

async function viewEmployees(){
    const sql = `SELECT * FROM employee`;

    const rows = await db.query(sql);
    console.table(rows); 
}

// function to add a new department
async function addDepartment(department){
    const departmentName = department.name;
    const sql = `INSERT INTO department (name) VALUES = ?`;
    const rows = await db.query(sql, departmentName);
    console.log(`New department added named ${departmentName}`);
}





addRole()
addEmployee()
editEmployee()




// Default response for any other request (Not found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});