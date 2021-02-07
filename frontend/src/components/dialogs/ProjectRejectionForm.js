import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProjectAPI from '../../api/ProjectAPI';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import ProjectBO from '../../api/ProjectBO';

//Ablehnen eines Kurses aus Admin Sicht --> Ändern des Status zu "Abgelehnt"

class ProjectRejectionForm extends Component {

  constructor(props) {
    super(props);
    //Typzuweisung der Variablen
    let n = "";
    let u = 0;
    let p = 0;
    let s = 0;
    let sid = 0;
    let aid = 0;
    let pd = "";
    let ps = "";
    let c = 0;
    let pr = "";
    let b = "";
    let bf = "";
    let bs = "";
    let pb = "";
    let a = "";
    let w = "";

    if (props.project) {
      n = props.project.getName();
      u = props.project.getUserID();
      p = props.project.getProjectTypeID();
      s = props.project.getStateID();
      sid = props.project.getSemesterID();
      aid = props.project.getAssignmentID();
      pd = props.project.getProjectDescription();
      ps = props.project.getPartners();
      c = props.project.getCapacity();
      pr = props.project.getPreferredBDays ();
      b = props.project.getBDaysPreSchedule();
      bf = props.project.getBDaysFinale();
      bs = props.project.getBDaysSaturdays();
      pb = props.project.getPreferredBDays();
      a = props.project.getAdditionalLecturer();
      w = props.project.getWeekly();

    }
  

    // Init the state
    this.state = {
      name: n,
      user_id: u,
      project_type_id: p,
      state_id: s,
      semester_id: sid,
      assignment_id: aid,
      project_description: pd,
      partners: ps,
      capacity: c,
      preferred_room: pr,
      b_days_pre_schedule: b,
      b_days_finale: bf,
      b_days_saturdays: bs,
      preferred_b_days: pb,
      additional_lecturer: a,
      weekly: w,

      project: this.props.project,

      // Ladebalken und Error
      updatingInProgress: false,
      updatingError: null

    };
    //der State wird als Basiszustand gespeichert
    this.baseState = this.state;
  }

  /** Änderung des Zustands von einem Projekt auf abgelehnt */
  updateStateRejected= () => {
    // Duplizieren des ProjectBOs im Falle eines Fehlerhaften API-Calls
    let updatedState = Object.assign(new ProjectBO(), this.props.project);
    // setzen der neuen Attribute vom Dialog
    updatedState.setName(this.state.name);
    updatedState.setUserID(this.state.user_id);
    updatedState.setProjectTypeID(this.state.project_type_id);
    updatedState.setStateID(2);
    updatedState.setSemesterID(this.state.semester_id);
    updatedState.setAssignmentID(this.state.assignment_id);
    updatedState.setProjectDescription(this.state.project_description);
    updatedState.setPartners(this.state.partners);
    updatedState.setCapacity(this.state.capacity);
    updatedState.setPreferredBDays(this.state.preferred_b_days);
    updatedState.setBDaysPreSchedule(this.state.b_days_pre_schedule);
    updatedState.setBDaysFinale(this.state.b_days_finale);
    updatedState.setBDaysSaturdays(this.state.b_days_saturdays);
    updatedState.setPreferredBDays(this.state.preferred_b_days);
    updatedState.setAdditionalLecturer(this.state.additional_lecturer);
    updatedState.setWeekly(this.state.weekly);

    ProjectAPI.getAPI().updateProject(updatedState).then(project => {
      this.setState({
        updatingInProgress: false,                                                        // Ladeanzeige deaktivieren  
        updatingError: null                                                              // keine Fehlermeldung
      });
                                                                                        // den neuen Zustand als Basiszustand beibehalten
      this.baseState.name = this.state.name;
      this.baseState.user_id = this.state.user_id;
      this.baseState.project_type_id = this.state.project_type_id;
      this.baseState.state_id = this.state.state_id;
      this.baseState.semester_id = this.state.semester_id;
      this.baseState.assignment_id = this.state.assignment_id;
      this.baseState.project_description = this.state.project_description;
      this.baseState.partners = this.state.partners;
      this.baseState.capacity = this.state.capacity;
      this.baseState.preferred_b_days = this.state.preferred_b_days;
      this.baseState.b_days_pre_schedule = this.state.b_days_pre_schedule;
      this.baseState.b_days_finale = this.state.b_days_finale;
      this.baseState.b_days_saturdays = this.state.b_days_saturdays;
      this.baseState.preferred_b_days = this.state.preferred_b_days;
      this.baseState.additional_lecturer = this.state.additional_lecturer;
      this.baseState.weekly = this.state.weekly;
      
      this.props.onClose(updatedState);                                                   // Die übergeordnete Komponente mit dem State aufrufen
    }).catch(e =>
      this.setState({
        updatingInProgress: false,                                                       // Ladeanzeige deaktivieren 
        updatingError: e                                                                // Fehlermeldung anzeigen
      })
    );

    // Laden auf true setzen
    this.setState({
      updatingInProgress: true,                                                        // Ladeanzeige anzeigen
      updatingError: null                                                              //Fehlermeldung abschalten
    });
  } 


  /** Auszuführende Anweisung beim Schließen des Dialogs */
  handleClose = () => {
    this.props.onClose(null);
  }


  /** Rendern der Komponente */
  render() {
    const { classes, project, show } = this.props;
    const { updatingError, updatingInProgress } = this.state;

    return ( 
       show ? 
        <Dialog open={show} onClose={this.handleClose}>
          <DialogTitle id='ProjectRejection-Title'>Projekt ablehnen
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Soll das folgende Projekt abgelehnt werden: '{project.getName()}' (ID: {project.getID()})?
            </DialogContentText>
            <LoadingProgress show={updatingInProgress} />
            <ContextErrorMessage error={updatingError} contextErrorMsg={`Das Projekt ${project.getID()} konnte nicht abgelehnt werden.`} onReload={this.updateStateRejected} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button variant='contained' onClick={this.updateStateRejected} color='primary'>
              Ablehnen
            </Button> 
          </DialogActions>
        </Dialog> 
        :null
    );
  }
}

/** Komponentenspezifisches Styling */
const styles = theme => ({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    }
  });
  
  /** PropTypes */
  ProjectRejectionForm.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** Projekt welches für den Zustand geändert werden soll*/
    project: PropTypes.object.isRequired,

    /** Wenn true, wird der Dialog gerendert */
    show: PropTypes.bool.isRequired,

    /** Handler Funktion welche aufgerufen wird, wenn der Dialog geschlossen ist.*/
    onClose: PropTypes.func.isRequired,
  }
  
  export default withStyles(styles)(ProjectRejectionForm);
