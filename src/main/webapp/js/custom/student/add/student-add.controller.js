(function () {
    'use strict';
    angular
        .module('custom')
        .controller('StudentAddController', StudentAddController);
    StudentAddController.$inject = ['$scope', 'StudentService', 'DicService', 'SweetAlert', 'blockUI', 'Notify'];

    function StudentAddController($scope, StudentService, DicService, SweetAlert, blockUI, Notify) {


        $scope.student = {};
        $scope.gradeList = [];
        $scope.classList = [];
        $scope.genderList = [{genderId:0, genderName:'男'}, {genderId:1, genderName:'女'}];

        $scope.init = function() {
            $scope.student = {};
            blockUI.start();
            DicService.loadAllGrade().success(function(data){
                if(data.status == 200){
                    $scope.gradeList = data.data;
                }
                blockUI.stop();
            }).error(function(){
                SweetAlert.error("网络异常, 请稍后重试!");
                blockUI.stop();
            });

            $scope.selectGrade = function(data){
                $scope.classList = data.classList;
            }
        }

        $scope.init();

        //保存学生信息
        $scope.save = function(){
            //校验
            if(!$scope.validate()){
                //给个对话框提示
                return;
            }

            blockUI.start();
            //提交
            StudentService.addStudent($scope.student).success(function(data){
                blockUI.stop();
                if(data.status == 200){
                    SweetAlert.success("添加成功!");
                    //清空输入部分
                    $scope.student = {};
                }else{
                    SweetAlert.error("服务器异常, 请稍后重试!");
                }
            }).error(function(){
                blockUI.stop();
                SweetAlert.error("网络问题, 请稍后重试!");
            });
        }

        //校验必填信息
        $scope.validate = function(){
            if(_.isNil($scope.student.name)
                || _.isNil($scope.student.gender)
                || _.isNil($scope.student.birth)
                || _.isNil($scope.student.birthTown)
                || _.isNil($scope.student.address)
                || _.isNil($scope.student.homeTown)
                || _.isNil($scope.student.people)
                || _.isNil($scope.student.phone)
                || _.isNil($scope.student.scn)
                || _.isNil($scope.student.qq)
                || _.isNil($scope.student.wechat)
                || _.isNil($scope.student.sid)
                || _.isNil($scope.student.gradeId)
                || _.isNil($scope.student.classId)
            ) {
                SweetAlert.error("信息填写不完整！");
                return false;
            }
            return true;
        }
    }
})();