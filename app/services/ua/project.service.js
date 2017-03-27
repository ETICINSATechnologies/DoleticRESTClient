(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ProjectService', ProjectService);

    ProjectService.$inject = ['$http', 'SERVER_CONFIG', 'ConsultantService', 'ProjectManagerService', 'ProjectContactService', 'TaskService', 'AmendmentService', 'DeliveryService', 'ProjectDocumentService'];

    function ProjectService($http, SERVER_CONFIG, ConsultantService, ProjectManagerService, ProjectContactService, TaskService, AmendmentService, DeliveryService, ProjectDocumentService) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/project';
        var projectFactory = {};

        // GET

        projectFactory.getAllUnsignedProjects = function (cache) {
            if (!cache) {
                delete projectFactory.unsignedProjects;
            } else if (projectFactory.unsignedProjects) {
                return;
            }
            return $http.get(server + urlBase + "s/unsigned").success(function (data) {
                projectFactory.unsignedProjects = data.projects;
            }).error(function (data) {
                console.log(data);
            });
        };

        projectFactory.getAllCurrentProjects = function (cache) {
            if (!cache) {
                delete projectFactory.currentProjects;
            } else if (projectFactory.currentProjects) {
                return;
            }
            return $http.get(server + urlBase + "s/current").success(function (data) {
                projectFactory.currentProjects = data.projects;
            }).error(function (data) {
                console.log(data);
            });
        };

        projectFactory.getAllArchivedProjects = function (cache) {
            if (!cache) {
                delete projectFactory.archivedProjects;
            } else if (projectFactory.archivedProjects) {
                return;
            }
            return $http.get(server + urlBase + "s/archived").success(function (data) {
                projectFactory.archivedProjects = data.projects;
            }).error(function (data) {
                console.log(data);
            });
        };

        projectFactory.getAllDisabledProjects = function (cache) {
            if (!cache) {
                delete projectFactory.disabledProjects;
            } else if (projectFactory.disabledProjects) {
                return;
            }
            return $http.get(server + urlBase + "s/disabled").success(function (data) {
                projectFactory.disabledProjects = data.projects;
            }).error(function (data) {
                console.log(data);
            });
        };

        projectFactory.getProjectDetails = function (id, cache) {
            if (!cache) {
                delete projectFactory.selectedProject;
            } else if (projectFactory.selectedProject && projectFactory.selectedProject.id === id) {
                return;
            }
            return $http.get(server + urlBase + "/" + id).success(function (data) {
                projectFactory.selectedProject = data.project;

                // Managers
                ProjectManagerService.currentProjectManagers = {};
                var manager;
                for (manager in data.project.managers) {
                    ProjectManagerService.currentProjectManagers[data.project.managers[manager].id] = data.project.managers[manager];
                }
                ProjectManagerService.currentProjectId = data.project.id;

                // Project contacts
                ProjectContactService.currentProjectContacts = {};
                var contact;
                for (contact in data.project.contacts) {
                    ProjectContactService.currentProjectContacts[data.project.contacts[contact].id] = data.project.contacts[contact];
                }
                ProjectContactService.currentProjectId = data.project.id;

                // Consultants
                ConsultantService.currentProjectConsultants = {};
                var consultant;
                for (consultant in data.project.consultants) {
                    ConsultantService.currentProjectConsultants[data.project.consultants[consultant].id] = data.project.consultants[consultant];
                }
                ConsultantService.currentProjectId = data.project.id;

                // Tasks and Deliveries
                TaskService.currentProjectTasks = [];
                DeliveryService.currentProjectDeliveries = {};
                var task;
                for (task in data.project.tasks) {
                    TaskService.currentProjectTasks[data.project.tasks[task].number] = data.project.tasks[task];
                    for (var delivery in data.project.tasks[task].deliveries) {
                        DeliveryService.currentProjectDeliveries[data.project.tasks[task].deliveries[delivery].id] = data.project.tasks[task].deliveries[delivery];
                        DeliveryService.currentProjectDeliveries[data.project.tasks[task].deliveries[delivery].id].task = data.project.tasks[task];
                    }
                }
                TaskService.currentProjectId = data.project.id;

                // Amendments
                AmendmentService.currentProjectAmendments = {};
                var amendment;
                for (amendment in data.project.amendments) {
                    AmendmentService.currentProjectAmendments[data.project.amendments[amendment].id] = data.project.amendments[amendment];
                }
                AmendmentService.currentProjectId = data.project.id;

                // Project documents
                ProjectDocumentService.currentProjectDocuments = {};
                var document;
                for (document in data.project.documents) {
                    ProjectDocumentService.currentProjectDocuments[data.project.documents[document].template.id] = data.project.documents[document];
                }
                ProjectDocumentService.currentProjectId = data.project.id;

            }).error(function (data) {
                console.log(data);
            });
        };

        projectFactory.getProjectByManagerId = function (id) {
            return $http.get(server + urlBase + "s/manager/" + id);
        };

        projectFactory.getProjectByAuditorId = function (id) {
            return $http.get(server + urlBase + "s/auditor/" + id);
        };

        projectFactory.getProjectByConsultantId = function (id) {
            return $http.get(server + urlBase + "s/consultant/" + id);
        };

        // POST
        projectFactory.postProject = function (project) {
            project.status = 1;
            return $http.post(server + urlBase, project).success(function (data) {
                projectFactory.unsignedProjects = angular.equals(projectFactory.unsignedProjects, []) ?
                    {} : projectFactory.unsignedProjects;
                projectFactory.unsignedProjects[data.project.id] = data.project;
            }).error(function (error) {
                console.log(error);
            });
        };

        // PUT
        projectFactory.putProject = function (project) {
            var list = 'unsignedProjects';
            if (project.disabled) {
                list = 'disabledProjects';
            } else if (project.archived) {
                list = 'archivedProjects';
            } else if (project.signDate) {
                list = 'currentProjects';
            }
            return $http.post(server + urlBase + "/" + project.id, project).success(function (data) {
                projectFactory[list][data.project.id] = data.project;
                if (projectFactory.selectedProject && projectFactory.selectedProject.id == data.project.id) {
                    projectFactory.selectedProject = data.project;
                }
            }).error(function (error) {
                console.log(error);
            });
        };

        projectFactory.signProject = function (project) {
            return $http.post(server + urlBase + "/" + project.id + "/sign", project).success(function (data) {
                if (projectFactory.currentProjects) {
                    projectFactory.currentProjects[data.project.id] = data.project;
                }
                if (projectFactory.unsignedProjects) {
                    delete projectFactory.unsignedProjects[data.project.id];
                }
                if (projectFactory.selectedProject && projectFactory.selectedProject.id == data.project.id) {
                    projectFactory.selectedProject = data.project;
                }
            }).error(function (error) {
                console.log(error);
            });
        };

        projectFactory.endProject = function (project) {
            return $http.post(server + urlBase + "/" + project.id + "/end", project).success(function (data) {
                if (projectFactory.selectedProject && projectFactory.selectedProject.id == data.project.id) {
                    projectFactory.selectedProject = data.project;
                }
            }).error(function (error) {
                console.log(error);
            });
        };

        projectFactory.unsignProject = function (project) {
            return $http.post(server + urlBase + "/" + project.id + "/unsign", {}).success(function (data) {
                if (projectFactory.unsignedProjects) {
                    projectFactory.unsignedProjects[data.project.id] = data.project;
                }
                if (projectFactory.currentProjects) {
                    delete projectFactory.currentProjects[data.project.id];
                }
                if (projectFactory.selectedProject && projectFactory.selectedProject.id == data.project.id) {
                    projectFactory.selectedProject = data.project;
                }
            }).error(function (error) {
                console.log(error);
            });
        };

        projectFactory.unendProject = function (project) {
            return $http.post(server + urlBase + "/" + project.id + "/unend", {}).success(function (data) {
                if (projectFactory.selectedProject && projectFactory.selectedProject.id == data.project.id) {
                    projectFactory.selectedProject = data.project;
                }
            }).error(function (error) {
                console.log(error);
            });
        };

        projectFactory.setProjectAuditor = function (project) {
            var list = 'unsignedProjects';
            if (project.disabled) {
                list = 'disabledProjects';
            } else if (project.archived) {
                list = 'archivedProjects';
            } else if (project.signDate) {
                list = 'currentProjects';
            }
            return $http.post(server + urlBase + "/" + project.id + "/auditor", project).success(function (data) {
                projectFactory[list][data.project.id] = data.project;
                if (projectFactory.selectedProject && projectFactory.selectedProject.id == project.id) {
                    projectFactory.selectedProject = data.project;
                }
            }).error(function (error) {
                console.log(error);
            });
        };

        projectFactory.abortUnsignedProject = function (project) {
            return $http.post(server + urlBase + "/" + project.id + "/archive").success(function (data) {
                if (projectFactory.archivedProjects) {
                    projectFactory.archivedProjects = angular.equals(projectFactory.archivedProjects, []) ?
                        {} : projectFactory.archivedProjects;
                    projectFactory.archivedProjects[data.project.id] = data.project;
                }
                delete projectFactory.unsignedProjects[data.project.id];
            }).error(function (error) {
                console.log(error);
            })
        };

        projectFactory.archiveCurrentProject = function (project) {
            return $http.post(server + urlBase + "/" + project.id + "/archive").success(function (data) {
                if (projectFactory.archivedProjects) {
                    projectFactory.archivedProjects = angular.equals(projectFactory.archivedProjects, []) ?
                        {} : projectFactory.archivedProjects;
                    projectFactory.archivedProjects[data.project.id] = data.project;
                }
                delete projectFactory.currentProjects[data.project.id];
            }).error(function (error) {
                console.log(error);
            })
        };

        projectFactory.restoreArchivedProject = function (project) {
            var list = 'unsignedProjects';
            if (project.signDate) {
                list = 'currentProjects';
            }
            return $http.post(server + urlBase + "/" + project.id + "/unarchive").success(function (data) {
                if (projectFactory[list]) {
                    projectFactory[list] = angular.equals(projectFactory[list], []) ?
                        {} : projectFactory[list];
                    projectFactory[list][data.project.id] = data.project;
                }
                delete projectFactory.archivedProjects[data.project.id];
            }).error(function (error) {
                console.log(error);
            })
        };

        projectFactory.disableProject = function (project) {
            var list = 'unsignedProjects';
            if (project.signDate) {
                list = 'currentProjects';
            }
            return $http.post(server + urlBase + "/" + project.id + "/disable", project).success(function (data) {
                if (projectFactory.disabledProjects) {
                    projectFactory.disabledProjects = angular.equals(projectFactory.disabledProjects, []) ?
                        {} : projectFactory.disabledProjects;
                    projectFactory.disabledProjects[data.project.id] = data.project;
                }
                if (projectFactory[list]) {
                    delete projectFactory[list][data.project.id];
                }
                if (projectFactory.selectedProject && projectFactory.selectedProject.id == data.project.id) {
                    projectFactory.selectedProject = data.project;
                }
            }).error(function (error) {
                console.log(error);
            });
        };

        projectFactory.enableProject = function (project) {
            var list = 'unsignedProjects';
            if (project.signDate) {
                list = 'currentProjects';
            }
            return $http.post(server + urlBase + "/" + project.id + "/enable").success(function (data) {
                if (projectFactory[list]) {
                    projectFactory[list] = angular.equals(projectFactory[list], []) ?
                        {} : projectFactory[list];
                    projectFactory[list][data.project.id] = data.project;
                }
                if (projectFactory.disabledProjects) {
                    delete projectFactory.disabledProjects[data.project.id];
                }
                if (projectFactory.selectedProject && projectFactory.selectedProject.id == data.project.id) {
                    projectFactory.selectedProject = data.project;
                }
            }).error(function (error) {
                console.log(error);
            })
        };

        // DELETE
        projectFactory.deleteProject = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete projectFactory.disabledProjects[id];
            }).error(function (error) {
                console.log(error);
            });
        };

        return projectFactory;
    }

})();