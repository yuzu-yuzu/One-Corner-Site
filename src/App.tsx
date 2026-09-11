import Home from './components/Home.tsx';
import Menu from './components/Menu.tsx';
import Contact from './components/Contact.tsx';
import logo from './assets/OneCornerLogoCercle.png';
import { useState, useEffect } from 'react';

export default function App() {
  const [page, setPage] = useState(() =>
    window.location.hash === '#menu' ? 'menu' : 'home',
  );
  useEffect(() => {
    window.location.hash = page;
    window.scrollTo(0, 0);
  }, [page]);
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash;
      if (h === '#menu') setPage('menu');
      else if (h === '#home' || h === '') setPage('home');
      // on ignore #contact, #sale... : ce sont des ancres, pas des pages
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const goMenu = (section?: string) => {
    setPage('menu');
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur(); // lâche le focus : le :focus-within retombe, le panneau se ferme
    }
    if (section) {
      setTimeout(() => {
        document
          .getElementById(section)
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  };
  return (
    <div>
      <header className="site-header">
        <button
          className="site-logo"
          onClick={() => setPage('home')}
          aria-label="Retour à l'accueil"
        >
          <img src={logo} alt="Logo OneCorner" />
        </button>
        <nav>
          <a href="#contact" className="btn-second">
            Contact
          </a>
          <div className="dropdown">
            <button className="btn" onClick={() => setPage('menu')}>
              Menu
            </button>
            <div className="dropdown-menu">
              <button onClick={() => goMenu('formules')}>Formule Brunch</button>
              <button onClick={() => goMenu('sale')}>Plat Salé</button>
              <button onClick={() => goMenu('sucre')}>Plat Sucré</button>
              <button onClick={() => goMenu('douceur')}>Petite Faim</button>
              <button onClick={() => goMenu('boisson-chaude')}>
                Boisson Chaude
              </button>
              <button onClick={() => goMenu('boisson-froide')}>
                Boisson Froide
              </button>
              <button onClick={() => goMenu('jus')}>Jus &amp; Thé</button>
            </div>
          </div>
        </nav>
        <h1 className="sr-only">One Corner Coffee Brunch</h1>
      </header>
      <main>{page === 'menu' ? <Menu /> : <Home onGoMenu={goMenu} />}</main>
      <Contact />
    </div>
  );
}
