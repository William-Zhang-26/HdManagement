import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, List, ListItem, Button, Typography, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ProjectAPI  from '../api/ProjectAPI';
import LoadingProgress from './dialogs/LoadingProgress';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import ReplayIcon from '@material-ui/icons/Replay';
import StudentProjectSignIn from './dialogs/StudentProjectSignIn';
import StudentProjectSignOut from './dialogs/StudentProjectSignOut';
import firebase from 'firebase/app';
import 'firebase/auth';


/**  
 * Hier wird die Liste aus Studentensicht angezeigt. Studenten sehen alle genehmigten Projekte
 * und können sich dafür An- und Abmelden.
 */

class StudentButtons extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
        participation: props.participation,
        student: null,
        showParticipationDeleteDialog: false,
        loadingInProgress: false,

    };
  }


  getStudent = () => {
    ProjectAPI.getAPI().getStudentbyId(firebase.auth().currentUser.uid)  
        .then (studentBO => {
            this.setState({ student: studentBO });
        })
  }

  /** Lifecycle-Methode, die aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird */
  componentDidMount() {
    this.getStudent();
  }

  /** Handles the onClick event of the delete project button */
  deleteParticipationButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showParticipationDeleteDialog: true
    });
  }

  /** Handles the onClose event of the ProjectDeleteDialog */
  StudentProjectSignOutClosed = (participation) => {
    // if project is not null, delete it
    if (participation) {
      this.props.onParticipationDeleted(participation);
    };
    
    // Das Dialog-Fenster nicht anzeigen
    this.setState({
      showParticipationDeleteDialog: false
    });
  }


  /** Rendern der Komponente */
  render() {
    const { classes } = this.props;
    const { loadingInProgress, student, participation, showParticipationDeleteDialog } = this.state;
    console.log(this.state);

    return (
      <div className={classes.root}>

        { student && participation.getStudentID() === student.getID() ?
          <Button  color='primary' onClick={this.deleteParticipationButtonClicked}>
            Abmelden
          </Button>
        : null }

                
      <LoadingProgress show={loadingInProgress} />

      <StudentProjectSignOut show={showParticipationDeleteDialog} participation={participation} onClose={this.StudentProjectSignOutClosed} />
      
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
    marginLeft: theme.spacing(1),
  },
  font: {
    fontSize: 15,
  },
  validate: {
    width: '100%',
    color: indigo[300],
    fontSize: 10,
  },
  delete: {
    width: '100%',
    color: red[500],
    fontSize: 10,
  },
  replay: {
    //width: '100%',
    color: indigo[500],
  },
  box: {
    width: '100%',
    color: indigo[500],
    borderColor: indigo[500],
    
  }
});

//<Button className={classes.replay} startIcon={<ReplayIcon />} onClick = {this.getValidationbyId}/>

/** PropTypes */
StudentButtons.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,

  show: PropTypes.bool.isRequired,

  student: PropTypes.object.isRequired,
  onParticipationDeleted: PropTypes.func.isRequired
}

export default withRouter(withStyles(styles)(StudentButtons));