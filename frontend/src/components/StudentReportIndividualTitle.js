import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, List, ListItem, Grid } from '@material-ui/core';
import  ProjectAPI  from '../api/ProjectAPI';
import StudentBO from '../api/StudentBO';

class StudentReportIndividualTitle extends Component{

    constructor(props) {
        super(props);

        this.state = {
            student: props.student,
            //studentId: this.props.match.params.studentid,
            studentId: props.studentId,

        };
    }

    getStudent = () => {
        ProjectAPI.getAPI().getStudentById(this.state.studentId)
        //ProjectAPI.getAPI().getStudentById()
            .then (studentBO => {
                this.setState({ student: studentBO });
            })

    }

    componentDidMount() {
        this.getStudent();
      }



    render() {
    const { classes } = this.props;
    const { student, studentId } = this.state;

    // console.log(this.state);
    return (
        <div>
       
        <Grid className = {classes.root}>
            <List>
            <ListItem>Name: {student.getFirstName()} {student.getName()} </ListItem>
            <ListItem>Matrikelnummer: {student.getMatriculationNumber()} </ListItem>
            <ListItem>Studiengangskürzel: {student.getCourse()} </ListItem>  
            </List>
        </Grid>

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

