import NamedBusinessObject from './NamedBusinessObject';


export default class StateBO extends NamedBusinessObject /*extends NamedBusinessObject*/ {

    //Konstruktorklasse, welche ein Modul BO erstellt mit den abgebildeten Attributen
    constructor(aState = "New") {
        super();
        this.state = aState;
    }

    // dundermethod übetragen: Wie geht das?




    //Array von StudentBOs aus einem JSON herraus mittels der setPrototypeOf fkt
    static fromJSON(states) {
        let result = [];

        if (Array.isArray(states)) {
            states.forEach((sta) => {
                Object.setPrototypeOf(sta, StateBO.prototype);
                result.push(sta);
            })
        } else {
            let sta = states;
            Object.setPrototypeOf(sta, StateBO.prototype);
            result.push(sta)
        }
        
        return result;
}

}