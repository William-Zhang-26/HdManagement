//Der Admin und Dozenten spezifische Header (Tabs: Projekte, Noten, Impressum)

import React, { Component } from 'react';
import { Paper, Typography, Tabs, Tab, Box } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ProfileDropDown from '../dialogs/ProfileDropDown';


class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tabindex: 0
    };
  }


  handleTabChange = (e, newIndex) => {
    this.setState({
      tabindex: newIndex
    })
  };


  render() {
    const { user } = this.props;

    return (
      <Paper variant='outlined' >
        <ProfileDropDown user={user} />
        <Box p = {3}/>
        <Typography variant='h4' component='h1' align='center'>
          Willkommen
        </Typography>
        
            <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} >
              <Tab label='Projekte' component={RouterLink} to={`/projects`} />
              <Tab label='Noten' component={RouterLink} to={`/grades`} />
              <Tab label='Impressum' component={RouterLink} to={`/impressum`} />
            </Tabs>
            
      </Paper>
    )
  }
}


export default Header;
