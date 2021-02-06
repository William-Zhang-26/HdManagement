import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Button } from '@material-ui/core';
import { List, ListItem, ButtonGroup, Box } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProjectAPI  from '../api/ProjectAPI';
import firebase from 'firebase/app';
import 'firebase/auth';
import ProjectInEvaluationForm from './dialogs/ProjectInEvaluationForm';
import SendIcon from '@material-ui/icons/Send';
import indigo from '@material-ui/core/colors/indigo';


/**  
 * Hier wird ein Projekt des angemeldeten Dozenten mit den zugehörigen Projektinhalten angezeigt.
 */


class LecturerProjectListEntry extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        project: props.project,
        showProjectForm: false,
        showProjectInEvaluation: false,
        disabled: true,
        error: null,
        assignment: null,
      };
    }

  /** Handlerfunktion für Veränderungen des Aufklapp-Panels */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.project);
  }


  // Projekt in Bewertung senden
  /**Handlerfunktion die aufgerufen wird, wenn der "In Bewertung senden" Knopf gedrückt wurde*/
  sendProjectInEvaluationClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProjectInEvaluation: true,
    });
  }


  /** Handlerfunktion die aufgerufen wird, wenn das "Projekt in Bewertung senden" Fenster geschlossen werden soll */
  ProjectInEvaluationFormClosed = (project) => {
    if (project) {
      return (this.setState ({
        project: project,
        showProjectInEvaluation: false,
        disabled: false,
      }), this.getStatebyID())
    } else {
      this.setState({
        showProjectInEvaluation: false,
      });
    }
    }


  getAssignmentForProject = () => {
    ProjectAPI.getAPI().getAssignmentbyId(this.props.project.getAssignmentID())
        .then (assignmentBO => {
            this.setState({ assignment: assignmentBO });
        }).catch(e =>
          this.setState({ 
            error: e
        })
        )
    }
  
  


  getLecturer = () => {
    ProjectAPI.getAPI().getUserByGoogleId(firebase.auth().currentUser.uid)   
        .then (UserBO => {
            this.setState({ user: UserBO });
        })

}

  getStatebyID = () => {
    ProjectAPI.getAPI().getStatebyId(this.state.project.getStateID())   
        .then (projectBO => {
            this.setState({ state: projectBO });
        }).catch(e =>
          this.setState({ 
            error: e
        })
        )
  }


  /** Lifecycle-Methode, die aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird */
  componentDidMount() {
    this.getStatebyID();
    this.getLecturer();
    this.getAssignmentForProject();
  }


  /** Rendern der Komponente */
  render() {
    const { classes, expandedState } = this.props;
    const { project, state, user, showProjectInEvaluation, assignment } = this.state;

    return (
      <div>
        { assignment && state && user && project.getUserID()=== user.getID()? 
      
      <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`project${project.getID()}projectpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{project.getName()}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>{state.getName()}</Typography> 
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <List>
            <ListItem>Projektbeschreibung: {project.getProjectDescription()} </ListItem>
            <ListItem>Projektart: {assignment.getName()} </ListItem>
            <ListItem>Betreuende Dozenten: {project.getAdditionalLecturer()} </ListItem>  
            <ListItem>Externe Partner: {project.getPartners()} </ListItem>
            <ListItem>Kapazität: {project.getCapacity()} </ListItem>
            <Box p={1}></Box>
            <ListItem className ={classes.font}>Raum- und Ressourenplanung</ListItem>
            <ListItem>Wöchentlicher Kurs: {project.getWeekly() === 1 ? 'Ja' : 'Nein'} </ListItem>
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



/** Komponentenspezifisches Styling */
const styles = theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: 20,
      color: indigo[600],
      fontFamily: '"Segoe UI"',
    },
  });
  
  /** PropTypes */
LecturerProjectListEntry.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    expandedState: PropTypes.bool.isRequired,
    onExpandedStateChange: PropTypes.func.isRequired
    }
  
export default withStyles(styles)(LecturerProjectListEntry);


