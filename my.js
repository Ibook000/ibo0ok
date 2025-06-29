// 粒子背景效果 - 模拟代码雨动画
class ParticleBackground {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.init();
  }

  // 初始化画布和粒子系统
  init() {
    const particlesContainer = document.querySelector('.particles');
    particlesContainer.appendChild(this.canvas);

    // 设置画布尺寸
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // 创建初始粒子
    this.createParticles();

    // 启动动画循环
    requestAnimationFrame(() => this.animate());
  }

  // 调整画布尺寸以适应窗口
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // 创建粒子群
  createParticles() {
    this.particles = [];
    const particleCount = Math.floor(this.canvas.width / 50);

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        speed: 2 + Math.random() * 3,
        size: 1 + Math.random() * 2,
        text: String.fromCharCode(33 + Math.random() * 94),
        color: `hsl(${Math.random() * 60 + 120}, 100%, 70%)`
      });
    }
  }

  // 动画循环
  animate() {
    // 半透明黑色背景，创建轨迹效果
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 更新和绘制所有粒子
    this.particles.forEach(particle => {
      this.updateParticle(particle);
      this.drawParticle(particle);
    });

    requestAnimationFrame(() => this.animate());
  }

  // 更新粒子位置和状态
  updateParticle(particle) {
    particle.y += particle.speed;
    // 粒子超出底部时重置到顶部
    if (particle.y > this.canvas.height) {
      particle.y = 0;
      particle.x = Math.random() * this.canvas.width;
    }
  }

  // 绘制单个粒子
  drawParticle(particle) {
    this.ctx.font = `${particle.size}em monospace`;
    this.ctx.fillStyle = particle.color;
    this.ctx.fillText(particle.text, particle.x, particle.y);
  }
}

// 命令行交互系统
class CommandLineInterface {
  constructor() {
    this.commandInput = document.getElementById('command');
    this.commandOutput = document.querySelector('.command-output');
    // 命令帮助信息映射
    this.commandHelp = {
      about: '显示关于博主的信息\n用法: about',
      skills: '显示博主的技术栈\n用法: skills',
      contact: '显示博主的联系方式\n用法: contact',
      projects: '显示博主的项目展示\n用法: projects',
      clear: '清空命令行输出内容\n用法: clear',
      help: '显示帮助信息\n用法: help [命令名称]\n示例: help about - 显示about命令的详细帮助'
    };
    this.init();
  }

  // 初始化事件监听
  init() {
    // 监听回车键提交命令
    this.commandInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.executeCommand(this.commandInput.value);
        this.commandInput.value = '';
      }
    });

    // 添加焦点事件确保输入框可交互
    this.commandInput.addEventListener('focus', () => {
        this.commandInput.style.outline = '2px solid #81c784';
    });

    this.commandInput.addEventListener('blur', () => {
        this.commandInput.style.outline = 'none';
    });

    // 自动聚焦到输入框
    this.commandInput.focus();
  }

  // 执行命令并显示结果
  executeCommand(command) {
    // 解析命令和参数
    const [cmd, ...args] = command.trim().split(/\s+/);

    // 创建命令历史记录元素
    const commandHistory = document.createElement('p');
    commandHistory.className = 'prompt';
    commandHistory.textContent = `ibook@dev:~$ ${command}`;
    this.commandOutput.appendChild(commandHistory);

    // 创建命令结果元素
    const resultElement = document.createElement('div');
    resultElement.className = 'command-result';

    // 如果没有输入命令，直接返回
    if (!cmd) {
      return;
    }

    // 根据命令内容执行不同操作
    switch(cmd.toLowerCase()) {
      case 'help':
        if (args.length > 0) {
          // 显示特定命令的帮助
          const targetCmd = args[0].toLowerCase();
          if (this.commandHelp[targetCmd]) {
            resultElement.textContent = this.commandHelp[targetCmd];
          } else {
            resultElement.textContent = `命令未找到: ${targetCmd} - 输入 'help' 查看所有可用命令`;
          }
        } else {
          // 显示所有命令的帮助
          resultElement.innerHTML = `可用命令:<br>
            <span class="command">about</span> - 关于我<br>
            <span class="command">skills</span> - 技术栈<br>
            <span class="command">contact</span> - 联系方式<br>
            <span class="command">projects</span> - 项目展示<br>
            <span class="command">clear</span> - 清空屏幕<br>
            <span class="command">help</span> - 显示帮助<br>
            <br>输入 'help 命令名称' 查看特定命令的详细用法`;
        }
        break;
      case 'about':
        resultElement.textContent = '我是一名前端开发者，热爱编程和开源技术。这个博客使用HTML、CSS和JavaScript构建，采用终端风格设计。';
        break;
      case 'skills':
        resultElement.innerHTML = `<i class="fab fa-html5"></i> HTML5 <i class="fab fa-css3-alt"></i> CSS3 <i class="fab fa-js"></i> JavaScript <i class="fab fa-react"></i> React <i class="fab fa-node-js"></i> Node.js`;
        break;
      case 'contact':
        resultElement.innerHTML = `<i class="fab fa-github"></i> GitHub: Ibook000<br><i class="fab fa-twitter"></i> Twitter: BookI50684<br><i class="fab fa-weixin"></i> 微信: IBO0OK<br><i class="fab fa-qq"></i> QQ: 2424935829`;
        break;
      case 'projects':
        resultElement.innerHTML = `1. 个人博客 (当前网站)<br>2.更多在项目在https://github.com/Ibook000`;
        break;
      case 'clear':
        // 清空命令输出区域，保留前两个元素（标题和初始命令）
        while (this.commandOutput.children.length > 2) {
          this.commandOutput.removeChild(this.commandOutput.lastChild);
        }
        return;
      default:
        resultElement.textContent = `命令未找到: ${cmd} - 输入 'help' 查看可用命令`;
    }

    // 添加结果到输出区域并滚动到底部
    this.commandOutput.appendChild(resultElement);
    this.commandOutput.scrollTop = this.commandOutput.scrollHeight;
  }
}

// 页面加载完成后初始化所有功能
window.addEventListener('DOMContentLoaded', () => {
  // 初始化粒子背景
  new ParticleBackground();
  
  // 初始化命令行交互
  new CommandLineInterface();

  // 修复背景图片加载问题
  const background = document.querySelector('.background');
  background.style.backgroundImage = `url('https://api.kdcc.cn/api/bing')`;
});
