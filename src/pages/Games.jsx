import AppLayout from '../layouts/Apps';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Games = memo(() => {
    const nav = useNavigate();

    const handleGameClick = useCallback((game) => {
        sessionStorage.setItem('query', game.url);
        nav('/browser');
    }, [nav]);

    return <AppLayout type="games" onAppClick={handleGameClick} />;
});

Games.displayName = 'Games';
export default Games;