const axios = require('axios');
const { LANGUAGE_ID } = require('../constants');


const ExecuteCode = async (code, input, language) => {
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
            base64_encoded: 'false',
            fields: '*'
        },
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': process.env.JUDGE_API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
            language_id: LANGUAGE_ID[language],
            source_code: code,
            stdin: input
        }
    };

    try {
        const response = await axios.request(options);
        const token = response.data;
        const result = await getExecutionResult(token.token);
        return result;
    } catch (error) {
        console.log(error);
        console.log('judge.js');
    }
}

const getExecutionResult = async (token) => {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}`
    const headers = {
        'X-RapidAPI-Key': process.env.JUDGE_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json'
    }

    try {
        const response = await axios.get(url, { headers: headers });
        // console.log(response);

        return response.data;
    } catch (error) {
        console.log(error.message);
        console.log('judge.js 2');
    }
}

module.exports = { ExecuteCode, getExecutionResult }