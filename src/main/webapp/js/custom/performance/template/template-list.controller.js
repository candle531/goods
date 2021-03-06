(function () {
    'use strict';
    angular
        .module('custom')
        .controller('TemplateListController', TemplateListController);
    TemplateListController.$inject = ['$scope', 'TemplateService', 'SweetAlert', 'NgTableParams', 'ngDialog', 'blockUI', 'Notify'];

    function TemplateListController($scope, TemplateService, SweetAlert, NgTableParams, ngDialog, blockUI, Notify) {

        $scope.type = $scope.ngDialogData.type;

        $scope.tableParams = {page: 1, count: 10, type: 1, searchStr: null};

        var block = blockUI.instances.get("template-list");

        $scope.activate = function () {
            $scope.templateTableParams = new NgTableParams({}, {
                counts: [],
                getData: function (params) {
                    block.start();
                    return TemplateService.loadTemplates({
                        page: params.page(),
                        count: params.count(),
                        type: $scope.type
                    }).then(function (data) {
                        block.stop();
                        var result = data.data;
                        if (result.status == 200) {
                            params.total(result.totalCount);
                            return result.data;
                        } else {
                            SweetAlert.error("服务器内部错误, 请联系客服!");
                        }
                    }, function () {
                        SweetAlert.error("网络问题,请稍后重试!");
                        block.stop();
                    });
                }
            });
        }

        $scope.activate();

        //删除
        $scope.delete = function (id) {
            SweetAlert.swal({
                title: '确认删除?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '是',
                cancelButtonText: '否',
                closeOnConfirm: true,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    //这里可以进行调试,查看$scope,因为table会创建一个子scope
                    //然后子scope里面就不能用this了,因为this就指向了子scope,
                    //实际上在table的每一行里面的点击是调用了父scope的delete方法
                    block.start();
                    TemplateService.deleteTemplate(id).success(function () {
                        Notify.alert("删除成功!", {status: "success", timeout: 3000});
                        $scope.templateTableParams.reload();
                        block.stop();
                    }).error(function () {
                        block.stop();
                        SweetAlert.error("网络问题,请稍后重试!");
                    });
                }
            });
        }

        //增加模板
        $scope.add = function () {
            var dialog;
            if ($scope.type == 1) {
                dialog = ngDialog.open({
                    template: 'app/views/custom/performance/template/edit/template-total-edit.html',
                    controller: 'TemplateTotalEditController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {type: 'add'}
                });
            } else if ($scope.type == 2) {
                dialog = ngDialog.open({
                    template: 'app/views/custom/performance/template/edit/template-gap-edit.html',
                    controller: 'TemplateGapEditController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {type: 'add'}
                });
            } else if($scope.type == 3){
                dialog = ngDialog.open({
                    template: 'app/views/custom/performance/template/edit/template-rank-edit.html',
                    controller: 'TemplateRankEditController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {type: 'add'}
                });
            }
            dialog.closePromise.then(function (data) {
                if (data.value != 'reload') {
                    return;
                }
                $scope.templateTableParams.reload();
            });
        }

        //编辑模板
        $scope.edit = function (item) {
            var dialog;
            if ($scope.type == 1) {
                dialog = ngDialog.open({
                    template: 'app/views/custom/performance/template/edit/template-total-edit.html',
                    controller: 'TemplateTotalEditController',
                    className: 'ngdialog-theme-default custom-width-1200',
                    data: {type: 'edit', data: item}
                });
            } else if ($scope.type == 2) {
                dialog = ngDialog.open({
                    template: 'app/views/custom/performance/template/edit/template-gap-edit.html',
                    controller: 'TemplateGapEditController',
                    className: 'ngdialog-theme-default custom-width-1200',
                    data: {type: 'edit', data: item}
                });
            } else if($scope.type == 3){
                dialog = ngDialog.open({
                    template: 'app/views/custom/performance/template/edit/template-rank-edit.html',
                    controller: 'TemplateRankEditController',
                    className: 'ngdialog-theme-default custom-width-1200',
                    data: {type: 'edit', data: item}
                });
            }
            dialog.closePromise.then(function (data) {
                if (data.value != 'reload') {
                    return;
                }
                $scope.templateTableParams.reload();
            });
        }

        //使用模板
        $scope.use = function (item) {
            var result = {status: 1, value: item};
            $scope.closeThisDialog(result);
        }

        //设置成默认
        $scope.make = function (item) {
            TemplateService.makeDefaultTemplate(item.id, item.type).success(function () {
                Notify.alert("设置成功!", {status: "success", timeout: 3000});
                $scope.templateTableParams.reload();
                block.stop();
            }).error(function () {
                block.stop();
                SweetAlert.error("网络问题,请稍后重试!");
            });
        }

    }
})();