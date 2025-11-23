import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useOptions } from '/src/utils/optionsContext';
import { Plus, CircleX, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import LinkDialog from './NewQuickLink';
import { colors, transitions } from '../utils/theme';

const QuickLinks = ({ cls, nav = true }) => {
  const { options, updateOption } = useOptions();
  const [fallback, setFallback] = useState({});
  const navigate = useNavigate();
  const g = (s) => {
    if (nav) {
      sessionStorage.setItem('query', s);
      navigate('/browser');
    } else {
      window.parent.tabManager.navigate(s);
    }
  };
  const defaultLinks = [
    {
      link: 'https://google.com',
      icon: 'https://google.com/favicon.ico',
      name: 'Google',
    },
    {
      link: 'https://facebook.com',
      icon: 'https://facebook.com/favicon.ico',
      name: 'Facebook',
    },
    {
      link: 'https://quora.com',
      icon: 'https://quora.com/favicon.ico',
      name: 'Quora',
    },
    {
      link: 'https://github.com',
      icon: 'https://github.com/favicon.ico',
      name: 'GitHub',
    },
  ];
  const [quickLinks, setQuickLinks] = useState(() => JSON.parse(localStorage.getItem('options') || {}).quickLinks ?? defaultLinks);
  const [isOpen, setOpen] = useState(false);
  const handleQuickLink = (arr) => {
    setQuickLinks(arr);
    updateOption({ quickLinks: arr });
  };

  useEffect(() => {
    updateOption({ quickLinks: quickLinks });
  }, [quickLinks]);

  const linkItem = clsx(
    'flex flex-col items-center justify-center relative group',
    `w-20 h-[5.5rem] rounded-md border-transparent cursor-pointer ${
      options.type == 'dark' ? 'border' : 'border-2'
    }`,
    `hover:backdrop-blur ${
      options.type == 'dark' ? 'hover:border-[#ffffff1c]' : 'hover:border-[#4f4f4f1c]'
    }`,
    'duration-200 ease-in-out',
  );

  const linkLogo = clsx(
    'w-[2.5rem] h-[2.5rem] flex items-center justify-center',
    'rounded-full bg-[#6d6d6d73]',
  );

  return (
    <div
      className={clsx(
        'flex flex-wrap justify-center gap-4',
        !cls ? 'w-full max-w-[40rem] mx-auto mt-[16rem]' : cls,
      )}
    >
      {quickLinks.map((link, i) => (
        <div 
          className={linkItem} 
          key={i} 
          onClick={() => g(link.link)}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = colors.mint[400];
            e.currentTarget.style.backgroundColor = `rgba(43, 217, 167, 0.05)`;
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleQuickLink(quickLinks.filter((_, j) => j !== i));
            }}
            className={clsx(
              'absolute -top-2 -right-2 opacity-0',
              'group-hover:opacity-100 duration-200 ease',
            )}
            style={{ color: colors.mint[400] }}
          >
            <CircleX size="16" />
          </div>
          <div className={linkLogo}>
            {fallback[i] ? (
              <Globe className="w-7 h-7" style={{ color: colors.mint[400] }} />
            ) : (
              <img
                src={link.icon}
                alt={link.name}
                className="w-7 h-7 object-contain"
                onError={() => setFallback((prev) => ({ ...prev, [i]: true }))}
              />
            )}
          </div>
          <div className="mt-3 text-sm font-medium text-center w-full px-1 overflow-hidden whitespace-nowrap text-ellipsis">
            {link.name}
          </div>
        </div>
      ))}
      <div 
        className={`${linkItem} cursor-pointer`} 
        onClick={() => setOpen(true)}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = colors.mint[400];
          e.currentTarget.style.backgroundColor = `rgba(43, 217, 167, 0.05)`;
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'transparent';
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <div className={linkLogo}>
          <Plus className="w-7 h-7" style={{ color: colors.mint[400] }} />
        </div>
        <div className="mt-3 text-sm font-medium text-center">New</div>
      </div>
      <LinkDialog
        state={isOpen}
        set={setOpen}
        update={(form) => setQuickLinks([...quickLinks, form])}
      />
    </div>
  );
};

QuickLinks.displayName = 'QuickLinks';
export default QuickLinks;