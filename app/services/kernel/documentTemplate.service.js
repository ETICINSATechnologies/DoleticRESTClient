(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('DocumentTemplateService', documentTemplateService);

    documentTemplateService.$inject = ['$http', 'FileSaver', 'SERVER_CONFIG', 'Upload', 'MessageBoxService'];

    function documentTemplateService($http, FileSaver, SERVER_CONFIG, Upload, MessageBoxService) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api';
        var documentTemplateFactory = {};

        documentTemplateFactory.getAllDocumentTemplates = function (cache) {
            if (!cache) {
                delete documentTemplateFactory.documentTemplates;
            } else if (documentTemplateFactory.documentTemplates) {
                return;
            }
            return $http.get(server + urlBase + '/kernel/templates').success(function (data) {
                documentTemplateFactory.documentTemplates = data.templates;
            }).error(function (error) {
                console.log(error);
            });
        };

        documentTemplateFactory.disableDocumentTemplate = function(id){
            return $http.delete(server + urlBase + '/kernel/template/' + id);
        };

        documentTemplateFactory.downloadDocumentTemplate = function(template){
            return $http.get(server + urlBase + '/kernel/template/document/' + template.id, {responseType:'blob'}).success(function (data) {
                var blob = new Blob([data], { type: data.contentType });

                console.dir(data.contentType);

                FileSaver.saveAs(blob, template.label);
            }).error(function (error) {
                console.log(error);
            });
        };

        documentTemplateFactory.sendRequest = function(template, url){
            var toUpload = {
                url: server + urlBase +  url
            };

            if(template!==null) {
                toUpload.data = {
                    'label': template.label,
                    'version': template.version,
                    'description': template.description,
                    'visibility': template.visibility,
                    'file': template.file
                }
            }

            Upload.upload(toUpload).success(
                function () {
                    $('#document_form_modal').modal('hide');
                    MessageBoxService.showSuccess(
                        "Opération réussie !"
                    );
                }
            ).error(
                    function (error) {
                        console.log(error);
                        $('#document_form_modal').modal('hide');
                        MessageBoxService.showError(
                            "Echec de l'opération"
                        );
                    }
                )

        };


        return documentTemplateFactory;
    }

})();