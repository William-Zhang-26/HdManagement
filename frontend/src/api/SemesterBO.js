import NamedBusinessObject from './NamedBusinessObject';

export default class SemesterBO extends NamedBusinessObject {

    constructor(aSemester) {
        super();
        this.semester = aSemester;

    }

    getSemester() {
        return this.semester;
    }
    
    setSemester(aSemester) {
        this.semester = aSemester;
    }

    static fromJSON(semesters) {
        let result = [];

        if (Array.isArray(semesters)) {
            semesters.forEach((s) => {
                Object.setPrototypeOf(s, SemesterBO.prototype);
                result.push(s);
            })
        } else {
            let s = semesters;
            Object.setPrototypeOf(s, SemesterBO.prototype);
            result.push(s)
        }
        
        return result;
    }

}

    