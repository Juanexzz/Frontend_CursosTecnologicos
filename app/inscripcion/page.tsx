"use client";

import React, { useState, Suspense } from "react";
import { EnrollmentForm } from "@/features/inscripciones/components/EnrollmentForm";

export default function InscripcionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "¿Las clases son en vivo o pregrabadas?",
      a: "Combinamos sesiones magistrales en vivo con mentores senior (con grabación disponible 24/7) y módulos prácticos asíncronos para que avances a tu propio ritmo."
    },
    {
      q: "¿Qué métodos de pago aceptan?",
      a: "Aceptamos tarjetas de crédito/débito internacionales (Visa, Mastercard, Amex), transferencias bancarias locales y facilidades de pago en hasta 3 cuotas sin interés."
    },
    {
      q: "¿Existe certificado al graduarme?",
      a: "Sí. Al aprobar la entrega del proyecto integrador final y las revisiones de código recibirás un certificado verificable digitalmente para tu perfil de LinkedIn y CV."
    },
    {
      q: "¿Qué pasa si tengo dudas durante la semana?",
      a: "Tendrás acceso a canales de mentoría dedicados en Discord, donde los docentes y compañeros resuelven dudas técnicas diariamente con horarios de oficina fijados."
    }
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Admisiones 2026
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-2">
          Inscripción y Asesoría Académica
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
          Completa el formulario para postularte a cualquiera de nuestros cursos o agendar una llamada de orientación personalizada con un asesor educativo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Formulario a la izquierda */}
        <div className="lg:col-span-7">
          <Suspense fallback={<div className="p-8 text-center text-sm text-gray-500">Cargando formulario...</div>}>
            <EnrollmentForm />
          </Suspense>
        </div>

        {/* Proceso y FAQ a la derecha */}
        <div className="lg:col-span-5 space-y-8">
          {/* Proceso */}
          <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">¿Cómo funciona el proceso?</h3>
            <ol className="space-y-4 text-xs text-gray-600 dark:text-gray-400 list-decimal pl-4 leading-relaxed">
              <li>
                <strong className="text-gray-900 dark:text-white">Envío de solicitud:</strong> Recibimos tus datos y validamos cupos en la cohorte elegida.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Contacto del asesor:</strong> En menos de 24 horas te contactamos para resolver dudas y coordinar métodos de pago.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Acceso a la plataforma:</strong> Recibes tus credenciales para el campus virtual y el canal privado de Discord con tu mentor.
              </li>
            </ol>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Preguntas Frecuentes</h3>
            <div className="space-y-2.5">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full text-left p-4 text-xs font-bold text-gray-900 dark:text-white flex justify-between items-center"
                    >
                      <span>{faq.q}</span>
                      <span className="text-base text-gray-400 ml-2">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-xs text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-750">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
