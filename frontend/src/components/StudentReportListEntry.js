import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, List, ListItem, Paper } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import CustomerForm from './dialogs/CustomerForm';
import AddIcon from '@material-ui/icons/Add';
import indigo from '@material-ui/core/colors/indigo';

/** Fehlende Inhalte:
 *  
 * - Aus ProjectTypeBO: Name (Fachspezifisch, Inter-, Transdisziplinär), ECTS und SWS
 * - Aus ModuleBO: EDV-Nummer
 * - Aus SemesterBO: Semester
 * - Aus ParticipationBO: Modul Name, Note
 * 
 */


class StudentReportListEntry extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        project: props.project,
        state: props.state,
      };
    }


  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    const { project, state } = this.state;

    // console.log(this.state);
    return (
      <div>
      { project.getStateID() === 4 ?
      <Grid>
          <Paper elevation={3} >
            <List>
                <ListItem className = {classes.font}>{project.getName()}</ListItem>
                <ListItem>Projektbeschreibung: {project.getProjectDescription()} </ListItem> 
            </List>
          </Paper>
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
    }
  });
  
  /** PropTypes */
StudentReportListEntry.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    expandedState: PropTypes.bool.isRequired,
    onExpandedStateChange: PropTypes.func.isRequired
    }
  
export default withStyles(styles)(StudentReportListEntry);


