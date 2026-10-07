import menulogo from '../assets/menulogo.png';
import brunch from '../assets/formuleBrunch.jpg';
import avocadoEgg from '../assets/avocadoEgg.jpg';
import salmonEgg from '../assets/salmonEgg.jpg';
import baconEgg from '../assets/baconEgg.jpg';
import wafflebacon from '../assets/waffleBacon2.jpg';
import avocadoToast from '../assets/avocadoToast.jpg';
import salmonToast from '../assets/salmonToast.png';
import waffleoriginal from '../assets/waffleOriginal.jpg';
import waffleBch from '../assets/waffleBch.jpg';
import pancakesfruits from '../assets/pancakeFruit.jpg';
import petitgranola from '../assets/smallGranola.jpg';
import roseLatte from '../assets/roseLatte.jpg';
import iceMaRas from '../assets/iceMatchaRas2.jpg';

import { useState, useEffect, useRef, type ReactNode } from 'react';

// Interfaces de typage
interface DishCardProps {
  image?: string;
  alt?: string;
  imgPosition?: string;
  name: string;
  price: string | number;
  description?: string;
  extras?: string;
}

interface MenuSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

// Moule "un plat" : avec ou sans photo, même composant
function DishCard({
  image = '',
  alt = '',
  imgPosition = 'center',
  name,
  price,
  description = '',
  extras = '',
}: DishCardProps) {
  return (
    <article className="dish">
      {image && (
        <img
          src={image}
          alt={alt}
          className="dish-img"
          style={{ objectPosition: imgPosition }}
        />
      )}
      <div className="dish-text">
        <h4>
          {name} - {price}
        </h4>
        <p>{description}</p>
        {extras && <p>{extras}</p>}
      </div>
    </article>
  );
}

// Mini-carrousel : les photos défilent toutes seules, dots cliquables + swipe.
// Dès que le visiteur prend la main, on ralentit (5s -> 15s) pour le laisser regarder.
function DishCarousel({
  images,
  name,
  price,
  description = '',
  extras = '',
  en = false,
}: {
  images: { src: string; alt: string; position?: string; zoom?: number }[];
  name: string;
  price: string | number;
  description?: string;
  extras?: string;
  en?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [delay, setDelay] = useState(5000);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, delay);
    return () => clearInterval(id);
  }, [index, delay, images.length]);

  const goTo = (i: number) => {
    setIndex((i + images.length) % images.length);
    setDelay(10000);
  };

  return (
    <article className="dish">
      <div>
        <div style={{ overflow: 'hidden', borderRadius: 12 }}>
        <img
          key={index}
          src={images[index].src}
          alt={images[index].alt}
          className="dish-img dish-fade"
            style={{
              display: 'block',
              objectPosition: images[index].position ?? 'center',
              transform: images[index].zoom
                ? `scale(${images[index].zoom})`
                : undefined,
            }}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (dx < -40) goTo(index + 1); // swipe gauche -> suivante
            else if (dx > 40) goTo(index - 1); // swipe droit -> précédente
          }}
        />
        </div>
        <div className="dots">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === index ? 'dot dot-active' : 'dot'}
              aria-label={
                en
                  ? `Photo ${i + 1} of ${images.length}`
                  : `Photo ${i + 1} sur ${images.length}`
              }
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
      <div className="dish-text">
        <h4>
          {name} - {price}
        </h4>
        <p>{description}</p>
        {extras && <p>{extras}</p>}
      </div>
    </article>
  );
}

// Moule "une catégorie" : section + titre à filets
function MenuSection({ id, title, children }: MenuSectionProps) {
  return (
    <section id={id}>
      <h3 className="section-title">
        <span>{title}</span>
      </h3>
      {children}
    </section>
  );
}

export default function Menu({ en = false }: { en?: boolean }) {
  return (
    <div className="menu-page">
      <h2 className="sr-only">Notre Menu</h2>
      <img src={menulogo} alt="Logo Menu" className="logoMenu" />
      <p style={{ textAlign: 'center', color: '#8a4d14' }}>
        {en
          ? 'Our menu adapts to every craving! A special request or an allergy?'
          : 'Notre carte s’adapte à toutes les envies ! Une demande particulière ou une allergie ?'}
      </p>
      <p style={{ textAlign: 'center', color: '#8a4d14' }}>
        {en
          ? "Don't hesitate to ask us, we'll do our best to make you happy."
          : 'N’hésitez pas à nous solliciter, nous ferons notre possible pour vous faire plaisir.'}{' '}
      </p>

      <MenuSection
        id="formules"
        title={en ? 'Our Brunch Set Menu' : 'Notre Formule Brunch'}
      >
        <article className="dish">
          <img src={brunch} alt="Formule brunch" className="formuladish-img" />
          <div className="dish-text">
            <h4>Formule Brunch - 27,90</h4>
            <p>{en ? 'Savory or sweet dish of your choice' : 'Plat salé ou Sucré au choix'}</p>
            <p>{en ? 'Hot or cold drink of your choice' : 'Boisson chaude ou froide au choix'}</p>
            <p>{en ? 'Orange or multifruit juice' : "Jus d'orange ou multifruit"}</p>
            <p>
              {en
                ? 'Dessert of your choice: small granola, 2 scoops of ice cream, homemade tiramisu or fruit salad'
                : 'Dessert au choix : petit granola, 2 boules de glaces, tiramisu maison ou salade de fruits'}
            </p>
          </div>
        </article>
      </MenuSection>

      <MenuSection id="sale" title={en ? 'Savory dish' : 'Plat Salé'}>
        <DishCarousel
          images={[
            { src: avocadoEgg, alt: 'Avocado egg benedict', zoom: 1.15 },
            {
              src: salmonEgg,
              alt: 'Salmon egg benedict',
              position: 'center 75%',
            },
            { src: baconEgg, alt: 'Bacon egg benedict', position: 'center 80%' },
          ]}
          name="Avocado Egg Benedict"
          price="13,90"
          description={
            en
              ? 'Muffin bread, avocado, coleslaw, 2 poached eggs, hollandaise sauce, salad'
              : 'Pain de muffin, avocat, coleslaw, 2 œufs pochés, sauce hollandaise, salade'
          }
          extras={en ? 'SMOKED SALMON or BACON + 2€' : 'SAUMON FUMÉ ou BACON + 2€'}
          en={en}
        />
        <DishCard
          image={wafflebacon}
          alt="Waffle Salée"
          name="Waffle Salée"
          price="15,90"
          description={
            en
              ? 'YOUR CHOICE: Crispy Chicken, Bacon, Smoked Salmon'
              : 'AU CHOIX : Crispy Chicken, Bacon, Saumon Fumé'
          }
          extras={
            en
              ? 'Waffle, meat of your choice, avocado, sunny-side-up egg, coleslaw, pickled onion, homemade sauce'
              : 'Gaufre, viande au choix, avocat, oeuf plat, coleslaw, oignon mariné, sauce maison'
          }
        />
        <DishCard
          image={avocadoToast}
          alt="Avocado Toast"
          name="Avocado Toast"
          price="13,90"
          description={
            en
              ? 'Toasted bread, smashed avocado, fromage blanc, confit tomato, pesto sauce, salad'
              : 'Pain toast, avocat écrasé, fromage blanc, tomate confite, sauce pesto, salade'
          }
        />
        <DishCard
          image={salmonToast}
          alt="Saumon Toast"
          imgPosition="center 55%"
          name="Saumon Toast"
          price="14,90"
          description={
            en
              ? 'Toasted bread, smoked salmon, gravlax sauce, scrambled egg, salad'
              : 'Pain toast, saumon fumé, sauce gravlax, oeuf brouillé, salade'
          }
        />
        <DishCard
          name="Crispy César"
          price="13,90"
          description={
            en
              ? 'Romaine lettuce, crispy chicken, hard-boiled egg, croutons, parmesan, cherry tomato.'
              : 'Salade, crispy chicken, oeuf dur, croutons, parmesan, tomate cerise.'
          }
        />
        <DishCard
          name="Sides de Maison"
          price="15,90"
          description={
            en ? 'YOUR CHOICE: Bacon or Smoked Salmon' : 'AU CHOIX : Bacon ou Saumon Fumé'
          }
          extras={
            en
              ? 'Toasted bread, meat of your choice, scrambled eggs, avocado, butter, cream cheese, red onion'
              : 'Pain toast, viande au choix, oeufs brouillés, avocat, beurre, cream cheese, oignon rouge'
          }
        />
      </MenuSection>

      <MenuSection id="sucre" title={en ? 'Sweet dish' : 'Plat Sucré'}>
        <h3 style={{ textAlign: 'center' }}>
          {' '}
          {en
            ? 'Team Pancakes or Team Waffle?'
            : 'Vous êtes plutôt Pancakes ou Waffle ?'}
        </h3>
        <p style={{ textAlign: 'center', color: '#8a4d14' }}>
          {' '}
          {en
            ? 'The choice between 3 pancakes OR 1 waffle.'
            : 'Le choix entre 3 pancakes OU 1 gaufre.'}
        </p>
        <DishCard
          image={waffleoriginal}
          alt="waffle original"
          name="Original"
          price="9,50"
          description={
            en ? 'YOUR CHOICE: 3 pancakes or Waffle' : 'AU CHOIX : 3 pancakes ou Gaufre'
          }
          extras={
            en
              ? 'Homemade whipped cream, maple syrup, icing sugar'
              : "Crème fouettée maison, sirop d'érable, sucre glace"
          }
        />
        <DishCard
          image={pancakesfruits}
          alt="pancakes fruits"
          name="Fruits"
          price="13,50"
          description={
            en ? 'YOUR CHOICE: 3 pancakes or Waffle' : 'AU CHOIX : 3 pancakes ou Gaufre'
          }
          extras={
            en
              ? 'Homemade whipped cream, fresh fruit, maple syrup, icing sugar'
              : 'Crème fouettée maison, fruits frais, sirop d’érable, sucre glace'
          }
        />
        <DishCard
          image={waffleBch}
          alt="waffle banane chocolat"
          name="Banane Choco"
          price="13,50"
          description={
            en ? 'YOUR CHOICE: 3 pancakes or Waffle' : 'AU CHOIX : 3 pancakes ou Gaufre'
          }
          extras={
            en
              ? 'Homemade whipped cream, torched banana, chocolate chips, chocolate drizzle, icing sugar'
              : 'Crème fouettée maison, banane brûlée, pépites de chocolat, nappage chocolat, sucre glace'
          }
        />
        <DishCard
          name="Ice Cream"
          price="13,50"
          description={
            en ? 'YOUR CHOICE: 3 pancakes or Waffle' : 'AU CHOIX : 3 pancakes ou Gaufre'
          }
          extras={
            en
              ? 'Homemade whipped cream, 2 scoops of ice cream of your choice (strawberry, chocolate, vanilla or coconut), chocolate drizzle, icing sugar'
              : 'Crème fouettée maison, 2 boules de glaces au choix (fraise, chocolat, vanille ou coco), nappage chocolat, sucre glace'
          }
        />
        <DishCard
          image={petitgranola}
          alt="petit granola"
          imgPosition="center 55%"
          name="Petit Granola"
          price="6,00"
          description={
            en
              ? 'Greek yogurt, granola, fresh fruit'
              : 'Yaourt Grec, granola, fruits frais'
          }
        />
        <DishCard
          name="Grand Granola"
          price="10,00"
          description={
            en
              ? 'Greek yogurt, granola, fresh fruit'
              : 'Yaourt Grec, granola, fruits frais'
          }
        />
      </MenuSection>

      <MenuSection id="extra" title={en ? 'Extras' : 'Extra'}>
        <ul className="extras-list">
          <li>Pancake - 3,50</li>
          <li>Bacon - 3,50</li>
          <li>{en ? 'Smoked salmon - 3,50' : 'Saumon fumé - 3,50'}</li>
          <li>3 Crispy Chicken - 7,00</li>
          <li>{en ? "Smashed avocado - 2,50" : "Écrasé d'avocat - 2,50"}</li>
          <li>{en ? 'French fries - 3,90' : 'Pommes frites - 3,90'}</li>
        </ul>
      </MenuSection>

      <MenuSection id="douceur" title={en ? 'Snacks' : 'Petite Faim'}>
        <ul className="extras-list">
          <li>Cookie - 3,90</li>
          <li className="sweet-desc">
            {en
              ? 'Chocolate chunks OR triple chocolate'
              : 'Morceaux de chocolat OU 3 chocolats'}
          </li>
          <li>Brownie - 3,90</li>
          <li>{en ? 'Homemade tiramisu - 6,50' : 'Tiramisu maison - 6,50'}</li>
          <li>{en ? 'Fruit salad - 5,00' : 'Salade de fruits - 5,00'}</li>
          <li>{en ? 'French fries - 3,90' : 'Pommes frites - 3,90'}</li>
        </ul>
      </MenuSection>

      <DrinkSection en={en} />
    </div>
  );
}

function DrinkSection({ en = false }: { en?: boolean }) {
  return (
    <div>
      <MenuSection
        id="boisson-chaude"
        title={en ? 'Hot Drinks' : 'Boisson Chaude'}
      >
        <p style={{ textAlign: 'center' }}>
          {en
            ? 'Plant milk - 0,50: oat, almond, coconut'
            : 'Lait végétal - 0,50 : avoine, amande, coco'}
        </p>
        <ul className="extras-list">
          <li className="drink">
            <p>Expresso - 2,50</p>
            <p className="sweet-desc">
              {en ? 'Tight espresso shot' : 'Shot de café serré'}
            </p>
          </li>
          <li className="drink">
            <p>Café Allongé - 2,50</p>
            <p className="sweet-desc">
              {en ? 'Espresso shot, hot water' : 'Shot de café, eau chaude'}
            </p>
          </li>
          <li className="drink">
            <p>Décaféiné - 2,50</p>
            <p className="sweet-desc">
              {en ? 'Tight decaf shot' : 'Shot de café serré'}
            </p>
          </li>
          <li className="drink">
            <p>Café Noisette - 3,00</p>
            <p className="sweet-desc">
              {en ? 'Espresso shot, dash of milk' : 'Shot de café, nuage de lait'}
            </p>
          </li>
          <li className="drink">
            <p>Double Expresso - 3,50</p>
            <p className="sweet-desc">
              {en ? '2 tight espresso shots' : '2 shots de café serré'}
            </p>
          </li>
          <li className="drink">
            <p>Double Americano - 3,70</p>
            <p className="sweet-desc">
              {en ? '2 espresso shots, hot water' : '2 shots de café, eau chaude'}
            </p>
          </li>
          <li className="drink">
            <p>Café Latte - 5,00</p>
            <p className="sweet-desc">
              {en ? '2 espresso shots, milk' : '2 shots de café, lait'}
            </p>
          </li>
          <li className="drink">
            <p>Cappuccino - 5,00</p>
            <p className="sweet-desc">
              {en
                ? '2 espresso shots, milk, milk foam, cocoa powder'
                : '2 shots de café, lait, nuage de lait, chocolat en poudre'}
            </p>
          </li>
          <li className="drink">
            <p>Flat White - 5,00</p>
            <p className="sweet-desc">
              {en ? '2 espresso shots, milk' : '2 shots de café, lait'}
            </p>
          </li>
          <li className="drink">
            <p>Mocha - 5,50</p>
            <p className="sweet-desc">
              {en
                ? '2 espresso shots, milk, chocolate drizzle'
                : '2 shots de café, lait, nappage de chocolat'}
            </p>
          </li>
          <li className="drink">
            <p>Caramel Macchiato - 5,50</p>
            <p className="sweet-desc">
              {en
                ? '2 espresso shots, milk, caramel drizzle'
                : '2 shots de café, lait, nappage caramel'}
            </p>
          </li>
          <li className="drink">
            <p>Matcha Latte - 5,50</p>
            <p className="sweet-desc">{en ? 'Matcha, milk' : 'Matcha, lait'}</p>
          </li>
          <li className="drink">
            <p>Chaï Latte - 5,50</p>
            <p className="sweet-desc">
              {en ? 'Chai spices, milk' : 'Épices de chaï, lait'}
            </p>
          </li>
          <li className="drink">
            <p>Rose Café Latte - 5,50</p>
            <p className="sweet-desc">
              {en
                ? '2 espresso shots, rose syrup, milk, dried rose petal'
                : '2 shots de café, sirop de rose, lait, pétale de rose séchée'}
            </p>
          </li>
          <li className="drink">
            <p>Chocolat Chaud - 5,50</p>
            <p className="sweet-desc">
              {en ? 'Chocolate, milk' : 'Chocolat, lait'}
            </p>
          </li>
        </ul>
        <DishCard
          image={roseLatte}
          alt="Rose Café Latte"
          name="Rose Café Latte"
          price="5,50"
          description={
            en
              ? '2 espresso shots, rose syrup, milk, dried rose petal'
              : '2 shots de café, sirop de rose, lait, pétale de rose séchée'
          }
        />
      </MenuSection>

      <MenuSection
        id="boisson-froide"
        title={en ? 'Cold Drinks' : 'Boisson Froide'}
      >
        <p style={{ textAlign: 'center' }}>
          {en
            ? 'Plant milk - 0,50: oat, almond, coconut'
            : 'Lait végétal - 0,50 : avoine, amande, coco'}
        </p>
        <ul className="extras-list">
          <li className="drink">
            <p>Iced Americano - 4,50</p>
            <p className="sweet-desc">
              {en ? '2 espresso shots, cold water' : '2 shots de café, eau froide'}
            </p>
          </li>
          <li className="drink">
            <p>Iced Café Latte - 5,50</p>
            <p className="sweet-desc">
              {en ? '2 espresso shots, cold milk' : '2 shots de café, lait froid'}
            </p>
          </li>
          <li className="drink">
            <p>Iced Café Sweet Latte - 6,00</p>
            <p className="sweet-desc">
              {en ? '2 espresso shots, cold milk' : '2 shots de café, lait froid'}
            </p>
            <p className="sweet-desc">
              {en
                ? 'SYRUP OF YOUR CHOICE: rose, caramel, vanilla, hazelnut, blueberry'
                : 'SIROP AU CHOIX : rose, caramel, vanille, noisette, myrtille'}
            </p>
          </li>
          <li className="drink">
            <p>Iced Chocolat - 6,00</p>
            <p className="sweet-desc">
              {en ? 'Chocolate, cold milk' : 'Chocolat, lait froid'}
            </p>
          </li>
          <li className="drink">
            <p>Iced Mocha - 6,00</p>
            <p className="sweet-desc">
              {en
                ? '2 espresso shots, chocolate drizzle, cold milk'
                : '2 shots de café, nappage chocolat, lait froid'}
            </p>
          </li>
          <li className="drink">
            <p>Iced Caramel Macchiato - 6,00</p>
            <p className="sweet-desc">
              {en
                ? '2 espresso shots, caramel drizzle, cold milk'
                : '2 shots de café, nappage caramel, lait froid'}
            </p>
          </li>
          <li className="drink">
            <p>Iced Chaï - 6,00</p>
            <p className="sweet-desc">
              {en ? 'Chai spices, cold milk' : 'Épices chaï, lait froid'}
            </p>
          </li>
          <li className="drink">
            <p>Iced Café Viennois - 6,50</p>
            <p className="sweet-desc">
              {en
                ? '2 espresso shots, cold milk, whipped cream'
                : '2 shots de café, lait froid, chantilly'}
            </p>
          </li>
          <li className="drink">
            <p>Iced Matcha Latte - 6,50</p>
            <p className="sweet-desc">
              {en ? 'Matcha, cold milk' : 'Matcha, lait froid'}
            </p>
          </li>
          <li className="drink">
            <p>Iced Matcha Sweet Latte - 7,00</p>
            <p className="sweet-desc">
              {en ? 'Matcha, cold milk' : 'Matcha, lait froid'}
            </p>
            <p className="sweet-desc">
              {en
                ? 'PURÉE OF YOUR CHOICE: strawberry, raspberry, mango, blueberry'
                : 'PURÉE AU CHOIX : fraise, framboise, mangue, myrtille'}
            </p>
          </li>
          <li className="drink">
            <p>Iced Matcha Latte Viennois - 7,00</p>
            <p className="sweet-desc">
              {en ? 'Matcha, cold milk, whipped cream' : 'Matcha, lait froid, chantilly'}
            </p>
          </li>
          <li className="drink">
            <p>Iced Chocolat Viennois - 7,00</p>
            <p className="sweet-desc">
              {en
                ? 'Chocolate, cold milk, whipped cream'
                : 'Chocolat, lait froid, chantilly'}
            </p>
          </li>
          <li className="drink">
            <p>Iced Mocha Viennois - 7,00</p>
            <p className="sweet-desc">
              {en
                ? '2 espresso shots, cold milk, chocolate drizzle, whipped cream'
                : '2 shots de café, lait froid, nappage chocolat, chantilly'}
            </p>
          </li>
          <li className="drink">
            <p>Iced Tiramisu Latte - 7,00</p>
            <p className="sweet-desc">
              {en
                ? '2 espresso shots, cold milk, chocolate drizzle, cream, cocoa powder'
                : '2 shots de café, lait froid, nappage chocolat, crème, chocolat en poudre'}
            </p>
          </li>
          <li className="drink">
            <p>Iced Thé Citron Yuzu - 5,00</p>
          </li>
        </ul>
        <DishCard
          image={iceMaRas}
          alt="Iced Matcha Sweet Latte Framboise"
          name="Iced Matcha Sweet Latte Framboise"
          price="7,00"
          description={
            en ? 'Matcha, cold milk' : 'Matcha, lait froid'
          }
          extras={
            en
              ? 'PURÉE OF YOUR CHOICE: strawberry, raspberry, mango, blueberry.'
              : 'PURÉE AU CHOIX : fraise, framboise, mangue, myrtille.'
          }
        />
      </MenuSection>

      <MenuSection id="extra-boisson" title={en ? 'Extras' : 'Extra'}>
        <ul className="extras-list">
          <li>{en ? 'Large size - 0,50' : 'Grand Format - 0,50'}</li>
          <li>{en ? 'Espresso shot - 1,00' : 'Shot Expresso - 1,00'}</li>
          <li>{en ? 'Whipped cream - 1,00' : 'Chantilly - 1,00'}</li>
          <li>{en ? 'Syrup - 0,50' : 'Sirop - 0,50'}</li>
          <li className="sweet-desc">
            {en
              ? 'Rose, vanilla, caramel, hazelnut, blueberry'
              : 'Rose, vanille, caramel, noisette, myrtille'}
          </li>
          <li>{en ? 'Plant milk - 0,50' : 'Lait Végétal - 0,50'}</li>
          <li className="sweet-desc">
            {en ? 'Oat, almond, coconut' : 'Avoine, amande, coco'}
          </li>
        </ul>
      </MenuSection>

      <MenuSection id="jus" title={en ? 'Juices' : 'Jus'}>
        <ul className="extras-list">
          <li>{en ? 'Fresh orange juice - 5,50' : 'Orange Pressée - 5,50'}</li>
          <li>{en ? 'Multifruit juice - 5,00' : 'Multifruits - 5,00'}</li>
        </ul>
      </MenuSection>

      <MenuSection id="the-infusion" title={en ? 'Teas & Infusions' : 'Thé Infusion'}>
        <ul className="extras-list">
          <li>{en ? 'Yuzu tea - 4,50' : 'Thé Yuzu - 4,50'}</li>
          <li>Kusmi Tea Earl Grey Bio - 3,90</li>
          <li>Kusmi Tea English Breakfast Bio - 3,90</li>
          <li>Kusmi Tea Verveine menthe - 3,90</li>
          <li>Kusmi Tea Vert à la menthe - 3,90</li>
          <li>Kusmi Tea Vert au Jasmin Bio - 3,90</li>
          <li>Kusmi Tea Detox Bio - 3,90</li>
        </ul>
      </MenuSection>

      <MenuSection id="soda-canette" title={en ? 'Sodas' : 'Soda'}>
        <ul className="extras-list">
          <li>Coca - 2,90</li>
          <li>Coca Zéro - 2,90</li>
          <li>Orangina - 2,90</li>
          <li>Ice Tea - 2,90</li>
          <li>Sanpellegrino - 2,90</li>
          <li>Évian - 2,90</li>
        </ul>
      </MenuSection>
    </div>
  );
}
