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

  // Function to convert timestamp strings to Date objects
  const parseDate = (timestampString) => {
    if (timestampString) {
      const timestamp = parseInt(timestampString, 10);
      return new Date(timestamp).toLocaleDateString('en-GB').split(',')[0];
    }
    return ''; 
  };

  return (
    <div>
      <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {Object.keys(data.cities[0]).filter((key) => key !== '__typename').map((key) => (
              <th key={key} style={{ border: '1px solid black' }}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.cities.map((city) => (
            <tr key={city.city_id}>
              {Object.keys(city).filter((key) => key !== '__typename').map((key) => (
                <td key={key} style={{ border: '1px solid black' }}>
                  {key === 'created_at' || key === 'updated_at' ? parseDate(city[key]) : city[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CityTable;
