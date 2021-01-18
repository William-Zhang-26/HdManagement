import NamedBusinessObject from './NamedBusinessObject';


export default class ModuleBO extends NamedBusinessObject {

    //Konstruktorklasse, welche ein Modul BO erstellt mit den abgebildeten Attributen
    constructor(aEDV_number) {
        super();
        this.edv_number = aEDV_number;
    }

    //EDV Nummer
    getEDV_number() {
        return this.edv_number;
    }

    setEDV_number(aEDV_number) {
        this.edv_number = aEDV_number;
    }

    //Array von ModuleBOs aus einem JSON heraus mittels der setPrototypeOf fkt
    static fromJSON(modules) {
        let result = [];

        if (Array.isArray(modules)) {
            modules.forEach((m) => {
                Object.setPrototypeOf(m, ModuleBO.prototype);
                result.push(m);
            })
        } else {
            let m = modules;
            Object.setPrototypeOf(m, ModuleBO.prototype);
            result.push(m)
        }
        
        return result;
    }

}