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

    async all(request, response) {
        await TaskModel.find({ macAddress: {'$in': request.body.macAddress}})
            .sort('when')
            .then(res => {
                return response.status(200).json(res);
            })
            .catch(error => {
                return response.status(500).json(error); 
            });
    }

    async show(request, response) {

        if (request.params.id.length != "60ce008accc27909ccae9a15".length) return response.status(500).json({error: "This is not a Task ID"});

        await TaskModel.findById(request.params.id)
            .then(res => {
                if (res) return response.status(200).json(res);
                else return response.status(404).json({error: "task does not exist"});
            })
            .catch(error => {
                return response.status(500).json(error);
            })
    }

    async delete(request, response) {

        if (request.params.id.length != "60ce008accc27909ccae9a15".length) return response.status(500).json({error: "This is not a Task ID"});

        await TaskModel.deleteOne({'_id': request.params.id})
            .then(res => {
                if (res.deletedCount == 1) return response.status(200).json({done: "task was deleted"});
                else return response.status(404).json({error: "task does not exist"});
            })
            .catch(error => {
                return response.status(500).json(error);
            })

    }

    async conclude(request, response) {

        if (request.params.id.length != "60ce008accc27909ccae9a15".length) return response.status(500).json({error: "This is not a Task ID"});

        await TaskModel.findByIdAndUpdate({'_id': request.params.id}, {'isConcluded': request.params.conclude}, {new: true})
            .then(res => {
                return response.status(200).json(res);
            })
            .catch(error => {
                return response.status(500).json(error); 
            });
    }
}

module.exports = new TaskController();