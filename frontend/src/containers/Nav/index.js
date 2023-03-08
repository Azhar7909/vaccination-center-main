import { Link } from 'react-router-dom';
import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import LinkTab from "@mui/material/Tab";

export const NavBar = (props) => {
  const [value, setValue] = React.useState(Number);
  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  useEffect(() => {
    if (window.location.pathname === "/") {
      setValue(0);
    } else {
      setValue(1);
    }
  }, [])

  return (
    <Tabs value={value} onChange={handleChange} centered>
      <LinkTab component={Link} to="/" label="Make a Booking" />
      <LinkTab component={Link} to="/bookings" label="All Booking" />
    </Tabs>
  );
};