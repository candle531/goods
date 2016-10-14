package com.recklessmo.service.setting;

import com.recklessmo.dao.setting.CourseSettingDAO;
import com.recklessmo.dao.setting.CourseSettingDAO;
import com.recklessmo.model.setting.Term;
import com.recklessmo.model.setting.Course;
import com.recklessmo.web.webmodel.page.Page;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by hpf on 8/17/16.
 */
@Service
public class CourseSettingService {

    @Resource
    private CourseSettingDAO courseSettingDAO;

    public void addCourse(Course course){
        courseSettingDAO.addCourse(course);
    }

    public void updateCourse(Course course){
        courseSettingDAO.updateCourse(course);
    }
    
    public List<Course> listCourse(Page page){
        return courseSettingDAO.listCourse(page);
    }

    public int listCourseCount(Page page){
        return courseSettingDAO.listCourseCount(page);
    }

}