import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import OpenGLSyntaxPractice from './OpenGLSyntaxPractice.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OpenGLSyntaxPractice />
  </StrictMode>,
);
