import React from "react";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:ahmadaziz4828@gmail.com">
        <Button>Contact: ahmadaziz4828@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;