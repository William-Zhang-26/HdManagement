import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, List, ListItem, Box } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import CustomerForm from './dialogs/CustomerForm';
import AddIcon from '@material-ui/icons/Add';
import ProjectAPI  from '../api/ProjectAPI';
import ParticipantList from './ParticipantList';
import ParticipantDeleteDialog from './dialogs/ParticipantDeleteDialog';
import indigo from '@material-ui/core/colors/indigo';

/** Fehlende Inhalte:
 * 
 */

//Condition für alle ergänzen
//Admin Funktionen ergänzen

class ProjectListEntryParticipants extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        project: props.project,
        participations: [],
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
  
  componentDidMount() {
    this.getParticipations();
  }


  participationDeleted = participant => {
    const newParticipationList = this.state.participations.filter(participationFromState => participationFromState.getID() !== participant.getID());
    this.setState({
      participations: newParticipationList,
    });
  }



  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states customer
    const { project, participations } = this.state;

    console.log(this.state);
    return (

      <div>
      { participations ?
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
          </AccordionSummary>
          <AccordionDetails>
              <List>
              
              <ListItem className={classes.heading}>Teilnehmer</ListItem>
              { 
                participations.map(participation => <ParticipantList key={participation.getID()} participation={participation} 
                show={this.props.show}  
                onExpandedStateChange={this.onExpandedStateChange}
                onParticipationDeleted={this.participationDeleted}/>)
              }
              </List>
          </AccordionDetails>
        </Accordion>
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
    },
    font: {
      fontSize: 23,
      fontFamily: '"Segoe UI"',
      color: indigo[700],
    },
    heading: {
      fontSize: 17,
      color: indigo[500],
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