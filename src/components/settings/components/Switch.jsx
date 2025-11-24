import clsx from 'clsx';
import { Switch } from '@headlessui/react';
import { useState } from 'react';
import { useOptions } from '/src/utils/optionsContext';
import { colors, transitions } from '/src/utils/theme';

export default function SwitchComponent({ action, value }) {
  const { options } = useOptions();
  const [enabled, setEnabled] = useState(value);

  const switchChange = (value) => {
    setEnabled(value);
    action(value);
  };

  return (
    <Switch
      checked={enabled}
      onChange={switchChange}
      className="group relative flex h-7 w-14 mr-5 cursor-pointer rounded-full p-1 focus:outline-none"
      style={{
        backgroundColor: enabled
          ? (options.switchEnabledColor || colors.mint[400])
          : (options.switchColor || colors.dark[700]),
        transition: `background-color ${transitions.base}`,
        opacity: 1,
        visibility: 'visible',
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full shadow-lg ring-0 group-data-checked:translate-x-7"
        style={{
          backgroundColor: '#ffffff',
          transition: `transform ${transitions.base}`,
          opacity: 1,
          visibility: 'visible',
        }}
      />
    </Switch>
  );
}
