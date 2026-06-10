export function SiteFooter() {
  return (
    <footer className="bg-inkt text-zand/70 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-7 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <p>© {new Date().getFullYear()} Nacholito · Sample Kitchen B.V. · KVK 84282495</p>
        <p>
          Goeseelsstraat 16, 4817 MV Breda ·{' '}
          <a href="mailto:info@nacholito.nl" className="text-geel hover:underline">info@nacholito.nl</a>
        </p>
      </div>
    </footer>
  )
}
