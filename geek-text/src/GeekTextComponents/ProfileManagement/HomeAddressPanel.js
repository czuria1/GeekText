import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography component="p" style={{fontWeight: 'bold'}}>
          {props.name}
        </Typography>
        <Typography component="p">
          {props.address} {props.address_2}, {props.city}, {props.state} {props.zip_code}
        </Typography>
        <Typography component="p">
          {props.country}
        </Typography>
        <Typography component="p">
          Phone Number: {props.phone} 
        </Typography>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
