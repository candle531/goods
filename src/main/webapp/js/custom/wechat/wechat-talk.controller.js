(function () {
    'use strict';
    angular
        .module('custom')
        .controller('WechatTalkController', WechatTalkController);
    WechatTalkController.$inject = ['$scope', 'WechatService', 'DicService', 'SweetAlert', 'NgTableParams', 'blockUI', 'Notify'];

    function WechatTalkController($scope, WechatService,DicService, SweetAlert, NgTableParams, blockUI, Notify) {


        //切换tab
        $scope.changeTab = function(type){
            if(type == 'recentUser'){
                $scope.wechatRecentUserTableParams = new NgTableParams({}, {
                    counts: [],
                    getData: function (params) {
                        blockUI.start();
                        return WechatService.loadWechatRecentUser({page: params.page(), count: params.count()}).then(function (data) {
                            blockUI.stop();
                            var result = data.data;
                            if (result.status == 200) {
                                params.total(result.totalCount);
                                return result.data;
                            }else{
                                SweetAlert.error("服务器内部错误, 请联系客服!");
                            }
                        }, function(){
                            blockUI.stop();
                            SweetAlert.error("网络问题, 请稍后重试!");
                        });
                    }
                });
            }else if(type == 'allUser'){
                $scope.wechatAllUserTableParams = new NgTableParams({}, {
                    getData: function (params) {
                        blockUI.start();
                        return WechatService.loadWechatAllUser({page: params.page(), count: params.count()}).then(function (data) {
                            blockUI.stop();
                            var result = data.data;
                            if (result.status == 200) {
                                params.total(result.totalCount);
                                return result.data;
                            }else{
                                SweetAlert.error("服务器内部错误, 请联系客服!");
                            }
                        }, function(){
                            blockUI.stop();
                            SweetAlert.error("网络问题, 请稍后重试!");
                        });
                    }
                });
            }
        }

        $scope.chooseUser = false;

        //点击某个user
        $scope.clickUser = function(user){
            $scope.chooseUser = true;



        }

    }
})();