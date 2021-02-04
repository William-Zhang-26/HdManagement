//Wenn ein Projekt genehmigt wurde, kann der Dozent (bei genügend Anmeldungen) das Projekt in Bewertung senden.

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ListItemText } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProjectAPI from '../../api/ProjectAPI';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import ProjectBO from '../../api/ProjectBO';


class ProjectInEvaluationForm extends Component {

    constructor(props) {
      super(props);
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
        pd = props.project.getPreferredBDays();
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
        weekly:w,

        project: this.props.project,


        // Ladebalken und Error
        updatingInProgress: false,
        updatingError: null

      };
      this.baseState = this.state;
    }

/** Updates the Grade */
sendProjectInEvaluation= () => {
  // clone the original cutomer, in case the backend call fails
  let updatedState = Object.assign(new ProjectBO(), this.props.project);
  // set the new attributes from our dialog
  updatedState.setName(this.state.name);
  updatedState.setUserID(this.state.user_id);
  updatedState.setProjectTypeID(this.state.project_type_id);
  updatedState.setStateID(4);
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
      updatingInProgress: false,              // disable loading indicator  
      updatingError: null                     // no error message
    });
    // keep the new state as base state
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
    
    this.props.onClose(updatedState);      // call the parent with the new customer
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



  /** Handles the close / cancel button click event */
    handleClose = () => {
    // console.log(event);
    this.props.onClose(null);
  }


  /** Renders the component */
  render() {
    const { classes, project, show } = this.props;
    const { updatingError, updatingInProgress } = this.state;

    return ( 
       show ? 
        <Dialog open={show} onClose={this.handleClose}>
          <DialogTitle id='ProjectInEvaluation-Title'>Projekt in Bewertung senden
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Soll das folgende Projekt in Bewertung geschickt werden: '{project.getName()}' (ID: {project.getID()})?
            </DialogContentText>
            <LoadingProgress show={updatingInProgress} />
            <ContextErrorMessage error={updatingError} contextErrorMsg={`Das Projekt ${project.getID()} konnte nicht abgelehnt werden.`} onReload={this.sendProjectInEvaluation} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button variant='contained' onClick={this.sendProjectInEvaluation} color='primary'>
              Bestätigen
            </Button> 
          </DialogActions>
        </Dialog> 
        :null
    );
  }
}

/** Component specific styles */
const styles = theme => ({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    }
  });
  
  /** PropTypes */
  ProjectInEvaluationForm.propTypes = {
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }
  
  export default withStyles(styles)(ProjectInEvaluationForm);
