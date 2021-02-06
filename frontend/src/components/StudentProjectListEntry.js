import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, List, ListItem, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import  ProjectAPI  from '../api/ProjectAPI';
import StudentButtons from './StudentButtons';
import StudentProjectSignIn from './dialogs/StudentProjectSignIn';
import firebase from 'firebase/app';
import 'firebase/auth';


/** Fehlende Inhalte:
 *  
 * - Aus ProjectTypeBO: Name (Fachspezifisch, Inter-, Transdisziplinär), ECTS und SWS
 * - Aus ModuleBO: EDV-Nummer
 * 
 */

class StudentProjectListEntry extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        project: props.project,
        participations: [],
        showStudentProjectSignin: false,
        currStudent: null,
        studentParticipations: [],

      };
    }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.project);
  }


  getStudent = () => {
    ProjectAPI.getAPI().getStudentbyId(firebase.auth().currentUser.uid)  
        .then (studentBO => {
          return (this.setState({ currStudent: studentBO }),
          this.getParticipationForStudent())
        })
  }

  /** Lifecycle-Methode, die aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird */
  componentDidMount() {
    this.getStudent();
    this.getParticipations();
  }

  getParticipationForStudent = () => {
    ProjectAPI.getAPI().getParticipationForStudent(this.state.currStudent.getID())
        .then (participationBO => {
            this.setState({ studentParticipations: participationBO });
        })
    }


  getParticipations = () => {
    ProjectAPI.getAPI().getParticipationForProject(this.state.project.getID())
        .then (participationBOs => {
            this.setState({ participations: participationBOs });
        })
    }


  participationDeleted = participant => {
    const newParticipationList = this.state.participations.filter(participationFromState => participationFromState.getID() !== participant.getID());
    this.setState({
      participations: newParticipationList,
    });
  }


  
  /** Handles the onClick event of the add project button */
  addSignInClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the ProjectForm
    this.setState({
      showStudentProjectSignin: true
    });
    console.log(this.state); 
  }

  /** Handles the onClose event of the ProjectForm*/
  SignInClosed = participation => {
    // project is not null and therefore created
    if (participation) {
      this.setState({
        showStudentProjectSignin: false
      });
    } else {
      this.setState({
        showStudentProjectSignin: false
      });
    }
    console.log(this.state); 
  }

  

  /** Rendern der Komponente */
  render() {
    const { classes, expandedState } = this.props;
    const { project, participations, showStudentProjectSignin, studentParticipations } = this.state;
    console.log('Entry:');
    console.log(this.state);

    const entries = studentParticipations.map(studentParticipation => studentParticipation.getProjectID())
    console.log(entries);

    return (
      <div>
      { project.getStateID() === 3 ?
      <Grid>
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
            <ListItem>StateID: {project.getStateID()} </ListItem> 
            <ListItem>
            { 
                participations.map(participation => <StudentButtons key={participation.getID()} 
                participation={participation} 
                show={this.props.show}  
                onParticipationDeleted={this.participationDeleted}/>)
              }
              
            </ListItem> 
            <ListItem>
              {entries.includes(project.getID())?

              null
              : <Grid item>
              <ButtonGroup variant='text' size='small'>
                <Button color='primary' startIcon={<AddIcon />} onClick={this.addSignInClicked}>
                  Anmelden
                </Button>
              </ButtonGroup>
            </Grid> }

            </ListItem> 
          </List>
          </AccordionDetails>
        </Accordion>
        </Grid>
      : null }
      <StudentProjectSignIn show={showStudentProjectSignin} project={project} onClose={this.SignInClosed} />
      </div>
    );
  }
}



/** Komponentenspezifisches Styeling */
const styles = theme => ({
    root: {
      width: '100%',
    }
  });
  
  /** PropTypes */
StudentProjectListEntry.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    expandedState: PropTypes.bool.isRequired,
    onExpandedStateChange: PropTypes.func.isRequired
    }
  
export default withStyles(styles)(StudentProjectListEntry);


