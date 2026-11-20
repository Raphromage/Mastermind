'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const html = fs.readFileSync(path.join(__dirname, 'index.html'));
const blob = crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+html.length+'\0'),html])).digest('hex');
assert.equal(blob, '01484bc4b264f3790bfe4a8f3adfaac98798cb4a', 'Le code du jeu testé doit correspondre à la copie identifiée.');
const engine = html.toString('utf8').match(/<script id="engine">([\s\S]*?)<\/script>/);
assert.ok(engine, 'Moteur du jeu retrouvé');
const context = {};
vm.createContext(context);
vm.runInContext(engine[1]+'\nthis.makeGame = createGame;', context);
function fresh() {
  let i=0;
  const values=[0.01,0.01,0.18,0.35];
  return context.makeGame(()=>values[i++]);
}
const secret=['rouge','rouge','bleu','vert'];
const results=[];
function check(id, name, test) {
  try { const observed=test(); results.push({id,name,status:'réussi',observed}); }
  catch(error) { results.push({id,name,status:'échoué',observed:error.message}); }
}
check('J1-01','Cas normal',()=>{
  const game=fresh(), guess=['rouge','bleu','rouge','vert'];
  const r=game.submit(guess);
  assert.equal(r.wellPlaced,2); assert.equal(r.misplaced,2); assert.equal(r.attempt,1);
  assert.equal(game.state,'playing'); assert.equal(game.history.length,1);
  assert.equal(JSON.stringify(game.history[0].guess),JSON.stringify(guess));
  assert.equal(game.history[0].wellPlaced,2); assert.equal(game.history[0].misplaced,2);
  return '2 bien placées, 2 mal placées ; 1 essai et une entrée historique conformes';
});
check('J1-02','Cas limite quatre rouges',()=>{
  const game=fresh(), r=game.submit(['rouge','rouge','rouge','rouge']);
  assert.equal(r.wellPlaced,2); assert.equal(r.misplaced,0); assert.equal(r.attempt,1);
  assert.equal(game.history.length,1);
  return '2 bien placées, 0 mal placée ; 1 essai utilisé';
});
check('J1-03','Cas négatif trois couleurs',()=>{
  const game=fresh(), before=JSON.stringify(game.history);
  const r=game.submit(['rouge','rouge','bleu']);
  assert.ok(r.error); assert.match(r.error,/incomplète/i);
  assert.equal(JSON.stringify(game.history),before); assert.equal(game.history.length,0);
  assert.equal(game.state,'playing'); assert.equal(game.revealedSecret,null);
  return 'Refus avec explication ; 0 essai utilisé et historique inchangé';
});
check('J1-04','Victoire au dixième essai et blocage',()=>{
  const game=fresh();
  for(let i=0;i<9;i++) assert.equal(game.submit(['jaune','jaune','jaune','jaune']).state,'playing');
  const r=game.submit(secret);
  assert.equal(r.wellPlaced,4); assert.equal(r.state,'won'); assert.equal(r.attempt,10);
  const before=JSON.stringify(game.history); assert.ok(game.submit(secret).error);
  assert.equal(JSON.stringify(game.history),before);
  return 'Victoire au dixième essai ; nouvelle proposition refusée ; dix essais conservés';
});
check('J1-05','Défaite et révélation du secret',()=>{
  const game=fresh(); for(let i=0;i<10;i++) game.submit(['jaune','jaune','jaune','jaune']);
  assert.equal(game.state,'lost'); assert.equal(game.history.length,10);
  assert.equal(JSON.stringify(game.revealedSecret),JSON.stringify(secret));
  const before=JSON.stringify(game.history); assert.ok(game.submit(secret).error);
  assert.equal(JSON.stringify(game.history),before);
  return 'Défaite à dix essais ; secret révélé ; refus après fin sans modification historique';
});
check('J1-06','Position vide et couleur interdite',()=>{
  const game=fresh();
  for(const guess of [['rouge','','bleu','vert'],['rouge','noir','bleu','vert']]) {
    assert.ok(game.submit(guess).error); assert.equal(game.history.length,0); assert.equal(game.state,'playing');
  }
  return 'Deux refus avec explication ; aucun essai consommé';
});
console.log('Date UTC : '+new Date().toISOString());
console.log('Version testée : '+(process.argv[2]||'commit non précisé'));
console.log('Fichier : rendu/index.html ; blob Git : '+blob);
console.log('Secret déterministe : rouge–rouge–bleu–vert');
for(const r of results) console.log(r.id+' | '+r.name+' | '+r.status+' | '+r.observed);
console.log(results.filter(r=>r.status==='réussi').length+'/'+results.length+' tests réussis');
console.log('RESULTATS_JSON='+JSON.stringify(results));
if(results.some(r=>r.status!=='réussi')) process.exitCode=1;
