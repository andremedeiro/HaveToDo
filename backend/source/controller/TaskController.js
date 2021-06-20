const TaskModel = require('../model/TaskModel');
const {startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear} = require('date-fns');

const timeCurrent = new Date();

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

        if (request.params.id.length != "60ce008accc27909ccae9a15".length) return response.status(500).json({error: "This is not a Task ID"});

        await TaskModel.findByIdAndUpdate({'_id': request.params.id}, request.body, {new: true})
            .then(res => {
                if (res) return response.status(200).json(res);
                else return response.status(404).json({error: "task does not exist"});
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

    async late(request, response) {
        await TaskModel.find({'when': {'$lt': timeCurrent}, 'macAddress': {'$in': request.body.macAddress}})
            .sort('when')
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

    async today(request, response) {
        await TaskModel.find({'when': {'$gte': startOfDay(timeCurrent), '$lt': endOfDay(timeCurrent)}, 'macAddress': {'$in': request.body.macAddress}})
            .sort('when')
            .then(res => {
                return response.status(200).json(res);
            })
            .catch(error => {
                return response.status(500).json(error); 
            });
    }

    async week(request, response) {
        await TaskModel.find({'when': {'$gte': startOfWeek(timeCurrent), '$lt': endOfWeek(timeCurrent)}, 'macAddress': {'$in': request.body.macAddress}})
            .sort('when')
            .then(res => {
                return response.status(200).json(res);
            })
            .catch(error => {
                return response.status(500).json(error); 
            });
    }

    async month(request, response) {
        await TaskModel.find({'when': {'$gte': startOfMonth(timeCurrent), '$lt': endOfMonth(timeCurrent)}, 'macAddress': {'$in': request.body.macAddress}})
            .sort('when')
            .then(res => {
                return response.status(200).json(res);
            })
            .catch(error => {
                return response.status(500).json(error); 
            });
    }

    async year(request, response) {
        await TaskModel.find({'when': {'$gte': startOfYear(timeCurrent), '$lt': endOfYear(timeCurrent)}, 'macAddress': {'$in': request.body.macAddress}})
            .sort('when')
            .then(res => {
                return response.status(200).json(res);
            })
            .catch(error => {
                return response.status(500).json(error); 
            });
    }
}

module.exports = new TaskController();