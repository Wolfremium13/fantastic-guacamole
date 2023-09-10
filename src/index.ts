import { mdToPdf } from 'md-to-pdf';

(async () => {
	await mdToPdf(
		{ path: 'README.md' },
		{
			dest: 'test.pdf',
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
		}
	).catch(console.error);
})();
