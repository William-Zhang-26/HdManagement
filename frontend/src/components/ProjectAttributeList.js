//Inhalt des Dropdowns einer ProjectAttributeList


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ProjectAPI from '../api/ProjectAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
//import AttributeListEntry from './AttributeListEntry';       Lösung ohne Entries
import StudentProjectSignIn from './dialogs/StudentProjectSignIn'
import StudentProjectSignOut from './dialogs/StudentProjectSignOut'


class ProjectAttributeList extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      capacity: '',
      loadingInProgress: false,
      loadingAttributeError: null,
      addingAttributeError: null,
    };
  }

  /** Fetches AccountBOs for the current customer */
  getAttributes = () => {
    ProjectAPI.getAPI().getAttributesForProjects(this.props.project.getID()).then(capacity =>
      this.setState({ 
        capaciy: capacity,
        loadingInProgress: false, // loading indicator 
        loadingAttributeError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          capacity: null,
          loadingInProgress: false,
          loadingAttributeError: e
        })
      );

    // set loading to true
    this.setState({
        capacity: 'lädt',
        loadingInProgress: true,
        loadingAttributeError: null
    });
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getAttributes();
  }

  /** Lifecycle method, which is called when the component was updated */
  componentDidUpdate(prevProps) {
    // reload accounts if shown state changed. Occures if the CustomerListEntrys ExpansionPanel was expanded
     if ((this.props.show) && (this.props.show !== prevProps.show)) {
       this.getAttributes();
     }
  }


  /** Renders the component */
  render() {
    const { classes, project } = this.props;
    // Use the states customer
    const { loadingInProgress, loadingAttributeError, capacity } = this.state;

    // console.log(this.props);
    return (
      <div className={classes.root}>
        <List className={classes.attributeList}>
            <ListItem>
                <Typography color='textSecondary'>
                    Kapazität: {capacity}
                </Typography>
                <Typography color='textSecondary'>
                    Weitere Attribute
                </Typography>   
            </ListItem>
            <ListItem>
                <LoadingProgress show={loadingInProgress} />
                <ContextErrorMessage error={loadingAttributeError} contextErrorMsg={`List of attributes for project ${project.getID()} could not be loaded.`} onReload={this.getAttributes} />
            </ListItem>
        </List>
        <Button  color='primary' startIcon={<AddIcon />} onClick={<StudentProjectSignIn/>}>
            Anmelden
        </Button>
        <Button  color='secondary' startIcon={<AddIcon />} onClick={<StudentProjectSignOut/>}>
            Abmelden
        </Button>
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  accountList: {
    marginBottom: theme.spacing(2),
  },
  addAccountButton: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(1),
  }
});

/** PropTypes */
ProjectAttributeList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO of this AccountList */
  project: PropTypes.object.isRequired,
  /** If true, accounts are (re)loaded */
  show: PropTypes.bool.isRequired
}

export default withStyles(styles)(ProjectAttributeList);
