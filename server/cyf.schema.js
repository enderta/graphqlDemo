const { gql } = require('apollo-server-express');//import gql from apollo server express to create the schema



const typeDefs = gql`
type city{#city type
    city_id: Int!#city id is an integer and it is required
    location: String #location is a string and it is not required
    description: String #description is a string and it is not required
    email: String #email is a string and it is not required
    slackchannel: String #slackchannel is a string and it is not required
    slackchannelid: String #slackchannelid is a string and it is not required
    created_at: String #created_at is a string and it is not required default value is the current date
    updated_at: String #updated_at is a string and it is not required default value is the current date
    updated_by: Int #updated_by is an integer and it is not required
}
type Query {
    cities: [city] #return all cities
    city(id: Int!): city #return city by id
}
type Mutation { #create, update and delete city
    createCity( 
        location: String, #location is a string and it is not required
        description: String, #description is a string and it is not required
        email: String, #email is a string and it is not required
        slackchannel: String, #slackchannel is a string and it is not required
        slackchannelid: String, #slackchannelid is a string and it is not required
        updated_by: Int #updated_by is an integer and it is not required
    ): city
    updateCity(id: Int!,  #update city by id and return it using id as an argument and args as the body id is required
        location: String, #location is a string and it is not required
        description: String, #description is a string and it is not required
        email: String, #email is a string and it is not required
        slackchannel: String, #slackchannel is a string and it is not required
        slackchannelid: String, #slackchannelid is a string and it is not required
         updated_at: String, #updated_at is a string and it is not required default value is the current date
        updated_by: Int): city #updated_by is an integer and it is not required
    deleteCity(id: Int!): city #delete a city and return it using id as an argument
}
`;

module.exports = typeDefs;