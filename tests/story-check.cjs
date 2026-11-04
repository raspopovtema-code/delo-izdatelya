const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const content=fs.readFileSync('dist/content.js','utf8');
const game=fs.readFileSync('dist/game.js','utf8');
const ctx={};vm.createContext(ctx);vm.runInContext(content+game.slice(game.indexOf('function grade('),game.indexOf('function evaluateDraft('))+';this.data={rooms,docs,claims,REQUIRED,grade};',ctx);
const {rooms,docs,claims,REQUIRED,grade}=ctx.data;
const allQ=new Set(Object.values(docs).flatMap(d=>d.questions));assert.deepEqual([...allQ].sort((a,b)=>a-b),Array.from({length:15},(_,i)=>i+1));
for(const id of REQUIRED){assert(rooms[docs[id].room].spots.some(s=>s[0]===id),`Unreachable required document ${id}`)}
assert(!REQUIRED.includes('aonides'));assert(!REQUIRED.includes('makarov'));
let cases=0,outcomes=new Set();for(let mask=0;mask<1<<claims.length;mask++){let selected=claims.filter((c,i)=>mask>>i&1).map(c=>c.id);if(selected.length<3||selected.length>5)continue;const evidence=Object.fromEntries(selected.map(id=>[id,claims.find(c=>c.id===id).supports[0]||'lisa']));const g=grade({selected,evidence});outcomes.add(g.kind);if(g.kind==='rescued'){assert(selected.includes('journey'));assert(selected.includes('program'));assert(selected.includes('connection')||selected.includes('independent'));assert(!selected.includes('break'));assert(!selected.includes('innocent'))}cases++}
assert.equal(outcomes.size,3);
assert.equal(grade({selected:['journey','program','independent'],evidence:{journey:'travel',program:'program',independent:'work'}}).kind,'rescued');
assert.equal(grade({selected:['journey','program','independent'],evidence:{journey:'lisa',program:'program',independent:'work'}}).kind,'delayed');
assert.equal(grade({selected:['journey','program','independent','break'],evidence:{journey:'travel',program:'program',independent:'child',break:'program'}}).kind,'denied');
console.log(`${cases} valid selections checked; all 15 curriculum items covered; ${REQUIRED.length} main documents reachable; 3 endings reachable; later sources excluded from 1792.`);
