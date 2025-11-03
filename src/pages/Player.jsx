import Nav from '../layouts/Nav';
import Breadcrumb from '../components/player/Breadcrumb';
import Loader from '../components/player/Loader';
import { useLocation } from 'react-router-dom';
import { useOptions } from '/src/utils/optionsContext';
import { colors } from '../utils/theme';

const Player = () => {
    const { state: { app } = {} } = useLocation();
    const { options } = useOptions();

    return (
        <div 
            style={{ 
                minHeight: '100vh',
                backgroundColor: colors.dark[800],
                animation: 'fadeIn 0.3s ease-out',
            }}
        >
            <Nav />
            <div 
                style={{
                    width: '90%',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    padding: '2rem 0',
                }}
            >
                <Breadcrumb theme={options.theme} name={app?.appName} />
                <Loader theme={options.theme} app={app} />
            </div>
        </div>
    )
}

export default Player;