import fs from 'fs';
import { Markdown } from './core/book-generator/domain/markdown';
import path from 'path';
import { FileSystemLocalRepository } from './core/file-system/infrastructure/filesystem.local.repository';
import { BookLocalRepository } from './core/book-generator/infrastructure/book.local.repository';
import { PDFLocalRepository } from './core/book-generator/infrastructure/pdf.local.repository';

const BOOKS_DIR = path.join(process.cwd(), 'books');
const SELECTED_BOOK_NAME = 'book-name';

const filesystem = new FileSystemLocalRepository(fs);
const bookLocalRepository = new BookLocalRepository(filesystem);
const pdfLocalRepository = new PDFLocalRepository();

const generateBook = async (bookName: string) => {
	const bookDir = path.join(BOOKS_DIR, bookName);
	const book = await bookLocalRepository.getBook(bookDir);
	const markdown = new Markdown();
    const bookContent = markdown.prepareContent(book.markdown);
    fs.writeFileSync('test.md', bookContent);
	const pdfPath = 'book.pdf';
	pdfLocalRepository.generatePDF(bookContent, pdfPath);
};

generateBook(SELECTED_BOOK_NAME)
	.then(() => {
		console.log(`> Book generated ${SELECTED_BOOK_NAME}`);
	})
	.catch((err) => {
		console.error('❌ Cannot generate the book', err);
	});
