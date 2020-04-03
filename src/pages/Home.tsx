
import React, { Component } from 'react';
import { createStyles, WithStyles, withStyles} from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
export interface HomeStates {}
const styles = (theme: Theme) =>
    createStyles({
      icon: {
        marginRight: theme.spacing(2),
      },
      heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(10, 0, 10, 0),
        width: "60%",
        marginTop: "3%",
        marginLeft: "35%"
        
      },
      heroButtons: {
        marginTop: theme.spacing(4),
      },
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        marginLeft: "30%"
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
      footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
      },
    });
export interface HomeProps extends WithStyles<typeof styles> {}

class Home extends Component<HomeProps>{

  render() {  
    const {classes} = this.props;
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <React.Fragment>
          <CssBaseline />
          <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
              <Container  >
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                  Album layout
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                  Something short and leading about the collection below—its contents, the creator, etc.
                  Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                  entirely.
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button variant="contained" color="primary">
                        Main call to action
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color="primary">
                        Secondary action
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {cards.map((card) => (
                  <Grid item key={card} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image="https://source.unsplash.com/random"
                        title="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Heading
                        </Typography>
                        <Typography>
                          This is a media card. You can use this section to describe the content.
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          View
                        </Button>
                        <Button size="small" color="primary">
                          Edit
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Home);