# 喝酒大转盘 · 题库类型与分类体系设计（V2）

> 目标：支撑 **1000+ 道题**且「不单调」，同时**完全兼容现有 starter 的 `CONFIG` 字段结构**（真心话/大冒险/直接喝/Deeptalk 四类 + 暗箱操作）。
> 本文先定**类型（schema）**和**分类树**，再给**题量分配**与**风险门控**，最后给**迁移映射**。题目内容（1000 道）在确认分类后由下一步批量生成。

---

## 一、设计原则

1. **扁平化题库 + 独立话题注册表**：不再用 `topics[].questions` 嵌套（1000 题嵌套会灾难），改为「一个扁平的 `questions` 数组 + 每条带 `topic` 标签」。UI 开关仍按话题渲染，但数据可批量增删、导入导出、可视化编辑。
2. **维度化标签**：大冒险用 `contact / stranger / target / scene` 多维标签，而不是堆一堆文案。这样「肢体接触分级」「骚扰陌生人」等开关是**真过滤**，不是文案判断。
3. **风险三级门控**：每条题带 `risk: safe | mild | spicy`，配合全局「限制级模式」开关，避免社死/越界。
4. **难度渐进（可选）**：带 `difficulty 1~3`，未来可做「第一轮轻、后面重」的渐进解锁。

---

## 二、题库类型定义（TypeScript Schema）

```ts
type CategoryId = 'truth' | 'dare' | 'drink' | 'deeptalk';
type Risk       = 'safe' | 'mild' | 'spicy';        // 风险/尺度等级
type Contact    = 0 | 1 | 2 | 3;                      // 肢体接触等级
type Target     = 'self' | 'partner' | 'group' | 'stranger' | 'choose';
type DrinkAmt   = 'sip' | 'glass' | 'chug' | 'bottle';
type Who        = 'self' | 'left' | 'right' | 'all' | 'choose';

// 公共字段
interface BaseQ {
  id: string;            // 唯一ID，如 'truth-hobby-0001'
  cat: CategoryId;
  text: string;          // 题干
  topic?: string;        // 话题分支 id（truth / deeptalk 用）
  risk?: Risk;           // 默认 'safe'
  difficulty?: 1 | 2 | 3;// 默认 1
  tags?: string[];       // 自由标签，便于检索
  enabled?: boolean;     // 默认 true
}

// 真心话
interface TruthQ extends BaseQ {
  cat: 'truth';
  topic: string;         // 必填：hobby / childhood / ex ...
}

// 大冒险（多维标签）
interface DareQ extends BaseQ {
  cat: 'dare';
  contact: Contact;       // 0 无接触 / 1 友好 / 2 暧昧 / 3 限制级
  stranger: boolean;      // 是否涉及陌生人（需 allowStranger）
  target: Target;         // 执行对象
  scene?: 'any' | 'phone' | 'public';  // 场景：任意/手机/当众
}

// 直接喝
interface DrinkQ extends BaseQ {
  cat: 'drink';
  amount: DrinkAmt;       // sip 一口 / glass 一杯 / chug 干 / bottle 整瓶
  who: Who;               // 谁喝
  combo?: string;         // 附加：「再回答一道真心话」等
}

// Deeptalk
interface DeeptalkQ extends BaseQ {
  cat: 'deeptalk';
  topic: string;          // life / fear / relationship ...
}

// 题库根结构
interface QuestionBank {
  version: 1;
  topics: {
    truth:    TopicDef[];   // 话题注册表（UI 开关用）
    deeptalk: TopicDef[];
  };
  questions: (TruthQ | DareQ | DrinkQ | DeeptalkQ)[];  // 扁平题库
}
interface TopicDef { id: string; label: string; defaultOn: boolean; spicy?: boolean; }
```

### 对应现有代码的字段映射

| 新字段 | 现有 `CONFIG` 用法 | 说明 |
|--------|--------------------|------|
| `TruthQ.topic` | `truth.topics[].id` + 嵌套 `questions` | 旧：嵌套；新：扁平 + 标签。迁移时按 `topic` 重新分组即可 |
| `DareQ.contact` | `dare.items[].contact` (0/1/2) | 新增 `3` 亲密级，需「限制级模式」解锁 |
| `DareQ.stranger` | `dare.items[].stranger` | 不变 |
| `DareQ.target / scene` | （无） | 新增，未来做「指定对象/当众」开关 |
| `DrinkQ.amount / who` | `drink.amounts[]`（仅文案） | 新拆成结构化字段，便于「指定他人喝」过滤 |
| `risk / difficulty` | （无） | 新增门控维度 |
| `QuestionBank.topics` | （无，UI 写死） | 新增：话题注册表，UI 动态渲染开关 |

---

## 三、分类树（4 大类 → 话题/维度分支）

```
喝酒大转盘题库 (目标 ≥ 1000)
│
├─ ① 真心话 TRUTH                (~580 题)  ▸ 按 topic 分支
│   ├─ hobby      爱好兴趣        45
│   ├─ childhood  童年回忆        45
│   ├─ school     校园/学生时代    45
│   ├─ family     家庭亲情        40
│   ├─ friendship 友情            45
│   ├─ love       爱情观          45
│   ├─ ex         前任           40  (defaultOn:false)
│   ├─ secret     秘密/糗事       45
│   ├─ money      金钱消费        40
│   ├─ work       职场/学业       40
│   ├─ body       身体/外貌       35  (risk:mild)
│   ├─ sex        性观念         30  (spicy, 限制级模式)
│   ├─ dream      理想/人生       40
│   ├─ social     社交/人情       35
│   └─ weakness   恐惧/弱点       35
│
├─ ② 大冒险 DARE                 (~330 题)  ▸ 按 contact × target 维度
│   ├─ self-show  单人表演      50  (contact0)
│   ├─ verbal     语言/土味情话   45  (contact0)
│   ├─ phone      手机/社媒任务   45  (contact0, scene:phone)
│   ├─ contact1   肢体·轻       50  (contact1: 拥抱/牵手/靠肩)
│   ├─ contact2   肢体·重       45  (contact2: 贴脸/坐腿/喂食)
│   ├─ contact3   肢体·亲密      25  (contact3, 限制级模式)
│   ├─ punish     惩罚/搞怪      40  (contact0)
│   └─ stranger   陌生人互动     30  (stranger:true, 需 allowStranger)
│
├─ ③ 直接喝 DRINK               (~90 题)   ▸ 按 amount × who
│   ├─ basic      基础喝        20  (sip/glass, self)
│   ├─ chug       罚酒干杯      20  (chug)
│   ├─ others     指定他人喝     15  (who:left/right/choose)
│   ├─ chain      接力/连锁喝    15  (combo 连锁)
│   ├─ combo      喝+一道题     12  (combo: 喝完答真心话/大冒险)
│   └─ fun        趣味喝法       8   (用道具/奇怪姿势)
│
└─ ④ DEEPTALK                  (~100 题)  ▸ 按 topic 分支
    ├─ life       人生意义      15
    ├─ fear       内心恐惧      15
    ├─ relation   人际关系      15
    ├─ self       自我认知      15
    ├─ regret     遗憾/后悔     12
    ├─ value      价值观        14
    └─ future     未来憧憬      14
│
总计 ≈ 580 + 330 + 90 + 100 = 1100 题
```

---

## 四、1000+ 题量分配表（建议值）

| 大类 | 题量 | 分支数 | 单分支均值 |
|------|------|--------|-----------|
| 真心话 | 580 | 15 | ~39 |
| 大冒险 | 330 | 8 | ~41 |
| 直接喝 | 90 | 6 | ~15 |
| Deeptalk | 100 | 7 | ~14 |
| **合计** | **1100** | **36** | — |

> 直接喝天然题少（喝法有限），靠 `combo`（喝+题）和 `who` 组合补足，不硬凑文案，避免尴尬。

---

## 五、风险门控（对应你原需求）

| 开关 | 控制维度 | 实现 |
|------|----------|------|
| 内容开关（4 类） | `cat.enabled` | 现有，保留 |
| 真心话话题勾选 | `TopicDef.defaultOn` + `TruthQ.topic` | 现有话题机制扩展为 15 个 |
| 最大肢体接触程度 | `DareQ.contact ≤ maxContact` | 现有 `maxContact` 扩展到 0~3 |
| 允许骚扰陌生人 | `DareQ.stranger && allowStranger` | 现有，保留 |
| **新增·限制级模式** | `risk==='spicy'` 的题（性观念 / contact3 / 部分 mild）需开启 | 避免社死与越界 |
| **新增·难度渐进（可选）** | 按 `difficulty` 控制前 N 轮只出 1 级 | 未来扩展 |

---

## 六、可视化编辑 / 导入导出 JSON（下一步要做）

题库结构定型后，后台编辑器只需要三块：

1. **话题开关面板**：从 `QuestionBank.topics` 动态渲染（不再写死）。
2. **题目表格编辑器**：按 `cat + topic` 过滤，增删改查，每条显示 `risk / difficulty / contact / stranger` 标签，可批量勾选启停。
3. **导入 / 导出**：`QuestionBank` 整体序列化为一个 JSON 文件；导入时做 schema 校验（缺字段/类型错则报错并标红行）。

> JSON 结构就是上面的 `QuestionBank`，所以「导入导出」= 直接 `JSON.stringify / JSON.parse` 整个题库，外加一层 schema 校验。无需自建格式。

---

## 七、确认后即可推进的下一步

1. 你**确认分类树**（是否要加/删某些话题，比如 `ex` 前任要不要独立、要不要加 `宠物/旅行/游戏` 等）。
2. 我按上面的分配**批量生成 1000+ 题**（保证不重复、尺度分级正确）。
3. 把 starter 的 `CONFIG` 重构为 `QuestionBank` 扁平结构 + 动态话题开关。
4. 加**后台可视化编辑 + 导入导出 JSON**面板。
5. （可选）暗箱精确到「某道题」而非「某类」。

---

### 附：单条样例（便于你 review 结构）

```json
{ "id":"truth-ex-0003", "cat":"truth", "topic":"ex", "text":"你还留着前任送的东西吗？", "risk":"mild", "difficulty":2 }
{ "id":"dare-contact2-0012", "cat":"dare", "text":"和右边的人十指相扣 10 秒", "contact":2, "stranger":false, "target":"partner", "scene":"any" }
{ "id":"drink-chug-0007", "cat":"drink", "text":"向全场敬酒并干杯", "amount":"chug", "who":"self" }
{ "id":"deeptalk-fear-0009", "cat":"deeptalk", "topic":"fear", "text":"你最害怕失去的人是谁？为什么？" }
```
