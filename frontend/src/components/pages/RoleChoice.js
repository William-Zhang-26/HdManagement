import { withStyles, Typography, Grid } from '@material-ui/core';
import { Button, ButtonGroup, List, ListItem } from '@material-ui/core';
import { Hidden, Paper } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import StudentHeader from '../layout/StudentHeader';
import LecturerAdminHeader from '../layout/LecturerAdminHeader';
import Header from '../layout/Header';
import StudentProjectList from '../StudentProjectList';
import LecturerProjectList from '../LecturerProjectList';
import AdminProjectList from '../AdminProjectList';
import ProjectListParticipants from '../ProjectListParticipants';
import Impressum from './Impressum';
import StudentReportIndividualTitle from '../StudentReportIndividualTitle';
import StudentReportList from '../StudentReportList';


class RoleChoice extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            StudentClicked: false, 
            LecturerClicked: false,
            AdminClicked: false,
            AlwaysTrue: true,
            disabled: true
        };
    }
    

    handleStudentButtonClicked = () => {
        this.setState ({StudentClicked: true});
        this.setState ({disabled:false})
    
    }

    handleLecturerButtonClicked = () => {
        this.setState ({LecturerClicked: true});
        this.setState ({disabled:false})
       
    }
 
    handleAdminButtonClicked = () => {
        this.setState ({AdminClicked: true});
        this.setState ({disabled:false})

    }

    handleDisable = () => {
        this.setState({ disabled: false });
    }


    render() {
        const { classes } = this.props;
        const { StudentClicked, LecturerClicked, AdminClicked, AlwaysTrue } = this.state;
        const { user, disabled } = this.props;
        
        /*if (StudentClicked) {
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
        }*/

        return (
            <div>
            {/*<Typography className={classes.root} align='center' variant='h6'>Willkommen zum HdManagement System!</Typography>
            <Typography className={classes.root} align='center'>Sie müssen sich für eine Ansicht entscheiden.</Typography>
            <Typography className={classes.root} align='center'>Wählen Sie zum Fortfahren Ihre Rolle aus.</Typography>
        */}
        {this.state.disabled ?
          
            <Grid container justify='center'>
            <ButtonGroup className = 'buttons' disabled = {disabled} >
                <Grid item>
                <Button variant='contained' color='primary' onClick={this.handleStudentButtonClicked} >
                    Student
                </Button>
                </Grid>

                <Grid item>
                <Button variant='contained' color='primary' onClick={this.handleLecturerButtonClicked}>
                    Dozent
                </Button>
                </Grid>

                <Grid item>
                <Button variant='contained' color='primary' onClick={this.handleAdminButtonClicked} >
                    Admin
                </Button>
                </Grid>
            </ButtonGroup>
            </Grid>

            : null }

            {
                StudentClicked ?
                    <>
                        <Router>
                            <Redirect exact from='/' to='projects' />
                            <StudentHeader/> 

                            <Route exact path='/projects'>
                                <StudentProjectList />
                            </Route>

                            <Route exact path = '/report'>
                            </Route>

                            <Route path='/impressum' component={Impressum} />
                        </Router>                      
                    </>
                    : LecturerClicked ?
                    <>
                        <Router>
                            <Redirect from='/' to='projects' />
                            <LecturerAdminHeader/> 
                            
                            <Route exact path='/projects'>
                                <LecturerProjectList/>
                            </Route>

                            <Route path = '/grade'>
                                <ProjectListParticipants/>
                            </Route>

                            <Route path='/impressum' component={Impressum} />
                        </Router>
                    </>
                    : AdminClicked ?
                    <>
                        <Router>
                            <Redirect from='/' to='projects' />
                            <LecturerAdminHeader/>
                            
                            <Route exact path='/projects'>
                                <AdminProjectList/>
                            </Route>

                            <Route path = '/grade'>
                                <ProjectListParticipants/>
                            </Route>

                            <Route path='/impressum' component={Impressum} />

                        </Router>
                    </>
                    : AlwaysTrue
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
    



