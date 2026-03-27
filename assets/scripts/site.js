const FALLBACK_PROFILE = {
  login: 'Ibook000',
  public_repos: 33,
  followers: 1,
  following: 8,
  created_at: '2024-04-24T14:46:16Z',
  updated_at: '2026-03-18T03:01:13Z'
};

const FALLBACK_REPOS = [
  {
    name: 'polymarket-auto-redeemer',
    description: 'polymarket多账户多市场自动赎回兑换 Automated multi-account redemption bot for settled Polymarket positions',
    language: 'Python',
    stargazers_count: 1,
    forks_count: 0,
    pushed_at: '2026-03-27T02:53:38Z',
    html_url: 'https://github.com/Ibook000/polymarket-auto-redeemer'
  },
  {
    name: 'GithubTrending',
    description: 'GitHub Trending 热门仓库榜单展示，含AI自动总结。',
    language: 'HTML',
    stargazers_count: 1,
    forks_count: 0,
    pushed_at: '2026-03-27T02:25:18Z',
    html_url: 'https://github.com/Ibook000/GithubTrending'
  },
  {
    name: 'polymarket-skill',
    description: 'Polymarket prediction market skill for nanobot - Real-time prediction market data tools',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-03-18T03:32:28Z',
    html_url: 'https://github.com/Ibook000/polymarket-skill'
  },
  {
    name: 'cryptoskill',
    description: 'Crypto MCP Server skill for nanobot - Cryptocurrency market data tools',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-03-18T03:08:03Z',
    html_url: 'https://github.com/Ibook000/cryptoskill'
  },
  {
    name: 'crypto_mcp_server',
    description: '加密货币市场数据MCP服务器，提供实时价格、K线数据、资金费率和行业新闻查询。',
    language: 'Python',
    stargazers_count: 3,
    forks_count: 0,
    pushed_at: '2025-08-09T16:09:15Z',
    html_url: 'https://github.com/Ibook000/crypto_mcp_server'
  },
  {
    name: 'ChartMaster',
    description: 'ChartMaster',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 1,
    pushed_at: '2025-11-23T05:11:39Z',
    html_url: 'https://github.com/Ibook000/ChartMaster'
  }
];

const FALLBACK_LANGUAGES = [
  { language: 'Python', count: 9 },
  { language: 'TypeScript', count: 2 },
  { language: 'JavaScript', count: 2 },
  { language: 'HTML', count: 2 },
  { language: 'Vue', count: 1 },
  { language: 'CSS', count: 1 },
  { language: 'C', count: 1 }
];

function formatDate(value) {
  if (!value) {
    return '--';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '--';
  }

  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
}

function textOrFallback(value, fallback = 'No description') {
  if (!value || !String(value).trim()) {
    return fallback;
  }

  return String(value).trim();
}

function renderGitHubProfile(profile) {
  const reposCountNode = document.getElementById('ghReposCount');
  const followersNode = document.getElementById('ghFollowers');
  const followingNode = document.getElementById('ghFollowing');
  const sinceNode = document.getElementById('ghSince');
  const statusNode = document.getElementById('ghStatus');

  if (!reposCountNode || !followersNode || !followingNode || !sinceNode || !statusNode) {
    return;
  }

  reposCountNode.textContent = `${profile.public_repos ?? '--'}`;
  followersNode.textContent = `${profile.followers ?? '--'}`;
  followingNode.textContent = `${profile.following ?? '--'}`;
  sinceNode.textContent = formatDate(profile.created_at);
  statusNode.textContent = `Building in public since ${formatDate(profile.created_at)} · ${profile.public_repos ?? '--'} repositories`;
}

function renderRepoList(repos) {
  const repoListNode = document.getElementById('repoList');
  if (!repoListNode) {
    return;
  }

  repoListNode.innerHTML = '';

  if (!repos.length) {
    const empty = document.createElement('li');
    empty.className = 'repo-empty';
    empty.textContent = 'No public repositories found.';
    repoListNode.appendChild(empty);
    return;
  }

  repos.slice(0, 6).forEach((repo) => {
    const item = document.createElement('li');
    item.className = 'repo-item';

    const top = document.createElement('div');
    top.className = 'repo-top';

    const link = document.createElement('a');
    link.className = 'repo-name';
    link.href = repo.html_url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = repo.name;

    const meta = document.createElement('span');
    meta.className = 'repo-meta';
    const lang = repo.language || 'Unknown';
    meta.textContent = `${lang} · ★${repo.stargazers_count || 0} · ${formatDate(repo.pushed_at)}`;

    const desc = document.createElement('p');
    desc.className = 'repo-desc';
    desc.textContent = textOrFallback(repo.description, 'No description');

    top.appendChild(link);
    top.appendChild(meta);
    item.appendChild(top);
    item.appendChild(desc);
    repoListNode.appendChild(item);
  });
}

function renderLanguageList(languageStats) {
  const languageNode = document.getElementById('languageList');
  if (!languageNode) {
    return;
  }

  languageNode.innerHTML = '';
  if (!languageStats.length) {
    const empty = document.createElement('li');
    empty.className = 'repo-empty';
    empty.textContent = 'No language statistics.';
    languageNode.appendChild(empty);
    return;
  }

  const maxCount = Math.max(...languageStats.map((item) => item.count), 1);

  languageStats.slice(0, 6).forEach((item) => {
    const row = document.createElement('li');
    row.className = 'lang-item';

    const head = document.createElement('div');
    head.className = 'lang-row';

    const name = document.createElement('span');
    name.className = 'lang-name';
    name.textContent = item.language;

    const count = document.createElement('span');
    count.className = 'lang-count';
    count.textContent = `${item.count} repos`;

    const bar = document.createElement('div');
    bar.className = 'lang-bar';

    const fill = document.createElement('span');
    fill.className = 'lang-fill';
    fill.style.width = `${Math.max((item.count / maxCount) * 100, 10)}%`;

    head.appendChild(name);
    head.appendChild(count);
    bar.appendChild(fill);
    row.appendChild(head);
    row.appendChild(bar);
    languageNode.appendChild(row);
  });
}

function renderStackSummary(languageStats) {
  const target = document.getElementById('stackSummary');
  if (!target) {
    return;
  }

  if (!languageStats.length) {
    target.textContent = 'Focused on product quality, automation, and applied engineering.';
    return;
  }

  const top = languageStats.slice(0, 4)
    .map((item) => `${item.language} x${item.count}`)
    .join(' · ');

  target.textContent = `Current focus: ${top}`;
}

function computeLanguageStats(repos) {
  const map = new Map();

  repos.forEach((repo) => {
    if (!repo.language) {
      return;
    }
    map.set(repo.language, (map.get(repo.language) || 0) + 1);
  });

  return [...map.entries()]
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count);
}

async function loadGitHubSnapshot() {
  const userApi = 'https://api.github.com/users/Ibook000';
  const reposApi = 'https://api.github.com/users/Ibook000/repos?per_page=100&sort=updated';

  try {
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(userApi),
      fetch(reposApi)
    ]);

    if (!profileResponse.ok || !reposResponse.ok) {
      throw new Error('GitHub API request failed');
    }

    const profile = await profileResponse.json();
    const repos = await reposResponse.json();
    const nonForkRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

    const languageStats = computeLanguageStats(nonForkRepos);

    renderGitHubProfile(profile);
    renderRepoList(nonForkRepos);
    renderLanguageList(languageStats);
    renderStackSummary(languageStats);
  } catch (error) {
    renderGitHubProfile(FALLBACK_PROFILE);
    renderRepoList(FALLBACK_REPOS);
    renderLanguageList(FALLBACK_LANGUAGES);
    renderStackSummary(FALLBACK_LANGUAGES);
  }
}

class CommandLineInterface {
  constructor() {
    this.commandInput = document.getElementById('command');
    this.terminalLog = document.getElementById('terminalLog');

    if (!this.commandInput || !this.terminalLog) {
      return;
    }

    this.helpMap = {
      about: '查看博主简介',
      skills: '查看技术栈',
      contact: '查看联系方式',
      projects: '查看项目入口',
      work: '跳转到作品展示区域',
      clear: '清空终端输出',
      help: '显示命令帮助'
    };

    this.bindEvents();
    this.commandInput.focus();
  }

  bindEvents() {
    this.commandInput.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') {
        return;
      }

      event.preventDefault();
      const raw = this.commandInput.value;
      this.commandInput.value = '';
      this.execute(raw);
    });
  }

  execute(rawCommand) {
    const text = rawCommand.trim();
    if (!text) {
      return;
    }

    this.appendLine(`ibook@dev:~$ ${text}`, 'log-line prompt');

    const [cmd, ...args] = text.split(/\s+/);
    const normalized = cmd.toLowerCase();

    if (normalized === 'clear') {
      this.resetLog();
      return;
    }

    if (normalized === 'help') {
      this.showHelp(args[0]);
      return;
    }

    switch (normalized) {
      case 'about':
        this.appendLines([
          'Ibook，独立开发者。',
          '关注界面体验、自动化系统、数据工具与智能应用。'
        ]);
        break;
      case 'skills':
        this.appendLines([
          'Python / TypeScript / JavaScript / HTML / CSS / Vue / C',
          'Product UI / Automation / API & MCP Services / Data Tools'
        ]);
        break;
      case 'contact':
        this.appendLines([
          'GitHub: https://github.com/Ibook000',
          'X: https://x.com/BookI50684',
          'Telegram: @ibookusbb',
          'WeChat: IBO0OK | QQ: 2424935829'
        ]);
        break;
      case 'projects':
        this.appendLines([
          'Selected work lives in the Selected Work section.',
          'Run: work  (jump to that section)'
        ]);
        break;
      case 'work':
      case 'github': {
        const section = document.getElementById('work');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        this.appendLine('Jumping to Selected Work...');
        break;
      }
      default:
        this.appendLine(`Command not found: ${normalized}. 输入 help 查看可用命令。`);
        break;
    }

    this.scrollToBottom();
  }

  showHelp(target) {
    if (target) {
      const key = target.toLowerCase();
      if (this.helpMap[key]) {
        this.appendLine(`${key}: ${this.helpMap[key]}`);
      } else {
        this.appendLine(`未找到命令 ${key}。可输入 help 查看完整列表。`);
      }
      this.scrollToBottom();
      return;
    }

    this.appendLine('Available commands:');
    Object.keys(this.helpMap).forEach((key) => {
      this.appendLine(`- ${key}: ${this.helpMap[key]}`);
    });
    this.scrollToBottom();
  }

  appendLine(text, className = 'log-line') {
    const line = document.createElement('p');
    line.className = className;
    line.textContent = text;
    this.terminalLog.appendChild(line);
  }

  appendLines(lines) {
    lines.forEach((line) => this.appendLine(line));
  }

  resetLog() {
    this.terminalLog.innerHTML = '';
    this.appendLine('ibook@dev:~$ help', 'log-line prompt');
    this.appendLine('Try: about, skills, contact, projects, work, clear');
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.terminalLog.scrollTop = this.terminalLog.scrollHeight;
  }
}

function initRevealAnimation() {
  const nodes = document.querySelectorAll('.reveal');
  if (!nodes.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -30px 0px'
    }
  );

  nodes.forEach((node) => observer.observe(node));
}

function createBackgroundDust() {
  const dust = document.getElementById('bgDust');
  if (!dust) {
    return;
  }

  const count = 42;
  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('span');
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${6 + Math.random() * 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.opacity = `${0.2 + Math.random() * 0.5}`;
    dust.appendChild(particle);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  createBackgroundDust();
  initRevealAnimation();
  loadGitHubSnapshot();
  new CommandLineInterface();
});
