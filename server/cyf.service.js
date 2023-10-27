
const pool = require('./db.config'); //import pool from db.config to connect to the database


class CityService{ //create a class called CityService to handle all the queries to the database
    async getCities(){//return all cities
        const result = await pool.query('SELECT * FROM city'); 
        return result.rows;
    }

    async getCityById(id){ //return city by id
        const result = await pool.query('SELECT * FROM city WHERE city_id = $1', [id]);
        return result.rows[0];
    }

    async createCity({location, description, email, slackchannel, slackchannelid, updated_by}){ //create a new city and return it using id as an argument
        const result = await pool.query('INSERT INTO city (location, description, email, slackchannel, slackchannelid, updated_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [location, description, email, slackchannel, slackchannelid, updated_by]);
        return result.rows[0];
    }

    async updateCity(id, {location, description, email, slackchannel, slackchannelid,updated_at, updated_by}){ //update a city and return it using id as an argument and args as the body
        const result = await pool.query('UPDATE city SET location = $1, description = $2, email = $3, slackchannel = $4, slackchannelid = $5,updated_at = $6, updated_by = $7 WHERE city_id = $8 RETURNING *', [location, description, email, slackchannel, slackchannelid, updated_at, updated_by, id]);
        return result.rows[0];
    }

    async deleteCity(id){ //delete a city and return it using id as an argument
        const result = await pool.query('DELETE FROM city WHERE city_id = $1 RETURNING *', [id]);
        return result.rows[0];
    }


}

module.exports = new CityService();