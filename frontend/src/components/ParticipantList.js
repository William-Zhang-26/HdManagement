import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Typography, Grid, ButtonGroup } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import  ProjectAPI  from '../api/ProjectAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ParticipantDeleteDialog from './dialogs/ParticipantDeleteDialog';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import ValidationForm from './dialogs/ValidationForm';




/**  
 * Hier wird ein einzelner Student in der Teilnehmerliste eines Projekts angezeigt, um diesen gegebenenfalls Bewerten/ Entfernen zu können
 */

class ParticipantList extends Component {

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
    ProjectAPI.getAPI().getValidationbyId(this.state.participation.getValidationID())
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

  /** Handlerfunktion die aufgerufen wird, wenn der "Teilnehmer entfernen" Knopf gedrückt wird */
  deleteParticipationButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showParticipationDeleteDialog: true
    });
  }

  /** Handlerfunktion die aufgerufen wird, wenn das "Teilnehmer entfernen" Fenster geschlossen werden soll */
  deleteParticipationDialogClosed = (participation) => {
    if (participation) {
      this.props.onParticipationDeleted(participation);
    };

    // Das Dialog-Fenster nicht anzeigen
    this.setState({
      showParticipationDeleteDialog: false
    });
  }


  /** Handlerfunktion die aufgerufen wird, wenn der "Teilnehmer bewerten" Knopf gedrückt wird */
  validateParticipantButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    this.setState({
      showValidationForm: true
    });
  }

  /** Handlerfunktion die aufgerufen wird, wenn das "Teilnehmer bewerten" Fenster geschlossen werden soll */
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

    return (
      <div className={classes.root}>
        { student && participation && validation ?
        
        <Grid className = {classes.root} container spacing={1} justify='flex-start'>

            <Grid item>
                <Typography className = {classes.font} > {student.getName()} </Typography>
            </Grid>
            <Grid item>
              { project.getStateID() === 4 ?
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

/** Komponentenspezifisches Styling */
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
    color: indigo[500],
  },
  box: {
    width: '100%',
    color: indigo[500],
    borderColor: indigo[500],
    
  }
});

/** PropTypes */
ParticipantList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,

  show: PropTypes.bool.isRequired,

  student: PropTypes.object.isRequired,
  onParticipationDeleted: PropTypes.func.isRequired
}

export default withRouter(withStyles(styles)(ParticipantList));