package com.recklessmo.model.setting;

import java.util.List;

/**
 * Created by hpf on 8/17/16.
 */
public class Grade {

    private long gradeId;
    private String gradeName;
    private String charger;
    private String phone;
    private String detail;

    private List<Group> classList;

    public List<Group> getClassList() {
        return classList;
    }

    public void setClassList(List<Group> classList) {
        this.classList = classList;
    }

    public long getGradeId() {
        return gradeId;
    }

    public void setGradeId(long gradeId) {
        this.gradeId = gradeId;
    }

    public String getGradeName() {
        return gradeName;
    }

    public void setGradeName(String gradeName) {
        this.gradeName = gradeName;
    }

    public String getCharger() {
        return charger;
    }

    public void setCharger(String charger) {
        this.charger = charger;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }
}