#!/bin/bash

# 简历优化网站最终部署脚本

echo "=========================================="
echo "🚀 简历优化网站部署工具 v2.0"
echo "=========================================="

# 检查环境
echo ""
echo "🔍 环境检查..."
if [ ! -f "index.html" ]; then
    echo "❌ 错误：请在简历网站目录下运行"
    exit 1
fi

echo "✅ 当前位置: $(pwd)"
echo "✅ Git仓库: $(git config --get remote.origin.url)"
echo "✅ 当前分支: $(git branch --show-current)"
echo "✅ 本地提交: $(git log --oneline -1)"

# 显示修改内容
echo ""
echo "📄 本次部署的修改:"
echo "------------------------------------------"
git show --stat HEAD
echo "------------------------------------------"

# 服务状态检查
echo ""
echo "🔧 服务状态检查..."
if curl -s http://localhost:3000/health > /dev/null; then
    echo "✅ 简历优化服务: 运行中 (http://localhost:3000)"
else
    echo "⚠️  简历优化服务: 未运行"
    echo "   启动命令: cd /Users/ryan/workspace/resume-optimizer && npm start"
fi

# 部署选项
echo ""
echo "=========================================="
echo "📦 部署选项"
echo "=========================================="

echo ""
echo "1️⃣ 选项A: 自动推送 (推荐)"
echo "   -------------------------"
echo "   此选项将尝试自动推送代码到GitHub"
echo ""

read -p "是否尝试自动推送？(y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔄 尝试自动推送..."
    
    # 尝试使用当前配置推送
    if git push origin main 2>/dev/null; then
        echo "✅ 推送成功！"
    else
        echo "❌ 自动推送失败"
        echo "   需要配置GitHub认证"
    fi
fi

# 手动部署指南
echo ""
echo "2️⃣ 选项B: 手动部署步骤"
echo "   -------------------------"
echo "   请选择以下方法之一:"
echo ""
echo "   📱 方法1: 使用GitHub CLI"
echo "       1. gh auth login"
echo "       2. git push origin main"
echo ""
echo "   🔑 方法2: 使用GitHub Token"
echo "       1. 创建Token: https://github.com/settings/tokens"
echo "       2. git push https://<TOKEN>@github.com/abell123456/resume.git main"
echo ""
echo "   🔐 方法3: 使用SSH密钥"
echo "       1. ssh-keygen -t ed25519"
echo "       2. 添加到GitHub Settings → SSH Keys"
echo "       3. git remote set-url origin git@github.com:abell123456/resume.git"
echo "       4. git push origin main"
echo ""

# 验证部署
echo ""
echo "3️⃣ 选项C: 验证当前部署"
echo "   -------------------------"
echo "   当前网站: https://abell123456.github.io/resume/"
echo ""

read -p "是否打开网站验证？(y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    open "https://abell123456.github.io/resume/"
fi

# 本地测试
echo ""
echo "4️⃣ 选项D: 本地测试"
echo "   -------------------------"
echo "   本地文件: file://$(pwd)/index.html"
echo ""

read -p "是否在本地浏览器测试？(y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    open "file://$(pwd)/index.html"
fi

# 总结
echo ""
echo "=========================================="
echo "🎉 部署准备完成！"
echo "=========================================="
echo ""
echo "📋 下一步操作:"
echo "   1. 选择上述部署方法推送代码"
echo "   2. 等待1-2分钟让GitHub Pages更新"
echo "   3. 访问 https://abell123456.github.io/resume/ 验证"
echo ""
echo "🔧 服务架构已就绪:"
echo "   GitHub Pages → 本地服务 → 火山引擎Serverless"
echo ""
echo "💡 提示: GitHub Pages更新可能需要几分钟时间"
echo "=========================================="

# 保存部署记录
DEPLOY_LOG="deploy-$(date +%Y%m%d-%H%M%S).log"
{
    echo "部署时间: $(date)"
    echo "提交哈希: $(git rev-parse HEAD)"
    echo "修改文件:"
    git show --name-only HEAD | tail -n +7
    echo "服务状态: $(curl -s http://localhost:3000/health 2>/dev/null | grep -o '"status":"[^"]*"' || echo '未知')"
} > "$DEPLOY_LOG"

echo ""
echo "📄 部署记录已保存到: $DEPLOY_LOG"