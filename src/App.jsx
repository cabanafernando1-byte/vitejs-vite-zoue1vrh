import React, { useState, useEffect, useRef } from 'react';

// Tipografía Lexend para la interfaz del cancionero
const linkFonts = document.createElement('link');
linkFonts.rel = 'stylesheet';
linkFonts.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap';
if (!document.head.querySelector('link[href*="Lexend"]')) {
  document.head.appendChild(linkFonts);
}

/* -------------------------------------------------------------------------- */
/* LOGO OFICIAL 100% IDÉNTICO DIRECTO DE CANVA                                */
/* -------------------------------------------------------------------------- */
const LogoOficialCanva = () => (
  <div style={{
    width: '100%',
    maxWidth: '320px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px'
  }}>
    <img
      src="/logo.png"
      alt="Nasa Cifras - Jesús es el Señor"
      style={{
        width: '100%',
        height: 'auto',
        objectFit: 'contain',
        display: 'block',
        filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.4))'
      }}
    />
  </div>
);

/* -------------------------------------------------------------------------- */
/* Iconos SVG Auxiliares                                                     */
/* -------------------------------------------------------------------------- */
function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  switch (name) {
    case 'search':
      return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
    case 'moon':
      return <svg {...common}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>;
    case 'sun':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
        </svg>
      );
    case 'plus':
      return <svg {...common} strokeWidth={2.2}><path d="M12 5v14M5 12h14" /></svg>;
    case 'stack':
      return <svg {...common}><path d="M4 7.5 12 4l8 3.5-8 3.5-8-3.5Z" /><path d="m4 12 8 3.5 8-3.5M4 16.5 12 20l8-3.5" /></svg>;
    case 'layers':
      return <svg {...common}><rect x="4" y="4" width="12" height="12" rx="2" /><path d="M8 20h10a2 2 0 0 0 2-2V8" /></svg>;
    case 'music':
      return <svg {...common}><path d="M9 18V6l10-2v12" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="16.5" cy="16" r="2.5" /></svg>;
    case 'sparkle':
      return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="M12 8c.6 2.2 1.8 3.4 4 4-2.2.6-3.4 1.8-4 4-.6-2.2-1.8-3.4-4-4 2.2-.6 3.4-1.8 4-4Z" /></svg>;
    case 'clock':
      return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>;
    case 'heart':
      return <svg {...common}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>;
    default:
      return null;
  }
}

/* -------------------------------------------------------------------------- */
/* Música y Transposición                                                    */
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

function calcularDiagramaAcorde(nombreAcorde) {
  if (!nombreAcorde) return null;
  const limpio = nombreAcorde.split('/')[0].trim();
  const match = limpio.match(/^([A-G][#b]?)(.*)$/);
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
      return { baseFret: t6, barre: { fret: t6, from: 0, to: 5 }, frets: [t6, t6 + 2, t6, t6, t6] };
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
/* Diagrama de Acorde con Tipografía Lexend                                  */
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

function DiagramaAcordeLexend({ name, tema }) {
  const shape = calcularDiagramaAcorde(name) || { frets: [-1, -1, 0, 2, 3, 2] };
  const baseFret = shape.baseFret || 1;

  return (
    <figure
      style={{
        background: tema.surface,
        boxShadow: `inset 0 0 0 1px ${tema.border}`,
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
      <figcaption style={{ fontFamily: "'Lexend', sans-serif", fontSize: '12px', fontWeight: '700', color: tema.accent, marginBottom: '2px' }}>
        {name}
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        {baseFret === 1 ? (
          <rect x={PAD_X - 1} y={PAD_TOP - 3} width={GRID_W + 2} height={3} rx={1} fill={tema.text} />
        ) : (
          <text x={PAD_X - 5} y={PAD_TOP + FRET_GAP / 2 + 3} fontSize={8} fill={tema.text} opacity={0.6} textAnchor="middle" fontFamily="'Lexend', sans-serif" fontWeight="600">
            {baseFret}
          </text>
        )}
        {Array.from({ length: FRETS + 1 }).map((_, i) => (
          <line key={`f${i}`} x1={PAD_X} x2={PAD_X + GRID_W} y1={PAD_TOP + i * FRET_GAP} y2={PAD_TOP + i * FRET_GAP} stroke={tema.text} strokeOpacity={0.35} strokeWidth={1} />
        ))}
        {Array.from({ length: STRINGS }).map((_, i) => (
          <line key={`s${i}`} x1={PAD_X + i * STRING_GAP} x2={PAD_X + i * STRING_GAP} y1={PAD_TOP} y2={PAD_TOP + GRID_H} stroke={tema.text} strokeOpacity={0.5} strokeWidth={1} />
        ))}
        {shape.barre && (
          <rect
            x={PAD_X + shape.barre.from * STRING_GAP - 3}
            y={PAD_TOP + (shape.barre.fret - baseFret) * FRET_GAP + FRET_GAP / 2 - 3.5}
            width={(shape.barre.to - shape.barre.from) * STRING_GAP + 6}
            height={7}
            rx={3.5}
            fill={tema.accent}
          />
        )}
        {shape.frets.map((fret, i) => {
          const x = PAD_X + i * STRING_GAP;
          if (fret === -1) return <text key={`x${i}`} x={x} y={PAD_TOP - 4} fontSize={8} textAnchor="middle" fill={tema.text} opacity={0.5} fontFamily="'Lexend', sans-serif">×</text>;
          if (fret === 0) return <circle key={`o${i}`} cx={x} cy={PAD_TOP - 6} r={2.2} fill="none" stroke={tema.text} strokeOpacity={0.6} strokeWidth={1} />;
          const inBarre = shape.barre && fret === shape.barre.fret && i >= shape.barre.from && i <= shape.barre.to;
          if (inBarre) return null;
          return <circle key={`d${i}`} cx={x} cy={PAD_TOP + (fret - baseFret) * FRET_GAP + FRET_GAP / 2} r={3.8} fill={tema.accent} />;
        })}
      </svg>
    </figure>
  );
}

function formatearEtiqueta(himno) {
  if (!himno.numero || himno.numero.trim() === '') return '';
  const num = himno.numero.trim();
  if (himno.categoria === 'Suplementarios') return `S-${num}`;
  if (himno.categoria === 'Complementarios') return `C-${num}`;
  if (himno.categoria === 'Himnos') return `H-${num}`;
  return '';
}

function RenderLineaChordPro({ linea, semitonos, tema }) {
  const lineaTrim = linea.trim();
  if (!lineaTrim) return <div style={{ height: '14px' }} />;

  const esSeccion = /^(ESTROFA|CORO|PUENTE|INTRO|CODA)/i.test(lineaTrim);
  if (esSeccion) {
    return (
      <div style={{
        marginTop: '22px',
        marginBottom: '6px',
        fontWeight: '800',
        fontSize: '0.8em',
        color: tema.muted,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontFamily: "'Lexend', sans-serif"
      }}>
        {lineaTrim}
      </div>
    );
  }

  const palabras = linea.split(/(\s+)/);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', minHeight: '38px', margin: '1px 0' }}>
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
                    <span style={{ fontSize: '0.88em', fontWeight: '800', color: tema.accent, lineHeight: '1.2', fontFamily: "'Lexend', sans-serif" }}>
                      {transposeChord(acordeActual, semitonos)}
                    </span>
                    <span style={{ lineHeight: '1.25', color: tema.text, fontFamily: "'Lexend', sans-serif" }}>
                      {textoSilaba || '\u00A0'}
                    </span>
                  </span>
                );
              }

              return (
                <span key={fIdx} style={{ display: 'inline-flex', flexDirection: 'column', verticalAlign: 'bottom' }}>
                  <span style={{ fontSize: '0.88em', lineHeight: '1.2', visibility: 'hidden', fontFamily: "'Lexend', sans-serif" }}>.</span>
                  <span style={{ lineHeight: '1.25', color: tema.text, fontFamily: "'Lexend', sans-serif" }}>{textoSilaba}</span>
                </span>
              );
            })}
            {ultimoAcorde && (
              <span style={{ display: 'inline-flex', flexDirection: 'column', verticalAlign: 'bottom' }}>
                <span style={{ fontSize: '0.88em', fontWeight: '800', color: tema.accent, lineHeight: '1.2', fontFamily: "'Lexend', sans-serif" }}>
                  {transposeChord(ultimoAcorde, semitonos)}
                </span>
                <span style={{ lineHeight: '1.25', fontFamily: "'Lexend', sans-serif" }}>&nbsp;</span>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

const FONT_SIZES = [14, 16, 18, 21, 24];
const SPEEDS = [0.5, 1, 1.5, 2];

export default function App() {
  const [ocultarSplash, setOcultarSplash] = useState(false);
  const [vistaActual, setVistaActual] = useState('menu');
  const [categoriaSel, setCategoriaSel] = useState('Suplementarios');
  const [modoOscuro, setModoOscuro] = useState(true);
  const [semitonos, setSemitonos] = useState(0);
  const [fontIdx, setFontIdx] = useState(1);
  const [scrolling, setScrolling] = useState(false);
  const [speed, setSpeed] = useState(1);

  // Estados del Menú
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('recent');

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

  // Paleta oficial V0
  const t = modoOscuro ? {
    bg: '#0b1120',
    surface: '#111a2e',
    surface2: '#16213a',
    border: 'rgba(255,255,255,0.08)',
    borderStrong: 'rgba(255,255,255,0.14)',
    text: '#f4f6fb',
    muted: '#8a94ad',
    faint: '#5b6480',
    accent: '#e07a4f',
    accentSoft: 'rgba(224,122,79,0.14)',
    onAccent: '#1a0d07',
    shadow: '0 18px 40px rgba(0,0,0,0.45)',
  } : {
    bg: '#f6f4f0',
    surface: '#ffffff',
    surface2: '#f0ede7',
    border: 'rgba(11,17,32,0.08)',
    borderStrong: 'rgba(11,17,32,0.16)',
    text: '#0b1120',
    muted: '#5b6480',
    faint: '#9aa2b8',
    accent: '#d46a3f',
    accentSoft: 'rgba(212,106,63,0.12)',
    onAccent: '#ffffff',
    shadow: '0 18px 40px rgba(11,17,32,0.10)',
  };

  const [himnos, setHimnos] = useState(() => {
    const local = localStorage.getItem('cifra_nasa_v22');
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
  const [recientes, setRecientes] = useState([himnos[0], himnos[1]]);
  const [favoritos, setFavoritos] = useState([himnos[0]]);

  // Splash de bienvenida de 2.4s
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setOcultarSplash(true);
    }, 2400);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    localStorage.setItem('cifra_nasa_v22', JSON.stringify(himnos));
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

  const seleccionarHimno = (h) => {
    setHimnoActivo(h);
    setSemitonos(0);
    setRecientes((prev) => [h, ...prev.filter((item) => item.id !== h.id)].slice(0, 8));
    setVistaActual('visor');
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

    seleccionarHimno(objetoHimno);
  };

  const navegarAtras = () => {
    setScrolling(false);
    if (vistaActual === 'visor') setVistaActual('lista');
    else if (vistaActual === 'lista') setVistaActual('categorias');
    else if (vistaActual === 'categorias' || vistaActual === 'formulario') setVistaActual('menu');
  };

  const labelSemitonos = semitonos === 0 ? '0' : semitonos > 0 ? `+${semitonos}` : `${semitonos}`;
  const tonoActual = transposeChord(himnoActivo.tonoBase, semitonos);

  const CATEGORIES = [
    { key: 'Suplementarios', title: 'Suplementarios', badge: 'S-', count: himnos.filter(h => h.categoria === 'Suplementarios').length, hint: 'Himnario suplementario', icon: 'stack' },
    { key: 'Complementarios', title: 'Complementarios', badge: 'C-', count: himnos.filter(h => h.categoria === 'Complementarios').length, hint: 'Cantos complementarios', icon: 'layers' },
    { key: 'Himnos', title: 'Himnos', badge: 'H-', count: himnos.filter(h => h.categoria === 'Himnos').length, hint: 'Himnario clásico', icon: 'music' },
    { key: 'Nuevos', title: 'Nuevos', badge: '✨', count: himnos.filter(h => h.categoria === 'Nuevos').length, hint: 'Agregados recientemente', icon: 'sparkle' },
  ];

  const himnosFiltrados = query.trim() === '' ? [] : himnos.filter(h => {
    const q = query.toLowerCase().trim();
    const coincideTitulo = h.titulo.toLowerCase().includes(q);
    const coincideNum = h.numero && h.numero.includes(q);
    return coincideTitulo || coincideNum;
  });

  const listTab = tab === 'recent' ? recientes : favoritos;

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Lexend', sans-serif", backgroundColor: t.bg, color: t.text, transition: 'background 0.3s ease, color 0.3s ease' }}>
      
      <style>{`
        @keyframes animLogoEntrada {
          0% { opacity: 0; transform: scale(0.92); filter: blur(4px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        @keyframes fadeOutSplash {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.04); }
        }
        
        .cn-root * { box-sizing: border-box; }
        .cn-scroll { scrollbar-width: none; -ms-overflow-style: none; scroll-snap-type: x mandatory; }
        .cn-scroll::-webkit-scrollbar { display: none; }
        .cn-press { transition: transform 0.15s ease, border-color 0.2s ease, background 0.2s ease; cursor: pointer; border: none; font-family: inherit; }
        .cn-press:active { transform: scale(0.97); }
        .cn-root input { font-family: inherit; }
        .cn-root input::placeholder { color: ${t.faint}; }
        .cn-card:hover { border-color: ${t.borderStrong} !important; }

        @media print {
          @page { size: A4 portrait; margin: 14mm 16mm; }
          body, html {
            background: #ffffff !important;
            color: #000000 !important;
            font-family: 'Lexend', sans-serif !important;
            -webkit-print-color-adjust: exact;
          }
          .no-imprimir { display: none !important; }
          .contenedor-visor { max-width: 100% !important; height: auto !important; padding: 0 !important; margin: 0 !important; }
          .header-himno-pdf {
            text-align: center !important;
            margin-bottom: 20px !important;
            padding-bottom: 12px !important;
            border-bottom: 2px solid #e2e8f0 !important;
          }
          .header-himno-pdf h1 { font-size: 24pt !important; font-weight: 800 !important; color: #000000 !important; margin: 0 0 6px 0 !important; }
          .header-himno-pdf p { font-size: 11pt !important; color: #475569 !important; margin: 0 0 10px 0 !important; }
          .header-himno-pdf .meta { display: flex !important; justify-content: center !important; gap: 20px !important; font-size: 10pt !important; font-weight: 700 !important; color: #334155 !important; }
          .layout-partitura-pdf {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
            gap: 24px !important;
          }
          .area-partitura { flex: 1 !important; padding: 0 !important; font-size: 13pt !important; line-height: 1.5 !important; }
          .area-partitura * { color: #000000 !important; }
          .carrusel-acordes { width: 86px !important; display: flex !important; flex-direction: column !important; gap: 14px !important; margin: 0 !important; padding: 0 !important; }
          .carrusel-acordes figure { background: #ffffff !important; border: 1px solid #cbd5e1 !important; box-shadow: none !important; width: 82px !important; padding: 6px !important; }
          .carrusel-acordes figcaption { color: #000000 !important; font-size: 10pt !important; }
          .carrusel-acordes svg text, .carrusel-acordes svg line, .carrusel-acordes svg rect { stroke: #000000 !important; fill: #000000 !important; }
        }
      `}</style>

      {/* PANTALLA SPLASH CON EL LOGO EXACTO DE CANVA */}
      {!ocultarSplash && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#0b1120',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '24px',
          animation: 'fadeOutSplash 0.5s ease 1.9s forwards'
        }}>
          <div style={{ animation: 'animLogoEntrada 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
            <LogoOficialCanva />
          </div>
        </div>
      )}

      {/* MENÚ PRINCIPAL */}
      {vistaActual === 'menu' && (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
          <div style={{
            width: '100%',
            maxWidth: 440,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            padding: 'max(24px, env(safe-area-inset-top)) 20px max(32px, env(safe-area-inset-bottom)) 20px',
            gap: 20,
            boxSizing: 'border-box'
          }}>
            
            {/* Header del Menú */}
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  background: t.accent,
                  color: t.onAccent,
                  fontWeight: 800,
                  fontSize: 15,
                  padding: '6px 12px',
                  borderRadius: 10,
                  lineHeight: 1,
                  boxShadow: `0 6px 18px ${t.accentSoft}`,
                }}>
                  Cifra
                </span>
                <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: '0.04em', lineHeight: 1 }}>NASA</span>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  className="cn-press"
                  onClick={() => setModoOscuro(!modoOscuro)}
                  aria-label="Cambiar tema"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 999,
                    border: `1px solid ${t.border}`,
                    background: t.surface,
                    color: t.text,
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Icon name={modoOscuro ? 'moon' : 'sun'} size={19} />
                </button>
                <button
                  type="button"
                  className="cn-press"
                  aria-label="Ajustes"
                  onClick={() => setVistaActual('categorias')}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 999,
                    border: `1px solid ${t.border}`,
                    background: t.surface,
                    color: t.text,
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Icon name="settings" size={19} />
                </button>
              </div>
            </header>

            {/* Búsqueda Rápida */}
            <section aria-label="Búsqueda rápida">
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: 999,
                padding: '14px 18px',
                color: t.muted,
                boxShadow: t.shadow
              }}>
                <Icon name="search" size={20} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="search"
                  placeholder="Buscar por número (ej: 53) o título..."
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: t.text,
                    fontSize: 14,
                    fontFamily: "'Lexend', sans-serif"
                  }}
                />
                {query && (
                  <span style={{ fontSize: 12, color: t.accent, fontWeight: 700 }}>
                    {/^\d+$/.test(query) ? `Nº ${query}` : 'Título'}
                  </span>
                )}
              </label>

              {/* Resultados de búsqueda */}
              {query.trim() !== '' && (
                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {himnosFiltrados.map(h => (
                    <div
                      key={h.id}
                      onClick={() => { setQuery(''); seleccionarHimno(h); }}
                      style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: '12px 14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {formatearEtiqueta(h) && <span style={{ color: t.accent, fontWeight: 700, fontSize: 13 }}>{formatearEtiqueta(h)}</span>}
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{h.titulo}</span>
                      </div>
                      <span style={{ fontSize: 12, color: t.muted }}>{h.tonoBase}</span>
                    </div>
                  ))}
                  {himnosFiltrados.length === 0 && (
                    <div style={{ padding: '14px', textAlign: 'center', fontSize: 13, color: t.muted }}>
                      No se encontraron cánticos
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Categorías y Acciones */}
            {query.trim() === '' && (
              <>
                <section aria-labelledby="cats">
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
                    <h2 id="cats" style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: t.muted }}>
                      Categorías
                    </h2>
                    <span style={{ fontSize: 12, color: t.faint, fontWeight: 600 }}>{himnos.length} cantos</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {CATEGORIES.map((c) => (
                      <button
                        key={c.key}
                        type="button"
                        className="cn-press cn-card"
                        onClick={() => { setCategoriaSel(c.key); setVistaActual('lista'); }}
                        style={{
                          background: t.surface,
                          border: `1px solid ${t.border}`,
                          borderRadius: 18,
                          color: t.text,
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 16,
                          padding: 16,
                          minHeight: 138,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <span style={{
                            width: 44,
                            height: 44,
                            borderRadius: 14,
                            display: 'grid',
                            placeItems: 'center',
                            background: t.accentSoft,
                            color: t.accent,
                          }}>
                            <Icon name={c.icon} size={22} />
                          </span>
                          <span style={{
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            color: c.icon === 'sparkle' ? t.accent : t.muted,
                            border: `1px solid ${t.border}`,
                            borderRadius: 8,
                            padding: '4px 7px',
                            background: t.surface2,
                            lineHeight: 1,
                          }}>
                            {c.badge}
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          <span style={{ fontWeight: 700, fontSize: 15 }}>{c.title}</span>
                          <span style={{ fontSize: 12, color: t.muted }}>
                            <strong style={{ color: t.text, fontWeight: 700 }}>{c.count}</strong> · {c.hint}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Botón Principal: Agregar Himno */}
                <section>
                  <button
                    type="button"
                    className="cn-press"
                    onClick={abrirNuevo}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      padding: '17px 20px',
                      borderRadius: 18,
                      border: '1px solid rgba(255,255,255,0.12)',
                      background: `linear-gradient(135deg, ${t.accent} 0%, #c9623a 100%)`,
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 15,
                      boxShadow: `0 14px 30px rgba(224,122,79,0.28)`,
                      fontFamily: "'Lexend', sans-serif"
                    }}
                  >
                    <span style={{
                      width: 28,
                      height: 28,
                      borderRadius: 999,
                      display: 'grid',
                      placeItems: 'center',
                      background: 'rgba(255,255,255,0.18)',
                    }}>
                      <Icon name="plus" size={16} />
                    </span>
                    Agregar Nuevo Himno
                    <span style={{ fontWeight: 400, opacity: 0.85, fontSize: 13 }}>(ChordPro)</span>
                  </button>
                </section>

                {/* Últimos Cantados / Favoritos */}
                <section aria-labelledby="recent">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div role="tablist" style={{ display: 'flex', gap: 4, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 999, padding: 4 }}>
                      <button
                        type="button"
                        onClick={() => setTab('recent')}
                        className="cn-press"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '7px 12px',
                          borderRadius: 999,
                          border: 'none',
                          background: tab === 'recent' ? t.accentSoft : 'transparent',
                          color: tab === 'recent' ? t.accent : t.muted,
                          fontSize: 12.5,
                          fontWeight: 700,
                        }}
                      >
                        <Icon name="clock" size={14} />
                        Últimos cantados
                      </button>
                      <button
                        type="button"
                        onClick={() => setTab('fav')}
                        className="cn-press"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '7px 12px',
                          borderRadius: 999,
                          border: 'none',
                          background: tab === 'fav' ? t.accentSoft : 'transparent',
                          color: tab === 'fav' ? t.accent : t.muted,
                          fontSize: 12.5,
                          fontWeight: 700,
                        }}
                      >
                        <Icon name="heart" size={14} />
                        Favoritos
                      </button>
                    </div>
                  </div>

                  <div className="cn-scroll" style={{ display: 'flex', gap: 10, overflowX: 'auto', margin: '0 -20px', padding: '4px 20px 8px' }}>
                    {listTab.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className="cn-press cn-card"
                        onClick={() => seleccionarHimno(s)}
                        style={{
                          background: t.surface,
                          border: `1px solid ${t.border}`,
                          borderRadius: 18,
                          color: t.text,
                          flex: '0 0 auto',
                          width: 168,
                          padding: 14,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 10,
                          textAlign: 'left',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: t.accent, fontWeight: 800, fontSize: 13 }}>
                            {formatearEtiqueta(s) || '✨'}
                          </span>
                          <span style={{ fontSize: 11, color: t.faint, fontWeight: 600 }}>{tab === 'recent' ? 'Reciente' : '★'}</span>
                        </div>
                        <span style={{
                          fontSize: 14,
                          fontWeight: 600,
                          lineHeight: 1.35,
                          minHeight: 38,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                          {s.titulo}
                        </span>
                        <span style={{ fontSize: 11, color: t.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ width: 22, height: 22, borderRadius: 6, display: 'grid', placeItems: 'center', background: t.surface2, border: `1px solid ${t.border}`, color: t.text, fontWeight: 700, fontSize: 11 }}>
                            {s.tonoBase}
                          </span>
                          Tono
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Footer */}
                <footer style={{ marginTop: 'auto', padding: '16px 0 28px', textAlign: 'center', fontSize: 12, color: t.faint }}>
                  Jesús es el Señor <span style={{ color: t.accent }}>•</span> Cifra NASA v1.0
                </footer>
              </>
            )}

          </div>
        </div>
      )}

      {/* CATEGORÍAS */}
      {vistaActual === 'categorias' && (
        <main style={{ maxWidth: '440px', margin: '20px auto', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>Categorías</h2>
            <button onClick={navegarAtras} style={{ background: t.surface2, border: 'none', color: t.text, padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700', fontFamily: "'Lexend', sans-serif" }}>← Volver</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {["Suplementarios", "Complementarios", "Himnos", "Nuevos"].map(cat => (
              <button
                key={cat}
                onClick={() => { setCategoriaSel(cat); setVistaActual('lista'); }}
                style={{ backgroundColor: t.surface, border: `1px solid ${t.border}`, color: t.text, padding: '16px', borderRadius: '12px', textAlign: 'left', cursor: 'pointer', fontFamily: "'Lexend', sans-serif", fontSize: '15px', fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span>{cat}</span>
                <span style={{ color: t.accent, fontWeight: 'bold' }}>→</span>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* LISTA DE HIMNOS */}
      {vistaActual === 'lista' && (
        <main style={{ maxWidth: '480px', margin: '20px auto', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>{categoriaSel}</h2>
            <button onClick={navegarAtras} style={{ background: t.surface2, border: 'none', color: t.text, padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700', fontFamily: "'Lexend', sans-serif" }}>← Volver</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {himnos.filter(h => h.categoria === categoriaSel).map(h => {
              const prefijo = formatearEtiqueta(h);
              return (
                <div
                  key={h.id}
                  onClick={() => seleccionarHimno(h)}
                  style={{ backgroundColor: t.surface, border: `1px solid ${t.border}`, padding: '14px 16px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  {prefijo && <span style={{ fontWeight: '800', color: t.accent, fontSize: '15px' }}>{prefijo}</span>}
                  <div style={{ fontWeight: '600', fontSize: '15px' }}>{h.titulo}</div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* VISOR DE PARTITURA */}
      {vistaActual === 'visor' && (
        <div className="contenedor-visor" style={{ height: '100vh', display: 'flex', flexDirection: 'column', maxWidth: '520px', margin: '0 auto', position: 'relative' }}>
          
          {/* Barra Superior */}
          <header className="no-imprimir" style={{ position: 'sticky', top: 0, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', backdropFilter: 'blur(12px)', background: modoOscuro ? 'rgba(11, 17, 32, 0.92)' : 'rgba(246, 244, 240, 0.92)', borderBottom: `1px solid ${t.border}` }}>
            <button onClick={navegarAtras} style={{ background: 'transparent', border: 'none', color: t.text, cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Transposición */}
              <div style={{ display: 'flex', alignItems: 'center', background: t.surface2, borderRadius: '999px', padding: '2px 4px' }}>
                <button onClick={() => setSemitonos(s => Math.max(-11, s - 1))} style={{ width: '26px', height: '26px', borderRadius: '50%', border: 'none', background: 'transparent', color: t.text, cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                <span style={{ width: '32px', textAlign: 'center', fontFamily: "'Lexend', sans-serif", fontSize: '12px', fontWeight: '800', color: t.accent }}>{labelSemitonos}</span>
                <button onClick={() => setSemitonos(s => Math.min(11, s + 1))} style={{ width: '26px', height: '26px', borderRadius: '50%', border: 'none', background: 'transparent', color: t.text, cursor: 'pointer', fontWeight: 'bold' }}>+</button>
              </div>

              {/* Tamaño Letra */}
              <div style={{ display: 'flex', alignItems: 'center', background: t.surface2, borderRadius: '999px', padding: '2px 4px' }}>
                <button onClick={() => setFontIdx(i => Math.max(0, i - 1))} disabled={fontIdx === 0} style={{ width: '26px', height: '26px', borderRadius: '50%', border: 'none', background: 'transparent', color: t.text, cursor: 'pointer', fontSize: '11px', fontWeight: '800', opacity: fontIdx === 0 ? 0.3 : 1 }}>A-</button>
                <button onClick={() => setFontIdx(i => Math.min(FONT_SIZES.length - 1, i + 1))} disabled={fontIdx === FONT_SIZES.length - 1} style={{ width: '26px', height: '26px', borderRadius: '50%', border: 'none', background: 'transparent', color: t.text, cursor: 'pointer', fontSize: '13px', fontWeight: '800', opacity: fontIdx === FONT_SIZES.length - 1 ? 0.3 : 1 }}>A+</button>
              </div>

              {/* Toggle Tema */}
              <button
                onClick={() => setModoOscuro(!modoOscuro)}
                style={{ background: t.surface2, border: 'none', color: t.text, width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}
                title="Cambiar tema"
              >
                {modoOscuro ? '🌙' : '☀️'}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={() => abrirEditor(himnoActivo)} style={{ background: 'transparent', border: 'none', color: t.muted, cursor: 'pointer', fontSize: '15px', padding: '4px' }} title="Editar">✏️</button>
              <button onClick={descargarPDF} style={{ background: 'transparent', border: 'none', color: t.text, cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px' }} title="Exportar PDF">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M12 18v-6M9 15l3 3 3-3"/></svg>
              </button>
            </div>
          </header>

          {/* Área de Lectura */}
          <div ref={scrollRef} className="cn-scroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: '120px' }}>
            
            {/* Header del Himno */}
            <section className="header-himno-pdf" style={{ margin: '12px 16px 0', background: t.surface, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: t.text }}>
                  {formatearEtiqueta(himnoActivo) ? `${formatearEtiqueta(himnoActivo)} ` : ''}{himnoActivo.titulo}
                </h1>
                <span style={{ background: t.accentSoft, color: t.accent, padding: '3px 10px', borderRadius: '6px', fontFamily: "'Lexend', sans-serif", fontSize: '13px', fontWeight: '800' }}>
                  {tonoActual}
                </span>
              </div>
              {himnoActivo.autor && (
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: t.muted }}>{himnoActivo.autor}</p>
              )}
              <div className="meta" style={{ marginTop: '10px', display: 'flex', gap: '10px', fontFamily: "'Lexend', sans-serif", fontSize: '12px', fontWeight: '600' }}>
                <span style={{ border: `1px solid ${t.border}`, padding: '2px 8px', borderRadius: '6px', color: t.text }}>[{himnoActivo.compas || '4/4'}]</span>
                <span style={{ border: `1px solid ${t.border}`, padding: '2px 8px', borderRadius: '6px', color: t.text }}>[{himnoActivo.bpm ? `${himnoActivo.bpm} bpm` : '120 bpm'}]</span>
              </div>
            </section>

            {/* Layout Dual: Pantalla / PDF */}
            <div className="layout-partitura-pdf">
              
              {/* Carrusel de Acordes */}
              <section className="carrusel-acordes" aria-label="Acordes del cántico" style={{ paddingTop: '10px' }}>
                <ul className="cn-scroll" style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '0 16px 6px', margin: 0, listStyle: 'none' }}>
                  {acordesDelHimno(himnoActivo.textoChordPro).map((chord, idx) => (
                    <li key={idx} style={{ flexShrink: 0 }}>
                      <DiagramaAcordeLexend name={transposeChord(chord, semitonos)} tema={t} />
                    </li>
                  ))}
                </ul>
              </section>

              {/* Letra del Himno */}
              <article className="area-partitura" style={{ padding: '16px 18px 0', fontSize: `${FONT_SIZES[fontIdx]}px` }}>
                {himnoActivo.textoChordPro.split('\n').map((linea, idx) => (
                  <RenderLineaChordPro key={idx} linea={linea} semitonos={semitonos} tema={t} />
                ))}
              </article>

            </div>
          </div>

          {/* Barra Flotante de Auto-Scroll */}
          <div className="no-imprimir" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, pointerEvents: 'none', display: 'flex', justifyContent: 'center', padding: '0 16px 16px', zIndex: 30 }}>
            <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '8px', background: modoOscuro ? 'rgba(17,26,46,0.92)' : 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', boxShadow: `0 8px 30px rgba(0,0,0,0.25), inset 0 0 0 1px ${t.border}`, borderRadius: '999px', padding: '6px 12px 6px 6px' }}>
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
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  background: scrolling ? t.accent : t.surface2,
                  color: scrolling ? '#fff' : t.text,
                  fontFamily: "'Lexend', sans-serif"
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
                      fontFamily: "'Lexend', sans-serif",
                      fontSize: '11px',
                      fontWeight: '700',
                      background: speed === s ? t.accentSoft : 'transparent',
                      color: speed === s ? t.accent : t.muted
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
            <button onClick={navegarAtras} style={{ background: t.surface2, border: 'none', color: t.text, padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700' }}>← Volver</button>
          </div>

          <form onSubmit={guardarFormulario} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: t.muted }}>Categoría:</label>
              <select
                value={formCat}
                onChange={e => setFormCat(e.target.value)}
                style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: `1px solid ${t.border}`, backgroundColor: t.surface, color: t.text, fontFamily: "'Lexend', sans-serif" }}
              >
                <option value="Suplementarios">Suplementarios (S-)</option>
                <option value="Complementarios">Complementarios (C-)</option>
                <option value="Himnos">Himnos (H-)</option>
                <option value="Nuevos">Nuevos (Sin número)</option>
              </select>
            </div>

            {formCat !== 'Nuevos' && (
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: t.muted }}>Número (solo dígitos):</label>
                <input
                  type="text"
                  placeholder="Ej: 53"
                  value={formNum}
                  onChange={e => setFormNum(e.target.value)}
                  style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: `1px solid ${t.border}`, backgroundColor: t.surface, color: t.text, fontFamily: "'Lexend', sans-serif", boxSizing: 'border-box' }}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: t.muted }}>Título del cántico:</label>
              <input
                type="text"
                placeholder="Nombre del cántico..."
                value={formTitulo}
                onChange={e => setFormTitulo(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: `1px solid ${t.border}`, backgroundColor: t.surface, color: t.text, fontFamily: "'Lexend', sans-serif", boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: t.muted }}>Compás:</label>
                <input
                  type="text"
                  placeholder="4/4"
                  value={formCompas}
                  onChange={e => setFormCompas(e.target.value)}
                  style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '8px', border: `1px solid ${t.border}`, backgroundColor: t.surface, color: t.text, fontFamily: "'Lexend', sans-serif", boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: t.muted }}>BPM:</label>
                <input
                  type="text"
                  placeholder="132"
                  value={formBpm}
                  onChange={e => setFormBpm(e.target.value)}
                  style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '8px', border: `1px solid ${t.border}`, backgroundColor: t.surface, color: t.text, fontFamily: "'Lexend', sans-serif", boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: t.muted }}>Tono:</label>
                <select
                  value={formTono}
                  onChange={e => setFormTono(e.target.value)}
                  style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '8px', border: `1px solid ${t.border}`, backgroundColor: t.surface, color: t.text, fontFamily: "'Lexend', sans-serif", boxSizing: 'border-box' }}
                >
                  {NOTES.map(n => <option key={n} value={n}>{n}</option>)}
                  {["Dm", "Em", "Am", "Bm", "F#m", "Gm"].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: t.muted }}>Autor(es) / Referencia:</label>
              <input
                type="text"
                placeholder="Ej: Hebert Faria / Samuel Huh"
                value={formAutor}
                onChange={e => setFormAutor(e.target.value)}
                style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: `1px solid ${t.border}`, backgroundColor: t.surface, color: t.text, fontFamily: "'Lexend', sans-serif", boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: t.muted }}>Letra en formato ChordPro ([Acorde]Letra):</label>
              <textarea
                rows="10"
                placeholder="[Dm]Hay una nube que con[Bb]duce la iglesia..."
                value={formCuerpo}
                onChange={e => setFormCuerpo(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: `1px solid ${t.border}`, backgroundColor: t.surface, color: t.text, fontFamily: "'Lexend', sans-serif", fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              style={{ backgroundColor: t.accent, color: '#fff', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '14px', marginTop: '6px', fontFamily: "'Lexend', sans-serif" }}
            >
              {idEditando ? 'Guardar Cambios' : 'Guardar Himno'}
            </button>
          </form>
        </main>
      )}

    </div>
  );
}