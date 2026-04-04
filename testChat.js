import { ChatInterface } from './chatInterface.js';
let chatInterface;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('测试页面加载完成');

    try {
        chatInterface = new ChatInterface();
        console.log('ChatInterface 创建成功:', chatInterface);
        updateStatus('ChatInterface 创建成功');

        // 设置消息回调
        chatInterface.onMessageSend = function(message) {
            console.log('收到消息:', message);
            setTimeout(() => {
                chatInterface.addMessage('assistant', '测试回复: ' + message);
            }, 1000);
        };

    } catch (error) {
        console.error('ChatInterface 创建失败:', error);
        updateStatus('ChatInterface 创建失败: ' + error.message);
    }

    // Attach event listeners to buttons to avoid inline onclick handlers
    document.getElementById('btn-show-chat').addEventListener('click', showChat);
    document.getElementById('btn-hide-chat').addEventListener('click', hideChat);
    document.getElementById('btn-toggle-chat').addEventListener('click', toggleChat);
    document.getElementById('btn-check-status').addEventListener('click', checkStatus);
});

function showChat() {
    if (chatInterface) {
        console.log('尝试显示聊天界面');
        chatInterface.show();
        updateStatus('调用 show() 方法，当前状态: ' + chatInterface.getVisibility());
    } else {
        updateStatus('ChatInterface 未初始化');
    }
}

function hideChat() {
    if (chatInterface) {
        console.log('尝试隐藏聊天界面');
        chatInterface.hide();
        updateStatus('调用 hide() 方法，当前状态: ' + chatInterface.getVisibility());
    } else {
        updateStatus('ChatInterface 未初始化');
    }
}

function toggleChat() {
    if (chatInterface) {
        console.log('尝试切换聊天界面');
        chatInterface.toggle();
        updateStatus('调用 toggle() 方法，当前状态: ' + chatInterface.getVisibility());
    } else {
        updateStatus('ChatInterface 未初始化');
    }
}

function checkStatus() {
    if (chatInterface) {
        const isVisible = chatInterface.getVisibility();
        const className = chatInterface.chatContainer.className;
        const computedStyle = window.getComputedStyle(chatInterface.chatContainer);
        const opacity = computedStyle.opacity;
        const transform = computedStyle.transform;
        const zIndex = computedStyle.zIndex;

        const statusText = `
            可见性: ${isVisible}
            类名: ${className}
            透明度: ${opacity}
            变换: ${transform}
            层级: ${zIndex}
        `;

        console.log('聊天界面状态:', statusText);
        updateStatus(statusText);
    } else {
        updateStatus('ChatInterface 未初始化');
    }
}

function updateStatus(text) {
    const statusEl = document.getElementById('status');
    statusEl.textContent = text;
}
