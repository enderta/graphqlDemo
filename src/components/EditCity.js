import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

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
        updated_by: data.city.updated_by
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setCity({
      ...city,
      [e.target.name]: e.target.value,
    });
  }

  const UPDATE_CITY = gql`
    mutation UpdateCity($id: Int!, $input: cityInput!) {
      updateCity(id: $id, input: $input) {
        city_id
      }
    }
  `;

  const [updateCity] = useMutation(UPDATE_CITY);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateCity({
      variables: {
        id: data.city.city_id,
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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

export default EditCity;