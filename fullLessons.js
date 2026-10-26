const fullLessons = [
  {
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
    blanks: ['glBegin', 'glEnd', 'glPushMatrix', 'glTranslatef', 'glPopMatrix', 'glutDisplayFunc', 'glutMainLoop'],
  },
  {
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
    blanks: ['GLfloat', 'glEnableClientState', 'glVertexPointer', 'glColorPointer', 'glDrawArrays', 'glDisableClientState'],
  },
  {
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
    blanks: ['glGenBuffers', 'glBindBuffer', 'glBufferData', 'glBufferSubData', 'glVertexPointer', 'glColorPointer'],
  },
  {
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
    blanks: ['glEnable', 'GL_DEPTH_BUFFER_BIT', 'glMatrixMode', 'glLoadIdentity', 'gluPerspective', 'glTranslatef', 'glRotatef', 'glDrawArrays', 'glDisableClientState'],
  },
];

export default fullLessons;
