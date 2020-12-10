import React, { Component } from 'react';
import { withStyles, LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types';


class LoadingProgress extends Component {


  render() {
    const { classes, show } = this.props;

    return (
      show ?
        <div className={classes.root}>
          <LinearProgress color='secondary' />
        </div>
        : null
    );
  }
}


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
  }
});

/** PropTypes */
LoadingProgress.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** If true, the loading progress is rendered */
  show: PropTypes.bool.isRequired,
}


export default withStyles(styles)(LoadingProgress);
