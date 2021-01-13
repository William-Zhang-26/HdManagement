import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, List, ListItem, Grid, Typography } from '@material-ui/core';
import  ProjectAPI  from '../api/ProjectAPI';


class StudentReportIndividualTitle extends Component{

  constructor(props) {
      super(props);

      this.state = {
          student: null,
          //studentId: this.props.match.params.studentid,
          studentId: this.props.studentId,

      };
  }



  componentDidMount() {
    this.getStudent();
    console.log('miau')
  }

  getStudent = () => {
      ProjectAPI.getAPI().getStudentById(1)   //Hier die ID des Studentens aufrufen --> this.state.studentId.getId()....vom StudentBO
      //ProjectAPI.getAPI().getStudentById()
          .then (studentBO => {
              this.setState({ student: studentBO });
          })
          console.log("hello");
  }






  render() {
    const { classes } = this.props;
    const student = this.state.student;

    console.log("hello again");
    console.log(this.state);
    return (
        <div> 
        
        { student ?

        <Grid className = {classes.root}>
            <List>
            <ListItem>Name: {student.getFirstName()} {student.getName()} </ListItem>
            <ListItem>Matrikelnummer: {student.getMatriculationNumber()} </ListItem>
            <ListItem>Studiengangskürzel: {student.getCourse()} </ListItem>  
            </List>
        </Grid>

        : <Typography>Klappt nicht</Typography>}

        </div>
    );
  }
  


/*
    getStudent = () => {
        ProjectAPI.getAPI().getStudent(this.props.student.getID()).then(studentBO => {
          // console.log(accountBO)
          this.setState({  // Set new state when AccountBOs have been fetched
            accounts: [...this.state.accounts, accountBO],
            loadingInProgress: false, // loading indicator 
            addingAccountError: null
          })
        }).catch(e =>
          this.setState({ // Reset state with error from catch 
            accounts: [],
            loadingInProgress: false,
            addingAccountError: e
          })
        );
    
        // set loading to true
        this.setState({
          loadingInProgress: true,
          addingAccountError: null
        });
      }
*/

}


/** Component specific styles */
const styles = theme => ({
    root: {
      width: '100%',
    }
  });
  
  /** PropTypes */
  StudentReportIndividualTitle.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    student: PropTypes.object.isRequired,
    }
  
export default withStyles(styles)(StudentReportIndividualTitle);

