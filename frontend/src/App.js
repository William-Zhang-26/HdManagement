import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
//import { Container } from '@material-ui/core';
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
import ProjectListParticipants from './components/ProjectListParticipants';


class App extends React.Component {



  #firebaseConfig = {
    apiKey: "AIzaSyBlZY6QdkrNaQodpr0lTcSYTQ6nHqzPHOI",
    authDomain: "hdmanagement-39177.firebaseapp.com",
    databaseURL: "https://hdmanagement-39177.firebaseio.com",
    projectId: "hdmanagement-39177",
    storageBucket: "hdmanagement-39177.appspot.com",
    messagingSenderId: "230352853350",
    appId: "1:230352853350:web:50af80e103c02bd91010a7"
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
          authLoading: false
        });
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



  componentDidMount() {
    firebase.initializeApp(this.#firebaseConfig);
    firebase.auth().languageCode = 'en';
    firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
  }


  render() {
    
    const { currentUser, appError, authError, authLoading } = this.state;

    return (
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Router basename={process.env.PUBLIC_URL}>
          <div className="App">
          <LecturerAdminHeader user={currentUser}/>
            {
            //<LecturerAdminHeader user={currentUser}/><StudentHeader user={currentUser}/>
            //<StudentHeader user={currentUser}/>
            }
            {

              currentUser ?
                  <>
                    <Redirect from='/' to='projects' />
                    <Route exact path='/projects'>
                      
                    <AdminProjectList />
                      {
                        //<LecturerProjectList /><AdminProjectList />
                        //<AdminProjectList />
                        //<StudentProjectList />
                      }
                    </Route>
                      <Route path='/impressum' component={Impressum} />

                    <Route path='/grades'>
										  <ProjectListParticipants />
								  	</Route>

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
