import { withStyles, Typography, Grid } from '@material-ui/core';
import { Button, List, ListItem } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import StudentHeader from '../layout/StudentHeader';
import LecturerAdminHeader from '../layout/LecturerAdminHeader';
//import StudentProjectList from './components/StudentProjectList';
//import LecturerProjectList from './components/LecturerProjectList';
//import AdminProjectList from './components/AdminProjectList';
//import ProjectListParticipants from './components/ProjectListParticipants';

class RoleChoice extends Component {
    constructor(props) {
        super(props);
        this.state = { 

            StudentClicked: false, 
            LecturerClicked: false,
            AdminClicked: false
        };
    }
    

    handleStudentButtonClicked = () => {
        this.setState ({StudentClicked: true});

  }

    handleLecturerButtonClicked = () => {
        this.setState ({LecturerClicked: true});

  }
 
    handleAdminButtonClicked = () => {
        this.setState ({AdminClicked: true});

  }

    render() {
        const { classes } = this.props;
        const { StudentClicked, LecturerClicked, AdminClicked } = this.state;
        
        if (StudentClicked) {
            <div>
                <StudentHeader/>
            </div>        
        } else if (LecturerClicked) {
            <div>
                <LecturerAdminHeader/>
            </div>
        } else {
            <div>
                <LecturerAdminHeader/>
            </div>
        }

        return (
            <div>
            {/*<Typography className={classes.root} align='center' variant='h6'>Willkommen zum HdManagement System!</Typography>
            <Typography className={classes.root} align='center'>Sie müssen sich für eine Ansicht entscheiden.</Typography>
            <Typography className={classes.root} align='center'>Wählen Sie zum Fortfahren Ihre Rolle aus.</Typography>
        */}
            <Grid container justify='center'>
                <Grid item>
                <Button variant='contained' color='primary' onClick={this.handleStudentButtonClicked}>
                    Student
                </Button>
                </Grid>

                <Grid item>
                <Button variant='contained' color='primary' onClick={this.handleLecturerButtonClicked}>
                    Dozent
                </Button>
                </Grid>

                <Grid item>
                <Button variant='contained' color='primary' onClick={this.handleAdminButtonClicked}>
                    Admin
                </Button>
                </Grid>
            </Grid>
            { 
                StudentClicked ?
                    <>
                        <Redirect from='/' to='projects' />
                        <Route exact path='/projects'>
                            <StudentHeader/>
                        </Route> 
                    </>
                    : LecturerClicked ?
                    <>
                        <Redirect from='/' to='projects' />
                        <Route exact path='/projects'>
                            <LecturerAdminHeader />
                        </Route>
                    </>
                    : AdminClicked ?
                    <>
                        <Redirect from='/' to='projects' />
                        <Route exact path='/projects'>
                            <LecturerAdminHeader />
                        </Route>
                    </>
                    :
                    <>
                        <Route exact path="/rolechoice">
                            <RoleChoice />
                        </Route>
                    </>

             }   
        </div>
    );
    }
}




const styles = theme => ({
    root: {
        margin: theme.spacing(2)
    }
});

/** PropTypes */
RoleChoice.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
  }
  

export default withStyles(styles)(RoleChoice);
    



