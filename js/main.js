// 简历优化站点主JavaScript文件

// 全局变量
let currentPDFFile = null;
let extractedText = '';
let optimizedResult = '';

// DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    initFileUpload();
    initTextEditor();
    checkServiceStatus();
});

// 检查服务状态
async function checkServiceStatus() {
    try {
        const response = await fetch('http://localhost:3000/health', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            timeout: 5000
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('服务状态正常:', data);
            updateServiceStatusUI(true, data);
        } else {
            console.warn('服务状态检查失败:', response.status);
            updateServiceStatusUI(false);
        }
    } catch (error) {
        console.warn('服务不可用:', error.message);
        updateServiceStatusUI(false);
    }
}

// 更新服务状态UI
function updateServiceStatusUI(isOnline, serviceInfo = null) {
    const apiArea = document.querySelector('.api-key-area');
    if (!apiArea) return;
    
    // 创建或更新状态指示器
    let statusElement = apiArea.querySelector('.service-status');
    if (!statusElement) {
        statusElement = document.createElement('div');
        statusElement.className = 'service-status';
        apiArea.insertBefore(statusElement, apiArea.firstChild);
    }
    
    if (isOnline) {
        statusElement.className = 'service-status';
        statusElement.textContent = '服务在线';
        
        if (serviceInfo) {
            // 更新服务信息
            const infoItems = apiArea.querySelectorAll('.info-item');
            if (infoItems.length >= 3) {
                infoItems[2].querySelector('span').textContent = 
                    `API地址: ${serviceInfo.volcengine_api || '火山引擎Serverless'}`;
            }
        }
    } else {
        statusElement.className = 'service-status offline';
        statusElement.textContent = '服务离线 - 使用备用方案';
        
        // 显示备用方案提示
        const backupInfo = document.createElement('div');
        backupInfo.className = 'backup-info';
        backupInfo.innerHTML = `
            <p style="color: #c62828; margin-top: 10px; font-size: 14px;">
                <i class="fas fa-exclamation-triangle"></i>
                本地服务不可用，将直接调用火山引擎API
            </p>
        `;
        
        // 移除旧的备份信息
        const oldBackup = apiArea.querySelector('.backup-info');
        if (oldBackup) oldBackup.remove();
        
        apiArea.appendChild(backupInfo);
    }
}

// 初始化文件上传
function initFileUpload() {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('pdfUpload');
    const fileInfo = document.getElementById('fileInfo');
    
    // 拖放功能
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropArea.style.borderColor = '#4361ee';
        dropArea.style.backgroundColor = '#f0f4ff';
    }
    
    function unhighlight() {
        dropArea.style.borderColor = '#dee2e6';
        dropArea.style.backgroundColor = 'white';
    }
    
    // 处理文件放置
    dropArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    
    // 处理文件选择
    fileInput.addEventListener('change', function(e) {
        handleFiles(this.files);
    });
    
    function handleFiles(files) {
        if (files.length === 0) return;
        
        const file = files[0];
        
        // 检查文件类型
        if (file.type !== 'application/pdf') {
            alert('请选择PDF文件！');
            return;
        }
        
        // 检查文件大小（限制10MB）
        if (file.size > 10 * 1024 * 1024) {
            alert('文件太大，请选择小于10MB的PDF文件');
            return;
        }
        
        currentPDFFile = file;
        fileInfo.textContent = `已选择: ${file.name} (${formatFileSize(file.size)})`;
        fileInfo.style.color = '#4361ee';
    }
}

// 初始化文本编辑器
function initTextEditor() {
    const textarea = document.getElementById('originalText');
    const charCount = document.getElementById('charCount');
    
    textarea.addEventListener('input', function() {
        const text = this.value;
        charCount.textContent = `${text.length} 字符`;
        
        if (text.length > 5000) {
            charCount.style.color = '#dc3545';
        } else if (text.length > 2000) {
            charCount.style.color = '#ffc107';
        } else {
            charCount.style.color = '#28a745';
        }
    });
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 优化简历（PDF上传）
async function optimizeResume() {
    if (!currentPDFFile) {
        alert('请先选择PDF文件！');
        return;
    }
    
    // 使用预设的火山引擎API Key和模型
    const apiKey = '9e9276b9-0089-4253-9b91-58525ac957a9';
    const model = 'volcengine/deepseek-v3-2-251201';
    
    // 显示进度条
    const progressArea = document.getElementById('progressArea');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    progressArea.style.display = 'block';
    progressFill.style.width = '0%';
    progressText.textContent = '正在解析PDF...';
    
    try {
        // 步骤1: 解析PDF
        progressFill.style.width = '30%';
        progressText.textContent = '解析PDF内容...';
        
        const text = await extractTextFromPDF(currentPDFFile);
        extractedText = text;
        
        if (!text.trim()) {
            throw new Error('无法从PDF提取文本内容');
        }
        
        // 步骤2: 调用AI优化
        progressFill.style.width = '60%';
        progressText.textContent = 'AI优化中...';
        
        optimizedResult = await callAIOptimization(text, apiKey, model);
        
        // 步骤3: 显示结果
        progressFill.style.width = '90%';
        progressText.textContent = '生成优化结果...';
        
        // 跳转到文本编辑器并显示结果
        document.getElementById('originalText').value = extractedText;
        document.getElementById('charCount').textContent = `${extractedText.length} 字符`;
        
        const resultArea = document.getElementById('optimizedText');
        resultArea.innerHTML = `<div class="optimized-content">${formatOptimizedText(optimizedResult)}</div>`;
        
        // 滚动到结果区域
        document.getElementById('text').scrollIntoView({ behavior: 'smooth' });
        
        // 完成
        progressFill.style.width = '100%';
        progressText.textContent = '优化完成！';
        
        setTimeout(() => {
            progressArea.style.display = 'none';
        }, 2000);
        
    } catch (error) {
        console.error('优化失败:', error);
        progressText.textContent = `错误: ${error.message}`;
        progressFill.style.backgroundColor = '#dc3545';
        
        // AI调用失败时显示错误
        setTimeout(() => {
            progressArea.style.display = 'none';
            alert('AI优化失败，请检查网络或稍后重试');
        }, 1500);
    }
}

// 从PDF提取文本
async function extractTextFromPDF(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async function(e) {
            try {
                const typedarray = new Uint8Array(e.target.result);
                
                // 加载PDF.js
                const pdf = await pdfjsLib.getDocument(typedarray).promise;
                let fullText = '';
                
                // 提取所有页面的文本
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    fullText += pageText + '\n\n';
                }
                
                resolve(fullText);
            } catch (error) {
                reject(new Error('PDF解析失败: ' + error.message));
            }
        };
        
        reader.onerror = function() {
            reject(new Error('文件读取失败'));
        };
        
        reader.readAsArrayBuffer(file);
    });
}

// 调用AI优化 - 修改为调用本地简历优化服务
async function callAIOptimization(text, apiKey, model) {
    // 调用本地简历优化服务
    const localServiceEndpoint = 'http://localhost:3000/optimize';
    
    try {
        const response = await fetch(localServiceEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                resume_text: text,
                language: 'zh-CN'
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('本地服务错误响应:', errorText);
            throw new Error(`服务调用失败: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.error || '优化失败');
        }
        
        // 根据本地服务返回格式提取优化结果
        let optimizedText = '';
        
        if (typeof data.optimized_result === 'string') {
            optimizedText = data.optimized_result;
        } else if (data.optimized_result && data.optimized_result.data) {
            optimizedText = data.optimized_result.data;
        } else if (data.optimized_result && data.optimized_result.choices) {
            // OpenAI兼容格式
            optimizedText = data.optimized_result.choices[0]?.message?.content || '';
        } else {
            // 尝试直接使用
            optimizedText = JSON.stringify(data.optimized_result);
        }
        
        return optimizedText;
        
    } catch (error) {
        console.error('AI调用详细错误:', error);
        
        // 如果本地服务失败，回退到直接调用火山引擎API
        console.log('本地服务调用失败，尝试直接调用火山引擎API...');
        return callVolcEngineDirectly(text, apiKey, model);
    }
}

// 直接调用火山引擎API（备用方案）
async function callVolcEngineDirectly(text, apiKey, model) {
    // 火山引擎Serverless服务API地址
    const volcEngineEndpoint = 'https://sd82kp23s1b9g1a99bjug.apigateway-cn-beijing.volceapi.com/v1/chat';
    
    const prompt = `请优化以下简历文本，使其更专业、更有吸引力：
    
原始简历：
${text}

优化要求：
1. 纠正语法错误，优化表达方式
2. 使用更专业的词汇和行业术语
3. 突出成就，添加量化结果（如：提升30%、增长50%等）
4. 优化结构，使其更符合HR阅读习惯
5. 添加合适的技能关键词，适应ATS系统
6. 保持原始信息不变，只是优化表达

请直接返回优化后的完整简历文本，包括联系方式、教育背景、工作经历、技能等所有部分：`;

    try {
        const response = await fetch(volcEngineEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('火山引擎API错误响应:', errorText);
            throw new Error(`火山引擎API调用失败: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // 火山引擎API返回格式
        if (data.code === 200 && data.data) {
            return data.data;
        } else {
            throw new Error(data.msg || '火山引擎API返回错误');
        }
        
    } catch (error) {
        console.error('火山引擎API调用失败:', error);
        throw error;
    }
}

// 模拟优化（演示用）
function simulateOptimization(text) {
    // 简单的模拟优化规则
    const optimizations = {
        '负责': '领导',
        '做': '执行',
        '会': '熟练掌握',
        '有经验': '具备...年经验',
        '参与': '主导',
        '帮助': '协助',
        '工作': '职责',
        '项目': '大型项目',
        '团队': '跨职能团队',
        '管理': '统筹管理'
    };
    
    let optimized = text;
    
    for (const [oldWord, newWord] of Object.entries(optimizations)) {
        const regex = new RegExp(oldWord, 'g');
        optimized = optimized.replace(regex, newWord);
    }
    
    // 添加一些量化成果
    if (optimized.includes('项目')) {
        optimized += '\n\n• 成功交付3个大型项目，按时完成率100%';
    }
    
    if (optimized.includes('团队')) {
        optimized += '\n• 领导5人团队，团队满意度提升30%';
    }
    
    if (optimized.includes('销售') || optimized.includes('业绩')) {
        optimized += '\n• 年度销售额增长35%，客户满意度达95%';
    }
    
    return optimized;
}

// 显示演示结果
function showDemoResult() {
    const demoText = `张三
软件工程师
北京
电话：13800138000 | 邮箱：zhangsan@example.com

教育背景：
北京大学 计算机科学 本科

工作经历：
ABC科技有限公司 软件工程师
负责开发Web应用
会使用Java和Python
有3年工作经验

技能：
编程语言：Java, Python
框架：Spring Boot, Django`;

    const optimizedDemo = `张三
高级软件工程师 | 北京
电话：13800138000 | 邮箱：zhangsan@example.com | LinkedIn: linkedin.com/in/zhangsan

教育背景：
北京大学 | 计算机科学 | 学士学位 | 2018-2022

工作经历：
ABC科技有限公司 | 高级软件工程师 | 2022年至今
• 领导Web应用全栈开发，采用微服务架构，系统性能提升40%
• 熟练掌握Java、Python，主导3个高并发项目，日活用户超10万
• 具备3年软件开发经验，熟悉敏捷开发流程，代码质量评分95%

技能专长：
• 编程语言：Java（精通）、Python（熟练）、JavaScript（熟练）
• 技术框架：Spring Boot、Django、React、Vue.js
• 数据库：MySQL、PostgreSQL、Redis
• 开发工具：Git、Docker、Jenkins、Kubernetes

项目成果：
• 电商平台重构项目：领导5人团队，系统响应时间从2秒优化至200毫秒
• 微服务架构迁移：成功将单体应用拆分为12个微服务，部署效率提升60%
• A/B测试系统：开发自动化测试平台，转化率提升25%`;

    document.getElementById('originalText').value = demoText;
    document.getElementById('charCount').textContent = `${demoText.length} 字符`;
    
    const resultArea = document.getElementById('optimizedText');
    resultArea.innerHTML = `<div class="optimized-content">${formatOptimizedText(optimizedDemo)}</div>`;
    
    document.getElementById('text').scrollIntoView({ behavior: 'smooth' });
}

// 格式化优化文本
function formatOptimizedText(text) {
    // 简单的格式化：段落和列表
    let formatted = text
        .replace(/\n{3,}/g, '\n\n')  // 减少空行
        .replace(/\n/g, '<br>')      // 换行转br
        .replace(/•/g, '•');         // 保持列表符号
    
    // 添加一些样式
    formatted = formatted.replace(/^(.*?)(?=:|<br>)/gm, '<strong>$1</strong>');
    
    return formatted;
}

// 文本优化功能
async function optimizeText() {
    const originalText = document.getElementById('originalText').value.trim();
    if (!originalText) {
        alert('请输入要优化的文本！');
        return;
    }
    
    // 使用预设的火山引擎API Key和模型
    const apiKey = '9e9276b9-0089-4253-9b91-58525ac957a9';
    const model = 'volcengine/deepseek-v3-2-251201';
    
    try {
        optimizedResult = await callAIOptimization(originalText, apiKey, model);
        
        const resultArea = document.getElementById('optimizedText');
        resultArea.innerHTML = `<div class="optimized-content">${formatOptimizedText(optimizedResult)}</div>`;
        
    } catch (error) {
        console.error('文本优化失败:', error);
        alert('AI优化失败，使用模拟优化');
        
        // 回退到模拟优化
        optimizedResult = simulateOptimization(originalText);
        const resultArea = document.getElementById('optimizedText');
        resultArea.innerHTML = `<div class="optimized-content">${formatOptimizedText(optimizedResult)}</div>`;
    }
}

// 辅助功能
function clearText() {
    if (confirm('确定要清空文本吗？')) {
        document.getElementById('originalText').value = '';
        document.getElementById('charCount').textContent = '0 字符';
        document.getElementById('optimizedText').innerHTML = '<p class="placeholder">优化结果将显示在这里...</p>';
    }
}

function pasteExample() {
    const example = `李四
产品经理
上海
电话：13900139000 | 邮箱：lisi@example.com

工作经历：
XYZ互联网公司 产品经理
负责产品规划和设计
会做用户调研和数据分析
有2年产品经验

项目经验：
社交APP产品设计
电商平台功能优化

技能：
产品工具：Axure, Sketch
数据分析：SQL, Excel`;
    
    document.getElementById('originalText').value = example;
    document.getElementById('charCount').textContent = `${example.length} 字符`;
}

function copyResult() {
    if (!optimizedResult) {
        alert('没有可复制的内容！');
        return;
    }
    
    const textToCopy = optimizedResult.replace(/<br>/g, '\n').replace(/<[^>]*>/g, '');
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => alert('已复制到剪贴板！'))
        .catch(err => {
            console.error('复制失败:', err);
            // 备用方法
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('已复制到剪贴板！');
        });
}

function downloadText() {
    if (!optimizedResult) {
        alert('没有可下载的内容！');
        return;
    }
    
    const textToDownload = optimizedResult.replace(/<br>/g, '\n').replace(/<[^>]*>/g, '');
    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = '优化后的简历.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function saveAsPDF() {
    alert('PDF生成功能需要后端支持。\n\n建议：\n1. 复制优化结果到Word\n2. 另存为PDF\n3. 或使用在线转换工具');
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});