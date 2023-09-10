import { Book } from "../domain/book";

export type ChaptersPath = string;

export interface BookRepository {
    getBook(chaptersPath: ChaptersPath): Promise<Book>;
}