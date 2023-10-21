import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import AddForm from "./AddForm";

const CREATE_CITY = gql`
  mutation CreateCity(
    $location: String
    $description: String
    $email: String
    $slackchannel: String
    $slackchannelid: String
    $updated_by: Int
  ) {
    createCity(
      location: $location
      description: $description
      email: $email
      slackchannel: $slackchannel
      slackchannelid: $slackchannelid
      updated_by: $updated_by
    ) {
      city_id
    }
  }
`;

function AddCity() {
  const [city, setCity] = useState({
    location: "",
    description: "",
    email: "",
    slackchannel: "",
    slackchannelid: "",
    updated_by: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setCity({
      ...city,
      [e.target.name]: e.target.value,
    });
  };

  const [createCity] = useMutation(CREATE_CITY);

  const handleSubmit = (e) => {
    e.preventDefault();

    createCity({
      variables: {
        ...city,
        updated_by: Number(city.updated_by),
      },
    });
    setCity({
      location: "",
      description: "",
      email: "",
      slackchannel: "",
      slackchannelid: "",
      updated_by: Number(""),
    });
    window.location.href = "/home";
  };

  return (
    <div>
       <AddForm city={city} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}

export default AddCity;
