/*!
 * Toggle Concepts — KITE ad engine (drop-in module), v2
 * <kite-engine> web component. Five styles, each its own engine with its own switches:
 *   Lifestyle · Studio · 3D object · Knit · App screen  (1,600 variations each, 8,000 in total)
 * Every style works in every language (EN/ES/FR/DE/TR) and format (9:16, 4:5, 1:1, 16:9).
 * The ad is drawn at real size (1080 or 1920 px wide) and scaled, so layouts never break on mobile.
 * Usage: <script src="kite-engine.js" defer></script> + <kite-engine media="kite-engine/media/"></kite-engine>
 * Attributes: media, init (JSON: {"style":"studio","lang":0,"format":1,"states":{"knit":{"item":1}}}),
 *             label, heading, heading2, combo, auto-text, autoplay="false"
 */
(function () {
  'use strict';
  const SCRIPT_BASE = (document.currentScript && document.currentScript.src) ? document.currentScript.src.replace(/[^/]*$/, '') : '';
  const LOGO = 'data:image/png;base64,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';
  /* ================= copy: five languages ================= */
  const LANGS = [
    { n: 'English', c: 'en', loc: 'en-IE' },
    { n: 'Español', c: 'es', loc: 'es-ES' },
    { n: 'Français', c: 'fr', loc: 'fr-FR' },
    { n: 'Deutsch', c: 'de', loc: 'de-DE' },
    { n: 'Türkçe', c: 'tr', loc: 'tr-TR' }
  ];
  const FORMATS = [
    { n: '9:16', c: '9x16', w: 1080, h: 1920 },
    { n: '4:5', c: '4x5', w: 1080, h: 1350 },
    { n: '1:1', c: '1x1', w: 1080, h: 1080 },
    { n: '16:9', c: '16x9', w: 1920, h: 1080 }
  ];
  /* index order in every table below: en, es, fr, de, tr */

  const LIFE = {
    hooks: [
      { n: 'Get paid', l: [['Get paid', 'for buying milk'], ['Te pagan', 'por comprar leche'], ['Soyez payé', 'pour acheter du lait'], ['Geld zurück', 'fürs Milchkaufen'], ['Süt alırken', 'para kazan']],
        sub: ['Every shop pays you 5%', 'Cada compra te paga un 5%', 'Chaque achat vous rapporte 5 %', 'Jeder Einkauf bringt dir 5 %', 'Her alışveriş %5 kazandırır'] },
      { n: 'Rival', l: [['Your card doesn’t', 'pay you on food'], ['Tu tarjeta no te paga', 'por la comida'], ['Votre carte ne vous paie', 'pas sur les courses'], ['Deine Karte zahlt dir', 'nichts fürs Essen'], ['Kartın yemekte', 'sana ödeme yapmıyor']],
        tag: ['KITE does', 'KITE sí', 'KITE, si', 'KITE schon', 'KITE yapıyor'] },
      { n: 'Benefits', l: [['KITE pays', '5% back'], ['KITE te devuelve', 'un 5%'], ['KITE vous rend', '5 %'], ['KITE zahlt', '5 % zurück'], ['KITE %5', 'geri öder']],
        list: [['Groceries', 'Transport', 'Coffee'], ['Compra', 'Transporte', 'Café'], ['Courses', 'Transports', 'Café'], ['Lebensmittel', 'Fahrten', 'Kaffee'], ['Market', 'Ulaşım', 'Kahve']] },
      { n: 'Offer', type: 1, l: [['Free card. 3 minutes', 'no fee · no minimum'], ['Tarjeta gratis. 3 minutos', 'sin cuotas · sin mínimo'], ['Carte gratuite. 3 minutes', 'sans frais · sans minimum'], ['Gratis-Karte. 3 Minuten', 'keine Gebühr · kein Minimum'], ['Ücretsiz kart. 3 dakika', 'ücret yok · alt limit yok']],
        sub: ['KITE pays 5% back', 'KITE te devuelve un 5%', 'KITE vous rend 5 %', 'KITE zahlt 5 % zurück', 'KITE %5 geri öder'] },
      { n: 'No catch', l: [['No catch.', 'Just 5% back.'], ['Sin trampa.', 'Solo un 5% de vuelta.'], ['Sans piège.', 'Juste 5 % remboursés.'], ['Kein Haken.', 'Nur 5 % zurück.'], ['Hiçbir şart yok.', 'Sadece %5 iade.']],
        sub: ['Free card · no fee · no minimum', 'Tarjeta gratis · sin cuotas · sin mínimo', 'Carte gratuite · sans frais · sans minimum', 'Gratis-Karte · keine Gebühr · kein Minimum', 'Ücretsiz kart · ücret yok · alt limit yok'] }
    ],
    cta: ['GET IT NOW', 'CONSÍGUELA YA', 'OBTENEZ-LA', 'JETZT HOLEN', 'HEMEN AL'],
    stores: [['Download on the', 'App Store'], ['GET IT ON', 'Google Play']]
  };

  const STUDIO = {
    hooks: [
      { n: 'Pedestal', l: [['We put', 'your food on a pedestal'], ['Ponemos tu comida', 'en un pedestal'], ['Vos courses', 'sur un piédestal'], ['Wir stellen dein Essen', 'aufs Podest'], ['Yemeğini', 'kaideye koyuyoruz']] },
      { n: 'Icons', l: [['Everyday buys,', 'treated like icons'], ['Compras de cada día,', 'tratadas como iconos'], ['Les achats du quotidien,', 'traités comme des icônes'], ['Alltagskäufe,', 'wie Ikonen behandelt'], ['Günlük alışverişler,', 'birer ikon gibi']] },
      { n: '5% back', l: [['5% back', 'on everything here'], ['Un 5% de vuelta', 'en todo lo que ves'], ['5 % remboursés', 'sur tout ce que vous voyez'], ['5 % zurück', 'auf alles hier'], ['Burada her şeye', '%5 iade']] },
      { n: 'Returns', l: [['Small purchases.', 'Real returns.'], ['Compras pequeñas.', 'Retornos reales.'], ['Petits achats.', 'Vrais retours.'], ['Kleine Einkäufe.', 'Echte Rendite.'], ['Küçük alışverişler.', 'Gerçek kazanç.']] },
      { n: 'Pays back', l: [['The best things', 'pay you back'], ['Lo mejor', 'te devuelve dinero'], ['Le meilleur', 'vous rembourse'], ['Das Beste', 'zahlt sich aus'], ['En iyi şeyler', 'sana geri öder']] }
    ],
    ctas: [
      { n: 'Free card', l: ['ORDER A FREE CARD', 'PIDE TU TARJETA GRATIS', 'COMMANDEZ VOTRE CARTE', 'GRATIS-KARTE BESTELLEN', 'ÜCRETSİZ KART İSTE'] },
      { n: 'Get 5%', l: ['GET 5% BACK', 'CONSIGUE UN 5%', 'OBTENEZ 5 %', '5 % ZURÜCKHOLEN', '%5 İADE AL'] },
      { n: '3 minutes', l: ['JOIN IN 3 MINUTES', 'ÚNETE EN 3 MINUTOS', 'INSCRIPTION EN 3 MIN', 'IN 3 MINUTEN DABEI', '3 DAKİKADA KATIL'] },
      { n: 'How it works', l: ['SEE HOW IT WORKS', 'MIRA CÓMO FUNCIONA', 'VOIR COMMENT ÇA MARCHE', 'SO FUNKTIONIERT’S', 'NASIL ÇALIŞIR?'] }
    ]
  };

  /* 3D object: noun phrase + singular/plural verb forms per hook */
  const OBJ = {
    objects: [
      { n: 'Milk', c: 'milk', pl: 0, np: ['This milk', 'Esta leche', 'Ce lait', 'Diese Milch', 'Bu süt'], lo: ['this milk', 'esta leche', 'ce lait', 'diese Milch'], tr3: 'Bu sütte' },
      { n: 'Eggs', c: 'eggs', pl: 1, np: ['These eggs', 'Estos huevos', 'Ces œufs', 'Diese Eier', 'Bu yumurtalar'], lo: ['these eggs', 'estos huevos', 'ces œufs', 'diese Eier'], tr3: 'Bu yumurtalarda' },
      { n: 'Bread', c: 'bread', pl: 0, np: ['This bread', 'Este pan', 'Ce pain', 'Dieses Brot', 'Bu ekmek'], lo: ['this bread', 'este pan', 'ce pain', 'dieses Brot'], tr3: 'Bu ekmekte' },
      { n: 'Can', c: 'can', pl: 0, np: ['This can', 'Esta lata', 'Cette canette', 'Diese Dose', 'Bu kutu'], lo: ['this can', 'esta lata', 'cette canette', 'diese Dose'], tr3: 'Bu kutuda' }
    ],
    hooks: [
      { n: 'Pays 5%', v: [['pays you 5%', 'pay you 5%'], ['te paga un 5%', 'te pagan un 5%'], ['vous rapporte 5 %', 'vous rapportent 5 %'], ['zahlt dir 5 %', 'zahlen dir 5 %'], ['sana %5 kazandırır', 'sana %5 kazandırır']] },
      { n: 'Pays back', v: [['pays you back', 'pay you back'], ['te devuelve dinero', 'te devuelven dinero'], ['vous rembourse', 'vous remboursent'], ['zahlt sich aus', 'zahlen sich aus'], ['sana geri öder', 'sana geri öder']] },
      { n: '5% on it', pre: ['5% back', 'Un 5% de vuelta', '5 % remboursés', '5 % zurück'], prep: ['on', 'en', 'sur', 'auf'] },
      { n: 'Cashback', v: [['earns you cashback', 'earn you cashback'], ['te da cashback', 'te dan cashback'], ['vous donne du cashback', 'vous donnent du cashback'], ['bringt dir Cashback', 'bringen dir Cashback'], ['sana nakit iade kazandırır', 'sana nakit iade kazandırır']] },
      { n: '5% less', v: [['costs you 5% less', 'cost you 5% less'], ['te cuesta un 5% menos', 'te cuestan un 5% menos'], ['vous coûte 5 % de moins', 'vous coûtent 5 % de moins'], ['kostet dich 5 % weniger', 'kosten dich 5 % weniger'], ['sana %5 daha ucuz', 'sana %5 daha ucuz']] }
    ],
    cta: ['SEE WHAT ELSE DOES', 'MIRA QUÉ MÁS PAGA', 'VOYEZ CE QUI PAIE AUSSI', 'SIEH, WAS NOCH ZAHLT', 'BAŞKA NELER ÖDÜYOR?']
  };
  function objLines(o, h, li) {
    const H = OBJ.hooks[h];
    if (H.pre) {
      if (li === 4) return [o.tr3, '%5 iade'];
      return [H.pre[li], H.prep[li] + ' ' + o.lo[li]];
    }
    return [o.np[li], H.v[li][o.pl]];
  }

  const KNIT = {
    items: [
      { n: 'Cup', c: 'cup', frames: 7, v: { '16x9': ['w', 1] }, every: [['Every cup', 'counts'], ['Cada café', 'cuenta'], ['Chaque café', 'compte'], ['Jeder Kaffee', 'zählt'], ['Her kahve', 'sayılır']] },
      { n: 'Tram', c: 'tram', frames: 6, v: { '16x9': ['w', 1, 5], '9x16': ['t', 1], '4x5': ['t', 1], '1x1': ['t', 1] }, every: [['Every ride', 'counts'], ['Cada viaje', 'cuenta'], ['Chaque trajet', 'compte'], ['Jede Fahrt', 'zählt'], ['Her yolculuk', 'sayılır']] },
      { n: 'Basket', c: 'basket', frames: 6, v: { '16x9': ['w', 1, 5] }, every: [['Every basket', 'counts'], ['Cada compra', 'cuenta'], ['Chaque panier', 'compte'], ['Jeder Einkauf', 'zählt'], ['Her sepet', 'sayılır']] },
      { n: 'Milk', c: 'milk', frames: 5, v: { '16x9': ['w', 1] }, every: [['Every carton', 'counts'], ['Cada cartón', 'cuenta'], ['Chaque brique', 'compte'], ['Jede Packung', 'zählt'], ['Her kutu', 'sayılır']] }
    ],
    hooks: [
      { n: 'Every one', every: 1 },
      { n: 'Adds up', l: [['Small buys', 'add up'], ['Las compras pequeñas', 'suman'], ['Les petits achats', 's’additionnent'], ['Kleine Käufe', 'summieren sich'], ['Küçük alışverişler', 'birikir']] },
      { n: 'Stitched', l: [['Stitched with', '5% back'], ['Tejido con', 'un 5% de vuelta'], ['Cousu avec', '5 % remboursés'], ['Gestickt mit', '5 % zurück'], ['%5 iadeyle', 'işlendi']] },
      { n: 'Get some back', l: [['Spend a little.', 'Get some back.'], ['Gasta un poco.', 'Recupera algo.'], ['Dépensez un peu.', 'Récupérez-en.'], ['Gib wenig aus.', 'Hol dir was zurück.'], ['Biraz harca.', 'Biraz geri al.']] },
      { n: 'Pays back', l: [['Made to', 'pay you back'], ['Hecho para', 'devolverte dinero'], ['Fait pour', 'vous rembourser'], ['Gemacht, um', 'dir was zurückzuzahlen'], ['Sana geri', 'ödemek için']] }
    ],
    cta: ['COUNT YOURS', 'CUENTA LOS TUYOS', 'COMPTEZ LES VÔTRES', 'ZÄHL DEINE', 'SEN DE SAY']
  };

  const APP = {
    hooks: [
      { n: 'Owes you', l: [['See what your shopping', 'owes you'], ['Mira lo que tus compras', 'te deben'], ['Voyez ce que vos achats', 'vous doivent'], ['Sieh, was dir dein Einkauf', 'schuldet'], ['Alışverişinin sana', 'ne borçlu olduğunu gör']] },
      { n: 'Paid back', l: [['Your groceries', 'paid you back'], ['Tu compra', 'te devolvió dinero'], ['Vos courses', 'vous ont remboursé'], ['Dein Einkauf', 'hat sich ausgezahlt'], ['Market alışverişin', 'sana geri ödedi']] },
      { n: 'Earned today', l: [['Check what', 'you earned today'], ['Mira lo que', 'ganaste hoy'], ['Voyez ce que', 'vous avez gagné'], ['Schau, was du', 'heute verdient hast'], ['Bugün ne kazandığına', 'bir bak']] },
      { n: 'Every purchase', l: [['Every purchase', 'pays you'], ['Cada compra', 'te paga'], ['Chaque achat', 'vous rapporte'], ['Jeder Einkauf', 'zahlt dir was'], ['Her alışveriş', 'sana kazandırır']] },
      { n: 'Count the 5%', l: [['Open the app.', 'Count the 5%.'], ['Abre la app.', 'Cuenta el 5%.'], ['Ouvrez l’app.', 'Comptez les 5 %.'], ['Öffne die App.', 'Zähl die 5 %.'], ['Uygulamayı aç.', '%5’i say.']] }
    ],
    cta: [['OPEN THE APP', 'SEE YOUR TOTAL'], ['ABRE LA APP', 'MIRA TU TOTAL'], ['OUVREZ L’APP', 'VOYEZ VOTRE TOTAL'], ['APP ÖFFNEN', 'SUMME ANSEHEN'], ['UYGULAMAYI AÇ', 'TOPLAMINI GÖR']],
    back: ['back this month', 'devuelto este mes', 'remboursés ce mois-ci', 'diesen Monat zurück', 'bu ay iade'],
    button: ['See what’s covered', 'Mira qué incluye', 'Voir ce qui compte', 'Was alles zählt', 'Neler dahil gör'],
    rows: {
      supermarket: ['Supermarket', 'Supermercado', 'Supermarché', 'Supermarkt', 'Süpermarket'],
      tram: ['Tram', 'Tranvía', 'Tram', 'Tram', 'Tramvay'],
      coffee: ['Coffee', 'Café', 'Café', 'Kaffee', 'Kahve'],
      bakery: ['Bakery', 'Panadería', 'Boulangerie', 'Bäckerei', 'Fırın'],
      market: ['Market', 'Mercado', 'Marché', 'Markt', 'Pazar'],
      metro: ['Metro', 'Metro', 'Métro', 'U-Bahn', 'Metro'],
      bike: ['Bike share', 'Bici compartida', 'Vélo partagé', 'Leihrad', 'Bisiklet'],
      cafe: ['Café', 'Cafetería', 'Café', 'Café', 'Kafe']
    },
    views: [{ n: 'This month', k: 'month' }, { n: 'Today', k: 'today' }, { n: 'This year', k: 'year' }, { n: 'Goal', k: 'goal' }],
    today: ['earned today', 'ganado hoy', 'gagnés aujourd’hui', 'heute verdient', 'bugün kazanılan'],
    year: ['back this year', 'devuelto este año', 'remboursés cette année', 'dieses Jahr zurück', 'bu yıl iade'],
    goal: ['of your {g} goal', 'de tu meta de {g}', 'sur votre objectif de {g}', 'von deinem Ziel: {g}', '{g} hedefinin'],
    screens: [
      { n: 'Mixed', total: 23.40, rows: [['supermarket', 42.10, 2.11], ['tram', 2.90, 0.15], ['coffee', 3.40, 0.17]] },
      { n: 'Groceries', total: 31.80, rows: [['supermarket', 42.10, 2.11], ['bakery', 12.80, 0.64], ['market', 20.40, 1.02]] },
      { n: 'Commute', total: 9.60, rows: [['tram', 2.90, 0.15], ['metro', 2.40, 0.12], ['bike', 4.00, 0.20]] },
      { n: 'Coffee', total: 6.85, rows: [['coffee', 3.40, 0.17], ['bakery', 1.80, 0.09], ['cafe', 4.20, 0.21]] }
    ]
  };

  /* ================= shared drawing helpers (design px) ================= */
  const OR = '#F04C22', OR_L = '#FF5A1E', CREAM = '#F6EDD2', INK = '#141414';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const px = v => Math.round(v) + 'px';
  const LOGO_AR = 3.61;
  function logo(color, x, y, h, extra) {
    return `<i class="logo" style="left:${px(x)};top:${px(y)};height:${px(h)};width:${px(h * LOGO_AR)};background:${color};${extra || ''}"></i>`;
  }
  /* highlighted headline: one cream box per line, orange text (KITE look) */
  function hl(lines, o) {
    const st = [`font-size:${px(o.fs)}`, `--hl:${o.bg || CREAM}`, `color:${o.fg || OR}`];
    if (o.left != null) st.push('left:' + px(o.left));
    if (o.right != null) st.push('right:' + px(o.right));
    if (o.top != null) st.push('top:' + px(o.top));
    if (o.bottom != null) st.push('bottom:' + px(o.bottom));
    if (o.maxW) st.push('max-width:' + px(o.maxW));
    if (o.align) st.push('text-align:' + o.align, 'align-items:' + (o.align === 'right' ? 'flex-end' : o.align === 'center' ? 'center' : 'flex-start'));
    if (o.center) st.push('left:0;right:0;margin:0 auto;width:max-content');
    return `<div class="hl${o.plain ? ' plain' : ''}${o.cls ? ' ' + o.cls : ''}" data-fit="${o.maxW || ''}" style="${st.join(';')}">` +
      lines.map((l, i) => `<span class="ln" style="--d:${(o.delay || 0) + i * 0.09}s"><b>${esc(l)}</b></span>`).join('') + '</div>';
  }
  function txt(s, o) {
    const st = [`font-size:${px(o.fs)}`, `color:${o.color}`];
    ['left', 'right', 'top', 'bottom'].forEach(k => { if (o[k] != null) st.push(k + ':' + px(o[k])); });
    if (o.align) st.push('text-align:' + o.align);
    if (o.maxW) st.push('max-width:' + px(o.maxW));
    if (o.center) st.push('left:0;right:0;margin:0 auto;width:max-content');
    return `<div class="tx${o.cls ? ' ' + o.cls : ''}" data-fit="${o.maxW || ''}" style="${st.join(';')};--d:${o.delay || 0.25}s">${o.html ? s : esc(s)}</div>`;
  }
  /* field: a solid block that, on a scene change, first covers the frame and then settles (KITE_GOOD transitions) */
  const field = (x, y, w, h, c, dir, k) => `<i class="rc fld f-${dir}" style="left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)};background:${c};--k:${k.toFixed(3)}"></i>`;
  /* tab: rounded on the outer corners, slides out from behind its field after the field settles */
  const TABR = { up: '16px 16px 0 0', down: '0 0 16px 16px', left: '16px 0 0 16px', 'left-top': '16px 0 0 0' };
  const tab = (x, y, w, h, c, dir) => `<i class="tab t-${dir.split('-')[0]}" style="left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)};background:${c};border-radius:${TABR[dir]}"></i>`;
  const rect = (x, y, w, h, c, extra) => `<i class="rc" style="left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)};background:${c};${extra || ''}"></i>`;

  /* ================= LIFESTYLE (KITE_GOOD) ================= */
  const E_LIFE = {
    id: 'lifestyle', name: 'Lifestyle',
    groups: [
      { key: 'layout', label: 'Layout', opts: [{ n: 'Field on top' }, { n: 'Field below' }, { n: 'Split' }, { n: 'Type only' }] },
      { key: 'hook', label: 'Hook', opts: LIFE.hooks.map(h => ({ n: h.n })) },
      { key: 'scene', label: 'Scene', opts: [{ n: 'Supermarket', c: 'supermarket' }, { n: 'Café terminal', c: 'cafe' }, { n: 'Tram', c: 'tram' }, { n: 'Kitchen table', c: 'table' }] }
    ],
    init: { layout: 0, hook: 0, scene: 0, lang: 0, format: 1 },
    render(s, F, li, M) {
      const { w: W, h: H } = F, wide = W > H, m = 108;
      const hook = LIFE.hooks[s.hook], lines = hook.l[li], scene = this.groups[2].opts[s.scene].c;
      const fieldH = Math.round(H * ({ '9x16': 0.34, '4x5': 0.40, '1x1': 0.42, '16x9': 0.42 })[F.c]);
      const fieldH0 = fieldH;
      const fs = wide ? 76 : ({ '9x16': 94, '4x5': 79, '1x1': 72 })[F.c];
      const tabW = wide ? 560 : 477, tabH = 46;
      const video = (x, y, w, h, pos) => `<div class="media" style="left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)}"><video data-src="${M}scene-${scene}.mp4" poster="${M}scene-${scene}.jpg" muted loop playsinline style="object-position:${pos || '50% 50%'}"></video></div>`;
      const tag = hook.tag ? hook.tag[li] : '';
      const list = hook.list ? hook.list[li] : null;
      let h = '';
      if (s.layout === 3) { /* type only end card */
        const lg = wide ? 150 : ({ '9x16': 190, '4x5': 160, '1x1': 140 })[F.c];
        const cy = H * (wide ? 0.34 : 0.36);
        h += rect(0, 0, W, H, OR_L);
        h += logo(CREAM, (W - lg * LOGO_AR) / 2, cy - lg, lg, 'animation:pop .6s both');
        h += txt(esc(lines[0]) + '<br><span class="typer" data-text="' + esc(lines[1]) + '"></span>', { html: 1, fs: fs * 0.82, color: '#fff', top: cy + 46, center: 1, align: 'center', cls: 'b8' });
        const cta = LIFE.cta[li];
        h += hl([cta], { fs: fs * 0.62, top: H * (wide ? 0.70 : 0.74), center: 1, align: 'center', delay: 0.5, cls: 'caps' });
        const by = H * (wide ? 0.70 : 0.74) + fs * 0.62 * 1.7 + 18, bw = 256, bh = 74, gap = 18;
        h += `<div class="stores" style="left:${px((W - (bw * 2 + gap)) / 2)};top:${px(by)};--bw:${px(bw)};--bh:${px(bh)};gap:${px(gap)}">` +
          LIFE.stores.map((t, i) => `<span><i class="${i ? 'gp' : 'ap'}"></i><em>${t[0]}</em><strong>${t[1]}</strong></span>`).join('') + '</div>';
        return { html: h, bg: OR_L };
      }
      const sub = hook.sub ? hook.sub[li] : '';
      const small = list ? list.map(esc).join(' · ') : sub ? esc(sub) : '';
      if (s.layout === 0) { /* field on top, tab hangs into the photo on the right */
        /* the field grows just enough to keep air between the logo and the headline */
        const fieldH = Math.round(Math.max(fieldH0, 137 + 60 + lines.length * fs * 1.22 + (tag ? 120 : small ? fs * 0.6 * 1.25 + 64 : 44)));
        h += video(0, fieldH, W, H - fieldH, '50% 55%');
        h += field(0, 0, W, fieldH, OR_L, 'top', H / fieldH) + tab(W - 55 - tabW, fieldH - 12, tabW, tabH + 12, OR_L, 'down');
        h += logo(CREAM, 110, 68, 69);
        const bot = H - fieldH + (tag ? 120 : small ? fs * 0.6 * 1.25 + 64 : 44);
        h += hl(lines, { fs, left: m, bottom: bot, maxW: W - m * 2 });
        if (tag) h += txt('<span class="typer" data-text="' + esc(tag) + '"></span>', { html: 1, fs: fs * 0.78, color: CREAM, right: m, bottom: H - fieldH + 40, cls: 'b8' });
        else if (small) h += txt(small, { html: 1, fs: fs * 0.6, color: CREAM, left: m, bottom: H - fieldH + 40, cls: 'b8', maxW: W - m * 2 });
      } else if (s.layout === 1) { /* photo on top, field below with a tab rising on the left */
        h += video(0, 0, W, H - fieldH + 2, '50% 50%');
        h += field(0, H - fieldH, W, fieldH, OR_L, 'bottom', H / fieldH) + tab(30, H - fieldH - tabH, tabW, tabH + 12, OR_L, 'up');
        h += logo(CREAM, 110, 68, 69);
        h += hl(lines, { fs, left: m, top: H - fieldH + 40, maxW: W - m * 2 });
        if (tag) h += txt('<span class="typer" data-text="' + esc(tag) + '"></span>', { html: 1, fs: fs * 0.82, color: CREAM, right: m, bottom: 60, cls: 'b8' });
        else if (small) h += txt(small, { html: 1, fs: fs * 0.62, color: CREAM, left: m, bottom: 60, cls: 'b8', maxW: W - m * 2 });
      } else if (F.c === '9x16') { /* tall split: photo column on the left, the field column widens across the bottom */
        const cx = Math.round(W * 0.64), step = Math.round(H * 0.64);
        h += video(0, 0, cx + 2, step + 2, '42% 50%');
        h += field(cx, 0, W - cx, H, OR_L, 'right', W / (W - cx)) + tab(0, step, cx + 12, H - step, OR_L, 'left-top');
        h += logo(CREAM, 110, 68, 69, 'filter:drop-shadow(0 2px 10px rgba(0,0,0,.25))');
        h += hl(lines, { fs, left: m, top: step + 70, maxW: W - m * 2, plain: 1, fg: CREAM });
        if (list) h += hl(list, { fs: fs * 0.6, left: m, top: step + 70 + fs * 2.75, maxW: W - m * 2, delay: 0.3 });
        else if (sub) h += txt(esc(sub), { html: 1, fs: fs * 0.6, color: CREAM, left: m, top: step + 70 + fs * 2.75, cls: 'b8', maxW: W - m * 2 });
        if (tag) h += txt('<span class="typer" data-text="' + esc(tag) + '"></span>', { html: 1, fs: fs * 0.78, color: CREAM, right: m, bottom: 80, cls: 'b8' });
      } else { /* split: photo left, field column right; a short rounded tab sticks out of the column low on the left (KITE_GOOD 2_3: 34px wide, 72%–96% of the height) */
        const cx = Math.round(W * (wide ? 0.56 : 0.531)), step = Math.round(H * 0.28);
        h += video(0, 0, cx + 2, H, '35% 50%');
        h += field(cx, 0, W - cx, H, OR_L, 'right', W / (W - cx)) + tab(cx - 34, Math.round(H * 0.722), 46, Math.round(H * 0.241), OR_L, 'left');
        h += logo(CREAM, 110, 68, 69, 'filter:drop-shadow(0 2px 10px rgba(0,0,0,.25))');
        const cw = W - cx - 40 - (wide ? 72 : 48);
        h += hl(lines, { fs: fs * 0.9, left: cx + 20, top: step + 40, maxW: cw, plain: 1, fg: CREAM });
        if (list) h += hl(list, { fs: fs * 0.56, left: cx + 20, top: step + 40 + fs * 0.9 * 2.6, maxW: cw, delay: 0.3 });
        else if (sub) h += txt(esc(sub), { html: 1, fs: fs * 0.58, color: CREAM, left: cx + 20, top: step + 40 + fs * 0.9 * 2.6, cls: 'b8', maxW: cw });
        if (tag) h += txt('<span class="typer" data-text="' + esc(tag) + '"></span>', { html: 1, fs: fs * 0.78, color: CREAM, right: wide ? 72 : 48, bottom: 60, cls: 'b8' });
      }
      return { html: h, bg: OR_L };
    }
  };

  /* ================= STUDIO (KITE_GOOD_3) ================= */
  const E_STUDIO = {
    id: 'studio', name: 'Studio',
    groups: [
      { key: 'set', label: 'Still life', opts: [{ n: 'Groceries', c: 'supermarket' }, { n: 'Coffee', c: 'cafe' }, { n: 'Breakfast', c: 'table' }, { n: 'Commute', c: 'tram' }] },
      { key: 'hook', label: 'Hook', opts: STUDIO.hooks.map(h => ({ n: h.n })) },
      { key: 'cta', label: 'Call to action', opts: STUDIO.ctas.map(c => ({ n: c.n })) }
    ],
    init: { set: 0, hook: 0, cta: 0, lang: 0, format: 1 },
    render(s, F, li, M) {
      const { w: W, h: H } = F, wide = W > H;
      const set = this.groups[0].opts[s.set].c, lines = STUDIO.hooks[s.hook].l[li], cta = STUDIO.ctas[s.cta].l[li];
      const vid = (x, y, sz) => `<div class="media plate" style="left:${px(x)};top:${px(y)};width:${px(sz)};height:${px(sz)}"><video data-src="${M}studio-${set}.mp4" poster="${M}studio-${set}.jpg" muted loop playsinline></video></div>`;
      let h = `<div class="studio-bg"></div>`;
      if (wide) {
        const fx = 1180;
        h += vid(-30, -80, 1240);
        h += field(fx, 0, W - fx, H, OR, 'right', W / (W - fx)) + tab(fx - 54, 30, 70, 477, OR, 'left');
        h += logo(CREAM, 108, 72, 59);
        h += hl(lines, { fs: 64, left: fx + 72, top: 120, maxW: W - fx - 144 });
        h += txt(cta, { fs: 40, color: CREAM, left: fx + 72, bottom: 96, cls: 'caps b8', maxW: W - fx - 144 });
        return { html: h, bg: '#050504' };
      }
      const ft = Math.round(H * ({ '9x16': 0.75, '4x5': 0.72, '1x1': 0.66 })[F.c]);
      const fs = ({ '9x16': 68, '4x5': 64, '1x1': 58 })[F.c];
      /* the still life sits between 25% and 77% of the square loop: keep it clear of the logo and the field in every format */
      const P = ({ '9x16': [-150, 141, 1380], '4x5': [0, -21, 1080], '1x1': [40, -90, 1000] })[F.c];
      h += vid(P[0], P[1], P[2]);
      h += field(0, ft, W, H - ft, OR, 'bottom', H / (H - ft)) + tab(30, ft - 54, 477, 70, OR, 'up');
      h += logo(CREAM, 108, 72, 59);
      h += hl(lines, { fs, left: 106, top: ft + 46, maxW: W - 170 });
      h += txt(cta, { fs: 40, color: CREAM, left: 108, bottom: Math.max(64, (H - ft) * 0.22), cls: 'caps b8', maxW: W - 90 });
      return { html: h, bg: '#050504' };
    }
  };

  /* ================= 3D OBJECT (KITE_GOOD_5) ================= */
  const E_OBJ = {
    id: 'object', name: '3D object',
    groups: [
      { key: 'obj', label: 'Object', opts: OBJ.objects.map(o => ({ n: o.n })) },
      { key: 'hook', label: 'Hook', opts: OBJ.hooks.map(h => ({ n: h.n })) },
      { key: 'motion', label: 'Motion', opts: [{ n: 'Float' }, { n: 'Spin' }, { n: 'Glide' }, { n: 'Tumble' }] }
    ],
    init: { obj: 0, hook: 0, motion: 0, lang: 0, format: 1 },
    /* proportions from KITE_GOOD_5 (4:5): field top at 42.4% of the height, tab 99px tall from 59.7% of the width to 55px off the right edge */
    geo(F) {
      const { w: W, h: H } = F, wide = W > H;
      const G = wide ? { base: H * 0.45, ox: W * 0.50, size: 400, fs: 88, tx: 108, cta: 92, maxW: W * 0.5, tabL: W * 0.62, lift: 0.10, gap: 118 }
        : ({ '9x16': { base: H * 0.43, ox: W * 0.49, size: 540, fs: 112, tx: 108, cta: 200, maxW: W - 216, tabL: W * 0.597, lift: 0.08, gap: 270 },
          '4x5': { base: H * 0.4237, ox: W * 0.49, size: 460, fs: 101, tx: 108, cta: 132, maxW: W - 216, tabL: W * 0.597, lift: 0.08, gap: 203 },
          '1x1': { base: H * 0.43, ox: W * 0.47, size: 360, fs: 86, tx: 108, cta: 80, maxW: W - 216, tabL: W * 0.597, lift: 0.12, gap: 130 } })[F.c];
      G.tabR = W - 55; G.tabTop = G.base - 99; G.ty = G.base + G.gap;
      return G;
    },
    render(s, F, li) {
      const { w: W, h: H } = F, g = this.geo(F), o = OBJ.objects[s.obj];
      const lines = objLines(o, s.hook, li);
      let h = `<svg class="edge" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><path fill="${OR}"/></svg>`;
      h += `<canvas class="gl"></canvas>`;
      h += logo(OR, 108, 72, 59);
      h += hl(lines, { fs: g.fs, left: g.tx, top: g.ty, maxW: g.maxW, cls: 'b9' });
      h += txt(OBJ.cta[li], { fs: 44, color: CREAM, left: g.tx, bottom: g.cta, cls: 'caps b8', maxW: g.maxW });
      return { html: h, bg: CREAM, three: { obj: o.c, motion: s.motion, g } };
    }
  };

  /* ================= KNIT (KITE_GOOD_6) ================= */
  const E_KNIT = {
    id: 'knit', name: 'Knit',
    groups: [
      { key: 'item', label: 'Embroidery', opts: KNIT.items.map(i => ({ n: i.n })) },
      { key: 'hook', label: 'Hook', opts: KNIT.hooks.map(h => ({ n: h.n })) },
      { key: 'type', label: 'Type', opts: [{ n: 'Bottom left' }, { n: 'Top left' }, { n: 'Bottom right' }, { n: 'Centred' }] }
    ],
    init: { item: 0, hook: 0, type: 0, lang: 0, format: 1 },
    frames(it, F) {
      const [v, z, n] = it.v[F.c] || ['sq', 1];
      return { z, files: Array.from({ length: n || it.frames }, (_, i) => `knit-${it.c}-${v}_${i}.webp`) };
    },
    render(s, F, li, M) {
      const { w: W, h: H } = F, wide = W > H, m = 108;
      const it = KNIT.items[s.item], hk = KNIT.hooks[s.hook];
      const lines = hk.every ? it.every[li] : hk.l[li];
      const fs = wide ? 72 : ({ '9x16': 96, '4x5': 88, '1x1': 78 })[F.c], cfs = wide ? 36 : 40;
      const mb = wide ? 72 : m;
      const fr = this.frames(it, F);
      let h = `<div class="media knit" style="--z:${fr.z}">` + fr.files.map((f, i) => `<img data-src="${M}${f}" alt=""${i ? '' : ' class="on"'}>`).join('') + '</div>';
      h += tab(W - 80, 56, 80, Math.round(H * (wide ? 0.42 : 0.30)), OR, 'left');
      h += logo(OR, 108, 72, 59);
      const ctaH = cfs * 1.3;
      const T = s.type;
      const o = { fs, maxW: wide ? W * 0.42 : W - m * 2 - (T === 1 ? 90 : 0), cls: 'b9' };
      if (T === 0) Object.assign(o, { left: m, bottom: mb + ctaH + 20 });
      if (T === 1) Object.assign(o, { left: m, top: 190 });
      if (T === 2) Object.assign(o, { right: m, bottom: mb + ctaH + 20, align: 'right' });
      if (T === 3) Object.assign(o, { center: 1, bottom: mb + ctaH + 20, align: 'center' });
      h += hl(lines, o);
      const c = { fs: cfs, color: INK, cls: 'caps b9', delay: 0.35 };
      if (T === 0) Object.assign(c, { left: m, bottom: mb });
      if (T === 1) Object.assign(c, { left: m, top: 190 + fs * 2.4 + 20 });
      if (T === 2) Object.assign(c, { right: m, bottom: mb, align: 'right' });
      if (T === 3) Object.assign(c, { center: 1, bottom: mb, align: 'center' });
      h += txt(KNIT.cta[li], c);
      return { html: h, bg: '#EFD9C8' };
    }
  };

  /* ================= APP SCREEN (KITE_GOOD_4 / 4_2) ================= */
  const E_APP = {
    id: 'app', name: 'App screen',
    groups: [
      { key: 'hook', label: 'Hook', opts: APP.hooks.map(h => ({ n: h.n })) },
      { key: 'screen', label: 'Spending', opts: APP.screens.map(x => ({ n: x.n })) },
      { key: 'view', label: 'Screen', opts: APP.views.map(v => ({ n: v.n })) }
    ],
    init: { hook: 0, screen: 0, view: 0, lang: 0, format: 1 },
    phone(sc, vw, li, P) {
      const L = LANGS[li], scr = APP.screens[sc], v = APP.views[vw].k;
      const f = x => new Intl.NumberFormat(L.loc, { style: 'currency', currency: 'EUR' }).format(x);
      const today = scr.rows.reduce((n, r) => n + r[2], 0);
      const total = v === 'today' ? today : v === 'year' ? Math.round(scr.total * 11.4 * 100) / 100 : scr.total;
      const goal = Math.ceil(scr.total / 10) * 10 + 10;
      const sub = v === 'today' ? APP.today[li] : v === 'year' ? APP.year[li] : v === 'goal' ? APP.goal[li].replace('{g}', f(goal).replace(/[.,]00(?=\D*$)/, '')) : APP.back[li];
      return `<div class="phone" style="--P:${px(P)}"><div class="scr${v === 'goal' ? ' has-goal' : ''}"><i class="ap-logo"></i>` +
        `<div class="ap-tot" data-total="${total}" data-loc="${L.loc}">${f(0)}</div><div class="ap-sub">${esc(sub)}</div>` +
        (v === 'goal' ? `<div class="ap-goal"><i data-pct="${(scr.total / goal).toFixed(3)}"></i></div>` : '') +
        `<div class="ap-rows">` + scr.rows.map((r, i) => `<div class="ap-row" style="--i:${i}"><div><b>${esc(APP.rows[r[0]][li])}</b><small>${f(r[1])}</small></div><em>+${f(r[2])}</em></div>`).join('') + '</div>' +
        `<div class="ap-btn">${esc(APP.button[li])}</div></div></div>`;
    },
    band(W, bH, tabX, tabW, vertical) {
      const d = vertical ? bandPathV(W, bH, tabX, tabW) : bandPath(W, bH, tabX, tabW);
      const vw = vertical ? W + 60 : W, vh = vertical ? bH : bH + 60;
      return `<svg class="band" viewBox="0 0 ${vw} ${vh}" style="width:${px(vw)};height:${px(vh)}" preserveAspectRatio="none"><defs><filter id="rough" x="-5%" y="-2%" width="110%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="${vertical ? '.6 .035' : '.035 .6'}" numOctaves="2" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/></filter>` +
        `<filter id="paper" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="7"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .1  0 0 0 0 .02  0 0 0 -1.5 .9"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>` +
        `<g filter="url(#rough)"><path d="${d}" fill="${OR}"/><path d="${d}" fill="${OR}" filter="url(#paper)" opacity=".5"/></g></svg>`;
    },
    render(s, F, li) {
      const { w: W, h: H } = F, wide = W > H;
      const lines = APP.hooks[s.hook].l[li], cta = APP.cta[li];
      let h = `<div class="app-bg" style="background:linear-gradient(180deg,#5A5A5A 0%,#2A2A2A 55%,#0B0B0B 100%)"></div>`;
      if (wide) {
        /* 16:9: the paper band turns into a column on the left; a big phone fills the right so its top half (total, rows) reads */
        const bw = 820, P = 560, px0 = bw + 140, py0 = 96;
        h += `<div class="phone-wrap" style="left:${px(px0)};top:${px(py0)}">${this.phone(s.screen, s.view, li, P)}</div>`;
        h += this.band(bw, H, 120, 430, true);
        h += hl(lines, { fs: 66, left: 96, top: 280, maxW: bw - 140 });
        h += txt(esc(cta[0]) + '<br>' + esc(cta[1]), { html: 1, fs: 40, color: CREAM, left: 96, bottom: 88, cls: 'caps b9 lh1' });
        const lgH = 64;
        h += logo(CREAM, W - 96 - lgH * LOGO_AR, H * 0.5 - lgH / 2, lgH);
        return { html: h, bg: '#2A2A2A' };
      }
      const bandH = Math.round(({ '9x16': H * 0.17, '4x5': H * 0.21, '1x1': H * 0.24 })[F.c]);
      const fs = ({ '9x16': 72, '4x5': 67, '1x1': 60 })[F.c];
      const P = ({ '9x16': 560, '4x5': 480, '1x1': 420 })[F.c];
      h += `<div class="phone-wrap" style="left:${px(22)};top:${px(bandH + 70)}">${this.phone(s.screen, s.view, li, P)}</div>`;
      const tabW = 481, tabX = W - 43 - tabW;
      h += this.band(W, bandH, tabX, tabW, false);
      h += hl(lines, { fs, left: 107, top: Math.round(bandH * 0.23), maxW: W * 0.86 });
      const lgH = ({ '9x16': 72, '4x5': 62, '1x1': 56 })[F.c], rx = 45;
      h += logo(CREAM, W - rx - lgH * LOGO_AR, H * 0.60, lgH);
      h += txt(esc(cta[0]) + '<br>' + esc(cta[1]), { html: 1, fs: ({ '9x16': 50, '4x5': 44, '1x1': 40 })[F.c], color: '#FF5A1E', right: rx, bottom: H * 0.052, align: 'right', cls: 'caps b9 lh1' });
      return { html: h, bg: '#2A2A2A' };
    }
  };
  /* vertical band for 16:9: ragged right edge, rounded tab sticking out to the right near the top */
  function bandPathV(bw, H, ty, th) {
    return `M0 0 H${bw} V${ty} H${bw + 40} Q${bw + 50} ${ty} ${bw + 50} ${ty + 10} V${ty + th - 10} Q${bw + 50} ${ty + th} ${bw + 40} ${ty + th} H${bw} V${H} H0 Z`;
  }
  function bandPath(W, bH, tx, tw) {
    return `M0 0 H${W} V${bH} H${tx + tw} V${bH + 40} Q${tx + tw} ${bH + 50} ${tx + tw - 10} ${bH + 50} H${tx + 10} Q${tx} ${bH + 50} ${tx} ${bH + 40} V${bH} H0 Z`;
  }

  const ENGINES = [E_LIFE, E_STUDIO, E_OBJ, E_KNIT, E_APP];
  const COMMON = [
    { key: 'lang', label: 'Language', opts: LANGS },
    { key: 'format', label: 'Format', opts: FORMATS }
  ];
  ENGINES.forEach(e => { e.all = e.groups.concat(COMMON); e.total = e.all.reduce((n, g) => n * g.opts.length, 1); });
  const GRAND = ENGINES.reduce((n, e) => n + e.total, 0);

  /* ================= 3D object stage (three.js, loaded on demand) ================= */
  /* three.js + models ship as one classic script (kite-3d.js): classic <script> loads need no CORS,
     so the 3D style also works in sandboxed previews and on any CDN. */
  let THREEP = null;
  function loadThree(base) {
    if (THREEP) return THREEP;
    THREEP = new Promise((res, rej) => {
      if (window.KITE3D && window.KITE3D_MODELS) return res(window.KITE3D);
      const s = document.createElement('script'); s.src = base + 'kite-3d.js'; s.async = true;
      const to = setTimeout(() => rej(new Error('kite-3d timeout')), 20000);
      s.onload = () => { clearTimeout(to); window.KITE3D ? res(window.KITE3D) : rej(new Error('kite-3d empty')); };
      s.onerror = () => { clearTimeout(to); rej(new Error('kite-3d failed')); };
      document.head.appendChild(s);
    });
    THREEP.catch(() => { THREEP = null; });
    return THREEP;
  }
  const b64buf = s => { const bin = atob(s), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer; };
  /* pose: rotation (x,y,z) chosen to match the KITE_GOOD_5 renders; k = size multiplier */
  const POSE = {
    milk: { r: [0.22, 0.62, -0.62], k: 1.0 },
    eggs: { r: [0.8, 1.3, -0.75], k: 1.15 },
    bread: { r: [0.5, 0.3, -0.75], k: 1.35 },
    can: { r: [0.95, 0.15, -0.95], k: 0.86 }
  };
  class ObjectStage {
    constructor(canvas, base) { this.canvas = canvas; this.base = base; this.cache = {}; this.cur = null; this.t0 = performance.now(); this.alive = true; }
    async init() {
      const { THREE: T, GLTFLoader } = await loadThree(this.base);
      if (!this.alive) return;
      this.T = T;
      const r = new T.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
      r.outputColorSpace = T.SRGBColorSpace; r.toneMapping = T.ACESFilmicToneMapping; r.toneMappingExposure = 1.05;
      this.scene = new T.Scene();
      const pm = new T.PMREMGenerator(r); this.scene.environment = pm.fromScene(this.studioEnv(T), 0.02).texture;
      this.scene.add(new T.HemisphereLight(0xffffff, 0x8a7d70, 0.45));
      const d = new T.DirectionalLight(0xffffff, 1.5); d.position.set(-300, 600, 900); this.scene.add(d);
      this.cam = new T.OrthographicCamera(0, 100, 0, -100, 0.1, 6000); this.cam.position.set(0, 0, 3000);
      this.loader = new GLTFLoader();
      this.brush = this.brushTex(T);
      this.r = r;
    }
    studioEnv(T) {
      const e = new T.Scene();
      const g = new T.SphereGeometry(20, 48, 24), p = g.attributes.position, cols = [];
      const top = new T.Color(0xffffff), mid = new T.Color(0xd9d1c2), bot = new T.Color(0x6d6862);
      for (let i = 0; i < p.count; i++) { const y = p.getY(i) / 20; const c = y > 0 ? mid.clone().lerp(top, y) : mid.clone().lerp(bot, -y); cols.push(c.r, c.g, c.b); }
      g.setAttribute('color', new T.Float32BufferAttribute(cols, 3));
      e.add(new T.Mesh(g, new T.MeshBasicMaterial({ vertexColors: true, side: T.BackSide })));
      const box = (w, h, x, y, z, k) => { const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(k, k, k), side: T.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); e.add(m); };
      box(14, 6, -10, 6, 8, 3.2); box(6, 16, 12, 2, 4, 2.4); box(10, 3, 0, 12, -6, 2.0); box(4, 14, -14, 0, -6, 1.4);
      return e;
    }
    brushTex(T) {
      const cv = document.createElement('canvas'); cv.width = cv.height = 256; const c = cv.getContext('2d');
      c.fillStyle = '#808080'; c.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 1300; i++) { const g = 100 + Math.random() * 80 | 0; c.fillStyle = `rgba(${g},${g},${g},${0.05 + Math.random() * 0.12})`; c.fillRect(Math.random() * 256, 0, 1 + Math.random() * 1.5, 256); }
      const t = new T.CanvasTexture(cv); t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(3, 1); return t;
    }
    load(name) {
      if (!this.cache[name]) this.cache[name] = new Promise(res => this.loader.parse(b64buf(window.KITE3D_MODELS[name]), '', g => {
        const T = this.T, o = g.scene;
        o.traverse(m => {
          if (!m.isMesh) return;
          if (name === 'can') m.material = new T.MeshPhysicalMaterial({ color: 0xc9cdd3, metalness: 1, roughness: 0.27, roughnessMap: this.brush, bumpMap: this.brush, bumpScale: 0.4, clearcoat: 0.3, clearcoatRoughness: 0.25 });
          else { m.material.roughness = name === 'bread' ? 0.78 : 0.62; m.material.metalness = 0; m.material.envMapIntensity = 0.9; }
        });
        const b = new T.Box3().setFromObject(o), sz = b.getSize(new T.Vector3()), c = b.getCenter(new T.Vector3());
        o.position.sub(c);
        const holder = new T.Group(); holder.add(o); holder.userData.max = Math.max(sz.x, sz.y, sz.z);
        res(holder);
      }, () => res(null)));
      return this.cache[name];
    }
    async show(spec, W, H, scale) {
      this.want = spec.obj; this.scale = scale; this.motion = spec.motion || 0; this.mt = performance.now();
      this.W = W; this.H = H; this.g = spec.g;
      this.edge = { rise: !!spec.rise, t: performance.now() };
      this.size = spec.g.size * POSE[spec.obj].k;
      if (!this.raf) this.loop();                       /* the split edge animates even before 3D is ready */
      if (this.failed) return this.fallback(spec.obj);
      try { if (!this.r) { this.initP = this.initP || this.init(); await this.initP; } }
      catch (e) { this.failed = true; return this.fallback(spec.obj); }
      if (!this.alive || !this.r || this.want !== spec.obj) return;
      const dpr = Math.min(2, (window.devicePixelRatio || 1) * scale);
      this.r.setPixelRatio(Math.max(0.5, dpr)); this.r.setSize(W, H, false);
      Object.assign(this.cam, { left: 0, right: W, top: 0, bottom: -H }); this.cam.updateProjectionMatrix();
      if (this.objName !== spec.obj) {
        const o = await this.load(spec.obj);
        if (!this.alive || !o || this.want !== spec.obj) return;
        if (this.cur) this.scene.remove(this.cur);
        this.cur = o; this.objName = spec.obj; this.pop = performance.now();
        this.scene.add(o);
      }
    }
    /* no WebGL: a pre-rendered still of the same model rides the edge instead */
    fallback(name) {
      if (!this.img) { this.img = document.createElement('img'); this.img.className = 'objimg'; this.img.alt = ''; }
      if (this.imgName !== name) { this.img.src = this.base + 'obj-' + name + '.png'; this.imgName = name; this.pop = performance.now(); }
      if (this.host && this.img.parentNode !== this.host) this.host.appendChild(this.img);
      this.objName = name;
    }
    /* the KITE_GOOD_5 split, measured off the reference: a flat field with one raised, rounded tab on the right.
       It never changes shape; on a new layout it rises into place from the bottom. */
    edgeParams() {
      const k = Math.min(1, (performance.now() - this.edge.t) / 600), e = 1 - Math.pow(1 - k, 3);
      const off = this.edge.rise ? (1 - e) * (this.H - this.g.base + 120) : 0;
      return [0, off];
    }
    path(p) {
      const W = this.W, H = this.H, g = this.g, o = p[1], B = g.base + o, T = g.tabTop + o;
      const q = [[0, H], [0, B], [g.tabL, B], [g.tabL, T], [g.tabR, T], [g.tabR, B], [W, B], [W, H]];
      return this.rounded(q, 14, [3, 4]);
    }
    /* steps and tabs of the split get the same 16px rounded corners as the KITE cards; corners on the frame edge stay square */
    rounded(q, R, only) {
      const W = this.W, H = this.H, n = q.length, onEdge = ([x, y], i) => x <= 0.5 || x >= W - 0.5 || y >= H - 0.5 || (only && !only.includes(i));
      let d = '';
      for (let i = 0; i < n; i++) {
        const c = q[i], a = q[(i + n - 1) % n], b = q[(i + 1) % n];
        if (onEdge(c, i)) { d += (i ? 'L' : 'M') + c[0].toFixed(1) + ' ' + c[1].toFixed(1) + ' '; continue; }
        const la = Math.hypot(a[0] - c[0], a[1] - c[1]), lb = Math.hypot(b[0] - c[0], b[1] - c[1]);
        const r = Math.min(R, la / 2, lb / 2);
        const p1 = [c[0] + (a[0] - c[0]) / la * r, c[1] + (a[1] - c[1]) / la * r], p2 = [c[0] + (b[0] - c[0]) / lb * r, c[1] + (b[1] - c[1]) / lb * r];
        d += `L${p1[0].toFixed(1)} ${p1[1].toFixed(1)} Q${c[0].toFixed(1)} ${c[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} `;
      }
      return d + 'Z';
    }
    yAt(p) { return this.g.base + p[1]; }
    loop() {
      const step = now => {
        if (!this.alive) return;
        this.raf = requestAnimationFrame(step);
        if (this.paused) return;
        const tt = (now - this.t0) / 1000;
        const p = this.edgeParams();
        if (this.svgPath) this.svgPath.setAttribute('d', this.path(p));
        const ox0 = this.g.ox + Math.sin(tt * 0.9) * this.W * 0.01 + this.move(tt).dx;
        if (this.img && this.failed) {
          const pk = Math.min(1, (now - (this.pop || 0)) / 520), back = pk < 1 ? 1 + 2.2 * Math.pow(pk - 1, 3) + 1.2 * Math.pow(pk - 1, 2) : 1;
          const m = this.move(tt), s = this.size * 1.25, y = this.yAt(p) - this.size * this.g.lift + m.dy;
          this.img.style.cssText = `left:${ox0 - s / 2}px;top:${y - s / 2}px;width:${s}px;height:${s}px;transform:scale(${back * m.sq}) rotate(${m.deg}deg)`;
        }
        if (!this.r) return;
        if (this.cur) {
          const size = this.size, max = this.cur.userData.max;
          const pk = Math.min(1, (now - (this.pop || 0)) / 520), back = 1 + 2.2 * Math.pow(pk - 1, 3) + 1.2 * Math.pow(pk - 1, 2);
          const sc = size / max * (pk < 1 ? back : 1);
          this.cur.scale.setScalar(sc);
          const ox = ox0;
          const m = this.move(tt);
          const y = this.yAt(p) - size * this.g.lift + m.dy;
          this.cur.position.set(ox, -y, 0);
          if (m.sq !== 1) this.cur.scale.set(sc * (2 - m.sq), sc * m.sq, sc * (2 - m.sq));
          const base = POSE[this.objName].r;
          this.cur.rotation.set(base[0] + m.r[0], base[1] + m.r[1], base[2] + m.r[2]);
        }
        this.r.render(this.scene, this.cam);
      };
      this.raf = requestAnimationFrame(step);
    }
    /* object motion presets: Float, Spin, Glide, Tumble (the split edge itself never changes) */
    move(tt) {
      const t = (performance.now() - (this.mt || 0)) / 1000;
      switch (this.motion) {
        case 1: return { dx: 0, dy: Math.sin(tt * 1.4) * 8, r: [0.04 * Math.sin(tt), t * 1.2, 0.04 * Math.sin(tt * 0.8)], sq: 1, deg: (t * 55) % 360 };
        case 2: return { dx: Math.sin(t * 0.7) * this.W * 0.07, dy: Math.sin(t * 1.4) * 5, r: [Math.sin(t * 0.7) * 0.05, Math.sin(t * 0.7) * 0.55, Math.cos(t * 0.7) * 0.08], sq: 1, deg: Math.sin(t * 0.7) * 6 };
        case 3: return { dx: 0, dy: Math.sin(tt * 1.1) * 12, r: [t * 0.55, t * 0.8, t * 0.35], sq: 1, deg: (t * 32) % 360 };
        default: return { dx: 0, dy: Math.sin(tt * 1.7) * 6, r: [Math.sin(tt * 0.8) * 0.06, Math.sin(tt * 0.55) * 0.38, Math.sin(tt * 0.7) * 0.05], sq: 1, deg: Math.sin(tt * 0.7) * 4 };
      }
    }
    destroy() { this.alive = false; cancelAnimationFrame(this.raf); this.raf = 0; if (this.r) { this.r.dispose(); this.r.forceContextLoss && this.r.forceContextLoss(); } }
  }

  /* ================= styles (Shadow DOM) ================= */
  const CSS = `
:host{--navy:#0C2B3F;--ink:#0C2B3F;--muted:#5A6B78;--line:#DDE3E8;--grey:#F1F1F1;--sky:#B4E4FA;--kite:#F04C22;
  --font:'Inter Tight','Helvetica Neue',Helvetica,Arial,sans-serif;--r:32px;--gap:20px;
  display:block;color:var(--ink);font:400 17px/1.45 var(--font);-webkit-font-smoothing:antialiased}
*{box-sizing:border-box}
p{margin:0}
button{font:inherit;color:inherit}
:focus-visible{outline:2px solid #2C7BE5;outline-offset:3px}
.eng{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:var(--gap)}
.tile{border-radius:var(--r);padding:clamp(24px,3vw,48px);display:flex;flex-direction:column;gap:22px;min-width:0;position:relative;overflow:hidden}
.ctrl{background:var(--grey);justify-content:center}
.preview{background:linear-gradient(180deg,#F3FBFF 0%,#B4E4FA 100%);justify-content:space-between;gap:20px}
.label{font:500 13px/1.2 var(--font);letter-spacing:.06em;text-transform:uppercase;opacity:.75}
.h-m{font:650 clamp(22px,1.9vw,28px)/1.12 var(--font);letter-spacing:-.025em;text-wrap:balance}
.head{display:flex;flex-direction:column;gap:12px}
.small{font-size:15px}.muted{color:var(--muted)}
.autorow{display:flex;align-items:center;gap:12px}
.tsw{--h:26px;width:calc(var(--h)*2.27);height:var(--h);border-radius:999px;border:calc(var(--h)*.26) solid var(--navy);background:transparent;position:relative;cursor:pointer;padding:0;flex:none;transition:background .25s}
.tsw::after{content:"";position:absolute;top:50%;left:calc(var(--h)*.1);width:calc(var(--h)*.34);height:calc(var(--h)*.34);border-radius:999px;background:var(--navy);transform:translateY(-50%);transition:left .3s cubic-bezier(.2,.7,.2,1)}
.tsw[aria-checked="true"]{background:var(--sky)}
.tsw[aria-checked="true"]::after{left:calc(100% - var(--h)*.44)}
.kgroups{display:flex;flex-direction:column;gap:16px}
.group{display:flex;flex-direction:column;gap:10px;min-width:0}
.group.sw{animation:gin .45s cubic-bezier(.2,.7,.2,1) both;animation-delay:calc(var(--gi)*40ms)}
@keyframes gin{from{opacity:0;transform:translateY(8px)}}
.pills{display:flex;flex-wrap:wrap;gap:8px}
.pill{background:#fff;border:1px solid var(--line);border-radius:999px;padding:9px 18px;font-size:16px;cursor:pointer;color:var(--ink);white-space:nowrap;transition:background .2s,color .2s,border-color .2s}
.pill[aria-pressed="true"]{background:var(--navy);border-color:var(--navy);color:#fff}
.group.is-style .pill[aria-pressed="true"]{background:#EA8007;border-color:#EA8007}
.group.is-style{padding-bottom:14px;border-bottom:1px solid rgba(12,43,63,.12)}
.stage{flex:1;display:grid;place-items:center;min-height:440px;position:relative}
.readout{border-top:1px solid rgba(12,43,63,.15);padding-top:16px;display:flex;flex-direction:column;gap:6px}
.readout b{font-weight:700;font-variant-numeric:tabular-nums}
@media (max-width:900px){.eng{grid-template-columns:1fr;gap:0}.tile.ctrl{padding:24px 20px 8px;border-radius:var(--r) var(--r) 0 0}.preview{background:var(--grey);border-radius:0 0 var(--r) var(--r);padding:16px 20px 24px}.stage{flex:none;min-height:0;height:min(64vh,560px)}}

/* ---------- the ad: drawn at real ad size (1080 or 1920 px wide) and scaled to the stage ---------- */
.adbox{position:relative;flex:none;border-radius:14px;overflow:hidden;box-shadow:0 22px 60px rgba(10,30,60,.25);isolation:isolate}
.ad{position:absolute;left:0;top:0;transform-origin:0 0;overflow:hidden;font-family:'Schibsted Grotesk','Inter Tight',Arial,sans-serif;color:#fff;contain:strict}
.ad *{position:absolute}
.ad .rc{display:block}
.ad i{display:block}
.logo{-webkit-mask:var(--logo) left center/contain no-repeat;mask:var(--logo) left center/contain no-repeat;z-index:6}
.media{overflow:hidden;z-index:1}
.media video,.media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.media.plate{-webkit-mask:linear-gradient(90deg,transparent 0,#000 11%,#000 89%,transparent 100%),linear-gradient(180deg,transparent 0,#000 14%,#000 86%,transparent 100%);-webkit-mask-composite:source-in;mask:linear-gradient(90deg,transparent 0,#000 11%,#000 89%,transparent 100%),linear-gradient(180deg,transparent 0,#000 14%,#000 86%,transparent 100%);mask-composite:intersect}
.studio-bg{inset:0;background:#050504}
.media.knit{inset:0;background:#EFD9C8}
.media.knit img{opacity:0;transform:scale(var(--z,1))}
.media.knit img.on{opacity:1}
.rc{z-index:3}
.hl,.tx{z-index:7;position:absolute}
.hl{display:flex;flex-direction:column;gap:.08em;font-weight:900;line-height:1;letter-spacing:-.01em}
.hl.b9{font-weight:900}
.hl .ln{position:relative;display:block;background:var(--hl);padding:.02em .12em .07em;white-space:nowrap;animation:wipe .5s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--d)}
.hl.plain .ln{background:none;padding-left:0;padding-right:0}
.hl .ln b{position:relative;font-weight:inherit;animation:fin .35s ease both;animation-delay:calc(var(--d) + .12s)}
@keyframes wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes fin{from{opacity:0}}
.tx{font-weight:800;line-height:1.2;white-space:nowrap;animation:fin .5s ease both;animation-delay:var(--d)}
.tx.b8{font-weight:800}.tx.b9{font-weight:900}.tx.lh1{line-height:1.12}
.caps{text-transform:uppercase;letter-spacing:.01em}
.hl.caps .ln{letter-spacing:.01em}
.typer::after{content:"";display:inline-block;width:.06em;height:.9em;background:currentColor;margin-left:.05em;vertical-align:-.08em;animation:blink .8s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.typer,.tx span,.tx br{position:static}
.stores{display:flex;z-index:7}
.stores span{position:relative;width:var(--bw);height:var(--bh);background:#000;border-radius:14px;color:#fff;display:block}
.stores span *{position:absolute}
.stores em{left:78px;top:12px;font:500 16px/1 Arial,sans-serif;font-style:normal;opacity:.9}
.stores strong{left:78px;top:31px;font:600 28px/1 Arial,sans-serif;letter-spacing:-.01em}
.stores i.ap{left:22px;top:15px;width:40px;height:44px;background:#fff;-webkit-mask:var(--apple) center/contain no-repeat;mask:var(--apple) center/contain no-repeat}
.stores i.gp{left:24px;top:16px;width:38px;height:42px;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 26'%3E%3Cpath d='M1.6 1.1 13.4 13 1.6 24.9c-.4-.3-.6-.8-.6-1.4V2.5c0-.6.2-1.1.6-1.4z' fill='%2300A0FF'/%3E%3Cpath d='M17.4 9 13.4 13 1.6 1.1c.4-.3 1-.4 1.6-.1L17.4 9z' fill='%2300D46E'/%3E%3Cpath d='M17.4 17 3.2 25c-.6.3-1.2.2-1.6-.1L13.4 13l4 4z' fill='%23FF3A44'/%3E%3Cpath d='M22 11.6c1 .6 1 2.2 0 2.8L17.4 17l-4-4 4-4 4.6 2.6z' fill='%23FFC400'/%3E%3C/svg%3E") center/contain no-repeat}
@keyframes pop{from{transform:scale(.6);opacity:0}}
.tab{z-index:2;display:block}
.fld{z-index:3}
.ad.wipe .fld.f-top{transform-origin:50% 0;animation:fy .6s cubic-bezier(.7,0,.2,1) both}
.ad.wipe .fld.f-bottom{transform-origin:50% 100%;animation:fy .6s cubic-bezier(.7,0,.2,1) both}
.ad.wipe .fld.f-right{transform-origin:100% 50%;animation:fx .6s cubic-bezier(.7,0,.2,1) both}
@keyframes fy{from{transform:scaleY(var(--k))}}
@keyframes fx{from{transform:scaleX(var(--k))}}
.ad.wipe .tab{animation:tabout .32s .5s cubic-bezier(.2,.8,.25,1) both}
.ad.wipe .tab.t-up{--tf:translateY(100%)}.ad.wipe .tab.t-down{--tf:translateY(-100%)}.ad.wipe .tab.t-left{--tf:translateX(100%)}
@keyframes tabout{from{transform:var(--tf)}}
.objimg{z-index:5;object-fit:contain;pointer-events:none}
.edge{inset:0;width:100%;height:100%;z-index:2}
.gl{inset:0;width:100%;height:100%;z-index:5;pointer-events:none}
/* app */
.app-bg{inset:0;z-index:0}
.band{left:0;top:0;width:100%;z-index:4;overflow:visible}
.phone-wrap{z-index:3;animation:phbob 6s ease-in-out infinite}
@keyframes phbob{50%{transform:translateY(-10px)}}
.ap-goal{left:8%;right:8%;top:30.6%;height:calc(var(--P)*.022);border-radius:99px;background:#EFE6DC;overflow:hidden}
.ap-goal i{left:0;top:0;bottom:0;width:0;border-radius:99px;background:#FF5A1E}
.scr.has-goal .ap-rows{top:36%}
.phone{position:relative;width:var(--P);height:calc(var(--P)*2.06);border-radius:calc(var(--P)*.14);background:#151515;padding:calc(var(--P)*.028);box-shadow:0 calc(var(--P)*.06) calc(var(--P)*.16) rgba(0,0,0,.28)}
.phone::before{content:"";position:absolute;z-index:2;top:calc(var(--P)*.045);left:50%;width:30%;height:calc(var(--P)*.06);border-radius:99px;background:#111;transform:translateX(-50%)}
.scr{position:relative;width:100%;height:100%;border-radius:calc(var(--P)*.115);background:#FDF5EC;overflow:hidden;font-family:'Schibsted Grotesk',Arial,sans-serif;color:#151515}
.scr *{position:absolute}
.ap-logo{left:8%;top:9.5%;width:calc(var(--P)*.17);height:calc(var(--P)*.048);background:var(--kite);-webkit-mask:var(--logo) left center/contain no-repeat;mask:var(--logo) left center/contain no-repeat}
.ap-tot{left:8%;top:17%;font-weight:800;font-size:calc(var(--P)*.165);letter-spacing:-.03em;white-space:nowrap}
.ap-sub{left:8.5%;top:27.2%;font-size:calc(var(--P)*.034);color:#9B958E;opacity:0;transition:opacity .4s}
.ap-rows{left:8%;right:8%;top:33%;height:30%}
.ap-row{position:relative;display:flex;justify-content:space-between;align-items:flex-start;height:calc(var(--P)*.17);border-top:1px solid #EFE6DC;padding-top:calc(var(--P)*.03);opacity:0;transform:translateY(8px);transition:opacity .35s,transform .35s}
.ap-row *{position:static}
.ap-row div{display:flex;flex-direction:column;gap:calc(var(--P)*.008)}
.ap-row b{font-weight:700;font-size:calc(var(--P)*.043)}
.ap-row small{font-size:calc(var(--P)*.03);color:#A39C94}
.ap-row em{font-style:normal;font-weight:700;font-size:calc(var(--P)*.04);color:#FF5A1E}
.ap-row.on{opacity:1;transform:none}
.ap-btn{left:8%;right:8%;bottom:7%;height:calc(var(--P)*.13);border-radius:calc(var(--P)*.03);background:#FF5A1E;color:#fff;font-weight:700;font-size:calc(var(--P)*.04);display:grid;place-items:center;opacity:0;transform:translateY(10px);transition:opacity .35s,transform .35s,background .3s}
.ap-btn.flash{opacity:1;transform:none;background:#FFF3B0;color:transparent}
.ap-btn.on{opacity:1;transform:none}
.scr.live .ap-sub{opacity:1}
@media (prefers-reduced-motion:reduce){.ad *{animation:none!important;transition:none!important}}
`;

  const tpl = document.createElement('template');
  tpl.innerHTML = `<style>${CSS}</style>
<div class="eng">
  <div class="tile ctrl">
    <div class="head"><p class="label" data-label></p><h3 class="h-m" style="margin:0" data-heading></h3></div>
    <div class="autorow"><button class="tsw" type="button" role="switch" aria-checked="true" aria-label="Auto demo" data-auto></button><p class="small muted" data-autotext></p></div>
    <div class="kgroups" data-groups></div>
  </div>
  <div class="tile preview">
    <div class="stage" data-stage><div class="adbox" data-adbox><div class="ad" data-ad></div></div></div>
    <div class="readout"><p class="small" data-combo></p></div>
  </div>
</div>`;

  const APPLE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1zM13.9 5c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z' fill='%23000'/%3E%3C/svg%3E";

  function ensureFonts() {
    if (document.querySelector('link[data-kite-fonts]')) return;
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.dataset.kiteFonts = '1';
    l.href = 'https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;600;700;800;900&family=Inter+Tight:wght@400;500;600;700&display=swap';
    document.head.appendChild(l);
  }

  class KiteEngine extends HTMLElement {
    connectedCallback() {
      if (this._ready) return; this._ready = true;
      ensureFonts();
      const root = this.attachShadow({ mode: 'open' });
      root.appendChild(tpl.content.cloneNode(true));
      this.$ = s => root.querySelector(s);
      this.root = root;
      root.host.style.setProperty('--logo', `url("${LOGO}")`);
      root.host.style.setProperty('--apple', `url("${APPLE}")`);
      let media = this.getAttribute('media') || (SCRIPT_BASE + 'media/');
      if (!/\/$/.test(media)) media += '/';
      this.M = new URL(media, location.href).href;
      let init = {}; try { init = JSON.parse(this.getAttribute('init') || '{}'); } catch (e) { }
      const si = typeof init.style === 'string' ? ENGINES.findIndex(e => e.id === init.style) : Number(init.style) || 0;
      this.style_ = Math.max(0, si);
      this.states = ENGINES.map(e => Object.assign({}, e.init, (init.states || {})[e.id] || {}));
      if (init.lang != null || init.format != null) this.states.forEach(s => { if (init.lang != null) s.lang = +init.lang; if (init.format != null) s.format = +init.format; });
      this.$('[data-label]').textContent = this.getAttribute('label') || 'Demo';
      const hd = this.getAttribute('heading') || 'Explore any concept across styles, formats and markets.';
      const h2 = this.getAttribute('heading2');
      this.$('[data-heading]').innerHTML = esc(hd) + (h2 ? `<br><span class="muted">${esc(h2)}</span>` : '');
      this.$('[data-autotext]').textContent = this.getAttribute('auto-text') || 'Auto demo. Tap any option to take over.';
      this.comboText = this.getAttribute('combo') || 'possible variations from one concept. Every delivered asset reviewed by our team.';
      this.pool = {};
      this.auto = this.getAttribute('autoplay') !== 'false' && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.$('[data-auto]').setAttribute('aria-checked', String(this.auto));
      this.$('[data-auto]').addEventListener('click', () => { this.auto = !this.auto; this.$('[data-auto]').setAttribute('aria-checked', String(this.auto)); });
      this.$('[data-groups]').addEventListener('click', e => {
        const b = e.target.closest('.pill'); if (!b) return;
        this.auto = false; this.$('[data-auto]').setAttribute('aria-checked', 'false');
        this.set(b.dataset.g, +b.dataset.i);
      });
      this.buildGroups(false);
      this.lockCtrl();
      this.render();
      if (document.fonts) document.fonts.ready.then(() => { this.lockCtrl(); this.fit(); });
      let lw = innerWidth;
      this.onResize = () => { if (innerWidth !== lw) { lw = innerWidth; this.lockCtrl(); } this.fit(); };
      addEventListener('resize', this.onResize);
      this.ro = new ResizeObserver(() => this.fit()); this.ro.observe(this.$('[data-stage]'));
      this.io = new IntersectionObserver(es => { this.visible = es[0].isIntersecting; this.playState(); if (this.visible && !this.warmed) { this.warmed = true; setTimeout(() => this.preloadKnit(FORMATS[this.S.format]), 2500); } }, { threshold: 0.15 });
      this.io.observe(this);
      this.timer = setInterval(() => this.autoStep(), 2400);
      this.steps = 0;
    }
    disconnectedCallback() { removeEventListener('resize', this.onResize); clearInterval(this.timer); this.ro && this.ro.disconnect(); this.io && this.io.disconnect(); this.stopKnit(); if (this.obj) { this.obj.destroy(); this.obj = null; } }
    /* the control panel is as tall as the tallest style needs, so switching styles never resizes the engine */
    lockCtrl() {
      const ctrl = this.$('.tile.ctrl'), cur = this.style_;
      ctrl.style.minHeight = '';
      if (window.matchMedia && matchMedia('(max-width:900px)').matches) return;
      let mx = 0;
      for (let i = 0; i < ENGINES.length; i++) { this.style_ = i; this.buildGroups(false); mx = Math.max(mx, ctrl.offsetHeight); }
      this.style_ = cur; this.buildGroups(false);
      ctrl.style.minHeight = mx + 'px';
    }
    get E() { return ENGINES[this.style_]; }
    get S() { return this.states[this.style_]; }
    buildGroups(anim) {
      const E = this.E, S = this.S;
      const pills = (g, opts, cur) => opts.map((o, i) => `<button class="pill" type="button" data-g="${g}" data-i="${i}" aria-pressed="${i === cur}">${esc(o.n)}</button>`).join('');
      let h = `<div class="group is-style"><p class="label">Style</p><div class="pills">${pills('style', ENGINES.map(e => ({ n: e.name })), this.style_)}</div></div>`;
      E.all.forEach((g, k) => { h += `<div class="group${anim ? ' sw' : ''}" style="--gi:${k}"><p class="label">${esc(g.label)}</p><div class="pills">${pills(g.key, g.opts, S[g.key])}</div></div>`; });
      this.$('[data-groups]').innerHTML = h;
    }
    set(key, i) {
      if (key === 'style') {
        if (i === this.style_) return;
        const lang = this.S.lang, fmt = this.S.format;
        this.style_ = i; this.S.lang = lang; this.S.format = fmt;
        this.buildGroups(true); this.render('style'); return;
      }
      if (this.S[key] === i) return;
      this.S[key] = i;
      this.$('[data-groups]').querySelectorAll(`.pill[data-g="${key}"]`).forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.i === i)));
      this.render(key);
    }
    autoStep() {
      if (!this.auto || !this.visible || document.hidden) return;
      this.steps++;
      if (this.steps % 5 === 0) { this.set('style', (this.style_ + 1) % ENGINES.length); return; }
      const gs = this.E.all.filter(g => g.key !== 'lang' || Math.random() < 0.5);
      const g = gs[Math.floor(Math.random() * gs.length)];
      let i = Math.floor(Math.random() * (g.opts.length - 1)); if (i >= this.S[g.key]) i++;
      this.set(g.key, i);
    }
    fit() {
      const F = FORMATS[this.S.format], st = this.$('[data-stage]');
      const sw = st.clientWidth;
      if (window.matchMedia && matchMedia('(max-width:900px)').matches) st.style.height = px(Math.min(innerHeight * 0.66, sw * F.h / F.w + 8));
      else st.style.height = '';
      const sh = st.clientHeight || sw;
      const k = Math.min(sw / F.w, (sh - 4) / F.h) * 0.98;
      this.k = k;
      const bw = Math.floor(F.w * k), bh = Math.floor(F.h * k);
      const box = this.$('[data-adbox]'); box.style.width = bw + 'px'; box.style.height = bh + 'px';
      const kc = Math.max((bw + 0.5) / F.w, (bh + 0.5) / F.h);
      const ad = this.$('[data-ad]'); ad.style.width = px(F.w); ad.style.height = px(F.h); ad.style.transform = `scale(${kc})`;
      return k;
    }
    pooled(tag, src) {
      const key = tag + src;
      if (!this.pool[key]) {
        const el = document.createElement(tag);
        if (tag === 'video') { el.muted = true; el.loop = true; el.playsInline = true; el.setAttribute('muted', ''); el.setAttribute('playsinline', ''); el.preload = 'auto'; }
        el.src = src; this.pool[key] = el;
      }
      return this.pool[key];
    }
    render(key) {
      const E = this.E, S = this.S, F = FORMATS[S.format], li = S.lang;
      const k = this.fit();
      const out = E.render(S, F, li, this.M);
      const ad = this.$('[data-ad]');
      ad.style.background = out.bg; this.$('[data-adbox]').style.background = out.bg;
      this.stopKnit();
      /* the field covers the frame and settles only when the layout changes, not when the language changes */
      ad.classList.toggle('wipe', key !== 'lang' && key !== 'resize');
      ad.innerHTML = out.html;
      /* reuse media elements so switching options never reloads the video */
      ad.querySelectorAll('video[data-src]').forEach(v => {
        const p = this.pooled('video', v.dataset.src); p.poster = v.getAttribute('poster') || '';
        p.style.cssText = v.style.cssText; v.replaceWith(p);
      });
      const kn = ad.querySelector('.media.knit');
      if (kn) {
        const imgs = [...kn.querySelectorAll('img[data-src]')].map((im, i) => { const p = this.pooled('img', im.dataset.src); p.className = i ? '' : 'on'; p.alt = ''; im.replaceWith(p); return p; });
        /* stop-motion starts only once every frame of the loop is decoded, so it never stutters or flashes empty */
        const token = this.knitTok = (this.knitTok || 0) + 1;
        Promise.all(imgs.map(im => (im.complete && im.naturalWidth) ? (im.decode ? im.decode().catch(() => {}) : 0) : new Promise(r => { im.addEventListener('load', r, { once: true }); im.addEventListener('error', r, { once: true }); }))).then(() => {
          if (token !== this.knitTok) return;
          let f = 0; this.knitTimer = setInterval(() => { if (!this.visible) return; imgs[f].className = ''; f = (f + 1) % imgs.length; imgs[f].className = 'on'; }, 1000 / 6);
        });
        this.preloadKnit(F);
      }
      if (out.three) {
        const cv = ad.querySelector('canvas.gl');
        if (!this.obj) { this.objCanvas = document.createElement('canvas'); this.objCanvas.className = 'gl'; this.obj = new ObjectStage(this.objCanvas, this.M); }
        cv.replaceWith(this.objCanvas);
        this.obj.svgPath = ad.querySelector('svg.edge path');
        this.obj.host = ad;
        this.obj.show(Object.assign({ rise: !key || key === 'style' || key === 'format' }, out.three), F.w, F.h, k);
        this.obj.paused = false;
      } else if (this.obj) { this.obj.paused = true; }
      this.fitText(ad);
      if (document.fonts && document.fonts.status !== 'loaded') document.fonts.ready.then(() => this.fitText(ad));
      this.typers(ad);
      if (ad.querySelector('.phone')) this.runPhone(ad.querySelector('.phone'));
      this.playState();
      /* readout */
      this.$('[data-combo]').innerHTML = `<b>${E.total.toLocaleString('en-US')}</b> variations in this style, <b>${GRAND.toLocaleString('en-US')}</b> ${esc(this.comboText)}`;
    }
    /* warm the browser cache with every embroidery of the current format, so switching item or style shows the stitch loop at once */
    preloadKnit(F) {
      const K = ENGINES.find(e => e.id === 'knit'); if (!K) return;
      const go = () => KNIT.items.forEach(it => K.frames(it, F).files.forEach(f => this.pooled('img', this.M + f)));
      (window.requestIdleCallback || (fn => setTimeout(fn, 400)))(go);
    }
    stopKnit() { this.knitTok = (this.knitTok || 0) + 1; clearInterval(this.knitTimer); this.knitTimer = 0; clearInterval(this.phoneTimer); this.phoneTimer = 0; clearInterval(this.typeTimer); }
    fitText(ad) {
      ad.querySelectorAll('[data-fit]').forEach(el => {
        const max = +el.dataset.fit; if (!max) return;
        let fs = parseFloat(el.style.fontSize), n = 0;
        const wid = () => el.classList.contains('hl') ? Math.max(...[...el.children].map(c => c.scrollWidth)) : el.scrollWidth;
        while (wid() > max && n++ < 30) { fs *= 0.95; el.style.fontSize = fs + 'px'; }
      });
    }
    typers(ad) {
      const ts = [...ad.querySelectorAll('.typer')]; if (!ts.length) return;
      ts.forEach(t => { t.textContent = ''; });
      let i = 0; const all = ts.map(t => t.dataset.text);
      const start = performance.now() + 700;
      this.typeTimer = setInterval(() => {
        if (performance.now() < start) return;
        i++; let left = i;
        ts.forEach((t, k) => { const s = all[k]; t.textContent = s.slice(0, Math.max(0, Math.min(s.length, left))); left -= s.length; });
        if (left > 6) clearInterval(this.typeTimer);
      }, 55);
    }
    runPhone(ph) {
      const scr = ph.querySelector('.scr'), bar = ph.querySelector('.ap-goal i'), tot = ph.querySelector('.ap-tot'), rows = [...ph.querySelectorAll('.ap-row')], btn = ph.querySelector('.ap-btn');
      const total = +tot.dataset.total, nf = new Intl.NumberFormat(tot.dataset.loc, { style: 'currency', currency: 'EUR' });
      let t0 = performance.now();
      const tick = () => {
        const t = (performance.now() - t0) / 1000, dur = 2.6;
        const p = Math.min(1, t / dur), e = 1 - Math.pow(1 - p, 3);
        tot.textContent = nf.format(total * e);
        scr.classList.toggle('live', t > 0.35);
        rows.forEach((r, i) => r.classList.toggle('on', t > 0.7 + i * 0.45));
        if (bar) bar.style.width = (100 * +bar.dataset.pct * e).toFixed(1) + '%';
        btn.classList.toggle('flash', t > 2.3 && t < 2.6); btn.classList.toggle('on', t >= 2.6);
        if (t > 6.2) t0 = performance.now();
      };
      tick(); this.phoneTimer = setInterval(tick, 50);
    }
    playState() {
      const on = this.visible !== false && !document.hidden;
      this.$('[data-ad]').querySelectorAll('video').forEach(v => { if (on) { const p = v.play(); p && p.catch(() => { }); } else v.pause(); });
      if (this.obj) this.obj.paused = !on || !this.E.id === 'object' || this.E.id !== 'object';
    }
  }
  if (!customElements.get('kite-engine')) customElements.define('kite-engine', KiteEngine);

})();
