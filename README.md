# Ableton Live Scroll Story

一个以中文为主叙事的 Ableton Live 互动产品网站。页面通过约 2000vh 的原生纵向滚动，讲述一段音乐从最初灵感到完成作品的过程。

**在线体验：** [https://bmbwaveforms.github.io/ableton-live-scroll-story/](https://bmbwaveforms.github.io/ableton-live-scroll-story/)

## 内容结构

1. First Idea — 一个声音就是开始
2. Session — 自由尝试并逐层加入素材
3. Arrange — 把片段组织成完整歌曲
4. Shape — 使用乐器、效果器和自动化塑造声音
5. Perform — 使用 Push 实时演奏
6. Live — 所有创作过程留在同一个环境
7. Final — 把创作主动权交还给用户

## 主要能力

- 浏览器原生纵向滚动，没有滚轮劫持和强制翻页
- GSAP ScrollTrigger 驱动的局部 Sticky Story Stage
- 真实 Ableton 官方产品截图
- Session 轨道交互、16 步循环器、Arrangement 时间线和 Push 打击垫
- 中文主文案与英文辅助标签
- 桌面端和移动端响应式布局
- `prefers-reduced-motion` 支持
- GitHub Actions 自动部署到 GitHub Pages

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 技术栈

- React
- Vite
- GSAP + ScrollTrigger
- CSS Grid、SVG 和原生交互

## 素材与版权说明

这是一个独立制作的非官方概念项目，与 Ableton AG 没有关联、合作或背书关系。

项目代码使用 [MIT License](./LICENSE) 开源。Ableton、Live、Push 及相关商标和官方产品图片归 Ableton AG 及其权利人所有，不包含在本项目的 MIT 许可范围内。图片来源和用途记录在 [ASSET_SOURCES.md](./ASSET_SOURCES.md)。
