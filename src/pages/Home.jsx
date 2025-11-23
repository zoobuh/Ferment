import Nav from '../layouts/Nav';
import Search from '../components/SearchContainer';
import Footer from '../components/Footer';
import QuickLinks from '../components/QuickLinks';
import MintDots from '../components/MintDots';
import { memo } from 'react';
import { colors } from '../utils/theme';

const Home = memo(() => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: colors.dark[800],
      color: colors.text.secondary,
      position: 'relative',
      animation: 'fadeIn 0.5s ease-out',
    }}>
      <MintDots />
      <Nav />
      <Search />
      <QuickLinks />
      <Footer />
    </div>
  );
});

Home.displayName = 'Home';
export default Home;
