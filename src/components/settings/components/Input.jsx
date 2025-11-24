import clsx from 'clsx';
import { useOptions } from '/src/utils/optionsContext';
<<<<<<< HEAD
import { colors, transitions } from '/src/utils/theme';
=======
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395

const TextInput = ({ defValue, onChange, placeholder = 'Enter text', maxW = 40 }) => {
  const { options } = useOptions();

  return (
    <div
<<<<<<< HEAD
      className={clsx('relative w-full', 'rounded-xl')}
      style={{
        backgroundColor: options.settingsDropdownColor || colors.dark[800],
        border: `1px solid ${options.settingsBorder || options.paginationBorderColor || colors.border.light}`,
        maxWidth: `${maxW}rem`,
        transition: `all ${transitions.base}`,
        opacity: 1,
        visibility: 'visible',
=======
      className={clsx('relative w-full', 'rounded-xl border')}
      style={{
        backgroundColor: options.settingsDropdownColor || '#1a2a42',
        maxWidth: `${maxW}rem`,
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
      }}
    >
      <div className={clsx('flex w-full h-10', 'p-2.5 pl-5')}>
        <input
          type="text"
          defaultValue={defValue}
          placeholder={placeholder}
          spellCheck="false"
<<<<<<< HEAD
          className="flex-1 min-w-0 text-[0.9rem] truncate bg-transparent outline-none"
          style={{
            color: options.bodyText || colors.text.primary,
            opacity: 1,
            visibility: 'visible',
          }}
          onFocus={(e) => {
            e.currentTarget.parentElement.parentElement.style.borderColor = colors.mint[400];
            e.currentTarget.parentElement.parentElement.style.boxShadow = `0 0 0 3px rgba(43, 217, 167, 0.1)`;
          }}
          onBlur={(e) => {
            onChange?.(e.target.value);
            e.currentTarget.parentElement.parentElement.style.borderColor = options.settingsBorder || options.paginationBorderColor || colors.border.light;
            e.currentTarget.parentElement.parentElement.style.boxShadow = 'none';
          }}
=======
          onBlur={(e) => onChange?.(e.target.value)}
          className="flex-1 min-w-0 text-[0.9rem] truncate bg-transparent outline-none"
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
        />
      </div>
    </div>
  );
};

export default TextInput;
