import Image from "next/image";
import Link from "next/link";

import { Navbar } from "@/components/ui/navbar";

const IMG = "/afbeeldingen/Booklane";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const journeySteps = [
  {
    title: "Kiezen wat er speelt",
    text: "De klant kiest een categorie en beschrijft in eigen woorden het probleem. Booklane leidt daaruit de juiste dienst af.",
    image: `${IMG}/web-2.png`,
    alt: "Stap: categorie kiezen",
  },
  {
    title: "De behoefte omschrijven",
    text: "Per categorie kunnen extra vragen verschijnen. De antwoorden reizen mee met de aanvraag, zodat er meteen context is.",
    image: `${IMG}/web-3.png`,
    alt: "Stap: probleem omschrijven",
  },
  {
    title: "Locatie, werkgebied en prijs",
    text: "Ter plaatse of op afstand. Bij een adres wordt de rijafstand vanaf de basis berekend, gecheckt of het binnen 20 km valt, en direct een prijsindicatie getoond: duur × uurtarief + verplaatsing, als schatting.",
    image: `${IMG}/web-4.png`,
    alt: "Stap: locatie en prijsindicatie",
    wide: true,
  },
  {
    title: "Een moment kiezen",
    text: "Sommige momenten zijn direct boekbaar en meteen bevestigd, andere gaan op aanvraag. Wie verder woont dan de directe straal, kan enkel aanvragen.",
    image: `${IMG}/web-5.png`,
    alt: "Stap: moment kiezen",
  },
  {
    title: "Invullen en bevestigen",
    text: "Contactgegevens, akkoord en overzicht op één scherm, met één knop. Daarna volgt automatisch een bevestigingsmail. Betalen gebeurt na de interventie.",
    image: `${IMG}/web-6.png`,
    alt: "Stap: gegevens en bevestiging",
  },
];

const techSpec: { term: string; body: string; pre?: string }[] = [
  {
    term: "Stack",
    body: "PHP 8 met MySQL/MariaDB via vanilla PDO, volledig server-rendered. Geen framework, geen Composer. Draait op shared hosting; elke push naar main deployt via een GitHub Action over FTPS. Alle bedrijfswaarden — tarieven, teksten, werkgebied — staan in een settings-tabel, niet in de code.",
  },
  {
    term: "Beschikbaarheid",
    body: "Terugkerende weekregels (weekdag, tijdvak, modus: direct / op aanvraag / gesloten) plus eenmalige uitzonderingen per datum. Eén functie legt beide samen tot de tijdssegmenten van een dag; uitzonderingen overrulen de weekregels.",
  },
  {
    term: "Google Calendar",
    body: "OAuth2 in de admin. Google zegt enkel wanneer je bezet bent — de agenda-inhoud blijft dicht. Vrij/bezet wordt elke 15 minuten opgehaald en gecachet. Een bevestigde afspraak verschijnt als event in de doelagenda; bij annuleren verdwijnt het weer.",
  },
  {
    term: "Slot-engine",
    body: "Berekent de concrete boekbare startmomenten. Instellingen die meespelen: opzegtermijn, boekingshorizon, slot-granulariteit en per dienst de duur, buffer en modus. Woont de klant buiten de directe straal, dan zakken direct-slots automatisch naar “op aanvraag”.",
    pre: `  beschikbaarheid (weekregels + uitzonderingen)
− Google-bezet (gecachte vrij/bezet)
− bestaande afspraken + hun buffer
  binnen [nu + opzegtermijn, nu + horizon]
  in stappen van de slot-granulariteit
= boekbare slots, elk met hun modus`,
  },
  {
    term: "Prijs & afstand",
    body: "Postcode en gemeente worden gegeocodeerd (met cache, ook voor mislukkingen). Rijafstand via OpenRouteService, met terugval op hemelsbreed. Buiten het werkgebied is niet boekbaar; in de basisgemeente geldt een vast tarief, elders tarief per km, heen en terug.",
  },
  {
    term: "Afspraak-levenscyclus",
    body: "Eén centrale functie schrijft de statusovergang weg en voert daarna de neveneffecten uit — Google, mails, facturatie — in een try/catch, zodat een mislukte mail de statuswijziging nooit breekt. Een tegenvoorstel krijgt een geheime token die na één klik in de mail opbrandt; dat is de enige uitzondering op “geen klant-login”.",
    pre: `aangevraagd ──▶ bevestigd ──▶ uitgevoerd
     │              │
     ▼              ▼
 geweigerd      geannuleerd`,
  },
  {
    term: "E-mail & push",
    body: "Mail via PHPMailer en SMTP, elke poging gelogd. Alle klantmails gaan automatisch — ontvangst, bevestiging, voorstel, weigering, annulatie — met een blinde kopie voor de technieker. Push naar iPhone via APNs, met een wachtrij die mislukte meldingen opnieuw probeert.",
  },
  {
    term: "Cron",
    body: "Drie taken: de vrij/bezet-cache warm houden (elk kwartier), de GDPR-bewaartermijn toepassen (dagelijks) en de push-wachtrij leegmaken (elke minuut).",
  },
];

const principles = [
  {
    term: "Privacy eerst",
    text: "De privé-agenda blijft dicht — alleen vrij of bezet telt mee. GDPR-tekst, toestemming en een bewaartermijn zitten ingebouwd.",
  },
  {
    term: "Geen klant-login",
    text: "De enige uitzondering is de éénklik-bevestiglink bij een tegenvoorstel: een geheime token die opbrandt na gebruik.",
  },
  {
    term: "Alles in de admin",
    text: "Tarieven, teksten, werkgebied en taal staan in de beheeromgeving. Niets hardgecodeerd — alles blijft aanpasbaar zonder de code aan te raken.",
  },
  {
    term: "Meertalig opgezet",
    text: "Nederlandstalig, met Engels, Frans en Duits voorzien in de structuur.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Bouwstenen                                                                 */
/* -------------------------------------------------------------------------- */

function SectionHead({
  index,
  label,
  title,
  invert = false,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  invert?: boolean;
}) {
  const line = invert ? "border-white/15" : "border-[#14181c]/12";
  const meta = invert ? "text-white/45" : "text-[#8a8377]";
  const head = invert ? "text-[#f4f1ea]" : "text-[#14181c]";
  return (
    <div className={`border-t ${line} pt-5`}>
      <p className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] ${meta}`}>
        <span className="font-serif text-[#9a7b4f]">{index}</span>
        {label}
      </p>
      <h2
        className={`mt-6 max-w-2xl font-serif text-[2rem] font-normal leading-[1.12] tracking-[-0.01em] sm:text-[2.6rem] md:text-[3rem] ${head}`}
      >
        {title}
      </h2>
    </div>
  );
}

function Frame({
  src,
  alt,
  width,
  height,
  invert = false,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  invert?: boolean;
  priority?: boolean;
}) {
  return (
    <div className={`overflow-hidden border ${invert ? "border-white/12" : "border-[#14181c]/12"}`}>
      <Image src={src} alt={alt} width={width} height={height} priority={priority} className="h-auto w-full" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pagina                                                                     */
/* -------------------------------------------------------------------------- */

export function BooklanePage() {
  return (
    <div className="overflow-x-clip bg-[#f4f1ea] text-[#14181c]">
      <Navbar variant="overlay" theme="dark" />

      {/* ---------------------------------------------------------------- Hero */}
      <header className="px-5 pt-28 sm:px-8 md:pt-36 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex items-baseline justify-between border-b border-[#14181c]/12 pb-4">
            <Link
              href="/software"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#8a8377] transition-colors hover:text-[#14181c]"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
              Software
            </Link>
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#8a8377]">In ontwikkeling</span>
          </div>

          <div className="grid gap-x-12 gap-y-10 pt-14 md:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="font-serif text-lg italic text-[#9a7b4f]">Booklane</p>
              <h1 className="mt-4 font-serif text-[2.9rem] font-normal leading-[1.03] tracking-[-0.015em] sm:text-6xl md:text-[4.4rem] lg:text-[4.9rem]">
                Zelf een afspraak boeken,
                <br className="hidden sm:block" /> zonder een enkel bericht.
              </h1>
            </div>

            <div className="lg:pb-3">
              <p className="max-w-md text-[15px] leading-7 text-[#5b5f63]">
                Booklane geeft klanten van een dienstverlener een zelfbedieningsflow:
                de juiste dienst, een prijsindicatie vooraf en een moment dat past —
                direct boekbaar of op aanvraag. Gebouwd voor Vancoillie IT Hulp.
              </p>
            </div>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-14 gap-y-5 border-t border-[#14181c]/12 pt-6">
            {[
              ["Type", "Boekingssoftware"],
              ["Gebouwd voor", "Vancoillie IT Hulp"],
              ["Onderdelen", "Boekingssite · web-admin · iOS-app"],
              ["Stack", "PHP 8 · MySQL · SwiftUI"],
            ].map(([term, val]) => (
              <div key={term}>
                <dt className="text-[11px] uppercase tracking-[0.2em] text-[#8a8377]">{term}</dt>
                <dd className="mt-1.5 text-sm text-[#14181c]">{val}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* volle-breedte productbeeld */}
        <figure className="mt-16 md:mt-24">
          <div className="mx-[calc(50%-50vw)] w-screen border-y border-[#14181c]/12">
            <Image
              src={`${IMG}/web-1.png`}
              alt="De publieke boekingssite van Booklane"
              width={2800}
              height={1500}
              priority
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mx-auto mt-4 flex max-w-[1240px] items-center gap-3 px-5 text-[11px] uppercase tracking-[0.18em] text-[#8a8377] sm:px-8 lg:px-12">
            <span className="h-px w-8 bg-[#9a7b4f]" />
            De publieke boekingssite — geen login
          </figcaption>
        </figure>
      </header>

      {/* --------------------------------------------------------- 01 Probleem */}
      <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <SectionHead
            index="01"
            label="Het probleem"
            title={
              <>
                Van een reeks berichten naar <em className="font-light italic text-[#9a7b4f]">één</em> flow.
              </>
            }
          />

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-0">
            <div className="md:pr-12">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8a8377]">Vroeger</p>
              <p className="mt-4 max-w-sm text-[15px] leading-7 text-[#5b5f63]">
                De klant belt of mailt. &ldquo;Wanneer kan je?&rdquo; Een paar keer heen en
                weer. De afspraak belandt handmatig in de agenda. De prijs wordt pas
                achteraf duidelijk.
              </p>
            </div>
            <div className="md:border-l md:border-[#14181c]/12 md:pl-12">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#14181c]">Met Booklane</p>
              <p className="mt-4 max-w-sm text-[15px] leading-7 text-[#5b5f63]">
                De klant vindt de juiste dienst, ziet meteen een prijsindicatie, kiest
                enkel uit momenten die echt kunnen en bevestigt in één scherm. De
                technieker krijgt een volledige aanvraag met context.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- 02 Klantreis */}
      <section className="bg-[#efeae0] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <SectionHead
            index="02"
            label="De klantreis"
            title={<>Vijf stappen, één vloeiende ervaring.</>}
          />

          <div className="mt-16 md:mt-24">
            {journeySteps.map((step, index) => {
              const num = String(index + 1).padStart(2, "0");

              if (step.wide) {
                return (
                  <div key={step.title} className="border-t border-[#14181c]/12 py-14 md:py-20">
                    <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-12">
                      <span className="font-serif text-3xl text-[#9a7b4f] md:text-4xl">{num}</span>
                      <div className="max-w-3xl">
                        <h3 className="font-serif text-2xl font-normal tracking-[-0.01em] md:text-[1.9rem]">
                          {step.title}
                        </h3>
                        <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#5b5f63]">{step.text}</p>
                      </div>
                    </div>
                    <div className="mt-10 md:mt-12">
                      <Frame src={step.image} alt={step.alt} width={2800} height={1500} />
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={step.title}
                  className={`grid items-center gap-8 border-t border-[#14181c]/12 py-14 md:grid-cols-2 md:gap-16 md:py-20 ${
                    index % 2 === 1 ? "md:[&>figure]:order-first" : ""
                  }`}
                >
                  <div>
                    <span className="font-serif text-3xl text-[#9a7b4f] md:text-4xl">{num}</span>
                    <h3 className="mt-4 font-serif text-2xl font-normal tracking-[-0.01em] md:text-[1.9rem]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[15px] leading-7 text-[#5b5f63]">{step.text}</p>
                  </div>
                  <figure>
                    <Frame src={step.image} alt={step.alt} width={2000} height={1250} />
                  </figure>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- 03 Onderdelen */}
      <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <SectionHead
            index="03"
            label="De drie onderdelen"
            title={<>Eén systeem, drie ingangen.</>}
          />

          {/* Boekingssite — tekst smal, beeld breekt naar rechts */}
          <div className="mt-16 grid gap-10 border-t border-[#14181c]/12 pt-14 md:mt-24 md:grid-cols-[0.6fr_1.4fr] md:gap-14 md:pt-20">
            <div>
              <h3 className="font-serif text-2xl font-normal md:text-[1.9rem]">Boekingssite</h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#8a8377]">
                Voor de klant · publiek
              </p>
              <p className="mt-5 text-[15px] leading-7 text-[#5b5f63]">
                Een server-rendered wizard: categorie, intake, dienst, locatie, moment,
                bevestigen. Geen account. Beschermd met honeypot, rate-limiting per IP
                en e-mailvalidatie.
              </p>
            </div>
            <figure className="md:-mr-[6vw]">
              <Frame src={`${IMG}/web-7.png`} alt="Booklane boekingssite — bevestiging" width={2400} height={1350} />
            </figure>
          </div>

          {/* Web-admin — breed beeld */}
          <div className="mt-16 border-t border-[#14181c]/12 pt-14 md:mt-24 md:pt-20">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h3 className="font-serif text-2xl font-normal md:text-[1.9rem]">Web-admin</h3>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#8a8377]">
                  Voor de technieker · aan de laptop
                </p>
              </div>
              <p className="max-w-sm text-[14px] leading-6 text-[#5b5f63]">
                Single-user login met bcrypt en CSRF op elk formulier. Dashboard,
                aanvragen-inbox, afspraken, agenda, beschikbaarheid, diensten, prijzen
                en instellingen.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2">
              <Frame src={`${IMG}/web-9.png`} alt="Web-admin — agenda en Google-koppeling" width={2000} height={1250} />
              <Frame src={`${IMG}/web-10.png`} alt="Web-admin — beschikbaarheid" width={2000} height={1250} />
            </div>
          </div>

          {/* Mobiele app — portret naast tekst */}
          <div className="mt-16 grid items-center gap-10 border-t border-[#14181c]/12 pt-14 md:mt-24 md:grid-cols-[1fr_0.9fr] md:gap-16 md:pt-20">
            <div>
              <h3 className="font-serif text-2xl font-normal md:text-[1.9rem]">Mobiele app</h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#8a8377]">
                Voor de technieker · onderweg · iOS
              </p>
              <p className="mt-5 max-w-md text-[15px] leading-7 text-[#5b5f63]">
                Een native SwiftUI-app op een dunne JSON-API die exact dezelfde
                serverfuncties hergebruikt — geen logica verdubbeld. Dashboard,
                afspraken en aanvragen afhandelen, met pushmeldingen bij elke nieuwe
                boeking en deeplinks naar het juiste scherm.
              </p>
            </div>
            <div className="mx-auto w-full max-w-[300px] md:mx-0 md:justify-self-end">
              <Frame src={`${IMG}/app-1.png`} alt="Booklane iOS-app — overzicht" width={900} height={1950} />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- 04 Onder de motorkap */}
      <section className="bg-[#14181c] px-5 py-24 text-[#f4f1ea] sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <SectionHead
            index="04"
            label="Onder de motorkap"
            invert
            title={
              <>
                Server-rendered PHP, <em className="font-light italic text-[#c9a978]">zonder</em> framework.
              </>
            }
          />
          <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/55">
            Eén businesslaag, hergebruikt door de publieke site, de web-admin en de
            JSON-API voor de app. Geen logica gedupliceerd.
          </p>

          <dl className="mt-16 md:mt-20">
            {techSpec.map((item) => (
              <div
                key={item.term}
                className="grid gap-x-12 gap-y-4 border-t border-white/12 py-9 md:grid-cols-[220px_1fr] md:py-11"
              >
                <dt className="font-serif text-xl text-[#f4f1ea]">{item.term}</dt>
                <dd>
                  <p className="max-w-2xl text-[14px] leading-7 text-white/60">{item.body}</p>
                  {item.pre ? (
                    <pre className="mt-5 overflow-x-auto border border-white/12 bg-black/25 p-5 font-mono text-[12px] leading-6 text-white/70">
                      {item.pre}
                    </pre>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------- 05 Uitgangspunten */}
      <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <SectionHead
            index="05"
            label="Uitgangspunten"
            title={<>De regels waar alles op rust.</>}
          />

          <ol className="mt-14">
            {principles.map((p, i) => (
              <li
                key={p.term}
                className="grid gap-x-12 gap-y-2 border-t border-[#14181c]/12 py-8 md:grid-cols-[64px_240px_1fr] md:py-9"
              >
                <span className="font-serif text-2xl text-[#9a7b4f]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-xl font-normal">{p.term}</h3>
                <p className="max-w-xl text-[14px] leading-7 text-[#5b5f63]">{p.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 flex items-center justify-between border-t border-[#14181c]/12 pt-6">
            <span className="font-serif italic text-[#9a7b4f]">Booklane</span>
            <Link
              href="/software"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#14181c]"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
              <span className="border-b border-[#14181c]/30 pb-0.5 transition-colors group-hover:border-[#9a7b4f]">
                Terug naar software
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
