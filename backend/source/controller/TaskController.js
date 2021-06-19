const TaskModel = require('../model/TaskModel');

class TaskController {

    async create(request, response) {
        const task = new TaskModel(request.body);
        await task.save()
                .then(res => {
                    return response.status(200).json(res);
                })
                .catch(error => {
                    return response.status(500).json(error); 
                });
    }

    async update(request, response) {
        await TaskModel.findByIdAndUpdate({'_id': request.params.id}, request.body, {new: true})
            .then(res => {
                return response.status(200).json(res);
            })
            .catch(error => {
                return response.status(500).json(error); 
            });
    }

}

module.exports = new TaskController();