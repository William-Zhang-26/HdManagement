//Erstellen eines Objektes, nach der erstellung ist kein Update/ Edit möglich

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import { MenuItem, FormControl, InputLabel, Select, Typography} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProjectAPI  from '../../api/ProjectAPI';
import ProjectBO  from '../../api/ProjectBO';
import ProjectTypeBO  from '../../api/ProjectTypeBO';
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

class ProjectForm extends Component {

  constructor(props) {
    super(props);

    let name = '';
    let as = '';
    let ep = '';
    let pd = '';
    let pc = '';
    let weekly = '';
    let cap = '';
    let bdps = '';
    let bdf = '';
    let bds = '';
    let pbd = '';
    let rp = '';
    let pr = '';

    let typeName = '';
    let ects = '';
    let sws = '';


    // Init the state
    this.state = {
      //Project spezifische Attribute
      projectName: name,
      projectNameValidationFailed: false,
      additionalSupervisor: as,
      additionalSupervisorValidationFailed: false,
      externalPartners: ep,
      externalPartnersValidationFailed: false,
      projectDescription: pd,
      projectDescriptionValidationFailed: false,
      projectCategory: pc,
      projectCategoryValidationFailed: false,
      weekly: weekly,
      weeklyValidationFailed: false,
      capacity: cap,
      capacityValidationFailed: false,
      bDaysPreSchedule: bdps,
      bDaysPreScheduleValidationFailed: false,
      bDaysFinale: bdf,
      bDaysFinaleValidationFailed: false,
      bDaysSaturdays: bds,
      bDaysSaturdaysValidationFailed: false,
      preferredBDays: pbd,
      preferredBDaysValidationFailed: false,
      roomPreference: rp,
      roomPreferenceValidationFailed: false,
      preferredRoom: pr,
      preferredRoomValidationFailed: false,

      // ProjectType spezifische Attribute
      projectTypeName: typeName,
      projectTypeNameValidationFailed: false,
      ects: ects,
      //ectsValidationFailed: false,
      sws: sws,
      //swsValidationFailed: false,

      // Ladebalken und Error
      addingInProgress: false,
      addingError: null
    };

    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    // Beim Schließen des Dialogs soll der Anfangszustand wieder hergestellt werden
    this.baseState = this.state;
  }

  /** Adds the customer */
  addProject = () => {
    let newProject = new ProjectBO(this.state.projectName, this.state.additionalSupervisor, this.state.externalPartners, 
      this.state.projectDescription, this.state.projectCategory, this.state.weekly, this.state.capacity, 
      this.state.bDaysPreSchedule, this.state.bDaysFinale, this.state.bDaysSaturdays, this.state.preferredBDays, 
      this.state.roomPreference, this.state.preferredRoom); 
    let newProjectType = new ProjectTypeBO(this.state.projectTypeName, this.state.ects, this.state.sws);
    ProjectAPI.getAPI().addProject(newProject, newProjectType).then(project => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty customer
      this.setState(this.baseState);
      this.props.onClose(project); // call the parent with the customer object from backend
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
        value: event.target.value
    });}

  handleChange2 = (event) => {
    this.setState({
        value2: event.target.value
    });}


  /** Renders the component */
  render() {
    const { classes, show } = this.props;
    const { projectName, projectNameValidationFailed } = this.state;
    const { additionalSupervisor, additionalSupervisorValidationFailed } = this.state;
    const { externalPartners, externalPartnersValidationFailed } = this.state;
    const { projectDescription, projectDescriptionValidationFailed } = this.state;
    const { projectCategory, value, value2 } = this.state;
    const { weekly, weeklyValidationFailed } = this.state;
    const { capacity, capacityValidationFailed } = this.state;
    const { bDaysPreSchedule, bDaysPreScheduleValidationFailed } = this.state;
    const { bDaysFinale, bDaysFinaleValidationFailed } = this.state;
    const { bDaysSaturdays, bDaysSaturdaysValidationFailed } = this.state;
    const { preferredBDays, preferredBDaysValidationFailed } = this.state;
    const { roomPreference, roomPreferenceValidationFailed } = this.state;
    const { preferredRoom, preferredRoomValidationFailed } = this.state;
    const { projectTypeName, projectTypeNameValidationFailed } = this.state;
    const { ects } = this.state;
    const { sws } = this.state;
    //const {  } = this.state;
    const { addingInProgress, addingError } = this.state;

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

            <TextField type='text' required fullWidth margin='normal' id='additionalSupervisor' label='Betreuende(r) ProfessorInnen:' value={additionalSupervisor} 
                onChange={this.textFieldValueChange} />

            <TextField type='text' required fullWidth margin='normal' id='externalPartners' label='Externe Partner:' value={externalPartners} 
                onChange={this.textFieldValueChange} />

            <TextField type='text' required fullWidth margin='normal' id='projectDescription' label='Projektbeschreibung (Inhalt):' value={projectDescription} 
                onChange={this.textFieldValueChange} error={projectDescriptionValidationFailed} 
                helperText={projectDescriptionValidationFailed ? 'Die Projektbeschreibung muss mindestens ein Zeichen besitzen' : ' '} />

            {/*<TextField autoFocus type='text' required fullWidth margin='normal' id='projectCategory' label='Kategorie des Projektes:' value={projectCategory} 
                onChange={this.textFieldValueChange} error={projectCategoryValidationFailed} 
    helperText={projectCategoryValidationFailed ? 'Die Projektkategorie muss mindestens ein Zeichen besitzen' : ' '} />*/}
            <Typography>Projektkategorie</Typography>
            <FormControl className={classes.formControl}>
                <InputLabel id="open-select-label">Bitte auswählen</InputLabel>
                <Select
                  value={value}
                  onChange={this.handleChange}
                >
                  <MenuItem value={'Management 338005-338009'}>Management 338005-338009</MenuItem>
                  <MenuItem value={'IT 338010-338014'}>IT 338010-338014</MenuItem>
                  <MenuItem value={'Medienproduktion 338015-338019'}>Medienproduktion 338015-338019</MenuItem>
                  <MenuItem value={'Medien/Kultur 338020-338024'}>Medien/Kultur 338020-338024</MenuItem>
                </Select>
              </FormControl>
              <p>Ausgewählte Projektkategorie: {value} </p>

            <TextField type='text' required fullWidth margin='normal' id='capacity' label='Kapazität:' value={capacity} 
                onChange={this.textFieldValueChange} error={capacityValidationFailed} 
                helperText={capacityValidationFailed ? 'Die Kapazität muss mindestens ein Zeichen besitzen' : ' '} />
            
            
            {// Checkbox für Fachspezifisch / Inter-/ Transdisziplinär
            //ECTS und SWS werden automatisch angegeben je nach Auswahl
            }
            <TextField type='text' required fullWidth margin='normal' id='projectTypeName' label='Projektart:' value={projectTypeName} 
                onChange={this.textFieldValueChange} error={projectTypeNameValidationFailed} 
                helperText={projectTypeNameValidationFailed ? 'Es muss eine Projektart angegeben werden' : ' '} />
            
            <Typography>Projektart</Typography>
            <FormControl className={classes.formControl}>
                <InputLabel id="open-select-label">Bitte auswählen</InputLabel>
                <Select
                  value={value2}
                  onChange={this.handleChange2}
                >
                  <MenuItem value={'Fachspezifisches Projekt'}>Fachspezifisches Projekt</MenuItem>
                  <MenuItem value={'Interdisziplinäres Projekt'}>Interdisziplinäres Projekt</MenuItem>
                  <MenuItem value={'Transdisziplinäres Projekt'}>Transdisziplinäres Projekt</MenuItem>
                </Select>
              </FormControl>
              <p>Ausgewählte Projektart: {value2} </p>

            <TextField type='text' required fullWidth margin='normal' id='ects' label='ECTS:' value={ects} 
                onChange={this.textFieldValueChange} />

            <TextField type='text' required fullWidth margin='normal' id='sws' label='SWS:' value={sws} 
                onChange={this.textFieldValueChange} />

            <Typography>Raum- und Ressourcenplanung</Typography>

            {// Wöchentlich bool muss Ja Nein Knöpfe / Ausgabe haben
            }
            <TextField type='text' required fullWidth margin='normal' id='weekly' label='Wöchentlich?' value={weekly} 
                onChange={this.textFieldValueChange} error={weeklyValidationFailed} 
                helperText={weeklyValidationFailed ? 'Es muss eine Checkbox gewählt werden' : ' '} />

            <TextField type='text' required fullWidth margin='normal' id='bDaysPreSchedule' label='Blocktage vor Beginn der Vorlesungszeit:' value={bDaysPreSchedule} 
                onChange={this.textFieldValueChange} />

            <TextField type='text' required fullWidth margin='normal' id='bDaysFinale' label='Blocktage in der Prüfungszeit (nur inter-/trans. Projekte!!!):' value={bDaysFinale} 
                onChange={this.textFieldValueChange} />

            <TextField type='text' required fullWidth margin='normal' id='bDaysSaturdays' label='Blocktage (Samstage) in der Vorlesungszeit:' value={bDaysSaturdays} 
                onChange={this.textFieldValueChange} />

            <TextField type='text' required fullWidth margin='normal' id='preferredBDays' label='Präferierte Tage:' value={preferredBDays} 
                onChange={this.textFieldValueChange} />

            {// roomPreference bool muss Ja Nein Knöpfe / Ausgabe haben
            }
            <TextField type='text' required fullWidth margin='normal' id='roomPreference' label='Besonderer Raum notwendig? y/n' value={roomPreference} 
                onChange={this.textFieldValueChange} error={roomPreferenceValidationFailed} 
                helperText={roomPreferenceValidationFailed ? 'Es muss eine Checkbox gewählt werden' : ' '} />

            <TextField type='text' required fullWidth margin='normal' id='preferredRoom' label='Besonderer Raum notwendig:' value={preferredRoom} 
                onChange={this.textFieldValueChange} />
            </form>

            <LoadingProgress show={addingInProgress} />
            <ContextErrorMessage error={addingError} contextErrorMsg={`Das Projekt konnte nicht erstellt werden`} onReload={this.addProject} />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>

            <Button disabled={projectNameValidationFailed | projectDescriptionValidationFailed | capacityValidationFailed | weeklyValidationFailed | roomPreferenceValidationFailed | projectTypeNameValidationFailed } variant='contained' onClick={this.addProject} color='primary'>
              Einsenden
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
