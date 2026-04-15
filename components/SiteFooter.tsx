export function SiteFooter() {
  return (
    <footer className="bg-navy border-t border-navy-light mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Sample Kitchen B.V. · Goeseelsstraat, Breda</p>
        <p>Vragen? <a href="mailto:info@nacholito.nl" className="text-gold hover:underline">info@nacholito.nl</a></p>
      </div>
    </footer>
  )
}
