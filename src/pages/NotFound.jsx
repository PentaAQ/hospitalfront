export const NotFound = () => {
  const goBack = () => window.history.back();

  return (
    <div className="min-h-screen bg-linear-gradient-to-br from-sky-50 via-sky-100 to-sky-200 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white/80 backdrop-blur shadow-xl rounded-2xl border border-sky-100 p-8 md:p-10 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-600 font-semibold text-2xl">
          404
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
          Página no encontrada
        </h1>
        <p className="text-slate-600 mb-8 text-sm md:text-base">
          Lo sentimos, la página que estás buscando no existe o fue movida.
          Verifica la dirección o vuelve al panel principal.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            Ir al inicio
          </a>
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  );
};
