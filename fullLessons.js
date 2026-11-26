const fullLessons = [
  {
    module: 1,
    name: 'First OpenGL window',
    focus: 'GLUT setup, the display callback, and a basic polygon.',
    code: `#include <GL/glut.h>

void display() {
    glClear(GL_COLOR_BUFFER_BIT);
    glColor3f(0.2f, 0.7f, 0.3f);
    glBegin(GL_POLYGON);
        glVertex2f(-0.5f, -0.5f);
        glVertex2f(-0.5f,  0.5f);
        glVertex2f( 0.5f,  0.5f);
        glVertex2f( 0.5f, -0.5f);
    glEnd();
    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitWindowSize(800, 600);
    glutCreateWindow("First OpenGL Program");
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}`,
    blanks: ['<GL/glut.h>', 'glClear', 'glBegin', 'GL_POLYGON', 'glVertex2f', 'glEnd', 'glutInit', 'glutDisplayFunc', 'glutMainLoop'],
    output: `A window with a green square centered on a dark background.

        ┌──────────┐
        │  ██████  │
        │  ██████  │
        │  ██████  │
        └──────────┘`,
  },
  {
    module: 2,
    name: 'Colored triangle',
    focus: 'Geometric primitives, vertex positions, and per-vertex colors.',
    code: `#include <GL/glut.h>

void display() {
    glClear(GL_COLOR_BUFFER_BIT);
    glBegin(GL_TRIANGLES);
        glColor3f(1.0f, 0.0f, 0.0f);
        glVertex2f(0.0f, 0.7f);
        glColor3f(0.0f, 1.0f, 0.0f);
        glVertex2f(-0.7f, -0.6f);
        glColor3f(0.0f, 0.0f, 1.0f);
        glVertex2f(0.7f, -0.6f);
    glEnd();
    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutCreateWindow("Colored Triangle");
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}`,
    blanks: ['<GL/glut.h>', 'glClear', 'glBegin', 'GL_TRIANGLES', 'glColor3f', 'glVertex2f', 'glEnd', 'glutCreateWindow', 'glutDisplayFunc'],
    output: `A triangle whose corners blend from red to green to blue.

             R
            / \\
           /   \\
          /_____\\
         G       B`,
  },
  {
    module: 3,
    name: 'Bitmap text',
    focus: 'Raster positioning and GLUT bitmap fonts.',
    code: `#include <GL/glut.h>

void display() {
    const char* message = "Computer Graphics";
    glClear(GL_COLOR_BUFFER_BIT);
    glColor3f(0.0f, 0.5f, 1.0f);
    glRasterPos2f(-0.45f, 0.0f);

    for (const char* letter = message; *letter; ++letter) {
        glutBitmapCharacter(GLUT_BITMAP_HELVETICA_18, *letter);
    }
    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutCreateWindow("Bitmap Text");
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}`,
    blanks: ['<GL/glut.h>', 'glClear', 'glColor3f', 'glRasterPos2f', 'glutBitmapCharacter', 'GLUT_BITMAP_HELVETICA_18', 'glFlush', 'glutDisplayFunc'],
    output: `Blue bitmap text appears near the center of the window.

        Computer Graphics`,
  },
  {
    module: 4,
    name: 'Vertex array',
    focus: 'Client states, vertex pointers, and array drawing.',
    code: `#include <GL/glut.h>

GLfloat vertices[] = {
     0.0f,  0.7f, 0.0f,
    -0.7f, -0.6f, 0.0f,
     0.7f, -0.6f, 0.0f
};

void display() {
    glClear(GL_COLOR_BUFFER_BIT);
    glColor3f(0.2f, 0.8f, 0.4f);
    glEnableClientState(GL_VERTEX_ARRAY);
    glVertexPointer(3, GL_FLOAT, 0, vertices);
    glDrawArrays(GL_TRIANGLES, 0, 3);
    glDisableClientState(GL_VERTEX_ARRAY);
    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutCreateWindow("Vertex Array");
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}`,
    blanks: ['<GL/glut.h>', 'GLfloat', 'glEnableClientState', 'GL_VERTEX_ARRAY', 'glVertexPointer', 'GL_FLOAT', 'glDrawArrays', 'GL_TRIANGLES', 'glDisableClientState'],
    output: `A solid green triangle drawn from one vertex array.

             /\\
            /██\\
           /████\\
          /██████\\`,
  },
  {
    module: 5,
    name: 'Vertex buffer object',
    focus: 'GLEW setup, GPU buffer upload, binding, and drawing.',
    code: `#define GLEW_STATIC
#include <GL/glew.h>
#include <GL/glut.h>

GLuint vbo;
GLfloat vertices[] = {
     0.0f,  0.7f, 0.0f,
    -0.7f, -0.6f, 0.0f,
     0.7f, -0.6f, 0.0f
};

void init() {
    glGenBuffers(1, &vbo);
    glBindBuffer(GL_ARRAY_BUFFER, vbo);
    glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT);
    glBindBuffer(GL_ARRAY_BUFFER, vbo);
    glEnableClientState(GL_VERTEX_ARRAY);
    glVertexPointer(3, GL_FLOAT, 0, 0);
    glDrawArrays(GL_TRIANGLES, 0, 3);
    glDisableClientState(GL_VERTEX_ARRAY);
    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutCreateWindow("VBO Triangle");
    glewInit();
    init();
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}`,
    blanks: ['<GL/glew.h>', '<GL/glut.h>', 'GLuint', 'glGenBuffers', 'glBindBuffer', 'GL_ARRAY_BUFFER', 'glBufferData', 'GL_STATIC_DRAW', 'glVertexPointer', 'glDrawArrays'],
    output: `A white triangle. Its vertex data is read from GPU memory.

             /\\
            /  \\
           /    \\
          /______\\`,
  },
  {
    module: 6,
    name: 'Matrix translation',
    focus: 'Homogeneous coordinates and translation matrix operations.',
    code: `#include <GL/glut.h>

GLfloat vertices[] = {
    -0.7f, -0.2f,
    -0.3f, -0.2f,
    -0.5f,  0.2f
};

void translate(float x, float y) {
    GLfloat matrix[4][4] = {
        { 1.0f, 0.0f, 0.0f, x },
        { 0.0f, 1.0f, 0.0f, y },
        { 0.0f, 0.0f, 1.0f, 0.0f },
        { 0.0f, 0.0f, 0.0f, 1.0f }
    };

    for (int i = 0; i < 6; i += 2) {
        GLfloat oldX = vertices[i];
        GLfloat oldY = vertices[i + 1];
        vertices[i] = matrix[0][0] * oldX + matrix[0][1] * oldY + matrix[0][3];
        vertices[i + 1] = matrix[1][0] * oldX + matrix[1][1] * oldY + matrix[1][3];
    }
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT);
    translate(0.6f, 0.0f);
    glBegin(GL_TRIANGLES);
    for (int i = 0; i < 6; i += 2) {
        glVertex2f(vertices[i], vertices[i + 1]);
    }
    glEnd();
    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutCreateWindow("Matrix Translation");
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}`,
    blanks: ['<GL/glut.h>', 'GLfloat', 'translate', 'glClear', 'glBegin', 'GL_TRIANGLES', 'glVertex2f', 'glEnd', 'glFlush'],
    output: `The triangle moves 0.6 units to the right before drawing.

        start             result
          △         →         △`,
  },
  {
    module: 7,
    name: '3D transformation',
    focus: 'Projection, model-view matrices, depth, translation, and rotation.',
    code: `#include <GL/glut.h>

void init() {
    glEnable(GL_DEPTH_TEST);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluPerspective(45.0, 1.0, 1.0, 100.0);
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
    glTranslatef(0.0f, 0.0f, -5.0f);
    glRotatef(30.0f, 1.0f, 1.0f, 0.0f);
    glutWireCube(2.0);
    glutSwapBuffers();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH);
    glutCreateWindow("3D Transformation");
    init();
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}`,
    blanks: ['<GL/glut.h>', 'glEnable', 'GL_DEPTH_TEST', 'glMatrixMode', 'GL_PROJECTION', 'glLoadIdentity', 'gluPerspective', 'GL_MODELVIEW', 'glTranslatef', 'glRotatef', 'glutWireCube'],
    output: `A perspective wireframe cube rotated around its x and y axes.

            +────+
           /    /│
          +────+ │
          │    │ +
          │    │/
          +────+`,
  },
  {
    module: 8,
    name: 'Lit teapot',
    focus: 'Depth testing, light properties, material properties, and normals.',
    code: `#include <GL/glut.h>

void init() {
    GLfloat lightPosition[] = { 2.0f, 3.0f, 4.0f, 1.0f };
    GLfloat lightColor[] = { 1.0f, 1.0f, 1.0f, 1.0f };

    glEnable(GL_DEPTH_TEST);
    glEnable(GL_LIGHTING);
    glEnable(GL_LIGHT0);
    glLightfv(GL_LIGHT0, GL_POSITION, lightPosition);
    glLightfv(GL_LIGHT0, GL_DIFFUSE, lightColor);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluPerspective(45.0, 1.0, 1.0, 10.0);
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
    gluLookAt(0.0, 1.5, 4.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
    glutSolidTeapot(1.0);
    glutSwapBuffers();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH);
    glutCreateWindow("OpenGL Lighting");
    init();
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}`,
    blanks: ['<GL/glut.h>', 'GLfloat', 'glEnable', 'GL_LIGHTING', 'GL_LIGHT0', 'glLightfv', 'GL_POSITION', 'GL_DIFFUSE', 'GL_DEPTH_BUFFER_BIT', 'gluLookAt', 'glutSolidTeapot'],
    output: `A solid teapot with a bright upper-right side and shaded contours.

            ______
         __/  ◐   \\__
        /            _\\>
        \\____________/`,
  },
];

export default fullLessons;
