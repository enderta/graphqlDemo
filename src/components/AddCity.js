import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';

const CREATE_CITY = gql`
  mutation CreateCity(
    $location: String,
    $description: String,
    $email: String,
    $slackchannel: String,
    $slackchannelid: String,
    $updated_by: Int
  ) {
    createCity(
      location: $location,
      description: $description,
      email: $email,
      slackchannel: $slackchannel,
      slackchannelid: $slackchannelid,
      updated_by: $updated_by
    ) {
      city_id
    }
  }
`;

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
    e.preventDefault();
    setCity({
      ...city,
      [e.target.name]: e.target.value,
    });
  }

  const [createCity] = useMutation(CREATE_CITY);

  const handleSubmit = (e) => {
    e.preventDefault();

    createCity({
      variables: {
        ...city,
        updated_by: Number(city.updated_by)
      }
    });
    setCity({
      location: '',
      description: '',
      email: '',
      slackchannel: '',
      slackchannelid: '',
      updated_by: Number('')
    });
    window.location.href = '/home';
  }

  return (
    <div>
   
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <Row>
      <Col>
        <Card>
          <Card.Body >
             <h3>Add City</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" name="location" value={city.location} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" name="description" value={city.description} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={city.email} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="slackchannel">
                  <Form.Label>Slack Channel</Form.Label>
                  <Form.Control type="text" name="slackchannel" value={city.slackchannel} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="slackchannelid">
                  <Form.Label>Slack Channel ID</Form.Label>
                  <Form.Control type="text" name="slackchannelid" value={city.slackchannelid} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="updated_by">
                  <Form.Label>Updated By</Form.Label>
                  <Form.Control type="text" name="updated_by" value={Number(city.updated_by)} onChange={handleChange} />
                </Form.Group>
                <br />
                <Button variant="outline-success" type="submit">
                  <h3>
                  &#128640;

                  </h3>
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

export default AddCity;
