
export const validate = (username: string, stdin: string, language: any, code: string, setErrors: any) => {

    let errors = {
        username: '',
        stdin: '',
        language: '',
        code: ''
    }
    let isValid = true;

    if (!username) {
        errors.username = 'username is required!';
        isValid = false;
    }

    if (!stdin) {
        errors.stdin = 'stdin is required!';
        isValid = false;
    }

    if (!language) {
        errors.language = 'language is required!';
        isValid = false;
    }

    if (!code) {
        errors.code = 'code is required!';
        isValid = false;
    }


    setErrors(errors);
    return isValid;

}