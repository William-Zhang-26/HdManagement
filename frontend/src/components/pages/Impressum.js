import React from 'react'
import { makeStyles, Paper, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  content: {
    margin: theme.spacing(1),
  }
}));


function Impressum() {

  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.content}>
        <Typography variant='h6'>
          HdManagement
        </Typography>
        <br />
        <Typography>
          Das HdManagement System ist ein Projektverwaltungssystem, welches im Rahmen der Lehrveranstaltung "SW-Praktikum" erstellt wurde.
        </Typography>
        <br />
        <Typography>
          Team Frontend: <Link href='https://github.com/LukasOrlando'>Lukas-Orlando Ulmer</Link>, 
          <Link href='https://github.com/Sania-Zeidan'> Sania Jasmin Zeidan</Link>,
          <Link href='https://github.com/RahelUen'> Rahel Ün</Link>
        </Typography>
        <Typography>
          Team Datenbank und Backend: <Link href='https://github.com/Tolga-Haybat'>Tolga Haybat</Link>,
          <Link href='https://github.com/mariaweinberger'> Maria Weinberger</Link>, 
          <Link href='https://github.com/William-Zhang-26'> William Zhang</Link>
        </Typography>
        <br />
        <Typography variant='body2'>
          © Hochschule der Medien WS 2020 / 2021, all rights reserved.
        </Typography>
      </div>
    </Paper>
  )
}

export default Impressum;