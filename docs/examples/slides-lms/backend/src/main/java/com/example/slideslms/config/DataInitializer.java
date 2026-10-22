package com.example.slideslms.config;

import com.example.slideslms.entity.Chapter;
import com.example.slideslms.entity.Course;
import com.example.slideslms.entity.Slide;
import com.example.slideslms.repository.CourseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/** 种子数据：首次启动写入一门示例课程 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final CourseRepository courseRepository;

    public DataInitializer(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (courseRepository.count() > 0) return;

        Course course = new Course("规约驱动开发入门", "用一门课学会 Spec-Driven Development：从一句话需求到可运行的软件。");

        Chapter c1 = new Chapter("第 1 章 认识规约驱动开发", 1);
        c1.addSlide(new Slide("什么是 SDD",
                "规约驱动开发（SDD）先把需求写成结构化规约，再让 AI 按规约实现。",
                "传统提示词开发中，意图散落在聊天记录里；SDD 把意图固化在 spec.md 等版本化制品中，"
                        + "每个阶段的产出都是下一阶段的输入，代码只是最后一环。", 1));
        c1.addSlide(new Slide("为什么需要固定框架",
                "框架约定把代码生成的搜索空间压缩为“骨架内填空”。",
                "当目录结构、技术栈、命名规范都被写进宪法（AGENTS.md/Constitution）时，"
                        + "Agent 不再自由发挥，而是在既定模式下组装代码，质量与一致性显著提升。", 2));

        Chapter c2 = new Chapter("第 2 章 制品链", 2);
        c2.addSlide(new Slide("四份核心制品",
                "spec → design → tasks → code，每一步都是 Markdown 制品。",
                "spec.md 用 EARS 记法写验收标准；design.md 映射领域模型与 API 契约；"
                        + "tasks.md 把设计拆成有序任务；实现阶段逐任务执行并验证。", 1));
        c2.addSlide(new Slide("阶段门禁",
                "每个阶段完成后必须通过门禁才能进入下一阶段。",
                "能机器判定的自动化（测试通过、覆盖率 100%），不能机器判定的留给人审"
                        + "（需求意图、架构取舍）。这就是有界自治。", 2));

        Chapter c3 = new Chapter("第 3 章 动手实践", 3);
        c3.addSlide(new Slide("你的第一个规约",
                "用一句话描述需求，让 AI 展开为 EARS 验收标准。",
                "试试在右侧提问区提问：例如“什么是阶段门禁”。本网站本身就是用这门课的方法生成的："
                        + "从一句话需求出发，经过规约、设计、任务分解，最后产出你正在使用的应用。", 1));

        course.addChapter(c1);
        course.addChapter(c2);
        course.addChapter(c3);
        courseRepository.save(course);
    }
}
