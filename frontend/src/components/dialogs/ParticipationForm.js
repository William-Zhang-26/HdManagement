import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import { MenuItem, FormControl, InputLabel, Select, Typography, Grid } from '@material-ui/core';
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
            project_id: pid,

      // Ladebalken und Error
            addingInProgress: false,
            addingError: null

        };
        
        this.baseState = this.state;
    }




/** Hinzufügen einer Teilnahme für ein Projekt */
addParticipation = () => {
    let newParticipation = new ParticipationBO( this.state.module_id, this.state.project_id, this.state.student_id, 1 ); 
   
    ProjectAPI.getAPI().addParticipation(newParticipation).then(participation => {
      // Backend-Aufruf erfolgreich
      // reinit the dialogs state for a new empty project
      this.setState(this.baseState);
      this.props.onClose(participation); // das übergeordnete Objekt mit der Teilnahme aus dem Backend aufrufen
    }).catch(e =>
      this.setState({
        addingInProgress: false,    // Ladeanzeige deaktivieren 
        addingError: e              // Fehlermeldung anzeigen
      })
    );

    // setzen des Status auf true
    this.setState({
        addingInProgress: true,       // Ladeanzeige anzeigen
        addingError: null             // Fehlermeldung deaktivieren
    }
    );
    console.log("erstelltes Projekt:")
    console.log(newParticipation)
  }

  /** Auszuführende Anweisung beim Schließen des Dialogs */
  handleClose = () => {
    // Zurücksetzen des Zustands
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


  handleChange = (event) => {
    this.setState({
        module_id: event.target.value
    });}



/** Rendern der Komponente */
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
    show && project ?
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
          
          { project.getAssignmentID() === 1 ?
          <Grid>
            <Typography>Modul</Typography>
              <FormControl className={classes.formControl}>
                  <InputLabel id="open-select-label">Bitte auswählen</InputLabel>
                  <Select
                    value={module_id}
                    onChange={this.handleChange}
                  > 
                    <MenuItem value={1}>338005</MenuItem>
                    <MenuItem value={2}>338006</MenuItem>
                    <MenuItem value={3}>338007</MenuItem>
                    <MenuItem value={4}>338008</MenuItem>
                    <MenuItem value={5}>338009</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            : project.getAssignmentID() === 2 ?
            <Grid>
            <Typography>Modul</Typography>
              <FormControl className={classes.formControl}>
                  <InputLabel id="open-select-label">Bitte auswählen</InputLabel>
                  <Select
                    value={module_id}
                    onChange={this.handleChange}
                  > 
                    <MenuItem value={6}>338010</MenuItem>
                    <MenuItem value={7}>338011</MenuItem>
                    <MenuItem value={8}>338012</MenuItem>
                    <MenuItem value={9}>338013</MenuItem>
                    <MenuItem value={10}>338014</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              : project.getAssignmentID() === 3 ?
              <Grid>
              <Typography>Modul</Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel id="open-select-label">Bitte auswählen</InputLabel>
                    <Select
                      value={module_id}
                      onChange={this.handleChange}
                    > 
                      <MenuItem value={11}>338015</MenuItem>
                      <MenuItem value={12}>338016</MenuItem>
                      <MenuItem value={13}>338017</MenuItem>
                      <MenuItem value={14}>338018</MenuItem>
                      <MenuItem value={15}>338019</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                : project.getAssignmentID() === 4 ?
                <Grid>
                <Typography>Modul</Typography>
                  <FormControl className={classes.formControl}>
                      <InputLabel id="open-select-label">Bitte auswählen</InputLabel>
                      <Select
                        value={module_id}
                        onChange={this.handleChange}
                      > 
                        <MenuItem value={16}>338020</MenuItem>
                        <MenuItem value={17}>338021</MenuItem>
                        <MenuItem value={18}>338022</MenuItem>
                        <MenuItem value={19}>338023</MenuItem>
                        <MenuItem value={20}>338024</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  : project.getAssignmentID() === 5 ?
                  <Grid>
                  <Typography>Modul</Typography>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="open-select-label">Bitte auswählen</InputLabel>
                        <Select
                          value={module_id}
                          onChange={this.handleChange}
                        > 
                          <MenuItem value={21}>338025</MenuItem>
                          <MenuItem value={22}>338026</MenuItem>
                          <MenuItem value={23}>338027</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    : project.getAssignmentID() === 6 ?
                    <Grid>
                    <Typography>Modul</Typography>
                      <FormControl className={classes.formControl}>
                          <InputLabel id="open-select-label">Bitte auswählen</InputLabel>
                          <Select
                            value={module_id}
                            onChange={this.handleChange}
                          > 
                            <MenuItem value={24}>338028</MenuItem>
                            <MenuItem value={25}>338029</MenuItem>
                            <MenuItem value={26}>338030</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      : project.getAssignmentID() === 7 ?
                      <Grid>
                      <Typography>Modul</Typography>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="open-select-label">Bitte auswählen</InputLabel>
                            <Select
                              value={module_id}
                              onChange={this.handleChange}
                            > 
                              <MenuItem value={27}>338031</MenuItem>
                              <MenuItem value={28}>338032</MenuItem>
                              <MenuItem value={29}>338033</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        : project.getAssignmentID() === 8 ?
                        <Grid>
                        <Typography>Modul</Typography>
                          <FormControl className={classes.formControl}>
                              <InputLabel id="open-select-label">Bitte auswählen</InputLabel>
                              <Select
                                value={module_id}
                                onChange={this.handleChange}
                              > 
                                <MenuItem value={30}>338034</MenuItem>
                                <MenuItem value={31}>338035</MenuItem>
                                <MenuItem value={32}>338036</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          : project.getAssignmentID() === 9 ?
                          <Grid>
                          <Typography>Modul</Typography>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="open-select-label">Bitte auswählen</InputLabel>
                                <Select
                                  value={module_id}
                                  onChange={this.handleChange}
                                > 
                                  <MenuItem value={33}>338037</MenuItem>
                                  <MenuItem value={34}>338038</MenuItem>
                                  <MenuItem value={35}>338039</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            : project.getAssignmentID() === 10 ?
                            <Grid>
                            <Typography>Modul</Typography>
                              <FormControl className={classes.formControl}>
                                  <InputLabel id="open-select-label">Bitte auswählen</InputLabel>
                                  <Select
                                    value={module_id}
                                    onChange={this.handleChange}
                                  > 
                                    <MenuItem value={36}>338040</MenuItem>
                                    <MenuItem value={37}>338041</MenuItem>
                                    <MenuItem value={38}>338042</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              : project.getAssignmentID() === 11 ?
                              <Grid>
                              <Typography>Modul</Typography>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="open-select-label">Bitte auswählen</InputLabel>
                                    <Select
                                      value={module_id}
                                      onChange={this.handleChange}
                                    > 
                                      <MenuItem value={39}>338043</MenuItem>
                                      <MenuItem value={40}>338044</MenuItem>
                                      <MenuItem value={41}>338045</MenuItem>
                                      <MenuItem value={42}>338046</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                                : null }


          <TextField autoFocus type='number' required fullWidth margin='normal' id='student_id' label='Studenten ID:' value={student_id} onChange={this.textFieldValueChange} />
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