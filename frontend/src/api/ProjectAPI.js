import ProjectBO from './ProjectBO'
import StudentBO from './StudentBO'


export default class ProjectAPI {

    // Singelton instance
    static #api = null;
  
  
    // Local Python backend
    #projectServerBaseURL = '/projectmanager';
  
    //Local http-fake-backend 
    //#projectServerBaseURL = '/api/project';


    //Project related
    #getProjectsURL = () => `${this.#projectServerBaseURL}/project/${1}`;
    #getProjectURL = (id) => `${this.#projectServerBaseURL}/project/${id}`;
    #getAttributesForProjectURL = (id) => `${this.#projectServerBaseURL}/projects/${id}/attributes`;
    #addProjectURL = () => `${this.#projectServerBaseURL}/projects`;
    #deleteProjectURL = (id) => `${this.#projectServerBaseURL}/projects/${id}`;

    //Student related
    #getStudentURL = (id) => `${this.#projectServerBaseURL}/students/${id}`;
    #deleteStudentURL = (id) => `${this.#projectServerBaseURL}/students/${id}`;
    #addStudentsForProjectURL = (id) => `${this.#projectServerBaseURL}/project/${id}/student`;


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
          // We always get an array of CustomerBOs.fromJSON, but only need one object
          let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
          // console.info(responseCustomerBO);
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
          // We always get an array of CustomerBOs.fromJSON, but only need one object
          let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
          // console.info(accountBOs);
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
    getStudent(studentID) {
        return this.#fetchAdvanced(this.#getStudentURL(studentID)).then((responseJSON) => {
          // We always get an array of StudentBOs.fromJSON, but only need one object
          let responseStudentBO = StudentBO.fromJSON(responseJSON)[0];
          // console.info(responseCustomerBO);
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
                // console.info(accountBO);
                return new Promise(function (resolve) {
                    // We expect only one new account
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
        // console.info(accountBOs);
        return new Promise(function (resolve) {
            resolve(responseStudentBO);
        })
        })
    } 
   
}