const db=require('./db');
const {prompt}=require("inquirer");
require("console.table");

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

                break;
            case "VIEW_ROLES":

                break;
            case "ADD_DEPARTMENT":

                break;
            case "ADD_EMPLOYEE":

                break;
            case "ADD_ROLE":

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
        })
        .then(()=>appMenu());
};

function