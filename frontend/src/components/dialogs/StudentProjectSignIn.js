import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProjectAPI from '../../api/ProjectAPI';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

//Button für einen Studenten, um sich in einem Projekt anzumelden
class StudentProjectSignIn extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        SignInInProgress: false,
        SignInError: null
      };
    }

//get Project ID

//Folgendes in der API ergänzen:
//get Student ID
//project get ID

  /** Hinzufügen eines Studentens für ein Projekt */
  addStudent = () => {
    ProjectAPI.getAPI().addStudentForProject(this.props.project.getID()).then(studentBO => {
      this.setState({  // Set new state when StudentBOs have been fetched
        students: [...this.state.students, studentBO],
        SignInInProgress: false, // loading indicator 
        SignInError: null
      })
    }).catch(e =>
      this.setState({ // Reset state with error from catch 
        students: [],
        SignInInProgress: false,
        SignInError: e
      })
    );

    // setzen des Ladens auf true
    this.setState({
      SignInInProgress: true,
      SignInError: null
    });
  }


  /** Auszuführende Anweisung beim Schließen des Dialogs */
  handleClose = () => {
    this.props.onClose(null);
  }


  /** Rendern der Komponente */
  render() {
    const { classes, project, show } = this.props;
    const { SignInError, SignInInProgress } = this.state;

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose}>
          <DialogTitle id='StudentSignin-Title'>In Projekt einschreiben
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Möchten Sie sich in folgendes Projekt einschreiben: '{project.getName()}' (ID: {project.getID()})?
            </DialogContentText>
            <LoadingProgress show={SignInInProgress} />
            <ContextErrorMessage error={SignInError} contextErrorMsg={`The student could not be added to the project '${project.getName()}' with the ID: '${project.getID()}'`}
              onReload={this.addStudentForProject} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button variant='contained' onClick={this.addStudent} color='primary'>
              Einschreiben
            </Button> 
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Komponentenspezifisches Styeling */
const styles = theme => ({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    }
  });
  
  /** PropTypes */
StudentProjectSignIn.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,

    /** Student welcher für ein Projekt angemeldet werden soll*/
    project: PropTypes.object.isRequired,

     /** Wenn true, wird der Dialog gerendert */
    show: PropTypes.bool.isRequired,

    /** Handler Funktion welche aufgerufen wird, wenn der Dialog geschlossen ist.*/
    onClose: PropTypes.func.isRequired,
  }
  
  export default withStyles(styles)(StudentProjectSignIn);
