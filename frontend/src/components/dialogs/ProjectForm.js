import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectAPI  from '../../api/ProjectAPI';
import ProjectBO  from '../../api/ProjectBO';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import { MenuItem, FormControl, InputLabel, Select, Typography, Grid, Box} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import firebase from 'firebase/app';
import 'firebase/auth';


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
 * Es sind dann keine weiteren Interaktionen mehr mit dem Projekt möglich. Änderungen sind im Anschluss nicht mehr möglich.
 * 
 */

class ProjectForm extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      //Projekt spezifische Attribute
      projectName: '',
      projectNameValidationFailed: false,
      projectNameEdited: false,

      userID: null,

      projectTypeID: 0,

      stateID: 1,

      semester_id: null,


      assignmentID: 0,

      projectDescription: '',
      projectDescriptionValidationFailed: false,
      projectDescriptionEdited: false,

      partners: '',

      capacity: 20,

      preferredRoom: '',

      bDaysPreSchedule: '',
      
      bDaysFinale: '',
      
      bDaysSaturdays: '',
      
      preferredBDays: '',
      
      additionalLecturer: '',

      weekly: null,
      weeklyEdited: false,
      

      // Ladebalken und Error
      addingInProgress: false,
      addingError: null
    };
    
    // Beim Schließen des Dialogs soll der Anfangszustand wieder hergestellt werden
    this.baseState = this.state;
  }


  componentDidMount() {
    this.getLecturer();
    this.getSemesterbyCurrentSemester();  
  }


  getLecturer = () => {
    ProjectAPI.getAPI().getUserByGoogleId(firebase.auth().currentUser.uid)
      .then (userBO => {
          this.setState({ userID: userBO.getID() });
      })
  }

  
  getSemesterbyCurrentSemester = () => {
    ProjectAPI.getAPI().getSemesterbyCurrentSemester()
      .then (semesterBO => {
          this.setState({ semester_id: semesterBO.getID() });
      })
  }


  /** Erstellen eines Projekts */
  addProject = () => {
    let newProject = new ProjectBO(this.state.projectName, this.state.userID, this.state.projectTypeID, this.state.stateID, this.state.semester_id, this.state.assignmentID,
      this.state.projectDescription, this.state.partners, this.state.capacity, this.state.preferredRoom, this.state.bDaysPreSchedule, 
      this.state.bDaysFinale, this.state.bDaysSaturdays, this.state.preferredBDays, this.state.additionalLecturer, this.state.weekly); 
   
    ProjectAPI.getAPI().addProject(newProject).then(project => {
      // Backend-Aufruf erfolgreich
      // Leeren des Zustandes des Dialogs für das neue leere Projekt
      this.setState(this.baseState);
      this.props.onClose(project); // das übergeordnete Objekt mit dem Project-Objekt aus dem Backend aufrufen
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
    this.getLecturer();
    this.props.onClose(null);
  }


  handleChange = (event) => {
    this.setState({
        weekly: event.target.value
    });}

  handleChange2 = (event) => {
    this.setState({
      projectTypeID: event.target.value
    });}

  handleChange3 = (event) => {
    this.setState({
      assignmentID: event.target.value
    });}



  /** Rendern der Komponente */
  render() {
    const { classes, show } = this.props;
    const { projectName, projectNameValidationFailed, projectNameEdited } = this.state;
    const { projectTypeID } = this.state;
    const { assignmentID } = this.state;
    const { projectDescription, projectDescriptionValidationFailed, projectDescriptionEdited } = this.state;
    const { partners } = this.state;
    const { capacity } = this.state;
    const { preferredRoom } = this.state;
    const { bDaysPreSchedule } = this.state;
    const { bDaysFinale } = this.state;
    const { bDaysSaturdays } = this.state;
    const { preferredBDays } = this.state;
    const { additionalLecturer } = this.state;
    const { weekly } = this.state;
    const { addingInProgress, addingError } = this.state;

    let title = 'Neues Projekt erstellen';
    let header = 'Füllen Sie das Formular aus';


    return (
      show ?
        <Dialog open={show} open={this.getLecturer} onClose={this.handleClose} width='80%'>
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

            <Typography variant="h6">Projektart</Typography>
            <FormControl className={classes.formControl}>
                <InputLabel required id="open-select-label">Bitte auswählen</InputLabel>
                <Select
                  value={projectTypeID}
                  onChange={this.handleChange2}
                >
                  <MenuItem value={1}>Fachspezifisches Projekt</MenuItem>
                  <MenuItem value={2}>Interdisziplinäres Projekt</MenuItem>
                  <MenuItem value={3}>Transdisziplinäres Projekt</MenuItem>
                </Select>
              </FormControl>
              { projectTypeID === 1 ?
              <Grid className={classes.font}>
                <Box p={1}></Box>
                  <Typography> ECTS: 5 </Typography>
                  <Typography>SWS: 3</Typography>
                <Box p={1}></Box>
                  <FormControl className={classes.formControl}>
                      <InputLabel required id="open-select-label">Projekt Kategorie</InputLabel>
                      <Select
                        value={assignmentID}
                        onChange={this.handleChange3}
                      >
                        <MenuItem value={1}>Management</MenuItem>
                        <MenuItem value={2}>IT</MenuItem>
                        <MenuItem value={3}>Medienproduktion</MenuItem>
                        <MenuItem value={4}>Medien/Kultur</MenuItem>
                      </Select>
                    </FormControl>
              </Grid>

              : projectTypeID === 2 ?
              <Grid className={classes.font}>
                <Box p={1}></Box>
                  <Typography> ECTS: 10 </Typography>
                  <Typography>SWS: 5</Typography>
                <Box p={1}></Box>
                  <FormControl className={classes.formControl}>
                      <InputLabel required id="open-select-label">Projekt Kategorie</InputLabel>
                      <Select
                        value={assignmentID}
                        onChange={this.handleChange3}
                      >
                        <MenuItem value={5}>Management und IT</MenuItem>
                        <MenuItem value={6}>Management und Medienproduktion</MenuItem>
                        <MenuItem value={7}>Management und Medien/Kultur</MenuItem>
                        <MenuItem value={8}>IT und Medienproduktion</MenuItem>
                        <MenuItem value={9}>IT und Medien/Kultur</MenuItem>
                        <MenuItem value={10}>Medienproduktion und Medien/Kultur</MenuItem>
                      </Select>
                    </FormControl>
              </Grid> 
              
              : projectTypeID === 3 ?
              <Grid className={classes.font}>
                <Box p={1}></Box>
                  <Typography> ECTS: 20 </Typography>
                  <Typography>SWS: 10</Typography>
                <Box p={1}></Box>
                  <FormControl className={classes.formControl}>
                      <InputLabel required id="open-select-label">Projekt Kategorie</InputLabel>
                      <Select
                        value={assignmentID}
                        onChange={this.handleChange3}
                      >
                        <MenuItem value={11}>Transdisziplinäres Projekt</MenuItem>
                      </Select>
                    </FormControl>
              </Grid> 
              
              : null }

            <Box p={2}></Box>

            <TextField type='text' required fullWidth margin='normal' id='projectDescription' label='Projektbeschreibung (Inhalt):' value={projectDescription} 
                onChange={this.textFieldValueChange} error={projectDescriptionValidationFailed} 
                helperText={projectDescriptionValidationFailed ? 'Die Projektbeschreibung muss mindestens ein Zeichen besitzen' : ' '} />

            <TextField type='text' fullWidth margin='normal' id='partners' label='Partners' value={partners} 
                onChange={this.textFieldValueChange} />

            <TextField type='text' fullWidth margin='normal' id='additionalLecturer' label='Betreuende(r) ProfessorInnen:' value={additionalLecturer} 
                onChange={this.textFieldValueChange} />

            <TextField type='number' required fullWidth margin='normal' id='capacity' label='Kapazität:' value={capacity} 
                onChange={this.textFieldValueChange} />

            <Box p={2}></Box>

            <Typography variant="h5">Raum- und Ressourcenplanung</Typography>

            <FormControl className={classes.formControl}>
                <InputLabel required id="open-select-label">Wöchentlicher Kurs?</InputLabel>
                <Select
                  value={weekly}
                  onChange={this.handleChange}
                >
                  <MenuItem value={1}>Ja</MenuItem>
                  <MenuItem value={0}>Nein</MenuItem>
                </Select>
              </FormControl>
            
            <Box p={1}></Box>


            <TextField type='text' fullWidth margin='normal' id='preferredRoom' label='Besonderer Raum notwendig:' value={preferredRoom} 
            onChange={this.textFieldValueChange} />


            <TextField type='text' fullWidth margin='normal' id='bDaysPreSchedule' label='Blocktage vor Beginn der Vorlesungszeit:' value={bDaysPreSchedule} 
                onChange={this.textFieldValueChange} />


            <TextField type='text' fullWidth margin='normal' id='bDaysFinale' label='Blocktage in der Prüfungszeit (nur inter-/trans. Projekte!!!):' value={bDaysFinale} 
                onChange={this.textFieldValueChange} />


            <TextField type='text' fullWidth margin='normal' id='bDaysSaturdays' label='Blocktage (Samstage) in der Vorlesungszeit:' value={bDaysSaturdays} 
                onChange={this.textFieldValueChange} />


            <TextField type='text' fullWidth margin='normal' id='preferredBDays' label='Präferierte Tage:' value={preferredBDays} 
                onChange={this.textFieldValueChange} />


            </form>

            <LoadingProgress show={addingInProgress} />
            <ContextErrorMessage error={addingError} contextErrorMsg={`Das Projekt konnte nicht erstellt werden. Überprüfen Sie, ob Sie alle Pflichtfelder ausgefüllt haben.`} onReload={this.addProject} />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>

            <Button disabled={projectNameValidationFailed |!projectNameEdited | projectDescriptionValidationFailed | !projectDescriptionEdited   } variant='contained' onClick={this.addProject} color='primary'>
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
ProjectForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Wenn dies "true" ist, wird die Komponente gerendert */
  show: PropTypes.bool.isRequired,
  /**  
   * Handlerfunktion die aufgerufen wird, wenn das Dialogfenster geschlossen wird
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProjectForm);
