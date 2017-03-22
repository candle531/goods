(function() {
    'use strict';

    angular
        .module('custom')
        .controller('TemplateGapEditController', TemplateGapEditController);

    TemplateGapEditController.$inject = ['$scope', 'TemplateService', '$timeout', '$resource', 'blockUI', 'SweetAlert'];
    function TemplateGapEditController($scope,TemplateService, $timeout, $resource, blockUI, SweetAlert) {
        //type
        $scope.type = $scope.ngDialogData.type;
        //分数模板
        $scope.scoreTemplate = ($scope.type == 'edit' ? $scope.ngDialogData.data : {});
        $scope.courseList = ["总分", "语文", "数学", "英语", "政治", "历史", "地理", "物理", "化学", "生物"];

        $scope.save = function(){
            blockUI.start();
            $scope.scoreTemplate.type = 2;
            TemplateService.addTemplate($scope.scoreTemplate).success(function(data){
                if(data.status == 200){
                    SweetAlert.success("成功!");
                    $scope.closeThisDialog('reload');
                    blockUI.stop();
                }
            }).error(function(){
                SweetAlert.error("网络问题,请稍后重试!");
                blockUI.stop();
            });
        }
    }
})();

