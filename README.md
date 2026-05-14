# 简历优化助手

一个基于服务架构的AI简历优化工具，部署在GitHub Pages。

## 🆕 新架构特点

✅ **服务架构** - 前端 + 本地服务 + 火山引擎Serverless
✅ **无需API Key** - 统一服务调用，用户无需配置
✅ **智能降级** - 本地服务不可用时自动使用备用方案
✅ **批量处理** - 支持批量简历优化
✅ **错误重试** - 自动重试和错误处理
✅ **服务监控** - 实时检测服务状态

## 功能特点

✅ **PDF解析** - 支持上传PDF简历
✅ **AI优化** - 调用火山引擎AI优化内容
✅ **文本优化** - 直接输入文本优化
✅ **多格式导出** - 支持TXT下载
✅ **响应式设计** - 手机电脑都能用
✅ **服务状态** - 实时显示服务连接状态

## 在线访问

https://abell123456.github.io/resume

## 🏗️ 技术架构

### 前端 (GitHub Pages)
- HTML5 / CSS3 / JavaScript
- PDF.js (PDF解析)
- 服务状态检测
- 智能错误处理

### 本地服务 (Node.js)
- Express.js 服务框架
- 火山引擎Serverless API集成
- 批量处理支持
- 错误重试机制

### 后端 (火山引擎)
- Serverless函数服务
- DeepSeek AI模型
- 自动扩缩容
- 按需计费

## 🚀 使用方法

### 1. 启动本地服务（必需）
```bash
# 1. 进入简历优化服务目录
cd /Users/ryan/workspace/resume-optimizer

# 2. 安装依赖（首次运行）
npm install

# 3. 启动服务
npm start

# 4. 验证服务
curl http://localhost:3000/health
```

### 2. 访问网站
1. 打开 https://abell123456.github.io/resume/
2. 网站自动检测本地服务状态
3. 显示"服务在线"表示连接成功

### 3. PDF上传优化
1. 拖放或选择PDF文件
2. 查看服务状态（应显示在线）
3. 选择优化选项
4. 点击"开始优化"
5. 查看并下载优化结果

### 4. 文本直接优化
1. 在文本框中输入简历内容
2. 点击"优化"按钮
3. 复制或下载优化结果

### 5. 服务状态说明
- 🟢 **服务在线**：正常使用本地服务
- 🔴 **服务离线**：使用备用方案（直接调用火山引擎API）
- ⚠️ **降级模式**：本地服务不可用时自动切换

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