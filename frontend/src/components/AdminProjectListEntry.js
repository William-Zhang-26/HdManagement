import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, List, ListItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import CustomerForm from './dialogs/CustomerForm';
//import ApproveValidationForm from './dialogs/ApproveValidationForm';
//import RejectValidationForm from './dialogs/RejectValidationForm';
import AddIcon from '@material-ui/icons/Add';

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
        //showApproveValidationForm: false,
        //showRejectValidationForm: false,
        
        //Admin Attribute für Funktionen
      };
    }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.project);
  }

 
// Projekt genehmigen
  /** Handles the onClick event of the delete customer button 
  ApproveProjectClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showApproveValidationForm : true
    });
  } */

  /** Handles the onClose event of the CustomerDeleteDialog 
  ApproveValidationFormClosed = (project) => {
    // if customer is not null, delete it
    if (project) {
      this.props.onApproveProject(project);
    };

    // Don´t show the dialog
    this.setState({
      showApproveValidationForm: false
    });
  } */


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



  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states customer
    const { project } = this.state;

    // console.log(this.state);
    return (
      <div>
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
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>State</Typography> {/**Ergänzend steht hier die aktuelle Condition des Projektes */}
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
            <ListItem>
                <Button  color='success' startIcon={<AddIcon />}>
                  Genehmigen
                </Button>
                <Button  color='error' startIcon={<AddIcon />}>
                  Ablehnen
                </Button>
            </ListItem>  
          </List>
          </AccordionDetails>
        </Accordion>
        {/**<ApproveValidationForm show={showApproveValidationForm} project={project} onClose={this.ApproveValidationFormClosed} />
        <RejectValidationForm show={showRejectValidationForm} project={project} onClose={this.RejectValidationFormClosed} /> 
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
    }
  });
  
  /** PropTypes */
AdminProjectListEntry.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** The CustomerBO to be rendered */
    project: PropTypes.object.isRequired,
    /** The state of this CustomerListEntry. If true the customer is shown with its accounts */
    expandedState: PropTypes.bool.isRequired,
    /** The handler responsible for handle expanded state changes (exanding/collapsing) of this CustomerListEntry 
     * 
     * Signature: onExpandedStateChange(CustomerBO customer)
     */
    onExpandedStateChange: PropTypes.func.isRequired
    }
  
export default withStyles(styles)(AdminProjectListEntry);


