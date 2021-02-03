import ProjectBO from './ProjectBO';
import ProjectTypeBO from './ProjectTypeBO';
import StudentBO from './StudentBO';
import StateBO from './StateBO';
import ParticipationBO from './ParticipationBO';
import ValidationBO from './ValidationBO';
import ModuleBO from './ModuleBO';
import UserBO from './UserBO';


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
    #addProjectURL = () => `${this.#projectServerBaseURL}/project`;
    #deleteProjectURL = (id) => `${this.#projectServerBaseURL}/project/${id}`;
    #updateProjectURL = (id) => `${this.#projectServerBaseURL}/project/${id}`;

    //Participation related
    #addValidationURL = () => `${this.#projectServerBaseURL}/participation`;
    #updateValidationURL = (id) => `${this.#projectServerBaseURL}/participation/${id}`;

    //Student related
    #getStudentByIdURL = (id) => `${this.#projectServerBaseURL}/student/${id}`;
    #getLecturerByIdURL = (google_id) => `${this.#projectServerBaseURL}/user/${google_id}`;
    #deleteStudentURL = (id) => `${this.#projectServerBaseURL}/students/${id}`;
    #addStudentsForProjectURL = (id) => `${this.#projectServerBaseURL}/project/${id}/student`;
    #getStudentByGoogleIdURL= (google_id) => `${this.#projectServerBaseURL}/student/${google_id}`;

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

    //User related
    #addUser = () => `${this.#projectServerBaseURL}/user`;
    #getUserByGoogleIdURL= (google_id) => `${this.#projectServerBaseURL}/user/${google_id}`;
    #updateUserURL = (id) => `${this.#projectServerBaseURL}/user/${id}`;


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

    updateProject(projectBO) {
      return this.#fetchAdvanced(this.#updateProjectURL(projectBO.getID()), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(projectBO)
      }).then((responseJSON) => {
        // We always get an array of ProjectBOs.fromJSON
        let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseProjectBO);
        })
      })
    }

    //Participation related

    addValidation(participationBO) {
    console.log(this.state);
      return this.#fetchAdvanced(this.#addValidationURL(), {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(participationBO) 
      }).then((responseJSON) => {
        // We always get an array of ProjectBOs.fromJSON, but only need one object
        let responseParticipationBO = ParticipationBO.fromJSON(responseJSON)[0];

        return new Promise(function (resolve) {
          resolve(responseParticipationBO);
        })
      })
    }

    updateValidation(participationBO) {
      return this.#fetchAdvanced(this.#updateValidationURL(participationBO.getID()), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(participationBO)
      }).then((responseJSON) => {
        // We always get an array of ParticipationBOs.fromJSON
        let responseValidationBO = ParticipationBO.fromJSON(responseJSON)[0];
        // console.info(accountBOs);
        return new Promise(function (resolve) {
          resolve(responseValidationBO);
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

    getLecturerById(userID) { 
        return this.#fetchAdvanced(this.#getLecturerByIdURL(userID)).then((responseJSON) => {
          // We always get an array of StudentBOs.fromJSON, but only need one object
          let responseUserBO = UserBO.fromJSON(responseJSON)[0];
        
          return new Promise(function (resolve) {
            resolve(responseUserBO);
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



    getStudentByGoogleId(google_id) {
      return this.#fetchAdvanced(this.#getStudentByGoogleIdURL(google_id)).then((responseJSON) => {
        // We always get an array of ProjectBOs.fromJSON, but only need one object
        let responseStudentBO = StudentBO.fromJSON(responseJSON)[0];
        // console.info(responsePtojectBO);
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



    //User related
    addUser(userBO) {
      return this.#fetchAdvanced(this.#addProjectURL(), {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(userBO)
      }).then((responseJSON) => {
        // We always get an array of ProjectBOs.fromJSON, but only need one object
        let responseUserBO = UserBO.fromJSON(responseJSON)[0];
        
        return new Promise(function (resolve) {
          resolve(responseUserBO);
        })
      })
    }


    
    getUserByGoogleId(google_id) {
      return this.#fetchAdvanced(this.#getUserByGoogleIdURL(google_id)).then((responseJSON) => {
        // We always get an array of ProjectBOs.fromJSON, but only need one object
        let responseUserBO = UserBO.fromJSON(responseJSON)[0];
        // console.info(responsePtojectBO);
        return new Promise(function (resolve) {
          resolve(responseUserBO);
        })
      })
    }

    updateUser(userBO) {
      return this.#fetchAdvanced(this.#updateUserURL(userBO.getID()), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(userBO)
      }).then((responseJSON) => {
        // We always get an array of UserBOs.fromJSON
        let responseUserBO = UserBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseUserBO);
        })
      })
    }

    
}
