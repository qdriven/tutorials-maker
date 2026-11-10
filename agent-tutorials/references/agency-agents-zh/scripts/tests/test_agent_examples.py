"""直接从角色 Markdown 提取示例测试；仅项目适配器使用测试夹具。"""
import ast
from datetime import datetime, timedelta
import json
import math
from pathlib import Path
import re
from tempfile import TemporaryDirectory
from types import SimpleNamespace
import unittest

import numpy as np
import pandas as pd
from scipy.stats import chi2

ROOT = Path(__file__).resolve().parents[2]


def load_definitions(path, *names):
    """执行指定类/函数，不导入示例中与被测路径无关的可选依赖。"""
    nodes = []
    for block in re.findall(r'^```python\s*\n(.*?)^```', (ROOT / path).read_text(), re.M | re.S):
        nodes.extend(n for n in ast.parse(block).body if isinstance(
            n, (ast.ClassDef, ast.FunctionDef, ast.AsyncFunctionDef)) and n.name in names)
    if sorted(n.name for n in nodes) != sorted(names):
        raise AssertionError(f'{path}: 缺少或重复定义 {names}')
    tree = ast.fix_missing_locations(ast.Module(body=[
        ast.ImportFrom(module='__future__', names=[ast.alias(name='annotations')], level=0),
        *nodes,
    ], type_ignores=[]))
    scope = dict(np=np, pd=pd, math=math, json=json, datetime=datetime,
                 timedelta=timedelta, chi2=chi2)
    exec(compile(tree, path, 'exec'), scope)
    return [scope[name] for name in names]


class StatisticalExamples(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.psi, cls.hl = [staticmethod(f) for f in load_definitions(
            'specialized/specialized-model-qa.md', 'compute_psi', 'hosmer_lemeshow_test')]

    def test_psi_identical_and_outside_baseline(self):
        baseline = pd.Series([1.0] * 100)
        self.assertEqual(self.psi(baseline, baseline), 0)
        self.assertGreater(self.psi(baseline, pd.Series([2.0] * 100)), 0)
        self.assertGreater(self.psi(baseline, pd.Series([0.0] * 100)), 0)

    def test_psi_rejects_empty_nonfinite_and_invalid_bins(self):
        valid = pd.Series([1., 2., 3.])
        for invalid in [pd.Series([], dtype=float), pd.Series([np.inf])]:
            with self.subTest(invalid=invalid.tolist()), self.assertRaises(ValueError):
                self.psi(valid, invalid)
        for bins in [True, 1, 2.5]:
            with self.subTest(bins=bins), self.assertRaises(ValueError):
                self.psi(valid, valid, bins=bins)

    def test_hl_rejects_collapsed_groups(self):
        with self.assertRaises(ValueError):
            self.hl(pd.Series([0, 1] * 20), pd.Series([0.5] * 40))

    def test_hl_valid_and_misaligned_data(self):
        probabilities = pd.Series(np.linspace(.05, .95, 100))
        outcomes = pd.Series([0, 1] * 50)
        report = self.hl(outcomes, probabilities)
        self.assertTrue(math.isfinite(report['HL_statistic']))
        self.assertTrue(0 <= report['p_value'] <= 1)
        with self.assertRaises(ValueError):
            self.hl(outcomes, probabilities.set_axis(range(1, 101)))


class AnalyticsExamples(unittest.TestCase):
    def test_rfm_sparse_and_tied_cohorts(self):
        segment, = load_definitions('support/support-analytics-reporter.md',
                                    'customer_segmentation_analysis')
        frame = pd.DataFrame({'customer_id': ['a', 'a', 'b'], 'order_id': ['o1', 'o1', 'o2'],
                              'date': pd.to_datetime(['2026-01-01'] * 3), 'revenue': [10, 5, 15]})
        result = segment(frame)
        self.assertEqual(result.loc['a', 'frequency'], 1)
        self.assertEqual(result.loc['a', 'monetary'], 15)
        self.assertEqual(result.loc['a', 'rfm_score'], result.loc['b', 'rfm_score'])
        self.assertTrue(result[['r_score', 'f_score', 'm_score']].isin(range(1, 6)).all().all())

    def cash_manager(self, net):
        manager, = load_definitions('support/support-finance-tracker.md', 'CashFlowManager')
        obj = manager.__new__(manager)
        obj.current_cash = 1000
        obj.data = pd.DataFrame({'month': range(1, 13), 'receipts': [100 + net] * 12,
                                 'payments': [100] * 12, 'net_cash_flow': [net] * 12})
        obj.calculate_seasonal_factor = lambda month: 1
        obj.get_growth_factor = lambda: 1
        return obj

    def test_cash_flow_calendar_cumulative_and_negative_scenarios(self):
        result = self.cash_manager(-10).forecast_cash_flow(14)
        self.assertEqual(result['cumulative_cash'].tolist(), list(range(990, 850, -10)))
        self.assertTrue((result['scenario_low'] <= result['scenario_high']).all())
        months = result['date'].dt.to_period('M')
        self.assertEqual(len(months.unique()), 14)
        self.assertTrue((result['date'].dt.day == 1).all())
        self.assertEqual((months.iloc[-1] - months.iloc[0]).n, 13)

    def test_cash_flow_zero_horizon_schema(self):
        result = self.cash_manager(10).forecast_cash_flow(0)
        self.assertTrue(result.empty)
        self.assertIn('cumulative_cash', result.columns)

    def test_irr_real_solver_and_zero_result(self):
        analyzer, = load_definitions('support/support-finance-tracker.md', 'InvestmentAnalyzer')
        obj = analyzer()
        self.assertAlmostEqual(obj.calculate_irr([110], 100), .1, places=7)
        self.assertAlmostEqual(obj.calculate_irr([100], 100), 0, places=7)
        # 风险评分是应用适配器；IRR 仍使用真实 SciPy 求解器。
        obj.assess_investment_risk = lambda flows, life: 1
        self.assertAlmostEqual(obj.investment_analysis_report('zero', 100, [100], 1)['irr'], 0)

    def test_recruitment_missing_denominators_sort_last(self):
        analyzer, = load_definitions('specialized/recruitment-specialist.md', 'RecruitmentFunnelAnalyzer')
        data = pd.DataFrame([
            dict(channel='valid', cost=100, applications=10, offers_accepted=2, probation_passed=1, quality_score=5),
            dict(channel='empty', cost=100, applications=0, offers_accepted=0, probation_passed=0, quality_score=5),
        ])
        obj = analyzer(data)
        result = obj.channel_roi_analysis()
        self.assertEqual(result.iloc[0]['channel'], 'valid')
        self.assertTrue(pd.isna(result.iloc[-1]['composite_efficiency_score']))
        self.assertIsNone(obj.safe_divide(0, 0))
        self.assertEqual(obj.safe_divide(0, 5), 0)


class SupportExamples(unittest.TestCase):
    def analyzer(self, dates, csat=None, statuses=None):
        cls, = load_definitions('support/support-support-responder.md', 'SupportAnalytics')
        n = len(dates)
        return cls(pd.DataFrame({
            'created_date': pd.to_datetime(dates, utc=True),
            'csat_score': csat if csat is not None else [5] * n,
            'status': statuses if statuses is not None else ['resolved'] * n,
            'first_response_time': [1.] * n, 'resolution_time': [2.] * n,
            'contacts_to_resolution': [1] * n, 'issue_category': ['general'] * n,
            'channel': ['web'] * n, 'priority': ['normal'] * n,
            'agent_id': ['agent'] * n, 'ticket_id': list(range(n)),
            'customer_id': [f'c{i}' for i in range(n)],
        }))

    def test_empty_support_data_and_insufficient_evidence(self):
        obj = self.analyzer([])
        self.assertIsNone(obj.calculate_key_metrics()['first_contact_resolution_rate'])
        trends = obj.identify_support_trends()
        for key in ['volume_trend', 'satisfaction_trend', 'response_time_trend']:
            self.assertEqual(trends[key], 'insufficient_data')

    def test_support_cross_year_and_missing_month(self):
        obj = self.analyzer(['2025-12-31', '2026-01-01'], csat=[1, 5])
        self.assertEqual(obj.identify_support_trends()['satisfaction_trend'], 'improving')
        obj = self.analyzer(['2026-01-01', '2026-03-01'], csat=[1, 5])
        self.assertEqual(obj.identify_support_trends()['satisfaction_trend'], 'insufficient_data')

    def test_outreach_timezone_and_unknown_status(self):
        date = pd.Timestamp.now(tz='UTC') - pd.Timedelta(hours=60)
        obj = self.analyzer([date] * 3, statuses=[None, 'resolved', 'open'])
        report = obj.create_proactive_outreach_list()
        self.assertEqual(report['overdue_customers'], ['c2'])


class StructuredExamples(unittest.TestCase):
    def test_all_jsonl_blocks_are_line_delimited_objects(self):
        count = 0
        skip = {'scripts', 'integrations', 'examples', 'node_modules'}
        for directory in ROOT.iterdir():
            if not directory.is_dir() or directory.name.startswith('.') or directory.name in skip:
                continue
            for path in directory.rglob('*.md'):
                text = path.read_text()
                if not re.match(r'^---\n[\s\S]*?\nname:|^---\nname:', text):
                    continue
                for block in re.findall(r'^```jsonl\s*\n(.*?)^```', text, re.M | re.S):
                    for number, line in enumerate(block.splitlines(), 1):
                        if line.strip():
                            with self.subTest(path=str(path.relative_to(ROOT)), line=number):
                                self.assertIsInstance(json.loads(line), dict)
                                count += 1
        self.assertGreater(count, 0)

    def test_navigation_symbol_ids_match_definition_locations(self):
        text = (ROOT / 'specialized/lsp-index-engineer.md').read_text()
        block, = re.findall(r'^```jsonl\s*\n(.*?)^```', text, re.M | re.S)
        records = [json.loads(line) for line in block.splitlines() if line.strip()]
        self.assertEqual(len(records), 5)
        definitions = {r['symId']: r['def'] for r in records if 'def' in r}
        self.assertEqual(len(definitions), 2)
        for record in records:
            location = definitions[record['symId']]
            file, line, character, name = json.loads(record['symId'].removeprefix('sym:'))
            self.assertEqual('file:///' + file, location['uri'])
            self.assertEqual((line, character), (location['l'], location['c']))
            self.assertTrue(name)


if __name__ == '__main__':
    unittest.main()
