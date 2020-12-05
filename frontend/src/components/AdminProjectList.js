//Ansicht aller Projekte
//Alle Projekte welche ein Admin sehen kann


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectAPI from '../api/ProjectAPI';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProjectListEntry from './ProjectListEntry';




class AdminProjectList extends Component {

    constructor(props) {
        super(props);



    // console.log(props);
    let expandedID = null;


    // Wofür steht getID() ... sollte hier die expandedID nicht gesetzt werden?
    if (this.props.location.expandProject) {
        expandedID = this.props.location.expandProject.getID();
      }
  
      // Init an empty state
      this.state = {
        projects: [],
        filteredProjects: [],
        projectFilter: '',
        error: null,
        loadingInProgress: false,
        expandedProjectID: expandedID,
        showProjectForm: false
      };
    }

    getProjects = () => {
        ProjectAPI.getAPI().getProjects()
          .then(projectBOs =>
            this.setState({               // Set new state when ProjectBOs have been fetched
              projects: projectBOs,
              filteredProjects: [...projectBOs], // store a copy
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



    onExpandedStateChange = project => {
    // console.log(customerID);
    // Set expandend project entry to null by default
    let newID = null;

    // If same project entry is clicked, collapse it else expand a new one
    if (project.getID() !== this.state.expandedProjectID) {
    // Expand the project entry with projectID
    newID = project.getID();
    }


    // console.log(newID);
    this.setState({
    expandedProjectID: newID,
    });
}




    /** Renders the component */
    render() {
        const { classes } = this.props;
        const { expandedProjectID, loadingInProgress, error } = this.state;

        return (
        <div className={classes.root}>
            { 
            // Show the list of CustomerListEntry components
            // Do not use strict comparison, since expandedCustomerID maybe a string if given from the URL parameters
            //<ProjectListEntry key={project.getID()} project={project} expandedState={expandedProjectID === project.getID()}
            //onExpandedStateChange={this.onExpandedStateChange}
            ///>
            }
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjects} />
        </div>
        );
    }

}

/** Component specific styles */
const styles = theme => ({
    root: {
      width: '100%',
    },
    customerFilter: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    }
  });
  

/** PropTypes */
AdminProjectList.propTypes = {
/** @ignore */
classes: PropTypes.object.isRequired,
/** @ignore */
location: PropTypes.object.isRequired,
}


export default withRouter(withStyles(styles)(AdminProjectList));



//Abfrage der Rolle?




