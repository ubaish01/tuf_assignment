const { errorHandler } = require("../error/error");
const connection = require('../connection/connection');
const { inputValidator } = require("../validators/inputValidator");

const controller = {

    insertData: async (req, res) => {
        // extracting data from request body
        const { username, language, stdin, code } = req.body;

        // input validation check
        const { valid, message } = inputValidator(username, language, stdin, code);
        if (!valid) return errorHandler(res, 400, message);

        // sql query to insert data into table userCodes
        const query = `INSERT INTO data (username, language, stdin, code)
        VALUES (?, ?, ?, ?)`;

        // execution of query
        await connection.promise().query(query, [username, language, stdin, code]);

        // returning response
        return res.status(200).json({ success: true, message: "Data saved successfully" })

    },

    getData: async (req, res) => {
        // extracting page and limit for pagination from query
        let { page, limit } = req.query;

        // assigning default values if not exist any of the value 
        if (!page) page = 1;
        else page = JSON.parse(page);
        if (!limit) limit = 20;
        else limit = JSON.parse(limit);
        const offset = (page - 1) * limit;

        // sql query to get data from the table
        const query = {
            sql: `SELECT * FROM data ORDER BY id LIMIT ?, ?`,
            values: [offset, limit]
        };

        const data = await connection.promise().query(query);

        // Returning data to the frontend application
        return res.status(200).json({ success: true, data: data[0] })
    }

}

module.exports = controller;