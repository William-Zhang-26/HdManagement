//Erstellen eines Objektes, nach der erstellung ist kein Update/ Edit möglich

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import { MenuItem, FormControl, InputLabel, Select, Typography, Grid} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProjectAPI  from '../../api/ProjectAPI';
import ProjectBO  from '../../api/ProjectBO';
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

    let pn = '';
    let uid = 0;

    if (props.project) {
      pn = props.project.getName();
      uid = props.project.getUserID();

    }


    // Init the state
    this.state = {
      //Project spezifische Attribute
      projectName: pn,
      projectNameValidationFailed: false,

      userID: uid, //hier wird stattdessen noch die current user Id durch eine API geholt

      projectTypeID: 0,

      stateID: 1,

      projectDescription: '',
      projectDescriptionValidationFailed: false,

      partners: '',

      capacity: 0,

      preferredRoom: '',

      bDaysPreSchedule: '',
      
      bDaysFinale: '',
      
      bDaysSaturdays: '',
      
      preferredBDays: '',
      
      additionalLecturer: '',

      weekly: '',
      

      // Ladebalken und Error
      addingInProgress: false,
      addingError: null
    };

    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    // Beim Schließen des Dialogs soll der Anfangszustand wieder hergestellt werden
    this.baseState = this.state;
  }

  /** Adds the Project */
  addProject = () => {
    let newProject = new ProjectBO(this.state.projectName, this.state.userID, this.state.projectTypeID, this.state.stateID, 
      this.state.projectDescription, this.state.partners, this.state.capacity, this.state.preferredRoom, this.state.bDaysPreSchedule, 
      this.state.bDaysFinale, this.state.bDaysSaturdays, this.state.preferredBDays, this.state.additionalLecturer, this.state.weekly); 
   
    ProjectAPI.getAPI().addProject(newProject).then(project => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty project
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
      projectTypeID: event.target.value
    });}


  /** Renders the component */
  render() {
    const { classes, show, project } = this.props;
    const { projectName, projectNameValidationFailed } = this.state;
    const { userID } = this.state;
    const { projectTypeID } = this.state;
    const { projectDescription, projectDescriptionValidationFailed } = this.state;
    const { partners } = this.state;
    const { capacity } = this.state;
    const { preferredRoom } = this.state;
    const { bDaysPreSchedule } = this.state;
    const { bDaysFinale, } = this.state;
    const { bDaysSaturdays } = this.state;
    const { preferredBDays } = this.state;
    const { additionalLecturer } = this.state;
    const { weekly } = this.state;
    const { addingInProgress, addingError } = this.state;

    const { value } = this.state;

    console.log(this.state);


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


            <TextField type='number' required fullWidth margin='normal' id='userID' label='User ID:' value={userID} 
                onChange={this.textFieldValueChange} />


            <Typography>Projektart</Typography>
            <FormControl className={classes.formControl}>
                <InputLabel id="open-select-label">Bitte auswählen</InputLabel>
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
              <Grid>
                <Typography> ECTS: 5 </Typography>
                <Typography>SWS: 3</Typography>
              </Grid>

              : projectTypeID === 2 ?
              <Grid>
                <Typography> ECTS: 10 </Typography>
                <Typography>SWS: 5</Typography>
              </Grid> 
              
              : projectTypeID === 3 ?
              <Grid>
                <Typography> ECTS: 20 </Typography>
                <Typography>SWS: 10</Typography>
              </Grid> 
              
              : null }


            <TextField type='text' required fullWidth margin='normal' id='projectDescription' label='Projektbeschreibung (Inhalt):' value={projectDescription} 
                onChange={this.textFieldValueChange} error={projectDescriptionValidationFailed} 
                helperText={projectDescriptionValidationFailed ? 'Die Projektbeschreibung muss mindestens ein Zeichen besitzen' : ' '} />


            <TextField type='text' required fullWidth margin='normal' id='partners' label='Partners' value={partners} 
                onChange={this.textFieldValueChange} />


            <TextField type='number' required fullWidth margin='normal' id='capacity' label='Kapazität:' value={capacity} 
                onChange={this.textFieldValueChange} />


            <TextField type='text' required fullWidth margin='normal' id='preferredRoom' label='Besonderer Raum notwendig:' value={preferredRoom} 
                onChange={this.textFieldValueChange} />


            <TextField type='text' required fullWidth margin='normal' id='bDaysPreSchedule' label='Blocktage vor Beginn der Vorlesungszeit:' value={bDaysPreSchedule} 
                onChange={this.textFieldValueChange} />


            <TextField type='text' required fullWidth margin='normal' id='bDaysFinale' label='Blocktage in der Prüfungszeit (nur inter-/trans. Projekte!!!):' value={bDaysFinale} 
                onChange={this.textFieldValueChange} />


            <TextField type='text' required fullWidth margin='normal' id='bDaysSaturdays' label='Blocktage (Samstage) in der Vorlesungszeit:' value={bDaysSaturdays} 
                onChange={this.textFieldValueChange} />


            <TextField type='text' required fullWidth margin='normal' id='preferredBDays' label='Präferierte Tage:' value={preferredBDays} 
                onChange={this.textFieldValueChange} />


            <TextField type='text' required fullWidth margin='normal' id='additionalSupervisor' label='Betreuende(r) ProfessorInnen:' value={additionalLecturer} 
                onChange={this.textFieldValueChange} />


            <TextField type='text' required fullWidth margin='normal' id='weekly' label='Wöchentlich?' value={weekly} 
                onChange={this.textFieldValueChange} />


            <Typography>Raum- und Ressourcenplanung</Typography>

          
            {/*<Typography>Projektkategorie</Typography>
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
            <p>Ausgewählte Projektkategorie: {value} </p>*/}

            </form>

            <LoadingProgress show={addingInProgress} />
            <ContextErrorMessage error={addingError} contextErrorMsg={`Das Projekt konnte nicht erstellt werden`} onReload={this.addProject} />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>

            <Button disabled={projectNameValidationFailed | projectDescriptionValidationFailed } variant='contained' onClick={this.addProject} color='primary'>
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
