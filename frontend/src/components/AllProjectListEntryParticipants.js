import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, List, ListItem, Box } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import ProjectAPI  from '../api/ProjectAPI';
import AllParticipantList from './AllParticipantList';
import indigo from '@material-ui/core/colors/indigo';
import firebase from 'firebase/app';
import 'firebase/auth';
import ProjectEvaluatedForm from './dialogs/ProjectEvaluatedForm';
import SendIcon from '@material-ui/icons/Send';

/** Fehlende Inhalte:
 * 
 */

//Condition für alle ergänzen
//Admin Funktionen ergänzen

class AllProjectListEntryParticipants extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        project: props.project,
        participations: [],
        showEvaluatedProject: false,
        disabled: true,
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



  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states customer
    const { project, participations, user, showEvaluatedProject } = this.state;

    console.log(this.state);
    return (

      <div>
      { participations && user && project.getStateID() === 1 ?
      <Grid>
      <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
                <Typography variant='body1' className={classes.font}>{project.getName()} {/** Angabe des Dozenten (UserBO?)*/}
                </Typography>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
              <Grid item xs = {10}>
              <ListItem className={classes.heading}>Es handelt sich hierbei um ein neues Projekt. Sie müssen das Projekt genehmigen oder ablehnen.</ListItem>
              </Grid>
          </AccordionDetails>
        </Accordion>
        </Grid>

      : participations && user && project.getStateID() >= 3 ?
      <Grid>
      <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`project${project.getID()}projectpanel-header`} 
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.font}>{project.getName()} {/** Angabe des Dozenten (UserBO?)*/}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
              <Grid item xs = {10}>
              
              <ListItem className={classes.heading}>Teilnehmer</ListItem>
              { 
                participations.map(participation => <AllParticipantList key={participation.getID()} 
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
      </div>
    );
  }
}

/** Component specific styles */
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
  AllProjectListEntryParticipants.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    expandedState: PropTypes.bool.isRequired,
    onExpandedStateChange: PropTypes.func.isRequired
    }
  
export default withStyles(styles)(AllProjectListEntryParticipants);