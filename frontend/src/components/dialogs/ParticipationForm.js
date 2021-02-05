import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import { MenuItem, FormControl, InputLabel, Select, Typography, Grid} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProjectAPI  from '../../api/ProjectAPI';
import ParticipationBO  from '../../api/ParticipationBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';


//Das Fenster um Teilnehmer einem Projekt hinzuzufügen 



class ParticipationForm extends Component {

    constructor(props) {
      super(props);

      let pid = 0;

      //Abruf der Variablen aus dem ProjectBO
      if (props.project) {
        pid = props.project.getID();
      }
        
      // Init the state
        this.state = {
            module_id: 0,
            student_id: 0,
            //project: this.props.project,
            project_id: pid,

      // Ladebalken und Error
            addingInProgress: false,
            addingError: null

        };
        
        this.baseState = this.state;
    }




/** Adds the Project */
addParticipation = () => {
    let newParticipation = new ParticipationBO( this.state.module_id, this.state.project_id, this.state.student_id, 1 ); 
   
    ProjectAPI.getAPI().addParticipation(newParticipation).then(participation => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty project
      this.setState(this.baseState);
      this.props.onClose(participation); // call the parent with the customer object from backend
    }).catch(e =>
      this.setState({
        addingInProgress: false,    // disable loading indicator 
        addingError: e              // show error message
      })
    );

    // set loading to true
    this.setState({
        addingInProgress: true,       // show loading indicator
        addingError: null             // disable error message
    }
    );
    console.log("erstelltes Projekt:")
    console.log(newParticipation)
  }

  /** Handles the close / cancel button click event*/
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

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



/** Renders the component */
render() {
  const { classes, show, project } = this.props;
  const { module_id, student_id } = this.state;

  const { addingInProgress, addingError } = this.state;

  const { value } = this.state;

  console.log("Projektbereich Log:")
  console.log(this.state);


  let title = 'Neuen Teilnehmer hinzufügen';
  let header = 'Füllen Sie das Formular aus';

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
          <TextField autoFocus type='number' required fullWidth margin='normal' id='module_id' label='module_id:' value={module_id} onChange={this.textFieldValueChange} />

          <TextField autoFocus type='number' required fullWidth margin='normal' id='student_id' label='student_id:' value={student_id} onChange={this.textFieldValueChange} />
          </form>

          <LoadingProgress show={addingInProgress} />
          <ContextErrorMessage error={addingError} contextErrorMsg={`Der Teilnehmer konnte nicht hinzugefügt werden`} onReload={this.addParticipation} />
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleClose} color='secondary'>
            Abbrechen
          </Button>

          <Button variant='contained' onClick={this.addParticipation} color='primary'>
            Hinzufügen
          </Button>
        </DialogActions>
      </Dialog>
      : null
  );
}
}
  




/** Komponentenspezifisches Styeling */
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
});

/** PropTypes */
ParticipationForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  //participation: PropTypes.object,
  project: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ParticipationForm);