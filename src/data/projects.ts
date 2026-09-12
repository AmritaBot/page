/**
 * Site-wide constants and the project catalogue.
 *
 * All facts below were verified against the AmritaBot GitHub org and PyPI on
 * 2026-09-12 — repo descriptions, latest release tags and docs subdomains.
 * If you bump a version, update it here and nowhere else.
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
  title: 'AmritaBot | Open Source AI Agent Ecosystem',
  description:
    'Project.Amrita is an open-source Agent ecosystem: an Agentic chat bot built on NoneBot2, a vendor-agnostic Agent runtime, and a next-generation workflow engine.',
  tagline: 'AmritaBot Open Source Ecosystem',
  subtitle:
    'A lightweight, high-performance Agent stack — an Agentic chat bot, a vendor-agnostic runtime, and a next-generation workflow engine.',
  github: 'https://github.com/AmritaBot',
  org: 'AmritaConstant',
} as const;

export const socials = [
  {
    label: 'Telegram',
    icon: 'telegram',
    href: 'https://t.me/+QRrsNnLUUSc1NzM1',
    bg: 'bg-[#2CA5E0]',
  },
  {
    label: 'QQ Group',
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

export const projects: Project[] = [
  {
    name: 'AmritaBot',
    kind: 'Chat Agent',
    desc: 'Agentic chat bot built on NoneBot2 and AmritaCore — vendor-agnostic model support, multimodal input, OneBot V11 adapters, MCP client, Agent Skills, and a built-in React WebUI.',
    version: '1.7.0',
    status: 'available',
    link: 'https://github.com/AmritaBot/AmritaBot',
    docs: 'https://bot.amritabot.com',
  },
  {
    name: 'AmritaCore',
    kind: 'Agent Runtime',
    desc: 'Lightweight, vendor-agnostic Agent runtime built on AmritaSense — native async streaming with suspend/resume, declarative dependency injection, event hooks, tool calling and automatic memory management.',
    version: '0.13.7',
    status: 'available',
    link: 'https://github.com/AmritaBot/AmritaCore',
    docs: 'https://core.amritabot.com',
  },
  {
    name: 'AmritaSense',
    kind: 'Workflow Engine',
    desc: 'Next-generation workflow and event-stream engine that replaces graph models with an instruction-set architecture — GOTO/CALL control flow, precise interrupts, and hot-swappable dynamic linking.',
    version: '0.7.0',
    status: 'available',
    link: 'https://github.com/AmritaBot/AmritaSense',
    docs: 'https://sense.amritabot.com',
  },
  {
    name: 'Faskill',
    kind: 'Skill Runtime',
    desc: 'Fast async skill loader that brings Anthropic Agent Skills to Python agents — drop in a SKILL.md and the skill tools are discovered and registered on demand.',
    version: '0.2.0',
    status: 'available',
    link: 'https://github.com/AmritaBot/Faskill',
  },
  {
    name: 'Amctl',
    kind: 'CLI Toolkit',
    desc: 'Unified command line for Project.Amrita — scaffold, run and manage bots and plugins, with project templates for both documented and lightweight setups.',
    version: '0.1.4',
    status: 'available',
    link: 'https://github.com/AmritaBot/Amctl',
  },
  {
    name: 'plugin-memory',
    kind: 'Plugin',
    desc: 'Long-term and harness memory support for AmritaBot, extending the built-in context management with persistent recall across sessions.',
    status: 'available',
    link: 'https://github.com/AmritaBot/plugin-memory',
  },
];
