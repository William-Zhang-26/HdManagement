//Genehmigen eines Kurses aus Admin Sicht --> Ändern des Status

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProjectAPI from '../../api/ProjectAPI';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';


class ProjectApprovalForm extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        ApproveProjectInProgress: false,
        ApproveProjectError: null
      };
    }

//Folgendes in der API ergänzen:
//ApproveProject
//RejectProject

  /** Adds an account for the current customer */
  ApproveProject = () => {
    ProjectAPI.getAPI().addProjectApproval(this.props.project.getID()).then(projectBO => {
      // console.log(accountBO)
      this.setState({  // Set new state when StudentBOs have been fetched
        projects: [...this.state.projects, projectBO],
        ApproveProjectInProgress: false, // loading indicator 
        ApproveProjectError: null
      })
    }).catch(e =>
      this.setState({ // Reset state with error from catch 
        projects: [],
        ApproveProjectInProgress: false,
        ApproveProjectError: e
      })
    );

    // set loading to true
    this.setState({
      ApproveProjectInProgress: true,
      ApproveProjectError: null
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
    const { ApproveProjectError, ApproveProjectInProgress } = this.state;

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose}>
          <DialogTitle id='ProjectApproval-Title'>Projekt genehmigen
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Soll das folgende Projekt genehmigt werden: '{project.getName()}' (ID: {project.getID()})?
            </DialogContentText>
            <LoadingProgress show={ApproveProjectInProgress} />
            <ContextErrorMessage error={ApproveProjectError} contextErrorMsg={`The project '${project.getName()}' with the ID: '${project.getID()}' could not be approved.`}
              onReload={this.addStudentForProject} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button variant='contained' onClick={this.addStudent} color='primary'>
              Genehmigen
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
  ProjectApprovalForm.propTypes = {
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
  
  export default withStyles(styles)(ProjectApprovalForm);
