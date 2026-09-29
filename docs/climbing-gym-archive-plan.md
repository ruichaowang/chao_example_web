# Climbing Gym Archive — Project Plan

> Working title: **Climbing Gym Archive / 岩馆数字档案**
>
> Status: early exploration / prototype phase

## 1. 项目目标

这个项目不是单纯的“3D 岩馆模型展示站”，而是一个可以长期积累、版本化、比较和分析的 **攀岩空间档案（Versioned Climbing Spatial Archive）**。

核心对象：

~~~
Gym → Snapshot → Wall / Area → Route
~~~

同一家岩馆可以在不同时间拥有多个 Snapshot。未来希望回答：

- 某家岩馆在某个时间点是什么样子？
- 同一面墙不同月份发生了什么变化？
- 某条线路的空间结构是什么？
- 岩点之间的距离、高度、方向和墙面角度如何？
- 不同 climber / beta 在同一条线路上的移动路径有什么不同？

第一阶段不追求完整自动分析，而是优先建立稳定、可扩展的数据和展示基础。

## 2. 基本原则

### 2.1 档案数据与模型文件分离

网页主要管理岩馆、时间、墙面/区域、线路、模型 URL、元数据和标注。模型文件独立存储，不让某个 SPZ/SOG/GLB 文件承担全部业务语义。

### 2.2 Archive format 与 Delivery format 分离

原始数据用于长期保存和未来重新处理；网页发布格式用于快速加载。

~~~
Local Archive
├── raw video
├── original images
├── PLY / SPZ
├── reconstruction outputs
└── camera / pose data

Web Delivery
├── SOG
├── GLB
├── preview.webp
└── metadata.json
~~~

### 2.3 GitHub 是代码和项目定义的 Source of Truth

代码、Schema、项目文档和轻量 metadata 放在 GitHub。大体积 3D 模型和原始视频不进入 Git repository。

## 3. 初步技术架构

~~~
                 Website / UI
          ChatGPT Sites prototype
                 ↓ later
       GitHub + Web Frontend
                 │
                 │ model URL
                 ▼
        SuperSplat / PlayCanvas
                 │
                 ▼
          Object Storage
        Cloudflare R2 (planned)
         ├── .sog
         ├── .spz
         ├── .glb
         └── preview images
~~~

### 代码

当前 repository：ruichaowang/chao_example_web

当前阶段用于：

- 保存项目计划
- 保存后续正式前端代码
- 保存数据 Schema
- 保存轻量 metadata
- 保存开发文档

### 模型

计划使用 Cloudflare R2 一类对象存储。大型 .sog / .spz / .ply / .glb / video 不直接提交 GitHub。

### Viewer

V1 优先研究 SuperSplat Viewer / PlayCanvas。网页根据 URL 动态加载模型，而不是为每个模型创建独立页面。

## 4. 数据对象

### Gym

代表一家岩馆。建议字段至少包括 id、name、city。

### Snapshot

代表一次时间快照。建议字段至少包括：

- id
- gymId
- capturedAt
- captureDevice
- notes

### Representation

一个 Snapshot 可以有多个 representation：

- SOG：Web 快速展示
- SPZ：原始或中间档案
- GLB：Mesh、测量和几何分析

每个 representation 至少记录 type、format、url。

### Wall / Area

未来用于描述自保墙、先锋区域、抱石区、Kilter Board / MoonBoard 或某个特定墙面。

### Route

未来线路层可记录 grade、color、setter、reset date、route geometry、holds、annotations、detailed scan。

## 5. V1 — Archive Prototype

目标：验证“岩馆档案”作为产品是否成立，而不是追求复杂技术。

核心功能：

1. 岩馆列表
2. 岩馆详情页
3. Snapshot 时间轴
4. 单个 Snapshot 的 3D Viewer
5. 基础档案信息
6. 模型 URL 动态加载
7. 支持至少一个真实岩馆数据

基本页面：

~~~
Home
 ↓
Gym
 ↓
Snapshot
 ↓
3D Viewer
~~~

V1 暂时不做：

- 用户系统
- 后台管理系统
- 自动线路识别
- 自动岩点识别
- AI 难度预测
- 视频动作分析
- 正式数据库
- 多人编辑
- 大规模模型处理 pipeline

## 6. V2 — Spatial Archive

目标：从“模型展示”变成真正的空间档案。

优先能力：

- Wall / Area 层级
- 同一岩馆多月份 Snapshot
- 稳定坐标系
- 不同 Snapshot 对齐
- 3D annotation
- 点击模型获取 XYZ
- 基础距离测量
- Mesh / Gaussian 多 representation 切换

理想情况下支持同一区域的 2026-09 ←→ 2026-10 时间比较。

## 7. V3 — Route Dataset（未来）

线路不再只是文字记录，而成为可计算的空间对象。

~~~
Route
├── Hold 01
├── Hold 02
├── Hold 03
└── Top
~~~

Hold 未来可包含：

- x / y / z
- type
- orientation
- size
- surface normal
- role

由此进一步形成 Hold Graph，并支持岩点间距离、横向跨度、纵向高度、路线轨迹、墙面角度、reach 分析和 beta 表达。

## 8. 原始数据策略

公网不保存原始视频，但原视频暂时不删除。

建议本地 / NAS 保存：

- raw video
- source images
- camera information
- reconstruction
- original models

公开 Web 侧只保存必要 distribution assets。

原因：未来 reconstruction / geometry / detection 技术提高后，可以重新处理旧数据，而无法重新拍摄已经 reset 的历史线路。

## 9. Prototype 阶段要验证的问题

ChatGPT Sites / 探索站点主要用于验证产品形态，不作为最终架构承诺。第一轮原型重点回答：

1. 首页首先应该呈现“岩馆”还是“最近 Snapshot”？
2. 时间是不是这个产品的一等信息？
3. 3D Viewer 应该占页面多大比例？
4. Gym → Snapshot → Wall → Route 的层级是否自然？
5. Snapshot 切换应该用时间轴、列表还是缩略图？
6. 用户进入模型后最需要看到哪些 metadata？
7. Wall / Route 应该从 V1 就出现，还是 V2 再引入？
8. 模型浏览和档案信息应该如何同时存在而不互相干扰？

原型可以大胆改变 UI，但核心数据对象尽量保持稳定。

## 10. 当前近期行动

### Step 1 — 保存项目定义

- [x] 在 GitHub 保存初版项目计划

### Step 2 — ChatGPT Sites 原型

先用假数据 / 少量真实数据建立一个可点击原型：

- Home
- Gym page
- Snapshot timeline
- Snapshot detail
- 3D Viewer placeholder

此阶段优先验证信息架构和视觉比例。

### Step 3 — 接入第一个真实模型

使用 SuperSplat / PlayCanvas 加载一个真实 SOG / SPZ 模型，跑通：

~~~
metadata
  ↓
model URL
  ↓
viewer
  ↓
browser
~~~

### Step 4 — 决定正式 Web 技术栈

原型稳定后，再决定是否保留现有 VitePress，或改为 Vite + React / 其他前端框架。原则是不为了技术栈过早重构。

## 11. 当前判断

现阶段最重要的是：

~~~
采集
 ↓
重建
 ↓
标准化
 ↓
版本化
 ↓
展示
~~~

当真实 Snapshot 数据逐渐积累后，再进入：

~~~
标注
 ↓
比较
 ↓
空间分析
 ↓
动作 / Beta 分析
~~~

**当前阶段目标：先让一个真实岩馆的多个时间快照能够被稳定地保存、浏览和比较。**
