import menulogo from '../assets/menulogo.png';
import brunch from '../assets/formuleBrunch.jpg';
import avocadoEgg from '../assets/avocadoEgg.jpg';
import wafflebacon from '../assets/waffleBacon2.jpg';
import avocadoToast from '../assets/avocadoToast.jpg';
import salmonToast from '../assets/salmonToast.png';
import waffleoriginal from '../assets/waffleOriginal.jpg';
import waffleBch from '../assets/waffleBch.jpg';
import pancakesfruits from '../assets/pancakeFruit.jpg';
import petitgranola from '../assets/smallGranola.jpg';
import roseLatte from '../assets/roseLatte.jpg';
import iceMaRas from '../assets/iceMatchaRas2.jpg';

import { type ReactNode } from 'react';

// Interfaces de typage
interface DishCardProps {
  image?: string;
  alt?: string;
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
  name,
  price,
  description = '',
  extras = '',
}: DishCardProps) {
  return (
    <div className="dish">
      {image && <img src={image} alt={alt} className="dish-img" />}
      <div className="dish-text">
        <h4>
          {name} - {price}
        </h4>
        <p>{description}</p>
        {extras && <p>{extras}</p>}
      </div>
    </div>
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

export default function Menu() {
  return (
    <div className="menu-page">
      <h2 className="sr-only">Notre Menu</h2>
      <img src={menulogo} alt="Logo Menu" className="logoMenu" />
      <p style={{ textAlign: 'center', color: '#8a4d14' }}>
        Notre carte s'adapte à toutes les envies ! Une demande particulière ou
        une allergie ?
      </p>
      <p style={{ textAlign: 'center', color: '#8a4d14' }}>
        N'hésitez pas à nous solliciter, nous ferons notre possible pour vous
        faire plaisir.{' '}
      </p>

      <MenuSection id="formules" title="Notre Formule Brunch">
        <div className="dish">
          <img src={brunch} alt="image brunch" className="formuladish-img" />
          <div className="dish-text">
            <h4>Formule Brunch - 27,90</h4>
            <p>Plat salé ou Sucré au choix</p>
            <p>Boisson chaude ou froide au choix</p>
            <p>Jus d'orange ou multifruit</p>
            <p>
              Dessert au choix : petit granola, 2 boules de glaces, tiramisu
              maison ou salade de fruits
            </p>
          </div>
        </div>
      </MenuSection>

      <MenuSection id="sale" title="Plat Salé">
        <DishCard
          image={avocadoEgg}
          alt="Avocado egg benedict"
          name="Avocado Egg Benedict"
          price="13,90"
          description="Pain de muffin, avocat, coleslaw, 2 œufs pochés, sauce hollandaise, salade"
          extras="SAUMON FUMÉ ou BACON + 2€"
        />
        <DishCard
          image={wafflebacon}
          alt="Waffle Salée"
          name="Waffle Salée"
          price="15,90"
          description="AU CHOIX : Crispy Chicken, Bacon, Saumon Fumé"
          extras="Gaufre, viande au choix, avocat, oeuf plat, coleslaw, oignon mariné, sauce maison"
        />
        <DishCard
          image={avocadoToast}
          alt="Avocado Toast"
          name="Avocado Toast"
          price="13,90"
          description="Pain toast, avocat écrasé, fromage blanc, tomate confite, sauce pesto, salade"
        />
        <DishCard
          image={salmonToast}
          alt="Saumon Toast"
          name="Saumon Toast"
          price="14,90"
          description="Pain toast, saumon fumé, sauce gravlax, oeuf brouillé, salade"
        />
        <DishCard
          name="Crispy César"
          price="13,90"
          description="Salade, crispy chicken, oeuf dur, croutons, parmesan, tomate cerise."
        />
        <DishCard
          name="Sides de Maison"
          price="15,90"
          description="AU CHOIX : Bacon ou Saumon Fumé"
          extras="Pain toast, viande au choix, oeufs brouillés, avocat, beurre, cream cheese, oignon rouge"
        />
      </MenuSection>

      <MenuSection id="sucre" title="Plat Sucré">
        <h3 style={{ textAlign: 'center' }}>
          {' '}
          Vous êtes plutôt Pancakes ou Waffle ?
        </h3>
        <p style={{ textAlign: 'center', color: '#8a4d14' }}>
          {' '}
          Le choix entre 3 pancakes OU 1 gaufre.
        </p>
        <DishCard
          image={waffleoriginal}
          alt="waffle original"
          name="Original"
          price="9,50"
          description="Crème fouettée maison, sirop d'érable, sucre glace"
        />
        <DishCard
          image={pancakesfruits}
          alt="pancakes fruits"
          name="Fruits"
          price="13,50"
          description="Crème fouettée maison, fruits frais, sirop d'érable, sucre glace"
        />
        <DishCard
          image={waffleBch}
          alt="waffle banane chocolat"
          name="Banane Choco"
          price="13,50"
          description="Crème fouettée maison, banane brûlée, pépites de chocolat, nappage chocolat, sucre glace"
        />
        <DishCard
          name="Ice Cream"
          price="13,50"
          description="Crème fouettée maison, 2 boules de glaces au choix (fraise, chocolat ou vanille), nappage chocolat, sucre glace"
        />
        <DishCard
          image={petitgranola}
          alt="petit granola"
          name="Petit Granola"
          price="6,00"
          description="Yaourt Grec, granola, fruits frais"
        />
        <DishCard
          name="Grand Granola"
          price="10,00"
          description="Yaourt Grec, granola, fruits frais"
        />
      </MenuSection>

      <MenuSection id="extra" title="Extra">
        <div className="extras-list">
          <p>Pancake - 3,50</p>
          <p>Bacon - 3,50</p>
          <p>Saumon fumé - 3,50</p>
          <p>3 Crispy Chicken - 7,00</p>
          <p>Écrasé d'avocat - 2,50</p>
          <p>Pommes frites - 3,90</p>
        </div>
      </MenuSection>

      <MenuSection id="douceur" title="Petite Faim">
        <div className="extras-list">
          <p>Cookie - 3,90</p>
          <p className="sweet-desc">Morceaux de chocolat OU 3 chocolats</p>
          <p>Brownie - 3,90</p>
          <p>Tiramisu maison - 6,50</p>
          <p>Salade de fruits - 5,00</p>
          <p>Pommes frites - 3,90</p>
        </div>
      </MenuSection>

      <DrinkSection />
    </div>
  );
}

function DrinkSection() {
  return (
    <div>
      <MenuSection id="boisson-chaude" title="Boisson Chaude">
        <p style={{ textAlign: 'center' }}>
          Lait végétal - 0,50 : avoine, amande, coco
        </p>
        <div className="extras-list">
          <div className="drink">
            <p>Expresso - 2,50</p>
            <p className="sweet-desc">Shot de café serré</p>
          </div>
          <div className="drink">
            <p>Café Allongé - 2,50</p>
            <p className="sweet-desc">Shot de café, eau chaude</p>
          </div>
          <div className="drink">
            <p>Décaféiné - 2,50</p>
            <p className="sweet-desc">Shot de café serré</p>
          </div>
          <div className="drink">
            <p>Café Noisette - 3,00</p>
            <p className="sweet-desc">Shot de café, nuage de lait</p>
          </div>
          <div className="drink">
            <p>Double Expresso - 3,50</p>
            <p className="sweet-desc">2 shots de café serré</p>
          </div>
          <div className="drink">
            <p>Double Americano - 3,70</p>
            <p className="sweet-desc">2 shots de café, eau chaude</p>
          </div>
          <div className="drink">
            <p>Café Latte - 5,00</p>
            <p className="sweet-desc">2 shots de café, lait</p>
          </div>
          <div className="drink">
            <p>Cappuccino - 5,00</p>
            <p className="sweet-desc">
              2 shots de café, lait, nuage de lait, chocolat en poudre
            </p>
          </div>
          <div className="drink">
            <p>Flat White - 5,00</p>
            <p className="sweet-desc">2 shots de café, lait</p>
          </div>
          <div className="drink">
            <p>Mocha - 5,50</p>
            <p className="sweet-desc">
              2 shots de café, lait, nappage de chocolat
            </p>
          </div>
          <div className="drink">
            <p>Caramel Macchiato - 5,50</p>
            <p className="sweet-desc">2 shots de café, lait, nappage caramel</p>
          </div>
          <div className="drink">
            <p>Matcha Latte - 5,50</p>
            <p className="sweet-desc">Matcha, lait</p>
          </div>
          <div className="drink">
            <p>Chaï Latte - 5,50</p>
            <p className="sweet-desc">Épices de chaï, lait</p>
          </div>
          <div className="drink">
            <p>Chocolat Chaud - 5,50</p>
            <p className="sweet-desc">Chocolat, lait</p>
          </div>
        </div>
        <DishCard
          image={roseLatte}
          alt="Rose Café Latte"
          name="Rose Café Latte"
          price="5,50"
          description="2 shots de café, sirop de rose, lait, pétale de rose séchée"
        />
      </MenuSection>

      <MenuSection id="boisson-froide" title="Boisson Froide">
        <p style={{ textAlign: 'center' }}>
          Lait végétal - 0,50 : avoine, amande, coco
        </p>
        <div className="extras-list">
          <div className="drink">
            <p>Iced Americano - 4,50</p>
            <p className="sweet-desc">2 shots de café, eau froide</p>
          </div>
          <div className="drink">
            <p>Iced Café Latte - 5,50</p>
            <p className="sweet-desc">2 shots de café, lait froid</p>
          </div>
          <div className="drink">
            <p>Iced Sweet Café Latte - 6,00</p>
            <p className="sweet-desc">
              SIROP AU CHOIX : rose, caramel, vanille, noisette, myrtille
            </p>
            <p className="sweet-desc">2 shots de café, lait froid</p>
          </div>
          <div className="drink">
            <p>Iced Chocolat - 6,00</p>
            <p className="sweet-desc">Chocolat, lait froid</p>
          </div>
          <div className="drink">
            <p>Iced Mocha - 6,00</p>
            <p className="sweet-desc">
              2 shots de café, nappage chocolat, lait froid
            </p>
          </div>
          <div className="drink">
            <p>Iced Caramel Macchiato - 6,00</p>
            <p className="sweet-desc">
              2 shots de café, nappage caramel, lait froid
            </p>
          </div>
          <div className="drink">
            <p>Iced Chaï - 6,00</p>
            <p className="sweet-desc">Épices chaï, lait froid</p>
          </div>
          <div className="drink">
            <p>Iced Café Viennois - 6,50</p>
            <p className="sweet-desc">2 shots de café, lait froid, chantilly</p>
          </div>
          <div className="drink">
            <p>Iced Matcha Latte - 6,50</p>
            <p className="sweet-desc">Matcha, lait froid</p>
          </div>
          <div className="drink">
            <p>Iced Matcha Latte Sweet - 7,00</p>
            <p className="sweet-desc">
              PURÉE AU CHOIX : fraise, framboise, mangue, myrtille
            </p>
            <p className="sweet-desc">Matcha, lait froid</p>
          </div>
          <div className="drink">
            <p>Iced Matcha Latte Viennois - 7,00</p>
            <p className="sweet-desc">Matcha, lait froid, chantilly</p>
          </div>
          <div className="drink">
            <p>Iced Chocolat Viennois - 7,00</p>
            <p className="sweet-desc">Chocolat, lait froid, chantilly</p>
          </div>
          <div className="drink">
            <p>Iced Mocha Viennois - 7,00</p>
            <p className="sweet-desc">
              2 shots de café, lait froid, nappage chocolat, chantilly
            </p>
          </div>
          <div className="drink">
            <p>Iced Tiramisu Latte - 7,00</p>
            <p className="sweet-desc">
              2 shots de café, lait froid, nappage chocolat, crème, chocolat en
              poudre
            </p>
          </div>
          <div className="drink">
            <p>Iced Thé Citron Yuzu - 5,00</p>
          </div>
        </div>
        <DishCard
          image={iceMaRas}
          alt="Iced Matcha Latte Framboise"
          name="Iced Matcha Latte Framboise"
          price="7,00"
          description="PURÉE AU CHOIX : fraise, framboise, mangue, myrtille."
          extras="Matcha, lait froid"
        />
      </MenuSection>

      <MenuSection id="extra-boisson" title="Extra">
        <div className="extras-list">
          <p>Grand Format - 0,50</p>
          <p>Shot Expresso - 1,00</p>
          <p>Chantilly - 1,00</p>
          <p>Sirop - 0,50</p>
          <p className="sweet-desc">
            Rose, vanille, caramel, noisette, myrtille
          </p>
          <p>Lait Végétal - 0,50</p>
          <p className="sweet-desc">Avoine, amande, coco</p>
        </div>
      </MenuSection>

      <MenuSection id="jus" title="Jus">
        <div className="extras-list">
          <p>Orange Pressée - 5,50</p>
          <p>Multifruits - 5,00</p>
        </div>
      </MenuSection>

      <MenuSection id="the-infusion" title="Thé Infusion">
        <div className="extras-list">
          <p>Thé Yuzu - 4,50</p>
          <p>Kusmi Tea Earl Grey Bio - 3,90</p>
          <p>Kusmi Tea English Breakfast Bio - 3,90</p>
          <p>Kusmi Tea Ceylan Bio - 3,90</p>
          <p>Kusmi Tea Vert au Jasmin Bio - 3,90</p>
          <p>Kusmi Tea Detox Bio - 3,90</p>
        </div>
      </MenuSection>

      <MenuSection id="soda-canette" title="Soda">
        <div className="extras-list">
          <p>Coca - 2,90</p>
          <p>Coca Zéro - 2,90</p>
          <p>Orangina - 2,90</p>
          <p>Ice Tea - 2,90</p>
          <p>Sanpellegrino - 2,90</p>
          <p>Évian - 2,90</p>
        </div>
      </MenuSection>
    </div>
  );
}
