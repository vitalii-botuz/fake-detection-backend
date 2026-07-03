const validateUpdateUser = (user, res) => {
    const {
        username,
        password,
        status,
        first_name,
        last_name,
        age,
        gender,
        address,
    } = user;

    if (typeof username !== 'undefined' && username !== null && username.length > 64) {
        res.send("Invalid username");
        return false;
    }

    if (typeof password !== 'undefined' && password !== null && password.length > 64) {
        res.send("Invalid password");
        return false;
    }

    if (typeof status !== 'undefined' && status !== null && status.length > 5) {
        res.send("Invalid status");
        return false;
    }

    if (typeof first_name !== 'undefined' && first_name !== null && first_name.length > 30) {
        res.send("Invalid first name");
        return false;
    }

    if (typeof last_name !== 'undefined' && last_name !== null && last_name.length > 30) {
        res.send("Invalid last name");
        return false;
    }

    if (typeof age !== 'undefined' && age !== null && age <= 0) {
        res.send("Invalid age");
        return false;
    }

    if (typeof gender !== 'undefined' && gender !== null && gender.length !== 1) {
        res.send("Invalid gender");
        return false;
    }

    if (typeof address !== 'undefined' && address !== null && address.length > 64) {
        res.send("Invalid address");
        return false;
    }

    return true;
};

module.exports = {
    validateUpdateUser,
}