import { mdToPdf } from 'md-to-pdf';
import fs from 'fs';
import { PageUtils } from './core/markdown/domain/page.utils';

(async () => {
    let mdContent = fs.readFileSync('README.md', 'utf8');
    let toc = new PageUtils().getTableOfContents(mdContent);
    toc += `\n${PageUtils.break}\n`;
    mdContent = toc + "\n" + mdContent;

    // DEBUG only
    fs.writeFileSync('temp.md', mdContent, 'utf8');
    //fs.unlinkSync('temp.md');

    await mdToPdf(
        { content: mdContent },
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
            md_file_encoding: 'utf-8',
        }
    ).catch(console.error);

})();
