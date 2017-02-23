package com.recklessmo.web.setting;

import com.recklessmo.model.setting.Term;
import com.recklessmo.model.setting.Course;
import com.recklessmo.response.JsonResponse;
import com.recklessmo.service.setting.CourseSettingService;
import com.recklessmo.web.webmodel.page.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

/**
 * Created by hpf on 8/17/16.
 */
@Controller
@RequestMapping("/v1/setting")
public class CourseSettingController {

    @Resource
    private CourseSettingService courseSettingService;

//   不提供自己添加接口, 为了统一数据, 需要对课程进行统一编码!

//    @RequestMapping(value = "/course/add", method = {RequestMethod.POST})
//    @ResponseBody
//    public JsonResponse addCourse(@RequestBody Course Course){
//        //TODO do some check here
//        courseSettingService.addCourse(Course);
//        return new JsonResponse(200, null, null);
//    }



    @RequestMapping(value = "/course/update", method = {RequestMethod.POST})
    @ResponseBody
    public JsonResponse updateCourse(@RequestBody Course Course){
        courseSettingService.updateCourse(Course);
        return new JsonResponse(200, null, null);
    }

    @RequestMapping(value = "/course/list", method = {RequestMethod.POST})
    @ResponseBody
    public JsonResponse listCourse(@RequestBody Page page){
        int count = courseSettingService.listCourseCount(page);
        List<Course> CourseList = courseSettingService.listCourse(page);
        return new JsonResponse(200, CourseList, count);
    }

    @RequestMapping(value = "/course/listStandard", method = {RequestMethod.POST})
    @ResponseBody
    public JsonResponse listStandard(@RequestBody Page page){
        page.setOrgId(1);
        List<Course> courseList = courseSettingService.listCourse(page);
        page.setOrgId(0);
        List<Course> StandardCourseList = courseSettingService.listCourse(page);
        StandardCourseList.stream().forEach(item -> {
            Optional<Course> temp = courseList.stream().filter(t -> t.getCourseId() == item.getCourseId()).findAny();
            item.setHasImport(temp.isPresent());
        });
        return new JsonResponse(200, StandardCourseList, StandardCourseList.size());
    }

    @RequestMapping(value = "/course/import", method = {RequestMethod.POST})
    @ResponseBody
    public JsonResponse importCourse(@RequestBody Course[] courses){
        for(Course course : courses){
            try{
                //直接添加, 通过数据库主键来判断
                courseSettingService.addCourse(course);
            }catch(Exception e){
                e.printStackTrace();
            }
        }
        return new JsonResponse(200, null, null);
    }

    @RequestMapping(value = "/course/delete", method = {RequestMethod.POST})
    @ResponseBody
    public JsonResponse deleteCourse(@RequestBody long id){
        Course course = courseSettingService.getCourseById(id);
        if(course != null && course.getOrgId() == 0){
            courseSettingService.deleteCourse(id);
        }
        return new JsonResponse(200, null, null);
    }

}
