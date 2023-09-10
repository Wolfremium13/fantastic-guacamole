import { describe, it, expect } from 'vitest';
import { PageUtils } from '../../../core/markdown/domain/page.utils';
import { PageTOCBuilder } from './builders/page.toc.builder';

describe('Page utils should', () => {
	it('give correct page break', () => {
		expect(PageUtils.break).toBe('<div style="page-break-after: always;"></div>');
	});

	describe('give correct table of contents', () => {
		it('with no titles', () => {
			const mdContent = '';
			const toc = new PageUtils().getTableOfContents(mdContent);
			const expected = new PageTOCBuilder().build();
			expect(toc).toBe(expected);
		});

		it('with one title', () => {
			const mdContent = '# Title 1';
			const toc = new PageUtils().getTableOfContents(mdContent);
			expect(toc).toBe('## Índice general\n\n- [Title 1](#title-1)\n');
		});

		it('with some titles', () => {
			const mdContent = '# Title 1\n## Title 2';
			const toc = new PageUtils().getTableOfContents(mdContent);
			const expected = new PageTOCBuilder().addTitle('Title 1').addTitle('Title 2', 2).build();
			expect(toc).toBe(expected);
		});

		it('but we not allow repeated titles', () => {
			const mdContent = '# Title 1\n## Title 2\n# Title 1';
			const toc = new PageUtils().getTableOfContents(mdContent);
			const expected = new PageTOCBuilder().addTitle('Title 1').addTitle('Title 2', 2).build();
			expect(toc).toBe(expected);
		});
	});
});
