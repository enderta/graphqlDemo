const cyf= require('./cyf.service.js');

const resolvers = {

    Query: {
        cities: () => cyf.getCities(),//return all cities
        city: (parent, args) => cyf.getCityById(args.id),//return city by id parent means the parent object 
        //, args means the arguments passed to the query it is an id in this case
    },

    Mutation: {
        createCity: (parent, args) => cyf.createCity(args),//create a new city and return it using id as an argument
        updateCity: (parent, args) => cyf.updateCity(args.id, args),//update a city and return it using id as an argument and args as the body
        deleteCity: (parent, args) => cyf.deleteCity(args.id),//delete a city and return it using id as an argument
    },

};

module.exports = resolvers;