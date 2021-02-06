import NamedBusinessObject from './NamedBusinessObject';

export default class AssignmentBO extends NamedBusinessObject{

    constructor() {
        super();
    }

    //Array von AssignmentBOs aus einem JSON heraus mittels der setPrototypeOf Funktion
    static fromJSON(assignment) {
      let result = [];

      if (Array.isArray(assignment)) {
            assignment.forEach((a) => {
              Object.setPrototypeOf(a, AssignmentBO.prototype);
              result.push(a);
          })
      } else {
          let a = assignment;
          Object.setPrototypeOf(a, AssignmentBO.prototype);
          result.push(a)
      }
      
      return result;
  }

}
