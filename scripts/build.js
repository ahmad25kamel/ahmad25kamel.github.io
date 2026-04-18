const { copyFileSync, mkdirSync, existsSync } = require('fs');

const vendors = [
  ['node_modules/pdfjs-dist/build/pdf.min.js',        'assets/js/vendor/pdf.min.js'],
  ['node_modules/pdfjs-dist/build/pdf.worker.min.js', 'assets/js/vendor/pdf.worker.min.js'],
  ['node_modules/pdf-lib/dist/pdf-lib.min.js',        'assets/js/vendor/pdf-lib.min.js'],
  ['node_modules/jszip/dist/jszip.min.js',            'assets/js/vendor/jszip.min.js'],
  ['node_modules/lamejs/lame.min.js',                 'assets/js/vendor/lame.min.js'],
];

mkdirSync('assets/js/vendor', { recursive: true });

let failed = false;
for (const [from, to] of vendors) {
  if (!existsSync(from)) {
    console.error(`ERROR: ${from} not found. Run npm install first.`);
    failed = true;
    continue;
  }
  copyFileSync(from, to);
  console.log(`✓ ${from} → ${to}`);
}

if (failed) process.exit(1);
console.log('\nBuild complete — vendor files ready.');
