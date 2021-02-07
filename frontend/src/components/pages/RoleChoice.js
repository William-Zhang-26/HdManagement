import { withStyles, List, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import StudentHeader from '../layout/StudentHeader';
import LecturerAdminHeader from '../layout/LecturerAdminHeader';
import StudentProjectList from '../StudentProjectList';
import LecturerProjectList from '../LecturerProjectList';
import AdminProjectList from '../AdminProjectList';
import ProjectListParticipants from '../ProjectListParticipants';
import Impressum from './Impressum';
import StudentReportIndividualTitle from '../StudentReportIndividualTitle';
import StudentReportList from '../StudentReportList';
import UserBO from '../../api/UserBO';
import firebase from 'firebase/app';
import 'firebase/auth';
import ProjectAPI from '../../api/ProjectAPI';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import LoadingProgress from '../dialogs/LoadingProgress';
import AllProjectListParticipants from '../AllProjectListParticipants';
import StudentList from '../StudentList';
import StudentForm from '../dialogs/StudentForm';


class RoleChoice extends Component {
    constructor(props) {
        super(props);

        let m = firebase.auth().currentUser.email;
        let g = firebase.auth().currentUser.uid;

        this.state = { 
            StudentClicked: false, 
            LecturerClicked: false,
            AdminClicked: false,
            AlwaysTrue: true,
            disabled: true,
            mail: m,
            googleid: g,

            showStudentForm: false,

            // Ladebalken und Error
            updatingInProgress: false,
            updatingError: null

        };

        this.baseState = this.state;
    }
    

    /** Handlerfunktion die aufgerufen wird, wenn der Student Button geklickt wurde */
    handleStudentButtonClicked = event => {
        event.stopPropagation();
        //Anzeigen der StudentForm
        return(this.setState({
            showStudentForm: true,
        }))
    }

    handleLecturerButtonClicked = () => {
        this.setState ({LecturerClicked: true});
        this.setState ({disabled: false});
        this.updateLecturerRole();
       
    }
 
    handleAdminButtonClicked = () => {
        this.setState ({AdminClicked: true});
        this.setState ({disabled: false});
        this.updateAdminRole();

    }

    /**Handlerfunktion die aufgerufen wird, wenn das "Projekt erstellen" Fenster geschlossen werden soll*/
    studentFormClosed = student => {
        // das Projekt ist nicht Null/ False und wird daher neu erstellt
        if (student) {
        return (this.setState({
            showStudentForm: false,
            StudentClicked: true,
            disabled: false,
        }), this.updateStudentRole())
        } else {
        this.setState({
            showStudentForm: false
        });
        }
    }

    getCurrentUser = () => {
        ProjectAPI.getAPI().getUserByGoogleId(firebase.auth().currentUser.uid)   //Hier die ID des Studentens aufrufen --> this.state.studentId.getId()....vom StudentBO
        //ProjectAPI.getAPI().getStudentById()
            .then (UserBO => {
                this.setState({ user: UserBO });
            })
    
    }

    updateLecturerRole = () => {
        let updatedRole = Object.assign(new UserBO(), this.state.user);


        updatedRole.setMail(this.state.mail);
        updatedRole.setGoogleId(this.state.googleid);
        updatedRole.setRoleId(2);

        ProjectAPI.getAPI().updateUser(updatedRole).then(user => {
            this.setState({
                updatingInProgress: false,              // disable loading indicator  
                updatingError: null  
            });
            this.baseState.mail = this.state.mail;
            this.baseState.googleid = this.state.googleid;
            this.baseState.roleid = this.state.roleid;
        })

    }

    updateAdminRole = () => {
        let updatedRole = Object.assign(new UserBO(), this.state.user);


        updatedRole.setMail(this.state.mail);
        updatedRole.setGoogleId(this.state.googleid);
        updatedRole.setRoleId(3);

        ProjectAPI.getAPI().updateUser(updatedRole).then(user => {
            this.setState({
                updatingInProgress: false,              // disable loading indicator  
                updatingError: null  
            });
            this.baseState.mail = this.state.mail;
            this.baseState.googleid = this.state.googleid;
            this.baseState.roleid = this.state.roleid;
        })

    }

    updateStudentRole = () => {
        let updatedRole = Object.assign(new UserBO(), this.state.user);


        updatedRole.setMail(this.state.mail);
        updatedRole.setGoogleId(this.state.googleid);
        updatedRole.setRoleId(1);

        ProjectAPI.getAPI().updateUser(updatedRole).then(user => {
            this.setState({
                updatingInProgress: false,              // disable loading indicator  
                updatingError: null  
            });
            this.baseState.mail = this.state.mail;
            this.baseState.googleid = this.state.googleid;
            this.baseState.roleid = this.state.roleid;
        })

    }

    componentDidMount() {
        this.getCurrentUser();
      }



    render() {
        const { classes } = this.props;
        const { StudentClicked, LecturerClicked, AdminClicked, AlwaysTrue, user, showStudentForm, student } = this.state;
        const { disabled } = this.props;
        const { updatingInProgress, updatingError } = this.state;
        

        return (
            <div>
        {this.state.disabled && user ?
          
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
            <LoadingProgress show={updatingInProgress} />
            <ContextErrorMessage error={updatingError} contextErrorMsg={`Es ist ein Fehler aufgetreten, lol.`} />
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
                                <StudentReportIndividualTitle />
                                <StudentReportList />
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

                            <Route path='/students'>
                                <StudentList/>
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
                                <AllProjectListParticipants/>
                            </Route>

                            <Route path='/students'>
                                <StudentList/>
                            </Route>

                            <Route path='/impressum' component={Impressum} />

                        </Router>
                    </>
                    : AlwaysTrue }   
        <List>
            <StudentForm show={showStudentForm} student={student} onClose={this.studentFormClosed} />     
        </List>         
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

    show: PropTypes.bool.isRequired,
  }
  

export default withStyles(styles)(RoleChoice);
    



