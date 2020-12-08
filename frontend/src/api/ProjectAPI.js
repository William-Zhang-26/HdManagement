import ProjectBO from './ProjectBO'
import StudentBO from './StudentBO'


export default class ProjectAPI {

    // Singelton instance
    static #api = null;
  
  
    // Local Python backend
    #projectServerBaseURL = '/project';
  


    //Project related
    #getProjectsURL = () => `${this.#projectServerBaseURL}/projects`;

    //Student related
    #getStudentURL = (id) => `${this.#projectServerBaseURL}/students/${id}`;
    #deleteStudentURL = (id) => `${this.#projectServerBaseURL}/students/${id}`;


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
            // console.info(projectBOs);
            return new Promise(function (resolve) {
                resolve(projectBOs);
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