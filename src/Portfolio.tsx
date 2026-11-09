import { Arrow } from './Hero'
import type { ReactNode } from 'react'

function SectionIndex({ number, children }: { number: string; children: ReactNode }) {
  return <p className="eyebrow section-index"><span>{number}</span><i aria-hidden="true" />{children}</p>
}

function ProductArtwork() {
  return (
    <div className="work-art product-art" aria-hidden="true">
      <div className="art-index"><span>PLATE 01</span><span>FORM / FLOW</span></div>
      <svg viewBox="0 0 400 200" fill="none" className="product-illustration">
        <path d="M30 100h340M200 15v170" stroke="#a37669" strokeDasharray="3 6" />
        <g stroke="#733e35" strokeWidth="1.2">
          <rect x="70" y="55" width="98" height="90" rx="4" />
          <rect x="152" y="38" width="98" height="124" rx="4" fill="#e4c9bb" />
          <rect x="232" y="55" width="98" height="90" rx="4" />
          <path d="M92 83h39m-39 11h25m-25 28h30m137-39h43m-43 11h25m-25 28h30" />
          <circle cx="201" cy="97" r="28" fill="#733e35" />
          <path d="M187 98h26m-10-10 10 10-10 10" stroke="#f6f2ea" />
        </g>
      </svg>
      <div className="art-index"><span>01 — STUDIES</span><span>✳</span></div>
    </div>
  )
}

function PrototypeArtwork() {
  return (
    <div className="work-art prototype-art" aria-hidden="true">
      <div className="art-index"><span>PLATE 02</span><span>SIGNAL / RESPONSE</span></div>
      <svg viewBox="0 0 400 200" fill="none" className="product-illustration">
        <g stroke="#9b9e84" strokeWidth="1" opacity=".55">
          <path d="M36 55h328M36 100h328M36 145h328M64 28v144m68-144v144m68-144v144m68-144v144m68-144v144" />
        </g>
        <path d="M36 145c48 0 53-74 97-74 30 0 40 46 67 46 43 0 51-62 85-62 31 0 42 42 79 42" stroke="#dedebc" strokeWidth="2" />
        <g fill="#dedebc">
          <circle cx="133" cy="71" r="5" /><circle cx="200" cy="117" r="5" /><circle cx="285" cy="55" r="5" />
        </g>
        <circle cx="200" cy="117" r="15" stroke="#dedebc" />
      </svg>
      <div className="art-index"><span>02 — STUDIES</span><span>⌁</span></div>
    </div>
  )
}

function MotionDiagram() {
  return (
    <div className="motion-diagram" aria-hidden="true">
      <div className="motion-label"><span>POINTER POSITION</span><span>FIG. 01</span></div>
      <div className="motion-track">
        <span className="motion-marker" />
        {Array.from({ length: 21 }, (_, tick) => <i key={tick} />)}
      </div>
      <div className="motion-label"><span>LEFT</span><span>CENTRE</span><span>RIGHT</span></div>
    </div>
  )
}

export default function Portfolio() {
  return (
    <>
      <section id="work" tabIndex={-1} className="portfolio-section shell" aria-labelledby="work-title">
        <SectionIndex number="01">Work</SectionIndex>
        <div className="section-heading">
          <h2 id="work-title">Selected <em>work.</em></h2>
          <p>Space for case studies in product design and building.</p>
        </div>
        <div className="work-grid">
          <article className="work-card">
            <ProductArtwork />
            <div className="work-caption">
              <h3>Product design</h3>
              <span className="eyebrow">Case study to come</span>
            </div>
          </article>
          <article className="work-card">
            <PrototypeArtwork />
            <div className="work-caption">
              <h3>Prototypes &amp; tools</h3>
              <span className="eyebrow">Case study to come</span>
            </div>
          </article>
        </div>
      </section>

      <section id="experiments" tabIndex={-1} className="portfolio-section shell" aria-labelledby="experiments-title">
        <SectionIndex number="02">Experiments</SectionIndex>
        <div className="section-heading">
          <h2 id="experiments-title">Experiments.</h2>
          <p>Small prototypes that explore how an interaction feels.</p>
        </div>
        <article className="motion-card">
          <div>
            <p className="eyebrow">Study 01 <span aria-hidden="true">/</span> Interaction</p>
            <h3>Cursor-controlled portrait</h3>
            <p>Move across the hero and the portrait turns with you. This study pairs the horizontal position of the pointer with a moment in a short film.</p>
            <a className="text-link" href="#home">Revisit the portrait <Arrow /></a>
          </div>
          <MotionDiagram />
        </article>
      </section>

      <section id="about" tabIndex={-1} className="portfolio-section shell" aria-labelledby="about-title">
        <SectionIndex number="03">About</SectionIndex>
        <div className="about-grid">
          <h2 id="about-title">Designer.<br /><em>Builder.</em></h2>
          <p>I’m Sasi, a product designer and builder. This portfolio brings together the products I design and the things I build to try ideas out.</p>
        </div>
      </section>

      <section id="contact" tabIndex={-1} className="contact-section shell" aria-labelledby="contact-title">
        <div className="contact-inner">
          <SectionIndex number="04">Contact</SectionIndex>
          <h2 id="contact-title">Let’s <em>talk.</em></h2>
          <p>Contact details will be added here.</p>
        </div>
      </section>
    </>
  )
}
