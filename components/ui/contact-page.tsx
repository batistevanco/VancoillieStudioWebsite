import { Navbar } from "@/components/ui/navbar";
import { ArrowUpRight, MapPin, Receipt } from "lucide-react";

const socialLinks = [
                { label: "Instagram", href: "https://www.instagram.com/vancoli_be/", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
                { label: "X", href: "https://x.com/vancoli_be", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.532-8.502L1.264 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/batiste-vancoillie-622562291/", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
                { label: "Portfolio", href: "https://batistevancoillie.be/", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" },
 ];

export function ContactPage() {
  return (
    <div className="studio-contact min-h-screen">
      <Navbar variant="overlay" />
      <main className="studio-contact__main">
        <span className="studio-eyebrow">Contact</span>
        <p className="studio-contact__intro">Laten we samen iets bouwen.</p>
        <h1 className="studio-contact__email">
          <a href="mailto:info@vancoli.be">
            info@vancoli.be
            <ArrowUpRight aria-hidden="true" />
          </a>
        </h1>
        <p className="studio-contact__description">
          Heb je een idee, project of vraag? Stuur ons rechtstreeks een mail.
          We luisteren graag en denken met je mee.
        </p>
        <div className="studio-contact__details">
          <div><MapPin size={18} aria-hidden="true" /><span>Roeselare, België</span></div>
          <div><Receipt size={18} aria-hidden="true" /><span>BTW BE 1014.303.066</span></div>
        </div>
        <div className="studio-contact__socials">
          {socialLinks.map(({ label, href, path }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d={path} /></svg>
            </a>
          ))}
        </div>
        <p className="studio-contact__credit">Powered by <a href="https://vancoli.be" target="_blank" rel="noopener noreferrer">VANCOLI.</a></p>
      </main>
    </div>
  );
}
