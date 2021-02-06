import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import Theme from './Theme';
import SignIn from './components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import Impressum from './components/pages/Impressum';
import firebase from 'firebase/app';
import 'firebase/auth';
import StudentHeader from './components/layout/StudentHeader';
import LecturerAdminHeader from './components/layout/LecturerAdminHeader';
import StudentProjectList from './components/StudentProjectList';
import LecturerProjectList from './components/LecturerProjectList';
import AdminProjectList from './components/AdminProjectList';
import StudentList from './components/StudentList';
import ProjectListParticipants from './components/ProjectListParticipants';
import AllProjectListParticipants from './components/AllProjectListParticipants';
import Header from './components/layout/Header';
import RoleChoice from './components/pages/RoleChoice';
import ProjectAPI from './api/ProjectAPI';
import StudentReportIndividualTitle from './components/StudentReportIndividualTitle';
import StudentReportList from './components/StudentReportList';




class App extends React.Component {



  #firebaseConfig = {
    apiKey: "AIzaSyBBfP9L6_37Hn0nngH2q4UPwW4RvZPMbzM",
    authDomain: "hdmanagement12.firebaseapp.com",
    databaseURL: "https://hdmanagement12-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "hdmanagement12",
    storageBucket: "hdmanagement12.appspot.com",
    messagingSenderId: "562026439297",
    appId: "1:562026439297:web:327a47fb90d7f0c92f6380"
    
      };


  constructor(props) {
    super(props);


    this.state = {
      currentUser: null,
      appError: null,
      authError: null,
      authLoading: false
    };
  }


  static getDerivedStateFromError(error) {
    return { appError: error };
  }

  handleAuthStateChange = user => {
    if (user) {
      this.setState({
        authLoading: true
      });

      user.getIdToken().then(token => {

        document.cookie = `token=${token};path=/`;

        this.setState({
          currentUser: user,
          authError: null,
          authLoading: false,
        });
        this.getCurrentUser();
      }).catch(e => {
        this.setState({
          authError: e,
          authLoading: false
        });
      });
    } else {

      document.cookie = 'token=;path=/';


      this.setState({
        currentUser: null,
        authLoading: false
      });
    }
  }


  handleSignIn = () => {
    this.setState({
      authLoading: true
    });
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }


  /** Lifecycle-Methode, die aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird */
  componentDidMount() {
    firebase.initializeApp(this.#firebaseConfig);
    firebase.auth().languageCode = 'en';
    firebase.auth().onAuthStateChanged(this.handleAuthStateChange);

  }


  getCurrentUser = () => {
    ProjectAPI.getAPI().getUserByGoogleId(firebase.auth().currentUser.uid)   //Hier die ID des Studentens aufrufen --> this.state.studentId.getId()....vom StudentBO
        .then (UserBO => {
            this.setState({ currUser: UserBO });
        })

}


  render() {
    
    const { currentUser, appError, authError, authLoading, currUser } = this.state;

    return (
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Router basename={process.env.PUBLIC_URL}>
          <div className="App">
          <Header user={currentUser}/>
            {

              currentUser && currUser && currUser.getRoleId() === 4 ?
                  <>
                    <Redirect from = '/' to = '/rolechoice' />
                    <Route exact path="/rolechoice">
                      <RoleChoice/>
                    </Route>
                  </>
                  :
                  currentUser && currUser && currUser.getRoleId() === 1 ?
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
                        : 
                        currentUser && currUser && currUser.getRoleId() === 2 ?
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
                        :
                        currentUser && currUser && currUser.getRoleId() === 3 ?
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
                        :
                  <>
                    <Redirect to='/index.html' />
                    <SignIn onSignIn={this.handleSignIn} />
                  </>

            }

            <LoadingProgress show={authLoading} />
            <ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during sign in process.`} onReload={this.handleSignIn} />
            <ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
          
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
