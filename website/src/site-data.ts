// 全站共享常量与文案数据（发版时同步 package.json 的 version 与 README）
export const PRODUCT = 'AI Study Kit';
export const REPO_URL = 'https://github.com/jerryjiao/dsh-ai-study-kit';
export const LICENSE = 'MIT';
export const VERSION = '0.2.0';
export const INSTALL_CMD = 'dsh plugin --profile web add dsh-ai-study-kit';
export const PREREQ = '需要 DSH ≥ 0.2.1-rc.5、Node 22.19+';

export const NAV_LINKS = [
  { href: '#capabilities', label: '能力' },
  { href: '#quickstart', label: '上手' },
  { href: '#shots', label: '截图' },
  { href: '#safety', label: '安全' },
  { href: '#faq', label: '常见问题' },
];

export const PROBLEMS = [
  {
    icon: 'clock',
    title: '学完就忘',
    body: '间隔重复排到期闪卡，错题答错进回炉队列、连对才毕业。复习顺序由数据算，不靠感觉。',
  },
  {
    icon: 'layers',
    title: '内容和练习两张皮',
    body: '同一份 examples 既生成题目也出闪卡，课程、考点、进度用同一套 id 对齐，改一处不会两处打架。',
  },
  {
    icon: 'file',
    title: '换个工具就丢进度',
    body: 'progress.json 是你项目目录里的纯文本文件，换机器、做备份、看 diff 都随你。',
  },
];

export const CONSOLE_PAGES = [
  {
    name: '首页',
    icon: 'home',
    body: '已答、正确率、错题一屏看完；继续上次、错题重练、按主题闯关都在这里起步。',
  },
  {
    name: '答题',
    icon: 'check',
    body: '单选、多选、判断题当场判分；错了给解析，多选题全对才算对。',
  },
  {
    name: '闪卡',
    icon: 'cards',
    body: '按到期时间排队，翻面看答案，评完「忘了 / 模糊 / 记得」下一张什么时候来就定了。',
  },
  {
    name: '全景',
    icon: 'map',
    body: '考点按「已掌握 / 在学 / 薄弱 / 未接触」四态着色，下一站推荐直接跳去补。',
  },
];

export const SKILLS = [
  {
    cmd: '/ask-coach',
    name: '学习教练',
    body: '先扫一遍进度、错题、到期闪卡和考期，再告诉现在最该做的一件事，以及为什么是它。',
  },
  {
    cmd: '/study-coach',
    name: '陪练',
    body: '坐下就学：开场报今天最该练什么，一段一段讲，讲完当场考，考不过就回去补。',
  },
  {
    cmd: '/study-doctor',
    name: '体检',
    body: '把题库、内容对齐、环境配置一起查一遍，红了按顺序告诉你先修哪个。',
  },
  {
    cmd: '/study-recap',
    name: '错题串讲',
    body: '把错题从「知道答案」讲到「知道为什么错」，串完交回给你重做。',
  },
  {
    cmd: '/study-podcast',
    name: '播客',
    body: '把没掌握的课或错题串讲合成双人播客，通勤路上听。',
  },
];

export const STEPS = [
  {
    num: '01',
    title: '装插件',
    body: '在终端跑一条命令（profile 名换成你自己的，web 是最常见的那个）；装完重启宿主，插件进入 active 就表示五个技能注册好了。',
    code: INSTALL_CMD,
  },
  {
    num: '02',
    title: '装技能并建学习项目',
    body: '在会话里敲 /ask-coach，告诉教练你要学什么。它会先扫状态，再带你建一个学习项目——目录里只需要 examples/ 和一份 progress.json。',
    code: '/ask-coach 我要学 git',
  },
  {
    num: '03',
    title: '打开侧栏「学习台」',
    body: '侧栏出现学习台图标，点开就是题目、闪卡和全景；右上角项目下拉确认指向刚建的项目，就能开始答题。',
    shot: 'home',
    alt: '学习台首页：已答、正确率、错题统计，以及继续上次、错题重练、按主题闯关三个入口。',
    caption: '学习台首页：统计、继续学习与按主题闯关都在一屏内。',
  },
];

export const SHOTS = [
  {
    file: 'home',
    title: '学习台首页',
    alt: '学习台首页：顶部是已答、正确率、错题统计，中间是继续上次与错题重练按钮，下面是按主题闯关列表。',
    caption: '首页：先看统计，再决定今天从「继续上次」还是「错题重练」进。',
  },
  {
    file: 'practice',
    title: '答题',
    alt: '答题页：一道多选题，选项带字母序号，底部是提交答案按钮与本题集进度。',
    caption: '答题：选项、判分、解析在同一张卡上；多选题全对才算对。',
  },
  {
    file: 'flashcards',
    title: '闪卡',
    alt: '闪卡页：卡片正面是问题，下方是「忘了 / 模糊 / 记得」三个评级按钮和到期队列进度。',
    caption: '闪卡：按到期时间排队，评完一张就排下一张的复习时间。',
  },
  {
    file: 'panorama',
    title: '全景',
    alt: '全景页：考点节点按已掌握、在学、薄弱、未接触四种状态着色，顶部是下一站推荐。',
    caption: '全景：考点四态一眼看完，薄弱节点可以直接跳去刷题。',
  },
  {
    file: 'dark',
    title: '深色模式',
    alt: '学习台首页的深色模式：统计卡、主按钮与主题进度在暗色背景下换成低亮度配色。',
    caption: '深色：亮暗两套 token 只作用在学习台面板内，不干扰宿主主题。',
  },
];

export const SAFETY = [
  {
    icon: 'lock',
    title: '数据不出本机',
    body: '学习台的页面与插件宿主只在本机回环上通信，没有云同步、没有遥测，也没有要你登录的账号。',
  },
  {
    icon: 'file',
    title: '进度是纯文本',
    body: 'progress.json 是普通 JSON：能备份、能 diff、能进你自己的 git；写坏了会拒绝覆盖，不会悄悄清空。',
  },
  {
    icon: 'folder',
    title: '只读你选定的项目',
    body: '插件只认你选中的那个学习项目目录，不扫描别处、不碰你的笔记和其他仓库。',
  },
  {
    icon: 'image',
    title: '截图用虚构数据',
    body: '官网上所有截图都来自虚构的示例学习项目，不含任何真实用户、真实进度或个人信息。',
  },
];

export const FAQS = [
  {
    q: '和原来的网页版是什么关系？',
    a: '同一份学习台 UI 搬进了 DSH：题目、闪卡、全景还是那套页面和数据格式，只是不再需要自己起一个网页服务。原来的答题站源码仍留在插件包里，供需要独立部署的人使用。',
  },
  {
    q: '需要联网吗？',
    a: '浏览、答题、闪卡、看全景全程离线，只读写本机文件。生成新题目、产课和做播客要调用模型，那几步才需要网络和你的模型配置。',
  },
  {
    q: '会不会动我的笔记？',
    a: '不会。插件只在学习项目根目录写 progress.json，学习记录放在项目里的 study/ 目录；其他文件只读不写。',
  },
  {
    q: '卸载插件后数据还在吗？',
    a: '在。题目、闪卡、进度都是你项目目录里的普通文件，插件只是读写它们的工具；卸载插件不会删你的学习项目。',
  },
];

export const CHANGELOG = [
  {
    version: '0.2.0',
    date: '2026-11-16',
    title: '学习台搬进 DSH',
    points: [
      '新增侧栏「学习台」：首页、答题、闪卡、全景四页，数据直接读写你选定的学习项目。',
      '页面与宿主经本机回环 RPC 通信，不再需要单独启动网页服务或配置端口。',
      '插件自动识别轻布局项目（examples/<theme>/ + progress.json + study/），并提示迁移旧的 kit/apps/quiz-app 布局。',
      'README 与技能说明全面改写为 DSH 学习台用法；五个技能命令保持不变。',
    ],
  },
  {
    version: '0.1.0',
    date: '2026-11-15',
    title: '五个技能打包成 DSH 插件',
    points: [
      '把 ai-study-kit 的五个学习教练技能（ask-coach / study-coach / study-doctor / study-recap / study-podcast）注册进 DSH。',
      '插件零运行时依赖，只用到 Node 的 fs / path / url。',
      '补齐安装文档：GitHub 直装命令经过真实环境验证，并加上插件图标。',
      '保留上游 kit 快照与参考资料，供技能按需读取。',
    ],
  },
];
