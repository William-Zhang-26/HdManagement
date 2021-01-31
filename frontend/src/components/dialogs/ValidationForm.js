//Feld um den Studenten als Dozent/ Admin zu bewerten

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import { MenuItem, FormControl, InputLabel, Select, Typography, Grid} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProjectAPI  from '../../api/ProjectAPI';
import ParticipationBO  from '../../api/ParticipationBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';


/**
 * Die ProjectForm erlaubt es Dozenten, ein neues Projekt anzulegen.
 * Nach Anlegend es Projektes erhält das Projekt den automatisch generierten 
 * Anfangszustand neu (Projekt ist ein Automat).
 * 
 * Daraufhin muss der Dozent warten, bis der Admin das Projekt bewertet (genehmigen / ablehnen)
 * 
 * Wenn das Projekt genehmigt wird, wird dem Studenten das neue Projekt in der Studentensicht 
 * angezeigt und er hat die Möglichkeit, sich dafür anzumelden. Wenn sich Studenten anmelden, hat 
 * das Projekt den Zustand "in Bewertung".
 * 
 * Wenn hingegen das Projekt abgelehnt wird, wird das Projekt nicht weiter angezeigt.
 * Das Projekt wird dabei aber nicht gelöscht, sondern besteht weiterhin mit dem Zustand "abgelehnt".
 * Es sind dann keine weiteren Interaktionen mehr mit dem Projekt möglich.
 * 
 */

class ValidationForm extends Component {

  constructor(props) {
    super(props);

    let v = 0;

    if (props.participation) {
        v = props.participation.getValidation();
      }

    // Init the state
    this.state = {
      validation: v,
      module: 0,
      student: 0,
      project: 0,
      
      // Ladebalken und Error
      updatingInProgress: false,
      updatingError: null
    };

    // Beim Schließen des Dialogs soll der Anfangszustand wieder hergestellt werden
    this.baseState = this.state;
  }

  /** Updates the customer */
  updateValidation = () => {
    // clone the original cutomer, in case the backend call fails
    let updatedValidation = Object.assign(new ParticipationBO(), this.props.participation);
    // set the new attributes from our dialog
    updatedValidation.setModuleID(this.state.module);
    updatedValidation.setProjectID(this.state.project);
    updatedValidation.setStudentID(this.state.student);
    updatedValidation.setValidationID(this.state.validation);
    ProjectAPI.getAPI().updateValidation(updatedValidation).then(participation => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator  
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.baseState.validation = this.state.validation;
      this.props.onClose(updatedValidation);      // call the parent with the new customer
    }).catch(e =>
      this.setState({
        updatingInProgress: false,              // disable loading indicator 
        updatingError: e                        // show error message
      })
    );

    // set loading to true
    this.setState({
      updatingInProgress: true,                 // show loading indicator
      updatingError: null                       // disable error message
    });
  } 



  /** Handles the close / cancel button click event*/
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }


  /*handleSubmit(event) {
    event.preventDefault();
  }*/

  handleChange = (event) => {
    this.setState({
        validation: event.target.value
    });}

  


  /** Renders the component */
  render() {
    const { classes, show, participation } = this.props;
    const { validation } = this.state;
    const { updatingInProgress, updatingError } = this.state;

    console.log(this.state);


    let title = 'Notenvergabe';
    let header = 'Tragen Sie eine Note ein';

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

            <Typography>Note</Typography>
            <FormControl className={classes.formControl}>
                <InputLabel id="open-select-label">Bitte auswählen</InputLabel>
                <Select
                  value={validation}
                  onChange={this.handleChange}
                >
                  <MenuItem value={2}>1,0</MenuItem>
                  <MenuItem value={3}>1,3</MenuItem>
                  <MenuItem value={4}>1,7</MenuItem>
                  <MenuItem value={5}>2,0</MenuItem>
                  <MenuItem value={6}>2,3</MenuItem>
                  <MenuItem value={7}>2,7</MenuItem>
                  <MenuItem value={8}>3,0</MenuItem>
                  <MenuItem value={9}>3,3</MenuItem>
                  <MenuItem value={10}>3,7</MenuItem>
                  <MenuItem value={11}>4,0</MenuItem>
                  <MenuItem value={12}>4,7</MenuItem>
                  <MenuItem value={13}>5,0</MenuItem>
                  <MenuItem value={14}>bestanden</MenuItem>
                  <MenuItem value={15}>nicht bestanden</MenuItem>
                </Select>
              </FormControl>
            

            <Typography>Infotext bzgl. Noten</Typography>

          
            </form>

            <LoadingProgress show={updatingInProgress} />
            <ContextErrorMessage error={updatingError} contextErrorMsg={`Es ist ein Fehler aufgetreten, lol.`} onReload={this.updateValidation} />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>

            <Button variant='contained' onClick={this.updateValidation} color='primary'>
              Speichern
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
});

/** PropTypes */
ValidationForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  //participation: PropTypes.object,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ValidationForm);
