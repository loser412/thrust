const fs = require('fs');
const parser = require('@babel/parser');
const path = require('path');
const code = fs.readFileSync(path.join(__dirname, 'src/pages/ConsultPage.jsx'), 'utf-8');
try {
  parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
  console.log('ok');
} catch (e) {
  console.error(e.message);
  console.error(e.loc);
}

