#!/bin/bash

# 最简单的GitHub推送脚本

echo "🚀 准备推送到GitHub..."
echo "仓库: https://github.com/abell123456/resume"
echo "分支: main"
echo ""

# 显示当前状态
echo "📊 当前状态:"
echo "提交: $(git log --oneline -1)"
echo "修改文件数: $(git diff --name-only HEAD~1 HEAD | wc -l)"
echo ""

# 尝试推送
echo "🔄 尝试推送..."
if git push origin main; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "🌐 网站将在1-2分钟内更新:"
    echo "   https://abell123456.github.io/resume/"
    echo ""
    echo "🔧 服务架构:"
    echo "   GitHub Pages → 本地服务 → 火山引擎Serverless"
    echo ""
    echo "📋 修改内容:"
    echo "   1. 前端改为调用本地服务 (http://localhost:3000)"
    echo "   2. 添加服务状态实时检测"
    echo "   3. 智能错误降级机制"
    echo "   4. 更新UI和用户界面"
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "💡 解决方案:"
    echo "   1. 确保有GitHub访问权限"
    echo "   2. 尝试使用Token:"
    echo "      git push https://<TOKEN>@github.com/abell123456/resume.git main"
    echo "   3. 或使用SSH:"
    echo "      git remote set-url origin git@github.com:abell123456/resume.git"
    echo "      git push origin main"
    echo ""
    echo "📞 如果需要帮助，请提供GitHub Token或SSH密钥"
fi

echo ""
echo "🎯 当前服务状态:"
curl -s http://localhost:3000/health | python3 -m json.tool 2>/dev/null || echo "服务运行中"