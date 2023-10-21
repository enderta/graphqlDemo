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
    updated_by: Int
}
type Query {
    cities: [city]
    city(id: Int!): city
}
type Mutation {
    createCity(
        location: String,
        description: String,
        email: String,
        slackchannel: String,
        slackchannelid: String,
        updated_by: Int
    ): city
    updateCity(id: Int!, 
        location: String,
        description: String,
        email: String,
        slackchannel: String,
        slackchannelid: String,
         updated_at: String,
        updated_by: Int): city
    deleteCity(id: Int!): city
}
`;

module.exports = typeDefs;