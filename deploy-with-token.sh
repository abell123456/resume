#!/bin/bash

# 使用GitHub Token部署脚本

echo "🚀 开始部署简历优化网站 (使用Token认证)..."

# 检查当前目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误：请在简历网站目录下运行此脚本"
    exit 1
fi

# 1. 设置Git配置
echo "🔧 设置Git配置..."
git config --local user.name "OpenClaw Assistant"
git config --local user.email "assistant@openclaw.ai"

# 2. 添加所有修改
echo "📦 添加修改的文件..."
git add .

# 3. 创建提交
echo "💾 创建提交..."
git commit -m "部署更新：简历优化服务架构

- 前端改为调用本地简历优化服务
- 服务地址：http://localhost:3000/optimize
- 后端使用火山引擎Serverless API
- 添加服务状态实时检测
- 智能错误降级机制
- 更新UI和用户说明

部署时间: $(date '+%Y-%m-%d %H:%M:%S')
版本: 2.0.0"

# 4. 显示部署信息
echo ""
echo "📋 部署信息:"
echo "   仓库: https://github.com/abell123456/resume"
echo "   分支: main"
echo "   网站: https://abell123456.github.io/resume/"
echo "   提交哈希: $(git rev-parse --short HEAD)"
echo ""

# 5. 提供手动推送指令
echo "🔐 需要手动推送:"
echo ""
echo "方法1: 使用GitHub CLI"
echo "   gh auth login  # 先登录"
echo "   git push origin main"
echo ""
echo "方法2: 使用GitHub Token"
echo "   1. 在GitHub创建Token: https://github.com/settings/tokens"
echo "   2. 运行: git push https://<TOKEN>@github.com/abell123456/resume.git main"
echo ""
echo "方法3: 使用SSH密钥"
echo "   1. 生成SSH密钥: ssh-keygen -t ed25519 -C 'your_email@example.com'"
echo "   2. 添加到GitHub: https://github.com/settings/keys"
echo "   3. 运行: git push git@github.com:abell123456/resume.git main"
echo ""

# 6. 显示修改内容
echo "📄 本次修改的文件:"
git show --name-only --oneline HEAD | tail -n +2

# 7. 本地验证
echo ""
echo "✅ 本地提交已完成！"
echo "🌐 网站将在推送后更新"
echo "⏰ GitHub Pages通常需要1-2分钟生效"

# 8. 打开网站
read -p "是否要打开网站查看当前版本？(y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    open "https://abell123456.github.io/resume/"
fi

echo ""
echo "🎉 本地部署准备完成！请选择上述方法之一进行推送。"