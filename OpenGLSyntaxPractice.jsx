import { useState } from 'react';
import './OpenGLSyntaxPractice.css';
import fullLessons from './fullLessons.js';

const lessons = fullLessons;
const modules = [...new Set(lessons.map((lesson) => lesson.module))];

const tokenPattern = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|<[^>\n]+>|[A-Za-z_]\w*|\b\d+(?:\.\d+)?f?\b)/g;
const isComment = (value) => value.startsWith('//') || value.startsWith('/*');

function pickBlanks(lesson) {
  const bank = [...new Set((lesson.code.match(tokenPattern) || []).filter((token) => !isComment(token)))];
  const count = Math.max(4, Math.ceil(bank.length * 0.18));
  const picked = new Set(bank.sort(() => Math.random() - 0.5).slice(0, count));
  return bank.filter((answer) => picked.has(answer));
}

export default function OpenGLSyntaxPractice() {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [selected, setSelected] = useState(() => pickBlanks(lessons[0]));
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState('Select a lesson to begin.');
  const lesson = lessons[lessonIndex];

  function chooseLesson(index) {
    setLessonIndex(index);
    setSelected(pickBlanks(lessons[index]));
    setAnswers({});
    setChecked(false);
    setStatus(`Blanks selected • ${lessons[index].name}`);
  }

  function randomize() {
    setSelected(pickBlanks(lesson));
    setAnswers({});
    setChecked(false);
    setStatus(`New blanks selected • ${lesson.name}`);
  }

  function checkAnswers() {
    const correct = selected.filter((answer) => answers[answer]?.trim() === answer).length;
    setChecked(true);
    setStatus(`${correct} / ${selected.length} correct`);
  }

  function reveal() {
    setAnswers(Object.fromEntries(selected.map((answer) => [answer, answer])));
    setChecked(true);
    setStatus('Answers revealed.');
  }

  let blankIndex = 0;
  const blankedTokens = new Set();
  const renderedCode = lesson.code.split(tokenPattern).map((part, index) => {
    if (isComment(part)) return <span key={index}>{part}</span>;
    if (!selected.includes(part) || blankedTokens.has(part)) return <span key={index}>{part}</span>;
    blankedTokens.add(part);
    const indexForBlank = blankIndex++;
    const value = answers[part] || '';
    const isCorrect = value.trim() === part;
    const resultClass = checked ? (isCorrect ? 'correct' : 'wrong') : '';
    const choices = [...new Set([part, ...selected.filter((choice) => choice !== part).sort(() => Math.random() - 0.5).slice(0, 9)])].sort();
    return <span key={index} className="blank-wrap"><select className={`blank ${resultClass}`} value={value} aria-label={`Blank ${indexForBlank + 1}`} onChange={(event) => { setAnswers({ ...answers, [part]: event.target.value }); setChecked(false); }}><option value="">Choose…</option>{choices.map((choice) => <option key={choice} value={choice}>{choice}</option>)}</select>{checked && !isCorrect && <span className="correction">→ {part}</span>}</span>;
  });

  return <main className="practice-page">
    <section className="topline"><div><div className="eyebrow">OpenGL / syntax lab</div><h1>Fill the gaps.<br />Keep the shape.</h1></div><p className="intro">Review C++ OpenGL examples from each course module. Choose a practice, select the missing syntax, and check your memory.</p></section>
    <div className="toolbar"><button onClick={randomize}>Randomize blanks</button><button className="secondary" onClick={checkAnswers}>Check answers</button><button className="secondary" onClick={reveal}>Reveal</button></div>
    <div className="status" aria-live="polite">{status}</div>
    <nav className="module-tabs" aria-label="Practices by module">{modules.map((module) => <section className="module-group" key={module} aria-labelledby={`module-${module}`}><h2 id={`module-${module}`}>Module {module}</h2>{lessons.map((item, index) => item.module === module && <button key={item.name} className={`tab ${index === lessonIndex ? 'active' : ''}`} aria-current={index === lessonIndex ? 'page' : undefined} onClick={() => chooseLesson(index)}>{item.name}</button>)}</section>)}</nav>
    <section className="workspace"><div className="editor"><div className="filebar">module-{String(lesson.module).padStart(2, '0')}.cpp</div><div className="code-lines">{renderedCode}</div></div><aside><h2>How to practice</h2><ol><li>Read the surrounding code.</li><li>Fill the highlighted gaps.</li><li>Check your memory.</li><li>Randomize for a fresh set.</li></ol><div className="tip"><h2>Focus areas</h2><p>{lesson.focus}</p></div><div className="tip"><h2>Expected output</h2><pre className="output-preview">{lesson.output}</pre></div></aside></section>
  </main>;
}
