import clsx from 'clsx';
import { useOptions } from '/src/utils/optionsContext';
import { memo, useMemo } from 'react';

const Logo = memo(({ options, action, width, height }) => {
  const { options: op } = useOptions();
<<<<<<< HEAD

=======
  
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
  const style = useMemo(() => {
    const lightAdj = op.type === 'light' ? { filter: 'invert(80%)' } : {};
    const dimensions = {
      ...(width && { width }),
<<<<<<< HEAD
      ...(height && { height }),
      // Ensure aspect ratio is maintained
      objectFit: 'contain',
      ...(height && !width && { width: 'auto' })
    };
    return { ...lightAdj, ...dimensions };
  }, [op.type, width, height]);

=======
      ...(height && { height })
    };
    return { ...lightAdj, ...dimensions };
  }, [op.type, width, height]);
  
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
  const className = useMemo(() => clsx(
    options,
    action && 'cursor-pointer duration-300 ease-out scale-[1.12] hover:scale-[1.15]',
    'select-none'
  ), [options, action]);

  return (
    <img
      src="/logo.svg"
      className={className}
      id="btn-logo"
      draggable="false"
      alt="Fermet"
      onClick={action}
      style={style}
    />
  );
});

Logo.displayName = 'Logo';
export default Logo;
