
1	<!DOCTYPE html> 
2	<html lang="en"> 
3	<head> 
4	<meta charset="UTF-8"> 
5	<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
6	<title>C25K + Strength</title> 
7	<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap" rel="stylesheet"> 
8	<style> 
9	:root { 
10	  --bg: #0e0e10; --surface: #18181c; --card: #1f1f26; --border: #2e2e38; 
11	  --accent: #e8ff47; --accent2: #ff6b35; --run: #47b8ff; 
12	  --text: #f0f0f0; --muted: #888; --radius: 12px; 
13	} 
14	* { box-sizing: border-box; margin: 0; padding: 0; } 
15	body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; min-height: 100vh; padding: 0 0 80px; } 
16	 
17	/* ── HEADER ── */ 
18	header { background: linear-gradient(135deg,#0e0e10,#1a1a24); border-bottom: 1px solid var(--border); padding: 24px 20px 20px; position: sticky; top: 0; z-index: 100; } 
19	.header-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; } 
20	header h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(26px,6vw,42px); letter-spacing: 2px; line-height: 1; } 
21	header h1 span { color: var(--accent); } 
22	.week-badge { background: var(--accent); color: #000; font-weight: 700; font-size: 11px; padding: 4px 10px; border-radius: 20px; letter-spacing: 1px; margin-top: 4px; display: inline-block; } 
23	.week-nav { display: flex; align-items: center; gap: 12px; margin-top: 14px; } 
24	.week-nav button { background: var(--card); border: 1px solid var(--border); color: var(--text); width: 32px; height: 32px; border-radius: 50%; font-size: 16px; cursor: pointer; transition: .2s; display: flex; align-items: center; justify-content: center; } 
25	.week-nav button:hover { border-color: var(--accent); color: var(--accent); } 
26	.week-label { font-size: 13px; color: var(--muted); font-weight: 500; } 
27	.catchup-toggle-btn { padding: 8px 14px; background: none; border: 1px solid var(--accent); color: var(--accent); border-radius: 20px; font-size: 11px; font-weight: 700; cursor: pointer; letter-spacing: .5px; transition: .2s; white-space: nowrap; font-family: 'DM Sans', sans-serif; flex-shrink: 0; align-self: flex-start; margin-top: 2px; } 
28	.catchup-toggle-btn:hover, .catchup-toggle-btn.active { background: var(--accent); color: #000; } 
29	 
30	/* ── PROGRESS ── */ 
31	.progress-wrap { padding: 16px 20px 0; } 
32	.progress-info { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); margin-bottom: 6px; } 
33	.progress-track { height: 6px; background: var(--card); border-radius: 3px; overflow: hidden; } 
34	.progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent2), var(--accent)); transition: width .5s ease; } 
35	 
36	/* ── DOTS ── */ 
37	.week-days { display: grid; grid-template-columns: repeat(7,1fr); gap: 6px; padding: 16px 20px 0; } 
38	.day-dot { aspect-ratio: 1; border-radius: 50%; border: 2px solid var(--border); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 9px; font-weight: 600; cursor: pointer; transition: .2s; color: var(--muted); } 
39	.day-dot:hover { border-color: #aaa; color: var(--text); } 
40	.day-dot.today { border-color: var(--text) !important; color: var(--text) !important; } 
41	.day-dot.completed.run        { background: var(--run);    color:#000; border-color:transparent; } 
42	.day-dot.completed.strength-a { background: var(--accent); color:#000; border-color:transparent; } 
43	.day-dot.completed.strength-b { background: var(--accent2);color:#fff; border-color:transparent; } 
44	.day-dot.completed.mobility   { background: #9c6ef5;       color:#fff; border-color:transparent; } 
45	.day-dot.completed.rest       { background: var(--border); color:var(--muted); border-color:transparent; } 
46	 
47	/* ── CATCHUP PANEL ── */ 
48	.catchup-panel { display:none; background: linear-gradient(135deg,#141200,#1c1a00); border: 1px solid rgba(232,255,71,.35); border-radius: var(--radius); margin: 14px 20px 0; padding: 18px; animation: slideDown .2s ease; } 
49	.catchup-panel.visible { display:block; } 
50	@keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} } 
51	.catchup-title { font-family:'Bebas Neue',sans-serif; font-size:22px; color:var(--accent); letter-spacing:1px; margin-bottom:4px; } 
52	.catchup-sub { font-size:12px; color:var(--muted); margin-bottom:14px; line-height:1.6; } 
53	.catchup-scroll { max-height:340px; overflow-y:auto; padding-right:4px; display:flex; flex-direction:column; gap:14px; } 
54	.catchup-scroll::-webkit-scrollbar { width:3px; } 
55	.catchup-scroll::-webkit-scrollbar-thumb { background:var(--border); border-radius:2px; } 
56	.catchup-week-label { font-size:10px; color:var(--muted); text-transform:uppercase; letter-spacing:.8px; font-weight:700; margin-bottom:6px; } 
57	.catchup-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:5px; } 
58	.catchup-cell { aspect-ratio:1; border-radius:8px; border:2px solid var(--border); display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:8px; font-weight:700; cursor:pointer; transition:.15s; color:var(--muted); text-transform:uppercase; gap:2px; user-select:none; } 
59	.catchup-cell:hover:not(.already-done) { border-color:var(--accent); color:var(--text); } 
60	.catchup-cell.selected { border-color:var(--accent)!important; background:rgba(232,255,71,.15); color:var(--accent)!important; } 
61	.catchup-cell.already-done { background:rgba(109,179,63,.1); border-color:rgba(109,179,63,.3); color:#6db33f; cursor:default; } 
62	.catchup-cell .cell-day { font-size:9px; } 
63	.catchup-cell .cell-type { font-size:7px; opacity:.8; } 
64	.catchup-footer { margin-top:14px; } 
65	.catchup-meta { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; } 
66	.catchup-count { font-size:12px; color:var(--accent); font-weight:700; } 
67	.select-all-btn { background:none; border:none; color:var(--muted); font-size:11px; cursor:pointer; padding:4px 8px; border-radius:4px; font-family:'DM Sans',sans-serif; transition:.15s; } 
68	.select-all-btn:hover { color:var(--text); background:rgba(255,255,255,.05); } 
69	.catchup-actions { display:flex; gap:10px; } 
70	.btn-cancel { padding:12px 16px; background:none; border:1px solid var(--border); color:var(--muted); border-radius:8px; font-size:13px; cursor:pointer; font-family:'DM Sans',sans-serif; transition:.2s; } 
71	.btn-cancel:hover { border-color:#666; color:var(--text); } 
72	.btn-confirm { flex:1; padding:12px; background:var(--accent); color:#000; border:none; border-radius:8px; font-weight:700; font-size:14px; cursor:pointer; font-family:'DM Sans',sans-serif; transition:.2s; } 
73	.btn-confirm:hover:not(:disabled) { filter:brightness(1.1); } 
74	.btn-confirm:disabled { opacity:.35; cursor:default; } 
75	 
76	/* ── TABS ── */ 
77	.tabs { display:flex; gap:4px; padding:0 20px; margin-top:16px; } 
78	.tab { flex:1; padding:10px; background:none; border:1px solid var(--border); color:var(--muted); font-size:11px; font-weight:700; cursor:pointer; border-radius:8px; text-transform:uppercase; font-family:'DM Sans',sans-serif; transition:.2s; } 
79	.tab.active { background:var(--accent); color:#000; border-color:var(--accent); } 
80	 
81	main { padding: 20px; } 
82	.view { display:none; } 
83	.view.active { display:block; } 
84	 
85	/* ── TODAY CARD ── */ 
86	.today-card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:20px; margin-bottom:20px; position:relative; overflow:hidden; } 
87	.today-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; } 
88	.today-card.run::before        { background:var(--run); } 
89	.today-card.strength-a::before { background:var(--accent); } 
90	.today-card.strength-b::before { background:var(--accent2); } 
91	.today-card.mobility::before   { background:#9c6ef5; } 
92	.today-card.rest::before       { background:var(--border); } 
93	.today-label { font-size:11px; color:var(--muted); text-transform:uppercase; margin-bottom:4px; } 
94	.today-title { font-family:'Bebas Neue',sans-serif; font-size:28px; line-height:1.1; margin-bottom:14px; } 
95	.type-badge { font-family:'DM Sans',sans-serif; font-size:11px; font-weight:700; padding:3px 8px; border-radius:4px; margin-left:8px; vertical-align:middle; } 
96	.type-badge.run      { background:rgba(71,184,255,.15); color:var(--run); } 
97	.type-badge.strength { background:rgba(232,255,71,.1);  color:var(--accent); } 
98	.type-badge.mob      { background:rgba(156,110,245,.15);color:#9c6ef5; } 
99	.type-badge.rst      { background:var(--border); color:var(--muted); } 
100	 
101	.warmup-section { background:rgba(255,255,255,.03); border:1px solid var(--border); border-radius:8px; padding:12px; margin-bottom:12px; } 
102	.warmup-label { font-size:11px; color:var(--accent); font-weight:700; margin-bottom:4px; text-transform:uppercase; } 
103	.warmup-text { font-size:13px; color:var(--muted); line-height:1.4; } 
104	 
105	/* ── EXERCISE LIST ITEMS ── */ 
106	.exercises { list-style:none; margin:0 0 16px; display:flex; flex-direction:column; gap:8px; } 
107	.ex-item { 
108	  display:flex; align-items:center; gap:12px; 
109	  background:var(--surface); border:1px solid var(--border); 
110	  border-radius:8px; padding:10px 14px; 
111	  cursor:pointer; transition:.15s; position:relative; 
112	} 
113	.ex-item:hover { border-color:#555; background:#202028; } 
114	.ex-item.done-ex { border-color:#2a3a1a; } 
115	.ex-item.done-ex .ex-name { color:var(--muted); text-decoration:line-through; } 
116	.ex-check { width:20px; height:20px; min-width:20px; border-radius:50%; border:2px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:10px; transition:.15s; flex-shrink:0; } 
117	.ex-item.done-ex .ex-check { background:#6db33f; border-color:#6db33f; color:white; } 
118	.ex-detail { font-size:12px; color:var(--muted); margin-top:1px; } 
119	.ex-arrow { margin-left:auto; font-size:14px; color:var(--muted); flex-shrink:0; transition:.2s; } 
120	.ex-item:hover .ex-arrow { color:var(--text); transform:translateX(2px); } 
121	.ex-item.done-ex .ex-arrow { color:#6db33f; } 
122	 
123	/* ── COMPLETE BUTTON ── */ 
124	.complete-btn { width:100%; padding:14px; border:none; border-radius:8px; font-weight:700; font-size:14px; cursor:pointer; margin-top:10px; transition:.2s; font-family:'DM Sans',sans-serif; } 
125	.complete-btn.run        { background:var(--run);    color:#000; } 
126	.complete-btn.strength-a, 
127	.complete-btn.strength-b { background:var(--accent); color:#000; } 
128	.complete-btn.mobility   { background:#9c6ef5;       color:#fff; } 
129	.complete-btn:not(.done):hover { filter:brightness(1.1); transform:translateY(-1px); } 
130	.complete-btn.done { background:#1a2d0a!important; color:#6db33f!important; border:1px solid #6db33f33; transform:none!important; filter:none!important; } 
131	 
132	/* ── EXERCISE MODAL ── */ 
133	.modal-overlay { 
134	  position:fixed; inset:0; background:rgba(0,0,0,.85); 
135	  z-index:500; display:flex; align-items:flex-end; 
136	  opacity:0; pointer-events:none; transition:opacity .25s ease; 
137	  backdrop-filter: blur(4px); 
138	} 
139	.modal-overlay.open { opacity:1; pointer-events:all; } 
140	.modal-sheet { 
141	  background: var(--card); 
142	  border:1px solid var(--border); 
143	  border-radius:20px 20px 0 0; 
144	  width:100%; max-height:90vh; 
145	  overflow-y:auto; 
146	  transform:translateY(100%); 
147	  transition:transform .3s cubic-bezier(.32,.72,0,1); 
148	  padding-bottom: env(safe-area-inset-bottom, 20px); 
149	} 
150	.modal-overlay.open .modal-sheet { transform:translateY(0); } 
151	.modal-sheet::-webkit-scrollbar { display:none; } 
152	 
153	.modal-handle { width:36px; height:4px; background:var(--border); border-radius:2px; margin:12px auto 0; } 
154	.modal-header { padding:16px 20px 0; display:flex; justify-content:space-between; align-items:flex-start; } 
155	.modal-close { background:var(--surface); border:1px solid var(--border); color:var(--muted); width:32px; height:32px; border-radius:50%; font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:.2s; flex-shrink:0; } 
156	.modal-close:hover { border-color:#666; color:var(--text); } 
157	.modal-exercise-name { font-family:'Bebas Neue',sans-serif; font-size:32px; letter-spacing:1px; line-height:1; flex:1; padding-right:12px; } 
158	.modal-sets-badge { background:var(--surface); border:1px solid var(--border); border-radius:20px; font-size:12px; font-weight:700; padding:5px 12px; color:var(--accent); margin:8px 20px 0; display:inline-block; } 
159	 
160	/* SVG illustration area */ 
161	.modal-illustration { 
162	  margin:16px 20px; 
163	  background:var(--surface); 
164	  border:1px solid var(--border); 
165	  border-radius:12px; 
166	  overflow:hidden; 
167	  position:relative; 
168	  min-height:180px; 
169	  display:flex; 
170	  align-items:center; 
171	  justify-content:center; 
172	} 
173	.illustration-inner { 
174	  display:flex; 
175	  gap:0; 
176	  width:100%; 
177	} 
178	.illus-frame { 
179	  flex:1; 
180	  display:flex; 
181	  flex-direction:column; 
182	  align-items:center; 
183	  padding:16px 8px 12px; 
184	  gap:8px; 
185	  border-right:1px solid var(--border); 
186	  position:relative; 
187	} 
188	.illus-frame:last-child { border-right:none; } 
189	.illus-label { 
190	  font-size:9px; 
191	  font-weight:700; 
192	  text-transform:uppercase; 
193	  letter-spacing:.8px; 
194	  color:var(--muted); 
195	} 
196	.illus-frame svg { width:100%; max-width:110px; height:auto; } 
197	 
198	/* Muscles targeted tag */ 
199	.muscle-tags { display:flex; flex-wrap:wrap; gap:6px; padding:0 20px 4px; } 
200	.muscle-tag { font-size:11px; background:rgba(71,184,255,.1); color:var(--run); border:1px solid rgba(71,184,255,.2); padding:3px 9px; border-radius:20px; font-weight:600; } 
201	 
202	/* Steps */ 
203	.modal-steps { padding:0 20px; margin-top:16px; } 
204	.steps-title { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.8px; color:var(--muted); margin-bottom:10px; } 
205	.step-item { display:flex; gap:12px; margin-bottom:12px; align-items:flex-start; } 
206	.step-num { width:24px; height:24px; min-width:24px; border-radius:50%; background:var(--accent); color:#000; font-size:11px; font-weight:700; display:flex; align-items:center; justify-content:center; margin-top:1px; } 
207	.step-text { font-size:14px; line-height:1.5; color:var(--text); } 
208	 
209	/* Tips */ 
210	.modal-tip { margin:14px 20px; background:rgba(232,255,71,.06); border:1px solid rgba(232,255,71,.15); border-radius:8px; padding:12px 14px; } 
211	.tip-label { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.8px; color:var(--accent); margin-bottom:4px; } 
212	.tip-text { font-size:13px; color:var(--muted); line-height:1.5; font-style:italic; } 
213	 
214	/* Modal complete button */ 
215	.modal-complete-wrap { padding:16px 20px 24px; } 
216	.modal-complete-btn { width:100%; padding:16px; border:none; border-radius:10px; font-weight:700; font-size:15px; cursor:pointer; transition:.2s; font-family:'DM Sans',sans-serif; letter-spacing:.3px; } 
217	.modal-complete-btn.run        { background:var(--run);    color:#000; } 
218	.modal-complete-btn.strength-a, 
219	.modal-complete-btn.strength-b { background:var(--accent); color:#000; } 
220	.modal-complete-btn.mobility   { background:#9c6ef5;       color:#fff; } 
221	.modal-complete-btn:not(.done):hover { filter:brightness(1.1); } 
222	.modal-complete-btn.done { background:#1a2d0a!important; color:#6db33f!important; border:1px solid #6db33f44; } 
223	 
224	/* ── STATS ── */ 
225	.section-title { font-family:'Bebas Neue',sans-serif; font-size:20px; color:var(--muted); margin:24px 0 12px; display:flex; align-items:center; gap:8px; } 
226	.section-title::after { content:''; flex:1; height:1px; background:var(--border); } 
227	.stats-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; } 
228	.stat-card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:14px; text-align:center; } 
229	.stat-num { font-family:'Bebas Neue',sans-serif; font-size:28px; color:var(--accent); } 
230	.stat-label { font-size:9px; color:var(--muted); text-transform:uppercase; } 
231	.data-btns { display:flex; gap:10px; margin-top:4px; } 
232	.data-btn { flex:1; padding:10px; background:var(--surface); border:1px solid var(--border); color:var(--text); border-radius:6px; font-size:11px; cursor:pointer; font-family:'DM Sans',sans-serif; transition:.2s; } 
233	.data-btn:hover { border-color:#555; } 
234	 
235	/* ── TOAST ── */ 
236	.toast { position:fixed; bottom:20px; left:50%; transform:translateX(-50%) translateY(100px); background:#6db33f; color:white; padding:12px 24px; border-radius:30px; font-weight:600; transition:.3s; z-index:1000; white-space:nowrap; pointer-events:none; } 
237	.toast.show { transform:translateX(-50%) translateY(0); } 
238	</style> 
239	</head> 
240	<body> 
241	 
242	<header> 
243	  <div class="header-top"> 
244	    <div> 
245	      <h1>C25K <span>+</span> STRENGTH</h1> 
246	      <div class="week-badge" id="phase-badge">PHASE: WEEKS 1–2</div> 
247	    </div> 
248	    <button class="catchup-toggle-btn" id="catchup-btn" onclick="toggleCatchup()">✦ CATCH UP</button> 
249	  </div> 
250	  <div class="week-nav"> 
251	    <button onclick="changeWeek(-1)">‹</button> 
252	    <span class="week-label" id="week-label">WEEK 1 OF 8</span> 
253	    <button onclick="changeWeek(1)">›</button> 
254	  </div> 
255	</header> 
256	 
257	<div class="progress-wrap"> 
258	  <div class="progress-info"><span id="prog-label">0 of 56 days logged</span><span id="prog-pct">0%</span></div> 
259	  <div class="progress-track"><div class="progress-fill" id="prog-fill" style="width:0%"></div></div> 
260	</div> 
261	<div class="week-days" id="week-dots"></div> 
262	 
263	<div class="catchup-panel" id="catchup-panel"> 
264	  <div class="catchup-title">✦ Mark Past Days Complete</div> 
265	  <div class="catchup-sub">Tap days you've already done to select them, then hit Confirm. Green days are already logged.</div> 
266	  <div class="catchup-scroll" id="catchup-scroll"></div> 
267	  <div class="catchup-footer"> 
268	    <div class="catchup-meta"> 
269	      <span class="catchup-count" id="catchup-count">0 days selected</span> 
270	      <button class="select-all-btn" onclick="selectAllPast()">Select all past days</button> 
271	    </div> 
272	    <div class="catchup-actions"> 
273	      <button class="btn-cancel" onclick="toggleCatchup()">Cancel</button> 
274	      <button class="btn-confirm" id="catchup-confirm" onclick="confirmCatchup()" disabled>Confirm Selected</button> 
275	    </div> 
276	  </div> 
277	</div> 
278	 
279	<div class="tabs"> 
280	  <button class="tab active" onclick="switchTab('today',this)">TODAY</button> 
281	  <button class="tab" onclick="switchTab('progress',this)">PROGRESS</button> 
282	</div> 
283	 
284	<main> 
285	  <div class="view active" id="view-today"><div id="today-section"></div></div> 
286	  <div class="view" id="view-progress"> 
287	    <div class="section-title">Lifetime Stats</div> 
288	    <div class="stats-grid"> 
289	      <div class="stat-card"><div class="stat-num" id="stat-runs">0</div><div class="stat-label">Runs</div></div> 
290	      <div class="stat-card"><div class="stat-num" id="stat-strength">0</div><div class="stat-label">Strength</div></div> 
291	      <div class="stat-card"><div class="stat-num" id="stat-total">0</div><div class="stat-label">Total</div></div> 
292	    </div> 
293	    <div class="section-title">Data</div> 
294	    <div class="data-btns"> 
295	      <button class="data-btn" onclick="exportData()">⬇ Export Backup</button> 
296	      <button class="data-btn" onclick="importData()">⬆ Import Backup</button> 
297	    </div> 
298	  </div> 
299	</main> 
300	 
301	<!-- ── EXERCISE MODAL ── --> 
302	<div class="modal-overlay" id="modal-overlay" onclick="handleOverlayClick(event)"> 
303	  <div class="modal-sheet" id="modal-sheet"> 
304	    <div class="modal-handle"></div> 
305	    <div class="modal-header"> 
306	      <div class="modal-exercise-name" id="modal-name">Exercise</div> 
307	      <button class="modal-close" onclick="closeModal()">✕</button> 
308	    </div> 
309	    <div class="modal-sets-badge" id="modal-sets"></div> 
310	    <div class="modal-illustration" id="modal-illustration"></div> 
311	    <div class="muscle-tags" id="modal-muscles"></div> 
312	    <div class="modal-steps"> 
313	      <div class="steps-title">How to do it</div> 
314	      <div id="modal-steps-content"></div> 
315	    </div> 
316	    <div class="modal-tip" id="modal-tip-block"> 
317	      <div class="tip-label">💡 Pro Tip</div> 
318	      <div class="tip-text" id="modal-tip"></div> 
319	    </div> 
320	    <div class="modal-complete-wrap"> 
321	      <button class="modal-complete-btn" id="modal-complete-btn" onclick="completeFromModal()">Mark Exercise Complete</button> 
322	    </div> 
323	  </div> 
324	</div> 
325	 
326	<div class="toast" id="toast"></div> 
327	 
328	<script> 
329	/* ───────────────────────────────────────────────── 
330	   PLAN & STATE 
331	───────────────────────────────────────────────── */ 
332	const PLAN = [ 
333	  { day:'Mon', type:'run',        label:'Run – C25K' }, 
334	  { day:'Tue', type:'strength-a', label:'Strength A' }, 
335	  { day:'Wed', type:'run',        label:'Run – C25K' }, 
336	  { day:'Thu', type:'mobility',   label:'Mobility Day' }, 
337	  { day:'Fri', type:'strength-b', label:'Strength B' }, 
338	  { day:'Sat', type:'run',        label:'Run – C25K' }, 
339	  { day:'Sun', type:'rest',       label:'Rest Day' } 
340	]; 
341	const TYPE_SHORT = { run:'RUN', 'strength-a':'STR A', 'strength-b':'STR B', mobility:'MOB', rest:'REST' }; 
342	 
343	let state = JSON.parse(localStorage.getItem('c25k_v2')||'null') || { currentWeek:1, completed:{}, exDone:{}, notes:{} }; 
344	function save() { localStorage.setItem('c25k_v2', JSON.stringify(state)); } 
345	 
346	/* ───────────────────────────────────────────────── 
347	   SVG STICK FIGURES — each returns an SVG string 
348	   We use simple SVG paths for clarity at small sizes 
349	───────────────────────────────────────────────── */ 
350	const SVG = { 
351	  // Generic standing figure 
352	  stand: (accent='#e8ff47') => `<svg viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg"> 
353	    <circle cx="40" cy="16" r="10" stroke="${accent}" stroke-width="2.5" fill="none"/> 
354	    <line x1="40" y1="26" x2="40" y2="75" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
355	    <line x1="40" y1="40" x2="18" y2="58" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
356	    <line x1="40" y1="40" x2="62" y2="58" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
357	    <line x1="40" y1="75" x2="24" y2="115" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
358	    <line x1="40" y1="75" x2="56" y2="115" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
359	  </svg>`, 
360	 
361	  // Squat position 
362	  squat: (accent='#e8ff47') => `<svg viewBox="0 0 90 110" fill="none" xmlns="http://www.w3.org/2000/svg"> 
363	    <circle cx="45" cy="12" r="9" stroke="${accent}" stroke-width="2.5" fill="none"/> 
364	    <line x1="45" y1="21" x2="45" y2="52" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
365	    <line x1="45" y1="35" x2="18" y2="48" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
366	    <line x1="45" y1="35" x2="72" y2="48" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
367	    <line x1="45" y1="52" x2="22" y2="72" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
368	    <line x1="45" y1="52" x2="68" y2="72" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
369	    <line x1="22" y1="72" x2="15" y2="100" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
370	    <line x1="68" y1="72" x2="75" y2="100" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
371	    <line x1="15" y1="100" x2="10" y2="100" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
372	    <line x1="75" y1="100" x2="80" y2="100" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
373	  </svg>`, 
374	 
375	  // Bridge position (lying, hips up) 
376	  bridge: (accent='#47b8ff') => `<svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg"> 
377	    <line x1="5" y1="70" x2="115" y2="70" stroke="#2e2e38" stroke-width="2"/> 
378	    <circle cx="18" cy="38" r="9" stroke="${accent}" stroke-width="2.5" fill="none"/> 
379	    <line x1="18" y1="47" x2="30" y2="60" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
380	    <line x1="30" y1="60" x2="58" y2="42" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
381	    <line x1="58" y1="42" x2="80" y2="68" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
382	    <line x1="80" y1="68" x2="100" y2="68" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
383	    <line x1="30" y1="60" x2="12" y2="68" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
384	    <path d="M18 47 Q8 54 12 68" stroke="${accent}" stroke-width="2.5" fill="none" stroke-linecap="round"/> 
385	    <circle cx="58" cy="36" r="5" fill="${accent}" fill-opacity=".3" stroke="${accent}" stroke-width="1.5"/> 
386	  </svg>`, 
387	 
388	  // Bird-dog (on all fours, opposite arm/leg extended) 
389	  birddog: (accent='#e8ff47') => `<svg viewBox="0 0 130 90" fill="none" xmlns="http://www.w3.org/2000/svg"> 
390	    <line x1="5" y1="80" x2="125" y2="80" stroke="#2e2e38" stroke-width="2"/> 
391	    <circle cx="28" cy="38" r="9" stroke="${accent}" stroke-width="2.5" fill="none"/> 
392	    <line x1="28" y1="47" x2="40" y2="55" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
393	    <line x1="40" y1="55" x2="80" y2="55" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
394	    <line x1="80" y1="55" x2="98" y2="38" stroke="${accent}" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="4 2"/> 
395	    <line x1="40" y1="55" x2="35" y2="78" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
396	    <line x1="55" y1="55" x2="50" y2="78" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
397	    <line x1="65" y1="55" x2="70" y2="78" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
398	    <line x1="28" y1="47" x2="8" y2="35" stroke="${accent}" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="4 2"/> 
399	    <circle cx="98" cy="36" r="4" fill="${accent}" fill-opacity=".3" stroke="${accent}" stroke-width="1.5"/> 
400	    <circle cx="8" cy="33" r="4" fill="${accent}" fill-opacity=".3" stroke="${accent}" stroke-width="1.5"/> 
401	  </svg>`, 
402	 
403	  // Calf raise (standing on toes) 
404	  calfraise: (accent='#e8ff47') => `<svg viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg"> 
405	    <line x1="5" y1="120" x2="75" y2="120" stroke="#2e2e38" stroke-width="2"/> 
406	    <circle cx="40" cy="12" r="9" stroke="${accent}" stroke-width="2.5" fill="none"/> 
407	    <line x1="40" y1="21" x2="40" y2="68" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
408	    <line x1="40" y1="37" x2="20" y2="55" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
409	    <line x1="40" y1="37" x2="60" y2="55" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
410	    <line x1="40" y1="68" x2="30" y2="100" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
411	    <line x1="40" y1="68" x2="50" y2="100" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
412	    <line x1="30" y1="100" x2="26" y2="115" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
413	    <line x1="50" y1="100" x2="54" y2="115" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
414	    <line x1="26" y1="115" x2="22" y2="115" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
415	    <line x1="54" y1="115" x2="58" y2="115" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
416	    <path d="M34 100 L28 108 L26 115" stroke="${accent}" stroke-width="1.5" fill="none" opacity=".5"/> 
417	    <path d="M46 100 L52 108 L54 115" stroke="${accent}" stroke-width="1.5" fill="none" opacity=".5"/> 
418	  </svg>`, 
419	 
420	  // Clamshell (side-lying, knee open) 
421	  clam: (accent='#9c6ef5') => `<svg viewBox="0 0 130 80" fill="none" xmlns="http://www.w3.org/2000/svg"> 
422	    <line x1="5" y1="72" x2="125" y2="72" stroke="#2e2e38" stroke-width="2"/> 
423	    <circle cx="18" cy="30" r="9" stroke="${accent}" stroke-width="2.5" fill="none"/> 
424	    <line x1="18" y1="39" x2="30" y2="58" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
425	    <path d="M30 58 Q60 30 80 60" stroke="${accent}" stroke-width="2.5" fill="none" stroke-linecap="round"/> 
426	    <line x1="80" y1="60" x2="105" y2="68" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
427	    <line x1="30" y1="58" x2="70" y2="68" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
428	    <line x1="70" y1="68" x2="105" y2="68" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
429	    <line x1="18" y1="39" x2="10" y2="60" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
430	    <circle cx="80" cy="55" r="5" fill="${accent}" fill-opacity=".3" stroke="${accent}" stroke-width="1.5"/> 
431	  </svg>`, 
432	 
433	  // Pushup position 
434	  pushup: (accent='#ff6b35') => `<svg viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg"> 
435	    <line x1="5" y1="72" x2="135" y2="72" stroke="#2e2e38" stroke-width="2"/> 
436	    <circle cx="22" cy="28" r="9" stroke="${accent}" stroke-width="2.5" fill="none"/> 
437	    <line x1="22" y1="37" x2="35" y2="55" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
438	    <line x1="35" y1="45" x2="90" y2="45" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
439	    <line x1="90" y1="45" x2="110" y2="68" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
440	    <line x1="35" y1="55" x2="15" y2="68" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
441	    <line x1="35" y1="55" x2="28" y2="68" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
442	    <line x1="90" y1="45" x2="100" y2="68" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
443	  </svg>`, 
444	 
445	  // Chair dip 
446	  dip: (accent='#ff6b35') => `<svg viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg"> 
447	    <rect x="55" y="40" width="45" height="6" rx="2" stroke="${accent}" stroke-width="2" fill="none" opacity=".4"/> 
448	    <line x1="58" y1="46" x2="58" y2="100" stroke="${accent}" stroke-width="2" opacity=".4"/> 
449	    <line x1="97" y1="46" x2="97" y2="100" stroke="${accent}" stroke-width="2" opacity=".4"/> 
450	    <circle cx="28" cy="18" r="9" stroke="${accent}" stroke-width="2.5" fill="none"/> 
451	    <line x1="28" y1="27" x2="30" y2="55" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
452	    <line x1="30" y1="38" x2="12" y2="52" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
453	    <line x1="30" y1="38" x2="58" y2="43" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
454	    <line x1="30" y1="55" x2="20" y2="90" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
455	    <line x1="30" y1="55" x2="40" y2="90" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
456	    <line x1="20" y1="90" x2="20" y2="100" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
457	    <line x1="40" y1="90" x2="40" y2="100" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
458	  </svg>`, 
459	 
460	  // Dead bug (on back, opposite arm/leg extended) 
461	  deadbug: (accent='#ff6b35') => `<svg viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg"> 
462	    <line x1="5" y1="72" x2="135" y2="72" stroke="#2e2e38" stroke-width="2"/> 
463	    <circle cx="70" cy="40" r="9" stroke="${accent}" stroke-width="2.5" fill="none"/> 
464	    <line x1="70" y1="49" x2="70" y2="64" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
465	    <line x1="70" y1="54" x2="45" y2="46" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
466	    <line x1="70" y1="54" x2="95" y2="46" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
467	    <line x1="70" y1="64" x2="50" y2="70" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
468	    <line x1="70" y1="64" x2="90" y2="70" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
469	    <line x1="45" y1="46" x2="20" y2="36" stroke="${accent}" stroke-width="2.2" stroke-dasharray="4 2" stroke-linecap="round"/> 
470	    <line x1="90" y1="70" x2="120" y2="60" stroke="${accent}" stroke-width="2.2" stroke-dasharray="4 2" stroke-linecap="round"/> 
471	    <circle cx="20" cy="34" r="4" fill="${accent}" fill-opacity=".3" stroke="${accent}" stroke-width="1.5"/> 
472	    <circle cx="120" cy="58" r="4" fill="${accent}" fill-opacity=".3" stroke="${accent}" stroke-width="1.5"/> 
473	  </svg>`, 
474	 
475	  // Plank 
476	  plank: (accent='#ff6b35') => `<svg viewBox="0 0 140 70" fill="none" xmlns="http://www.w3.org/2000/svg"> 
477	    <line x1="5" y1="62" x2="135" y2="62" stroke="#2e2e38" stroke-width="2"/> 
478	    <circle cx="22" cy="22" r="9" stroke="${accent}" stroke-width="2.5" fill="none"/> 
479	    <line x1="22" y1="31" x2="30" y2="45" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
480	    <line x1="30" y1="38" x2="95" y2="38" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
481	    <line x1="95" y1="38" x2="100" y2="58" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
482	    <line x1="100" y1="58" x2="115" y2="58" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
483	    <line x1="30" y1="45" x2="22" y2="58" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
484	    <line x1="22" y1="58" x2="38" y2="58" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
485	  </svg>`, 
486	 
487	  // Lunge 
488	  lunge: (accent='#e8ff47') => `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"> 
489	    <line x1="5" y1="110" x2="115" y2="110" stroke="#2e2e38" stroke-width="2"/> 
490	    <circle cx="55" cy="14" r="9" stroke="${accent}" stroke-width="2.5" fill="none"/> 
491	    <line x1="55" y1="23" x2="55" y2="58" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
492	    <line x1="55" y1="38" x2="32" y2="52" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
493	    <line x1="55" y1="38" x2="78" y2="52" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
494	    <line x1="55" y1="58" x2="35" y2="88" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
495	    <line x1="55" y1="58" x2="75" y2="78" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
496	    <line x1="35" y1="88" x2="28" y2="108" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
497	    <line x1="75" y1="78" x2="88" y2="108" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
498	  </svg>`, 
499	 
500	  // Walk / run 
501	  walk: (accent='#47b8ff') => `<svg viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg"> 
502	    <line x1="5" y1="120" x2="75" y2="120" stroke="#2e2e38" stroke-width="2"/> 
503	    <circle cx="42" cy="12" r="9" stroke="${accent}" stroke-width="2.5" fill="none"/> 
504	    <line x1="42" y1="21" x2="40" y2="65" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
505	    <line x1="41" y1="38" x2="18" y2="50" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
506	    <line x1="41" y1="38" x2="62" y2="55" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
507	    <line x1="40" y1="65" x2="22" y2="95" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
508	    <line x1="40" y1="65" x2="55" y2="90" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
509	    <line x1="22" y1="95" x2="15" y2="118" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
510	    <line x1="55" y1="90" x2="62" y2="115" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
511	    <line x1="15" y1="118" x2="8"  y2="118" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
512	    <line x1="62" y1="115" x2="70" y2="115" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
513	  </svg>`, 
514	 
515	  // Stretch (standing, leg held behind) 
516	  stretch: (accent='#9c6ef5') => `<svg viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg"> 
517	    <line x1="5" y1="120" x2="75" y2="120" stroke="#2e2e38" stroke-width="2"/> 
518	    <circle cx="40" cy="12" r="9" stroke="${accent}" stroke-width="2.5" fill="none"/> 
519	    <line x1="40" y1="21" x2="40" y2="70" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
520	    <line x1="40" y1="38" x2="16" y2="52" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
521	    <line x1="40" y1="38" x2="64" y2="52" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
522	    <line x1="40" y1="70" x2="28" y2="100" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
523	    <line x1="40" y1="70" x2="52" y2="90" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
524	    <line x1="28" y1="100" x2="22" y2="118" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/> 
525	    <path d="M52 90 Q68 100 64 52" stroke="${accent}" stroke-width="2" fill="none" stroke-dasharray="4 2" stroke-linecap="round"/> 
526	  </svg>` 
527	}; 
528	 
529	/* ───────────────────────────────────────────────── 
530	   EXERCISE DATABASE — full instructions per exercise 
531	───────────────────────────────────────────────── */ 
532	const EX_DATA = { 
533	  'Brisk Walk Warm-up': { 
534	    muscles: ['Legs', 'Cardiovascular'], 
535	    sets: '5 minutes', 
536	    illustrations: [ 
537	      { label: 'Start', svg: SVG.walk('#47b8ff') }, 
538	      { label: 'Stride', svg: SVG.walk('#47b8ff') } 
539	    ], 
540	    steps: [ 
541	      'Stand tall with shoulders back and head up.', 
542	      'Begin walking at a comfortable pace and gradually increase to a brisk, purposeful stride.', 
543	      'Swing your arms naturally to help increase your heart rate.', 
544	      'Breathe deeply and evenly through your nose and mouth.', 
545	      'Continue for 5 minutes until you feel warm and loose.' 
546	    ], 
547	    tip: 'A good warm-up pace is one where you can still hold a conversation but feel your heart rate rising.' 
548	  }, 
549	  'C25K Intervals': { 
550	    muscles: ['Full Body', 'Cardiovascular', 'Legs'], 
551	    sets: 'Program intervals', 
552	    illustrations: [ 
553	      { label: 'Walk', svg: SVG.walk('#47b8ff') }, 
554	      { label: 'Run', svg: SVG.walk('#e8ff47') } 
555	    ], 
556	    steps: [ 
557	      'Follow the intervals for your current C25K week — alternating between walking and running.', 
558	      'During run segments: land mid-foot, keep an upright posture, and take short quick strides.', 
559	      'During walk segments: recover your breathing and shake out your hands.', 
560	      'Keep your gaze ahead, not down at your feet.', 
561	      'Finish the last interval and slow to a walk for your cool-down.' 
562	    ], 
563	    tip: 'Run at a "conversational" pace — you should be able to say a few words, even if it\'s tough.' 
564	  }, 
565	  'Cool-down Walk': { 
566	    muscles: ['Recovery', 'Cardiovascular'], 
567	    sets: '5 minutes', 
568	    illustrations: [ 
569	      { label: 'Slow walk', svg: SVG.walk('#888') }, 
570	    ], 
571	    steps: [ 
572	      'After your final run interval, drop to a slow, easy walk immediately.', 
573	      'Let your breathing naturally slow down — don\'t hold your breath.', 
574	      'Gradually reduce your pace over 5 minutes.', 
575	      'Finish with some gentle leg shakes and ankle circles.' 
576	    ], 
577	    tip: 'Never stop suddenly after running — always walk it off to prevent blood pooling in your legs.' 
578	  }, 
579	  'Chair Squats': { 
580	    muscles: ['Quads', 'Glutes', 'Hamstrings'], 
581	    sets: '3 sets', 
582	    illustrations: [ 
583	      { label: 'Standing', svg: SVG.stand('#e8ff47') }, 
584	      { label: 'Lowering', svg: SVG.squat('#e8ff47') } 
585	    ], 
586	    steps: [ 
587	      'Stand in front of a sturdy chair with feet shoulder-width apart, toes slightly out.', 
588	      'Brace your core and keep your chest tall.', 
589	      'Push your hips back and bend your knees as if about to sit down.', 
590	      'Lower until your bottom lightly touches (or hovers over) the seat.', 
591	      'Press through your heels to stand back up, squeezing your glutes at the top.' 
592	    ], 
593	    tip: 'Keep your knees tracking over your toes — don\'t let them cave inward. The chair is a safety net, not a seat!' 
594	  }, 
595	  'Glute Bridges': { 
596	    muscles: ['Glutes', 'Hamstrings', 'Core'], 
597	    sets: '3 sets', 
598	    illustrations: [ 
599	      { label: 'Start', svg: SVG.bridge('#e8ff47') }, 
600	      { label: 'Hold at top', svg: SVG.bridge('#47b8ff') } 
601	    ], 
602	    steps: [ 
603	      'Lie on your back with knees bent, feet flat on the floor hip-width apart.', 
604	      'Place arms flat by your sides, palms facing down.', 
605	      'Press through your heels and squeeze your glutes to lift your hips off the floor.', 
606	      'Raise until your body forms a straight line from shoulders to knees.', 
607	      'Squeeze and hold for 2 seconds at the top, then lower slowly back down.' 
608	    ], 
609	    tip: 'Imagine you\'re trying to hold a coin between your glutes at the top of the movement — that\'s the squeeze you\'re after!' 
610	  }, 
611	  'Bird Dogs': { 
612	    muscles: ['Core', 'Lower Back', 'Glutes'], 
613	    sets: '3 sets each side', 
614	    illustrations: [ 
615	      { label: 'Start', svg: SVG.birddog('#e8ff47') }, 
616	      { label: 'Extended', svg: SVG.birddog('#47b8ff') } 
617	    ], 
618	    steps: [ 
619	      'Start on all fours — wrists under shoulders, knees under hips, back flat like a table.', 
620	      'Brace your core to prevent your hips from rocking.', 
621	      'Slowly extend your right arm forward and your left leg back at the same time.', 
622	      'Hold for 1–2 seconds, keeping hips level and parallel to the floor.', 
623	      'Return to start with control, then repeat on the opposite side (left arm, right leg).' 
624	    ], 
625	    tip: 'If your hips twist, slow down. Control beats speed here — quality reps build the stability you need for running.' 
626	  }, 
627	  'Standing Calf Raises': { 
628	    muscles: ['Calves', 'Ankles'], 
629	    sets: '3 sets', 
630	    illustrations: [ 
631	      { label: 'Flat', svg: SVG.calfraise('#888') }, 
632	      { label: 'Up on toes', svg: SVG.calfraise('#e8ff47') } 
633	    ], 
634	    steps: [ 
635	      'Stand with feet hip-width apart near a wall or chair for light balance support.', 
636	      'Rise up slowly onto the balls of your feet, lifting your heels as high as you can.', 
637	      'Pause at the top for 1 second, feeling the contraction in your calves.', 
638	      'Lower slowly and with control back to the floor — 2–3 seconds down.', 
639	      'Do not bounce at the bottom — a full range of motion is the goal.' 
640	    ], 
641	    tip: 'Slow the lowering phase right down. The eccentric (lowering) portion is key for building calf strength and protecting your Achilles for running.' 
642	  }, 
643	  'Side Clamshells': { 
644	    muscles: ['Hip Abductors', 'Glutes', 'IT Band'], 
645	    sets: '2 sets each side', 
646	    illustrations: [ 
647	      { label: 'Closed', svg: SVG.clam('#9c6ef5') }, 
648	      { label: 'Open', svg: SVG.clam('#e8ff47') } 
649	    ], 
650	    steps: [ 
651	      'Lie on your side with hips stacked, knees bent to about 45 degrees, feet together.', 
652	      'Rest your head on your lower arm and place the top hand on your hip to prevent rolling.', 
653	      'Keeping your feet together, rotate your top knee up toward the ceiling like a clamshell opening.', 
654	      'Lift only as high as you can without your pelvis rotating backward.', 
655	      'Hold briefly at the top, then lower with control. Complete all reps before switching sides.' 
656	    ], 
657	    tip: 'Place a hand on your top glute — you should feel it working. If you don\'t, you\'re probably rotating your pelvis instead of isolating the hip.' 
658	  }, 
659	  'Push-ups': { 
660	    muscles: ['Chest', 'Shoulders', 'Triceps', 'Core'], 
661	    sets: '5 sets', 
662	    illustrations: [ 
663	      { label: 'Top (up)', svg: SVG.pushup('#ff6b35') }, 
664	      { label: 'Bottom (down)', svg: SVG.pushup('#e8ff47') } 
665	    ], 
666	    steps: [ 
667	      'Start in a high plank: hands slightly wider than shoulder-width, body in a straight line from head to heels.', 
668	      'If this is too difficult, drop to your knees — keep a straight line from knees to head.', 
669	      'Brace your core and squeeze your glutes throughout the movement.', 
670	      'Lower your chest toward the floor, keeping elbows at roughly 45° from your sides.', 
671	      'Push the floor away to return to the top, fully extending your arms without locking elbows.' 
672	    ], 
673	    tip: 'Think "push the floor away" rather than "push yourself up" — it changes the whole feel and keeps your core engaged.' 
674	  }, 
675	  'Chair Dips': { 
676	    muscles: ['Triceps', 'Shoulders', 'Chest'], 
677	    sets: '3 sets', 
678	    illustrations: [ 
679	      { label: 'Up position', svg: SVG.dip('#ff6b35') }, 
680	      { label: 'Dipped', svg: SVG.dip('#e8ff47') } 
681	    ], 
682	    steps: [ 
683	      'Sit on the edge of a sturdy chair or low table, hands gripping the edge beside your hips.', 
684	      'Slide your bottom off the edge, supporting your weight on your hands, legs extended.', 
685	      'Keep your back close to the chair and shoulders down (not shrugged).', 
686	      'Bend your elbows to lower your body toward the floor — aim for 90° at the elbows.', 
687	      'Press back up to the start, straightening your arms fully at the top.' 
688	    ], 
689	    tip: 'Keep your elbows pointing straight back, not flaring out to the sides — this protects your shoulder joints and targets the triceps properly.' 
690	  }, 
691	  'Dead Bugs': { 
692	    muscles: ['Core', 'Transverse Abdominis', 'Hip Flexors'], 
693	    sets: '3 sets each side', 
694	    illustrations: [ 
695	      { label: 'Start', svg: SVG.deadbug('#ff6b35') }, 
696	      { label: 'Extended', svg: SVG.deadbug('#e8ff47') } 
697	    ], 
698	    steps: [ 
699	      'Lie on your back, arms pointing straight up to the ceiling, hips and knees at 90°.', 
700	      'Press your lower back firmly into the floor — maintain this contact throughout.', 
701	      'Slowly lower your right arm behind your head and your left leg toward the floor simultaneously.', 
702	      'Go only as low as you can without your lower back lifting off the floor.', 
703	      'Return to start under control, then repeat on the opposite side (left arm, right leg).' 
704	    ], 
705	    tip: 'Exhale as you extend. The secret is keeping your lower back glued to the floor — if it lifts, you\'ve gone too far.' 
706	  }, 
707	  'Kneeling Plank': { 
708	    muscles: ['Core', 'Shoulders', 'Glutes'], 
709	    sets: '3 sets', 
710	    illustrations: [ 
711	      { label: 'Hold position', svg: SVG.plank('#ff6b35') } 
712	    ], 
713	    steps: [ 
714	      'Start on your forearms and knees, forearms flat on the floor, elbows under shoulders.', 
715	      'Form a straight line from your head through your knees — no sagging hips or raised bottom.', 
716	      'Brace your core as if bracing for a punch to the stomach.', 
717	      'Keep your neck in neutral — look at the floor slightly ahead of your hands.', 
718	      'Breathe steadily and hold for the prescribed time. Relax and repeat.' 
719	    ], 
720	    tip: 'Squeeze your glutes during the hold — it locks in your pelvis and makes the core work even harder.' 
721	  }, 
722	  'Lunges': { 
723	    muscles: ['Quads', 'Glutes', 'Hamstrings', 'Balance'], 
724	    sets: '2 sets each side', 
725	    illustrations: [ 
726	      { label: 'Standing', svg: SVG.stand('#e8ff47') }, 
727	      { label: 'Lunge', svg: SVG.lunge('#e8ff47') } 
728	    ], 
729	    steps: [ 
730	      'Stand tall with feet hip-width apart and hands on your hips or by your sides.', 
731	      'Step one foot forward about two feet, keeping your torso upright.', 
732	      'Lower your back knee toward the floor — aim for both knees at 90°.', 
733	      'Your front knee should stay directly over your front ankle, not pushing forward past your toes.', 
734	      'Push through your front heel to step back to the start. Complete all reps on one side, then switch.' 
735	    ], 
736	    tip: 'If your front knee wobbles inward, slow down and focus on pressing it outward over your little toe — this builds hip stability for running.' 
737	  }, 
738	  'Calf Stretch': { 
739	    muscles: ['Calves', 'Achilles Tendon'], 
740	    sets: '30s each side', 
741	    illustrations: [ 
742	      { label: 'Stretch', svg: SVG.stretch('#9c6ef5') } 
743	    ], 
744	    steps: [ 
745	      'Stand facing a wall with both hands placed on it at chest height.', 
746	      'Step one foot back, keeping the back leg straight and back heel pressed firmly to the floor.', 
747	      'Lean into the wall gently, bending your front knee until you feel a stretch in the back calf.', 
748	      'Hold for 30 seconds, breathing normally.', 
749	      'Switch legs and repeat.' 
750	    ], 
751	    tip: 'For the deeper calf muscle (soleus), try the same stretch but with a slight bend in the back knee — you\'ll feel it lower down.' 
752	  }, 
753	  'Quad Stretch': { 
754	    muscles: ['Quadriceps', 'Hip Flexors'], 
755	    sets: '30s each side', 
756	    illustrations: [ 
757	      { label: 'Hold', svg: SVG.stretch('#9c6ef5') } 
758	    ], 
759	    steps: [ 
760	      'Stand near a wall for balance support if needed.', 
761	      'Shift weight onto your left foot and lift your right foot behind you.', 
762	      'Grasp your right ankle with your right hand, gently pulling the heel toward your glutes.', 
763	      'Keep knees together and stand tall — don\'t lean forward.', 
764	      'Hold for 30 seconds, then switch sides.' 
765	    ], 
766	    tip: 'Keep your standing knee slightly soft (not locked). If you struggle with balance, hold a wall or chair.' 
767	  }, 
768	  'Hamstring Stretch': { 
769	    muscles: ['Hamstrings', 'Lower Back'], 
770	    sets: '30s each side', 
771	    illustrations: [ 
772	      { label: 'Stretch', svg: SVG.stretch('#9c6ef5') } 
773	    ], 
774	    steps: [ 
775	      'Sit on the floor with your right leg extended straight and left foot tucked toward your inner thigh.', 
776	      'Sit tall and hinge forward from your hips — not rounding your back.', 
777	      'Reach toward your right foot as far as comfortable without forcing.', 
778	      'Hold for 30 seconds, feeling the stretch along the back of your right thigh.', 
779	      'Switch legs and repeat.' 
780	    ], 
781	    tip: 'Don\'t round your back to reach further. A proper hip hinge with less reach is far more effective than a rounded back with more reach.' 
782	  }, 
783	  'Piriformis Stretch': { 
784	    muscles: ['Piriformis', 'Glutes', 'Hip Rotators'], 
785	    sets: '30s each side', 
786	    illustrations: [ 
787	      { label: 'Stretch', svg: SVG.stretch('#9c6ef5') } 
788	    ], 
789	    steps: [ 
790	      'Lie on your back with both knees bent and feet flat on the floor.', 
791	      'Place your right ankle across your left thigh, just above the knee (like a figure-4).', 
792	      'Flex your right foot to protect the knee.', 
793	      'Either stay here or gently pull your left thigh toward your chest until you feel a stretch deep in your right hip.', 
794	      'Hold for 30 seconds, then switch sides.' 
795	    ], 
796	    tip: 'This stretch targets the piriformis — a muscle that can tighten up from running and contribute to sciatica-like symptoms. Take your time with it.' 
797	  }, 
798	  'Optional Walk': { 
799	    muscles: ['Recovery', 'Legs', 'Cardiovascular'], 
800	    sets: '10–15 mins', 
801	    illustrations: [ 
802	      { label: 'Easy pace', svg: SVG.walk('#9c6ef5') } 
803	    ], 
804	    steps: [ 
805	      'Head outside or use a treadmill at a relaxed, easy pace.', 
806	      'Focus on deep belly breathing — in through the nose, out through the mouth.', 
807	      'Keep the pace comfortable — this is active recovery, not a workout.', 
808	      'Notice how your body feels: any tight spots, fatigue, or discomfort to address.', 
809	      'End feeling refreshed rather than tired.' 
810	    ], 
811	    tip: 'This optional walk on mobility days keeps blood flowing to help muscles recover faster without adding stress to your body.' 
812	  } 
813	}; 
814	 
815	/* ───────────────────────────────────────────────── 
816	   WORKOUT BUILDER 
817	───────────────────────────────────────────────── */ 
818	function getWorkout(type, week) { 
819	  if (type === 'run') return { warmup: null, exercises: [ 
820	    { name:'Brisk Walk Warm-up', detail:'5 minutes' }, 
821	    { name:'C25K Intervals',     detail:`Week ${week} intervals` }, 
822	    { name:'Cool-down Walk',     detail:'5 minutes' } 
823	  ]}; 
824	  if (type === 'strength-a') { 
825	    const sq = week>=5?12:week>=3?10:8; 
826	    const br = week>=3?12:10; 
827	    return { warmup:'10 pelvic tilts · 10 hip circles · 8 cat–cow', exercises:[ 
828	      { name:'Chair Squats',         detail:`3 sets × ${sq} reps` }, 
829	      { name:'Glute Bridges',        detail:`3 sets × ${br} reps (2s squeeze)` }, 
830	      { name:'Bird Dogs',            detail:'3 sets × 8 reps each side' }, 
831	      { name:'Standing Calf Raises', detail:'3 sets × 12 reps' }, 
832	      { name:'Side Clamshells',      detail:'2 sets × 10 reps each side' } 
833	    ]}; 
834	  } 
835	  if (type === 'strength-b') { 
836	    const pu = week>=7?'3 sets × MAX reps':week>=5?'5 sets × 5 reps':week>=3?'5 sets × 4 reps':'5 sets × 3 reps'; 
837	    const pl = week>=5?30:week>=3?25:20; 
838	    const ex = [ 
839	      { name:'Push-ups',            detail:pu }, 
840	      { name:'Chair Dips',          detail:'3 sets × 8 reps' }, 
841	      { name:'Dead Bugs',           detail:'3 sets × 8 reps each side' }, 
842	      { name:'Kneeling Plank',      detail:`3 sets × ${pl} seconds` }, 
843	      { name:'Standing Calf Raises',detail:'2 sets × 12 reps' } 
844	    ]; 
845	    if (week>=7) ex.push({ name:'Lunges', detail:'2 sets × 8 reps each side' }); 
846	    return { warmup:'Arm circles ×20 · Shoulder rolls ×20', exercises:ex }; 
847	  } 
848	  if (type === 'mobility') return { warmup:null, exercises:[ 
849	    { name:'Calf Stretch',      detail:'30s each side' }, 
850	    { name:'Quad Stretch',      detail:'30s each side' }, 
851	    { name:'Hamstring Stretch', detail:'30s each side' }, 
852	    { name:'Piriformis Stretch',detail:'30s each side' }, 
853	    { name:'Optional Walk',     detail:'10–15 mins' } 
854	  ]}; 
855	  return { warmup:null, exercises:[] }; 
856	} 
857	 
858	function getPhase(w) { 
859	  if(w<=2) return 'PHASE: WEEKS 1–2'; 
860	  if(w<=4) return 'PHASE: WEEKS 3–4'; 
861	  if(w<=6) return 'PHASE: WEEKS 5–6'; 
862	  return 'PHASE: WEEKS 7–8'; 
863	} 
864	function getTodayDayIndex() { return [6,0,1,2,3,4,5][new Date().getDay()]; } 
865	 
866	let selectedDay = getTodayDayIndex(); 
867	let catchupOpen = false; 
868	let catchupSelected = new Set(); 
869	let modalExKey = null; 
870	let modalWorkoutType = null; 
871	 
872	/* ───────────────────────────────────────────────── 
873	   MODAL 
874	───────────────────────────────────────────────── */ 
875	function openExerciseModal(exName, exKey, workoutType) { 
876	  const data = EX_DATA[exName]; 
877	  if (!data) return; 
878	 
879	  modalExKey = exKey; 
880	  modalWorkoutType = workoutType; 
881	  const isDone = !!state.exDone[exKey]; 
882	 
883	  document.getElementById('modal-name').textContent = exName; 
884	  document.getElementById('modal-sets').textContent = data.sets; 
885	 
886	  // Illustrations 
887	  const illus = document.getElementById('modal-illustration'); 
888	  if (data.illustrations && data.illustrations.length) { 
889	    illus.innerHTML = `<div class="illustration-inner">${data.illustrations.map(f => 
890	      `<div class="illus-frame">${f.svg}<span class="illus-label">${f.label}</span></div>` 
891	    ).join('')}</div>`; 
892	    illus.style.display = ''; 
893	  } else { 
894	    illus.style.display = 'none'; 
895	  } 
896	 
897	  // Muscles 
898	  document.getElementById('modal-muscles').innerHTML = 
899	    data.muscles.map(m => `<span class="muscle-tag">${m}</span>`).join(''); 
900	 
901	  // Steps 
902	  document.getElementById('modal-steps-content').innerHTML = 
903	    data.steps.map((s,i) => `<div class="step-item"><div class="step-num">${i+1}</div><div class="step-text">${s}</div></div>`).join(''); 
904	 
905	  // Tip 
906	  if (data.tip) { 
907	    document.getElementById('modal-tip').textContent = data.tip; 
908	    document.getElementById('modal-tip-block').style.display = ''; 
909	  } else { 
910	    document.getElementById('modal-tip-block').style.display = 'none'; 
911	  } 
912	 
913	  // Complete button 
914	  const btn = document.getElementById('modal-complete-btn'); 
915	  btn.className = `modal-complete-btn ${workoutType}${isDone?' done':''}`; 
916	  btn.textContent = isDone ? '✓ Exercise Done!' : 'Mark Exercise Complete'; 
917	 
918	  document.getElementById('modal-overlay').classList.add('open'); 
919	  document.body.style.overflow = 'hidden'; 
920	} 
921	 
922	function closeModal() { 
923	  document.getElementById('modal-overlay').classList.remove('open'); 
924	  document.body.style.overflow = ''; 
925	} 
926	 
927	function handleOverlayClick(e) { 
928	  if (e.target === document.getElementById('modal-overlay')) closeModal(); 
929	} 
930	 
931	function completeFromModal() { 
932	  if (!modalExKey) return; 
933	  state.exDone[modalExKey] = !state.exDone[modalExKey]; 
934	  save(); 
935	  const isDone = !!state.exDone[modalExKey]; 
936	  const btn = document.getElementById('modal-complete-btn'); 
937	  btn.className = `modal-complete-btn ${modalWorkoutType}${isDone?' done':''}`; 
938	  btn.textContent = isDone ? '✓ Exercise Done!' : 'Mark Exercise Complete'; 
939	  // Update the list in background 
940	  renderToday(); 
941	  if (isDone) showToast('✓ Exercise logged!'); 
942	} 
943	 
944	/* ───────────────────────────────────────────────── 
945	   CATCH-UP 
946	───────────────────────────────────────────────── */ 
947	function toggleCatchup() { 
948	  catchupOpen = !catchupOpen; 
949	  catchupSelected.clear(); 
950	  document.getElementById('catchup-panel').classList.toggle('visible', catchupOpen); 
951	  document.getElementById('catchup-btn').classList.toggle('active', catchupOpen); 
952	  if (catchupOpen) buildCatchupPanel(); 
953	  updateCatchupCount(); 
954	} 
955	 
956	function buildCatchupPanel() { 
957	  const scroll = document.getElementById('catchup-scroll'); 
958	  scroll.innerHTML = ''; 
959	  for (let w=1; w<=8; w++) { 
960	    const row = document.createElement('div'); 
961	    const lbl = document.createElement('div'); 
962	    lbl.className = 'catchup-week-label'; 
963	    lbl.textContent = `Week ${w}`; 
964	    const grid = document.createElement('div'); 
965	    grid.className = 'catchup-grid'; 
966	    PLAN.forEach((d,i) => { 
967	      const key = `w${w}d${i}`; 
968	      const done = !!state.completed[key]; 
969	      const cell = document.createElement('div'); 
970	      cell.className = `catchup-cell${done?' already-done':''}${catchupSelected.has(key)?' selected':''}`; 
971	      cell.innerHTML = `<span class="cell-day">${d.day.charAt(0)}</span><span class="cell-type">${TYPE_SHORT[d.type]}</span>`; 
972	      if (!done) cell.onclick = () => toggleCell(key, cell); 
973	      grid.appendChild(cell); 
974	    }); 
975	    row.appendChild(lbl); row.appendChild(grid); 
976	    scroll.appendChild(row); 
977	  } 
978	} 
979	 
980	function toggleCell(key, el) { 
981	  if (catchupSelected.has(key)) { catchupSelected.delete(key); el.classList.remove('selected'); } 
982	  else { catchupSelected.add(key); el.classList.add('selected'); } 
983	  updateCatchupCount(); 
984	} 
985	 
986	function updateCatchupCount() { 
987	  const n = catchupSelected.size; 
988	  document.getElementById('catchup-count').textContent = n===0 ? '0 days selected' : `${n} day${n!==1?'s':''} selected`; 
989	  document.getElementById('catchup-confirm').disabled = n===0; 
990	} 
991	 
992	function selectAllPast() { 
993	  const tw = state.currentWeek, td = getTodayDayIndex(); 
994	  catchupSelected.clear(); 
995	  for (let w=1;w<=8;w++) for (let i=0;i<7;i++) { 
996	    const key = `w${w}d${i}`; 
997	    if (state.completed[key] || PLAN[i].type==='rest') continue; 
998	    if (w<tw || (w===tw && i<td)) catchupSelected.add(key); 
999	  } 
1000	  buildCatchupPanel(); updateCatchupCount(); 
1001	} 
1002	 
1003	function confirmCatchup() { 
1004	  catchupSelected.forEach(k => { state.completed[k]=true; }); 
1005	  save(); 
1006	  const n = catchupSelected.size; 
1007	  catchupSelected.clear(); 
1008	  toggleCatchup(); render(); 
1009	  showToast(`✅ ${n} day${n!==1?'s':''} marked complete!`); 
1010	} 
1011	 
1012	/* ───────────────────────────────────────────────── 
1013	   CORE RENDER 
1014	───────────────────────────────────────────────── */ 
1015	function render() { 
1016	  const w = state.currentWeek; 
1017	  document.getElementById('week-label').textContent = `WEEK ${w} OF 8`; 
1018	  document.getElementById('phase-badge').textContent = getPhase(w); 
1019	  renderDots(); renderToday(); updateProgress(); 
1020	} 
1021	 
1022	function renderDots() { 
1023	  const c = document.getElementById('week-dots'); 
1024	  c.innerHTML = ''; 
1025	  PLAN.forEach((d,i) => { 
1026	    const key = `w${state.currentWeek}d${i}`; 
1027	    const done = state.completed[key]; 
1028	    const dot = document.createElement('div'); 
1029	    dot.className = `day-dot ${d.type}${done?' completed '+d.type:''}${i===getTodayDayIndex()?' today':''}`; 
1030	    dot.innerHTML = `<span>${d.day.charAt(0)}</span>${done?'<span style="font-size:8px">✓</span>':''}`; 
1031	    dot.onclick = () => { selectedDay=i; renderToday(); }; 
1032	    c.appendChild(dot); 
1033	  }); 
1034	} 
1035	 
1036	function renderToday() { 
1037	  const plan    = PLAN[selectedDay]; 
1038	  const workout = getWorkout(plan.type, state.currentWeek); 
1039	  const key     = `w${state.currentWeek}d${selectedDay}`; 
1040	  const isDone  = !!state.completed[key]; 
1041	  const isToday = selectedDay===getTodayDayIndex(); 
1042	 
1043	  const bClass = plan.type==='run'?'run':plan.type==='mobility'?'mob':plan.type==='rest'?'rst':'strength'; 
1044	  let html = `<div class="today-card ${plan.type}"> 
1045	    <div class="today-label">${isToday?'📅 Today':plan.day}</div> 
1046	    <div class="today-title">${plan.label} <span class="type-badge ${bClass}">${TYPE_SHORT[plan.type]}</span></div>`; 
1047	 
1048	  if (workout.warmup) html += `<div class="warmup-section"><div class="warmup-label">🔥 Warm-Up</div><div class="warmup-text">${workout.warmup}</div></div>`; 
1049	 
1050	  if (workout.exercises.length) { 
1051	    html += `<ul class="exercises">`; 
1052	    workout.exercises.forEach((ex,idx) => { 
1053	      const exKey  = `${key}_ex${idx}`; 
1054	      const exDone = !!state.exDone[exKey]; 
1055	      const hasData = !!EX_DATA[ex.name]; 
1056	      html += `<li class="ex-item${exDone?' done-ex':''}" onclick="openExerciseModal('${ex.name.replace(/'/g,"\\'")}','${exKey}','${plan.type}')"> 
1057	        <div class="ex-check">${exDone?'✓':''}</div> 
1058	        <div style="flex:1"><div class="ex-name">${ex.name}</div><div class="ex-detail">${ex.detail}</div></div> 
1059	        <div class="ex-arrow">${hasData?'›':'›'}</div> 
1060	      </li>`; 
1061	    }); 
1062	    html += `</ul>`; 
1063	  } else { 
1064	    html += `<p style="color:var(--muted);font-size:13px;text-align:center;padding:12px 0">Recovery is key to progress. 💤</p>`; 
1065	  } 
1066	 
1067	  if (plan.type!=='rest') { 
1068	    html += `<button class="complete-btn ${plan.type}${isDone?' done':''}" onclick="toggleDone('${key}')">${isDone?'✓ Session Complete':'Mark Session Complete'}</button>`; 
1069	  } 
1070	  html += `</div>`; 
1071	  document.getElementById('today-section').innerHTML = html; 
1072	} 
1073	 
1074	function toggleEx(key) { state.exDone[key]=!state.exDone[key]; save(); renderToday(); } 
1075	 
1076	function toggleDone(key) { 
1077	  state.completed[key]=!state.completed[key]; 
1078	  save(); render(); 
1079	  if (state.completed[key]) showToast('🎉 Workout logged!'); 
1080	} 
1081	 
1082	function updateProgress() { 
1083	  const done = Object.keys(state.completed).filter(k=>state.completed[k]).length; 
1084	  const pct  = Math.round(done/56*100); 
1085	  document.getElementById('prog-fill').style.width = pct+'%'; 
1086	  document.getElementById('prog-pct').textContent  = pct+'%'; 
1087	  document.getElementById('prog-label').textContent = `${done} of 56 days logged`; 
1088	} 
1089	 
1090	function changeWeek(delta) { 
1091	  state.currentWeek = Math.max(1,Math.min(8,state.currentWeek+delta)); 
1092	  save(); render(); 
1093	} 
1094	 
1095	function switchTab(tab, btn) { 
1096	  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active')); 
1097	  btn.classList.add('active'); 
1098	  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active')); 
1099	  document.getElementById('view-'+tab).classList.add('active'); 
1100	  if (tab==='progress') renderStats(); 
1101	} 
1102	 
1103	function renderStats() { 
1104	  const keys = Object.keys(state.completed).filter(k=>state.completed[k]); 
1105	  let r=0,s=0; 
1106	  keys.forEach(k=>{ const i=parseInt(k.split('d')[1]); if(!isNaN(i)){if(PLAN[i].type==='run')r++;if(PLAN[i].type.includes('strength'))s++;} }); 
1107	  document.getElementById('stat-runs').textContent=r; 
1108	  document.getElementById('stat-strength').textContent=s; 
1109	  document.getElementById('stat-total').textContent=keys.length; 
1110	} 
1111	 
1112	function showToast(msg) { 
1113	  const t = document.getElementById('toast'); 
1114	  t.textContent=msg; t.classList.add('show'); 
1115	  setTimeout(()=>t.classList.remove('show'),2500); 
1116	} 
1117	 
1118	function exportData() { 
1119	  const a=document.createElement('a'); 
1120	  a.href=URL.createObjectURL(new Blob([JSON.stringify(state)],{type:'application/json'})); 
1121	  a.download=`fitness_backup_${new Date().toISOString().slice(0,10)}.json`; 
1122	  a.click(); 
1123	} 
1124	 
1125	function importData() { 
1126	  const input=document.createElement('input'); input.type='file'; 
1127	  input.onchange=e=>{const r=new FileReader();r.onload=ev=>{state=JSON.parse(ev.target.result);save();location.reload();};r.readAsText(e.target.files[0]);}; 
1128	  input.click(); 
1129	} 
1130	 
1131	render(); 
1132	</script> 
1133	</body> 
1134	</html> 
