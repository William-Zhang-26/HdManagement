import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { List, ListItem, Paper } from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';
import  ProjectAPI  from '../api/ProjectAPI';
import firebase from 'firebase/app';
import 'firebase/auth';


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
        module: null,
        validation: null,
        googleUID: firebase.auth().currentUser.uid
      };
    }

    
    getProjectbyID = () => {
      ProjectAPI.getAPI().getProjectbyId(this.state.participation.getProjectID())
          .then (participationBOs => {
              this.setState({ project: participationBOs });
          })
        }


    getModulebyID = () => {
      ProjectAPI.getAPI().getModulebyId(this.state.participation.getModuleID())
          .then (participationBOs => {
              this.setState({ module: participationBOs });
          })
        }


    getValidationbyID = () => {
      ProjectAPI.getAPI().getValidationbyId(this.state.participation.getValidationID())
          .then (participationBOs => {
              this.setState({ validation: participationBOs });
          })
        }

    getStudent = () => {
      ProjectAPI.getAPI().getStudentbyId(firebase.auth().currentUser.uid)   //Hier die ID des Studentens aufrufen --> this.state.studentId.getId()....vom StudentBO
      //ProjectAPI.getAPI().getStudentById()
          .then (studentBO => {
              this.setState({ student: studentBO });
          })

  }
    componentDidMount() {
      this.getProjectbyID();
      this.getModulebyID();
      this.getValidationbyID();
      this.getStudent();
    }


  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    const { participation, project, module, validation, student} = this.state;
    //const { project, module, validation } = this.state;

    console.log(this.state);

    return (
      <div>

      { project && module && validation && student && participation.getStudentID()=== student.getID()? 

      <Grid>
          <Paper elevation={3} >
            <List>
                <ListItem className = {classes.font}>{project.getName()}</ListItem>
                <ListItem>Projektbeschreibung: {project.getProjectDescription()}</ListItem> 
                <ListItem>Modul: {module.getEDV_number()} {module.getName()}</ListItem> 

                { participation.getValidationID() !== 1 && participation.getValidationID() !== 14 && participation.getValidationID() !== 15 ? <ListItem>Note: {validation.getGrade()}</ListItem> : null }
              

                { participation.getValidationID() === 1 ?
                <ListItem>Status: angemeldet </ListItem> :
                
                participation.getValidationID() > 1 && participation.getValidationID() <= 11  ?
                  <ListItem>Status: bestanden </ListItem> :

                participation.getValidationID() >= 12 && participation.getValidationID() <= 13 ?
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


