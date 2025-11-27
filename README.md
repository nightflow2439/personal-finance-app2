# Personal Finance App 2

一个现代化的个人财务管理应用，帮助用户记录、分析和可视化他们的收入和支出。

## 功能简介

- **记录管理**：支持快速添加、编辑和删除收入及支出记录
- **数据可视化**：通过图表展示收支统计数据，支持多种图表视图
- **AI辅助分析**：集成通义千问API，提供智能化的财务分析建议
- **月度/日期模式**：灵活的数据浏览模式，支持按月份或日期查看数据
- **数据导出**：支持下载财务数据进行本地保存或进一步分析
- **分类管理**：为交易记录添加自定义分类标签

## 快速开始

### 前置要求

- Node.js 18+ 
- npm包管理器

### 安装依赖

```
npm install
```

### 初始化数据库

```
npx prisma migrate dev --name init
npx prisma db seed
```

### 运行

```
npm run dev
```
应用将在 `http://localhost:3000` 启动

### env配置(如要使用ai功能)

```
QWEN_API_KEY=你的通义千问api-key
QWEN_API_URL=https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions
```

## 技术栈

### 前端

- **Next.js 16.0.3** - React框架，支持服务端渲染和API路由
- **React 19.2.0** - UI库
- **Recharts 3.5.0** - 数据可视化图表库
- **React Markdown 10.1.0** - Markdown渲染

### 后端

- **Prisma 6.19.0** - ORM数据库工具
- **SQLite** - 轻量级数据库
- **通义千问 API** - AI分析功能

## 文件结构

```
personal-finance-app2/
├── app/                          # Next.js应用目录
│   ├── globals.css              # 全局样式
│   ├── layout.jsx               # 根布局组件
│   ├── page.jsx                 # 主页面
│   ├── add/                     # 添加记录页面
│   │   └── page.jsx
│   ├── api/                     # API路由
│   │   ├── ai/                  # AI分析接口
│   │   │   └── route.js
│   │   └── records/             # 记录管理接口
│   │       └── route.js
│   ├── chart/                   # 图表视图页面
│   │   └── page.jsx
│   ├── datemode/                # 日期模式页面
│   │   └── page.jsx
│   ├── download/                # 数据导出页面
│   │   └── page.jsx
│   ├── edit/                    # 编辑记录页面
│   │   └── [id]/
│   │       └── page.jsx
│   └── monthmode/               # 月度模式页面
│       └── page.jsx
├── lib/                         # 工具库函数
│   ├── actions.js               # 业务逻辑操作
│   ├── aggregate.js             # 数据聚合函数
│   └── prisma.js                # Prisma客户端配置
├── ui/                          # UI组件
│   ├── chart_view.jsx           # 图表组件
│   └── records.jsx              # 记录列表组件
├── prisma/                      # 数据库相关
│   ├── schema.prisma            # 数据库架构定义
│   ├── seed.js                  # 数据库初始化脚本
│   ├── dev.db                   # SQLite数据库文件
│   └── migrations/              # 数据库迁移文件
├── next.config.mjs              # Next.js配置
├── tsconfig.json                # TypeScript配置
├── postcss.config.mjs           # PostCSS配置
├── package.json                 # 项目依赖配置
└── README.md                    # 项目说明文档
```

## 数据库

该项目使用SQLite数据库，包含以下主要模型：

### Record 模型

- `id` (Int) - 唯一标识符，自动增长
- `date` (DateTime) - 交易日期，默认为当前时间
- `amount` (Float) - 交易金额
- `type` (RecordType) - 交易类型（income 或 expense）
- `note` (String) - 备注信息
- `categories` (Json) - 分类标签（JSON格式）

## 许可

MIT License

## 贡献

欢迎提交问题和改进建议！
