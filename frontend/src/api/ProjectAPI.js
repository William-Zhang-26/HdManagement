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
    #getProjectbyIdURL = (id) => `${this.#projectServerBaseURL}/project/${id}`;
    #getAttributesForProjectURL = (id) => `${this.#projectServerBaseURL}/projects/${id}/attributes`;
    #addProjectURL = () => `${this.#projectServerBaseURL}/projects`;
    #deleteProjectURL = (id) => `${this.#projectServerBaseURL}/project/${id}`;

    //Student related
    #getStudentByIdURL = (id) => `${this.#projectServerBaseURL}/student/${id}`;
    #deleteStudentURL = (id) => `${this.#projectServerBaseURL}/students/${id}`;
    #addStudentsForProjectURL = (id) => `${this.#projectServerBaseURL}/project/${id}/student`;

    //State related
    #getStatebyIdURL = (id) => `${this.#projectServerBaseURL}/state/${id}`;

    //Validation related
    #getValidationbyIdURL = (id) => `${this.#projectServerBaseURL}/validation/${id}`;

    //Participation related
    #getParticipationsURL = () => `${this.#projectServerBaseURL}/all_participations/`;
    #getParticipationForProjectURL = (id) => `${this.#projectServerBaseURL}/project/${id}/participation`;
    #deleteParticipationURL = (id) => `${this.#projectServerBaseURL}/participation/${id}`;
    
    //Module related
    #getModulebyIdURL = (id) => `${this.#projectServerBaseURL}/module/${id}`;


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


    getProjectbyId(projectID) {
      return this.#fetchAdvanced(this.#getProjectbyIdURL(projectID)).then((responseJSON) => {
        // We always get an array of ProjectBOs.fromJSON, but only need one object
        let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
        // console.info(responsePtojectBO);
        return new Promise(function (resolve) {
          resolve(responseProjectBO);
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
    getStudentbyId(studentID) { 
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
    getStatebyId(stateID) {
      return this.#fetchAdvanced(this.#getStatebyIdURL(stateID)).then((responseJSON) => {
        // We always get an array of ProjectBOs.fromJSON, but only need one object
        let responseStateBO = StateBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseStateBO);
        })
      })
    }


    //Validation related
    getValidationbyId(validationID) {
      return this.#fetchAdvanced(this.#getValidationbyIdURL(validationID)).then((responseJSON) => {
        // We always get an array of ProjectBOs.fromJSON, but only need one object
        let responseValidationBO = ValidationBO.fromJSON(responseJSON)[0];
        // console.info(responsePtojectBO);
        return new Promise(function (resolve) {
          resolve(responseValidationBO);
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

    getParticipationForProject(projectID) { 
      return this.#fetchAdvanced(this.#getParticipationForProjectURL(projectID)).then((responseJSON) => {
        // We always get an array of ParticipationBOs.fromJSON, but only need one object
        let participationBOs = ParticipationBO.fromJSON(responseJSON);                                      // hier wurde das [0] entfernt
      
        return new Promise(function (resolve) {
          resolve(participationBOs);
        })
      })
    }

    deleteParticipation(participationID) {
      return this.#fetchAdvanced(this.#deleteParticipationURL(participationID), {
        method: 'DELETE'
      }).then((responseJSON) => {
        let responseParticipationBO = ParticipationBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseParticipationBO);
        })
      })
    }

    
    //Module related
    getModulebyId(moduleID) {
      return this.#fetchAdvanced(this.#getModulebyIdURL(moduleID)).then((responseJSON) => {
        // We always get an array of ProjectBOs.fromJSON, but only need one object
        let responseModuleBO = ModuleBO.fromJSON(responseJSON)[0];
        // console.info(responsePtojectBO);
        return new Promise(function (resolve) {
          resolve(responseModuleBO);
        })
      })
    }



    
}
