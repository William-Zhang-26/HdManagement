import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
//import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import CustomerForm from './dialogs/CustomerForm';
//import CustomerDeleteDialog from './dialogs/CustomerDeleteDialog';
//import AccountList from './AccountList';
import StudentProjectSignIn from './dialogs/StudentProjectSignIn';
import StudentProjectSignOut from './dialogs/StudentProjectSignOut';
import ProjectAttributeList from './ProjectAttributeList';

//Condition für alle ergänzen
//Admin Funktionen ergänzen



class ProjectListEntry extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
        project: props.project,
        showStudentProjectSignOut: true,
        showStudentProjectSignIn: false,
        //Admin Attribute für Funktionen
      };
    }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.project);
  }


//StudentProjectSignIn/Out handler und Button
//Show/ Closed SignIn/Out Dialog
}

export default (ProjectListEntry);
