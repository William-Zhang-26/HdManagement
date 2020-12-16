import NamedBusinessObject from './NamedBusinessObject';

/** Unstimmigkeiten mit dem Backend:
 * 
 * - weekly muss ein bool sein
 * - preferred room muss ein bool sein
 * 
 */

export default class ProjectBO extends NamedBusinessObject {

    //Konstruktorklasse, welche ein Projekttypen BO erstellt mit den abgebildeten Attributen
    constructor(aCapacity, aPartners, aProjectDescription, aWeekly, aBDaysPreSchedule, aBDaysFinale, aBDaysSaturdays, aPreferredBDays, aRoomPreference, aPreferredRoom, aProjectCategory, aAdditionalSupervisor) {

        super();
        this.capacity = aCapacity;
        this.partners = aPartners;
        this.project_description = aProjectDescription;
        this.weekly = aWeekly;
        this.b_days_pre_schedule = aBDaysPreSchedule;
        this.b_days_finale = aBDaysFinale;
        this.b_days_saturdays = aBDaysSaturdays;
        this.preferred_b_days = aPreferredBDays;
        this.room_preference = aRoomPreference;
        this.preferred_room = aPreferredRoom;
        this.project_category = aProjectCategory;
        this.additional_supervisor = aAdditionalSupervisor;
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
    getAdditionalSupervisor () {
        return this.additional_supervisor;
    }

    setAdditionalSupervisor (aAdditionalSupervisor) {
        this.additional_supervisor = aAdditionalSupervisor;
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
