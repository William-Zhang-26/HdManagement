import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, List, ListItem, Button, Typography, Grid, Paper, ButtonGroup } from '@material-ui/core';
//import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import  ProjectAPI  from '../api/ProjectAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ParticipantDeleteDialog from './dialogs/ParticipantDeleteDialog';
import StudentReportListEntry from './StudentReportListEntry';
import StudentBO from '../api/StudentBO';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import ValidationForm from './dialogs/ValidationForm';


/**  
 * Hier wird die Liste aus Studentensicht angezeigt. Studenten sehen alle genehmigten Projekte
 * und können sich dafür An- und Abmelden.
 */

class ParticipantList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
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


  componentDidMount() {
    this.getParticipant();
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

    // Don´t show the dialog
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
  validationFormClosed = grade => {
    // customer is not null and therefore created
    if (grade) {
      const newValidation = [grade];
      this.setState({
        grade: newValidation,
        showValidationForm: false
      });
    } else {
      this.setState({
        showValidationForm: false
      });
    }
  }



  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { loadingInProgress, student, participation, error, showParticipationDeleteDialog } = this.state;
    console.log(this.state);

    return (
      <div className={classes.root}>
        { student && participation ?
        
        <Grid className = {classes.root} container spacing={1} justify='flex-start' alignItems='center'>
          

            <Grid item>
                <Typography className = {classes.font} >{student.getFirstName()} {student.getName()} 
                </Typography>
            </Grid>
            <Grid item>
              <ButtonGroup variant='text' size='small'>
                <Button size='small' className={classes.validate} onClick = {this.validateParticipantButtonClicked}>
                  Bewerten
                </Button>
                <Button size='small' className={classes.delete} onClick = {this.deleteParticipationButtonClicked}>
                  Entfernen
                </Button>
              </ButtonGroup>
              <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`The list of participations could not be loaded.`} onReload={this.getParticipant} />
            </Grid>

        </Grid>




        : null}
      <ParticipantDeleteDialog show={showParticipationDeleteDialog} participation={participation} onClose={this.deleteParticipationDialogClosed} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    //width: '90%',
    marginTop: theme.spacing(3),
    //marginRight: theme.spacing(10),
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