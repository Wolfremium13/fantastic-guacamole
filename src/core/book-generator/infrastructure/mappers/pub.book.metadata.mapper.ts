import { BookMetadata } from '../../domain/book.metadata';

export class PubBookMetadataMapper {
	private readonly keyMapping: { [key: string]: keyof BookMetadata } = {
		Title: 'title',
		Subtitle: 'subtitle',
		Author: 'author',
		'Write-Date': 'writeDate',
		'Publishing-Date': 'publishingDate',
		Edition: 'edition',
		'Cover-Illustration': 'coverIllustration',
		'Artistic-Direction': 'artisticDirection',
		'First-Edition': 'firstEdition',
		'Printed-In': 'printedIn',
		'Printing-Company': 'printingCompany',
		ISBN: 'ISBN',
		'Legal-Deposit': 'legalDeposit',
		Dedication: 'dedication',
	};
	fromPub(content: string) {
		const lines = content.split('\n');
		const metadata: Partial<BookMetadata> = {};
		lines.forEach((line) => {
			const [key, value] = line.split(' = ');
			if (this.keyMapping[key]) {
				metadata[this.keyMapping[key]] = value;
			}
		});
		return metadata as BookMetadata;
	}
}
