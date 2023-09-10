export class PageUtils {
	static get break(): string {
		return '<div style="page-break-after: always;"></div>';
	}

	getTableOfContents(mdContent: string): string {
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
		return `## ${indexTitle}\n\n`;
	}

	private parseIndexTitle(level: number, title: string): string {
		return `${'  '.repeat(level - 1)}- [${title}](#${title.toLowerCase().replace(/\s+/g, '-')})\n`;
	}

	private titleRegex(): RegExp {
		return /^(#{1,6})\s+(.*)$/gm;
	}
}
