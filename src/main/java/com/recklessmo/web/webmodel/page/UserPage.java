package com.recklessmo.web.webmodel.page;

import com.recklessmo.web.webmodel.page.Page;

/**
 * Created by hpf on 6/21/16.
 */
public class UserPage extends Page {

    private String searchStr;


    public String getSearchStr() {
        return searchStr;
    }

    public void setSearchStr(String searchStr) {
        this.searchStr = searchStr;
    }
}