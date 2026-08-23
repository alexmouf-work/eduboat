// Hand-authored questions — the richer set the generators cannot write: worked
// numbers, scenarios, sequences and who-pays-what. LEMMA-XML, client-graded.
// Formulae are always written out in words in the stem (the learner's standing
// instruction: no symbolic formulae). Weight 2 = drawn ahead of generated items.
//
// Shape: { id, termIds, xml, weight } — termIds are the terms this question trains,
// and the ones whose strength moves when it is answered.

const Q = []
const add = (id, termIds, xml) => Q.push({ id, termIds, xml, weight: 2 })

// ── The desk ────────────────────────────────────────────────────────────────

add('desk-sequence', ['order', 'firm-offer', 'on-subs', 'lifting-subs', 'recap', 'cp'], `
<question id="desk-sequence">
<body>
<p>Put the life of a deal in order, from first to last.</p>
<reorder sub-id="a">
<item>The charterer's order is circulated to the market</item>
<item>A firm offer is made, valid for a stated period</item>
<item>The deal is agreed on subs</item>
<item>Subs are lifted and the deal is binding</item>
<item>The recap is sent</item>
<item>The full charterparty is drawn up</item>
</reorder>
</body>
<explanation>Order, then firm offer and counters, then agreement on subs, subs lifted, recap of main terms, and finally the charterparty document itself.</explanation>
</question>`)

add('desk-binding-point', ['on-subs', 'lifting-subs'], `
<question id="desk-binding-point">
<body>
<p>A deal is agreed "on subs". Is there a binding contract yet?</p>
<choice sub-id="a">
<option correct="true">No — nothing binds until the subjects are lifted, and failing subs collapses the deal</option>
<option>Yes — agreement on main terms is binding immediately</option>
<option>Yes — but only the freight rate is binding</option>
<option>No — but the charterer owes a cancellation fee if the subs fail</option>
</choice>
</body>
<explanation>On subs means agreed subject to remaining conditions. Nothing binds until the subs are lifted; failing subs kills the deal with no liability either way.</explanation>
</question>`)

add('desk-laycan', ['laycan'], `
<question id="desk-laycan">
<body>
<p>A ship is fixed with laycan 10–15 March. She tenders NOR on 17 March. What may the charterer do?</p>
<choice sub-id="a">
<option correct="true">Cancel the charter — she presented after the cancelling date</option>
<option>Claim demurrage for the two days</option>
<option>Nothing — the laycan only sets when laytime starts</option>
<option>Redeliver her early</option>
</choice>
</body>
<explanation>Laycan is the layday–cancelling window. Presenting after the cancelling date gives the charterer the option to cancel. Demurrage is about port time, not arrival.</explanation>
</question>`)

add('desk-commissions', ['commission'], `
<question id="desk-commissions">
<body>
<p>Conventionally, what does a broker earn on a fixture, as a percentage of freight or hire?</p>
<numeric sub-id="a" model="1.25" tolerance="0.05" unit="%"/>
</body>
<explanation>The broker's commission is conventionally about 1.25%. Address commission — the charterer's rebate — is conventionally about 2.5% to 3.75%. Both are set by the charterparty, so they can differ.</explanation>
</question>`)

add('desk-ballasting', ['ballasting-from', 'open', 'position-list'], `
<question id="desk-ballasting">
<body>
<image src="/img/vessel-anchorage-fleet-waiting-hazy-sea.jpg" alt="Ships waiting at anchorage" width="420"/>
<p>A position list shows a ship "open Singapore 20 May, ballasting from Qingdao". What does that mean?</p>
<choice sub-id="a">
<option correct="true">She is steaming empty from Qingdao and is free for new business at Singapore from 20 May</option>
<option>She is loading ballast cargo at Qingdao for delivery to Singapore</option>
<option>She is fixed until 20 May and cannot be offered</option>
<option>She is laid up at Singapore awaiting drydock</option>
</choice>
</body>
<explanation>Open = free and available at a place and date. Ballasting from X = steaming empty from her last discharge port toward the next load area.</explanation>
</question>`)

add('desk-firm-vs-indication', ['firm-offer'], `
<question id="desk-firm-vs-indication">
<body>
<p>True or false: a firm offer binds the party making it for the stated validity period.</p>
<true-false sub-id="a" answer="true"/>
</body>
<explanation>Firm means binding for its validity. An indication is the non-binding sibling.</explanation>
</question>`)

add('desk-recap-gap', ['recap', 'main-terms'], `
<question id="desk-recap-gap">
<body>
<p>Complete the sentence: after subs are lifted, the broker sends the <text-gap sub-id="a" model="recap"/>, the recapitulation of the agreed <text-gap sub-id="b" model="main terms"/>.</p>
</body>
<key>
<answer sub-id="a" match="fuzzy"><accept>recap</accept></answer>
<answer sub-id="b" match="fuzzy"><accept>main terms</accept></answer>
</key>
<explanation>The recap records the commercial core — the main terms — agreed before the full charterparty is drawn up.</explanation>
</question>`)

// ── Charter types ───────────────────────────────────────────────────────────

add('charters-who-pays-bunkers', ['voyage-charter', 'time-charter'], `
<question id="charters-who-pays-bunkers">
<body>
<image src="/img/aerial-tanker-bunkering-barge-alongside-turquoise.jpg" alt="Bunkering barge alongside a tanker" width="420"/>
<p>Who pays for bunkers under each charter type? Drag the right party into each gap.</p>
<dragdrop sub-id="a">
<segment>Voyage charter: the </segment><drop id="g1" answer="c1"/><segment> pays for bunkers. Time charter: the </segment><drop id="g2" answer="c2"/><segment> pays for bunkers.</segment>
<bank><chip id="c1">owner</chip><chip id="c2">charterer</chip></bank>
</dragdrop>
</body>
<explanation>Under a voyage charter the owner sells a carriage and bears the voyage costs — bunkers, port, canal. Under a time charter the charterer directs the ship and pays for the fuel it burns.</explanation>
</question>`)

add('charters-tc-owner-side', ['time-charter'], `
<question id="charters-tc-owner-side">
<body>
<p>Under a time charter, which of these stay the OWNER's responsibility? Tick all that apply.</p>
<tickbox sub-id="a">
<option correct="true">Crewing the ship</option>
<option correct="true">Maintenance</option>
<option correct="true">Insuring the vessel</option>
<option>Bunkers</option>
<option>Port costs</option>
</tickbox>
</body>
<explanation>Time charter: the owner keeps the ship as a working machine — crew, maintenance, insurance. The charterer pays for the trading: bunkers and port costs.</explanation>
</question>`)

add('charters-bareboat', ['bareboat'], `
<question id="charters-bareboat">
<body>
<p>Why is a bareboat (demise) charter often described as a finance lease?</p>
<choice sub-id="a">
<option correct="true">The charterer takes the bare hull and does everything — crewing, maintenance, insurance — so the owner is left holding only the asset</option>
<option>Because the bank always holds the bill of lading</option>
<option>Because hire is paid annually rather than daily</option>
<option>Because it can only be used for newbuildings</option>
</choice>
</body>
<explanation>Bareboat: the charterer operates the ship as if they owned her. The owner's role reduces to financing the asset, which is why the structure resembles a lease.</explanation>
</question>`)

add('charters-scenarios', ['tct', 'coa', 'spot', 'period'], `
<question id="charters-scenarios">
<body>
<p>Match each situation to the contract shape.</p>
<dragdrop sub-id="a">
<segment>Carry 1.2 million tonnes of coal over two years, ships nominated as you go: </segment><drop id="g1" answer="c1"/><segment>. One prompt voyage, fixed today: </segment><drop id="g2" answer="c2"/><segment>. Hire her on time charter terms for exactly one voyage: </segment><drop id="g3" answer="c3"/><segment>. Hire her for a fixed year: </segment><drop id="g4" answer="c4"/><segment>.</segment>
<bank><chip id="c1">COA</chip><chip id="c2">spot</chip><chip id="c3">trip time charter</chip><chip id="c4">period</chip></bank>
</dragdrop>
</body>
<explanation>COA commits to tonnage over time, not to a ship. Spot is one prompt voyage. A TCT is time charter mechanics for a single trip. Period is a fixed duration.</explanation>
</question>`)

add('charters-disponent', ['disponent-owner'], `
<question id="charters-disponent">
<body>
<p>A trading house time-charters a ship for a year, then voyage-charters her out to a steel mill. In the voyage charter with the mill, the trading house is the:</p>
<choice sub-id="a">
<option correct="true">Disponent owner</option>
<option>Registered owner</option>
<option>Technical manager</option>
<option>Sub-charterer</option>
</choice>
</body>
<explanation>Whoever charters a ship in and out again contracts "as owner" in the sub-charter without owning her — the disponent owner.</explanation>
</question>`)

// ── Voyage economics ────────────────────────────────────────────────────────

add('voyage-laytime-clock', ['nor', 'turn-time', 'laytime'], `
<question id="voyage-laytime-clock">
<body>
<image src="/img/crew-officer-at-ship-bridge-controls.jpg" alt="Officer at the bridge console" width="420"/>
<p>The master tenders NOR at 08:00. Turn time is 6 hours. When does laytime start to count?</p>
<choice sub-id="a">
<option correct="true">14:00 the same day</option>
<option>08:00 — NOR starts laytime immediately</option>
<option>Midnight that night</option>
<option>When the first crane lifts cargo</option>
</choice>
</body>
<explanation>Notice of readiness declares the ship ready and starts the clock — but the turn time, a grace period (often 6 hours), runs first. 08:00 plus 6 hours = 14:00.</explanation>
</question>`)

add('voyage-demurrage-calc', ['laytime', 'demurrage', 'sof'], `
<question id="voyage-demurrage-calc">
<body>
<image src="/img/port-gantry-cranes-loading-red-ship.jpg" alt="Cranes working a ship alongside" width="420"/>
<p>The charterparty allows 4 days of laytime. The statement of facts shows cargo operations took 6 days. The demurrage rate is 15,000 dollars per day. Demurrage is owed on the time used beyond the allowance, at the daily rate. How much does the charterer owe, in dollars?</p>
<numeric sub-id="a" model="30000" tolerance="0" unit="USD"/>
</body>
<explanation>Two days over the allowance, at 15,000 dollars per day: 30,000 dollars. The SOF is the hour-by-hour record both sides compute this from.</explanation>
</question>`)

add('voyage-despatch-calc', ['despatch', 'demurrage'], `
<question id="voyage-despatch-calc">
<body>
<p>Demurrage is agreed at 24,000 dollars per day and despatch at the conventional half of demurrage. The charterer finishes 2 days inside the laytime. What does the owner pay, in dollars?</p>
<numeric sub-id="a" model="24000" tolerance="0" unit="USD"/>
</body>
<explanation>Despatch at half of 24,000 is 12,000 dollars per day; two days saved makes 24,000 dollars. Half demurrage is a convention — the charterparty sets it, and some fixtures exclude despatch entirely.</explanation>
</question>`)

add('voyage-ood', ['always-on-demurrage'], `
<question id="voyage-ood">
<body>
<p>A ship is already on demurrage when a storm stops all cargo work for a day. The charterparty excepts bad weather from laytime. Does the weather day count against the charterer?</p>
<choice sub-id="a">
<option correct="true">Yes — once on demurrage, always on demurrage: the exceptions stopped applying when laytime ran out</option>
<option>No — weather exceptions always apply</option>
<option>No — demurrage pauses whenever the terminal closes</option>
<option>Only if the owner tenders a fresh NOR</option>
</choice>
</body>
<explanation>The laytime exceptions protect the charterer only while laytime runs. Once the allowance is exhausted, time counts continuously — the phrase you will hear on the desk is exactly this rule.</explanation>
</question>`)

add('voyage-ood-verbatim', ['always-on-demurrage'], `
<question id="voyage-ood-verbatim">
<body>
<p>Complete the desk saying: "Once on demurrage, <text-gap sub-id="a" model="always on demurrage" width="22"/>."</p>
</body>
<key><answer sub-id="a" match="fuzzy"><accept>always on demurrage</accept></answer></key>
<explanation>Once on demurrage, always on demurrage — laytime exceptions stop applying once the allowance is used up.</explanation>
</question>`)

add('voyage-deadfreight', ['deadfreight', 'freight'], `
<question id="voyage-deadfreight">
<body>
<p>A charterer books space for 60,000 tonnes at 20 dollars per tonne but ships only 50,000 tonnes. Deadfreight is payable on the space booked but not used, at the freight rate. What is the deadfreight, in dollars?</p>
<numeric sub-id="a" model="200000" tolerance="0" unit="USD"/>
</body>
<explanation>10,000 tonnes short, at 20 dollars per tonne: 200,000 dollars. The owner priced the voyage on the full booking, so the shortfall is paid for.</explanation>
</question>`)

add('voyage-worldscale', ['worldscale', 'flat-rate'], `
<question id="voyage-worldscale">
<body>
<image src="/img/vessel-product-tanker-underway-top-down.jpg" alt="Product tanker underway from above" width="420"/>
<p>Worldscale quotes tanker freight as a percentage of the route's published flat rate. The flat rate for a route is 20 dollars per tonne and the fixture is done at WS 150. What is the freight, in dollars per tonne?</p>
<numeric sub-id="a" model="30" tolerance="0" unit="USD/tonne"/>
</body>
<explanation>WS 150 means 150% of the flat rate: 1.5 times 20 = 30 dollars per tonne. WS 100 is the flat rate itself.</explanation>
</question>`)

add('voyage-ws100', ['flat-rate'], `
<question id="voyage-ws100">
<body>
<p>True or false: the flat rate for a route is, by definition, the freight at WS 100.</p>
<true-false sub-id="a" answer="true"/>
</body>
<explanation>The flat rate is the WS 100 reference figure for the route; every fixture is quoted as a percentage of it.</explanation>
</question>`)

// ── Time charter mechanics ──────────────────────────────────────────────────

add('tc-hire-advance', ['hire'], `
<question id="tc-hire-advance">
<body>
<p>Time charter hire is usually paid how many days in advance?</p>
<numeric sub-id="a" model="15" tolerance="0" unit="days"/>
</body>
<explanation>Hire is conventionally paid 15 days in advance. Miss a hire payment and the owner may have the right to withdraw the ship.</explanation>
</question>`)

add('tc-offhire', ['off-hire', 'hire'], `
<question id="tc-offhire">
<body>
<image src="/img/industry-shipyard-welders-hull-repair-drydock.jpg" alt="Hull repair in drydock" width="420"/>
<p>On a time charter at 18,000 dollars per day, the main engine breaks down and the ship drifts for 3 days doing nothing. What happens to hire for those days?</p>
<choice sub-id="a">
<option correct="true">The ship is off-hire — the charterer stops paying while she cannot perform</option>
<option>Hire continues — breakdown is the charterer's risk</option>
<option>Hire halves by convention</option>
<option>The owner pays demurrage instead</option>
</choice>
</body>
<explanation>Off-hire: when the ship cannot do what the charter promised (breakdown, drydock), the hire clock stops. That is the balancing mechanism of paying by the day.</explanation>
</question>`)

add('tc-performance', ['speed-consumption'], `
<question id="tc-performance">
<body>
<p>The owner warrants 14 knots on 30 tonnes of fuel per day. On passage the ship averages 12.5 knots on 34 tonnes per day in good weather. What does the charterer have?</p>
<choice sub-id="a">
<option correct="true">An underperformance claim — for the lost time and the excess bunkers</option>
<option>A right to cancel the charter</option>
<option>An off-hire event</option>
<option>Nothing — warranties only apply in bad weather</option>
</choice>
</body>
<explanation>The speed and consumption warranty is a promise about performance in good weather. Missing it founds a claim quantified as lost time plus overburned fuel — not off-hire, because the ship still worked.</explanation>
</question>`)

add('tc-bunkers-delivery', ['bod-bor', 'delivery-redelivery'], `
<question id="tc-bunkers-delivery">
<body>
<p>What happens to the fuel in the ship's tanks at delivery and redelivery of a time charter?</p>
<choice sub-id="a">
<option correct="true">The charterer buys the bunkers on delivery and sells them back on redelivery, at prices agreed in the charter</option>
<option>The owner keeps paying for all fuel throughout</option>
<option>The tanks must be empty at both ends</option>
<option>The fuel transfers free of charge each way</option>
</choice>
</body>
<explanation>BOD / BOR — bunkers on delivery and redelivery are bought and sold at agreed prices, because fuel is the charterer's cost while the charter runs.</explanation>
</question>`)

add('tc-ballast-bonus', ['ballast-bonus'], `
<question id="tc-ballast-bonus">
<body>
<p>Why would a charterer pay a ballast bonus?</p>
<choice sub-id="a">
<option correct="true">To compensate the owner for steaming empty to the delivery point</option>
<option>To reward the crew for fast deballasting</option>
<option>To cover the cost of ballast water treatment</option>
<option>As a deposit returned at redelivery</option>
</choice>
</body>
<explanation>The delivery point may be far from where the ship is open. The ballast bonus is a lump sum paying the owner for that unpaid positioning voyage.</explanation>
</question>`)

add('tc-employment', ['employment-clause', 'trading-limits'], `
<question id="tc-employment">
<body>
<image src="/img/vessel-razor-wire-anti-piracy-rail-at-sea.jpg" alt="Razor wire rigged along a ship rail" width="420"/>
<p>Under a time charter's employment clause, the charterer directs where the ship trades. What bounds that freedom? Tick all that apply.</p>
<tickbox sub-id="a">
<option correct="true">The trading limits — war zones, ice, sanctioned states are excluded</option>
<option correct="true">The charterparty's terms generally</option>
<option>Nothing — the charterer's orders are absolute</option>
<option>The flag state must approve each voyage</option>
</tickbox>
</body>
<explanation>The employment clause gives commercial direction to the charterer within the charter's limits — and trading limits carve out the areas the ship may not be sent.</explanation>
</question>`)

// ── Money and measures ──────────────────────────────────────────────────────

add('money-tce-calc', ['tce', 'voyage-costs', 'ballast-leg'], `
<question id="money-tce-calc">
<body>
<p>A voyage earns 1,200,000 dollars of freight. Voyage costs — bunkers, port dues, canal fees — come to 400,000 dollars. The round trip takes 20 days including the ballast leg. The time charter equivalent is the freight minus the voyage costs, divided by the total voyage days. What is the TCE, in dollars per day?</p>
<numeric sub-id="a" model="40000" tolerance="0" unit="USD/day"/>
</body>
<explanation>1,200,000 minus 400,000 is 800,000; divided by 20 days that is 40,000 dollars per day. The TCE turns a voyage quote into a daily number you can compare against a time charter rate or a Baltic index.</explanation>
</question>`)

add('money-tce-why', ['tce'], `
<question id="money-tce-why">
<body>
<p>Why does a desk compute the time charter equivalent at all?</p>
<choice sub-id="a">
<option correct="true">A voyage rate in dollars per tonne and a time charter rate in dollars per day cannot be compared until both are dollars per day</option>
<option>Because charterers refuse to quote in dollars per tonne</option>
<option>It is required by the standard charterparty forms</option>
<option>To calculate the broker's commission</option>
</choice>
</body>
<explanation>Every fixture decision is a comparison, and the TCE is the common currency: it converts voyage economics into the same dollars-per-day unit the time charter market and the Baltic indices already speak.</explanation>
</question>`)

add('money-tonmile', ['ton-mile', 'cape-routing'], `
<question id="money-tonmile">
<body>
<p>The same cargoes keep moving, but ships start routing around the Cape instead of through Suez. What happens to shipping demand measured in ton-miles?</p>
<choice sub-id="a">
<option correct="true">It rises — the same tonnes travel more miles, absorbing more ships</option>
<option>It falls — voyages take longer so fewer are made</option>
<option>Nothing — demand is set by tonnes alone</option>
<option>It becomes impossible to measure</option>
</choice>
</body>
<explanation>A ton-mile is one tonne carried one mile. Distance is half the unit: longer routes mean more ton-miles from the same trade, which tightens effective supply — how a canal closure becomes a freight rally.</explanation>
</question>`)

add('money-weights', ['dwt', 'displacement', 'lightship'], `
<question id="money-weights">
<body>
<p>Match each measure to what it weighs.</p>
<dragdrop sub-id="a">
<segment>The ship's own empty weight: </segment><drop id="g1" answer="c1"/><segment>. The maximum she can carry (cargo, fuel, stores, ballast, crew): </segment><drop id="g2" answer="c2"/><segment>. The whole ship as she floats, equal to the water displaced: </segment><drop id="g3" answer="c3"/><segment>.</segment>
<bank><chip id="c1">lightship</chip><chip id="c2">deadweight</chip><chip id="c3">displacement</chip></bank>
</dragdrop>
</body>
<explanation>Displacement = lightship + deadweight. Deadweight is capacity, displacement is the floating total, lightship is the steel and machinery alone.</explanation>
</question>`)

add('money-tpc-calc', ['tpc', 'draft'], `
<question id="money-tpc-calc">
<body>
<p>A ship's TPC is 80 — each centimetre of extra draft carries 80 tonnes. Loading 800 more tonnes sinks her by how many centimetres?</p>
<numeric sub-id="a" model="10" tolerance="0" unit="cm"/>
</body>
<explanation>800 tonnes at 80 tonnes per centimetre is 10 centimetres. TPC is how a draft limit converts directly into cargo tonnes, and cargo tonnes into freight.</explanation>
</question>`)

add('money-opex-voyage', ['opex', 'voyage-costs'], `
<question id="money-opex-voyage">
<body>
<p>Which of these belong to OPEX — the daily running cost — rather than to voyage costs? Tick all that apply.</p>
<tickbox sub-id="a">
<option correct="true">Crew wages</option>
<option correct="true">Insurance</option>
<option correct="true">Stores and maintenance</option>
<option>Bunkers</option>
<option>Canal transit fees</option>
<option>Port dues</option>
</tickbox>
</body>
<explanation>OPEX runs whether the ship trades or sits: crew, stores, insurance, maintenance. Bunkers, port dues and canal fees exist only because of the voyage — they are voyage costs, and the TCE subtracts them.</explanation>
</question>`)

add('money-baltic', ['baltic-indices'], `
<question id="money-baltic">
<body>
<p>Match each Baltic index to its segment.</p>
<dragdrop sub-id="a">
<segment>The composite: </segment><drop id="g1" answer="c1"/><segment>. Capesize: </segment><drop id="g2" answer="c2"/><segment>. Panamax: </segment><drop id="g3" answer="c3"/><segment>. Supramax: </segment><drop id="g4" answer="c4"/><segment>.</segment>
<bank><chip id="c1">BDI</chip><chip id="c2">BCI</chip><chip id="c3">BPI</chip><chip id="c4">BSI</chip></bank>
</dragdrop>
</body>
<explanation>BDI is the composite; BCI (5TC), BPI (P5TC) and BSI are the Capesize, Panamax and Supramax dollars-per-day benchmarks.</explanation>
</question>`)

add('money-ffa', ['ffa', 'baltic-indices'], `
<question id="money-ffa">
<body>
<p>What is a forward freight agreement?</p>
<choice sub-id="a">
<option correct="true">A cash-settled derivative on future freight, settled against a Baltic index — no ship ever sails under it</option>
<option>A charterparty signed more than a year in advance</option>
<option>An option to buy a ship at a future date</option>
<option>A freight invoice payable in 30 days</option>
</choice>
</body>
<explanation>An FFA is paper freight: you fix a rate today for a future period and settle the difference in cash against the index. It is how owners and charterers hedge — and it is Braemar's securities desk's product.</explanation>
</question>`)

// ── Dimensions and loading ──────────────────────────────────────────────────

add('dims-measures', ['loa', 'beam', 'draft', 'air-draft', 'freeboard'], `
<question id="dims-measures">
<body>
<image src="/img/vessel-bulbous-bow-orange-hull-close-crop.jpg" alt="Hull at the waterline" width="420"/>
<p>Match each measurement to its definition.</p>
<dragdrop sub-id="a">
<segment>Depth below the waterline: </segment><drop id="g1" answer="c1"/><segment>. Height above the waterline: </segment><drop id="g2" answer="c2"/><segment>. Width at the widest point: </segment><drop id="g3" answer="c3"/><segment>. Waterline to main deck: </segment><drop id="g4" answer="c4"/><segment>.</segment>
<bank><chip id="c1">draft</chip><chip id="c2">air draft</chip><chip id="c3">beam</chip><chip id="c4">freeboard</chip></bank>
</dragdrop>
</body>
<explanation>Draft decides how much you can load, beam decides which lock you fit, air draft is the bridge-clearance constraint, freeboard is the safety margin the load line protects.</explanation>
</question>`)

add('dims-plimsoll', ['load-line', 'load-line-zones'], `
<question id="dims-plimsoll">
<body>
<p>On the load line marks, what does WNA stand for?</p>
<written sub-id="a" multiline="false" placeholder="Write it out…"/>
</body>
<key><answer sub-id="a" match="fuzzy"><accept>winter North Atlantic</accept><accept>winter north atlantic</accept></answer></key>
<explanation>TF tropical fresh, F fresh, T tropical, S summer, W winter, WNA winter North Atlantic — the marks set the maximum legal draft by zone and season, and WNA is the most conservative.</explanation>
</question>`)

add('dims-zones-deepest', ['load-line-zones', 'tfw-draft'], `
<question id="dims-zones-deepest">
<body>
<p>Which load line mark allows the DEEPEST loading?</p>
<choice sub-id="a">
<option correct="true">TF — tropical fresh</option>
<option>S — summer</option>
<option>W — winter</option>
<option>WNA — winter North Atlantic</option>
</choice>
</body>
<explanation>Fresh water is less buoyant and tropical zones are benign, so tropical fresh permits the deepest marks; winter North Atlantic, the harshest, permits the least. The TFW draft is why Gatun Lake — fresh water — is quoted separately at Panama.</explanation>
</question>`)

add('dims-squat', ['squat', 'ukc'], `
<question id="dims-squat">
<body>
<p>A laden ship enters a shallow, confined channel at speed. Why does her under-keel clearance shrink by more than the chart depth suggests?</p>
<choice sub-id="a">
<option correct="true">Squat — a moving ship sits lower in shallow confined water</option>
<option>List — she leans away from the bank</option>
<option>Trim — her stern always rises in channels</option>
<option>Freeboard loss from waves</option>
</choice>
</body>
<explanation>Squat: the flow accelerating under the hull drops the pressure and pulls her down. The remedy is slowing down — which is why UKC rules bind hardest in channels.</explanation>
</question>`)

add('dims-trim-list', ['trim', 'list'], `
<question id="dims-trim-list">
<body>
<image src="/img/vessel-cargo-ship-sinking-listing-at-sea.jpg" alt="Ship leaning heavily to one side" width="420"/>
<p>The ship in the photograph is leaning hard to one side. Fill the gaps: a lean athwartships is called <text-gap sub-id="a" model="list"/>; a difference between forward and aft draft is called <text-gap sub-id="b" model="trim"/>.</p>
</body>
<key>
<answer sub-id="a" match="fuzzy"><accept>list</accept></answer>
<answer sub-id="b" match="fuzzy"><accept>trim</accept></answer>
</key>
<explanation>List is sideways, trim is fore-and-aft. Both are set by how weight is distributed — which is what the loading sequence exists to control.</explanation>
</question>`)

add('dims-stowage-calc', ['stowage-factor', 'cube-out', 'weigh-out'], `
<question id="dims-stowage-calc">
<body>
<image src="/img/cargo-hold-cleaning-worker-inside-empty-hold.jpg" alt="Inside an empty cargo hold" width="420"/>
<p>A ship has 90,000 cubic metres of hold space and can lift 75,000 tonnes of cargo by weight. A grain cargo stows at 1.5 cubic metres per tonne. The volume limit is the hold space divided by the stowage factor. How many tonnes fit before she runs out of space?</p>
<numeric sub-id="a" model="60000" tolerance="0" unit="tonnes"/>
</body>
<explanation>90,000 divided by 1.5 is 60,000 tonnes — she cubes out at 60,000, below her 75,000-tonne deadweight limit. A denser cargo (small stowage factor) would weigh out instead: deadweight full, space to spare.</explanation>
</question>`)

add('dims-cube-vs-weigh', ['cube-out', 'weigh-out', 'stowage-factor'], `
<question id="dims-cube-vs-weigh">
<body>
<p>Iron ore is very dense; grain is light and bulky. Drag the right outcome to each cargo.</p>
<dragdrop sub-id="a">
<segment>Loading iron ore, the ship will typically </segment><drop id="g1" answer="c1"/><segment>. Loading grain, she will typically </segment><drop id="g2" answer="c2"/><segment>.</segment>
<bank><chip id="c1">weigh out</chip><chip id="c2">cube out</chip></bank>
</dragdrop>
</body>
<explanation>Dense cargo hits the deadweight limit with space left over — weigh out. Light cargo fills the holds before the deadweight is reached — cube out. The stowage factor tells you which side of the line a cargo sits.</explanation>
</question>`)

add('dims-down-to-marks', ['down-to-marks', 'load-line'], `
<question id="dims-down-to-marks">
<body>
<image src="/img/aerial-container-ship-bow-overhead-dark-water.jpg" alt="Laden ship from above" width="420"/>
<p>True or false: a ship "down to her marks" is loaded to her legal maximum draft.</p>
<true-false sub-id="a" answer="true"/>
</body>
<explanation>Down to her marks: the water is at the load line for the zone and season. Every extra tonne now needs either a different zone or a lighter fuel plan.</explanation>
</question>`)

// ── Vessel classes ──────────────────────────────────────────────────────────

add('classes-dry-ladder', ['dry-bulk-ladder'], `
<question id="classes-dry-ladder">
<body>
<image src="/img/vessel-red-bulk-carrier-aerial-calm-sea-dusk.jpg" alt="Bulk carrier at dusk" width="420"/>
<p>Put the dry bulk classes in order, smallest first.</p>
<reorder sub-id="a">
<item>Handysize</item>
<item>Supramax</item>
<item>Panamax</item>
<item>Capesize</item>
<item>VLOC</item>
</reorder>
</body>
<explanation>Handysize, Handymax/Supramax, Ultramax, Panamax, Kamsarmax, Post-Panamax, Capesize, Newcastlemax, VLOC — this question walks the spine of the ladder.</explanation>
</question>`)

add('classes-tanker-ladder', ['tanker-ladder'], `
<question id="classes-tanker-ladder">
<body>
<p>Put the tanker classes in order, smallest first.</p>
<reorder sub-id="a">
<item>MR</item>
<item>Aframax</item>
<item>Suezmax</item>
<item>VLCC</item>
<item>ULCC</item>
</reorder>
</body>
<explanation>MR, LR1, Aframax, LR2, Suezmax, VLCC, ULCC. The names encode constraints and freight scales, not just size — Suezmax is literally "the largest that transits Suez fully laden".</explanation>
</question>`)

add('classes-kamsarmax', ['dry-bulk-ladder'], `
<question id="classes-kamsarmax">
<body>
<p>A Kamsarmax is about how many deadweight tonnes?</p>
<numeric sub-id="a" model="82000" tolerance="2000" unit="dwt"/>
</body>
<explanation>About 82,000 dwt and 229 m — the longest ship that fits the berth at Port Kamsar, Guinea's bauxite port. The classes are named for their constraints.</explanation>
</question>`)

add('classes-constraints', ['panamax', 'neopanamax', 'dry-bulk-ladder'], `
<question id="classes-constraints">
<body>
<p>The vessel classes are named after constraints, not sizes. Which pairing is WRONG?</p>
<choice sub-id="a">
<option>Panamax — the old Panama locks</option>
<option>Kamsarmax — the berth at Port Kamsar</option>
<option>Newcastlemax — the port of Newcastle</option>
<option correct="true">Capesize — the largest ship that fits the Cape Town channel</option>
</choice>
</body>
<explanation>Capesize means too big for the canals — she routes via the Capes because she must, not because Cape Town limits her. The others are all genuine physical constraints.</explanation>
</question>`)

add('classes-panamax-dims', ['panamax'], `
<question id="classes-panamax-dims">
<body>
<p>What beam, in metres, is the Panamax limit (the old Panama locks)?</p>
<numeric sub-id="a" model="32.31" tolerance="0.3" unit="m"/>
</body>
<explanation>294.13 m by 32.31 m — the old lock chamber. Neopanamax, for the 2016 locks, is 366 m by 51.25 m.</explanation>
</question>`)

add('classes-teu', ['teu', 'container-ladder'], `
<question id="classes-teu">
<body>
<image src="/img/vessel-container-ship-underway-calm-open-sea.jpg" alt="Container ship underway" width="420"/>
<p>A 40-foot container counts as how many TEU?</p>
<numeric sub-id="a" model="2" tolerance="0" unit="TEU"/>
</body>
<explanation>TEU is the twenty-foot equivalent unit, so a 40-foot box is 2 TEU. An ULCV carries around 24,000 of them.</explanation>
</question>`)

add('classes-gas', ['gas-carriers'], `
<question id="classes-gas">
<body>
<image src="/img/energy-lng-carrier-at-terminal-jetty-aerial.jpg" alt="LNG carrier at a terminal jetty" width="420"/>
<p>A VLGC of 84,000 to 93,000 cubic metres carries which cargo?</p>
<choice sub-id="a">
<option correct="true">LPG</option>
<option>LNG</option>
<option>Crude oil</option>
<option>Grain</option>
</choice>
</body>
<explanation>VLGC — very large gas carrier — is the LPG workhorse at 84,000–93,000 cbm. LNG moves on dedicated LNG carriers with heavily insulated (often spherical) tanks like the ones in the photograph.</explanation>
</question>`)

// ── Canals and chokepoints ──────────────────────────────────────────────────

add('canals-panama-rain', ['panama-canal', 'tfw-draft'], `
<question id="canals-panama-rain">
<body>
<image src="/img/city-panama-skyline-causeway-aerial-daylight.jpg" alt="Panama City and causeway" width="420"/>
<p>Why does rainfall set the draft limit at the Panama Canal?</p>
<choice sub-id="a">
<option correct="true">Gatun Lake is the canal's summit level — a dry season lowers the lake, and the permitted draft with it</option>
<option>Rain floods the locks and closes them</option>
<option>The Pacific tide range depends on rainfall</option>
<option>It does not — Panama's limit is fixed at 15.24 m</option>
</choice>
</body>
<explanation>Panama is a lock canal whose summit is a rain-fed lake. Design maximum is 15.24 m tropical fresh water for Neopanamax, but drought has cut it to around 14.5 m — a figure that moves, which is why the desk checks it.</explanation>
</question>`)

add('canals-suez-shape', ['suez-canal'], `
<question id="canals-suez-shape">
<body>
<p>At Suez the maximum draft of 20.1 m applies only to ships under 50 m beam. Why does draft trade against beam?</p>
<choice sub-id="a">
<option correct="true">Transit is capped by the submerged cross-section a hull may occupy (about 1,006 square metres) — a wider ship must sit shallower</option>
<option>The locks are narrow at the bottom</option>
<option>Wider ships squat more</option>
<option>It is a toll-band boundary, not a physical limit</option>
</choice>
</body>
<explanation>Suez is sea level with no locks; the binding constraint is the channel's cross-section. Beam times draft must fit inside it, so the two trade off against each other.</explanation>
</question>`)

add('canals-sumed', ['sumed'], `
<question id="canals-sumed">
<body>
<p>A laden VLCC draws too much water for Suez. What does SUMED let her do?</p>
<choice sub-id="a">
<option correct="true">Part-discharge into the pipeline, transit lighter, and reload at the far end</option>
<option>Bypass Suez through a parallel barge canal</option>
<option>Book priority transit at a premium toll</option>
<option>Nothing — VLCCs must always route via the Cape</option>
</choice>
</body>
<explanation>SUMED is the pipeline bypass: crude goes ahead by pipe while the lightened ship transits, and the two reunite at the Mediterranean end.</explanation>
</question>`)

add('canals-chokepoints', ['bosphorus', 'malacca-max', 'cape-routing'], `
<question id="canals-chokepoints">
<body>
<image src="/img/port-grain-terminal-bulk-carrier-silos-overhead.jpg" alt="Bulk carrier at a grain terminal" width="420"/>
<p>Match each chokepoint to its claim to fame.</p>
<dragdrop sub-id="a">
<segment>The grain chokepoint out of the Black Sea: </segment><drop id="g1" answer="c1"/><segment>. A draft ceiling of about 25 m on the Asia route: </segment><drop id="g2" answer="c2"/><segment>. The routing that adds ton-miles when Suez is avoided: </segment><drop id="g3" answer="c3"/><segment>.</segment>
<bank><chip id="c1">the Bosphorus</chip><chip id="c2">Malacca max</chip><chip id="c3">the Cape</chip></bank>
</dragdrop>
</body>
<explanation>The Turkish Straits gate Black Sea grain; Malacca max (about 25 m) caps the biggest ships on the Middle East–Asia run; Cape routing is the Suez alternative that stretches every voyage.</explanation>
</question>`)

// ── Ballast and cargo operations ────────────────────────────────────────────

add('ballast-why', ['ballast-water'], `
<question id="ballast-why">
<body>
<p>Why does an empty ship carry ballast water? Tick all that apply.</p>
<tickbox sub-id="a">
<option correct="true">Stability</option>
<option correct="true">Keeping the propeller immersed</option>
<option correct="true">Controlling hull stress</option>
<option>Making her faster</option>
<option>Cooling the engine</option>
</tickbox>
</body>
<explanation>Ballast water is seawater carried for physics, not propulsion: it keeps an empty hull stable, the propeller biting, and the bending stresses inside limits.</explanation>
</question>`)

add('ballast-leg-tce', ['ballast-leg', 'triangulation', 'tce'], `
<question id="ballast-leg-tce">
<body>
<p>Why does a desk care about triangulation — chaining cargoes to minimise ballast miles?</p>
<choice sub-id="a">
<option correct="true">Ballast days are unpaid but still divide into the TCE, so fewer of them means more dollars per day from the same freight</option>
<option>Ballast voyages are illegal in some jurisdictions</option>
<option>Triangular routes qualify for canal discounts</option>
<option>It reduces the broker's commission</option>
</choice>
</body>
<explanation>The ballast leg earns nothing and costs fuel, yet its days sit in the TCE's denominator. Triangulation is the routing craft of shrinking that denominator.</explanation>
</question>`)

add('ballast-deball', ['deballasting', 'deballast-warranty'], `
<question id="ballast-deball">
<body>
<image src="/img/aerial-green-deck-ship-bow-overhead-hatches.jpg" alt="Bulk carrier hatches from above" width="420"/>
<p>At a fast ore terminal loading 10,000 tonnes an hour, why can deballasting become the bottleneck — and what does the charterparty do about it?</p>
<choice sub-id="a">
<option correct="true">Ballast must leave as cargo comes aboard, and pumps have finite capacity — so a deballasting rate warranty requires full deballast within a stated time</option>
<option>Deballasting is prohibited in port, so loading must pause</option>
<option>The terminal charges for discharged ballast water by the tonne</option>
<option>It cannot — ore terminals always load slower than ships deballast</option>
</choice>
</body>
<explanation>Loading and deballasting are simultaneous and opposite. When the terminal outpaces the pumps, the ship holds up the berth — hence the warranty, e.g. full deballast within 24 hours.</explanation>
</question>`)

add('ballast-gravity-strip', ['gravity-discharge', 'stripping', 'bwts'], `
<question id="ballast-gravity-strip">
<body>
<p>Match each ballast operation to its description.</p>
<dragdrop sub-id="a">
<segment>Topside tanks draining overboard with no pumps: </segment><drop id="g1" answer="c1"/><segment>. Clearing the last residual water by eductor: </segment><drop id="g2" answer="c2"/><segment>. The mandatory treatment that can throttle flow rates: </segment><drop id="g3" answer="c3"/><segment>.</segment>
<bank><chip id="c1">gravity discharge</chip><chip id="c2">stripping</chip><chip id="c3">BWTS</chip></bank>
</dragdrop>
</body>
<explanation>Gravity discharge empties the high tanks free; stripping chases the dregs; the ballast water treatment system (BWM Convention D-2) sits in the line and can slow the whole operation.</explanation>
</question>`)

add('ballast-loading-seq', ['loading-sequence'], `
<question id="ballast-loading-seq">
<body>
<p>What is the loading sequence protecting the ship from?</p>
<choice sub-id="a">
<option correct="true">Shear force and bending moment outside limits — a hull loaded in the wrong order can be damaged alongside</option>
<option>Cargo contamination between holds</option>
<option>Overloading beyond the load line</option>
<option>Crane collisions on deck</option>
</choice>
</body>
<explanation>A hull is a beam. Fill the ends before the middle and it sags; the wrong pattern can crack her at the berth. The loading manual's sequence keeps the stresses inside limits.</explanation>
</question>`)

// ── Paper, insurance and compliance ─────────────────────────────────────────

add('paper-bl-functions', ['bl'], `
<question id="paper-bl-functions">
<body>
<p>The bill of lading does three jobs at once. Tick all three.</p>
<tickbox sub-id="a">
<option correct="true">A receipt for the cargo</option>
<option correct="true">Evidence of the contract of carriage</option>
<option correct="true">A document of title</option>
<option>An insurance certificate</option>
<option>A customs declaration</option>
</tickbox>
</body>
<explanation>Receipt, contract evidence, document of title — three separate legal consequences in one document. The title function is the one that causes trouble: whoever holds the original B/L can claim the goods.</explanation>
</question>`)

add('paper-pi-vs-hm', ['pi-club', 'hm'], `
<question id="paper-pi-vs-hm">
<body>
<image src="/img/vessel-tanker-on-fire-black-smoke-at-sea.jpg" alt="Tanker on fire at sea" width="420"/>
<p>Sort the claims: which insurer answers which loss?</p>
<dragdrop sub-id="a">
<segment>Fire damage to the ship's own engine room: </segment><drop id="g1" answer="c1"/><segment>. A cargo claim from wetted grain: </segment><drop id="g2" answer="c2"/><segment>. An oil pollution claim after a spill: </segment><drop id="g3" answer="c3"/><segment>.</segment>
<bank><chip id="c1">H and M</chip><chip id="c2">P and I</chip><chip id="c3">P and I</chip></bank>
</dragdrop>
</body>
<explanation>Hull and machinery covers damage the ship suffers; the P and I club covers liabilities the ship causes — cargo, pollution, crew. Same casualty, two different policies. (Chips with the same label are interchangeable.)</explanation>
</question>`)

add('paper-class-psc', ['class-society', 'psc'], `
<question id="paper-class-psc">
<body>
<p>Which of these are classification societies? Tick all that apply.</p>
<tickbox sub-id="a">
<option correct="true">Lloyd's Register</option>
<option correct="true">DNV</option>
<option correct="true">ABS</option>
<option>NYPE</option>
<option>GENCON</option>
</tickbox>
</body>
<explanation>Class societies certify structural and mechanical fitness. NYPE and GENCON are charterparty forms — different world. Port state control is the government inspection regime that can detain a ship regardless of class.</explanation>
</question>`)

add('paper-psc-detain', ['psc'], `
<question id="paper-psc-detain">
<body>
<p>True or false: port state control can detain a ship it finds deficient.</p>
<true-false sub-id="a" answer="true"/>
</body>
<explanation>Detention is PSC's teeth — and a detained ship earns nothing, which is why the record matters commercially as well as legally.</explanation>
</question>`)

add('paper-forms', ['cp-forms'], `
<question id="paper-forms">
<body>
<p>Match the standard form to its use.</p>
<dragdrop sub-id="a">
<segment>Dry cargo voyage charter: </segment><drop id="g1" answer="c1"/><segment>. Time charter: </segment><drop id="g2" answer="c2"/><segment>. Tanker voyage charter: </segment><drop id="g3" answer="c3"/><segment>.</segment>
<bank><chip id="c1">GENCON</chip><chip id="c2">NYPE 2015</chip><chip id="c3">ASBATANKVOY</chip></bank>
</dragdrop>
</body>
<explanation>GENCON is the dry voyage workhorse; NYPE 2015 (with BALTIME) the time charter standard; ASBATANKVOY, SHELLTIME and BPVOY live in the tanker world.</explanation>
</question>`)

// ── Braemar ─────────────────────────────────────────────────────────────────

add('braemar-desks', ['shipbroking', 'snp', 'newbuilding', 'securities', 'risk-advisory'], `
<question id="braemar-desks">
<body>
<p>Match each Braemar desk to what it brokes.</p>
<dragdrop sub-id="a">
<segment>Cargoes onto ships (dry, tankers, gas): </segment><drop id="g1" answer="c1"/><segment>. The ships themselves, second-hand: </segment><drop id="g2" answer="c2"/><segment>. Orders at the yards: </segment><drop id="g3" answer="c3"/><segment>. Freight derivatives: </segment><drop id="g4" answer="c4"/><segment>.</segment>
<bank><chip id="c1">chartering</chip><chip id="c2">S and P</chip><chip id="c3">newbuilding</chip><chip id="c4">securities</chip></bank>
</dragdrop>
</body>
<explanation>Chartering fixes cargoes; sale and purchase brokes the ships; newbuilding brokes the yard orders; the securities desk trades FFAs. Risk advisory is the insurance side.</explanation>
</question>`)

add('braemar-onestrand', ['one-strand'], `
<question id="braemar-onestrand">
<body>
<p>What is One Strand?</p>
<choice sub-id="a">
<option correct="true">Braemar's London office</option>
<option>Braemar's flagship FFA index</option>
<option>The Baltic Exchange's trading floor</option>
<option>A single-voyage charterparty form</option>
</choice>
</body>
<explanation>One Strand — the address on the Strand — is the London office you are heading to.</explanation>
</question>`)

add('braemar-snp-written', ['snp'], `
<question id="braemar-snp-written">
<body>
<p>At Braemar, what does the S and P desk's name stand for?</p>
<written sub-id="a" multiline="false" placeholder="Write it out…"/>
</body>
<key><answer sub-id="a" match="fuzzy"><accept>sale and purchase</accept></answer></key>
<explanation>Sale and purchase — brokering the ships themselves rather than the cargoes they carry.</explanation>
</question>`)

export const BANK = Q
