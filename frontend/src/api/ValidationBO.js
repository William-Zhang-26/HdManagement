import BusinessObject from './BusinessObject';

export default class ValidationBO extends BusinessObject {

    constructor(aGrade) {
        super();
        this.grade = aGrade;

    }

    getGrade() {
        return this.grade;
    }
    
    setGrade(aGrade) {
        this.grade = aGrade;
    }
    
    static fromJSON(validations) {
        let result = [];

        if (Array.isArray(validations)) {
            validations.forEach((v) => {
                Object.setPrototypeOf(v, ValidationBO.prototype);
                result.push(v);
            })
        } else {
            let v = validations;
            Object.setPrototypeOf(v, ValidationBO.prototype);
            result.push(v)
        }
        
        return result;
    }

}

