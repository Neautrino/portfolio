import matter from 'gray-matter';
import { marked } from 'marked';
import type { Plugin } from 'vite';

const STATUSES = ['shipped', 'building', 'archived'];

interface Rule {
  key: string;
  check: (value: unknown) => boolean;
  expected: string;
  optional?: boolean;
}

const str = (v: unknown) => typeof v === 'string' && v.trim() !== '';

const PROJECT_RULES: Rule[] = [
  { key: 'title', check: str, expected: 'a non-empty string' },
  { key: 'tagline', check: str, expected: 'a non-empty string' },
  { key: 'date', check: str, expected: 'a non-empty string, e.g. "Feb 2025"' },
  {
    key: 'status',
    check: (v) => typeof v === 'string' && STATUSES.includes(v),
    expected: STATUSES.join(' | '),
  },
  {
    key: 'stack',
    check: (v) => Array.isArray(v) && v.every((i) => typeof i === 'string'),
    expected: 'an array of strings',
  },
  { key: 'featured', check: (v) => typeof v === 'boolean', expected: 'an unquoted boolean' },
  {
    key: 'highlights',
    check: (v) => Array.isArray(v) && v.length > 0 && v.every((i) => typeof i === 'string'),
    expected: 'a non-empty array of strings',
  },
  { key: 'order', check: (v) => typeof v === 'number', expected: 'a number' },
  { key: 'liveUrl', check: str, expected: 'a URL string', optional: true },
  { key: 'repoUrl', check: str, expected: 'a URL string', optional: true },
];

function validate(data: Record<string, unknown>, rules: Rule[], file: string) {
  for (const { key, check, expected, optional } of rules) {
    const value = data[key];
    if (value === undefined) {
      if (optional) continue;
      return `${file}: missing required frontmatter "${key}" (expected ${expected})`;
    }
    if (!check(value)) {
      return `${file}: frontmatter "${key}" must be ${expected}, got ${JSON.stringify(value)}`;
    }
  }
  return null;
}

/**
 * Turns content markdown into JSON modules at build time, so gray-matter and
 * marked stay in devDependencies and no parser ships to the browser. Invalid
 * frontmatter fails the build rather than rendering a broken card.
 */
export function markdownContent(): Plugin {
  return {
    name: 'markdown-content',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) return null;

      const file = id.split('/').pop() ?? id;
      const { data, content } = matter(code);
      const error = validate(data, PROJECT_RULES, file);
      if (error) this.error(error);

      const module = {
        slug: file.replace(/\.md$/, ''),
        ...data,
        body: await marked.parse(content),
      };

      return { code: `export default ${JSON.stringify(module)}`, map: null };
    },
  };
}
