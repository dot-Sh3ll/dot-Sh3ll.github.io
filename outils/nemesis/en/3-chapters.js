
/* ---------- chapters (English) ----------
   Written from the French app chapter by chapter, with the terms of the English rulebook.
   rules: one rule per line. html: free block. lab: interactive lab (see LABS). cas: hands-on cases. quiz: check. a: index of the right answer. */
const CH=[
/* ======================= DISCOVER ======================= */
{id:'but',part:'Discover',t:'The goal of the game',
lead:`You are a Marine sent into an infested alien Facility. The squad shares a Mission Task, but everyone also has their own agenda. Nemesis: Retaliation is <b>semi-cooperative</b>: there may be several winners, or none.`,
rules:[
`The game is for 1 to 5 players. It is not a cooperative game: each Character fights for their own agenda, even if helping each other is often vital.`,
`To win, you must meet <b>three conditions</b>: <b>1.</b> escape the Facility or hibernate; <b>2.</b> fulfil one of your Objectives; <b>3.</b> survive the end-of-game Infection and hatching procedures.`,
`There are three ways to end the game in safety: leave with the <b>Lander</b> from the Landing Zone, <b>hibernate</b> in a pod of the Hibernatorium, or leave with the <b>Escape Shuttle</b>.`,
`Each player gets <b>2 secret Objectives</b>: a <b>Private Objective</b>, specific to their Character, and a <b>Mission Objective</b>, linked to the shared <b>Mission Task</b> card. During the game, you choose one of them, which you will have to fulfil.`,
`The game ends at the <b>end of Round 14</b> (anyone who has not escaped or hibernated is left for dead), or as soon as <b>every Character</b> is dead, escaped or hibernating.`,
`The Intruders in this game are called the <b>Primebloods</b>. "Intruder" means every alien race of the Nemesis universe: the rules always say "Intruder".`],
quiz:[
{q:`You fulfilled your Objective and are alive at the end of Round 14, but still inside the Facility. Did you win?`,o:[`Yes, the Objective is enough`,`No: at the end of Round 14, anyone who has not escaped or hibernated is left for dead`,`Yes, if the Queen is dead`],a:1,w:`You <b>also</b> need to have escaped or hibernated. The three conditions all apply.`},
{q:`How many players can win the same game?`,o:[`Only one`,`Everyone who meets the three conditions`,`The whole squad, or no one`],a:1,w:`Several winners are possible: each player wins if they meet their three conditions.`},
{q:`What are the three ways to end the game in safety?`,o:[`Lander, Hibernatorium, Escape Shuttle`,`Lander, Surgery Room, Shelter`,`Kill the Queen, destroy the Nest, Autodestruction`],a:0,w:`The Lander (Landing Zone), a pod of the Hibernatorium, or the Escape Shuttle (Section C).`}]},

{id:'mep-complexe',part:'Discover',t:'Setting up the Facility',
lead:`Game setup can be done in advance. It prepares the Facility, the Intruders and the supplies. Follow the steps in order.`,
rules:[
`<b>Board:</b> assemble the 3 Section border pieces and the 3 Round track pieces. Place the <b>Undiscovered Hibernatorium</b> tile on the Hibernatorium slot: until a Character reaches it, it counts as absent (no Noise markers in its Corridors, the Robot cannot be activated).`,
`<b>Round track:</b> the marker on the 1st space, the <b>Lander</b> token on the <b>10th space</b>, the <b>Autodestruction</b> token on its space above the track. A Universal marker on the top space of the <b>Objective Choice</b> track.`,
`<b>Systems:</b> the 3 Life Support tokens and the Hibernatorium token <b>inactive</b> side up. A random Robot card, face down, on the Robot slot of Section A (the others go back to the box), with 1 Ammo token (full side) and 1 Oxygen token next to it. The Robot miniature goes in the Hibernatorium.`,
`<b>Anti-Aircraft and Nest:</b> the 2 Anti-Aircraft tokens shuffled, face down, stacked on the Anti-Aircraft slot of Section B. 5 <b>Egg</b> tokens on the Nest slot (Section C).`,
`<b>Landing Zone:</b> 4 Ammo tokens (full side), 4 Grenades, 4 Oxygen and 4 Medpacks on its slots.`,
`<b>Corridors and Rooms:</b> shuffle the Corridor tiles in a tray, "0" side up, so you draw them without seeing their number. Connect <b>3 random Corridors</b> to the Landing Zone, non-Reinforced side up (Door slot facing the Landing Zone). Sort the Room tiles by their back into 4 shuffled piles: A, B, C and "?".`,
`<b>Intruders:</b> shuffle the Exploration deck. Sort the Intruder tokens into piles by type. Put in the <b>Intruder bag</b>: <b>1 Blank token, 2 Larvae, 3 Adults, plus 1 Adult per Character</b>. Shuffle the Attack and Event decks, and the 12 Queen Health cards (number side down) on Section C, with a Universal marker on the 0 space of the Queen's Hit track. The Intruder Help sheet goes <b>"The Queen is alive"</b> side up.`,
`<b>The rest:</b> the 3 Item decks (red, green, yellow), the Contamination deck and the Serious Wound deck, each shuffled face down. The tray of Noise, Fire and Malfunction markers, Door tokens, Secure tokens, Tactical Gear tokens and Universal markers, the 6 dice and the Scanner within reach.`],
html:`<div class="note"><b>Deadly mode.</b> Some Corridors show a second, smaller number: it is only used in Deadly mode (see the last chapter).</div>`,
quiz:[
{q:`How many Adult tokens go into the Intruder bag with 4 players?`,o:[`3`,`4`,`7`,`8`],a:2,w:`3 base Adults + 1 per Character, so 7 (plus 1 Blank token and 2 Larvae).`},
{q:`Where does the Lander token start?`,o:[`On the Landing Zone`,`On the 10th space of the Round track`,`On the last space of the Round track`],a:1,w:`When the Round track reaches the 10th space, the Lander tries to land.`},
{q:`What state do the Life Support systems start in?`,o:[`Active`,`Inactive`,`Random`],a:1,w:`All 3 Life Support tokens and the Hibernatorium start inactive: without active Life Support, you lose Oxygen every Turn.`}]},

{id:'mep-joueurs',part:'Discover',t:'Player setup',
lead:`Every player must be at the table: each one gets a number, Objectives, a Character and gear.`,
rules:[
`<b>Numbers:</b> take the help cards matching the number of players (1 to 3 with three players, etc.), shuffle them and deal one to each player. The number is used to choose Characters and for some Objectives, not for Turn order.`,
`<b>Objectives:</b> split the Private Objectives and the Mission Objectives. In both decks and in the Mission Task deck, remove the cards showing more Characters than there are players. Deal <b>1 Private Objective and 1 Mission Objective</b> to each player at random, face down. Draw <b>1 Mission Task</b>, face up, on the lower Round track piece.`,
`Never show your Objectives. You may talk about them, but you never have to tell the truth. They are revealed only at the end.`,
`<b>Characters:</b> player 1 gets 2 Role cards, picks one in secret, then reveals it; the other goes back into the deck. Continue in increasing number order.`,
`<b>Your board:</b> the Character tile on the Character board, a Universal marker on the leftmost space of the Health track, the Oxygen counter on <b>7</b>, your miniature (with its coloured ring) in the <b>Landing Zone</b>, the numbered Backpack card holder above the board, your 10 Action cards shuffled on the left (discard pile on the right).`,
`<b>Character Item:</b> a Heavy Item goes in a Hand slot, an Armor goes on the <b>Heavily Injured</b> section of the Health track. One Ammo token (full side) on each Ammo slot. The Mercenary starts with 2 Character Items.`,
`<b>Support Equipment</b> (except the Mercenary): reveal 7 cards; from the highest number to the lowest, each player picks 1. Fill their Tactical Gear slots. Unpicked cards are removed from the game; the rest of the deck stays next to the Items.`,
`<b>Tactical Belt:</b> each player picks <b>4 Tactical Gear tokens</b> from the supply (if there is a conflict, by decreasing number). For your first game, take 1 token of each type.`,
`<b>Start:</b> each player draws 5 Action cards. Player 1 takes the Starting Player token and begins.`],
cas:[
{q:`With 3 players, an Objective card shows "4 Characters". What do you do?`,o:[`Keep it, it is just harder`,`Remove it before dealing`,`Give it to player 1`],a:1,w:`Any Objective or Mission Task card showing more Characters than there are players is removed before dealing.`}],
quiz:[
{q:`Who picks their Support Equipment first?`,o:[`Player 1`,`The player with the highest number`,`The Starting Player`],a:1,w:`Support Equipment is picked in decreasing number order. The Mercenary does not take part.`},
{q:`What is the Oxygen counter set to at the start?`,o:[`5`,`7`,`10`],a:1,w:`7, the maximum. Your supply can never go above 7.`}]},

{id:'manche',part:'Discover',t:'A Round in 4 phases',
lead:`The game is played in Rounds (14 at most). Each Round has four phases: Player, Intruder, Event and Cleanup.`,
rules:[
`<b>Player Phase:</b> starting with the Starting Player, clockwise, each player takes a Turn: <b>1.</b> perform 2 Actions; <b>2.</b> Oxygen loss if the Life Support of their Section is inactive; <b>3.</b> Fire damage if they are in a Room with Fire. Turns go round until <b>everyone has Passed</b>.`,
`<b>Intruder Phase:</b> <b>1.</b> each Intruder in a Room with Fire receives 1 Hit (and a burning Nest loses 1 Egg); <b>2.</b> Intruders Attack the Characters in their Room.`,
`<b>Event Phase:</b> <b>3.</b> draw and resolve an Event card (Intruders move, then main effect, then secondary effect); <b>4.</b> draw a token from the Intruder bag: the colony develops.`,
`<b>Cleanup Phase:</b> <b>5.</b> the Starting Player token passes to the left of this Round's Starting Player; <b>6.</b> everyone draws back up to 5 cards; <b>7.</b> the Round track moves forward one space.`,
`If the Round track reaches the <b>Lander</b> token, the Lander tries to land. If it reaches the <b>Autodestruction</b> token, the Facility explodes. If it is already on the last space, the game ends.`,
`<b>Turn order as tiebreaker:</b> when the rules break a tie between players, priority goes to the holder of the Starting Player token, or else the closest player clockwise from them.`],
html:`<div class="ex"><b>Event effects.</b> Effects on Characters are resolved in Turn order. Effects on Noise markers in Corridors are resolved from the top-left Corridor of the Facility, row by row. If an effect is impossible, ignore it and resolve the rest.</div>`,
quiz:[
{q:`When do you lose Oxygen because of inactive Life Support?`,o:[`During the Cleanup Phase`,`At the end of each of your Turns, even when you Pass`,`Once per Round, at the start of the Player Phase`],a:1,w:`It is step 2 of your Turn: every Turn (even one where you Pass), if your Section's Life Support is inactive, you lose 1 Oxygen.`},
{q:`In what order is the Event Phase played?`,o:[`Intruder bag, then Event card`,`Event card, then Intruder bag`,`Attacks, then Event card`],a:1,w:`First the Event card (movement, main effect, secondary effect), then the draw from the Intruder bag.`},
{q:`How many cards do you have in hand after the Cleanup Phase?`,o:[`5`,`What you had left + 2`,`10`],a:0,w:`Each player draws back up to 5 cards (unless an exception applies).`}]},

/* ======================= YOUR TURN ======================= */
{id:'actions',part:'Your Turn',t:'Actions',
lead:`On your Turn, you perform 2 Actions from those on your Character board. Most of them are paid for by discarding Action cards.`,
rules:[
`You <b>must</b> perform 2 Actions. You may perform the same one twice. If you cannot perform any other Action, you must perform the <b>Pass</b> Action.`,
`<b>Cost 0:</b> Play an Action card; Pass.`,
`<b>Cost 1 card:</b> Make a Move; Place 1 Secure token ✖; Fire a Shot in a Room; Fire a Burst at a Corridor; Perform a Melee Attack; Use an Item; Activate the Robot ✖; Trade ✖; Use any Tactical Gear.`,
`<b>Cost 2 cards:</b> Use the Room ✖; Make a Move Cautiously ✖.`,
`Actions marked ✖ are <b>Not in Combat</b> Actions: you cannot perform them while you are <b>in Combat</b>, that is, in a Room with at least 1 Intruder.`,
`To pay, discard the required number of cards face up: their effects are <b>not</b> resolved. Then resolve the Action.`,
`<b>Pass</b> is an Action: you do not Pass automatically when you run out of cards. When you Pass, you may discard any number of Action and Contamination cards from your hand. Then your Turn is skipped until the end of the Round, but you can still play Reactions.`,
`After your 2 Actions: <b>Oxygen loss</b> (your Section's Life Support inactive: −1 Oxygen) then <b>Fire damage</b> (Room with Fire: −1 Health).`],
cas:[
{q:`You have 1 Action card left and are alone in an empty Room. You want to Move Cautiously. Can you?`,o:[`Yes`,`No: it costs 2 cards`,`Yes, by also discarding a Contamination card`],a:1,w:`Moving Cautiously costs 2 Action cards, and Contamination cards cannot be used to pay.`},
{q:`An Adult is in your Room. Can you Use the Room?`,o:[`Yes`,`No: Use the Room is a Not in Combat Action`,`Yes, if you pay 3 cards`],a:1,w:`A Room with at least 1 Intruder puts you in Combat: Not in Combat Actions (Use the Room, Move Cautiously, Secure, Robot, Trade) are forbidden.`}],
quiz:[
{q:`What does Fire a Burst at a Corridor cost?`,o:[`0 cards`,`1 card`,`2 cards`],a:1,w:`1 Action card (and the Burst also spends Ammo).`},
{q:`You have no cards left and one Action to go. What happens?`,o:[`You Pass automatically`,`You must perform the Pass Action (unless a 0-card Action is possible)`,`You draw a card`],a:1,w:`Pass is an Action that you must perform; it costs nothing.`}]},

{id:'cartes',part:'Your Turn',t:'Action cards, Objective and Golden Rules',
lead:`Your 10 Action cards are both your currency and your special effects. Your Turn is also when you choose your Objective.`,
rules:[
`<b>Play an Action card</b> (cost 0): reveal it, resolve its effect, discard it. The <b>Not in Combat</b> icon on a card forbids playing it in a Room with an Intruder.`,
`<b>Reactions:</b> some cards have a Reaction effect, playable at any time, even outside your Turn, if its conditions are met. It is not an Action.`,
`<b>Commands:</b> some effects let you act with another Character, even one who has Passed. Forbidden if it would cause an Opportunity Attack (leaving a Room with Intruders, going through an infested Corridor).`,
`<b>Effects:</b> you may only choose an effect you can resolve completely. Example: "Duck and Cover" asks you to discard 1 more card; without it, you cannot play it.`,
`<b>Choose an Objective</b>, once per game, on your Turn, before or after your 2 Actions (not in between): keep 1 Objective card, remove the other from the game without showing it. It is not an Action.`,
`The first player to choose draws <b>3</b> Action cards, the 2nd and 3rd draw <b>2</b>, the 4th and 5th draw <b>1</b>: the marker on the Objective Choice track moves down one space with each choice. The longer you wait, the fewer cards you draw.`,
`Empty deck: shuffle your discard pile to make a new one, in any phase.`,
`<b>Golden Rules.</b> <b>Nightmare Rule:</b> when in doubt, resolve the situation in the worst possible way for the players, then for the first Character in Turn order. <b>Local effects:</b> an effect without a clear target applies in the Room of the Character who triggered it (or to what they carry). <b>Component limits:</b> components are limited unless stated otherwise (no Ammo token if they are all taken).`],
cas:[
{q:`Two players have already chosen their Objective. You choose yours at the start of your Turn. How many cards do you draw?`,o:[`3`,`2`,`1`],a:1,w:`You are the 3rd to choose: 2 cards (3 for the 1st, 2 for the 2nd and 3rd, 1 for the 4th and 5th).`}],
quiz:[
{q:`Can you choose your Objective between your two Actions?`,o:[`Yes`,`No: before or after your 2 Actions`,`Only when you Pass`],a:1,w:`Before or after your 2 Actions, never in the middle. It is not an Action.`},
{q:`An effect lets you discard a Malfunction marker without saying where. Where can you take it from?`,o:[`Anywhere in the Facility`,`Your Room, or an object you carry`,`Only your Weapon`],a:1,w:`Golden Rule of local effects: the Room of the Character triggering the effect, including what they carry.`},
{q:`Can you command a Character to leave a Room containing an Intruder?`,o:[`Yes`,`No: it would cause an Opportunity Attack`,`Yes, if they have Passed`],a:1,w:`A Command can never cause an Intruder Opportunity Attack.`}]},

{id:'sante',part:'Your Turn',t:'Health, Serious Wounds and Armor',
lead:`Your Health track reads from left to right. The further the marker goes, the worse off you are, and some Attacks become deadly.`,
rules:[
`The track has 3 states: <b>Healthy</b>, <b>Injured</b>, <b>Heavily Injured</b>. Intruder Attacks often refer to the state your marker is in.`,
`Losing Health moves the marker <b>right</b>; regaining Health moves it <b>left</b>. You may choose to regain less than allowed.`,
`If the marker reaches the space with a <b>skull</b>, your Character dies: their miniature and all their Items are removed, and you can no longer win.`,
`<b>Serious Wound:</b> draw a card at random and place it on the leftmost free section. It imposes a handicap and lowers your maximum Health: the marker can never go on a covered space. If it covers the marker's space, the marker immediately moves to the first space of the next section.`,
`Two identical Serious Wounds do not stack their effects. To discard one, you need an Item or a Room (Surgery Room, Infirmary); you choose which, and the others slide one section left. The marker does not move.`,
`<b>Armor:</b> it goes on the Heavily Injured section. When the marker reaches that section, the Armor is destroyed <b>instead of</b> losing 1 Health point, then you apply the rest of the damage. One Armor at a time; it never goes in the Backpack. If your marker is already Heavily Injured, you cannot equip a new one: discard it.`],
cas:[
{q:`Your marker is on the last space of the Injured section. You wear Armor and lose 2 Health. What happens?`,o:[`You lose 2 points, the Armor stays`,`The Armor is destroyed instead of the 1st point, then the marker moves 1`,`The Armor absorbs both points`],a:1,w:`When you enter the Armor's section, you discard it instead of losing that point, then apply the rest: the marker moves one space.`}],
quiz:[
{q:`A Serious Wound covers your marker's space. Where does the marker go?`,o:[`It stays underneath`,`To the first space of the next section`,`To the previous free space`],a:1,w:`It immediately moves to the first space of the next section, which may make you discard Armor.`},
{q:`Does discarding a Serious Wound restore Health?`,o:[`Yes, 1 point`,`No, the marker does not move`,`Yes, up to the start of the section`],a:1,w:`The remaining Wounds slide left, but the marker does not move.`}]},

{id:'ceinture',part:'Your Turn',t:'Oxygen and Tactical Gear',
lead:`The Facility's air cannot be breathed without Life Support. Your Oxygen supply runs down, and your Tactical Gear tokens are your survival resources.`,
rules:[
`<b>Oxygen:</b> at the end of each of your Turns (even when you Pass), if your Section's Life Support is inactive, lose 1 Oxygen. Active Life Support stops the loss but does <b>not refill</b> your supply.`,
`You cannot perform an Action that would take your counter below 0. If the counter would fall below 0 (through loss), you get a <b>Suffocating token</b>, set the counter to 0 and follow the token: you have <b>one Turn</b> to find Oxygen, or you die.`,
`<b>Tactical Belt:</b> 4 slots, to the left of your board, each for 1 token. Weapons and Items also have Tactical Gear slots: their colour says which token they take; <b>grey</b> slots (including the Belt's) take anything.`,
`<b>Use any Tactical Gear</b> is an Action (1 card): use as many tokens as you like and discard them (except Ammo placed in your Weapons). You may also rearrange your tokens between slots, except from one Weapon to another.`,
`<b>Ammo:</b> a token has 2 charges (full, then half). Using it reloads a Weapon: it moves from the Belt to the Weapon's slot. "Spending" Ammo: a full token is flipped, a half token is discarded.`,
`<b>Oxygen:</b> +3 Oxygen, up to 7. <b>Medpack:</b> +2 Health. <b>Grenade:</b> choose an adjacent Corridor, roll the Burst die and add 2: that many Hits in that Corridor. It is not a Burst (Weapon effects do not apply).`,
`An Item you find comes with its Tactical Gear slots filled. You may discard Items and tokens at any time.`],
cas:[
{q:`You are in a Section with active Life Support, with 2 Oxygen. How much will you have at the end of your Turn?`,o:[`2`,`3`,`7`],a:0,w:`Active Life Support stops you from losing Oxygen, but gives none back. To go up, you need an Oxygen token or an Item.`},
{q:`You throw a Grenade and roll 3 on the Burst die. How many Hits?`,o:[`3`,`5`,`6`],a:1,w:`Result + 2: 5 Hits in the chosen Corridor.`}],
quiz:[
{q:`How many tokens can you use with a single Use any Tactical Gear Action?`,o:[`1`,`2`,`As many as you like`],a:2,w:`One Action, as many tokens as you like.`}]},

/* ======================= THE FACILITY ======================= */
{id:'plateau',part:'The Facility',t:'Sections, Rooms, Corridors and Doors',
lead:`The Facility is split into 3 Sections: A (the entrance), B (the middle) and C (the most dangerous). Characters move from Room to Room; Intruders occupy Rooms and Corridors.`,
rules:[
`Each Section has <b>Life Support</b> (active or inactive), changed from its control Room, and Rooms of its own (marked A, B or C). "?" Rooms are random: they will not all be in play.`,
`No Room or Corridor may go beyond the limits formed by the border pieces.`,
`A Room tile shows: name, effect, <b>Item icons</b> (for Searching), a <b>Computer</b> icon (Room reachable remotely by some effects), type and reference number (for tiebreaks), and sometimes a "never Secured" or "never Malfunctions" icon.`,
`A Corridor connected to a Room is always <b>adjacent</b> to it, whatever is on it. A Corridor on the border of 2 Sections is in both. A Corridor connected to a single Room is <b>Unexplored</b>; a Corridor with no Intruder is <b>empty</b> (even with a Noise marker).`,
`A Corridor holds: <b>the Queen and up to 2 other Intruders</b>, <b>or</b> up to <b>6</b> Adults, Drones and Larvae, <b>or</b> <b>1 Noise marker</b>. An Intruder entering a Corridor with a Noise marker discards it; a Noise marker is never placed where an Intruder is.`,
`<b>Reinforced Corridor:</b> discard its Noise marker and flip it: its Noise value becomes 0, no Noise roll ever places a marker there, but Intruders can still move through. The Hibernatorium's Corridors can never be Reinforced.`,
`<b>Doors:</b> a Door slot = an open Door. Closed, it gets a Door token; destroyed, the token is laid down: it stays open for good. A closed Door blocks everything on the other side (except Noise markers): no Movement or Burst through it, and Fire does not spread. Intruders that must pass through <b>destroy</b> it instead of moving.`,
`An effect sending you "anywhere in the Facility" ignores closed Doors (you go through a vent).`],
quiz:[
{q:`How many Adult Intruders can a Corridor hold at most?`,o:[`3`,`4`,`6`],a:2,w:`6 in total (Adults, Drones, Larvae). The Queen counts as 4.`},
{q:`A Corridor contains a Noise marker. Is it "empty"?`,o:[`Yes`,`No`],a:0,w:`A Corridor is empty if it contains no Intruder; a Noise marker is not an Intruder.`},
{q:`An Adult must go through a closed Door. What happens?`,o:[`It takes a detour`,`It destroys the Door instead of moving`,`It stays stuck for the Round`],a:1,w:`The shortest path ignores Doors; facing a closed Door, the Intruder destroys it and stays put.`}]},

{id:'marqueurs',part:'The Facility',t:'Fire, Malfunction and Secure tokens',
lead:`The Facility is abandoned: fires break out, systems fail. Secure tokens, on the other hand, prepare a Room for Attacks.`,
rules:[
`<b>Fire</b> (1 per Room at most): a Character ending their Turn in a Room with Fire loses 1 Health; in the Intruder Phase, each Intruder in a Room with Fire receives 1 Hit, and a burning Nest loses 1 Egg. Some Events spread Fire to adjacent Rooms; a closed Door stops it.`,
`<b>Overwhelming Fire:</b> if you must place a Fire marker and none are left, the Facility is destroyed and the game ends.`,
`<b>Malfunction</b> (1 per Room): the Room's action is unavailable, in any way (its Item icons still count). On a <b>Heavy Item</b>: it can no longer be used at all, but its Tactical Gear tokens can; a 2nd Malfunction <b>destroys</b> it. On the <b>Robot card</b>: the Robot does nothing, but its tokens and effects requiring its presence remain usable.`,
`No Malfunction marker left? Place a Fire marker in the Room instead, if possible. You may discard a Malfunction from your Room, or from an Item or the Robot in that Room.`,
`<b>Secure tokens</b> (3 per Room at most, not possible if an Intruder is there): when an Intruder <b>enters</b> a Room containing at least 1 Character and 1 Secure token, discard 1 token <b>instead of</b> the Attack. It is mandatory.`,
`Secure tokens do not protect against Intruders <b>already present</b> (for example during the Intruder Phase Attacks). Some Rooms are never Secured (Nest, Storage, Technical Corridor Entrance); the Shelter is Secured by default.`],
cas:[
{q:`You are in a Room with 2 Secure tokens. A Drone enters, then an Adult. How many Attacks do you suffer?`,o:[`0`,`1`,`2`],a:0,w:`Each entry discards 1 token instead of the Attack: you have 0 tokens left, and no Attack. But in the Intruder Phase, these two Intruders already present will Attack normally.`},
{q:`Your rifle already has a Malfunction marker and an effect gives it another one. What happens?`,o:[`Nothing`,`The rifle is destroyed`,`You lose 1 Health`],a:1,w:`A second Malfunction marker on an Item destroys it: discard it.`}],
quiz:[
{q:`A Room has a Malfunction marker. Can you Search there?`,o:[`No`,`Yes: Malfunction does not affect Item icons`],a:1,w:`Malfunction blocks the Room's action, not its Item icons.`}]},

{id:'deplacement',part:'The Facility',t:'Movement and Exploration',
lead:`A Character always goes from Room to Room, never into a Corridor. Going through an Unexplored Corridor discovers a new Room.`,
rules:[
`<b>1. Choose a direction:</b> a Corridor adjacent to your Room (no closed Door, nothing on the other side blocking).`,
`<b>2. Opportunity Attacks:</b> each Intruder in your Room and in the chosen Corridor, from largest to smallest, resolves an Attack against you (<b>3 at most</b>).`,
`<b>3a. Discovered Room:</b> move your miniature; when <b>Moving Cautiously</b>, place a Secure token in the Room you enter; then make a <b>Noise roll</b>. Every Movement causes a Noise roll, even into an occupied Room.`,
`<b>3b. Unexplored Corridor:</b> resolve an <b>Exploration Sequence</b>. Draw an Exploration card and orient it like the board (North icon).`,
`<b>Exploration, in order:</b> place a Room of the type shown (A, B, C or "?"; if none are left, a "?"); place the Corridors shown, Door slot facing the new Room, except those that would leave the Facility or lead to a Room already placed; place markers and tokens (no 2nd Noise marker in a Corridor); move your miniature (+ Secure token if Cautious); resolve the Entrance Effect (often a Noise roll); discard the card.`,
`The extra icon on some Exploration cards is not used in the base game: ignore it. Empty Exploration deck: reshuffle the discard pile (without cards removed from the game).`,
`<b>Secret passages:</b> an effect sending you to a specific Room (like the Technical Corridor Entrance) follows the same sequence, without the "choose a direction" step.`],
cas:[
{q:`You leave a Room with 1 Adult through a Corridor containing 1 Drone and 2 Larvae. How many Opportunity Attacks?`,o:[`1`,`3`,`4`],a:1,w:`All Intruders in the Room and the Corridor Attack, largest first, but 3 at most: the Drone, the Adult, then a Larva.`},
{q:`An Exploration card asks for a Corridor that would lead to a Room already placed. What do you do?`,o:[`Place it`,`Do not place it`,`Place it Reinforced`],a:1,w:`No Corridor leads to a Room already placed (or out of the Facility). The Noise marker planned for that Corridor is not placed either.`}],
quiz:[
{q:`You move into a Room where another Character already is. Do you make a Noise roll?`,o:[`Yes`,`No`],a:0,w:`Every Movement causes a Noise roll, unless a special effect says otherwise.`}]},

{id:'bruit',part:'The Facility',t:'The Noise roll',
lead:`Every Movement makes noise. The Noise die tells you where the threat comes from: Noise markers appear, then turn into Intruders.`,
rules:[
`Roll the Noise die. Its faces: <b>1, 2, 3, 4</b> and <b>Hazard</b>.`,
`<b>Number:</b> find every Corridor with that number <b>adjacent to your Room</b>. For each one: if it holds at least 1 Intruder, <b>the largest one enters your Room</b> (and Attacks); otherwise, if it already has a Noise marker, <b>resolve that marker</b> (Intruders appear); otherwise, <b>place a Noise marker</b>. No Corridor with that number: nothing.`,
`<b>Hazard:</b> something jumps from the ceiling. Draw a token from the Intruder bag and resolve it in the "Room" column of the Intruder Help sheet: most of the time, an Intruder of the type shown appears in your Room. Ignore the number on the back, then put the token back under its pile.`,
`<b>Resolving a Noise marker:</b> remove it, draw a token from the bag and resolve it in that Corridor ("Corridor" column): the <b>white number</b> on the back gives the number of Intruders (Adults), the <b>red number</b> the number of Drones added. Discard the token under its pile; the Blank token always goes back into the bag.`,
`<b>Surprise Attacks:</b> an Intruder that appears in or enters a Room immediately Attacks a Character there.`,
`A Reinforced Corridor is worth 0: no die result ever points to it.`],
lab:'bruit',
quiz:[
{q:`You roll 2. The adjacent Corridor 2 holds 3 Adults. What happens?`,o:[`All 3 Adults enter`,`One Adult enters your Room and Attacks you`,`You place a Noise marker`],a:1,w:`Only the largest Intruder in the Corridor enters your Room.`},
{q:`You roll 3 and have two adjacent Corridors numbered 3, both empty. What do you do?`,o:[`A Noise marker in one of them, your choice`,`A Noise marker in each`,`Nothing`],a:1,w:`Every Corridor with the rolled number is resolved, one by one.`}]},

{id:'salles',part:'The Facility',t:'Key Rooms',
lead:`Rooms A, B and C are always in play and are almost always needed for your Objectives. The "Rooms" tab also details the 13 random Rooms.`,
rules:[
`Using a Room (Use the Room, 2 cards, Not in Combat) resolves its effect. When a Room offers two effects separated by OR, you choose one.`,
`<b>Section A:</b> Landing Zone (restock, board the Lander), Life Support Control A (Life Support A or put out a Fire anywhere), Surgery Room (remove a Larva, or a Serious Wound), Drilling Room (new Corridor from the Robot's Room).`,
`<b>Section B:</b> Hibernatorium (hibernate, if active), Life Support Control B (Life Support B or check and reorder the Anti-Aircraft tokens), Server Room (use a Room with a Computer remotely, or take a Data token), Cooling System (start the Autodestruction).`,
`<b>Section C:</b> Life Support Control C (Life Support C or turn on the Hibernatorium), Reactor (shut everything down: Life Support, Anti-Aircraft, Autodestruction), Escape Shuttle (escape alone), Nest (take or destroy an Egg).`,
`Hibernatorium, Landing Zone (Lander) and Escape Shuttle require a <b>Noise roll</b>: if there is an Intruder in the Room after the roll, the action fails.`],
html:`<div id="salles-ch"></div>`,
quiz:[
{q:`Which Room turns on the Hibernatorium?`,o:[`Life Support Control B`,`Life Support Control C`,`Server Room`],a:1,w:`Life Support Control C (Section C), second effect. It cannot be turned off.`},
{q:`Where do you secretly check the Anti-Aircraft status?`,o:[`Life Support Control B`,`Landing Zone`,`Reactor`],a:0,w:`Life Support Control B lets you look at both Anti-Aircraft tokens and put them back in the order of your choice.`},
{q:`What does the Reactor do?`,o:[`It turns on all Life Support`,`It removes the Life Support, Autodestruction and Anti-Aircraft tokens from the game`,`It puts out all Fires`],a:1,w:`Every Section loses its air, the Anti-Aircraft becomes inactive and the Autodestruction stops, for good.`}]},

/* ======================= INTRUDERS ======================= */
{id:'sac',part:'Intruders',t:'The Intruder bag',
lead:`The bag holds the Intruders living in the Facility, out of sight. Every Round, its contents change: the colony is growing.`,
rules:[
`Four types, from largest to smallest: <b>Queen</b>, <b>Drone</b>, <b>Adult</b>, <b>Larva</b>. There is also a <b>Blank</b> token.`,
`<b>Event Phase (step 4, Bag Development):</b> draw a token and apply the "Intruder bag" column of the Help sheet. <b>Queen:</b> if the Queen is on the board, activate her; otherwise, add 2 Larvae. <b>Drone or Adult:</b> add 2 Queens. <b>Larva:</b> add 2 Drones. <b>Blank:</b> add 2 Adults.`,
`Then the drawn token goes back <b>under its pile</b>, out of the bag. Only the <b>Blank</b> token always goes back into the bag.`,
`Tokens are added from the piles and removed by putting them back under the piles. If a pile is empty, add what is left (component limits).`,
`The same bag is used for Noise rolls: "Corridor" column for a resolved Noise marker, "Room" column for a Hazard result.`,
`When the Queen dies, flip the Help sheet to "The Queen is dead": token effects change.`],
lab:'sac',
quiz:[
{q:`During the Event Phase, you draw a Larva token. What goes into the bag?`,o:[`2 Larvae`,`2 Drones`,`2 Queens`],a:1,w:`Larva: add 2 random Drones. The drawn Larva goes back under its pile.`},
{q:`You draw the Blank token. Where does it go next?`,o:[`Under its pile`,`Into the bag`,`Out of the game`],a:1,w:`The Blank token is the only one that always goes back into the bag. It also adds 2 Adults.`}]},

{id:'depl-intrus',part:'Intruders',t:'Intruder movement',
lead:`Intruders head for the closest Character, by the shortest path, alternating between Rooms and Corridors.`,
rules:[
`They move because of <b>Event cards</b>, <b>Noise rolls</b>, an effect that <b>Repels</b> them and <b>Queen activation</b>.`,
`<b>General rules:</b> they move as a group towards the closest Character, by the shortest path (<b>ignoring Doors</b> to work it out). From a Corridor, they go into the adjacent Room; from a Room, into the adjacent Corridor.`,
`If several Intruders must go from a Corridor into a Room occupied by a Character, <b>only the largest one</b> enters, and it Attacks at once (unless there is a Secure token). An Intruder in a Room with a Character <b>does not move</b>: it stays in Combat.`,
`<b>Event cards:</b> an oriented Corridor icon moves every Intruder in Corridors of that orientation into an adjacent Room; the "Room" icon moves every Intruder in Rooms into a Corridor. Groups are moved one by one, from the top left, row by row.`,
`<b>Target priority:</b> the closest Character; on a tie, the one who triggered the Attack or movement; then the first in Turn order.`,
`<b>Path ties:</b> for equal lengths, the path starting with the Corridor or Room with the lowest reference number. If the target Corridor is full (6), they take another path of the same length if there is one; otherwise those who can enter do, and the rest wait.`,
`<b>Repelling:</b> the Intruder moves away from the Character repelling it (who picks the Corridor when repelling it from a Room). With no adjacent Character, it goes to the Corridor or Room with the lowest number. It never leaves an Unexplored Corridor, destroys a closed Door instead of going through, and Attacks if repelled into an occupied Room.`,
`<b>Full Corridor:</b> larger Intruders go first. When moving, smaller ones simply swap places (no Attack); when placing, smaller ones are removed. Those who cannot move stay where they are.`,
`A wounded Intruder moving into a Corridor discards its Hit markers.`],
cas:[
{q:`Two Characters are the same distance from a group of Intruders. The Noise roll that moved them was made by the second in Turn order. Who do they go to?`,o:[`The first in Turn order`,`The one who made the Noise roll`,`At random`],a:1,w:`At equal distance, the Character who triggered the movement comes before Turn order.`}],
quiz:[
{q:`An Adult is in your Room. An Event card moves Intruders in Rooms. What does it do?`,o:[`It moves out to a Corridor`,`It stays: an Intruder in Combat does not move`,`It Attacks you twice`],a:1,w:`An Intruder in a Room with a Character stays in Combat, unless it is Repelled.`}]},

{id:'attaques',part:'Intruders',t:'Intruder Attacks',
lead:`An Intruder Attacks as soon as it enters an occupied Room, and every Intruder Attacks in the Intruder Phase. Larvae, on the other hand, infect you.`,
rules:[
`<b>Standard Attack:</b> draw an <b>Intruder Attack</b> card, find the icon of the attacking Intruder type and resolve the matching effect, then discard the card. Reshuffle only when the game says so.`,
`<b>Target:</b> the player who caused the Intruder to arrive; otherwise, the first in Turn order among those in the Room.`,
`<b>Intruder Phase:</b> in each Room, each Intruder Attacks a Character. Start with the top-left Room, row by row; larger Intruders Attack first, all on the first in Turn order, unless that Character dies or leaves the Room.`,
`<b>Larva Attack:</b> no Attack card. The Character gets 1 <b>Contamination</b> card in their discard pile and the Larva goes on their Character board: they are <b>Infected</b>. If they already had one, the attacking Larva is discarded.`,
`<b>Preventing an Attack:</b> some effects cancel it entirely: no card drawn, no effect.`,
`You cannot Attack another Character. But locking them in a burning Room is not an Attack…`],
cas:[
{q:`Intruder Phase: a Drone and an Adult are in a Room with Alice (first in Turn order) and Bruno. Who Attacks whom?`,o:[`The Drone Attacks Alice, the Adult Attacks Bruno`,`Both Attack Alice, the Drone first`,`The Adult Attacks Alice, then the Drone`],a:1,w:`All Intruders in a Room Attack the same Character (the first in Turn order), largest first, unless that Character dies or leaves.`}],
quiz:[
{q:`A Larva Attacks you while you already have a Larva on your board. What happens?`,o:[`You die`,`You get 1 Contamination and the attacking Larva is discarded`,`Nothing`],a:1,w:`You still get the Contamination card; the second Larva is discarded.`}]},

/* ======================= COMBAT ======================= */
{id:'tir',part:'Combat',t:'Shooting and Melee',
lead:`In a Room, Intruders are nimble: each Hit raises the chance of killing them, without ever making it certain.`,
rules:[
`<b>Shooting</b> (1 card): choose a Ranged Weapon in your hands, with at least 1 Ammo token (even half) and no Malfunction, and an Intruder in your Room. Single Shots do not spend Ammo (except on a particular result).`,
`<b>1.</b> Deal 1 Hit: no matter what, a Hit marker next to its base. <b>2.</b> Roll the Shoot die: <b>Critical hit</b> = the Intruder dies; <b>2 to 5</b> = the Intruder dies if the number is <b>lower than or equal to</b> the number of Hit markers on it; the <b>Ammo</b> face = you lost too many bullets, spend Ammo.`,
`<b>Melee Attack</b> (1 card), with or without a Weapon: <b>1.</b> get 1 Contamination card; <b>2.</b> choose an Intruder in your Room; <b>3.</b> 1 Hit; <b>4.</b> Shoot die (critical: death; 2 to 5: as for Shooting; last face: no effect); <b>5.</b> if it survives, it <b>strikes back</b>: an Intruder Attack, unless you place a Malfunction marker on one of your Weapons to block it.`,
`<b>Larvae:</b> 1 Hit kills them, whatever the die. <b>Drones:</b> in a Room, they are shot like Adults. <b>Queen:</b> her Hits go on her track (see The Queen).`,
`Each Weapon card adds its own effects on certain results; apply them as well.`],
lab:'tir',
cas:[
{q:`An Adult already has 2 Hit markers. You Shoot and roll 3. What happens?`,o:[`It survives: 3 is higher than 2`,`It dies: with the new Hit it has 3, and 3 ≤ 3`,`It only dies on a critical`],a:1,w:`The Hit is placed before the roll: 3 markers. 3 is lower than or equal to 3, the Adult dies.`}],
quiz:[
{q:`Does a Shot in a Room spend Ammo?`,o:[`Always`,`No, except on the face that says so`,`Only against the Queen`],a:1,w:`Single Shots spend nothing; only the "too many bullets" face makes you spend Ammo. You still need a loaded Weapon.`},
{q:`What does a Melee Attack cost, on top of the Action card?`,o:[`Nothing`,`1 Contamination card`,`1 Ammo token`],a:1,w:`Touching these creatures is not good for your health: you always get 1 Contamination.`}]},

{id:'rafale',part:'Combat',t:'Bursts and Grenades',
lead:`Crammed into a narrow Corridor, Intruders are vulnerable: a Burst can kill several at once.`,
rules:[
`<b>Burst</b> (1 card): a loaded Ranged Weapon without Malfunction, and an <b>adjacent Corridor</b> (not behind a closed Door).`,
`Spend Ammo and roll the Burst die: <b>1, 2, 3 or 4</b> Hits. The 4 face also shows a special icon that triggers the Weapon's or Action's effect, if any.`,
`Assign the Hits as you like: <b>at most 1</b> per Adult and per Larva, <b>exactly 2</b> per Drone, as many as you like to the Queen (up to the end of her track). Leftover Hits are lost.`,
`In a Corridor, <b>1 Hit kills</b> an Adult or a Larva; a Drone dies with its 2 Hits. Hits on the Queen move her track.`,
`Intruders in Corridors do not keep their wounds.`,
`<b>Grenade</b> (Tactical Gear token): Burst die + 2 Hits in an adjacent Corridor; it is not a Burst, Weapon effects do not apply. <b>Turret Control</b> (Room): a Burst die of Hits without spending Ammo.`],
lab:'rafale',
cas:[
{q:`A Corridor holds 1 Drone and 2 Adults. You roll 3 on the Burst. What can you kill at best?`,o:[`All 3 Intruders`,`The Drone and 1 Adult, or the 2 Adults`,`Only the Drone`],a:1,w:`The Drone takes exactly 2 Hits: 2 + 1 = the Drone and one Adult. Or 1 + 1 on both Adults, the 3rd Hit being lost (no single Hit on a Drone).`}],
quiz:[
{q:`Can you put 2 Hits on the same Adult in a Corridor?`,o:[`Yes`,`No: 1 at most per Adult`],a:1,w:`Each Adult and each Larva takes only one Hit; one is enough to kill it.`}]},

{id:'reine',part:'Combat',t:'The Queen',
lead:`The Queen is a unique enemy, tough and aggressive. You do not kill her with Hit markers: you have to run out her Health cards.`,
rules:[
`Her Hits move the marker on the <b>Queen's Hit track</b>, one space per Hit, instead of placing markers on her miniature.`,
`When the marker reaches the end of the track: ignore any other Hits from that Action, reveal the top <b>Queen Health card</b>, discard that many cards from her deck without revealing them, resolve the effect at the bottom of the card (even if the Queen has just died), discard it and reset the marker to 0.`,
`When her last Health card is discarded, the Queen dies: remove her miniature, ignore effects that make her appear, and flip the Intruder Help sheet to "The Queen is dead".`,
`<b>Activation</b> (usually from a Queen token in the bag): she Attacks a Character in her Room if possible; otherwise, she moves once towards the closest one, with the same priorities as other Intruders.`,
`In a Corridor, she counts as 4 Intruders; with her, there can only be 2 other Intruders. A Burst can give her as many Hits as you like.`],
quiz:[
{q:`The track marker is on the second-to-last space and your Burst gives the Queen 3 Hits. What happens?`,o:[`All 3 Hits count, the marker goes back to 2`,`The marker reaches the end: the other Hits are ignored, a Health card is resolved`,`Nothing, you need a critical`],a:1,w:`At the end of the track, the remaining Hits of the Action are ignored; resolve a Health card, then reset the marker to 0.`},
{q:`A Queen token is drawn from the bag in the Event Phase while the Queen is not on the board. Effect?`,o:[`She appears in the Nest`,`Add 2 Larvae to the bag`,`Nothing`],a:1,w:`"Intruder bag" column: Queen on the board = activation; otherwise, 2 Larva tokens into the bag.`}]},

/* ======================= SURVIVE ======================= */
{id:'contamination',part:'Survive',t:'Contamination, Infection and hatching',
lead:`Intruders are also a biohazard. Contamination cards clog your hand and set you up to die at the end of the game.`,
rules:[
`A Contamination card you receive goes into your <b>discard pile</b>. It has the same back as your Action cards but <b>cannot</b> pay for an Action.`,
`Each card hides a text. The <b>Scanner</b> reveals it: if the word <b>"Infected"</b> appears, the card is infected (and so are you). Beware of fake words that look very similar!`,
`The effect that makes you scan (Item, Action, Room) says what to do with an infected card; most often, the Infection Procedure.`,
`<b>Infection Procedure:</b> scan all Contamination cards in your hand; if one is infected, place a Larva on your board (unless there already is one); then put all Contamination cards from your hand into your discard pile.`,
`<b>Hatching procedure:</b> draw 4 cards from your Action deck. No Contamination: you survive and discard your hand. At least one: your Character is killed. During the game, also place 1 Adult in your Room; if another Character is there, it Attacks them.`,
`A Larva on your board has no immediate effect, but it greatly lowers your chances of surviving the end. The Surgery Room can remove it.`,
`To get rid of Contamination: the Shelter (removes those in your hand without scanning them, if you have no Larva) and the Decontamination Room (all those in your deck and discard pile).`],
quiz:[
{q:`Can you discard a Contamination card to pay for a Move?`,o:[`Yes`,`No`],a:1,w:`Contamination cards can never pay for an Action. You can, however, discard them when you Pass.`},
{q:`During hatching, you draw 4 cards including 1 Contamination. Result?`,o:[`You survive`,`Your Character is killed`,`You get a Larva`],a:1,w:`A single Contamination among the 4 cards is enough: the host is killed.`}]},

{id:'objets',part:'Survive',t:'Items',
lead:`Each Character starts with a Character Item (and a Support Equipment). Other Items are found by searching the Facility.`,
rules:[
`<b>Search</b> (Action card): draw 1 Item card per Item icon of the Room (red, green, yellow), keep 1 and put the others back under their deck, without showing them.`,
`<b>Regular Items</b> (portrait format): they go in your <b>Backpack</b> (the card holder), with no limit, and stay secret until used. Use them with the Use an Item Action.`,
`<b>Heavy Items</b> (landscape format): one per Hand slot (2 hands). All Weapons are Heavy, and so are <b>Eggs</b>. Hands full? Discard a carried Item to take the new one.`,
`<b>Passive Items:</b> their effect applies on its own when the conditions are met; you never "use" them.`,
`Keywords: <b>Ranged Weapon</b> (needed to Shoot and Burst), <b>Melee Weapon</b> (much more effective in Melee), <b>One Use Only</b> (discarded after use), <b>Requires No Ammo</b> (works without a token; it counts as loaded), <b>Armor</b> (on the Heavily Injured section).`,
`Losing an Item loses its Tactical Gear tokens.`,
`<b>Interaction:</b> with their agreement, you may use an Item on a Character in your Room if it makes them regain Health, discard a Serious Wound, discard a Malfunction from their Items or regain Oxygen. Otherwise, you must Trade.`,
`<b>Trade</b> (1 card, Not in Combat): all Characters in your Room may reveal and exchange Items and Tactical Gear tokens, with you and with each other (with your agreement). Giving without getting anything back is allowed.`],
quiz:[
{q:`You Search Life Support Control A (green and red icons). How many cards do you draw?`,o:[`1`,`2, and you keep 1`,`2, and you keep both`],a:1,w:`1 card per Item icon: 1 green and 1 red. Keep 1 and put the other back under its deck.`},
{q:`Where does an Egg you pick up in the Nest go?`,o:[`In the Backpack`,`In a Hand slot: it is a Heavy Item`,`On the Tactical Belt`],a:1,w:`Eggs are Heavy Items.`}]},

{id:'robot',part:'Survive',t:'The Robot',
lead:`A Robot waits in the Hibernatorium. Its speciality, drawn at random, is only known once someone reaches it. It only does what it is told.`,
rules:[
`The Robot card is revealed when a Room is connected to the Hibernatorium for the first time. The Robot can then be activated. There are 6 Robot cards; only one is used per game.`,
`<b>Activate the Robot</b> (Not in Combat): 1 card if you are in its Room; remotely, from a Room with a <b>Computer</b>, by paying 1 more card. With a <b>Data token</b> (Server Room), remote activation costs no extra card.`,
`The Robot only moves through players' Actions, from Room to neighbouring Room. It ignores Intruders (and they ignore it), but cannot pass closed Doors, never explores (except the Exploration Robot) and never makes Noise rolls.`,
`It starts with 1 Ammo token and 1 Oxygen token. In its Room, the Use any Tactical Gear Action lets you use its tokens and swap tokens with it (except those in your Weapons).`,
`Malfunctioning Robot: it does nothing, but its tokens and effects requiring its presence remain usable. In its Room, you may discard the Malfunction from the Robot.`],
quiz:[
{q:`How much does remote Robot activation cost, from a Room with a Computer, without a Data token?`,o:[`1 card`,`2 cards`,`3 cards`],a:1,w:`1 card for the Action + 1 more card for remote use. The Data token removes that extra cost.`}]},

{id:'evasion',part:'Survive',t:'Lander, Anti-Aircraft, Autodestruction',
lead:`To win, you have to get out alive (or hibernate). Three ways out, each with its own risks.`,
rules:[
`<b>Anti-Aircraft:</b> 2 stacked tokens; the top one says whether the Anti-Aircraft system is active. Life Support Control B lets you check them in secret and reorder them. You may say what you saw, or lie, but not show them.`,
`<b>Lander arrival</b> (Round track on the Lander token's space): reveal the top Anti-Aircraft token. <b>Active</b>: the Lander is shot down, remove its token. <b>Inactive</b> (or tokens removed by the Reactor): it lands in the Landing Zone and the Anti-Aircraft tokens are removed.`,
`<b>Boarding:</b> the Landing Zone's Room action, with a Noise roll (fails if an Intruder is in the Room after the roll). Place your miniature on the empty Anti-Aircraft slot. On board, your Turn is skipped, you lose neither Oxygen nor Health, you draw as usual in Cleanup; if an Intruder appears in the Landing Zone, all passengers disembark.`,
`<b>Launch:</b> at the start of the Event Phase, any passenger may decide, alone, to launch the Lander. Everyone on board has escaped.`,
`<b>Escape Shuttle:</b> Noise roll to get in; one seat only. Anti-Aircraft does not stop it. <b>Hibernatorium:</b> Noise roll to hibernate, if it has been turned on; but if the Facility is destroyed, hibernating Characters die.`,
`<b>Autodestruction</b> (Cooling System): place the token 5 Rounds after the current one (4 spaces between them), or after the last space if fewer remain. When the Round track reaches it, the Facility explodes: everyone still inside dies, Hibernatorium included. Only the <b>Reactor</b> can stop it.`],
cas:[
{q:`You are on the Lander with Bruno. At the start of the Event Phase, you want to leave but Bruno wants to wait for Carla. Who decides?`,o:[`Everyone must agree`,`Any passenger can launch alone`,`The Starting Player`],a:1,w:`Launching the Lander is not a joint decision. Bruno leaves with you since he is on board.`}],
quiz:[
{q:`The Lander is shot down. Can you still leave with the Escape Shuttle?`,o:[`Yes, Anti-Aircraft does not stop the Shuttle`,`No`],a:0,w:`Anti-Aircraft only targets the Lander. The Shuttle has a single seat.`},
{q:`Does hibernating protect you from the Autodestruction?`,o:[`Yes`,`No: hibernating Characters die if the Facility is destroyed`],a:1,w:`The Hibernatorium is inside the Facility.`}]},

{id:'fin',part:'Survive',t:'End of the game and victory',
lead:`When the game ends, survivors still face two ordeals before revealing their Objective.`,
rules:[
`The game ends at the end of Round 14 (those who have not escaped or hibernated are dead), when no Character is left in play, or when the Facility is destroyed (Autodestruction, Overwhelming Fire).`,
`Living, escaped or hibernating Characters resolve, in order:`,
`<b>1. No Larva on your board:</b> take your deck and discard pile into your hand, then resolve an <b>Infection Procedure</b>. If it places a Larva, you must resolve a hatching procedure.`,
`<b>2. With a Larva:</b> take 1 Contamination card, take all your cards (deck, discard pile, hand), shuffle them and resolve a <b>hatching procedure</b>.`,
`<b>3. Still alive:</b> reveal your Objective (if you had not chosen one, choose it now, before the others reveal theirs). <b>4.</b> Objective fulfilled: you win!`,
`An escaped Character counts as escaped even if they die in hatching. A hibernating Character has not escaped.`,
`The Mission Task is revealed from the start and never changes. Most Mission Objectives (not all) push you to fulfil it.`],
lab:'fin',
quiz:[
{q:`You have a Larva at the end. Before hatching, what do you do?`,o:[`Nothing`,`Take 1 more Contamination card and shuffle all your cards`,`Scan your hand`],a:1,w:`With a Larva: +1 Contamination, all your cards shuffled, then hatching.`},
{q:`You had not chosen an Objective before the end. What happens?`,o:[`You lose`,`You choose it now, before the others reveal theirs`,`You keep both`],a:1,w:`You choose at that moment, if you are still alive.`}]},

{id:'modes',part:'Survive',t:'Deadly mode, solo and co-op',
lead:`Two official variants: a harder mode for everyone, and a fully cooperative mode, playable solo.`,
rules:[
`<b>Deadly mode:</b> Corridors with a second Noise value (the small number) use <b>both</b> values for every effect. Noise rolls become much more dangerous. A Reinforced Corridor is still worth 0. For tiebreaks, use only the standard value.`,
`<b>Solo and co-op, setup:</b> instead of one Mission Task, draw as many <b>Solo/Coop</b> Mission Task cards as there are players. Do not deal standard Objectives.`,
`<b>Victory:</b> every Mission Task must be fulfilled and at least 1 Character must survive. If several Missions ask for the same thing (a Data token, for example), you must fulfil it that many times. If you are asked for more Data tokens than there are Characters, you need as many as there are Characters.`,
`<b>Reviving:</b> the Surgery Room has an AutoDoc. A killed Character is laid down, their Items discarded. A Character in their Room may pay 1 more card to carry them while moving. If they start the Round in the Surgery Room (with no Intruder or Malfunction), they are revived: Serious Wounds discarded, marker on the first space of the Injured section.`,
`<b>Difficulty:</b> remove or add Mission Tasks during setup.`],
quiz:[
{q:`In co-op with 3 players, how many Mission Tasks?`,o:[`1`,`3`,`3 + 1 per Larva`],a:1,w:`As many Solo/Coop Mission Task cards as players (adjust for difficulty).`},
{q:`In Deadly mode, a Corridor shows 2 and a small 4. Which results does it respond to?`,o:[`2 only`,`2 and 4`,`4 only`],a:1,w:`In Deadly mode, it has both values for every effect (but only 2 for tiebreaks).`}]}
];
