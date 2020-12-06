//Button für einen Studenten, um sich in einem Projekt anzumelden

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ProjectAPI } from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';


class StudentProjectSignIn extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        SignInInProgress: false,
        SignInError: null
      };
    }

//get Project ID
//get Student ID
//AddStudentForProject(ProjectID)

  /** Adds an account for the current customer */
  SignInStudent = () => {
    ProjectAPI.getAPI().addStudentForProject(this.props.project.getID()).then(studentBO => {
      // console.log(accountBO)
      this.setState({  // Set new state when AccountBOs have been fetched
        students: [...this.state.students, studentBO],
        SignInInProgress: false, // loading indicator 
        SignInError: null
      })
    }).catch(e =>
      this.setState({ // Reset state with error from catch 
        students: [],
        SignInInProgress: false,
        SignInError: e
      })
    );

    // set loading to true
    this.setState({
      SignInInProgress: true,
      SignInError: null
    });
  }


  /** Handles the close / cancel button click event */
    handleClose = () => {
    // console.log(event);
    this.props.onClose(null);
  }

}

export default (StudentProjectSignIn); 
