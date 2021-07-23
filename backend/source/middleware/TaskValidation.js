const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');

const TaskValidation = async (request, response, next) => {
    const {macAddress, title, description, when, isConcluded} = request.body;

    if (!macAddress) return response.status(400).json({error: 'macAddress is necessary'});
    else if (!title) return response.status(400).json({error: 'title is necessary'});
    else if (!when) return response.status(400).json({error: 'when is necessary'});
    else if (isPast(new Date(when))) return response.status(400).json({error: 'date or time has already been passed'});
    else next();
};

module.exports = TaskValidation;