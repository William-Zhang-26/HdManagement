import NamedBusinessObject from './NamedBusinessObject';


export default class ProjectTypeBO extends NamedBusinessObject {

    //Konstruktorklasse, welche ein Projekttypen BO erstellt mit den abgebildeten Attributen
    constructor(aName, aEcts, aSws) {

        super();
        this.name = aName;
        this.ects = aEcts;
        this.sws = aSws;

    }

    //ECTS
    getEcts() {
        return this.ects;
    }

    setEcts(aEcts) {
        this.ects = aEcts;
    }


    //SWS
    getSws() {
        return this.sws;
    }

    setSws(aSws) {
        this.sws = aSws;
    }


    //Array von ProjectTypeBOs aus einem JSON herraus mittels der setPrototypeOf fkt
    static fromJSON(projecttypes) {
        let result = [];

        if (Array.isArray(projecttypes)) {
            projecttypes.forEach((pt) => {
                Object.setPrototypeOf(pt, ProjectTypeBO.prototype);
                result.push(pt);
            })
        } else {
            let pt = projecttypes;
            Object.setPrototypeOf(pt, ProjectTypeBO.prototype);
            result.push(pt)
        }
        
        return result;
    }

}