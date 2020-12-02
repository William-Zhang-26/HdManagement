import ProjectBO from './ProjectBO'


export default class ProjectAPI {

    // Singelton instance
    static #api = null;
  
  
    // Local Python backend
    #projectServerBaseURL = '/project';
  


    //Project related
    #getProjectsURL = () => `${this.#projectServerBaseURL}/projects`;

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


    getProjects() {
        return this.#fetchAdvanced(this.#getProjectsURL()).then((responseJSON) => {
            let projectBOs = ProjectBO.fromJSON(responseJSON);
            // console.info(projectBOs);
            return new Promise(function (resolve) {
                resolve(projectBOs);
            })
        })
    }

}