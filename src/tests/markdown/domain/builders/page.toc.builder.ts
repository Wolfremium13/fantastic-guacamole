export class PageTOCBuilder {
    private content: string[];
    private hasTitles: boolean;

    constructor() {
        this.content = ['## Índice general\n\n'];
        this.hasTitles = false;
    }

    addTitle(title: string, level: number = 1): PageTOCBuilder {
        this.appendTitle(title, level);
        this.appendSpacingForLevel(level);
        this.hasTitles = true;
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
