import AssignmentBO from './AssignmentBO';
import ModuleBO from './ModuleBO';
import ParticipationBO from './ParticipationBO';
import ProjectBO from './ProjectBO';
import SemesterBO from './SemesterBO';
import StateBO from './StateBO';
import StudentBO from './StudentBO';
import UserBO from './UserBO';
import ValidationBO from './ValidationBO';


export default class ProjectAPI {

    // Singelton instance
    static #api = null;
  
  
    // Local Python backend
    #projectServerBaseURL = '/projectmanager';
  
    //Local http-fake-backend 
    //#projectServerBaseURL = '/api/project';


    //Projekt bezogen
    #getProjectsURL = () => `${this.#projectServerBaseURL}/project/`;
    #getProjectbyIdURL = (id) => `${this.#projectServerBaseURL}/project/${id}`;
    #addProjectURL = () => `${this.#projectServerBaseURL}/project`;
    #deleteProjectURL = (id) => `${this.#projectServerBaseURL}/project/${id}`;
    #updateProjectURL = (id) => `${this.#projectServerBaseURL}/project/${id}`;

    //Teilnahme bezogen
    #updateValidationURL = (id) => `${this.#projectServerBaseURL}/participation/${id}`;
    #getParticipationsURL = () => `${this.#projectServerBaseURL}/all_participations/`;
    #getParticipationForProjectURL = (id) => `${this.#projectServerBaseURL}/project/${id}/participation`;
    #getParticipationForStudentURL = (id) => `${this.#projectServerBaseURL}/student/${id}/participation`;
    #deleteParticipationURL = (id) => `${this.#projectServerBaseURL}/participation/${id}`;
    #addParticipationURL = () => `${this.#projectServerBaseURL}/participation`;
    
    //Student bezogen
    #getStudentsURL = () => `${this.#projectServerBaseURL}/student/`;
    #getStudentByIdURL = (id) => `${this.#projectServerBaseURL}/student/${id}`;

    //State bezogen
    #getStatebyIdURL = (id) => `${this.#projectServerBaseURL}/state/${id}`;

    //Benotung bezogen
    #getValidationbyIdURL = (id) => `${this.#projectServerBaseURL}/validation/${id}`;

    //Module bezogen
    #getModulebyIdURL = (id) => `${this.#projectServerBaseURL}/module/${id}`;

    //User bezogen
    #getUserByGoogleIdURL= (google_id) => `${this.#projectServerBaseURL}/user/${google_id}`;
    #updateUserURL = (id) => `${this.#projectServerBaseURL}/user/${id}`;

    //Assignment bezogen
    #getAssignmentbyIdURL = (id) => `${this.#projectServerBaseURL}/assignment/${id}`

    //Semester bezogen
    #getSemesterbyCurrentSemesterURL = (current_semester) => `${this.#projectServerBaseURL}/semesterr/${1}`;



    static getAPI() {
        if (this.#api == null) {
            this.#api = new ProjectAPI();
        }
        return this.#api;
    }


    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
            // Das von fetch() zurückgegebene Promise wird bei einem HTTP-Fehlerstatus nicht zurückgewiesen, auch wenn die Antwort ein HTTP 404 oder 500 ist. 
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        })



    //Projekt bezogen
    getProjects() {
        return this.#fetchAdvanced(this.#getProjectsURL()).then((responseJSON) => {
            let projectBOs = ProjectBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(projectBOs);
            })
        })
    }

    getProjectbyId(projectID) {
      return this.#fetchAdvanced(this.#getProjectbyIdURL(projectID)).then((responseJSON) => {
        // Wir erhalten immer ein Array von ProjectBOs.fromJSON, benötigen aber nur ein Objekt
        let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
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
        // Wir erhalten immer ein Array von ProjectBOs.fromJSON, benötigen aber nur ein Objekt
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
        // Wir erhalten immer ein Array von ProjectBOs.fromJSON, benötigen aber nur ein Objekt
        let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseProjectBO);
        })
      })
    }


    //Teilnahme bezogen

    updateValidation(participationBO) {
      return this.#fetchAdvanced(this.#updateValidationURL(participationBO.getID()), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(participationBO)
      }).then((responseJSON) => {
        // Wir erhalten immer ein Array von ParticipationBOs.fromJSON, benötigen aber nur ein Objekt
        let responseValidationBO = ParticipationBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseValidationBO);
        })
      })
    }

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
        // Wir erhalten immer ein Array von ParticipationBOs.fromJSON
        let participationBOs = ParticipationBO.fromJSON(responseJSON);                                      // hier wurde das [0] entfernt
      
        return new Promise(function (resolve) {
          resolve(participationBOs);
        })
      })
    }

    getParticipationForStudent(studentID) { 
      return this.#fetchAdvanced(this.#getParticipationForStudentURL(studentID)).then((responseJSON) => {
        // Wir erhalten immer ein Array von ParticipationBOs.fromJSON
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

    addParticipation(participationBO) {
        return this.#fetchAdvanced(this.#addParticipationURL(), {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(participationBO) 
        }).then((responseJSON) => {
        // Wir erhalten immer ein Array von ParticipationBOs.fromJSON, benötigen aber nur ein Objekt
        let responseParticipationBO = ParticipationBO.fromJSON(responseJSON)[0];
  
          return new Promise(function (resolve) {
            resolve(responseParticipationBO);
          })
        })
      }


    //Student bezogen

    getStudents() {
      return this.#fetchAdvanced(this.#getStudentsURL()).then((responseJSON) => {
          let studentBOs = StudentBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
              resolve(studentBOs);
          })
      })
    }

    getStudentbyId(studentID) { 
        return this.#fetchAdvanced(this.#getStudentByIdURL(studentID)).then((responseJSON) => {
        // Wir erhalten immer ein Array von StudentBOs.fromJSON, benötigen aber nur ein Objekt
        let responseStudentBO = StudentBO.fromJSON(responseJSON)[0];
          return new Promise(function (resolve) {
            resolve(responseStudentBO);
          })
        })
      }


    //State bezogen

    getStatebyId(stateID) {
      return this.#fetchAdvanced(this.#getStatebyIdURL(stateID)).then((responseJSON) => {
        // Wir erhalten immer ein Array von StateBOs.fromJSON, benötigen aber nur ein Objekt
        let responseStateBO = StateBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseStateBO);
        })
      })
    }


    //Benotung bezogen
    getValidationbyId(validationID) {
      return this.#fetchAdvanced(this.#getValidationbyIdURL(validationID)).then((responseJSON) => {
        // Wir erhalten immer ein Array von ValidationBOs.fromJSON, benötigen aber nur ein Objekt
        let responseValidationBO = ValidationBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseValidationBO);
        })
      })
    }



    //Modul bezogen

    getModulebyId(moduleID) {
      return this.#fetchAdvanced(this.#getModulebyIdURL(moduleID)).then((responseJSON) => {
        // Wir erhalten immer ein Array von ModuleBOs.fromJSON, benötigen aber nur ein Objekt
        let responseModuleBO = ModuleBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseModuleBO);
        })
      })
    }



    //User bezogen
    
    getUserByGoogleId(google_id) {
      return this.#fetchAdvanced(this.#getUserByGoogleIdURL(google_id)).then((responseJSON) => {
        // Wir erhalten immer ein Array von UserBOs.fromJSON, benötigen aber nur ein Objekt
        let responseUserBO = UserBO.fromJSON(responseJSON)[0];
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
        // Wir erhalten immer ein Array von UserBOs.fromJSON, benötigen aber nur ein Objekt
        let responseUserBO = UserBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseUserBO);
        })
      })
    }
    


    //Assignment bezogen
    getAssignmentbyId(assignmentID) {
      return this.#fetchAdvanced(this.#getAssignmentbyIdURL(assignmentID)).then((responseJSON) => {
        // Wir erhalten immer ein Array von AssignmentBOs.fromJSON, benötigen aber nur ein Objekt
        let responseAssignmentBO = AssignmentBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseAssignmentBO);
        })
      })
    }

    

    //Semester bezogen
    getSemesterbyCurrentSemester(current_semester_id) {
      return this.#fetchAdvanced(this.#getSemesterbyCurrentSemesterURL(current_semester_id)).then((responseJSON) => {
        // Wir erhalten immer ein Array von SemesterBOs.fromJSON, benötigen aber nur ein Objekt
        let responseSemesterBO = SemesterBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseSemesterBO);
        })
      })
    }

}
