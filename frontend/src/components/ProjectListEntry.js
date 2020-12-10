import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
//import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import CustomerForm from './dialogs/CustomerForm';
//import CustomerDeleteDialog from './dialogs/CustomerDeleteDialog';
//import AccountList from './AccountList';
import StudentProjectSignIn from './dialogs/StudentProjectSignIn';
import StudentProjectSignOut from './dialogs/StudentProjectSignOut';
import ProjectAttributeList from './ProjectAttributeList';

//Condition für alle ergänzen
//Admin Funktionen ergänzen



class ProjectListEntry extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        project: props.project,
        showStudentProjectSignOut: false,
        showStudentProjectSignIn: false,
        //Admin Attribute für Funktionen
      };
    }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.project);
  }


//StudentProjectSignIn/Out handler und Button
//Show/ Closed SignIn/Out Dialog


  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states customer
    const { project, showStudentProjectSignIn, showStudentProjectSignOut } = this.state;

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
                <Typography variant='body2' color={'textSecondary'}>Condition</Typography> {/**Ergänzend steht hier die aktuelle Condition des Projektes */}
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ProjectAttributeList show={expandedState} project={project} />
          </AccordionDetails>
        </Accordion>
        <StudentProjectSignIn show={showStudentProjectSignIn} project={project} onClose={this.StudentProjectSignInClosed} /> 
        <StudentProjectSignOut show={showStudentProjectSignOut} project={project} onClose={this.StudentProjectSignOutClosed} /> 
        {/**<CustomerDeleteDialog show={showCustomerDeleteDialog} customer={customer} onClose={this.deleteCustomerDialogClosed} />   Admin Funktionen*/} 
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
ProjectListEntry.propTypes = {
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
  
export default withStyles(styles)(ProjectListEntry);


