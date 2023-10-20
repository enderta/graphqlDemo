const { gql } = require('apollo-server-express');

const typeDefs = gql`
type city{
    city_id: Int!
    location: String
    description: String
    email: String
    slackchannel: String
    slackchannelid: String
    created_at: String
    updated_at: String
    updated_by: String

}
type Query {
    cities: [city]
    city(id: Int!): city
}
type Mutation {
    createCity(input: cityInput!): city
    updateCity(id: Int!, input: cityInput): city
    deleteCity(id: Int!): city
}
input cityInput {
    location: String
    description: String
    email: String
    slackchannel: String
    slackchannelid: String
    updated_by: String
}
`;

module.exports = typeDefs;



