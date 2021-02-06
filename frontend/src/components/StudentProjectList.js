import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, List, ListItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ProjectAPI  from '../api/ProjectAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import StudentProjectListEntry from './StudentProjectListEntry';

/**  
 * Liste aller genehmigten Projkete eines Studentens
 */

class StudentProjectList extends Component {

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
    //Expandierenden Projekteintrag standardmäßig auf Null setzen
    let newID = null;

    //Wenn derselbe Projekteintrag angeklickt wird, wird er zugeklappt, andernfalls wird ein neuer Eintrag expandiert
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

    // setzen des Ladens auf true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  /** Lifecycle-Methode, die aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird */
  componentDidMount() {
    this.getProjects();
  }


  /** Rendern der Komponente*/
  render() {
    const { classes } = this.props;
    const { projects, expandedProjectID, loadingInProgress, error } = this.state;

    return (
      <div className={classes.root}>
        <List className={classes.projectList}>
        { 
        
          projects.map(project => <StudentProjectListEntry key={project.getID()} project={project} 
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
    width: '90%',
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(10),
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