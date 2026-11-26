const COL={r:'red',g:'green',b:'blue',w:'white'};
const KEYS=['r','g','b','w'];
const FEM={r:'red',g:'green',b:'blue',w:'white'};
const rnd=n=>Math.floor(Math.random()*n);
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const SAVE='mk-fantome-v1';
/* ---------- Scénarios ---------- */
const FW_SOLO=`Rulebook solo setup: a Dummy player. You choose your Tactic first, it draws one at random, and both are removed for the rest of the game. Remove the four interactive Spells (no. 17 to 20) and your Hero's interactive Skill.`;
const FW_COOP=`Rulebook co-op setup: a Dummy player, which draws its Tactic at random before you. At the end of each Round, remove from the game one of the Tactics used by the players. Remove the four interactive Spells (no. 17 to 20) and each Hero's interactive Skill. No combat between players.`;
const BLITZ=`Blitz scenario bonuses: you start with 1 Fame and 2 Reputation; each new line reached on the Fame track gives 1 extra Fame; one more die in the Source and one more Unit in the Offer.`;
const SC_SOLO=`Score: your Fame, the Achievements without titles, then 10 points per conquered City, 15 more if all are conquered, 30 per unused Round, 1 per card left in the Dummy's Deck and 5 if the end of the current Round hadn't been announced.`;
const SC_COOP=`Team score: the Fame of the player furthest behind, then for each Achievement the better of the two players, without titles. Add 10 points per conquered City, 10 if each player is Lord of at least one City, 15 if all are conquered, 30 per unused Round, 1 per card left in the Dummy's Deck and 5 if the end of the current Round hadn't been announced.`;
const ADAPT=`The rulebook allows any scenario to be played solo with the Solo Conquest setup, without stating the number of tiles for one player: this companion uses the values for 2 players.`;
const MINES_R=[`Revealed Mine, including on tiles placed during setup: place an Enemy token face up on it, green on a Countryside tile, red on a Core tile, and a brown token face down. Arrange them so the brown one stays clearly visible: they aren't rampaging enemies. If brown tokens run out, draw them only when revealing them.`,`Liberating a Mine is your action, by entering its space: you fight both enemies with Night rules, as in a Dungeon, but your Units take part. A survivor stays in place and can be attacked later.`,`Whoever eliminates the last enemy liberates the Mine: Shield token and +1 Reputation (+2 on a Core tile). A Mine produces nothing while occupied; once liberated, it produces right away: a Crystal at the end of this turn.`,`At the start of each Round, each liberated Mine gives a Crystal of its colour to whoever liberated it, wherever they are.`];
const DRUID_R=[`Ending your Movement in a Magical Glade lets you activate it: place a Shield token there. It isn't an action. A Glade can hold several Shields, one per player.`,`Once during the first Night, on a space that isn't an inhabited site, you can perform an incantation: it is your action. Draw a brown monster per Glade you have activated and fight them.`,`Each defeated monster earns double its Fame. The others vanish at the end of the combat, but their Wounds remain. Each summoned monster, defeated or not, gives at the end of the turn a Crystal rolled on the die, as in a Monster Den.`,`At the end of the first Night, remove all Shields from the Glades: they must be reactivated for the second incantation.`,`Second Night: a new incantation, this time with red enemies. Double Fame, and two Crystals per summoned enemy.`];
const HOME=`Homemade scenario, written for this companion and not playtested at the table: adjust freely if it turns out too hard or too easy.`;
const VK_BASE=`Volkare replaces the Dummy player and counts as a player: the Source holds real players + 3 dice, the Units Offer real players + 3 cards.`;
const VK_DECK=`Volkare's Deck: the 16 Basic Action cards of an unused Hero, the four interactive Spells (no. 109 to 112) and Wounds depending on the Pursuit Level. It is never reshuffled. Replace the interactive Skills with the cooperative Skills; in solo, add to the common Offer a Skill from another randomly drawn Hero after each of your Levels.`;
const VK_TAC=`Tactics: the players choose first, then Volkare draws his from the remaining ones. In solo, your Tactic is removed from the game at the end of the Round; in co-op, none are.`;
const VK_FIGHT=`Fighting Volkare means facing his whole army plus his own attack, rolled on the die, always Brutal and Assassination. Volkare can't be targeted: he is defeated when all his troops are. They aren't Fortified, except in a fortified site or across a Wall.`;
const VK_COOP=`With two players, you can attack or defend together: split the elite troops (white and red) on one side and the regulars (grey and green) on the other, then each fights their share and suffers Volkare's attack.`;
const VK_END=`Volkare never announces the end of the Round and doesn't play a last turn. Each turn, he reveals a card: the companion tells you what to do.`;
const VK_RET=`As long as the City isn't revealed, Volkare explores according to his cards. As soon as it is, he heads there by the shortest path. Each Wound revealed can make a Wavering Unit leave the Offer, adding a grey token to his army.`;
const VK_CITY=`When Volkare, adjacent to the City, must advance, he assaults it. Unconquered City: you lose. Conquered but undefended City: he plunders it, and the second time you lose. If you defend it and he loses at least one token per player, he falls back one space.`;
const VK_MAP=`Open board limited to 4 columns; Volkare's Camp is the leftmost starting tile, and its space has no effect.`;
const VK_QMAP=`Board shape set by the rulebook, Volkare's Camp opposite the Portal. All tiles are placed face down, except the Camp, the Portal and the 3 tiles touching it.`;
const VK_LV=`City and Volkare levels, Wounds in his Deck and marked Units: set in the Game tab, based on the Combat and Pursuit Levels.`;
const VK_RWIN=`Victory as soon as Volkare's whole army is eliminated. Defeat if he reaches the City before you, plunders it twice, or if the last Round ends.`;
const VK_RSC=`Team score: the Fame of the player with the least Fame, the best player's Achievements per category, without titles, and 20 points if the City is conquered. Volkare defeated: 30, 40 or 50 points depending on the Combat Level, plus 2 per card left in his Deck, bonus multiplied by 1, 1.5 or 2 depending on the Pursuit Level.`;
const VK_QUE=`Volkare marches towards the Portal without revealing tiles. When he comes within 3 spaces of the Portal, it closes: it becomes an ordinary space, and a player on it is out of the game. Revealed Wounds make Frightened Units leave the Offer, without reinforcing his army.`;
const VK_QSLOW=`If Volkare loses, before his turn, at least twice as many tokens as there are players, he skips his next turn: don't touch his turn button that time.`;
const VK_QWIN=`Victory as soon as Volkare's whole army is eliminated. Defeat if he enters the Portal and then must advance again.`;
const VK_QSC=`Team score: the Fame of the player with the least Fame, the best player's Achievements per category, without titles, and 5 points per conquered City. Volkare defeated: 30, 40 or 50 points depending on the Combat Level, plus 2 per card left in his Deck, bonus multiplied by 1, 1.5 or 2 depending on the Pursuit Level.`;
const TZ_SOLO=`Dummy player. You choose your Tactic first, it draws one from the remaining ones, and both are removed from the game at the end of the Round. Remove the four interactive Spells (no. 109 to 112) and replace the interactive Skills with The Lost Legion's cooperative Skills.`;
const TZ_COOP=`Dummy player, which draws its Tactic at random before you. You form a single team. Remove the four interactive Spells (no. 109 to 112) and replace the interactive Skills with The Lost Legion's cooperative Skills.`;
const TZ_CHEF=`Faction Leader: you must enter its space, which isn't safe, to face it with its followers. Each attack equal to its Armor removes one level; the details are in the tutorial, chapter "Tezla: Leaders".`;
const TZ_SC=`Score: your Fame and the Achievements, without titles.`;
const TZ_SCC=`Team score: the Fame of the player with the least Fame, and for each Achievement the best player, without titles.`;
const TZ_SC2=` Add 1 point per card left in the Dummy's Deck and 5 if the end of the current Round hadn't been announced.`;
const TZ_HIGH=`High-level start: each Hero starts at Level 3 with 9 Fame, and builds a Deck and an army with 18 Influence, following the rulebook variant.`;
const TZ_REL=`The Cities are destroyed: no figure and no card. Only one figure per City space, and entering it costs 2. Place a Draconum face down there, revealed as soon as a player is adjacent, by Day or Night. It isn't rampaging: entering the space means fighting it. If you win, you find the fragment and mark the space with a Shield.`;
const TZ_REL2=`Rampaging Draconum on City tiles are replaced by green rampaging enemies. Remove the Elite Units only recruitable in a City. One more die in the Source and one more Unit in the Offer. +1 Fame per line reached on the track, +1 per Core tile revealed, and another +1 if it has a ruined City.`;
const TZ_VAL=`Gather all the Elementalist tokens into one pile: rampaging enemies come from it and, except those placed at setup, gain Ambush. Defeating a rampaging Elementalist makes you add a Core tile, like an exploration, not necessarily next to you.`;
const TZ_VAL2=`Exploring costs triple, and you can pay this cost with Influence. When the white City tile is placed, the Forgotten Valley covers the City space, with the High Priestess and her followers. The Keep on this tile is guarded by 2 green Elementalists. The Valley has no effect before it is liberated.`;
const TZ_MOR=`Gather all the Dark Crusader tokens into one pile: rampaging enemies come from it. Those that an exploration brings out during your turn receive your Shield and Pursue you from the following turn.`;
const TZ_MOR2=`Each revealed Magical Glade becomes a Graveyard, with face-down enemies depending on the order of discovery: two green; one green and one brown; one red; one green and one red; one brown and one red.`;
const TZ_MOR3=`Liberating a Graveyard is an action, from its space; survivors remain. Reward by order: Advanced Action, Spell, Unit, Artifact, then Artifact and Advanced Action. Then, on the spot, spend a mana to seal it, without an action: Shield and +1 Reputation. When the blue City tile is placed, the Necropolis covers the City, with the Necromancer.`;
const TZ_VIE=`Sort the green, brown and red tokens by Faction. Rampaging enemies come from the Dark Crusaders on the Northern tiles, from the Elementalists on the Southern ones, and from a Faction rolled on the die in between; the rulebook diagram shows which tiles are North and South.`;
const TZ_VIE2=`Magical Glade revealed on a Countryside tile: in the South, two Elementalists, one green and one brown, face up; in the North, a Graveyard and two Dark Crusaders; in between, a random Faction. Liberating the place is an action: you fight both enemies, gain an Artifact (Glade) or a Spell (Graveyard), place a Shield and gain 1 Reputation. Before liberation, the place has no effect.`;
const TZ_VIE3=`The green City isn't placed in the North, the red one not in the South. The Forgotten Valley covers the green City and houses the Elementalists' Leader; the Necropolis covers the red City and houses the Dark Crusaders' Leader. The third City is friendly.`;
const QRULE=`Quests module required (sheets 7 to 10 of the Game aid), in Normal mode by default. The City levels shown already take the quests into account: no +1.`;
const QHELP=`Helping hand: a Hero on the same space as another can, during their own turn, produce part of the non-combat values (Block, Move, Influence, Healing…) required by their ally's quest.`;
const QONCE=`A site only offers quests once for the whole team.`;
const QSC_SOLO=`Solved if the goal is reached. To compare your games: your Fame and the Achievements without titles, plus 5 points per quest completed at tier I, 10 at tier II, 15 at tier III, and 30 per unused Round.`;
const QSC_COOP=`Solved if the goal is reached. To compare your games: the Fame of the player furthest behind and the best Achievements of the two, plus 5 points per quest completed at tier I, 10 at tier II, 15 at tier III, and 30 per unused Round.`;
const SCEN=[
{id:'q-errant',n:'The Knight Errant',mode:'solo',src:'Homemade',quest:1,d:2,r:4,t:'2 h',goal:`Complete 5 quests, at least one of them tier II.`,
 pitch:`No City to take: you travel through villages and monasteries, one quest after another. The best way into the module.`,
 setup:[`Pyramid board.`,`7 Countryside tiles: keep in priority those with a Village or Monastery.`,`2 Core tiles without a City.`],
 rules:[FW_SOLO,QRULE,`Reminder: a Monastery only offers you quests if your Reputation gives you at least +1 Influence.`,HOME],
 end:`As soon as the fifth quest is completed, if one is tier II, play one last turn. Otherwise at the end of the fourth Round.`,score:QSC_SOLO},
{id:'q-heros',n:'The Hero\'s Path',mode:'solo',src:'Homemade',quest:1,d:3,r:5,t:'3 h',goal:`Complete a tier III quest, without ever choosing the rogue's path.`,
 pitch:`For a City to entrust you with its missions, you need a spotless reputation. Win the people's trust, take the City, then prove yourself worthy of it.`,
 setup:[`Pyramid board.`,`8 Countryside tiles.`,`1 Core tile with a City and 1 without.`,`The revealed City is level 4.`],
 rules:[FW_SOLO,QRULE,`Hero's path: you never choose 😈, you plunder no Village and burn no Monastery. Otherwise, the game is lost.`,`Access to tier III: your Reputation must give you at least +2 Influence. Storming the City will cost you some: be ready.`,HOME],
 end:`As soon as the tier III quest is completed, play one last turn. Otherwise at the end of the fifth Round.`,score:QSC_SOLO},
{id:'q-ombre',n:`The Shadow Brotherhood`,mode:'solo',src:'Homemade',quest:1,d:4,r:5,t:'3 h 30',long:1,goal:`End the game with a Reputation that gives you a penalty, after completing 3 ⚫ quests, one of them tier III.`,
 pitch:`Honest folk close their doors to you, but the Brotherhood always has work for a Knight without scruples. Take a City and become its shadow agent.`,
 setup:[`Pyramid board.`,`8 Countryside tiles.`,`1 Core tile with a City and 1 without.`,`The revealed City is level 5.`],
 rules:[FW_SOLO,QRULE,`Path of shadow: when a quest offers 😇 or 😈, you always choose 😈.`,`Shady contacts: as long as your Reputation gives you a penalty, on each draw, you may replace the result of one of the two rolls with ⚫.`,`Reminder: with a penalty Reputation, Monasteries are closed to you, and in a conquered City you can only accept a ⚫ quest.`,HOME],
 end:`As soon as the third ⚫ quest is completed, if one is tier III, play one last turn. Otherwise at the end of the fifth Round. Your Reputation must then give you a penalty.`,score:QSC_SOLO},
{id:'qc-compagnons',n:`Brothers in Arms`,mode:'coop',src:'Homemade',quest:1,d:2,r:4,t:'2 h 30',goal:`Complete 8 quests together, at least 3 each, 2 of them tier II.`,
 pitch:`Two Knights, one quest board. Share the villages, and lend each other a hand when a quest is too heavy for one.`,
 setup:[`Open board, starting tile side B.`,`7 Countryside tiles: keep in priority those with a Village or Monastery.`,`2 Core tiles without a City.`],
 rules:[FW_COOP,QRULE,QONCE,QHELP,HOME],
 end:`As soon as the eighth quest is completed, if the goal is met, each player plays one last turn, not the Dummy. Otherwise at the end of the fourth Round.`,score:QSC_COOP},
{id:'qc-gardiens',n:'Guardians of the Realm',mode:'coop',src:'Homemade',quest:1,d:3,r:5,t:'3 h 30',long:1,goal:`Conquer the City, then complete 2 tier III quests, one each.`,
 pitch:`The Realm is threatened on all sides. Take the City, then become the champions its people were waiting for.`,
 setup:[`Open board, starting tile side B.`,`8 Countryside tiles.`,`1 Core tile with a City and 2 without.`,`The City is level 6.`],
 rules:[FW_COOP,QRULE,QONCE,QHELP,`Guardians: each completed Race earns +1 Reputation for both Heroes.`,HOME],
 end:`As soon as the second tier III quest is completed, each player plays one last turn, not the Dummy. Otherwise at the end of the fifth Round.`,score:QSC_COOP},
{id:'qc-chronique',n:'The Great Chronicle',mode:'coop',src:'Homemade',quest:1,d:5,r:6,t:'4 h',long:1,goal:`Each Hero completes at least one quest of each tier, and the team 12 quests in total.`,
 pitch:`The module's great saga: from villages to Cities, two Knights write their legend, quest after quest.`,
 setup:[`Open board, starting tile side B.`,`8 Countryside tiles.`,`2 Core tiles with a City and 2 without.`,`The first City revealed is level 5, the second level 7.`],
 rules:[FW_COOP,QRULE,QONCE,QHELP,HOME],
 end:`As soon as the goal is met, each player plays one last turn, not the Dummy. Otherwise at the end of the sixth Round.`,score:QSC_COOP},
{id:'reco',n:'First Reconnaissance',mode:'solo',src:'Official',d:1,r:4,t:'2 h',goal:`Locate the City.`,
 pitch:`The introductory scenario, in its solo variant. Ideal for a first full game.`,
 setup:[`Pyramid board, starting tile side A.`,`8 Countryside tiles, sorted by number.`,`1 Core tile with a City and 1 without.`],
 rules:[FW_SOLO,`The rulebook also allows playing without the Dummy for a pressure-free first game.`,`+1 Fame for each tile revealed.`,`No Elite Units. You don't enter the City or conquer it.`,`Only reveal Spells and Advanced Actions when they become useful.`],
 end:`When the City tile is revealed, you play one last turn.`,score:`Your Fame plus the Achievements, without titles.`},
{id:'eclair',n:'Blitz Conquest',mode:'solo',src:'Adapted official',d:4,r:4,t:'3 h',goal:`Conquer both Cities.`,
 pitch:`Conquest in a short format: two level 3 Cities and a Hero boosted from the start.`,
 setup:[`Pyramid board.`,`6 Countryside tiles.`,`2 Core tiles with a City and 1 without.`,`Each revealed City is level 3.`],
 rules:[FW_SOLO,BLITZ,ADAPT],end:`When all Cities are conquered, you play one last turn.`,score:SC_SOLO},
{id:'mines',n:'Mines Liberation',mode:'solo',src:'Adapted official',d:3,r:4,t:'2 h 30',goal:`Reveal all tiles and liberate all Mines.`,
 pitch:`Enemies occupy the Crystal Mines. Drive them out, tunnel after tunnel.`,
 setup:[`Pyramid board.`,`8 Countryside tiles: only remove tiles without a Mine.`,`The Red City Core tile, plus 1 Core tile without a City (the one without a Mine is set aside).`,`The Red City is friendly: place a Shield token on it, nobody is its Lord.`],
 rules:[FW_SOLO,...MINES_R,ADAPT],
 end:`When everything is revealed and liberated, you play one last turn.`,score:`Your Fame, the Achievements, plus 4 points per Mine liberated on a Countryside tile and 7 on a Core tile.`},
{id:'druides',n:'Druid Nights',mode:'solo',src:'Adapted official',d:3,r:4,t:'2 h 30',goal:`Score as much Fame as possible from the night incantations.`,
 pitch:`Activate the Magical Glades by day, summon monsters at night.`,
 setup:[`Pyramid board.`,`8 Countryside tiles: only remove tiles without a Magical Glade.`,`The Green City Core tile, plus 1 Core tile without a City.`,`The Green City is friendly: place a Shield token on it, nobody is its Lord.`],
 rules:[FW_SOLO,...DRUID_R,ADAPT],
 end:`After your incantation on the second Night, you play one last turn. Otherwise the game stops at the end of that Night.`,score:`Your Fame plus the Achievements.`},
{id:'solo',n:'Solo Conquest',mode:'solo',src:'Official',d:4,r:6,t:'3½ to 4 h',long:1,goal:`Conquer both Cities.`,
 pitch:`The rulebook's big solo scenario. It takes more than three hours.`,
 setup:[`Pyramid board.`,`7 Countryside tiles.`,`2 Core tiles with a City and 2 without.`,`The first City revealed is level 5, the second level 8.`],
 rules:[FW_SOLO],end:`When all Cities are conquered, you play one last turn.`,score:SC_SOLO},
{id:'dungeon',n:'Dungeon Lords',mode:'solo',src:'Adapted official',d:4,r:5,t:'3 to 3½ h',long:1,goal:`Reveal all tiles and conquer all Dungeons and Tombs.`,
 pitch:`A network of tunnels links Dungeons and Tombs. Five Rounds: three Days, two Nights.`,
 setup:[`Pyramid board.`,`8 Countryside tiles: only remove tiles without a Dungeon.`,`The Blue City Core tile, plus 1 Core tile without a City: the Desert tile with no Monastery or Tomb.`,`The Blue City is friendly: place a Shield token on it, nobody is its Lord.`],
 rules:[FW_SOLO,`When you reveal a Village, choose an adjacent accessible space, with no site and not a Swamp: it is the secret entrance of a Dungeon. Place a brown token face down there.`,`When you reveal a Monastery, do the same with a red token: it is a secret Tomb.`,`Secret Dungeons and Tombs follow the normal rules for these sites: Night rules, no Units. If you fail, the token is discarded and replaced with a new one, face down. Once conquered, there is no more fighting there.`,`From a Dungeon or a Tomb, you can reach any other already conquered one for 2 Move points plus 1 per space of distance, going around lakes and swamps.`,ADAPT],
 end:`When everything is revealed and conquered, you play one last turn.`,score:`Your Fame and the Achievements; each Dungeon or Tomb, secret or not, counts 4 points instead of 2.`},
{id:'m-bapteme',n:'Baptism of Fire',mode:'solo',src:'Homemade',d:1,r:2,t:'1 h',goal:`Defeat 2 rampaging enemies and conquer 1 site, of any type.`,
 pitch:`One Day and one Night to string together movement, combat and a first level.`,
 setup:[`Pyramid board, starting tile side A.`,`5 Countryside tiles, no Core tile.`],
 rules:[FW_SOLO,`For a pressure-free first game, play without the Dummy, as the rulebook allows for First Reconnaissance: the Round then ends when you announce it.`,`+1 Fame for each tile revealed. No Elite Units.`,HOME],
 end:`At the end of the second Round.`,score:`Solved if the goal is reached. Note your Fame to compare yourself next time.`},
{id:'m-chasse',n:'The Great Hunt',mode:'solo',src:'Homemade',d:2,r:3,t:'1½ to 2 h',goal:`Finish with no rampaging enemy on the board, all tiles revealed.`,
 pitch:`Orc Marauders terrorise the countryside. Clean up the region.`,
 setup:[`Pyramid board.`,`7 Countryside tiles, no Core tile.`],
 rules:[FW_SOLO,`+1 Fame for each tile revealed.`,`Assaulting fortified sites is still allowed, but it costs Reputation as usual.`,HOME],
 end:`At the end of the third Round, or as soon as the goal is reached (then play one last turn).`,score:`Solved if the goal is reached. Special mention if your Reputation ends at +3 or more.`},
{id:'m-protecteur',n:'The Protector',mode:'solo',src:'Homemade',d:2,r:3,t:'2 h',goal:`Finish with a Reputation of +2 or more, 2 unwounded Units and no Wound in your Deck.`,
 pitch:`Win without getting your hands dirty: no plundering, no burning, and troops in good shape.`,
 setup:[`Pyramid board.`,`7 Countryside tiles, no Core tile.`],
 rules:[FW_SOLO,`Plundering a Village or burning a Monastery is forbidden.`,`Wounds count in hand, Deck and discard pile: think of Healing, Villages and Glades.`,HOME],
 end:`At the end of the third Round.`,score:`Solved if all three conditions are met.`},
{id:'m-erudit',n:`The Scholar`,mode:'solo',src:'Homemade',d:2,r:3,t:'2 h',goal:`Finish with at least 2 Spells, 2 Advanced Actions and 1 Artifact in your Deck.`,
 pitch:`Mage Towers, Monasteries, Dungeons: a game focused on knowledge rather than conquest.`,
 setup:[`Pyramid board.`,`7 Countryside tiles: keep in priority those with a Mage Tower, Monastery or Dungeon.`,`1 Core tile without a City.`],
 rules:[FW_SOLO,`All sources count: purchases, rewards and Level changes.`,HOME],
 end:`At the end of the third Round.`,score:`Solved if the collection is complete. For a harder challenge: require 3 Spells.`},
{id:'m-gloire',n:'Race for Fame',mode:'solo',src:'Homemade',d:3,r:3,t:'2 h',goal:`Reach the highest possible Level in three Rounds.`,
 pitch:`No goal on the board: only your progress. Replay it to beat your record.`,
 setup:[`Pyramid board.`,`7 Countryside tiles and 1 Core tile without a City.`],
 rules:[FW_SOLO,`Indicative thresholds: Level 5, bronze; Level 6, silver; Level 7, gold.`,HOME],
 end:`At the end of the third Round.`,score:`Your Level, then your Fame to break a tie between two games.`},
{id:'m-bannieres',n:'Three Banners',mode:'solo',src:'Homemade',d:3,r:4,t:'2 h 30',goal:`Conquer 3 fortified sites: Keeps or Mage Towers.`,
 pitch:`Three assaults to prepare: find Siege, Units, and absorb the loss of Reputation.`,
 setup:[`Pyramid board.`,`8 Countryside tiles: keep in priority those with a Keep or Mage Tower.`,`1 Core tile without a City.`],
 rules:[FW_SOLO,HOME],end:`As soon as the third site is conquered, play one last turn. Otherwise at the end of the fourth Round.`,score:`Solved if your Shields mark 3 fortified sites. Note the number of Rounds used.`},
{id:'m-siege',n:'The Siege',mode:'solo',src:'Homemade',d:3,r:4,t:'2½ to 3 h',goal:`Conquer the City.`,
 pitch:`A single City, and four Rounds to build the army that will bring it down. Adjustable difficulty.`,
 setup:[`Pyramid board.`,`7 Countryside tiles.`,`1 Core tile with a City and 1 without.`,`City level: 3 for an accessible game, 5 for a hard game, 8 for experts.`],
 rules:[FW_SOLO,HOME],end:`When the City is conquered, play one last turn. Otherwise at the end of the fourth Round.`,score:SC_SOLO},
{id:'m-profondeurs',n:'The Depths',mode:'solo',src:'Homemade',d:4,r:4,t:'2½ to 3 h',goal:`Conquer 3 adventure sites, at least one of them a Dungeon or a Tomb.`,
 pitch:`Underground, your Units stay outside and Night rules apply. A scenario for a self-reliant Hero.`,
 setup:[`Pyramid board.`,`8 Countryside tiles: keep in priority those with a Dungeon, Monster Den or Ruins.`,`2 Core tiles without a City.`],
 rules:[FW_SOLO,`An activated Ruins Altar counts as a conquered site.`,HOME],
 end:`As soon as the third site is conquered, play one last turn. Otherwise at the end of the fourth Round.`,score:`Solved if your Shields mark the 3 required sites.`},
{id:'m-montre',n:'Against the clock',mode:'solo',src:'Homemade',d:5,r:3,t:'2 h',goal:`Conquer a level 3 City in three Rounds.`,
 pitch:`Day, Night, Day. No time to dawdle: every turn must bring you closer to the City.`,
 setup:[`Pyramid board.`,`6 Countryside tiles.`,`1 Core tile with a City, placed last in the deck.`,`The City is level 3.`],
 rules:[FW_SOLO,BLITZ,HOME],end:`When the City is conquered, or at the end of the third Round.`,score:SC_SOLO},
{id:'m-draconiens',n:'Draconum Slayer',mode:'solo',src:'Homemade',d:5,r:4,t:'3 h',goal:`Defeat 2 rampaging Draconum.`,
 pitch:`Red enemies are the most dangerous in the game. You'll need to grow stronger before going after them.`,
 setup:[`Pyramid board.`,`7 Countryside tiles.`,`3 Core tiles without a City: keep in priority those with Draconum.`],
 rules:[FW_SOLO,`Only rampaging Draconum placed on the board count, not red enemies from a Tomb or Ruins.`,HOME],
 end:`As soon as the second Draconum is defeated, play one last turn. Otherwise at the end of the fourth Round.`,score:`Solved if both Draconum are defeated. Each earns +2 Reputation.`},
{id:'c-eclair',n:'Blitz Cooperative Conquest',mode:'coop',src:'Official',d:3,r:4,t:'3 h',goal:`Conquer both Cities together.`,
 pitch:`The rulebook's short cooperative scenario, faster and less difficult than Full Cooperation.`,
 setup:[`Open board, starting tile side B.`,`7 Countryside tiles.`,`2 Core tiles with a City and 1 without.`,`The first City revealed is level 5, the second level 8.`],
 rules:[FW_COOP,BLITZ,`You must conquer both Cities: there are as many as players. The second one revealed, level 8, is deliberately too strong for a single Hero: it is taken by cooperative assault.`,`Cooperative assault: from a space adjacent to the City, a player proposes a split of the defenders; if the other accepts, each fights their share on their turn, then skips their next turn.`],end:`When all Cities are conquered, each player plays one last turn, not the Dummy.`,score:SC_COOP},
{id:'c-totale',n:'Full Cooperation',mode:'coop',src:'Official',d:5,r:6,t:'4 h and more',long:1,goal:`Conquer all three Cities together.`,
 pitch:`The rulebook's full cooperative challenge: three Cities in six Rounds.`,
 setup:[`Open board, starting tile side B.`,`8 Countryside tiles.`,`3 Core tiles with a City and 2 without.`,`The Cities are level 5, except the last one revealed, level 8.`],
 rules:[FW_COOP],end:`When all Cities are conquered, each player plays one last turn, not the Dummy.`,score:SC_COOP},
{id:'mc-initiation',n:'Reconnaissance for two',mode:'coop',src:'Homemade',d:1,r:3,t:'2 h',goal:`Reveal the City, with each player having reached Level 3.`,
 pitch:`First Reconnaissance played hand in hand, to teach someone the game.`,
 setup:[`Pyramid board, starting tile side A.`,`8 Countryside tiles, sorted by number.`,`1 Core tile with a City and 1 without.`],
 rules:[FW_COOP,`+1 Fame to the player who reveals a tile, whatever it is: only the explorer scores the point. Alternate explorations to progress together.`,`No Elite Units. You don't enter the City or conquer it. Only reveal Spells and Advanced Actions when they become useful.`,HOME],
 end:`When the City tile is revealed, each player plays one last turn. Otherwise at the end of the third Round.`,score:`Solved if the City is revealed and both Heroes are at least Level 3.`},
{id:'mc-mines',n:'The Mines, together',mode:'coop',src:'Homemade',d:3,r:4,t:'3 h',goal:`Reveal all tiles and liberate all Mines together.`,
 pitch:`Mines Liberation in a cooperative version: you split the board between you.`,
 setup:[`Pyramid board.`,`8 Countryside tiles: only remove tiles without a Mine.`,`The Red City Core tile, plus 1 Core tile without a City.`,`The Red City is friendly: each player places a Shield token on it.`],
 rules:[FW_COOP,...MINES_R,HOME],
 end:`When everything is revealed and liberated, each player plays one last turn. Otherwise at the end of the fourth Round.`,score:`Solved if all Mines are liberated. For a score: the Fame of the player furthest behind, plus 4 points per Countryside-tile Mine and 7 per Core-tile Mine.`},
{id:'mc-cite',n:'Two blades, one City',mode:'coop',src:'Homemade',d:3,r:4,t:'3 h',goal:`Conquer the City, with each player having placed at least one Shield on it.`,
 pitch:`A level 8 City: too much for a single Hero in four Rounds. Prepare a cooperative assault.`,
 setup:[`Pyramid board.`,`7 Countryside tiles.`,`1 Core tile with a City and 1 without.`,`The City is level 8. For a gentler game: level 5.`],
 rules:[FW_COOP,BLITZ,`Cooperative assault reminder: from an adjacent space, a player proposes a split of the defenders; if the other accepts, each fights their share on their turn, then skips their next turn.`,HOME],
 end:`When the City is conquered, each player plays one last turn. Otherwise at the end of the fourth Round.`,score:SC_COOP},
{id:'mc-druides',n:'The Druids\' Circle',mode:'coop',src:'Homemade',d:4,r:4,t:'3 h',goal:`Defeat together at least 3 red enemies summoned during the second Night.`,
 pitch:`Druid Nights as a team: the first Night is a warm-up, the second decides everything.`,
 setup:[`Pyramid board.`,`8 Countryside tiles: only remove tiles without a Magical Glade.`,`The Green City Core tile, plus 1 Core tile without a City.`,`The Green City is friendly: each player places a Shield token on it.`],
 rules:[FW_COOP,...DRUID_R,`Each player activates their own Glades and performs their own incantation.`,HOME],
 end:`When both players have performed their second-Night incantation, each plays one last turn. Otherwise at the end of that Night.`,score:`Solved if 3 summoned red enemies were defeated between you.`},
{id:'v-eclair',n:'Volkare\'s Return, Blitz',mode:'solo',src:'Official',ext:'Lost Legion',d:4,r:4,t:'3 h',volk:{kind:'retour',city:[[3,4],[4,6],[5,8]],lvl:[[4,8],[6,12],[8,16]],wounds:[16,13,10]},goal:`Conquer the City, then destroy Volkare's whole army there.`,
 pitch:`A race against General Volkare: he explores, finds the City and marches on it. Short version, in four Rounds.`,
 setup:[VK_MAP,`5 Countryside tiles, in addition to Volkare's Camp.`,`1 Core tile without a City, and 1 Core tile with a City at the very bottom of the deck.`,VK_LV],
 rules:[VK_BASE,BLITZ,VK_DECK,VK_TAC,VK_RET,VK_CITY,VK_FIGHT,VK_END],end:VK_RWIN,score:VK_RSC},
{id:'vc-eclair',n:'Volkare\'s Return, Blitz',mode:'coop',src:'Official',ext:'Lost Legion',d:4,r:4,t:'3 h 30',volk:{kind:'retour',city:[[3,4],[4,6],[5,8]],lvl:[[4,8],[6,12],[8,16]],wounds:[16,13,10]},goal:`Conquer the City, then destroy Volkare's whole army there together.`,
 pitch:`The same race for two: conquer the City, then organise its cooperative defence.`,
 setup:[VK_MAP,`6 Countryside tiles, in addition to Volkare's Camp.`,`1 Core tile without a City, and 1 Core tile with a City at the very bottom of the deck.`,VK_LV],
 rules:[VK_BASE,BLITZ,VK_DECK,VK_TAC,VK_RET,VK_CITY,VK_FIGHT,VK_COOP,VK_END],end:VK_RWIN,score:VK_RSC},
{id:'v-epique',n:'Volkare\'s Return, Epic',mode:'solo',src:'Official',ext:'Lost Legion',d:5,r:6,t:'4 h and more',long:1,volk:{kind:'retour',city:[[4,6],[6,9],[10,14]],lvl:[[5,10],[8,16],[12,24]],wounds:[18,15,12]},goal:`Conquer the City, then destroy Volkare's whole army there.`,
 pitch:`The full version, in six Rounds, against a much larger army.`,
 setup:[VK_MAP,`7 Countryside tiles, in addition to Volkare's Camp.`,`1 Core tile without a City, and 1 Core tile with a City at the very bottom of the deck.`,VK_LV],
 rules:[VK_BASE,VK_DECK,VK_TAC,VK_RET,VK_CITY,VK_FIGHT,VK_END],end:VK_RWIN,score:VK_RSC},
{id:'vc-epique',n:'Volkare\'s Return, Epic',mode:'coop',src:'Official',ext:'Lost Legion',d:5,r:6,t:'5 h and more',long:1,volk:{kind:'retour',city:[[4,6],[6,9],[10,14]],lvl:[[5,10],[8,16],[12,24]],wounds:[18,15,12]},goal:`Conquer the City, then destroy Volkare's whole army there together.`,
 pitch:`The great battle for two, over six Rounds.`,
 setup:[VK_MAP,`8 Countryside tiles, in addition to Volkare's Camp.`,`2 Core tiles without a City, and 1 Core tile with a City at the very bottom of the deck.`,VK_LV],
 rules:[VK_BASE,VK_DECK,VK_TAC,VK_RET,VK_CITY,VK_FIGHT,VK_COOP,VK_END],end:VK_RWIN,score:VK_RSC},
{id:'v-quete',n:'Volkare\'s Quest',mode:'solo',src:'Official',ext:'Lost Legion',d:5,r:6,t:'4 h and more',long:1,volk:{kind:'quete',city:[[3,4],[4,4],[4,5]],lvl:[[8,14],[10,18],[14,26]],wounds:[20,16,12]},goal:`Destroy Volkare's whole army before he reaches the Portal.`,
 pitch:`Volkare marches straight for your Portal. Avoid him, grow stronger, then come back to stop him.`,
 setup:[VK_QMAP,`8 Countryside tiles.`,`2 Core tiles with a City and 4 without, in addition to Volkare's Camp.`,VK_LV],
 rules:[VK_BASE,VK_DECK,VK_TAC,VK_QUE,VK_QSLOW,VK_FIGHT,VK_END],end:VK_QWIN,score:VK_QSC},
{id:'vc-quete',n:'Volkare\'s Quest',mode:'coop',src:'Official',ext:'Lost Legion',d:5,r:6,t:'5 h and more',long:1,volk:{kind:'quete',city:[[3,4],[4,4],[4,5]],lvl:[[8,14],[10,18],[14,26]],wounds:[20,16,12]},goal:`Destroy Volkare's whole army together before he reaches the Portal.`,
 pitch:`With two, you need to be next to Volkare at the right moment to attack him together.`,
 setup:[VK_QMAP,`9 Countryside tiles.`,`2 Core tiles with a City and 3 without, in addition to Volkare's Camp.`,VK_LV],
 rules:[VK_BASE,VK_DECK,VK_TAC,VK_QUE,VK_QSLOW,VK_FIGHT,VK_COOP,VK_END],end:VK_QWIN,score:VK_QSC},
{id:'v-camp',n:'Blitz Conquest, with Volkare\'s Camp',mode:'solo',src:'Adapted official',ext:'Lost Legion',d:4,r:4,t:'3 h',goal:`Conquer the City and Volkare's Camp.`,
 pitch:`The expansions rulebook variant: one of the two Cities is replaced by Volkare's Camp. The Dummy player stays in play.`,
 setup:[`Pyramid board.`,`6 Countryside tiles.`,`1 Core tile with a City, Volkare's Camp and 1 Core tile without a City, shuffled together.`,`The City and Volkare are level 3. For Volkare, the minimum level of his base is 4: 1 grey, 1 red, 2 green tokens.`],
 rules:[FW_SOLO,BLITZ,`Entering the Camp costs 2 Move points. Across a Wall: 1 more point, and the troops you face are Fortified.`,`Assaulting the Camp costs no Reputation. Volkare never moves; his tokens stay hidden until a player arrives on an adjacent space, by Day or Night.`,VK_FIGHT,`Place a Shield on the Volkare token per red or white enemy defeated, and one per pair of grey or green enemies. If troops survive, you fall back and can come back, as for a City.`,`Camp conquered: from the Camp or an adjacent space, you recruit Village and Keep Units, with +1 Influence per Shield placed, and the Camp counts as a Keep for your Hand Limit.`,ADAPT],
 end:`When the City and the Camp are conquered, you play one last turn.`,score:SC_SOLO+` The conquered Camp counts as a City.`},
{id:'tz-relique',n:'The Lost Relic',mode:'solo',src:'Official',ext:'Shades of Tezla',d:3,r:2,t:'2 h',goal:`Find the relic fragments in the two destroyed Cities.`,
 pitch:`Only two Rounds, but your Hero starts at Level 3. A Draconum guards each fragment.`,
 setup:[`Open board limited to 3 columns.`,`6 Countryside tiles.`,`2 Core tiles with a City and 1 without.`,TZ_HIGH],
 rules:[TZ_SOLO,TZ_REL,TZ_REL2],end:`When all fragments are recovered, you play one last turn.`,score:TZ_SC+` Mission: 5 points per fragment, 10 more if you have them all.`+TZ_SC2},
{id:'tzc-relique',n:'The Lost Relic',mode:'coop',noRm:1,src:'Official',ext:'Shades of Tezla',d:3,r:2,t:'2 h 30',goal:`Find the relic fragments together in the three destroyed Cities.`,
 pitch:`The same hunt for two, with three ruined Cities to search in one Day and one Night.`,
 setup:[`Open board limited to 4 columns.`,`7 Countryside tiles.`,`3 Core tiles with a City and 2 without.`,TZ_HIGH],
 rules:[TZ_COOP,TZ_REL,TZ_REL2],end:`When all fragments are recovered, each player plays one last turn, not the Dummy.`,score:TZ_SCC+` Mission: 5 points per fragment, 5 more if each player found one, 10 more if you have them all.`+TZ_SC2},
{id:'tz-vallee',n:'The Forgotten Valley',mode:'solo',src:'Official',ext:'Shades of Tezla',d:4,r:4,t:'3 h',goal:`Find the Forgotten Valley and defeat the High Priestess.`,
 pitch:`A valley hidden by magic: exploring costs three times as much, and the Elementalists lay ambushes.`,
 setup:[`Pyramid board.`,`5 Countryside tiles.`,`2 Core tiles with a City, the white and the green, and 1 without a City.`,`The green City is friendly: you and the Dummy place a Shield there, with no Lord.`,`The High Priestess is the Elementalists' Faction Leader, at level 4.`],
 rules:[TZ_SOLO,BLITZ,TZ_VAL,TZ_VAL2,TZ_CHEF],end:`When the High Priestess is defeated, you play one last turn.`,score:TZ_SC+` Mission: 20 points if the High Priestess is defeated, 30 per unused Round.`+TZ_SC2},
{id:'tzc-vallee',n:'The Forgotten Valley',mode:'coop',noRm:1,src:'Official',ext:'Shades of Tezla',d:4,r:4,t:'3 h 30',long:1,goal:`Find the Forgotten Valley and defeat the High Priestess together.`,
 pitch:`Two against a level 6 High Priestess: plan a cooperative assault.`,
 setup:[`Open board.`,`6 Countryside tiles.`,`2 Core tiles with a City, the white and the green, and 2 without a City.`,`The green City is friendly: each player places a Shield there, with no Lord.`,`The High Priestess is the Elementalists' Faction Leader, at level 6.`],
 rules:[TZ_COOP,BLITZ,TZ_VAL,TZ_VAL2,TZ_CHEF],end:`When the High Priestess is defeated, each player plays one last turn, not the Dummy.`,score:TZ_SCC+` Mission: 20 points if the High Priestess is defeated, 20 if each player has a Shield on her token, 30 per unused Round.`+TZ_SC2},
{id:'tz-morts',n:'The Realm of the Dead',mode:'solo',src:'Official',ext:'Shades of Tezla',d:4,r:4,t:'3 h',goal:`Seal all the Graveyards and defeat the Necromancer.`,
 pitch:`The undead pursue you across the countryside. Liberate the Graveyards one by one, then march on the Necropolis.`,
 setup:[`Pyramid board.`,`5 Countryside tiles, exactly 2 of them with a Magical Glade.`,`2 Core tiles with a City, the blue and the green, and 1 without a City.`,`The green City is friendly: you and the Dummy place a Shield there, with no Lord.`,`The Necromancer is the Dark Crusaders' Faction Leader, at level 4.`],
 rules:[TZ_SOLO,BLITZ,TZ_MOR,TZ_MOR2,TZ_MOR3,TZ_CHEF],end:`When all Graveyards are sealed and the Necromancer defeated, you play one last turn.`,score:TZ_SC+` Mission: 5 points per sealed Graveyard, 10 for the Necromancer, 10 more if everything is done, 30 per unused Round.`+TZ_SC2},
{id:'tzc-morts',n:'The Realm of the Dead',mode:'coop',noRm:1,src:'Official',ext:'Shades of Tezla',d:4,r:4,t:'3 h 30',long:1,goal:`Seal all the Graveyards and defeat the Necromancer together.`,
 pitch:`Three Graveyards to purify for two, and a level 6 Necromancer.`,
 setup:[`Open board.`,`6 Countryside tiles, exactly 3 of them with a Magical Glade.`,`2 Core tiles with a City, the blue and the green, and 2 without a City.`,`The green City is friendly: each player places a Shield there, with no Lord.`,`The Necromancer is the Dark Crusaders' Faction Leader, at level 6.`],
 rules:[TZ_COOP,BLITZ,TZ_MOR,TZ_MOR2,TZ_MOR3,TZ_CHEF],end:`When all Graveyards are sealed and the Necromancer defeated, each player plays one last turn, not the Dummy.`,score:TZ_SCC+` Mission: 5 points per sealed Graveyard, 10 for the Necromancer, 10 more if everything is done, 20 if each player has a Shield on his token, 30 per unused Round.`+TZ_SC2},
{id:'tz-vie',n:'For life and death',mode:'solo',src:'Official',ext:'Shades of Tezla',d:5,r:6,t:'4 h and more',long:1,goal:`Defeat the two Avatars of Tezla: the Leaders of both Factions.`,
 pitch:`The expansion's big scenario: the North for the Dark Crusaders, the South for the Elementalists, and you in the middle.`,
 setup:[`Pyramid board.`,`6 Countryside tiles, exactly 3 of them with a Magical Glade.`,`3 Core tiles with a City: the green, the red and another at random, friendly; 2 without a City.`,`Both Faction Leaders start at level 6.`],
 rules:[TZ_SOLO,TZ_VIE,TZ_VIE2,TZ_VIE3,TZ_CHEF],end:`When both Factions are defeated, you play one last turn.`,score:TZ_SC+` Mission: 10 points per Avatar defeated, 15 more for both, 30 per unused Round.`+TZ_SC2},
{id:'tzc-vie',n:'For life and death',mode:'coop',noRm:1,src:'Official',ext:'Shades of Tezla',d:5,r:6,t:'5 h and more',long:1,goal:`Defeat the two Avatars of Tezla together.`,
 pitch:`Six Rounds for two against both Factions and their Leaders.`,
 setup:[`Open board.`,`7 Countryside tiles, exactly 3 of them with a Magical Glade.`,`3 Core tiles with a City: the green, the red and another at random, friendly; 2 without a City.`,`Both Faction Leaders start at level 6.`],
 rules:[TZ_COOP,TZ_VIE,TZ_VIE2,TZ_VIE3,TZ_CHEF],end:`When both Factions are defeated, each player plays one last turn, not the Dummy.`,score:TZ_SCC+` Mission: 10 points per Avatar defeated, 15 more for both, 10 if each player has a Shield on at least one Leader, 10 more on both, 30 per unused Round.`+TZ_SC2}
];

let S,HIST=[];
const F={mode:'all',src:'all',box:'all',short:true};
let QM=(()=>{try{return localStorage.getItem('mk-quetes-mode')||'off'}catch(e){return 'off'}})();
const QML={off:'Without quests',normal:'Normal',merc:'Mercenary',hero:'Heroic'};
function questLine(sc){if(sc.quest)return `<li class="qline">📜 Quests module scenario: ${QM==='off'?'the module is required here, in Normal mode by default':'mode '+QML[QM]}. No +1 to Cities.</li>`;
  if(QM==='off')return '';const city=/niveau \d/.test(sc.setup.join(' ')+' '+sc.rules.join(' '));
  if(QM==='normal')return city?`<li class="qline">📜 Quests module, Normal mode: <b>+1 level to each City</b> compared to the levels shown here.</li>`:`<li class="qline">📜 Quests module, Normal mode: no City level to adjust in this scenario.</li>`;
  return `<li class="qline">📜 Quests module, mode ${QML[QM]} : City levels don't change.</li>`}
function blank(){return{varmy:{w:0,g:0,r:0,v:0},vloss:0,vskip:false,chefs:{elem:chefNew(),sc:chefNew()},vc:1,vp:0,vcity:false,vmsg:'',view:'game',mode:'solo',scen:null,phase:'setup',rounds:6,round:1,dummyCrys:['g','g','b'],counts:{r:4,g:4,b:4,w:4},
  deck:[],discard:[],crystals:{r:0,g:0,b:0,w:0},removed:{day:[],night:[]},tac:{me:null,p2:null,dummy:null},
  flip:[],turn:0,mustAnnounce:false,endBy:null,dummyLastDone:false,prep:{aa:null,spell:null,rm:null},log:[]}}
const isDay=()=>S.round%2===1;
const tset=()=>isDay()?'day':'night';
const coop=()=>S.mode==='coop';
const scen=()=>SCEN.find(x=>x.id===S.scen);
/* ---------- Volkare (extension La Légion Oubliée) ---------- */
const ARMY={4:[0,1,1,2],5:[1,0,1,2],6:[1,0,1,3],7:[1,0,2,2],8:[1,1,2,2],9:[1,1,2,3],10:[1,1,2,5],11:[2,0,2,5],12:[2,0,2,6],13:[2,0,2,7],14:[2,0,3,6],15:[2,1,3,6]};
const DIE=['r','g','b','w','gold','black'],DN={r:'red',g:'green',b:'blue',w:'white',gold:'gold',black:'black'};
const volk=()=>{const s=scen();return s&&s.volk?s.volk:null};
const FOE=()=>volk()?'Volkare':'Dummy player';
const vkI=()=>coop()?1:0;
const vkW=()=>volk().wounds[S.vp];
const vkLvl=()=>volk().lvl[S.vc][vkI()];
function armyTxt(l){let m=1;if(!ARMY[l]){m=2;l=l/2}const a=ARMY[l];if(!a)return `to build from the rulebook`;const n=['white','grey','red','green'];
  return a.map((x,i)=>x?`${x*m} ${n[i]}${x*m>1&&i!==1?'s':''}`:'').filter(Boolean).join(', ')+(m>1?` (figure base set to ${l}, doubled tokens)`:'')}
function vkRed(sp){return `Volkare doesn't move: he attacks a Hero on an adjacent space${sp?`, or failing that 2 spaces away`:``}. If there are several, he targets the one furthest ahead on the Fame track. Nobody in range: nothing happens.`}
function vkMove(k,n,v){const t=n>1?`twice in a row`:`one space`;
  if(v.kind==='quete')return `Move Volkare ${t} in the direction ${FEM[k]} on the scenario card. He crosses unexplored tiles without revealing them. Adjacent to the Portal, he enters it whatever the colour. If he is already on the Portal and must advance, his quest is accomplished: the game is lost. If he enters a Hero's space, he attacks them.`;
  if(S.vcity)return `Race for the City: move Volkare ${t} towards the City, by the shortest path and without revealing tiles. Between two possible spaces, take the one whose direction is closest to the direction ${FEM[k==='r'?'b':k]} on the scenario card. If he is adjacent to the City and must advance, he assaults it.`;
  return `Move Volkare ${t} in the direction ${FEM[k]} on the scenario card, regardless of terrain. If he reaches an unexplored area, reveal a tile and place him on it. If he enters a Hero's space, he attacks them.`}
function volkTurn(){if(S.vskip)return act(()=>{S.turn++;S.vskip=false;S.vloss=0;S.flip=[];S.vmsg='<b>Volkare is slowed.</b> He skips this turn: flip his Turn Order token face up.';log(`Turn ${S.turn} : Volkare, slowed, skips his turn.`)});act(()=>{S.turn++;S.vloss=0;const v=volk();
  if(!S.deck.length){S.flip=[{c:'b',x:false}];S.vmsg=`<b>Frenzy.</b> His Deck is exhausted: Volkare acts as if revealing a blue Spell, without rerolling a die. `+vkMove('b',2,v);log(`Turn ${S.turn} : Volkare's Deck exhausted, frenzy.`);return}
  const c=S.deck.shift();S.discard.push(c);
  if(c==='x'){const d=DIE[rnd(6)];S.flip=[];
    S.vmsg=`<b>Wound: Volkare rests.</b> His die shows <b>${DN[d]}</b>. `+(KEYS.includes(d)?`If a Unit in the Offer occupies the slot marked with a Crystal ${DN[d]}, remove it from the game${v.kind==='quete'?``:` and add a grey Enemy token to Volkare's army`}. This slot stays empty until the next Round.`:`No slot carries this colour: nothing happens.`);
    log(`Turn ${S.turn} : Volkare reveals a Wound and rests (die ${DN[d]}). Left ${S.deck.length}.`);return}
  const sp=c!==c.toLowerCase(),k=c.toLowerCase();S.flip=[{c:k,x:false}];
  S.vmsg=`<b>${sp?'Spell '+COL[k]:'Action '+FEM[k]}.</b> Reroll a ${COL[k]} die from the Source if there is one${isDay()?` ; failing that, by Day, a gold die`:``}. `+(k==='r'&&!(v.kind==='retour'&&S.vcity)?vkRed(sp):vkMove(k,sp?2:1,v));
  log(`Turn ${S.turn} : Volkare reveals ${sp?'a Spell '+COL[k]:'an Action '+FEM[k]}. Left ${S.deck.length}.`)})}
function volkDie(){act(()=>{const d=DIE[rnd(6)];S.vmsg=`<b>Volkare's attack die: ${DN[d]}.</b> Read on his token the attack placed next to this symbol. It is always Brutal and Assassination: its Damage can't be assigned to your Units.`;log(`Volkare's attack die: ${DN[d]}.`)})}
function volkPanel(){const v=volk(),n=Math.ceil(S.round/2)+1;return `${S.vmsg?`<div class="banner">${S.vmsg}</div>`:''}${S.flip.length?cardsHtml(S.flip):''}
  ${v.kind==='retour'?`<button data-vcity="1" class="${S.vcity?'on':''}">${S.vcity?'City revealed: Volkare races towards it':'Mark the City as revealed'}</button>`:''}
  <p class="muted"><small>If Volkare attacks you: face his whole army, or retreat by taking ${n} Wounds in hand. If he ends his turn on your space, withdraw to an adjacent safe space.</small></p>`}
function volkSetup(){const sc=scen(),v=sc.volk,i=vkI(),q=v.kind==='quete';
  const pick=(a,l,cur)=>`<div class="row">${l.map((x,k)=>`<button data-${a}="${k}" class="${cur===k?'on':''}">${x}</button>`).join('')}</div>`;
  return `<section class="panel"><h2>Volkare setup</h2><div class="banner"><b>${sc.n}</b> · ${coop()?'two-player co-op':'solo'} · ${sc.r} Rounds</div>
   <div class="sub">Combat Level</div>${pick('vc',['Bold','Heroic','Legendary'],S.vc)}
   <p>${q?'Cities':'City'} level <b>${v.city[S.vc][i]}</b>. Volkare level <b>${vkLvl()}</b>: ${armyTxt(vkLvl())}.</p>
   <div class="sub">Pursuit Level</div>${pick('vp',['Fair','Tense','Thrilling'],S.vp)}
   <p><b>${vkW()}</b> Wounds in his Deck. <b>${S.vp+1+i}</b> ${q?'Frightened Units':'Wavering Units'} : mark that many slots in the Units Offer with Crystals of different colours.</p>
   <div class="sub">His Deck: the 16 Basic Action cards of a Hero who isn't playing</div>
   <div class="gems">${KEYS.map(k=>`<div class="gem"><span class="ico c-${k}"></span><b>${S.counts[k]}</b><div class="row"><button data-cnt="${k}:-1" aria-label="minus">−</button><button data-cnt="${k}:1" aria-label="plus">+</button></div></div>`).join('')}</div>
   <p class="muted"><small>By default 4 of each colour: check on the Hero's cards. The companion adds the 4 interactive Spells, one per colour, and the Wounds, then shuffles: ${KEYS.reduce((a,k)=>a+S.counts[k],0)+4+vkW()} cards.</small></p>
   <button class="primary big" data-go="start">Start the game</button></section>`}

function save(){try{localStorage.setItem(SAVE,JSON.stringify(S))}catch(e){}}
function load(){try{const v=JSON.parse(localStorage.getItem(SAVE)||'null');if(v&&v.phase){const b=blank();const o=Object.assign(b,v);o.tac=Object.assign({me:null,p2:null,dummy:null},v.tac);o.prep=Object.assign({aa:null,spell:null,rm:null},v.prep);o.chefs=Object.assign({elem:chefNew(),sc:chefNew()},v.chefs);o.varmy=Object.assign({w:0,g:0,r:0,v:0},v.varmy);return o}}catch(e){}return null}
function act(fn){HIST.push(JSON.stringify(S));if(HIST.length>60)HIST.shift();fn();save();render()}
function undo(){if(!HIST.length)return;const v=S.view;S=JSON.parse(HIST.pop());S.view=v;save();render()}
function log(m){S.log.unshift(m);S.log.length=Math.min(S.log.length,40)}

function startGame(){act(()=>{
  const deck=[];KEYS.forEach(k=>{for(let i=0;i<S.counts[k];i++)deck.push(k)});
  S.chefs={elem:chefNew(),sc:chefNew()};S.vloss=0;S.vskip=false;S.varmy=(volk()&&armyCounts(vkLvl()))||{w:0,g:0,r:0,v:0};if(volk()){deck.push('R','G','B','W');for(let i=0;i<vkW();i++)deck.push('x')}S.vcity=false;S.vmsg='';S.turn=0;S.flip=[];
  S.deck=shuffle(deck);S.discard=[];S.crystals={r:0,g:0,b:0,w:0};S.dummyCrys.forEach(c=>S.crystals[c]++);
  S.round=1;S.phase='tactic';S.removed={day:[],night:[]};S.tac={me:null,p2:null,dummy:null};S.log=[];S.gid=String(Date.now());
  log(`Game started${scen()?': '+scen().n:''}. ${S.rounds} Rounds, ${coop()?'two-player co-op':'solo'}, Deck ${volk()?'of Volkare':'of the Dummy'} from ${S.deck.length} cards.`)})}
function orderText(){const a=[['You',S.tac.me]];if(coop()){a[0][0]='Player 1';a.push(['Player 2',S.tac.p2])}a.push([FOE(),S.tac.dummy]);
  return a.sort((x,y)=>x[1]-y[1]).map(x=>`${x[0]} (${x[1]})`).join(', then ')}
function beginPlay(){log(`Tactics. Turn order: ${orderText()}.`);S.phase='play';S.turn=0;S.mustAnnounce=false;S.endBy=null;S.dummyLastDone=false;S.flip=[]}
function pickTac(n){act(()=>{const left=[1,2,3,4,5,6].filter(x=>x!==n&&!S.removed[tset()].includes(x));S.tac.me=n;S.tac.dummy=left[rnd(left.length)];beginPlay()})}
function drawDummyTac(){act(()=>{const left=[1,2,3,4,5,6].filter(x=>!S.removed[tset()].includes(x));S.tac.dummy=left[rnd(left.length)];S.tac.me=S.tac.p2=null})}

function dummyTurn(){if(volk())return volkTurn();act(()=>{
  S.turn++;
  if(S.endBy==='me'){S.dummyLastDone=true;
    if(!S.deck.length){S.flip=[];log(`Turn ${S.turn} : the Dummy's last turn, its Deck is empty. The Round ends.`);return}}
  if(!S.deck.length||S.mustAnnounce){S.flip=[];S.endBy='dummy';log(`Turn ${S.turn} : the Dummy announces the end of the Round. ${coop()?'Each player plays':'Play'} one last turn.`);return}
  const f=[];for(let i=0;i<3&&S.deck.length;i++)f.push({c:S.deck.shift(),x:false});
  let short=f.length<3,extra=0;
  if(!short){const last=f[2].c;extra=S.crystals[last];
    for(let i=0;i<extra;i++){if(!S.deck.length){short=true;break}f.push({c:S.deck.shift(),x:true})}}
  S.discard.push(...f.map(o=>o.c));S.flip=f;
  if(short)S.mustAnnounce=true;
  const last=f[Math.min(2,f.length-1)].c,got=f.length-3;
  let m=`Turn ${S.turn} : ${f.length} card${f.length>1?'s':''} discarded${f.length>1?'s':''}`;
  if(f.length>=3)m+=`, the 3rd is ${FEM[last]}`;
  m+=extra?` ; the Dummy has ${extra} ${extra>1?'Crystals':'Crystal'} ${COL[last]}${extra>1?'s':''}, so ${extra} card${extra>1?'s':''} extra${got<extra?(got===0?' (there were none left)':got===1?' (there was only one left)':' (there were only '+got+')'):''}`:'';
  m+=`. Left ${S.deck.length}.`;
  if(short)m+=' It will announce the end of the Round on its next turn.';
  if(S.endBy==='me')m+=' That was its last turn: the Round ends.';
  log(m)})}
function iAnnounce(){if(volk())return act(()=>{S.endBy='me';S.dummyLastDone=true;log(`End of the Round announced. Volkare doesn't play a last turn${coop()?` ; the other player, if`:``}.`)});act(()=>{S.endBy='me';log(`${coop()?'A player announces':'You announce'} the end of the Round. ${coop()?'The other player and the Dummy play':'The Dummy plays'} one last turn.`)})}
function endRound(){act(()=>{
  if(S.round>=S.rounds){S.phase='over';log(`End of ${S.round}Round: the game is over.`);autoCarnet();return}
  if(volk()){if(!coop())S.removed[tset()].push(S.tac.me)}else if(!coop())S.removed[tset()].push(S.tac.me,S.tac.dummy);
  S.round++;S.phase='prep';S.prep={aa:null,spell:null,rm:null};S.flip=[];
  log(`End of Round.${coop()?'':volk()?` Your Tactic ${S.tac.me} is removed from the game.`:` Tactics ${S.tac.me} and ${S.tac.dummy} removed.`} Prepare the Round ${S.round}.`)})}
const needRm=()=>coop()&&!volk()&&!(scen()&&scen().noRm)&&S.round+1<=S.rounds; // une Manche du même type reste à jouer après celle qui vient de finir
function prepDone(){if(volk())return act(()=>{S.phase='tactic';S.tac={me:null,p2:null,dummy:null};log(`Round ${S.round} (${isDay()?'Day':'Night'}). Volkare's Deck isn't reshuffled: ${S.deck.length} cards left.`)});act(()=>{
  const {aa,spell,rm}=S.prep;
  if(aa)S.discard.push(aa);if(spell)S.crystals[spell]++;
  if(rm)S.removed[isDay()?'night':'day'].push(rm);
  S.deck=shuffle(S.deck.concat(S.discard));S.discard=[];
  S.phase='tactic';S.tac={me:null,p2:null,dummy:null};
  log(`Round ${S.round} (${isDay()?'Day':'Night'}) : ${aa?'Advanced Action '+FEM[aa]+' added, ':''}${spell?'Crystal '+COL[spell]+' gained, ':''}${rm?'Tactic '+rm+' removed, ':''}Deck reshuffled (${S.deck.length} cards).`)})}
function useScen(id){const sc=SCEN.find(x=>x.id===id);const keep={dummyCrys:S.dummyCrys,counts:S.counts};HIST=[];S=Object.assign(blank(),keep,{scen:id,mode:sc.mode,rounds:sc.r,view:'game'});save();render();window.scrollTo(0,0)}

/* ---------- Rendu ---------- */
const ico=c=>`<span class="ico c-${c}"></span>`;
const pips=d=>`<span class="pips" title="Difficulty ${d} of 5">${[1,2,3,4,5].map(i=>`<i class="${i<=d?'on':''}"></i>`).join('')}</span>`;
function cardsHtml(f){return `<div class="cards">${f.map((o,i)=>`<div class="card c-${o.c} ${i===2?'last':''} ${o.x?'extra':''}" title="${COL[o.c]}${i===2?', colour tested':''}${o.x?', extra card':''}">${i===2?'3e':o.x?'+':''}</div>`).join('')}</div>`}
function gemsHtml(){return `<div class="gems">${KEYS.map(k=>`<div class="gem"><span class="ico c-${k}"></span><b>${S.crystals[k]}</b><div class="row"><button data-cr="${k}:-1" aria-label="Remove a crystal ${COL[k]}">−</button><button data-cr="${k}:1" aria-label="Add a crystal ${COL[k]}">+</button></div></div>`).join('')}</div>`}
function stateHtml(){if(volk())return volkState();return `<section class="panel"><div class="stats">
   <div><span class="sub">Deck</span><b>${S.deck.length}</b></div><div><span class="sub">Discard</span><b>${S.discard.length}</b></div><div><span class="sub">Turns</span><b>${S.turn}</b></div></div>
   <div class="sub">Dummy's Crystals</div>${gemsHtml()}</section>`}
function scenBody(sc){return `<p><b>Objectif.</b> ${sc.goal}</p><div class="sub">Setup</div><ul>${sc.setup.map(x=>`<li>${x}</li>`).join('')}${questLine(sc)}</ul>${howTo(sc)}
  <div class="sub">Scenario rules</div><ul>${sc.rules.map(x=>`<li>${x}</li>`).join('')}</ul><p><b>Fin.</b> ${sc.end}</p><p><b>Score.</b> ${sc.score}</p>`}
function howTo(sc){if(sc.volk)return '';
  const all=sc.setup.join(' ')+' '+sc.rules.join(' '),two=sc.mode==='coop',n=two?2:1;
  const plus=(sc.rules.includes(BLITZ)||/dé de plus dans la Source/.test(all))?1:0;
  const ouvert=/Plateau ouvert/.test(all),lim=(all.match(/limité à (\d) colonnes/)||[])[1];
  const hasCity=/avec Cité/.test(all)&&!/détruites/.test(all);
  const byNum=/rangées par numéro/.test(all);
  const li=[];
  li.push(ouvert?`<b>Open board${lim?', limited to '+lim+' columns':''}</b>: starting tile side B, with the first 3 tiles of the deck placed against it. Never more than ${lim||5} columns of tiles side by side.`
     :`<b>Pyramid board</b>: starting tile side A, with the first 2 tiles of the deck placed against it. A Core tile is never placed on the coastline, the leftmost and rightmost columns.`);
  li.push(`<b>Tile deck</b>: ${byNum?'Countryside tiles (green back) sorted by number, lowest on top':'draw at random the required Countryside tiles (green back)'}. For Core tiles (brown back), separate those with and without a City icon, draw the required number of each, shuffle them and place the Countryside tiles on top: the Countryside is always explored first. Extra tiles go back in the box unseen. Every tile is placed in the same orientation as the starting tile.`);
  if(hasCity)li.push(`<b>Cities</b>: when a City tile is revealed, place the figure of its colour on the space and its card next to the board. The card's table shows, for the level set by the scenario, which defenders to draw: place them face down on the card. A friendly City has no defenders.`);
  li.push(`<b>Source</b>: ${n+2+plus} Mana dice, the Dummy doesn't count. Roll them; if more than half show black or gold, reroll those.`);
  li.push(`<b>Offers</b>: ${n+2+plus} Regular Units, silver back (Elites only arrive once a Core tile is revealed); 3 Advanced Actions; 3 Spells. Artifacts and Skills stay in their decks.`);
  li.push(`<b>${two?'Each Hero':'Your Hero'}</b>: their card, figure, 16 shuffled Basic Action cards, the Level 1 token (Armor 2, hand 5, 1 Command), their Skills face down. Fame ${plus?1:0}, Reputation ${plus?'2 (+1 bonus in Interaction)':'0'}. Draw 5 cards.`);
  li.push(`<b>Dummy player</b>: an unchosen Hero, drawn at random. Only its card and its 16 Basic Action cards are used. It receives 3 Crystals, matching the colours of the dots at the bottom of its card: set them in the Game tab.`);
  li.push(`<b>First Round</b>: Day. Tactics, then each Hero enters the Portal at the start of their first turn.`);
  return `<details class="howto"><summary>Step-by-step setup</summary><ol>${li.map(x=>`<li>${x}</li>`).join('')}</ol><p class="muted"><small>General rules from the rulebook; what the scenario specifies above takes priority.</small></p></details>`}
function scenChips(sc){return `<div class="row chips"><span class="chip">${sc.mode==='solo'?'Solo':'Co-op for 2'}</span><span class="chip ${sc.src==='Homemade'?'home':'off'}">${sc.src}</span>${sc.ext?`<span class="chip long">${sc.ext}</span>`:''}${sc.quest?`<span class="chip quest">Quests module</span>`:''}${(()=>{const b=carnetStats()[sc.id];return b?`<span class="chip done">${b.win?'Solved':'Attempted'}</span>`:''})()}<span class="chip">${sc.r} Rounds</span><span class="chip ${sc.long?'long':''}">${sc.t}</span>${pips(sc.d)}</div>`}
function renderScen(){
  const list=SCEN.filter(x=>(F.mode==='all'||x.mode===F.mode)&&(F.src==='all'||(F.src==='off'?x.src!=='Homemade':x.src==='Homemade'))&&(!F.short||!x.long)&&(F.box==='all'||(F.box==='quest'?!!x.quest:(F.box==='ext')===!!x.ext))).sort((a,b)=>a.d-b.d);
  const fb=(k,v,l)=>`<button data-f="${k}:${v}" class="${String(F[k])===String(v)?'on':''}">${l}</button>`;
  return `<section class="panel"><h2>Choose a scenario</h2>
    <div class="row">${fb('mode','all','All')}${fb('mode','solo','Solo')}${fb('mode','coop','Co-op for 2')}</div>
    <div class="row">${fb('src','all','All sources')}${fb('src','off','Rulebook')}${fb('src','home','Homemade')}</div>
    <div class="row">${fb('box','all','All components')}${fb('box','base','Base game')}${fb('box','ext','With expansion')}${fb('box','quest','Quests module')}</div>
    <div class="sub">Quests module</div><div class="row">${['off','normal','merc','hero'].map(m=>`<button data-qm="${m}" class="${QM===m?'on':''}">${QML[m]}</button>`).join('')}</div>
    <p class="muted"><small>${QM==='normal'?'Normal mode: each City gains +1 level in classic scenarios, to offset the quest rewards.':QM==='off'?'Module disabled: scenarios are played as in the rulebook.':'Mode '+QML[QM]+' : a single die roll, the difficulty comes from the draw, Cities keep their level.'} Scenarios marked "Quests module" are already calibrated.</small></p>
    <div class="row">${fb('short',!F.short,F.short?'Games over 3 h hidden':'Games over 3 h shown')}</div>
    <p class="muted"><small>${list.length} scenario${list.length>1?'s':''}, from easiest to hardest. An orange tag marks those that need an expansion; the others are played with the base game. Durations are estimates. "Adapted official": rulebook scenario played solo using the "Other Solo missions" rule.</small></p></section>`+
   list.map(sc=>`<section class="panel scen"><h2>${sc.n}</h2>${scenChips(sc)}<p>${sc.pitch}</p><details><summary>Setup and rules</summary>${scenBody(sc)}</details>
     <button class="primary" data-use="${sc.id}">${S.scen===sc.id&&S.phase!=='setup'?'Restart this scenario':'Play this scenario'}</button></section>`).join('')}
/* ================= Outils, Carnet, Chefs, Volkare guidé ================= */
function finishNow(){act(()=>{S.phase='over';S.flip=[];log(`Game ended during Round ${S.round}.`);autoCarnet()})}
function gameEntry(){if(!S.gid)return -1;return CB.entries.findIndex(e=>e.gid===S.gid)}
function autoCarnet(){if(!S.gid)S.gid=String(Date.now());if(gameEntry()<0){CB.entries.push({gid:S.gid,date:today(),scen:S.scen||'',mode:S.mode,heroes:'',result:'none',score:'',note:`${S.round} Round${S.round>1?'s':''} played${S.round>1?'s':''}`,auto:true})}
  try{localStorage.setItem(CKEY,JSON.stringify(CB))}catch(e){}}
function overCarnet(){const i=gameEntry();if(i<0)return '';const e=CB.entries[i];
  return `<div class="box-c"><p class="muted"><small>✓ Game automatically saved in the Log. Complete it here:</small></p>
   <div class="sub">Result</div>${seg(`C.entries.${i}.result`,[['win','Success'],['lose','Failure'],['none','Not specified']])}
   <div class="row"><label class="fld"><span class="sub">Score</span><input id="ov-score" type="number" step="0.5" inputmode="decimal" data-bind="C.entries.${i}.score" data-live="0" value="${esc(e.score)}"></label>
   <label class="fld"><span class="sub">Heroes</span><input id="ov-heroes" type="text" data-bind="C.entries.${i}.heroes" data-live="0" value="${esc(e.heroes)}" placeholder="Tovak, Arythea…"></label></div>
   <label class="fld"><span class="sub">Note</span><input id="ov-note" type="text" data-bind="C.entries.${i}.note" data-live="0" value="${esc(e.note)}"></label>
   <div class="row"><button data-t="toScore">Calculate the score</button><button data-view="carnet">See the Log</button></div></div>`}
const esc=x=>String(x??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ELS=['phys','fire','ice','cf'],ELN={phys:'physical',fire:'Fire',ice:'Ice',cf:'Cold Fire'};
const TKEY='mk-outils-v1',KKEY='mk-chefs-v1',CKEY='mk-carnet-v1';
const z4=()=>({phys:0,fire:0,ice:0,cf:0});
const enNew=()=>({armor:4,atk:3,el:'phys',rp:false,rf:false,ri:false,vif:false,brutal:false,fort:false,tgt:true});
const pNew=()=>({glo:0,sp:0,aa:0,ar:0,cr:0,ul:0,uw:0,fo:0,av:0,bl:0});
function tBlank(){return{sub:'combat',calc:{site:false,phase:0,armor:2,sel:0,en:[enNew()],blk:z4(),atk:{ranged:z4(),siege:z4(),norm:z4()}},
  chefw:'sc',score:{scen:'',p:[pNew(),pNew()],o:{},win:false,heroes:''}}}
const rows12=()=>Array.from({length:12},()=>({a:'',t:'',f:''}));
function kBlank(){return{elem:rows12(),sc:rows12()}}
function cBlank(){return{entries:[],draft:{date:'',scen:'',heroes:'',result:'win',score:'',note:''}}}
const chefNew=()=>({lvl:null,start:null,combat:null,sh:{a:0,b:0},done:false});
function ld(k,f){try{const v=JSON.parse(localStorage.getItem(k)||'null');if(v)return v}catch(e){}return f()}
let T=Object.assign(tBlank(),ld(TKEY,tBlank)),K=ld(KKEY,kBlank),CB=Object.assign(cBlank(),ld(CKEY,cBlank));
T.calc=Object.assign(tBlank().calc,T.calc);T.score=Object.assign(tBlank().score,T.score);
function saveAll(){save();try{localStorage.setItem(TKEY,JSON.stringify(T));localStorage.setItem(KKEY,JSON.stringify(K));localStorage.setItem(CKEY,JSON.stringify(CB))}catch(e){}}
const ROOT={S:()=>S,T:()=>T,K:()=>K,C:()=>CB};
function getP(p){const k=p.split('.');let o=ROOT[k.shift()]();for(const x of k){if(o==null)return o;o=o[x]}return o}
function setP(p,v){const k=p.split('.');let o=ROOT[k.shift()]();const last=k.pop();for(const x of k)o=o[x];o[last]=v}
const stp=(p,min=0,max=99,step=1,lbl='')=>{const v=getP(p)||0;return `<span class="stp" ${lbl?`aria-label="${lbl}"`:''}><button data-inc="${p}|${-step}|${min}|${max}" aria-label="minus" ${v<=min?'disabled':''}>−</button><b>${v}</b><button data-inc="${p}|${step}|${min}|${max}" aria-label="plus" ${v>=max?'disabled':''}>+</button></span>`};
const tog=(p,l)=>`<button data-tog="${p}" class="pill ${getP(p)?'on':''}" aria-pressed="${!!getP(p)}">${l}</button>`;
const seg=(p,opts)=>`<div class="seg">${opts.map(([v,l])=>`<button data-set="${p}|${v}" class="${String(getP(p))===String(v)?'on':''}">${l}</button>`).join('')}</div>`;
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const frDate=d=>{try{return new Date(d+'T12:00').toLocaleDateString('fr-FR',{day:'numeric',month:'short',year:'numeric'})}catch(e){return d}};
const scName=id=>{const s=SCEN.find(x=>x.id===id);return s?s.n:'Free game'};

/* ---------- Volkare guidé ---------- */
function armyCounts(l){let m=1;if(!ARMY[l]){m=2;l=l/2}const a=ARMY[l];if(!a)return null;return{w:a[0]*m,g:a[1]*m,r:a[2]*m,v:a[3]*m}}
const VA=[['w','White'],['g','Grey'],['r','Red'],['v','Green']];
const vkPlayers=()=>coop()?2:1;
const vkLeft=()=>VA.reduce((a,[k])=>a+(S.varmy[k]||0),0);
function volkState(){const v=volk(),left=vkLeft(),q=v.kind==='quete',need=q?2*vkPlayers():vkPlayers();
  return `<section class="panel"><div class="row between"><h2>Volkare's army</h2><span class="big-n ${left?'':'ok'}">${left}<small> token${left>1?'s':''}</small></span></div>
   ${left?'':`<div class="banner"><b>The whole army is eliminated.</b> Volkare is defeated: you win the game.</div>`}
   <div class="army">${VA.map(([k,l])=>`<div><span class="sub">${l}</span><div class="row"><button data-va="${k}|-1" ${S.varmy[k]?'':'disabled'}>Eliminated</button><b>${S.varmy[k]}</b><button data-va="${k}|1" aria-label="Add a token ${l.toLowerCase()}">+</button></div></div>`).join('')}</div>
   <p class="muted"><small>Tap "Eliminated" for each defeated token, and + for a token added to his army${q?'':` (Wavering Unit left to join him)`}.</small></p>
   <div class="meter"><span>Losses since his last turn: <b>${S.vloss}</b> of ${need}</span><i style="width:${Math.min(100,Math.round(100*S.vloss/need))}%"></i></div>
   ${S.vskip?`<div class="banner warn"><b>Volkare is slowed.</b> He will skip his next turn: flip his Turn Order token face down.</div>`
     :q?`<p class="muted"><small>If he loses ${need} tokens before playing again (two per player), he skips his next turn.</small></p>`
     :`<p class="muted"><small>Defending the City: if he loses at least ${need} token${need>1?'s':''} in the combat (one per player), he falls back one space; otherwise he takes the City.</small></p>`}
   <div class="stats"><div><span class="sub">Deck</span><b>${S.deck.length}</b></div><div><span class="sub">Discard</span><b>${S.discard.length}</b></div><div><span class="sub">Turns</span><b>${S.turn}</b></div></div></section>`}
function vaChange(k,n){act(()=>{if(n<0&&!S.varmy[k])return;S.varmy[k]+=n;
  if(n<0){S.vloss++;const q=volk().kind==='quete';if(q&&!S.vskip&&S.vloss>=2*vkPlayers()){S.vskip=true;log(`Volkare lost ${S.vloss} tokens before his turn: he is slowed and will skip his next turn.`)}
    else log(`Token ${({w:'white',g:'grey',r:'red',v:'green'})[k]} of Volkare eliminated. Left ${vkLeft()}.`);if(!vkLeft())log('Volkare\'s whole army is eliminated: victory!')}
  else log(`A token ${({w:'white',g:'grey',r:'red',v:'green'})[k]} joins Volkare's army. Total ${vkLeft()}.`)})}

/* ---------- Calculatrice de combat ---------- */
const EFF={phys:ELS,fire:['ice','cf'],ice:['fire','cf'],cf:['cf']};
const resists=(e,el)=>el==='cf'?e.rf&&e.ri:el==='phys'?e.rp:el==='fire'?e.rf:e.ri;
function calcBlock(c){const e=c.en[c.sel]||c.en[0];if(!e)return null;let full=0,half=0;ELS.forEach(el=>{const v=c.blk[el];if(!v)return;EFF[e.el].includes(el)?full+=v:half+=v});
  const need=e.atk*(e.vif?2:1),total=full+Math.floor(half/2),dmg=e.atk*(e.brutal?2:1);return{e,full,half,total,need,ok:total>=need,dmg,w:Math.ceil(dmg/Math.max(1,c.armor))}}
function calcAtk(c){const t=c.en.filter(e=>e.tgt),p0=c.phase===0,fortT=t.some(e=>e.fort||c.site),dbl=p0&&t.some(e=>e.fort&&c.site);let full=0,half=0,ign=0;
  ['ranged','siege','norm'].forEach(k=>ELS.forEach(el=>{const v=c.atk[k][el];if(!v)return;if(p0&&(k==='norm'||(k==='ranged'&&fortT))){ign+=v;return}t.some(e=>resists(e,el))?half+=v:full+=v}));
  const need=t.reduce((a,e)=>a+e.armor,0),total=full+Math.floor(half/2);return{t,full,half,ign,total,need,dbl,fortT,ok:t.length&&!dbl&&total>=need}}
function renderCalc(){const c=T.calc,b=calcBlock(c),a=calcAtk(c);
  const enemy=(e,i)=>`<div class="foe"><div class="row between"><h3>Enemy ${i+1}</h3><div class="row">${tog(`T.calc.en.${i}.tgt`,'Target')}${c.en.length>1?`<button class="ghost" data-t="delEn|${i}" aria-label="Remove the enemy ${i+1}">Remove</button>`:''}</div></div>
    <div class="kv2"><span>Armor</span>${stp(`T.calc.en.${i}.armor`,1,40)}<span>Attack</span>${stp(`T.calc.en.${i}.atk`,0,40)}</div>
    <div class="sub">Attack type</div>${seg(`T.calc.en.${i}.el`,ELS.map(x=>[x,ELN[x][0].toUpperCase()+ELN[x].slice(1)]))}
    <div class="sub">Resists</div><div class="row">${tog(`T.calc.en.${i}.rp`,'physical')}${tog(`T.calc.en.${i}.rf`,'Fire')}${tog(`T.calc.en.${i}.ri`,'Ice')}</div>
    <div class="sub">Abilities</div><div class="row">${tog(`T.calc.en.${i}.vif`,'Swift')}${tog(`T.calc.en.${i}.brutal`,'Brutal')}${tog(`T.calc.en.${i}.fort`,'Fortified')}</div></div>`;
  const grid=(base,rows)=>`<div class="egrid"><span></span>${ELS.map(x=>`<span class="sub">${ELN[x]}</span>`).join('')}${rows.map(([k,l])=>`<span class="rl">${l}</span>${ELS.map(el=>stp(`${base}${k?'.'+k:''}.${el}`,0,60)).join('')}`).join('')}</div>`;
  return `<section class="panel"><h2>Combat</h2>
    <div class="kv2"><span>Your Hero's Armor</span>${stp('T.calc.armor',1,9)}</div>
    <div class="row">${tog('T.calc.site','Assault on a fortified site')}</div>
    ${c.en.map(enemy).join('')}
    ${c.en.length<6?`<button data-t="addEn">Add an enemy</button>`:''}</section>
   <section class="panel"><h2>Block</h2>
    ${c.en.length>1?`<div class="sub">Enemy blocked</div>${seg('T.calc.sel',c.en.map((e,i)=>[i,'Enemy '+(i+1)]))}`:''}
    ${grid('T.calc.blk',[['','Block']])}
    ${b?`<div class="verdict ${b.ok?'yes':'no'}"><b>${b.ok?'Attack blocked':'Insufficient Block'}</b>
      <span>Efficient ${b.full} + inefficient ${b.half} ÷ 2 = <b>${b.total}</b> against ${b.need}${b.e.vif?' (Swift: Attack doubled)':''}.</span>
      ${b.ok?'':`<span>Unblocked, it deals <b>${b.dmg}</b> Damage${b.e.brutal?' (Brutal: doubled)':''} : <b>${b.w}</b> Wound${b.w>1?'s':''} for your Hero, or to assign to your Units.</span>`}
      <small class="muted">Against an attack ${ELN[b.e.el]}, ${b.e.el==='phys'?'any Block counts in full':'only Blocks '+EFF[b.e.el].map(x=>ELN[x]).join(' and ')+' count in full'}.</small></div>`:''}
    <button class="ghost" data-t="clrBlk">Reset the Block</button></section>
   <section class="panel"><h2>Attack</h2>
    ${seg('T.calc.phase',[[0,'Phase 1 · Ranged and Siege'],[3,'Phase 4 · Attack']])}
    <p class="muted"><small>Targets: ${a.t.length?a.t.map(e=>'Enemy '+(c.en.indexOf(e)+1)).join(', '):'none, tick "Target" on an enemy'}.</small></p>
    ${grid('T.calc.atk',[['ranged','Ranged'],['siege','Siege'],['norm','Normal']])}
    <div class="verdict ${a.ok?'yes':'no'}"><b>${!a.t.length?'Choose a target':a.dbl?'Target untouchable in this phase':a.ok?'Targets defeated':'Insufficient attack'}</b>
     ${a.t.length&&!a.dbl?`<span>Full ${a.full} + reduced ${a.half} ÷ 2 = <b>${a.total}</b> against ${a.need} Armor.</span>`:''}
     ${a.dbl?`<span>A Fortified enemy defending a fortified site can only be attacked in phase 4.</span>`:''}
     ${a.ign?`<span>${a.ign} point${a.ign>1?'s':''} doesn't count${a.ign>1?'':''} in phase 1${a.fortT?' (against a Fortified enemy, only Siege counts)':' (normal Attacks wait for phase 4)'}.</span>`:''}
     ${a.half?`<small class="muted">A Resistance of one of the targets halves ${a.half} of your points: splitting your attacks can avoid this loss.</small>`:''}</div>
    <button class="ghost" data-t="clrAtk">Reset the Attack</button></section>`}

/* ---------- Score ---------- */
const O_CITY=['n','Conquered Cities',10,'cities'],O_ALLC=['c','All Cities conquered',15,'allc'],O_LORD=['c','Each player is Lord of at least one City',10,'lord'],
 O_ROUND=['n','Unused Rounds',30,'rounds'],O_DECK=['n','Cards left in the Dummy\'s Deck',1,'deck'],O_OPEN=['c','End of the current Round not announced',5,'open'],O_VK=['v'];
const O_SOLO=[O_CITY,O_ALLC,O_ROUND,O_DECK,O_OPEN],O_COOP=[O_CITY,O_LORD,O_ALLC,O_ROUND,O_DECK,O_OPEN],O_MINES=[['n','Mines liberated on a Countryside tile',4,'minc'],['n','Mines liberated on a Core tile',7,'minr']];
const O_EACH20=['c','Each player has a Shield on the Leader',20,'each'];
const SCO={reco:[],druides:[],mines:O_MINES,'mc-mines':O_MINES,eclair:O_SOLO,solo:O_SOLO,'m-siege':O_SOLO,'m-montre':O_SOLO,'v-camp':O_SOLO,
 dungeon:[['n','Dungeons and Tombs conquered (2 extra points each)',2,'dt']],'c-eclair':O_COOP,'c-totale':O_COOP,'mc-cite':O_COOP,
 'v-eclair':[['c','City conquered',20,'c20'],O_VK],'vc-eclair':[['c','City conquered',20,'c20'],O_VK],'v-epique':[['c','City conquered',20,'c20'],O_VK],'vc-epique':[['c','City conquered',20,'c20'],O_VK],
 'v-quete':[['n','Conquered Cities',5,'c5'],O_VK],'vc-quete':[['n','Conquered Cities',5,'c5'],O_VK],
 'tz-relique':[['n','Fragments found',5,'frag'],['c','All fragments',10,'allf'],O_DECK,O_OPEN],'tzc-relique':[['n','Fragments found',5,'frag'],['c','Each player found a fragment',5,'eachf'],['c','All fragments',10,'allf'],O_DECK,O_OPEN],
 'tz-vallee':[['c','High Priestess defeated',20,'prt'],O_ROUND,O_DECK,O_OPEN],'tzc-vallee':[['c','High Priestess defeated',20,'prt'],O_EACH20,O_ROUND,O_DECK,O_OPEN],
 'tz-morts':[['n','Graveyards sealed',5,'cim'],['c','Necromancer defeated',10,'nec'],['c','All Graveyards sealed and Necromancer defeated',10,'allm'],O_ROUND,O_DECK,O_OPEN],
 'tzc-morts':[['n','Graveyards sealed',5,'cim'],['c','Necromancer defeated',10,'nec'],['c','All Graveyards sealed and Necromancer defeated',10,'allm'],O_EACH20,O_ROUND,O_DECK,O_OPEN],
 'tz-vie':[['n','Avatars defeated',10,'ava'],['c','Both Avatars defeated',15,'both'],O_ROUND,O_DECK,O_OPEN],
 'tzc-vie':[['n','Avatars defeated',10,'ava'],['c','Both Avatars defeated',15,'both'],['c','Each player has a Shield on at least one Leader',10,'sh1'],['c','Each player has a Shield on both Leaders',10,'sh2'],O_ROUND,O_DECK,O_OPEN]};
const HF=[['The Greatest Knowledge',[['sp','Spells',2],['aa','Advanced Actions',1]]],['The Greatest Loot',[['ar','Artifacts',2],['cr','Crystals (1 per pair)',.5]]],['The Greatest Leader',[['ul','Levels of unwounded Units',1],['uw','Levels of Wounded Units (half)',.5]]],
 ['The Greatest Conqueror',[['fo','Shields on Keeps, Mage Towers and Monasteries',2]]],['The Greatest Adventurer',[['av','Shields on adventure sites',2]]],['The Greatest Beating',[['bl','Wounds in your Deck',-2]]]];
const hfCat=(p,items)=>items.reduce((s,[k,,m])=>s+(m===.5?Math.floor((p[k]||0)/2):(p[k]||0)*m),0);
function scoreDefaults(id){const o=T.score.o;if(o.__for===id)return;T.score.o={__for:id};const here=id===S.scen&&S.phase!=='setup';
  T.score.o.rounds=here?Math.max(0,S.rounds-S.round):0;T.score.o.deck=here?S.deck.length:0;T.score.o.open=here?!S.endBy:false;T.score.o.vkdeck=here&&volk()?S.deck.length:0;T.score.o.vc=here?S.vc:1;T.score.o.vp=here?S.vp:0;T.score.o.vk=here&&volk()?!vkLeft():false;T.score.o.cities=0}
function scoreCalc(){const id=T.score.scen,sc=SCEN.find(x=>x.id===id),two=sc?sc.mode==='coop':coop(),P=two?T.score.p:[T.score.p[0]],o=T.score.o,lines=[];
  const base=Math.min(...P.map(p=>p.glo||0));lines.push([two?'Fame of the player furthest behind':'Your Fame',base]);
  HF.forEach(([n,items])=>{const v=P.map(p=>hfCat(p,items));const best=n==='The Greatest Beating'?Math.min(...v):Math.max(...v);if(best)lines.push([n,best])});
  (SCO[id]||[]).forEach(d=>{if(d[0]==='v'){if(o.vk){const b=([30,40,50][o.vc]+2*(o.vkdeck||0))*[1,1.5,2][o.vp];lines.push(['Volkare defeated',Math.round(b*10)/10])}return}
    const v=d[0]==='n'?(o[d[3]]||0)*d[2]:(o[d[3]]?d[2]:0);if(v)lines.push([d[1],v])});
  return{lines,total:lines.reduce((a,l)=>a+l[1],0),two,sc}}
function renderScore(){if(T.score.scen===''&&S.scen)T.score.scen=S.scen;scoreDefaults(T.score.scen);const r=scoreCalc(),two=r.two,o=T.score.o,defs=SCO[T.score.scen]||[];
  const pcol=(k,max=99)=>two?`${stp(`T.score.p.0.${k}`,0,max)}${stp(`T.score.p.1.${k}`,0,max)}`:stp(`T.score.p.0.${k}`,0,max);
  return `<section class="panel"><h2>End-of-game score</h2>
   <label class="fld"><span class="sub">Scenario</span><select id="sc-scen" data-bind="T.score.scen"><option value="">Free game, no mission scoring</option>${SCEN.map(x=>`<option value="${x.id}" ${x.id===T.score.scen?'selected':''}>${esc(x.n)} · ${x.mode==='solo'?'solo':'coop'}</option>`).join('')}</select></label>
   ${r.sc&&r.sc.src==='Homemade'?`<p class="muted"><small>Homemade scenario: it is played to the goal. The score below is for comparing your games.</small></p>`:''}</section>
  <section class="panel"><h2>Fame and Achievements</h2>${two?`<div class="pcols"><span></span><span class="sub">Player 1</span><span class="sub">Player 2</span></div>`:''}
   <div class="pgrid ${two?'two':''}"><span class="rl">Fame</span>${two?`<input id="g0" type="number" inputmode="numeric" data-bind="T.score.p.0.glo" value="${T.score.p[0].glo}"><input id="g1" type="number" inputmode="numeric" data-bind="T.score.p.1.glo" value="${T.score.p[1].glo}">`:`<input id="g0" type="number" inputmode="numeric" data-bind="T.score.p.0.glo" value="${T.score.p[0].glo}">`}</div>
   ${HF.map(([n,items])=>`<div class="sub hf">${n}</div>${items.map(([k,l])=>`<div class="pgrid ${two?'two':''}"><span class="rl">${l}</span>${pcol(k)}</div>`).join('')}`).join('')}
   <p class="muted"><small>${two?'As a team, each category keeps the best player, and The Greatest Beating the most Wounded one. ':''}No titles in solo and co-op. Scoring card values: check them once against yours.</small></p></section>
  ${defs.length?`<section class="panel"><h2>Mission</h2>${defs.map(d=>d[0]==='v'?`<div class="sub hf">Volkare</div><div class="row">${tog('T.score.o.vk','Volkare defeated')}</div>
     ${o.vk?`<div class="sub">Combat Level</div>${seg('T.score.o.vc',[[0,'Bold'],[1,'Heroic'],[2,'Legendary']])}<div class="sub">Pursuit Level</div>${seg('T.score.o.vp',[[0,'Fair'],[1,'Tense'],[2,'Thrilling']])}<div class="kv2"><span>Cards left in his Deck</span>${stp('T.score.o.vkdeck',0,60)}</div>`:''}`
    :d[0]==='n'?`<div class="kv2"><span>${d[1]} <small class="muted">× ${d[2]}</small></span>${stp('T.score.o.'+d[3],0,60)}</div>`:`<div class="row">${tog('T.score.o.'+d[3],`${d[1]} · ${d[2]} pts`)}</div>`).join('')}</section>`:''}
  <section class="panel total"><div class="row between"><h2>Total</h2><span class="big-n">${Math.round(r.total*10)/10}</span></div>
   <div class="lines">${r.lines.map(([l,v])=>`<span>${l}</span><b>${v>0&&l!==r.lines[0][0]?'+':''}${Math.round(v*10)/10}</b>`).join('')}</div>
   <div class="sub">For the log</div><div class="row">${tog('T.score.win','Mission successful')}</div>
   <label class="fld"><span class="sub">Hero played${two?'s':''}</span><input id="sc-heroes" data-bind="T.score.heroes" data-live="0" value="${esc(T.score.heroes)}" placeholder="${two?'e.g. Arythea and Tovak':'e.g. Arythea'}"></label>
   <button class="primary big" data-t="scoreSave">Save to the log</button><button class="ghost" data-t="scoreClear">Reset the score</button></section>`}

/* ---------- Carnet ---------- */
function carnetStats(){const E=CB.entries,by={};E.forEach(e=>{if(!e.scen)return;const b=by[e.scen]||(by[e.scen]={n:0,win:0,best:null});b.n++;if(e.result==='win')b.win++;const sc=parseFloat(e.score);if(!isNaN(sc)&&(b.best===null||sc>b.best))b.best=sc});return by}
function renderCarnet(){const E=CB.entries,dr=CB.draft;if(!dr.date)dr.date=today();const by=carnetStats(),wins=E.filter(e=>e.result==='win').length;
  const left=SCEN.filter(x=>!by[x.id]),leftB=left.filter(x=>!x.ext),leftX=left.filter(x=>x.ext);
  return `<section class="panel"><h2>Campaign log</h2><div class="stats"><div><span class="sub">Games</span><b>${E.length}</b></div><div><span class="sub">Successes</span><b>${wins}</b></div><div><span class="sub">Scenarios</span><b>${Object.keys(by).length}<small>/${SCEN.length}</small></b></div></div></section>
  <section class="panel"><h2>Add a game</h2>
   <label class="fld"><span class="sub">Date</span><input id="cd-date" type="date" data-bind="C.draft.date" data-live="0" value="${esc(dr.date)}"></label>
   <label class="fld"><span class="sub">Scenario</span><select id="cd-scen" data-bind="C.draft.scen"><option value="">Free game</option>${SCEN.map(x=>`<option value="${x.id}" ${x.id===dr.scen?'selected':''}>${esc(x.n)} · ${x.mode==='solo'?'solo':'coop'}</option>`).join('')}</select></label>
   <label class="fld"><span class="sub">Heroes</span><input id="cd-heroes" data-bind="C.draft.heroes" data-live="0" value="${esc(dr.heroes)}" placeholder="e.g. Arythea"></label>
   <div class="sub">Result</div>${seg('C.draft.result',[['win','Success'],['lose','Failure'],['none','No goal']])}
   <label class="fld"><span class="sub">Score</span><input id="cd-score" type="number" inputmode="decimal" data-bind="C.draft.score" data-live="0" value="${esc(dr.score)}"></label>
   <label class="fld"><span class="sub">Note</span><input id="cd-note" data-bind="C.draft.note" data-live="0" value="${esc(dr.note)}" placeholder="what worked, what got stuck"></label>
   <button class="primary big" data-t="carnetAdd">Add to the log</button></section>
  ${E.length?`<section class="panel"><div class="row between"><h2>Games played</h2><button class="ghost" data-t="carnetCopy">Copy the log</button></div>
   <ol class="entries">${E.map((e,i)=>({e,i})).reverse().map(({e,i})=>`<li><div class="row between"><b class="en">${esc(scName(e.scen))}</b><span class="chip ${e.result==='win'?'off':e.result==='lose'?'long':''}">${e.result==='win'?'Success':e.result==='lose'?'Failure':'Game'}</span></div>
     <span class="muted">${frDate(e.date)} · ${e.mode==='coop'?'coop':'solo'}${e.heroes?' · '+esc(e.heroes):''}${e.score!==''&&e.score!=null?' · <b>'+esc(e.score)+'</b> pts':''}</span>${e.note?`<span class="note">${esc(e.note)}</span>`:''}
     <button class="ghost del" data-t="carnetDel|${i}">Delete</button></li>`).join('')}</ol><p id="copymsg" class="muted"><small></small></p></section>`:''}
  ${Object.keys(by).length?`<section class="panel"><h2>By scenario</h2><div class="lines">${Object.entries(by).map(([id,b])=>`<span>${esc(scName(id))}</span><b>${b.win}/${b.n}${b.best!==null?' · '+b.best:''}</b>`).join('')}</div><p class="muted"><small>Successes out of games played, then best score.</small></p></section>`:''}
  <section class="panel"><h2>To try</h2>${left.length?`<p class="muted"><small>${left.length} scenario${left.length>1?'s':''} never played${left.length>1?'s':''}.</small></p>
   ${leftB.length?`<div class="sub">Base game</div><div class="todo">${leftB.sort((a,b)=>a.d-b.d).map(x=>`<button data-use="${x.id}">${esc(x.n)} <small>${x.mode==='solo'?'solo':'coop'}</small></button>`).join('')}</div>`:''}
   ${leftX.length?`<div class="sub">With expansion</div><div class="todo">${leftX.sort((a,b)=>a.d-b.d).map(x=>`<button data-use="${x.id}">${esc(x.n)} <small>${x.mode==='solo'?'solo':'coop'}</small></button>`).join('')}</div>`:''}`:'<p>You have played everything at least once. Well done.</p>'}</section>`}
function carnetText(){return 'Mage Knight campaign log\n'+CB.entries.map(e=>`${e.date} · ${scName(e.scen)} (${e.mode==='coop'?'coop':'solo'}) · ${e.result==='win'?'success':e.result==='lose'?'failure':'game'}${e.score!==''&&e.score!=null?' · '+e.score+' pts':''}${e.heroes?' · '+e.heroes:''}${e.note?' · '+e.note:''}`).join('\n')}

/* ---------- Onglet Outils ---------- */
function renderTools(){if(T.sub==='chef')T.sub='combat';return `<div class="seg subnav">${[['combat','Combat'],['score','End-of-game score']].map(([v,l])=>`<button data-set="T.sub|${v}" class="${T.sub===v?'on':''}">${l}</button>`).join('')}</div>`+
  (T.sub==='score'?renderScore():renderCalc())}

/* ---------- Événements ---------- */
function rerender(el){const id=el&&el.id;let pos=null;try{pos=el.selectionStart}catch(e){}render();if(id){const n=document.getElementById(id);if(n){n.focus();try{if(pos!==null)n.setSelectionRange(pos,pos)}catch(e){}}}}
function bindSet(el){const p=el.dataset.bind;let v=el.value;if(el.type==='number')v=v===''?'':Number(v);setP(p,v);saveAll();if(el.dataset.live!=='0')rerender(el)}
APPROOT.addEventListener('input',e=>{const el=e.target;if(el.dataset&&el.dataset.bind&&el.tagName!=='SELECT')bindSet(el)});
APPROOT.addEventListener('change',e=>{const el=e.target;if(el.dataset&&el.dataset.bind&&el.tagName==='SELECT')bindSet(el)});
APPROOT.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;const d=b.dataset;
  if(d.inc){const [p,st,mn,mx]=d.inc.split('|');setP(p,Math.max(+mn,Math.min(+mx,(+getP(p)||0)+ +st)));saveAll();return render()}
  if(d.tog){setP(d.tog,!getP(d.tog));saveAll();return render()}
  if(d.set){const [p,v]=d.set.split('|');setP(p,/^-?\d+$/.test(v)?+v:v);saveAll();return render()}
  if(d.va){const [k,n]=d.va.split('|');return vaChange(k,+n)}
  if(!d.t)return;const [a,x]=d.t.split('|');
  if(a==='addEn'){T.calc.en.push(enNew())}
  else if(a==='delEn'){T.calc.en.splice(+x,1);T.calc.sel=0}
  else if(a==='clrBlk'){T.calc.blk=z4()}
  else if(a==='clrAtk'){T.calc.atk={ranged:z4(),siege:z4(),norm:z4()}}
  else if(a==='scoreClear'){T.score=Object.assign(tBlank().score,{scen:T.score.scen})}
  else if(a==='toScore'){T.sub='score';T.score.scen=S.scen||'';S.view='tools'}
  else if(a==='scoreSave'){const r=scoreCalc(),gi=(S.phase==='over'&&T.score.scen===(S.scen||''))?gameEntry():-1;if(gi>=0){const e=CB.entries[gi];Object.assign(e,{mode:r.two?'coop':'solo',heroes:T.score.heroes||e.heroes,result:T.score.win?'win':'lose',score:Math.round(r.total*10)/10});S.view='carnet'}else CB.entries.push({date:today(),scen:T.score.scen,mode:r.two?'coop':'solo',heroes:T.score.heroes,result:(r.sc&&r.sc.src!=='Homemade'&&!(SCO[T.score.scen]||[]).length&&!T.score.win)?'none':T.score.win?'win':'lose',score:Math.round(r.total*10)/10,note:''});S.view='carnet'}
  else if(a==='carnetAdd'){const dr=CB.draft,sc=SCEN.find(z=>z.id===dr.scen);CB.entries.push({date:dr.date||today(),scen:dr.scen,mode:sc?sc.mode:'solo',heroes:dr.heroes,result:dr.result,score:dr.score,note:dr.note});CB.draft=Object.assign(cBlank().draft,{date:today()})}
  else if(a==='carnetDel'){if(b.dataset.armed!=='1'){b.dataset.armed='1';b.textContent='Tap again to delete';return}CB.entries.splice(+x,1)}
  else if(a==='carnetCopy'){const m=$('#copymsg small');try{navigator.clipboard.writeText(carnetText()).then(()=>{m.textContent='Log copied: paste it into a note to keep it.'},()=>{m.textContent='The browser refused the copy.'})}catch(err){m.textContent='Copying isn\'t available here.'}return}
  saveAll();render()});

function render(){
  $('#when').textContent=S.phase==='setup'?'Game aid for solo and co-op':S.phase==='over'?'Game over':`Round ${S.round}/${S.rounds} · ${isDay()?'Day':'Night'}`;
  $('#tabs').innerHTML=[['game','Game'],['tools','Tools'],['scen','Scenarios'],['carnet','Log']].map(([v,l])=>`<button data-view="${v}" class="${S.view===v?'on':''}">${l}</button>`).join('');
  if(S.view==='scen'){$('#app').innerHTML=renderScen();return}
  if(S.view==='tools'){$('#app').innerHTML=renderTools();return}
  if(S.view==='carnet'){$('#app').innerHTML=renderCarnet();return}
  const sc=scen();let h=sc?`<section class="panel"><div class="row between"><h2>${sc.n}</h2><button data-view="scen">Change</button></div>${scenChips(sc)}<details><summary>Scenario reminder</summary>${scenBody(sc)}</details></section>`:'';
  if(S.phase==='setup'&&volk())h+=volkSetup();
  else if(S.phase==='setup'){
    h+=`<section class="panel"><h2>Dummy player setup</h2>
     ${sc?'':`<p class="muted">No scenario chosen: go through the Scenarios tab, or set up the game by hand below.</p><div class="row"><button data-mode="solo" class="${!coop()?'on':''}">Solo</button><button data-mode="coop" class="${coop()?'on':''}">Two-player co-op</button></div>`}
     <p class="muted">Pick at random a Hero nobody chose. The companion replaces its Deck and Crystals: nothing to put on the table for it.</p>
     <div class="sub">Its 3 starting Crystals</div><p class="muted"><small>The three coloured dots at the bottom of its Hero card. Rulebook example: Goldyx has green, green, blue.</small></p>
     ${S.dummyCrys.map((c,i)=>`<div class="pick">${KEYS.map(k=>`<button data-dc="${i}:${k}" class="${c===k?'on':''}">${ico(k)}${COL[k]}</button>`).join('')}</div>`).join('')}
     <div class="sub">Its Deck of 16 Basic Action cards, by colour</div>
     <div class="gems">${KEYS.map(k=>`<div class="gem"><span class="ico c-${k}"></span><b>${S.counts[k]}</b><div class="row"><button data-cnt="${k}:-1" aria-label="minus">−</button><button data-cnt="${k}:1" aria-label="plus">+</button></div></div>`).join('')}</div>
     <p class="muted"><small>By default 4 of each colour. Check on the Hero's cards and correct if needed. Total: ${KEYS.reduce((a,k)=>a+S.counts[k],0)}.</small></p>
     <div class="sub">Number of Rounds</div>
     <div class="row"><button data-rounds="-1" aria-label="minus">−</button><b>${S.rounds}</b><button data-rounds="+1" aria-label="plus">+</button><span class="muted"><small>${Math.ceil(S.rounds/2)} Day${S.rounds>1?'s':''}, ${Math.floor(S.rounds/2)} Night${S.rounds>3?'s':''}</small></span></div>
     <button class="primary big" data-go="start">Start the game</button></section>`;
  }
  else if(S.phase==='tactic'){
    const rem=S.removed[tset()];const nums=fn=>[1,2,3,4,5,6].map(fn).join('');
    if(!coop())h+=`<section class="panel"><h2>Tactics of ${isDay()?'Day':'Night'}</h2>
     <p>Choose your Tactic card on the table, then tap its number. ${volk()?'Volkare':'The Dummy'} draws its own at random from the remaining ones.</p>
     <div class="tacs">${nums(n=>`<button data-tac="${n}" ${rem.includes(n)?'disabled title="Already removed"':''}>${n}</button>`)}</div>
     ${rem.length?`<p class="muted"><small>Removed for the game: ${rem.join(', ')}.</small></p>`:''}</section>`;
    else if(!S.tac.dummy&&!volk())h+=`<section class="panel"><h2>Tactics of ${isDay()?'Day':'Night'}</h2><p>In co-op, the Dummy draws its Tactic at random before you choose yours.</p>
     ${rem.length?`<p class="muted"><small>Removed for the game: ${rem.join(', ')}.</small></p>`:''}<button class="primary big" data-go="dtac">Draw the Dummy's Tactic</button></section>`;
    else h+=`<section class="panel"><h2>Tactics of ${isDay()?'Day':'Night'}</h2>${volk()?`<p>Against Volkare, the players choose first; he will then draw his Tactic from the remaining ones.</p>`:`<div class="banner">The Dummy takes Tactic <b>${S.tac.dummy}</b>. Remove it from the table.</div>`}
     <p>Choose yours, the player with the least Fame first, then enter them here.</p>
     <div class="sub">Player 1</div><div class="tacs">${nums(n=>`<button data-mt="me:${n}" class="${S.tac.me===n?'on':''}" ${rem.includes(n)||n===S.tac.dummy||n===S.tac.p2?'disabled':''}>${n}</button>`)}</div>
     <div class="sub">Player 2</div><div class="tacs">${nums(n=>`<button data-mt="p2:${n}" class="${S.tac.p2===n?'on':''}" ${rem.includes(n)||n===S.tac.dummy||n===S.tac.me?'disabled':''}>${n}</button>`)}</div>
     <button class="primary big" data-go="manual" ${S.tac.me&&S.tac.p2?'':'disabled'}>Confirm the Tactics</button></section>`;
    h+=stateHtml();
  }
  else if(S.phase==='play'){
    let banner='',main='';const C=coop();
    if(S.endBy==='dummy'){banner=`<div class="banner warn"><b>The Dummy has announced the end of the Round.</b> ${C?'Each player plays their last turn':'Play your last turn'}, then end the Round.</div>`;main=`<button class="primary big" data-go="endround">${C?'Our last turns are played':'My last turn is played'} : end of the Round</button>`}
    else if(S.endBy==='me'&&S.dummyLastDone){banner=`<div class="banner">${volk()?'Volkare doesn\'t play a last turn.':'The Dummy has played its last turn.'}${C?' Don\'t forget the other player\'s.':''}</div>`;main=`<button class="primary big" data-go="endround">End the Round</button>`}
    else if(S.endBy==='me'){banner=`<div class="banner">End of the Round announced: the Dummy plays one last turn${C?', the other player too':''}.</div>`;main=`<button class="primary big" data-go="dummy">The Dummy's last turn</button>`}
    else{if(!volk()&&(S.mustAnnounce||!S.deck.length))banner=`<div class="banner warn">On its next turn, the Dummy will announce the end of the Round.</div>`;
      main=`<button class="primary big" data-go="dummy">Turn ${volk()?'of Volkare':'of the Dummy'}</button>${volk()?`<button data-go="vdie">Roll Volkare's attack die</button>`:''}<button data-go="announce">${C?'A player announces':'I announce'} the end of the Round</button>`}
    h+=`<section class="panel"><p><span class="sub">Turn order</span><br>${orderText()}</p>${banner}${main}
      ${volk()?volkPanel():S.flip.length?`<div class="sub">The Dummy's last turn</div>${cardsHtml(S.flip)}`:''}</section>`+stateHtml();
  }
  else if(S.phase==='prep'&&volk())h+=`<section class="panel"><h2>Prepare the Round ${S.round} (${isDay()?'Day':'Night'})</h2><p>Prepare the Round as usual: Source, Offers, players' Decks. Lay out the Units Offer again starting with the slots marked with a Crystal. Volkare's Deck stays as it is.</p><button class="primary big" data-go="prep">Go to Tactics</button></section>`+stateHtml();
  else if(S.phase==='prep'){
    const rm=needRm();
    h+=`<section class="panel"><h2>Prepare the Round ${S.round} (${isDay()?'Day':'Night'})</h2>
      ${rm?`<p>Agree to remove from the game one of the Tactics you have just used.</p><div class="row">${[S.tac.me,S.tac.p2].map(n=>`<button data-prep="rm:${n}" class="${String(S.prep.rm)===String(n)?'on':''}">Tactic ${n}</button>`).join('')}</div>`:''}
      <p>Renew the Advanced Actions Offer as usual. What colour is the card removed from the bottom? It joins the Dummy's Deck.</p>
      <div class="pick">${KEYS.map(k=>`<button data-prep="aa:${k}" class="${S.prep.aa===k?'on':''}">${ico(k)}${COL[k]}</button>`).join('')}</div>
      <p>Renew the Spells Offer. What colour is the removed Spell? The Dummy gains a Crystal of that colour.</p>
      <div class="pick">${KEYS.map(k=>`<button data-prep="spell:${k}" class="${S.prep.spell===k?'on':''}">${ico(k)}${COL[k]}</button>`).join('')}</div>
      <button class="primary big" data-go="prep" ${S.prep.aa&&S.prep.spell&&(!rm||S.prep.rm)?'':'disabled'}>Reshuffle and go to Tactics</button></section>`+stateHtml();
  }
  else h+=`<section class="panel"><h2>Game over</h2><p>The ${S.rounds} Rounds have been played. ${sc?sc.score:'Count your score with the Scoring card.'}</p>
      <p class="muted">Cards left in the Deck ${volk()?'of Volkare':'of the Dummy'} : ${S.deck.length}.</p>${overCarnet()}<button class="primary big" data-go="new">New game</button></section>`+stateHtml();
  h+=`<section class="panel"><div class="row between"><h2>History</h2><div class="row"><button data-go="undo" ${HIST.length?'':'disabled'}>Cancel</button>${S.phase!=='setup'&&S.phase!=='over'?'<button data-go="finish">End the game</button>':''}${S.phase!=='setup'?'<button data-go="reset">Restart</button>':''}</div></div>
     ${S.log.length?`<ol class="log" reversed>${S.log.map(l=>`<li>${l}</li>`).join('')}</ol>`:'<p class="muted">Nothing yet.</p>'}</section>`;
  $('#app').innerHTML=h;
}
let confirmReset=false,confirmUse=null,confirmFinish=false;
APPROOT.addEventListener('click',e=>{const t=e.target.closest('button');if(!t||t.disabled)return;const d=t.dataset;
  if(d.view){S.view=d.view;save();return render()}
  if(d.f){const [k,v]=d.f.split(':');F[k]=k==='short'?v==='true':v;return render()}
  if(d.qm){QM=d.qm;try{localStorage.setItem('mk-quetes-mode',QM)}catch(e){}return render()}
  if(d.use){if(S.phase!=='setup'&&S.phase!=='over'&&confirmUse!==d.use){confirmUse=d.use;t.textContent='A game is in progress: tap again to replace it';return}confirmUse=null;return useScen(d.use)}
  if(d.mode){S.mode=d.mode;save();return render()}
  if(d.dc){const [i,k]=d.dc.split(':');S.dummyCrys[+i]=k;save();return render()}
  if(d.cnt){const [k,n]=d.cnt.split(':');S.counts[k]=Math.max(0,Math.min(16,S.counts[k]+ +n));save();return render()}
  if(d.rounds){S.rounds=Math.max(1,Math.min(12,S.rounds+ +d.rounds));save();return render()}
  if(d.cr){const [k,n]=d.cr.split(':');return act(()=>{S.crystals[k]=Math.max(0,S.crystals[k]+ +n);log(`Correction: Crystals ${COL[k]}of the Dummy at ${S.crystals[k]}.`)})}
  if(d.vc){S.vc=+d.vc;save();return render()}
  if(d.vp){S.vp=+d.vp;save();return render()}
  if(d.vcity){S.vcity=!S.vcity;save();return render()}
  if(d.tac)return pickTac(+d.tac);
  if(d.mt){const [w,n]=d.mt.split(':');S.tac[w]=+n;save();return render()}
  if(d.prep){const [w,k]=d.prep.split(':');S.prep[w]=w==='rm'?+k:k;save();return render()}
  switch(d.go){
    case 'start':return startGame();
    case 'dtac':return drawDummyTac();
    case 'manual':return act(()=>{if(volk()){const left=[1,2,3,4,5,6].filter(x=>x!==S.tac.me&&x!==S.tac.p2&&!S.removed[tset()].includes(x));S.tac.dummy=left[rnd(left.length)]}beginPlay()});
    case 'vdie':return volkDie();
    case 'dummy':return dummyTurn();
    case 'announce':return iAnnounce();
    case 'endround':return endRound();
    case 'finish':if(!confirmFinish){confirmFinish=true;t.textContent='Tap again: the game will be closed and saved to the Log';setTimeout(()=>{confirmFinish=false;render()},3000);return}confirmFinish=false;return finishNow();
    case 'prep':return prepDone();
    case 'undo':return undo();
    case 'reset':case 'new':
      if(d.go==='reset'&&!confirmReset){confirmReset=true;t.textContent='Tap again to confirm';setTimeout(()=>{confirmReset=false;render()},3000);return}