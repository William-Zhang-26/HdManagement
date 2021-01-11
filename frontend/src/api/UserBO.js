import NamedBusinessObject from './NamedBusinessObject';

export default class UserBO extends NamedBusinessObject {

    //Konstruktorklasse, welche ein User BO erstellt mit den abgebildeten Attributen
    constructor(aFirstname, aMail, aGoogleId, aRoleId) {
        super();
        this.firstname = aFirstname;
        this.google_id = aGoogleId;
        this.role_id = aRoleId;
        this.mail = aMail;
    }



    //Vorname
    setFirstName(aFirstname) {
        this.firstname = aFirstname;
    }

    getFirstName() {
        return this.firstname;
    }


    //Mail
    setMail(aMail) {
        this.mail = aMail;
    }

    getMail() {
        return this.mail;
    }


    //GoogleId
    setGoogleId(aGoogleId) {
        this.google_id = aGoogleId;
    }

    getGoogleId() {
        return this.google_id;
    }


    //RoleId
    setRoleId(aRoleId) {
        this.role_id = aRoleId;
    }

    getRoleId() {
        return this.role_id;
    }

    


    //Array von StudentBOs aus einem JSON herraus mittels der setPrototypeOf fkt
    static fromJSON(users) {
        let result = [];

        if (Array.isArray(users)) {
            users.forEach((u) => {
                Object.setPrototypeOf(u, UserBO.prototype);
                result.push(u);
            })
        } else {
            let u = users;
            Object.setPrototypeOf(u, UserBO.prototype);
            result.push(u)
        }
        
        return result;
    }


}