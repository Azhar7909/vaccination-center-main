import {
  Table,
  Box,
  Button,
  CssBaseline,
  Typography,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Container,
} from "@mui/material";
import { Link } from 'react-router-dom';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { Component } from "react";
import { BASE_URL } from '../constants/Variables';
import axios from 'axios';
import Spinner from "../constants/Spinner";

function getVaccineCenter(id) {
  const vac = [
    { name: "None", id: 0 },
    { name: "Bukit Batok CC", id: 1 },
    { name: "Bukit Panjang CC", id: 2 },
    { name: "Bukit Timah CC", id: 3 },
    { name: "Outram Park Polyclinic", id: 4 },
  ]
  var result = vac.find(item => item.id === id);
  return result.name
}
export class VaccineRegistrationListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      loading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (id) => {
    // console.log(id);
    axios.delete(`${BASE_URL}/delete-reservation/${id}`)
      .then(res => {
        // console.log(res);
        // console.log(res.data);
        const reserv = this.state.reservations.filter(r => r._id !== res.data.detail._id);
        this.setState({ reservations: reserv });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/reservation-list`)
      .then(res => {
        const reserv = res.data;
        this.setState({ loading: false });
        this.setState({ reservations: reserv });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      })
  }
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          {this.state.loading ? <Spinner
            stl={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          /> : this.state.reservations.length !== 0 ?
            <Box sx={{ mt: 8 }}>
              <Typography component="h1" variant="h5">
                Active Booking
              </Typography>
              <TableContainer component={Box}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="left">Center Name</TableCell>
                      <TableCell align="left">Start Time</TableCell>
                      <TableCell align="left">&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.reservations.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{getVaccineCenter(row.center)}</TableCell>
                        <TableCell align="left">
                          {row.slot}
                        </TableCell>
                        <TableCell align="left">
                          <Button component={Link} to={`/bookings/${row._id}`}>
                            <ModeEditIcon />
                          </Button>
                          <Button onClick={() => this.handleSubmit(row._id)}>
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box> :
            <Typography
              component="h1"
              variant="h5"
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: "#ab003c"
              }}
            >
              Active booking not found!
            </Typography>
          }
        </Container>
      </React.Fragment>
    );
  }
}
