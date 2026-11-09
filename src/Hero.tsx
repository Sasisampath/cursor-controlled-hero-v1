import { useEffect, useRef, useState } from 'react'

const poster = '/assets/character-poster.webp'
const clip = '/assets/character-turn-web.mp4'
const interactiveMedia = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
const frameSeconds = 1 / 24

function usePortraitScrub() {
  const hero = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const area = hero.current
    const media = video.current
    // Touch hardware keeps the poster even if it also reports a fine pointer.
    if (!area || !media || navigator.maxTouchPoints > 0) return

    const eligibility = window.matchMedia(interactiveMedia)
    let dispose = () => {}

    function syncMode() {
      dispose()
      setReady(false)
      if (eligibility.matches && area && media) dispose = startScrubbing(area, media, setReady)
    }

    syncMode()
    eligibility.addEventListener('change', syncMode)
    return () => {
      eligibility.removeEventListener('change', syncMode)
      dispose()
    }
  }, [])

  return { hero, video, ready }
}

function startScrubbing(hero: HTMLElement, video: HTMLVideoElement, setReady: (ready: boolean) => void) {
  const listeners = new AbortController()
  const options = { signal: listeners.signal }
  let target = 0.5
  let smoothed = 0.5
  let initialized = false
  let centered = false
  let frame = 0
  let timeout = 0

  function stop() {
    listeners.abort()
    cancelAnimationFrame(frame)
    window.clearTimeout(timeout)
    video.removeAttribute('src')
    video.load()
  }

  function fail() {
    setReady(false)
    stop()
  }

  function seek(time: number) {
    window.clearTimeout(timeout)
    timeout = window.setTimeout(fail, 2500)
    try {
      video.currentTime = time
    } catch {
      fail()
    }
  }

  function queue() {
    if (!frame && !listeners.signal.aborted) frame = requestAnimationFrame(update)
  }

  function update() {
    frame = 0
    if (!centered || video.seeking) return

    const end = Math.max(0, video.duration - frameSeconds)
    if (video.seekable.length === 0 || video.seekable.end(video.seekable.length - 1) < end) return

    // Keep the latest input while the decoder is busy. Aim at a frame boundary
    // and resume after seeked so a slow decode never accumulates pending seeks.
    smoothed += (target - smoothed) * 0.37
    const settling = Math.abs(target - smoothed) * end > frameSeconds / 2
    if (!settling) smoothed = target
    const next = Math.min(end, Math.round(smoothed * end / frameSeconds) * frameSeconds)

    if (Math.abs(video.currentTime - next) >= frameSeconds * 0.85) seek(next)
    else if (settling) queue()
  }

  function initialize() {
    const midpoint = video.duration * 0.5
    if (initialized || !Number.isFinite(midpoint) || midpoint <= 0 || !video.seekable.length) return
    if (video.seekable.start(0) > midpoint || video.seekable.end(video.seekable.length - 1) < midpoint) return
    initialized = true
    seek(midpoint)
  }

  function onSeeked() {
    if (!initialized) return
    window.clearTimeout(timeout)
    if (!centered) {
      centered = true
      setReady(true)
    }
    queue()
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType !== 'mouse') return
    const { left, width } = hero.getBoundingClientRect()
    if (!width) return
    target = Math.max(0, Math.min(1, (event.clientX - left) / width))
    queue()
  }

  hero.addEventListener('pointermove', onPointerMove, options)
  hero.addEventListener('pointerleave', () => {
    target = 0.5
    queue()
  }, options)
  video.addEventListener('seeked', onSeeked, options)
  video.addEventListener('error', fail, options)
  for (const event of ['loadedmetadata', 'loadeddata', 'progress', 'canplay']) {
    video.addEventListener(event, () => {
      initialize()
      if (centered) queue()
    }, options)
  }

  timeout = window.setTimeout(fail, 8000)
  video.src = clip
  video.load()

  return () => {
    if (!listeners.signal.aborted) stop()
  }
}

export function Arrow({ direction = 'diagonal' }: { direction?: 'diagonal' | 'down' | 'up' }) {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
      {direction === 'down' ? <path d="M10 3v13m-5-5 5 5 5-5" /> :
        direction === 'up' ? <path d="M10 17V4m-5 5 5-5 5 5" /> :
          <path d="M5 15 15 5M6 5h9v9" />}
    </svg>
  )
}

export default function Hero() {
  const { hero, video, ready } = usePortraitScrub()

  return (
    <section id="home" ref={hero} className="hero shell" aria-labelledby="hero-title">
      <div className="hero-main">
        <div className="hero-copy">
          <div className="eyebrow hero-role"><span />Product Designer &amp; Builder</div>
          <h1 id="hero-title">Hi, I&apos;m Sasi.</h1>
          <p className="hero-statement">I design products<br />and <em>build things.</em></p>
          <div className="hero-actions flex flex-wrap items-center gap-3">
            <a className="button button-primary" href="#work">View my work <Arrow direction="down" /></a>
            <a className="button button-secondary" href="#contact">Let&apos;s talk <Arrow /></a>
          </div>
        </div>

        <figure className="portrait">
          <div className="portrait-heading eyebrow" aria-hidden="true">
            <span>Fig. 01</span><span>Self-portrait</span>
          </div>
          <div className="portrait-stage">
            <div className="portrait-image">
              <img src={poster} width="1600" height="900" alt="Portrait of Sasi" fetchPriority="high" />
              <video ref={video} className={ready ? 'is-ready' : ''} poster={poster} muted playsInline preload="auto" aria-hidden="true" />
            </div>
            <i className="corner top-left" /><i className="corner top-right" />
            <i className="corner bottom-left" /><i className="corner bottom-right" />
          </div>
          <figcaption className="portrait-caption eyebrow">
            <span className="portrait-mode"><span className="status-dot" />{ready ? 'Interactive portrait' : 'Portrait study'}</span>
            <span className="portrait-hint">{ready ? 'Move your cursor' : 'Studio still'} <span aria-hidden="true">{ready ? '↔' : '·'}</span></span>
          </figcaption>
        </figure>
      </div>
      <div className="hero-index eyebrow">
        <a href="#work"><Arrow direction="down" /> Explore the portfolio</a>
        <span>Portfolio index <span aria-hidden="true">/</span> 01–04</span>
      </div>
    </section>
  )
}
