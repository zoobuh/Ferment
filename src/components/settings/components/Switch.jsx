import clsx from 'clsx';
import { Switch } from '@headlessui/react';
import { useState } from 'react';
import { useOptions } from '/src/utils/optionsContext';
<<<<<<< HEAD
import { colors, transitions } from '/src/utils/theme';
=======
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395

export default function SwitchComponent({ action, value }) {
  const { options } = useOptions();
  const [enabled, setEnabled] = useState(value);
<<<<<<< HEAD

=======
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
  const switchChange = (value) => {
    setEnabled(value);
    action(value);
  };
<<<<<<< HEAD

=======
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
  return (
    <Switch
      checked={enabled}
      onChange={switchChange}
<<<<<<< HEAD
      className="group relative flex h-7 w-14 mr-5 cursor-pointer rounded-full p-1 focus:outline-none"
      style={{
        backgroundColor: enabled
          ? (options.switchEnabledColor || colors.mint[400])
          : (options.switchColor || colors.dark[700]),
        transition: `background-color ${transitions.base}`,
        opacity: 1,
        visibility: 'visible',
=======
      className="group relative flex h-7 w-14 mr-5 cursor-pointer rounded-full p-1 ease-in-out focus:outline-none"
      style={{
        backgroundColor: enabled ? options.switchEnabledColor || '#4c6c91' : options.switchColor || '#ffffff1a',
        transition: 'background-color 0.2s ease-in-out',
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
      }}
    >
      <span
        aria-hidden="true"
<<<<<<< HEAD
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full shadow-lg ring-0 group-data-checked:translate-x-7"
        style={{
          backgroundColor: '#ffffff',
          transition: `transform ${transitions.base}`,
          opacity: 1,
          visibility: 'visible',
        }}
=======
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
      />
    </Switch>
  );
}
