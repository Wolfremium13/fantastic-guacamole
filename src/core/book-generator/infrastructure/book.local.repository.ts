import path from 'path';
import { FileSystemLocalRepository } from '../../file-system/infrastructure/filesystem.local.repository';
import { BookRepository, ChaptersPath } from '../application/book.repository';
import { Book, MarkdownContent } from '../domain/book';
import { PubBookMetadataMapper } from './mappers/pub.book.metadata.mapper';

export class BookLocalRepository implements BookRepository {
	constructor(private fileSystem: FileSystemLocalRepository) {}
	async getBook(chaptersPath: ChaptersPath): Promise<Book> {
		const markdownContent = await this.getChaptersContent(chaptersPath);
		const metadata = await this.getBookMetadata(chaptersPath);
		const book: Book = {
			metadata: metadata,
			markdown: markdownContent,
		};
		return new Promise((resolve) => resolve(book));
	}

	private async getChaptersContent(chaptersPath: ChaptersPath): Promise<MarkdownContent> {
		const paths = await this.fileSystem.readDirPaths(chaptersPath);
		const chapterPaths = this.getChapterPaths(paths).map((p) => path.join(chaptersPath, p));
		const chapterContents = await Promise.all(chapterPaths.map((path) => this.getChapter(path)));
		return new Promise((resolve) => resolve(chapterContents.join('')));
	}
	private async getBookMetadata(chaptersPath: string) {
		const metadataPath = this.getMetadataPath(chaptersPath);
		const content = await this.fileSystem.readFile(metadataPath);
		const mapper = new PubBookMetadataMapper();
		return mapper.fromPub(content);
	}
	private getMetadataPath(chaptersPath: string) {
		return path.join(chaptersPath, 'resources', 'pub-data');
	}
	private getChapterPaths(paths: string[]): string[] {
		return paths.filter((path) => path.endsWith('.md')).sort((a, b) => a.localeCompare(b));
	}
	private async getChapter(path: string): Promise<string> {
		return this.fileSystem.readFile(path);
	}
}
