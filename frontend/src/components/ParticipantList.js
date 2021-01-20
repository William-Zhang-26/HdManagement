import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, List, ListItem, Button, Typography, Grid, Paper } from '@material-ui/core';
//import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import  ProjectAPI  from '../api/ProjectAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import StudentReportListEntry from './StudentReportListEntry';
import StudentBO from '../api/StudentBO';


/**  
 * Hier wird die Liste aus Studentensicht angezeigt. Studenten sehen alle genehmigten Projekte
 * und können sich dafür An- und Abmelden.
 */

class ParticipantList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
        participation: props.participation,
        student: null,
        error: null,
        loadingInProgress: false,
    };
  }


  /*getProjects = () => {
    ProjectAPI.getAPI().getProjects()
      .then(projectBOs =>
        this.setState({              
          projects: projectBOs,
          loadingInProgress: false,   
          error: null
        })).catch(e =>
          this.setState({            
            projects: [],
            loadingInProgress: false, 
            error: e
          })
        );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });


  componentDidMount() {
    this.getProjects();
  }
  }*/

  getParticipant = () => {
    ProjectAPI.getAPI().getStudentById(this.state.participation.getStudentID())
        .then (StudentBO => {
            this.setState({ student: StudentBO });
        })
      }





  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getParticipant();
  }



  /*getParticipationsForStudent = () => {
    ProjectAPI.getAPI().getParticipationsForStudent(2)   //Hier die ID des Studentens aufrufen --> this.state.studentId.getId()....vom StudentBO
    //ProjectAPI.getAPI().getStudentById()
        .then (participationBO => {
            this.setState({ projects: participationBO });
        }).catch(e =>
          this.setState({            
            projects: []
          })
        );
}


  //Lifecycle method, which is called when the component gets inserted into the browsers DOM 
  componentDidMount() {
    this.getParticipationsForStudent();
  }*/



  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { participations, loadingInProgress, student, error } = this.state;
    console.log(this.state);

    return (
      <div className={classes.root}>
        { student ?
        
        <Grid container spacing={8} className = {classes.root}>

            <List>
                <ListItem>Name: {student.getFirstName()} {student.getName()} </ListItem>
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`The list of participations could not be loaded.`} onReload={this.getParticipations} />
            </List>

        </Grid>




        : null
        }
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing(3),
    //marginRight: theme.spacing(10),
    marginLeft: theme.spacing(10),
  }
});

/** PropTypes */
ParticipantList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,

  show: PropTypes.bool.isRequired,

  student: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ParticipantList));