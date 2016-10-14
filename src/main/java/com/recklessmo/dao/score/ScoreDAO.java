package com.recklessmo.dao.score;

import com.recklessmo.model.score.Score;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by hpf on 10/8/16.
 */
public interface ScoreDAO {

    void insertList(@Param("scoreList") List<Score> scoreList);
    List<Score> getList(@Param("examId")long examId);


}
