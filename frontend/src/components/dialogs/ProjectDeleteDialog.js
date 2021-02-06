import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProjectAPI  from '../../api/ProjectAPI';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

//Entfernen eines Projektes
class ProjectDeleteDialog extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      deletingInProgress: false,
      deletingError: null
    };
  }

  /** Löschen des Projekts */
  deleteProject = () => {
    ProjectAPI.getAPI().deleteProject(this.props.project.getID()).then(project => {
      this.setState({
        deletingInProgress: false,                      //Ladeanzeige deaktivieren  
        deletingError: null                             //keine Fehlermeldung
      });
      this.props.onClose(this.props.project);         // Die übergeordnete Komponente mit dem gelöschten Project aufrufen
    }).catch(e =>
      this.setState({
        deletingInProgress: false,                      //Ladeanzeige deaktivieren 
        deletingError: e                                //Anzeigen der Fehlermeldung
      })
    );

    // setzen des Ladens auf true
    this.setState({
      deletingInProgress: true,                       //Ladeanzeige anzeigen
      deletingError: null                             //Fehlermeldung deaktivieren
    });
  }

  /** Auszuführende Anweisung beim Schließen des Dialogs */
  handleClose = () => {
    this.props.onClose(null);
  }

  /** Rendern der Komponente */
  render() {
    const { classes, show, project } = this.props;
    const { deletingInProgress, deletingError } = this.state;

    return (
      <div>
      { show ?
        <Dialog open={show} onClose={this.handleClose}>
          <DialogTitle id='delete-dialog-title'>Löschen des Projektes
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Sind Sie sicher, dass Sie das Projekt '{project.getName()} ' (ID: {project.getID()}) löschen möchten?
            </DialogContentText>
            <LoadingProgress show={deletingInProgress} />
            <ContextErrorMessage error={deletingError} contextErrorMsg={`The project '${project.getName()} '(ID: ${project.getID()}) could not be deleted.`}
              onReload={this.deleteProject} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button variant='contained' onClick={this.deleteProject} color='primary'>
              Löschen
            </Button> 
          </DialogActions>
        </Dialog>
      : null }
      </div>
    );
  }
}

/** Komponentenspezifisches Styeling */
const styles = theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

/** PropTypes */
ProjectDeleteDialog.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

//Ein Projekt, welches gelöscht werden soll
  project: PropTypes.object.isRequired,

//Anzeigen des Dialog-Fensters
  show: PropTypes.bool.isRequired,

//Schließen des Dialog-Fensters
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProjectDeleteDialog);
