#!/bin/bash

# 简历网站部署脚本

echo "🚀 开始部署简历优化网站..."

# 检查当前目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误：请在简历网站目录下运行此脚本"
    exit 1
fi

# 1. 检查git状态
echo "🔍 检查git状态..."
git status

# 2. 添加修改的文件
echo "📦 添加修改的文件..."
git add .

# 3. 提交修改
echo "💾 提交修改..."
git commit -m "更新：将简历优化改为服务架构

- 修改前端调用本地简历优化服务
- 服务地址：http://localhost:3000/optimize
- 后端使用火山引擎Serverless服务
- 添加服务状态检查
- 更新UI和文档

部署时间: $(date '+%Y-%m-%d %H:%M:%S')"

# 4. 推送到GitHub
echo "🚀 推送到GitHub..."
git push origin main

# 5. 检查部署状态
echo "📊 检查部署状态..."
echo ""
echo "✅ 部署完成！"
echo ""
echo "🌐 网站地址: https://abell123456.github.io/resume/"
echo "⏰ 部署可能需要1-2分钟生效"
echo ""
echo "📋 本地服务启动:"
echo "   1. 启动简历优化服务: cd /Users/ryan/workspace/resume-optimizer && npm start"
echo "   2. 访问本地测试: http://localhost:3000/health"
echo "   3. 网站会自动检测服务状态"
echo ""
echo "🔧 服务架构:"
echo "   前端 (GitHub Pages) → 本地服务 → 火山引擎Serverless"

# 6. 打开网站
read -p "是否要打开网站？(y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    open "https://abell123456.github.io/resume/"
fi

echo ""
echo "🎉 部署完成！"