import { Header } from "@/components/ui/header-2";
import { LegalPage } from "@/components/ui/legal-page";

const sections = [
  {
    title: "Welke gegevens we verwerken",
    paragraphs: [
      "Wanneer je contact opneemt via onze website kunnen we gegevens verwerken zoals je naam, e-mailadres en de inhoud van je bericht.",
      "Afhankelijk van de samenwerking kunnen ook bijkomende gegevens verwerkt worden die nodig zijn voor offerte, communicatie, facturatie of projectopvolging.",
    ],
  },
  {
    title: "Waarom we deze gegevens gebruiken",
    paragraphs: [
      "We gebruiken persoonsgegevens om aanvragen te beantwoorden, projecten uit te voeren, offertes op te maken, klantenrelaties te beheren en onze dienstverlening correct te leveren.",
      "Gegevens worden niet gebruikt voor andere doeleinden dan wat redelijkerwijs nodig is binnen de samenwerking of communicatie.",
    ],
  },
  {
    title: "Delen van gegevens",
    paragraphs: [
      "We delen persoonsgegevens niet met derden, behalve wanneer dit nodig is voor de uitvoering van onze diensten, voor technische ondersteuning, voor boekhoudkundige verwerking of wanneer de wet dit vereist.",
      "Waar nodig werken we met externe tools of dienstverleners die gegevens verwerken in onze opdracht.",
    ],
  },
  {
    title: "Bewaring",
    paragraphs: [
      "Persoonsgegevens worden niet langer bewaard dan nodig is voor het doel waarvoor ze werden verzameld, tenzij een langere bewaartermijn wettelijk verplicht is.",
      "Communicatie en facturatiegegevens kunnen bewaard blijven zolang dit nodig is voor administratie, opvolging en wettelijke verplichtingen.",
    ],
  },
  {
    title: "Beveiliging",
    paragraphs: [
      "We nemen redelijke technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen verlies, misbruik of ongeoorloofde toegang.",
      "Geen enkel systeem is volledig risicoloos, maar we streven naar een passende en zorgvuldige omgang met alle gegevens die we ontvangen.",
    ],
  },
  {
    title: "Jouw rechten",
    paragraphs: [
      "Je hebt het recht om inzage te vragen in je persoonsgegevens, onjuiste gegevens te laten corrigeren en in bepaalde gevallen verwijdering of beperking van verwerking te vragen.",
      "Voor vragen over privacy of verzoeken rond gegevensverwerking kan je contact opnemen via support@vancoilliestudio.be.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <LegalPage
        title="Privacybeleid"
        updatedAt="Laatst bijgewerkt: 24 maart 2026"
        intro="Deze pagina legt uit welke persoonsgegevens Vancoillie Studio verwerkt, waarom we dat doen en hoe we met die gegevens omgaan."
        sections={sections}
      />
    </>
  );
}
