// Parse the aer-data TypeScript files as syntax trees (no code execution) and dump plain data as JSON.
const fs = require('fs'), path = require('path'), ts = require('typescript');
const ROOT = process.argv[2];
const OUT = process.argv[3];

function val(n) {
  switch (n.kind) {
    case ts.SyntaxKind.StringLiteral:
    case ts.SyntaxKind.NoSubstitutionTemplateLiteral: return n.text;
    case ts.SyntaxKind.NumericLiteral: return Number(n.text);
    case ts.SyntaxKind.TrueKeyword: return true;
    case ts.SyntaxKind.FalseKeyword: return false;
    case ts.SyntaxKind.NullKeyword: return null;
    case ts.SyntaxKind.PrefixUnaryExpression: return -val(n.operand);
    case ts.SyntaxKind.ArrayLiteralExpression: return n.elements.map(val);
    case ts.SyntaxKind.ObjectLiteralExpression: {
      const o = {};
      for (const p of n.properties) if (p.name) o[p.name.text || p.name.getText()] = p.initializer ? val(p.initializer) : undefined;
      return o;
    }
    case ts.SyntaxKind.AsExpression: return val(n.expression);
    default: return { __unparsed: ts.SyntaxKind[n.kind] };
  }
}
function exportsOf(file) {
  if (!fs.existsSync(file)) return null;
  const sf = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  const res = {};
  sf.forEachChild(st => {
    if (st.kind === ts.SyntaxKind.VariableStatement)
      for (const d of st.declarationList.declarations) if (d.initializer) res[d.name.text] = val(d.initializer);
  });
  return res;
}
const out = {};
for (const lang of ['ENG', 'FR']) {
  out[lang] = {};
  for (const d of fs.readdirSync(path.join(ROOT, lang))) {
    const dir = path.join(ROOT, lang, d);
    if (!fs.statSync(dir).isDirectory()) continue;
    const meta = Object.values(exportsOf(path.join(dir, 'index.ts')) || {}).find(x => x && x.id) || {};
    const one = f => { const e = exportsOf(path.join(dir, f)); return e ? Object.values(e)[0] : []; };
    out[lang][d] = { id: meta.id, name: meta.name, wave: meta.wave, type: meta.type, cards: one('cards.ts'), mages: one('mages.ts'), nemeses: one('nemeses.ts') };
  }
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
for (const [d, e] of Object.entries(out.ENG)) {
  const f = out.FR[d];
  console.log(d.padEnd(22), e.id, e.type, 'cards', e.cards.length, 'mages', e.mages.length, 'nem', e.nemeses.length, f ? `FR(${f.cards.length},${f.mages.length},${f.nemeses.length})` : '');
}
