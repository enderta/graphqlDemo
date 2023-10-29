import React from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";

function CityTable({ data, formatDate, handleDelete }) {
  const [search, setSearch] = React.useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // eslint-disable-next-line array-callback-return
  const filteredData = data.cities.filter((city) => {
    if (search === "") {
      return city;
    } else if (
      (city.location &&
        city.location.toLowerCase().includes(search.toLowerCase())) ||
      (city.description &&
        city.description.toLowerCase().includes(search.toLowerCase())) ||
      (city.email && city.email.toLowerCase().includes(search.toLowerCase())) ||
      (city.slackchannel &&
        city.slackchannel.toLowerCase().includes(search.toLowerCase())) ||
      (city.slackchannelid &&
        city.slackchannelid.toLowerCase().includes(search.toLowerCase())) ||
      (city.created_at &&
        city.created_at.toLowerCase().includes(search.toLowerCase())) ||
      (city.updated_at &&
        city.updated_at.toLowerCase().includes(search.toLowerCase())) ||
      (city.updated_by &&
        city.updated_by.toLowerCase().includes(search.toLowerCase()))
    ) {
      return city;
    }
  });

  function highlightSearchTerm(text, searchTerm) {
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return (
      <span>
        {" "}
        {parts.map((part, i) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={i} className="highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}{" "}
      </span>
    );
  }

  return (
    <div  >
      <Container  >
        <br/>
        <h3 >
          <Button variant="outline-warning" as={Link} to={"/addcity"} style={{position:"fixed"}}>
            <h6 style={{ margin: "10px" }}>&#10133;</h6>
          </Button>
        </h3>
        <div className="d-flex justify-content-center">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={search}
              onChange={handleSearch}
              placeholder="Search"
              
            />
          </div>
        </div>

        <h3 className="text-center my-4" style={{ color: "green" }}>
          Cities
        </h3>
        <div className="d-flex justify-content-center">
          <div className="table-responsive">
            <Table striped bordered hover responsive >
              <thead>
                <tr className="bg-primary">
                  {Object.keys(data.cities[0])
                    .filter((key) => key !== "__typename")
                    .map((key) => (
                      <th style={{ color: "palevioletred" }} key={key}>
                        {key}
                      </th>
                    ))}
                  <th style={{ color: "palevioletred" }}>actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((city, index) => (
                  <tr key={city.city_id}>
                    {Object.keys(city)
                      .filter((key) => key !== "__typename")
                      .map((key) => (
                        <td key={key}>
                          {key === "created_at" || key === "updated_at"
                            ? formatDate(city[key])
                            : city[key]
                            ? highlightSearchTerm(city[key].toString(), search)
                            : ""}
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
                        <h6>&#128465;&#65039;</h6>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>{" "}
            </Table>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CityTable;
