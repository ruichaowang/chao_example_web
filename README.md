# Chao Example Web

一个用于跑通 Markdown、VitePress、GitHub Actions 和 GitHub Pages 发布流程的最小项目。

## 本地运行

```bash
npm install
npm run docs:dev
```

本地地址：<http://localhost:5173/chao_example_web/>

## 构建检查

```bash
npm run docs:build
npm run docs:preview
```

## GitHub Pages 配置

1. 在 GitHub 创建名为 `chao_example_web` 的空仓库。
2. 把本地 `main` 分支推送到该仓库。
3. 打开 `Settings → Pages`。
4. 在 `Build and deployment → Source` 中选择 `GitHub Actions`。
5. 等待 Actions 中的部署流程完成。

最终地址会是：

```text
https://<你的 GitHub 用户名>.github.io/chao_example_web/
```

如果仓库名称改变，需要同步修改 `docs/.vitepress/config.mts` 中的 `base`。
