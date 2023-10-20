import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

function AddCity() {
  const [city, setCity] = useState({
    location: '',
    description: '',
    email: '',
    slackchannel: '',
    slackchannelid: '',
    updated_by: ''
  });

  const handleChange = (e) => {
    setCity({
      ...city,
      [e.target.name]: e.target.value,
    });
  }

  const CREATE_CITY = gql`
    mutation CreateCity($input: cityInput!) {
      createCity(input: $input) {
        city_id
      }
    }
  `;

  const [createCity] = useMutation(CREATE_CITY);

  const handleSubmit = (e) => {
    e.preventDefault();

    createCity({
      variables: {
        input: {
          location: city.location,
          description: city.description,
          email: city.email,
          slackchannel: city.slackchannel,
          slackchannelid: city.slackchannelid,
          updated_by: city.updated_by
        }
      }
    });
    window.location.href = "/cities";
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="location" value={city.location} onChange={handleChange} />
        <input type="text" name="description" value={city.description} onChange={handleChange} />
        <input type="email" name="email" value={city.email} onChange={handleChange} />
        <input type="text" name="slackchannel" value={city.slackchannel} onChange={handleChange} />
        <input type="text" name="slackchannelid" value={city.slackchannelid} onChange={handleChange} />
        <input type="text" name="updated_by" value={city.updated_by} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddCity;