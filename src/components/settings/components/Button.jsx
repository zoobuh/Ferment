import clsx from 'clsx';
import { useOptions } from '/src/utils/optionsContext';
<<<<<<< HEAD
import { colors, transitions } from '/src/utils/theme';
=======
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395

const Button = ({ value, action, disabled = false, maxW = 40 }) => {
  const { options } = useOptions();

  return (
    <button
      onClick={action}
      className={clsx(
<<<<<<< HEAD
        'rounded-xl text-[0.9rem] font-medium cursor-pointer',
        'flex items-center justify-center h-10 px-4',
        'hover:opacity-80 active:opacity-90',
        disabled ? "opacity-60 pointer-events-none" : undefined,
      )}
      style={{
        backgroundColor: options.settingsDropdownColor || colors.dark[800],
        border: `1px solid ${options.settingsBorder || options.paginationBorderColor || colors.mint[400]}`,
        color: options.bodyText || colors.text.primary,
        maxWidth: `${maxW}rem`,
        transition: `all ${transitions.base}`,
        opacity: disabled ? 0.6 : 1,
        visibility: 'visible',
=======
        'rounded-xl border text-[0.9rem] font-medium cursor-pointer',
        'flex items-center justify-center h-10 px-4 transition-opacity duration-150',
        'hover:opacity-80 active:opacity-90',
        disabled ? "opacity-60" : undefined,
      )}
      style={{
        backgroundColor: options.settingsDropdownColor || '#1a2a42',
        maxWidth: `${maxW}rem`,
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
      }}
    >
      {value}
    </button>
  );
};

export default Button;