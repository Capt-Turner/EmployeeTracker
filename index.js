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
                    name:"View employees in a department",
                    value:"VIEW_EMPLOYEES_BY_DEPARTMENT",
                },
                {
                    name:"View employees under a manager",
                    value:"VIEW_EMPLOYEES_BY_MANAGER",
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
                    name:"Update an employee",
                    value:"UPDTATE_EMPLOYEE",
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
                addEmp();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "VIEW_EMPLOYEES_BY_DEPARTMENT":
                viewEmpsByDept();
                break;
            case "VIEW_EMPLOYEES_BY_MANAGER":
                viewEmpsByMan();
                break;
            case "UPDATE_EMPLOYEE":
                updEmp();
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

function viewEmpsByDept(){
    db.findAllDepartments()
        .then(([rows])=>{
            let departments=rows;
            const deptChoice=departments.map(({id,name})=>({
                name:name,
                value:id
            }));

            prompt([
                {
                    type:"list",
                    name:"dept_id",
                    message:"Please select which department to search",
                    choices:deptChoice
                }
            ])
            .then(res=>db.findAllemployeesByDepartment(res.dept_id))
            .then(([rows])=>{
                let employee=rows;
                console.table(employees);
            })
            .then(()=>appMenu())
        })
};

function viewEmpsByMan(){
    db.findAllEmployees()
        .then(([rows])=>{
            let managers=rows;
            const manChoice=managers.map(({id,first_name,last_name})=>({
                name:`${first_name} ${last_name}`,
                value:id
            }));
            
            prompt([
                {
                    type:"list",
                    name:"man_id",
                    message:"Please select a manager",
                    choices:manChoice
                }
            ])
            .then(res=>db.findAllEmployeesByManager(res.man_id))
            .then(([rows])=>{
                let employees=rows;
                console.table(employees);
            })
            .then(()=>appMenu())
        })
};

function updEmp(){
    db.findAllEmployees()
    .then(([rows])=>{
        let employees=rows;
        const empChoice=employees.map(({id,first_name,last_name})=>({
            name:`${first_name} ${last_name}`,
            value:id
        }));

        prompt([
            {
                type:"list",
                name:"emp_id",
                message:"Please select an employee to update",
                choices:empChoice
            }
        ])
        .then(res=>{
            let empId=res.emp_id;

            prompt([
                {
                    type:"list",
                    name:"upd_choice",
                    message:"Please select what to update",
                    choices:[
                        {
                            name:"Role",
                            value:"ROLE",
                        },
                        {
                            name:"Manager",
                            value:"MANAGER"
                        }
                    ]
                }
            ])
            .then(res=>{
                let choice=res.choice;
                switch(choice){
                    case "ROLE":
                        db.findAllRoles()
                        .then(([rows])=>{
                            let roles=rows;
                            const roleChoice=roles.map(({id,title})=>({
                                name:title,
                                value:id
                            }));
                            
                            prompt([
                                {
                                    type:"list",
                                    name:"role_id",
                                    message:"Please select a new role to assign",
                                    choices:roleChoice
                                }
                            ])
                            .then(res=>db.updateEmployeeRole(empId,res.role_id))
                            .then(()=>console.log("Employee's role has been updated"))
                            .then(()=>appMenu())
                        });
                        break;
                    default:
                        db.findAllPossManagers(empId)
                        .then(([rows])=>{
                            let managers=rows;
                            const manChoice=managers.map(({id, first_name, last_name})=>({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }));

                            prompt([
                                {
                                    type:"list",
                                    name:"man_id",
                                    message:"Please select a new Manager for this employee",
                                    choices:manChoice
                                }
                            ])
                            .then(res=>db.updateEmployeeManager(empId,res.man_id))
                            .then(()=>console.log("Employee's manager has been updated"))
                            .then(()=>appMenu())
                        });
                        break;
                }
            }) 
        })
    })
};
