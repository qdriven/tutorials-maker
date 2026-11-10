# 角色示例回归测试

使用 Python 3.13，在独立环境安装测试依赖后运行：

```bash
python3 -m venv /tmp/agency-examples-venv
/tmp/agency-examples-venv/bin/python -m pip install -r scripts/tests/requirements.txt
/tmp/agency-examples-venv/bin/python -m unittest discover -s scripts/tests -p 'test_*.py' -v
```

已激活环境时也可执行 `npm run test:examples`。GitHub Actions 使用相同 Python 与依赖版本执行。

测试从角色 Markdown 提取实际函数和类，不复制算法实现。为避免导入不相关的可选组件，只执行指定定义；应用需自行提供的现金余额、季节系数、增长系数和风险评分使用测试夹具。NumPy、pandas 和 SciPy 均使用真实实现，IRR 调用真实求解器。

覆盖 PSI、校准检验、RFM、自然月现金流、IRR、招聘分母缺失、客服跨年/缺期/时区及 JSONL 格式。不代表已完成数据库、身份提供商、支付渠道、Unity 或浏览器端到端集成测试。
