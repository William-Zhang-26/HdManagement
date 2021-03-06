import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid } from '@material-ui/core';
import { List, ListItem, Paper } from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';
import  ProjectAPI  from '../api/ProjectAPI';
import firebase from 'firebase/app';
import 'firebase/auth';



class StudentReportListEntry extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        participation: props.participation,
        project: null,
        module: null,
        validation: null,
        googleUID: firebase.auth().currentUser.uid,
        projecttype: null
      };
    }

    
    getProjectbyID = () => {
      ProjectAPI.getAPI().getProjectbyId(this.state.participation.getProjectID())
          .then (participationBOs => {
              return (this.setState({ project: participationBOs }),
              this.getProjecttypeForProject())
          })
        }

    getProjecttypeForProject = () => {
        ProjectAPI.getAPI().getProjecttypebyId(this.state.project.getProjectTypeID())
            .then (ProjecttypeBO => {
                this.setState({ projecttype: ProjecttypeBO });
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
          .then (studentBO => {
              this.setState({ student: studentBO });
          })

  }
  
    /** Lifecycle-Methode, die aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird */
    componentDidMount() {
      this.getProjectbyID();
      this.getModulebyID();
      this.getValidationbyID();
      this.getStudent();
    }


  /** Rendern der Komponente*/
  render() {
    const { classes } = this.props;
    const { participation, project, module, validation, student, projecttype} = this.state;


    return (
      <div>

      { project && projecttype && module && validation && student && participation.getStudentID()=== student.getID()? 

      <Grid>
          <Paper elevation={3} >
            <List>
                <ListItem className = {classes.font}>{project.getName()}</ListItem>
                <ListItem>Projektbeschreibung: {project.getProjectDescription()}</ListItem> 
                <ListItem>Projektkategorie: {projecttype.getName()} </ListItem>
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



/** Komponentenspezifisches Styling */
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


