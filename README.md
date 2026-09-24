# Push 3 — 留在音乐里

基于 Push 3 产品主题制作的非官方交互式落地页。页面以中文叙事为主、英文为辅助标签，让访客先触碰一颗 Pad，再通过滚动看到完整设备，以及独立创作和连接 Ableton Live 的场景。

**在线体验：** [https://bmbwaveforms.github.io/ableton-live-scroll-story/](https://bmbwaveforms.github.io/ableton-live-scroll-story/)

## 体验路径

1. **触碰**：按下中央 Pad，听见浏览器合成的 C3 音符。
2. **表达**：按住并拖动；左右改变音高，上下改变音色。触控笔或支持压力的触屏会传递真实压力；鼠标使用明确标注的按住时长模拟力度。
3. **展开**：自然向下滚动，镜头从一颗 Pad 拉远到 8×8 Pad 和整台概念设备。
4. **独立创作**：展示没有电脑的 Push 3 使用场景。
5. **连接 Live**：将 Push 3 的 Pad 与 Ableton Live Session View 的真实界面同屏展示。
6. **收尾**：用完整的 Push 3 画面和一句大标题收束故事。

前三个章节使用由 CSS 3D 图层构成的 **Push 3 概念模型**，包括机身、显示屏、旋钮、按钮和具有厚度的 Pad。它用于页面交互展示，不是 Ableton 官方精确三维资产。后面的使用场景使用 Ableton 官方照片。

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
