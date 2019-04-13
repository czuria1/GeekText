import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  card: {
    maxWidth: 345,
    height: 181,
  },
  media: {
    height: 140,
  },
};

function MediaCard(props) {

  function isHomeAddress () {
    if (!props.isHomeAddress) {
      return (
        <Button size="small" color="primary" onClick={props.setHomeAddress}>
          Set as home address
        </Button>
      ) 
    }
  }

  const { classes } = props;
  return (
    <Card className={classes.card}>
        <CardContent>
          <Typography component="p" style={{fontWeight: 'bold'}}>
            {props.name}
          </Typography>
          <Typography component="p">
            {props.address}
          </Typography>
          <Typography component="p">
            {props.address_2}
          </Typography>
          <Typography component="p">
            {props.city}, {props.state} {props.zip_code}
          </Typography>
          <Typography component="p">
            {props.country}
          </Typography>
          <Typography component="p">
            Phone Number: {props.phoneNum}
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={props.editAddress}>
          Edit
        </Button>
        <Button size="small" color="primary" onClick={props.removeAddress}>
          Delete
        </Button>
        <div>
        {isHomeAddress()} 
        </div>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);