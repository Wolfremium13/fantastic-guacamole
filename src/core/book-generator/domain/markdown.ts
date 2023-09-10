import { MarkdownContent } from './book';

export class Markdown {
	static get break(): string {
		return '<div style="page-break-after: always;"></div>';
	}

	prepareContent(content: string, codeBlockMaxLength: number = 71): MarkdownContent {
		const toc = this.getTableOfContents(content);
		let mdContent = toc + '\n' + content;
		mdContent = this.insertPageBreaksBeforeH1(mdContent);
		mdContent = this.insertBreaksInCodeBlocks(mdContent, codeBlockMaxLength);
		return mdContent;
	}

	private insertPageBreaksBeforeH1(content: string): string {
		return content.replace(/^# /gm, `\n${Markdown.break}\n\n# `);
	}

	private insertBreaksInCodeBlocks(content: string, maxLength): string {
		return content.replace(this.codeBlockRegex(), (match, codeContent) => {
			return '```' + this.processCodeBlock(codeContent, maxLength) + '```';
		});
	}

	private processCodeBlock(codeContent: string, maxLength: number): string {
		return codeContent
			.split('\n')
			.map((line) => this.splitLongCodeLine(line, maxLength))
			.join('\n');
	}

	private splitLongCodeLine(line: string, maxLength: number): string {
		if (line.length > maxLength) {
			return line.slice(0, maxLength) + '\n' + line.slice(maxLength);
		}
		return line;
	}

	private codeBlockRegex(): RegExp {
		return /```([\s\S]*?)```/g;
	}

	private getTableOfContents(mdContent: string): string {
		const indexTitle = 'Índice general';
		const sections = this.splitIntoSections(mdContent);
		const seenTitles = new Set<string>();
		const tocEntries = [];

		for (let section of sections) {
			if (section.isCode) continue; // ignore code blocks

			const matches = [...section.content.matchAll(this.titleRegex())];
			for (let match of matches) {
				const title = match[2];
				if (!seenTitles.has(title)) {
					seenTitles.add(title);
					tocEntries.push(this.parseIndexTitle(match[1].length, title));
				}
			}
		}

		return this.parseIndexHeader(indexTitle) + tocEntries.join('\n');
	}

	private splitIntoSections(content: string): Array<{ isCode: boolean; content: string }> {
		const codeRegex = this.codeBlockRegex();
		const sections = [];
		let lastIndex = 0;
		let match;
		while ((match = codeRegex.exec(content)) !== null) {
			sections.push({
				isCode: false,
				content: content.slice(lastIndex, match.index),
			});
			sections.push({
				isCode: true,
				content: match[1],
			});
			lastIndex = match.index + match[0].length;
		}
		if (lastIndex < content.length) {
			sections.push({
				isCode: false,
				content: content.slice(lastIndex),
			});
		}
		return sections;
	}

	private parseIndexHeader(indexTitle: string): string {
		return `# ${indexTitle}\n\n`;
	}

	private parseIndexTitle(level: number, title: string): string {
		const prefix = '  '.repeat(level - 1);
		// remove special characters
		const anchorLink = title.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/_/g, '')
		return `${prefix}- [${title}](#${anchorLink})`;
	}

	private titleRegex(): RegExp {
		return /^(#{1,6})\s+(.*)$/gm;
	}
}
