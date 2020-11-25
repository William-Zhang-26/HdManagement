import React, {Component} from 'react';
import {Button, Grid, Typography, withStyles}from '@material-ui/core';

 
class SignIn extends Component {
  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <Typography className={classes.root} align='center' variant='h6'>Welcome to the HdM React/Python Project Showcase</Typography>
        <Typography className={classes.root} align='center'>It appears, that you are not signed in.</Typography>
        <Typography className={classes.root} align='center'>To use the services of the HdM Bank please</Typography>
        <Grid container justify='center'>
          <Grid item>
            <Button variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
              Sign in with Google
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}


const styles = theme => ({
	root: {
		margin: theme.spacing(2)
	}
});


export default withStyles(styles)(SignIn)







/*

class SignIn extends Component{

    render() {

        return (
            <div>
                <Button variant="contained" color="primary">
                    Hello World
                </Button>
            
            </div>
        );

    }

}

export default (SignIn)






function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}
 
ReactDOM.render(<App />, document.querySelector('#app'));
*/

