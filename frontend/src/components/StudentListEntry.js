import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { List, ListItem, Paper } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Zoom from '@material-ui/core/Zoom';


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
              <Zoom in={true} style={{ transitionDelay: true ? '900ms' : '0ms' }}><ListItem>ID: {student.getID()} </ListItem></Zoom>
              <Zoom in={true} style={{ transitionDelay: true ? '1400ms' : '0ms' }}><ListItem>Matrikelnummer: {student.getMatriculationNumber()} </ListItem></Zoom> 
              <Zoom in={true} style={{ transitionDelay: true ? '1900ms' : '0ms' }}><ListItem>Studiengang: {student.getCourse()} </ListItem></Zoom>
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


