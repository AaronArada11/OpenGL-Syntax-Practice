# OpenGL Syntax Practice

A small React app for practicing C++ OpenGL syntax with selectable blanks.

Deployed app: [openglman.vercel.app](https://openglman.vercel.app/)

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Practice features

- One complete OpenGL code practice for each course module, from Module 1 through Module 8.
- Module categories based on the course notes.
- Random blanks across the code, including library headers.
- Dropdown choices for each blank.
- Answer checking with score, red incorrect answers, and corrected syntax.
- Randomize and reveal controls.
- A text preview of each program's expected window output.

## Main files

- `OpenGLSyntaxPractice.jsx` contains the React interface and practice logic.
- `fullLessons.js` contains the complete code snippets.
- `OpenGLSyntaxPractice.css` contains the styles.
- `main.jsx` mounts the React component.
