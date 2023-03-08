import {
  Container,
  Box,
  Button,
  Typography,
  CssBaseline,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import React, { Component } from "react";
import { BASE_URL } from "../constants/Variables";
import axios from 'axios';
import Spinner from "../constants/Spinner";


function getVaccineCenter() {
  return [
    { name: "None", id: 0 },
    { name: "Bukit Batok CC", id: 1 },
    { name: "Bukit Panjang CC", id: 2 },
    { name: "Bukit Timah CC", id: 3 },
    { name: "Outram Park Polyclinic", id: 4 },
  ];
}


export class EditVaccineRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: {
        nric: "",
        name: "",
        center: 0,
        slot: new Date(),
      },
      loading: false,
      error: false,
      info: {}
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDateChange(value) {
    this.setState(prevState => ({
      reservation: {
        ...prevState.reservation,
        slot: value.$d
      }
    }))
  }
  handleChange(event) {
    const key = event.target.name;
    const val = event.target.value;
    this.setState(prevState => ({
      reservation: {
        ...prevState.reservation,
        [key]: val
      }
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const state = this.state;
    this.setState({ ...state, loading: true, info: {}, error: false });
    // console.log(this.props.match);
    // console.log(this.state);
    const data = this.state.reservation
    axios.put(`${BASE_URL}/update-reservation/${this.props.match.params.bookingId}`, data)
      .then(res => {
        this.setState({ ...state, loading: false, info: res.data });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ ...state, loading: false, error: true, info: { messase: "failed!" } });
      })
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/reservation-list/${this.props.match.params.bookingId}`)
      .then(res => {
        const state = this.state;
        this.setState({ ...state, reservation: res.data });
      })
      .catch((err) => {
        console.log(err);
      })
  }
  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Box
            component="form"
            onSubmit={this.handleSubmit}
            sx={{
              mt: 8,
            }}
          >
            <Typography component="h1" variant="h5">
              Book a slot
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nric"
              label="NRIC Number"
              name="nric"
              onChange={this.handleChange}
              autoComplete="nric"
              value={this.state.reservation.nric}
              sx={{ mb: 2 }}
              autoFocus
            />
            <TextField
              required
              fullWidth
              id="name"
              label="Full Name"
              value={this.state.reservation.name}
              sx={{ mb: 2 }}
              name="name"
              onChange={this.handleChange}
              autoComplete="name"
            />
            <InputLabel id="vaccineCenterLabel">Vaccine Center</InputLabel>
            <Select
              labelId="vaccineCenterLabel"
              label="Vaccine Center"
              required
              fullWidth
              id="vaccineCenter"
              name="center"
              value={this.state.reservation.center}
              onChange={this.handleSelect}
              sx={{ mb: 2 }}
            >
              {getVaccineCenter().map((v) => {
                return (
                  <MenuItem key={v.id} value={v.id}>
                    {v.name}
                  </MenuItem>
                );
              })}
            </Select>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Slot"
              value={this.state.reservation.slot}
              onChange={this.handleDateChange}
              required
            />
            {this.state.loading && <Spinner
              stl={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }} />}
            {this.state.info &&
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: this.state.error ? "#ab003c" : "#00adb5"
                }}
              >
                {this.state.info.messase}
              </Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update!
            </Button>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}
