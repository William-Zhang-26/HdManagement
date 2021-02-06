import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, List, ListItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import  ProjectAPI  from '../api/ProjectAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import StudentReportListEntry from './StudentReportListEntry';


/**   Hier sieht der Student all seine angemeldeten Projekte und dessen Bewertungen */

class StudentReportList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
        participations: [],
        error: null,
        loadingInProgress: false,
    };
  }

    getParticipations = () => {
    ProjectAPI.getAPI().getParticipations()
      .then(participationBOs =>
        this.setState({              
          participations: participationBOs,
          loadingInProgress: false,   
          error: null
        })).catch(e =>
          this.setState({            
            participations: [],
            loadingInProgress: false, 
            error: e
          })
        );

    // setzen des Ladens auf true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }
  



  /** Lifecycle-Methode, die aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird */
  componentDidMount() {
    this.getParticipations(); 
  }



  /** Rendern der Komponente */
  render() {
    const { classes } = this.props;
    const { participations, loadingInProgress, error} = this.state;

    return (
      <div className={classes.root}>
        <List>
            
        { 
          
          participations.map(participation => <StudentReportListEntry key={participation.getID()} participation={participation} 
          show={this.props.show}/>)
        }

          <ListItem>
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`The list of participations could not be loaded.`} onReload={this.getParticipations} />
          </ListItem>

        </List>

      </div>
    );
  }
}

/** Komponentenspezifisches Styling */
const styles = theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(10),
  }
});

/** PropTypes */
StudentReportList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,

  show: PropTypes.bool.isRequired
}

export default withRouter(withStyles(styles)(StudentReportList));