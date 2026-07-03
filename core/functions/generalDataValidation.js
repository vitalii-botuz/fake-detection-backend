const generalDataValidation = (params, requiredFields) => {
    for (const field of requiredFields) {
        if (!params[field]) {
            return false;
        }
    }
    return true;
};

module.exports = {
    generalDataValidation,
}