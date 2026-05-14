# 简历优化助手

一个纯前端的AI简历优化工具，直接调用火山引擎Serverless API，部署在GitHub Pages。

## 🆕 最新优化

✅ **直接API调用** - 前端直接调用火山引擎Serverless API，无需中间层
✅ **极简架构** - 纯前端实现，用户无需运行任何本地服务
✅ **快速响应** - 减少中间环节，优化响应速度
✅ **零配置** - 用户无需配置API Key或运行服务
✅ **智能降级** - API不可用时自动使用模拟优化

## 功能特点

✅ **PDF解析** - 支持上传PDF简历
✅ **AI优化** - 直接调用火山引擎AI优化内容
✅ **文本优化** - 直接输入文本优化
✅ **多格式导出** - 支持TXT下载
✅ **响应式设计** - 手机电脑都能用
✅ **即时使用** - 打开网站即可使用，无需任何配置

## 在线访问

https://abell123456.github.io/resume

## 🏗️ 技术架构

### 纯前端架构
- HTML5 / CSS3 / JavaScript
- PDF.js (PDF解析)
- 直接调用火山引擎Serverless API
- 智能错误处理和降级

### 云服务 (火山引擎)
- Serverless函数服务
- DeepSeek AI模型
- 自动扩缩容
- 按需计费

### 数据流程
```
用户浏览器 → GitHub Pages → 火山引擎Serverless API → DeepSeek AI
```

## 🚀 使用方法

### 1. 访问网站
直接打开：https://abell123456.github.io/resume/

### 2. PDF上传优化
1. 拖放或选择PDF文件
2. 选择优化选项
3. 点击"开始优化"
4. 查看并下载优化结果

### 3. 文本直接优化
1. 在文本框中输入简历内容
2. 点击"优化"按钮
3. 复制或下载优化结果

### 4. 优化选项说明
- **语法纠错**：修正语法和拼写错误
- **表达优化**：优化表达方式，更专业
- **关键词优化**：添加行业关键词
- **ATS系统适配**：优化简历通过ATS系统
- **行业术语优化**：使用专业行业术语
- **量化成果**：添加可量化的成果描述

## 本地开发

```bash
# 克隆仓库
git clone https://github.com/abell123456/resume.git

# 进入目录
cd resume

# 用浏览器打开
open index.html
```

## 部署到GitHub Pages

1. 创建新仓库 `resume`
2. 上传所有文件
3. 开启GitHub Pages
4. 访问 `https://你的用户名.github.io/resume`

## 文件结构

```
resume/
├── index.html          # 主页面
├── css/
│   └── style.css      # 样式文件
├── js/
│   └── main.js        # 主逻辑
├── assets/            # 静态资源
└── README.md          # 说明文档
```

## 隐私保护

- 所有处理在浏览器本地完成
- 不上传文件到服务器
- API Key仅用于AI调用
- 无数据存储

## 限制说明

### 纯前端限制：
1. **PDF解析**：复杂格式可能解析不全
2. **AI调用**：需要用户提供API Key
3. **文件大小**：PDF限制10MB以内
4. **格式保留**：PDF格式无法完全保留

### 推荐优化：
1. 简单简历用文本优化
2. 复杂简历建议手动调整
3. 重要文件先备份

## 贡献

欢迎提交Issue和Pull Request！

## 许可证

MIT License