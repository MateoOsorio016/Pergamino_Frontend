
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import FormModal, { FormField } from "@/components/shared/FormModal";
import { toast } from "sonner";

const FormModalExample = () => {
  const [open, setOpen] = useState(false);
  
  // Define los campos del formulario
  const formFields: FormField[] = [
    {
      name: "name",
      label: "Nombre",
      type: "text",
      placeholder: "Ingresa tu nombre",
      required: true,
    },
    {
      name: "email",
      label: "Correo Electrónico",
      type: "email",
      placeholder: "ejemplo@correo.com",
      required: true,
    },
    {
      name: "role",
      label: "Rol",
      type: "select",
      placeholder: "Selecciona un rol",
      options: [
        { label: "Administrador", value: "admin" },
        { label: "Usuario", value: "user" },
        { label: "Invitado", value: "guest" },
      ],
      required: true,
    },
    {
      name: "description",
      label: "Descripción",
      type: "textarea",
      placeholder: "Describe el propósito...",
    },
    {
      name: "active",
      label: "Usuario Activo",
      type: "checkbox",
    },
  ];

  // Maneja el envío del formulario
  const handleSubmit = (data: any) => {
    console.log("Datos del formulario:", data);
    toast.success("Formulario enviado con éxito");
    setOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Ejemplo de FormModal</h2>
      <Button onClick={() => setOpen(true)}>Abrir Formulario</Button>
      
      <FormModal
        open={open}
        onOpenChange={setOpen}
        title="Formulario de Ejemplo"
        fields={formFields}
        onSubmit={handleSubmit}
        defaultValues={{
          name: "",
          email: "",
          role: "",
          description: "",
          active: false,
        }}
        submitText="Enviar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default FormModalExample;
