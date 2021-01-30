//Erstellen eines Objektes, nach der erstellung ist kein Update/ Edit möglich

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import { Typography} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProjectAPI  from '../../api/ProjectAPI';
import ProjectTypeBO  from '../../api/ProjectTypeBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';


class ProjectTypeForm extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      //Project spezifische Attribute
      name: '',
      ects: '',
      sws: '',

      addingInProgress: false,
      addingError: null
     
    };

    // Beim Schließen des Dialogs soll der Anfangszustand wieder hergestellt werden
    this.baseState = this.state;
  }

  /** Adds the Project */
  addProjectType = () => {
    let newProjectType = new ProjectTypeBO(this.state.name, this.state.ects, this.state.sws);
    //newProjectType.setName(this.state.name)
    //newProjectType.setEcts(this.state.ects)
    //newProjectType.setSws(this.state.sws)
    ProjectAPI.getAPI().addProjectType(newProjectType).then(projecttype => {
      this.setState(this.baseState);
      this.props.onClose(projecttype); // call the parent with the customer object from backend
    }).catch(e =>
        this.setState({
          addingInProgress: false,    // disable loading indicator 
          addingError: e              // show error message
        })
      );
  
      // set loading to true
      this.setState({
          addingInProgress: true,       // show loading indicator
          addingError: null             // disable error message
      });
    }


// Update gegebenenfalls ergänzen um Projekte zu ändern

  /** Handles value changes of the forms textfields and validates them */
  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
      [event.target.id + 'ValidationFailed']: error,
      [event.target.id + 'Edited']: true
    });
  } 

  /** Handles the close / cancel button click event*/
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }



  /** Renders the component */
  render() {
    const { classes, show } = this.props;
    const { name } = this.state;
    const { ects } = this.state;
    const { sws } = this.state;
    const { addingInProgress, addingError } = this.state;

    console.log(this.state);

    let title = 'Neues Projekt erstellen';
    let header = 'Füllen Sie das Formuler aus';

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle id='form-dialog-title'>{title}
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {header}
            </DialogContentText>
            <form className={classes.root} noValidate autoComplete='off'>
            <TextField autoFocus type='text' required fullWidth margin='normal' id='name' label='Neuer Projekttyp:' value={name} 
                onChange={this.textFieldValueChange} />

            <TextField type='text' required fullWidth margin='normal' id='ects' label='ECTS:' value={ects} 
                onChange={this.textFieldValueChange} />

            <TextField type='text' required fullWidth margin='normal' id='sws' label='SWS:' value={sws} 
                onChange={this.textFieldValueChange} />

            <Typography>Raum- und Ressourcenplanung</Typography>

            </form>

            <LoadingProgress show={addingInProgress} />
            <ContextErrorMessage error={addingError} contextErrorMsg={`Das Projekt konnte nicht erstellt werden`} onReload={this.addProjectType} />

          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>

            <Button variant='contained' onClick={this.addProjectType} color='primary'>
              Einsenden
            </Button>
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
});

/** PropTypes */
ProjectTypeForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  project: PropTypes.object,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProjectTypeForm);
