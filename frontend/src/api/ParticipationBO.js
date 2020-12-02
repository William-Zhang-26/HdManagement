//import BusinessObject from './BusinessObject';

export default class  ParticipationBO /*extends BusinessObject*/ {


    //Konstruktorklasse, welche ein Teilnahme BO erstellt mit den abgebildeten Attributen
    constructor(aParticipation_status) {
        //super();
        this.participation_status = aParticipation_status;
    }


    //Teilnahme Status
    getParticipation_status() {
        return this.participation_status
    }
    
    
    setParticipation_status(aParticipation_status) {
        this.participation_status = aParticipation_status;
    }


    //Array von ParticipationBOs aus einem JSON herraus mittels der setPrototypeOf fkt
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