import clsx from 'clsx';
import { useOptions } from '/src/utils/optionsContext';
import { colors, transitions } from '/src/utils/theme';      }}
    >
      <div className={clsx('flex w-full h-10', 'p-2.5 pl-5')}>
        <input
          type="text"
          defaultValue={defValue}
          placeholder={placeholder}
          spellCheck="false"
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
          }}        />
      </div>
    </div>
  );
};

export default TextInput;
