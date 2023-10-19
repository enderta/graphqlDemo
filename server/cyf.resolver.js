const cyf= require('./cyf.service.js');

const resolvers = {

    Query: {
        cities: () => cyf.getCities(),
        city: (parent, args) => cyf.getCityById(args.id),
    },

    Mutation: {
        createCity: (parent, args) => cyf.createCity(args),
        updateCity: (parent, args) => cyf.updateCity(args.id, args),
        deleteCity: (parent, args) => cyf.deleteCity(args.id),
    },

};

module.exports = resolvers;
