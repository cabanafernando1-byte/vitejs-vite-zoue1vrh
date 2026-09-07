import React, { useState, useEffect, useRef } from 'react';

// Tipografía Lexend
const linkLexend = document.createElement('link');
linkLexend.rel = 'stylesheet';
linkLexend.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&display=swap';
if (!document.head.querySelector('link[href*="Lexend"]')) {
  document.head.appendChild(linkLexend);
}

/* -------------------------------------------------------------------------- */
/*  Paleta oficial V0 (Atril oscuro #0b1120 + Acento Terracota)                */
/* -------------------------------------------------------------------------- */
const C = {
  bg: '#0b1120',
  card: '#121a2d',
  soft: '#1a2438',
  fg: '#eef0f5',
  muted: '#8b94a8',
  primary: '#e07a4f',
  chord: '#f08a5d',
  border: 'rgba(238, 240, 245, 0.08)',
};

/* -------------------------------------------------------------------------- */
/*  Iconos de la Intro (Vectoriales exactos de tus instrumentos)              */
/* -------------------------------------------------------------------------- */
const IconoGuitarra = () => (
  <svg width="120" height="120" viewBox="0 0 512 512" fill="none">
    <path d="M430 40 L470 75 L415 130 L375 95 Z" fill="#b4533c" stroke="#1e1e1e" strokeWidth="14" strokeLinejoin="round"/>
    <path d="M400 110 L230 280 L200 250 L370 80 Z" fill="#e29578" stroke="#1e1e1e" strokeWidth="14" strokeLinejoin="round"/>
    <path d="M220 230 C270 200 320 270 290 320 C320 370 270 440 180 470 C90 500 30 430 40 350 C50 270 120 220 180 270 Z" fill="#b4533c" stroke="#1e1e1e" strokeWidth="16" strokeLinejoin="round"/>
    <circle cx="180" cy="330" r="40" fill="#588157" stroke="#1e1e1e" strokeWidth="14"/>
    <circle cx="180" cy="330" r="24" fill="#6c757d"/>
    <rect x="90" y="360" width="70" height="40" rx="8" transform="rotate(-40 125 380)" fill="#1e1e1e"/>
    <rect x="98" y="368" width="54" height="24" rx="4" transform="rotate(-40 125 380)" fill="#f8fafc"/>
  </svg>
);

const IconoPiano = () => (
  <svg width="130" height="110" viewBox="0 0 512 400" fill="none">
    <rect x="20" y="20" width="472" height="360" rx="28" fill="#4a4e69" stroke="#1e1e1e" strokeWidth="18"/>
    <line x1="20" y1="130" x2="492" y2="130" stroke="#1e1e1e" strokeWidth="16"/>
    <line x1="50" y1="55" x2="50" y2="95" stroke="#1e1e1e" strokeWidth="14" strokeLinecap="round"/>
    <line x1="75" y1="55" x2="75" y2="95" stroke="#1e1e1e" strokeWidth="14" strokeLinecap="round"/>
    <line x1="100" y1="55" x2="100" y2="95" stroke="#1e1e1e" strokeWidth="14" strokeLinecap="round"/>
    <rect x="135" y="45" width="180" height="50" rx="8" fill="#80ed99" stroke="#1e1e1e" strokeWidth="12"/>
    <circle cx="365" cy="70" r="18" fill="#adb5bd" stroke="#1e1e1e" strokeWidth="12"/>
    <circle cx="430" cy="70" r="18" fill="#f77f00" stroke="#1e1e1e" strokeWidth="12"/>
    <g transform="translate(36, 145)">
      <rect x="0" y="0" width="60" height="220" fill="#f8fafc" stroke="#1e1e1e" strokeWidth="12"/>
      <rect x="62" y="0" width="60" height="220" fill="#f8fafc" stroke="#1e1e1e" strokeWidth="12"/>
      <rect x="124" y="0" width="60" height="220" fill="#f8fafc" stroke="#1e1e1e" strokeWidth="12"/>
      <rect x="186" y="0" width="60" height="220" fill="#f8fafc" stroke="#1e1e1e" strokeWidth="12"/>
      <rect x="248" y="0" width="60" height="220" fill="#f8fafc" stroke="#1e1e1e" strokeWidth="12"/>
      <rect x="310" y="0" width="60" height="220" fill="#f8fafc" stroke="#1e1e1e" strokeWidth="12"/>
      <rect x="372" y="0" width="68" height="220" fill="#f8fafc" stroke="#1e1e1e" strokeWidth="12"/>
      <rect x="42" y="0" width="36" height="130" rx="6" fill="#1e1e1e"/>
      <rect x="106" y="0" width="36" height="130" rx="6" fill="#1e1e1e"/>
      <rect x="230" y="0" width="36" height="130" rx="6" fill="#1e1e1e"/>
      <rect x="292" y="0" width="36" height="130" rx="6" fill="#1e1e1e"/>
      <rect x="354" y="0" width="36" height="130" rx="6" fill="#1e1e1e"/>
    </g>
  </svg>
);

const IconoBateria = () => (
  <svg width="130" height="130" viewBox="0 0 512 512" fill="none">
    <rect x="135" y="70" width="110" height="75" rx="14" fill="#b4533c" stroke="#1e1e1e" strokeWidth="14"/>
    <rect x="130" y="60" width="120" height="22" rx="10" fill="#f6bd60" stroke="#1e1e1e" strokeWidth="12"/>
    <rect x="275" y="70" width="110" height="75" rx="14" fill="#b4533c" stroke="#1e1e1e" strokeWidth="14"/>
    <rect x="270" y="60" width="120" height="22" rx="10" fill="#f6bd60" stroke="#1e1e1e" strokeWidth="12"/>
    <rect x="25" y="190" width="130" height="170" rx="16" fill="#b4533c" stroke="#1e1e1e" strokeWidth="14"/>
    <rect x="20" y="180" width="140" height="24" rx="12" fill="#f6bd60" stroke="#1e1e1e" strokeWidth="12"/>
    <line x1="55" y1="230" x2="55" y2="310" stroke="#1e1e1e" strokeWidth="12" strokeLinecap="round"/>
    <line x1="90" y1="230" x2="90" y2="310" stroke="#1e1e1e" strokeWidth="12" strokeLinecap="round"/>
    <line x1="125" y1="230" x2="125" y2="310" stroke="#1e1e1e" strokeWidth="12" strokeLinecap="round"/>
    <rect x="350" y="240" width="140" height="60" rx="14" fill="#b4533c" stroke="#1e1e1e" strokeWidth="14"/>
    <rect x="345" y="230" width="150" height="22" rx="10" fill="#f6bd60" stroke="#1e1e1e" strokeWidth="12"/>
    <circle cx="260" cy="350" r="115" fill="#f6bd60" stroke="#1e1e1e" strokeWidth="20"/>
    <circle cx="260" cy="350" r="85" fill="#f6bd60" stroke="#1e1e1e" strokeWidth="14" strokeDasharray="140 30"/>
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Motor de Notas y Transposición                                            */
/* -------------------------------------------------------------------------- */
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const FLAT_TO_SHARP = { Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#' };
const INDICES_NOTAS = {
  "C": 0, "C#": 1, "Db": 1, "D": 2, "D#": 3, "Eb": 3,
  "E": 4, "F": 5, "F#": 6, "Gb": 6, "G": 7, "G#": 8,
  "Ab": 8, "A": 9, "A#": 10, "Bb": 10, "B": 11
};

function transposeChord(chord, steps) {
  if (!chord || steps === 0) return chord;
  return chord.replace(/([A-G][#b]?)/g, (root) => {
    const normalized = FLAT_TO_SHARP[root] || root;
    const index = NOTES.indexOf(normalized);
    if (index === -1) return root;
    return NOTES[(index + steps + 144) % 12];
  });
}

/* -------------------------------------------------------------------------- */
/*  Cálculo Algorítmico de Acordes (CAGED / Cejillas)                         */
/* -------------------------------------------------------------------------- */
function calcularDiagramaAcorde(nombreAcorde) {
  if (!nombreAcorde) return null;
  const limpio = nombreAcorde.split('/')[0].trim();
  const match = limpio.match(/^([A-G][b#]?)(.*)$/);
  if (!match) return null;

  const [, raiz, tipo] = match;
  const norm = FLAT_TO_SHARP[raiz] || raiz;
  const semitonoRaiz = INDICES_NOTAS[norm];
  if (semitonoRaiz === undefined) return null;

  const basicos = {
    "C": { frets: [-1, 3, 2, 0, 1, 0] },
    "C7": { frets: [-1, 3, 2, 3, 1, -1] },
    "D": { frets: [-1, -1, 0, 2, 3, 2] },
    "D9": { frets: [-1, -1, 0, 2, 3, 0] },
    "Dm": { frets: [-1, -1, 0, 2, 3, 1] },
    "E": { frets: [0, 2, 2, 1, 0, 0] },
    "E4": { frets: [0, 2, 2, 2, 0, 0] },
    "Em": { frets: [0, 2, 2, 0, 0, 0] },
    "G": { frets: [3, 2, 0, 0, 0, 3] },
    "A": { frets: [-1, 0, 2, 2, 2, 0] },
    "A9": { frets: [-1, 0, 2, 2, 0, 0] },
    "Am": { frets: [-1, 0, 2, 2, 1, 0] },
    "Am7": { frets: [-1, 0, 2, 0, 1, 0] },
    "A7": { frets: [-1, 0, 2, 0, 2, 0] },
    "B7": { frets: [-1, 2, 1, 2, 0, 2] },
    "Bm7": { frets: [-1, 2, 0, 2, 0, 2] },
    "D#m7(b5)": { frets: [-1, -1, 1, 2, 2, 2] },
    "Bm7(b5)": { frets: [-1, 2, 3, 2, 3, -1] },
    "Em7(5b)": { frets: [-1, -1, 2, 3, 3, 3] },
  };

  if (basicos[limpio]) return basicos[limpio];

  if (tipo === "m") {
    let t6 = (semitonoRaiz - 4 + 12) % 12;
    if (t6 >= 1 && t6 <= 8) {
      return { baseFret: t6, barre: { fret: t6, from: 0, to: 5 }, frets: [t6, t6 + 2, t6 + 2, t6, t6, t6] };
    }
    let t5 = (semitonoRaiz - 9 + 12) % 12;
    return { baseFret: t5, barre: { fret: t5, from: 1, to: 5 }, frets: [-1, t5, t5 + 2, t5 + 2, t5 + 1, t5] };
  }

  if (tipo === "7") {
    let t6 = (semitonoRaiz - 4 + 12) % 12;
    if (t6 >= 1 && t6 <= 8) {
      return { baseFret: t6, barre: { fret: t6, from: 0, to: 5 }, frets: [t6, t6 + 2, t6, t6 + 1, t6, t6] };
    }
    let t5 = (semitonoRaiz - 9 + 12) % 12;
    return { baseFret: t5, barre: { fret: t5, from: 1, to: 5 }, frets: [-1, t5, t5 + 2, t5, t5 + 2, t5] };
  }

  let t6 = (semitonoRaiz - 4 + 12) % 12;
  if (t6 >= 1 && t6 <= 8) {
    return { baseFret: t6, barre: { fret: t6, from: 0, to: 5 }, frets: [t6, t6 + 2, t6 + 2, t6 + 1, t6, t6] };
  }
  let t5 = (semitonoRaiz - 9 + 12) % 12;
  return { baseFret: t5, barre: { fret: t5, from: 1, to: 5 }, frets: [-1, t5, t5 + 2, t5 + 2, t5 + 2, t5] };
}

/* -------------------------------------------------------------------------- */
/*  Componente Diagrama de Acordes SVG Estilo V0                              */
/* -------------------------------------------------------------------------- */
const STRINGS = 6;
const FRETS = 4;
const W = 64;
const H = 72;
const PAD_X = 8;
const PAD_TOP = 12;
const GRID_W = W - PAD_X * 2;
const GRID_H = H - PAD_TOP - 6;
const STRING_GAP = GRID_W / (STRINGS - 1);
const FRET_GAP = GRID_H / FRETS;

function DiagramaAcordeV0({ name }) {
  const shape = calcularDiagramaAcorde(name) || { frets: [-1, -1, 0, 2, 3, 2] };
  const baseFret = shape.baseFret || 1;

  return (
    <figure
      style={{
        background: C.card,
        boxShadow: `inset 0 0 0 1px ${C.border}`,
        borderRadius: '12px',
        width: '76px',
        padding: '6px 4px 8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
        margin: 0
      }}
    >
      <figcaption style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: '700', color: C.chord, marginBottom: '2px' }}>
        {name}
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        {baseFret === 1 ? (
          <rect x={PAD_X - 1} y={PAD_TOP - 3} width={GRID_W + 2} height={3} rx={1} fill={C.fg} />
        ) : (
          <text x={PAD_X - 5} y={PAD_TOP + FRET_GAP / 2 + 3} fontSize={8} fill={C.fg} opacity={0.6} textAnchor="middle" fontFamily="monospace">
            {baseFret}
          </text>
        )}
        {Array.from({ length: FRETS + 1 }).map((_, i) => (
          <line key={`f${i}`} x1={PAD_X} x2={PAD_X + GRID_W} y1={PAD_TOP + i * FRET_GAP} y2={PAD_TOP + i * FRET_GAP} stroke={C.fg} strokeOpacity={0.35} strokeWidth={1} />
        ))}
        {Array.from({ length: STRINGS }).map((_, i) => (
          <line key={`s${i}`} x1={PAD_X + i * STRING_GAP} x2={PAD_X + i * STRING_GAP} y1={PAD_TOP} y2={PAD_TOP + GRID_H} stroke={C.fg} strokeOpacity={0.5} strokeWidth={1} />
        ))}
        {shape.barre && (
          <rect
            x={PAD_X + shape.barre.from * STRING_GAP - 3}
            y={PAD_TOP + (shape.barre.fret - baseFret) * FRET_GAP + FRET_GAP / 2 - 3.5}
            width={(shape.barre.to - shape.barre.from) * STRING_GAP + 6}
            height={7}
            rx={3.5}
            fill={C.chord}
          />
        )}
        {shape.frets.map((fret, i) => {
          const x = PAD_X + i * STRING_GAP;
          if (fret === -1) return <text key={`x${i}`} x={x} y={PAD_TOP - 4} fontSize={8} textAnchor="middle" fill={C.fg} opacity={0.5}>×</text>;
          if (fret === 0) return <circle key={`o${i}`} cx={x} cy={PAD_TOP - 6} r={2.2} fill="none" stroke={C.fg} strokeOpacity={0.6} strokeWidth={1} />;
          const inBarre = shape.barre && fret === shape.barre.fret && i >= shape.barre.from && i <= shape.barre.to;
          if (inBarre) return null;
          return <circle key={`d${i}`} cx={x} cy={PAD_TOP + (fret - baseFret) * FRET_GAP + FRET_GAP / 2} r={3.8} fill={C.chord} />;
        })}
      </svg>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  Formato de Etiquetas y Render ChordPro                                    */
/* -------------------------------------------------------------------------- */
function formatearEtiqueta(himno) {
  if (!himno.numero || himno.numero.trim() === '') return '';
  const num = himno.numero.trim();
  if (himno.categoria === 'Suplementarios') return `S-${num}`;
  if (himno.categoria === 'Complementarios') return `C-${num}`;
  if (himno.categoria === 'Himnos') return `H-${num}`;
  return '';
}

function RenderLineaChordPro({ linea, semitonos }) {
  const lineaTrim = linea.trim();
  if (!lineaTrim) return <div style={{ height: '14px' }} />;

  const esSeccion = /^(ESTROFA|CORO|PUENTE|INTRO|CODA)/i.test(lineaTrim);
  if (esSeccion) {
    return (
      <div style={{
        marginTop: '20px',
        marginBottom: '6px',
        fontWeight: '700',
        fontSize: '0.75em',
        color: C.muted,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        fontFamily: 'monospace'
      }}>
        {lineaTrim}
      </div>
    );
  }

  const palabras = linea.split(/(\s+)/);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', minHeight: '36px', margin: '1px 0' }}>
      {palabras.map((palabra, pIdx) => {
        if (/^\s+$/.test(palabra)) {
          return <span key={pIdx} style={{ whiteSpace: 'pre' }}>{palabra}</span>;
        }

        const fragmentos = palabra.split(/(\[[^\]]+\])/g);
        let ultimoAcorde = null;

        return (
          <span key={pIdx} style={{ display: 'inline-flex', alignItems: 'flex-end' }}>
            {fragmentos.map((frag, fIdx) => {
              if (frag.startsWith('[') && frag.endsWith(']')) {
                ultimoAcorde = frag.slice(1, -1);
                return null;
              }

              const textoSilaba = frag;
              const acordeActual = ultimoAcorde;
              ultimoAcorde = null;

              if (acordeActual) {
                return (
                  <span key={fIdx} style={{ display: 'inline-flex', flexDirection: 'column', verticalAlign: 'bottom' }}>
                    <span style={{ fontSize: '0.85em', fontWeight: '700', color: C.chord, lineHeight: '1.2', fontFamily: 'monospace' }}>
                      {transposeChord(acordeActual, semitonos)}
                    </span>
                    <span style={{ lineHeight: '1.25', color: C.fg }}>
                      {textoSilaba || '\u00A0'}
                    </span>
                  </span>
                );
              }

              return (
                <span key={fIdx} style={{ display: 'inline-flex', flexDirection: 'column', verticalAlign: 'bottom' }}>
                  <span style={{ fontSize: '0.85em', lineHeight: '1.2', visibility: 'hidden' }}>.</span>
                  <span style={{ lineHeight: '1.25', color: C.fg }}>{textoSilaba}</span>
                </span>
              );
            })}
            {ultimoAcorde && (
              <span style={{ display: 'inline-flex', flexDirection: 'column', verticalAlign: 'bottom' }}>
                <span style={{ fontSize: '0.85em', fontWeight: '700', color: C.chord, lineHeight: '1.2', fontFamily: 'monospace' }}>
                  {transposeChord(ultimoAcorde, semitonos)}
                </span>
                <span style={{ lineHeight: '1.25' }}>&nbsp;</span>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Componente Principal de la Aplicación                                     */
/* -------------------------------------------------------------------------- */
const FONT_SIZES = [14, 16, 18, 21, 24];
const SPEEDS = [0.5, 1, 1.5, 2];

export default function App() {
  const [faseIntro, setFaseIntro] = useState('punto');
  const [ocultarSplash, setOcultarSplash] = useState(false);

  const [vistaActual, setVistaActual] = useState('menu');
  const [categoriaSel, setCategoriaSel] = useState('Suplementarios');
  const [semitonos, setSemitonos] = useState(0);
  const [fontIdx, setFontIdx] = useState(1);
  const [scrolling, setScrolling] = useState(false);
  const [speed, setSpeed] = useState(1);

  // Formulario
  const [idEditando, setIdEditando] = useState(null);
  const [formCat, setFormCat] = useState('Suplementarios');
  const [formNum, setFormNum] = useState('');
  const [formTitulo, setFormTitulo] = useState('');
  const [formCompas, setFormCompas] = useState('4/4');
  const [formBpm, setFormBpm] = useState('132');
  const [formAutor, setFormAutor] = useState('');
  const [formTono, setFormTono] = useState('Dm');
  const [formCuerpo, setFormCuerpo] = useState('');

  const scrollRef = useRef(null);

  // Himnario persistente
  const [himnos, setHimnos] = useState(() => {
    const local = localStorage.getItem('cifra_nasa_v11');
    return local ? JSON.parse(local) : [
      {
        id: 1,
        categoria: "Nuevos",
        numero: "",
        titulo: "La Nube",
        compas: "4/4",
        bpm: "132",
        autor: "Hebert Faria / Samuel Huh",
        tonoBase: "Dm",
        textoChordPro: `INTRO
[Dm]    [Bb]    [F]    [C]    [Dm]
Oh, oh, oh, oh, oh, oh, oh.

ESTROFA 1
[Dm]Hay una nube que con[Bb]duce la iglesia;
Hay una [F]voz que nos ordena [C]ir a la [Dm]guerra.
¿Quién va a oír el hablar que está fluyendo de Dios?

ESTROFA 2
[Dm]Llegó la hora de de[Bb]jar lo que es impuro,
Llegó el [F]tiempo de crecer y [C]ser madu[Dm]ro.
¿Quién va a luchar y vencer, formar el hijo varón?

CORO
[Bb]¡Heme aquí! No teme[F]ré, ¡atiendo a Tu llama[C]do!
[Dm]Te seguiré, y busca[Bb]ré las cosas [F]de lo al[C]to.
[Gm]¡Obedecer! No duda[Dm]ré, murmuración [Bb]ya de[F]jo.
[Gm]Si no es de Dios, lo olvida[Bb]ré, así en Cristo [F]crezco.[C]

ESTROFA 3
[Dm]Hay una nube y de la i[Bb]glesia ha cuidado;
Hay un e[F]jército por Dios bien [C]prepara[Dm]do.
¿Quién se alistó a servir, traer el reino de Dios?

ESTROFA 4
[Dm]Con Cristo ya no hay lu[Bb]gar a indiferencias;
Con a[F]legría, entusiasmo y [C]exce[Dm]lencia;
¿Quién llevará a su hermano hasta la recta final?`
      },
      {
        id: 2,
        categoria: "Suplementarios",
        numero: "53",
        titulo: "Mídenos, mídenos",
        compas: "4/4",
        bpm: "110",
        autor: "Ez 47:1-12",
        tonoBase: "Dm",
        textoChordPro: `ESTROFA 1
[Dm]Al hogar, al hogar, [Gm]al hogar de Dios,
[C]Donde está el manantial [F]he venido yo,
[Gm]Un fluir hay aquí [Dm]que no cesará,
[A7]Y hace crecer vida [Dm]hasta madurar.

CORO
[Bb]Mídenos, mídenos, [C]mide en verdad,
[F]Mídenos, [Em]mídenos, [Dm]cada día más.
[Bb]Hasta ver que el fluir, [Gm]torrente de Dios,
[C]Inunde la tierra por [F]Cristo el Señor.`
      },
      {
        id: 3,
        categoria: "Nuevos",
        numero: "",
        titulo: "La Visión Irresistible",
        compas: "4/4",
        bpm: "144",
        autor: "Hebert Faria / João Luiz / Samuel Huh",
        tonoBase: "A",
        textoChordPro: `INTRO [2x]
[A]    [A]    [D]    [D]

ESTROFA
[A]La visión que recibí me [A/C#]conquis[D]tó   [D]
Y me [D9]hizo renunciar [Bm7]a lo que [E]soy.   [E]
Aunque [F#m]no la pueda entender,[F#m/E#]
Ni en pa[F#m/E]labras dar a cono[D#m7(b5)]cer,
No me [Dm]puedo resis[F]tir a lo que [E]vi:   [E]

PUENTE
Lo que [Dm]eres, Dios, deseas [Am7]ser en mí.   [Am7]
En [F]gloria me harás [Dm]parte de [E]Ti.   [E]

CORO 1
Me entre[Am]garé.
Nada me impe[Am/G]dirá luchar con[F]tigo,
Y así por el ca[F]mino estrecho [Dm]sigo,
¡Olvi[Dm/C]dando, ciertamente, lo que [Bm7(b5)]queda a[E]trás!`
      }
    ];
  });

  const [himnoActivo, setHimnoActivo] = useState(himnos[0]);

  // Intro cronometrada
  useEffect(() => {
    const t1 = setTimeout(() => setFaseIntro('guitarra'), 700);
    const t2 = setTimeout(() => setFaseIntro('piano'), 1700);
    const t3 = setTimeout(() => setFaseIntro('bateria'), 2700);
    const t4 = setTimeout(() => setFaseIntro('nasa'), 3700);
    const t5 = setTimeout(() => setFaseIntro('bienvenida'), 4900);
    const t6 = setTimeout(() => {
      setFaseIntro('listo');
      setTimeout(() => setOcultarSplash(true), 400);
    }, 6200);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('cifra_nasa_v11', JSON.stringify(himnos));
  }, [himnos]);

  // Auto-scroll loop
  useEffect(() => {
    if (!scrolling || vistaActual !== 'visor') return;
    const el = scrollRef.current;
    if (!el) return;
    let frame = 0;
    let last = performance.now();
    let carry = 0;
    const pxPerSecond = 24 * speed;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      carry += pxPerSecond * dt;
      const step = Math.floor(carry);
      if (step > 0) {
        el.scrollTop += step;
        carry -= step;
      }
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) {
        setScrolling(false);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [scrolling, speed, vistaActual]);

  const acordesDelHimno = (texto) => {
    const matches = texto.match(/\[([^\]]+)\]/g);
    if (!matches) return [himnoActivo.tonoBase];
    const lista = [];
    matches.forEach(m => {
      const ac = m.slice(1, -1).trim();
      if (ac && !lista.includes(ac)) lista.push(ac);
    });
    return lista.length > 0 ? lista : [himnoActivo.tonoBase];
  };

  const descargarPDF = () => {
    const tituloPrevio = document.title;
    const prefijo = formatearEtiqueta(himnoActivo);
    document.title = prefijo ? `${prefijo} - ${himnoActivo.titulo}` : himnoActivo.titulo;
    window.print();
    setTimeout(() => {
      document.title = tituloPrevio;
    }, 1500);
  };

  const abrirEditor = (himno) => {
    setIdEditando(himno.id);
    setFormCat(himno.categoria);
    setFormNum(himno.numero || '');
    setFormTitulo(himno.titulo);
    setFormCompas(himno.compas || '4/4');
    setFormBpm(himno.bpm || '120');
    setFormAutor(himno.autor || '');
    setFormTono(himno.tonoBase || 'C');
    setFormCuerpo(himno.textoChordPro || '');
    setVistaActual('formulario');
  };

  const abrirNuevo = () => {
    setIdEditando(null);
    setFormCat('Suplementarios');
    setFormNum('');
    setFormTitulo('');
    setFormCompas('4/4');
    setFormBpm('120');
    setFormAutor('');
    setFormTono('C');
    setFormCuerpo('');
    setVistaActual('formulario');
  };

  const guardarFormulario = (e) => {
    e.preventDefault();
    if (!formTitulo.trim()) return;

    const objetoHimno = {
      id: idEditando || Date.now(),
      categoria: formCat,
      numero: formCat === 'Nuevos' ? '' : formNum.trim(),
      titulo: formTitulo.trim(),
      compas: formCompas.trim() || '4/4',
      bpm: formBpm.trim() || '120',
      autor: formAutor.trim(),
      tonoBase: formTono,
      textoChordPro: formCuerpo
    };

    if (idEditando) {
      setHimnos(himnos.map(h => h.id === idEditando ? objetoHimno : h));
    } else {
      setHimnos([objetoHimno, ...himnos]);
    }

    setHimnoActivo(objetoHimno);
    setSemitonos(0);
    setVistaActual('visor');
  };

  const navegarAtras = () => {
    setScrolling(false);
    if (vistaActual === 'visor') setVistaActual('lista');
    else if (vistaActual === 'lista') setVistaActual('categorias');
    else if (vistaActual === 'categorias' || vistaActual === 'formulario') setVistaActual('menu');
  };

  const labelSemitonos = semitonos === 0 ? '0' : semitonos > 0 ? `+${semitonos}` : `${semitonos}`;
  const tonoActual = transposeChord(himnoActivo.tonoBase, semitonos);

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Lexend', sans-serif", backgroundColor: C.bg, color: C.fg }}>
      
      {/* Estilos e Impresión PDF en dos columnas */}
      <style>{`
        @keyframes zoomPunto {
          0% { transform: scale(0.4); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .cn-scroll { scrollbar-width: none; }
        .cn-scroll::-webkit-scrollbar { display: none; }
        @media print {
          body, html { background: #ffffff !important; color: #000000 !important; }
          .no-imprimir { display: none !important; }
          .contenedor-visor { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
          .layout-partitura-pdf {
            display: flex !important;
            flex-direction: row-reverse !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
          .carrusel-acordes {
            display: flex !important;
            flex-direction: column !important;
            width: 80px !important;
            background: transparent !important;
            box-shadow: none !important;
            gap: 12px !important;
            padding: 0 !important;
          }
          .area-partitura {
            flex: 1 !important;
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
          }
          .area-partitura * { color: #000000 !important; }
        }
      `}</style>

      {/* SPLASH ANIMATION */}
      {!ocultarSplash && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#9a3412',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px',
          textAlign: 'center',
          transition: 'opacity 0.4s ease',
          opacity: faseIntro === 'listo' ? 0 : 1,
          pointerEvents: faseIntro === 'listo' ? 'none' : 'auto'
        }}>
          {faseIntro === 'punto' && (
            <div style={{ width: '22px', height: '22px', backgroundColor: '#fff', borderRadius: '50%', boxShadow: '0 0 25px #fff', animation: 'zoomPunto 0.5s ease-out' }} />
          )}
          {faseIntro === 'guitarra' && <div style={{ animation: 'zoomPunto 0.35s forwards' }}><IconoGuitarra /></div>}
          {faseIntro === 'piano' && <div style={{ animation: 'zoomPunto 0.35s forwards' }}><IconoPiano /></div>}
          {faseIntro === 'bateria' && <div style={{ animation: 'zoomPunto 0.35s forwards' }}><IconoBateria /></div>}
          {faseIntro === 'nasa' && (
            <div style={{ animation: 'zoomPunto 0.4s forwards' }}>
              <h1 style={{ fontSize: '52px', fontWeight: '800', color: '#fff', letterSpacing: '6px', margin: 0 }}>NASA</h1>
              <p style={{ color: '#fed7aa', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '6px' }}>Cifra • Himnario</p>
            </div>
          )}
          {faseIntro === 'bienvenida' && (
            <div style={{ animation: 'zoomPunto 0.45s forwards' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#ffedd5', margin: '0 0 4px 0' }}>Bienvenido</h2>
              <p style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', margin: 0 }}>Jesús es el Señor</p>
            </div>
          )}
        </div>
      )}

      {/* MENÚ PRINCIPAL */}
      {vistaActual === 'menu' && (
        <main style={{ maxWidth: '440px', margin: '36px auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ backgroundColor: C.primary, color: '#fff', padding: '4px 12px', borderRadius: '8px', fontWeight: '800', fontSize: '15px' }}>Cifra</span>
            <span style={{ fontSize: '18px', fontWeight: '700', marginLeft: '8px', color: C.fg }}>NASA</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div
              onClick={() => setVistaActual('categorias')}
              style={{ backgroundColor: C.card, boxShadow: `inset 0 0 0 1px ${C.border}`, padding: '18px 20px', borderRadius: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <h3 style={{ margin: '0 0 2px 0', fontSize: '16px', fontWeight: '700', color: C.primary }}>📖 Himnos</h3>
                <p style={{ margin: 0, fontSize: '12px', color: C.muted }}>Suplementarios, Complementarios, Himnos y Nuevos</p>
              </div>
              <span style={{ fontSize: '18px', color: C.primary, fontWeight: 'bold' }}>→</span>
            </div>

            <div
              onClick={abrirNuevo}
              style={{ backgroundColor: C.card, boxShadow: `inset 0 0 0 1px ${C.border}`, padding: '18px 20px', borderRadius: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <h3 style={{ margin: '0 0 2px 0', fontSize: '16px', fontWeight: '700', color: '#38bdf8' }}>➕ Agregar Himnos</h3>
                <p style={{ margin: 0, fontSize: '12px', color: C.muted }}>Formato ChordPro profesional [Acorde]</p>
              </div>
              <span style={{ fontSize: '18px', color: '#38bdf8', fontWeight: 'bold' }}>→</span>
            </div>
          </div>
        </main>
      )}

      {/* CATEGORÍAS */}
      {vistaActual === 'categorias' && (
        <main style={{ maxWidth: '440px', margin: '20px auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>Categorías</h2>
            <button onClick={navegarAtras} style={{ background: C.soft, border: 'none', color: C.fg, padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '700' }}>← Volver</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {["Suplementarios", "Complementarios", "Himnos", "Nuevos"].map(cat => (
              <button
                key={cat}
                onClick={() => { setCategoriaSel(cat); setVistaActual('lista'); }}
                style={{ backgroundColor: C.card, boxShadow: `inset 0 0 0 1px ${C.border}`, color: C.fg, padding: '16px', borderRadius: '12px', textAlign: 'left', cursor: 'pointer', fontFamily: "'Lexend', sans-serif", fontSize: '15px', fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none' }}
              >
                <span>{cat}</span>
                <span style={{ color: C.primary, fontWeight: 'bold' }}>→</span>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* LISTA DE HIMNOS */}
      {vistaActual === 'lista' && (
        <main style={{ maxWidth: '480px', margin: '20px auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>{categoriaSel}</h2>
            <button onClick={navegarAtras} style={{ background: C.soft, border: 'none', color: C.fg, padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '700' }}>← Volver</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {himnos.filter(h => h.categoria === categoriaSel).map(h => {
              const prefijo = formatearEtiqueta(h);
              return (
                <div
                  key={h.id}
                  onClick={() => { setHimnoActivo(h); setSemitonos(0); setVistaActual('visor'); }}
                  style={{ backgroundColor: C.card, boxShadow: `inset 0 0 0 1px ${C.border}`, padding: '14px 16px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  {prefijo && <span style={{ fontWeight: '800', color: C.chord, fontSize: '15px' }}>{prefijo}</span>}
                  <div style={{ fontWeight: '600', fontSize: '15px' }}>{h.titulo}</div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* VISOR DE PARTITURA ESTILO V0 */}
      {vistaActual === 'visor' && (
        <div className="contenedor-visor" style={{ height: '100vh', display: 'flex', flexDirection: 'column', maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
          
          {/* Barra Superior V0 */}
          <header className="no-imprimir" style={{ position: 'sticky', top: 0, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', backdropFilter: 'blur(12px)', background: 'rgba(11, 17, 32, 0.9)', borderBottom: `1px solid ${C.border}` }}>
            <button onClick={navegarAtras} style={{ background: 'transparent', border: 'none', color: C.fg, cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Selector de Transposición */}
              <div style={{ display: 'flex', alignItems: 'center', background: C.soft, borderRadius: '999px', padding: '2px 4px' }}>
                <button onClick={() => setSemitonos(s => Math.max(-11, s - 1))} style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: 'transparent', color: C.fg, cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                <span style={{ width: '36px', textAlign: 'center', fontFamily: 'monospace', fontSize: '12px', fontWeight: '700', color: C.chord }}>{labelSemitonos}</span>
                <button onClick={() => setSemitonos(s => Math.min(11, s + 1))} style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: 'transparent', color: C.fg, cursor: 'pointer', fontWeight: 'bold' }}>+</button>
              </div>

              {/* Selector de Tamaño de Letra */}
              <div style={{ display: 'flex', alignItems: 'center', background: C.soft, borderRadius: '999px', padding: '2px 4px' }}>
                <button onClick={() => setFontIdx(i => Math.max(0, i - 1))} disabled={fontIdx === 0} style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: 'transparent', color: C.fg, cursor: 'pointer', fontSize: '11px', fontWeight: '700', opacity: fontIdx === 0 ? 0.3 : 1 }}>A-</button>
                <button onClick={() => setFontIdx(i => Math.min(FONT_SIZES.length - 1, i + 1))} disabled={fontIdx === FONT_SIZES.length - 1} style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: 'transparent', color: C.fg, cursor: 'pointer', fontSize: '13px', fontWeight: '700', opacity: fontIdx === FONT_SIZES.length - 1 ? 0.3 : 1 }}>A+</button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => abrirEditor(himnoActivo)} style={{ background: 'transparent', border: 'none', color: C.muted, cursor: 'pointer', fontSize: '15px' }} title="Editar">✏️</button>
              <button onClick={descargarPDF} style={{ background: 'transparent', border: 'none', color: C.fg, cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px' }} title="Exportar PDF">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M12 18v-6M9 15l3 3 3-3"/></svg>
              </button>
            </div>
          </header>

          {/* Área de Lectura Scrollable */}
          <div ref={scrollRef} className="cn-scroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: '120px' }}>
            <div className="layout-partitura-pdf">
              
              {/* Carrusel de Acordes */}
              <section className="carrusel-acordes" aria-label="Acordes del cántico" style={{ paddingTop: '8px' }}>
                <ul className="cn-scroll" style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '0 16px 6px', margin: 0, listStyle: 'none' }}>
                  {acordesDelHimno(himnoActivo.textoChordPro).map((chord, idx) => (
                    <li key={idx} style={{ flexShrink: 0 }}>
                      <DiagramaAcordeV0 name={transposeChord(chord, semitonos)} />
                    </li>
                  ))}
                </ul>
              </section>

              {/* Tarjeta del Himno */}
              <section style={{ margin: '12px 16px 0', background: C.card, boxShadow: `inset 0 0 0 1px ${C.border}`, borderRadius: '16px', padding: '16px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: C.fg }}>
                    {formatearEtiqueta(himnoActivo) ? `${formatearEtiqueta(himnoActivo)} ` : ''}{himnoActivo.titulo}
                  </h1>
                  <span style={{ background: 'rgba(224,122,79,0.15)', color: C.chord, padding: '2px 8px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '13px', fontWeight: '700' }}>
                    {tonoActual}
                  </span>
                </div>
                {himnoActivo.autor && (
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: C.muted }}>{himnoActivo.autor}</p>
                )}
                <div style={{ marginTop: '10px', display: 'flex', gap: '12px', fontFamily: 'monospace', fontSize: '12px' }}>
                  <span style={{ border: `1px solid ${C.border}`, padding: '2px 6px', borderRadius: '4px', color: 'rgba(238,240,245,0.8)' }}>[{himnoActivo.compas || '4/4'}]</span>
                  <span style={{ border: `1px solid ${C.border}`, padding: '2px 6px', borderRadius: '4px', color: 'rgba(238,240,245,0.8)' }}>[{himnoActivo.bpm ? `${himnoActivo.bpm} bpm` : '120 bpm'}]</span>
                </div>
              </section>

              {/* Letra con Acordes */}
              <article className="area-partitura" style={{ padding: '20px 18px 0', fontSize: `${FONT_SIZES[fontIdx]}px` }}>
                {himnoActivo.textoChordPro.split('\n').map((linea, idx) => (
                  <RenderLineaChordPro key={idx} linea={linea} semitonos={semitonos} />
                ))}
              </article>

            </div>
          </div>

          {/* Barra Flotante de Auto-Scroll Manos Libres V0 */}
          <div className="no-imprimir" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, pointerEvents: 'none', display: 'flex', justifyContent: 'center', padding: '0 16px 16px', zIndex: 30 }}>
            <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(18,26,45,0.92)', backdropFilter: 'blur(12px)', boxShadow: `0 8px 30px rgba(0,0,0,0.5), inset 0 0 0 1px ${C.border}`, borderRadius: '999px', padding: '6px 12px 6px 6px' }}>
              <button
                type="button"
                onClick={() => setScrolling(s => !s)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '999px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  background: scrolling ? C.primary : C.soft,
                  color: scrolling ? C.bg : C.fg
                }}
              >
                <span>{scrolling ? '⏸ Pausar' : '▶ Auto-scroll'}</span>
              </button>

              <div style={{ display: 'flex', gap: '2px' }}>
                {SPEEDS.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSpeed(s)}
                    style={{
                      height: '28px',
                      minWidth: '34px',
                      borderRadius: '999px',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      background: speed === s ? 'rgba(224,122,79,0.2)' : 'transparent',
                      color: speed === s ? C.chord : C.muted
                    }}
                  >
                    {s}×
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* FORMULARIO AGREGAR / EDITAR */}
      {vistaActual === 'formulario' && (
        <main style={{ maxWidth: '480px', margin: '20px auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>
              {idEditando ? '✏️ Editar Himno' : '➕ Agregar Nuevo Himno'}
            </h2>
            <button onClick={navegarAtras} style={{ background: C.soft, border: 'none', color: C.fg, padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '700' }}>← Volver</button>
          </div>

          <form onSubmit={guardarFormulario} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: C.muted }}>Categoría:</label>
              <select
                value={formCat}
                onChange={e => setFormCat(e.target.value)}
                style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.fg, fontFamily: "'Lexend', sans-serif" }}
              >
                <option value="Suplementarios">Suplementarios (S-)</option>
                <option value="Complementarios">Complementarios (C-)</option>
                <option value="Himnos">Himnos (H-)</option>
                <option value="Nuevos">Nuevos (Sin número)</option>
              </select>
            </div>

            {formCat !== 'Nuevos' && (
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: C.muted }}>Número (solo dígitos):</label>
                <input
                  type="text"
                  placeholder="Ej: 53"
                  value={formNum}
                  onChange={e => setFormNum(e.target.value)}
                  style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.fg, boxSizing: 'border-box' }}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: C.muted }}>Título del cántico:</label>
              <input
                type="text"
                placeholder="Nombre del cántico..."
                value={formTitulo}
                onChange={e => setFormTitulo(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.fg, boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: C.muted }}>Compás:</label>
                <input
                  type="text"
                  placeholder="4/4"
                  value={formCompas}
                  onChange={e => setFormCompas(e.target.value)}
                  style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '8px', border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.fg, boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: C.muted }}>BPM:</label>
                <input
                  type="text"
                  placeholder="132"
                  value={formBpm}
                  onChange={e => setFormBpm(e.target.value)}
                  style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '8px', border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.fg, boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: C.muted }}>Tono:</label>
                <select
                  value={formTono}
                  onChange={e => setFormTono(e.target.value)}
                  style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '8px', border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.fg, boxSizing: 'border-box' }}
                >
                  {NOTES.map(n => <option key={n} value={n}>{n}</option>)}
                  {["Dm", "Em", "Am", "Bm", "F#m", "Gm"].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: C.muted }}>Autor(es) / Referencia:</label>
              <input
                type="text"
                placeholder="Ej: Hebert Faria / Samuel Huh"
                value={formAutor}
                onChange={e => setFormAutor(e.target.value)}
                style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.fg, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: C.muted }}>Letra en formato ChordPro ([Acorde]Letra):</label>
              <textarea
                rows="10"
                placeholder="[Dm]Hay una nube que con[Bb]duce la iglesia..."
                value={formCuerpo}
                onChange={e => setFormCuerpo(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.fg, fontFamily: "'Lexend', sans-serif", fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              style={{ backgroundColor: C.primary, color: '#fff', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '14px', marginTop: '6px' }}
            >
              {idEditando ? 'Guardar Cambios' : 'Guardar Himno'}
            </button>
          </form>
        </main>
      )}

    </div>
  );
}