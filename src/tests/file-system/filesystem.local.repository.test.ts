import { vi, describe, it, beforeEach, expect, afterEach } from 'vitest';
import { FileSystemLocalRepository } from '../../core/file-system/infrastructure/filesystem.local.repository';


describe('FileSystem local repository should', () => {
	let repo: FileSystemLocalRepository;
	let fsMock: any;

	beforeEach(() => {
		fsMock = {
			unlink: vi.fn(),
			readFile: vi.fn(),
			readdir: vi.fn(),
			writeFile: vi.fn(),
		};
		repo = new FileSystemLocalRepository(fsMock);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('when deletes a file', () => {
		it('do it correctly', async () => {
			const path = 'test.txt';
			fsMock.unlink = vi.fn((p, callback) => callback());

			await repo.deleteFile(path);

			expect(fsMock.unlink).toHaveBeenCalledWith(path, expect.any(Function));
		});

		it('throw an error if deletion fails', async () => {
			const error = new Error('Delete failed');
			fsMock.unlink = vi.fn((p, callback) => callback(error));

			await expect(repo.deleteFile('test.txt')).rejects.toThrow(error);
		});
	});

	describe('when reads a file', () => {
		it('do it correctly', async () => {
			const content = 'file content';
			fsMock.readFile = vi.fn((p, encoding, callback) => callback(null, content));

			const result = await repo.readFile('test.txt');

			expect(result).toBe(content);
		});

		it('throw an error if reading fails', async () => {
			const error = new Error('Read failed');
			fsMock.readFile = vi.fn((p, encoding, callback) => callback(error));

			await expect(repo.readFile('test.txt')).rejects.toThrow(error);
		});
	});

	describe('when reads the directory paths', () => {
		it('do it correctly', async () => {
			const files = ['file1.txt', 'file2.txt'];
			fsMock.readdir = vi.fn((p, callback) => callback(null, files));

			const result = await repo.readDirPaths('dir');

			expect(result).toEqual(files);
		});

		it('throw an error if reading directory fails', async () => {
			const error = new Error('Read dir failed');
			fsMock.readdir = vi.fn((p, callback) => callback(error));

			await expect(repo.readDirPaths('dir')).rejects.toThrow(error);
		});
	});

	describe('when writing a file', () => {
		it('save it correctly', async () => {
			const content = 'file content';
			fsMock.writeFile = vi.fn((p, data, callback) => callback());

			await repo.writeFile('test.txt', content);

			expect(fsMock.writeFile).toHaveBeenCalledWith('test.txt', content, expect.any(Function));
		});

		it('throw an error if writing fails', async () => {
			const error = new Error('Write failed');
			fsMock.writeFile = vi.fn((p, data, callback) => callback(error));

			await expect(repo.writeFile('test.txt', 'content')).rejects.toThrow(error);
		});
	});
});