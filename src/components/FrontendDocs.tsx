import React from 'react';
import { useNavigate } from 'react-router-dom';

const FrontendDocs: React.FC = () => {
  const navigate = useNavigate();

  const copy = (text: string, e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(text);
    const btn = e.currentTarget;
    btn.innerText = '✅ Másolva';
    setTimeout(() => btn.innerText = 'Másolás', 2000);
  };

  const styles = {
    wrapper: { backgroundColor: '#1e1e1e', color: '#d4d4d4', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Segoe UI', Consolas, monospace" },
    container: { maxWidth: '1000px', margin: '0 auto' },
    backBtn: { backgroundColor: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', marginBottom: '20px', borderRadius: '2px' },
    card: { backgroundColor: '#252526', border: '1px solid #333', padding: '25px', marginBottom: '40px', borderRadius: '4px' },
    codeBox: { backgroundColor: '#181818', padding: '15px', borderRadius: '4px', position: 'relative' as const, marginTop: '10px', border: '1px solid #404040' },
    copyBtn: { position: 'absolute' as const, right: '10px', top: '10px', backgroundColor: '#007acc', color: '#fff', border: 'none', padding: '5px 10px', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '2px' },
    h1: { color: '#fff', fontSize: '2.2rem', marginBottom: '10px' },
    h2: { color: '#569cd6', fontSize: '1.6rem', marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' },
    h3: { color: '#4ec9b0', fontSize: '1.2rem', marginTop: '20px', marginBottom: '10px' },
    text: { lineHeight: '1.6', marginBottom: '10px' },
    highlight: { color: '#ce9178', backgroundColor: '#2d2d2d', padding: '2px 5px', borderRadius: '3px' },
    ol: { paddingLeft: '20px', marginBottom: '20px', color: '#ccc' },
    li: { marginBottom: '10px' }
  };

  const Code = ({ code, filename }: { code: string, filename?: string }) => (
    <div style={styles.codeBox}>
      {filename && <div style={{ color: '#858585', fontSize: '0.8rem', marginBottom: '5px' }}>{filename}</div>}
      <button style={styles.copyBtn} onClick={(e) => copy(code, e)}>Másolás</button>
      <pre style={{ margin: 0, fontSize: '0.9rem', color: '#d4d4d4', overflowX: 'auto', lineHeight: '1.5' }}>{code}</pre>
    </div>
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <button style={styles.backBtn} onClick={() => navigate('/')}>← Vissza</button>
        <h1 style={styles.h1}>Tanórák Frontend SPA (React + Bootstrap)</h1>
        <p style={{ color: '#858585', marginBottom: '40px' }}>Lépésről lépésre útmutató a vizsgafeladat kliensoldalának felépítéséhez</p>

        {/* 0. PROJEKT KEZDÉS */}
        <section style={styles.card}>
          <h2 style={styles.h2}>0. Projekt inicializálása</h2>
          <Code 
            filename="Terminál"
            code={`npm create vite@latest frontend -- --template react-ts\ncd frontend\nnpm install react-bootstrap bootstrap\nnpm run dev`} 
          />
        </section>

        {/* 1. ALAP STRUKTÚRA */}
        <section style={styles.card}>
          <h2 style={styles.h2}>1. Alap struktúra és State-ek</h2>
          <Code 
            filename="src/App.tsx"
            code={`import { useEffect, useState } from "react";\nimport "bootstrap/dist/css/bootstrap.min.css";\n\nconst API = "http://localhost:3000/lessons";\n\ninterface Lesson {\n  id: number;\n  subject: string;\n  teacher: string;\n  class_level: string;\n  scheduled_hours: number;\n}\n\nexport default function App() {\n  const [lessons, setLessons] = useState<Lesson[]>([]);\n  const [error, setError] = useState("");\n  const [formData, setFormData] = useState({\n    subject: "",\n    teacher: "",\n    class_level: "",\n    scheduled_hours: 0,\n  });\n\n  // Függvények helye...\n\n  // useEffect helye...\n\n  // Return helye...\n}`} 
          />
        </section>

        {/* 2. FÜGGVÉNYEK */}
        <section style={styles.card}>
          <h2 style={styles.h2}>2. API és Eseménykezelő Függvények</h2>
          <Code 
            filename="src/App.tsx (Függvények)"
            code={`  async function fetchLessons() {\n    try {\n      const response = await fetch(API);\n      if (!response.ok) throw new Error();\n      const result = await response.json();\n      setLessons(result);\n    } catch {\n      setError("Nem sikerült betölteni a tanórákat.");\n    }\n  }\n\n  const handleCreateLesson = async (e: React.FormEvent) => {\n    e.preventDefault();\n    try {\n      const res = await fetch(API, {\n        method: "POST",\n        headers: { "Content-Type": "application/json" },\n        body: JSON.stringify(formData),\n      });\n      if (res.ok) {\n        setFormData({ subject: "", teacher: "", class_level: "", scheduled_hours: 0 });\n        setError("Sikeres felvétel!");\n        fetchLessons();\n      } else {\n        setError("Sikertelen felvétel!");\n      }\n    } catch {\n      setError("Hálózati hiba a mentéskor!");\n    }\n  };\n\n  const handleConductLesson = async (id: number) => {\n    try {\n      const res = await fetch(\`\${API}/\${id}/conducted\`, { method: "POST" });\n      if (res.ok) {\n        setError(\`Sikeres órarögzítés! (ID: \${id})\`);\n      } else {\n        setError("Sikertelen órarögzítés!");\n      }\n    } catch {\n      setError("Hálózati hiba a rögzítéskor!");\n    }\n  };\n\n  useEffect(() => {\n    fetchLessons();\n  }, []);`} 
          />
        </section>

        {/* 3. KOPASZ RETURN */}
        <section style={styles.card}>
          <h2 style={styles.h2}>3. A "Kopasz" Return Rendszer</h2>
          <Code 
            filename="src/App.tsx (Return alap)"
            code={`  return (\n    <div className="bg-white min-vh-100 d-flex flex-column">\n      {/* HEADER HELYE */}\n\n      <main className="flex-grow-1 container">\n        {error && (\n          <div className={\`alert \${error.includes("Sikeres") ? "alert-success" : "alert-danger"}\`} role="alert">\n            {error}\n            <button type="button" className="btn-close float-end" onClick={() => setError("")}></button>\n          </div>\n        )}\n\n        {/* ŰRLAP SZEKCIÓ HELYE */}\n\n        {/* LISTÁZÓ SZEKCIÓ HELYE */}\n      </main>\n\n      {/* FOOTER HELYE */}\n    </div>\n  );`} 
          />
        </section>

        {/* 4. HEADER ÉS FOOTER */}
        <section style={styles.card}>
          <h2 style={styles.h2}>4. Fejléc és Lábjegyzet (Szemantikus tagek)</h2>
          <Code 
            filename="src/App.tsx (Header & Footer beillesztés)"
            code={`      <header>\n        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom mb-4 px-3">\n          <a className="navbar-brand" href="#"><h1>Tanóra Kezelő SPA</h1></a>\n          <ul className="navbar-nav ms-auto">\n            <li className="nav-item">\n              <a className="nav-link" href="https://petrik.hu/" target="_blank"><b>Petrik Honlap</b></a>\n            </li>\n            <li className="nav-item">\n              <a className="nav-link" href="#footer"><b>Kapcsolat</b></a>\n            </li>\n          </ul>\n        </nav>\n      </header>\n\n      {/* ... MAIN TARTALOM ... */}\n\n      <footer id="footer" className="bg-light border-top py-4 mt-auto">\n        <div className="container text-center">\n          <p>\n            <b>Cím:</b> 1440 Budapest, Ady Endre utca 2-4.<br />\n            <b>Telefon:</b> +36 40 123 4567<br />\n            <i>Készítette: Vizsgázó</i>\n          </p>\n        </div>\n      </footer>`} 
          />
        </section>

        {/* 5. ŰRLAP SZEKCIÓ */}
        <section style={styles.card}>
          <h2 style={styles.h2}>5. Űrlap Szekció (Forms)</h2>
          <Code 
            filename="src/App.tsx (Űrlap beillesztés a main-be)"
            code={`        <section className="mb-5">\n          <h2><i>Új tanóra felvétele</i></h2>\n          <div className="bg-light p-4 border rounded">\n            <form onSubmit={handleCreateLesson} className="row g-3">\n              <div className="col-md-3">\n                <label><b>Tantárgy</b></label>\n                <input type="text" className="form-control" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} required />\n              </div>\n              <div className="col-md-3">\n                <label><b>Tanár</b></label>\n                <input type="text" className="form-control" value={formData.teacher} onChange={e => setFormData({ ...formData, teacher: e.target.value })} required />\n              </div>\n              <div className="col-md-2">\n                <label><b>Osztály</b></label>\n                <input type="text" className="form-control" value={formData.class_level} onChange={e => setFormData({ ...formData, class_level: e.target.value })} required />\n              </div>\n              <div className="col-md-2">\n                <label><b>Óraszám</b></label>\n                <input type="number" className="form-control" min="1" value={formData.scheduled_hours || ""} onChange={e => setFormData({ ...formData, scheduled_hours: +e.target.value })} required />\n              </div>\n              <div className="col-md-2 d-flex align-items-end">\n                <button type="submit" className="btn btn-primary w-100">Mentés</button>\n              </div>\n            </form>\n          </div>\n        </section>`} 
          />
        </section>

        {/* 6. LISTÁZÁS SZEKCIÓ */}
        <section style={styles.card}>
          <h2 style={styles.h2}>6. Listázás Szekció (Cards)</h2>
          <Code 
            filename="src/App.tsx (Kártyák beillesztés a main-be)"
            code={`        <section className="pb-5">\n          <h2 className="mb-4">Tanórák listája</h2>\n          <div className="row row-cols-1 row-cols-md-4 g-4">\n            {lessons.map((m) => (\n              <div className="col" key={m.id}>\n                <div className="card h-100 shadow-sm">\n                  <div className="card-body d-flex flex-column">\n                    <h3 className="card-title"><b>{m.subject}</b></h3>\n                    <h6 className="card-subtitle mb-3 text-muted"><i>{m.class_level}</i></h6>\n                    <p className="card-text">Tanár: {m.teacher}</p>\n                    <p className="card-text">Tervezett: {m.scheduled_hours} óra</p>\n                    <button className="btn btn-primary mt-auto" onClick={() => handleConductLesson(m.id)}>\n                      Megtartott óra rögzítése\n                    </button>\n                  </div>\n                </div>\n              </div>\n            ))}\n          </div>\n        </section>`} 
          />
        </section>

        <footer style={{ textAlign: 'center', padding: '20px', color: '#555' }}>
          React + Bootstrap SPA Frontend Architecture - 2026
        </footer>
      </div>
    </div>
  );
};

export default FrontendDocs;