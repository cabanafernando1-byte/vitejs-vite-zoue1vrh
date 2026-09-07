import React, { useState, useEffect } from 'react';

// Tipografía Lexend
const linkLexend = document.createElement('link');
linkLexend.rel = 'stylesheet';
linkLexend.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&display=swap';
if (!document.head.querySelector('link[href*="Lexend"]')) {
  document.head.appendChild(linkLexend);
}

// Iconos vectoriales de la intro
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

// Transposición y Notas
const NOTAS_SOST = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const NOTAS_BEMOL = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const INDICES_NOTAS = {
  "C": 0, "C#": 1, "Db": 1, "D": 2, "D#": 3, "Eb": 3,
  "E": 4, "F": 5, "F#": 6, "Gb": 6, "G": 7, "G#": 8,
  "Ab": 8, "A": 9, "A#": 10, "Bb": 10, "B": 11
};

function transponerNota(nota, semitonos) {
  let idx = NOTAS_SOST.indexOf(nota);
  if (idx === -1) idx = NOTAS_BEMOL.indexOf(nota);
  if (idx === -1) return nota;
  let nueva = (idx + semitonos) % 12;
  if (nueva < 0) nueva += 12;
  return NOTAS_SOST[nueva];
}

function transponerAcorde(acorde, semitonos) {
  if (!acorde || semitonos === 0) return acorde;
  return acorde.replace(/[A-G][b#]?/g, (m) => transponerNota(m, semitonos));
}

// Generador de acordes móviles (CAGED / Cejillas)
function calcularDiagramaAcorde(nombreAcorde) {
  if (!nombreAcorde) return null;
  const limpio = nombreAcorde.split('/')[0].trim();
  const match = limpio.match(/^([A-G][b#]?)(.*)$/);
  if (!match) return null;

  const [, raiz, tipo] = match;
  const semitonoRaiz = INDICES_NOTAS[raiz];
  if (semitonoRaiz === undefined) return null;

  const basicos = {
    "C": { trastes: [-1, 3, 2, 0, 1, 0], dedos: ["", "3", "2", "", "1", ""], base: 1 },
    "C7": { trastes: [-1, 3, 2, 3, 1, -1], dedos: ["", "3", "2", "4", "1", ""], base: 1 },
    "D": { trastes: [-1, -1, 0, 2, 3, 2], dedos: ["", "", "", "1", "3", "2"], base: 1 },
    "D9": { trastes: [-1, -1, 0, 2, 3, 0], dedos: ["", "", "", "1", "2", ""], base: 1 },
    "Dm": { trastes: [-1, -1, 0, 2, 3, 1], dedos: ["", "", "", "2", "3", "1"], base: 1 },
    "E": { trastes: [0, 2, 2, 1, 0, 0], dedos: ["", "2", "3", "1", "", ""], base: 1 },
    "E4": { trastes: [0, 2, 2, 2, 0, 0], dedos: ["", "2", "3", "4", "", ""], base: 1 },
    "Em": { trastes: [0, 2, 2, 0, 0, 0], dedos: ["", "2", "3", "", "", ""], base: 1 },
    "G": { trastes: [3, 2, 0, 0, 0, 3], dedos: ["2", "1", "", "", "", "3"], base: 1 },
    "A": { trastes: [-1, 0, 2, 2, 2, 0], dedos: ["", "", "1", "2", "3", ""], base: 1 },
    "A9": { trastes: [-1, 0, 2, 2, 0, 0], dedos: ["", "", "1", "2", "", ""], base: 1 },
    "Am": { trastes: [-1, 0, 2, 2, 1, 0], dedos: ["", "", "2", "3", "1", ""], base: 1 },
    "Am7": { trastes: [-1, 0, 2, 0, 1, 0], dedos: ["", "", "2", "", "1", ""], base: 1 },
    "A7": { trastes: [-1, 0, 2, 0, 2, 0], dedos: ["", "", "2", "", "3", ""], base: 1 },
    "Bm7": { trastes: [-1, 2, 0, 2, 0, 2], dedos: ["", "1", "", "2", "", "3"], base: 1 },
    "D#m7(b5)": { trastes: [-1, -1, 1, 2, 2, 2], dedos: ["", "", "1", "2", "3", "4"], base: 1 },
    "Bm7(b5)": { trastes: [-1, 2, 3, 2, 3, -1], dedos: ["", "1", "3", "2", "4", ""], base: 1 },
    "Em7(5b)": { trastes: [-1, -1, 2, 3, 3, 3], dedos: ["", "", "1", "2", "3", "4"], base: 1 }
  };

  if (basicos[limpio]) return basicos[limpio];

  if (tipo === "m") {
    let traste6 = (semitonoRaiz - 4 + 12) % 12;
    if (traste6 >= 1 && traste6 <= 8) {
      return { base: traste6, cejilla: traste6, trastes: [traste6, traste6 + 2, traste6 + 2, traste6, traste6, traste6], dedos: ["1", "3", "4", "1", "1", "1"] };
    }
    let traste5 = (semitonoRaiz - 9 + 12) % 12;
    return { base: traste5, cejilla: traste5, trastes: [-1, traste5, traste5 + 2, traste5 + 2, traste5 + 1, traste5], dedos: ["", "1", "3", "4", "2", "1"] };
  }

  if (tipo === "7") {
    let traste6 = (semitonoRaiz - 4 + 12) % 12;
    if (traste6 >= 1 && traste6 <= 8) {
      return { base: traste6, cejilla: traste6, trastes: [traste6, traste6 + 2, traste6, traste6 + 1, traste6, traste6], dedos: ["1", "3", "1", "2", "1", "1"] };
    }
    let traste5 = (semitonoRaiz - 9 + 12) % 12;
    return { base: traste5, cejilla: traste5, trastes: [-1, traste5, traste5 + 2, traste5, traste5 + 2, traste5], dedos: ["", "1", "3", "1", "4", "1"] };
  }

  let traste6 = (semitonoRaiz - 4 + 12) % 12;
  if (traste6 >= 1 && traste6 <= 8) {
    return { base: traste6, cejilla: traste6, trastes: [traste6, traste6 + 2, traste6 + 2, traste6 + 1, traste6, traste6], dedos: ["1", "3", "4", "2", "1", "1"] };
  }

  let traste5 = (semitonoRaiz - 9 + 12) % 12;
  return { base: traste5, cejilla: traste5, trastes: [-1, traste5, traste5 + 2, traste5 + 2, traste5 + 2, traste5], dedos: ["", "1", "2", "3", "4", "1"] };
}

function GraficoAcorde({ nombre, modoNoche }) {
  const datos = calcularDiagramaAcorde(nombre) || {
    trastes: [-1, -1, 0, 2, 3, 2],
    dedos: ["", "", "", "1", "3", "2"],
    base: 1
  };

  const colorLinea = modoNoche ? '#94a3b8' : '#64748b';
  const colorTexto = modoNoche ? '#f8fafc' : '#0f172a';
  const trasteInicio = datos.base || 1;

  return (
    <div style={{ textAlign: 'center', width: '60px', flexShrink: 0 }}>
      <div style={{ fontSize: '11px', fontWeight: '800', marginBottom: '2px', color: colorTexto }}>{nombre}</div>
      <svg width="52" height="68" viewBox="0 0 60 78">
        <line x1="8" y1="16" x2="52" y2="16" stroke={colorTexto} strokeWidth={trasteInicio === 1 ? "3" : "1"} />
        <line x1="8" y1="28" x2="52" y2="28" stroke={colorLinea} strokeWidth="1" />
        <line x1="8" y1="40" x2="52" y2="40" stroke={colorLinea} strokeWidth="1" />
        <line x1="8" y1="52" x2="52" y2="52" stroke={colorLinea} strokeWidth="1" />
        <line x1="8" y1="64" x2="52" y2="64" stroke={colorLinea} strokeWidth="1" />
        {[8, 16.8, 25.6, 34.4, 43.2, 52].map((x, i) => (
          <line key={i} x1={x} y1="16" x2={x} y2="64" stroke={colorLinea} strokeWidth="1" />
        ))}
        {trasteInicio > 1 && (
          <text x="2" y="26" fontSize="9" fontWeight="bold" fill={colorTexto}>{trasteInicio}</text>
        )}
        {datos.trastes.map((t, i) => {
          const x = 8 + i * 8.8;
          if (t === -1) return <text key={i} x={x} y="11" fontSize="8" textAnchor="middle" fill="#94a3b8">×</text>;
          if (t === 0 || (!datos.cejilla && t === trasteInicio && trasteInicio === 1)) {
            if (t === 0) return <text key={i} x={x} y="11" fontSize="8" textAnchor="middle" fill="#94a3b8">○</text>;
          }
          return null;
        })}
        {datos.cejilla && (
          <rect x="7" y="19" width="46" height="5" rx="2.5" fill={colorTexto} />
        )}
        {datos.trastes.map((t, i) => {
          if (t <= 0) return null;
          const x = 8 + i * 8.8;
          const pos = trasteInicio > 1 ? (t - trasteInicio + 1) : t;
          if (pos <= 0 || pos > 4) return null;
          const y = 16 + pos * 12 - 6;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="4.5" fill={colorTexto} />
              {datos.dedos && datos.dedos[i] && (
                <text x={x} y={y + 2.5} fontSize="6" fill={modoNoche ? '#0f172a' : '#fff'} textAnchor="middle" fontWeight="bold">
                  {datos.dedos[i]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
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

// RENDER CHORDPRO PRECISO
function RenderLineaChordPro({ linea, semitonos }) {
  const lineaTrim = linea.trim();
  if (!lineaTrim) return <div style={{ height: '14px' }} />;

  const esSeccion = /^(ESTROFA|CORO|PUENTE|INTRO|CODA)/i.test(lineaTrim);
  if (esSeccion) {
    return (
      <div style={{ marginTop: '16px', marginBottom: '4px', fontWeight: '800', fontSize: '12px', color: '#9a3412', letterSpacing: '1px' }}>
        {lineaTrim}
      </div>
    );
  }

  const palabras = linea.split(/(\s+)/);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', minHeight: '38px', margin: '2px 0' }}>
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
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#ea580c', lineHeight: '1.2', fontFamily: "'Lexend', sans-serif" }}>
                      {transponerAcorde(acordeActual, semitonos)}
                    </span>
                    <span style={{ fontSize: '15px', lineHeight: '1.2' }}>
                      {textoSilaba || '\u00A0'}
                    </span>
                  </span>
                );
              }

              return (
                <span key={fIdx} style={{ display: 'inline-flex', flexDirection: 'column', verticalAlign: 'bottom' }}>
                  <span style={{ fontSize: '12px', lineHeight: '1.2', visibility: 'hidden' }}>.</span>
                  <span style={{ fontSize: '15px', lineHeight: '1.2' }}>{textoSilaba}</span>
                </span>
              );
            })}
            {ultimoAcorde && (
              <span style={{ display: 'inline-flex', flexDirection: 'column', verticalAlign: 'bottom' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#ea580c', lineHeight: '1.2' }}>
                  {transponerAcorde(ultimoAcorde, semitonos)}
                </span>
                <span style={{ fontSize: '15px', lineHeight: '1.2' }}>&nbsp;</span>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function App() {
  const [faseIntro, setFaseIntro] = useState('punto');
  const [ocultarSplash, setOcultarSplash] = useState(false);

  const [vistaActual, setVistaActual] = useState('menu');
  const [categoriaSel, setCategoriaSel] = useState('Suplementarios');
  const [modoNocturno, setModoNocturno] = useState(false);

  const [idEditando, setIdEditando] = useState(null);
  const [formCat, setFormCat] = useState('Suplementarios');
  const [formNum, setFormNum] = useState('');
  const [formTitulo, setFormTitulo] = useState('');
  const [formCompas, setFormCompas] = useState('4/4');
  const [formBpm, setFormBpm] = useState('144');
  const [formAutor, setFormAutor] = useState('');
  const [formTono, setFormTono] = useState('A');
  const [formCuerpo, setFormCuerpo] = useState('');

  const [himnos, setHimnos] = useState(() => {
    const local = localStorage.getItem('cifra_cancionero_v10');
    return local ? JSON.parse(local) : [
      {
        id: 1,
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

ESTROFA 2
Fluye aquí, fluye aquí, un río que va
Por la tierra a proveer la vida especial;
Pero ve, oh Señor, más profundo aun,
Hasta que nos midas y poseas Tú.

CORO
[Bb]Mídenos, mídenos, [C]mide en verdad,
[F]Mídenos, [Em]mídenos, [Dm]cada día más.
[Bb]Hasta ver que el fluir, [Gm]torrente de Dios,
[C]Inunde la tierra por [F]Cristo el Señor.`
      },
      {
        id: 2,
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
¡Olvi[Dm/C]dando, ciertamente, lo que [Bm7(b5)]queda a[E]trás!

CORO 2
Me entregaré,
Prosiguiendo, rumbo al amor perfecto.
Avanzando para lo que he sido hecho:
Sumer[Dm/C]girme en Tu esencia y [E]unirme a [F#]Ti.

CORO 3
¡Me vuelvo [Bm]loco!
Tus promesas se a[Bm/A]cercan final[G]mente,
Tú y [G]Yo seremos uno para [Em]siempre;
La per[Em/D]fecta alegría vi[F#]viré al [F#]fin.

CODA [2x]
[G]¡En [A9]gloria! [Bm]¡En [Bm/A]gloria! [E/G#]
[G]¡En [A9]gloria! [E4]¡Amém! [E]`
      }
    ];
  });

  const [himnoActivo, setHimnoActivo] = useState(himnos[1]);
  const [semitonos, setSemitonos] = useState(0);

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
    localStorage.setItem('cifra_cancionero_v10', JSON.stringify(himnos));
  }, [himnos]);

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

  const descargarPDF = () => {
    const tituloPrevio = document.title;
    const prefijo = formatearEtiqueta(himnoActivo);
    document.title = prefijo ? `${prefijo} - ${himnoActivo.titulo}` : himnoActivo.titulo;
    window.print();
    setTimeout(() => {
      document.title = tituloPrevio;
    }, 1500);
  };

  const navegarAtras = () => {
    if (vistaActual === 'visor') setVistaActual('lista');
    else if (vistaActual === 'lista') setVistaActual('categorias');
    else if (vistaActual === 'categorias' || vistaActual === 'formulario' || vistaActual === 'ajustes') setVistaActual('menu');
  };

  const fondoApp = modoNocturno ? '#0b1120' : '#f8fafc';
  const colorTexto = modoNocturno ? '#f8fafc' : '#0f172a';
  const fondoTarjeta = modoNocturno ? '#1e293b' : '#ffffff';
  const bordeColor = modoNocturno ? '#334155' : '#e2e8f0';

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Lexend', sans-serif", backgroundColor: fondoApp, color: colorTexto }}>
      
      {/* REGLAS DE IMPRESIÓN: ACORDES A LA DERECHA Y FONDO LIMPIO */}
      <style>{`
        @keyframes zoomPunto {
          0% { transform: scale(0.4); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @media print {
          body, html {
            background: #ffffff !important;
            color: #000000 !important;
            font-size: 13px !important;
          }
          .no-imprimir {
            display: none !important;
          }
          .contenedor-visor {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .layout-partitura-pdf {
            display: flex !important;
            flex-direction: row-reverse !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .carrusel-acordes {
            display: flex !important;
            flex-direction: column !important;
            flex-wrap: wrap !important;
            width: 70px !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            background: transparent !important;
            gap: 12px !important;
          }
          .area-partitura {
            flex: 1 !important;
            border: none !important;
            padding: 0 !important;
            box-shadow: none !important;
            background: transparent !important;
          }
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

      {/* HEADER: BOTÓN VOLVER UNIFICADO */}
      <header className="no-imprimir" style={{ backgroundColor: fondoTarjeta, borderBottom: `1px solid ${bordeColor}`, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setVistaActual('menu')}>
          <span style={{ backgroundColor: '#9a3412', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontWeight: '800', fontSize: '14px' }}>Cifra</span>
          <span style={{ fontSize: '13px', fontWeight: '700', color: modoNocturno ? '#94a3b8' : '#64748b' }}>NASA</span>
        </div>

        {vistaActual !== 'menu' && (
          <button
            onClick={navegarAtras}
            style={{ background: 'none', border: `1px solid ${bordeColor}`, color: colorTexto, padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontFamily: "'Lexend', sans-serif", fontSize: '13px', fontWeight: '700' }}
          >
            ← Volver
          </button>
        )}
      </header>

      {/* MENÚ PRINCIPAL */}
      {vistaActual === 'menu' && (
        <main style={{ maxWidth: '440px', margin: '28px auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '18px', textAlign: 'center' }}>Menú Principal</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              onClick={() => setVistaActual('categorias')}
              style={{ backgroundColor: fondoTarjeta, border: `1px solid ${bordeColor}`, padding: '16px 18px', borderRadius: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <h3 style={{ margin: '0 0 2px 0', fontSize: '16px', fontWeight: '700', color: '#9a3412' }}>📖 Himnos</h3>
                <p style={{ margin: 0, fontSize: '12px', color: modoNocturno ? '#94a3b8' : '#64748b' }}>Suplementarios, Complementarios, Himnos y Nuevos</p>
              </div>
              <span style={{ fontSize: '18px', color: '#9a3412', fontWeight: 'bold' }}>→</span>
            </div>

            <div
              onClick={abrirNuevo}
              style={{ backgroundColor: fondoTarjeta, border: `1px solid ${bordeColor}`, padding: '16px 18px', borderRadius: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <h3 style={{ margin: '0 0 2px 0', fontSize: '16px', fontWeight: '700', color: '#2563eb' }}>➕ Agregar Himnos</h3>
                <p style={{ margin: 0, fontSize: '12px', color: modoNocturno ? '#94a3b8' : '#64748b' }}>Formato ChordPro [Acorde]</p>
              </div>
              <span style={{ fontSize: '18px', color: '#2563eb', fontWeight: 'bold' }}>→</span>
            </div>

            <div
              onClick={() => setVistaActual('ajustes')}
              style={{ backgroundColor: fondoTarjeta, border: `1px solid ${bordeColor}`, padding: '16px 18px', borderRadius: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <h3 style={{ margin: '0 0 2px 0', fontSize: '16px', fontWeight: '700' }}>⚙️ Ajustes</h3>
                <p style={{ margin: 0, fontSize: '12px', color: modoNocturno ? '#94a3b8' : '#64748b' }}>Modo nocturno para el atril</p>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>→</span>
            </div>
          </div>
        </main>
      )}

      {/* CATEGORÍAS */}
      {vistaActual === 'categorias' && (
        <main style={{ maxWidth: '440px', margin: '20px auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>Categorías</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {["Suplementarios", "Complementarios", "Himnos", "Nuevos"].map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setCategoriaSel(cat);
                  setVistaActual('lista');
                }}
                style={{ backgroundColor: fondoTarjeta, border: `1px solid ${bordeColor}`, color: colorTexto, padding: '14px', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', fontFamily: "'Lexend', sans-serif", fontSize: '14px', fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span>{cat}</span>
                <span style={{ color: '#9a3412', fontWeight: 'bold' }}>→</span>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* LISTA DE HIMNOS */}
      {vistaActual === 'lista' && (
        <main style={{ maxWidth: '520px', margin: '20px auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '14px' }}>{categoriaSel}</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {himnos.filter(h => h.categoria === categoriaSel).map(h => {
              const prefijo = formatearEtiqueta(h);
              return (
                <div
                  key={h.id}
                  onClick={() => {
                    setHimnoActivo(h);
                    setSemitonos(0);
                    setVistaActual('visor');
                  }}
                  style={{ backgroundColor: fondoTarjeta, border: `1px solid ${bordeColor}`, padding: '12px 14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  {prefijo && (
                    <span style={{ fontWeight: '800', color: '#9a3412', fontSize: '15px' }}>
                      {prefijo}
                    </span>
                  )}
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>
                    {h.titulo}
                  </div>
                </div>
              );
            })}

            {himnos.filter(h => h.categoria === categoriaSel).length === 0 && (
              <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                No hay cánticos registrados en esta categoría aún.
              </div>
            )}
          </div>
        </main>
      )}

      {/* VISOR CON DISPOSICIÓN DUAL (APP ARRIBA / PDF DERECHA) */}
      {vistaActual === 'visor' && (
        <div className="contenedor-visor" style={{ padding: '10px 12px 40px', maxWidth: '640px', margin: '0 auto' }}>
          
          <div className="no-imprimir" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700' }}>TONO:</span>
              <button
                onClick={() => setSemitonos(s => s - 1)}
                style={{ width: '28px', height: '28px', borderRadius: '6px', border: `1px solid ${bordeColor}`, background: fondoTarjeta, color: colorTexto, fontWeight: '800', cursor: 'pointer' }}
              >-</button>
              <span style={{ fontWeight: '800', minWidth: '30px', textAlign: 'center', color: '#ea580c', fontSize: '15px' }}>
                {transponerAcorde(himnoActivo.tonoBase, semitonos)}
              </span>
              <button
                onClick={() => setSemitonos(s => s + 1)}
                style={{ width: '28px', height: '28px', borderRadius: '6px', border: `1px solid ${bordeColor}`, background: fondoTarjeta, color: colorTexto, fontWeight: '800', cursor: 'pointer' }}
              >+</button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => abrirEditor(himnoActivo)}
                style={{ backgroundColor: fondoTarjeta, border: `1px solid ${bordeColor}`, color: colorTexto, padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
              >
                ✏️ Editar
              </button>
              <button
                onClick={descargarPDF}
                style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
              >
                📥 PDF
              </button>
            </div>
          </div>

          {/* Envoltura flexible: en la app es vertical normal, en PDF se divide en columnas con acordes a la derecha */}
          <div className="layout-partitura-pdf">
            
            {/* Carrusel de acordes (arriba en la pantalla, vertical a la derecha al imprimir) */}
            <div className="carrusel-acordes" style={{
              backgroundColor: fondoTarjeta,
              border: `1px solid ${bordeColor}`,
              borderRadius: '8px',
              padding: '8px 10px',
              marginBottom: '12px',
              overflowX: 'auto',
              display: 'flex',
              gap: '8px',
              justifyContent: 'flex-start'
            }}>
              {acordesDelHimno(himnoActivo.textoChordPro).map((ac, idx) => (
                <GraficoAcorde
                  key={idx}
                  nombre={transponerAcorde(ac, semitonos)}
                  modoNoche={modoNocturno}
                />
              ))}
            </div>

            {/* Hoja de partitura */}
            <main className="area-partitura" style={{
              backgroundColor: fondoTarjeta,
              border: `1px solid ${bordeColor}`,
              padding: '24px 20px',
              borderRadius: '8px',
              textAlign: 'left'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 4px 0', color: colorTexto }}>
                  {formatearEtiqueta(himnoActivo) ? `${formatearEtiqueta(himnoActivo)} ` : ''}{himnoActivo.titulo}
                </h1>
                {himnoActivo.autor && (
                  <div style={{ fontSize: '13px', fontWeight: '600', color: modoNocturno ? '#94a3b8' : '#64748b' }}>
                    {himnoActivo.autor}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', color: modoNocturno ? '#cbd5e1' : '#475569', borderBottom: `1px solid ${bordeColor}`, paddingBottom: '8px', marginBottom: '14px' }}>
                <span>[{himnoActivo.compas || '4/4'}] [{himnoActivo.bpm ? `${himnoActivo.bpm}bpm` : '120bpm'}]</span>
                <span>Tonalidad: {transponerAcorde(himnoActivo.tonoBase, semitonos)}</span>
              </div>

              <div>
                {himnoActivo.textoChordPro.split('\n').map((linea, idx) => (
                  <RenderLineaChordPro key={idx} linea={linea} semitonos={semitonos} />
                ))}
              </div>
            </main>

          </div>
        </div>
      )}

      {/* FORMULARIO AGREGAR / EDITAR */}
      {vistaActual === 'formulario' && (
        <main style={{ maxWidth: '480px', margin: '18px auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '14px' }}>
            {idEditando ? '✏️ Editar Himno' : '➕ Agregar Nuevo Himno'}
          </h2>

          <form onSubmit={guardarFormulario} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700' }}>Categoría:</label>
              <select
                value={formCat}
                onChange={e => setFormCat(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '3px', borderRadius: '6px', border: `1px solid ${bordeColor}`, backgroundColor: fondoTarjeta, color: colorTexto, fontFamily: "'Lexend', sans-serif" }}
              >
                <option value="Suplementarios">Suplementarios (S-)</option>
                <option value="Complementarios">Complementarios (C-)</option>
                <option value="Himnos">Himnos (H-)</option>
                <option value="Nuevos">Nuevos (Sin número)</option>
              </select>
            </div>

            {formCat !== 'Nuevos' && (
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700' }}>Número (solo dígitos):</label>
                <input
                  type="text"
                  placeholder="Ej: 21"
                  value={formNum}
                  onChange={e => setFormNum(e.target.value)}
                  style={{ width: '100%', padding: '8px', marginTop: '3px', borderRadius: '6px', border: `1px solid ${bordeColor}`, backgroundColor: fondoTarjeta, color: colorTexto, boxSizing: 'border-box' }}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: '11px', fontWeight: '700' }}>Título del cántico:</label>
              <input
                type="text"
                placeholder="Nombre del cántico..."
                value={formTitulo}
                onChange={e => setFormTitulo(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '3px', borderRadius: '6px', border: `1px solid ${bordeColor}`, backgroundColor: fondoTarjeta, color: colorTexto, boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700' }}>Compás:</label>
                <input
                  type="text"
                  placeholder="4/4"
                  value={formCompas}
                  onChange={e => setFormCompas(e.target.value)}
                  style={{ width: '100%', padding: '8px', marginTop: '3px', borderRadius: '6px', border: `1px solid ${bordeColor}`, backgroundColor: fondoTarjeta, color: colorTexto, boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700' }}>BPM:</label>
                <input
                  type="text"
                  placeholder="144"
                  value={formBpm}
                  onChange={e => setFormBpm(e.target.value)}
                  style={{ width: '100%', padding: '8px', marginTop: '3px', borderRadius: '6px', border: `1px solid ${bordeColor}`, backgroundColor: fondoTarjeta, color: colorTexto, boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700' }}>Tonalidad:</label>
                <select
                  value={formTono}
                  onChange={e => setFormTono(e.target.value)}
                  style={{ width: '100%', padding: '8px', marginTop: '3px', borderRadius: '6px', border: `1px solid ${bordeColor}`, backgroundColor: fondoTarjeta, color: colorTexto, boxSizing: 'border-box' }}
                >
                  {NOTAS_SOST.map(n => <option key={n} value={n}>{n}</option>)}
                  {["Dm", "Em", "Am", "Bm", "F#m", "Gm"].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '700' }}>Autor(es) / Referencia:</label>
              <input
                type="text"
                placeholder="Ej: Hebert Faria / João Luiz / Samuel Huh"
                value={formAutor}
                onChange={e => setFormAutor(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '3px', borderRadius: '6px', border: `1px solid ${bordeColor}`, backgroundColor: fondoTarjeta, color: colorTexto, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '700' }}>Letra en formato ChordPro (acordes entre corchetes [ ]):</label>
              <textarea
                rows="10"
                placeholder="[A]La vi[A/C#]sión que reci[D]bí me conquis[D]tó..."
                value={formCuerpo}
                onChange={e => setFormCuerpo(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '3px', borderRadius: '6px', border: `1px solid ${bordeColor}`, backgroundColor: fondoTarjeta, color: colorTexto, fontFamily: "'Lexend', sans-serif", fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              style={{ backgroundColor: '#9a3412', color: '#fff', padding: '10px', borderRadius: '6px', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '14px', marginTop: '4px' }}
            >
              {idEditando ? 'Guardar Cambios' : 'Guardar Himno'}
            </button>
          </form>
        </main>
      )}

      {/* AJUSTES */}
      {vistaActual === 'ajustes' && (
        <main style={{ maxWidth: '440px', margin: '20px auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>Ajustes</h2>
          <div style={{ backgroundColor: fondoTarjeta, border: `1px solid ${bordeColor}`, borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '700', fontSize: '14px' }}>Modo nocturno</div>
              <div style={{ fontSize: '11px', color: modoNocturno ? '#94a3b8' : '#64748b' }}>Fondo oscuro para atril</div>
            </div>
            <button
              onClick={() => setModoNocturno(!modoNocturno)}
              style={{ width: '48px', height: '26px', backgroundColor: modoNocturno ? '#9a3412' : '#cbd5e1', borderRadius: '13px', border: 'none', cursor: 'pointer', position: 'relative' }}
            >
              <div style={{ width: '20px', height: '20px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', left: modoNocturno ? '25px' : '3px', transition: 'left 0.2s' }} />
            </button>
          </div>
        </main>
      )}

    </div>
  );
}