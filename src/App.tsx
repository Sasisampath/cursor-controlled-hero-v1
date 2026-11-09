import { useRef, useState } from 'react'
import Hero, { Arrow } from './Hero'
import Portfolio from './Portfolio'

const links = [
  { id: 'work', label: 'Work' },
  { id: 'experiments', label: 'Experiments' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const menu = useRef<HTMLButtonElement>(null)

  return (
    <header className="masthead shell" onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        menu.current?.focus()
      }
    }}>
      <a className="wordmark" href="#home" aria-label="Sasi, home" onClick={() => setOpen(false)}>
        <span className="monogram" aria-hidden="true">S</span>
        <span>Sasi</span>
      </a>
      <button type="button" className="menu-toggle" ref={menu} aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Menu'}
        <svg viewBox="0 0 20 20" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          {open ? <path d="m5 5 10 10M5 15 15 5" /> : <path d="M3 7h14M3 13h14" />}
        </svg>
      </button>
      <nav className="site-nav" id="primary-nav" aria-label="Primary" data-open={open}>
        {links.map(({ id, label }) => (
          <a key={id} href={'#' + id} onClick={() => {
            if (!open) return
            document.getElementById(id)?.focus({ preventScroll: true })
            setOpen(false)
          }}>
            {label}{id === 'contact' && <Arrow />}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Portfolio />
      </main>
      <footer className="footer shell">
        <span className="eyebrow">Sasi <span className="footer-slash">/</span> Portfolio</span>
        <a className="text-link" href="#home">Back to top <Arrow direction="up" /></a>
      </footer>
    </>
  )
}
