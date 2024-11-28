import { NextResponse } from "next/server";

// Simulación de datos (reemplázalo con lógica real de base de datos)
let projects = [
  { id: 1, name: "Proyecto A", location: "Madrid", clientName: "Cliente A", status: "En marcha" },
  { id: 2, name: "Proyecto B", location: "Barcelona", clientName: "Cliente B", status: "Finalizado" },
];

// GET `/api/project/one/:id`
export async function GET(req, { params }) {
  const project = projects.find((p) => p.id === parseInt(params.id));
  if (!project) {
    return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
  }
  return NextResponse.json(project);
}

// PUT `/api/project/one/:id`
export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const projectIndex = projects.findIndex((p) => p.id === parseInt(params.id));
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
    }
    projects[projectIndex] = { ...projects[projectIndex], ...body };
    return NextResponse.json(projects[projectIndex]);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar el proyecto" }, { status: 400 });
  }
}

// DELETE `/api/project/one/:id`
export async function DELETE(req, { params }) {
  const projectIndex = projects.findIndex((p) => p.id === parseInt(params.id));
  if (projectIndex === -1) {
    return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
  }
  const deletedProject = projects.splice(projectIndex, 1);
  return NextResponse.json(deletedProject);
}
