/* ---------- Chapitre 2 : le tour des règles ---------- */
const TOPICS=[
{t:'The Round',h:'Preparing and ending a Round',rules:[
 `A game alternates Day and Night Rounds. The scenario sets how many.`,
 `At the start of each Round after the first: flip the Day/Night board, reroll all the Source dice (at least half in basic colours, otherwise reroll the gold and black dice) and lay out a new Units Offer (number of players + 2).`,
 `The Spell and Advanced Action Offers slide: the bottom card goes back under its deck, a new one arrives at the top.`,
 `Each player reshuffles all their cards, Wounds included, then draws up to their Hand Limit. Their Spent Units become Ready again, as do their flipped Skills. Wounded Units stay Wounded.`,
 `Each player chooses a Tactic card, the player with the least Fame first. The Tactic's number sets the Turn Order: the lowest number goes first.`,
 `If your Deck is empty at the start of your turn, you may announce the end of the Round instead of playing. Each other player then plays one last turn. Empty deck and empty hand: you must announce it.`],
 quiz:[
 {q:`At the start of your turn, your Deck is empty but you still have 3 cards in hand.`,o:[`You must announce the end of the Round`,`You choose: announce the end of the Round or play a turn`,`You reshuffle your discard pile to draw`],a:1,why:`Announcing is only mandatory if your hand is empty too. You never reshuffle your discard pile during a Round.`},
 {q:`Who chooses their Tactic card first?`,o:[`The player with the most Fame`,`The player with the least Fame`,`The first player in the previous Turn Order`],a:1,why:`The player lowest on the Fame track chooses first. If tied, the one whose Turn Order token is lowest.`},
 {q:`You announce the end of the Round. What happens?`,o:[`You play your turn, then the Round stops`,`You don't play; each other player plays one last turn`,`The Round stops immediately for everyone`],a:1,why:`The announcement replaces your turn. You don't even benefit from a Mine or a Glade.`}]},
{t:'The turn',h:'The turn in detail',rules:[
 `Regular Turn: an optional Movement, then a single action (combat, interaction, entering an adventure site). No more Movement after the action.`,
 `Rest, instead: no Movement and no action. Standard Rest: discard one non-Wound card and as many Wounds as you like. Slow Recovery, if you only have Wounds: show your hand and discard just one.`,
 `Special effects and Healing can be played at any time during your turn, even during a Rest. Only exception: no Healing during a combat.`,
 `Every turn, you must play or discard at least one card.`,
 `A card played for one effect can't then be used for its other effect.`,
 `You can take back your choices as long as nothing new has been revealed: tile, Enemy token, drawn card, rolled die.`,
 `End of turn, in order: reroll used dice, any forced Withdrawal, return Mana tokens and discard played cards, Mine or Glade effect, combat rewards, Level change, free discard (never Wounds), draw up to your Limit.`],
 quiz:[
 {q:`You Rest. What can you still do this turn?`,o:[`Move one space`,`Play a Healing card`,`Recruit at the Village you are in`],a:1,why:`Resting forbids Movement, combat and interaction. Healing and special effects are still allowed, before or after.`},
 {q:`Your hand holds 4 Wounds and nothing else. You Rest. How many do you discard?`,o:[`All 4`,`Just one`,`None`],a:1,why:`It is a Slow Recovery: a single Wound goes to the discard pile.`},
 {q:`In the middle of a combat, you gain enough Fame to cross a line. When do you change Level?`,o:[`Right away`,`At the end of the turn, before drawing`,`At the start of the next Round`],a:1,why:`Level changes are always resolved at the end of the turn.`}]},
{t:'Move',h:'Movement and exploration, the details',rules:[
 `Revealing a tile costs 2 points from a space adjacent to its position. Its position and orientation are fixed, and nothing is placed beyond the coastline.`,
 `You freely alternate moving and exploring, and you can play new cards along the way.`,
 `Entering an unconquered fortified site stops your Movement and starts the assault. A rampaging enemy's space is off-limits until it is defeated.`,
 `An adventure site can always be ignored: you pass through or stop without fighting.`,
 `You can pass through another player's space without stopping. Stopping there means attacking them.`,
 `Several effects reducing a terrain cost add up, never going below 0.`,
 `Forced Withdrawal: if you end your turn on an unsafe space (normally inaccessible terrain, unconquered fortified site, another Hero's space), you move back space by space and take one Wound per space.`,
 `Entering a City always costs 2, whatever its terrain.`],
 quiz:[
 {q:`A Dungeon is on your path. Can you cross its space without fighting there?`,o:[`Yes, an adventure site can be ignored`,`No, entering it triggers the combat`,`Yes, but paying 2 more points`],a:0,why:`Only unconquered fortified sites and rampaging enemies block or interrupt Movement.`},
 {q:`Thanks to an effect, you end your turn on a Lake and must move back 2 spaces to find a safe space.`,o:[`Nothing else happens`,`You take 2 Wounds`,`You lose 2 Reputation`],a:1,why:`Forced Withdrawal costs one Wound per space moved back.`}]},
{t:'Day and Night',h:'What Night changes',rules:[
 `Terrain: Forest costs 5 instead of 3, Desert 3 instead of 5.`,
 `Gold mana can't be used at Night, wherever it comes from. Black mana can't be used by Day.`,
 `Black isn't a wildcard: at Night, it is mainly used for the stronger effect of Spells.`,
 `By Day, the garrison of a Keep or a Mage Tower is revealed as soon as a player arrives on an adjacent space. At Night, it stays hidden until the assault.`,
 `A Ruins token placed at Night stays face down until a player enters the space, or until the next Day.`,
 `In a Dungeon, Night rules apply even in broad Day.`,
 `Crystals: a Crystal turns back into pure mana whenever you like; the reverse requires an effect. Three per colour at most: an extra Crystal gained from an effect becomes a simple Mana token, one from a Mine or a reward is lost.`],
 quiz:[
 {q:`It is Night. A card gave you a gold mana token. Can it pay for the stronger effect of a green card?`,o:[`Yes, gold replaces any colour`,`No, gold can't be used at Night`,`Yes, but only if it comes from a card`],a:1,why:`At Night, gold mana is useless, wherever it comes from.`},
 {q:`At Night, you stop next to a Keep whose token is face down.`,o:[`The token is revealed`,`It stays hidden, unless you assault`,`It is revealed then hidden again`],a:1,why:`Revealing by simple proximity only works by Day.`},
 {q:`How much does entering a Desert cost during a Night Round?`,o:[`2`,`3`,`5`],a:1,why:`Desert costs 5 by Day and 3 at Night. Forest does the opposite.`}]},
{t:'Spells',h:'Learning and casting Spells',rules:[
 `A Spell is a player card: it joins your Deck and is drawn like the others.`,
 `Even its basic effect costs one mana of its colour.`,
 `Stronger effect: one mana of its colour and one black mana. So it is only possible at Night, or in a Dungeon.`,
 `You only take one die from the Source per turn: if it is the black one, the other mana must come from a Crystal, a token or an effect.`,
 `Like any card, a Spell can be played sideways for 1 point.`,
 `Buying a Spell: at a conquered Mage Tower, for 7 Influence plus one mana of the Spell's colour. You can also gain them as rewards. It goes on top of your Deck, and the Offer is refilled from the top.`],
 quiz:[
 {q:`By Day, what must you pay for the basic effect of a red Spell?`,o:[`Nothing, like an Action card`,`A red mana`,`A red mana and a black mana`],a:1,why:`A Spell always requires one mana of its colour, even for its basic effect. Gold also works by Day.`},
 {q:`At Night, with no Crystal or token. The Source shows a black die and a blue die. Can you cast the stronger effect of a blue Spell?`,o:[`Yes, by taking both dice`,`No: only one Source die per turn`,`Yes, the black is enough`],a:1,why:`You need two manas and the Source only provides one per turn, unless an effect gives more.`},
 {q:`At a conquered Mage Tower, learning a green Spell costs…`,o:[`7 Influence`,`7 Influence and a green mana`,`6 Influence`],a:1,why:`7 Influence and one mana of the Spell's colour. Six points is the price of an Advanced Action at the Monastery.`}]},
{t:'Artifacts',h:'Artifacts and Banners',rules:[
 `Basic effect: the Artifact is played like a normal card, then goes to the discard pile.`,
 `Stronger effect: instead of paying mana, you destroy the Artifact. It is removed from the game.`,
 `It can also be played sideways for 1 point.`,
 `Artifacts are gained at the end of the turn: draw as many as you gained, plus one. Put one back under the deck, the others go on top of your Deck. There is never an Artifact Offer.`,
 `Banner: an Artifact you attach to a Unit, at any time during your turn. The Unit benefits from its basic effect. Only one Banner per Unit, and no stronger effect while it is attached.`,
 `If the Unit is destroyed or disbanded, the Banner goes to the discard pile. At the end of the Round, you leave it on the Unit or shuffle it into your Deck.`],
 quiz:[
 {q:`You gain an Artifact. How many cards do you draw from the Artifact deck?`,o:[`One`,`Two, and you keep one`,`Three, and you keep one`],a:1,why:`Always one more than the number gained, to leave a choice.`},
 {q:`You use an Artifact's stronger effect. Where does the card go?`,o:[`To your discard pile`,`It is removed from the game`,`Under the Artifact deck`],a:1,why:`The stronger effect destroys the Artifact.`},
 {q:`You disband a Unit carrying a Banner. The Banner…`,o:[`is removed from the game with the Unit`,`goes to your discard pile`,`returns to your hand`],a:1,why:`You will draw it again later, often in a following Round.`}]},
{t:'Levels',h:'Levels and Skills',rules:[
 `You gain a Level for each line crossed on the Fame track, at the end of the turn. The maximum is Level 10.`,
 `Odd level: the next Level token becomes visible (Armor or Hand Limit goes up) and you receive one more Command token.`,
 `Even level: a Skill and an Advanced Action. Reveal two tiles from your stack, keep one, place the other in the common Offer, then take the Advanced Action of your choice from the Offer.`,
 `Even-level variant: instead, take a Skill left by another player in the common Offer. Your two tiles go there, and you receive the Advanced Action from the bottom of the Offer.`,
 `Three kinds of Skills: usable once per turn; once per Round (the tile is flipped); interactive, once per Round, whose effect lasts until your next turn and affects the other players.`,
 `Any newly gained card goes on top of your Deck.`],
 quiz:[
 {q:`You reach Level 3. What do you gain?`,o:[`A Skill and an Advanced Action`,`A Command token and the next Level token`,`A Spell`],a:1,why:`Odd Levels improve Armor or Hand Limit and add a Command token.`},
 {q:`Level 4: you prefer the Skill another player left in the common Offer. Which Advanced Action do you receive?`,o:[`The one of your choice`,`The one at the bottom of the Offer`,`None`],a:1,why:`Taking someone else's Skill deprives you of the card choice.`}]},
{t:'Units',h:'Units in detail',rules:[
 `Two decks: Regular Units (silver back) and Elite Units (gold back). As soon as a Core tile is revealed, the Offer alternates Elite and Regular.`,
 `A Unit can only be recruited at a site whose icon appears on its card, for its Influence cost. The Units Offer is only refilled at the next Round.`,
 `With no free Command token, you must disband a Unit to recruit another. The recruit arrives Ready and can be used right away, but not to pay for its own recruitment.`,
 `Activating a Unit makes it Spent until the end of the Round. Some abilities also require a mana.`,
 `A Spent Unit can still absorb Damage. A Wounded Unit can neither act nor absorb.`,
 `Healing a Unit costs as many Healing points as its level, for each Wound.`,
 `Unit Resistant to the attack's type: it first absorbs its Armor without being Wounded. If Damage remains, it is Wounded and absorbs its Armor a second time. In any case, it only absorbs once per combat.`],
 quiz:[
 {q:`A Unit with Armor 4 and Physical Resistance absorbs a physical attack of 7.`,o:[`It isn't Wounded`,`It is Wounded and everything is absorbed`,`It is Wounded and 3 Damage remain`],a:1,why:`4 absorbed without a Wound, then it is Wounded and absorbs the remaining 3.`},
 {q:`The same Unit absorbs a physical attack of 4.`,o:[`Nothing happens: everything is absorbed without a Wound`,`It is Wounded`,`It is destroyed`],a:0,why:`The Armor is enough. However, it can't absorb any more during this combat.`},
 {q:`Healing a level 3 Unit with one Wound costs…`,o:[`1 Healing point`,`3 Healing points`,`3 Influence points`],a:1,why:`As many Healing points as the Unit's level.`}]},
{t:'Elements',h:'Fire, Ice and Resistances',lab:1,rules:[
 `Attacks and Blocks come in four types: physical, Fire, Ice and Cold Fire.`,
 `Blocking: against a physical attack, any Block is efficient. Against Fire, only Ice and Cold Fire. Against Ice, only Fire and Cold Fire. Against Cold Fire, only Cold Fire.`,
 `Inefficient Blocks are added up then halved, rounded down.`,
 `Enemy Resistance: your Attacks of that type are added up then halved, rounded down. Cold Fire is only reduced by an enemy resistant to both Fire and Ice.`,
 `A sideways card always gives one physical point, and never Ranged or Siege Attack.`,
 `An enemy resistant to Fire also ignores special effects, other than Attack and Block, of red cards and of Unit abilities paid with red mana. Same for Ice with blue.`,
 `A card's colour doesn't make the element: "Attack 4" on a red card is still physical.`],
 quiz:[
 {q:`An enemy makes an Ice Attack 5. You play Fire Block 3 and physical Block 4. Is it blocked?`,o:[`Yes: 3 + 2 = 5`,`No: 1 is missing`,`Yes: 3 + 4 = 7`],a:0,why:`Fire counts in full, physical for half: 3 + 2 = 5, just enough.`},
 {q:`Enemy with Armor 4, Physical and Ice Resistance. You have Fire Attack 2 and physical Attack 5.`,o:[`Defeated: 2 + 2 = 4`,`Insufficient: 3`,`Defeated: 7`],a:0,why:`Fire isn't reduced. Physical is halved, rounded down: 2.`}]},
{t:'Abilities',h:'Enemy abilities',rules:[
 `Fortified: during the Ranged and Siege phase, only Siege hits it. Defenders of a fortified site are always Fortified. A Fortified enemy defending a fortified site is untouchable in this phase.`,
 `Swift: its Attack is doubled, but only for Blocking.`,
 `Brutal: its Attack is doubled, but only for Damage.`,
 `Poison: each Wound taken into your hand adds another to your discard pile. A Unit Wounded by it receives two Wounds.`,
 `Paralyze: if your Hero takes its Damage, you discard all your non-Wound cards. A Unit that would be Wounded is destroyed.`,
 `Summon: in the Block phase, draw a brown token. It attacks instead of the summoner, then is discarded. Blocking it earns no Fame.`,
 `Knocked out: if in one combat you take as many Wounds as your unmodified Hand Limit, you discard all your other cards. Units and Skills remain usable.`],
 quiz:[
 {q:`An enemy with Attack 3 is Swift and Brutal. How much Block do you need, and how much Damage if it gets through?`,o:[`Block 6, Damage 6`,`Block 6, Damage 3`,`Block 3, Damage 6`],a:0,why:`Swift doubles the Attack for Blocking, Brutal doubles it for Damage.`},
 {q:`A Poison enemy deals 2 Wounds to your Hero. Result?`,o:[`2 Wounds in hand`,`2 in hand and 2 in the discard pile`,`4 in hand`],a:1,why:`Each Wound taken into your hand comes with a Wound placed in the discard pile.`},
 {q:`A Keep's garrison has the Fortified ability. You have Siege Attack 6 in the first phase.`,o:[`It is defeated if its Armor is 6 or less`,`Impossible: doubly Fortified, it is untouchable in this phase`,`Siege is halved`],a:1,why:`You'll have to wait for the Attack phase, where fortifications no longer count.`}]},
{t:'Several enemies',h:'Fighting several enemies',rules:[
 `One combat per turn, but it can include several enemies: a site with several tokens, rampaging enemies provoked by your Movement, adjacent rampaging enemies you challenge as well.`,
 `When entering an adventure site, you can't challenge anyone else. And never enemies and a player in the same combat.`,
 `Attacking: target one or more enemies and match the sum of their Armors. You can make several separate attacks in the same phase.`,
 `In a targeted group, a single Resistance reduces all your Attacks of that type, and a single Fortified forbids Ranged Attacks in the first phase. Splitting your attacks avoids these penalties.`,
 `Blocking: one enemy at a time, never a group Block.`,
 `Damage: each enemy neither defeated nor blocked strikes, in the order you choose.`,
 `During an assault, rampaging enemies joining in aren't Fortified, and you don't need to defeat them to conquer the site.`],
 quiz:[
 {q:`Two enemies: Armor 3 with Physical Resistance, and Armor 4 with no Resistance. You make a single physical Attack of 7 against both.`,o:[`Both are defeated`,`Neither: the attack drops to 3 against 7 Armor`,`Only the second is defeated`],a:1,why:`One enemy's Resistance reduces the whole group attack. Targeting only the second, 7 was more than enough.`},
 {q:`Two unblocked enemies, with Attack 3 and 4. Can you play a single Block of 7 against the group?`,o:[`Yes, their Attacks add up`,`No, each enemy is blocked separately`,`Yes, but only if they are the same type`],a:1,why:`Each Block targets a single enemy. Here you need a Block of 3 and another of 4.`}]},
{t:'Inhabited sites',h:'Villages, Monasteries, Keeps, Mage Towers',rules:[
 `Interaction: your Reputation modifies your Influence only once per turn, however many purchases you make. On the X space of the track, no more interaction.`,
 `Village: recruit, Healing at 3 Influence per point. Plunder: outside your turn, −1 Reputation and draw 2 cards. Only one plunder between two of your turns, and it isn't an action.`,
 `Monastery: recruit, Healing at 2 Influence per point, learn for 6 Influence the Advanced Action added to the Units Offer when the Monastery was revealed.`,
 `Burning a Monastery is an action: −3 Reputation, a purple enemy, and your Units refuse to take part. Victory: an Artifact, and the Monastery no longer exists.`,
 `Keep: grey garrison, Fortified, −1 Reputation per assault. Once conquered, it is yours: you recruit there, and by ending your turn in or next to it, your Limit increases by 1 per Keep you own. Failed assault: back to the space you came from.`,
 `Another player's Keep: it is also an assault. If they are absent, a grey token defends it and only earns half its Fame. If they are present, it is a Player versus Player combat.`,
 `Mage Tower: purple garrison, Fortified, −1 Reputation per assault. Reward: a Spell. Afterwards, everyone can recruit and buy Spells there.`],
 quiz:[
 {q:`You burn a Monastery with two Units by your side. Can they absorb the Damage?`,o:[`Yes`,`No, they don't take part in this combat`,`Yes, but they are destroyed`],a:1,why:`Your Units can neither be activated nor take Damage during this combat.`},
 {q:`You own 2 Keeps and end your turn next to one of them. Your Limit is 5. You draw up to…`,o:[`5 cards`,`6 cards`,`7 cards`],a:2,why:`+1 per Keep owned, wherever they are, provided you end in or next to one of them.`},
 {q:`Plundering a Village is…`,o:[`Your action for the turn, for −1 Reputation`,`Outside your turn: −1 Reputation and 2 cards drawn`,`A combat against a grey token`],a:1,why:`Plundering is decided after the end of your turn and sets up the next one.`}]},
{t:'Adventures',h:`Adventure sites and rampaging enemies`,rules:[
 `Entering an adventure site is the action for the turn. No Reputation to gain or lose. A conquered site gets your Shield token, and the reward arrives at the end of the turn.`,
 `Monster Den: one brown enemy. Reward: 2 Crystals rolled on the die (gold: colour of your choice; black: +1 Fame instead). If you fail, the enemy stays in place, face up.`,
 `Dungeon: one brown enemy, without your Units and with Night rules. Reward by die: gold or black gives a Spell, another colour an Artifact. If you fail, the token is discarded. A conquered Dungeon can be done again, for Fame only.`,
 `Ruins: a yellow token. Altar: pay 3 mana of the shown colour and gain 7 Fame. Or enemies guard a treasure: survivors stay in place, and the reward goes to whoever defeats the last one.`,
 `Spawning Grounds and Tomb: more dangerous cousins of the Monster Den and the Dungeon. The details are on their Description card.`,
 `Rampaging enemies: defeating them earns +1 Reputation per Orc Marauders and +2 per Draconum. Met in Ruins, they earn none.`],
 quiz:[
 {q:`You fail in a Dungeon. What happens to the Enemy token?`,o:[`It stays on the space, face up`,`It is discarded; a new one will be drawn next time`,`It becomes a rampaging enemy`],a:1,why:`It is in the Monster Den and the Ruins that undefeated enemies stay in place.`},
 {q:`You enter a Dungeon during a Day Round. Can the Source's gold die be used?`,o:[`Yes, it is Day`,`No, Night rules apply there`,`Yes, but it counts as black`],a:1,why:`On the other hand, black mana becomes usable there for a Spell's stronger effect.`},
 {q:`Monster Den reward: your two rolls give black and gold.`,o:[`Two Crystals of your choice`,`+1 Fame and a Crystal of the colour of your choice`,`Nothing`],a:1,why:`Black is worth 1 Fame, gold lets you choose the Crystal's colour.`}]},
{t:'Cities',h:'Besieging and ruling a City',rules:[
 `Entering an unconquered City triggers the assault: Fortified defenders, −1 Reputation. The City's level, set by the scenario, determines its defenders.`,
 `Defenders' bonus by colour. White: +1 Armor. Blue: +2 to Fire or Ice Attacks, +1 to Cold Fire Attacks. Red: physical attacks become Brutal. Green: physical attacks become Poison.`,
 `Each defender defeated lets you place a Shield token on the City card. When all are defeated, the City is conquered. Its Lord is the player with the most Shields; if tied, the one who placed first.`,
 `In a conquered City, any player can interact, with +1 Influence per Shield they placed there. Red: Artifacts for 12 Influence. Blue: Spells, as in a Mage Tower. White: any Unit, and 2 Influence to add an Elite to the Offer. Green: Advanced Actions for 6 Influence.`,
 `Ending your turn in or next to a conquered City where you have a Shield: Limit +1, or +2 for the Lord. This bonus doesn't add to the Keeps' bonus: you keep the best one.`,
 `No combat between players in a City.`,
 `Cooperative assault: from an adjacent space, a player offers neighbouring Heroes a split of the defenders. If all accept, each fights their share in turn, then skips their next turn.`],
 quiz:[
 {q:`Green City: a defender with physical Attack deals 1 Wound to your Hero. How many Wound cards do you receive in total?`,o:[`One`,`Two: one in hand, one in the discard pile`,`Three`],a:1,why:`In the Green City, the defenders' physical attacks are Poison.`},
 {q:`You have 2 Shields on a conquered City where you aren't the Lord. What bonuses do you get there?`,o:[`+2 Influence, Limit +1`,`+1 Influence, Limit +2`,`+2 Influence, Limit +2`],a:0,why:`+1 Influence per Shield. The Limit goes up by 1, or 2 for the Lord only.`}]},
{t:'Player versus Player',h:'Facing another Mage Knight',rules:[
 `Ending your Movement on another player's space means attacking them: it is your action for the turn. Forbidden on a Portal, in a City, and after the end of the Round has been announced.`,
 `The defender chooses. Full participation: they play their next turn now, with a Source die and Skills, then skip that turn. Partial participation: no die or Skills, but they keep their turn.`,
 `Two phases: Ranged and Siege (the defender attacks first), then Melee (the attacker first). Players alternate until both pass.`,
 `Here, a Block can be partial. In the Ranged phase, you need 2 Block points per Attack point. In Melee, 1 for 1.`,
 `The attacker assigns the Damage. To inflict a Wound on a Hero or a Unit, you need as much Damage as its Armor, double if the Unit is resistant.`,
 `In Melee, Damage can also steal an Artifact (5 Damage) or force the opponent to withdraw to an adjacent safe space, for its Move cost. In that case the combat ends and you win.`,
 `Winner's Fame: 1 point + 2 per Level of difference if they were a lower Level; 1 point at equal Level if they had less Fame; nothing otherwise. If nobody withdraws, the attacker returns to where they came from, with no winner.`],
 quiz:[
 {q:`Ranged phase: you are hit by a physical Ranged Attack of 4. You play Block 6. How much Damage gets through?`,o:[`None`,`1`,`4`],a:1,why:`In this phase, 2 Block points stop 1 Attack point: 6 Block stops 3.`},
 {q:`How much Damage must be assigned to inflict a Wound on a Hero with Armor 3?`,o:[`1 is enough`,`3`,`6`],a:1,why:`Against a player, you must reach the Armor. Against a regular enemy, the slightest Damage wounded.`}]},
{t:'Solo and scoring',h:'Scenarios, Dummy player and scoring',rules:[
 `Each scenario sets the board shape, the tiles, the City levels, the length and the end condition.`,
 `First Reconnaissance: 3 Rounds, +1 Fame per revealed tile, no Elite Units, and no entering the City. When the City tile is revealed, each player plays one last turn. In solo: 4 Rounds.`,
 `In solo and co-op, a Dummy player sets the pace. It gets a Deck of 16 Basic Action cards and 3 Crystals, and its Tactic only places it in the Turn Order.`,
 `Dummy's turn: it flips 3 cards from its Deck. If it owns Crystals of the last card's colour, it flips that many more. Empty deck: it announces the end of the Round.`,
 `At each new Round, the Advanced Action removed from the Offer joins its Deck, and it gains a Crystal of the colour of the removed Spell.`,
 `Score: your Fame, plus the Achievements on the Scoring card. Its first lines: 2 points per Spell or Artifact, 1 per Advanced Action, 1 per pair of Crystals, and each Unit's level (half if Wounded). The rest is on the card.`],
 quiz:[
 {q:`The Dummy flips 3 cards. The last one is green and it owns 2 green Crystals. How many extra cards does it flip?`,o:[`None`,`2`,`3`],a:1,why:`As many as Crystals of that colour. The colour of those extra cards no longer matters.`},
 {q:`First Reconnaissance: a player reveals the City tile. Then what?`,o:[`The game stops at once`,`Each player, them included, plays one last turn`,`The current Round is finished`],a:1,why:`If the Round ends during these last turns, the game stops at that point.`}]}
];
const LAB={ael:'fire',aval:5,b:{phys:0,fire:0,ice:0,cf:0},arm:5,res:{phys:false,fire:false,ice:false},k:{phys:0,fire:0,ice:0,cf:0}};
const ELN={phys:'physical',fire:'Fire',ice:'Ice',cf:'Cold Fire'};
const EFF={phys:['phys','fire','ice','cf'],fire:['ice','cf'],ice:['fire','cf'],cf:['cf']};
function labHtml(){const els=['phys','fire','ice','cf'];
  let good=0,bad=0;els.forEach(e=>{if(EFF[LAB.ael].includes(e))good+=LAB.b[e];else bad+=LAB.b[e]});const bt=good+Math.floor(bad/2);
  let ok=0,rs=0;els.forEach(e=>{const r=e==='cf'?LAB.res.fire&&LAB.res.ice:LAB.res[e];if(r)rs+=LAB.k[e];else ok+=LAB.k[e]});const at=ok+Math.floor(rs/2);
  const step=(key,val)=>`<span class="stepper"><button data-lab="${key}:-1" aria-label="minus">−</button><b>${val}</b><button data-lab="${key}:1" aria-label="plus">+</button></span>`;
  return `<div class="lab"><h3>Try it: Blocking</h3>
   <div class="row"><span>Enemy attack of type</span>${els.map(e=>`<button data-lab="ael:${e}" class="${LAB.ael===e?'on':''}">${ELN[e]}</button>`).join('')}<span>of value</span>${step('aval',LAB.aval)}</div>
   <div class="labgrid">${els.map(e=>`<div><span>Block ${ELN[e]} <small>${EFF[LAB.ael].includes(e)?'efficient':'half'}</small></span>${step('b.'+e,LAB.b[e])}</div>`).join('')}</div>
   <p class="verdict ${bt>=LAB.aval?'yes':'no'}">Efficient ${good} + inefficient ${bad} ÷ 2 = <b>${bt}</b> against ${LAB.aval} : ${bt>=LAB.aval?'attack blocked.':'the Block fails entirely.'}</p></div>
  <div class="lab"><h3>Try it: Attacking</h3>
   <div class="row"><span>Enemy with Armor</span>${step('arm',LAB.arm)}<span>resistant to</span>${['phys','fire','ice'].map(e=>`<button data-lab="res:${e}" class="${LAB.res[e]?'on':''}">${ELN[e]}</button>`).join('')}</div>
   <div class="labgrid">${els.map(e=>{const r=e==='cf'?LAB.res.fire&&LAB.res.ice:LAB.res[e];return `<div><span>Attack ${ELN[e]} <small>${r?'half':'full'}</small></span>${step('k.'+e,LAB.k[e])}</div>`}).join('')}</div>
   <p class="verdict ${at>=LAB.arm?'yes':'no'}">Full ${ok} + reduced ${rs} ÷ 2 = <b>${at}</b> against Armor ${LAB.arm} : ${at>=LAB.arm?'enemy defeated.':'attack has no effect.'}</p></div>`}
function labAct(v){const [k,x]=v.split(':');
  if(k==='ael')LAB.ael=x;else if(k==='res')LAB.res[x]=!LAB.res[x];
  else{const n=+x;if(k==='aval')LAB.aval=Math.max(1,Math.min(12,LAB.aval+n));else if(k==='arm')LAB.arm=Math.max(1,Math.min(12,LAB.arm+n));
    else{const [g,e]=k.split('.');LAB[g][e]=Math.max(0,Math.min(12,LAB[g][e]+n))}}
  render()}
/* ---------- Parcours : chapitres, cas pratiques, quiz ---------- */
const NEWT=[
{t:'Goal of the game',h:'Goal of the game and components',rules:[
 `You play a Mage Knight: you explore, fight and grow in power. The scenario sets the goal and the length; in competitive play, the player with the most Fame wins.`,
 `Your Hero starts with a Deck of 16 Basic Action cards, a hand of 5 cards, Armor 2 and a single Command token.`,
 `The board is built by exploring: first Countryside tiles (green back), then Core tiles (brown back), where the Cities are.`,
 `Two tracks follow you: Fame, which raises your Level, and Reputation, which weighs on your interactions.`,
 `The Source holds as many Mana dice as players, plus 2. At least half must show a basic colour, otherwise the gold and black dice are rerolled.`,
 `Three Offers are visible: Units (players + 2), Spells (3) and Advanced Actions (3). Artifacts are never offered.`,
 `Enemy tokens are sorted by back colour: each colour matches a type of site or opponent, and red and white are the most dangerous.`],
 quiz:[{q:`With two players, how many Mana dice go in the Source?`,o:[`2`,`4`,`6`],a:1,why:`The number of players plus 2.`},
 {q:`What does your Hero start the game with?`,o:[`5 cards in hand, Armor 2, one Command token`,`7 cards in hand, Armor 3, two Command tokens`,`5 cards in hand and a Unit`],a:0,why:`These are the values of the first Level token. Units are recruited during the game.`}]},
{t:'The cards',h:'Playing your cards',rules:[
 `An Action card has two effects: the top one, free, and the bottom one, stronger, which costs one mana of the card's colour.`,
 `Any card except a Wound can be played sideways: it is then worth 1 Move, 1 Influence, 1 Attack or 1 Block. Never Ranged Attack, Siege, or an element.`,
 `Effects of the same kind add up: play as many cards as you like.`,
 `A card is only used once per turn, for a single one of its effects.`,
 `At the end of the turn, played cards go to the discard pile. The others stay in hand, except those you choose to discard, then you draw up to your Hand Limit.`,
 `When the Deck is empty, the discard pile isn't reshuffled: you must wait for the end of the Round.`,
 `Discarding sends a card to your discard pile; destroying removes it from the game. "Any card" never means a Wound.`],
 quiz:[{q:`You need 3 Move points. You have March (Move 2, stronger 4), other cards, and no mana.`,o:[`Impossible without mana`,`March, plus another card sideways`,`March played twice`],a:1,why:`A sideways card adds 1 point. A card is only played once per turn.`},
 {q:`Can you play a card sideways to add 1 to a Ranged Attack?`,o:[`Yes`,`No, a sideways card only gives a normal physical Attack`,`Yes, but only a white card`],a:1,why:`Sideways cards help neither Ranged Attacks, nor Siege, nor elements.`}]},
{t:'Mana',h:'Mana and Crystals',rules:[
 `Four basic colours: red, blue, white, green. Two special colours: gold and black.`,
 `Mana comes in three forms: a Source die, a token, or a Crystal.`,
 `Source: only one die per turn. You take it when you use it, and it is rerolled at the end of your turn.`,
 `Token: given by an effect, it vanishes at the end of the turn if unused.`,
 `Crystal: it is kept in your Inventory, three per colour at most, and turns back into mana when you decide.`,
 `Gold mana replaces any basic colour, by Day only. Black mana is only used at Night. There are no gold or black Crystals.`,
 `A Crystal Mine gives a Crystal of its colour if you end your turn on it.`],
 quiz:[{q:`You have already taken a Source die this turn. Can you pay for a second stronger effect?`,o:[`No, only one mana per turn`,`Yes, with a Crystal or a token`,`Yes, by taking a second die`],a:1,why:`The limit only applies to Source dice.`},
 {q:`What happens to an unused Mana token at the end of the turn?`,o:[`It becomes a Crystal`,`It is lost`,`It goes back to the Source`],a:1,why:`Only an effect can turn mana into a Crystal.`}]},
{t:'Interaction',h:'Interaction and Reputation',rules:[
 `Interacting is your action for the turn. It is possible at an inhabited site: Village, Monastery, your own Keep, conquered Mage Tower, conquered City.`,
 `Add up the Influence from your cards, your sideways cards and your Units, then apply your Reputation modifier only once.`,
 `With that total, buy anything the site offers, in a single interaction.`,
 `Recruiting: the site's icon must appear on the Unit card, you pay its cost and you need a free Command token.`,
 `Healing: 3 Influence per Healing point at the Village, 2 at the Monastery.`,
 `Reputation goes up when you defeat rampaging enemies. It goes down with each assault (−1), each plunder (−1) and if you burn a Monastery (−3). On the X space, no more interaction.`],
 quiz:[{q:`Your Reputation gives you +1. You recruit two Units in the same interaction. How many times does the bonus count?`,o:[`Once`,`Twice`,`Never for recruiting`],a:0,why:`Reputation bonuses and penalties apply only once per turn.`},
 {q:`You have just recruited at the Village. Can you still move this turn?`,o:[`Yes, if you have points left`,`No, all Movement happens before the action`,`Yes, by one space`],a:1,why:`Interaction is the action for the turn, and no Movement follows the action.`}]},
{t:'Combat',h:'Combat in four phases',rules:[
 `Phase 1, Ranged and Siege: only these Attacks count. Defeating the enemy here spares you its counterattack.`,
 `Phase 2, Block: you must match or exceed the enemy Attack. It is all or nothing: a Block that is too weak reduces nothing.`,
 `Phase 3, Damage: an enemy neither defeated nor blocked deals Damage equal to its Attack.`,
 `Phase 4, Attack: all your Attacks count, including Ranged or Siege Attacks still available and sideways cards.`,
 `You must reach the enemy Armor in a single attack. Nothing carries over from one phase to the next or from one turn to the next.`,
 `A defeated enemy's Fame is scored immediately. Level only changes at the end of the turn.`,
 `Only one combat per turn, and no Healing during combat.`,
 `If you fail: a rampaging enemy stays on its space; after a failed assault, you fall back to the space you came from.`],
 quiz:[{q:`Enemy with Armor 5. You deal 3 in phase 1, then 3 in phase 4.`,o:[`It is defeated: 6 in total`,`It isn't defeated: each attack must reach 5 on its own`,`It is defeated in phase 4 only`],a:1,why:`Damage doesn't add up from one attack to the next.`},
 {q:`You play Block 3 against an Attack of 4.`,o:[`You only take 1 Damage`,`The Block fails: you take 4 Damage`,`The enemy is pushed back`],a:1,why:`Against an enemy, Block is all or nothing.`}]},
{t:'Wounds',h:'Wounds, Rest and Healing',rules:[
 `Unblocked Damage is assigned. A chosen Unit becomes Wounded and absorbs as much Damage as its Armor.`,
 `The rest goes to the Hero: one Wound card in hand per Armor step, rounded up. With Armor 2, 3 Damage makes 2 Wounds.`,
 `A Wound stays in hand: it can't be played, played sideways or discarded at the end of the turn.`,
 `Knocked out: if you receive in one combat as many Wounds as your unmodified Hand Limit, you discard all your other cards.`,
 `Standard Rest: discard one non-Wound card and as many Wounds as you like. Slow Recovery, with a hand of Wounds only: just one. These Wounds go to your discard pile and will come back.`,
 `Healing: each point permanently removes a Wound from your hand. Healing a Unit costs as many points as its level. Unused points are lost as soon as a combat starts.`,
 `The Magical Glade removes a Wound from your hand or discard pile at the end of the turn. It isn't Healing: it doesn't help Units.`],
 quiz:[{q:`7 Damage. Your Peasants (Armor 3) absorb first, your Hero (Armor 2) takes the rest.`,o:[`2 Wounds for the Hero`,`4 Wounds for the Hero`,`None: the Unit absorbs everything`],a:0,why:`7 − 3 = 4 Damage left, so 2 Wounds with Armor 2. The Peasants are Wounded.`},
 {q:`You discard a Wound while Resting. What happens to it?`,o:[`It is removed from the game`,`It will come back at the next shuffle of your Deck`,`It returns to your hand next turn`],a:1,why:`Only Healing, or the Magical Glade, gets rid of it for good.`}]},
{t:'Co-op',h:'Playing cooperatively',rules:[
 `In a cooperative scenario, all players win or lose together. There is no combat between players: you can't end your Movement on a partner's space.`,
 `A Dummy player sets the pace. It draws its Tactic at random before the players. At the end of each Round, the players remove from the game one of the Tactics they used.`,
 `Remove from the game the four interactive Spells (no. 17 to 20) and each Hero's interactive Skill.`,
 `Cooperative assault on a City: from an adjacent space, a player who hasn't taken an action yet invites adjacent Heroes and proposes how many defenders each will face, at least one per player.`,
 `If all accept, the tokens are shuffled and dealt unseen. The invited players flip their Turn Order token: they will skip their next turn. Each enters the City and fights their share, in turn.`,
 `The City falls if all its defenders are defeated. Otherwise, everyone falls back to their starting space.`,
 `Team score: the Fame of the player furthest behind, then the best player for each Achievement, then mission points: 10 per conquered City, 10 if each player is Lord of a City, 15 if all are taken, 30 per unused Round.`,
 `Blitz Cooperative Conquest, the short scenario: 4 Rounds, 1 Fame and 2 Reputation at the start, one more die in the Source and one more Unit in the Offer.`],
 quiz:[{q:`What is the basis of the team score?`,o:[`The Fame of the player furthest ahead`,`The Fame of the player furthest behind`,`The sum of all Fame`],a:1,why:`Leaving a partner behind therefore costs the whole team points.`},
 {q:`In co-op, who takes their Tactic card first?`,o:[`The player with the least Fame`,`The Dummy, at random`,`The player who announced the end of the Round`],a:1,why:`In solo it is the opposite: you choose first, then the Dummy draws from the remaining ones.`}]},
{t:'Glossary',h:'Glossary',glo:[
 ['Advanced Action','A card more powerful than the basic cards, gained at even Levels, at the Monastery or as a reward.'],
 ['Monster Den','Adventure site housing a brown monster.'],
 ['Armor','For the Hero: Damage absorbed by each Wound received. For an enemy: Attack value to reach to defeat it.'],
 ['Assault','Entering an unconquered fortified site. Triggers the combat and costs 1 Reputation.'],
 ['Knocked out','State of a Hero who receives in one combat as many Wounds as their Hand Limit: they discard their other cards.'],
 ['Banner','Artifact attached to a Unit.'],
 ['Wound','Unplayable card clogging your hand. Removed by Healing, discarded by Resting.'],
 ['Sideways card','Card played horizontally for 1 Move, 1 Influence, 1 Attack or 1 Block.'],
 ['Safe space','Space where you can end your turn: normally accessible, with no unconquered fortified site or other Hero.'],
 ['Command','Token needed to command a Unit. One more at each odd Level.'],
 ['Crystal','Mana kept in the Inventory, three per colour at most.'],
 ['Ready, Spent','States of a Unit: ready to act, or already activated until the end of the Round.'],
 ['Stronger effect','A card\'s second effect, paid for with mana.'],
 ['Rampaging enemy','Orc Marauders or Draconum placed on the board, which can be challenged from an adjacent space or provoked by moving along it.'],
 ['Dummy player','Fictional player in solo and co-op games, who moves the Round forward.'],
 ['Fortified','Enemy that only Siege Attacks can reach in the first phase.'],
 ['Fame','Points earned by defeating enemies. They raise your Level.'],
 ['Influence','Points spent during an interaction to recruit, heal or learn.'],
 ['Hand Limit','Number of cards you draw up to at the end of the turn.'],
 ['Round','A sequence of turns, by Day or by Night, closed when a player announces it.'],
 ['Offer','Visible cards you can acquire: Units, Spells, Advanced Actions.'],
 ['Block','Effect that cancels an enemy\'s Attack if it matches or exceeds it.'],
 ['Reputation','Track that adds or removes Influence at each interaction.'],
 ['Resistance','Halves Attacks of the relevant type. For a Unit: lets it absorb its Armor twice.'],
 ['Forced Withdrawal','Required retreat at the end of the turn from an unsafe space, one Wound per space.'],
 ['Lord','Player who placed the most Shield tokens on a conquered City.'],
 ['Siege','Attack usable in the first phase, even against a Fortified enemy.'],
 ['Spawning Grounds','Adventure site similar to the Monster Den, but more dangerous.'],
 ['Source','Common pool of Mana dice: one die per player per turn.'],
 ['Tactic','Card chosen each Round: its number sets the Turn Order.'],
 ['Poison, Paralyze, Swift, Brutal','Enemy abilities: see the Abilities chapter.']],quiz:[]}
];
/* ---------- Extensions : La Légion Oubliée, Les Ombres de Tezla ---------- */
NEWT.push(
{t:'Legion: sites',h:'The Lost Legion: new sites',rules:[
 `Wall: it lies between two spaces. Crossing it costs 1 more Move point, and this extra cost is never reduced. Effects that place you directly on a space ignore it.`,
 `Challenging a rampaging enemy, or attacking Volkare or another player, across a Wall: the target is Fortified. An assault on a fortified site across a Wall makes its defenders doubly Fortified.`,
 `Rampaging enemies never attack you across a Wall: ending a move on a space separated from them by a Wall doesn't provoke them.`,
 `Maze and Labyrinth: adventure sites. Entering is your action. Only one of your Ready Units can come with you. You pay 2, 4 or 6 Move points, with effects played for the occasion and not leftovers from your movement.`,
 `There you fight a brown enemy (Maze) or a red one (Labyrinth). Victory: the reward depends on the path paid for, and your Shield marks that path; you won't come back, but another player can take a free path. Defeat: the token is discarded.`,
 `Deep Mine: like a Mine, but you choose the Crystal's colour among those offered when you enter, before your combat rewards.`,
 `Refugee Camp: you can recruit any Unit in the Offer there. Normal cost for a Village Unit, +1 for a Keep, Mage Tower or Monastery Unit, +3 for a Unit only recruitable in a City.`,
 `Solo variant "Offer control": at the end of each Round, in addition to the bottom card, you may remove the middle card of the Spell and Advanced Action Offers.`],
 quiz:[{q:`You enter a Maze by paying 4 Move points. How many of your Units can take part?`,o:[`None`,`Just one, chosen on entering`,`All of them`],a:1,why:`One Ready Unit comes with you; the others can neither act nor absorb.`},
  {q:`At the Refugee Camp, a Monastery Unit costs 7. How much do you pay?`,o:[`7`,`8`,`10`],a:1,why:`+1 for a Keep, Mage Tower or Monastery Unit.`},
  {q:`Orcs are on the other side of a Wall. You move along their space without crossing it.`,o:[`They attack you`,`They aren't provoked`,`They attack, but are Fortified`],a:1,why:`A rampaging enemy never attacks across a Wall.`}]},
{t:'Legion: enemies',h:'The Lost Legion: new enemy abilities',rules:[
 `Multiple attacks: an enemy with several Attack values strikes several times. Each attack is blocked and absorbed separately, in the order you choose. It is only "blocked" if all its attacks are.`,
 `Elusive: two Armor values. The higher one applies in the Ranged and Siege phase. If you block all its attacks, the lower one applies in the Attack phase; otherwise the higher one stays until the end of the combat, even if you prevented it from attacking.`,
 `Assassination: its unblocked Damage all goes to the Hero, never to Units. Your Units can however help block it.`,
 `Heavy: in the Block phase, each Move point spent reduces its Attack by 1, for Blocking and for Damage. An Attack reduced to 0 is blocked. Move effects must be played during the combat.`,
 `Unfortified: it is never Fortified, neither in a fortified site nor across a Wall.`,
 `Arcane Immunity: only your Attack and Block effects affect it. Nothing can destroy it, reduce its Armor or prevent it from attacking. Its attacks, however, can be weakened.`,
 `Some tokens carry a Reputation modifier, gained or lost by defeating them, on top of Fame.`],
 quiz:[{q:`An Elusive enemy (Armor 3 / 6) attacks you. You prefer to take the hit without blocking. Which Armor must you beat in the Attack phase?`,o:[`3`,`6`,`9`],a:1,why:`The low value is only obtained by blocking all its attacks.`},
  {q:`An Assassin deals you 4 unblocked Damage. Can your Guardsmen absorb it?`,o:[`Yes`,`No, everything goes to the Hero`,`Yes, half of it`],a:1,why:`An Assassin's Damage is never assigned to a Unit.`},
  {q:`A Heavy enemy attacks at 8. You play 3 Move points during the Block. How much Block do you still need?`,o:[`8`,`5`,`3`],a:1,why:`Each Move point reduces its Attack by 1: 8 − 3 = 5.`}]},
{t:'Legion: Units',h:'The Lost Legion: new Units',rules:[
 `Thugs: if you recruit them during an interaction, your Reputation bonus or penalty is reversed for that whole interaction. They only absorb Damage if you pay 2 Influence during the combat.`,
 `Heroes (the Unit): recruiting them doubles your Reputation bonus or penalty for the interaction. During an assault on a fortified site, their abilities cost 2 Influence; they can still absorb damage.`,
 `You can't recruit Thugs and Heroes in the same interaction.`,
 `Delphana Masters: recruitable only by interaction. Once activated, they can use several of their abilities, each once, by paying their mana.`,
 `Familiers magiques : recrutables aussi dans une Clairière Magique, comme action et sans effet de Réputation. Il faut payer un mana fondamental, puis un Cristal au début de chaque Manche suivante, sinon ils quittent la partie.`,
 `Banner of Command: attached to a Unit, it replaces its Command token, so you control one more Unit. If the Unit loses the Banner, it leaves the game.`,
 `New Heroes: Wolfhawk (The Lost Legion), Krang and Braevalar (Shades of Tezla) play like the others. Some of Krang's Skills have a Reactivation effect: once per turn, a flipped tile can turn face up again under the condition shown on it, then be used again.`],
 quiz:[{q:`Your Reputation gives a penalty of 2. You recruit Thugs. What happens to this penalty?`,o:[`It stays at 2`,`It becomes a bonus of 2`,`It is doubled`],a:1,why:`Thugs reverse the Reputation effect for the whole interaction.`},
  {q:`You besiege a Keep with a Heroes Unit. Can they attack?`,o:[`Yes, normally`,`Yes, if you pay 2 Influence during the combat`,`Never`],a:1,why:`Without that Influence, they can only absorb damage.`}]},
{t:'Volkare',h:'The Lost Legion: facing Volkare',rules:[
 `Volkare replaces the Dummy player in his scenarios. His figure moves regardless of terrain, Walls and sites, and doesn't provoke rampaging enemies.`,
 `His army depends on the level set on his figure's base, from 4 to 15. Beyond that, set half the level and double the tokens.`,
 `Fighting him means facing all his tokens at once, in four ordinary phases. His troops aren't Fortified, except in a fortified site or across a Wall.`,
 `Before the combat, his die determines the attack he makes himself. It is always Brutal and Assassination: block it, or your Hero takes it alone.`,
 `Volkare can't be targeted and has Arcane Immunity. He is defeated when all his troops are; eliminating them all in the first phase avoids his attack.`,
 `If he attacks you, you choose: retreat for 2, 3 or 4 Wounds depending on whether it is the first, second or third Day/Night pair, or fight.`,
 `You can also assault him from an adjacent space, alone or together, without losing Reputation. If you don't defeat him, you return to your space.`],
 quiz:[{q:`Volkare rolls his attack on the die. Can you assign its Damage to a Unit?`,o:[`Yes`,`No: his attack has Assassination`,`Yes, if it resists the attack's type`],a:1,why:`All his attacks are Brutal and Assassination.`},
  {q:`How do you defeat Volkare?`,o:[`By beating his token's Armor`,`By eliminating all his troops`,`By blocking him twice`],a:1,why:`He can't be targeted.`}]},
{t:'Tezla: Factions',h:'Shades of Tezla: Factions and new abilities',rules:[
 `Two Factions: the Elementalists and the Dark Crusaders. Their green, brown and red tokens carry their Faction's symbol. Some scenarios ask you to sort them into separate piles.`,
 `Random Faction: roll a mana die. Gold, green or white: Elementalists. Black, blue or red: Dark Crusaders.`,
 `Faction token: defeating a Faction enemy earns a minor item from that Faction's pile. It is used during your turn, only one of the same name per turn, then discarded. During an interaction, it can be discarded for 1 Fame or 3 Influence. Unused, it is worth 1 Fame at the end of the game.`,
 `Defend: the first enemy you attack adds the Defend value to its Armor until the end of the combat. With several defenders, each Defend protects a different token. A defender defeated before being used protects nobody.`,
 `Vampiric: its Armor increases by 1, for the whole combat, per Unit it wounds and per Wound its attack puts in your hand.`,
 `Ambush: the rampaging enemy attacks you up to 2 spaces away. You provoke it by moving from a space 1 or 2 spaces from it to another space 1 or 2 spaces from it. The destination must be adjacent, or the space in between must be revealed, with no lake or mountain, and no Wall separating you. To challenge it, you must always be adjacent.`,
 `Pursuit: when the pursued Hero has finished their Movement, the token moves one space towards them, lakes and mountains included. If it was already adjacent, it attacks: that is your action for the turn, even if you wanted to Rest. It doesn't attack a Hero at an interaction site or in a fortified site it isn't besieging.`],
 quiz:[{q:`Protectors (Armor 4, Defend 2) are alone. What Attack do you need?`,o:[`4`,`6`,`8`],a:1,why:`Alone, they protect themselves: 4 + 2.`},
  {q:`A Vampiric enemy with Armor 5 deals you 2 Wounds. What is its Armor in the Attack phase?`,o:[`5`,`6`,`7`],a:2,why:`+1 per Wound added to your hand.`},
  {q:`Your Faction die shows blue.`,o:[`Elementalists`,`Dark Crusaders`,`Reroll`],a:1,why:`Black, blue or red mean the Dark Crusaders.`}]},
{t:'Tezla: Leaders',h:'Shades of Tezla: sites and Faction Leaders',rules:[
 `Forgotten Valley: works like a Magical Glade; entering it costs 2.`,
 `Necropolis and Graveyards: Night rules apply there in broad Day, and starting your turn on one at Night gives a black mana token. The Necropolis costs 2; a Graveyard costs the terrain it covers.`,
 `Faction Leader: a large token with levels. Its starting level, set by the scenario, gives its Armor, its Attack and the number of its Faction's tokens accompanying it. It has Arcane Immunity.`,
 `Attacking it: all your Attacks against it form a single attack. If it matches its Armor, place a Shield on its current level; each multiple of its Armor removes one more level.`,
 `It attacks like any enemy, based on its level at the start of the combat. Its marker only drops at the end of the combat, down to the first row without a Shield. A Shield on level 1: it is defeated.`,
 `Its companions don't come back when its level drops. Defeating it earns the Fame shown, but no Faction token.`,
 `With several players, it is assaulted like a City: enemies are split, each enters their space and fights their share, and all suffer its attack.`,
 `High-level start: the Hero begins with their Skills and Command tokens, 2 Crystals, one free Advanced Action per odd level beyond the first, and 6 Influence per level to buy from drawn cards (Advanced Action 6, Unit at its cost, Spell 9 or 7 plus a Crystal of its colour, Artifact 12, Crystal 3).`],
 quiz:[{q:`A Leader has Armor 5. Your single attack is worth 11. By how many levels does it drop?`,o:[`1`,`2`,`3`],a:1,why:`One level per multiple of its Armor: 10 is enough for two, 15 for three.`},
  {q:`You remove a level from the Leader in the Ranged phase. With which values does it attack in the Block phase?`,o:[`Those of the new level`,`Those of the level at the start of the combat`,`It no longer attacks`],a:1,why:`The marker only moves at the end of the combat.`}]}
);

const TP=n=>TOPICS.concat(NEWT).find(x=>x.t===n);
const PARTS=[['The basics',['Goal of the game','The cards','Mana','The turn','Move','Interaction','Combat','Wounds']],
 ['Progress',['Levels','The Round','Day and Night','Units']],
 ['Advanced combat',['Elements','Abilities','Several enemies','Spells','Artifacts']],
 ['The world',['Inhabited sites','Adventures','Cities']],
 ['Multiplayer and solo',['Player versus Player','Co-op','Solo and scoring']],
 ['Expansions',['Legion: sites','Legion: enemies','Legion: Units','Volkare','Tezla: Factions','Tezla: Leaders']],
 ['Appendix',['Glossary']]];
const COURSE=[];PARTS.forEach(([p,l])=>l.forEach(n=>{const t=TP(n);t.part=p;COURSE.push(t)}));
TP('Move').rules.unshift(`Entering a space costs Move points depending on its terrain; the table is in the Reference tab. Unspent points are lost at the end of the turn.`);