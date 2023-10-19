
const pool = require('./db.config');


class CityService{
    async getCities(){
        const result = await pool.query('SELECT * FROM city');
        return result.rows;
    }

    async getCityById(id){
        const result = await pool.query('SELECT * FROM city WHERE city_id = $1', [id]);
        return result.rows[0];
    }

    async createCity({location, description, email, slackchannel, slackchannelid, updated_by}){
        const result = await pool.query('INSERT INTO city (location, description, email, slackchannel, slackchannelid, updated_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [location, description, email, slackchannel, slackchannelid, updated_by]);
        return result.rows[0];
    }

    async updateCity(id, {location, description, email, slackchannel, slackchannelid, updated_by}){
        const result = await pool.query('UPDATE city SET location = $1, description = $2, email = $3, slackchannel = $4, slackchannelid = $5, updated_by = $6 WHERE city_id = $7 RETURNING *', [location, description, email, slackchannel, slackchannelid, updated_by, id]);
        return result.rows[0];
    }

    async deleteCity(id){
        const result = await pool.query('DELETE FROM city WHERE city_id = $1 RETURNING *', [id]);
        return result.rows[0];
    }


}

module.exports = new CityService();