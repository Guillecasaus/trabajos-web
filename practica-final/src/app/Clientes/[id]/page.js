import FormularioCliente from "@/app/Components/ComponentesCliente/FormularioCliente";

export default function EditarClientePage({ params }) {
  const { id } = params; 
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Cliente</h1>
      <FormularioCliente clienteId={id} />
    </div>
  );
}
