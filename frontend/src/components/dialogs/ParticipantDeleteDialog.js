import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProjectAPI  from '../../api/ProjectAPI';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

/*Das Dialog Fenster um einzelne Studenten aus der Teilnehmerliste zu entfernen

Diese Funktion ist möglich, solange das Projekt die State ID 3 (genehmigt), 4 (in Bewertung) 
und gegebenenfalls 5 (Bewertung abgeschlossen) hat.*/


class ParticipantDeleteDialog extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      deletingInProgress: false,
      deletingError: null,
    };
  }

  /** Löschen der Teilnahme */
  deleteParticipation = () => {
    ProjectAPI.getAPI().deleteParticipation(this.props.participation.getID()).then(participation => {
      this.setState({
        deletingInProgress: false,                              // Ladeanzeige deaktivieren  
        deletingError: null                                     // keine Fehlermeldung
      });
      this.props.onClose(this.props.participation);             // Die übergeordnete Komponente mit der gelöschten Teilnahme aufrufen
    }).catch(e =>
      this.setState({
        deletingInProgress: false,                              // Ladeanzeige deaktivieren 
        deletingError: e                                        // Anzeigen der Fehlermeldung
      })
    );

    
    //Laden auf true setzen
    this.setState({
      deletingInProgress: true,                                 // Anzeigen des Ladestates  
      deletingError: null                                       // Fehlermeldung deaktivieren 
    });
  }

  /** Auszuführende Anweisung beim Schließen des Dialogs */
  handleClose = () => {
    this.props.onClose(null);
  }



  /** Rendern der Komponente */
  render() {
    const { classes, show, participation } = this.props;
    const { deletingInProgress, deletingError } = this.state;

    return (
      <div>
      { show ?
        <Dialog open={show} onClose={this.handleClose}>
          <DialogTitle id='delete-dialog-title'>Teilnehmer entfernen
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Sind Sie sicher, dass Sie den Teilnehmer (ID: {participation.getStudentID()}) löschen möchten?
            </DialogContentText>
            <LoadingProgress show={deletingInProgress} />
            <ContextErrorMessage error={deletingError} contextErrorMsg={`The participant (ID: ${participation.getStudentID()}) could not be deleted.`}
              onReload={this.getParticipant} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button variant='contained' onClick={this.deleteParticipation} color='primary'>
              Entfernen
            </Button> 
          </DialogActions>
        </Dialog>
      : null }
      </div>
    );
  }
}

/** Komponentenspezifisches Styling */
const styles = theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

/** PropTypes */
ParticipantDeleteDialog.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

  /**Ein Teilnahme-Objekt welches entfernt werden soll*/
  participation: PropTypes.object.isRequired,

  /** Anzeigen des Dialog-Fensters */
  show: PropTypes.bool.isRequired,

  /** Schließen des Dialog-Fensters */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ParticipantDeleteDialog);
