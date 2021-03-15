import React from "react";
import format from "date-fns/format";
import parseJSON from "date-fns/parseJSON";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { green } from "@material-ui/core/colors";
import { Request } from "../../interfaces/clients";
import { Skill } from "../../interfaces/skills";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  inline: {
    display: "inline",
  },
  buttonGroup: {
    padding: theme.spacing(1, 0),
  },
}));

export default function Layout(props: any) {
  const {
    clientRequests,
    aceptedServices,
    onBookedService,
    onDeclanedService,
  } = props;
  const classes = useStyles();

  const bookService = (request: Request, index: number) => {
    onBookedService(request, index);
  };

  const declineService = (index: number) => onDeclanedService(index);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Client requests
      </Typography>
      <List disablePadding>
        {clientRequests.map((request: Request, index: number) => (
          <React.Fragment>
            <ListItem className={classes.listItem} key={index}>
              <ListItemText
                primary={request.client.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      display="inline"
                      color="textPrimary"
                    >
                      {request.skills.map((skill: Skill, index: number) => (
                        <React.Fragment>
                          <Typography
                            variant="button"
                            display="inline"
                            gutterBottom
                            color="primary"
                          >
                            {skill.name.toUpperCase()}
                          </Typography>
                          <Typography
                            variant="caption"
                            display="inline"
                            gutterBottom
                            color="secondary"
                          >
                            {` (${skill.level.name}) `}
                          </Typography>
                          {index === request.skills.length - 1 ? "" : " — "}
                        </React.Fragment>
                      ))}
                    </Typography>
                    {`| ${request.description}`}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Grid container alignItems="center">
              <Grid sm={12} container alignItems="stretch">
                <DateRangeIcon fontSize="small" />
                <Typography gutterBottom variant="caption" display="inline">
                  {format(parseJSON(request.startDate), "MMMM d, yyyy")}
                </Typography>
                {" — "}
                <Typography gutterBottom variant="caption" display="inline">
                  {format(parseJSON(request.endDate), "MMMM d, yyyy")}
                </Typography>
              </Grid>
              <Grid sm={12}>
                {aceptedServices.includes(index) ? (
                  <Grid container alignContent="flex-end">
                    <CheckIcon style={{ color: green[500] }} />
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      display="inline"
                    >
                      {" "}
                      Accepted service
                    </Typography>
                  </Grid>
                ) : (
                  <ButtonGroup
                    color="primary"
                    size="small"
                    className={classes.buttonGroup}
                  >
                    <Button
                      onClick={() => declineService(index)}
                      color="default"
                    >
                      Decline
                    </Button>
                    <Button onClick={() => bookService(request, index)}>
                      Accept
                    </Button>
                  </ButtonGroup>
                )}
              </Grid>
            </Grid>
          </React.Fragment>
        ))}
      </List>
    </React.Fragment>
  );
}
