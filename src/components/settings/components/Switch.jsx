import clsx from 'clsx';
import { Switch } from '@headlessui/react';
import { useState } from 'react';
import { useOptions } from '/src/utils/optionsContext';
import { colors, transitions } from '/src/utils/theme';  const switchChange = (value) => {
    setEnabled(value);
    action(value);
  };
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
        }}      />
    </Switch>
  );
}
