import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, List, ListItem, Grid, Typography, Paper } from '@material-ui/core';
import  ProjectAPI  from '../api/ProjectAPI';
import firebase from 'firebase/app';
import 'firebase/auth';

class StudentReportIndividualTitle extends Component{

  constructor(props) {
      super(props);
      var today = new Date(),
      date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();

      this.state = {
          student: null,
          studentId: this.props.studentId,
          currentDate: date,
          googleUID: firebase.auth().currentUser.uid

      };
  }

  /** Lifecycle-Methode, die aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird */
  componentDidMount() {
    this.getStudent();
  }

  getStudent = () => {
      ProjectAPI.getAPI().getStudentbyId(firebase.auth().currentUser.uid)   //Hier die ID des Studentens aufrufen --> this.state.studentId.getId()....vom StudentBO
      //ProjectAPI.getAPI().getStudentById()
          .then (studentBO => {
              this.setState({ student: studentBO });
          })

  }

  /** Rendern der Komponente*/
  render() {
    const { classes } = this.props;
    const student = this.state.student;

    console.log(this.state);


    return (
        <div> 
        
        { student ?

        <Grid className = {classes.root}>
          <Paper>
            <List>
            <ListItem>Name: {student.getFirstName()} {student.getName()} </ListItem>
            <ListItem>Matrikelnummer: {student.getMatriculationNumber()} </ListItem>
            <Grid container spacing={1}> 
                <Grid item>
                  <ListItem>Studiengangskürzel: {student.getCourse()} </ListItem>  
                </Grid>
                <Grid item xs = {8} />
                <Grid item>
                  <ListItem>Datum: { this.state.currentDate }</ListItem>  
                </Grid>
            </Grid>
            </List>
          </Paper>
        </Grid>

        : <Typography>Klappt nicht</Typography>}

        </div>
    );
  }
}


/** Komponentenspezifisches Styeling */
const styles = theme => ({
    root: {
      width: '90%',
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(10),
    }
  });
  
  /** PropTypes */
  StudentReportIndividualTitle.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    student: PropTypes.object.isRequired,
    }
  
export default withStyles(styles)(StudentReportIndividualTitle);

