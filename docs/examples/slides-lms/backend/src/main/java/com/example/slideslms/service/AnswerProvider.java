package com.example.slideslms.service;

/** 解答提供者：本版为关键词匹配占位实现，可无缝替换为 LLM 实现 */
public interface AnswerProvider {
    /**
     * @param question 学习者问题
     * @param corpus   当前课程全部幻灯片文本（content + detail 拼接，按页分隔）
     * @return 解答文本
     */
    String answer(String question, String corpus);
}
