import React from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {  Container } from "react-bootstrap";

function CityTable({ data, formatDate, handleDelete }) {
  
  return (
    <div>
      <Container fluid>
        <h3 style={{ margin: "10px" }}>
          <Button variant="outline-success" as={Link} to={"/addcity"}>
            <h6 style={{ margin: "10px" }}>&#10133;</h6>
          </Button>
        </h3>

        <h3 className="text-center my-4" style={{color:"green"}}>Cities</h3>
        <div className="d-flex justify-content-center">
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead >
                <tr  className="bg-primary">
                  {Object.keys(data.cities[0])
                    .filter((key) => key !== "__typename")
                    .map((key) => (
                      <th style={{color:"goldenrod"}} key={key}>{key}</th>
                    ))}
                  <th style={{color:"goldenrod"}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.cities.map((city, index) => (
                  <tr key={city.city_id}>
                    {Object.keys(city)
                      .filter((key) => key !== "__typename")
                      .map((key) => (
                        <td key={key}>
                          {key === "created_at" || key === "updated_at"
                            ? formatDate(city[key])
                            : city[key]}
                        </td>
                      ))}
                    <td>
                      <Button
                        variant="outline-primary"
                        style={{ margin: "0px 10px 0px 0px" }}
                        as={Link}
                        to={`/editcity/${city.city_id}`}
                      >
                        <h6>&#9999;&#65039;</h6>
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDelete(city.city_id)}
                      >
                        <h6>&#10060;</h6>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CityTable;
