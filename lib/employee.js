class employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
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
  printathing(){
    console.log("I am a functioning class");
  }
}

module.exports = employee;
