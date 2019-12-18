const employee=require("./employee.js");

class engineer extends employee {
    constructor(name, id,  email, gitHubID) {
      super(name, id,  email);
        this.github=gitHubID;
    }
    getGithub(){
        return this.github;
    }
    getRole() {
      return "Engineer";
    }
  }

  
module.exports = engineer;
