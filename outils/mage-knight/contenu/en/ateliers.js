/* --- Cas pratiques : cartes d'exemple pour l'arène --- */
const AC={
 rage:{n:'Rage',c:'r',bt:'Attack 2 or Block 2',st:'Attack 4',base:[{k:'atk',n:2},{k:'block',n:2}],strong:[{k:'atk',n:4}]},
 determination:{n:'Determination',c:'b',bt:'Attack 2 or Block 2',st:'Block 5',base:[{k:'atk',n:2},{k:'block',n:2}],strong:[{k:'block',n:5}]},
 rapidite:{n:'Swiftness',c:'w',bt:'Move 2',st:'Ranged Attack 3',strong:[{k:'ranged',n:3}]},
 marche:{n:'March',c:'g',bt:'Move 2',st:'Move 4'},
 endurance:{n:'Stamina',c:'b',bt:'Move 2',st:'Move 4'},
 pfeu:{n:'Burning Shield',ex:1,c:'r',bt:'Fire Block 3',st:'Fire Block 5',base:[{k:'block',el:'fire',n:3}],strong:[{k:'block',el:'fire',n:5}]},
 lfeu:{n:'Fiery Blade',ex:1,c:'r',bt:'Fire Attack 3',st:'Fire Attack 5',base:[{k:'atk',el:'fire',n:3}],strong:[{k:'atk',el:'fire',n:5}]},
 dfeu:{n:'Fiery Dart',ex:1,c:'r',bt:'Ranged Fire Attack 3',st:'Ranged Fire Attack 5',base:[{k:'ranged',el:'fire',n:3}],strong:[{k:'ranged',el:'fire',n:5}]},
 belier:{n:'Battering Ram',ex:1,c:'g',bt:'Siege Attack 4',st:'Siege Attack 6',base:[{k:'siege',n:4}],strong:[{k:'siege',n:6}]},
 sortr:{n:'Red Spell',ex:1,type:'s',c:'r',bt:'Ranged Fire Attack 5',st:'Fire Siege Attack 8',base:[{k:'ranged',el:'fire',n:5}],strong:[{k:'siege',el:'fire',n:8}]},
 artef:{n:'Artifact',ex:1,type:'x',c:'x',bt:'Attack 3',st:'By destroying it: Attack 6',base:[{k:'atk',n:3}],strong:[{k:'atk',n:6}]}};
const en=(n,armor,atk,o)=>Object.assign({n,armor,atk,el:'phys',ab:[],res:[]},o||{});
const CASES={
 'a-unit':{type:'arena',title:'A Resistant Unit on the front line',intro:`The Brutes strike at 7: impossible to block with this hand. Your Golems have Physical Resistance. Win the combat with no Wound to your Hero.`,
   enemies:[en('Brutes',5,7)],hand:['rage','rage','marche'],dice:['r'],units:[{n:'Golems',armor:4,res:['phys'],lvl:2}],check:a=>a.wounds?`Your Hero took ${a.wounds} Wound(s). Let the Golems absorb it.`:null,
   hint:`Don't block. In the Damage phase, choose the Golems: they absorb 4 without a Wound, then are Wounded and absorb the remaining 3. Then attack with stronger Rage and the other Rage.`},
 'a-glace':{type:'arena',title:'Blocking an Ice Attack',intro:`These mages cast an Ice Attack of 5. Only Fire Blocks count in full; the others count for half. Win without taking a Wound.`,
   enemies:[en('Frost Mages',4,5,{el:'ice'})],hand:['pfeu','rage','rage','determination','marche','endurance'],dice:['r'],check:a=>a.wounds?`You took ${a.wounds} Wound(s): the attack wasn't blocked.`:null,
   hint:`Two options. Stronger Burning Shield with the red die blocks 5 at once, then the two Rage give Attack 4. Or basic Burning Shield (3) plus 4 points of physical Block, which count for 2, and stronger Rage to attack.`},
 'a-resist':{type:'arena',title:'Piercing a Resistance',intro:`These Golems resist physical and Ice: your physical Attacks are halved. Fire, however, goes through in full. Win without a Wound.`,
   enemies:[en('Frost Golems',6,2,{res:['phys','ice']})],hand:['dfeu','rage','rage','rapidite'],dice:['r'],check:a=>a.wounds?`You took ${a.wounds} Wound(s). One Rage is enough to block their Attack of 2.`:null,
   hint:`Block with one Rage (Block 2). In the Attack phase: stronger Fiery Dart (Fire 5, red die), plus the other Rage and Swiftness sideways, 3 physical points that count for 1. Total 6. A Ranged Attack can be played in the Attack phase: it counts there like the others. Not in phase 1 here: the Dart alone only makes 5 against 6, and Rage or a sideways card don't count yet.`},
 'a-vif':{type:'arena',title:'Swift and Brutal',intro:`Attack 3, but Swift: you need double to block it. And Brutal: if it gets through, the Damage doubles. Win without a Wound.`,
   enemies:[en('Rabid Wolves',4,3,{ab:['Swift','Brutal']})],hand:['determination','rage','rage','marche','endurance'],dice:['b'],check:a=>a.wounds?`You took ${a.wounds} Wound(s): Brutal doubled the Damage.`:null,
   hint:`You need a Block of 6: stronger Determination with the blue die (5) and a sideways card (1). Then the two Rage for Attack 4.`},
 'a-fort':{type:'arena',title:'Doubly Fortified',site:1,siteLbl:'Fortified site: all defenders are Fortified',intro:`You assault a Keep, and this defender also has the Fortified ability. Try your Battering Ram in the first phase, then find how to win without a Wound.`,
   enemies:[en('Rampart Guard',4,3,{fort:1})],hand:['belier','determination','marche','rage'],dice:[],check:a=>a.wounds?`You took ${a.wounds} Wound(s). Block its Attack of 3 first.`:null,
   hint:`In the first phase, it is untouchable, even by Siege. Go to Block: Determination (2) and March sideways (1). In the Attack phase, fortifications no longer count: the Battering Ram is enough.`},
 'a-multi':{type:'arena',title:'Two enemies, two attacks',intro:`Two opponents. The Wraiths resist physical. If you attack them together, their Resistance reduces your whole attack. Defeat both without a Wound.`,
   enemies:[en('Wraiths',3,2,{res:['phys']}),en('Raiders',4,3)],hand:['lfeu','rage','rage','determination','marche','endurance'],dice:['r'],check:a=>a.wounds?`You took ${a.wounds} Wound(s). Each enemy is blocked separately.`:null,
   hint:`Block the Wraiths with Determination (2), then the Raiders with one Rage (2) and a sideways card (1). In the Attack phase, select the Wraiths alone and play Fiery Blade (Fire 3). Then the Raiders alone: stronger Rage (4).`},
 'a-sort':{type:'arena',title:'A stronger Spell, at Night',night:1,intro:`It is Night. The Spell's stronger effect requires a red mana and a black mana, and you can only take one die from the Source. Bring down the Ogre before it strikes.`,
   enemies:[en('Ogre',7,6)],hand:['sortr','marche'],dice:['black','r'],cry:{r:1},check:a=>a.wonPhase!==0?`The Ogre had time to strike back. Aim for the first phase.`:null,
   hint:`Play the Spell's stronger effect: pay the red with your Crystal and the black with the Source die. Fire Siege 8 against Armor 7, from the first phase.`},
 'a-artef':{type:'arena',title:'Sacrificing an Artifact',intro:`Your Artifact gives Attack 3 and returns to the discard pile. Destroyed, it gives Attack 6, but it leaves the game. Win without a Wound.`,
   enemies:[en('Black Knight',6,3)],hand:['artef','determination','marche'],dice:[],check:a=>a.wounds?`You took ${a.wounds} Wound(s). Block first.`:null,
   hint:`Block: Determination (2) and March sideways (1). Attack: the Artifact's stronger effect, which destroys it.`},
 'a-donjon':{type:'arena',title:'Alone in the Dungeon',night:1,noUnits:1,siteLbl:'Dungeon: Night rules, Units left outside',intro:`You go down into a Dungeon in broad Day. Night rules apply there and your Peasants wait outside. Defeat the Minotaur without a Wound.`,
   enemies:[en('Minotaur',5,5,{ab:['Brutal']})],hand:['sortr','rage','marche'],dice:['gold','black'],cry:{r:1},units:[{n:'Peasants',armor:3,res:[],lvl:1}],check:a=>a.wounds?`You took ${a.wounds} Wound(s). Brutal doubles the Damage: better to defeat it first.`:null,
   hint:`The gold die is useless here. Pay the Spell's basic effect with your red Crystal: Ranged Fire Attack 5, enough to defeat it in the first phase.`},
 'a-cite':{type:'arena',title:'The walls of the White City',site:1,armorBonus:1,siteLbl:'White City: Fortified defenders, +1 Armor',intro:`In the White City, each defender gains 1 Armor. This guard therefore goes from 4 to 5. Defeat it without a Wound.`,
   enemies:[en('City Guard',4,3)],hand:['rage','rage','determination','marche'],dice:['r'],check:a=>a.wounds?`You took ${a.wounds} Wound(s). Block its Attack of 3.`:null,
   hint:`Block: Determination (2) and March sideways (1). Attack: stronger Rage with the red die (4) and the other Rage (2), 6 against 5.`},
 's-repos1':{type:'select',title:'Standard Rest',intro:`Your hand is clogged. You choose to Rest. Select the cards to discard to clear as many Wounds as possible.`,items:[['March',0],['Rage',0],['Wound',1],['Wound',1],['Wound',1]],action:'Rest by discarding the selection',
   check:s=>{const nw=s.filter(x=>!x[1]).length,w=s.filter(x=>x[1]).length;return nw===0?[0,'A Standard Rest requires discarding one non-Wound card.']:nw>1?[0,'Only one non-Wound card: keep the other for next turn.']:w<3?[0,'That is allowed, but you can discard as many Wounds as you like: take all three.']:[1,'One normal card and the three Wounds go to the discard pile. You will draw 4 fresh cards. Careful: these Wounds will come back at the next shuffle.']}},
 's-repos2':{type:'select',title:'Slow Recovery',intro:`This time, your hand only holds Wounds. Select what Resting lets you discard.`,items:[['Wound',1],['Wound',1],['Wound',1],['Wound',1]],action:'Rest by discarding the selection',
   check:s=>s.length===1?[1,'Slow Recovery: you show your hand and discard a single Wound. You will only draw one card.']:[0,s.length?'With no normal card to discard, Resting only removes a single Wound.':'Select a Wound.']},
 's-sort':{type:'select',title:'Paying for a Spell in broad Day',intro:`It is Day. You want the basic effect of a red Spell. Select the mana you spend.`,items:[['Gold die from the Source','gold'],['Black die from the Source','black'],['Green die from the Source','g'],['Blue Crystal','b']],action:'Pay for the red Spell\'s basic effect',
   check:s=>s.length!==1?[0,'A Spell\'s basic effect costs a single mana, of its colour.']:s[0][1]==='gold'?[1,'By Day, gold replaces any basic colour. It is your die for the turn.']:s[0][1]==='black'?[0,'Black mana can\'t be used by Day.']:[0,'You need red, or gold since it is Day.']},
 't-setup':{type:'story',title:'Setting up a solo game',steps:[
   {t:`You play alone, with a Dummy player. How many dice do you roll for the Source?`,o:[[`2`,0,`The calculation is: number of players plus 2.`],[`3`,1,`One player plus 2. The Dummy doesn't count.`],[`4`,0,`The Dummy doesn't count as a player for the Source.`]]},
   {t:`The three dice show gold, black and blue. Is the Source valid?`,o:[[`Yes`,0,`At least half the dice must show a basic colour. Here, only one in three.`],[`No: I reroll the gold die and the black die`,1,`Gold and black dice are rerolled until at least half are red, blue, white or green.`]]},
   {t:`How many cards do you reveal for the Units Offer?`,o:[[`3`,1,`Number of players plus 2, not counting the Dummy. Regular Units as long as no Core tile is revealed.`],[`5`,0,`It is the number of players plus 2.`],[`None before the first Village`,0,`The Offer is revealed at setup.`]]},
   {t:`Last step: how many cards do you draw?`,o:[[`5`,1,`Your Hand Limit at Levels 1 and 2.`],[`7`,0,`The starting Limit is 5.`]]}]},
 't-tour':{type:'story',title:'A full turn, decision by decision',steps:[
   {t:`Your hand: March, Stamina, Promise, Rage and a Wound. A Village is two Plains away from you (2 points each). You want to recruit there this turn. What do you start with?`,o:[[`I play Promise for Influence, then move`,0,`All Movement must be finished before the action.`],[`I move, then interact`,1,`Movement first, action next.`]]},
   {t:`March and Stamina give 4 points: you are at the Village. The Peasants cost 4 Influence. You have Promise, Rage and the Wound left. The Source shows a white die.`,o:[[`Promise, Rage sideways and the Wound sideways`,0,`A Wound can never be played, even sideways.`],[`Stronger Promise with the white die`,1,`Influence 4: the Peasants are recruited, Ready right away.`],[`Promise and Rage sideways`,0,`That only makes 3 Influence.`]]},
   {t:`The recruitment is done. You have Rage left. Can you enter the neighbouring Forest by playing Rage sideways and the Peasants?`,o:[[`Yes`,0,`No Movement is possible after the turn's action.`],[`No`,1,`The interaction was your action: the turn allows no more Movement.`]]},
   {t:`End of turn. What happens to the Wound in your hand?`,o:[[`I discard it`,0,`A Wound is never voluntarily discarded at the end of the turn.`],[`It stays in hand`,1,`You keep Rage and the Wound, and draw 3 cards to get back to 5.`]]}]},
 't-niveau':{type:'story',title:'Levelling up',steps:[
   {t:`You were Level 1 with 2 Fame. This turn, you gain 7: you are now at 9. The thresholds are at 3 and 8. What happens at the end of the turn?`,o:[[`I reach Level 2`,0,`You crossed two lines: you gain a Level for each.`],[`I reach Level 2, then Level 3`,1,`Each line crossed gives a Level, resolved one after the other.`]]},
   {t:`Level 2. You reveal two Skill tiles from your stack. The common Offer is empty.`,o:[[`I keep both`,0,`Only one Skill per even Level.`],[`I keep one, the other goes to the common Offer, and I choose an Advanced Action`,1,`And the chosen card goes on top of your Deck.`],[`I keep one and take the Advanced Action from the bottom`,0,`The bottom card is only forced if you take another player's Skill.`]]},
   {t:`Level 3, now. What do you receive?`,o:[[`Another Skill`,0,`Skills come at even Levels.`],[`A Command token and a new visible Level token`,1,`You can command one more Unit, and the revealed token shows your new Armor and Hand Limit values.`]]}]},
 't-manche':{type:'story',title:'From one Round to the next',steps:[
   {t:`Three players chose Tactics 5, 2 and 4. Who goes first?`,o:[[`The 5`,0,`The lowest number goes first.`],[`The 2`,1,`Turn Order follows ascending numbers: 2, 4, then 5.`]]},
   {t:`Later. At the start of your turn, your Deck is empty; you hold Rage and a Wound.`,o:[[`I must announce the end of the Round`,0,`Only if your hand is empty too.`],[`I have a choice: announce, or play a turn`,1,`Empty deck with cards in hand: the decision is yours.`],[`I reshuffle my discard pile`,0,`Never before the end of the Round.`]]},
   {t:`You announce the end of the Round.`,o:[[`I still play my turn`,0,`The announcement replaces your turn.`],[`Each other player plays one last turn, then the Round stops`,1,`You don't even benefit from the space you are on.`]]},
   {t:`New Round. Your Peasants were Spent and Wounded. What state are they in?`,o:[[`Ready and healed`,0,`Wounds don't disappear on their own.`],[`Ready, but still Wounded`,1,`They get their Command token back but can only act once healed.`]]},
   {t:`And the Wound you had in hand?`,o:[[`It is reshuffled into your Deck`,1,`All your cards, Wounds included, form the Deck again.`],[`It is removed from the game`,0,`Only Healing removes a Wound.`]]}]},
 't-monastere':{type:'story',title:'A Monastery, two ways',steps:[
   {t:`You are in a Monastery with 8 Influence and a Wound in hand. What can you buy?`,o:[[`The Advanced Action (6) and one Healing point (2)`,1,`Several purchases in one interaction, as long as the Influence is enough.`],[`The Advanced Action and two Healing points`,0,`That would be 10 Influence.`],[`A Spell for 7`,0,`Spells are bought at a Mage Tower or the Blue City.`]]},
   {t:`Another day, you decide to burn this Monastery. What happens to your Reputation?`,o:[[`−1`,0,`That is the cost of an assault or a plunder.`],[`−3, right away`,1,`The loss is immediate, whatever the outcome of the combat.`]]},
   {t:`You draw a purple enemy. Your two Units are Ready.`,o:[[`They fight normally`,0,`They refuse to take part in this act.`],[`They don't take part: no activation, no Damage for them`,1,`You fight alone.`]]},
   {t:`You win. Your reward?`,o:[[`An Artifact: at the end of the turn, I draw two and keep one`,1,`And the Monastery no longer exists for the rest of the game.`],[`A Spell from the Offer`,0,`That is the reward of a Mage Tower.`]]}]},
 't-antre':{type:'story',title:'The Monster Den and its reward',init:()=>({d1:roll(),d2:roll()}),steps:[
   {t:`A Monster Den is on your path. You can…`,o:[[`only stop and fight`,0,`An adventure site can always be ignored.`],[`cross it, stop there without fighting, or enter: that will be your action`,1,`Entering the Monster Den is the action for the turn.`]]},
   {t:`You enter and fail against the brown monster. What happens to its token?`,o:[[`It stays on the space, face up`,1,`The next Hero who enters will face the same monster.`],[`It is discarded`,0,`That is the case for the Dungeon, not the Monster Den.`]]},
   {t:x=>`Next turn, victory. At the end of the turn, you roll two dice for the reward: ${COL[x.d1]} and ${COL[x.d2]}. What do you gain?`,
    o:x=>{const f=d=>d==='black'?'+1 Fame':d==='gold'?'a Crystal of the colour of my choice':'a Crystal '+COL[d];const ok=f(x.d1)+' and '+f(x.d2);
     return [[ok.charAt(0).toUpperCase()+ok.slice(1),1,`Basic colour: that Crystal. Gold: colour of your choice. Black: 1 Fame instead.`],[`Two Crystals of my choice`,0,`The die decides the colour, except on a gold result.`],[`Nothing: I had to win the first time`,0,`The reward goes to whoever conquers the site, however many attempts it took.`]].filter((o,i,a)=>a.findIndex(z=>z[0]===o[0])===i)}}]},
 't-cite':{type:'story',title:'Taking a City',steps:[
   {t:`You attack a Red City. A defender with physical Attack 4 isn't blocked. How much Damage does it deal?`,o:[[`4`,0,`In the Red City, the defenders' physical attacks become Brutal.`],[`8`,1,`Brutal doubles the Attack when dealing Damage.`]]},
   {t:`You defeat 2 of the 3 defenders.`,o:[[`The City is mine`,0,`You must defeat all the defenders.`],[`I place 2 Shield tokens on the City card and fall back`,1,`One Shield per defeated defender, and back to the space you came from.`]]},
   {t:`Another player defeats the last defender. Who becomes Lord of the City?`,o:[[`Them: they struck the final blow`,0,`Only the number of Shield tokens counts.`],[`Me: 2 Shields against 1`,1,`If tied, it would be the first to have placed a Shield.`]]},
   {t:`You come back to interact in this conquered Red City.`,o:[[`+2 Influence, and Artifacts for 12 Influence`,1,`+1 Influence per Shield you placed there.`],[`+1 Influence, and Spells for 7`,0,`Spells are bought in the Blue City, and the bonus is +1 per Shield.`]]}]},
 't-jcj':{type:'story',title:'A duel, blow by blow',steps:[
   {t:`You end your Movement on a rival's space. They decide to participate only partially. Can they take a die from the Source?`,o:[[`Yes`,0,`That is the privilege of full participation.`],[`No, and their Skills can't be used`,1,`In exchange, they keep their next turn.`]]},
   {t:`Ranged and Siege phase. Who attacks first?`,o:[[`Me, the attacker`,0,`The attacker opens the Melee phase.`],[`Them, the defender`,1,`The roles then swap with each attack.`]]},
   {t:`They make a physical Ranged Attack of 4 against you. You play Block 4. Your Armor is 2.`,o:[[`Everything is blocked`,0,`In this phase, you need 2 Block points per Attack point.`],[`2 Damage gets through: they deal me a Wound`,1,`Block 4 stops 2. The 2 remaining Damage equal your Armor: one Wound.`],[`4 Damage gets through`,0,`Against a player, Block can be partial.`]]},
   {t:`Melee. You deal them 2 unblocked Damage. A free Plains space (cost 2) is adjacent. Their Armor is 3.`,o:[[`I deal them a Wound`,0,`It would take 3 Damage, as much as their Armor.`],[`I force them to withdraw onto the Plains: the combat ends and I win`,1,`Damage converts into Movement, at the space's cost.`],[`I steal an Artifact from them`,0,`That costs 5 Damage.`]]},
   {t:`You are Level 3, they are Level 5. How much Fame do you gain?`,o:[[`1`,0,`Add 2 per Level of difference.`],[`5`,1,`1 point, plus 2 for each of the two Levels between you.`],[`Nothing`,0,`You only gain nothing when you already had more Fame than the loser.`]]}]},
 't-coop':{type:'story',title:'A cooperative assault',steps:[
   {t:`You and your partner are each on a space adjacent to a City defended by 4 enemies. On your turn, you propose that each of you face 2. They accept. What do they do?`,o:[[`They flip their Turn Order token: they will skip their next turn`,1,`Taking part in the assault costs them their next turn.`],[`Nothing in particular`,0,`Their token is flipped to mark the turn they will skip.`]]},
   {t:`How are the 4 defenders split?`,o:[[`Each chooses the two they prefer`,0,`Nobody knows in advance who they will face.`],[`They are shuffled and 2 are dealt to each, unseen`,1,`You know how many, not which ones.`]]},
   {t:`You defeat your 2 defenders. Your partner only defeats one.`,o:[[`The City is conquered`,0,`One defender remains.`],[`The City holds: you both fall back, but your 3 Shields stay on the card`,1,`Each defeated defender already counts towards naming the future Lord.`]]},
   {t:`End of the game: you have 60 Fame, your partner 41. What is the basis of the team score?`,o:[[`60`,0,`The player furthest behind is what counts.`],[`41`,1,`Helping your partner progress pays off for the whole team.`],[`101`,0,`Fame isn't added up.`]]}]},
 't-fantome':{type:'story',title:'Playing the Dummy',init:()=>{const d=shuffle('rrrrggggbbbbwwww'.split(''));return{a:d.slice(0,3),b:d.slice(3,6)}},steps:[
   {t:x=>`The Dummy owns 2 green Crystals and 1 blue Crystal. On its turn, it discards three cards: ${x.a.map(c=>FEMC[c]).join(', ')}. How many extra cards does it discard?`,
    o:x=>{const n={g:2,b:1}[x.a[2]]||0;return [0,1,2].map(k=>[k?`${k}`:`None`,k===n?1:0,k===n?`Only the last card counts: it is ${FEMC[x.a[2]]}, and it has ${n} Crystal${n>1?'s':''} of that colour.`:`Look at the colour of the third card and count its Crystals of that colour.`])}},
   {t:x=>`Next turn: ${x.b.map(c=>FEMC[c]).join(', ')}. How many extra?`,
    o:x=>{const n={g:2,b:1}[x.b[2]]||0;return [0,1,2].map(k=>[k?`${k}`:`None`,k===n?1:0,k===n?`The third one is ${FEMC[x.b[2]]} : ${n} card${n>1?'s':''} extra.`:`Only the colour of the third card counts.`])}},
   {t:`Later, at the start of its turn, its Deck is empty.`,o:[[`It reshuffles its discard pile`,0,`Like you, it only reshuffles at the new Round.`],[`It announces the end of the Round: you play one last turn`,1,`It is the Dummy that sets the pace of the game.`]]},
   {t:`New Round. The Advanced Action removed from the bottom of the Offer is red, the removed Spell is white.`,o:[[`Both cards go into its Deck`,0,`The Spell goes back under its deck.`],[`The Advanced Action joins its Deck, and it gains a white Crystal`,1,`Its Deck grows and its Crystals pile up: the Rounds get shorter.`]]}]}
};
const FEMC={r:'red',g:'green',b:'blue',w:'white'};
[0,1,2,3,4,5,6,8,9,10,11].forEach(i=>CASES['L'+i]={type:'board',li:i});
const CH_CASES={'Goal of the game':['t-setup'],'The cards':['L0'],'Mana':['L1','L11'],'The turn':['t-tour'],'Move':['L2','L9'],'Interaction':['L3','L10'],'Combat':['L4'],'Wounds':['L5','s-repos1','s-repos2'],
 'Levels':['L6','t-niveau'],'The Round':['t-manche'],'Day and Night':['L8'],'Units':['a-unit'],'Elements':['a-glace','a-resist'],'Abilities':['a-vif','a-fort'],'Several enemies':['a-multi'],'Spells':['a-sort','s-sort'],'Artifacts':['a-artef'],
 'Inhabited sites':['t-monastere'],'Adventures':['a-donjon','t-antre'],'Cities':['a-cite','t-cite'],'Player versus Player':['t-jcj'],'Co-op':['t-coop'],'Solo and scoring':['t-fantome'],'Glossary':[]};
Object.assign(CASES,{
 'a-rempart':{type:'arena',title:'Across the Wall',site:1,siteLbl:'You challenge these Orcs across a Wall: they are Fortified',intro:`A Wall separates you from these Skirmishers. Try your Ranged Attack in the first phase, then win without a Wound.`,
   enemies:[en('Skirmishers',4,3)],hand:['rapidite','rage','determination','marche'],dice:['w'],check:a=>a.wounds?`You took ${a.wounds} Wound(s). Block their Attack of 3 first.`:null,
   hint:`In the first phase, the Ranged Attack doesn't hit a Fortified enemy. Block: Determination (2) and March sideways (1). In the Attack phase, everything counts: stronger Swiftness (3) and Rage (2).`},
 'a-defense':{type:'arena',title:'Defend',armorBonus:2,siteLbl:'Defend 2: alone, these Protectors protect themselves',intro:`These Protectors have the Defend 2 ability. Since they are alone, they apply it to their own Armor. Win without a Wound.`,
   enemies:[en('Protectors',4,3)],hand:['rage','rage','determination','marche','endurance'],dice:['r'],check:a=>a.wounds?`You took ${a.wounds} Wound(s). Block their Attack of 3 first.`:null,
   hint:`Block: Determination (2) and a sideways card (1). Attack: you need 6, stronger Rage with the red die (4) and the other Rage (2).`},
 't-dedale':{type:'story',title:'Entering a Maze',steps:[
   {t:`You are on a Maze with two Ready Units. You have 3 Move points left from your movement, and two Move cards in hand. You are aiming for the 4-point path.`,o:[[`I pay with my 3 remaining points and a sideways card`,0,`Leftovers from your Movement phase don't count: you need effects played to enter.`],[`I play my two Move cards to pay 4`,1,`Separate Move effects, played when entering.`]]},
   {t:`Who goes inside with you?`,o:[[`My two Units`,0,`There is only room for one.`],[`A single Unit, of my choice`,1,`The other can neither act nor absorb during this action.`]]},
   {t:`You defeat the monster. What happens to this 4-point path?`,o:[[`It stays open to all`,0,`Your Shield closes it.`],[`I mark it with a Shield; I won't come back, but another player can take the 2 or 6 path`,1,`Each path is only used once, and each player only enters once.`]]}]},
 't-insaisissable':{type:'story',title:'An Elusive enemy',steps:[
   {t:`Shades: Armor 3 or 6, Attack 4. You have a Ranged Attack 4. Do you try it in the first phase?`,o:[[`Yes: 4 against 3`,0,`In the Ranged and Siege phase, it is always the higher Armor: 6.`],[`No: it would take 6`,1,`Better to keep this card for the Attack phase.`]]},
   {t:`Block phase. You can block their Attack of 4, or let a Unit with Armor 5 absorb it.`,o:[[`The Unit absorbs it: no harm done`,0,`Not blocking leaves their Armor at 6 for the whole combat.`],[`I block the 4`,1,`All their attacks blocked: their Armor drops to 3 for the Attack phase.`]]},
   {t:`Attack phase. What do you need?`,o:[[`Attack 3, and my Ranged Attack counts`,1,`In this phase all Attack types combine, against the low Armor.`],[`Attack 6`,0,`You blocked: the low value applies.`]]}]},
 't-volkare':{type:'story',title:'Volkare attacks you',steps:[
   {t:`Second Day. Volkare enters your space with six tokens. You aren't ready. What does retreating cost?`,o:[[`2 Wounds`,0,`That is the rate for the first Day and the first Night.`],[`3 Wounds`,1,`2, 3 then 4 Wounds depending on how far the game has gone. You then withdraw to an adjacent safe space.`],[`Nothing, but I skip my turn`,0,`Retreating is paid in Wounds.`]]},
   {t:`Later, you face him. His die determines an attack of 5. You don't block it and you have Guardsmen with Armor 5.`,o:[[`The Guardsmen absorb 10 Damage`,0,`His attack has Assassination: no Units.`],[`My Hero takes 10 Damage`,1,`Brutal, so doubled, and Assassination, so for the Hero alone. Better to block it.`],[`My Hero takes 5 Damage`,0,`His attack is also Brutal: unblocked, it doubles.`]]},
   {t:`Two tokens of his army remain. Can you target Volkare himself to finish it?`,o:[[`Yes, with a Siege Attack`,0,`Volkare is never a target.`],[`No: he falls when his last two troops fall`,1,`Eliminating all his troops is the only way to defeat him.`]]}]},
 't-poursuite':{type:'story',title:'Ambush and Pursuit',steps:[
   {t:`An Ambushing enemy is 2 spaces from you. You move to another space, also 2 spaces from it; the space between you is a Mountain.`,o:[[`It attacks me`,0,`The space in between must contain neither mountain nor lake.`],[`It doesn't attack me`,1,`Ambush only reaches 2 spaces through a revealed, clear space.`]]},
   {t:`A token is Pursuing you and is 3 spaces away. You finish your Movement.`,o:[[`It moves one space towards me`,1,`It even crosses lakes and mountains, as long as the space is revealed and free.`],[`It attacks me right away`,0,`It must reach you first.`],[`It only moves if I provoked it`,0,`Pursuit is automatic at the end of each Movement of the pursued Hero.`]]},
   {t:`Next turn, it is adjacent and you are in a Village.`,o:[[`It attacks me: that is my action`,0,`Not in a place where an interaction is possible.`],[`It can't attack me here`,1,`Interaction sites and fortified sites you aren't besieging protect you.`]]}]},
 't-chef':{type:'story',title:'Bringing down a Faction Leader',steps:[
   {t:`The Leader is at level 4, Armor 5 at that level, surrounded by two followers. You gather 12 Attack points against it in the Attack phase. What happens?`,o:[[`It loses 1 level`,0,`Count the multiples of its Armor.`],[`It loses 2 levels`,1,`5 then 10: two Shields placed. It would have taken 15 for a third.`],[`It is defeated`,0,`It still has levels left.`]]},
   {t:`The combat ends. What happens to its marker, and are its defeated followers replaced?`,o:[[`The marker drops to level 2; no new followers arrive`,1,`Its companions depend on its starting level, once and for all.`],[`The marker drops and two new followers arrive`,0,`Enemies are never added when its level drops.`],[`The marker doesn't move before the next Round`,0,`It drops at the end of the combat.`]]},
   {t:`You also had a Spell able to destroy an enemy. Does it work on the Leader?`,o:[[`Yes`,0,`Leaders have Arcane Immunity.`],[`No: only Attacks and Blocks affect it`,1,`Arcane Immunity, like Volkare.`]]}]}
});
Object.assign(CH_CASES,{'Legion: sites':['a-rempart','t-dedale'],'Legion: enemies':['t-insaisissable'],'Legion: Units':[],'Volkare':['t-volkare'],'Tezla: Factions':['a-defense','t-poursuite'],'Tezla: Leaders':['t-chef']});

COURSE.forEach(c=>c.cases=CH_CASES[c.t]||[]);
const caseTitle=id=>CASES[id].type==='board'?LESSONS[CASES[id].li].h:CASES[id].title;

let CH='course',TI=0,BOARD=-1;const ANS=COURSE.map(()=>[]),ACT={},CDONE=new Set(),SEEN=new Set();
try{const v=JSON.parse(localStorage.getItem('mk-course')||'{}');TI=Math.min(COURSE.length-1,v.ti||0);(v.done||[]).forEach(x=>CDONE.add(x));(v.ans||[]).forEach((a,i)=>{if(ANS[i])ANS[i]=a});(v.seen||[]).forEach(x=>SEEN.add(x))}catch(e){}
function persist(){try{localStorage.setItem('mk-course',JSON.stringify({ti:TI,done:[...CDONE],ans:ANS,seen:[...SEEN]}))}catch(e){}}
const quizDone=i=>COURSE[i].quiz.every((q,j)=>ANS[i][j]===q.a);
const chapDone=i=>COURSE[i].cases.every(c=>CDONE.has(c))&&quizDone(i)&&(COURSE[i].glo?SEEN.has(i):true);
const activeCase=()=>{const c=COURSE[TI].cases;return c.length?(ACT[TI]&&c.includes(ACT[TI])?ACT[TI]:c[0]):null};
function winCase(id){if(!CDONE.has(id)){CDONE.add(id);persist()}}

/* --- Arène de combat --- */
let AR=null,ST=null,SL=null;
const ELN2={phys:'',fire:' Fire',ice:' Ice',cf:' Cold Fire'};
const KN={atk:'Attack',ranged:'Ranged Attack',siege:'Siege Attack',block:'Block'};
const altLbl=a=>KN[a.k]+ELN2[a.el||'phys']+' '+a.n;
function arStart(id){const d=CASES[id];AR={id,d,phase:0,hand:d.hand.map(x=>Object.assign({uid:UID++},AC[x])),dice:d.dice.map(c=>({c,used:false})),dieUsed:false,cry:Object.assign({},d.cry||{}),
  units:(d.units||[]).map(u=>Object.assign({spent:false,wounds:0,hit:false,dead:false},u)),enemies:d.enemies.map(e=>Object.assign({dead:false,blocked:false,done:false,sel:false},e)),
  pool:[],wounds:0,poison:0,dmg:null,log:[],over:false,ok:false,msg:'',wonPhase:-1}; if(AR.enemies.length===1)AR.enemies[0].sel=true}
const arSay=m=>{AR.log.unshift(m);AR.log.length=Math.min(AR.log.length,5)};
const arNight=()=>!!AR.d.night;
function arOpts(col,noDie){const o=[];
  if(col!=='black'&&AR.cry[col]>0)o.push({t:'cry',c:col,label:'Crystal '+COL[col]});
  if(!AR.dieUsed&&!noDie)AR.dice.forEach((d,i)=>{if(d.used)return;if(d.c===col&&(col!=='black'||arNight()))o.push({t:'die',i,label:'Die '+COL[d.c]+' from the Source'});else if(d.c==='gold'&&!arNight()&&col!=='black')o.push({t:'die',i,label:'Gold die from the Source (Day wildcard)'})});
  return o}
async function arPay(col,noDie){const o=arOpts(col,noDie);if(!o.length)return false;
  const m=o.length===1?o[0]:await ask('Pay the mana '+COL[col]+' with…',o.map(x=>({label:x.label,value:x})));if(!m)return false;
  if(m.t==='cry')AR.cry[m.c]--;else{AR.dice[m.i].used=true;AR.dieUsed=true}return true}
function arValid(a){const p=AR.phase;return a.k==='block'?p===1:a.k==='atk'?p===3:(p===0||p===3)}
async function arPlay(uid,mode){if(AR.over)return;const c=AR.hand.find(x=>x.uid===uid);if(!c)return;
  if(c.w){arSay('A Wound can\'t be played.');return render()}
  if(AR.phase===2){arSay('During the Damage phase, no cards are played: assign the Damage.');return render()}
  const alts=mode==='side'?[{k:'atk',n:1},{k:'block',n:1}]:(c[mode]||[]);
  if(!alts.length){arSay(c.n+' gives nothing in combat with this effect. Sideways, it is worth 1 Attack or Block point.');return render()}
  const v=alts.filter(arValid);
  if(!v.length){arSay(AR.phase===0?'In the first phase, only Ranged and Siege Attacks count. A sideways card never gives them.':AR.phase===1?'In the Block phase, play Blocks.':'This effect is no use in the Attack phase.');return render()}
  const a=v[0];
  if(mode==='strong'){
    if(c.type==='x'){/* détruit, sans mana */}
    else if(c.type==='s'){
      if(!arNight()){arSay('A Spell\'s stronger effect requires black mana: impossible by Day.');return render()}
      const bl=arOpts('black');if(!bl.length){arSay('You need a black mana.');return render()}
      const colOnlyDie=!arOpts(c.c,true).length;
      if(colOnlyDie){arSay('It would take two Source dice: only one per turn. Find the other mana elsewhere.');return render()}
      if(!await arPay(c.c,true)||!await arPay('black'))return render()}
    else{if(!arOpts(c.c).length){arSay('You need a mana '+COL[c.c]+(AR.dieUsed?' (you have already taken your die).':'.'));return render()}if(!await arPay(c.c))return render()}}
  else if(mode==='base'&&c.type==='s'){if(!arOpts(c.c).length){arSay('Even a Spell\'s basic effect costs a mana '+COL[c.c]+'.');return render()}if(!await arPay(c.c))return render()}
  AR.hand.splice(AR.hand.indexOf(c),1);AR.pool.push(Object.assign({el:'phys'},a));
  arSay(c.n+(mode==='side'?' sideways':mode==='strong'?(c.type==='x'?' destroyed':' stronger effect'):'')+' : '+altLbl(Object.assign({el:'phys'},a))+'.'+(c.type==='x'&&mode==='strong'?' It is removed from the game.':''));render()}
function arEnemy(i){if(AR.over)return;const e=AR.enemies[i];if(e.dead)return;
  if(AR.phase===1){if(e.blocked)return;AR.enemies.forEach(x=>x.sel=false);e.sel=true}
  else if(AR.phase===2){if(AR.dmg||e.blocked||e.done)return;arDmgStart(e)}
  else e.sel=!e.sel;render()}
function arTotals(){const t=AR.enemies.filter(e=>e.sel&&!e.dead),p=AR.phase;const d=AR.d;
  const fortAny=p===0&&t.some(e=>e.fort||d.site),dbl=p===0&&t.some(e=>e.fort&&d.site);
  const res=el=>el==='cf'?t.some(e=>e.res.includes('fire')&&e.res.includes('ice')):t.some(e=>e.res.includes(el));
  let full=0,half=0,ign=0;AR.pool.forEach(a=>{if(a.k==='block')return;if(p===0&&(a.k==='atk'||(a.k==='ranged'&&fortAny))){ign+=a.n;return}if(res(a.el))half+=a.n;else full+=a.n});
  return{t,fortAny,dbl,full,half,ign,total:full+Math.floor(half/2),need:t.reduce((s,e)=>s+e.armor+(d.armorBonus||0),0)}}
function arAttack(){const r=arTotals();if(!r.t.length){arSay('Select at least one enemy to attack.');return render()}
  if(r.dbl){arSay('Doubly Fortified enemy: untouchable in the first phase, even by Siege. Wait for the Attack phase.');return render()}
  if(r.total>=r.need){r.t.forEach(e=>{e.dead=true;e.sel=false});AR.pool=AR.pool.filter(a=>a.k==='block');
    arSay(r.t.map(e=>e.n).join(' and ')+' defeated'+' : '+r.total+' against '+r.need+'.'+(r.half?' (Reduced attacks: '+r.half+' ÷ 2.)':''));
    const left=AR.enemies.filter(e=>!e.dead);if(!left.length){AR.wonPhase=AR.phase;return arEnd()}if(left.length===1)left[0].sel=true}
  else arSay('Insufficient attack: '+r.total+' against '+r.need+'.'+(r.half?' A Resistance halves '+r.half+' of your points.':'')+(r.ign?' '+r.ign+' point(s) don\'t count in this phase.':'')+' Nothing is lost: strengthen the attack or change target.');
  render()}
const EFF2={phys:['phys','fire','ice','cf'],fire:['ice','cf'],ice:['fire','cf'],cf:['cf']};
function arBlockTot(e){let g=0,b=0;AR.pool.forEach(a=>{if(a.k!=='block')return;if(EFF2[e.el].includes(a.el))g+=a.n;else b+=a.n});return{g,b,total:g+Math.floor(b/2),need:e.atk*(e.ab.includes('Swift')?2:1)}}
function arBlock(){const e=AR.enemies.find(x=>x.sel&&!x.dead&&!x.blocked);if(!e){arSay('Choose the enemy to block.');return render()}
  const r=arBlockTot(e);if(r.total>=r.need){e.blocked=true;e.sel=false;AR.pool=AR.pool.filter(a=>a.k!=='block');arSay(e.n+' : attack blocked ('+r.total+' against '+r.need+').');
    const nx=AR.enemies.find(x=>!x.dead&&!x.blocked);if(nx)nx.sel=true}
  else arSay('Insufficient Block: '+r.total+' against '+r.need+'.'+(r.b?' '+r.b+' inefficient point(s) count for half.':'')+' All or nothing: add Block or give up.');render()}
function arNext(){if(AR.phase===0){AR.phase=1;AR.enemies.forEach(e=>e.sel=false);const f=AR.enemies.find(e=>!e.dead);if(f)f.sel=true;arSay('Block phase: the enemies attack.')}
  else if(AR.phase===1){AR.pool=AR.pool.filter(a=>a.k!=='block');AR.enemies.forEach(e=>e.sel=false);AR.phase=2;arSay('Damage phase.');arDmgAuto()}
  render()}
function arDmgAuto(){const l=AR.enemies.filter(e=>!e.dead&&!e.blocked&&!e.done);if(!l.length){AR.phase=3;AR.dmg=null;const a=AR.enemies.filter(e=>!e.dead);if(a.length===1)a[0].sel=true;arSay('Attack phase: all your Attacks count.')}else if(l.length===1&&!AR.dmg)arDmgStart(l[0])}
function arDmgStart(e){AR.dmg={e,left:e.atk*(e.ab.includes('Brutal')?2:1)};arSay(e.n+' deals '+AR.dmg.left+' Damage'+(e.ab.includes('Brutal')?' (Brutal: doubled)':'')+'. Assign them.')}
function arUnit(i){if(AR.over)return;const u=AR.units[i];
  if(AR.d.noUnits){arSay('Your Units don\'t follow you here: they can neither act nor absorb.');return render()}
  if(AR.phase!==2||!AR.dmg){arSay('In this hands-on case, this Unit is there to absorb damage: choose it during the Damage phase.');return render()}
  if(u.wounds||u.hit||u.dead){arSay('This Unit has already absorbed damage during this combat.');return render()}
  const e=AR.dmg.e,el=e.el,res=el==='cf'?u.res.includes('fire')&&u.res.includes('ice'):u.res.includes(el);let m=u.n+' : ';
  if(res){AR.dmg.left-=u.armor;if(AR.dmg.left<=0){u.hit=true;m+='Resistance, everything is absorbed without a Wound.'}else{u.wounds=1;AR.dmg.left-=u.armor;m+='Resistance, '+u.armor+' absorbed without a Wound, then the Unit is Wounded and absorbs another '+u.armor+'.'}}
  else{u.wounds=e.ab.includes('Poison')?2:1;AR.dmg.left-=u.armor;m+='Wounded, it absorbs '+u.armor+'.'}
  if(AR.dmg.left<=0){arSay(m+' All Damage is assigned.');AR.dmg.e.done=true;AR.dmg=null;arDmgAuto()}else arSay(m+' Left: '+AR.dmg.left+'.');render()}
function arHero(){const d=AR.dmg,ar=AR.d.armor||2,w=Math.ceil(d.left/ar);for(let i=0;i<w;i++)AR.hand.push({uid:UID++,w:true,n:'Wound'});AR.wounds+=w;
  arSay('Your Hero takes '+d.left+' Damage: '+w+' Wound'+(w>1?'s':'')+' (Armure '+ar+').'+(AR.wounds>=5?' Knocked out: you discard your other cards.':''));
  if(AR.wounds>=5)AR.hand=AR.hand.filter(c=>c.w);d.e.done=true;AR.dmg=null;arDmgAuto();render()}
function arEnd(){AR.over=true;const all=AR.enemies.every(e=>e.dead);let err=all?null:'One enemy is still standing.';if(!err&&AR.d.check)err=AR.d.check(AR);
  AR.ok=!err;AR.msg=err||'Case solved.';if(AR.ok)winCase(AR.id);render()}
function arHtml(){const d=AR.d,p=AR.phase,ph=['Ranged and Siege','Block','Damage','Attack'];
  const etag=e=>[e.fort||d.site?'Fortified':'',...e.ab,e.res.length?'Resists: '+e.res.map(r=>({phys:'physical',fire:'Fire',ice:'Ice'})[r]).join(', '):''].filter(Boolean).map(x=>`<span class="tag">${x}</span>`).join('');
  let ctl='';
  if(AR.over)ctl=`<div class="goal ${AR.ok?'done':''}"><div class="lab">${AR.ok?'Solved':'Try again'}</div>${AR.msg}</div>`;
  else if(p===0||p===3){const r=arTotals();ctl=`<p>${p===0?'Only your Ranged and Siege Attacks count. Tap the targeted enemies, play your cards, then attack.':'All your Attacks count, sideways cards included. Tap the targeted enemies.'}</p>
    <div class="pools"><span class="pool on">Attack <b>${r.total}</b> / ${r.need||'?'}</span>${r.half?`<span class="pool">of which ${r.half} halved</span>`:''}${r.ign?`<span class="pool">${r.ign} out of phase</span>`:''}</div>
    <div class="row"><button class="primary" data-ar="attack">Attack the selection</button>${p===0?'<button data-ar="next">Go to Block</button>':'<button data-ar="end">End the combat</button>'}</div>`}
  else if(p===1){const e=AR.enemies.find(x=>x.sel&&!x.dead&&!x.blocked);const r=e?arBlockTot(e):null;ctl=`<p>Each enemy is blocked separately. Tap the one you are blocking, play your Blocks, then confirm.</p>
    ${e?`<div class="pools"><span class="pool on">Block against ${e.n} <b>${r.total}</b> / ${r.need}</span>${r.b?`<span class="pool">${r.b} inefficient, counted at half</span>`:''}</div>`:''}
    <div class="row"><button class="primary" data-ar="block" ${e?'':'disabled'}>Block</button><button data-ar="next">Go to Damage</button></div>`}
  else ctl=AR.dmg?`<p><b>${AR.dmg.left} Damage</b> from ${AR.dmg.e.n} to assign. Tap a Unit to have it absorb damage, or let your Hero take the rest.</p><div class="row"><button class="primary" data-ar="hero">The Hero takes</button></div>`:`<p>Tap the enemy whose Damage you resolve first.</p>`;
  return `<div class="arena"><p>${d.intro}</p>${d.siteLbl?`<p class="sitelbl">${d.siteLbl}</p>`:''}
   <ol class="phases">${ph.map((x,i)=>`<li class="${i===p&&!AR.over?'cur':i<p?'past':''}">${i+1}. ${x}</li>`).join('')}</ol>
   <div class="foes">${AR.enemies.map((e,i)=>`<button class="foe ${e.dead?'dead':''} ${e.sel&&!e.dead?'sel':''}" data-foe="${i}"><b>${e.n}</b><span>Armor ${e.armor}${d.armorBonus?' + '+d.armorBonus:''} · Attack${ELN2[e.el]} ${e.atk}</span><span>${etag(e)}</span><em>${e.dead?'Defeated':e.blocked?'Blocked':e.done?'Struck':e.sel?'Targeted':''}</em></button>`).join('')}</div>
   ${ctl}
   <div class="row"><span class="sub">Mana</span>${AR.dice.map(x=>{const off=(x.c==='gold'&&arNight())||(x.c==='black'&&!arNight());return `<span class="die mc-${x.c} ${x.used?'used':off?'off':''}" style="color:${x.c==='w'||x.c==='gold'?'#12202a':'#fff'}" title="Die ${COL[x.c]}${off?' : unusable here':''}">${COL[x.c].slice(0,2)}</span>`}).join('')||'<small>no die</small>'}
     ${BASIC.filter(c=>AR.cry[c]).map(c=>`<span class="gem mc-${c}"></span><b>${AR.cry[c]}</b>`).join('')}<small>${arNight()?'Night: gold unusable, black usable':'Day: black unusable'} · one die per turn</small></div>
   ${AR.units.length?`<div class="row">${AR.units.map((u,i)=>`<button class="unitb ${u.wounds?'w':''}" data-aunit="${i}"><b>${u.n}</b> · Armor ${u.armor}${u.res.length?' · Physical Resistance':''}${u.wounds?' · Wounded':u.hit?' · has absorbed':''}${d.noUnits?' · stayed outside':''}</button>`).join('')}</div>`:''}
   <div class="hand">${AR.hand.map(c=>c.w?`<div class="card wound"><div class="band"></div><div class="in"><div class="cname">Wound</div><div class="eff">Injouable.</div></div></div>`:
     `<div class="card"><div class="band mc-${c.c}"></div><div class="in"><div class="cname">${c.n}${c.ex?' <small>(exemple)</small>':''}</div><div class="eff"><i>${c.type==='s'?'Basic, 1 mana '+COL[c.c]:'Basic'}</i>${c.bt}</div><div class="eff"><i>${c.type==='x'?'Stronger, by destroying it':c.type==='s'?'Stronger, '+COL[c.c]+' + black':'Stronger, 1 mana '+COL[c.c]}</i>${c.st}</div>
      <div class="btns"><button data-ap="base" data-uid="${c.uid}">Basic</button><button data-ap="strong" data-uid="${c.uid}">Stronger</button><button class="side" data-ap="side" data-uid="${c.uid}">Sideways (+1)</button></div></div></div>`).join('')||'<p class="muted">No more cards in hand.</p>'}</div>
   <div class="log" aria-live="polite">${AR.log.map(l=>`<div>${l}</div>`).join('')}</div>
   <div class="row"><button data-ar="restart">Restart this case</button></div><details class="hint"><summary>A solution</summary><p>${d.hint}</p></details></div>`}

/* --- Récits à étapes et sélections --- */
function stStart(id){const d=CASES[id];ST={id,d,i:0,pick:null,x:d.init?d.init():{}}}
const stVal=(v)=>typeof v==='function'?v(ST.x):v;
function stHtml(){const d=ST.d;if(ST.i>=d.steps.length)return `<div class="goal done"><div class="lab">Solved</div>You have gone through the whole example.</div><div class="row"><button data-st="restart">Replay the example</button></div>`;
  const s=d.steps[ST.i],o=stVal(s.o),p=ST.pick;
  return `<div class="story"><div class="step">Step ${ST.i+1} of ${d.steps.length}</div><p class="sit">${stVal(s.t)}</p>
   <div class="opts2">${o.map((x,k)=>`<button data-st="${k}" class="${p===k?(x[1]?'right':'wrong'):''}" ${p!==null&&o[p][1]?'disabled':''}>${x[0]}</button>`).join('')}</div>
   ${p===null?'':`<p class="fb ${o[p][1]?'good':'bad'}">${o[p][2]}</p>`}${p!==null&&o[p][1]?`<div class="row"><button class="primary" data-st="next">${ST.i+1<d.steps.length?'Continue':'Finish'}</button></div>`:''}</div>`}
function slStart(id){SL={id,d:CASES[id],sel:new Set(),fb:null}}
function slHtml(){const d=SL.d;return `<div class="story"><p class="sit">${d.intro}</p><div class="row">${d.items.map((it,i)=>`<button data-sl="${i}" class="chipb ${SL.sel.has(i)?'on':''} ${it[1]===1?'wd':''}">${it[0]}</button>`).join('')}</div>
   <div class="row"><button class="primary" data-sl="go">${d.action}</button></div>${SL.fb?`<p class="fb ${SL.fb[0]?'good':'bad'}">${SL.fb[1]}</p>`:''}</div>`}

/* --- Rendu du parcours --- */
function ensureCase(){const id=activeCase();if(!id)return null;const c=CASES[id];
  if(c.type==='board'){if(BOARD!==c.li){BOARD=c.li;setupBoard(c.li)}}
  else if(c.type==='arena'){if(!AR||AR.id!==id)arStart(id)}
  else if(c.type==='story'){if(!ST||ST.id!==id)stStart(id)}
  else if(!SL||SL.id!==id)slStart(id);
  return id}
function renderCourse(){const T=COURSE[TI],id=ensureCase(),c=id&&CASES[id];if(T.glo){SEEN.add(TI);persist()}
  $('#c-top').innerHTML=`<div class="panel"><div class="eyebrow">${T.part} · ${T.opt?'optional':`chapter ${TI+1} of ${COURSE.length-1}`}</div><h2 class="chtitle">${T.h}</h2>
    ${T.glo?`<dl class="glo">${T.glo.map(g=>`<dt>${g[0]}</dt><dd>${g[1]}</dd>`).join('')}</dl>`:`<ul class="rules">${T.rules.map(r=>`<li>${r}</li>`).join('')}</ul>`}${T.lab?labHtml():''}${precis(T)}</div>
   ${T.cases.length?`<div class="panel"><div class="row between"><h2>Hands-on case${T.cases.length>1?'s':''}</h2><span class="muted">${T.cases.filter(x=>CDONE.has(x)).length} / ${T.cases.length} solved${T.cases.length>1?'s':''}</span></div>
    <div class="casetabs">${T.cases.map(x=>`<button data-case="${x}" class="${x===id?'cur':''} ${CDONE.has(x)?'ok':''}">${caseTitle(x)}</button>`).join('')}</div>
    ${c.type==='board'?`<p class="muted">This case is played on the board below: instructions on the left, cards at the bottom.</p>`:c.type==='arena'?arHtml():c.type==='story'?`<h3>${c.title}</h3>`+stHtml():`<h3>${c.title}</h3>`+slHtml()}</div>`:''}`;
  $('#c-bot').innerHTML=(T.quiz.length?`<div class="panel"><h2>Check</h2>${T.quiz.map((q,j)=>{const a=ANS[TI][j];return `<div class="q"><p><b>${j+1}.</b> ${q.q}</p><div class="opts2">${q.o.map((o,k)=>`<button data-ans="${j}:${k}" class="${a===k?(k===q.a?'right':'wrong'):''}">${o}</button>`).join('')}</div>${a===undefined||a===null?'':`<p class="fb ${a===q.a?'good':'bad'}">${a===q.a?'Exact. '+q.why:'Not quite. Reread the chapter\'s rules and try again.'}</p>`}</div>`}).join('')}</div>`:'')
   +`<div class="row between">${TI>0?`<button data-topic="${TI-1}">Previous chapter</button>`:'<span></span>'}${TI<COURSE.length-1?`<button class="${chapDone(TI)?'primary':''}" data-topic="${TI+1}">Next chapter</button>`:`<button class="primary" data-chap="free">Start a free game</button>`}</div>`}
function renderNav(){const OPT=COURSE.findIndex(t=>t.opt),fire=OPT>=0&&chapDone(OPT),done=COURSE.filter((t,i)=>i!==OPT&&chapDone(i)).length+(fire?1:0),TOT=COURSE.length-(OPT>=0&&!fire?1:0);
  let h=NAVHEAD+`<div class="bar"><i style="width:${Math.round(100*done/TOT)}%"></i></div><div class="barlabel">${done} of ${TOT} chapters completed${fire?' 🔥':''}</div>`,last='';
  COURSE.forEach((t,i)=>{if(t.part!==last){h+=`<div class="part">${t.part}</div>`;last=t.part}h+=`<button data-topic="${i}" class="${i===TI?'cur':''}"><span class="n">${i+1}</span>${t.t}${chapDone(i)?'<span class="tick">✓</span>':''}</button>`});
  $('#side-nav').innerHTML=h}