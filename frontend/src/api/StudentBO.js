import UserBO from './UserBO';

export default class StudentBO extends UserBO {

    //Konstruktorklasse, welche ein Studenten BO erstellt mit den abgebildeten Attributen
    constructor(aCourse, aMatriculation_number, aMail, aProject_id) {
        super();
        this.course = aCourse;
        this.matriculation_number = aMatriculation_number;
        this.mail = aMail;
        this.project_id = aProject_id;
    }

    //Kurs
    setCourse(aCourse) {
        this.course = aCourse;
    }

    getCourse() {
        return this.course;
    }


    //Matrikelnummer
    setMatriculationNumber(aMatriculation_number) {
        this.matriculation_number = aMatriculation_number;
    }

    getMatriculationNumber() {
        return this.matriculation_number;
    }


    //Mail
    setMail(aMail) {
        this.mail = aMail;
    }

    getMail() {
        return this.mail;
    }


    //ProjectID
    setProjectId(aProject_id) {
        this.project_id = aProject_id;
    }

    getProjectId() {
        return this.project_id;
    }
    

    //Array von StudentBOs aus einem JSON herraus mittels der setPrototypeOf Funktion
    static fromJSON(students) {
        let result = [];

        if (Array.isArray(students)) {
            students.forEach((st) => {
                Object.setPrototypeOf(st, StudentBO.prototype);
                result.push(st);
            })
        } else {
            let st = students;
            Object.setPrototypeOf(st, StudentBO.prototype);
            result.push(st)
        }
        
        return result;
    }


}