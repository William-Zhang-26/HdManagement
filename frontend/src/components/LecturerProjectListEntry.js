import ProjectDeleteDialog from './dialogs/ProjectDeleteDialog';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Button } from '@material-ui/core';
import { List, ListItem, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProjectAPI  from '../api/ProjectAPI';
import ProjectForm from './dialogs/ProjectForm';
import firebase from 'firebase/app';
import 'firebase/auth';
import ProjectInEvaluationForm from './dialogs/ProjectInEvaluationForm';
import ReplayIcon from '@material-ui/icons/Replay';
import indigo from '@material-ui/core/colors/indigo';
import SendIcon from '@material-ui/icons/Send';


/** Fehlende Inhalte:
 *  
 * - Aus ProjectTypeBO: Name (Fachspezifisch, Inter-, Transdisziplinär), ECTS und SWS
 * - Aus ModuleBO: EDV-Nummer
 * 
 */

//Condition für alle ergänzen



class LecturerProjectListEntry extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        project: props.project,
        //state: null,
        showProjectForm: false,
        showProjectInEvaluation: false,
        disabled: true,
        error: null,
      };
    }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.project);
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
    //if customer is not null, delete it
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



  getLecturer = () => {
    ProjectAPI.getAPI().getUserByGoogleId(firebase.auth().currentUser.uid)   //Hier die ID des Studentens aufrufen --> this.state.studentId.getId()....vom StudentBO
    //ProjectAPI.getAPI().getStudentById()
        .then (UserBO => {
            this.setState({ user: UserBO });
        })

}

  getStatebyID = () => {
    ProjectAPI.getAPI().getStatebyId(this.state.project.getStateID())   //Hier die ID des Studentens aufrufen --> this.state.studentId.getId()....vom StudentBO
    //ProjectAPI.getAPI().getStudentById()
        .then (projectBO => {
            this.setState({ state: projectBO });
        }).catch(e =>
          this.setState({ 
            error: e
        })
        )
  }


  
  componentDidMount() {
    this.getStatebyID();
    this.getLecturer();
  }

  /** Handles the onClose event of the ProjectForm 
  projectFormClosed = (project) => {
    // customer is not null and therefor changed
    if (project) {
      this.setState({
        project: project,
        showProjectForm: false
      });
    }
  }*/

  /** Handles the onClose event of the ProjectDeleteDialog 
  projectFormClosed = (project) => {
    // if project is not null, delete it
    if (project) {
      this.props.onProjectAdded(project);
    };

    // Don´t show the dialog
    this.setState({
      showProjectForm: false
    });
  }
*/ 


  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states project
    const { project, state, showProjectForm, user, showProjectInEvaluation } = this.state;

    console.log(this.state);
    return (
      <div>
        { user && project.getUserID()=== user.getID()? 
      
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


        
      :null }
      <ProjectInEvaluationForm show={showProjectInEvaluation} project={project} onClose={this.ProjectInEvaluationFormClosed} />
      </div>
    );
  }
}



/** Component specific styles */
const styles = theme => ({
    root: {
      width: '100%',
    },
    replay: {
      //width: '100%',
      color: indigo[500],
    },
  });
  
  /** PropTypes */
LecturerProjectListEntry.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    //state: PropTypes.object.isRequired,
    expandedState: PropTypes.bool.isRequired,
    onExpandedStateChange: PropTypes.func.isRequired
    }
  
export default withStyles(styles)(LecturerProjectListEntry);


