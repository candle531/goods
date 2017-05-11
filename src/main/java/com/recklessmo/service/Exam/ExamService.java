package com.recklessmo.service.exam;

import com.recklessmo.dao.exam.ExamDAO;
import com.recklessmo.model.exam.Exam;
import com.recklessmo.model.setting.Course;
import com.recklessmo.model.setting.Grade;
import com.recklessmo.service.setting.CourseSettingService;
import com.recklessmo.service.setting.GradeSettingService;
import com.recklessmo.web.webmodel.page.ExamListPage;
import com.recklessmo.web.webmodel.page.Page;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Created by hpf on 8/29/16.
 */
@Service
public class ExamService {

    @Resource
    private GradeSettingService gradeSettingService;

    @Resource
    private CourseSettingService courseSettingService;

    @Resource
    private ExamDAO examDAO;

    public List<Exam> listExam(ExamListPage page){
        List<Exam> examList = examDAO.listExam(page);
        compose(examList, page.getOrgId());
        return examList;
    }

    public int listExamCount(Page page){
        return examDAO.listExamCount(page);
    }

    public void addExam(Exam exam){
        examDAO.addExam(exam);
    }

    public void updateExamStatus(long examId, int status){
        examDAO.updateExamStatus(examId, status);
    }

    public Exam getExamById(long id){
        Exam exam =  examDAO.getExamById(id);
        compose(exam, exam.getOrgId());
        return exam;
    }

    public List<Exam> getExamByIdList(long orgId, List<Long> idList){
        return examDAO.getExamByIdList(orgId, idList);
    }

    public void deleteExam(long id){
        examDAO.deleteExam(id);
    }

    private void compose(Exam exam, long orgId){
        List<Exam> examList = new LinkedList<>();
        examList.add(exam);
        compose(examList, orgId);
    }

    private void compose(List<Exam> examList, long orgId){
        List<Grade> gradeList = gradeSettingService.listAllGrade(orgId);
        Map<Long, String> gradeMap = new HashMap<>();
        Map<Long, String> classMap = new HashMap<>();
        gradeList.stream().forEach(grade-> {
            gradeMap.put(grade.getGradeId(), grade.getGradeName());
            grade.getClassList().stream().forEach(group -> {
                classMap.put(group.getClassId(), group.getClassName());
            });
        });
        Page coursePage = new Page();
        coursePage.setOrgId(orgId);
        List<Course> courseList = courseSettingService.listCourse(coursePage);
        Map<Long, String> courseMap = courseList.stream().collect(Collectors.toMap(Course::getCourseId, course -> course.getCourseName()));
        examList.stream().forEach(exam -> {
            exam.setGradeName(gradeMap.getOrDefault(exam.getGradeId(), "全部"));
            exam.setClassName(classMap.getOrDefault(exam.getClassId(), "全部"));
            exam.getCourseList().stream().forEach(courseId -> {
                exam.getCourseNameList().add(courseMap.getOrDefault(courseId, "未知科目"));
            });
        });
    }

}
