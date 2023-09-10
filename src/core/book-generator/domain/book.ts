import { BookMetadata } from './book.metadata';

export type MarkdownContent = string;

export interface Book {
	metadata: BookMetadata;
	markdown: MarkdownContent;
}
