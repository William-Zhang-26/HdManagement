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



class ValidationForm extends Component {

  constructor(props) {
    super(props);
    //Typzuweisung der Variablen
    let v = 0;
    let m = 0;
    let s = 0;
    let p = 0;
    

    //Abruf der Variablen aus dem ProjectBO
    if (props.participation) {
        v = props.participation.getValidationID();
        m = props.participation.getModuleID();
        s = props.participation.getStudentID();
        p = props.participation.getProjectID();
      }

    // Init the state
    this.state = {
      validation: v,
      module: m,
      student: s,
      project: p,
      participation: this.props.participation,

      
      // Ladebalken und Error
      updatingInProgress: false,
      updatingError: null
    };

    // Beim Schließen des Dialogs soll der Anfangszustand wieder hergestellt werden
    this.baseState = this.state;
  }



  /** Änderung der Bewertung */
  updateValidation = () => {
    let updatedValidation = Object.assign(new ParticipationBO(), this.props.participation);
  // setzen der neuen Attribute vom Dialog
  updatedValidation.setModuleID(this.state.module);
    updatedValidation.setProjectID(this.state.project);
    updatedValidation.setStudentID(this.state.student);
    updatedValidation.setValidationID(this.state.validation);
    ProjectAPI.getAPI().updateValidation(updatedValidation).then(participation => {
      this.setState({
        updatingInProgress: false,                                  // Ladeanzeige deaktivieren   
        updatingError: null                                         // Keine Fehlermeldung
      });
      // den neuen Zustand als Basiszustand beibehalten
      this.baseState.validation = this.state.validation;
      this.baseState.module = this.state.module;
      this.baseState.student = this.state.student;
      this.baseState.project = this.state.project;
      this.props.onClose(updatedValidation);                        // Die übergeordnete Komponente mit dem State aufrufen
    }).catch(e =>
      this.setState({
        updatingInProgress: false,                                  // Ladeanzeige deaktivieren 
        updatingError: e                                            // Fehlermeldung anzeigen
      })
    );

    // set loading to true
    this.setState({
      updatingInProgress: true,                                   // Ladeanzeige anzeigen
      updatingError: null                                         // Fehlermeldung deaktivieren
    });
  } 

  

  /** Auszuführende Anweisung beim Schließen des Dialogs */
  handleClose = () => {
    // Zurücksetzen des Zustands
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  handleChange = (event) => {
    this.setState({
        validation: event.target.value
    });}

  


  /** Rendern der Komponente */
  render() {
    const { classes, show } = this.props;
    const { validation } = this.state;
    const { updatingInProgress, updatingError } = this.state;


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
          

          
            </form>

            <Typography>Dozenten müssen je nach Kurs (1) eine Benotung (gängig) (2) bestanden / nicht bestanden (z. B. in den Schlüsselkompetenzen) angeben
            </Typography>

            <LoadingProgress show={updatingInProgress} />
            <ContextErrorMessage error={updatingError} contextErrorMsg={`Es ist ein Fehler aufgetreten.`} onReload={this.updateValidation} />
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

/** Komponentenspezifisches Styling */
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
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ValidationForm);
