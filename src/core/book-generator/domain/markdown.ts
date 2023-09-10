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
		const matches = [...mdContent.matchAll(this.titleRegex())];
		const seenTitles = new Set<string>();
		const tocEntries = matches
			.filter((match) => {
				const title = match[2];
				if (seenTitles.has(title)) {
					return false;
				} else {
					seenTitles.add(title);
					return true;
				}
			})
			.map((match) => this.parseIndexTitle(match[1].length, match[2]));
		return this.parseIndexHeader(indexTitle) + tocEntries.join('\n');
	}

	private parseIndexHeader(indexTitle: string): string {
		return `# ${indexTitle}\n\n`;
	}

	private parseIndexTitle(level: number, title: string): string {
		return `${'  '.repeat(level - 1)}- [${title}](#${title.toLowerCase().replace(/\s+/g, '-')})\n`;
	}

	private titleRegex(): RegExp {
		return /^(#{1,6})\s+(.*)$/gm;
	}
}
