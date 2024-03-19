const { errorHandler } = require("../error/error");
const { inputValidator } = require("../validators/inputValidator");
const { ExecuteCode, getExecutionResult } = require("../Judge/Judge");
const { connection } = require("../connection");

const controller = {

    insertData: async (req, res) => {

        // extracting data from request body
        const { username, language, stdin, code } = req.body;


        // input validation check
        const { valid, message } = inputValidator(username, language, stdin, code);
        if (!valid) return errorHandler(res, 400, message);

        const output = await ExecuteCode(code, stdin, language.toLowerCase());

        console.log({ output });

        if (!output || output.stderr) return errorHandler(res, 400, output?.stderr ? output.stderr : 'Syntax error or judge0 api limit exceeded');

        // sql query to insert data into table userCodes
        const query = `INSERT INTO data (username, language, stdin, code,stdout)
        VALUES (?, ?, ?, ?, ? )`;

        // execution of query
        
        await connection.promise().query(query, [username, language, stdin, code, output.stdout]);

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
            sql: `SELECT * FROM data ORDER BY created_at DESC LIMIT ?, ?`,
            values: [offset, limit]
        };

        const data = await connection.promise().query(query);

        const count = await connection.promise().query('SELECT COUNT(*) AS row_count FROM data;');

        // Returning data to the frontend application
        return res.status(200).json({ success: true, count: count[0][0]['row_count'], data: data[0] })
    },

    getCode: async (req, res) => {
        const id = JSON.parse(req.params.id);

        const query = {
            sql: `SELECT * FROM data WHERE id = ?`,
            values: [id]
        };

        const data = await connection.promise().query(query);

        return res.status(200).json({
            success: true,
            data: data[0][0]
        });
    }

}

module.exports = controller;