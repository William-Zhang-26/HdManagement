/**
 * Base class for all BusinessObjects, which has an ID field by default.
 */

export default class BusinessObject {

    constructor() {
        this.id = 0;
        this.creation_time = Date
    }

    getID() {
        return this.id;
    }
    
    setID(aId) {
        this.id = aId;
    }

    get_creation_time() {
        return this.creation_time
    }

    toString() {
        let result = '';
        for (var prop in this) {
          result += prop + ': ' + this[prop] + ' ';
        }
        return result;
    }
}

    