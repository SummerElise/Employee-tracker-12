const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');


console.table()

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
            'Add',
            'Update',
            'View',
            'Remove',
            'Exit',
        ],
    })
    .then((answer) => {
        if (answer.action === 'Add')  {
            addAction();
        } else if (answer.action === 'Update') {
            updateAction();
        } else if (answer.action === 'View') {
            viewAction();
        } else if (answer.action === 'Remove') {
            RemoveAction();
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
            'INSERT INTO department SET ?',
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

const updateAction = () => {
    connection.query(
        'SELECT * FROM employee', (err, res) => {
            if (err) throw err;
            inquirer
            .prompt([
                {
                    name: 'choice',
                    type: 'rawlist',
                    choices() {
                        const choiceArray = []
                        res.forEach(({ first_name, last_name, role_id, manager_id }) => {
                            choiceArray.push(role_id + '' + first_name + '' + last_name + '' + manager_id)
                        })
                        return choiceArray
                        },
                        message: 'What employee would you like to update?'
                    },
                    {
                            name: 'title',
                            type: 'input',
                            message: 'What is the title of the Role you wish to update?',
                    },
                    {
                            name: 'role',
                            type: 'input',
                            message: 'What is the updated Role ID?',
                    },
                    {
                            name: 'deptID',
                            type: 'input',
                            message: 'What is the Department ID?',
                    },
                    ])
                
            .then((answer) => {
              
                connection.query(
                    'UPDATE employee SET ? WHERE ?',
                    {
                    
                            title: answer.title,
                            role_id: answer.role,
                            department_id: answer.deptID,
                    
                    },

                    (err) => {
                        if (err) throw err;
                        console.log('Employees Role has been successfully updated!');
                        start();
                    });
                });
            });
        }


        const viewAction = () => {
            inquirer
            .prompt({
                name: 'action',
                type: 'rawlist',
                message: 'What would you like to view?',
                choices: [
                    'All Employees',
                    'All Departments',
                    'All Roles'
                    ],          
                })
            .then((answer) => {
             if (answer.action === 'All Employees') {
                 connection.query(
                     'SELECT * FROM employee', (err, res) => {
                         if (err) throw err;
                         //console.log('Invalid request');
                         console.table(res);     
                         start();                    
                     })
                
                    } else if (answer.action === 'All Departments') {
                 connection.query(
                     'SELECT * FROM department', (err, res) => {
                         if (err) throw err;
                         //console.log('Invalid Request');
                         console.table(res);
                         start();
                     })
                } else if (answer.action === 'All Roles') {
                    connection.query(
                        'SELECT * FROM role', (err, res) => {
                            if (err) throw err;
                            console.table(res);
                            start();
                        })                        
                }                

            });
        };

        const removeAction = () => {
            inquirer
            .prompt({
                name: 'action',
                type: 'rawlist',
                message: 'What would you like to remove?',
                choices: [
                    'An Employee',
                    'A Department',
                    'A Role',
                    'Exit'
                    ],          
            })
            .then((answer) => {
                if (answer.action === 'A Employee') {
                    connection.query(

                    )
                }
            }
            )
        }
        
            