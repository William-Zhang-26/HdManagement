import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ListItem, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import ProjectAPI  from '../api/ProjectAPI';
import AllParticipantList from './AllParticipantList';
import indigo from '@material-ui/core/colors/indigo';
import firebase from 'firebase/app';
import 'firebase/auth';
import ProjectEvaluatedForm from './dialogs/ProjectEvaluatedForm';
import ParticipationForm from './dialogs/ParticipationForm';
import SendIcon from '@material-ui/icons/Send';

/**  
 * Die Liste aller Projekte aus Admin Sicht. Hier werden in den Projekten deren Teilnehmer entsprechend des Projektstatus eingefügt
 */


class AllProjectListEntryParticipants extends Component {

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


  /** Handlerfunktion für Veränderungen des Aufklapp-Panels */
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
    ProjectAPI.getAPI().getUserByGoogleId(firebase.auth().currentUser.uid)   
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


    /** Handlerfunktion die aufgerufen wird, wenn Bewertung abschließen geklickt wurde */
    evaluatedProjectButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showEvaluatedProject: true
    });
  }

    /** Handlerfunktion die aufgerufen wird, wenn das "Bewertung abschließen" Fenster geschlossen werden soll */
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


    /** Handlerfunktion die aufgerufen wird, wenn Teilnehmer hinzufügen geklickt wurde */
    addParticipantButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showParticipationForm: true
    });
  }

    /** Handlerfunktion die aufgerufen wird, wenn das "Teilnehmer hinzufügen" Fenster geschlossen werden soll */
    participationFormClosed = participation => {
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
  }



  /** Rendern der Komponente */
  render() {
    const { classes, expandedState } = this.props;
    const { project, participations, user, showEvaluatedProject, showParticipationForm } = this.state;

    return (

      <div>
      { participations && user && project.getStateID() === 1 ?
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
      { project.getStateID() <= 4 && this.state.disabled?
            <Grid item>
              <ButtonGroup variant='text' size='small'>
                <Button color='secondary' startIcon={<AddIcon />} onClick={this.addParticipantButtonClicked}>
                  Teilnehmer
                </Button>
              </ButtonGroup>
            </Grid>
            : null}
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
      <ParticipationForm show={showParticipationForm} project={project} onClose={this.participationFormClosed} />
      </div>
    );
  }
}

/** Komponentenspezifisches Styling */
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
    },
    replay: {
      color: indigo[500],
    },
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