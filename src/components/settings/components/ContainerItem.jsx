import styles from '/src/styles/settings.module.css';
import ComboBox from './Combobox';
import Switch from './Switch';
import Input from './Input';
import Button from './Button';
import clsx from 'clsx';
import { useOptions } from '/src/utils/optionsContext';
import { colors, transitions } from '/src/utils/theme';

const SettingsContainerItem = ({
  config,
  action,
  name,
  type,
  children,
  value,
  disabled = false,
}) => {
  const { options } = useOptions();

  return (
    <div
      className={clsx(
        'flex items-center justify-between w-full min-h-[5rem] rounded-[1rem] pl-5 p-3',
        disabled && 'pointer-events-none',
      )}
      style={{
        backgroundColor: options.settingsContainerColor || colors.dark[900],
        border: `1px solid ${options.settingsBorder || options.paginationBorderColor || colors.mint[400]}`,
        transition: `all ${transitions.base}`,
        opacity: disabled ? 0.5 : 1,
        visibility: 'visible',
      }}
    >
      <div className="min-w-0 flex-1 overflow-hidden">
        <p
          className="text-[1rem] font-[SFProText] truncate"
          style={{
            color: options.bodyText || colors.text.primary,
            opacity: 1,
            visibility: 'visible',
          }}
        >
          {name}
        </p>
        <p
          className={`${styles.desc} truncate`}
          style={{
            color: options.bodyText || colors.text.secondary,
            opacity: 0.8,
            visibility: 'visible',
          }}
        >
          {children}
        </p>
      </div>

      {!disabled && (
        <div className="flex-shrink-0 ml-4" style={{ position: 'relative' }}>
          {type === 'select' && (
            <ComboBox config={config} action={action} selectedValue={value} maxW={13} />
          )}
          {type === 'switch' && <Switch action={action} value={value} />}
          {type === 'input' && <Input onChange={action} defValue={value} />}
          {type === 'button' && <Button action={action} value={value} />}
        </div>
      )}
    </div>
  );
};

export default SettingsContainerItem;
