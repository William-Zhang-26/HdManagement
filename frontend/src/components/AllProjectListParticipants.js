import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, List, ListItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import  ProjectAPI  from '../api/ProjectAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import AllProjectListEntryParticipants from './AllProjectListEntryParticipants';


/**  
 * Hier wird die gesamte Liste aus Admin Sicht angezeigt. Man sieht alle Projekte und deren Teilnehmer.
 */

class AllProjectListParticipants extends Component {

  constructor(props) {
    super(props);

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
    };
  }

  onExpandedStateChange = project => {
    // Das aufklappbare Projekt wird standardgemäß auf null gesetzt
    let newID = null;
    if (project.getID() !== this.state.expandedProjectID) {
      // Öffne den Projekteintrag mit deren ID
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


    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  /** Lifecycle-Methode, die aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird */
  componentDidMount() {
    this.getProjects();
  }


  /** Rendern der Komponente */
  render() {
    const { classes } = this.props;
    const { projects, loadingInProgress, error } = this.state;


    return (
      <div className={classes.root}>
        <List className={classes.projectList}>
        { 
         
          projects.map(project => <AllProjectListEntryParticipants key={project.getID()} project={project} 
          show={this.props.show}  onExpandedStateChange={this.onExpandedStateChange}/>)
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

/** Komponentenspezifisches Styling */
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
AllProjectListParticipants.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,

  show: PropTypes.bool.isRequired
}

export default withRouter(withStyles(styles)(AllProjectListParticipants));