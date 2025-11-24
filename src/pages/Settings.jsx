import clsx from 'clsx';
<<<<<<< HEAD
import { useState, useMemo } from 'react';
=======
import { useState, useMemo, useCallback } from 'react';
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
import Nav from '../layouts/Nav';
import theme from '../styles/theming.module.css';
import { Search, HatGlasses, Palette, Globe, Wrench } from 'lucide-react';
import { useOptions } from '/src/utils/optionsContext';
import RenderSetting from '../components/Settings';
import { privacyConfig, customizeConfig, browsingConfig, advancedConfig } from '/src/data/settings';
<<<<<<< HEAD
import { colors, transitions } from '../utils/theme';

const configs = [
  { name: 'Privacy', icon: HatGlasses, keywords: ['title', 'cloak', 'cloaking', 'tab cloak', 'about', 'about:blank', 'blank'], fn: privacyConfig },
  { name: 'Customize', icon: Palette, keywords: ['theme', 'color', 'appearance', 'ui', 'interface', 'games', 'pages', 'apps', 'scale', 'nav', 'navigation bar', 'nav bar', 'navbar', 'size', 'donate', 'donation', 'tabs bar', 'tab bar'], fn: customizeConfig },
  { name: 'Browsing', icon: Globe, keywords: ['tabs', 'tab', 'proxy engine', 'search engine', 'scramjet', 'ultraviolet'], fn: browsingConfig },
  { name: 'Advanced', icon: Wrench, keywords: ['wisp', 'proxy', 'ultraviolet', 'bare', 'leave confirmation', 'debug', 'experimental', 'inspect', 'reset instance', 'clear cache'], fn: advancedConfig },
=======
import { colors, transitions, shadows } from '../utils/theme';

const configs = [
  { name: 'Privacy', icon: HatGlasses, keywords: ['title','cloak','cloaking','tab cloak','about','about:blank','blank'], fn: privacyConfig },
  { name: 'Customize', icon: Palette, keywords: ['theme','color','appearance','ui','interface','games','pages','apps','scale','nav','navigation bar','nav bar','navbar','size','donate','donation','tabs bar','tab bar'], fn: customizeConfig },
  { name: 'Browsing', icon: Globe, keywords: ['tabs','tab','proxy engine','search engine','scramjet','ultraviolet'], fn: browsingConfig },
  { name: 'Advanced', icon: Wrench, keywords: ['wisp','proxy','ultraviolet','bare','leave confirmation','debug','experimental','inspect','reset instance','clear cache'], fn: advancedConfig },
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
];

const Settings = () => {
  const { options, updateOption } = useOptions();
  const [q, setQ] = useState('');
  const [content, setContent] = useState('Privacy');

  const settings = useMemo(
    () => configs.map(({ fn, ...c }) => ({
      ...c,
      items: Object.values(fn({ options, updateOption })).map(({ name, desc }) => ({ name, desc })),
    })),
    [options, updateOption]
  );

  const fq = q.trim().toLowerCase();

  const filtered = useMemo(() =>
    !fq ? settings : settings.filter(({ name, keywords, items }) =>
      name.toLowerCase().includes(fq) ||
      keywords.some((kw) => kw.toLowerCase().includes(fq)) ||
      items.some((i) => i.name.toLowerCase().includes(fq))
    ), [settings, fq]);

  const matchCount = useMemo(() =>
    settings.reduce((c, s) => c + s.items.filter((i) => i.name.toLowerCase().includes(fq)).length, 0),
    [settings, fq]
  );

  const showKeywordTip = !!fq && filtered.length > 0 && !filtered.some(s => s.name.toLowerCase().includes(fq)) &&
    filtered.some(s => s.keywords.some(kw => kw.toLowerCase().includes(fq)));

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: colors.dark[800] }}>
<<<<<<< HEAD
      <div className="shrink-0" style={{ position: 'relative', zIndex: 100 }}>
        <Nav />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
=======
      <div className="shrink-0"><Nav /></div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div 
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
          className="w-72 shrink-0 overflow-y-auto"
          style={{
            backgroundColor: colors.dark[900],
            borderRight: `1px solid ${colors.dark[700]}`,
            padding: '1.5rem 1rem',
<<<<<<< HEAD
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Search Bar - Fixed z-index and visibility */}
          <div
=======
          }}
        >
          {/* Search Bar */}
          <div 
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
            className="flex items-center h-10 rounded-lg px-3 mb-6"
            style={{
              backgroundColor: colors.dark[800],
              border: `1px solid ${colors.border.light}`,
              transition: `all ${transitions.base}`,
<<<<<<< HEAD
              position: 'relative',
              zIndex: 50,
=======
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.mint[400];
              e.currentTarget.style.boxShadow = `0 0 0 3px rgba(43, 217, 167, 0.1)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = colors.border.light;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
<<<<<<< HEAD
            <Search className="w-4 mr-2" style={{ color: colors.text.muted, flexShrink: 0 }} />
=======
            <Search className="w-4 mr-2" style={{ color: colors.text.muted }} />
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
            <input
              type="text"
              placeholder="Search settings..."
              className="bg-transparent outline-none w-full text-sm"
              style={{ color: colors.text.primary }}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          {/* Tips */}
          {showKeywordTip && (
<<<<<<< HEAD
            <div
              className="mb-3 text-xs text-center px-2 py-2 rounded-lg"
              style={{
                color: colors.mint[400],
                backgroundColor: `rgba(43, 217, 167, 0.1)`,
                opacity: 1,
                visibility: 'visible',
=======
            <div 
              className="mb-3 text-xs text-center px-2 py-2 rounded-lg"
              style={{ 
                color: colors.mint[400],
                backgroundColor: `rgba(43, 217, 167, 0.1)`,
                animation: 'fadeIn 0.3s ease-out',
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
              }}
            >
              May contain what you're looking for
            </div>
          )}
          {fq && matchCount > 1 && (
<<<<<<< HEAD
            <div
              className="mb-3 text-xs text-center px-2 py-2 rounded-lg"
              style={{
                color: colors.text.muted,
                backgroundColor: colors.dark[800],
                opacity: 1,
                visibility: 'visible',
=======
            <div 
              className="mb-3 text-xs text-center px-2 py-2 rounded-lg"
              style={{ 
                color: colors.text.muted,
                backgroundColor: colors.dark[800],
                animation: 'fadeIn 0.3s ease-out',
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
              }}
            >
              Found {matchCount} matching settings
            </div>
          )}

          {/* Category List */}
          <div className="flex flex-col gap-2">
            {filtered.map(({ name, icon: Icon, items }) => {
              const matched = fq ? items.filter(i => i.name.toLowerCase().includes(fq)) : [];
              const isActive = content === name;
<<<<<<< HEAD

=======
              
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
              return (
                <div
                  key={name}
                  className="w-full flex flex-col rounded-lg cursor-pointer overflow-hidden"
                  style={{
                    backgroundColor: isActive ? colors.mint[400] : 'transparent',
                    transition: `all ${transitions.base}`,
<<<<<<< HEAD
                    opacity: 1,
                    visibility: 'visible',
                  }}
                  onClick={() => setContent(prev => prev === name ? '' : name)}
=======
                    animation: 'slideUp 0.3s ease-out',
                  }}
                  onClick={() => setContent(prev => prev===name ? '' : name)}
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = colors.dark[800];
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
<<<<<<< HEAD
                  <div
=======
                  <div 
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
                    className="flex items-center px-4 py-3"
                    style={{
                      color: isActive ? colors.dark[900] : colors.text.secondary,
                    }}
                  >
                    <Icon className="w-5" strokeWidth={isActive ? 2.5 : 2} />
                    <p className="ml-3 font-semibold text-sm">{name}</p>
                  </div>
                  {matched.length > 0 && (
<<<<<<< HEAD
                    <p
                      className="ml-12 mr-4 pb-2 text-xs truncate"
                      style={{
                        color: isActive ? colors.dark[800] : colors.text.muted,
                      }}
                    >
                      {matched.map(i => i.name).join(', ')}
=======
                    <p 
                      className="ml-12 mr-4 pb-2 text-xs truncate"
                      style={{ 
                        color: isActive ? colors.dark[800] : colors.text.muted,
                      }}
                    >
                      {matched.map(i=>i.name).join(', ')}
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
<<<<<<< HEAD
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            position: 'relative',
            zIndex: 0,
          }}
        >
=======
        <div style={{ flex: 1, overflow: 'auto' }}>
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
          <RenderSetting setting={content} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
