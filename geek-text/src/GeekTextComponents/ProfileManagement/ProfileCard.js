import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  card: {
    display: 'flex',
    height: 130,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    width: 250,
  },
  cover: {
    width: 80,
  },
});

function ProfileSettingsCard(props) {
  const { classes} = props;

  return (
     <Card className={classes.card}>
      <CardActionArea className={classes.card} onClick={props.event}>
        <CardMedia
              className={classes.cover}
            >{props.icon}</CardMedia>
          <div className={classes.details}>
              <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                  {props.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                  {props.subtitle}
              </Typography>
              </CardContent>
          </div>
          </CardActionArea>
      </Card>
  );
}

ProfileSettingsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProfileSettingsCard);