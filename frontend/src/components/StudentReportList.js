import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, List, ListItem, Button } from '@material-ui/core';
//import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import  ProjectAPI  from '../api/ProjectAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import StudentReportListEntry from './StudentReportListEntry';


/**  
 * Hier wird die Liste aus Studentensicht angezeigt. Studenten sehen alle genehmigten Projekte
 * und können sich dafür An- und Abmelden.
 */

class StudentReportList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
        projects: [],
        error: null,
        loadingInProgress: false,
    };
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



  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { projects, loadingInProgress, error } = this.state;

    return (
      <div className={classes.root}>
        <List>
            
        { 
          // Show the list of ProjectListEntry components
          // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
          projects.map(project => <StudentReportListEntry key={project.getID()} project={project} 
          show={this.props.show}/>)
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
  }
});

/** PropTypes */
StudentReportList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,

  show: PropTypes.bool.isRequired
}

export default withRouter(withStyles(styles)(StudentReportList));