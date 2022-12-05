const connection=require('./connection');

class DB{
    constructor(connection){
        this.connection=connection;
    };

    findAllDepartments(){
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        )
    };

    findAllRoles(){
        return this.connection.promise().query(
            "SELECT role.id, role.title,department.name AS department;"
        )
    };

    findAllEmployees(){
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary;"
        )      
    };

    addDepartment(department){
        return this.connection.promise().query(
            "INSERT INTO department SET ?", department
        )        
    };

    addRole(role){
        return this.connection.promise().query(
            "INSERT INTO role SET ?",role
        )
    };

    addEmployee(employee){
        return this.connection.promise().query(
            "INSERT INTO employee SET ?",employee
        )
    };

    findAllEmployeesByDepartment(departmentId){
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
            departmentId
        )
    };
}