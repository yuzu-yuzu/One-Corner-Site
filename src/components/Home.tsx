import brunch from '../assets/brunch.jpg';
import homePhoto from '../assets/homebanner2.jpg';
import brunchImg from '../assets/baconEgg2.png';
import woriginalImg from '../assets/waffleOriginal.jpg';
import pfruitImg from '../assets/pancakeFruit.jpg';
import wbaconImg from '../assets/waffleBacon.png';
import salmoneggImg from '../assets/salmonEgg.jpg';
import icemarasImg from '../assets/iceMatchaRas.jpg';
import roselatteImg from '../assets/roseLatte.jpg';
import iceYuzuImg from '../assets/iceYuzu.jpg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, FreeMode } from 'swiper/modules';

export default function Home({ onGoMenu = () => {} }: HomeProps) {
  return (
    <div>
      <div className="hero-wrap">
        <img
          src={homePhoto}
          alt="Photo d'une table servie du brunch, Coffee & Brunch"
          className="hero-banner"
        />
        <div className="hero-overlay">
          <h1>One Corner</h1>
          <span className="hero-rule" aria-hidden="true"></span>
          <p>Coffee &amp; Brunch</p>
        </div>
      </div>
      <div className="hero">
        <h2 className="sr-only">Coffee & Brunch</h2>
        <p>Le coin cosy du Marais pour une pause café et un brunch maison. </p>
        <p>
          Niché dans le calme du passage Molière au cœur du Marais, One Corner
          propose une cuisine faite maison, généreuse et décontractée.
        </p>
        <p>
          Laissez-vous tenter par notre carte brunch servie à toute heure :
          assiettes gourmandes, douceurs sucrées, cafés réconfortants. Un
          véritable cocon cosy pour savourer un moment seul ou à plusieurs.{' '}
        </p>
        <p>Notre carte s'adapte à toutes les envies !</p>
        <button className="btn-second" onClick={() => onGoMenu()}>
          Découvrez notre menu
        </button>
        <img
          src={brunch}
          alt="photo d'un brunch avec waffle original, waffle bacon et salmon egg benedict"
          className="hero-image"
        />
      </div>
      <div className="hero">
        <h2>Notre Formule Brunch</h2>
        <div className="formules">
          <FormulaCard
            image={brunchImg}
            title="Formule Brunch"
            description="Formule Brunch"
            alt="Formule Brunch"
            onSelect={() => onGoMenu('formules')}
          />
        </div>
      </div>
      <div className="hero">
        <h2>Une envie en particulier ?</h2>
        <MenuSwiper onGoMenu={onGoMenu} />
      </div>
    </div>
  );
}

type Props = {
  image: string;
  title: string;
  description: string;
  alt: string;
  onSelect: () => void;
};

type HomeProps = {
  onGoMenu?: (section?: string) => void;
};

export function FormulaCard({ image, title, alt, onSelect }: Props) {
  return (
    <button
      type="button"
      className="formula-card formula-solo"
      onClick={onSelect}
    >
      <img src={image} alt={alt} className="formula-img" />
      <span>
        <strong>{title}</strong>
      </span>
    </button>
  );
}

export function MenuSwiper({ onGoMenu = () => {} }: HomeProps) {
  const products = [
    { title: 'Pancakes Fruits', image: pfruitImg, section: 'sucre' },
    { title: 'Waffle Originale', image: woriginalImg, section: 'sucre' },
    { title: 'Saumon Egg Benedict', image: salmoneggImg, section: 'sale' },
    { title: 'Waffle Bacon', image: wbaconImg, section: 'sale' },
    {
      title: 'Rose Café Latte',
      image: roselatteImg,
      section: 'boisson-chaude',
    },
    {
      title: 'Iced Matcha Sweet Framboise',
      image: icemarasImg,
      section: 'boisson-froide',
    },
    { title: 'Iced Yuzu', image: iceYuzuImg, section: 'boisson-froide' },
  ];
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [canPrev, setCanPrev] = useState(false); // au départ : on est au début → pas de retour
  const [canNext, setCanNext] = useState(true);
  const updateNav = (s: SwiperType) => {
    setCanPrev(!s.isBeginning);
    setCanNext(!s.isEnd);
  };
  return (
    <div className="swiper-wrap">
      <div className="swiper-shell">
        <button
          type="button"
          className="swiper-arrow"
          aria-label="Photos précédentes"
          disabled={!canPrev}
          onClick={() => swiper?.slidePrev()}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <div className="swiper-main">
          <Swiper
            modules={[Mousewheel, Keyboard, FreeMode]}
            onSwiper={(s) => {
              setSwiper(s);
              updateNav(s);
            }} // état initial à l'ouverture
            onSlideChange={updateNav} // après chaque mouvement
            grabCursor={true}
            mousewheel={{ forceToAxis: true }}
            keyboard={{ enabled: true }}
            freeMode={{ enabled: true, momentum: true, sticky: true }}
            spaceBetween={20}
            slidesPerView={1.2} // Sur mobile : montre un bout de la 2ème photo pour inviter au scroll
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.5 },
            }}
            className="mySwiper"
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <button
                  type="button"
                  className="slide-btn"
                  onClick={() => onGoMenu(item.section)}
                >
                  <div className="slide-card">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="slide-img"
                    />
                    <div className="slide-label">
                      <h4>{item.title}</h4>
                    </div>
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <button
          type="button"
          className="swiper-arrow"
          aria-label="Photos suivantes"
          disabled={!canNext}
          onClick={() => swiper?.slideNext()}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
