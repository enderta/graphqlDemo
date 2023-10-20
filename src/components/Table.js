import React from "react";
import { Link } from "react-router-dom";

function Table(props) {
  const { data, formatDate, delete: handleDelete } = props;

  return (
    <div>
      <h4 style={{ margin: "10px" }}>
        <Link className="btn btn-success" to={"/addcity"}>
          Add City
        </Link>
      </h4>
      <h4 className="text-center my-4">Cities</h4>
      <div className="d-flex justify-content-center">
        <div className="table-responsive">
          <table className="table table-hover table-bordered table-striped">
            <thead>
              <tr className="bg-primary">
                {Object.keys(data.cities[0])
                  .filter((key) => key !== "__typename")
                  .map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                <th>Actions</th>
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
                    <Link
                      className="btn btn-primary"
                      to={ `/editcity/${city.city_id}` }
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(city.city_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
