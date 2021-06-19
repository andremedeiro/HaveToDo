const TaskModel = require('../model/TaskModel');

const MacValidation = async (request, response, next) => {
    const macAddress = request.body.macAddress;

    if (!macAddress) return response.status(400).json({error: 'macAddress is necessary'});
    else next();
};

module.exports = MacValidation;