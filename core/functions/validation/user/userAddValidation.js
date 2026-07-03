const validateAddUser = (user, res) => {
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

    if (typeof username !== 'string' || username.length > 64) {
        res.send("Invalid username");
        return false;
    }

    if (typeof password !== 'string' || password.length > 64) {
        res.send("Invalid password");
        return false;
    }

    if (typeof status !== 'string' || status.length > 5) {
        res.send("Invalid status");
        return false;
    }

    if (typeof first_name !== 'string' || first_name.length > 30) {
        res.send("Invalid first name");
        return false;
    }

    if (typeof last_name !== 'string' || last_name.length > 30) {
        res.send("Invalid last name");
        return false;
    }

    if (typeof age !== 'number' || age <= 0) {
        res.send("Invalid age");
        return false;
    }

    if (typeof gender !== 'string' || gender.length !== 1) {
        res.send("Invalid gender");
        return false;
    }

    if (typeof address !== 'string' || address.length > 64) {
        res.send("Invalid address");
        return false;
    }

    return true;
};

module.exports = {
    validateAddUser,
}