import * as fs from 'fs';

export class FileSystemLocalRepository {
	constructor(private fsModule: any = fs) {}
	async deleteFile(path: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.fsModule.unlink(path, (err: any) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});
	}
	async readFile(path: string): Promise<string> {
		return new Promise((resolve, reject) => {
			this.fsModule.readFile(path, 'utf8', (err: any, data: string | PromiseLike<string>) => {
				if (err) {
					reject(err);
				}
				resolve(data);
			});
		});
	}
	async readDirPaths(path: string): Promise<string[]> {
		return new Promise((resolve, reject) => {
			this.fsModule.readdir(path, (err: any, files: string[] | PromiseLike<string[]>) => {
				if (err) {
					reject(err);
				}
				resolve(files);
			});
		});
	}
	async writeFile(path: string, content: string | Buffer): Promise<void> {
		return new Promise((resolve, reject) => {
			this.fsModule.writeFile(path, content, (err: any) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});
	}
	async ifPathExists(path: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.fsModule.exists(path, (err: any) => {
				if (err) {
					resolve(true);
				}
				resolve(false);
			});
		});
	}
}