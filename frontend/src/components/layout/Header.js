import React, { Component } from 'react';
import { Paper, Typography, Tabs, Tab } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ProfileDropDown from '../dialogs/ProfileDropDown'; 

//Erstellt den Titel und ein Verweis zur Rolechoice 
class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tabindex: 0
    };
  }

  /*
  handleTabChange = (e, newIndex) => {
    this.setState({
      tabindex: newIndex
    })
  };*/

  /** Rendern der Komponente */
  render() {
    const { user } = this.props;

    return (
      <Paper variant='outlined' >
        <ProfileDropDown user={user} />
        <Typography variant='h3' component='h1' align='center'>
          HdManagement
        </Typography>
        <Typography variant='h4' component='h2' align='center'>
          Home
        </Typography>

      </Paper>
    )
  }
}



export default Header;