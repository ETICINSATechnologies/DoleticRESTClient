(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('TaskService', TaskService);

    TaskService.$inject = ['$http', 'SERVER_CONFIG'];

    function TaskService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/task';
        var taskFactory = {};

        taskFactory.getAllTasksByProject = function (id, cache) {
            if (!cache) {
                delete taskFactory.currentProjectTasks;
            } else if (
                taskFactory.currentProjectTasks &&
                taskFactory.currentProjectId == id
            ) {
                return;
            }
            return $http.get(server + urlBase + "s/project/" + id).success(function (data) {
                taskFactory.currentProjectTasks = data.tasks;
                taskFactory.currentProjectId = id;
            }).error(function (error) {
                console.log(error);
            });
        };

        // POST
        taskFactory.postTask = function (task) {
            return $http.post(server + urlBase, task).success(function (data) {
                taskFactory.currentProjectTasks = angular.equals(taskFactory.currentProjectTasks, []) ?
                    {} : taskFactory.currentProjectTasks;
                taskFactory.currentProjectTasks[data.task.number] = data.task;
            }).error(function (error) {
                console.log(error);
            });
        };

        // PUT
        taskFactory.switchTasks = function (task, up) {
            if (taskFactory.currentProjectTasks) {
                var nextTask = taskFactory.currentProjectTasks[task.number + (up ? -1 : 1)];
                return $http.post(server + urlBase + "/" + task.id + "/switch/" + nextTask.id).success(function (data) {
                    taskFactory.currentProjectTasks = angular.equals(taskFactory.currentProjectTasks, []) ?
                        {} : taskFactory.currentProjectTasks;
                    nextTask.number = task.number;
                    taskFactory.currentProjectTasks[nextTask.number] = nextTask;
                    taskFactory.currentProjectTasks[data.task.number] = data.task;
                }).error(function (error) {
                    console.log(error);
                });
            }
        };

        taskFactory.putTask = function (task) {
            console.log(task);
            return $http.post(server + urlBase + "/" + task.id, task).success(function (data) {
                taskFactory.currentProjectTasks = angular.equals(taskFactory.currentProjectTasks, []) ?
                    {} : taskFactory.currentProjectTasks;
                taskFactory.currentProjectTasks[data.task.number] = data.task;
            }).error(function (error) {
                console.log(error);
            });
        };

        // DELETE
        taskFactory.deleteTask = function (task) {
            return $http.delete(server + urlBase + "/" + task.id).success(function (data) {
                taskFactory.currentProjectTasks.splice(task.number, 1);
                var n = 1;
                for(var t in taskFactory.currentProjectTasks) {
                    if(taskFactory.currentProjectTasks[t].number != n) {
                        taskFactory.currentProjectTasks[t].number = n;
                    }
                    n++;
                }
            }).error(function (error) {
                console.log(error);
            });
        };

        return taskFactory;
    }

})();