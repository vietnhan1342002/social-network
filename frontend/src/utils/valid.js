const valid = ({ email, password, confirmPassword, fullname, username, gender }) => {
    const err = {};

    if (!fullname) {
        err.fullname = 'Please add fullname'
    } else if (fullname.length > 25) {
        err.fullname = 'length should be less than 25 characters'
    }

    if (!username) {
        err.username = "please add your username"
    } else if (username.replace(/ /g, '').length > 25) {
        err.username = "length should be less than 25 characters"
    }

    if (!email) {
        err.email = 'Please add email'
    } else if (!validateEmail(email)) {
        err.email = 'Invalid Email format'
    }

    if (!password) {
        err.password = 'Please add password'
    } else if (password.length < 6) {
        err.password = 'length should be greater than 6 characters'
    }

    if (confirmPassword !== password) {
        err.confirmPassword = "Password should be match"
    }

    return {
        errMsg: err,
        length: Object.keys(err).length
    }
}

function validateEmail(email) {
    // Regular expression for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export default valid;