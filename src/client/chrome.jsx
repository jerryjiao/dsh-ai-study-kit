/**
 * 学习台外壳（StudyTabs）：主面板顶栏的二级导航 + 右上角项目/主题/语言/设置开关。
 *
 * 它被 StudyApp 渲染在 MemoryRouter 里面（<Routes> 上方），因此可以直接用
 * NavLink/useLocation 做 tab 高亮，但绝不碰 URL 与浏览器历史。
 *
 * 设计语言沿用老站的自有 token（bg-surface / border / st-green …），不映射 DSH
 * 主题变量：宿主页面不进 preflight，只靠 app.css 里那两套 CSS 变量着色。
 */
import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const DARK_KEY = 'dsh-ai-study-kit-theme'

const STRINGS = {
  zh: {
    title: '学习台',
    tabs: { home: '首页', practice: '答题', flashcards: '闪卡', panorama: '全景' },
    project: '项目',
    theme: '主题',
    chooseProject: '选择学习项目',
    projectRoot: '项目根目录',
    projectHint: '指向含 examples/ 的学习项目；也可以直接粘贴绝对路径。',
    pathPlaceholder: '~/Documents/study-kit',
    apply: '使用此目录',
    applying: '正在打开…',
    detect: '检测到的项目',
    noProject: '未检测到项目',
    source: {
      remembered: '上次使用',
      home: '默认目录',
      cwd: '当前工作区',
      manual: '手动指定',
      none: '未检测',
    },
    noThemes: '这个项目里还没有主题（examples/ 为空）',
    questions: '题',
    cards: '卡',
    current: '当前',
    settings: '设置',
    dailyNewCards: '每日新卡',
    autoAdvance: '答对自动下一题',
    extOn: '显示拓展内容',
    lang: 'English',
    dark: '深色',
    light: '浅色',
    close: '关闭',
  },
  en: {
    title: 'Study Desk',
    tabs: { home: 'Home', practice: 'Practice', flashcards: 'Cards', panorama: 'Panorama' },
    project: 'Project',
    theme: 'Theme',
    chooseProject: 'Choose study project',
    projectRoot: 'Project root',
    projectHint: 'A folder containing examples/. An absolute path works too.',
    pathPlaceholder: '/Users/you/Documents/study-kit',
    apply: 'Use this folder',
    applying: 'Opening…',
    detect: 'Detected project',
    noProject: 'No project',
    source: {
      remembered: 'Last used',
      home: 'Default folder',
      cwd: 'Current workspace',
      manual: 'Manual',
      none: 'Not detected',
    },
    noThemes: 'No themes yet (examples/ is empty)',
    questions: 'questions',
    cards: 'cards',
    current: 'Current',
    settings: 'Settings',
    dailyNewCards: 'New cards / day',
    autoAdvance: 'Auto-advance when correct',
    extOn: 'Show extras',
    lang: '中文',
    dark: 'Dark',
    light: 'Light',
    close: 'Close',
  },
}

function useStrings(snapshot) {
  const lang = snapshot?.settings?.lang === 'en' ? 'en' : 'zh'
  return STRINGS[lang]
}

/** 点击外部关闭下拉；只在有下拉时挂监听。 */
function useDismiss(open, close) {
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    const onDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) close()
    }
    const onKey = (event) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])
  return ref
}

export function StudyTabs({ snapshot, onSetProject, onSetTheme, onSetSettings }) {
  const t = useStrings(snapshot)
  const [menu, setMenu] = useState(null)
  const [pathDraft, setPathDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem(DARK_KEY) === '1'
    } catch {
      return false
    }
  })
  const closeMenu = () => setMenu(null)
  const barRef = useDismiss(menu !== null, closeMenu)
  const { pathname } = useLocation()

  // 深色只作用于学习台自己的根容器（宿主页面不能改 <html>）。
  useEffect(() => {
    const root = document.querySelector('.dsh-study-root')
    if (!root) return
    root.classList.toggle('dark', dark)
    try {
      localStorage.setItem(DARK_KEY, dark ? '1' : '0')
    } catch {
      /* 忽略隐私模式写失败 */
    }
  }, [dark])

  const project = snapshot?.project ?? { root: '', source: 'none', legacy: false }
  const themes = snapshot?.themes ?? []
  const currentTheme = snapshot?.theme ?? null
  const current = themes.find((item) => item.slug === currentTheme)

  const tabClass = ({ isActive }) =>
    `px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[13px] sm:text-sm font-bold whitespace-nowrap transition-colors ${
      isActive
        ? 'bg-st-green-soft text-st-green-ink'
        : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
    }`

  const iconBtn =
    'grid place-items-center h-8 w-8 rounded-[10px] border-2 border-border bg-bg-surface ' +
    'text-text-muted hover:text-text-secondary hover:border-border-strong transition-colors'

  const menuCls =
    'absolute right-0 top-[calc(100%+6px)] z-40 w-[19rem] rounded-xl border-2 border-border ' +
    'bg-bg-surface p-2 shadow-pop'

  const submitProject = async () => {
    const root = pathDraft.trim()
    if (!root) return
    setBusy(true)
    setError('')
    try {
      await onSetProject?.(root)
      closeMenu()
    } catch (err) {
      setError(err?.message ?? String(err))
    } finally {
      setBusy(false)
    }
  }

  const patchSettings = (patch) => {
    onSetSettings?.(patch)
  }

  return (
    <header
      ref={barRef}
      className="relative z-20 shrink-0 h-[54px] bg-bg-surface border-b-2 border-border"
    >
      <div className="h-full px-3 sm:px-4 flex items-center gap-1.5 sm:gap-2">
        <span className="hidden min-[520px]:flex items-center gap-2 pr-1 text-sm font-bold text-text-primary tracking-tight select-none shrink-0">
          <BookGlyph />
          {t.title}
        </span>

        <nav className="flex items-center gap-0.5 sm:gap-1 min-w-0">
          <NavLink to="/" end className={tabClass}>
            {t.tabs.home}
          </NavLink>
          <NavLink to="/practice/all" className={tabClass}>
            {t.tabs.practice}
          </NavLink>
          <NavLink to="/flashcards" className={tabClass}>
            {t.tabs.flashcards}
          </NavLink>
          <NavLink to="/panorama" className={tabClass}>
            {t.tabs.panorama}
          </NavLink>
        </nav>

        <div className="flex-1" />

        <div className="flex items-center gap-1 shrink-0">
          {/* 项目 */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenu(menu === 'project' ? null : 'project')}
              className="h-8 max-w-[15rem] px-2.5 rounded-[10px] border-2 border-border bg-bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong text-[12px] font-bold flex items-center gap-1.5 transition-colors"
              title={project.root || t.chooseProject}
            >
              <FolderGlyph />
              <span className="truncate">
                {project.root ? baseName(project.root) : t.noProject}
              </span>
            </button>
            {menu === 'project' && (
              <div className={menuCls}>
                <p className="px-1.5 pt-1 pb-1.5 text-[11px] font-bold uppercase tracking-wide text-text-muted">
                  {t.projectRoot}
                </p>
                <p className="px-1.5 pb-1 text-[12px] leading-relaxed text-text-secondary break-all">
                  {project.root || t.noProject}
                  {project.root ? (
                    <span className="ml-1 text-text-faint">
                      （{t.source[project.source] ?? project.source}
                      {project.legacy ? ' · 旧布局' : ''}）
                    </span>
                  ) : null}
                </p>
                <form
                  onSubmit={(event) => {
                    event.preventDefault()
                    void submitProject()
                  }}
                  className="mt-1"
                >
                  <input
                    value={pathDraft}
                    onChange={(event) => setPathDraft(event.target.value)}
                    placeholder={t.pathPlaceholder}
                    spellCheck={false}
                    className="w-full h-8 px-2 rounded-lg border-2 border-border bg-bg-subtle text-[12px] text-text-primary placeholder:text-text-faint outline-none focus:border-st-blue"
                  />
                  <p className="px-1 pt-1.5 text-[11px] leading-relaxed text-text-faint">
                    {t.projectHint}
                  </p>
                  {error ? (
                    <p className="px-1 pt-1.5 text-[11px] leading-relaxed text-st-red">{error}</p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={busy || !pathDraft.trim()}
                    className="mt-2 w-full h-8 rounded-lg bg-st-green text-white text-[12px] font-bold disabled:opacity-40"
                  >
                    {busy ? t.applying : t.apply}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* 主题 */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenu(menu === 'theme' ? null : 'theme')}
              disabled={!themes.length}
              className="h-8 max-w-[12rem] px-2.5 rounded-[10px] border-2 border-border bg-bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong text-[12px] font-bold flex items-center gap-1.5 transition-colors disabled:opacity-40"
              title={current?.title ?? t.theme}
            >
              <span className="truncate">{current?.title ?? t.theme}</span>
              <CaretGlyph />
            </button>
            {menu === 'theme' && (
              <div className={`${menuCls} max-h-[60vh] overflow-auto`}>
                {themes.length === 0 ? (
                  <p className="px-1.5 py-2 text-[12px] text-text-muted">{t.noThemes}</p>
                ) : (
                  themes.map((item) => {
                    const on = item.slug === currentTheme
                    return (
                      <button
                        key={item.slug}
                        type="button"
                        onClick={() => {
                          onSetTheme?.(item.slug)
                          closeMenu()
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-2 ${
                          on ? 'bg-st-green-soft' : 'hover:bg-bg-hover'
                        }`}
                      >
                        <span
                          className={`flex-1 truncate text-[12.5px] font-bold ${
                            on ? 'text-st-green-ink' : 'text-text-primary'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="text-[11px] text-text-faint whitespace-nowrap">
                          {item.questionCount} {t.questions} · {item.cardCount} {t.cards}
                        </span>
                      </button>
                    )
                  })
                )}
              </div>
            )}
          </div>

          {/* 语言 */}
          <button
            type="button"
            onClick={() => patchSettings({ lang: snapshot?.settings?.lang === 'en' ? 'zh' : 'en' })}
            className={iconBtn + ' text-[11px] font-bold'}
            title={t.lang}
          >
            {snapshot?.settings?.lang === 'en' ? '中' : 'EN'}
          </button>

          {/* 深色 */}
          <button
            type="button"
            onClick={() => setDark((value) => !value)}
            className={iconBtn}
            title={dark ? t.light : t.dark}
            aria-pressed={dark}
          >
            {dark ? <SunGlyph /> : <MoonGlyph />}
          </button>

          {/* 设置 */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenu(menu === 'settings' ? null : 'settings')}
              className={iconBtn}
              title={t.settings}
            >
              <GearGlyph />
            </button>
            {menu === 'settings' && (
              <div className={menuCls}>
                <p className="px-1.5 pt-1 pb-2 text-[11px] font-bold uppercase tracking-wide text-text-muted">
                  {t.settings}
                </p>
                <label className="px-1.5 py-1.5 flex items-center justify-between gap-3">
                  <span className="text-[12.5px] font-bold text-text-primary">{t.dailyNewCards}</span>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={snapshot?.settings?.dailyNewCards ?? 20}
                    onChange={(event) => {
                      const value = Number(event.target.value)
                      if (Number.isFinite(value) && value > 0) {
                        patchSettings({ dailyNewCards: Math.min(200, Math.round(value)) })
                      }
                    }}
                    className="w-16 h-7 px-1.5 rounded-lg border-2 border-border bg-bg-subtle text-[12px] text-right text-text-primary outline-none focus:border-st-blue"
                  />
                </label>
                <Toggle
                  label={t.autoAdvance}
                  on={snapshot?.settings?.autoAdvance !== false}
                  onChange={(value) => patchSettings({ autoAdvance: value })}
                />
                <Toggle
                  label={t.extOn}
                  on={snapshot?.settings?.extOn !== false}
                  onChange={(value) => patchSettings({ extOn: value })}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

function Toggle({ label, on, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="w-full px-1.5 py-1.5 flex items-center justify-between gap-3 rounded-lg hover:bg-bg-hover"
      aria-pressed={on}
    >
      <span className="text-[12.5px] font-bold text-text-primary text-left">{label}</span>
      <span
        className={`relative h-[18px] w-[32px] rounded-full transition-colors ${
          on ? 'bg-st-green' : 'bg-bg-hover border border-border'
        }`}
      >
        <span
          className={`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white transition-all ${
            on ? 'left-[16px]' : 'left-[2px]'
          }`}
        />
      </span>
    </button>
  )
}

function baseName(root) {
  const parts = String(root).split(/[\\/]/).filter(Boolean)
  return parts[parts.length - 1] || root
}

/* ---- 图标（内联 SVG，避免额外依赖与资源路径问题） ---- */

function BookGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4 2.6 8.4 12 12.8l9.4-4.4L12 4Z" />
      <path d="M6.2 10.6v4.1c0 1.6 2.6 2.9 5.8 2.9s5.8-1.3 5.8-2.9v-4.1" />
    </svg>
  )
}

function FolderGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    </svg>
  )
}

function CaretGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function GearGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.56V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.06-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.56-1.06 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.56V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.56 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1Z" />
    </svg>
  )
}

function MoonGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  )
}

function SunGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}
