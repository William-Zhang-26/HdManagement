import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, List, ListItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ProjectAPI  from '../api/ProjectAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import StudentListEntry from './StudentListEntry';

/**  
 * Hier wird die Liste aller Studenten (für Dozenten und Admins) angezeigt.
 */

class StudentList extends Component {

  constructor(props) {
    super(props);

    let expandedID = null;

    if (this.props.location.expandProject) {
      expandedID = this.props.location.expandProject.getID();
    }

    // Init an empty state
    this.state = {
        students: [],
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

  getStudents = () => {
    ProjectAPI.getAPI().getStudents()
      .then(studentBOs =>
        this.setState({                                                          //Neuen Zustand setzen, wenn ProjectBOs fetched wurde
          students: studentBOs,
          loadingInProgress: false,                                             //Ladeanzeige deaktivieren 
          error: null
        })).catch(e =>
          this.setState({                                                      // Zustand zurücksetzen nach dem Fehlercatch 
            students: [],
            loadingInProgress: false,                                         //Ladeanzeige deaktivieren 
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
    this.getStudents();
  }



    /** Rendern der Komponente */
  render() {
    const { classes } = this.props;
    const { students, loadingInProgress, error } = this.state;


    return (
      <div className={classes.root}>
        
        <List className={classes.studentList}>
        
        { 
          students.map(student => <StudentListEntry key={student.getID()} student={student} 
          show={this.props.show}  
          onExpandedStateChange={this.onExpandedStateChange}
          show={this.props.show}/>)
        }
        

          <ListItem>
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`Die Studenten können nicht angezeigt werden.`} onReload={this.getStudents} />
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

});

/** PropTypes */
StudentList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,

  show: PropTypes.bool.isRequired
}

export default withRouter(withStyles(styles)(StudentList));