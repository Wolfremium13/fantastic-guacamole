import { describe, it, expect } from 'vitest';
import { Markdown } from '../../../core/book-generator/domain/markdown';

describe('Markdown should', () => {
	it('give correct page break', () => {
		expect(Markdown.break).toBe('<div style="page-break-after: always;"></div>');
	});

	describe('prepare content correct table of contents', () => {
		it('with no titles', () => {
			const mdContent = '';
			const toc = new Markdown().prepareContent(mdContent);
			expect(toc).not.contains('- [Title');
		});

		it('with one title', () => {
			const mdContent = '# Title 1';
			const toc = new Markdown().prepareContent(mdContent);
			expect(toc).contains('- [Title 1](#title-1)\n');
		});

		it('with some titles', () => {
			const mdContent = '# Title 1\n## Title 2';
			const toc = new Markdown().prepareContent(mdContent);
			expect(toc).contains('- [Title 1](#title-1)\n');
			expect(toc).contains('  - [Title 2](#title-2)\n');
		});

		it('but we not allow repeated titles', () => {
			const mdContent = '# Title 1\n## Title 2\n# Title 1';
			const toc = new Markdown().prepareContent(mdContent);
			expect(toc).contains('- [Title 1](#title-1)\n');
			expect(toc).contains('  - [Title 2](#title-2)\n');
			expect(toc).not.contains('  - [Title 1](#title-1)\n');
		});
	});

	describe('insert page breaks before chapter titles (h1)', () => {
		it('with no titles', () => {
			const rawContent = '';
			const md = new Markdown().prepareContent(rawContent);
			const breaks = md.split(Markdown.break).length - 1;
			expect(breaks).toBeLessThanOrEqual(1);
		});

		it('with one title', () => {
			const rawContent = '# Title 1';
			const md = new Markdown().prepareContent(rawContent);
			const breaks = md.split(Markdown.break).length - 1;
			expect(breaks).toBe(2);
		});

		it('with some titles', () => {
			const rawContent = '# Title 1\n## Title 2';
			const md = new Markdown().prepareContent(rawContent);
			const breaks = md.split(Markdown.break).length - 1;
			expect(breaks).toBe(2);
		});
	});

	describe('insert breaks in code blocks', () => {
		it('with no code blocks', () => {
			const rawContent = '';
			const md = new Markdown().prepareContent(rawContent);
			expect(md).not.contains('```');
		});

		it('with one code block', () => {
			const rawContent = '```js\nconst a = 1;\n```';
			const md = new Markdown().prepareContent(rawContent);
			expect(md).contains('```');
			expect(md).contains('const a = 1;');
		});

		it('with some code blocks', () => {
			const rawContent = '```js\nconst a = 1;\n```\n```js\nconst b = 2;\n```';
			const md = new Markdown().prepareContent(rawContent);
			expect(md).contains('```');
			expect(md).contains('const a = 1;');
			expect(md).contains('const b = 2;');
		});

		it('with some code blocks and some long lines', () => {
			const rawContent = '```js\nconst a = 1;\nconst b = 2;\n```\n```js\nconst c = 3;\nconst d = 4;\n```';
			const md = new Markdown().prepareContent(rawContent);
			expect(md).contains('```');
			expect(md).contains('const a = 1;');
			expect(md).contains('const b = 2;');
			expect(md).contains('const c = 3;');
			expect(md).contains('const d = 4;');
		});

		it('with some code blocks and some long lines and some very long lines', () => {
			const rawContent =
				'```js\nconst a = 1;\nconst b = 2;\nconst c = 3;\n```\n```js\nconst d = 4;\nconst e = 5;\nconst f = 6;\n```';
			const md = new Markdown().prepareContent(rawContent);
			expect(md).contains('```');
			expect(md).contains('const a = 1;');
			expect(md).contains('const b = 2;');
			expect(md).contains('const c = 3;');
			expect(md).contains('const d = 4;');
			expect(md).contains('const e = 5;');
			expect(md).contains('const f = 6;');
		});
	});
});
