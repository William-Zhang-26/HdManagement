import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectAPI  from '../../api/ProjectAPI';
import StudentBO  from '../../api/StudentBO';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import { MenuItem, FormControl, InputLabel, Select, Typography, Grid, Box} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import firebase from 'firebase/app';
import 'firebase/auth';


/**
 * Die StudentForm wird bei Neuanmeldung eines Studenten aufgerufen. Dabei werden alle Felder des UserBOs
 * übernommen und weitere Felder (Studiengangskürzel und Matrikelnummer) abgefragt.
 * 
 */

class StudentForm extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      //Studenten spezifische Attribute
      userID: null,
      
      studentName: '',

      course: '',
      courseValidationFailed: false,
      courseEdited: false,

      matriculation_number: '',
      matriculation_numberValidationFailed: false,
      matriculation_numberEdited: false,

      mail: '',

      google_id: '',
      
      // Ladebalken und Error
      addingInProgress: false,
      addingError: null
    };
    
    // Beim Schließen des Dialogs soll der Anfangszustand wieder hergestellt werden
    this.baseState = this.state;
  }


  componentDidMount() {
    this.getUser(); 
  }


  getUser = () => {
    ProjectAPI.getAPI().getUserByGoogleId(firebase.auth().currentUser.uid)
      .then (studentBO => {
          this.setState({ 
              userID: studentBO.getID(), 
              studentName: studentBO.getName(),
              mail: studentBO.getMail(),
              google_id: studentBO.getGoogleId()
            });
      })
  }

  

  /** Erstellen eines Studenten */
  addStudent = () => {
    let newStudent = new StudentBO(this.state.studentName, this.state.userID, this.state.course, this.state.matriculation_number, this.state.mail, this.state.google_id); 
   
    ProjectAPI.getAPI().addStudent(newStudent).then(student => {
      // Backend-Aufruf erfolgreich
      // Leeren des Zustandes des Dialogs für den neuen leeren Studenten
      this.setState(this.baseState);
      this.props.onClose(student); // das übergeordnete Objekt mit dem Student-Objekt aus dem Backend aufrufen
    }).catch(e =>
      this.setState({
        addingInProgress: false,    // Ladeanzeige deaktivieren 
        addingError: e              // Fehlermeldung anzeigen
      })
    );

    // setzen des Ladens auf true
    this.setState({
        addingInProgress: true,       // Ladeanzeige anzeigen
        addingError: null             // Fehlermeldung deaktivieren
    }
    );
  }
  

  /**  Handlerfunktion für Wertänderungen und deren Validierung in Formulartextfeldern */
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

  /** Auszuführende Anweisung beim Schließen des Dialogs */
  handleClose = () => {
    // Zurücksetzen des Zustands
    this.setState(this.baseState);
    this.getUser();
    this.props.onClose(null);
  }


  handleChange = (event) => {
    this.setState({
        course: event.target.value
    });}



  /** Rendern der Komponente */
  render() {
    const { classes, show } = this.props;
    const { course, courseValidationFailed, courseEdited } = this.state;
    const { matriculation_number, matriculation_numberValidationFailed, matriculation_numberEdited } = this.state;
    const { addingInProgress, addingError } = this.state;

    let title = 'Studentenformular';
    let header = 'Füllen Sie das Formular aus';


    return (
      show ?
        <Dialog open={show} open={this.getUser} onClose={this.handleClose} width='80%'>
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
            <TextField autoFocus type='text' required fullWidth margin='normal' id='course' label='Studiengangskürzel:' value={course} 
                onChange={this.textFieldValueChange} error={courseValidationFailed} 
                helperText={courseEdited ? 'Der Studiengangskürzel muss mindestens ein Zeichen besitzen' : ' '} />

            <TextField autoFocus type='text' required fullWidth margin='normal' id='matriculation_number' label='Matrikelnummer:' value={matriculation_number} 
                onChange={this.textFieldValueChange} error={matriculation_numberValidationFailed} 
                helperText={matriculation_numberEdited ? 'Die Matrikelnummer muss mindestens ein Zeichen besitzen' : ' '} />

            </form>

            <LoadingProgress show={addingInProgress} />
            <ContextErrorMessage error={addingError} contextErrorMsg={`Es ist ein Fehler aufgetreten. Überprüfen Sie, ob Sie alle Pflichtfelder ausgefüllt haben.`} onReload={this.addStudent} />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>

            <Button disabled={courseValidationFailed |!courseEdited | matriculation_numberValidationFailed | !matriculation_numberEdited } variant='contained' onClick={this.addStudent} color='primary'>
              Einsenden
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
  font: {
    top: theme.spacing(1),
  },
});

/** PropTypes */
StudentForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Wenn dies "true" ist, wird die Komponente gerendert */
  show: PropTypes.bool.isRequired,
  /**  
   * Handlerfunktion die aufgerufen wird, wenn das Dialogfenster geschlossen wird
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(StudentForm);
