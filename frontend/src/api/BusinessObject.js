/**
 * Basisklasse für alle BusinessObjects mit ID und aktuellem Zeitpunkt
 */

export default class BusinessObject {

    constructor() {
        this.id = 0;
        this.create_time = new Date() 
    }

    getID() {
        return this.id;
    }
    
    setID(aId) {
        this.id = aId;
    }

    get_create_time() {
        return this.create_time
    }

    toString() {
        let result = '';
        for (var prop in this) {
          result += prop + ': ' + this[prop] + ' ';
        }
        return result;
    }
}

    