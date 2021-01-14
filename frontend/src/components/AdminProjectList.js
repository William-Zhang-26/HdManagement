import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, List, ListItem, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ProjectAPI  from '../api/ProjectAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import AdminProjectListEntry from './AdminProjectListEntry';
import ValidationForm from './dialogs/ValidationForm';
import ProjectDeleteDialog from './dialogs/ProjectDeleteDialog';
import ProjectForm from './dialogs/ProjectForm';

/**  
 * Hier wird die Liste aus Studentensicht angezeigt. Studenten sehen alle genehmigten Projekte
 * und können sich dafür An- und Abmelden.
 */

class AdminProjectList extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandProject) {
      expandedID = this.props.location.expandProject.getID();
    }

    // Init an empty state
    this.state = {
        projects: [],
        error: null,
        loadingInProgress: false,
        expandedProjectID: expandedID,
        filterdProjects: []
    };
  }

  onExpandedStateChange = project => {
    // console.log(projectID);
    // Set expandend project entry to null by default
    let newID = null;

    // If same project entry is clicked, collapse it else expand a new one
    if (project.getID() !== this.state.expandedProjectID) {
      newID = project.getID();
    }
    // console.log(newID);
    this.setState({
      expandedProjectID: newID,
    });
  }

  getProjects = () => {
    ProjectAPI.getAPI().getProjects()
      .then(projectBOs =>
        this.setState({               // Set new state when ProjectBOs have been fetched
          projects: projectBOs,
          loadingInProgress: false,   // disable loading indicator 
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch 
            projects: [],
            loadingInProgress: false, // disable loading indicator 
            error: e
          })
        );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getProjects();
  }

   /** 
   
   */
  projectDeleted = project => {
    const newProjectList = this.state.projects.filter(projectFromState => projectFromState.getID() !== project.getID());
    this.setState({
      projects: newProjectList,
    });
  }



  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { projects, expandedProjectID, loadingInProgress, error, showProjectDeleteDialog } = this.state;

    return (
      <div className={classes.root}>
        <List className={classes.projectList}>
        { 
          // Show the list of ProjectListEntry components
          // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
          projects.map(project => <AdminProjectListEntry key={project.getID()} project={project} 
          show={this.props.show}  
          onExpandedStateChange={this.onExpandedStateChange}
          onProjectDeleted={this.projectDeleted}/>)
        }

          <ListItem>
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjects} />
          </ListItem>

        </List>
        

      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing(3),
    //marginRight: theme.spacing(10),
    marginLeft: theme.spacing(10),
  },

});

/** PropTypes */
AdminProjectList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,

  show: PropTypes.bool.isRequired
}

export default withRouter(withStyles(styles)(AdminProjectList));