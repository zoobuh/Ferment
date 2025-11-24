import { useState, useEffect } from 'react';
import { useOptions } from '../utils/optionsContext';
import Nav from '../layouts/Nav';
import Search from '../components/SearchContainer';
import QuickLinks from '../components/QuickLinks';
import { colors } from '../utils/theme';

export default function NewTab() {
  const { options } = useOptions();

  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const newTime = new Date();
      setTime(newTime);

      const hour = newTime.getHours();
      if (hour < 12) setGreeting('Good morning');
      else if (hour < 18) setGreeting('Good afternoon');
      else setGreeting('Good evening');
    };

<<<<<<< HEAD
    updateTime(); // initialize immediately

    const timer = setInterval(updateTime, 1000); // update every second for smoothness
=======
    updateTime();
    const timer = setInterval(updateTime, 60000);
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
<<<<<<< HEAD
    second: '2-digit', // optional: show seconds
=======
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
    hour12: true,
  });

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(time);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: colors.dark[800],
<<<<<<< HEAD
=======
        animation: 'fadeIn 0.5s ease-out',
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
      }}
    >
      <Nav />

<<<<<<< HEAD
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-8 relative">
        {/* Clock Container with higher z-index and relative positioning */}
        <div
          className="text-center relative z-60"
        >
=======
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-8">
        <div className="-mt-20 text-center" style={{ animation: 'slideUp 0.6s ease-out' }}>
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
          <div
            className="text-5xl font-light mb-2"
            style={{
              fontFamily: 'SFProText, system-ui, sans-serif',
              color: colors.text.primary,
              fontWeight: 300,
            }}
          >
            {formattedTime}
          </div>
          <div
            className="text-lg"
            style={{
              color: colors.text.muted,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <span>{greeting}</span>
            <span style={{ color: colors.mint[400] }}>•</span>
            <span>{formattedDate}</span>
          </div>
        </div>

<<<<<<< HEAD
        {/* Search & QuickLinks */}
        <div className="w-full max-w-2xl relative">
=======
        <div className="w-full max-w-2xl relative" style={{ animation: 'slideUp 0.7s ease-out' }}>
>>>>>>> 8456006092dab94de6ec3e6baa369906e2868395
          <Search logo={false} nav={false} cls="-mt-3 absolute z-50 w-full" />
          <QuickLinks cls="mt-24" nav={false} />
        </div>
      </div>
    </div>
  );
}
