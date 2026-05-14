# 简历优化助手

一个纯前端的AI简历优化工具，部署在GitHub Pages。

## 功能特点

✅ **纯前端运行** - 无需后端，保护隐私
✅ **PDF解析** - 支持上传PDF简历
✅ **AI优化** - 调用AI API优化内容
✅ **文本优化** - 直接输入文本优化
✅ **多格式导出** - 支持TXT下载
✅ **响应式设计** - 手机电脑都能用

## 在线访问

https://abell123456.github.io/resume

## 技术栈

- HTML5 / CSS3 / JavaScript
- PDF.js (PDF解析)
- 纯前端AI调用
- GitHub Pages部署

## 使用方法

### 1. PDF上传优化
1. 拖放或选择PDF文件
2. 配置AI API Key（可选）
3. 选择优化选项
4. 点击"开始优化"
5. 查看并下载优化结果

### 2. 文本直接优化
1. 在文本框中输入简历内容
2. 点击"优化"按钮
3. 复制或下载优化结果

### 3. AI API配置
- 支持DeepSeek、GPT等模型
- 输入自己的API Key
- 不配置则使用演示模式

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