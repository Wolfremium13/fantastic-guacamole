export class PageTOCBuilder {
    private content: string[];

    constructor() {
        this.content = ['## Índice general\n\n'];
    }

    addTitle(title: string, level: number = 1): PageTOCBuilder {
        this.appendTitle(title, level);
        this.appendSpacingForLevel(level);
        return this;
    }

    build(): string {
        return this.content.join('');
    }

    private appendTitle(title: string, level: number): void {
        const prefix = '  '.repeat(level - 1);
        this.content.push(`${prefix}- [${title}](#${title.toLowerCase().replace(/\s+/g, '-')})\n`);
    }

    private appendSpacingForLevel(level: number): void {
        if (level === 1) {
            this.content.push('\n');
        }
    }
}
