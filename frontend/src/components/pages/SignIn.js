import React, {Component} from 'react';
import {Button, Grid, Typography, withStyles}from '@material-ui/core';

 
class SignIn extends Component {
  
  /** SignIn Funktion */
  handleSignInButtonClicked = () => {
		this.props.onSignIn();
  }


  /** Rendern der Komponente */
  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <Typography className={classes.root} align='center' variant='h6'>Willkommen zum HdManagement System!</Typography>
        <Typography className={classes.root} align='center'>Es scheint, als wären Sie nicht angemeldet.</Typography>
        <Typography className={classes.root} align='center'>Um den Service des Projektverwaltungssystems nutzen zu können, melden Sie sich über Google an.</Typography>
        <Grid container justify='center'>
          <Grid item>
            <Button variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
             Anmelden
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

