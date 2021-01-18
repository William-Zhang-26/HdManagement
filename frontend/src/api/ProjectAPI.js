import ProjectBO from './ProjectBO';
import StudentBO from './StudentBO';
import StateBO from './StateBO';
import ParticipationBO from './ParticipationBO';
import ValidationBO from './ValidationBO';
import ModuleBO from './ModuleBO';


export default class ProjectAPI {

    // Singelton instance
    static #api = null;
  
  
    // Local Python backend
    #projectServerBaseURL = '/projectmanager';
  
    //Local http-fake-backend 
    //#projectServerBaseURL = '/api/project';


    //Project related
    #getProjectsURL = () => `${this.#projectServerBaseURL}/project/`;
    #getProjectURL = (id) => `${this.#projectServerBaseURL}/project/${id}`;
    #getAttributesForProjectURL = (id) => `${this.#projectServerBaseURL}/projects/${id}/attributes`;
    #addProjectURL = () => `${this.#projectServerBaseURL}/projects`;
    #deleteProjectURL = (id) => `${this.#projectServerBaseURL}/project/${id}`;

    //Student related
    #getStudentByIdURL = (id) => `${this.#projectServerBaseURL}/student/${id}`;
    #deleteStudentURL = (id) => `${this.#projectServerBaseURL}/students/${id}`;
    #addStudentsForProjectURL = (id) => `${this.#projectServerBaseURL}/project/${id}/student`;

    //State related
    #getStateByNameURL = (id) => `${this.#projectServerBaseURL}/project/${id}/state`;

    //Validation related
    #getParticipationValidationURL = (id) => `${this.#projectServerBaseURL}/participationvalidation/${id}`;

    //Participation related
    #getParticipationsURL = () => `${this.#projectServerBaseURL}/all_participations/`;
    #getParticipationProjectURL = (id) => `${this.#projectServerBaseURL}/participationproject/${id}`;
    //#getParticipationsForStudentURL = (id) => `${this.#projectServerBaseURL}/participationproject/${id}`;
    
    //Module related
    #getParticipationModuleURL = (id) => `${this.#projectServerBaseURL}/participationmodule/${id}`;


    static getAPI() {
        if (this.#api == null) {
            this.#api = new ProjectAPI();
        }
        return this.#api;
    }


    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
            // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. 
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        }
        )

    //Project related
    getProjects() {
        return this.#fetchAdvanced(this.#getProjectsURL()).then((responseJSON) => {
            let projectBOs = ProjectBO.fromJSON(responseJSON);
            //console.info(projectBOs);
            return new Promise(function (resolve) {
                resolve(projectBOs);
            })
        })
    }
    
    getAttributesForProject(attributeBOs) {
        return this.#fetchAdvanced(this.#getAttributesForProjectURL(attributeBOs))
          .then(responseJSON => {
            // console.log(responseJSON)
            return new Promise(function (resolve) {
              resolve(responseJSON);
            })
          })
      }
      
/**
     getAttributesForProject(projectID) {
      return this.#fetchAdvanced(this.#getAttributesForProjectURL(projectID))
        .then((responseJSON) => {
          let attributeBOs = ProjectBO.fromJSON(responseJSON)[0];
          // console.info(accountBOs);
          return new Promise(function (resolve) {
            resolve(attributeBOs);
          })
        })
    }
*/
    getProject(projectID) {
        return this.#fetchAdvanced(this.#getProjectURL(projectID)).then((responseJSON) => {
          // We always get an array of ProjectBOs.fromJSON, but only need one object
          let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
          // console.info(responsePtojectBO);
          return new Promise(function (resolve) {
            resolve(responseProjectBO);
          })
        })
      }

      addProject(projectBO) {
        return this.#fetchAdvanced(this.#addProjectURL(), {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(projectBO)
        }).then((responseJSON) => {
          // We always get an array of ProjectBOs.fromJSON, but only need one object
          let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
         
          return new Promise(function (resolve) {
            resolve(responseProjectBO);
          })
        })
      }

      deleteProject(projectID) {
        return this.#fetchAdvanced(this.#deleteProjectURL(projectID), {
          method: 'DELETE'
        }).then((responseJSON) => {
          let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
          return new Promise(function (resolve) {
            resolve(responseProjectBO);
          })
        })
      }




    //Student related
    getStudentById(studentID) { 
        return this.#fetchAdvanced(this.#getStudentByIdURL(studentID)).then((responseJSON) => {
          // We always get an array of StudentBOs.fromJSON, but only need one object
          let responseStudentBO = StudentBO.fromJSON(responseJSON)[0];
        
          return new Promise(function (resolve) {
            resolve(responseStudentBO);
          })
        })
      }

    addStudentForProject(projectID) {
        return this.#fetchAdvanced(this.#addStudentsForProjectURL(projectID), {
            method: 'POST'
        })
            .then((responseJSON) => {
                // We always get an array of StudentBO.fromJSON, but only need one object
                let studentBO = StudentBO.fromJSON(responseJSON)[0];
            
                return new Promise(function (resolve) {
                    
                    resolve(studentBO);
                })
            })
    }




    deleteStudent(studentID) {
        return this.#fetchAdvanced(this.#deleteStudentURL(studentID), {
        method: 'DELETE'
        }).then((responseJSON) => {
        // We always get an array of StudentBOs.fromJSON
        let responseStudentBO = StudentBO.fromJSON(responseJSON)[0];
       
        return new Promise(function (resolve) {
            resolve(responseStudentBO);
        })
        })
    } 


    //State related
    getStateByName(project) { 
      return this.#fetchAdvanced(this.#getStateByNameURL(project)).then((responseJSON) => {
        let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseProjectBO);
        })
      })
    }



  //Validation related
  getParticipationValidation(participationID) { 
    return this.#fetchAdvanced(this.#getParticipationValidationURL(participationID)).then((responseJSON) => {
      let responseParticipationBO = ValidationBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseParticipationBO);
      })
    })
  }



    //Participation related
    getParticipations() {
      return this.#fetchAdvanced(this.#getParticipationsURL()).then((responseJSON) => {
          let participationBOs = ParticipationBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
              resolve(participationBOs);
          })
      })
    }

    getParticipationProject(participationID) { 
      return this.#fetchAdvanced(this.#getParticipationProjectURL(participationID)).then((responseJSON) => {
        // We always get an array of ParticipationBOs.fromJSON, but only need one object
        let projectBO = ProjectBO.fromJSON(responseJSON)[0];
      
        return new Promise(function (resolve) {
          resolve(projectBO);
        })
      })
    }


    /*getParticipationsForStudent(participationID) { 
      return this.#fetchAdvanced(this.#getParticipationsForStudentURL(participationID)).then((responseJSON) => {
        // We always get an array of ParticipationBOs.fromJSON, but only need one object
        let responseParticipationBO = ParticipationBO.fromJSON(responseJSON)[0];
      
        return new Promise(function (resolve) {
          resolve(responseParticipationBO);
        })
      })
    }*/

    //Module related
    getParticipationModule(participationID) { 
      return this.#fetchAdvanced(this.#getParticipationModuleURL(participationID)).then((responseJSON) => {
        // We always get an array of ParticipationBOs.fromJSON, but only need one object
        let moduleBO = ModuleBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(moduleBO);
        })
      })
    }



    
}
