(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ContactService', ContactService);

    ContactService.$inject = ['$http', 'SERVER_CONFIG'];

    function ContactService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/grc/contact';
        var contactFactory = {prospects: {}, contactedProspects: {}, clients: {}, oldClients: {}};

        // GET
        contactFactory.getCurrentUserContacts = function (cache) {
            return $http.get(server + urlBase + "s/current", {cache: cache});
        };

        contactFactory.getAllContacts = function (cache) {
            return $http.get(server + urlBase + "s", {cache: cache});
        };

        contactFactory.getAllContactsByType = function (type, cache) {
            return $http.get(server + urlBase + "s/type/" + type, {cache: cache});
        };

        contactFactory.getAllProspects = function (cache) {
            return $http.get(server + urlBase + "s/type/1", {cache: cache}).success(function (data) {
                contactFactory.prospects = data.contacts;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.getAllContactedProspects = function (cache) {
            return $http.get(server + urlBase + "s/type/2", {cache: cache}).success(function (data) {
                contactFactory.contactedProspects = data.contacts;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.getAllClients = function (cache) {
            return $http.get(server + urlBase + "s/type/1", {cache: cache}).success(function (data) {
                contactFactory.clients = data.contacts;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.getAllOldClients = function (cache) {
            return $http.get(server + urlBase + "s/type/1", {cache: cache}).success(function (data) {
                contactFactory.oldClients = data.contacts;
            }).error(function (data) {
                console.log(data);
            });
        };

        // POST
        contactFactory.postProspect = function (prospect) {
            prospect.type = 1;
            return $http.post(server + urlBase, prospect).success(function (data) {
                contactFactory.prospects[data.contact.id] = data.contact;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.postContactedProspect = function (contactedProspect) {
            contactedProspect.type = 2;
            return $http.post(server + urlBase, contactedProspect).success(function (data) {
                contactFactory.contactedProspects[data.contact.id] = data.contact;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.postClient = function (client) {
            client.type = 3;
            return $http.post(server + urlBase, client).success(function (data) {
                contactFactory.clients[data.contact.id] = data.contact;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.postOldClient = function (oldClient) {
            oldClient.type = 4;
            return $http.post(server + urlBase, oldClient).success(function (data) {
                contactFactory.oldClients[data.contact.id] = data.contact;
            }).error(function (data) {
                console.log(data);
            });
        };

        // PUT
        contactFactory.putProspect = function (prospect) {
            return $http.post(server + urlBase + "/" + prospect.id, prospect).success(function (data) {
                contactFactory.prospects[data.contact.id] = data.contact;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.putContactedProspect = function (contactedProspect) {
            return $http.post(server + urlBase + "/" + contactedProspect.id, contactedProspect).success(function (data) {
                contactFactory.contactedProspects[data.contact.id] = data.contact;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.putClient = function (client) {
            return $http.post(server + urlBase + "/" + client.id, client).success(function (data) {
                contactFactory.clients[data.contact.id] = data.contact;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.postOldClient = function (oldClient) {
            return $http.post(server + urlBase + "/" + oldClient.id, oldClient).success(function (data) {
                contactFactory.oldClients[data.contact.id] = data.contact;
            }).error(function (data) {
                console.log(data);
            });
        };

        // DELETE
        contactFactory.deleteProspect = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete contactFactory.prospects[id];
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.deleteContactedProspect = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete contactFactory.contactedProspects[id];
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.deleteClient = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete contactFactory.clients[id];
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.deleteOldClient = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete contactFactory.oldClients[id];
            }).error(function (data) {
                console.log(data);
            });
        };

        return contactFactory;
    }

})();