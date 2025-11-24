import { useState } from 'react';
import clsx from 'clsx';
import theme from '/src/styles/theming.module.css';
import { useOptions } from '/src/utils/optionsContext';
import SettingsContainerItem from './settings/components/ContainerItem';
import * as settings from '/src/data/settings';
import PanicDialog from './PanicDialog';
<<<<<<< HEAD
import { colors } from '/src/utils/theme';
=======
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395

const Type = ({ type }) => {
  const { options, updateOption } = useOptions();
  const settingsItems = type({ options, updateOption });

  return (
    <>
      {Object.entries(settingsItems).map(([key, setting]) => (
        <SettingsContainerItem key={key} {...setting}>
          {setting.desc}
        </SettingsContainerItem>
      ))}
    </>
  );
};

const Setting = ({ setting }) => {
  const { options, updateOption } = useOptions();
  const [panicOpen, setPanicOpen] = useState(false);

<<<<<<< HEAD
  const privSettings = settings.privacyConfig({
    options,
    updateOption,
=======
  const privSettings = settings.privacyConfig({ 
    options, 
    updateOption, 
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
    openPanic: () => setPanicOpen(true)
  });

  const scroll = clsx(
    'scrollbar scrollbar-track-transparent scrollbar-thin',
    options?.type === 'dark' || !options?.type
      ? 'scrollbar-thumb-gray-600'
      : 'scrollbar-thumb-gray-500',
  );

  const Container = ({ children }) => (
    <div
      className={clsx(
        theme[`theme-${options.theme || 'default'}`],
        'flex flex-1 flex-col gap-7 overflow-y-auto p-10',
        scroll
      )}
<<<<<<< HEAD
      style={{
        opacity: 1,
        visibility: 'visible',
        position: 'relative',
        zIndex: 0,
      }}
=======
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
    >
      {children}
      <PanicDialog state={panicOpen} set={setPanicOpen} />
    </div>
  );

  return (
    <Container>
      {setting === 'Privacy' && <Type type={() => privSettings} />}
      {setting === 'Customize' && <Type type={settings.customizeConfig} />}
      {setting === 'Browsing' && <Type type={settings.browsingConfig} />}
      {setting === 'Advanced' && <Type type={settings.advancedConfig} />}
    </Container>
  );
};

export default Setting;