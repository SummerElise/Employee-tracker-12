const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employeeTracker_DB',
});

connection.connect((err) => {
    if (err) throw err;
    runSearch();
});

const runSearch = () => {
    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            'Add Employee',
            'Add Role',
            'Add Department',
            'Update Employee Role',
            'View Employee By Department',
            'View Employee By Role',
            'View All Employees',
            'View All Roles',
            'EXIT',
        ],
    })
    .then((answer) => {
        if (answer.action === 'Add Employee', 'Add Role', 'Add Department')  {
            addAction();
        } else if (answer.action === 'Update Employee Role') {
            updateAction();
        } else if (answer.action === 'View Employee By Department', 'View Employee By Role',
        'View All Employees', 'View All Roles') {
            viewAction();
        } else {
            connection.end();
        }
    });
};

//function to handle 'adding'
const addAction = () => {
    inquirer
    .prompt([
    {
        name: 'category',
        type: 'list',
        message: 'What would you like to add?',
        choices: [
            'Employee',
            'Role',
            'Department',
        ],
    }
    ])
    .then((answer) => {
        if (answer.category === 'Employee') {
        employeeAction();
        } else if (answer.category === 'Role') {
            roleAction();
        } else {
            departmentAction();
        }
    });
};