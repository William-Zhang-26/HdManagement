import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, List, ListItem, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProjectAPI  from '../api/ProjectAPI';
import ParticipantList from './ParticipantList';
import indigo from '@material-ui/core/colors/indigo';
import firebase from 'firebase/app';
import 'firebase/auth';
import ProjectEvaluatedForm from './dialogs/ProjectEvaluatedForm';
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import ParticipationForm from './dialogs/ParticipationForm';

/** Fehlende Inhalte:
 * 
 */

class ProjectListEntryParticipants extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        project: props.project,
        participations: [],
        showEvaluatedProject: false,
        disabled: true,
        showParticipationForm: false,
      };
    }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.project);
  }


  getParticipations = () => {
    ProjectAPI.getAPI().getParticipationForProject(this.state.project.getID())
        .then (participationBOs => {
            this.setState({ participations: participationBOs });
        })
      }

  getLecturer = () => {
    ProjectAPI.getAPI().getUserByGoogleId(firebase.auth().currentUser.uid)   //Hier die ID des Studentens aufrufen --> this.state.studentId.getId()....vom StudentBO
    //ProjectAPI.getAPI().getStudentById()
        .then (UserBO => {
            this.setState({ user: UserBO });
        })

    }
  
  /** Lifecycle-Methode, die aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird */
  componentDidMount() {
    this.getParticipations();
    this.getLecturer();
  }


  participationDeleted = participant => {
    const newParticipationList = this.state.participations.filter(participationFromState => participationFromState.getID() !== participant.getID());
    this.setState({
      participations: newParticipationList,
    });
  }


    /** Handles the onClick event of the safe evaluation button */
    evaluatedProjectButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    this.setState({
      showEvaluatedProject: true
    });
  }

  /** Handles the onClose event of the ProjectEvaluationForm */
  evaluatedProjectFormClosed = (participation) => {
    if (participation) {
      this.setState({
        participation: participation,
        showEvaluatedProject: false,
        disabled: false,
      });
    } else {
      this.setState({
        showEvaluatedProject: false
      });
    }
  }


  /** Handles the onClick event of the add project button */
  addParticipantButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the ProjectForm
    this.setState({
      showParticipationForm: true
    });
    console.log(this.state); 
  }

  /** Handles the onClose event of the ProjectForm*/
  participationFormClosed = participation => {
    // project is not null and therefore created
    if (participation) {
      return(this.setState({
        participations: [...this.state.participations, participation],
        showParticipationForm: false
      }), this.getParticipations())
    } else {
      this.setState({
        showParticipationForm: false
      });
    }
    console.log(this.state); 
  }



  /** Rendern der Komponente */
  render() {
    const { classes, expandedState } = this.props;
    const { project, participations, user, showEvaluatedProject, showParticipationForm } = this.state;

    console.log(this.state);
    return (

      <div>
      { participations && user && project.getUserID() === user.getID() && project.getStateID() === 1 ?
      <Grid>
      <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
                <Typography variant='body1' className={classes.font}>{project.getName()}
                </Typography>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
              <Grid item xs = {10}>
              <ListItem className={classes.heading}>Sie müssen auf eine Rückmeldung vom Admin warten.</ListItem>
              </Grid>
          </AccordionDetails>
        </Accordion>
        </Grid>

      : participations && user && project.getUserID() === user.getID() && project.getStateID() >= 3 ?
      <Grid>
      <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`project${project.getID()}projectpanel-header`} //** Wozu wird hier die Project ID benötigt*/
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.font}>{project.getName()} {/** Angabe des Dozenten (UserBO?)*/}
                </Typography>
              </Grid>
            </Grid>
            { project.getStateID() <= 4 ?
            <Grid item>
              <ButtonGroup variant='text' size='small'>
                <Button color='secondary' startIcon={<AddIcon />} onClick={this.addParticipantButtonClicked}>
                  Teilnehmer
                </Button>
              </ButtonGroup>
            </Grid>
            : null }

          </AccordionSummary>
          <AccordionDetails>
              <Grid item xs = {10}>
              
              <ListItem className={classes.heading}>Teilnehmer</ListItem>
              { 
                participations.map(participation => <ParticipantList key={participation.getID()} 
                project = {project}
                participation={participation} 
                show={this.props.show}  
                onExpandedStateChange={this.onExpandedStateChange}
                onParticipationDeleted={this.participationDeleted}/>)
              }

            {this.state.disabled && project.getStateID() === 4 ?
              <ListItem className={classes.button}>
                <Button variant='outlined' color='primary' startIcon={<SendIcon />} onClick = {this.evaluatedProjectButtonClicked} >
                  Bewertung abschließen
                </Button>
              </ListItem> 
            : null }

              </Grid>
          </AccordionDetails>
        </Accordion>
        </Grid>
      : null }
      <ProjectEvaluatedForm show={showEvaluatedProject} project={project} onClose={this.evaluatedProjectFormClosed} />
      <ParticipationForm show={showParticipationForm} project={project} onClose={this.participationFormClosed} />
      </div>
    );
  }
}

/** Komponentenspezifisches Styeling */
const styles = theme => ({
    root: {
      width: '100%',
    },
    font: {
      fontSize: 23,
      fontFamily: '"Segoe UI"',
      color: indigo[700],
    },
    heading: {
      fontSize: 17,
      color: indigo[500],
    },
    button: {
      marginTop: theme.spacing(3),
    }
  });
  
  /** PropTypes */
ProjectListEntryParticipants.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    expandedState: PropTypes.bool.isRequired,
    onExpandedStateChange: PropTypes.func.isRequired
    }
  
export default withStyles(styles)(ProjectListEntryParticipants);