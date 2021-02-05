import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, List, ListItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProjectApprovalForm from './dialogs/ProjectApprovalForm';
import ProjectRejectionForm from './dialogs/ProjectRejectionForm';
import AddIcon from '@material-ui/icons/Add';
import { ButtonGroup } from '@material-ui/core';
import ProjectDeleteDialog from './dialogs/ProjectDeleteDialog';
import DeleteIcon from '@material-ui/icons/Delete';
import red from '@material-ui/core/colors/red';
import ProjectAPI from '../api/ProjectAPI';
import ReplayIcon from '@material-ui/icons/Replay';
import indigo from '@material-ui/core/colors/indigo';
import ProjectInEvaluationForm from './dialogs/ProjectInEvaluationForm';
import SendIcon from '@material-ui/icons/Send';

/** Fehlende Inhalte:
 *  
 * - Aus ProjectTypeBO: Name (Fachspezifisch, Inter-, Transdisziplinär), ECTS und SWS
 * - Aus ModuleBO: EDV-Nummer
 * 
 */

//Condition für alle ergänzen
//Admin Funktionen ergänzen


class AdminProjectListEntry extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        project: props.project,
        showProjectDeleteDialog: false,
        state: null,
        showApprovedForm: false,
        showRejectedForm: false,
        showProjectInEvaluation: false,
        disabled: true,
        
        //Admin Attribute für Funktionen
      };
    }

  /** Handler Funktion für das untergeordnete Aufklappprojekt */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.project);
  }

 
// Projekt genehmigen
  ApproveProjectClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showApprovedForm : true
    });
  }

//Dialog-Fenster schließen
  ApprovedFormClosed = (project) => {
    if (project) {
      this.setState ({
        project: project,
        showApprovedForm: false,
        disabled: false,
      });
    } else {
      this.setState({
        showApprovedForm:false
      });
    }
    }



// Projekt ablehnen  
  /** Handles the onClick event of the reject project button */
  RejectProjectClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showRejectedForm : true
    });
  } 


  /** Handles the onClose event of the Reject Button */
  RejectFormClosed = (project) => {
    if (project) {
      this.setState ({
        project: project,
        showRejectedForm: false,
        disabled: false,
      });
    } else {
      this.setState({
        showRejectedForm: false
      });
    }
  }
  

  
  /** Handles the onClick event of the delete project button */
  deleteProjectButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProjectDeleteDialog: true
    });
  }

  /** Handles the onClose event of the ProjectDeleteDialog */
  deleteProjectDialogClosed = (project) => {
    if (project) {
      this.props.onProjectDeleted(project);
    };

    // Das Dialog-Fenster nicht anzeigen
    this.setState({
      showProjectDeleteDialog: false
    });
  }


    // Projekt in Bewertung senden
  // Handles the onClick event of the state change button 
  sendProjectInEvaluationClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProjectInEvaluation: true,
    });
  }


  /** Handles the onClose event of the ProjectInEvaluationForm */
  ProjectInEvaluationFormClosed = (project) => {
    if (project) {
      this.setState ({
        project: project,
        showProjectInEvaluation: false,
        disabled: false,
      });
    } else {
      this.setState({
        showProjectInEvaluation: false,
      });
    }
    }


  getStatebyID = () => {
    ProjectAPI.getAPI().getStatebyId(this.state.project.getStateID())   //Hier die ID des Studentens aufrufen --> this.state.studentId.getId()....vom StudentBO
    //ProjectAPI.getAPI().getStudentById()
        .then (projectBO => {
            this.setState({ state: projectBO });
        })
  }

  /** Lifecycle-Methode, die aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird */
  componentDidMount() {
    this.getStatebyID();
  }


  /** Rendern der Komponente */
  render() {
    const { classes, expandedState, disabled } = this.props;
    // Use the states project
    const { project, state, showProjectDeleteDialog, showApprovedForm, showRejectedForm, showProjectInEvaluation } = this.state;

 
    return (
      <div>
      { state ?

      <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`project${project.getID()}projectpanel-header`} //** Wozu wird hier die Project ID benötigt*/
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{project.getName()} {/** Angabe des Dozenten (UserBO?)*/}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                <Button className={classes.root} startIcon={<DeleteIcon />}
                onClick = {this.deleteProjectButtonClicked} />
                <Button className={classes.replay} startIcon={<ReplayIcon />} onClick = {this.getStatebyID}/>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>{state.getName()}</Typography> {/**Ergänzend steht hier die aktuelle Condition des Projektes */}
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <List>
            <ListItem>Kapazität: {project.getCapacity()} </ListItem>
            <ListItem>Projektbeschreibung: {project.getProjectDescription()} </ListItem>
            <ListItem>Betreuuende Dozenten: {project.getAdditionalLecturer()} </ListItem>  
            <ListItem>Externe Partner: {project.getPartners()} </ListItem>
            <ListItem>Wöchentlicher Kurs: {project.getWeekly()} </ListItem>
            <ListItem>Anzahl der Blocktage vor der Vorlesungszeit: {project.getBDaysPreSchedule()} </ListItem>
            <ListItem>Anzahl der Blocktage in der Prüfungszeit: {project.getBDaysFinale()} </ListItem>            
            <ListItem>Anzahl der Blocktage in der Vorlesungszeit (Samstage): {project.getBDaysSaturdays()} </ListItem>
            <ListItem>Raum: {project.getPreferredRoom()} </ListItem> 

            { this.state.disabled && project.getStateID() === 1 ? 

            <ListItem>
                <Button  color='primary' startIcon={<AddIcon />} onClick = {this.ApproveProjectClicked} >
                  Genehmigen
                </Button>
                <Button  color='secondary' startIcon={<AddIcon />} onClick = {this.RejectProjectClicked}>
                  Ablehnen
                </Button>
            </ListItem> 

            : null } 

            { this.state.disabled && project.getStateID() === 3 ? 

            <ListItem>
              <Button variant='outlined' color='primary' startIcon={<SendIcon />} onClick = {this.sendProjectInEvaluationClicked} >
                In Bewertung senden
              </Button>
            </ListItem> 

            : null } 

          </List>
          </AccordionDetails>
        </Accordion>
        : null }
        <ProjectDeleteDialog show={showProjectDeleteDialog} project={project} onClose={this.deleteProjectDialogClosed} />
        <ProjectApprovalForm show={showApprovedForm} project={project} onClose={this.ApprovedFormClosed} />
        <ProjectRejectionForm show={showRejectedForm} project={project} onClose={this.RejectFormClosed} /> 
        <ProjectInEvaluationForm show={showProjectInEvaluation} project={project} onClose={this.ProjectInEvaluationFormClosed} />
        
      </div>
    );
  }
}


/** Komponentenspezifisches Styeling */
const styles = theme => ({
    root: {
      width: '100%',
      color: red[500],
    },
    replay: {
      //width: '100%',
      color: indigo[500],
    },
  });
  
  /** PropTypes */
AdminProjectListEntry.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    expandedState: PropTypes.bool.isRequired,
    onExpandedStateChange: PropTypes.func.isRequired,
    onProjectDeleted: PropTypes.func.isRequired
    }
  
export default withStyles(styles)(AdminProjectListEntry);


