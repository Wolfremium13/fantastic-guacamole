import { mdToPdf } from 'md-to-pdf';
import { MarkdownContent } from '../domain/book';

export type PDFPath = string;

export class PDFLocalRepository {

	async generatePDF(content: MarkdownContent, dest: PDFPath): Promise<void> {
		await mdToPdf(
			{ content: content },
			{
				dest: dest,
				stylesheet_encoding: 'utf-8',
				stylesheet: ['https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css'],
				body_class: ['markdown-body'],
				highlight_style: 'github',
				pdf_options: {
					format: 'A4',
					printBackground: true,
					margin: {
						top: '2cm',
						bottom: '2cm',
						left: '2cm',
						right: '2cm',
					},
				},
				md_file_encoding: 'utf-8',
				as_html: false,
			}
		)
	}
}
