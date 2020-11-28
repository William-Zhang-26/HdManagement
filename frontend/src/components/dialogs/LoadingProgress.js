import React, { Component } from 'react';
import { withStyles, LinearProgress } from '@material-ui/core';


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


export default withStyles(styles)(LoadingProgress);
