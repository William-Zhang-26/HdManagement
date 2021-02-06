import BusinessObject from './BusinessObject';

export default class  ParticipationBO extends BusinessObject {


    //Konstruktorklasse, welche ein Teilnahme BO erstellt mit den abgebildeten Attributen
    constructor(aModuleID, aProjectID, aStudentID, aValidationID) {
        super();
        this.module_id = aModuleID;
        this.project_id = aProjectID;
        this.student_id = aStudentID;
        this.validation_id = aValidationID;
    }

    //Modul ID
    getModuleID() {
        return this.module_id
    }
    
    setModuleID(aModuleID) {
        this.module_id = aModuleID;
    }


    //Projekt ID
    getProjectID() {
        return this.project_id
    }
    
    setProjectID(aProjectID) {
        this.project_id = aProjectID;
    }


    //Student ID
    getStudentID() {
        return this.student_id
    }
    
    setStudentID(aStudentID) {
        this.student_id = aStudentID;
    }


    //Noten ID
    getValidationID() {
        return this.validation_id
    }
    
    setValidationID(aValidationID) {
        this.validation_id = aValidationID;
    }


    //Array von ParticipationBOs aus einem JSON herraus mittels der setPrototypeOf Funktion
    static fromJSON(participations) {
        let result = [];

        if (Array.isArray(participations)) {
            participations.forEach((p) => {
                Object.setPrototypeOf(p, ParticipationBO.prototype);
                result.push(p);
            })
        } else {
            let p = participations;
            Object.setPrototypeOf(p, ParticipationBO.prototype);
            result.push(p)
        }
        
        return result;
    }

}