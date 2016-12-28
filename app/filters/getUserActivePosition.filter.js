(function () {
    'use strict';

    angular
        .module('doleticApp')
        .filter('GetUserActivePosition',getUserActivePosition);

    getUserActivePosition.$inject = [];

    function getUserActivePosition() {
        return function(user,option){
            var activePosition = _.find(user.positions, 'active');
            if(activePosition){
                if( option &&
                    option==="label" &&
                    activePosition.position){
                    return activePosition.position.label;
                } else if(  option &&
                    option==="division" &&
                    activePosition.position &&
                    activePosition.position.division){
                    return activePosition.position.division.label;
                } else {
                    return "N/A";
                }
            }else{
                return "N/A";
            }
        };
    }
})();
