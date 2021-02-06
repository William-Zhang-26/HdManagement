import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, List, ListItem, Button, Typography, Grid, Box, ButtonGroup } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import  ProjectAPI  from '../api/ProjectAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ParticipantDeleteDialog from './dialogs/ParticipantDeleteDialog';
import StudentReportListEntry from './StudentReportListEntry';
import ParticipationBO from '../api/ParticipationBO';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import ValidationForm from './dialogs/ValidationForm';
import ReplayIcon from '@material-ui/icons/Replay';




/**  
 * Hier wird die Liste aus Studentensicht angezeigt. Studenten sehen alle genehmigten Projekte
 * und können sich dafür An- und Abmelden.
 */

class AllParticipantList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
        project: props.project,
        participation: props.participation,
        student: null,
        showParticipationDeleteDialog: false,
        showValidationForm: false,
        error: null,
        loadingInProgress: false,

    };
  }


  getParticipant = () => {
    ProjectAPI.getAPI().getStudentbyId(this.state.participation.getStudentID())
        .then (StudentBO => {
            this.setState({ student: StudentBO });
        })
      }


  getValidationbyId = () => {
    ProjectAPI.getAPI().getValidationbyId(this.state.participation.getValidationID())   //Hier die ID des Studentens aufrufen --> this.state.studentId.getId()....vom StudentBO
        .then(validationBO => 
          this.setState({ validation: validationBO }))
        .catch(e =>
          this.setState({ 
            error: e
        })
        )}

  /** Lifecycle-Methode, die aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird */
  componentDidMount() {
    this.getParticipant();
    this.getValidationbyId();
  }

  /** Handles the onClick event of the delete project button */
  deleteParticipationButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showParticipationDeleteDialog: true
    });
  }

  /** Handles the onClose event of the ProjectDeleteDialog */
  deleteParticipationDialogClosed = (participation) => {
    // if project is not null, delete it
    if (participation) {
      this.props.onParticipationDeleted(participation);
    };

    // Der Dialog soll nicht angezeigt werden
    this.setState({
      showParticipationDeleteDialog: false
    });
  }


  /** Handles the onClick event of the validate button */
  validateParticipantButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    this.setState({
      showValidationForm: true
    });
  }

  /** Handles the onClose event of the ValidationForm */
  validationFormClosed = (participation) => {
    // validation is not null and therefor changed
    if (participation) {
      return(this.setState({
        participation: participation,
        showValidationForm: false,
      }),
      this.getValidationbyId())
    } else {
      this.setState({
        showValidationForm: false
      });
    }
  }


  /** Rendern der Komponente */
  render() {
    const { classes } = this.props;
    const { loadingInProgress, student, participation, error, showParticipationDeleteDialog, validation, showValidationForm, project } = this.state;
    console.log(this.state);

    return (
      <div className={classes.root}>
        { student && participation && validation ?
        
        <Grid className = {classes.root} container spacing={1} justify='flex-start'>

            <Grid item>
                <Typography className = {classes.font} > {student.getName()} </Typography>
            </Grid>
            <Grid item>
              { project.getStateID() >= 4 ?
              <ButtonGroup variant='text' size='small'>
                <Button size='small' className={classes.validate} onClick = {this.validateParticipantButtonClicked}>
                  Bewerten
                </Button>
                <Button size='small' className={classes.delete} onClick = {this.deleteParticipationButtonClicked}>
                  Entfernen
                </Button>
              </ButtonGroup>
              : null }
                
              <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`The list of participations could not be loaded.`} onReload={this.getParticipant} />
            </Grid>
            <Grid item = {3} />
            <Grid>
                <Button display="flex" justifyContent="flex-end" className = {classes.box} size='small' variant="outlined"  >
                {validation.getGrade()}
                </Button>  
            </Grid>
            
        </Grid>

        : null}

      <ValidationForm show={showValidationForm} participation={participation} onClose={this.validationFormClosed} />
      <ParticipantDeleteDialog show={showParticipationDeleteDialog} participation={participation} onClose={this.deleteParticipationDialogClosed} />
      
      </div>
    );
  }
}

/** Komponentenspezifisches Styeling */
const styles = theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  font: {
    fontSize: 15,
  },
  validate: {
    width: '100%',
    color: indigo[300],
    fontSize: 10,
  },
  delete: {
    width: '100%',
    color: red[500],
    fontSize: 10,
  },
  replay: {
    //width: '100%',
    color: indigo[500],
  },
  box: {
    width: '100%',
    color: indigo[500],
    borderColor: indigo[500],
    
  }
});

/** PropTypes */
AllParticipantList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,

  show: PropTypes.bool.isRequired,

  student: PropTypes.object.isRequired,
  onParticipationDeleted: PropTypes.func.isRequired
}

export default withRouter(withStyles(styles)(AllParticipantList));