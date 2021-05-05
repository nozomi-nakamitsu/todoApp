import React from 'react';
import './App.css';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
type Props={
  alert: string,
  message: string,
  AlertResetFunc: Function

}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);
export interface Item {
  id: number
  text: string
}
const AlertComponent: React.FC<Props> = props =>  {
  const classes = useStyles();

  return (
  <div className={classes.root}>
    {
    props.alert=="error"?  <Alert severity="error"
    action={
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() =>props.AlertResetFunc()}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    }>
      {props.message}
    </Alert>:null
    }
    {
    props.alert=="success"?  <Alert severity="success"
    action={
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() =>props.AlertResetFunc()}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    }>
      {props.message}
    </Alert>:null
    }
  </div>


  );
}



export default AlertComponent;