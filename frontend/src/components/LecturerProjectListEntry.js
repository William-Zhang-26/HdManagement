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


  /** Lifecycle-Methode, die aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird */
  componentDidMount() {
    this.getStatebyID();
    this.getLecturer();
  }


  /** Rendern der Komponente */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states project
    const { project, state, user, showProjectInEvaluation } = this.state;

    console.log(this.state);
    return (
      <div>
        { state && user && project.getUserID()=== user.getID()? 
      
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
            <ListItem>Projektbeschreibung: {project.getProjectDescription()} </ListItem>
            <ListItem>Betreuuende Dozenten: {project.getAdditionalLecturer()} </ListItem>  
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



/** Komponentenspezifisches Styeling */
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
    //state: PropTypes.object.isRequired,
    expandedState: PropTypes.bool.isRequired,
    onExpandedStateChange: PropTypes.func.isRequired
    }
  
export default withStyles(styles)(LecturerProjectListEntry);


