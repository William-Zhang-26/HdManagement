import NamedBusinessObject from './NamedBusinessObject';
import AutomatBO from './AutomatBO';
import StateBO from './StateBO';

/** Unstimmigkeiten mit dem Backend:
 * 
 * - weekly muss ein bool sein
 * - preferred room muss ein bool sein
 * - Project_category gibt es gar nicht?
 * 
 */

export default class ProjectBO extends NamedBusinessObject {

    /*static s_new = "neu"
    static s_approved = "genehmigt"
    static s_dismissed = "abgelehnt"
    static s_inreview = "in Bewertung"
    static s_reviewed = "Bewertung abgeschlossen"*/

    //Konstruktorklasse, welche ein Projekttypen BO erstellt mit den abgebildeten Attributen
    constructor(aUserID, aProjectTypeID, aStateID,  aProjectDescription, aPartners, aCapacity, aPreferredRoom, aBDaysPreSchedule,
        aBDaysFinale, aBDaysSaturdays, aPreferredBDays,  
        aProjectCategory, aAdditionalLecturer, aWeekly) {

        super();
        this.user_id = aUserID;
        this.project_type_id = aProjectTypeID;
        this.state_id = aStateID;
        this.project_description = aProjectDescription;        
        this.partners = aPartners;
        this.capacity = aCapacity;
        this.preferred_room = aPreferredRoom;
        this.b_days_pre_schedule = aBDaysPreSchedule;
        this.b_days_finale = aBDaysFinale;
        this.b_days_saturdays = aBDaysSaturdays;
        this.preferred_b_days = aPreferredBDays;
        this.project_category = aProjectCategory;
        this.additional_lecturer = aAdditionalLecturer;
        this.weekly = aWeekly;
    }

    /**setFirstEvent(first_event) {
        this.current_state = this.current_state.first_event(first_event)
    }

    setSecEvent(sec_event) {
        this.current_state = this.current_state.sec_event(sec_event)
    }

    setThirdEvent(third_event) {
        this.current_state = this.current_state.third_event(third_event)
    }

    setFourthEvent(fourth_event) {
        this.current_state = this.current_state.fourth_event(fourth_event)
    }

    setFifthEvent(fifth_event) {
        this.current_state = this.current_state.fifth_event(fifth_event)
    }


    getFirstEvent(first_event) {
        let result
        if (first_event === "neu") {
            result = "neu";
        } else {
            //pass
        }
        return result;
    }

    getSecEvent(sec_event) {
        let result
        if (sec_event === "genehmigt") {
            result = "genehmigt";
        } else {
            //pass
        }
        return result;
    }

    getThirdEvent(third_event) {
        let result
        if (third_event === "abgelehnt") {
            result = "abgelehnt";
        } else {
            //pass
        }
        return result;
    }

    getFourthEvent(fourth_event) {
        let result
        if (fourth_event === "in Bewertung") {
            result = "in Bewertung";
        } else {
            //pass
        }
        return result;    
    }

    getFifthEvent(fifth_event) {
        let result
        if (fifth_event === "Bewertung abgeschlossen") {
            result = "Bewertung abgeschlossen";
        } else {
            //pass
        }
        return result;
    }*/

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

    //Projektkategorie
    getProjectCategory () {
        return this.project_category;
    }

    setProjectCategory (aProjectCategory) {
        this.project_category = aProjectCategory;
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
