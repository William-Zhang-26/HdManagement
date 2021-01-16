import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, List, ListItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import CustomerForm from './dialogs/CustomerForm';
import StudentProjectSignIn from './dialogs/StudentProjectSignIn';
import StudentProjectSignOut from './dialogs/StudentProjectSignOut';
import AddIcon from '@material-ui/icons/Add';

/** Fehlende Inhalte:
 *  
 * - Aus ProjectTypeBO: Name (Fachspezifisch, Inter-, Transdisziplinär), ECTS und SWS
 * - Aus ModuleBO: EDV-Nummer
 * 
 */

//Condition für alle ergänzen
//Admin Funktionen ergänzen


class StudentProjectListEntry extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        project: props.project,
        state: props.state,
        showStudentProjectSignOut: false,
        showStudentProjectSignIn: false,

        //Admin Attribute für Funktionen
      };
    }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.project);
  }



  StudentProjectSignInClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showStudentProjectSignIn : true
    });
  }

  StudentProjectSignInClosed = (project) => {
    if (project) {
      this.props.onStudentProjectSignIn(project);
    };

    // Don´t show the dialog
    this.setState({
      showStudentProjectSignIn: false
    });
  }


  
  StudentProjectSignOutClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showStudentProjectSignOut : true
    });
  }

  StudentProjectSignOutClosed = (project) => {
    if (project) {
      this.props.onStudentProjectSignOut(project);
    };

    // Don´t show the dialog
    this.setState({
      showStudentProjectSignOut: false
    });
  }



  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    const { project, state, showStudentProjectSignIn, showStudentProjectSignOut } = this.state;

    // console.log(this.state);
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
            <ListItem>Betreuuende Dozenten: {project.getAdditionalSupervisor()} </ListItem>  
            <ListItem>Externe Partner: {project.getPartners()} </ListItem>
            <ListItem>Wöchentlicher Kurs: {project.getWeekly()} </ListItem>
            <ListItem>Anzahl der Blocktage vor der Vorlesungszeit: {project.getBDaysPreSchedule()} </ListItem>
            <ListItem>Anzahl der Blocktage in der Prüfungszeit: {project.getBDaysFinale()} </ListItem>            
            <ListItem>Anzahl der Blocktage in der Vorlesungszeit (Samstage): {project.getBDaysSaturdays()} </ListItem>
            <ListItem>Raum: {project.getPreferredRoom()} </ListItem> 
            <ListItem>StateID: {project.getStateID()} </ListItem> 
            <ListItem>
              <Button  color='secondary' startIcon={<AddIcon />} onClick={this.StudentProjectSignInClicked}>
                Anmelden
              </Button>
              <Button  color='primary' startIcon={<AddIcon />} onClick={this.StudentProjectSignOutClicked}>
                Abmelden
              </Button>
            </ListItem>  
          </List>
          </AccordionDetails>
        </Accordion>
        <StudentProjectSignIn show={showStudentProjectSignIn} project={project} onClose={this.StudentProjectSignInClosed} /> 
        <StudentProjectSignOut show={showStudentProjectSignOut} project={project} onClose={this.StudentProjectSignOutClosed} /> 
        {/**<CustomerDeleteDialog show={showCustomerDeleteDialog} customer={customer} onClose={this.deleteCustomerDialogClosed} />   Admin Funktionen*/} 
        </Grid>
      : null }
      </div>
    );
  }
}



/** Component specific styles */
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


