import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, List, ListItem, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import  ProjectAPI  from '../api/ProjectAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProjectListEntry from './ProjectListEntry';
import ProjectForm from './dialogs/ProjectForm';

/**
 * Controlls a list of CustomerListEntrys to create a accordion for each customer.  
 * 
 * @see See [CustomerListEntry](#customerlistentry)
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class StudentProjectList extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
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
    };
  }

  onExpandedStateChange = project => {
    // console.log(customerID);
    // Set expandend customer entry to null by default
    let newID = null;

    // If same customer entry is clicked, collapse it else expand a new one
    if (project.getID() !== this.state.expandedProjectID) {
      // Expand the customer entry with customerID
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
        this.setState({               // Set new state when CustomerBOs have been fetched
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
   * Handles onExpandedStateChange events from the CustomerListEntry component. Toggels the expanded state of 
   * the CustomerListEntry of the given CustomerBO.
   * 
   */
  onExpandedStateChange = project => {
    // console.log(customerID);
    // Set expandend customer entry to null by default
    let newID = null;

    // If same customer entry is clicked, collapse it else expand a new one
    if (project.getID() !== this.state.expandedProjectID) {
      // Expand the customer entry with customerID
      newID = project.getID();
    }
    // console.log(newID);
    this.setState({
      expandedProjectID: newID,
    });
  }

  /** Handles the onClick event of the add customer button */
  addProjectButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the CustmerForm
    this.setState({
      showProjectForm: true
    });
  }

  /** Handles the onClose event of the CustomerForm */
  projectFormClosed = project => {
    // customer is not null and therefore created
    if (project) {
      const newProjectList = [...this.state.projects, project];
      this.setState({
        projects: newProjectList,
        showProjectForm: false
      });
    } else {
      this.setState({
        showProjectForm: false
      });
    }
  }



  /** Renders the component */
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
          // Show the list of CustomerListEntry components
          // Do not use strict comparison, since expandedCustomerID maybe a string if given from the URL parameters
          projects.map(project => <ProjectListEntry key={project.getID()} project={project} 
          show={this.props.show}  onExpandedStateChange={this.onExpandedStateChange}/>)
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
StudentProjectList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,

  show: PropTypes.bool.isRequired
}

export default withRouter(withStyles(styles)(StudentProjectList));