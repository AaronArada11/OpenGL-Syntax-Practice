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
    output: `A window with a green rectangle centered on a dark background.

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
    translate(0.6f, 0.0f);
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
  {
    module: 7,
    name: 'Translation',
    focus: 'Transforms, matrix stack, and GLUT setup.',
    code: `#include <iostream>
#include <GL/glut.h>
using namespace std;

void triangle() {
    glBegin(GL_TRIANGLES);
        glVertex2f(-0.2f, -0.2f);
        glVertex2f( 0.2f, -0.2f);
        glVertex2f( 0.0f,  0.2f);
    glEnd();
}

void display(){
    glClear(GL_COLOR_BUFFER_BIT);

    //Original Triangle
    glColor3f(1.0f, 1.0f, 0.0f);

    //first translation
    glPushMatrix();
        glTranslatef(-0.5,0.0,0.0);
        triangle();
    glPopMatrix();

    //Moved Triangle
    glColor3f(0.0f, 1.0f, 1.0f);

    //Second translation
    glPushMatrix();
        glTranslatef(0.5, -0.5, 0.0);
        triangle();
    glPopMatrix();

    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitWindowSize(800, 600);
    glutCreateWindow("Translation Demo");

    glutDisplayFunc(display);
    glutMainLoop();

    return 0;
}`,
    blanks: ['<iostream>', '<GL/glut.h>', 'glBegin', 'glEnd', 'glPushMatrix', 'glTranslatef', 'glPopMatrix', 'glutDisplayFunc', 'glutMainLoop'],
    output: `A yellow triangle on the left and a cyan triangle lower on the right.

          △
      yellow              cyan △`,
  },
  {
    module: 4,
    name: 'Color arrays',
    focus: 'Client states, pointers, and indexed drawing.',
    code: `#include <iostream>
#include <GL/glut.h>
using namespace std;

// Triangle coordinates
GLfloat vertices[] = {
    -0.5f, -0.5f, 0.0f,
     0.5f, -0.5f, 0.0f,
     0.0f,  0.5f, 0.0f
};

// RGB color for each vertex
GLfloat colors[] = {
    1.0f, 0.0f, 0.0f, // Red
    0.0f, 1.0f, 0.0f, // Green
    0.0f, 0.0f, 1.0f  // Blue
};

void display() {
    glClear(GL_COLOR_BUFFER_BIT);

    glEnableClientState(GL_VERTEX_ARRAY);
    glEnableClientState(GL_COLOR_ARRAY);

    // Set vertex coordinates
    glVertexPointer(3, GL_FLOAT, 0, vertices);

    // Set vertex colors
    glColorPointer(3, GL_FLOAT, 0, colors);

    // Draw triangle
    glDrawArrays(GL_TRIANGLES, 0, 3);

    /*
    glBegin(GL_TRIANGLES);
        glArrayElement(0); // First vertex: Red
        glArrayElement(1); // Second vertex: Green
        glArrayElement(2); // Third vertex: Blue
    glEnd();
    */

    glDisableClientState(GL_COLOR_ARRAY);
    glDisableClientState(GL_VERTEX_ARRAY);

    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitWindowSize(800, 600);
    glutCreateWindow("Color Array Demo");

    glutDisplayFunc(display);
    glutMainLoop();

    return 0;
}`,
    blanks: ['<iostream>', '<GL/glut.h>', 'GLfloat', 'glEnableClientState', 'glVertexPointer', 'glColorPointer', 'glDrawArrays', 'glDisableClientState'],
    output: `A triangle whose three vertex colors blend across its face.

             B
            / \\
           /___\\
          R     G`,
  },
  {
    module: 5,
    name: 'VBO upload',
    focus: 'Buffer allocation, offsets, and GLEW setup.',
    code: `#define GLEW_STATIC
#include <GL/glew.h>
#include <GL/glut.h>
#include <iostream>
using namespace std;

GLuint VBO;

// Triangle coordinates
GLfloat vertices[] = {
    -0.5f, -0.5f, 0.0f,
     0.5f, -0.5f, 0.0f,
     0.0f,  0.5f, 0.0f
};

// RGB colors
GLfloat colors[] = {
    1.0f, 0.0f, 0.0f,
    0.0f, 1.0f, 0.0f,
    0.0f, 0.0f, 1.0f
};

void init() {
    if (glewInit() != GLEW_OK) {
        cout << "GLEW initialization failed!";
        exit(1);
    }

    glGenBuffers(1, &VBO);
    glBindBuffer(GL_ARRAY_BUFFER, VBO);

    // Allocate space for vertices and colors
    glBufferData(GL_ARRAY_BUFFER,
                 sizeof(vertices) + sizeof(colors),
                 NULL, GL_STATIC_DRAW);

    // Upload vertex coordinates
    glBufferSubData(GL_ARRAY_BUFFER,
                    0, sizeof(vertices), vertices);

    // Upload vertex colors
    glBufferSubData(GL_ARRAY_BUFFER,
                    sizeof(vertices),
                    sizeof(colors), colors);

    glBindBuffer(GL_ARRAY_BUFFER, 0);
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT);

    glBindBuffer(GL_ARRAY_BUFFER, VBO);

    glEnableClientState(GL_VERTEX_ARRAY);
    glEnableClientState(GL_COLOR_ARRAY);

    // Vertices begin at offset 0
    glVertexPointer(3, GL_FLOAT, 0, (void*)0);

    // Colors begin after the vertex data
    glColorPointer(3, GL_FLOAT, 0,
                   (void*)sizeof(vertices));

    glDrawArrays(GL_TRIANGLES, 0, 3);

    glDisableClientState(GL_COLOR_ARRAY);
    glDisableClientState(GL_VERTEX_ARRAY);

    glBindBuffer(GL_ARRAY_BUFFER, 0);
    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitWindowSize(800, 600);
    glutCreateWindow("VBO Color Array Demo");

    init();

    glutDisplayFunc(display);
    glutMainLoop();

    return 0;
}`,
    blanks: ['<GL/glew.h>', '<GL/glut.h>', 'glGenBuffers', 'glBindBuffer', 'glBufferData', 'glBufferSubData', 'glVertexPointer', 'glColorPointer'],
    output: `A red, green, and blue triangle drawn from one packed GPU buffer.

             B
            / \\
           /___\\
          R     G`,
  },
  {
    module: 6,
    name: '3D cube',
    focus: 'Depth testing, projection, transforms, and faces.',
    code: `#define GLEW_STATIC
#include <iostream>
#include <GL/glew.h>
#include <GL/glut.h>
using namespace std;

GLuint VBO;

// Cube vertices: 6 faces, 4 vertices each
GLfloat vertices[] = {
    // FRONT
    -1, -1,  1,
     1, -1,  1,
     1,  1,  1,
    -1,  1,  1,

    // BACK
    -1, -1, -1,
    -1,  1, -1,
     1,  1, -1,
     1, -1, -1,

    // TOP
    -1,  1, -1,
    -1,  1,  1,
     1,  1,  1,
     1,  1, -1,

    // BOTTOM
    -1, -1, -1,
     1, -1, -1,
     1, -1,  1,
    -1, -1,  1,

    // RIGHT
     1, -1, -1,
     1,  1, -1,
     1,  1,  1,
     1, -1,  1,

    // LEFT
    -1, -1, -1,
    -1, -1,  1,
    -1,  1,  1,
    -1,  1, -1
};

void init() {
    // Initialize GLEW
    if (glewInit() != GLEW_OK) {
        cout << "GLEW initialization failed!";
        exit(1);
    }

    glEnable(GL_DEPTH_TEST);

    // Create VBO
    glGenBuffers(1, &VBO);
    glBindBuffer(GL_ARRAY_BUFFER, VBO);

    // Upload cube vertices
    glBufferData(GL_ARRAY_BUFFER,
                 sizeof(vertices),
                 vertices,
                 GL_STATIC_DRAW);

    glBindBuffer(GL_ARRAY_BUFFER, 0);

    // Set perspective
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluPerspective(45.0, 800.0 / 600.0, 1.0, 100.0);
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();

    // Move cube away from camera
    glTranslatef(0.0f, 0.0f, -6.0f);

    // Rotate cube
    glRotatef(25.0f, 1.0f, 0.0f, 0.0f);
    //glRotatef(35.0f, 0.0f, 1.0f, 0.0f);

    // Bind VBO
    glBindBuffer(GL_ARRAY_BUFFER, VBO);

    // Enable vertex array
    glEnableClientState(GL_VERTEX_ARRAY);
    glVertexPointer(3, GL_FLOAT, 0, (void*)0);

    // Draw each face with different color
    glColor3f(1, 0, 0); // Red
    glDrawArrays(GL_QUADS, 0, 4);

    glColor3f(0, 1, 0); // Green
    glDrawArrays(GL_QUADS, 4, 4);

    glColor3f(0, 0, 1); // Blue
    glDrawArrays(GL_QUADS, 8, 4);

    glColor3f(1, 1, 0); // Yellow
    glDrawArrays(GL_QUADS, 12, 4);

    glColor3f(1, 0, 1); // Magenta
    glDrawArrays(GL_QUADS, 16, 4);

    glColor3f(0, 1, 1); // Cyan
    glDrawArrays(GL_QUADS, 20, 4);

    // Disable vertex array
    glDisableClientState(GL_VERTEX_ARRAY);
    glBindBuffer(GL_ARRAY_BUFFER, 0);

    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);

    glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB | GLUT_DEPTH);
    glutInitWindowSize(800, 600);
    glutCreateWindow("3D Cube Using VBO");

    init();

    glutDisplayFunc(display);
    glutMainLoop();

    return 0;
}`,
    blanks: ['<iostream>', '<GL/glew.h>', '<GL/glut.h>', 'glEnable', 'GL_DEPTH_BUFFER_BIT', 'glMatrixMode', 'glLoadIdentity', 'gluPerspective', 'glTranslatef', 'glRotatef', 'glDrawArrays', 'glDisableClientState'],
    output: `A rotated cube with a different color on each visible face.

            +────+
           /    /│
          +────+ │
          │    │ +
          │    │/
          +────+`,
  },
];

export default fullLessons;
