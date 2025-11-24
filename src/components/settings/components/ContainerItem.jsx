import styles from '/src/styles/settings.module.css';
import ComboBox from './Combobox';
import Switch from './Switch';
import Input from './Input';
import Button from './Button';
import clsx from 'clsx';
import { useOptions } from '/src/utils/optionsContext';
import { colors, transitions } from '/src/utils/theme';          {type === 'select' && (
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
