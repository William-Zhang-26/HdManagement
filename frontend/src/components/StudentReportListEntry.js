import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { List, ListItem, Paper } from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';
import  ProjectAPI  from '../api/ProjectAPI';

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
        participation: props.participation,
        project: null,
        validation: null,

      };
    }


    getParticipationProject = () => {
      ProjectAPI.getAPI().getParticipationProject(this.state.participation.getID())
          .then (participationBOs => {
              this.setState({ project: participationBOs });
          })
        }


    getParticipationValidation = () => {
        ProjectAPI.getAPI().getParticipationValidation(this.state.participation.getID())  
            .then (participationBO => {
                this.setState({ validation: participationBO });
            })
      }

    /*getParticipationModule = () => {
      ProjectAPI.getAPI().getParticipationModule(this.state.participation.getID())
          .then (participationBOss => {
              this.setState({ module: participationBOss });
          })
        }*/

      
    componentDidMount() {
      this.getParticipationProject();
      this.getParticipationValidation();
      //this.getParticipationModule();
    }

  
    


  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    const { participation, project, validation } = this.state;

    console.log(this.state);
    return (
      <div>

      { project && validation && participation.getStudentID() === 1 ?


      <Grid>
          <Paper elevation={3} >
            <List>
                <ListItem className = {classes.font}>{project.getName()}</ListItem>
                <ListItem>Projektbeschreibung: {project.getProjectDescription()} </ListItem> 
                <ListItem>Modul: {//module.getName()
                }</ListItem> 

                { participation.getValidationID() !== 1 && participation.getValidationID() !== 14 && participation.getValidationID() !== 15 ? <ListItem>Note: {validation.getGrade()}</ListItem> : null }
              

                { participation.getValidationID() === 1 ?
                <ListItem>Status: angemeldet </ListItem> :
                
                participation.getValidationID() > 1 && participation.getValidationID() <= 11  ?
                  <ListItem>Status: bestanden </ListItem> :

                participation.getValidationID() === 12 && participation.getValidationID() === 13 ?
                  <ListItem>Status: nicht bestanden </ListItem> : 

                participation.getValidationID() === 14 ?
                <ListItem>Status: bestanden </ListItem> :

                participation.getValidationID() === 15 ?
                <ListItem>Status: nicht bestanden </ListItem> 
                  
              : null }

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
    participation: PropTypes.object.isRequired,
    expandedState: PropTypes.bool.isRequired,
    onExpandedStateChange: PropTypes.func.isRequired
    }
  
export default withStyles(styles)(StudentReportListEntry);


