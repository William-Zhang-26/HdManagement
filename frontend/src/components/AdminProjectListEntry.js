import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, List, ListItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import CustomerForm from './dialogs/CustomerForm';
import ProjectApprovalForm from './dialogs/ProjectApprovalForm';
//import RejectValidationForm from './dialogs/RejectValidationForm';
import AddIcon from '@material-ui/icons/Add';
import { ButtonGroup } from '@material-ui/core';
import ProjectDeleteDialog from './dialogs/ProjectDeleteDialog';
import DeleteIcon from '@material-ui/icons/Delete';
import red from '@material-ui/core/colors/red';
import ProjectAPI from '../api/ProjectAPI';

/** Fehlende Inhalte:
 *  
 * - Aus ProjectTypeBO: Name (Fachspezifisch, Inter-, Transdisziplinär), ECTS und SWS
 * - Aus ModuleBO: EDV-Nummer
 * 
 */

//Condition für alle ergänzen
//Admin Funktionen ergänzen


class AdminProjectListEntry extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        project: props.project,
        showProjectDeleteDialog: false,
        state: null,
        showApprovedForm: false,
        //showRejectValidationForm: false,
        
        //Admin Attribute für Funktionen
      };
    }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.project);
  }

 
// Projekt genehmigen
   // Handles the onClick event of the delete customer button 
  ApproveProjectClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showApprovedForm : true
    });
  }


  /** Handles the onClose event of the CustomerDeleteDialog */
  ApprovedFormClosed = (project) => {
    //if customer is not null, delete it
    if (project) {
      this.setState ({
        project:project,
        showApprovedForm: false
      });
    } else {
      this.setState({
        showApprovedForm:false
      });
    }
    }


// Projekt ablehnen  
  /** Handles the onClick event of the delete customer button 
  RejectProjectClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showRejectValidationForm : true
    });
} */

  /** Handles the onClose event of the CustomerDeleteDialog 
  RejectValidationFormClosed = (project) => {
    // if customer is not null, delete it
    if (project) {
      this.props.onRejectProject(project);
    };

    // Don´t show the dialog
    this.setState({
      showRejectValidationForm: false
    });
  } */

  /** Handles the onClick event of the delete project button */
  deleteProjectButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProjectDeleteDialog: true
    });
  }

  /** Handles the onClose event of the ProjectDeleteDialog */
  deleteProjectDialogClosed = (project) => {
    // if project is not null, delete it
    if (project) {
      this.props.onProjectDeleted(project);
    };

    // Don´t show the dialog
    this.setState({
      showProjectDeleteDialog: false
    });
  }


  getStatebyID = () => {
    ProjectAPI.getAPI().getStatebyId(this.state.project.getStateID())   //Hier die ID des Studentens aufrufen --> this.state.studentId.getId()....vom StudentBO
    //ProjectAPI.getAPI().getStudentById()
        .then (projectBO => {
            this.setState({ state: projectBO });
        })
  }

  
  componentDidMount() {
    this.getStatebyID();
  }


  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states project
    const { project, state, showProjectDeleteDialog, showApprovedForm } = this.state;

    // console.log(this.state);
    return (
      <div>
      { state ?

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
                <ButtonGroup size='small'>
                <Button className={classes.root} startIcon={<DeleteIcon />}
                onClick = {this.deleteProjectButtonClicked}>
                  Löschen
                </Button>
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
            <ListItem>Kapazität: {project.getCapacity()} </ListItem>
            <ListItem>Projektbeschreibung: {project.getProjectDescription()} </ListItem>
            <ListItem>Betreuuende Dozenten: {project.getAdditionalLecturer()} </ListItem>  
            <ListItem>Externe Partner: {project.getPartners()} </ListItem>
            <ListItem>Wöchentlicher Kurs: {project.getWeekly()} </ListItem>
            <ListItem>Anzahl der Blocktage vor der Vorlesungszeit: {project.getBDaysPreSchedule()} </ListItem>
            <ListItem>Anzahl der Blocktage in der Prüfungszeit: {project.getBDaysFinale()} </ListItem>            
            <ListItem>Anzahl der Blocktage in der Vorlesungszeit (Samstage): {project.getBDaysSaturdays()} </ListItem>
            <ListItem>Raum: {project.getPreferredRoom()} </ListItem> 
            <ListItem>
                <Button  color='success' startIcon={<AddIcon  />}onClick = {this.ApproveProjectClicked}>
                  Genehmigen
                </Button>
                <Button  color='error' startIcon={<AddIcon />}>
                  Ablehnen
                </Button>
            </ListItem>  
          </List>
          </AccordionDetails>
        </Accordion>
        : null }
        <ProjectDeleteDialog show={showProjectDeleteDialog} project={project} onClose={this.deleteProjectDialogClosed} />
        <ProjectApprovalForm show={showApprovedForm} project={project} onClose={this.ApprovedFormClosed} />
        {/*<RejectValidationForm show={showRejectValidationForm} project={project} onClose={this.RejectValidationFormClosed} /> 
        <StudentProjectSignOut show={showRejectProject} project={project} onClose={this.StudentProjectSignOutClosed} /> 
        <CustomerDeleteDialog show={showCustomerDeleteDialog} customer={customer} onClose={this.deleteCustomerDialogClosed} />   Admin Funktionen*/}
      </div>
    );
  }
}



/** Component specific styles */
const styles = theme => ({
    root: {
      width: '100%',
      color: red[500],
      borderColor: red[500],
    }
  });
  
  /** PropTypes */
AdminProjectListEntry.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    expandedState: PropTypes.bool.isRequired,
    onExpandedStateChange: PropTypes.func.isRequired,
    onProjectDeleted: PropTypes.func.isRequired
    }
  
export default withStyles(styles)(AdminProjectListEntry);


