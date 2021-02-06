import AutomatBO from './AutomatBO';


export default class ProjectBO extends AutomatBO {

    //Konstruktorklasse, welche ein Projekttypen BO erstellt mit den abgebildeten Attributen
    constructor(aName, aUserID, aProjectTypeID, aStateID,  aSemesterID, aAssignmentID, aProjectDescription, aPartners, aCapacity, aPreferredRoom, aBDaysPreSchedule,
        aBDaysFinale, aBDaysSaturdays, aPreferredBDays, aAdditionalLecturer, aWeekly) {

        super();
        this.name = aName;
        this.user_id = aUserID;
        this.project_type_id = aProjectTypeID;
        this.state_id = aStateID;
        this.semester_id = aSemesterID;
        this.assignment_id = aAssignmentID;
        this.project_description = aProjectDescription;        
        this.partners = aPartners;
        this.capacity = aCapacity;
        this.preferred_room = aPreferredRoom;
        this.b_days_pre_schedule = aBDaysPreSchedule;
        this.b_days_finale = aBDaysFinale;
        this.b_days_saturdays = aBDaysSaturdays;
        this.preferred_b_days = aPreferredBDays;
        this.additional_lecturer = aAdditionalLecturer;
        this.weekly = aWeekly;
    }
    

    //AutomatID
    getUserID() {
        return this.user_id;
    }

    setUserID(aUserID) {
        this.user_id = aUserID;
    }


    //ProjectTypeID
    getProjectTypeID() {
        return this.project_type_id;
    }

    setProjectTypeID(aProjectTypeID) {
        this.project_type_id = aProjectTypeID;
    }


    //StateID
    getStateID() {
        return this.state_id;
    }

    setStateID(aStateID) {
        this.state_id = aStateID;
    }


    //SemesterID
    getSemesterID() {
        return this.semester_id;
    }

    setSemesterID(aSemesterID) {
        this.semester_id = aSemesterID;
    }


    //AssignmentID
    getAssignmentID() {
        return this.assignment_id;
    }

    setAssignmentID(aAssigmentID) {
        this.assignment_id = aAssigmentID;
    }


    //Kapazität
    getCapacity() {
        return this.capacity;
    }

    setCapacity(aCapacity) {
        this.capacity = aCapacity;
    }

    //externe Kooperationspartner
    getPartners() {
        return this.partners;
    }

    setPartners(aPartners) {
        this.partners = aPartners;
    }

    //Projektbeschreibung
    getProjectDescription() {
        return this.project_description;
    }

    setProjectDescription(aProjectDescription) {
        this.project_description = aProjectDescription;
    }

    //wöchentlich
    getWeekly() {
        return this.weekly;
    }

    setWeekly(aWeekly) {
        this.weekly = aWeekly;
    }

    //Blocktage vor Beginn der Vorlesungszeit 
    getBDaysPreSchedule () {
        return this.b_days_pre_schedule;
    }

    setBDaysPreSchedule (aBDaysPreSchedule) {
        this.b_days_pre_schedule = aBDaysPreSchedule;
    }

    //Blocktage in der Prüfungszeit (nur inter-/transdiziplinäre Projekte)
    getBDaysFinale () {
        return this.b_days_finale;
    }

    setBDaysFinale (aBDaysFinale) {
        this.b_days_finale = aBDaysFinale;
    }

    //Blocktage (Samstage) in der Vorlesungszeit
    getBDaysSaturdays () {
        return this.b_days_saturdays;
    }

    setBDaysSaturdays (aBDaysSaturdays) {
        this.b_days_saturdays = aBDaysSaturdays;
    }

    //Präferierte Tage
    getPreferredBDays () {
        return this.preferred_b_days;
    }

    setPreferredBDays (aPreferredBDays) {
        this.preferred_b_days = aPreferredBDays;
    }

    //Besonderer Raum notwendig (bool)
    getRoomPreference () {
        return this.room_preference;
    }

    setRoomPreference (aRoomPreference) {
        this.room_preference = aRoomPreference;
    }

    //Besonderer Raum notwendig (str)
    getPreferredRoom () {
        return this.preferred_room;
    }

    setPreferredRoom (aPreferredRoom) {
        this.preferred_room = aPreferredRoom;
    }

    //Externer Kooperationspartner 
    getAdditionalLecturer () {
        return this.additional_lecturer;
    }

    setAdditionalLecturer (aAdditionalLecturer) {
        this.additional_lecturer = aAdditionalLecturer;
    }

    //Array von ProjectBOs aus einem JSON herraus mittels der setPrototypeOf fkt
    static fromJSON(projects) {
        let result = [];

        if (Array.isArray(projects)) {
            projects.forEach((pr) => {
                Object.setPrototypeOf(pr, ProjectBO.prototype);
                result.push(pr);
            })
        } else {
            let pr = projects;
            Object.setPrototypeOf(pr, ProjectBO.prototype);
            result.push(pr)
        }
        
        return result;
    }
}
