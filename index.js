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
    start();
});

const start = () => {
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

const employeeAction = () => {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'What is the first name?',
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is the last name?',
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'What is their role ID?',
        },
        {
            name: 'manager_id',
            type: 'input',
            message: 'What is their manager ID?',
        },
    ])
    .then((answer) => {
        connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: answer.item_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manger_id,
            },
            (err) => {
                if (err) throw err;
                console.log('Employee has been successfully added!');
                start();
            }
        );
    });
};

const roleAction = () => {
    inquirer
    .prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of the Role you wish to add?',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary for this Role?',
        },
        {
            name: 'deptID',
            type: 'input',
            message: 'What is the Department ID?',
        },
    ])
    .then((answer) => {
        connection.query(
            'INSERT INTO role SET ?',
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.deptID,
            },
            (err) => {
                if (err) throw err;
                console.log('Role has been successfully added!');
                start();
            }
        );
    });
};

const departmentAction = () => {
    inquirer
    .prompt([
        {
            name: 'deptName',
            type: 'input',
            message: 'What is the name of the Department you wish to add?',
        },
    ])
    .then((answer) => {
        connection.query(
            'INSERT INTO role SET ?',
            {
                name: answer.deptName,
            },
            (err) => {
                if (err) throw err;
                console.log('Department has been successfully added!');
                start();
            }
        );
    });
};