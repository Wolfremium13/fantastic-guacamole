export type Title = string;
export type Subtitle = string;
export type Author = string;
export type WriteDate = string;
export type PublishingDate = string;
export type Edition = string;
export type CoverIllustration = string;
export type ArtisticDirection = string;
export type FirstEdition = string;
export type PrintedIn = string;
export type PrintingCompany = string;
export type ISBN = string;
export type LegalDeposit = string;
export type Dedication = string;

export interface BookMetadata {
	title: Title;
	subtitle: Subtitle;
	author: Author;
	writeDate: WriteDate;
	publishingDate: PublishingDate;
	edition: Edition;
	coverIllustration: CoverIllustration;
	artisticDirection: ArtisticDirection;
	firstEdition: FirstEdition;
	printedIn: PrintedIn;
	printingCompany: PrintingCompany;
	ISBN: ISBN;
	legalDeposit: LegalDeposit;
	dedication: Dedication;
}
