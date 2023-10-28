import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.css";
import Table from "./Table";
import { Container } from "react-bootstrap";

const GET_CITIES = gql`
  query GetCities {
    cities {
      city_id
      location
      description
      email
      slackchannel
      slackchannelid
      created_at
      updated_at
      updated_by
    }
  }
`;

const DELETE_CITY = gql`
  mutation DeleteCity($id: Int!) {
    deleteCity(id: $id) {
      city_id
    }
  }
`;

export default function Cities() {
  const { loading, error, data, refetch } = useQuery(GET_CITIES);
  const [deleteCity] = useMutation(DELETE_CITY);


  const handleDelete = async (id) => {
    await deleteCity({ variables: { id } });
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const formatDate = (timestampString) => {
    if (timestampString) {
      const timestamp = parseInt(timestampString, 10);
      return new Date(timestamp).toLocaleDateString("en-GB");
    }
    return "";
  };





  return (
    <div style={{backgroundColor:"black"}}>
      <Container  className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh"}}>
      <Table  data={data} formatDate={formatDate} handleDelete={handleDelete} />
      </Container>
    </div>
  );
}
