const stations = [
  { id: 'orange-lemons', title: 'Orange & Lemons Radio', artist: 'Orange & Lemons', description: 'With Hale, Moonstar88, Up Dharma Down and more', mood: 'OPM alternative / pop-rock', image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=900&q=84', initial: 'O&L', songs: [['Heaven Knows - This Angel', 'Orange & Lemons'], ['Keep On Loving You', 'Renz Verano'], ['Kay Tagal Kitang Hinintay', 'Sponge Cola'], ['Buloy', 'Parokya Ni Edgar'], ['Mahal Pa Rin Kita', 'Rockstar'], ['Tensionado', 'Soapdish'], ['The Day You Said Goodnight', 'Hale'], ['14', 'Silent Sanctuary'], ['Alipin', 'Shamrock'], ['Ikaw Lang', 'Nobita'], ['Sana', 'I Belong to the Zoo'], ['Eroplanong Papel', 'December Avenue'], ['Umaasa', 'Calein'], ['Halaga', 'Parokya Ni Edgar'], ['Hanggang Kailan', 'Orange & Lemons'], ['Tayong Dalawa', 'Rey Valera'], ['Kung Wala Ka', 'Hale'], ['Rebound', 'Silent Sanctuary'], ['Kasalanan', 'Orient Pearl'], ['Kalapastangan', 'fitterkarma'], ['Pusong Ligaw', 'Jericho Rosales'], ['Buko', 'Jireh Lim'], ['Bulong', 'December Avenue'], ['Migraine', 'Moonstar88'], ['Kaleidoscope World', 'Parokya Ni Edgar']] },
  { id: 'hale', title: 'Hale Radio', artist: 'Hale', description: 'Emotional OPM rock for quiet mornings and long rides', mood: 'Emotional OPM rock', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900&q=84', initial: 'H', songs: [['The Day You Said Goodnight', 'Hale'], ['Kung Wala Ka', 'Hale'], ['Kahit Pa', 'Hale'], ['Broken Sonnet', 'Hale'], ['Sandali Lang', 'Hale'], ['This Time', 'Hale'], ['Heaven Knows - This Angel', 'Orange & Lemons'], ['14', 'Silent Sanctuary']] },
  { id: 'december-avenue', title: 'December Avenue Radio', artist: 'December Avenue', description: 'Mellow heartbreak anthems with a little light at the end', mood: 'Mellow / heartbreak OPM', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&q=84', initial: 'DA', songs: [['Kung Di Rin Lang Ikaw', 'December Avenue'], ['Sa Ngalan ng Pag-ibig', 'December Avenue'], ['Huling Sandali', 'December Avenue'], ['Bulong', 'December Avenue'], ['Eroplanong Papel', 'December Avenue'], ["Kahit 'Di Mo Alam", 'December Avenue'], ['Bawat Daan', 'Ebe Dancel'], ['Sana', 'I Belong to the Zoo']] },
  { id: 'parokya', title: 'Parokya Ni Edgar Radio', artist: 'Parokya Ni Edgar', description: 'Classic Filipino rock, mischief, and songs everyone knows by heart', mood: 'Classic Filipino rock', image: 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=900&q=84', initial: 'PNE', songs: [['Buloy', 'Parokya Ni Edgar'], ['Halaga', 'Parokya Ni Edgar'], ['Kaleidoscope World', 'Parokya Ni Edgar'], ['Pangarap Lang Kita', 'Parokya Ni Edgar'], ['Yes Yes Show', 'Parokya Ni Edgar'], ['Inuman Na', 'Parokya Ni Edgar'], ['Mang Jose', 'Parokya Ni Edgar'], ['Alapaap', 'Eraserheads']] },
  { id: 'opm-2000s', title: '2000s OPM Radio', artist: 'OPM Essentials', description: 'Nostalgic Filipino hits from burned CDs, Friendster, and first loves', mood: 'Nostalgic Filipino hits', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=84', initial: '00s', songs: [['Heaven Knows - This Angel', 'Orange & Lemons'], ['The Day You Said Goodnight', 'Hale'], ['Migraine', 'Moonstar88'], ['Your Universe', 'Rico Blanco'], ['With A Smile', 'Eraserheads'], ['Balisong', 'Rivermaya'], ['Narda', 'Kamikazee'], ['214', 'Rivermaya'], ['Jeepney', 'Sponge Cola']] },
  { id: 'late-night', title: 'Late Night OPM Radio', artist: 'After Hours OPM', description: 'Slow, intimate songs for city lights and messages left unsent', mood: 'Slow and emotional', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900&q=84', initial: 'LN', songs: [['Sana', 'I Belong to the Zoo'], ['Huling Sandali', 'December Avenue'], ['Bawat Daan', 'Ebe Dancel'], ['Tahanan', 'Adie'], ["Sa'yo", 'Munimuni'], ['Di Na Babalik', 'Ang Bandang Shirley'], ['Ikaw Lang', 'Nobita'], ['Kung Wala Ka', 'Hale']] },
  { id: 'pinoy-rock', title: 'Pinoy Rock Radio', artist: 'Pinoy Rock Classics', description: 'Guitars up: Filipino rock classics from every generation', mood: 'Filipino rock classics', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&q=84', initial: 'PR', songs: [['Alapaap', 'Eraserheads'], ['Narda', 'Kamikazee'], ['Gitara', 'Parokya Ni Edgar'], ['Liwanag Sa Dilim', 'Rivermaya'], ['Kisapmata', 'Rivermaya'], ['With A Smile', 'Eraserheads'], ['Magasin', 'Eraserheads'], ['Hallelujah', 'Bamboo'], ['Lightyears', 'Rivermaya']] },
  { id: 'opm-love', title: 'OPM Love Songs Radio', artist: 'OPM Love Songs', description: 'Romantic Filipino songs for kilig, comfort, and everything between', mood: 'Romantic Filipino songs', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=84', initial: '♥', songs: [['Hanggang Kailan', 'Orange & Lemons'], ['Ikaw Lang', 'Nobita'], ['Kung Ako Na Lang Sana', 'Bituin Escalante'], ['Ako Na Lang', 'Zia Quizon'], ["Pangako Sa'yo", 'Sheryn Regis'], ['Kailangan Kita', 'Erik Santos'], ['Sinta', 'Rob Deniel'], ['Your Universe', 'Rico Blanco'], ['Mahal Pa Rin Kita', 'Rockstar']] }
].map(station => ({ ...station, tracks: station.songs.map(([title, artist]) => ({ id: '', title, user: artist, url: '', thumbnail: station.image, duration: '', plays: '' })) }));

const extraStations = [
  { id: 'manila-mellow', title: 'Manila Mellow Radio', artist: 'Manila Mellow', description: 'City-pop colors, soft guitars, and OPM afterglow', mood: 'Mellow alternative OPM', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=84', initial: 'MM', songs: [['Tahanan', 'Adie'], ["Sa'yo", 'Munimuni'], ['Bawat Daan', 'Ebe Dancel'], ['Sinderela', 'Cup of Joe'], ['Dahan-Dahan', 'Lola Amour'], ['Dumaloy', 'SUD'], ['Araw-Araw', 'Ben&Ben']] },
  { id: 'acoustic-opm', title: 'Acoustic OPM Radio', artist: 'Acoustic OPM', description: 'Bare strings, honest lyrics, and songs that feel close', mood: 'Acoustic and intimate', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=900&q=84', initial: 'AC', songs: [['Leaves', 'Ben&Ben'], ['Tahanan', 'Adie'], ['Pahintulot', 'Shirebound & Busking'], ['Araw-Araw', 'Ben&Ben'], ['Bawat Daan', 'Ebe Dancel'], ['Ikaw at Ako', 'Johnoy Danao'], ['Sundo', 'Imago']] },
  { id: 'morning-opm', title: 'Morning OPM Radio', artist: 'Good Morning OPM', description: 'Bright Filipino favorites to start the day with a little hope', mood: 'Bright and hopeful', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=84', initial: 'AM', songs: [['Liwanag Sa Dilim', 'Rivermaya'], ['With A Smile', 'Eraserheads'], ['Araw-Araw', 'Ben&Ben'], ['Umaaraw, Umuulan', 'Rivermaya'], ['Pagtingin', 'Ben&Ben'], ['Tila', 'Clara Benin'], ['Home', 'Rico Blanco']] },
  { id: '90s-pinoy', title: '90s Pinoy Rock Radio', artist: 'Pinoy Rock Archives', description: 'Guitars, denim, and the Filipino rock records that shaped a decade', mood: '90s Filipino rock', image: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=900&q=84', initial: '90s', songs: [['Ang Huling El Bimbo', 'Eraserheads'], ['214', 'Rivermaya'], ['Ulan', 'Cueshe'], ['Balisong', 'Rivermaya'], ['Toyang', 'Eraserheads'], ['Noypi', 'Bamboo'], ['Halik', 'Aegis']] }
].map(station => ({ ...station, tracks: station.songs.map(([title, artist]) => ({ id: '', title, user: artist, url: '', thumbnail: station.image, duration: '', plays: '' })) }));
stations.push(...extraStations);

const editorialTracks = [
  ['Kundiman', 'Silent Sanctuary', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=700&q=82'],
  ['Migraine', 'Moonstar88', 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=700&q=82'],
  ['The Day You Said Goodnight', 'Hale', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=700&q=82'],
  ['Heaven Knows - This Angel', 'Orange & Lemons', 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=700&q=82'],
  ['Bulong', 'December Avenue', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=700&q=82'],
  ['Kaleidoscope World', 'Parokya Ni Edgar', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=700&q=82']
].map(([title, user, thumbnail], index) => ({ id: `editorial-${index}`, title, user, thumbnail, url: '', duration: '', plays: '' }));

const assetImages = {
  heroA: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&q=86',
  heroB: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&q=86',
  heroC: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1000&q=86',
  pick: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1000&q=86'
};

const state = {
  page: document.body.dataset.page || 'home',
  currentTracks: [],
  currentIndex: -1,
  currentTrack: null,
  isPlaying: false,
  liked: JSON.parse(localStorage.getItem('jay_liked_tracks') || '[]'),
  playlists: JSON.parse(localStorage.getItem('jay_radio_playlists') || '{}'),
  audio: null,
  supabase: null,
  user: null,
  accessToken: '',
  authMode: 'signin',
  authReady: false,
  accountStatus: null,
  deviceId: localStorage.getItem('jay_device_id') || `${navigator.userAgent.slice(0, 24)}-${Math.random().toString(36).slice(2)}`,
  resolving: new Map(),
  toastTimer: null
};
localStorage.setItem('jay_device_id', state.deviceId);

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const esc = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const imageFor = (track, fallback = assetImages.heroA) => track?.thumbnail || fallback;

function normaliseTrack(track) {
  return { id: track.id || track.track_id || track.url || `${track.title}-${track.user}`, title: track.title || 'Untitled track', user: track.user || track.artist || 'Unknown artist', url: track.url || '', thumbnail: track.thumbnail || '', duration: track.duration || '', plays: track.plays || '' };
}

function navMarkup() {
  const active = link => state.page === link ? 'active' : '';
  return `<aside class="side-nav">
    <a class="brand" href="/home.html"><span class="brand-mark"><i class="fa-solid fa-wave-square"></i></span><span><strong class="brand-name">JaySoundCloud</strong><span class="brand-meta">Orange audio club</span></span></a>
    <div class="nav-group"><div class="nav-label">Listen</div>
      <a class="nav-link ${active('home')}" href="/home.html"><i class="fa-solid fa-house"></i> Home</a>
      <a class="nav-link ${active('search')}" href="/search.html"><i class="fa-solid fa-magnifying-glass"></i> Search</a>
      <a class="nav-link ${active('radio')}" href="/radio.html"><i class="fa-solid fa-tower-broadcast"></i> Radio</a>
    </div>
    <div class="nav-group"><div class="nav-label">Your library</div>
      <a class="nav-link ${active('playlist')}" href="/playlist.html"><i class="fa-solid fa-layer-group"></i> Your Playlists</a>
      <a class="nav-link ${active('liked')}" href="/playlist.html?view=liked"><i class="fa-solid fa-heart"></i> Liked Songs</a>
    </div>
    <div class="nav-group"><div class="nav-label">Membership</div>
      <a class="nav-link ${active('premium')}" href="/premium.html"><i class="fa-solid fa-crown"></i> Premium</a>
    </div>
    <div class="nav-footer"><strong>Made for OPM listeners.</strong><br>Curated by Jay Sound Cloud.<br><span>© 2026 JaySoundCloud</span></div>
  </aside>
  <nav class="mobile-nav">
    <a class="${active('home')}" href="/home.html"><i class="fa-solid fa-house"></i><span>Home</span></a>
    <a class="${active('search')}" href="/search.html"><i class="fa-solid fa-magnifying-glass"></i><span>Search</span></a>
    <a class="${active('playlist')}" href="/playlist.html"><i class="fa-solid fa-layer-group"></i><span>Library</span></a>
    <a class="${active('premium')}" href="/premium.html"><i class="fa-solid fa-crown"></i><span>Premium</span></a>
  </nav>`;
}

function topbarMarkup() {
  return `<header class="topbar"><div class="topbar-left"><button class="circle-button" onclick="history.back()" aria-label="Go back"><i class="fa-solid fa-chevron-left"></i></button><button class="circle-button" onclick="history.forward()" aria-label="Go forward"><i class="fa-solid fa-chevron-right"></i></button></div><div class="topbar-actions"><span id="quota-badge" class="muted" style="font-size:11px">Sign in to listen</span><a class="ghost-button" href="/premium.html"><i class="fa-solid fa-crown"></i> Upgrade</a><button class="user-chip" onclick="openLogin()"><span class="avatar">J</span><span id="user-label">Guest</span><i class="fa-solid fa-chevron-down"></i></button></div></header>`;
}

function playerMarkup() {
  return `<section class="player" aria-label="Music player"><div class="player-track"><div class="player-cover"><img id="player-cover" src="${assetImages.heroA}" alt="Current track artwork"></div><div class="player-track-copy"><strong id="player-title">Choose a song to start listening</strong><span id="player-artist">JaySoundCloud</span></div><button class="icon-button" id="player-like" onclick="toggleCurrentLike()" title="Like track"><i class="fa-regular fa-heart"></i></button></div><div class="player-center"><div class="player-controls"><button class="icon-button" onclick="previousTrack()" title="Previous"><i class="fa-solid fa-backward-step"></i></button><button class="play-button" id="player-play" onclick="togglePlayback()" title="Play"><i class="fa-solid fa-play"></i></button><button class="icon-button" onclick="nextTrack()" title="Next"><i class="fa-solid fa-forward-step"></i></button></div><div class="progress-line" onclick="seekAudio(event)"><span id="progress-fill"></span></div></div><div class="player-extra"><i class="fa-solid fa-volume-low"></i><input class="volume" id="volume" type="range" min="0" max="1" step=".05" value="1" oninput="setVolume(this.value)"><button class="icon-button" onclick="openQueue()" title="Queue"><i class="fa-solid fa-bars-staggered"></i></button></div></section><audio id="audio" preload="none"></audio>`;
}

function layout(content) {
  document.body.innerHTML = `<div class="app-shell">${navMarkup()}<div class="main-column">${topbarMarkup()}<main class="page fade-in">${content}</main></div>${playerMarkup()}<div id="toast" class="toast" role="status" aria-live="polite"></div><div id="login-modal" class="modal-backdrop"><div class="modal"><p class="section-kicker" id="auth-kicker">JaySoundCloud account</p><h2 id="auth-title">Welcome back</h2><p id="auth-copy">Create an account or sign in before you start listening. Your daily allowance and Premium promo are protected on the server.</p><form id="login-form"><input id="login-email" type="email" placeholder="Email address" required><input id="login-password" type="password" placeholder="Password" required style="margin-top:9px" minlength="6"><div class="modal-actions"><button type="button" class="ghost-button" onclick="toggleAuthMode()" id="auth-switch">Create account</button><button type="button" class="ghost-button" onclick="closeLogin()">Cancel</button><button class="primary-button" type="submit" id="auth-submit">Sign in</button></div></form></div></div></div>`;
  state.audio = $('#audio');
  bindAudio();
  updatePlayer();
  updateAuthModal();
}

function bindAudio() {
  state.audio.addEventListener('timeupdate', updateProgress);
  state.audio.addEventListener('ended', nextTrack);
  state.audio.addEventListener('error', () => { state.isPlaying = false; updatePlayer(); showToast('This stream is unavailable. Try another track.'); });
}

function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function formatDuration(value) {
  if (!value) return '';
  if (typeof value === 'string' && value.includes(':')) return value;
  const seconds = Number(value);
  if (!Number.isFinite(seconds)) return '';
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
}

function isLiked(track) { return state.liked.some(item => item.url && item.url === track.url); }
function persistLocalState() { localStorage.setItem('jay_liked_tracks', JSON.stringify(state.liked)); localStorage.setItem('jay_radio_playlists', JSON.stringify(state.playlists)); }

function trackRow(track, index, queue = state.currentTracks) {
  const current = state.currentTrack && state.currentTrack === track;
  const liked = isLiked(track);
  const thumb = imageFor(track);
  const row = document.createElement('div');
  row.className = `track-row ${current && state.isPlaying ? 'playing' : ''}`;
  row.innerHTML = `<span class="track-index">${current && state.isPlaying ? '<i class="fa-solid fa-volume-high"></i>' : index + 1}</span><span class="track-thumb"><img src="${esc(thumb)}" alt=""></span><span class="track-info"><strong class="track-title">${esc(track.title)}</strong><span class="track-artist">${esc(track.user)}</span></span><span class="track-duration">${esc(formatDuration(track.duration))}</span><span class="track-actions"><button class="icon-button" data-like title="${liked ? 'Remove from liked songs' : 'Save to liked songs'}"><i class="${liked ? 'fa-solid' : 'fa-regular'} fa-heart"></i></button><button class="icon-button" data-more title="More"><i class="fa-solid fa-ellipsis"></i></button><span class="track-menu hidden"><button data-action="like"><i class="fa-solid fa-heart"></i> ${liked ? 'Remove from Liked' : 'Save to Liked'}</button><button data-action="playlist"><i class="fa-solid fa-plus"></i> Add to playlist</button><button data-action="copy"><i class="fa-solid fa-link"></i> Copy track link</button></span></span>`;
  row.addEventListener('click', () => playTrack(track, index, queue));
  $('[data-like]', row).addEventListener('click', event => { event.stopPropagation(); toggleLike(track); });
  $('[data-more]', row).addEventListener('click', event => { event.stopPropagation(); $$('.track-menu').forEach(menu => menu.classList.add('hidden')); $('.track-menu', row).classList.toggle('hidden'); });
  $('[data-action="like"]', row).addEventListener('click', event => { event.stopPropagation(); toggleLike(track); $('.track-menu', row).classList.add('hidden'); });
  $('[data-action="playlist"]', row).addEventListener('click', event => { event.stopPropagation(); addToPlaylist(track); $('.track-menu', row).classList.add('hidden'); });
  $('[data-action="copy"]', row).addEventListener('click', async event => { event.stopPropagation(); if (track.url && navigator.clipboard) await navigator.clipboard.writeText(track.url); $('.track-menu', row).classList.add('hidden'); showToast(track.url ? 'Track link copied' : 'Link unavailable until this track is resolved'); });
  return row;
}

function renderTrackList(target, tracks, queue = tracks, emptyText = 'No songs yet.') {
  const container = typeof target === 'string' ? $(target) : target;
  if (!container) return;
  container.innerHTML = '';
  if (!tracks || !tracks.length) { container.innerHTML = `<div class="search-empty"><i class="fa-solid fa-music"></i>${esc(emptyText)}</div>`; return; }
  tracks.forEach((track, index) => container.appendChild(trackRow(track, index, queue)));
}

function cardMarkup(track, index, queue) {
  return `<article class="music-card" data-card-index="${index}"><div class="art-wrap"><img src="${esc(imageFor(track))}" alt="${esc(track.title)}"><span class="card-play"><i class="fa-solid fa-play"></i></span></div><div class="card-title">${esc(track.title)}</div><div class="card-subtitle">${esc(track.user)}</div></article>`;
}

function renderCards(target, tracks) {
  const container = typeof target === 'string' ? $(target) : target;
  if (!container) return;
  container.innerHTML = tracks.map((track, index) => cardMarkup(track, index, tracks)).join('');
  $$('.music-card', container).forEach((card, index) => card.addEventListener('click', () => playTrack(tracks[index], index, tracks)));
}

function stationCard(station) {
  return `<article class="radio-card" data-station="${station.id}"><div class="radio-art" style="background-image:linear-gradient(135deg,rgba(0,0,0,.04),rgba(0,0,0,.44)),url('${station.image}') ;background-size:cover;background-position:center"><span class="radio-art-mark">${esc(station.initial)}<small style="display:block;margin-top:9px;font-family:DM Sans;font-size:10px;letter-spacing:.05em">${esc(station.artist)}</small></span></div><div class="card-title">${esc(station.title)}</div><div class="card-subtitle">${esc(station.description)}</div></article>`;
}

function renderStations(target, list = stations) {
  const container = typeof target === 'string' ? $(target) : target;
  if (!container) return;
  container.innerHTML = list.map(stationCard).join('');
  $$('.radio-card', container).forEach(card => card.addEventListener('click', () => { window.location.href = `/radio.html?station=${encodeURIComponent(card.dataset.station)}`; }));
}

function homeTemplate() {
  return `<section class="home-hero"><div class="hero-copy"><p class="section-kicker">Your daily soundtrack</p><h1>Good music<br>looks <em>better</em> in orange.</h1><p>Hand-picked OPM stations, familiar favorites, and fresh discoveries in one warm listening room.</p><div class="hero-actions"><a class="primary-button" href="/radio.html?station=orange-lemons"><i class="fa-solid fa-play"></i> Start a radio</a><a class="secondary-button" href="/search.html"><i class="fa-solid fa-magnifying-glass"></i> Find a song</a></div></div><div class="hero-stack"><div class="cover-art one"><img src="${assetImages.heroA}" alt="Live music"></div><div class="cover-art two"><img src="${assetImages.heroB}" alt="Concert lights"></div><div class="cover-art three"><img src="${assetImages.heroC}" alt="Stage lights"></div><span class="cover-label">OPM ALL DAY</span></div></section><div class="chip-row" style="margin-top:22px"><button class="filter-chip active">All</button><button class="filter-chip">Music</button><button class="filter-chip">Radio</button><button class="filter-chip">Mood</button><button class="filter-chip">Throwbacks</button></div><section class="page-section"><div class="section-heading"><div><p class="section-kicker">Curated for you</p><h2 class="section-title">Recommended stations</h2></div><a class="section-link" href="/radio.html">See all</a></div><div id="home-stations" class="horizontal-list"></div></section><section class="page-section"><div class="section-heading"><div><p class="section-kicker">A fresh queue</p><h2 class="section-title">Picked for you</h2></div><a class="section-link" href="/search.html?q=OPM">Explore more</a></div><div class="horizontal-list"><article class="pick-card"><div class="pick-art"><img src="${assetImages.pick}" alt="Playlist cover"></div><div class="pick-copy"><span class="pick-type">Playlist</span><h3>Orange Hour: OPM</h3><p>Hale, Silent Sanctuary, Moonstar88 and the songs that stay with you.</p><div class="pick-actions"><button class="add-round" onclick="savePlaylistStarter()"><i class="fa-solid fa-plus"></i></button><button class="play-round" onclick="playEditorial()"><i class="fa-solid fa-play"></i></button></div></div></article></div></section><section class="page-section"><div class="section-heading"><div><p class="section-kicker">For the next replay</p><h2 class="section-title">Trending OPM songs</h2></div><a class="section-link" href="/search.html">Show all</a></div><div id="home-tracks" class="horizontal-list"></div></section><section class="page-section"><div class="section-heading"><div><p class="section-kicker">Your library, your way</p><h2 class="section-title">Quick links</h2></div></div><div class="horizontal-list"><article class="pick-card"><div class="pick-art" style="background:linear-gradient(135deg,#ff8a3d,#66230f);display:grid;place-items:center;color:#fff;font-size:40px"><i class="fa-solid fa-heart"></i></div><div class="pick-copy"><span class="pick-type">Your library</span><h3>Liked Songs</h3><p>Keep the tracks you do not want to lose in one place.</p><div class="pick-actions"><a class="secondary-button" href="/playlist.html?view=liked">Open library</a></div></div></article></div></section>`;
}

async function renderHome() {
  layout(homeTemplate());
  renderStations('#home-stations', stations);
  renderCards('#home-tracks', editorialTracks);
}

function searchTemplate() {
  return `<section><p class="section-kicker">Find your next favorite</p><h1 class="section-title" style="font-size:clamp(34px,6vw,65px);margin-bottom:22px">Search the sound.</h1><form class="search-wrap" id="search-form"><i class="fa-solid fa-magnifying-glass"></i><input id="search-input" type="search" autocomplete="off" placeholder="What do you want to play?" value="${esc(new URLSearchParams(location.search).get('q') || '')}"><button class="icon-button search-clear" type="button" onclick="clearSearch()"><i class="fa-solid fa-xmark"></i></button></form><div class="chip-row" style="margin-bottom:35px"><button class="filter-chip" data-query="OPM alternative">OPM alternative</button><button class="filter-chip" data-query="Filipino rock">Filipino rock</button><button class="filter-chip" data-query="love songs">Love songs</button><button class="filter-chip" data-query="2000s OPM">2000s OPM</button><button class="filter-chip" data-query="late night">Late night</button></div><div id="search-results"></div></section>`;
}

async function renderSearch() {
  layout(searchTemplate());
  $('#search-form').addEventListener('submit', event => { event.preventDefault(); runSearch($('#search-input').value.trim()); });
  $$('[data-query]').forEach(button => button.addEventListener('click', () => { $('#search-input').value = button.dataset.query; runSearch(button.dataset.query); }));
  const query = new URLSearchParams(location.search).get('q');
  if (query) runSearch(query); else $('#search-results').innerHTML = `<div class="search-empty"><i class="fa-solid fa-headphones"></i>Search for an artist, song, or genre to start a queue.</div>`;
}

async function runSearch(query) {
  const target = $('#search-results');
  if (!query) { target.innerHTML = `<div class="search-empty"><i class="fa-solid fa-headphones"></i>Type something to search the music catalog.</div>`; return; }
  target.innerHTML = `<div class="search-empty"><i class="fa-solid fa-circle-notch fa-spin"></i>Searching for “${esc(query)}”…</div>`;
  try {
    const response = await fetch(`/api/search/soundcloud?q=${encodeURIComponent(query)}&limit=20`);
    const data = await response.json();
    const results = data.success && Array.isArray(data.result) ? data.result.map(normaliseTrack) : [];
    target.innerHTML = `<div class="section-heading"><div><p class="section-kicker">SoundCloud search</p><h2 class="section-title">Results for “${esc(query)}”</h2></div><span class="muted" style="font-size:12px">${results.length} tracks</span></div><div id="search-track-list" class="track-list"></div>`;
    renderTrackList('#search-track-list', results, results, 'No tracks matched this search.');
  } catch (error) { target.innerHTML = `<div class="search-empty"><i class="fa-solid fa-triangle-exclamation"></i>Search is temporarily unavailable. Please try again.</div>`; }
}

function clearSearch() { $('#search-input').value = ''; $('#search-results').innerHTML = `<div class="search-empty"><i class="fa-solid fa-headphones"></i>Search for an artist, song, or genre to start a queue.</div>`; history.replaceState({}, '', '/search.html'); }

function radioTemplate(station) {
  return `<section><a class="ghost-button" href="/home.html"><i class="fa-solid fa-arrow-left"></i> Back to Home</a><div class="radio-hero" style="margin-top:18px"><div class="radio-hero-art"><img src="${esc(station.image)}" alt="${esc(station.title)}"></div><div class="radio-hero-copy"><p class="section-kicker">${esc(station.mood)}</p><h1>${esc(station.title)}</h1><p>${esc(station.description)}</p><div class="meta-line"><span><i class="fa-solid fa-tower-broadcast"></i> Artist Radio</span><span><i class="fa-solid fa-music"></i> ${station.tracks.length} hand-picked songs</span><span><i class="fa-solid fa-wand-magic-sparkles"></i> Curated by Jay Sound Cloud</span></div><div class="hero-actions" style="margin-top:23px"><button class="primary-button" id="radio-play-all"><i class="fa-solid fa-play"></i> Play all</button><button class="secondary-button" id="radio-shuffle"><i class="fa-solid fa-shuffle"></i> Shuffle</button></div></div></div><section class="page-section"><div class="section-heading"><div><p class="section-kicker">Continuous listening</p><h2 class="section-title">Songs in this radio</h2></div><span class="muted" style="font-size:12px">${station.tracks.length} tracks</span></div><div id="radio-track-list" class="track-list"></div></section></section>`;
}

async function renderRadio() {
  const stationId = new URLSearchParams(location.search).get('station') || 'orange-lemons';
  const station = stations.find(item => item.id === stationId) || stations[0];
  layout(radioTemplate(station));
  renderTrackList('#radio-track-list', station.tracks, station.tracks);
  $('#radio-play-all').addEventListener('click', () => startQueue(station.tracks, false));
  $('#radio-shuffle').addEventListener('click', () => startQueue(station.tracks, true));
}

function premiumTemplate() {
  return `<section><div class="premium-hero"><p class="section-kicker" style="color:#2c1007">JaySoundCloud Premium</p><h1>More music.<br>Less waiting.</h1><p>Free accounts can play 10 songs every day. Premium removes the daily cap, keeps every radio moving, and unlocks the full library experience.</p><button class="primary-button" onclick="document.querySelector('#promo-code')?.focus()"><i class="fa-solid fa-crown"></i> Activate your promo</button></div><section class="page-section"><div class="pick-card" style="border-color:rgba(255,138,61,.4)"><div class="pick-art" style="background:linear-gradient(135deg,#ff8a3d,#31110a);display:grid;place-items:center;color:#fff;font-size:54px"><i class="fa-solid fa-ticket"></i></div><div class="pick-copy"><span class="pick-type">Limited promo</span><h3>7 days of unlimited OPM</h3><p>Sign in, enter your promo code, and your account gets unlimited playback for seven days. The entitlement is verified on the server.</p><form id="promo-form" class="hero-actions" style="margin-top:15px"><input id="promo-code" aria-label="Premium promo code" placeholder="Enter promo code" style="min-width:200px;padding:11px 14px;color:#fff;background:#130e0d;border:1px solid #6b4234;border-radius:999px;outline:0"><button class="primary-button" type="submit"><i class="fa-solid fa-bolt"></i> Redeem promo</button></form><div id="promo-status" class="small-copy" style="margin-top:10px">Free plan: 10 songs per day until a Premium entitlement is active.</div></div></div></section><section class="page-section"><div class="section-heading"><div><p class="section-kicker">Simple plans</p><h2 class="section-title">Pick your listening level</h2></div></div><div class="pricing-grid"><article class="price-card"><h3>Starter</h3><div class="price">₱9 <small>/ month</small></div><p>For casual listeners</p><ul class="feature-list"><li><i class="fa-solid fa-check"></i> Unlimited music streaming</li><li><i class="fa-solid fa-check"></i> Curated radio stations</li><li><i class="fa-solid fa-check"></i> Mobile-friendly player</li></ul><button class="secondary-button" onclick="openUpgrade('Starter')">Choose Starter</button></article><article class="price-card featured"><p class="section-kicker" style="margin-bottom:12px">Most popular</p><h3>Popular</h3><div class="price">₱29 <small>/ month</small></div><p>For people who save everything</p><ul class="feature-list"><li><i class="fa-solid fa-check"></i> Everything in Starter</li><li><i class="fa-solid fa-check"></i> Liked Songs and playlists</li><li><i class="fa-solid fa-check"></i> Unlimited listening</li></ul><button class="primary-button" onclick="openUpgrade('Popular')">Choose Popular</button></article><article class="price-card"><h3>Premium</h3><div class="price">₱49 <small>/ month</small></div><p>For your full music setup</p><ul class="feature-list"><li><i class="fa-solid fa-check"></i> Everything in Popular</li><li><i class="fa-solid fa-check"></i> Direct MP3 downloads</li><li><i class="fa-solid fa-check"></i> Priority access to new features</li></ul><button class="secondary-button" onclick="openUpgrade('Premium')">Choose Premium</button></article></div></section><section class="page-section"><div class="pick-card"><div class="pick-art" style="background:linear-gradient(135deg,#ff8a3d,#31110a);display:grid;place-items:center;color:#fff;font-size:54px"><i class="fa-solid fa-wand-magic-sparkles"></i></div><div class="pick-copy"><span class="pick-type">Built for the way you listen</span><h3>Your OPM, uninterrupted.</h3><p>Keep your radio queues moving and your personal library close with plans that stay simple.</p></div></div></section></section>`;
}

async function redeemPromo(event) { event.preventDefault(); if (!ensureAccount()) return; const code = $('#promo-code')?.value.trim(); if (!code) { showToast('Enter the promo code first.'); return; } const status = $('#promo-status'); if (status) status.textContent = 'Activating your Premium entitlement…'; try { const response = await fetch('/api/account/redeem-promo', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${state.accessToken}`, 'X-Device-Id': state.deviceId }, body: JSON.stringify({ code }) }); const data = await response.json(); if (!response.ok || !data.success) { if (status) status.textContent = data.error || 'The promo could not be activated.'; showToast(data.error || 'The promo could not be activated.'); return; } state.accountStatus = { ...(state.accountStatus || {}), premium: true, tier: data.tier, premium_until: data.premium_until, daily_limit: 10, play_count: 0 }; updateQuotaUi(); if (status) status.textContent = `Premium is active until ${new Date(data.premium_until).toLocaleDateString()}. Unlimited playback is enabled.`; showToast('Premium promo activated'); } catch (_) { if (status) status.textContent = 'Promo activation is temporarily unavailable.'; showToast('Promo activation is temporarily unavailable.'); } }

function renderPremium() { layout(premiumTemplate()); $('#promo-form')?.addEventListener('submit', redeemPromo); }

function playlistTemplate() {
  return `<section><div class="library-head"><div class="library-art"><i class="fa-solid fa-heart"></i></div><div class="library-copy"><p class="section-kicker">Your library</p><h1>Playlists</h1><p>Save the songs that belong in your day.</p></div></div><section class="page-section"><div class="section-heading"><div><p class="section-kicker">Saved music</p><h2 class="section-title">Liked Songs</h2></div><button class="primary-button" onclick="createPlaylist()"><i class="fa-solid fa-plus"></i> New playlist</button></div><div id="liked-list" class="track-list"></div></section><section class="page-section"><div class="section-heading"><div><p class="section-kicker">Made by you</p><h2 class="section-title">Your playlists</h2></div></div><div id="playlist-list" class="horizontal-list"></div></section></section>`;
}

function renderPlaylist() {
  layout(playlistTemplate());
  renderTrackList('#liked-list', state.liked, state.liked, 'Your liked songs will show up here.');
  const names = Object.keys(state.playlists);
  const list = $('#playlist-list');
  if (!names.length) list.innerHTML = `<div class="search-empty" style="padding:30px 0;text-align:left">Create a playlist from any track’s three-dot menu.</div>`;
  else {
    list.innerHTML = names.map(name => `<article class="music-card" data-playlist="${esc(name)}"><div class="art-wrap" style="display:grid;place-items:center;background:linear-gradient(135deg,#ff8a3d,#6d2111);color:#fff;font-size:34px"><i class="fa-solid fa-music"></i></div><div class="card-title">${esc(name)}</div><div class="card-subtitle">${state.playlists[name].length} songs</div></article>`).join('');
    $$('.music-card', list).forEach(card => card.addEventListener('click', () => { state.currentTracks = state.playlists[card.dataset.playlist]; renderTrackList('#liked-list', state.currentTracks, state.currentTracks); showToast(`Opened ${card.dataset.playlist}`); }));
  }
}

function createPlaylist() { if (!ensureAccount()) return; const name = prompt('Name your playlist:', 'My OPM Mix'); if (!name || !name.trim()) return; state.playlists[name.trim()] = []; persistLocalState(); renderPlaylist(); showToast(`Created ${name.trim()}`); }
function addToPlaylist(track) { if (!ensureAccount()) return; const name = prompt('Add to playlist:', 'Orange Hour'); if (!name || !name.trim()) return; const playlist = name.trim(); state.playlists[playlist] = state.playlists[playlist] || []; if (!state.playlists[playlist].some(item => item.url === track.url)) state.playlists[playlist].push(track); persistLocalState(); showToast(`Added to ${playlist}`); }
function savePlaylistStarter() { if (!ensureAccount()) return; const name = 'Orange Hour: OPM'; state.playlists[name] = [...editorialTracks]; persistLocalState(); showToast('Playlist saved to your library'); }
function openUpgrade(plan = 'Popular') { if (!state.user) { openLogin('signup'); showToast('Create an account to activate Premium.'); return; } $('#promo-code')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); $('#promo-code')?.focus(); showToast(`${plan} plan selected. Enter your promo code to activate Premium.`); }

async function resolveTrack(track) {
  if (track.url && !track.invalid) return track;
  const key = `${track.title}|${track.user}`;
  if (state.resolving.has(key)) return state.resolving.get(key);
  const promise = fetch(`/api/search/soundcloud?q=${encodeURIComponent(`${track.title} ${track.user}`)}&limit=8`).then(response => response.json()).then(data => {
    const candidates = data.success && Array.isArray(data.result) ? data.result.map(normaliseTrack).filter(item => item.url) : [];
    const title = track.title.toLowerCase(); const artist = track.user.toLowerCase();
    const match = candidates.find(item => item.title.toLowerCase().includes(title.split(' - ')[0]) && item.user.toLowerCase().includes(artist)) || candidates[0];
    if (match) Object.assign(track, match, { title: track.title, user: track.user, invalid: false, _candidates: candidates });
    return track;
  }).catch(() => track);
  state.resolving.set(key, promise); return promise;
}

async function playTrack(track, index = 0, queue = state.currentTracks) {
  if (!ensureAccount()) return;
  const playable = await resolveTrack(track);
  if (!playable.url) { showToast(`Could not find a playable result for “${track.title}”`); return; }
  state.currentTracks = queue;
  state.currentIndex = queue.indexOf(track) >= 0 ? queue.indexOf(track) : index;
  state.currentTrack = track;
  state.isPlaying = false;
  updatePlayer();
  try {
    const candidates = [playable, ...(playable._candidates || [])].filter((item, position, list) => item?.url && list.findIndex(candidate => candidate.url === item.url) === position);
    let stream = null;
    const playSessionId = window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    for (const candidate of candidates) {
      const response = await fetch('/api/downloader/soundcloud-v2', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.accessToken}`, 'X-Device-Id': state.deviceId, 'X-Play-Session-Id': playSessionId, 'X-Play-Track-Key': track.id || `${track.title}|${track.user}` }, body: JSON.stringify({ url: candidate.url }) });
      const data = await response.json();
      if (response.status === 401 || data.code === 'AUTH_REQUIRED') { state.user = null; state.accessToken = ''; updateAuthUi(); openLogin('signup'); return; }
      if (response.status === 429 || data.code === 'DAILY_LIMIT_REACHED') { state.accountStatus = data.quota || state.accountStatus; updateQuotaUi(); showToast(data.error || 'Your daily song limit has been reached.'); return; }
      if (data.success && data.result?.url) { Object.assign(track, candidate, { invalid: false }); state.accountStatus = data.quota || state.accountStatus; updateQuotaUi(); stream = data.result.url; break; }
    }
    if (!stream) { track.invalid = true; track.url = ''; state.resolving.delete(`${track.title}|${track.user}`); showToast('This track is unavailable from the stream provider. Try another song.'); return; }
    state.audio.src = stream;
    state.audio.volume = Number($('#volume')?.value || 1);
    await state.audio.play();
    state.isPlaying = true;
    updatePlayer();
  } catch (error) { state.isPlaying = false; updatePlayer(); showToast('The stream could not be started right now.'); }
}

async function startQueue(queue, shuffle = false) {
  const nextQueue = [...queue];
  if (shuffle) for (let i = nextQueue.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [nextQueue[i], nextQueue[j]] = [nextQueue[j], nextQueue[i]]; }
  state.currentTracks = nextQueue;
  showToast(shuffle ? 'Shuffled radio queue ready' : 'Radio queue ready');
  await playTrack(nextQueue[0], 0, nextQueue);
}
function playEditorial() { startQueue(editorialTracks, false); }
function togglePlayback() { if (!ensureAccount()) return; if (!state.currentTrack) { playEditorial(); return; } if (state.isPlaying) { state.audio.pause(); state.isPlaying = false; } else { state.audio.play(); state.isPlaying = true; } updatePlayer(); }
function nextTrack() { if (!state.currentTracks.length) return; const next = (state.currentIndex + 1) % state.currentTracks.length; playTrack(state.currentTracks[next], next, state.currentTracks); }
function previousTrack() { if (!state.currentTracks.length) return; const previous = (state.currentIndex - 1 + state.currentTracks.length) % state.currentTracks.length; playTrack(state.currentTracks[previous], previous, state.currentTracks); }
function seekAudio(event) { if (!state.audio?.duration) return; const rect = event.currentTarget.getBoundingClientRect(); state.audio.currentTime = ((event.clientX - rect.left) / rect.width) * state.audio.duration; }
function setVolume(value) { if (state.audio) state.audio.volume = value; }
function updateProgress() { const fill = $('#progress-fill'); if (fill && state.audio?.duration) fill.style.width = `${(state.audio.currentTime / state.audio.duration) * 100}%`; }
function updatePlayer() { const title = $('#player-title'); const artist = $('#player-artist'); const cover = $('#player-cover'); const play = $('#player-play'); const like = $('#player-like'); if (!title) return; title.textContent = state.currentTrack?.title || 'Choose a song to start listening'; artist.textContent = state.currentTrack?.user || 'JaySoundCloud'; cover.src = imageFor(state.currentTrack, assetImages.heroA); play.innerHTML = `<i class="fa-solid fa-${state.isPlaying ? 'pause' : 'play'}"></i>`; like.innerHTML = `<i class="${state.currentTrack && isLiked(state.currentTrack) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>`; }
function toggleCurrentLike() { if (state.currentTrack) toggleLike(state.currentTrack); }
function toggleLike(track) { if (!ensureAccount()) return; if (!track.url) { showToast('Play the song once before saving it.'); return; } const index = state.liked.findIndex(item => item.url === track.url); if (index >= 0) { state.liked.splice(index, 1); showToast('Removed from Liked Songs'); } else { state.liked.unshift(track); showToast('Added to Liked Songs'); } persistLocalState(); updatePlayer(); if (state.page === 'playlist') renderPlaylist(); }
function openQueue() { showToast(`${state.currentTracks.length || 0} songs in the current queue`); }
function ensureAccount() { if (state.user && state.accessToken) return true; showToast('Create an account or sign in before listening.'); openLogin('signup'); return false; }
function updateAuthModal() { const signup = state.authMode === 'signup'; const title = $('#auth-title'); const copy = $('#auth-copy'); const submit = $('#auth-submit'); const switchButton = $('#auth-switch'); if (!title) return; title.textContent = signup ? 'Create your account' : 'Welcome back'; copy.textContent = signup ? 'Sign up to start listening. Free accounts get 10 songs per day, while the Premium promo unlocks unlimited playback for 7 days.' : 'Sign in to sync your likes, playlists, daily allowance, and Premium entitlement.'; submit.textContent = signup ? 'Create account' : 'Sign in'; switchButton.textContent = signup ? 'I already have an account' : 'Create account'; }
function updateAuthUi() { const label = $('#user-label'); const badge = $('#quota-badge'); if (label) label.textContent = state.user?.email?.split('@')[0] || 'Guest'; if (badge) { if (!state.user) badge.textContent = 'Sign in to listen'; else if (state.accountStatus?.premium) badge.textContent = 'Premium · unlimited'; else { const limit = state.accountStatus?.daily_limit || 10; const count = state.accountStatus?.play_count || 0; badge.textContent = `${Math.max(0, limit - count)} of ${limit} songs left`; } } }
function updateQuotaUi() { updateAuthUi(); }
function openLogin(mode = state.user ? 'signin' : 'signup') { state.authMode = mode; updateAuthModal(); $('#login-modal')?.classList.add('open'); setTimeout(() => $('#login-email')?.focus(), 40); }
function toggleAuthMode() { state.authMode = state.authMode === 'signup' ? 'signin' : 'signup'; updateAuthModal(); }
function closeLogin() { $('#login-modal')?.classList.remove('open'); }

async function loadAccountStatus() { if (!state.user || !state.accessToken) return; try { const response = await fetch('/api/account/status', { headers: { Authorization: `Bearer ${state.accessToken}`, 'X-Device-Id': state.deviceId } }); const data = await response.json(); if (data.success) state.accountStatus = data; updateQuotaUi(); } catch (_) {} }

async function bootAuth() {
  try {
    const response = await fetch('/api/config'); const config = await response.json();
    if (config.supabaseUrl && config.supabaseAnonKey && window.supabase) {
      state.supabase = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
      const applySession = async session => { state.user = session?.user || null; state.accessToken = session?.access_token || ''; state.authReady = true; updateAuthUi(); if (state.user) await loadAccountStatus(); };
      const { data } = await state.supabase.auth.getSession();
      await applySession(data.session);
      state.supabase.auth.onAuthStateChange((_event, session) => { setTimeout(() => applySession(session), 0); });
    } else { state.authReady = true; updateAuthUi(); }
  } catch (_) { state.authReady = true; updateAuthUi(); }
}

function bindLogin() {
  $('#login-form')?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!state.supabase) { showToast('Account service is not configured. Add Supabase keys to enable accounts.'); return; }
    const email = $('#login-email').value.trim(); const password = $('#login-password').value;
    const result = state.authMode === 'signup' ? await state.supabase.auth.signUp({ email, password }) : await state.supabase.auth.signInWithPassword({ email, password });
    if (result.error) { showToast(result.error.message); return; }
    if (state.authMode === 'signup' && !result.data.session) { closeLogin(); showToast('Account created. Check your email to confirm it, then sign in.'); return; }
    closeLogin(); showToast(state.authMode === 'signup' ? 'Account created. You can start listening.' : 'Welcome back');
  });
}

async function renderPage() {
  if (state.page === 'home') await renderHome();
  else if (state.page === 'search') await renderSearch();
  else if (state.page === 'premium') renderPremium();
  else if (state.page === 'playlist' || state.page === 'liked') renderPlaylist();
  else if (state.page === 'radio') await renderRadio();
  bindLogin();
  bootAuth();
}

document.addEventListener('click', event => { if (!event.target.closest('.track-actions')) $$('.track-menu').forEach(menu => menu.classList.add('hidden')); });
renderPage();
