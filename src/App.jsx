import React, { useState, useEffect } from 'react';

const linkLexend = document.createElement('link');
linkLexend.rel = 'stylesheet';
linkLexend.href =
  'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&display=swap';
if (!document.head.querySelector('link[href*="Lexend"]')) {
  document.head.appendChild(linkLexend);
}

const DICCIONARIO = {
  C: { trastes: [-1, 3, 2, 0, 1, 0], dedos: ['', '3', '2', '', '1', ''] },
  Dm: { trastes: [-1, -1, 0, 2, 3, 1], dedos: ['', '', '', '2', '3', '1'] },
  Em: { trastes: [0, 2, 2, 0, 0, 0], dedos: ['', '2', '3', '', '', ''] },
  F: {
    trastes: [1, 3, 3, 2, 1, 1],
    dedos: ['1', '3', '4', '2', '1', '1'],
    cejilla: 1,
  },
  G: { trastes: [3, 2, 0, 0, 0, 3], dedos: ['2', '1', '', '', '', '3'] },
  Am: { trastes: [-1, 0, 2, 2, 1, 0], dedos: ['', '', '2', '3', '1', ''] },
  A7: { trastes: [-1, 0, 2, 0, 2, 0], dedos: ['', '', '2', '', '3', ''] },
  Bb: {
    trastes: [-1, 1, 3, 3, 3, 1],
    dedos: ['', '1', '2', '3', '4', '1'],
    cejilla: 1,
  },
  Gm: {
    trastes: [3, 5, 5, 3, 3, 3],
    dedos: ['1', '3', '4', '1', '1', '1'],
    cejilla: 3,
    trasteInicio: 3,
  },
  'Em7(5b)': {
    trastes: [-1, -1, 2, 3, 3, 3],
    dedos: ['', '', '1', '2', '3', '4'],
  },
};

function GraficoAcorde({ nombre, modoNoche }) {
  const datos = DICCIONARIO[nombre];
  const colorLinea = modoNoche ? '#cbd5e1' : '#444';
  const colorTexto = modoNoche ? '#f8fafc' : '#111';

  if (!datos) {
    return (
      <div
        style={{
          width: '75px',
          height: '85px',
          border: `1px dashed ${modoNoche ? '#475569' : '#ccc'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          color: '#888',
        }}
      >
        {nombre}
      </div>
    );
  }

  const { trastes, dedos, cejilla, trasteInicio = 1 } = datos;

  return (
    <div style={{ textAlign: 'center', width: '75px', margin: '0 auto' }}>
      <div
        style={{
          fontSize: '12px',
          fontWeight: '700',
          marginBottom: '2px',
          color: colorTexto,
        }}
      >
        {nombre}
      </div>
      <svg width="65" height="85" viewBox="0 0 65 85">
        <line
          x1="10"
          y1="18"
          x2="55"
          y2="18"
          stroke={colorTexto}
          strokeWidth={trasteInicio === 1 ? '3' : '1'}
        />
        <line
          x1="10"
          y1="32"
          x2="55"
          y2="32"
          stroke={colorLinea}
          strokeWidth="1"
        />
        <line
          x1="10"
          y1="46"
          x2="55"
          y2="46"
          stroke={colorLinea}
          strokeWidth="1"
        />
        <line
          x1="10"
          y1="60"
          x2="55"
          y2="60"
          stroke={colorLinea}
          strokeWidth="1"
        />
        <line
          x1="10"
          y1="74"
          x2="55"
          y2="74"
          stroke={colorLinea}
          strokeWidth="1"
        />

        {[10, 19, 28, 37, 46, 55].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1="18"
            x2={x}
            y2="74"
            stroke={colorLinea}
            strokeWidth="1"
          />
        ))}

        {trasteInicio > 1 && (
          <text x="2" y="30" fontSize="9" fontWeight="bold" fill={colorTexto}>
            {trasteInicio}
          </text>
        )}

        {trastes.map((t, i) => {
          const x = 10 + i * 9;
          if (t === -1)
            return (
              <text
                key={i}
                x={x}
                y="13"
                fontSize="9"
                textAnchor="middle"
                fill="#888"
              >
                ×
              </text>
            );
          if (t === 0)
            return (
              <text
                key={i}
                x={x}
                y="13"
                fontSize="9"
                textAnchor="middle"
                fill="#888"
              >
                ○
              </text>
            );
          return null;
        })}

        {cejilla && (
          <rect x="9" y="22" width="47" height="6" rx="3" fill={colorTexto} />
        )}

        {trastes.map((t, i) => {
          if (t <= 0) return null;
          const x = 10 + i * 9;
          const posTraste = trasteInicio > 1 ? t - trasteInicio + 1 : t;
          const y = 18 + posTraste * 14 - 7;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill={colorTexto} />
              {dedos && dedos[i] && (
                <text
                  x={x}
                  y={y + 3}
                  fontSize="7"
                  fill={modoNoche ? '#0f172a' : '#fff'}
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {dedos[i]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const IconoGuitarra = () => (
  <svg
    width="68"
    height="68"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m19 5-3-3" />
    <path d="m2 22 5.5-1.5L21.3 6.7a2.4 2.4 0 0 0 0-3.4l-1-1a2.4 2.4 0 0 0-3.4 0L2.7 16.5 2 22z" />
    <circle cx="14.5" cy="9.5" r="1" />
  </svg>
);

const IconoPiano = () => (
  <svg
    width="68"
    height="68"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="M6 8v4" />
    <path d="M10 8v4" />
    <path d="M14 8v4" />
    <path d="M18 8v4" />
  </svg>
);

const IconoBateria = () => (
  <svg
    width="68"
    height="68"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="8" rx="8" ry="4" />
    <path d="M4 8v8c0 2.2 3.6 4 8 4s8-1.8 8-4V8" />
    <path d="m7 4 5 4" />
    <path d="m17 4-5 4" />
  </svg>
);

const ESCALA = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];
const ESCALA_BEMOL = [
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
];

function transponerAcorde(acorde, semitonos) {
  if (semitonos === 0) return acorde;
  return acorde.replace(/[A-G][b#]?/g, (nota) => {
    let i = ESCALA.indexOf(nota);
    if (i === -1) i = ESCALA_BEMOL.indexOf(nota);
    if (i === -1) return nota;
    let nuevo = (i + semitonos) % 12;
    if (nuevo < 0) nuevo += 12;
    return ESCALA[nuevo];
  });
}

export default function App() {
  const [faseIntro, setFaseIntro] = useState('caida');
  const [ocultarSplash, setOcultarSplash] = useState(false);
  const [vistaActual, setVistaActual] = useState('menu');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [modoNocturno, setModoNocturno] = useState(false);

  const [himnos, setHimnos] = useState(() => {
    const data = localStorage.getItem('cifra_cancionero_v2');
    return data
      ? JSON.parse(data)
      : [
          {
            id: 1,
            categoria: 'Suplementarios',
            numero: '53',
            titulo: 'Mídenos, mídenos',
            cita: 'Ez 47:1-12',
            subtitulo: '(Cifrados simplificados)',
            tonoBase: 'Dm',
            rasgueo: '| 1  .  2  .  3  .  4  . |\n  v     ↓  ∧  v  ∧  ↓',
            acordesUtilizados: [
              'Gm',
              'Dm',
              'C',
              'F',
              'A7',
              'Bb',
              'Em',
              'Em7(5b)',
            ],
            lineas: [
              {
                acordes: '|[Dm]        |[Gm]        |[C]             |[F]',
                letra: '1. Al hogar, al hogar, al hogar de Dios,',
              },
              {
                acordes: '|[Gm]        |[Dm]        |[Gm]     |[A7]',
                letra: 'Donde está el manantial he venido yo,',
              },
              {
                acordes: '|[Dm]        |[Gm]        |[C]             |[F]',
                letra: 'Un fluir hay aquí que no cesará,',
              },
              {
                acordes: '|[Gm]        |[Dm]        |[A7]   |[Dm]',
                letra: 'Y hace crecer vida hasta madurar.\n',
              },
              {
                acordes: '',
                letra:
                  '2. Fluye aquí, fluye aquí, un río que va\nPor la tierra a proveer la vida especial;\nPero ve, oh Señor, más profundo aun,\nHasta que nos midas y poseas Tú.\n',
              },
              {
                acordes:
                  '|[Bb]           |[C]          |[F]      [Em]    |[Dm]',
                letra: 'Mídenos, mídenos, mide en verdad,',
              },
              {
                acordes: '|[Bb]           |[Dm]         |[Em7(5b)]  |[A7]',
                letra: 'Mídenos, mídenos, cada día más.',
              },
              {
                acordes: '|[Bb]        |[Gm]         |[C]             |[F]',
                letra: 'Hasta ver que el fluir, torrente de Dios,',
              },
              {
                acordes: '|[Gm]        |[Dm]        |[A7]    |[Dm]',
                letra: 'Inunde la tierra por Cristo el Señor.\n',
              },
            ],
          },
          {
            id: 2,
            categoria: 'Himnos Antiguos',
            numero: '01',
            titulo: 'Santo, Santo, Santo',
            cita: 'Apoc 4:8',
            subtitulo: '(Himno clásico)',
            tonoBase: 'D',
            rasgueo: '| 1  .  2  .  3  .  4  . |\n  ↓     ↓     ↓     ↓',
            acordesUtilizados: ['C', 'G', 'Am', 'F'],
            lineas: [
              {
                acordes: '|[C]             |[G]        |[Am]   |[F]',
                letra: 'Santo, Santo, Santo, Señor Omnipotente,',
              },
              {
                acordes: '|[C]          |[G]          |[F]     |[G]',
                letra: 'Siempre el labio mío loores te dará.',
              },
            ],
          },
        ];
  });

  const [himnoActivo, setHimnoActivo] = useState(himnos[0]);
  const [semitonos, setSemitonos] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setFaseIntro('guitarra'), 800);
    const t2 = setTimeout(() => setFaseIntro('piano'), 1600);
    const t3 = setTimeout(() => setFaseIntro('bateria'), 2400);
    const t4 = setTimeout(() => setFaseIntro('nasa'), 3200);
    const t5 = setTimeout(() => {
      setFaseIntro('listo');
      setTimeout(() => setOcultarSplash(true), 500);
    }, 4400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('cifra_cancionero_v2', JSON.stringify(himnos));
  }, [himnos]);

  const renderizarAcordes = (str) => {
    if (!str) return null;
    return str.replace(/\[(.*?)\]/g, (m, ac) =>
      transponerAcorde(ac, semitonos)
    );
  };

  const fondoApp = modoNocturno ? '#0b1120' : '#f8fafc';
  const colorTexto = modoNocturno ? '#f8fafc' : '#0f172a';
  const fondoTarjeta = modoNocturno ? '#1e293b' : '#ffffff';
  const bordeColor = modoNocturno ? '#334155' : '#e2e8f0';

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: "'Lexend', sans-serif",
        backgroundColor: fondoApp,
        color: colorTexto,
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      <style>{`
        @keyframes caerPunto {
          0% { transform: translateY(-100px) scale(0.6); opacity: 0; }
          60% { transform: translateY(0) scale(1.2); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes zoomAparicion {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {!ocultarSplash && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#9a3412',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            transition: 'opacity 0.5s ease',
            opacity: faseIntro === 'listo' ? 0 : 1,
            pointerEvents: faseIntro === 'listo' ? 'none' : 'auto',
          }}
        >
          {faseIntro === 'caida' && (
            <div
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                boxShadow: '0 0 20px #fff',
                animation: 'caerPunto 0.7s forwards',
              }}
            />
          )}
          {faseIntro === 'guitarra' && (
            <div style={{ animation: 'zoomAparicion 0.3s forwards' }}>
              <IconoGuitarra />
            </div>
          )}
          {faseIntro === 'piano' && (
            <div style={{ animation: 'zoomAparicion 0.3s forwards' }}>
              <IconoPiano />
            </div>
          )}
          {faseIntro === 'bateria' && (
            <div style={{ animation: 'zoomAparicion 0.3s forwards' }}>
              <IconoBateria />
            </div>
          )}
          {faseIntro === 'nasa' && (
            <div
              style={{
                textAlign: 'center',
                animation: 'zoomAparicion 0.4s forwards',
              }}
            >
              <h1
                style={{
                  fontSize: '50px',
                  fontWeight: '800',
                  color: '#fff',
                  letterSpacing: '6px',
                  margin: 0,
                }}
              >
                NASA
              </h1>
              <p
                style={{
                  color: '#fed7aa',
                  fontSize: '12px',
                  letterSpacing: '2px',
                  marginTop: '4px',
                  textTransform: 'uppercase',
                }}
              >
                Cifra • Himnario
              </p>
            </div>
          )}
        </div>
      )}

      <header
        style={{
          backgroundColor: fondoTarjeta,
          borderBottom: `1px solid ${bordeColor}`,
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
          onClick={() => setVistaActual('menu')}
        >
          <span
            style={{
              backgroundColor: '#9a3412',
              color: '#fff',
              padding: '4px 10px',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '16px',
            }}
          >
            Cifra
          </span>
          <span
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: modoNocturno ? '#94a3b8' : '#64748b',
            }}
          >
            NASA
          </span>
        </div>

        {vistaActual !== 'menu' && (
          <button
            onClick={() =>
              setVistaActual(vistaActual === 'visor' ? 'lista' : 'menu')
            }
            style={{
              background: 'none',
              border: `1px solid ${bordeColor}`,
              color: colorTexto,
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: "'Lexend', sans-serif",
              fontSize: '12px',
              fontWeight: '600',
            }}
          >
            ← Volver
          </button>
        )}
      </header>

      {vistaActual === 'menu' && (
        <main
          style={{ maxWidth: '480px', margin: '40px auto', padding: '0 20px' }}
        >
          <h2
            style={{
              fontSize: '22px',
              fontWeight: '700',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Menú Principal
          </h2>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            <div
              onClick={() => setVistaActual('categorias')}
              style={{
                backgroundColor: fondoTarjeta,
                border: `1px solid ${bordeColor}`,
                padding: '20px',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
              }}
            >
              <div>
                <h3
                  style={{
                    margin: '0 0 4px 0',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#9a3412',
                  }}
                >
                  📖 Himnos
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: modoNocturno ? '#94a3b8' : '#64748b',
                  }}
                >
                  Suplementarios, complementarios y más
                </p>
              </div>
              <span style={{ fontSize: '20px', color: '#9a3412' }}>→</span>
            </div>

            <div
              onClick={() => setVistaActual('ajustes')}
              style={{
                backgroundColor: fondoTarjeta,
                border: `1px solid ${bordeColor}`,
                padding: '20px',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
              }}
            >
              <div>
                <h3
                  style={{
                    margin: '0 0 4px 0',
                    fontSize: '18px',
                    fontWeight: '700',
                  }}
                >
                  ⚙️ Ajustes
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: modoNocturno ? '#94a3b8' : '#64748b',
                  }}
                >
                  Modo nocturno y preferencias
                </p>
              </div>
              <span style={{ fontSize: '20px' }}>→</span>
            </div>
          </div>
        </main>
      )}

      {vistaActual === 'categorias' && (
        <main
          style={{ maxWidth: '480px', margin: '30px auto', padding: '0 20px' }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '16px',
            }}
          >
            Categorías de Himnos
          </h2>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {[
              'Suplementarios',
              'Complementarios',
              'Himnos Antiguos',
              'Himnos Nuevos',
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategoriaSeleccionada(cat);
                  setVistaActual('lista');
                }}
                style={{
                  backgroundColor: fondoTarjeta,
                  border: `1px solid ${bordeColor}`,
                  color: colorTexto,
                  padding: '16px',
                  borderRadius: '10px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: "'Lexend', sans-serif",
                  fontSize: '15px',
                  fontWeight: '600',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{cat}</span>
                <span style={{ color: '#9a3412' }}>→</span>
              </button>
            ))}
          </div>
        </main>
      )}

      {vistaActual === 'lista' && (
        <main
          style={{ maxWidth: '600px', margin: '30px auto', padding: '0 20px' }}
        >
          <h2
            style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}
          >
            {categoriaSeleccionada}
          </h2>
          <p
            style={{
              fontSize: '13px',
              color: modoNocturno ? '#94a3b8' : '#64748b',
              marginBottom: '16px',
            }}
          >
            Selecciona un himno para abrir la partitura
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {himnos
              .filter((h) => h.categoria === categoriaSeleccionada)
              .map((h) => (
                <div
                  key={h.id}
                  onClick={() => {
                    setHimnoActivo(h);
                    setSemitonos(0);
                    setVistaActual('visor');
                  }}
                  style={{
                    backgroundColor: fondoTarjeta,
                    border: `1px solid ${bordeColor}`,
                    padding: '14px 18px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      fontWeight: '800',
                      color: '#9a3412',
                      fontSize: '18px',
                    }}
                  >
                    {h.numero}
                  </span>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '15px' }}>
                      {h.titulo}
                    </div>
                    {h.cita && (
                      <div
                        style={{
                          fontSize: '12px',
                          color: modoNocturno ? '#94a3b8' : '#64748b',
                        }}
                      >
                        {h.cita}
                      </div>
                    )}
                  </div>
                </div>
              ))}

            {himnos.filter((h) => h.categoria === categoriaSeleccionada)
              .length === 0 && (
              <div
                style={{
                  padding: '30px',
                  textAlign: 'center',
                  color: '#94a3b8',
                  fontSize: '14px',
                }}
              >
                No hay himnos registrados aún en esta categoría.
              </div>
            )}
          </div>
        </main>
      )}

      {vistaActual === 'visor' && (
        <div style={{ padding: '16px 12px 40px' }}>
          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() => setVistaActual('lista')}
              style={{
                background: fondoTarjeta,
                border: `1px solid ${bordeColor}`,
                color: colorTexto,
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: "'Lexend', sans-serif",
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              ← Volver a {categoriaSeleccionada}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: modoNocturno ? '#94a3b8' : '#64748b',
                }}
              >
                TONO:
              </span>
              <button
                onClick={() => setSemitonos((s) => s - 1)}
                style={{
                  ...btnPequeno,
                  background: fondoTarjeta,
                  color: colorTexto,
                  borderColor: bordeColor,
                }}
              >
                -
              </button>
              <span
                style={{
                  fontWeight: '700',
                  minWidth: '28px',
                  textAlign: 'center',
                  color: '#9a3412',
                  fontSize: '15px',
                }}
              >
                {transponerAcorde(himnoActivo.tonoBase, semitonos)}
              </span>
              <button
                onClick={() => setSemitonos((s) => s + 1)}
                style={{
                  ...btnPequeno,
                  background: fondoTarjeta,
                  color: colorTexto,
                  borderColor: bordeColor,
                }}
              >
                +
              </button>
              <button
                onClick={() => window.print()}
                style={{
                  backgroundColor: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  fontFamily: "'Lexend', sans-serif",
                }}
              >
                📥 PDF
              </button>
            </div>
          </div>

          <main
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              backgroundColor: fondoTarjeta,
              boxShadow: modoNocturno ? 'none' : '0 1px 3px rgba(0,0,0,0.08)',
              border: `1px solid ${bordeColor}`,
              padding: '36px 40px',
              borderRadius: '8px',
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}
            >
              <span
                style={{
                  fontSize: '30px',
                  fontWeight: '800',
                  color: colorTexto,
                }}
              >
                {himnoActivo.numero}
              </span>
              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  margin: 0,
                  color: colorTexto,
                }}
              >
                {himnoActivo.titulo}
              </h1>
              {himnoActivo.cita && (
                <span
                  style={{
                    fontSize: '14px',
                    color: modoNocturno ? '#94a3b8' : '#64748b',
                    fontStyle: 'italic',
                  }}
                >
                  {himnoActivo.cita}
                </span>
              )}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: modoNocturno ? '#94a3b8' : '#64748b',
                marginTop: '4px',
                marginBottom: '20px',
              }}
            >
              {himnoActivo.subtitulo}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 200px',
                gap: '20px',
                alignItems: 'start',
                borderBottom: `1px solid ${bordeColor}`,
                paddingBottom: '16px',
                marginBottom: '20px',
              }}
            >
              <div>
                <p
                  style={{
                    margin: '0 0 10px 0',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  <strong style={{ fontWeight: '700' }}>Tonalidad:</strong>{' '}
                  {transponerAcorde(himnoActivo.tonoBase, semitonos)}
                </p>
                <div style={{ fontSize: '13px' }}>
                  <strong style={{ fontWeight: '700' }}>Rasgueo básico:</strong>
                  <pre
                    style={{
                      fontFamily: "'Lexend', monospace",
                      margin: '6px 0 0 0',
                      fontSize: '13px',
                      color: colorTexto,
                    }}
                  >
                    {himnoActivo.rasgueo}
                  </pre>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'flex-end',
                }}
              >
                {himnoActivo.acordesUtilizados.slice(0, 2).map((ac, i) => (
                  <GraficoAcorde
                    key={i}
                    nombre={transponerAcorde(ac, semitonos)}
                    modoNoche={modoNocturno}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 110px',
                gap: '24px',
              }}
            >
              <div style={{ lineHeight: '1.6' }}>
                {himnoActivo.lineas.map((elem, idx) => (
                  <div
                    key={idx}
                    style={{ marginBottom: elem.acordes ? '10px' : '16px' }}
                  >
                    {elem.acordes && (
                      <div
                        style={{
                          fontFamily: "'Lexend', monospace",
                          fontWeight: '700',
                          color: colorTexto,
                          fontSize: '14px',
                          whiteSpace: 'pre',
                        }}
                      >
                        {renderizarAcordes(elem.acordes)}
                      </div>
                    )}
                    <div
                      style={{
                        fontSize: '14px',
                        color: colorTexto,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {elem.letra}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  alignItems: 'center',
                  borderLeft: `1px solid ${bordeColor}`,
                  paddingLeft: '8px',
                }}
              >
                {himnoActivo.acordesUtilizados.slice(2).map((ac, idx) => (
                  <GraficoAcorde
                    key={idx}
                    nombre={transponerAcorde(ac, semitonos)}
                    modoNoche={modoNocturno}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      )}

      {vistaActual === 'ajustes' && (
        <main
          style={{ maxWidth: '480px', margin: '30px auto', padding: '0 20px' }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '16px',
            }}
          >
            Ajustes
          </h2>

          <div
            style={{
              backgroundColor: fondoTarjeta,
              border: `1px solid ${bordeColor}`,
              borderRadius: '10px',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontWeight: '600', fontSize: '15px' }}>
                Modo nocturno
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: modoNocturno ? '#94a3b8' : '#64748b',
                }}
              >
                Fondo oscuro para usar en el atril
              </div>
            </div>

            <button
              onClick={() => setModoNocturno(!modoNocturno)}
              style={{
                width: '50px',
                height: '28px',
                backgroundColor: modoNocturno ? '#9a3412' : '#cbd5e1',
                borderRadius: '14px',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background-color 0.2s',
              }}
            >
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  backgroundColor: '#ffffff',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '3px',
                  left: modoNocturno ? '25px' : '3px',
                  transition: 'left 0.2s',
                }}
              />
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

const btnPequeno = {
  width: '26px',
  height: '26px',
  borderRadius: '50%',
  border: '1px solid',
  cursor: 'pointer',
  fontWeight: '700',
  fontFamily: "'Lexend', sans-serif",
};