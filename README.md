<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>C25K + Strength Pro</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0e0e10;
    --surface: #18181c;
    --card: #1f1f26;
    --border: #2e2e38;
    --accent: #e8ff47;
    --accent2: #ff6b35;
    --run: #47b8ff;
    --text: #f0f0f0;
    --muted: #888;
    --radius: 12px;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; min-height: 100vh; padding: 0 0 80px; overflow-x: hidden; }

  /* ── HEADER ── */
  header {
    background: linear-gradient(135deg, #0e0e10 0%, #1a1a24 100%);
    border-bottom: 1px solid var(--border);
    padding: 24px 20px 20px;
    position: sticky; top: 0; z-index: 100;
  }
  .header-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
  header h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(26px, 6vw, 42px); letter-spacing: 2px; line-height: 1; }
  header h1 span { color: var(--accent); }
  .week-badge { background: var(--accent); color: #000; font-weight: 700; font-size: 11px; padding: 4px 10px; border-radius: 20px; letter-spacing: 1px; margin-top: 4px; display: inline-block; }
  .week-nav { display: flex; align-items: center; gap: 12px; margin-top: 14px; }
  .week-nav button { background: var(--card); border: 1px solid var(--border); color: var(--text); width: 32px; height: 32px; border-radius: 50%; font-size: 16px; cursor: pointer; transition: all .2s; display: flex; align-items: center; justify-content: center; }
  .week-nav button:hover { border-color: var(--accent); color: var(--accent); }
  .week-label { font-size: 13px; color: var(--muted); font-weight: 500; }
  .catchup-toggle-btn { padding: 8px 14px; background: none; border: 1px solid var(--accent); color: var(--accent); border-radius: 20px; font-size: 11px; font-weight: 700; cursor: pointer; letter-spacing: .5px; transition: .2s; white-space: nowrap; font-family: 'DM Sans', sans-serif; flex-shrink: 0; align-self: flex-start; margin-top: 2px; }
  .catchup-toggle-btn:hover, .catchup-toggle-btn.active { background: var(--accent); color: #000; }

  /* ── PROGRESS ── */
  .progress-wrap { padding: 16px 20px 0; }
  .progress-info { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); margin-bottom: 6px; }
  .progress-track { height: 6px; background: var(--card); border-radius: 3px; overflow: hidden; }
  .progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent2), var(--accent)); transition: width .5s ease; }

  /* ── WEEK DOTS ── */
  .week-days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; padding: 16px 20px 0; }
  .day-dot { aspect-ratio: 1; border-radius: 50%; border: 2px solid var(--border); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 9px; font-weight: 600; cursor: pointer; transition: all .2s; color: var(--muted); }
  .day-dot:hover { border-color: #aaa; color: var(--text); }
  .day-dot.today { border-color: var(--text) !important; color: var(--text) !important; }
  .day-dot.completed.run        { background: var(--run);    color: #000; border-color: transparent; }
  .day-dot.completed.strength-a { background: var(--accent); color: #000; border-color: transparent; }
  .day-dot.completed.strength-b { background: var(--accent2);color: #fff; border-color: transparent; }
  .day-dot.completed.mobility   { background: #9c6ef5;       color: #fff; border-color: transparent; }
  .day-dot.completed.rest       { background: var(--border); color: var(--muted); border-color: transparent; }

  /* ── CATCH-UP PANEL ── */
  .catchup-panel { display: none; background: linear-gradient(135deg, #141200, #1c1a00); border: 1px solid rgba(232,255,71,.35); border-radius: var(--radius); margin: 14px 20px 0; padding: 18px; animation: slideDown .2s ease; }
  .catchup-panel.visible { display: block; }
  @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
  .catchup-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--accent); letter-spacing: 1px; margin-bottom: 4px; }
  .catchup-sub { font-size: 12px; color: var(--muted); margin-bottom: 14px; line-height: 1.6; }
  .catchup-scroll { max-height: 340px; overflow-y: auto; padding-right: 4px; display: flex; flex-direction: column; gap: 14px; }
  .catchup-scroll::-webkit-scrollbar { width: 3px; }
  .catchup-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
  .catchup-week-label { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: .8px; font-weight: 700; margin-bottom: 6px; }
  .catchup-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; }
  .catchup-cell { aspect-ratio: 1; border-radius: 8px; border: 2px solid var(--border); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 8px; font-weight: 700; cursor: pointer; transition: all .15s; color: var(--muted); text-transform: uppercase; gap: 2px; user-select: none; }
  .catchup-cell:hover:not(.already-done) { border-color: var(--accent); color: var(--text); }
  .catchup-cell.selected { border-color: var(--accent) !important; background: rgba(232,255,71,.15); color: var(--accent) !important; }
  .catchup-cell.already-done { background: rgba(109,179,63,.1); border-color: rgba(109,179,63,.3); color: #6db33f; cursor: default; }
  .catchup-cell .cell-day  { font-size: 9px; }
  .catchup-cell .cell-type { font-size: 7px; opacity: .8; }
  .catchup-footer { margin-top: 14px; }
  .catchup-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .catchup-count { font-size: 12px; color: var(--accent); font-weight: 700; }
  .select-all-btn { background: none; border: none; color: var(--muted); font-size: 11px; cursor: pointer; padding: 4px 8px; border-radius: 4px; font-family: 'DM Sans', sans-serif; transition: .15s; }
  .select-all-btn:hover { color: var(--text); background: rgba(255,255,255,.05); }
  .catchup-actions { display: flex; gap: 10px; }
  .btn-cancel  { padding: 12px 16px; background: none; border: 1px solid var(--border); color: var(--muted); border-radius: 8px; font-size: 13px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: .2s; }
  .btn-cancel:hover { border-color: #666; color: var(--text); }
  .btn-confirm { flex: 1; padding: 12px; background: var(--accent); color: #000; border: none; border-radius: 8px; font-weight: 700; font-size: 14px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: .2s; }
  .btn-confirm:hover:not(:disabled) { filter: brightness(1.1); }
  .btn-confirm:disabled { opacity: .35; cursor: default; }

  /* ── TABS ── */
  .tabs { display: flex; gap: 4px; padding: 0 20px; margin-top: 16px; }
  .tab { flex: 1; padding: 10px; background: none; border: 1px solid var(--border); color: var(--muted); font-size: 11px; font-weight: 700; cursor: pointer; border-radius: 8px; text-transform: uppercase; font-family: 'DM Sans', sans-serif; transition: .2s; }
  .tab.active { background: var(--accent); color: #000; border-color: var(--accent); }

  main { padding: 20px; }
  .view { display: none; }
  .view.active { display: block; }

  /* ── TODAY CARD ── */
  .today-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; margin-bottom: 20px; position: relative; overflow: hidden; }
  .today-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
  .today-card.run::before        { background: var(--run); }
  .today-card.strength-a::before { background: var(--accent); }
  .today-card.strength-b::before { background: var(--accent2); }
  .today-card.mobility::before   { background: #9c6ef5; }
  .today-card.rest::before       { background: var(--border); }
  .today-label { font-size: 11px; color: var(--muted); text-transform: uppercase; margin-bottom: 4px; }
  .today-title { font-family: 'Bebas Neue', sans-serif; font-size: 28px; line-height: 1.1; margin-bottom: 14px; }
  .type-badge { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px; margin-left: 8px; vertical-align: middle; }
  .type-badge.run      { background: rgba(71,184,255,.15); color: var(--run); }
  .type-badge.strength { background: rgba(232,255,71,.1);  color: var(--accent); }
  .type-badge.mob      { background: rgba(156,110,245,.15);color: #9c6ef5; }
  .type-badge.rst      { background: var(--border); color: var(--muted); }
  .warmup-section { background: rgba(255,255,255,.03); border: 1px solid var(--border); border-radius: 8px; padding: 12px; margin-bottom: 12px; }
  .warmup-label { font-size: 11px; color: var(--accent); font-weight: 700; margin-bottom: 4px; text-transform: uppercase; }
  .warmup-text { font-size: 13px; color: var(--muted); line-height: 1.4; }

  /* ── EXERCISE LIST ITEMS ── */
  .exercises { list-style: none; margin: 0 0 16px; display: flex; flex-direction: column; gap: 8px; }
  .ex-item {
    display: flex; align-items: center; gap: 12px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 10px; padding: 12px 14px;
    cursor: pointer; transition: all .2s;
    position: relative; overflow: hidden;
  }
  .ex-item::after { content: '›'; position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 18px; transition: .2s; }
  .ex-item:hover { border-color: #555; background: #202028; }
  .ex-item:hover::after { color: var(--text); right: 10px; }
  .ex-item.done-ex { border-color: #2a3a1a; background: rgba(109,179,63,.06); }
  .ex-item.done-ex::after { content: '✓'; color: #6db33f; font-size: 14px; }
  .ex-item.done-ex .ex-name { color: var(--muted); text-decoration: line-through; }
  .ex-check { width: 22px; height: 22px; min-width: 22px; border-radius: 50%; border: 2px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 10px; transition: .2s; flex-shrink: 0; }
  .ex-item.done-ex .ex-check { background: #6db33f; border-color: #6db33f; color: white; }
  .ex-name { font-size: 14px; font-weight: 500; }
  .ex-detail { font-size: 12px; color: var(--muted); margin-top: 1px; }
  .ex-info-hint { font-size: 10px; color: var(--accent); font-weight: 600; margin-top: 2px; letter-spacing: .3px; }

  .complete-btn { width: 100%; padding: 14px; border: none; border-radius: 8px; font-weight: 700; font-size: 14px; cursor: pointer; margin-top: 10px; transition: .2s; font-family: 'DM Sans', sans-serif; }
  .complete-btn.run        { background: var(--run);    color: #000; }
  .complete-btn.strength-a, .complete-btn.strength-b { background: var(--accent); color: #000; }
  .complete-btn.mobility   { background: #9c6ef5;       color: #fff; }
  .complete-btn:not(.done):hover { filter: brightness(1.1); transform: translateY(-1px); }
  .complete-btn.done { background: #1a2d0a !important; color: #6db33f !important; border: 1px solid #6db33f33; transform: none !important; filter: none !important; }

  /* ── EXERCISE MODAL / DRAWER ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,.75);
    z-index: 500; opacity: 0; pointer-events: none;
    transition: opacity .3s ease;
    backdrop-filter: blur(4px);
  }
  .modal-overlay.open { opacity: 1; pointer-events: all; }

  .ex-drawer {
    position: fixed; bottom: 0; left: 0; right: 0;
    background: #16161e;
    border-top: 1px solid var(--border);
    border-radius: 20px 20px 0 0;
    z-index: 501;
    max-height: 92vh;
    overflow-y: auto;
    transform: translateY(100%);
    transition: transform .35s cubic-bezier(.32,.72,0,1);
    padding-bottom: env(safe-area-inset-bottom, 20px);
  }
  .ex-drawer.open { transform: translateY(0); }
  .ex-drawer::-webkit-scrollbar { display: none; }

  .drawer-handle { width: 40px; height: 4px; background: var(--border); border-radius: 2px; margin: 12px auto 0; }

  .drawer-hero {
    padding: 20px 24px 0;
    position: relative;
  }
  .drawer-type-pill {
    display: inline-block; font-size: 10px; font-weight: 700;
    padding: 3px 10px; border-radius: 20px; letter-spacing: .8px;
    text-transform: uppercase; margin-bottom: 10px;
  }
  .drawer-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 34px; letter-spacing: 1px; line-height: 1;
    margin-bottom: 6px;
  }
  .drawer-sets { font-size: 14px; color: var(--muted); margin-bottom: 16px; }
  .drawer-sets strong { color: var(--accent); }

  /* SVG illustration area */
  .illustration-wrap {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    margin: 0 24px 20px;
    padding: 20px;
    display: flex; flex-direction: column; align-items: center; gap: 12px;
    min-height: 180px; justify-content: center;
  }
  .illus-frames {
    display: flex; gap: 20px; align-items: flex-end; justify-content: center; flex-wrap: wrap;
  }
  .illus-frame {
    display: flex; flex-direction: column; align-items: center; gap: 6px;
  }
  .illus-frame svg { display: block; }
  .illus-label { font-size: 10px; color: var(--muted); font-weight: 600; letter-spacing: .5px; text-transform: uppercase; }

  .muscles-row {
    display: flex; gap: 8px; flex-wrap: wrap; margin: 0 24px 20px;
  }
  .muscle-tag {
    font-size: 11px; font-weight: 700; padding: 4px 10px;
    border-radius: 20px; background: rgba(255,255,255,.05);
    border: 1px solid var(--border); color: var(--muted);
    text-transform: uppercase; letter-spacing: .5px;
  }
  .muscle-tag.primary { background: rgba(232,255,71,.08); border-color: rgba(232,255,71,.25); color: var(--accent); }

  .drawer-section-title {
    font-family: 'Bebas Neue', sans-serif; font-size: 16px;
    color: var(--muted); letter-spacing: 1px;
    padding: 0 24px; margin-bottom: 10px;
    display: flex; align-items: center; gap: 8px;
  }
  .drawer-section-title::after { content:''; flex:1; height:1px; background: var(--border); }

  .steps-list {
    list-style: none; padding: 0 24px; margin-bottom: 20px;
    display: flex; flex-direction: column; gap: 10px;
  }
  .step-item {
    display: flex; gap: 14px; align-items: flex-start;
    background: var(--card); border: 1px solid var(--border);
    border-radius: 10px; padding: 12px 14px;
  }
  .step-num {
    font-family: 'Bebas Neue', sans-serif; font-size: 22px; line-height: 1;
    color: var(--accent); min-width: 24px;
  }
  .step-text { font-size: 14px; line-height: 1.55; color: var(--text); padding-top: 2px; }

  .tips-box {
    margin: 0 24px 20px;
    background: rgba(71,184,255,.05);
    border: 1px solid rgba(71,184,255,.2);
    border-radius: 10px; padding: 14px 16px;
  }
  .tips-title { font-size: 11px; font-weight: 700; color: var(--run); letter-spacing: .5px; text-transform: uppercase; margin-bottom: 8px; }
  .tip-item { font-size: 13px; color: var(--muted); padding: 3px 0; display: flex; gap: 8px; line-height: 1.4; }
  .tip-item::before { content: '→'; color: var(--run); flex-shrink: 0; }

  .drawer-cta {
    padding: 0 24px 24px;
    display: flex; gap: 12px;
  }
  .btn-ex-done {
    flex: 1; padding: 16px; border: none; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 15px;
    cursor: pointer; transition: all .2s; letter-spacing: .3px;
  }
  .btn-ex-done.idle { background: var(--accent); color: #000; }
  .btn-ex-done.idle:hover { filter: brightness(1.1); transform: translateY(-1px); }
  .btn-ex-done.marked { background: #1a2d0a; color: #6db33f; border: 1px solid #6db33f33; }
  .btn-ex-close {
    padding: 16px 18px; background: var(--card); border: 1px solid var(--border);
    color: var(--muted); border-radius: 10px; font-size: 13px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: .2s;
  }
  .btn-ex-close:hover { border-color: #666; color: var(--text); }

  /* ── PROGRESS TAB ── */
  .section-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--muted); margin: 24px 0 12px; display: flex; align-items: center; gap: 8px; }
  .section-title::after { content:''; flex:1; height:1px; background:var(--border); }
  .stats-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
  .stat-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px; text-align: center; }
  .stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--accent); }
  .stat-label { font-size: 9px; color: var(--muted); text-transform: uppercase; }
  .data-btns { display: flex; gap: 10px; margin-top: 4px; }
  .data-btn { flex: 1; padding: 10px; background: var(--surface); border: 1px solid var(--border); color: var(--text); border-radius: 6px; font-size: 11px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: .2s; }
  .data-btn:hover { border-color: #555; }

  .toast { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%) translateY(100px); background: #6db33f; color: white; padding: 12px 24px; border-radius: 30px; font-weight: 600; transition: .3s; z-index: 600; white-space: nowrap; pointer-events: none; }
  .toast.show { transform: translateX(-50%) translateY(0); }
</style>
</head>
<body>

<header>
  <div class="header-top">
    <div>
      <h1>C25K <span>+</span> STRENGTH</h1>
      <div class="week-badge" id="phase-badge">PHASE: WEEKS 1–2</div>
    </div>
    <button class="catchup-toggle-btn" id="catchup-btn" onclick="toggleCatchup()">✦ CATCH UP</button>
  </div>
  <div class="week-nav">
    <button onclick="changeWeek(-1)">‹</button>
    <span class="week-label" id="week-label">WEEK 1 OF 8</span>
    <button onclick="changeWeek(1)">›</button>
  </div>
</header>

<div class="progress-wrap">
  <div class="progress-info"><span id="prog-label">0 of 56 days logged</span><span id="prog-pct">0%</span></div>
  <div class="progress-track"><div class="progress-fill" id="prog-fill" style="width:0%"></div></div>
</div>

<div class="week-days" id="week-dots"></div>

<div class="catchup-panel" id="catchup-panel">
  <div class="catchup-title">✦ Mark Past Days Complete</div>
  <div class="catchup-sub">Tap days you've already done to select them. Green days are already logged.</div>
  <div class="catchup-scroll" id="catchup-scroll"></div>
  <div class="catchup-footer">
    <div class="catchup-meta">
      <span class="catchup-count" id="catchup-count">0 days selected</span>
      <button class="select-all-btn" onclick="selectAllPast()">Select all past days</button>
    </div>
    <div class="catchup-actions">
      <button class="btn-cancel" onclick="toggleCatchup()">Cancel</button>
      <button class="btn-confirm" id="catchup-confirm" onclick="confirmCatchup()" disabled>Confirm Selected</button>
    </div>
  </div>
</div>

<div class="tabs">
  <button class="tab active" onclick="switchTab('today',this)">TODAY</button>
  <button class="tab" onclick="switchTab('progress',this)">PROGRESS</button>
</div>

<main>
  <div class="view active" id="view-today"><div id="today-section"></div></div>
  <div class="view" id="view-progress">
    <div class="section-title">Lifetime Stats</div>
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-num" id="stat-runs">0</div><div class="stat-label">Runs</div></div>
      <div class="stat-card"><div class="stat-num" id="stat-strength">0</div><div class="stat-label">Strength</div></div>
      <div class="stat-card"><div class="stat-num" id="stat-total">0</div><div class="stat-label">Total</div></div>
    </div>
    <div class="section-title">Data</div>
    <div class="data-btns">
      <button class="data-btn" onclick="exportData()">⬇ Export Backup</button>
      <button class="data-btn" onclick="importData()">⬆ Import Backup</button>
    </div>
  </div>
</main>

<!-- ── EXERCISE DRAWER ── -->
<div class="modal-overlay" id="overlay" onclick="closeDrawer()"></div>
<div class="ex-drawer" id="ex-drawer">
  <div class="drawer-handle"></div>
  <div id="drawer-content"></div>
</div>

<div class="toast" id="toast"></div>

<script>
// ══════════════════════════════════════════════
// EXERCISE GUIDE DATABASE
// ══════════════════════════════════════════════
const EXERCISE_GUIDES = {

  'Chair Squats': {
    muscles: ['Quads','Glutes','Hamstrings','Core'],
    primaryMuscles: ['Quads','Glutes'],
    steps: [
      'Stand in front of a sturdy chair with feet shoulder-width apart, toes pointing slightly outward.',
      'Brace your core and keep your chest tall. Begin to lower yourself by hinging at the hips and bending your knees.',
      'Lower until your bottom just touches the chair seat — don\'t fully sit down.',
      'Press through your heels to return to standing. Squeeze your glutes at the top.',
      'That\'s one rep. Keep the movement slow and controlled throughout.'
    ],
    tips: ['Keep your knees tracking over your toes — don\'t let them cave inward.','If balance is tricky, hold the chair back lightly with one hand.','The slower you go down, the harder it works!'],
    illustrations: [
      { label: 'Start', svg: svgSquatStart() },
      { label: 'Lower', svg: svgSquatDown() }
    ]
  },

  'Glute Bridges': {
    muscles: ['Glutes','Hamstrings','Lower Back','Core'],
    primaryMuscles: ['Glutes','Hamstrings'],
    steps: [
      'Lie on your back with knees bent, feet flat on the floor hip-width apart. Arms resting at your sides.',
      'Press your lower back gently into the floor to engage your core.',
      'Drive through your heels and squeeze your glutes to lift your hips off the floor.',
      'Raise until your body forms a straight line from shoulders to knees. Hold for 2 seconds at the top.',
      'Lower your hips slowly back to the floor. That\'s one rep.'
    ],
    tips: ['The 2-second squeeze at the top is what makes this exercise work — don\'t skip it!','Feet too close = more hamstrings. Feet further away = more glutes.','Avoid arching your lower back — keep it neutral.'],
    illustrations: [
      { label: 'Start', svg: svgBridgeStart() },
      { label: 'Up', svg: svgBridgeUp() }
    ]
  },

  'Bird Dogs': {
    muscles: ['Core','Glutes','Lower Back','Shoulders'],
    primaryMuscles: ['Core','Lower Back'],
    steps: [
      'Start on all fours with hands directly under shoulders and knees under hips. Keep your back flat like a tabletop.',
      'Brace your core — imagine you\'re about to be poked in the stomach.',
      'Simultaneously extend your right arm forward and your left leg back until both are parallel to the floor.',
      'Hold for 1–2 seconds, then return slowly to start without letting your hips rotate.',
      'Repeat on the opposite side (left arm, right leg). That\'s one rep each side.'
    ],
    tips: ['Move slowly — speed is the enemy here. Control beats speed every time.','Keep your hips level throughout. No twisting or sagging.','Look at the floor, not forward, to keep your neck neutral.'],
    illustrations: [
      { label: 'Start', svg: svgBirdDogStart() },
      { label: 'Extend', svg: svgBirdDogExtend() }
    ]
  },

  'Standing Calf Raises': {
    muscles: ['Calves','Soleus','Ankles'],
    primaryMuscles: ['Calves'],
    steps: [
      'Stand upright with feet hip-width apart, toes pointing forward. Hold a wall or chair back for light balance if needed.',
      'Keeping your legs straight, slowly rise up onto the balls of your feet as high as you can go.',
      'Pause at the top for a moment and feel the squeeze in your calves.',
      'Lower your heels slowly back to the floor — resist gravity on the way down.',
      'That\'s one rep. The slow lowering phase is just as important as the raise.'
    ],
    tips: ['Try one leg at a time to make it harder as you progress.','Don\'t bounce at the bottom — control the full range of motion.','Runners especially benefit from strong, flexible calves.'],
    illustrations: [
      { label: 'Flat', svg: svgCalfStart() },
      { label: 'Raised', svg: svgCalfUp() }
    ]
  },

  'Side Clamshells': {
    muscles: ['Glute Medius','Hip Abductors','Core'],
    primaryMuscles: ['Glute Medius'],
    steps: [
      'Lie on your side with hips and knees bent to about 45°. Stack your legs on top of each other. Rest your head on your bottom arm.',
      'Keep your feet together throughout the movement.',
      'Keeping your hips still, rotate your top knee upward like a clamshell opening. Only go as far as your hip doesn\'t roll back.',
      'Pause at the top, then slowly lower your knee back down.',
      'Complete all reps on one side before switching. That\'s one rep.'
    ],
    tips: ['Imagine your hips are against a wall — they must stay still throughout.','You should feel a burn in the back-side of your hip/glute.','Can add a resistance band around knees for more challenge later.'],
    illustrations: [
      { label: 'Closed', svg: svgClamshellClosed() },
      { label: 'Open', svg: svgClamshellOpen() }
    ]
  },

  'Push-ups': {
    muscles: ['Chest','Triceps','Shoulders','Core'],
    primaryMuscles: ['Chest','Triceps'],
    steps: [
      'Start in a high plank: hands slightly wider than shoulder-width, body in a straight line from head to heels.',
      'If standard is too hard, drop to your knees — a strong knee push-up beats a sloppy full one.',
      'Brace your core and squeeze your glutes. Lower your chest toward the floor, keeping elbows at about 45° from your body.',
      'Lower until your chest nearly touches the floor (or as far as comfortable).',
      'Push the floor away to return to the start position. Exhale on the way up. That\'s one rep.'
    ],
    tips: ['Quality over quantity — 3 perfect reps beat 10 sloppy ones.','Don\'t let your hips sag or pike up. Keep that plank position strong.','Hands too wide strains shoulders. Keep them roughly under your chest.'],
    illustrations: [
      { label: 'Up', svg: svgPushupUp() },
      { label: 'Down', svg: svgPushupDown() }
    ]
  },

  'Chair Dips': {
    muscles: ['Triceps','Chest','Shoulders'],
    primaryMuscles: ['Triceps'],
    steps: [
      'Sit on the edge of a sturdy chair. Place hands on the seat beside your hips, fingers pointing forward.',
      'Slide your bottom off the seat, supporting your weight on your hands. Keep feet flat on the floor, knees at 90°.',
      'Slowly bend your elbows to lower your body toward the floor. Keep your back close to the chair.',
      'Lower until your upper arms are roughly parallel to the floor (or as far as comfortable).',
      'Press through your palms to push back up to the start. That\'s one rep.'
    ],
    tips: ['Elbows should point straight back — not out to the sides.','The closer your feet are to the chair, the easier the exercise.','Keep your shoulders down and back — don\'t shrug them up toward your ears.'],
    illustrations: [
      { label: 'Up', svg: svgDipUp() },
      { label: 'Down', svg: svgDipDown() }
    ]
  },

  'Dead Bugs': {
    muscles: ['Core','Transverse Abdominis','Hip Flexors'],
    primaryMuscles: ['Core','Transverse Abdominis'],
    steps: [
      'Lie on your back with arms reaching straight up toward the ceiling. Lift your legs so knees are bent at 90°, shins parallel to the floor.',
      'Press your lower back firmly into the floor — this must stay down for the entire exercise.',
      'Slowly lower your right arm overhead toward the floor while simultaneously extending your left leg out straight.',
      'Stop just before your arm and leg touch the floor, keeping your lower back pressed down.',
      'Return to start and repeat on the opposite side. That\'s one rep each side.'
    ],
    tips: ['If your back lifts off the floor, you\'ve gone too far. Pull back.','Exhale as you extend — it helps you keep your core braced.','Move slowly. Five seconds down, five seconds back.'],
    illustrations: [
      { label: 'Start', svg: svgDeadBugStart() },
      { label: 'Extend', svg: svgDeadBugExtend() }
    ]
  },

  'Kneeling Plank': {
    muscles: ['Core','Shoulders','Glutes','Back'],
    primaryMuscles: ['Core','Shoulders'],
    steps: [
      'Start on your knees and forearms. Elbows directly under your shoulders, forearms flat on the floor.',
      'Lift your knees off the ground so your body forms a straight line from shoulders to knees.',
      'Brace your entire core — imagine you\'re about to take a punch.',
      'Keep breathing normally. Squeeze your glutes and keep your hips level — no sagging or piking.',
      'Hold for the full time. Rest, then repeat.'
    ],
    tips: ['Don\'t hold your breath! Keep breathing steadily throughout.','Imagine pulling your elbows toward your knees — this activates your core even more.','Progress to a full plank (feet, not knees) when this gets easy.'],
    illustrations: [
      { label: 'Position', svg: svgPlank() }
    ]
  },

  'Lunges': {
    muscles: ['Quads','Glutes','Hamstrings','Calves','Core'],
    primaryMuscles: ['Quads','Glutes'],
    steps: [
      'Stand tall with feet hip-width apart. Hands on hips or at your sides.',
      'Step one foot forward — about 2–3 feet. Your front foot should be flat, back heel lifted.',
      'Lower your back knee toward the floor by bending both knees to about 90°. Keep your front knee over your ankle, not past your toes.',
      'Your back knee should hover just above the floor.',
      'Push through your front heel to return to standing. That\'s one rep. Repeat on the other side.'
    ],
    tips: ['Keep your torso upright throughout — don\'t lean forward.','Make the step big enough that your front knee stays behind your toes at the bottom.','If balance is tricky, hold a wall or chair lightly.'],
    illustrations: [
      { label: 'Start', svg: svgLungeStart() },
      { label: 'Down', svg: svgLungeDown() }
    ]
  },

  'Brisk Walk Warm-up': {
    muscles: ['Full Body Activation','Calves','Hip Flexors'],
    primaryMuscles: ['Full Body'],
    steps: [
      'Start walking at a comfortable pace and gradually increase to a brisk walk over the first minute.',
      'Swing your arms naturally — this helps increase your heart rate.',
      'Take purposeful strides; you should feel slightly warm but able to hold a conversation.',
      'Keep this up for 5 full minutes before transitioning to your C25K intervals.',
      'Use this time to mentally prepare for your run session.'
    ],
    tips: ['This warm-up reduces injury risk significantly — don\'t skip it.','If you feel cold, add 1–2 more minutes.','Focus on good posture: shoulders back, head up, core lightly engaged.'],
    illustrations: [{ label: 'Walk', svg: svgWalk() }]
  },

  'C25K Intervals': {
    muscles: ['Full Body','Cardio System','Legs','Core'],
    primaryMuscles: ['Cardio','Legs'],
    steps: [
      'Follow your Week\'s C25K schedule — alternating between running and walking intervals.',
      'During running intervals: land mid-foot, not on your heel. Short, quick steps are easier than long strides.',
      'Keep your arms at 90° and swing them forward/back (not across your body).',
      'During walking recovery: slow your breathing and prepare for the next run interval.',
      'Don\'t push the pace — if you can\'t speak a few words, you\'re going too hard.'
    ],
    tips: ['Run slower than you think you need to — sustainability beats speed.','The app/timer is your friend. Trust the program.','It\'s normal to feel like you can\'t do it — most people feel this way in weeks 1–3.'],
    illustrations: [{ label: 'Run', svg: svgRun() }]
  },

  'Cool-down Walk': {
    muscles: ['Recovery','Calves','Heart Rate'],
    primaryMuscles: ['Recovery'],
    steps: [
      'After your last run interval, don\'t stop suddenly — transition straight into a walk.',
      'Walk at an easy, comfortable pace for the full 5 minutes.',
      'Focus on slowing your breathing — inhale for 3 counts, exhale for 4.',
      'Let your heart rate come down gradually before you stop completely.',
      'After walking, take a moment to do some light stretches if you have time.'
    ],
    tips: ['Stopping suddenly causes blood to pool in your legs — always cool down.','This is a great time to celebrate completing your run!','Gentle calf stretches immediately after help prevent soreness.'],
    illustrations: [{ label: 'Cool Down', svg: svgWalk() }]
  },

  'Calf Stretch': {
    muscles: ['Calves','Achilles Tendon','Ankle'],
    primaryMuscles: ['Calves'],
    steps: [
      'Stand facing a wall with one hand on it for support.',
      'Step one foot back about 2–3 feet, keeping both feet flat and toes pointing forward.',
      'Keep your back leg straight and gently press your back heel into the floor.',
      'Lean your hips forward until you feel a stretch in the calf of your back leg.',
      'Hold for 30 seconds, then switch sides.'
    ],
    tips: ['Never bounce in a stretch — hold it steady.','You should feel a gentle pull, not pain.','For a deeper stretch, slightly bend the back knee to target the deeper calf muscle.'],
    illustrations: [{ label: 'Stretch', svg: svgCalfStretch() }]
  },

  'Quad Stretch': {
    muscles: ['Quadriceps','Hip Flexors','Knee'],
    primaryMuscles: ['Quadriceps'],
    steps: [
      'Stand upright near a wall or chair for balance support.',
      'Bend one knee, bringing your heel toward your bottom. Grab your ankle with the same-side hand.',
      'Keep both knees together and stand tall. Don\'t let your bent knee drift forward.',
      'Feel the stretch along the front of your thigh.',
      'Hold for 30 seconds, then switch sides.'
    ],
    tips: ['Keep your standing leg slightly soft — don\'t lock the knee.','Squeeze your glute on the stretching side to increase the stretch.','If you can\'t reach your ankle, loop a towel around it.'],
    illustrations: [{ label: 'Stretch', svg: svgQuadStretch() }]
  },

  'Hamstring Stretch': {
    muscles: ['Hamstrings','Lower Back','Calves'],
    primaryMuscles: ['Hamstrings'],
    steps: [
      'Sit on the edge of a chair or on the floor with both legs extended in front of you.',
      'Sit up tall, then hinge forward from your hips — not your waist.',
      'Reach your hands toward your feet or shins, going as far as comfortable.',
      'Keep a slight bend in your knees if needed — you should feel the stretch in the back of your thighs.',
      'Hold for 30 seconds. Don\'t bounce. Switch sides if doing one leg at a time.'
    ],
    tips: ['Lead with your chest, not your head — keep your spine long.','Tight hamstrings are very common in new runners — be patient and consistent.','Breathe out as you lean forward; it helps you go a little deeper.'],
    illustrations: [{ label: 'Stretch', svg: svgHamstringStretch() }]
  },

  'Piriformis Stretch': {
    muscles: ['Piriformis','Glutes','Hip Rotators'],
    primaryMuscles: ['Piriformis','Glutes'],
    steps: [
      'Lie on your back with both knees bent, feet flat on the floor.',
      'Cross your right ankle over your left knee (like a figure-4 shape).',
      'Either stay here if you feel a stretch, or gently pull your left thigh toward your chest with both hands.',
      'You should feel a deep stretch in your right hip and glute.',
      'Hold for 30 seconds, then switch sides.'
    ],
    tips: ['This stretch targets the piriformis, a small deep muscle that can cause sciatic pain if tight.','Flex your crossed foot to protect your knee.','Breathe deeply and let the hip gradually release with each exhale.'],
    illustrations: [{ label: 'Stretch', svg: svgPiriformisStretch() }]
  },

  'Optional Walk': {
    muscles: ['Recovery','Full Body'],
    primaryMuscles: ['Recovery'],
    steps: [
      'Head out for a light 10–15 minute stroll at a very easy, comfortable pace.',
      'This is active recovery — keep it gentle enough that you could carry on a full conversation.',
      'Focus on relaxed movement: loose shoulders, easy arm swing, comfortable stride.',
      'Use the time to reflect on your week\'s training or simply enjoy being outside.',
      'No need to track pace or distance — just enjoy the movement.'
    ],
    tips: ['Active recovery on mobility day keeps blood flowing and reduces stiffness.','This is optional — if your legs are very sore, rest is fine too.','Even 10 minutes outside improves mood and reduces stress hormones.'],
    illustrations: [{ label: 'Walk', svg: svgWalk() }]
  }
};

// ══════════════════════════════════════════════
// SVG ILLUSTRATIONS  (simple stick figure poses)
// ══════════════════════════════════════════════
function svgBase(content, w=120, h=140) {
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
}
const SC = 'stroke="#e8ff47"'; const SC2 = 'stroke="#aaa"'; const SB = 'stroke="#47b8ff"';
const bodyStyle = `stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"`;

function svgSquatStart() {
  return svgBase(`
    <circle cx="60" cy="18" r="10" ${SC} ${bodyStyle}/>
    <line x1="60" y1="28" x2="60" y2="72" ${SC} ${bodyStyle}/>
    <line x1="60" y1="45" x2="40" y2="60" ${SC} ${bodyStyle}/>
    <line x1="60" y1="45" x2="80" y2="60" ${SC} ${bodyStyle}/>
    <line x1="60" y1="72" x2="48" y2="110" ${SC} ${bodyStyle}/>
    <line x1="60" y1="72" x2="72" y2="110" ${SC} ${bodyStyle}/>
    <line x1="48" y1="110" x2="44" y2="125" ${SC} ${bodyStyle}/>
    <line x1="72" y1="110" x2="76" y2="125" ${SC} ${bodyStyle}/>
    <rect x="30" y="122" width="60" height="8" rx="2" fill="#333" stroke="#555" stroke-width="1"/>
  `);
}
function svgSquatDown() {
  return svgBase(`
    <circle cx="60" cy="22" r="10" ${SC} ${bodyStyle}/>
    <line x1="60" y1="32" x2="58" y2="65" ${SC} ${bodyStyle}/>
    <line x1="58" y1="48" x2="36" y2="38" ${SC} ${bodyStyle}/>
    <line x1="58" y1="48" x2="80" y2="38" ${SC} ${bodyStyle}/>
    <line x1="58" y1="65" x2="38" y2="90" ${SC} ${bodyStyle}/>
    <line x1="58" y1="65" x2="78" y2="90" ${SC} ${bodyStyle}/>
    <line x1="38" y1="90" x2="36" y2="115" ${SC} ${bodyStyle}/>
    <line x1="78" y1="90" x2="80" y2="115" ${SC} ${bodyStyle}/>
    <line x1="36" y1="115" x2="32" y2="125" ${SC} ${bodyStyle}/>
    <line x1="80" y1="115" x2="84" y2="125" ${SC} ${bodyStyle}/>
    <rect x="22" y="122" width="76" height="8" rx="2" fill="#333" stroke="#555" stroke-width="1"/>
  `);
}
function svgBridgeStart() {
  return svgBase(`
    <circle cx="35" cy="32" r="9" ${SC} ${bodyStyle}/>
    <line x1="35" y1="41" x2="80" y2="50" ${SC} ${bodyStyle}/>
    <line x1="57" y1="45" x2="50" y2="65" ${SC} ${bodyStyle}/>
    <line x1="80" y1="50" x2="82" y2="70" ${SC} ${bodyStyle}/>
    <line x1="82" y1="70" x2="84" y2="90" ${SC} ${bodyStyle}/>
    <line x1="50" y1="65" x2="48" y2="90" ${SC} ${bodyStyle}/>
    <line x1="15" y1="50" x2="45" y2="50" ${SC2} ${bodyStyle}/>
    <line x1="90" y1="90" x2="10" y2="90" fill="#333" ${SC2} stroke-width="1.5"/>
  `);
}
function svgBridgeUp() {
  return svgBase(`
    <circle cx="30" cy="48" r="9" ${SC} ${bodyStyle}/>
    <line x1="30" y1="57" x2="75" y2="38" ${SC} ${bodyStyle}/>
    <line x1="53" y1="47" x2="60" y2="72" ${SC} ${bodyStyle}/>
    <line x1="75" y1="38" x2="85" y2="65" ${SC} ${bodyStyle}/>
    <line x1="85" y1="65" x2="86" y2="90" ${SC} ${bodyStyle}/>
    <line x1="60" y1="72" x2="58" y2="90" ${SC} ${bodyStyle}/>
    <line x1="15" y1="57" x2="38" y2="57" ${SC2} ${bodyStyle}/>
    <line x1="90" y1="90" x2="10" y2="90" ${SC2} stroke-width="1.5"/>
    <path d="M53,47 Q65,28 75,38" stroke="#ff6b35" stroke-width="1.5" stroke-dasharray="4,3" fill="none"/>
  `);
}
function svgBirdDogStart() {
  return svgBase(`
    <circle cx="60" cy="30" r="9" ${SC} ${bodyStyle}/>
    <line x1="60" y1="39" x2="60" y2="75" ${SC} ${bodyStyle}/>
    <line x1="40" y1="58" x2="40" y2="90" ${SC} ${bodyStyle}/>
    <line x1="80" y1="58" x2="80" y2="90" ${SC} ${bodyStyle}/>
    <line x1="38" y1="58" x2="40" y2="90" ${SC} ${bodyStyle}/>
    <line x1="78" y1="58" x2="80" y2="90" ${SC} ${bodyStyle}/>
    <line x1="60" y1="50" x2="38" y2="50" ${SC} ${bodyStyle}/>
    <line x1="60" y1="50" x2="82" y2="50" ${SC} ${bodyStyle}/>
  `);
}
function svgBirdDogExtend() {
  return svgBase(`
    <circle cx="60" cy="30" r="9" ${SC} ${bodyStyle}/>
    <line x1="60" y1="39" x2="60" y2="75" ${SC} ${bodyStyle}/>
    <line x1="40" y1="58" x2="40" y2="90" ${SC} ${bodyStyle}/>
    <line x1="80" y1="58" x2="80" y2="90" ${SC} ${bodyStyle}/>
    <line x1="60" y1="50" x2="20" y2="50" ${SC} ${bodyStyle}/>
    <line x1="60" y1="66" x2="100" y2="66" ${SC} ${bodyStyle}/>
    <circle cx="20" cy="50" r="5" fill="#e8ff47" opacity=".4"/>
    <circle cx="100" cy="66" r="5" fill="#e8ff47" opacity=".4"/>
  `);
}
function svgCalfStart() {
  return svgBase(`
    <circle cx="60" cy="16" r="10" ${SC} ${bodyStyle}/>
    <line x1="60" y1="26" x2="60" y2="70" ${SC} ${bodyStyle}/>
    <line x1="60" y1="46" x2="42" y2="60" ${SC} ${bodyStyle}/>
    <line x1="60" y1="46" x2="78" y2="60" ${SC} ${bodyStyle}/>
    <line x1="60" y1="70" x2="50" y2="108" ${SC} ${bodyStyle}/>
    <line x1="60" y1="70" x2="70" y2="108" ${SC} ${bodyStyle}/>
    <line x1="50" y1="108" x2="46" y2="122" ${SC} ${bodyStyle}/>
    <line x1="70" y1="108" x2="74" y2="122" ${SC} ${bodyStyle}/>
    <line x1="36" y1="122" x2="84" y2="122" ${SC2} stroke-width="2"/>
  `);
}
function svgCalfUp() {
  return svgBase(`
    <circle cx="60" cy="12" r="10" ${SC} ${bodyStyle}/>
    <line x1="60" y1="22" x2="60" y2="66" ${SC} ${bodyStyle}/>
    <line x1="60" y1="42" x2="42" y2="56" ${SC} ${bodyStyle}/>
    <line x1="60" y1="42" x2="78" y2="56" ${SC} ${bodyStyle}/>
    <line x1="60" y1="66" x2="50" y2="102" ${SC} ${bodyStyle}/>
    <line x1="60" y1="66" x2="70" y2="102" ${SC} ${bodyStyle}/>
    <line x1="50" y1="102" x2="52" y2="118" ${SC} ${bodyStyle}/>
    <line x1="70" y1="102" x2="68" y2="118" ${SC} ${bodyStyle}/>
    <ellipse cx="60" cy="118" rx="10" ry="4" fill="none" stroke="#e8ff47" stroke-width="2"/>
    <line x1="36" y1="126" x2="84" y2="126" ${SC2} stroke-width="2"/>
    <path d="M50,102 Q46,112 52,118" stroke="#ff6b35" stroke-width="1.5" stroke-dasharray="3,2" fill="none"/>
    <path d="M70,102 Q74,112 68,118" stroke="#ff6b35" stroke-width="1.5" stroke-dasharray="3,2" fill="none"/>
  `);
}
function svgClamshellClosed() {
  return svgBase(`
    <circle cx="32" cy="38" r="9" ${SC} ${bodyStyle}/>
    <line x1="32" y1="47" x2="75" y2="60" ${SC} ${bodyStyle}/>
    <line x1="55" y1="54" x2="75" y2="80" ${SC} ${bodyStyle}/>
    <line x1="75" y1="60" x2="95" y2="78" ${SC} ${bodyStyle}/>
    <line x1="75" y1="80" x2="95" y2="82" ${SC} ${bodyStyle}/>
    <line x1="95" y1="78" x2="110" y2="86" ${SC} ${bodyStyle}/>
    <line x1="95" y1="82" x2="110" y2="90" ${SC} ${bodyStyle}/>
    <line x1="15" y1="47" x2="40" y2="47" ${SC2} ${bodyStyle}/>
    <line x1="10" y1="100" x2="120" y2="100" ${SC2} stroke-width="1.5"/>
  `);
}
function svgClamshellOpen() {
  return svgBase(`
    <circle cx="32" cy="38" r="9" ${SC} ${bodyStyle}/>
    <line x1="32" y1="47" x2="75" y2="60" ${SC} ${bodyStyle}/>
    <line x1="55" y1="54" x2="75" y2="80" ${SC} ${bodyStyle}/>
    <line x1="75" y1="60" x2="95" y2="42" ${SC} ${bodyStyle}/>
    <line x1="75" y1="80" x2="95" y2="82" ${SC} ${bodyStyle}/>
    <line x1="95" y1="42" x2="112" y2="52" ${SC} ${bodyStyle}/>
    <line x1="95" y1="82" x2="110" y2="90" ${SC} ${bodyStyle}/>
    <path d="M75,60 Q85,52 95,42" stroke="#ff6b35" stroke-width="1.5" stroke-dasharray="4,3" fill="none"/>
    <line x1="15" y1="47" x2="40" y2="47" ${SC2} ${bodyStyle}/>
    <line x1="10" y1="100" x2="120" y2="100" ${SC2} stroke-width="1.5"/>
  `);
}
function svgPushupUp() {
  return svgBase(`
    <circle cx="25" cy="30" r="9" ${SC} ${bodyStyle}/>
    <line x1="25" y1="39" x2="90" y2="55" ${SC} ${bodyStyle}/>
    <line x1="35" y1="42" x2="30" y2="68" ${SC} ${bodyStyle}/>
    <line x1="80" y1="52" x2="85" y2="78" ${SC} ${bodyStyle}/>
    <line x1="30" y1="68" x2="26" y2="82" ${SC} ${bodyStyle}/>
    <line x1="85" y1="78" x2="90" y2="85" ${SC} ${bodyStyle}/>
    <line x1="15" y1="68" x2="38" y2="68" ${SC} ${bodyStyle}/>
    <line x1="10" y1="85" x2="110" y2="85" ${SC2} stroke-width="1.5"/>
  `);
}
function svgPushupDown() {
  return svgBase(`
    <circle cx="22" cy="48" r="9" ${SC} ${bodyStyle}/>
    <line x1="22" y1="57" x2="88" y2="65" ${SC} ${bodyStyle}/>
    <line x1="32" y1="59" x2="28" y2="80" ${SC} ${bodyStyle}/>
    <line x1="78" y1="63" x2="82" y2="80" ${SC} ${bodyStyle}/>
    <line x1="28" y1="80" x2="24" y2="88" ${SC} ${bodyStyle}/>
    <line x1="82" y1="80" x2="86" y2="88" ${SC} ${bodyStyle}/>
    <line x1="13" y1="80" x2="36" y2="80" ${SC} ${bodyStyle}/>
    <line x1="10" y1="88" x2="110" y2="88" ${SC2} stroke-width="1.5"/>
  `);
}
function svgDipUp() {
  return svgBase(`
    <circle cx="58" cy="18" r="10" ${SC} ${bodyStyle}/>
    <line x1="58" y1="28" x2="58" y2="65" ${SC} ${bodyStyle}/>
    <line x1="58" y1="48" x2="35" y2="62" ${SC} ${bodyStyle}/>
    <line x1="58" y1="48" x2="81" y2="62" ${SC} ${bodyStyle}/>
    <line x1="35" y1="62" x2="32" y2="80" ${SC} ${bodyStyle}/>
    <line x1="81" y1="62" x2="84" y2="80" ${SC} ${bodyStyle}/>
    <line x1="58" y1="65" x2="50" y2="100" ${SC} ${bodyStyle}/>
    <line x1="58" y1="65" x2="66" y2="100" ${SC} ${bodyStyle}/>
    <rect x="20" y="78" width="80" height="10" rx="3" fill="#333" stroke="#555" stroke-width="1.5"/>
  `);
}
function svgDipDown() {
  return svgBase(`
    <circle cx="58" cy="36" r="10" ${SC} ${bodyStyle}/>
    <line x1="58" y1="46" x2="58" y2="75" ${SC} ${bodyStyle}/>
    <line x1="58" y1="58" x2="34" y2="70" ${SC} ${bodyStyle}/>
    <line x1="58" y1="58" x2="82" y2="70" ${SC} ${bodyStyle}/>
    <line x1="34" y1="70" x2="30" y2="82" ${SC} ${bodyStyle}/>
    <line x1="82" y1="70" x2="86" y2="82" ${SC} ${bodyStyle}/>
    <line x1="58" y1="75" x2="50" y2="108" ${SC} ${bodyStyle}/>
    <line x1="58" y1="75" x2="66" y2="108" ${SC} ${bodyStyle}/>
    <rect x="20" y="80" width="80" height="10" rx="3" fill="#333" stroke="#555" stroke-width="1.5"/>
  `);
}
function svgDeadBugStart() {
  return svgBase(`
    <circle cx="35" cy="38" r="9" ${SC} ${bodyStyle}/>
    <line x1="35" y1="47" x2="80" y2="50" ${SC} ${bodyStyle}/>
    <line x1="35" y1="47" x2="22" y2="28" ${SC} ${bodyStyle}/>
    <line x1="80" y1="50" x2="92" y2="30" ${SC} ${bodyStyle}/>
    <line x1="57" y1="49" x2="55" y2="68" ${SC} ${bodyStyle}/>
    <line x1="80" y1="50" x2="88" y2="68" ${SC} ${bodyStyle}/>
    <line x1="55" y1="68" x2="53" y2="85" ${SC} ${bodyStyle}/>
    <line x1="88" y1="68" x2="90" y2="85" ${SC} ${bodyStyle}/>
    <line x1="10" y1="92" x2="110" y2="92" ${SC2} stroke-width="2"/>
  `);
}
function svgDeadBugExtend() {
  return svgBase(`
    <circle cx="35" cy="38" r="9" ${SC} ${bodyStyle}/>
    <line x1="35" y1="47" x2="80" y2="50" ${SC} ${bodyStyle}/>
    <line x1="35" y1="47" x2="10" y2="38" ${SC} ${bodyStyle}/>
    <line x1="80" y1="50" x2="92" y2="30" ${SC} ${bodyStyle}/>
    <line x1="57" y1="49" x2="55" y2="68" ${SC} ${bodyStyle}/>
    <line x1="80" y1="50" x2="105" y2="62" ${SC} ${bodyStyle}/>
    <line x1="55" y1="68" x2="53" y2="85" ${SC} ${bodyStyle}/>
    <circle cx="10" cy="38" r="5" fill="#e8ff47" opacity=".4"/>
    <circle cx="105" cy="62" r="5" fill="#e8ff47" opacity=".4"/>
    <line x1="10" y1="92" x2="110" y2="92" ${SC2} stroke-width="2"/>
  `);
}
function svgPlank() {
  return svgBase(`
    <circle cx="22" cy="35" r="9" ${SC} ${bodyStyle}/>
    <line x1="22" y1="44" x2="88" y2="58" ${SC} ${bodyStyle}/>
    <line x1="88" y1="58" x2="96" y2="82" ${SC} ${bodyStyle}/>
    <line x1="60" y1="52" x2="58" y2="78" ${SC} ${bodyStyle}/>
    <line x1="22" y1="58" x2="22" y2="82" ${SC} ${bodyStyle}/>
    <line x1="14" y1="65" x2="30" y2="65" ${SC} ${bodyStyle}/>
    <line x1="10" y1="82" x2="110" y2="82" ${SC2} stroke-width="2"/>
    <line x1="22" y1="44" x2="96" y2="58" stroke="#ff6b35" stroke-width="1.5" stroke-dasharray="4,3"/>
  `);
}
function svgLungeStart() {
  return svgBase(`
    <circle cx="60" cy="16" r="10" ${SC} ${bodyStyle}/>
    <line x1="60" y1="26" x2="60" y2="70" ${SC} ${bodyStyle}/>
    <line x1="60" y1="46" x2="42" y2="60" ${SC} ${bodyStyle}/>
    <line x1="60" y1="46" x2="78" y2="60" ${SC} ${bodyStyle}/>
    <line x1="60" y1="70" x2="50" y2="108" ${SC} ${bodyStyle}/>
    <line x1="60" y1="70" x2="70" y2="108" ${SC} ${bodyStyle}/>
    <line x1="50" y1="108" x2="46" y2="124" ${SC} ${bodyStyle}/>
    <line x1="70" y1="108" x2="74" y2="124" ${SC} ${bodyStyle}/>
    <line x1="36" y1="124" x2="84" y2="124" ${SC2} stroke-width="2"/>
  `);
}
function svgLungeDown() {
  return svgBase(`
    <circle cx="52" cy="18" r="10" ${SC} ${bodyStyle}/>
    <line x1="52" y1="28" x2="52" y2="68" ${SC} ${bodyStyle}/>
    <line x1="52" y1="48" x2="34" y2="58" ${SC} ${bodyStyle}/>
    <line x1="52" y1="48" x2="70" y2="55" ${SC} ${bodyStyle}/>
    <line x1="52" y1="68" x2="36" y2="98" ${SC} ${bodyStyle}/>
    <line x1="52" y1="68" x2="72" y2="88" ${SC} ${bodyStyle}/>
    <line x1="36" y1="98" x2="30" y2="124" ${SC} ${bodyStyle}/>
    <line x1="72" y1="88" x2="88" y2="110" ${SC} ${bodyStyle}/>
    <line x1="88" y1="110" x2="92" y2="124" ${SC} ${bodyStyle}/>
    <line x1="18" y1="124" x2="105" y2="124" ${SC2} stroke-width="2"/>
  `);
}
function svgWalk() {
  return svgBase(`
    <circle cx="60" cy="18" r="10" ${SC} ${bodyStyle}/>
    <line x1="60" y1="28" x2="60" y2="70" ${SC} ${bodyStyle}/>
    <line x1="60" y1="46" x2="40" y2="56" ${SC} ${bodyStyle}/>
    <line x1="60" y1="46" x2="80" y2="38" ${SC} ${bodyStyle}/>
    <line x1="60" y1="70" x2="46" y2="100" ${SC} ${bodyStyle}/>
    <line x1="60" y1="70" x2="74" y2="100" ${SC} ${bodyStyle}/>
    <line x1="46" y1="100" x2="40" y2="124" ${SC} ${bodyStyle}/>
    <line x1="74" y1="100" x2="80" y2="118" ${SC} ${bodyStyle}/>
    <line x1="80" y1="118" x2="90" y2="124" ${SC} ${bodyStyle}/>
    <line x1="30" y1="124" x2="100" y2="124" ${SC2} stroke-width="2"/>
  `);
}
function svgRun() {
  return svgBase(`
    <circle cx="68" cy="16" r="10" ${SC} ${bodyStyle}/>
    <line x1="68" y1="26" x2="62" y2="66" ${SC} ${bodyStyle}/>
    <line x1="62" y1="46" x2="40" y2="36" ${SC} ${bodyStyle}/>
    <line x1="62" y1="46" x2="82" y2="32" ${SC} ${bodyStyle}/>
    <line x1="62" y1="66" x2="44" y2="94" ${SC} ${bodyStyle}/>
    <line x1="62" y1="66" x2="78" y2="90" ${SC} ${bodyStyle}/>
    <line x1="44" y1="94" x2="32" y2="118" ${SC} ${bodyStyle}/>
    <line x1="78" y1="90" x2="90" y2="108" ${SC} ${bodyStyle}/>
    <line x1="90" y1="108" x2="96" y2="118" ${SC} ${bodyStyle}/>
    <line x1="25" y1="124" x2="105" y2="124" ${SC2} stroke-width="2"/>
    <path d="M30,120 Q35,115 42,118" stroke="#47b8ff" stroke-width="1.5" fill="none" opacity=".6"/>
    <path d="M20,116 Q25,110 32,113" stroke="#47b8ff" stroke-width="1" fill="none" opacity=".4"/>
  `);
}
function svgCalfStretch() {
  return svgBase(`
    <circle cx="52" cy="18" r="10" ${SC} ${bodyStyle}/>
    <line x1="52" y1="28" x2="52" y2="70" ${SC} ${bodyStyle}/>
    <line x1="52" y1="48" x2="34" y2="56" ${SC} ${bodyStyle}/>
    <line x1="34" y1="56" x2="16" y2="60" ${SC} ${bodyStyle}/>
    <line x1="52" y1="48" x2="70" y2="42" ${SC} ${bodyStyle}/>
    <line x1="52" y1="70" x2="44" y2="105" ${SC} ${bodyStyle}/>
    <line x1="52" y1="70" x2="76" y2="105" ${SC} ${bodyStyle}/>
    <line x1="44" y1="105" x2="40" y2="122" ${SC} ${bodyStyle}/>
    <line x1="76" y1="105" x2="80" y2="122" ${SC} ${bodyStyle}/>
    <rect x="5" y="118" width="30" height="8" rx="2" fill="#333" stroke="#555" stroke-width="1"/>
    <line x1="30" y1="122" x2="110" y2="122" ${SC2} stroke-width="2"/>
  `);
}
function svgQuadStretch() {
  return svgBase(`
    <circle cx="60" cy="16" r="10" ${SC} ${bodyStyle}/>
    <line x1="60" y1="26" x2="60" y2="70" ${SC} ${bodyStyle}/>
    <line x1="60" y1="46" x2="40" y2="54" ${SC} ${bodyStyle}/>
    <line x1="60" y1="46" x2="76" y2="40" ${SC} ${bodyStyle}/>
    <line x1="60" y1="70" x2="50" y2="108" ${SC} ${bodyStyle}/>
    <line x1="60" y1="70" x2="68" y2="90" ${SC} ${bodyStyle}/>
    <line x1="68" y1="90" x2="64" y2="72" ${SC} ${bodyStyle}/>
    <line x1="68" y1="90" x2="72" y2="70" ${SC} ${bodyStyle}/>
    <line x1="50" y1="108" x2="46" y2="124" ${SC} ${bodyStyle}/>
    <line x1="30" y1="124" x2="90" y2="124" ${SC2} stroke-width="2"/>
  `);
}
function svgHamstringStretch() {
  return svgBase(`
    <circle cx="30" cy="40" r="9" ${SC} ${bodyStyle}/>
    <line x1="30" y1="49" x2="55" y2="62" ${SC} ${bodyStyle}/>
    <line x1="42" y1="56" x2="38" y2="35" ${SC} ${bodyStyle}/>
    <line x1="55" y1="62" x2="96" y2="68" ${SC} ${bodyStyle}/>
    <line x1="55" y1="62" x2="90" y2="78" ${SC} ${bodyStyle}/>
    <line x1="96" y1="68" x2="100" y2="85" ${SC} ${bodyStyle}/>
    <line x1="90" y1="78" x2="100" y2="86" ${SC} ${bodyStyle}/>
    <line x1="15" y1="86" x2="110" y2="86" ${SC2} stroke-width="2"/>
    <path d="M38,35 Q60,40 75,55" stroke="#ff6b35" stroke-width="1.5" stroke-dasharray="4,3" fill="none"/>
  `);
}
function svgPiriformisStretch() {
  return svgBase(`
    <circle cx="35" cy="35" r="9" ${SC} ${bodyStyle}/>
    <line x1="35" y1="44" x2="78" y2="52" ${SC} ${bodyStyle}/>
    <line x1="35" y1="44" x2="22" y2="32" ${SC} ${bodyStyle}/>
    <line x1="78" y1="52" x2="88" y2="32" ${SC} ${bodyStyle}/>
    <line x1="57" y1="48" x2="60" y2="70" ${SC} ${bodyStyle}/>
    <line x1="78" y1="52" x2="85" y2="72" ${SC} ${bodyStyle}/>
    <line x1="60" y1="70" x2="72" y2="76" ${SC} ${bodyStyle}/>
    <line x1="72" y1="76" x2="85" y2="72" ${SC} ${bodyStyle}/>
    <line x1="60" y1="70" x2="56" y2="88" ${SC} ${bodyStyle}/>
    <line x1="85" y1="72" x2="92" y2="88" ${SC} ${bodyStyle}/>
    <line x1="10" y1="92" x2="110" y2="92" ${SC2} stroke-width="2"/>
    <path d="M72,76 Q78,68 85,72" stroke="#ff6b35" stroke-width="1.5" stroke-dasharray="3,2" fill="none"/>
  `);
}

// ══════════════════════════════════════════════
// APP DATA
// ══════════════════════════════════════════════
const PLAN = [
  { day:'Mon', type:'run',        label:'Run – C25K' },
  { day:'Tue', type:'strength-a', label:'Strength A' },
  { day:'Wed', type:'run',        label:'Run – C25K' },
  { day:'Thu', type:'mobility',   label:'Mobility Day' },
  { day:'Fri', type:'strength-b', label:'Strength B' },
  { day:'Sat', type:'run',        label:'Run – C25K' },
  { day:'Sun', type:'rest',       label:'Rest Day' }
];
const TYPE_SHORT = { run:'RUN','strength-a':'STR A','strength-b':'STR B',mobility:'MOB',rest:'REST' };

let state = JSON.parse(localStorage.getItem('c25k_v3') || 'null') || { currentWeek:1, completed:{}, exDone:{}, notes:{} };
function save() { localStorage.setItem('c25k_v3', JSON.stringify(state)); }

function getWorkout(type, week) {
  if (type === 'run') return { warmup:null, exercises:[
    { name:'Brisk Walk Warm-up', detail:'5 minutes' },
    { name:'C25K Intervals',     detail:`Follow Week ${week} intervals` },
    { name:'Cool-down Walk',     detail:'5 minutes' }
  ]};
  if (type === 'strength-a') {
    const sq = week>=5?12:week>=3?10:8, br = week>=3?12:10;
    return { warmup:'10 pelvic tilts · 10 hip circles · 8 cat–cow', exercises:[
      { name:'Chair Squats',         detail:`3 sets × ${sq} reps` },
      { name:'Glute Bridges',        detail:`3 sets × ${br} reps (2s squeeze)` },
      { name:'Bird Dogs',            detail:'3 sets × 8 reps each side' },
      { name:'Standing Calf Raises', detail:'3 sets × 12 reps' },
      { name:'Side Clamshells',      detail:'2 sets × 10 reps each side' }
    ]};
  }
  if (type === 'strength-b') {
    const pu = week>=7?'3 sets × MAX reps':week>=5?'5 sets × 5 reps':week>=3?'5 sets × 4 reps':'5 sets × 3 reps';
    const pl = week>=5?30:week>=3?25:20;
    const ex = [
      { name:'Push-ups',             detail:pu },
      { name:'Chair Dips',           detail:'3 sets × 8 reps' },
      { name:'Dead Bugs',            detail:'3 sets × 8 reps each side' },
      { name:'Kneeling Plank',       detail:`3 sets × ${pl} seconds` },
      { name:'Standing Calf Raises', detail:'2 sets × 12 reps' }
    ];
    if (week>=7) ex.push({ name:'Lunges', detail:'2 sets × 8 reps each side' });
    return { warmup:'Arm circles ×20 · Shoulder rolls ×20', exercises:ex };
  }
  if (type === 'mobility') return { warmup:null, exercises:[
    { name:'Calf Stretch',       detail:'30s each side' },
    { name:'Quad Stretch',       detail:'30s each side' },
    { name:'Hamstring Stretch',  detail:'30s each side' },
    { name:'Piriformis Stretch', detail:'30s each side' },
    { name:'Optional Walk',      detail:'10–15 mins' }
  ]};
  return { warmup:null, exercises:[] };
}

function getPhase(w) { return w<=2?'PHASE: WEEKS 1–2':w<=4?'PHASE: WEEKS 3–4':w<=6?'PHASE: WEEKS 5–6':'PHASE: WEEKS 7–8'; }
function getTodayDayIndex() { return [6,0,1,2,3,4,5][new Date().getDay()]; }

let selectedDay = getTodayDayIndex();
let catchupOpen = false, catchupSelected = new Set();
let currentDrawerKey = null, currentDrawerExName = null;

// ── DRAWER ──────────────────────────────────────────────────────────
function openExerciseDrawer(exName, dayKey, exIdx) {
  const guide = EXERCISE_GUIDES[exName];
  if (!guide) return;
  currentDrawerKey = `${dayKey}_ex${exIdx}`;
  currentDrawerExName = exName;
  const plan = PLAN[selectedDay];
  const isDone = !!state.exDone[currentDrawerKey];

  const pillColor = plan.type==='run'?'rgba(71,184,255,.15)':plan.type==='mobility'?'rgba(156,110,245,.15)':'rgba(232,255,71,.1)';
  const pillTextColor = plan.type==='run'?'#47b8ff':plan.type==='mobility'?'#9c6ef5':'#e8ff47';

  const workout = getWorkout(plan.type, state.currentWeek);
  const ex = workout.exercises[exIdx];

  const illustrationHTML = guide.illustrations.map(f =>
    `<div class="illus-frame">${f.svg}<div class="illus-label">${f.label}</div></div>`
  ).join('');

  const musclesHTML = guide.muscles.map(m =>
    `<span class="muscle-tag${guide.primaryMuscles.includes(m)?' primary':''}">${m}</span>`
  ).join('');

  const stepsHTML = guide.steps.map((s,i) =>
    `<li class="step-item"><div class="step-num">${i+1}</div><div class="step-text">${s}</div></li>`
  ).join('');

  const tipsHTML = guide.tips.map(t =>
    `<div class="tip-item">${t}</div>`
  ).join('');

  document.getElementById('drawer-content').innerHTML = `
    <div class="drawer-hero">
      <div class="drawer-type-pill" style="background:${pillColor};color:${pillTextColor}">${TYPE_SHORT[plan.type]}</div>
      <div class="drawer-title">${exName}</div>
      <div class="drawer-sets">Target: <strong>${ex.detail}</strong></div>
    </div>
    <div class="illustration-wrap">
      <div class="illus-frames">${illustrationHTML}</div>
    </div>
    <div class="muscles-row">${musclesHTML}</div>
    <div class="drawer-section-title">How To Do It</div>
    <ul class="steps-list">${stepsHTML}</ul>
    <div class="drawer-section-title">Tips</div>
    <div class="tips-box"><div class="tips-title">💡 Coach Notes</div>${tipsHTML}</div>
    <div class="drawer-section-title">Complete</div>
    <div class="drawer-cta">
      <button class="btn-ex-close" onclick="closeDrawer()">← Back</button>
      <button class="btn-ex-done ${isDone?'marked':'idle'}" id="drawer-done-btn" onclick="markExFromDrawer()">
        ${isDone ? '✓ Done!' : 'Mark Complete'}
      </button>
    </div>
  `;

  document.getElementById('overlay').classList.add('open');
  document.getElementById('ex-drawer').classList.add('open');
  document.getElementById('ex-drawer').scrollTop = 0;
}

function closeDrawer() {
  document.getElementById('overlay').classList.remove('open');
  document.getElementById('ex-drawer').classList.remove('open');
}

function markExFromDrawer() {
  if (!currentDrawerKey) return;
  state.exDone[currentDrawerKey] = !state.exDone[currentDrawerKey];
  save();
  const isDone = state.exDone[currentDrawerKey];
  const btn = document.getElementById('drawer-done-btn');
  btn.className = `btn-ex-done ${isDone?'marked':'idle'}`;
  btn.textContent = isDone ? '✓ Done!' : 'Mark Complete';
  renderToday(); // update the list behind drawer
  if (isDone) showToast('✓ Exercise complete!');
}

// ── CATCH-UP ─────────────────────────────────────────────────────────
function toggleCatchup() {
  catchupOpen = !catchupOpen;
  catchupSelected.clear();
  document.getElementById('catchup-panel').classList.toggle('visible', catchupOpen);
  document.getElementById('catchup-btn').classList.toggle('active', catchupOpen);
  if (catchupOpen) buildCatchupPanel();
  updateCatchupCount();
}
function buildCatchupPanel() {
  const scroll = document.getElementById('catchup-scroll');
  scroll.innerHTML = '';
  for (let w=1;w<=8;w++) {
    const row = document.createElement('div'); row.className = 'catchup-week-row';
    const lbl = document.createElement('div'); lbl.className = 'catchup-week-label'; lbl.textContent = `Week ${w}`;
    const grid = document.createElement('div'); grid.className = 'catchup-grid';
    PLAN.forEach((d,i) => {
      const key=`w${w}d${i}`, done=!!state.completed[key];
      const cell = document.createElement('div');
      cell.className = `catchup-cell${done?' already-done':''}${catchupSelected.has(key)?' selected':''}`;
      cell.innerHTML = `<span class="cell-day">${d.day.charAt(0)}</span><span class="cell-type">${TYPE_SHORT[d.type]}</span>`;
      if (!done) cell.onclick = () => toggleCell(key, cell);
      grid.appendChild(cell);
    });
    row.appendChild(lbl); row.appendChild(grid); scroll.appendChild(row);
  }
}
function toggleCell(key, el) {
  catchupSelected.has(key) ? (catchupSelected.delete(key), el.classList.remove('selected')) : (catchupSelected.add(key), el.classList.add('selected'));
  updateCatchupCount();
}
function updateCatchupCount() {
  const n = catchupSelected.size;
  document.getElementById('catchup-count').textContent = n===0 ? '0 days selected' : `${n} day${n!==1?'s':''} selected`;
  document.getElementById('catchup-confirm').disabled = n===0;
}
function selectAllPast() {
  const tw=state.currentWeek, td=getTodayDayIndex(); catchupSelected.clear();
  for (let w=1;w<=8;w++) for (let i=0;i<7;i++) {
    const key=`w${w}d${i}`;
    if (state.completed[key]||PLAN[i].type==='rest') continue;
    if (w<tw||(w===tw&&i<td)) catchupSelected.add(key);
  }
  buildCatchupPanel(); updateCatchupCount();
}
function confirmCatchup() {
  catchupSelected.forEach(k=>{state.completed[k]=true;}); save();
  const n=catchupSelected.size; catchupSelected.clear(); toggleCatchup(); render();
  showToast(`✅ ${n} day${n!==1?'s':''} marked complete!`);
}

// ── CORE RENDER ───────────────────────────────────────────────────────
function render() {
  document.getElementById('week-label').textContent = `WEEK ${state.currentWeek} OF 8`;
  document.getElementById('phase-badge').textContent = getPhase(state.currentWeek);
  renderDots(); renderToday(); updateProgress();
}
function renderDots() {
  const c = document.getElementById('week-dots'); c.innerHTML = '';
  PLAN.forEach((d,i) => {
    const key=`w${state.currentWeek}d${i}`, done=state.completed[key];
    const dot = document.createElement('div');
    dot.className = `day-dot ${d.type}${done?' completed '+d.type:''}${i===getTodayDayIndex()?' today':''}`;
    dot.innerHTML = `<span>${d.day.charAt(0)}</span>${done?'<span style="font-size:8px">✓</span>':''}`;
    dot.onclick = () => { selectedDay=i; renderToday(); };
    c.appendChild(dot);
  });
}
function renderToday() {
  const plan = PLAN[selectedDay];
  const workout = getWorkout(plan.type, state.currentWeek);
  const key = `w${state.currentWeek}d${selectedDay}`;
  const isDone = !!state.completed[key];
  const isToday = selectedDay===getTodayDayIndex();
  const bClass = plan.type==='run'?'run':plan.type==='mobility'?'mob':plan.type==='rest'?'rst':'strength';

  let html = `<div class="today-card ${plan.type}">
    <div class="today-label">${isToday?'📅 Today':plan.day}</div>
    <div class="today-title">${plan.label} <span class="type-badge ${bClass}">${TYPE_SHORT[plan.type]}</span></div>`;

  if (workout.warmup) html += `<div class="warmup-section"><div class="warmup-label">🔥 Warm-Up</div><div class="warmup-text">${workout.warmup}</div></div>`;

  if (workout.exercises.length) {
    const hasGuide = exName => !!EXERCISE_GUIDES[exName];
    html += `<ul class="exercises">`;
    workout.exercises.forEach((ex,idx) => {
      const exKey=`${key}_ex${idx}`, exDone=!!state.exDone[exKey], hasG=hasGuide(ex.name);
      html += `<li class="ex-item${exDone?' done-ex':''}" onclick="openExerciseDrawer('${ex.name.replace(/'/g,"\\'")}','${key}',${idx})">
        <div class="ex-check">${exDone?'✓':''}</div>
        <div style="flex:1;padding-right:20px">
          <div class="ex-name">${ex.name}</div>
          <div class="ex-detail">${ex.detail}</div>
          ${hasG?'<div class="ex-info-hint">Tap for guide & instructions →</div>':''}
        </div>
      </li>`;
    });
    html += `</ul>`;
  } else {
    html += `<p style="color:var(--muted);font-size:13px;text-align:center;padding:12px 0">Recovery is key to progress. 💤</p>`;
  }

  if (plan.type !== 'rest') {
    html += `<button class="complete-btn ${plan.type}${isDone?' done':''}" onclick="toggleDone('${key}')">${isDone?'✓ Session Complete':'Mark Session Complete'}</button>`;
  }
  html += `</div>`;
  document.getElementById('today-section').innerHTML = html;
}

function toggleEx(key) { state.exDone[key]=!state.exDone[key]; save(); renderToday(); }
function toggleDone(key) { state.completed[key]=!state.completed[key]; save(); render(); if(state.completed[key]) showToast('🎉 Session logged!'); }
function changeWeek(delta) { state.currentWeek=Math.max(1,Math.min(8,state.currentWeek+delta)); save(); render(); }
function updateProgress() {
  const done=Object.keys(state.completed).filter(k=>state.completed[k]).length, pct=Math.round(done/56*100);
  document.getElementById('prog-fill').style.width=pct+'%';
  document.getElementById('prog-pct').textContent=pct+'%';
  document.getElementById('prog-label').textContent=`${done} of 56 days logged`;
}
function switchTab(tab,btn) {
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active')); btn.classList.add('active');
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active')); document.getElementById('view-'+tab).classList.add('active');
  if (tab==='progress') renderStats();
}
function renderStats() {
  const keys=Object.keys(state.completed).filter(k=>state.completed[k]); let r=0,s=0;
  keys.forEach(k=>{const i=parseInt(k.split('d')[1]);if(!isNaN(i)){if(PLAN[i].type==='run')r++;if(PLAN[i].type.includes('strength'))s++;}});
  document.getElementById('stat-runs').textContent=r;
  document.getElementById('stat-strength').textContent=s;
  document.getElementById('stat-total').textContent=keys.length;
}
function showToast(msg) {
  const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}
function exportData() {
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([JSON.stringify(state)],{type:'application/json'}));
  a.download=`fitness_backup_${new Date().toISOString().slice(0,10)}.json`; a.click();
}
function importData() {
  const input=document.createElement('input'); input.type='file';
  input.onchange=e=>{const r=new FileReader();r.onload=ev=>{state=JSON.parse(ev.target.result);save();location.reload();};r.readAsText(e.target.files[0]);};
  input.click();
}

render();
</script>
</body>
</html>
