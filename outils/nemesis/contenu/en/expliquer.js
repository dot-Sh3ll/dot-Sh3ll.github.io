const EXPL={
ui:{ecran:'Screen {n} of {t}',precedent:'Previous',suivant:'Next',voirPlus:'For later',voirAide:'Show the cheat sheet',debut:'Back to the start',
  aide:'Cheat sheet',aideTitre:'What you can do in a turn, at a glance',plus:'For later',plusTitre:'Keep it for later',
  plusIntro:'No need to mention these before the first turn. Explain each point when the game reaches it.',
  pleinEcran:'Full screen',fleches:'Use the arrow keys to move on.',dire:'Say it',piege:'Pitfall to flag'},
ecrans:[
{t:'Nemesis in a nutshell',
 dire:'“You are a Marine sent into an infested alien complex. The game is semi-cooperative: there can be several winners… or none. You play together, but everyone plays for themselves: helping each other is often vital, never mandatory.”',
 html:`<h3>How do you win?</h3><ol class="steps etiq"><li data-l="Step 1">Choose the Objective you want to complete.</li><li data-l="Step 2">Escape the complex, or hibernate, depending on what your mission asks of you.</li></ol>`},
{t:'Mission and Objectives',
 dire:'“The squad has a randomly drawn mission that everyone can see. But each of you also has two hidden Objectives. Once during the game, on your turn, you will be able to choose one of your Objectives and discard the other. And the first ones to make up their minds get a small reward.”',
 html:`<div class="trio"><div><h3>Squad Mission</h3><p>Visible to everyone.</p></div><div><h3>Two hidden Objectives</h3><p>One personal, one Mission Objective.</p></div><div><h3>Choosing</h3><p>On your turn, at some point in the game, you choose the Objective you commit to completing, and you discard the other.</p></div></div>`},
{t:'Anatomy of the board',
 dire:'“At the bottom of your board is your Health: Healthy, Injured, Heavily Injured. The weaker you are, the more likely a bad blow from a monster will kill you outright. Your Oxygen keeps dropping as long as the Life Support isn’t back up and running. You are arriving in a station that has completely shut down. Well, what did you expect? If at some point you run out of Oxygen, you will suffocate, and you will have just one turn to find some.”',
 html:`<div class="ex-cadre"><h4>Your player board</h4><div class="trio"><div><h3>Health</h3><p>At the bottom: Healthy, Injured, Heavily Injured.</p></div><div><h3>Oxygen</h3><p>It drops as long as Life Support is down.</p></div><div><h3>Tactical Belt</h3><p>On the left: with one Action, you use one or more tokens.</p></div></div></div>
 <div class="ex-cadre"><h4>A quirk of the game board</h4><div class="duo"><div><h3>Three Sections: A, B, C</h3><p>Each has its own Life Support. As long as your Section’s is down, every end of turn costs you 1 Oxygen.</p></div><div><h3>A Robot</h3><p>Drawn at random. You will be able to interact with it, and it will help you.</p></div></div></div>`},
{t:'A Round in 4 Phases',
 dire:'“A round of Nemesis is played in 4 Phases. And you’ll quickly see that the Event Phase is rarely a good time: Event cards tend to set off all sorts of things the squad won’t like.”',
 html:`<ol class="steps etiq"><li data-l="Phase 1"><b>Players</b>: everyone takes a turn, until everyone has Passed.</li><li data-l="Phase 2"><b>Intruders</b>: this is when they take damage from their surroundings and attack the players.</li><li data-l="Phase 3"><b>Event</b>: one card, so almost always bad news.</li><li data-l="Phase 4"><b>Cleanup</b>: everyone draws back up to 5 cards, and the Round track moves on.</li></ol>`},
{t:'Your turn: 2 Actions',
 html:`<div class="duo"><div><h3>Play a card</h3><p>For the effect written on it.</p></div><div><h3>Discard 1 or 2 cards</h3><p>To take an Action from the right side of your board.</p></div></div>
 <p class="big1">Actions marked with a crossed-out red alien, top right of your card or at the far right of the Action’s line on your player board, are forbidden if there is an Intruder in your Room.</p>
 <div class="ex-piege"><b>Need more cards?</b><p>Remember when I told you that choosing an Objective on your turn would earn you a small reward? Well, that reward is extra Action cards, which you draw on your turn. The sooner you do it, the more you get.</p></div>`,
 pl:'A small pitfall to flag',
 piege:'Passing is an Action. If you start your turn with no cards and Pass, you still lose 1 Oxygen: you have finished a turn, even without doing anything.'},
{t:'Moving makes noise',
 dire:'“Throughout the game, you will move from one Room to another through Corridors. There are two kinds of Moves, normal and cautious: either way, you make noise. To show it, we roll the Noise die, which points to the Corridors where there will be a ruckus. And if there is already a ruckus in those Corridors, Intruders burst out. The sneaky part: this die also has a Hazard face. If it comes up, an Intruder drops on you from the ceiling and attacks you. Unless you moved cautiously: then your Secure token takes the attack for you.”',
 html:`<div class="duo"><div><h3>Normal Move</h3><p>You move from one Room to another.</p></div><div><h3>Cautious Move</h3><p>You also place a Secure token in the Room you arrive in.</p></div></div>`,
 pl:'Watch out',
 piege:'Leaving a Room with an Intruder in it triggers one Opportunity Attack per Intruder. In the same way, going through a Corridor full of Intruders triggers Opportunity Attacks (3 at most).'},
{t:'The Intruders',
 dire:'“There are 4 kinds of Intruders, drawn at random from the Intruder bag, which fills up every Round: the colony grows while you play. The Queen has her own mechanics, which I will explain when the time comes during the game: in short, she is going to be very hard to kill.”',
 html:`<div class="flow"><div>Larva</div><span aria-hidden="true">→</span><div>Adult</div><span aria-hidden="true">→</span><div>Drone</div><span aria-hidden="true">→</span><div>Queen</div></div>
 <div class="duo"><div><h3>Movement</h3><p>Intruders always move toward the nearest player.</p></div><div><h3>Attack</h3><p>Whoever made the noise; otherwise, the first player in turn order.</p></div></div>`,
 pl:'A quick reminder',
 piege:'A Secure token protects you from an Intruder entering the Room. It protects you neither from attacks by Intruders already there, nor from Opportunity Attacks when you leave a Room.'},
{t:'Fighting back',
 dire:'“Now that we’ve talked about all these aliens and what they could do to you, don’t worry: you have what it takes to fight back. You can fire Single Shots or Bursts. Each works a bit differently, with different dice, but I’ll explain that during the game.”',
 html:`<p class="big1">What to remember: a Burst into a Corridor full of aliens is a great way to get rid of lots of them quickly. In a Room, an alien is much harder to kill.</p>
 <div class="duo"><div><h3>Shot</h3><p>In a Room. It doesn’t use half an Ammo token, unless the die roll is unlucky.</p></div><div><h3>Burst</h3><p>Into a Corridor. It always uses half an Ammo token.</p></div></div>`},
{t:'Contamination',
 dire:'“Something I haven’t told you yet: when these aliens attack you, they can contaminate you… and a Larva can grow inside you. Even if you think you’ve made it out, you’re not safe yet.”',
 html:`<p class="big1">If an Intruder contaminates you, you get a Contamination card, which goes into your discard pile. It is useless, except for clogging up your hand, your deck… and your chances of survival.</p>
 <div class="duo"><div><h3>A strange area</h3><p>At the bottom of the card is the area you will have to scan to reveal whether you are infected or not.</p></div><div><h3>Infected</h3><p>A Larva settles inside you. Have it removed in a Room of the complex, or it may hatch at the end, even if you hibernated or reached the Lander.</p></div></div>`},
{t:'Getting out alive',
 dire:'“When you choose your Objective, think about how you will survive: hibernate, leave on the Lander, or take the Escape Shuttle… which has only one seat.”',
 html:`<div class="trio"><div><h3>Lander</h3><p>It tries to land. If the Anti-Aircraft guns are active, it is shot down. A Room in the complex lets you check them.</p></div><div><h3>Escape Shuttle</h3><p>Only one seat.</p></div><div><h3>Hibernatorium</h3><p>It must have been activated.</p></div></div>
 <p>The game ends after Round 14, unless everyone has already escaped, hibernated or died: anyone still in the complex is left for dead.</p>`}],
plus:[
['Melee and Shots in detail','At the first fight in a Room.'],
['The Queen','When she first appears.'],
['Serious Wounds and Armor','At the first Serious Wound.'],
['The Robot','When a Room is first connected to the Hibernatorium.'],
['Fire and Malfunctions','At the first Event that places one (Room with Fire: −1 Health at the end of your turn).'],
['Doors','At the first closed Door.'],
['How Intruders move, in detail','At the first tricky case (ties, full Corridor).'],
['The key Rooms','When they are discovered, with the Rooms tab.'],
['Boarding, launch and Autodestruction','When someone heads for the exit.'],
['The golden rules (Murphy’s law)','At the first doubt.'],
['Deadly mode, solo and cooperative play','Only if you play them.']],
aide:`<div><h3>Round</h3><ul><li>Players → Intruders → Event → Cleanup.</li><li>14 Rounds at most.</li></ul></div>
<div><h3>Your turn</h3><ul><li>2 Actions.</li><li>Then −1 Oxygen if Life Support is down, −1 Health if your Room has Fire.</li></ul></div>
<div><h3>Costs</h3><ul><li><b>0 cards</b>: play a card, Pass.</li><li><b>1 card</b>: Move, Shot, Burst, Melee, Item…</li><li><b>2 cards</b>: Room Action, Cautious Move.</li><li>Crossed-out alien = not in Combat.</li></ul></div>
<div><h3>Movement</h3><ul><li>Opportunity Attacks, then Noise roll.</li><li>Hazard = an Intruder in your Room.</li></ul></div>
<div><h3>Combat</h3><ul><li><b>Shot</b>: 1 Hit, then roll; the Intruder dies if the roll ≤ its Hits.</li><li><b>Burst</b>: in a Corridor, 1 Hit kills an Adult or a Larva, 2 a Drone.</li></ul></div>
<div><h3>Objective and victory</h3><ul><li>Objective chosen once, on your turn; earlier = more cards.</li><li>Victory: escaped or hibernating + Objective completed + survive the infection.</li></ul></div>`
};
