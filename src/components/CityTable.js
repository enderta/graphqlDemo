import React from 'react';
import { gql, useQuery } from '@apollo/client';

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

function CityTable() {
  const { loading, error, data } = useQuery(GET_CITIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // Function to format timestamp strings as "dd/mm/yyyy" (day/month/year)
  const formatDate = (timestampString) => {
    if (timestampString) {
      const timestamp = parseInt(timestampString, 10);
      return new Date(timestamp).toLocaleDateString('en-GB'); // Use 'en-GB' for dd/mm/yyyy format
    }
    return ''; // Handle cases where the timestampString is null or undefined
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8"> {/* Adjust the col size */}
          <h4 className="text-center my-4">Cities</h4>

          <table className="table table-bordered table-sm"> {/* Apply 'table-sm' class for a smaller table */}
            <thead>
              <tr>
                {Object.keys(data.cities[0])
                  .filter((key) => key !== "__typename")
                  .map((key) => (
                    <th key={key}>{key}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data.cities.map((city) => (
                <tr key={city.city_id}>
                  {Object.keys(city)
                    .filter((key) => key !== "__typename")
                    .map((key) => (
                      <td key={key} style={{ border: "1px solid black" }}>
                        {key === "created_at" || key === "updated_at"
                          ? formatDate(city[key])
                          : city[key]}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CityTable;
