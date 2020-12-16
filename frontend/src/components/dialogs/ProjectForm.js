//Erstellen eines Objektes, nach der erstellung ist kein Update/ Edit möglich

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProjectAPI  from '../../api/ProjectAPI';
import ProjectBO  from '../../api/ProjectBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';


/**
 * Shows a modal form dialog for a CustomerBO in prop customer. If the customer is set, the dialog is configured 
 * as an edit dialog and the text fields of the form are filled from the given CustomerBO object. 
 * If the customer is null, the dialog is configured as a new customer dialog and the textfields are empty.
 * In dependency of the edit/new state, the respective backend calls are made to update or create a customer. 
 * After that, the function of the onClose prop is called with the created/update CustomerBO object as parameter.  
 * When the dialog is canceled, onClose is called with null.
 * 
 * @see See Material-UIs [Dialog](https://material-ui.com/components/dialogs)
 * @see See Material-UIs [TextField](https://material-ui.com/components/text-fields//)
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class ProjectForm extends Component {

  constructor(props) {
    super(props);

    let name = ''
    

    // Init the state
    this.state = {
      projectName: name,
      projectNameValidationFailed: false,
      addingInProgress: false,
      addingError: null
    };
    // Beim Schließen des Dialogs soll der Anfangszustand wieder hergestellt werden
    this.baseState = this.state;
  }

  /** Adds the customer */
  addProject = () => {
    let newProject = new ProjectBO(this.state.projectName);
    ProjectAPI.getAPI().addProject(newProject).then(project => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty customer
      this.setState(this.baseState);
      this.props.onClose(project); // call the parent with the customer object from backend
    }).catch(e =>
      this.setState({
        updatingInProgress: false,    // disable loading indicator 
        updatingError: e              // show error message
      })
    );

    // set loading to true
    this.setState({
      updatingInProgress: true,       // show loading indicator
      updatingError: null             // disable error message
    });
  }

// Update gegebenenfalls ergänzen um Projekte zu ändern

  /** Handles value changes of the forms textfields and validates them */
  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
      [event.target.id + 'ValidationFailed']: error,
      [event.target.id + 'Edited']: true
    });
  } 

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  /** Renders the component */
  render() {
    const { classes, project, show } = this.props;
    const { projectName, projectNameValidationFailed, addingInProgress,addingError} = this.state;

    let title = 'Neues Projekt erstellen';
    let header = 'Füllen Sie das Formuler aus';

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle id='form-dialog-title'>{title}
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {header}
            </DialogContentText>
            <form className={classes.root} noValidate autoComplete='off'>
              <TextField autoFocus type='text' required fullWidth margin='normal' id='projectName' label='Projekttitel:' value={projectName} 
                onChange={this.textFieldValueChange} error={projectNameValidationFailed} 
                helperText={projectNameValidationFailed ? 'Der Projekttitel muss mindestens ein Zeichen besitzen' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress} />
            
            <ContextErrorMessage error={addingError} contextErrorMsg={`Das Projekt konnte nicht erstellt werden`} onReload={this.addProject} />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>

            <Button disabled={projectNameValidationFailed} variant='contained' onClick={this.addProject} color='primary'>
                  Add
            </Button>

          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

/** PropTypes */
ProjectForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be edited */
  project: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**  
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created CustomerBO as parameter or null, if cancel was pressed.
   *  
   * Signature: onClose(CustomerBO customer);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProjectForm);
