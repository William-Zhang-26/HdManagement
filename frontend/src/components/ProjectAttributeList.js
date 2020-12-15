//Inhalt des Dropdowns einer ProjectAttributeList


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ProjectAPI from '../api/ProjectAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProjectAttributeListEntry from './ProjectAttributeListEntry';       //Lösung ohne Entries
import StudentProjectSignIn from './dialogs/StudentProjectSignIn'
import StudentProjectSignOut from './dialogs/StudentProjectSignOut'


class ProjectAttributeList extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      attributes: [],
      loadingInProgress: false,
      loadingAttributeError: null,
    };
  }
/**
 
  getAttributes = () => {
    ProjectAPI.getAPI().getAttributesForProject()
      .then(attributeBOs =>
        this.setState({               // Set new state when CustomerBOs have been fetched
          attributes: attributeBOs,
          loadingInProgress: false,   // disable loading indicator 
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch 
            attributes: [],
            loadingInProgress: false, // disable loading indicator 
            error: e
          })
        );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }
*/
  //*Fetches AccountBOs for the current customer*/
  getAttributes = () => {
    ProjectAPI.getAPI().getAttributesForProject(this.props.project.getID()).then(attributeBOs =>
      this.setState({ 
        attributes: attributeBOs,
        loadingInProgress: false, // loading indicator 
        loadingAttributeError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          attributes: [],
          loadingInProgress: false,
          loadingAttributeError: e
        })
      );

    

    // set loading to true
    this.setState({
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
    const { loadingInProgress, loadingAttributeError, attributes } = this.state;

    // console.log(this.props);
    console.log(attributes)
    return (
      <div className={classes.root}>
        <List className={classes.attributeList}>
          {
            attributes.map(attribute => <ProjectAttributeListEntry key={attribute.getID()} attribute={attribute} 
              show={this.props.show} />)
          }

          <ListItem>
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={loadingAttributeError} contextErrorMsg={`List of attributes for project miau ${project.getID()} could not be loaded.`} onReload={this.getAttributes} />
          </ListItem>
        </List>
        <Button  color='secondary' startIcon={<AddIcon />} onClick={<StudentProjectSignIn/>}>
            Anmelden
        </Button>
        <Button  color='primary' startIcon={<AddIcon />} onClick={<StudentProjectSignOut/>}>
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
  attribute: PropTypes.object.isRequired,
  /** If true, accounts are (re)loaded */
  show: PropTypes.bool.isRequired
}

export default withStyles(styles)(ProjectAttributeList);
