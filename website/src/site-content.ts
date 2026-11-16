// 全站文案：中英两套，结构由 SiteContent 约束（缺键会编译报错）
import type { Lang } from './site-constants';

export type { Lang };

export interface NavLink {
  href: string;
  label: string;
}

export interface IconItem {
  icon: string;
  title: string;
  body: string;
}

export interface ConsolePage {
  name: string;
  icon: string;
  body: string;
}

export interface Skill {
  cmd: string;
  name: string;
  body: string;
}

export interface Step {
  num: string;
  title: string;
  body: string;
  code?: string;
  shot?: string;
  alt?: string;
  caption?: string;
}

export interface Shot {
  file: string;
  title: string;
  alt: string;
  caption: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Release {
  version: string;
  date: string;
  title: string;
  points: string[];
}

export interface ArchBox {
  kind: 'box';
  tone: 'blue' | 'plain' | 'green' | 'gold';
  kicker: string;
  title: string;
  sub: string;
}

export interface ArchLink {
  kind: 'link';
  lines: string[];
}

export interface SiteContent {
  meta: { prereq: string; licenseWord: string; telemetry: string; noServer: string };
  layout: { skip: string; copied: string; title: string; description: string };
  nav: {
    ariaSections: string;
    ariaHome: string;
    ariaRepo: string;
    repoTitle: string;
    install: string;
    langLabel: string;
    langText: string;
    links: NavLink[];
  };
  hero: {
    kicker: string;
    titleBefore: string;
    titleAccent: string;
    titleAfter: string;
    sub: string;
    terminal: string;
    copyCmd: string;
    ctaPrimary: string;
    ctaDocs: string;
    panelAria: string;
    panelLabel: string;
    panelCaptionSidebar: string;
    panelCaptionSession: string;
    panelFoot: string;
  };
  problem: { kicker: string; title: string; sub: string; items: IconItem[] };
  features: { kicker: string; title: string; sub: string; groupConsole: string; groupSkills: string };
  quickstart: { kicker: string; title: string; sub: string; steps: Step[] };
  shots: { kicker: string; title: string; sub: string; items: Shot[] };
  safety: { kicker: string; title: string; sub: string; items: IconItem[] };
  architecture: {
    kicker: string;
    title: string;
    sub: string;
    aria: string;
    items: Array<ArchBox | ArchLink>;
    moreSummary: string;
    details: Array<{ title: string; body: string }>;
  };
  faq: { kicker: string; title: string; items: Faq[] };
  footer: { note: string; ariaNav: string; repo: string; docs: string; changelog: string; license: string };
  codeblock: { copy: string };
  consolePages: ConsolePage[];
  skills: Skill[];
  changelog: {
    title: string;
    description: string;
    kicker: string;
    heading: string;
    leadBefore: string;
    leadMid: string;
    leadLink: string;
    leadAfter: string;
    note: string;
    releases: Release[];
  };
}

const ZH: SiteContent = {
  meta: {
    prereq: '需要 DSH ≥ 0.2.1-rc.5、Node 22.19+',
    licenseWord: '许可',
    telemetry: '无遥测',
    noServer: '无独立服务器',
  },
  layout: {
    skip: '跳到主要内容',
    copied: '已复制',
    title: 'AI Study Kit — 把学习教练装进 DSH：题目、闪卡、进度都在本机',
    description:
      'DeepSeek Harness（DSH）学习教练插件：五个学习教练技能 + 一个集成学习台。题目、闪卡、考点全景和进度都在你的项目目录里，数据不出本机。',
  },
  nav: {
    ariaSections: '页面区块',
    ariaHome: ' 首页',
    ariaRepo: '在 GitHub 上查看源码',
    repoTitle: 'GitHub 仓库',
    install: '安装',
    langLabel: '切换语言',
    langText: 'EN',
    links: [
      { href: '#capabilities', label: '能力' },
      { href: '#quickstart', label: '上手' },
      { href: '#shots', label: '截图' },
      { href: '#safety', label: '安全' },
      { href: '#faq', label: '常见问题' },
    ],
  },
  hero: {
    kicker: 'DeepSeek Harness 学习插件',
    titleBefore: '把',
    titleAccent: '学习教练',
    titleAfter: '装进 DSH',
    sub: '五个学习教练技能 + 一个学习台。题目、闪卡、考点全景和进度，全在你自己的项目目录里。',
    terminal: '终端',
    copyCmd: '复制安装命令',
    ctaPrimary: '5 分钟上手',
    ctaDocs: '安装与用法文档',
    panelAria: '装好后的样子',
    panelLabel: '装好后你会看到',
    panelCaptionSidebar: '侧栏 · 学习台',
    panelCaptionSession: '会话 · 五个命令',
    panelFoot: '所有页面都读写你选定的学习项目；换项目就是换一个目录。',
  },
  problem: {
    kicker: '它解决什么',
    title: '学习卡住的地方，不是不够努力',
    sub: '三件最常见的事：学了记不住、内容跟练习对不上、换个工具进度就没了。学习台和五个技能就是对着这三件事做的。',
    items: [
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
    ],
  },
  features: {
    kicker: '它做什么',
    title: '一个学习台，五个随叫随到的教练',
    sub: '学习台负责看和练：进度、题目、闪卡、考点全景。技能负责在会话里带你走：下一步做什么、哪里没学透、哪里该回头补。',
    groupConsole: '学习台 · 四个页面',
    groupSkills: '五个技能 · 会话里直接敲',
  },
  quickstart: {
    kicker: '5 分钟上手',
    title: '三步，从安装到第一道题',
    sub: '不用起服务、不用配端口。装插件、让教练建一个学习项目，然后打开侧栏的学习台。',
    steps: [
      {
        num: '01',
        title: '装插件',
        body: '在终端跑一条命令（profile 名换成你自己的，web 是最常见的那个）；装完重启宿主，插件进入 active 就表示五个技能注册好了。',
        code: 'dsh plugin --profile web add dsh-ai-study-kit',
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
    ],
  },
  shots: {
    kicker: '截图',
    title: '学习台长什么样',
    sub: '四个页面，加一张深色模式。截图都来自虚构的示例学习项目，不含任何真实用户数据。',
    items: [
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
    ],
  },
  safety: {
    kicker: '安全与隐私',
    title: '你的学习数据，一直是你自己的文件',
    sub: '插件没有账号系统、没有服务端数据库。它做的事只有一件：读写你选定的那个学习项目目录。',
    items: [
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
    ],
  },
  architecture: {
    kicker: '架构',
    title: '页面在 DSH 里，数据在你项目里',
    sub: '没有中间服务器，也没有需要同步的云端。页面、通道、宿主、项目，四段链路都在本机完成。',
    aria: 'DSH 学习台页面经本机回环 RPC 通道交给插件宿主半边，宿主读写你的学习项目目录',
    items: [
      { kind: 'box', tone: 'blue', kicker: 'DSH 内', title: '学习台页面', sub: '首页 · 答题 · 闪卡 · 全景' },
      { kind: 'link', lines: ['RPC', '请求'] },
      { kind: 'box', tone: 'plain', kicker: '本机回环', title: 'RPC 通道', sub: 'loopback · 请求/响应' },
      { kind: 'link', lines: ['分发'] },
      { kind: 'box', tone: 'green', kicker: '插件', title: '宿主半边', sub: '读写项目 · 注册技能' },
      { kind: 'link', lines: ['fs / path'] },
      { kind: 'box', tone: 'gold', kicker: '你的磁盘', title: '学习项目目录', sub: 'examples/ · progress.json · study/' },
    ],
    moreSummary: '展开：技能注册、服务器与旧网页版',
    details: [
      {
        title: '技能怎么注册进来',
        body: '五个技能随插件一起注册进 DSH。你在会话里敲 /ask-coach 或者直接说「我想学 XX」，DSH 就会把请求交给对应技能；技能通过宿主暴露的读写能力操作学习项目，不自己起后台进程。',
      },
      {
        title: '为什么没有独立服务器',
        body: '学习台页面由 DSH 直接加载，数据经本机回环 RPC 取。旧版需要自己启动网页服务、记端口、开浏览器；现在装完插件、重启宿主就能用。',
      },
      {
        title: '和旧网页版的关系',
        body: '同一套学习台页面和数据格式搬进了 DSH，题目、闪卡、全景的读写方式没有变。旧的独立答题站源码仍留在插件包里，供需要单独部署的人使用；日常学习不再需要它。',
      },
    ],
  },
  faq: {
    kicker: '常见问题',
    title: '你可能想先问的四件事',
    items: [
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
    ],
  },
  footer: {
    note: '把学习教练装进 DeepSeek Harness。',
    ariaNav: '页脚',
    repo: 'GitHub 仓库',
    docs: '文档',
    changelog: '更新日志',
    license: 'MIT 许可证',
  },
  codeblock: { copy: '复制代码' },
  consolePages: [
    { name: '首页', icon: 'home', body: '已答、正确率、错题一屏看完；继续上次、错题重练、按主题闯关都在这里起步。' },
    { name: '答题', icon: 'check', body: '单选、多选、判断题当场判分；错了给解析，多选题全对才算对。' },
    { name: '闪卡', icon: 'cards', body: '按到期时间排队，翻面看答案，评完「忘了 / 模糊 / 记得」下一张什么时候来就定了。' },
    { name: '全景', icon: 'map', body: '考点按「已掌握 / 在学 / 薄弱 / 未接触」四态着色，下一站推荐直接跳去补。' },
  ],
  skills: [
    { cmd: '/ask-coach', name: '学习教练', body: '先扫一遍进度、错题、到期闪卡和考期，再告诉现在最该做的一件事，以及为什么是它。' },
    { cmd: '/study-coach', name: '陪练', body: '坐下就学：开场报今天最该练什么，一段一段讲，讲完当场考，考不过就回去补。' },
    { cmd: '/study-doctor', name: '体检', body: '把题库、内容对齐、环境配置一起查一遍，红了按顺序告诉你先修哪个。' },
    { cmd: '/study-recap', name: '错题串讲', body: '把错题从「知道答案」讲到「知道为什么错」，串完交回给你重做。' },
    { cmd: '/study-podcast', name: '播客', body: '把没掌握的课或错题串讲合成双人播客，通勤路上听。' },
  ],
  changelog: {
    title: '更新日志 · AI Study Kit',
    description: 'AI Study Kit 的版本更新记录：学习台搬进 DSH、安装体验、五个技能打包。',
    kicker: '更新日志',
    heading: '每个版本改了什么',
    leadBefore: '当前版本 ',
    leadMid: '。完整历史（含更早的 ai-study-kit 记录）见',
    leadLink: '仓库里的 CHANGELOG.md',
    leadAfter: '。',
    note: '本页从 0.2.0 起手工维护。更细的提交记录和更早的历史，以仓库的 CHANGELOG.md 与 git 历史为准。',
    releases: [
      {
        version: '0.2.1',
        date: '2026-11-16',
        title: '官网双语、文案纠偏',
        points: [
          '官网新增英文版 /en/、/en/docs/、/en/changelog/，顶部可中英互切；仓库新增 README.en.md。',
          '英文页面配英文界面截图，中文页面继续用中文界面截图。',
          '删掉「进度跨设备同步」的不实文案：进度只存在本地项目里。',
          '修正英文单数形态，全景页不再出现「1 wrong answers」；课程未就绪提示改为直读 examples/、无需构建。',
        ],
      },
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
    ],
  },
};

const EN: SiteContent = {
  meta: {
    prereq: 'Requires DSH ≥ 0.2.1-rc.5 and Node 22.19+',
    licenseWord: 'license',
    telemetry: 'no telemetry',
    noServer: 'no standalone server',
  },
  layout: {
    skip: 'Skip to main content',
    copied: 'Copied',
    title: 'AI Study Kit — put a study coach inside DSH: questions, flashcards, progress, all local',
    description:
      'Study-coach plugin for DeepSeek Harness (DSH): five coaching skills plus a built-in study desk. Questions, flashcards, the exam-point panorama, and progress live in your own project folder. Data never leaves your machine.',
  },
  nav: {
    ariaSections: 'Page sections',
    ariaHome: ' home',
    ariaRepo: 'View source on GitHub',
    repoTitle: 'GitHub repository',
    install: 'Install',
    langLabel: 'Switch language',
    langText: '中文',
    links: [
      { href: '#capabilities', label: 'Capabilities' },
      { href: '#quickstart', label: 'Quickstart' },
      { href: '#shots', label: 'Screenshots' },
      { href: '#safety', label: 'Safety' },
      { href: '#faq', label: 'FAQ' },
    ],
  },
  hero: {
    kicker: 'DeepSeek Harness study plugin',
    titleBefore: 'Put a ',
    titleAccent: 'study coach',
    titleAfter: 'inside DSH',
    sub: 'Five coaching skills plus one study desk. Questions, flashcards, the exam-point panorama, and your progress all live in your own project folder.',
    terminal: 'Terminal',
    copyCmd: 'Copy install command',
    ctaPrimary: 'Get started in 5 minutes',
    ctaDocs: 'Install & usage docs',
    panelAria: 'What it looks like once installed',
    panelLabel: 'Once installed you will see',
    panelCaptionSidebar: 'Sidebar · Study Desk',
    panelCaptionSession: 'Session · five commands',
    panelFoot: 'Every page reads and writes the study project you pick; switching projects just means switching one folder.',
  },
  problem: {
    kicker: 'What it fixes',
    title: 'When studying stalls, it is not for lack of effort',
    sub: 'Three things happen most often: you forget what you just learned, the material and the practice drift apart, and switching tools loses your progress. The study desk and the five skills are built for exactly these three.',
    items: [
      {
        icon: 'clock',
        title: 'You forget what you learned',
        body: 'Due cards are scheduled with spaced repetition; wrong answers go back into the queue and only graduate after consecutive correct ones. The review order is computed from data, not from a feeling.',
      },
      {
        icon: 'layers',
        title: 'Content and practice drift apart',
        body: 'One examples folder produces both questions and flashcards, with lessons, exam points, and progress aligned on the same ids, so editing one place does not break another.',
      },
      {
        icon: 'file',
        title: 'Switching tools loses progress',
        body: 'progress.json is a plain text file in your project folder: move machines, back it up, diff it, whatever you like.',
      },
    ],
  },
  features: {
    kicker: 'What it does',
    title: 'One study desk, five coaches on call',
    sub: 'The desk is for looking and drilling: progress, questions, flashcards, the exam-point panorama. The skills are for the session: what to do next, where you are thin, where to loop back.',
    groupConsole: 'Study Desk · four pages',
    groupSkills: 'Five skills · type them in a session',
  },
  quickstart: {
    kicker: 'Five minutes',
    title: 'Three steps from install to your first question',
    sub: 'No server to start, no port to configure. Install the plugin, let the coach create a study project, then open the Study Desk in the sidebar.',
    steps: [
      {
        num: '01',
        title: 'Install the plugin',
        body: 'Run one command in a terminal (swap in your own profile name; web is the common one). Restart the host afterwards: once the plugin is active, all five skills are registered.',
        code: 'dsh plugin --profile web add dsh-ai-study-kit',
      },
      {
        num: '02',
        title: 'Create a study project',
        body: 'Type /ask-coach in a session and tell the coach what you want to learn. It scans your state first, then walks you through creating a study project: the folder only needs examples/ and a progress.json.',
        code: '/ask-coach I want to learn git',
      },
      {
        num: '03',
        title: 'Open the Study Desk in the sidebar',
        body: 'A Study Desk icon appears in the sidebar; open it for questions, flashcards, and the panorama. Check that the project dropdown in the top-right points at the project you just created, and you can start answering.',
        shot: 'home',
        alt: 'Study Desk home: answered, accuracy, and mistake stats, plus resume, drill-mistakes, and play-by-topic entry points.',
        caption: 'Study Desk home: stats, resume, and topic play all on one screen.',
      },
    ],
  },
  shots: {
    kicker: 'Screenshots',
    title: 'What the Study Desk looks like',
    sub: 'Four pages plus one dark-mode shot. Every screenshot comes from a fictional example study project, with no real user data.',
    items: [
      {
        file: 'home',
        title: 'Study Desk home',
        alt: 'Study Desk home: answered, accuracy, and mistake stats on top, resume and drill-mistakes buttons in the middle, and the play-by-topic list below.',
        caption: 'Home: read the stats first, then decide whether today starts from resume or from drilling mistakes.',
      },
      {
        file: 'practice',
        title: 'Practice',
        alt: 'Practice page: a multiple-choice question with lettered options, a submit button at the bottom, and progress through the current set.',
        caption: 'Practice: options, grading, and explanation on one card; a multiple-choice question only counts when every correct option is picked.',
      },
      {
        file: 'flashcards',
        title: 'Flashcards',
        alt: 'Flashcards page: the question on the front of the card, three rating buttons (forgot / fuzzy / remembered) below, and due-queue progress.',
        caption: 'Flashcards: queued by due date, and each rating schedules the next review.',
      },
      {
        file: 'panorama',
        title: 'Panorama',
        alt: 'Panorama page: exam-point nodes colored by mastered, learning, weak, and untouched, with the next recommended stop on top.',
        caption: 'Panorama: all four states at a glance, and a weak node can jump straight into practice.',
      },
      {
        file: 'dark',
        title: 'Dark mode',
        alt: 'The Study Desk home in dark mode: stat cards, the primary button, and topic progress switch to low-brightness colors on a dark background.',
        caption: 'Dark: the light and dark token sets apply only inside the Study Desk panel and do not fight the host theme.',
      },
    ],
  },
  safety: {
    kicker: 'Safety and privacy',
    title: 'Your study data is always your own files',
    sub: 'The plugin has no account system and no server-side database. It does one thing: read and write the study project folder you selected.',
    items: [
      {
        icon: 'lock',
        title: 'Data stays on your machine',
        body: 'The Study Desk pages and the plugin host only talk over local loopback: no cloud sync, no telemetry, and no account to log into.',
      },
      {
        icon: 'file',
        title: 'Progress is plain text',
        body: 'progress.json is ordinary JSON: back it up, diff it, commit it to your own git. If it is corrupted the plugin refuses to overwrite it instead of quietly wiping it.',
      },
      {
        icon: 'folder',
        title: 'Reads only the project you pick',
        body: 'The plugin only touches the study project folder you select. It does not scan elsewhere or touch your notes and other repositories.',
      },
      {
        icon: 'image',
        title: 'Screenshots use fictional data',
        body: 'Every screenshot on this site comes from a fictional example study project, with no real users, real progress, or personal information.',
      },
    ],
  },
  architecture: {
    kicker: 'Architecture',
    title: 'Pages inside DSH, data inside your project',
    sub: 'No middle server and no cloud to sync. Pages, channel, host, and project: all four links complete on your machine.',
    aria: 'The DSH Study Desk pages reach the plugin host half over a local loopback RPC channel, and the host reads and writes your study project folder.',
    items: [
      { kind: 'box', tone: 'blue', kicker: 'Inside DSH', title: 'Study Desk pages', sub: 'Home · Practice · Flashcards · Panorama' },
      { kind: 'link', lines: ['RPC', 'request'] },
      { kind: 'box', tone: 'plain', kicker: 'Local loopback', title: 'RPC channel', sub: 'loopback · request / response' },
      { kind: 'link', lines: ['dispatch'] },
      { kind: 'box', tone: 'green', kicker: 'Plugin', title: 'Host half', sub: 'read / write project · register skills' },
      { kind: 'link', lines: ['fs / path'] },
      { kind: 'box', tone: 'gold', kicker: 'Your disk', title: 'Study project folder', sub: 'examples/ · progress.json · study/' },
    ],
    moreSummary: 'More: skill registration, servers, and the old web app',
    details: [
      {
        title: 'How the skills get registered',
        body: 'All five skills register into DSH together with the plugin. Type /ask-coach in a session, or just say "I want to learn X", and DSH hands the request to the matching skill. Skills operate on the study project through the read/write abilities the host exposes, and never start background processes of their own.',
      },
      {
        title: 'Why there is no standalone server',
        body: 'DSH loads the Study Desk pages directly and the data comes back over local loopback RPC. The old version required starting a web server, remembering a port, and opening a browser; now you install the plugin and restart the host.',
      },
      {
        title: 'How this relates to the old web app',
        body: 'The same Study Desk pages and data format moved into DSH, and questions, flashcards, and the panorama are read and written the same way. The standalone quiz-site source still ships in the plugin package for anyone who wants to deploy it separately; day-to-day study no longer needs it.',
      },
    ],
  },
  faq: {
    kicker: 'FAQ',
    title: 'Four things you might want to ask first',
    items: [
      {
        q: 'How does this relate to the old web version?',
        a: 'The same Study Desk UI moved into DSH: same pages and data format, except you no longer start a web server yourself. The standalone quiz-site source still ships in the plugin package for anyone who needs a separate deployment.',
      },
      {
        q: 'Does it need a network connection?',
        a: 'Browsing, answering, flashcards, and the panorama all work offline, reading and writing only local files. Generating new questions, producing lessons, and making podcasts call a model, and only those steps need network access and your model configuration.',
      },
      {
        q: 'Will it touch my notes?',
        a: 'No. The plugin only writes progress.json in the study project root, and study records live in the project study/ folder. Everything else is read-only.',
      },
      {
        q: 'Is my data still there after I uninstall?',
        a: 'Yes. Questions, flashcards, and progress are ordinary files in your project folder, and the plugin is just the tool that reads and writes them; uninstalling does not delete your study project.',
      },
    ],
  },
  footer: {
    note: 'Puts a study coach inside DeepSeek Harness.',
    ariaNav: 'Footer',
    repo: 'GitHub repository',
    docs: 'Docs',
    changelog: 'Changelog',
    license: 'MIT license',
  },
  codeblock: { copy: 'Copy code' },
  consolePages: [
    { name: 'Home', icon: 'home', body: 'Answered, accuracy, and mistakes on one screen; resume, drill mistakes, and play by topic all start here.' },
    { name: 'Practice', icon: 'check', body: 'Single-choice, multiple-choice, and true/false are graded on the spot; wrong answers come with an explanation, and a multiple-choice question only counts when every correct option is picked.' },
    { name: 'Flashcards', icon: 'cards', body: 'Queued by due date, flip to see the answer, and rating it forgot / fuzzy / remembered decides when the next one comes.' },
    { name: 'Panorama', icon: 'map', body: 'Exam points are colored by mastered / learning / weak / untouched, and the recommended next stop jumps straight to the drill.' },
  ],
  skills: [
    { cmd: '/ask-coach', name: 'Study coach', body: 'Scans your progress, mistakes, due cards, and exam date first, then names the single thing to do now and why that one.' },
    { cmd: '/study-coach', name: 'Practice partner', body: 'Sit down and study: it opens with what to drill today, teaches in segments, quizzes you right after each one, and loops back when you miss.' },
    { cmd: '/study-doctor', name: 'Health check', body: 'Checks the question bank, content alignment, and environment together; if something is red it tells you which one to fix first.' },
    { cmd: '/study-recap', name: 'Mistake walkthrough', body: 'Takes a wrong answer from knowing the answer to knowing why it was wrong, then hands it back for a retry.' },
    { cmd: '/study-podcast', name: 'Podcast', body: 'Turns unmastered lessons or mistake walkthroughs into a two-voice podcast for the commute.' },
  ],
  changelog: {
    title: 'Changelog · AI Study Kit',
    description: 'Release notes for AI Study Kit: the study desk moving into DSH, the install experience, and the five skills packaged as a plugin.',
    kicker: 'Changelog',
    heading: 'What changed in each release',
    leadBefore: 'Current version ',
    leadMid: '. For the full history, including earlier ai-study-kit entries, see the ',
    leadLink: 'CHANGELOG.md in the repository',
    leadAfter: '.',
    note: 'This page has been maintained by hand since 0.2.0. For the finer commit log and earlier history, the repository CHANGELOG.md and the git history are authoritative.',
    releases: [
      {
        version: '0.2.1',
        date: '2026-11-16',
        title: 'Bilingual site, honest copy',
        points: [
          'The website now ships English pages at /en/, /en/docs/, and /en/changelog/, switchable from the nav; the repo gains README.en.md.',
          'English pages use English-UI screenshots; Chinese pages keep the Chinese ones.',
          'Removed the false "progress syncs across devices" claim: progress stays in your local project.',
          'Fixed English singular forms (no more "1 wrong answers"), and the course hint now says content is read straight from examples/ with no build step.',
        ],
      },
      {
        version: '0.2.0',
        date: '2026-11-16',
        title: 'The Study Desk moves into DSH',
        points: [
          'New sidebar Study Desk: Home, Practice, Flashcards, and Panorama pages that read and write the study project you selected.',
          'Pages and host talk over local loopback RPC, so there is no separate web server to start and no port to configure.',
          'The plugin recognizes light-layout projects (examples/<theme>/ + progress.json + study/) and flags the old kit/apps/quiz-app layout for migration.',
          'README and skill docs rewritten around the DSH Study Desk; the five skill commands are unchanged.',
        ],
      },
      {
        version: '0.1.0',
        date: '2026-11-15',
        title: 'Five skills packaged as a DSH plugin',
        points: [
          'Registers the five ai-study-kit coaching skills (ask-coach / study-coach / study-doctor / study-recap / study-podcast) into DSH.',
          'Zero runtime dependencies: only Node fs / path / url are used.',
          'Install docs added: the direct GitHub install command was verified in a real environment, and the plugin now has an icon.',
          'Keeps the upstream kit snapshot and references for skills to read on demand.',
        ],
      },
    ],
  },
};

const CONTENT: Record<Lang, SiteContent> = { zh: ZH, en: EN };

export function getSite(lang: Lang = 'zh'): SiteContent {
  return CONTENT[lang] ?? ZH;
}

/** 站内链接前缀：zh 落在 /，en 落在 /en/ */
export function langPath(lang: Lang, base: string, path = ''): string {
  return lang === 'en' ? `${base}en/${path}` : `${base}${path}`;
}

/** 产品截图的地址：中文用中文界面图，英文用英文界面图（screenshots/en/ 下同名文件） */
export function shotPath(lang: Lang, base: string, name: string): string {
  return `${base}screenshots/${lang === 'en' ? 'en/' : ''}${name}.png`;
}

/** 当前页在另一种语言里的地址（语言切换用） */
export function alternatePath(lang: Lang, pathname: string, base: string): string {
  const rest = pathname.startsWith(base) ? pathname.slice(base.length) : pathname.replace(/^\//, '');
  if (lang === 'en') {
    const stripped = rest.replace(/^en\/?/, '');
    return stripped ? `${base}${stripped}` : base;
  }
  return `${base}en/${rest}`;
}
