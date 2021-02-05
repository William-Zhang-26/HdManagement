import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, List, ListItem, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import ProjectAPI  from '../api/ProjectAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import LecturerProjectListEntry from './LecturerProjectListEntry';
import ProjectForm from './dialogs/ProjectForm';


/**  
 * Hier wird die Liste aus Dozentensicht angezeigt. Dozenten sehen die eigenen Projekte (Neue und genehmigte)
 * und können weitere Projekte erstellen.
 */

class LecturerProjectList extends Component {

  constructor(props) {
    super(props);

    let expandedID = null;

    if (this.props.location.expandCustomer) {
      expandedID = this.props.location.expandCustomer.getID();
    }

    // Init an empty state
    this.state = {
        projects: [],
        error: null,
        loadingInProgress: false,
        expandedProjectID: expandedID,
        showProjectForm: false,
    };
  }

  onExpandedStateChange = project => {
    let newID = null;

    if (project.getID() !== this.state.expandedProjectID) {
      newID = project.getID();
    }

    this.setState({
      expandedProjectID: newID,
    });
  }

  getProjects = () => {
    ProjectAPI.getAPI().getProjects()
      .then(projectBOs =>
        this.setState({               
          projects: projectBOs,
          loadingInProgress: false,   
          error: null
        })).catch(e =>
          this.setState({           
            projects: [],
            loadingInProgress: false, 
            error: e
          })
        );
      

    // setzen des Ladens auf ture
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }
    
  

  /** Lifecycle-Methode, die aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird */
  componentDidMount() {
    this.getProjects();
  }

  



  /** Handles the onClick event of the add project button */
  addProjectButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the ProjectForm
    this.setState({
      showProjectForm: true
    });
    console.log(this.state); 
  }

  /** Handles the onClose event of the ProjectForm*/
  projectFormClosed = project => {
    // project is not null and therefore created
    if (project) {
      this.setState({
        projects: [...this.state.projects, project],
        showProjectForm: false
      });
    } else {
      this.setState({
        showProjectForm: false
      });
    }
    console.log(this.state); 
  }



  /** Rendern der Komponente */
  render() {
    const { classes } = this.props;
    const { projects, expandedProjectID, loadingInProgress, error, showProjectForm } = this.state;

    return (
      <div className={classes.root}>
        <List className={classes.projectList}>
        <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addProjectButtonClicked}>
              Projekt erstellen
        </Button>
        


        { 
          // Show the list of ProjectListEntry components
          // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
          projects.map(project => <LecturerProjectListEntry key={project.getID()} project={project}
          show={this.props.show}  
          onExpandedStateChange={this.onExpandedStateChange} />)
        }

          <ListItem>
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjects} />
            <ProjectForm show={showProjectForm} onClose={this.projectFormClosed} />
          
          </ListItem>

        </List>
        

      </div>
    );
  }
}

/** Komponentenspezifisches Styeling */
const styles = theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing(3),
    //marginRight: theme.spacing(10),
    marginLeft: theme.spacing(10),
  },
  

});

/** PropTypes */
LecturerProjectList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,

  show: PropTypes.bool.isRequired
}

export default withRouter(withStyles(styles)(LecturerProjectList));