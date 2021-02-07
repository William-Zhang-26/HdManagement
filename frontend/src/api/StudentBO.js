import UserBO from './UserBO';

export default class StudentBO extends UserBO {

    //Konstruktorklasse, welche ein Studenten BO erstellt mit den abgebildeten Attributen
    constructor(aName, aUser_id, aCourse, aMatriculation_number, aMail, aGoogle_id) {
        super();
        this.user_id = aUser_id;
        this.name = aName;
        this.course = aCourse;
        this.matriculation_number = aMatriculation_number;
        this.mail = aMail;
        this.google_id = aGoogle_id;
    }


    //User ID
    setUserID(aUser_id) {
        this.user_id = aUser_id;
    }

    getUserID() {
        return this.user_id;
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
    setGoogleId(aGoogle_id) {
        this.google_id = aGoogle_id;
    }

    getGoogleId() {
        return this.google_id;
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