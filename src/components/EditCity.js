import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";

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

    try {
      await updateCity({
        variables: {
          id: data.city.city_id,
          location: city.location,
          description: city.description,
          email: city.email,
          slackchannel: city.slackchannel,
          slackchannelid: city.slackchannelid,
          updated_at: new Date().toISOString().slice(0, 10),
          updated_by: city.updated_by,
        },
      });
      window.location.href = "/home";
    } catch (error) {
      console.error("Error updating city: ", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h3>Edit City</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={city.location}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={city.description}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={city.email}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="slackchannel">
                    <Form.Label>Slack Channel</Form.Label>
                    <Form.Control
                      type="text"
                      name="slackchannel"
                      value={city.slackchannel}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="slackchannelid">
                    <Form.Label>Slack Channel ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="slackchannelid"
                      value={city.slackchannelid}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="updated_by">
                    <Form.Label>Updated By</Form.Label>
                    <Form.Control
                      type="number"
                      name="updated_by"
                      value={city.updated_by}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <br />
                  <Button variant="outline-success" type="submit">
                    <h3>&#128640;</h3>
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EditCity;
