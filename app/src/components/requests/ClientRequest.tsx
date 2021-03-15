import axios from "axios";
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import parseJSON from "date-fns/parseJSON";
import AlertDialog from "./AlertDialog";
import { AcceptedService } from "../../interfaces/services";
import Layout from "./Layout";
import { Request } from "../../interfaces/clients";

export class ClientRequest extends Component {
  state: any;
  constructor(props: any) {
    super(props);
    this.state = {
      clientRequests: [],
      isLoading: true,
      aceptedServices: [],
      conflictingDates: false,
      badRequest: false,
    };
  }

  componentDidMount() {
    this.fetchClientRequests();
  }
  fetchClientRequests() {
    const url = "http://localhost:4040/api/clients/requests";
    axios
      .get(url, {
        params: {
          skills: localStorage.getItem("selectedSkills"),
        },
      })
      .then(({ data }) => {
        const clientRequests: Request[] = data;
        this.setState({ clientRequests, isLoading: false });
      })
      .catch((err) => console.log({ err }));
  }

  bookService(request: Request, index: number) {
    const aceptedService: AcceptedService = {
      request: {
        ...request,
        startDate: parseJSON(request.startDate),
      },
      provider: {
        ...JSON.parse(localStorage.getItem("profile")!),
        skills: JSON.parse(localStorage.getItem("selectedSkills")!),
      },
    };

    const url = "http://localhost:4040/api/services";
    axios
      .post(url, aceptedService)
      .then(() => {
        this.setState({
          aceptedServices: this.state.aceptedServices.concat(index),
        });
      })
      .catch((err) => {
        if (err.response.status) {
          this.setState({
            conflictingDates: err.response.status === 409,
            badRequest: err.response.status === 400,
          });
        }
      });
  }

  render() {
    const {
      isLoading,
      aceptedServices,
      clientRequests,
      conflictingDates,
      badRequest,
    } = this.state as any;

    const handleBookedService = (request: Request, index: number) => {
      this.bookService(request, index);
    };

    const handleDeclinedService = (index: number) => {
      const list = clientRequests;
      list.splice(index, 1);
      this.setState({ clientRequests: list });
    };

    const handleDialogClosing = () => {
      this.setState({ conflictingDates: false });
    };

    const handleAlertClosing = () => {
      this.setState({ badRequest: false });
    };

    return (
      <React.Fragment>
        {!isLoading ? (
          <React.Fragment>
            {badRequest ? (
              <Alert onClose={handleAlertClosing} severity="error">
                Please check all fields!
              </Alert>
            ) : (
              ""
            )}
            <Layout
              clientRequests={clientRequests}
              aceptedServices={aceptedServices}
              onBookedService={handleBookedService}
              onDeclanedService={handleDeclinedService}
            />
            <AlertDialog
              open={conflictingDates}
              onClose={handleDialogClosing}
            />
          </React.Fragment>
        ) : (
          <Grid item xs={12}>
            <p>Loading...</p>
          </Grid>
        )}
      </React.Fragment>
    );
  }
}
