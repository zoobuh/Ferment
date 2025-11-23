import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, Smartphone, Cog } from 'lucide-react';
import { useOptions } from '/src/utils/optionsContext';
import pkg from '../../package.json';
import Logo from '../components/Logo';
import { memo, useMemo, useCallback } from 'react';
import { colors, transitions } from '../utils/theme';

const version = pkg.version;
const itemSize = 16;

const navItems = [
  { name: 'Apps', id: 'btn-a', icon: LayoutGrid, route: '/apps' },
  { name: 'Games', id: 'btn-g', icon: Smartphone, route: '/games' },
  { name: 'Settings', id: 'btn-s', icon: Cog, route: '/settings' },
];

const Nav = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { options } = useOptions();

  const scale = Number(options.navScale || 1);
  const dimensions = useMemo(() => ({
    navHeight: Math.round(64 * scale),
    logoWidth: Math.round(122 * scale),
    logoHeight: Math.round(41 * scale),
    versionFont: Math.round(9 * scale),
    versionMargin: Math.round(-10 * scale)
  }), [scale]);

  const handleLogoClick = useCallback(() => {
    if (window.self !== window.top) {
      window.parent.location.href = '/';
    } else {
      navigate('/');
    }
  }, [navigate]);

  const isActive = useCallback((route) => {
    if (route === '/') return location.pathname === '/';
    return location.pathname.startsWith(route);
  }, [location.pathname]);

  return (
    <nav
      style={{
        height: `${dimensions.navHeight}px`,
        width: '100%',
        backgroundColor: colors.dark[800],
        borderBottom: `1px solid ${colors.dark[700]}`,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        gap: '1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Logo Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Logo
          width={dimensions.logoWidth}
          height={dimensions.logoHeight}
          action={handleLogoClick}
        />
        <div
          style={{
            fontSize: `${dimensions.versionFont}px`,
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            paddingTop: '0.125rem',
            paddingBottom: '0.125rem',
            border: `1px solid ${colors.border.medium}`,
            borderRadius: '9999px',
            textAlign: 'center',
            color: colors.text.muted,
            backgroundColor: colors.dark[700],
            fontWeight: 500,
          }}
        >
          v{version}
        </div>
      </div>

      {/* Navigation Items */}
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '0.25rem',
          marginLeft: 'auto',
          height: '100%',
        }}
      >
        {navItems.map((item) => {
          const active = isActive(item.route);
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (window.self !== window.top) {
                  window.parent.location.href = item.route;
                } else {
                  navigate(item.route);
                }
              }}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0 1.25rem',
                background: 'transparent',
                border: 'none',
                color: active ? colors.mint[400] : colors.text.secondary,
                fontSize: '0.9375rem',
                fontWeight: active ? 600 : 500,
                cursor: 'pointer',
                transition: `all ${transitions.base}`,
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.color = colors.text.primary;
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.color = colors.text.secondary;
                }
              }}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              <span>{item.name}</span>

              {/* Active Indicator */}
              {active && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: colors.mint[400],
                    borderRadius: '3px 3px 0 0',
                    boxShadow: `0 0 8px ${colors.mint[400]}`,
                    animation: 'slideIn 0.3s ease-out',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
});

Nav.displayName = 'Nav';
export default Nav;
