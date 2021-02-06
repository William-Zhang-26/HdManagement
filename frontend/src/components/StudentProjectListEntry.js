import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, List, ListItem, ButtonGroup, Box } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import ProjectAPI  from '../api/ProjectAPI';
import StudentButtons from './StudentButtons';
import StudentProjectSignIn from './dialogs/StudentProjectSignIn';
import indigo from '@material-ui/core/colors/indigo';
import firebase from 'firebase/app';
import 'firebase/auth';



class StudentProjectListEntry extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        project: props.project,
        participations: [],
        showStudentProjectSignin: false,
        student: null,
        studentParticipations: [],
        disabled: true,
        assignment: null,
        projecttype: null

      };
    }

    /** Handlerfunktion die aufgerufen wird, wenn Bewertung abschließen geklickt wurde */
    expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.project);
  }


  getAssignmentForProject = () => {
    ProjectAPI.getAPI().getAssignmentbyId(this.props.project.getAssignmentID())
        .then (assignmentBO => {
            this.setState({ assignment: assignmentBO });
        })
    }

  getProjecttypeForProject = () => {
    ProjectAPI.getAPI().getProjecttypebyId(this.props.project.getProjectTypeID())
          .then (ProjecttypeBO => {
              this.setState({ projecttype: ProjecttypeBO });
          })
      }
  

  getStudent = () => {
    ProjectAPI.getAPI().getStudentbyId(firebase.auth().currentUser.uid)  
        .then (studentBO => {
          return (this.setState({ student: studentBO }),
          this.getParticipationForStudent())
        })
  }

  /** Lifecycle-Methode, die aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird */
  componentDidMount() {
    this.getStudent();
    this.getParticipations();
    this.getAssignmentForProject();
    this.getProjecttypeForProject();
  }

  getParticipationForStudent = () => {
    ProjectAPI.getAPI().getParticipationForStudent(this.state.student.getID())
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
    return (this.setState({
      participations: newParticipationList,
      disabled: true,
    }), this.getStudent())
  }


  /** Handlerfunktion zum öffnen des Dialogfensters zur Anmeldung in einem Projekt  */
  addSignInClicked = event => {
    event.stopPropagation();
    this.setState({
      showStudentProjectSignin: true
    });
  }

  /** Handlerfunktion zum Schließen des Dialogfensters  */
  SignInClosed = participation => {
    if (participation) {
      return (this.setState({
        showStudentProjectSignin: false,
        disabled: false,
      }), this.getParticipations())
    } else {
      this.setState({
        showStudentProjectSignin: false
      });
    }
  }

  

  /** Rendern der Komponente */
  render() {
    const { classes, expandedState } = this.props;
    const { project, participations, showStudentProjectSignin, studentParticipations, assignment, projecttype } = this.state;
   
    const entries = studentParticipations.map(studentParticipation => studentParticipation.getProjectID())
 

    return (
      <div>
      { assignment && project && projecttype && project.getStateID() === 3 ?
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
            <ListItem>Projektbeschreibung: {project.getProjectDescription()} </ListItem>
            <ListItem>Projektkategorie: {projecttype.getName()} </ListItem>
            <ListItem>Projektart: {assignment.getName()} </ListItem>
            <ListItem>Betreuende Dozenten: {project.getAdditionalLecturer()} </ListItem>  
            <ListItem>Externe Partner: {project.getPartners()} </ListItem>
            <Box p={1}></Box>
            <ListItem className ={classes.font}>Raum- und Ressourenplanung</ListItem>
            <ListItem>Wöchentlicher Kurs: {project.getWeekly() === "1" ? 'Ja' : 'Nein'} </ListItem>
            <ListItem>Anzahl der Blocktage vor der Vorlesungszeit: {project.getBDaysPreSchedule()} </ListItem>
            <ListItem>Anzahl der Blocktage in der Prüfungszeit: {project.getBDaysFinale()} </ListItem>            
            <ListItem>Anzahl der Blocktage in der Vorlesungszeit (Samstage): {project.getBDaysSaturdays()} </ListItem>
            <ListItem>Raum: {project.getPreferredRoom()} </ListItem> 
            <ListItem>
            { 
                participations.map(participation => <StudentButtons key={participation.getID()} 
                participation={participation} 
                show={this.props.show}  
                onParticipationDeleted={this.participationDeleted}/>)
              }
              
            </ListItem> 
            <ListItem>
              { !entries.includes(project.getID()) && this.state.disabled ?
              <Grid item>
               <ButtonGroup variant='text' size='small'>
                <Button color='primary' startIcon={<AddIcon />} onClick={this.addSignInClicked}>
                  Anmelden
                </Button>
               </ButtonGroup>
              </Grid>
              
              : null }

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
    font: {
      fontSize: 16,
      color: indigo[400],
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


