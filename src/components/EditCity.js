import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import EditForm from "./EditForm";

function EditCity() {
  const { id } = useParams();

  const GET_CITY = gql`
    query GetCity($id: Int!) {
      city(id: $id) {
        city_id
        location
        description
        email
        slackchannel
        slackchannelid
        updated_by
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CITY, {
    variables: { id: Number(id) },
  });

  const [city, setCity] = useState({});

  useEffect(() => {
    if (data) {
      setCity({
        location: data.city.location,
        description: data.city.description,
        email: data.city.email,
        slackchannel: data.city.slackchannel,
        slackchannelid: data.city.slackchannelid,
        updated_by: data.city.updated_by,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setCity({
      ...city,
      [e.target.name]: e.target.value,
    });
  };

  const UPDATE_CITY = gql`
    mutation UpdateCity(
      $id: Int!
      $location: String
      $description: String
      $email: String
      $slackchannel: String
      $slackchannelid: String
      $updated_at: String
      $updated_by: Int
    ) {
      updateCity(
        id: $id
        location: $location
        description: $description
        email: $email
        slackchannel: $slackchannel
        slackchannelid: $slackchannelid
        updated_at: $updated_at
        updated_by: $updated_by
      ) {
        city_id
      }
    }
  `;

  const [updateCity] = useMutation(UPDATE_CITY);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert updated_by to a number
    const updated_by = Number(city.updated_by);
  
    // Check if updated_by is less than or equal to zero
    if (updated_by <= 0) {
      alert("Please enter a valid number for updated_by between 1 and 3");
      return; // Exit the function
    }
  
    try {
      // Send the updateCity mutation
      await updateCity({
        variables: {
          id: data.city.city_id,
          location: city.location,
          description: city.description,
          email: city.email,
          slackchannel: city.slackchannel,
          slackchannelid: city.slackchannelid,
          updated_at: new Date().toISOString().slice(0, 10),
          updated_by: updated_by,
        },
      });
      // Redirect to home
      window.location.href = "/home";
    } catch (error) {
      console.error("Error updating city: ", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <EditForm city={city} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}

export default EditCity;
