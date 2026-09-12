/**
 * Site-wide constants and the project catalogue.
 *
 * All facts below were verified against the AmritaBot GitHub org and PyPI on
 * 2026-09-12 — repo descriptions, latest release tags and docs subdomains.
 * If you bump a version, update it here and nowhere else.
 *
 * 文案统一用中文。产品名、版本号、仓库名，以及 Agent / runtime / ISA 这类术语
 * 保留英文，与三个文档站的用词保持一致。
 */

export type ProjectStatus = 'available' | 'in-development' | 'planned';

export interface Project {
  name: string;
  /** Short category label shown above the title. */
  kind: string;
  desc: string;
  version?: string;
  status: ProjectStatus;
  link?: string;
  docs?: string;
}

export const site = {
  name: 'AmritaBot',
  url: 'https://www.amritabot.com',
  title: 'AmritaBot | 开源 AI Agent 生态',
  description:
    'Project.Amrita 是一套开源 Agent 生态：基于 NoneBot2 的 Agentic 聊天机器人、厂商无关的 Agent 运行时，以及新一代工作流引擎。',
  tagline: 'AmritaBot 开源 Agent 生态',
  subtitle:
    '轻量、高性能的 Agent 技术栈 —— 从 Agentic 聊天机器人到厂商无关的运行时，再到新一代工作流引擎。',
  github: 'https://github.com/AmritaBot',
  org: 'AmritaConstant',
} as const;

/** 社区入口，「加入社区」区块与页脚共用同一份数据。 */
export const socials = [
  {
    label: 'Telegram',
    icon: 'telegram',
    href: 'https://t.me/+QRrsNnLUUSc1NzM1',
    bg: 'bg-[#2CA5E0]',
  },
  {
    label: 'QQ 群',
    icon: 'qq',
    href: 'https://qm.qq.com/q/IvG8Dm7W4m',
    bg: 'bg-[#eb1923]',
  },
  {
    label: 'Discord',
    icon: 'discord',
    href: 'https://discord.gg/byAD3sbjjj',
    bg: 'bg-[#5865F2]',
  },
] as const;

/** 文档站入口，页脚单独成列。 */
export const docSites = [
  { label: 'AmritaBot 文档', href: 'https://bot.amritabot.com' },
  { label: 'AmritaCore 文档', href: 'https://core.amritabot.com' },
  { label: 'AmritaSense 文档', href: 'https://sense.amritabot.com' },
] as const;

export const projects: Project[] = [
  {
    name: 'AmritaBot',
    kind: '对话 Agent',
    desc: '基于 NoneBot2 与 AmritaCore 构建的 Agentic 聊天机器人 —— 厂商无关的模型接入、多模态输入、OneBot V11 适配、MCP 客户端、Agent Skills，以及内置的 React WebUI。',
    version: '1.7.0',
    status: 'available',
    link: 'https://github.com/AmritaBot/AmritaBot',
    docs: 'https://bot.amritabot.com',
  },
  {
    name: 'AmritaCore',
    kind: 'Agent 运行时',
    desc: '基于 AmritaSense 构建的轻量、厂商无关 Agent 运行时 —— 原生异步流式输出，支持挂起与恢复；声明式依赖注入、事件钩子、工具调用与自动记忆管理。',
    version: '0.13.7',
    status: 'available',
    link: 'https://github.com/AmritaBot/AmritaCore',
    docs: 'https://core.amritabot.com',
  },
  {
    name: 'AmritaSense',
    kind: '工作流引擎',
    desc: '新一代工作流与事件流引擎，以指令集架构取代图模型 —— GOTO/CALL 控制流、精确中断，以及可热插拔的动态链接。',
    version: '0.7.0',
    status: 'available',
    link: 'https://github.com/AmritaBot/AmritaSense',
    docs: 'https://sense.amritabot.com',
  },
  {
    name: 'Faskill',
    kind: '技能运行时',
    desc: '高性能异步技能加载器，把 Anthropic Agent Skills 带到 Python Agent —— 放入一份 SKILL.md，技能工具即按需被发现并注册。',
    version: '0.2.0',
    status: 'available',
    link: 'https://github.com/AmritaBot/Faskill',
  },
  {
    name: 'Amctl',
    kind: '命令行工具',
    desc: 'Project.Amrita 的统一命令行 —— 脚手架、运行与管理机器人和插件，内置标准与轻量两套项目模板。',
    version: '0.1.4',
    status: 'available',
    link: 'https://github.com/AmritaBot/Amctl',
  },
  {
    name: 'plugin-memory',
    kind: '插件',
    desc: '为 AmritaBot 提供长期记忆与 harness 记忆支持，在内置上下文管理之上扩展跨会话的持久召回。',
    status: 'available',
    link: 'https://github.com/AmritaBot/plugin-memory',
  },
];
