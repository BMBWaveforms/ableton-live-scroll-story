# Push 3 — 留在音乐里

基于 Push 3 产品主题制作的非官方交互式落地页。英文 Hero 用鼠标轨迹唤出效果器与产品画面，中文内容继续讲述从触碰一颗 Pad、塑造声音，到独立创作和回到 Ableton Live 的完整路径。

**在线体验：** [https://bmbwaveforms.github.io/ableton-live-scroll-story/](https://bmbwaveforms.github.io/ableton-live-scroll-story/)

## 体验路径

1. **显形**：移动鼠标或点击首屏，让十种 Ableton 效果器和 Push 场景沿指针出现。
2. **声音索引**：用十张官方高清设备界面建立从饱和、空间到时间塑形的声音地图。
3. **触碰与表达**：按住中央 Pad 发声；左右改变音高，上下改变音色，按住时长模拟力度。
4. **展开**：自然向下滚动，镜头从一颗 Pad 拉远到 8×8 Pad 和整台概念设备。
5. **Showreel**：点击播放 Ableton 官方 Push 3 介绍影片。
6. **独立创作与 Live**：展示 Standalone 场景，并把同一个想法带回 Live 的 Session View。
7. **收尾**：用完整的 Push 3 画面和一句大标题收束故事。

触碰章节使用由 CSS 3D 图层构成的 **Push 3 概念模型**，包括机身、显示屏、旋钮、按钮和具有厚度的 Pad。它用于页面交互展示，不是 Ableton 官方精确三维资产。效果器、使用场景和影片来自 Ableton 官方资料。

## 本地运行

```bash
npm install
npm run dev
```

运行 `npm run build` 生成静态站点。页面使用 React、Vite 和浏览器 Web Audio，无后端。滚动使用浏览器原生滚动；音频需要用户首次触碰后由浏览器解锁。页面包含移动端布局与减少动态效果设置。

## 部署

推送到 `main` 分支后，[GitHub Actions](./.github/workflows/deploy-pages.yml) 会构建项目并发布到 GitHub Pages。Vite 的生产路径已经设置为 `/ableton-live-scroll-story/`。

## 资料与权利

产品事实、设计参考和素材来源见 [REFERENCES.md](./REFERENCES.md) 与 [ASSET_SOURCES.md](./ASSET_SOURCES.md)。项目代码采用 [MIT License](./LICENSE) 开源；Ableton、Live、Push 等商标及官方产品图片归其权利人所有，不包含在 MIT 许可范围内。本项目与 Ableton AG 无合作或背书关系。
