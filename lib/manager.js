const employee=require("./employee.js");

class manager extends employee {
  constructor(name, id,  email, officeNumber) {
    super(name, id,  email);
    this.officeNumber = officeNumber;
  }
  getRole() {
    return "Manager";
  }
  getOfficeNumber(){
    return this.officeNumber;
  }
}



module.exports = manager;
