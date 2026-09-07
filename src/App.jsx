import React, { useState, useEffect } from 'react';

// Fuente Lexend
const linkLexend = document.createElement('link');
linkLexend.rel = 'stylesheet';
linkLexend.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&display=swap';
if (!document.head.querySelector('link[href*="Lexend"]')) {
  document.head.appendChild(linkLexend);
}

// Iconos vectoriales
const IconoGuitarra = () => (
  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m19 5-3-3" />
    <path d="m2 22 5.5-1.5L21.3 6.7a2.4 2.4 0 0 0 0-3.4l-1-1a2.4 2.4 0 0 0-3.4 0L2.7 16.5 2 22z" />
    <circle cx="14.5" cy="9.5" r="1.5" fill="#fff" />
  </svg>
);

const IconoPiano = () => (
  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="15" x="2" y="5" rx="2" />
    <path d="M6 9v5" /><path d="M10 9v5" /><path d="M14 9v5" /><path d="M18 9v5" />
    <path d="M2 14h20" />
  </svg>
);

const IconoBateria = () => (
  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="7" rx="9" ry="3.5" />
    <path d="M3 7v9c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5V7" />
    <path d="m6 3 5 4" /><path d="m18 3-5 4" />
  </svg>
);

// Motor de notas y transposición
const NOTAS_SOST = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const NOTAS_BEMOL = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

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

// Patrones base para generar gráficos en cualquier tonalidad
const MOLDES_ACORDES = {
  "": { trastes: [-1, 3, 2, 0, 1, 0], cejilla: false, offsetRaiz: 3, cuerdaRaiz: 1 }, // Forma de C
  "m": { trastes: [-1, 0, 2, 2, 1, 0], cejilla: false, offsetRaiz: 0, cuerdaRaiz: 1 }, // Forma de Am
  "7": { trastes: [-1, 0, 2, 0, 2, 0], cejilla: false, offsetRaiz: 0, cuerdaRaiz: 1 }, // Forma de A7
  "m7": { trastes: [-1, 0, 2, 0, 1, 0], cejilla: false, offsetRaiz: 0, cuerdaRaiz: 1 }
};

const DICCIONARIO_FIJO = {
  "C": { trastes: [-1, 3, 2, 0, 1, 0], dedos: ["", "3", "2", "", "1", ""], base: 1 },
  "C#": { trastes: [-1, 4, 3, 1, 2, 1], dedos: ["", "4", "3", "1", "2", "1"], base: 1, cejilla: 1 },
  "Db": { trastes: [-1, 4, 3, 1, 2, 1], dedos: ["", "4", "3", "1", "2", "1"], base: 1, cejilla: 1 },
  "D": { trastes: [-1, -1, 0, 2, 3, 2], dedos: ["", "", "", "1", "3", "2"], base: 1 },
  "D#": { trastes: [-1, -1, 1, 3, 4, 3], dedos: ["", "", "1", "2", "4", "3"], base: 1 },
  "Eb": { trastes: [-1, -1, 1, 3, 4, 3], dedos: ["", "", "1", "2", "4", "3"], base: 1 },
  "Dm": { trastes: [-1, -1, 0, 2, 3, 1], dedos: ["", "", "", "2", "3", "1"], base: 1 },
  "D#m": { trastes: [-1, -1, 4, 3, 4, 2], dedos: ["", "", "3", "2", "4", "1"], base: 1 },
  "E": { trastes: [0, 2, 2, 1, 0, 0], dedos: ["", "2", "3", "1", "", ""], base: 1 },
  "Em": { trastes: [0, 2, 2, 0, 0, 0], dedos: ["", "2", "3", "", "", ""], base: 1 },
  "F": { trastes: [1, 3, 3, 2, 1, 1], dedos: ["1", "3", "4", "2", "1", "1"], base: 1, cejilla: 1 },
  "F#": { trastes: [2, 4, 4, 3, 2, 2], dedos: ["1", "3", "4", "2", "1", "1"], base: 2, cejilla: 2 },
  "Fm": { trastes: [1, 3, 3, 1, 1, 1], dedos: ["1", "3", "4", "1", "1", "1"], base: 1, cejilla: 1 },
  "F#m": { trastes: [2, 4, 4, 2, 2, 2], dedos: ["1", "3", "4", "1", "1", "1"], base: 2, cejilla: 2 },
  "G": { trastes: [3, 2, 0, 0, 0, 3], dedos: ["2", "1", "", "", "", "3"], base: 1 },
  "G#": { trastes: [4, 6, 6, 5, 4, 4], dedos: ["1", "3", "4", "2", "1", "1"], base: 4, cejilla: 4 },
  "Ab": { trastes: [4, 6, 6, 5, 4, 4], dedos: ["1", "3", "4", "2", "1", "1"], base: 4, cejilla: 4 },
  "Gm": { trastes: [3, 5, 5, 3, 3, 3], dedos: ["1", "3", "4", "1", "1", "1"], base: 3, cejilla: 3 },
  "G#m": { trastes: [4, 6, 6, 4, 4, 4], dedos: ["1", "3", "4", "1", "1", "1"], base: 4, cejilla: 4 },
  "A": { trastes: [-1, 0, 2, 2, 2, 0], dedos: ["", "", "1", "2", "3", ""], base: 1 },
  "Am": { trastes: [-1, 0, 2, 2, 1, 0], dedos: ["", "", "2", "3", "1", ""], base: 1 },
  "A7": { trastes: [-1, 0, 2, 0, 2, 0], dedos: ["", "", "2", "", "3", ""], base: 1 },
  "A#": { trastes: [-1, 1, 3, 3, 3, 1], dedos: ["", "1", "2", "3", "4", "1"], base: 1, cejilla: 1 },
  "Bb": { trastes: [-1, 1, 3, 3, 3, 1], dedos: ["", "1", "2", "3", "4", "1"], base: 1, cejilla: 1 },
  "B": { trastes: [-1, 2, 4, 4, 4, 2], dedos: ["", "1", "2", "3", "4", "1"], base: 2, cejilla: 2 },
  "Bm": { trastes: [-1, 2, 4, 4, 3, 2], dedos: ["", "1", "3", "4", "2", "1"], base: 2, cejilla: 2 },
  "Em7(5b)": { trastes: [-1, -1, 2, 3, 3, 3], dedos: ["", "", "1", "2", "3", "4"], base: 1 }
};

function GraficoAcorde({ nombre, modoNoche }) {
  const datos = DICCIONARIO_FIJO[nombre] || {
    trastes: [-1, -1, 0, 2, 3, 2],
    dedos: ["", "", "", "1", "3", "2"],
    base: 1
  };

  const colorLinea = modoNoche ? '#94a3b8' : '#475569';
  const colorTexto = modoNoche ? '#f8fafc' : '#0f172a';
  const trasteInicio = datos.base || 1;

  return (
    <div style={{ textAlign: 'center', width: '68px', margin: '4px auto' }}>
      <div style={{ fontSize: '12px', fontWeight: '800', marginBottom: '2px', color: colorTexto }}>{nombre}</div>
      <svg width="60" height="78" viewBox="0 0 60 78">
        <line x1="8" y1="16" x2="52" y2="16" stroke={colorTexto} strokeWidth={trasteInicio === 1 ? "3" : "1"} />
        <line x1="8" y1="28" x2="52" y2="28" stroke={colorLinea} strokeWidth="1" />
        <line x1="8" y1="40" x2="52" y2="40" stroke={colorLinea} strokeWidth="1" />
        <line x1="8" y1="52" x2="52" y2="52" stroke={colorLinea} strokeWidth="1" />
        <line x1="8" y1="64" x2="52" y2="64" stroke={colorLinea} strokeWidth="1" />

        {[8, 16.8, 25.6, 34.4, 43.2, 52].map((x, i) => (
          <line key={i} x1={x} y1="16" x2={x} y2="64" stroke={colorLinea} strokeWidth="1" />
        ))}

        {trasteInicio > 1 && (
          <text x="2" y="26" fontSize="8" fontWeight="bold" fill={colorTexto}>{trasteInicio}</text>
        )}

        {datos.trastes.map((t, i) => {
          const x = 8 + i * 8.8;
          if (t === -1) return <text key={i} x={x} y="11" fontSize="8" textAnchor="middle" fill="#94a3b8">×</text>;
          if (t === 0) return <text key={i} x={x} y="11" fontSize="8" textAnchor="middle" fill="#94a3b8">○</text>;
          return null;
        })}

        {datos.cejilla && (
          <rect x="7" y="19" width="46" height="5" rx="2.5" fill={colorTexto} />
        )}

        {datos.trastes.map((t, i) => {
          if (t <= 0) return null;
          const x = 8 + i * 8.8;
          const pos = trasteInicio > 1 ? (t - trasteInicio + 1) : t;
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

export default function App() {
  // Estados de Splash Screen
  const [faseIntro, setFaseIntro] = useState('punto');
  const [ocultarSplash, setOcultarSplash] = useState(false);

  // Vistas: 'menu' | 'categorias' | 'lista' | 'visor' | 'agregar' | 'ajustes'
  const [vistaActual, setVistaActual] = useState('menu');
  const [categoriaSel, setCategoriaSel] = useState('Suplementarios');
  const [modoNocturno, setModoNocturno] = useState(false);

  // Formulario Agregar Himno
  const [nuevoNum, setNuevoNum] = useState('');
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaCita, setNuevaCita] = useState('');
  const [nuevaCat, setNuevaCat] = useState('Suplementarios');
  const [nuevoTono, setNuevoTono] = useState('C');
  const [nuevoCuerpo, setNuevoCuerpo] = useState('');

  // Cancionero
  const [himnos, setHimnos] = useState(() => {
    const local = localStorage.getItem('cifra_cancionero_v3');
    return local ? JSON.parse(local) : [
      {
        id: 1,
        categoria: "Suplementarios",
        numero: "53",
        titulo: "Mídenos, mídenos",
        cita: "Ez 47:1-12",
        subtitulo: "(Cifrados simplificados)",
        tonoBase: "Dm",
        rasgueo: "| 1  .  2  .  3  .  4  . |\n  v     ↓  ∧  v  ∧  ↓",
        acordesUtilizados: ["Dm", "Gm", "C", "F", "A7", "Bb", "Em", "Em7(5b)"],
        contenido: [
          { ac: "|[Dm]        |[Gm]        |[C]             |[F]", tx: "1. Al hogar, al hogar, al hogar de Dios," },
          { ac: "|[Gm]        |[Dm]        |[Gm]     |[A7]", tx: "Donde está el manantial he venido yo," },
          { ac: "|[Dm]        |[Gm]        |[C]             |[F]", tx: "Un fluir hay aquí que no cesará," },
          { ac: "|[Gm]        |[Dm]        |[A7]   |[Dm]", tx: "Y hace crecer vida hasta madurar.\n" },
          { ac: "", tx: "2. Fluye aquí, fluye aquí, un río que va\nPor la tierra a proveer la vida especial;\nPero ve, oh Señor, más profundo aun,\nHasta que nos midas y poseas Tú.\n" },
          { ac: "|[Bb]           |[C]          |[F]      [Em]    |[Dm]", tx: "Mídenos, mídenos, mide en verdad," },
          { ac: "|[Bb]           |[Dm]         |[Em7(5b)]  |[A7]", tx: "Mídenos, mídenos, cada día más." },
          { ac: "|[Bb]        |[Gm]         |[C]             |[F]", tx: "Hasta ver que el fluir, torrente de Dios," },
          { ac: "|[Gm]        |[Dm]        |[A7]    |[Dm]", tx: "Inunde la tierra por Cristo el Señor.\n" }
        ]
      },
      {
        id: 2,
        categoria: "Himnos Antiguos",
        numero: "01",
        titulo: "Santo, Santo, Santo",
        cita: "Apoc 4:8",
        subtitulo: "(Himno clásico)",
        tonoBase: "D",
        rasgueo: "| 1  .  2  .  3  .  4  . |\n  ↓     ↓     ↓     ↓",
        acordesUtilizados: ["C", "G", "Am", "F"],
        contenido: [
          { ac: "|[C]             |[G]        |[Am]   |[F]", tx: "Santo, Santo, Santo, Señor Omnipotente," },
          { ac: "|[C]          |[G]          |[F]     |[G]", tx: "Siempre el labio mío loores te dará." }
        ]
      }
    ];
  });

  const [himnoActivo, setHimnoActivo] = useState(himnos[0]);
  const [semitonos, setSemitonos] = useState(0);

  // Animación Splash requerida
  useEffect(() => {
    const t1 = setTimeout(() => setFaseIntro('guitarra'), 700);
    const t2 = setTimeout(() => setFaseIntro('piano'), 1500);
    const t3 = setTimeout(() => setFaseIntro('bateria'), 2300);
    const t4 = setTimeout(() => setFaseIntro('nasa'), 3100);
    const t5 = setTimeout(() => setFaseIntro('bienvenida'), 4300);
    const t6 = setTimeout(() => {
      setFaseIntro('listo');
      setTimeout(() => setOcultarSplash(true), 500);
    }, 5800);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('cifra_cancionero_v3', JSON.stringify(himnos));
  }, [himnos]);

  // Guardar nuevo himno
  const manejarAgregarHimno = (e) => {
    e.preventDefault();
    if (!nuevoTitulo.trim()) return;

    // Detectar acordes en corchetes automáticamente
    const acordesEncontrados = [];
    const matches = nuevoCuerpo.match(/\[(.*?)\]/g);
    if (matches) {
      matches.forEach(m => {
        const limpia = m.replace(/[\[\]]/g, '').trim();
        if (limpia && !acordesEncontrados.includes(limpia)) {
          acordesEncontrados.push(limpia);
        }
      });
    }

    const nuevoObj = {
      id: Date.now(),
      categoria: nuevaCat,
      numero: nuevoNum || "S/N",
      titulo: nuevoTitulo,
      cita: nuevaCita,
      subtitulo: "(Agregado por usuario)",
      tonoBase: nuevoTono,
      rasgueo: "| 1 . 2 . 3 . 4 . |\n ↓   ↓   ↓   ↓",
      acordesUtilizados: acordesEncontrados.length > 0 ? acordesEncontrados : [nuevoTono],
      contenido: [{ ac: "", tx: nuevoCuerpo }]
    };

    setHimnos([nuevoObj, ...himnos]);
    setNuevoNum('');
    setNuevoTitulo('');
    setNuevaCita('');
    setNuevoCuerpo('');
    setHimnoActivo(nuevoObj);
    setSemitonos(0);
    setVistaActual('visor');
  };

  const fondoApp = modoNocturno ? '#0b1120' : '#f8fafc';
  const colorTexto = modoNocturno ? '#f8fafc' : '#0f172a';
  const fondoTarjeta = modoNocturno ? '#1e293b' : '#ffffff';
  const bordeColor = modoNocturno ? '#334155' : '#e2e8f0';

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Lexend', sans-serif", backgroundColor: fondoApp, color: colorTexto }}>
      
      <style>{`
        @keyframes fadeInScale {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes caer {
          0% { transform: translateY(-80px); opacity: 0; }
          60% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
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
          transition: 'opacity 0.5s ease',
          opacity: faseIntro === 'listo' ? 0 : 1,
          pointerEvents: faseIntro === 'listo' ? 'none' : 'auto'
        }}>
          {faseIntro === 'punto' && (
            <div style={{ width: '22px', height: '22px', backgroundColor: '#fff', borderRadius: '50%', boxShadow: '0 0 25px #fff', animation: 'caer 0.6s ease-out forwards' }} />
          )}
          {faseIntro === 'guitarra' && <div style={{ animation: 'fadeInScale 0.35s forwards' }}><IconoGuitarra /></div>}
          {faseIntro === 'piano' && <div style={{ animation: 'fadeInScale 0.35s forwards' }}><IconoPiano /></div>}
          {faseIntro === 'bateria' && <div style={{ animation: 'fadeInScale 0.35s forwards' }}><IconoBateria /></div>}
          {faseIntro === 'nasa' && (
            <div style={{ animation: 'fadeInScale 0.4s forwards' }}>
              <h1 style={{ fontSize: '54px', fontWeight: '800', color: '#fff', letterSpacing: '6px', margin: 0 }}>NASA</h1>
              <p style={{ color: '#fed7aa', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '6px' }}>Cifra • Himnario</p>
            </div>
          )}
          {faseIntro === 'bienvenida' && (
            <div style={{ animation: 'fadeInScale 0.45s forwards' }}>
              <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#ffedd5', margin: '0 0 6px 0' }}>Bienvenido</h2>
              <p style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', margin: 0, letterSpacing: '1px' }}>Jesús es el Señor</p>
            </div>
          )}
        </div>
      )}

      {/* ENCABEZADO */}
      <header style={{ backgroundColor: fondoTarjeta, borderBottom: `1px solid ${bordeColor}`, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setVistaActual('menu')}>
          <span style={{ backgroundColor: '#9a3412', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontWeight: '800', fontSize: '15px' }}>Cifra</span>
          <span style={{ fontSize: '13px', fontWeight: '700', color: modoNocturno ? '#94a3b8' : '#64748b' }}>NASA</span>
        </div>

        {vistaActual !== 'menu' && (
          <button
            onClick={() => {
              if (vistaActual === 'visor') setVistaActual('lista');
              else setVistaActual('menu');
            }}
            style={{ background: 'none', border: `1px solid ${bordeColor}`, color: colorTexto, padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontFamily: "'Lexend', sans-serif", fontSize: '12px', fontWeight: '600' }}
          >
            ← Menú
          </button>
        )}
      </header>

      {/* VISTA 1: MENÚ PRINCIPAL */}
      {vistaActual === 'menu' && (
        <main style={{ maxWidth: '480px', margin: '30px auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', textAlign: 'center' }}>Menú Principal</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Opción 1: Himnos */}
            <div
              onClick={() => setVistaActual('categorias')}
              style={{ backgroundColor: fondoTarjeta, border: `1px solid ${bordeColor}`, padding: '18px 20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}
            >
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700', color: '#9a3412' }}>📖 Himnos</h3>
                <p style={{ margin: 0, fontSize: '13px', color: modoNocturno ? '#94a3b8' : '#64748b' }}>Suplementarios, complementarios y más</p>
              </div>
              <span style={{ fontSize: '20px', color: '#9a3412', fontWeight: 'bold' }}>→</span>
            </div>

            {/* Opción 2: Agregar Himnos */}
            <div
              onClick={() => setVistaActual('agregar')}
              style={{ backgroundColor: fondoTarjeta, border: `1px solid ${bordeColor}`, padding: '18px 20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}
            >
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700', color: '#2563eb' }}>➕ Agregar Himnos</h3>
                <p style={{ margin: 0, fontSize: '13px', color: modoNocturno ? '#94a3b8' : '#64748b' }}>Escribir o pegar nuevos cánticos</p>
              </div>
              <span style={{ fontSize: '20px', color: '#2563eb', fontWeight: 'bold' }}>→</span>
            </div>

            {/* Opción 3: Ajustes */}
            <div
              onClick={() => setVistaActual('ajustes')}
              style={{ backgroundColor: fondoTarjeta, border: `1px solid ${bordeColor}`, padding: '18px 20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}
            >
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700' }}>⚙️ Ajustes</h3>
                <p style={{ margin: 0, fontSize: '13px', color: modoNocturno ? '#94a3b8' : '#64748b' }}>Modo nocturno para el atril</p>
              </div>
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>→</span>
            </div>
          </div>
        </main>
      )}

      {/* VISTA 2: SELECCIÓN DE CATEGORÍAS */}
      {vistaActual === 'categorias' && (
        <main style={{ maxWidth: '480px', margin: '24px auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '14px' }}>Categorías de Himnos</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {["Suplementarios", "Complementarios", "Himnos Antiguos", "Himnos Nuevos"].map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setCategoriaSel(cat);
                  setVistaActual('lista');
                }}
                style={{ backgroundColor: fondoTarjeta, border: `1px solid ${bordeColor}`, color: colorTexto, padding: '16px', borderRadius: '10px', textAlign: 'left', cursor: 'pointer', fontFamily: "'Lexend', sans-serif", fontSize: '15px', fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span>{cat}</span>
                <span style={{ color: '#9a3412', fontWeight: 'bold' }}>→</span>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* VISTA 3: LISTADO DE HIMNOS */}
      {vistaActual === 'lista' && (
        <main style={{ maxWidth: '600px', margin: '24px auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>{categoriaSel}</h2>
              <span style={{ fontSize: '12px', color: modoNocturno ? '#94a3b8' : '#64748b' }}>Selecciona uno para abrir</span>
            </div>
            <button
              onClick={() => setVistaActual('categorias')}
              style={{ background: 'none', border: `1px solid ${bordeColor}`, color: colorTexto, padding: '4px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}
            >
              Cambiar
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {himnos.filter(h => h.categoria === categoriaSel).map(h => (
              <div
                key={h.id}
                onClick={() => {
                  setHimnoActivo(h);
                  setSemitonos(0);
                  setVistaActual('visor');
                }}
                style={{ backgroundColor: fondoTarjeta, border: `1px solid ${bordeColor}`, padding: '14px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}
              >
                <span style={{ fontWeight: '800', color: '#9a3412', fontSize: '18px', minWidth: '32px' }}>{h.numero}</span>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '15px' }}>{h.titulo}</div>
                  {h.cita && <div style={{ fontSize: '12px', color: modoNocturno ? '#94a3b8' : '#64748b' }}>{h.cita}</div>}
                </div>
              </div>
            ))}

            {himnos.filter(h => h.categoria === categoriaSel).length === 0 && (
              <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                No hay himnos registrados en esta categoría aún.
              </div>
            )}
          </div>
        </main>
      )}

      {/* VISTA 4: VISOR DE CANCIÓN (CON ACORDES TRANSPUESTOS Y GRÁFICOS) */}
      {vistaActual === 'visor' && (
        <div style={{ padding: '12px 8px 40px', maxWidth: '820px', margin: '0 auto' }}>
          {/* Controles de tono */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 6px', flexWrap: 'wrap', gap: '8px' }}>
            <button
              onClick={() => setVistaActual('lista')}
              style={{ background: fondoTarjeta, border: `1px solid ${bordeColor}`, color: colorTexto, padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
            >
              ← Volver
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700' }}>TONO:</span>
              <button
                onClick={() => setSemitonos(s => s - 1)}
                style={{ width: '28px', height: '28px', borderRadius: '6px', border: `1px solid ${bordeColor}`, background: fondoTarjeta, color: colorTexto, fontWeight: '800', cursor: 'pointer' }}
              >-</button>
              <span style={{ fontWeight: '800', minWidth: '32px', textAlign: 'center', color: '#9a3412', fontSize: '16px' }}>
                {transponerAcorde(himnoActivo.tonoBase, semitonos)}
              </span>
              <button
                onClick={() => setSemitonos(s => s + 1)}
                style={{ width: '28px', height: '28px', borderRadius: '6px', border: `1px solid ${bordeColor}`, background: fondoTarjeta, color: colorTexto, fontWeight: '800', cursor: 'pointer' }}
              >+</button>
              <button
                onClick={() => window.print()}
                style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
              >
                📥 PDF
              </button>
            </div>
          </div>

          {/* Gráficos horizontales de acordes que responden a la transposición */}
          <div style={{ backgroundColor: fondoTarjeta, border: `1px solid ${bordeColor}`, borderRadius: '8px', padding: '10px 12px', marginBottom: '14px', overflowX: 'auto', display: 'flex', gap: '10px', justifyContent: 'flex-start' }}>
            {himnoActivo.acordesUtilizados.map((ac, idx) => (
              <GraficoAcorde
                key={idx}
                nombre={transponerAcorde(ac, semitonos)}
                modoNoche={modoNocturno}
              />
            ))}
          </div>

          {/* Hoja estilo partitura física */}
          <main style={{ backgroundColor: fondoTarjeta, border: `1px solid ${bordeColor}`, padding: '24px 20px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '28px', fontWeight: '800', color: '#9a3412' }}>{himnoActivo.numero}</span>
              <h1 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>{himnoActivo.titulo}</h1>
              {himnoActivo.cita && <span style={{ fontSize: '13px', color: modoNocturno ? '#94a3b8' : '#64748b', fontStyle: 'italic' }}>{himnoActivo.cita}</span>}
            </div>
            <div style={{ fontSize: '12px', color: modoNocturno ? '#94a3b8' : '#64748b', marginTop: '2px', marginBottom: '16px' }}>
              {himnoActivo.subtitulo}
            </div>

            {/* Letra y cifrados */}
            <div style={{ lineHeight: '1.6', fontSize: '14px' }}>
              {himnoActivo.contenido.map((elem, i) => (
                <div key={i} style={{ marginBottom: elem.ac ? '10px' : '16px' }}>
                  {elem.ac && (
                    <div style={{ fontFamily: "'Lexend', monospace", fontWeight: '700', color: '#9a3412', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                      {elem.ac.replace(/\[(.*?)\]/g, (m, ac) => transponerAcorde(ac, semitonos))}
                    </div>
                  )}
                  <div style={{ whiteSpace: 'pre-line' }}>{elem.tx}</div>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {/* VISTA 5: AGREGAR HIMNO */}
      {vistaActual === 'agregar' && (
        <main style={{ maxWidth: '520px', margin: '24px auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '14px' }}>Agregar Nuevo Himno</h2>
          <form onSubmit={manejarAgregarHimno} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700' }}>Categoría:</label>
              <select
                value={nuevaCat}
                onChange={e => setNuevaCat(e.target.value)}
                style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '6px', border: `1px solid ${bordeColor}`, backgroundColor: fondoTarjeta, color: colorTexto, fontFamily: "'Lexend', sans-serif" }}
              >
                <option value="Suplementarios">Suplementarios</option>
                <option value="Complementarios">Complementarios</option>
                <option value="Himnos Antiguos">Himnos Antiguos</option>
                <option value="Himnos Nuevos">Himnos Nuevos</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700' }}>Número:</label>
                <input
                  type="text"
                  placeholder="Ej: 54"
                  value={nuevoNum}
                  onChange={e => setNuevoNum(e.target.value)}
                  style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '6px', border: `1px solid ${bordeColor}`, backgroundColor: fondoTarjeta, color: colorTexto, boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700' }}>Tonalidad base:</label>
                <select
                  value={nuevoTono}
                  onChange={e => setNuevoTono(e.target.value)}
                  style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '6px', border: `1px solid ${bordeColor}`, backgroundColor: fondoTarjeta, color: colorTexto, boxSizing: 'border-box' }}
                >
                  {NOTAS_SOST.map(n => <option key={n} value={n}>{n}</option>)}
                  {["Dm", "Em", "Am", "Bm", "F#m", "Gm"].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700' }}>Título del cántico:</label>
              <input
                type="text"
                placeholder="Nombre del himno..."
                value={nuevoTitulo}
                onChange={e => setNuevoTitulo(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '6px', border: `1px solid ${bordeColor}`, backgroundColor: fondoTarjeta, color: colorTexto, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700' }}>Cita bíblica (opcional):</label>
              <input
                type="text"
                placeholder="Ej: Salmos 23:1"
                value={nuevaCita}
                onChange={e => setNuevaCita(e.target.value)}
                style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '6px', border: `1px solid ${bordeColor}`, backgroundColor: fondoTarjeta, color: colorTexto, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700' }}>Letra con acordes (usa corchetes [C], [G], etc.):</label>
              <textarea
                rows="8"
                placeholder={"|[C]      |[G]\nHe decidido seguir a Cristo\n|[C]      |[F]\nHe decidido seguir a Cristo"}
                value={nuevoCuerpo}
                onChange={e => setNuevoCuerpo(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '6px', border: `1px solid ${bordeColor}`, backgroundColor: fondoTarjeta, color: colorTexto, fontFamily: "'Lexend', monospace", fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              style={{ backgroundColor: '#9a3412', color: '#fff', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '15px', marginTop: '6px' }}
            >
              Guardar Himno
            </button>
          </form>
        </main>
      )}

      {/* VISTA 6: AJUSTES */}
      {vistaActual === 'ajustes' && (
        <main style={{ maxWidth: '480px', margin: '24px auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '14px' }}>Ajustes</h2>
          <div style={{ backgroundColor: fondoTarjeta, border: `1px solid ${bordeColor}`, borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '700', fontSize: '15px' }}>Modo nocturno</div>
              <div style={{ fontSize: '12px', color: modoNocturno ? '#94a3b8' : '#64748b' }}>Fondo oscuro para usar en el atril</div>
            </div>
            <button
              onClick={() => setModoNocturno(!modoNocturno)}
              style={{ width: '50px', height: '28px', backgroundColor: modoNocturno ? '#9a3412' : '#cbd5e1', borderRadius: '14px', border: 'none', cursor: 'pointer', position: 'relative' }}
            >
              <div style={{ width: '22px', height: '22px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', left: modoNocturno ? '25px' : '3px', transition: 'left 0.2s' }} />
            </button>
          </div>
        </main>
      )}

    </div>
  );
}