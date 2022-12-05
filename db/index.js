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

}