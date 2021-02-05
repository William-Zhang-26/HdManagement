/**
 * Basisklasse für alle BusinessObjects mit ID und aktuellem Zeitpunkt
 */

export default class BusinessObject {

    constructor() {
        this.id = 0;
        this.create_time = new Date() //wird hier der Datentyp "Date" gesetzt, oder eine Variable wie "aCreationTime" o.Ä.
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

    