import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, List, ListItem, Box } from '@material-ui/core';
//import { Button, ButtonGroup } from '@material-ui/core';
//import ProjectAttributeList from './ProjectAttributeList';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

class ProjectAttributeListEntry extends Component {

    constructor(props) {
        super(props);
    
        // Init the state
        this.state = {
          project: props.project,
          loadingInProgress: false,
          loadingError: null,
        };
      }

      
    /** Renders the component */
    render() {
        const { classes } = this.props;
        // Use the states customer
        const { project, loadingInProgress, loadingError } = this.state;

        // console.log(this.props);
        return (
        <div className={classes.root}>
            <List className={classes.attributeList}>
                <ListItem>
                    <Typography>
                      Kapazität: {project.getCapacity()}
                    </Typography>
                </ListItem>
                <ListItem>
                <Typography>
                      Externe Partner: {project.getPartners()}
                    </Typography>
                </ListItem>
                <ListItem>
                    <Box color='textSecondary'> Weitere Attribute </Box>
                    <Typography>
                      Weitere Attribute: lul
                    </Typography>
                </ListItem>
                <ListItem>
                    <LoadingProgress show={loadingInProgress} />
                    <ContextErrorMessage error={loadingError} contextErrorMsg={`List of attributes for project ${project.getID()} could not be loaded.`} onReload={this.getAttributes} />
                </ListItem>
            </List>
        </div>
        );
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
      width: '100%'
    }, 
    buttonMargin: {
      marginRight: theme.spacing(2),
    },
    accountEntry: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    }
  });


export default withStyles(styles)(ProjectAttributeListEntry);

