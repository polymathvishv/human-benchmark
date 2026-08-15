import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { reactionTimeArticles } from './articlesData/reactionTimeArticles.js';
import { memoryArticles } from './articlesData/memoryArticles.js';
import { attentionArticles } from './articlesData/attentionArticles.js';
import { processingSpeedArticles } from './articlesData/processingSpeedArticles.js';
import { brainScienceArticles } from './articlesData/brainScienceArticles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allArticles = [
  ...reactionTimeArticles,
  ...memoryArticles,
  ...attentionArticles,
  ...processingSpeedArticles,
  ...brainScienceArticles
];

console.log(`Loaded ${allArticles.length} expanded articles across 5 pillars.`);

if (allArticles.length !== 26) {
  console.error(`Expected 26 articles, but found ${allArticles.length}`);
  process.exit(1);
}

const fileHeader = `export type ScienceCategory = 'reaction-time' | 'memory' | 'attention' | 'processing-speed' | 'brain-science';

export interface DataPoint {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
}

export interface VisualizationData {
  type: 'bar-comparison' | 'timeline-decay' | 'formula-box' | 'circadian-clock' | 'latency-breakdown';
  title: string;
  caption: string;
  dataPoints: { label: string; value: number; displayValue: string; color?: string; note?: string }[];
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: {
    title: string;
    description: string;
    isNegative?: boolean;
    bullets?: string[];
  }[];
  callout?: {
    type: 'insight' | 'warning' | 'takeaways' | 'formula';
    title: string;
    content: string;
    items?: string[];
  };
}

export interface ScienceArticle {
  slug: string;
  title: string;
  subtitle: string;
  category: ScienceCategory;
  categoryLabel: string;
  readTime: string;
  publishedDate: string;
  author: string;
  excerpt: string;
  featured?: boolean;
  relatedGame: {
    name: string;
    path: string;
    ctaText: string;
  };
  keyStats: DataPoint[];
  visualization?: VisualizationData;
  sections: ArticleSection[];
  keyTakeaways: string[];
  academicCitations: string[];
  faq: { question: string; answer: string }[];
}

export const SCIENCE_CATEGORIES: { id: ScienceCategory | 'all'; label: string; iconName: string; count: number }[] = [
  { id: 'all', label: 'All Library (26)', iconName: 'BookOpen', count: 26 },
  { id: 'reaction-time', label: 'Reaction Time (6)', iconName: 'Zap', count: 6 },
  { id: 'memory', label: 'Memory Systems (6)', iconName: 'Layers', count: 6 },
  { id: 'attention', label: 'Attention & Focus (5)', iconName: 'Eye', count: 5 },
  { id: 'processing-speed', label: 'Processing Speed (4)', iconName: 'Activity', count: 4 },
  { id: 'brain-science', label: 'Brain Science (5)', iconName: 'Cpu', count: 5 }
];

export const SCIENCE_ARTICLES: ScienceArticle[] = ${JSON.stringify(allArticles, null, 2)};
`;

const targetPath = path.resolve(__dirname, '../src/data/scienceArticles.ts');
fs.writeFileSync(targetPath, fileHeader, 'utf-8');

console.log(` Successfully written expanded scienceArticles.ts to ${targetPath}`);
console.log(` Total file size: ${(fs.statSync(targetPath).size / 1024).toFixed(1)} KB`);
