import Nav from '../layouts/Nav';
import { useState, useMemo, useRef, useEffect, useCallback, memo } from 'react';
import { Search, ChevronDown, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOptions } from '/src/utils/optionsContext';
import appsData from '../data/apps.json';
import styles from '../styles/apps.module.css';
import theme from '../styles/theming.module.css';
import Pagination from '@mui/material/Pagination';
import clsx from 'clsx';
import { colors, transitions, shadows } from '../utils/theme';

const SORT_OPTIONS = [
  { value: 'categorical', label: 'Categorical' },
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'newest', label: 'Newest' },
];

const transformExternalGame = (game) => ({
  appName: game.Title,
  desc: game.Category?.[0] || 'Game',
  icon: game.Asset?.find(url => url.includes('512x512')) || game.Asset?.[1] || game.Asset?.[0] || '',
  url: game.Url,
  disabled: false,
});

const loadExternalGames = async () => {
  try {
    const response = await fetch('/assets/games.json');
    if (!response.ok) {
      console.warn('External games file not found at /assets/games.json');
      return [];
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('External games file is not JSON format');
      return [];
    }
    const externalGames = await response.json();
    return Array.isArray(externalGames) ? externalGames.map(transformExternalGame) : [];
  } catch (error) {
    console.error('Failed to load external games:', error);
    return [];
  }
};


const AppCard = memo(({ app, onClick, fallbackMap, onImgError }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={app.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.5rem',
        borderRadius: '1rem',
        backgroundColor: colors.dark[900],
        border: `1px solid ${isHovered ? colors.mint[400] : colors.border.light}`,
        transition: `all ${transitions.base}`,
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? shadows.glowStrong : shadows.md,
        opacity: app.disabled ? 0.5 : 1,
        animation: 'fadeIn 0.4s ease-out',
      }}
      onClick={!app.disabled ? () => onClick(app) : undefined}
      onMouseEnter={() => !app.disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '14px',
          marginBottom: '1rem',
          overflow: 'hidden',
          backgroundColor: colors.dark[800],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: `transform ${transitions.base}`,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {fallbackMap[app.appName] ? (
          <LayoutGrid size={40} style={{ color: colors.mint[400] }} />
        ) : (
          <img
            src={app.icon}
            draggable="false"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={() => onImgError(app.appName)}
          />
        )}
      </div>
      <p
        style={{
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: colors.text.primary,
          textAlign: 'center',
          marginBottom: '0.25rem',
          wordBreak: 'break-word',
        }}
      >
        {app.appName}
      </p>
      <p
        style={{
          fontSize: '0.8125rem',
          color: colors.text.muted,
          textAlign: 'center',
          wordBreak: 'break-word',
        }}
      >
        {app.desc || ''}
      </p>
    </div>
  );
});

const Apps = memo(({ type = 'default', data = appsData, onAppClick }) => {
  const nav = useNavigate();
  const { options } = useOptions();
  const [appsList, setAppsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [q, setQ] = useState('');
  const [sort, setSort] = useState('categorical');
  const [page, setPage] = useState(1);
  const [showSort, setShowSort] = useState(false);
  const sortRef = useRef(null);
  const [fallback, setFallback] = useState({});

  const perPage = options.loadExternalGames && options.itemsPerPage === 10000
    ? 100
    : (options.itemsPerPage || 20);

  useEffect(() => {
    const loadGames = async () => {
      setIsLoading(true);
      const baseGames = data[type] || [];

      if (type === 'games' && options.loadExternalGames) {
        const externalGames = await loadExternalGames();
        const baseGameNames = new Set(baseGames.map(g => g.appName.toLowerCase()));
        const uniqueExternalGames = externalGames.filter(
          g => !baseGameNames.has(g.appName.toLowerCase())
        );
        setAppsList([...baseGames, ...uniqueExternalGames]);
      } else {
        setAppsList(baseGames);
      }

      setIsLoading(false);
    };

    loadGames();
  }, [data, type, options.loadExternalGames]);

  useEffect(() => {
    const close = (e) => !sortRef.current?.contains(e.target) && setShowSort(false);
    window.addEventListener('pointerdown', close);
    return () => window.removeEventListener('pointerdown', close);
  }, []);

  const indexedApps = useMemo(() => appsList.map((a, i) => ({ ...a, __i: i })), [appsList]);

  const sortedApps = useMemo(() => {
    switch (sort) {
      case 'alphabetical':
        return [...indexedApps].sort((a, b) => a.appName.localeCompare(b.appName, undefined, { sensitivity: 'base' }));
      case 'categorical':
        return [...indexedApps].sort((a, b) => (a.desc || '').localeCompare(b.desc || '', undefined, { sensitivity: 'base' }) || a.appName.localeCompare(b.appName, undefined, { sensitivity: 'base' }));
      case 'newest':
        return [...indexedApps].sort((a, b) => b.__i - a.__i);
      default:
        return indexedApps;
    }
  }, [indexedApps, sort]);

  const filtered = useMemo(() => {
    const fq = q.toLowerCase();
    const filteredApps = sortedApps.filter((a) => a.appName.toLowerCase().includes(fq));
    const totalPages = Math.ceil(filteredApps.length / perPage);
    const paged = filteredApps.slice((page - 1) * perPage, page * perPage);
    return { filteredApps, paged, totalPages };
  }, [sortedApps, q, page, perPage]);

  useEffect(() => {
    if (page > filtered.totalPages && filtered.totalPages > 0) setPage(1);
  }, [page, filtered.totalPages]);

  const navApp = useCallback((app) => {
    if (!app) return;
    if (onAppClick) {
      onAppClick(app);
      return;
    }
    sessionStorage.setItem('query', app.url);
    nav('/browser');
  }, [nav, onAppClick]);

  const handleSearch = useCallback((e) => {
    setQ(e.target.value);
    setPage(1);
  }, []);

  const handleImgError = useCallback((name) => setFallback((prev) => ({ ...prev, [name]: true })), []);

  const placeholder = useMemo(() => `Search ${appsList.length} ${type}`, [appsList.length, type]);

  return (
    <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      {/* Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            borderRadius: '12px',
            padding: '0 1rem',
            width: '100%',
            maxWidth: '600px',
            height: '48px',
            backgroundColor: colors.dark[900],
            border: `1px solid ${colors.border.light}`,
            transition: `all ${transitions.base}`,
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
          <Search size={18} style={{ color: colors.text.muted, flexShrink: 0 }} />
          <input
            type="text"
            placeholder={placeholder}
            value={q}
            onChange={handleSearch}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              outline: 'none',
              border: 'none',
              fontSize: '0.9375rem',
              color: colors.text.primary,
            }}
          />
          {type !== 'apps' && (
            <div ref={sortRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setShowSort((s) => !s)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  borderRadius: '8px',
                  padding: '0.375rem 0.75rem',
                  height: '32px',
                  cursor: 'pointer',
                  backgroundColor: colors.dark[800],
                  border: `1px solid ${colors.border.medium}`,
                  color: colors.text.secondary,
                  transition: `all ${transitions.base}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.dark[700];
                  e.currentTarget.style.borderColor = colors.mint[400];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.dark[800];
                  e.currentTarget.style.borderColor = colors.border.medium;
                }}
              >
                <span className="capitalize hidden sm:inline">{SORT_OPTIONS.find((o) => o.value === sort)?.label}</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: showSort ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: `transform ${transitions.base}`,
                  }}
                />
              </button>
              {showSort && (
                <ul
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 0.5rem)',
                    zIndex: 20,
                    width: '176px',
                    borderRadius: '8px',
                    border: `1px solid ${colors.border.medium}`,
                    boxShadow: shadows.xl,
                    padding: '0.25rem',
                    backgroundColor: colors.dark[900],
                    animation: 'fadeIn 0.2s ease-out',
                  }}
                  role="listbox"
                >
                  {SORT_OPTIONS.map(({ value, label }) => (
                    <li
                      key={value}
                      role="option"
                      aria-selected={sort === value}
                      onClick={() => { setSort(value); setShowSort(false); setPage(1); }}
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        transition: `all ${transitions.fast}`,
                        color: sort === value ? colors.mint[400] : colors.text.secondary,
                        backgroundColor: sort === value ? `rgba(43, 217, 167, 0.1)` : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (sort !== value) {
                          e.currentTarget.style.backgroundColor = colors.dark[800];
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (sort !== value) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        {isLoading ? (
          <div
            style={{
              gridColumn: '1 / -1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '5rem 0',
            }}
          >
            <div
              style={{
                fontSize: '0.875rem',
                color: colors.text.muted,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  border: `3px solid ${colors.dark[700]}`,
                  borderTopColor: colors.mint[400],
                  borderRadius: '50%',
                  animation: 'fermet-spin 1s linear infinite',
                }}
              />
              Loading {type}...
            </div>
          </div>
        ) : (
          filtered.paged.map((app) => (
            <AppCard
              key={app.appName}
              app={app}
              onClick={navApp}
              fallbackMap={fallback}
              onImgError={handleImgError}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {filtered.filteredApps.length > perPage && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '2rem' }}>
          <Pagination
            count={filtered.totalPages}
            page={page}
            onChange={(_, v) => setPage(v)}
            shape="rounded"
            variant="outlined"
            sx={{
              '& .MuiPaginationItem-root': {
                color: colors.text.secondary,
                borderColor: colors.border.medium,
                backgroundColor: colors.dark[900],
                fontFamily: 'inherit',
                fontWeight: 500,
                transition: `all ${transitions.base}`,
                '&:hover': {
                  backgroundColor: colors.dark[800],
                  borderColor: colors.mint[400],
                  color: colors.text.primary,
                },
              },
              '& .Mui-selected': {
                backgroundColor: `${colors.mint[400]} !important`,
                borderColor: `${colors.mint[400]} !important`,
                color: `${colors.dark[900]} !important`,
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: `${colors.mint[500]} !important`,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
});

Apps.displayName = 'Apps';

const AppLayout = ({ type, onAppClick }) => {
  const { options } = useOptions();
  const scrollCls = clsx('scrollbar scrollbar-thin scrollbar-track-transparent', !options?.type || options.type === 'dark' ? 'scrollbar-thumb-gray-600' : 'scrollbar-thumb-gray-500');

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ backgroundColor: colors.dark[800] }}
    >
      <Nav />
      <div
        className={clsx('flex-1 overflow-y-auto', scrollCls)}
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      >
        <Apps type={type} onAppClick={onAppClick} />
      </div>
    </div>
  );
};

export default AppLayout;
