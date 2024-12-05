import { useState } from "react";

const ModalConfirmacion = ({ mensaje, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="text-center">
          <div className="text-4xl text-blue-500 mb-4">✔️</div>
          <h2 className="text-lg font-semibold mb-2">{mensaje}</h2>
          <p className="text-gray-500 mb-6">
            ¿Quieres crear otro cliente o finalizar?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => onConfirm(true)}
            >
              Crear otro
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => onConfirm(false)}
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
