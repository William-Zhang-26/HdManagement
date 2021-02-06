import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { List, ListItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


class StudentListEntry extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        student: props.student,
        
      };
    }

  /** Handler Funktion für das untergeordnete Aufklappprojekt */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.student);
  }


  /** Rendern der Komponente */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states project
    const { student } = this.state;

 
    return (

      student ?

      <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`student${student.getID()}studentpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{student.getName()}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <List>
            <ListItem>ID: {student.getID()} </ListItem>
            <ListItem>Matrikelnummer: {student.getMatriculationNumber()} </ListItem>  
            <ListItem>Studiengang: {student.getCourse()} </ListItem>
        
          </List>
          </AccordionDetails>
        </Accordion>

        : null 
    );
  }
}


/** Komponentenspezifisches Styeling */
const styles = theme => ({
    root: {
      width: '100%',
    }
  });
  
  /** PropTypes */
StudentListEntry.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    StudentListEntry: PropTypes.object.isRequired,
    expandedState: PropTypes.bool.isRequired,
    onExpandedStateChange: PropTypes.func.isRequired,
    }
  
export default withStyles(styles)(StudentListEntry);


