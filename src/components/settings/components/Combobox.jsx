import clsx from 'clsx';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { ChevronDown, Check } from 'lucide-react';
import { useState } from 'react';
import { useOptions } from '/src/utils/optionsContext';
import { colors, transitions } from '/src/utils/theme';

const ComboBox = ({
  config = [],
  selectedValue,
  action,
  maxW = 40,
  placeholder = 'Choose an option',
}) => {
  const { options } = useOptions();
  const [query, setQuery] = useState('');

  const getOptionId = (val) =>
    val && typeof val === 'object' ? val.themeName || val.id || JSON.stringify(val) : val;

  const filteredOptions =
    query === ''
      ? config
      : config.filter(({ option }) => option.toLowerCase().includes(query.toLowerCase()));

  const scroll = clsx(
    'scrollbar scrollbar-track-transparent scrollbar-thin',
    options?.type === 'dark' || !options?.type
      ? 'scrollbar-thumb-gray-600'
      : 'scrollbar-thumb-gray-500',
  );

  return (
    <Combobox
      value={selectedValue}
      onChange={action}
      by={(a, b) => getOptionId(a) === getOptionId(b)}
    >
      <div
        className={clsx('relative w-full', 'rounded-xl')}
        style={{
          backgroundColor: options.settingsDropdownColor || colors.dark[800],
          border: `1px solid ${options.settingsBorder || options.paginationBorderColor || colors.mint[400]}`,
          color: options.bodyText || colors.text.primary,
          maxWidth: `${maxW}rem`,
          transition: `all ${transitions.base}`,
          opacity: 1,
          visibility: 'visible',
          position: 'relative',
        }}
      >
        <div className={clsx('flex w-full h-10', 'p-2.5 pl-5')}>
          <ComboboxInput
            displayValue={(value) => {
              if (!value) return '';
              const found = config.find((c) => getOptionId(c.value) === getOptionId(value));
              return found ? `${found.option} (selected)` : '';
            }}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={clsx(
              'flex-1 min-w-0',
              'text-[0.9rem] truncate',
              'bg-transparent outline-none',
            )}
            style={{
              color: options.bodyText || colors.text.primary,
              opacity: 1,
              visibility: 'visible',
            }}
            spellCheck={false}
          />

          <ComboboxButton
            className={clsx(
              'flex flex-shrink-0 items-center justify-center',
              'px-1',
              'cursor-pointer',
            )}
            style={{
              opacity: 1,
              visibility: 'visible',
            }}
          >
            <ChevronDown size={17} />
          </ComboboxButton>
        </div>

        {filteredOptions.length !== 0 && (
          <ComboboxOptions
            className={clsx(
              'absolute left-0 top-full mt-1',
              'flex flex-col gap-1',
              'w-full max-h-60 overflow-auto',
              'rounded-[0.8rem] border shadow-lg p-[0.4rem]',
              scroll
            )}
            style={{
              borderColor: options.settingsBorder || options.paginationBorderColor || colors.mint[400],
              backgroundColor: options.settingsDropdownColor || colors.dark[800],
              color: options.bodyText || colors.text.primary,
              opacity: 1,
              visibility: 'visible',
              position: 'absolute',
              zIndex: 200,
            }}
          >
            {filteredOptions.map((cfg) => (
              <ComboboxOption
                value={cfg.value}
                key={getOptionId(cfg.value)}
                className={clsx(
                  'flex items-center',
                  'cursor-pointer',
                  'px-2 py-2 rounded-md',
                )}
                style={{
                  transition: `background-color ${transitions.fast}`,
                  opacity: 1,
                  visibility: 'visible',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.dark[700];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={clsx('flex items-center justify-center', 'w-[20px] flex-shrink-0')}
                      style={{
                        opacity: 1,
                        visibility: 'visible',
                      }}
                    >
                      {selected && <Check size={16} style={{ color: colors.mint[400] }} />}
                    </span>
                    <p
                      className={clsx('flex-1 min-w-0 ml-2', 'truncate text-[0.88rem]')}
                      style={{
                        color: 'inherit',
                        opacity: 1,
                        visibility: 'visible',
                      }}
                    >
                      {cfg.option}
                    </p>
                  </>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  );
};

export default ComboBox;
