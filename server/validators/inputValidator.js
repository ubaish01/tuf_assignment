
const inputValidator = (username, language, stdin, code) => {
    const validLanguages = ['c++', 'java', 'javascript', 'python'];
    if (!username || !language || !stdin || !code) return {
        valid: false,
        message: 'input fields missing!'
    }

    const isLanguageValid = validLanguages.includes(language.toLowerCase());
    if (!isLanguageValid) return {
        valid: false,
        message: `only ${validLanguages.join(' ')} are allowed!`
    }

    return {
        valid: true,
        message: null
    }

}

module.exports = { inputValidator }