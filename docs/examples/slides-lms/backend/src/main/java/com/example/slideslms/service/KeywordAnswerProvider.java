package com.example.slideslms.service;

import org.springframework.stereotype.Component;
import java.util.Arrays;

/**
 * 占位实现：提取问题中的关键词（长度>=2 的 token），
 * 在课程内容中找出命中数最多的段落作为解答依据。
 */
@Component
public class KeywordAnswerProvider implements AnswerProvider {

    private static final String FALLBACK =
            "这个问题超出了当前课程内容的范围。建议换个与幻灯片内容相关的问法，或联系讲师补充材料。";

    @Override
    public String answer(String question, String corpus) {
        String[] keywords = Arrays.stream(question.split("[\\s，。？！,.?!、；;：:]+"))
                .filter(t -> t.length() >= 2)
                .distinct()
                .toArray(String[]::new);
        if (keywords.length == 0 || corpus == null || corpus.isBlank()) {
            return FALLBACK;
        }
        String[] paragraphs = corpus.split("\n\n+");
        String best = null;
        int bestScore = 0;
        for (String p : paragraphs) {
            int score = 0;
            for (String k : keywords) {
                if (p.contains(k)) score++;
            }
            if (score > bestScore) {
                bestScore = score;
                best = p;
            }
        }
        if (best == null) return FALLBACK;
        String excerpt = best.length() > 300 ? best.substring(0, 300) + "……" : best;
        return "根据课程内容，与你问题最相关的内容是：\n\n" + excerpt
                + "\n\n（本解答由关键词匹配占位引擎生成，接入 LLM 后可替换为智能解答。）";
    }
}
