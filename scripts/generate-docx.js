const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Header, Footer, PageNumber } = require('docx');

const md = new MarkdownIt();

function renderInlineTokens(inline) {
  if (!inline || !inline.children) return [new TextRun({ text: '' })];
  const runs = [];
  let bold = false;
  let italic = false;
  let link = null;
  for (const ch of inline.children) {
    if (ch.type === 'strong_open') { bold = true; continue; }
    if (ch.type === 'strong_close') { bold = false; continue; }
    if (ch.type === 'em_open') { italic = true; continue; }
    if (ch.type === 'em_close') { italic = false; continue; }
    if (ch.type === 'link_open') { link = (ch.attrs && ch.attrs.find(a => a[0] === 'href') && ch.attrs.find(a => a[0] === 'href')[1]) || null; continue; }
    if (ch.type === 'link_close') { link = null; continue; }
    if (ch.type === 'code_inline') {
      runs.push(new TextRun({ text: ch.content, font: 'Consolas', size: 20, shading: { fill: 'F5F5F5' } }));
      continue;
    }
    if (ch.type === 'text') {
      const opts = { bold, italics: italic, font: 'Cambria', size: 22 };
      if (link) { opts.color = '0563C1'; opts.underline = {}; }
      runs.push(new TextRun({ text: ch.content, ...opts }));
      continue;
    }
    if (ch.type === 'image') {
      const alt = ch.attrs && ch.attrs.find(a => a[0] === 'alt') && ch.attrs.find(a => a[0] === 'alt')[1] || 'image';
      runs.push(new TextRun({ text: `[Image: ${alt}]`, italics: true, font: 'Cambria', size: 20 }));
      continue;
    }
  }
  return runs;
}

function mkParagraphFromInline(inline, opts = {}) {
  const runs = renderInlineTokens(inline);
  return new Paragraph({ children: runs, spacing: { after: opts.after || 160 }, alignment: opts.alignment || AlignmentType.LEFT });
}

function mkHeading(text, level) {
  const headingMap = {
    1: HeadingLevel.HEADING_1,
    2: HeadingLevel.HEADING_2,
    3: HeadingLevel.HEADING_3,
  };
  const sizeMap = { 1: 48, 2: 32, 3: 28 };
  return new Paragraph({ children: [new TextRun({ text, bold: true, font: 'Cambria', size: sizeMap[level] || 28 })], heading: headingMap[level] || HeadingLevel.HEADING_3, spacing: { before: 240, after: 120 } });
}

function mkCodeBlock(text) {
  // create a paragraph for each line to preserve line breaks
  const lines = text.replace(/\r/g, '').split('\n');
  return lines.map((ln) => new Paragraph({ children: [new TextRun({ text: ln || ' ', font: 'Consolas', size: 20 })], spacing: { before: 60, after: 60 }, shading: { fill: 'F5F5F5' } }));
}

function mkBlockquote(text) {
  return new Paragraph({ children: [new TextRun({ text, italics: true, font: 'Cambria', size: 22 })], indent: { left: 720 }, spacing: { before: 80, after: 80 } });
}

function parseMarkdownToDocx(mdText) {
  const tokens = md.parse(mdText, {});
  const docChildren = [];

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type === 'heading_open') {
      const level = Number(t.tag.replace('h', '')) || 1;
      const inline = tokens[i + 1];
      docChildren.push(mkHeading(inline && inline.content ? inline.content : '', level));
      i += 2; // skip heading_open, inline, heading_close
    } else if (t.type === 'paragraph_open') {
      const inline = tokens[i + 1];
      docChildren.push(mkParagraphFromInline(inline));
      i += 2;
    } else if (t.type === 'fence') {
      const codeParagraphs = mkCodeBlock(t.content);
      for (const p of codeParagraphs) docChildren.push(p);
    } else if (t.type === 'blockquote_open') {
      // next token is paragraph_open -> inline
      const inline = tokens[i + 2];
      const text = inline && inline.content ? inline.content : '';
      docChildren.push(mkBlockquote(text));
    } else if (t.type === 'bullet_list_open') {
      let j = i + 1;
      while (j < tokens.length && tokens[j].type !== 'bullet_list_close') {
        if (tokens[j].type === 'list_item_open') {
          const inline = tokens[j + 2];
          // render list item with a bullet prefix and indent
          const p = mkParagraphFromInline(inline, { after: 80 });
          p.properties = p.properties || {};
          p.properties.indent = { left: 360 };
          // add bullet character as first run
          p.root.unshift(new TextRun({ text: '• ', font: 'Cambria', size: 22 }));
          docChildren.push(p);
          j += 3;
        } else {
          j++;
        }
      }
      i = j;
    }
  }

  return docChildren;
}

function makeCover(title) {
  const children = [];
  children.push(new Paragraph({ children: [new TextRun({ text: title, bold: true, size: 72, font: 'Cambria' })], alignment: AlignmentType.CENTER, spacing: { after: 240 } }));
  children.push(new Paragraph({ children: [new TextRun({ text: '', size: 20 })] }));
  children.push(new Paragraph({ children: [new TextRun({ text: new Date().toLocaleDateString(), italics: true, size: 24, font: 'Cambria' })], alignment: AlignmentType.CENTER }));
  // page break after cover
  children.push(new Paragraph({ children: [new TextRun({ text: '' })], pageBreakAfter: true }));
  return children;
}

function main() {
  const inFile = process.argv[2] || 'Readme.md';
  const outFile = process.argv[3] || 'Readme.docx';

  if (!fs.existsSync(inFile)) {
    console.error(`Input file not found: ${inFile}`);
    process.exit(2);
  }

  const mdText = fs.readFileSync(inFile, 'utf8');

  // try to get title from first H1
  const firstHeadingMatch = mdText.match(/^#\s+(.+)$/m);
  const title = firstHeadingMatch ? firstHeadingMatch[1].trim() : 'Document';

  const children = [];
  // cover
  children.push(...makeCover(title));

  // content
  const contentChildren = parseMarkdownToDocx(mdText);
  children.push(...contentChildren);

  const doc = new Document({
    sections: [
      {
        properties: {},
        headers: {
          default: new Header({ children: [new Paragraph({ children: [new TextRun({ text: title, italics: true, size: 20, font: 'Cambria' })], alignment: AlignmentType.LEFT })] })
        },
        footers: {
          default: new Footer({ children: [new Paragraph({ children: [new TextRun({ text: 'Page ' }), new TextRun({ children: [PageNumber.CURRENT] })], alignment: AlignmentType.RIGHT })] })
        },
        children,
      },
    ],
    styles: {
      paragraphStyles: [
        { id: 'Normal', name: 'Normal', run: { font: 'Cambria', size: 24 } },
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', run: { bold: true, size: 48, font: 'Cambria' } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', run: { bold: true, size: 32, font: 'Cambria' } },
        { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', run: { bold: true, size: 28, font: 'Cambria' } },
      ],
    },
  });

  Packer.toBuffer(doc).then((buffer) => {
    try {
      fs.writeFileSync(outFile, buffer);
      console.log(`Wrote ${outFile}`);
    } catch (err) {
      if (err.code === 'EBUSY' || err.code === 'EPERM') {
        const alt = outFile.replace(/\.docx$/i, '.new.docx');
        fs.writeFileSync(alt, buffer);
        console.warn(`${outFile} is locked; wrote ${alt} instead.`);
        process.exit(0);
      }
      console.error('Failed to write docx:', err);
      process.exit(3);
    }
  }).catch((err) => {
    console.error('Failed to generate docx:', err);
    process.exit(3);
  });
}

main();
