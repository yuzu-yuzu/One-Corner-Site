import { InfoCard } from './Utils';
import map from '../assets/map.jpg';

export default function Contact() {
  const MAPS_URL =
    'https://www.google.com/maps/search/?api=1&query=One+Corner+Coffee+Brunch+Paris';
  return (
    <footer id="contact" className="footer">
      <InfoCard
        title="Adresse"
        text="12 passage Molière, Paris 3e arrondissement"
        href="https://www.google.com/maps/search/?api=1&query=One+Corner+Coffee+Brunch+Paris"
      />
      <InfoCard
        title="Métro"
        text="Étienne Marcel (ligne 4) - Rambuteau (ligne 11)"
      />
      <InfoCard title="Horaires" text="Ouvert de 9h à 18h, fermé mardi" />
      <InfoCard title="Contact" text="01 71 32 34 07" href="tel:+33171323407" />
      <InfoCard
        title="Instagram"
        text="onecorner_paris"
        href="https://www.instagram.com/onecorner_paris/"
      />
      <div className="map-frame">
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ouvrir l'adresse dans Google Maps"
        >
          <img
            src={map}
            alt="Plan d'accès OneCorner : métros Étienne Marcel ligne 4 et Rambuteau ligne 11, RER Châtelet-Les Halles, parkings autour"
          />
        </a>
      </div>
    </footer>
  );
}
