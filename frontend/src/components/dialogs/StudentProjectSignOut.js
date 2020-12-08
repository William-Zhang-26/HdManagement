//Button für Studenten, um sich von Projekten abzumelden

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProjectAPI from '../../api/ProjectAPI';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';


class StudentProjectSignOut extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        SignOutInProgress: false,
        SignOutError: null
      };
    }

//get Project ID

//Folgendes in der API ergänzen:
//get Student ID
//DeleteStudentFromProject(ProjectID)
//project get ID

  /** Adds an account for the current customer */
  SignOutStudent = () => {
    ProjectAPI.getAPI().deleteStudentFromProject(this.props.project.getID()).then(studentBO => {
      // console.log(accountBO)
      this.setState({  // Set new state when StudentBOs have been fetched
        students: [...this.state.students, studentBO],
        SignOutInProgress: false, // loading indicator 
        SignOutError: null
      })
    }).catch(e =>
      this.setState({ // Reset state with error from catch 
        students: [],
        SignOutInProgress: false,
        SignOutError: e
      })
    );

    // set loading to true
    this.setState({
      SignOutInProgress: true,
      SignOutError: null
    });
  }


  /** Handles the close / cancel button click event */
    handleClose = () => {
    // console.log(event);
    this.props.onClose(null);
  }


  /** Renders the component */
  render() {
    const { classes, project, show } = this.props;
    const { SignOutError, SignOutInProgress } = this.state;

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose}>
          <DialogTitle id='StudentSignOut-Title'>Aus Projekt ausschreiben
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Möchten Sie sich aus folgendem Projekt ausschreiben: '{project.getName()}' (ID: {project.getID()})?
            </DialogContentText>
            <LoadingProgress show={SignOutInProgress} />
            <ContextErrorMessage error={SignOutError} contextErrorMsg={`The student could not be deleted from the project '${project.getName()}' with the ID: '${project.getID()}'`}
              onReload={this.deleteStudentFromProject} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button variant='contained' onClick={this.deleteStudentFromProject} color='primary'>
              Ausschreiben
            </Button> 
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Component specific styles */
const styles = theme => ({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    }
  });
  
  /** PropTypes */
StudentProjectSignOut.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** The CustomerBO to be deleted */
    project: PropTypes.object.isRequired,
    /** If true, the dialog is rendered */
    show: PropTypes.bool.isRequired,
    /**  
     * Handler function which is called, when the dialog is closed.
     * Sends the deleted CustomerBO as parameter or null, if cancel was pressed.
     *  
     * Signature: onClose(CustomerBO customer);
     */
    onClose: PropTypes.func.isRequired,
  }
  
  export default withStyles(styles)(StudentProjectSignOut);
