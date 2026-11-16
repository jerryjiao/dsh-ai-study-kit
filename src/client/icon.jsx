/**
 * 侧栏全局面板图标（sidebar.panellist 的 occupant）。
 *
 * 侧栏自己拥有按钮、tooltip 与选中态，我们只交一个纯图标：拿 size（边长 px）
 * 和 active（是否选中）画 SVG，颜色走 currentColor，不自己包按钮。
 */
export function StudyIcon({ size = 18, active = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? 2.2 : 1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* 学士帽 + 底下的书：一眼能认出「学习」 */}
      <path d="M12 4 2.6 8.4 12 12.8l9.4-4.4L12 4Z" />
      <path d="M6.2 10.6v4.1c0 1.6 2.6 2.9 5.8 2.9s5.8-1.3 5.8-2.9v-4.1" />
      <path d="M21.4 8.4v5" />
    </svg>
  )
}
