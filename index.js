const db=require('./db');
const {prompt}=require("inquirer");
require("console.table");

function launch(){
    console.log("Welcome to the Employee Tracker");
    appMenu();
};

function appMenu(){
    prompt([
        {
            type:"list",
            name:"menu",
            message:"Choose your action:",
            choices:[
                {
                    name:"View all departments",
                    value:"VIEW_DEPARTMENTS",
                },
                {
                    name:"View all employees",
                    value:"VIEW_EMPLOYEES",
                },
                {
                    name:"View all roles",
                    value:"VIEW_ROLES",
                },
                {
                    name:"Add a department",
                    value:"ADD_DEPARTMENT",
                },
                {
                    name:"Add an employee",
                    value:"ADD_EMPLOYEE",
                },
                {
                    name:"Add a role",
                    value:"ADD_ROLE",
                },
                {
                    name:"Exit",
                    value:"QUIT"
                }
            ]
        }
    ]).then(res=>{
        let choice=res.choice;
        switch(choice){
            case "VIEW_DEPARTMENTS":
                viewDepts();
                break;
            case "VIEW_EMPLOYEES":
                viewEmps();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "ADD_DEPARTMENT":
                addDept();
                break;
            case "ADD_EMPLOYEE":

                break;
            case "ADD_ROLE":
                addRole();
                break;
            default:
                break;
        }
    })
};

function viewDepts(){
    db.findAllDepartments()
        .then(([rows])=>{
            let departments=rows;
            console.table(departments);
        }).then(()=>appMenu());
};

function viewEmps(){
    db.findAllEmployees()
        .then(([rows])=>{
            let employees=rows;
            console.table(employees);
        }).then(()=>appMenu());
};

function viewRoles(){
    db.findAllRoles()
        .then(([rows])=>{
            let roles=rows;
            console.table(roles);
        }).then(()=>appMenu());
};

function addDept(){
    prompt([
        {
            name:"dept_name",
            message:"Please enter the name of the department",
        }
    ]).then(res=>{
        let name=res;
        db.addDepartment(name)
        .then(()=>console.log(`Added ${name.dept_name} into the database`))
        .then(()=>appMenu())
    })
};

function addRole(){
    db.findAllDepartments()
        .then(([rows])=>{
            let departments=rows;
            const deptChoice=departments.map(({id,name})=>({
                name:name,
                value:id
            }));

            prompt([
                {
                    name:"title",
                    message:"Please enter the name of the role",
                },
                {
                    name:"salary",
                    message:"Please enter the salary of the role",
                },
                {
                    type:"list",
                    name:"dept_id",
                    message:"Please select which department the role belongs too",
                    choices:deptChoice
                }
            ])
            .then(role=>{
                db.addRole(role)
                    .then(()=>console.log(`Added ${role.title} into the database`))
                    .then(()=>appMenu())
            })
        })
};