class employee {
  constructor(name, id, title, email) {
    this.name = name;
    this.name = id;
    this.title = title;
    this.email = email;
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return "Employee"; //this will be extended by child classes
  }
}

class manager extends employee {
  constructor(name, id, title, email, officeNumber) {
    super(name, id, title, email);
    this.officeNumber = officeNumber;
  }
  getRole() {
    return "Manager";
  }
}

class engineer extends employee {
    constructor(name, id, title, email, gitHubID) {
      super(name, id, title, email);
        this.gitHubID=gitHubID;
    }
    getGitHub(){
        return this.gitHubID;
    }
    getRole() {
      return "Engineer";
    }
  }

  class intern extends employee {
    constructor(name, id, title, email, school) {
      super(name, id, title, email);
        this.school=school;
    }
    getSchool(){
        return this.school;
    }
    getRole() {
      return "Intern";
    }
  }



// class Car extends Vehicle {
//     constructor(id, color, passengers) {
//       super(id, 4, "beep");
//       this.color = color;
//       this.passengers = passengers;
//     }

module.exports = employee;
