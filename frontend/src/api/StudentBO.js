//import NamedBusinessObject from './NamedBusinessObject';

export default class StudentBO /*extends NamedBusinessObject*/ {

    //Konstruktorklasse, welche ein Studenten BO erstellt mit den abgebildeten Attributen
    constructor(aLastname, aFirstname, aCourse, aMatricel_number, aMail, aProject_id) {
        //super();
        this.lastname = aLastname;
        this.firstname = aFirstname;
        this.course = aCourse;
        this.matricel_number = aMatricel_number;
        this.mail = aMail;
        this.project_id = aProject_id;
    }


    //Nachname
    setLastName(aLastname) {
        this.lastname = aLastname;
    }

    getLastName() {
        return this.lastname;
    }


    //Vorname
    setFirstName(aFirstname) {
        this.firstname = aFirstname;
    }

    getFirstName() {
        return this.firstname;
    }


    //Kurs
    setCourse(aCourse) {
        this.course = aCourse;
    }

    getCourse() {
        return this.course;
    }


    //Matrikelnummer
    setMatricelNumber(aMatricel_number) {
        this.matricel_number = aMatricel_number;
    }

    getMatricelNumber() {
        return this.matricel_number;
    }


    //Mail
    setMail(aMail) {
        this.mail = aMail;
    }

    getMail() {
        return this.mail;
    }


    //PeojectID
    setProcectId(aProject_id) {
        this.project_id = aProject_id;
    }

    getProjectId() {
        return this.project_id;
    }
    

    //Array von StudentBOs aus einem JSON herraus mittels der setPrototypeOf fkt
    static fromJSON(students) {
        let result = [];

        if (Array.isArray(students)) {
            students.forEach((s) => {
                Object.setPrototypeOf(s, StudentBO.prototype);
                result.push(s);
            })
        } else {
            let s = students;
            Object.setPrototypeOf(s, StudentBO.prototype);
            result.push(s)
        }
        
        return result;
    }


}