import React, { Component } from 'react';
import { withStyles, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PropTypes from 'prop-types';


class ContextErrorMessage extends Component {
  /** StandardText welcher ausgegeben wird, wenn der ContextError erscheint */
  #standardText = 'This should not have happend. Soooo sorry...';


  /** Rendern der Komponente */
  render() {
    const { classes, error, contextErrorMsg, onReload } = this.props;

    return (
      (error !== null) ?
        <Alert severity='error' className={classes.root}>
          <div>
            {this.#standardText}
          </div>
          <AlertTitle>
            {contextErrorMsg}
          </AlertTitle>
          <div className={classes.margins}>
            Error message (for debugging only) is:
        </div>
          <div>
            {error.message}
          </div>
          {
            onReload ?
              <div className={classes.margins}>
                <Button variant='contained' color='primary' startIcon={<AutorenewIcon />} onClick={onReload}>
                  Reload
            </Button>
              </div>
              : null
          }
        </Alert>
        : null
    );
  }
}


/** Komponentenspezifisches Styeling */
const styles = theme => ({
  margins: {
    marginTop: theme.spacing(2)
  }
});

/** PropTypes */ 
ContextErrorMessage.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** 
   * Das Error-Objekt, welches die Fehlermeldung ansteuert; 
   * Wenn nicht null, wird die Fehlermeldung angezeigt */
  error: PropTypes.object,
  /** Eine kontextbezogene Fehlermeldung, die angezeigt werden soll */
  contextErrorMsg: PropTypes.string,
  /** 
   *Ein Reload-Handler für das onReload-Event, das eintritt, wenn der Reload-Button angeklickt wird. 
   * Bei Übergabe wird ein Reload-Button angezeigt.*/
  onReload: PropTypes.func
}



export default withStyles(styles)(ContextErrorMessage);
