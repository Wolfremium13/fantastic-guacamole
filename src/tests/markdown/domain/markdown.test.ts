import { describe, it, expect } from 'vitest';
import { Markdown } from '../../../core/book-generator/domain/markdown';
import { PageTOCBuilder as MarkdownTOCBuilder } from './builders/markdown.toc.builder';

describe('Markdown should', () => {
	it('give correct page break', () => {
		expect(Markdown.break).toBe('<div style="page-break-after: always;"></div>');
	});

	describe('give correct table of contents', () => {
		it('with no titles', () => {
			const mdContent = '';
			const toc = new Markdown().getTableOfContents(mdContent);
			const expected = new MarkdownTOCBuilder().build();
			expect(toc).toBe(expected);
		});

		it('with one title', () => {
			const mdContent = '# Title 1';
			const toc = new Markdown().getTableOfContents(mdContent);
			expect(toc).toBe('## Índice general\n\n- [Title 1](#title-1)\n');
		});

		it('with some titles', () => {
			const mdContent = '# Title 1\n## Title 2';
			const toc = new Markdown().getTableOfContents(mdContent);
			const expected = new MarkdownTOCBuilder().addTitle('Title 1').addTitle('Title 2', 2).build();
			expect(toc).toBe(expected);
		});

		it('but we not allow repeated titles', () => {
			const mdContent = '# Title 1\n## Title 2\n# Title 1';
			const toc = new Markdown().getTableOfContents(mdContent);
			const expected = new MarkdownTOCBuilder().addTitle('Title 1').addTitle('Title 2', 2).build();
			expect(toc).toBe(expected);
		});
	});
});
