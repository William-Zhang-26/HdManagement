import BusinessObject from './BusinessObject';

export default class NamedBusinessObject extends BusinessObject {

    constructor(aName) {
        super();
        this.name = aName;

    }

    getName() {
        return this.name;
    }
    
    setName(aName) {
        this.name = aName;
    }

}

    