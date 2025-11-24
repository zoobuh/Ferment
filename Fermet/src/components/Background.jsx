import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useOptions } from '/src/utils/optionsContext';

const Background = () => {
  const { options } = useOptions();
  const { pathname } = useLocation();
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const playingRef = useRef(true);
  const lastFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const cyan = '#2BD6A5';
    const back = '#1E1F22';

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const SHAPE_COUNT = prefersReduced ? 3 : 6;

    const shapes = Array.from({ length: SHAPE_COUNT }).map((_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 12 + Math.random() * 18,
      dx: (Math.random() * 0.08 + 0.03) * (Math.random() > 0.5 ? 1 : -1),
      dy: (Math.random() * 0.08 + 0.03) * (Math.random() > 0.5 ? 1 : -1),
      a: 0.12 + Math.random() * 0.1,
    }));

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      draw(0);
    };

    const FPS = 12; // cap frames per second
    const frameInterval = 1000 / FPS;

    const isSimplePage = pathname.startsWith('/settings') || pathname.startsWith('/apps') || pathname.startsWith('/games');

    const draw = (ts) => {
      if (options?.performanceMode || isSimplePage) {
        // when performance mode is on, clear and pause
        // render a simple solid black to avoid any overlay/contrast issues
        const { width, height } = canvas;
        ctx.fillStyle = back;
        ctx.fillRect(0, 0, width, height);
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      if (!playingRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      if (ts - lastFrameRef.current < frameInterval) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameRef.current = ts;
      const { width, height } = canvas;
      ctx.save();
      // clear with soft vignette
      ctx.fillStyle = back;
      ctx.fillRect(0, 0, width, height);

      // subtle dots only on heavy pages, not on simple pages
      if (!isSimplePage) {
        const step = 32 * DPR;
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = cyan;
        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            ctx.fillRect(x, y, 2 * DPR, 2 * DPR);
          }
        }
      }

      // animated soft cyan glows
      ctx.globalAlpha = 1;
      shapes.forEach(s => {
        s.x += s.dx / 1000 * width;
        s.y += s.dy / 1000 * height;
        if (s.x < 0 || s.x > width) s.dx *= -1;
        if (s.y < 0 || s.y > height) s.dy *= -1;

        ctx.beginPath();
        const gx = s.x;
        const gy = s.y;
        const gr = ctx.createRadialGradient(gx, gy, 0, gx, gy, s.r * DPR * 9);
        gr.addColorStop(0, `${cyan}33`);
        gr.addColorStop(1, '#00000000');
        ctx.fillStyle = gr;
        ctx.arc(gx, gy, s.r * DPR * 9, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    };

    // Visibility and input focus performance optimizations
    const onVisibility = () => { playingRef.current = !document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    let typingTimer = 0;
    const pauseTyping = () => {
      playingRef.current = false;
      clearTimeout(typingTimer);
      typingTimer = window.setTimeout(() => {
        if (!document.hidden) playingRef.current = true;
      }, 350);
    };

    const onFocusIn = (e) => {
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
        playingRef.current = false;
      }
    };
    const onFocusOut = (e) => {
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
        playingRef.current = !document.hidden;
      }
    };
    window.addEventListener('focusin', onFocusIn);
    window.addEventListener('focusout', onFocusOut);

    // Specifically pause while typing in the main search input
    const searchDiv = document.getElementById('search-div');
    const searchInput = searchDiv ? searchDiv.querySelector('input') : null;
    if (searchInput) {
      searchInput.addEventListener('keydown', pauseTyping);
      searchInput.addEventListener('input', pauseTyping);
    }

    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focusin', onFocusIn);
      window.removeEventListener('focusout', onFocusOut);
      if (searchInput) {
        searchInput.removeEventListener('keydown', pauseTyping);
        searchInput.removeEventListener('input', pauseTyping);
      }
    };
  }, [options?.performanceMode, pathname]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: '#000',
      }}
    />
  );
};

export default Background;
