import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProjectAPI from '../../api/ProjectAPI';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

//Das Fenster um sich als Student aus einem Projekt auszuschreiben

class StudentProjectSignOut extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      deletingInProgress: false,
      deletingError: null,
    };
  }


  /** Abmelden */
  deleteParticipation = () => {
    ProjectAPI.getAPI().deleteParticipation(this.props.participation.getID()).then(participation => {
      this.setState({
        deletingInProgress: false,                                          // Ladeanzeige deaktivieren  
        deletingError: null                                                 // Keine Fehlermeldung 
      });
      this.props.onClose(this.props.participation);                         // Die übergeordnete Komponente mit dem abgemeldeten Studenten aufrufen
    }).catch(e =>
      this.setState({
        deletingInProgress: false,                                          // Ladeanzeige deaktivieren 
        deletingError: e                                                    // Anzeigen der Fehlermeldung 
      })
    );

    // setzen des Ladens auf true
    this.setState({
      deletingInProgress: true,                                           // Ladeanzeige anzeigen
      deletingError: null                                                 // Fehlermeldung deaktivieren
    });
  }

  /** Auszuführende Anweisung beim Schließen des Dialogs */
  handleClose = () => {
    this.props.onClose(null);
  }


  /** Rendern der Komponente */
  render() {
    const { classes, show } = this.props;
    const { deletingInProgress, deletingError } = this.state;

    return (
      <div>
      { show ?
        <Dialog open={show} onClose={this.handleClose}>
          <DialogTitle id='StudentSignOut-Title'>Aus Projekt ausschreiben
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Möchten Sie sich aus dem Projekt ausschreiben?
            </DialogContentText>
            <LoadingProgress show={deletingInProgress} />
            <ContextErrorMessage error={deletingError} contextErrorMsg={`Sie konnten sich nicht abmelden.`}
              onReload={this.deleteParticipation} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button variant='contained' onClick={this.deleteParticipation} color='primary'>
              Ausschreiben
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
StudentProjectSignOut.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** Student welcher für ein Projekt abgemeldet werden soll*/
    project: PropTypes.object.isRequired,

    /** Wenn true, wird der Dialog gerendert */
     show: PropTypes.bool.isRequired,

    /** Handler Funktion welche aufgerufen wird, wenn der Dialog geschlossen ist.*/
    onClose: PropTypes.func.isRequired,
  }
  
  export default withStyles(styles)(StudentProjectSignOut);
