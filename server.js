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




// Default response for any other request (Not found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});