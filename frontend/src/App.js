import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import SignIn from './components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import Impressum from './components/pages/Impressum';
import firebase from 'firebase/app';
import 'firebase/auth';
import Header from './components/layout/Header';
import StudentProjectList from './components/StudentProjectList';


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
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Header user={currentUser}/>
          {

            currentUser ?
                <>
                  <Redirect from='/' to='projects' />
									<Route exact path='/projects'>
									  <StudentProjectList />
									</Route>
                    <Redirect from='/' to='impressum' />
                    <Route path='/impressum' component={Impressum} />
                </>
                :
                <>
                    <Redirect to='/index.html' />
                    <SignIn onSignIn={this.handleSignIn} />
                </>

          }

          

          <LoadingProgress show={authLoading} />
          <ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during sighn in process.`} onReload={this.handleSignIn} />
          <ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
        
        </div>
      </Router>
    );
  }
}

export default App;
