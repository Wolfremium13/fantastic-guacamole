import { mdToPdf } from 'md-to-pdf';
import { FileSystemLocalRepository } from './core/file-system/infrastructure/filesystem.local.repository';


const fileSystem = new FileSystemLocalRepository();


(async () => {
	const pdf = await mdToPdf({ path: 'README.md' }).catch(console.error);

	if (pdf) {
		fileSystem.writeFile('test.pdf', pdf.content);
	}
})();
