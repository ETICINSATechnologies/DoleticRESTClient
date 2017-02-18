(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ContactActionService', ContactActionService);

    ContactActionService.$inject = ['$http', 'SERVER_CONFIG', 'ContactService'];

    function ContactActionService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/grc/contact_action';
        var contactActionFactory = {};

        contactActionFactory.getContactActionsByContact = function (id, cache) {
            if (!cache) {
                delete contactActionFactory.currentContactActions;
            } else if (
                contactActionFactory.currentContactActions &&
                contactActionFactory.currentContactId == id
            ) {
                return;
            }
            return $http.get(server + urlBase + "s/contact/" + id).success(function (data) {
                contactActionFactory.currentContactActions = data.contact_actions;
            }).error(function (error) {
                console.log(error);
            });
        };

        contactActionFactory.postContactAction = function (contactAction) {
            return $http.post(server + urlBase, contactAction).success(function (data) {
                contactActionFactory.currentContactActions = angular.equals(contactActionFactory.currentContactActions, []) ?
                    {} : contactActionFactory.currentContactActions;
                contactActionFactory.currentContactId = data.contact_action.contact.id;
                contactActionFactory.currentContactActions[data.contact_action.id] = data.contact_action;
            }).error(function (error) {
                console.log(error);
            });
        };

        contactActionFactory.putContactAction = function (contactAction) {
            return $http.post(server + urlBase + "/" + contactAction.id, contactAction).success(function (data) {
                contactActionFactory.currentContactActions[data.contact_action.id] = data.contact_action;
            }).error(function (error) {
                console.log(error);
            });
        };

        contactActionFactory.deleteContactAction = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete contactActionFactory.currentContactActions[id];
            }).error(function (data) {
                console.log(data);
            });
        };

        return contactActionFactory;
    }

})();