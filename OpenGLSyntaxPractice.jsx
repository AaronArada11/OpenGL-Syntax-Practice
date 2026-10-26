import { useState } from 'react';
import './OpenGLSyntaxPractice.css';
import fullLessons from './fullLessons.js';

const shortLessons = [
  { name: 'Translation', focus: 'Transforms, matrix stack, and GLUT setup.', code: `#include <iostream>\n#include <GL/glut.h>\nusing namespace std;\n\nvoid triangle() {\n    glBegin(GL_TRIANGLES);\n        glVertex2f(-0.2f, -0.2f);\n        glVertex2f( 0.2f, -0.2f);\n        glVertex2f( 0.0f,  0.2f);\n    glEnd();\n}\n\nvoid display(){\n    glClear(GL_COLOR_BUFFER_BIT);\n    glColor3f(1.0f, 1.0f, 0.0f);\n    glPushMatrix();\n        glTranslatef(-0.5, 0.0, 0.0);\n        triangle();\n    glPopMatrix();\n    glFlush();\n}`, blanks: ['glBegin', 'glEnd', 'glPushMatrix', 'glTranslatef', 'glPopMatrix'] },
  { name: 'Color arrays', focus: 'Client states, pointers, and indexed drawing.', code: `GLfloat vertices[] = {\n    -0.5f, -0.5f, 0.0f,\n     0.5f, -0.5f, 0.0f,\n     0.0f,  0.5f, 0.0f\n};\n\nvoid display() {\n    glClear(GL_COLOR_BUFFER_BIT);\n    glEnableClientState(GL_VERTEX_ARRAY);\n    glEnableClientState(GL_COLOR_ARRAY);\n    glVertexPointer(3, GL_FLOAT, 0, vertices);\n    glColorPointer(3, GL_FLOAT, 0, colors);\n    glDrawArrays(GL_TRIANGLES, 0, 3);\n    glDisableClientState(GL_COLOR_ARRAY);\n    glDisableClientState(GL_VERTEX_ARRAY);\n}`, blanks: ['GLfloat', 'glEnableClientState', 'glVertexPointer', 'glColorPointer', 'glDrawArrays', 'glDisableClientState'] },
  { name: 'VBO upload', focus: 'Buffer allocation, offsets, and GLEW setup.', code: `GLuint VBO;\n\nvoid init() {\n    glGenBuffers(1, &VBO);\n    glBindBuffer(GL_ARRAY_BUFFER, VBO);\n    glBufferData(GL_ARRAY_BUFFER, sizeof(vertices) + sizeof(colors), NULL, GL_STATIC_DRAW);\n    glBufferSubData(GL_ARRAY_BUFFER, 0, sizeof(vertices), vertices);\n    glBufferSubData(GL_ARRAY_BUFFER, sizeof(vertices), sizeof(colors), colors);\n    glBindBuffer(GL_ARRAY_BUFFER, 0);\n}\n\nvoid display() {\n    glBindBuffer(GL_ARRAY_BUFFER, VBO);\n    glVertexPointer(3, GL_FLOAT, 0, (void*)0);\n    glColorPointer(3, GL_FLOAT, 0, (void*)sizeof(vertices));\n    glDrawArrays(GL_TRIANGLES, 0, 3);\n}`, blanks: ['glGenBuffers', 'glBindBuffer', 'glBufferData', 'glBufferSubData', 'glVertexPointer', 'glColorPointer'] },
  { name: '3D cube', focus: 'Depth testing, projection, transforms, and faces.', code: `glEnable(GL_DEPTH_TEST);\n\nglMatrixMode(GL_PROJECTION);\nglLoadIdentity();\ngluPerspective(45.0, 800.0 / 600.0, 1.0, 100.0);\n\nvoid display() {\n    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);\n    glMatrixMode(GL_MODELVIEW);\n    glLoadIdentity();\n    glTranslatef(0.0f, 0.0f, -6.0f);\n    glRotatef(25.0f, 1.0f, 0.0f, 0.0f);\n    glDrawArrays(GL_QUADS, 0, 4);\n    glDrawArrays(GL_QUADS, 4, 4);\n}`, blanks: ['glEnable', 'GL_DEPTH_BUFFER_BIT', 'glMatrixMode', 'glLoadIdentity', 'gluPerspective', 'glTranslatef', 'glRotatef', 'glDrawArrays'] },
];

const lessons = fullLessons;

const tokenPattern = /(gl\w+|glu\w+|GL_[A-Z_]+|GLfloat)/g;

function pickBlanks(lesson) {
  return [...lesson.blanks].sort(() => Math.random() - 0.5).slice(0, Math.max(3, Math.ceil(lesson.blanks.length * 0.65)));
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
    const correct = selected.filter((answer, index) => answers[index]?.trim() === answer).length;
    setChecked(true);
    setStatus(`${correct} / ${selected.length} correct`);
  }

  function reveal() {
    setAnswers(Object.fromEntries(selected.map((answer, index) => [index, answer])));
    setChecked(true);
    setStatus('Answers revealed.');
  }

  let blankIndex = 0;
  const blankedTokens = new Set();
  const renderedCode = lesson.code.split(tokenPattern).map((part, index) => {
    if (!selected.includes(part) || blankedTokens.has(part)) return <span key={index}>{part}</span>;
    blankedTokens.add(part);
    const indexForBlank = blankIndex++;
    const value = answers[indexForBlank] || '';
    const isCorrect = value.trim() === part;
    const resultClass = checked ? (isCorrect ? 'correct' : 'wrong') : '';
    const choices = [...new Set([part, ...selected])].sort();
    return <span key={index} className="blank-wrap"><select className={`blank ${resultClass}`} value={value} aria-label={`Blank ${indexForBlank + 1}`} onChange={(event) => { setAnswers({ ...answers, [indexForBlank]: event.target.value }); setChecked(false); }}><option value="">Choose…</option>{choices.map((choice) => <option key={choice} value={choice}>{choice}</option>)}</select></span>;
  });

  return <main className="practice-page">
    <section className="topline"><div><div className="eyebrow">OpenGL / syntax lab</div><h1>Fill the gaps.<br />Keep the shape.</h1></div><p className="intro">A small practice desk for reviewing four C++ OpenGL examples. Choose a lesson, type the missing syntax, and check your memory.</p></section>
    <div className="toolbar"><button onClick={randomize}>Randomize blanks</button><button className="secondary" onClick={checkAnswers}>Check answers</button><button className="secondary" onClick={reveal}>Reveal</button></div>
    <div className="status" aria-live="polite">{status}</div>
    <nav className="tabs" aria-label="Lessons">{lessons.map((item, index) => <button key={item.name} className={`tab ${index === lessonIndex ? 'active' : ''}`} onClick={() => chooseLesson(index)}>0{index + 1} &nbsp; {item.name}</button>)}</nav>
    <section className="workspace"><div className="editor"><div className="filebar">lesson-0{lessonIndex + 1}.cpp</div><div className="code-lines">{renderedCode}</div></div><aside><h2>How to practice</h2><ol><li>Read the surrounding code.</li><li>Fill the highlighted gaps.</li><li>Check your memory.</li><li>Randomize for a fresh set.</li></ol><div className="tip"><h2>Focus areas</h2><p>{lesson.focus}</p></div></aside></section>
  </main>;
}
