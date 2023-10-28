import React from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function EditForm({ city, handleChange, handleSubmit }) {
  return (
    <div style={{background:"black"}}>
      <div>
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row>
        <Col>
        <Card style={{width:"80vh",backgroundColor:"royalblue"}}>
            <Card.Body>
            <h3 className="text-center my-4">Edit City</h3>
              <Form onSubmit={handleSubmit}>
              <Form.Group controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={city.location}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={city.description}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={city.email}
                      onChange={handleChange}
                      required
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
                      required
                    />
                  </Form.Group>
                  <br />
                  <Button variant="outline-success" type="submit">
                    <h3>&#128640;</h3>
                  </Button>
                  <Button style={{margin:"10px"}} variant="outline-danger" as={Link} to={"/"}>
                    <h3>&#10060;</h3>
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    </div>

  )
}

export default EditForm
