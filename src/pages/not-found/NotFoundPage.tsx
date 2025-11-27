export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-xl">Страница не найдена</p>
      <a href="/" className="btn btn-primary">
        На главную
      </a>
    </div>
  )
}
