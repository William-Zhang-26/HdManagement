import React, { Component } from 'react';
import { Paper, Typography, Tabs, Tab, Box } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ProfileDropDown from '../dialogs/ProfileDropDown';

//Der Admin und Dozenten spezifische Header (Tabs: Projekte, Noten, Impressum)

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tabindex: 0
    };
  }

//Behandelt Navigationsänderungen
  handleTabChange = (e, newIndex) => {
    this.setState({
      tabindex: newIndex
    })
  };

  /** Rendern der Komponente */
  render() {
    const { user } = this.props;

    return (
      <Paper variant='outlined' >
        <ProfileDropDown user={user} />
        <Box p = {3}/>
        
            <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} >
              <Tab label='Projekte' component={RouterLink} to={`/projects`} />
              <Tab label='Noten' component={RouterLink} to={`/grade`} />
              <Tab label='Studenten' component={RouterLink} to={`/students`} />
              <Tab label='Impressum' component={RouterLink} to={`/impressum`} />
            </Tabs>
            
      </Paper>
    )
  }
}


export default Header;
