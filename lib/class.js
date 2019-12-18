class employee {
    constructor(name,id,title,email){
        this.name=name;
        this.name=id;
        this.title=title;
        this.email=email;
    }
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getRole(){
        return "Employee";          //this will be extended by child classes
    }
}


module.exports = employee;