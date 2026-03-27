import { Header } from "@/components/ui/header-2";
import { LegalPage } from "@/components/ui/legal-page";

const sections = [
  {
    title: "Toepasselijkheid",
    paragraphs: [
      "Deze algemene voorwaarden zijn van toepassing op alle offertes, diensten, projecten en samenwerkingen van Vancoillie Studio, tenzij schriftelijk anders werd overeengekomen.",
      "Door gebruik te maken van onze diensten verklaart de klant zich akkoord met deze voorwaarden.",
    ],
  },
  {
    title: "Offertes en overeenkomsten",
    paragraphs: [
      "Offertes zijn indicatief en geldig gedurende de termijn die erop vermeld staat. Een samenwerking komt tot stand zodra een offerte, voorstel of opdracht schriftelijk wordt bevestigd.",
      "Extra werk buiten de afgesproken scope kan afzonderlijk worden gefactureerd.",
    ],
  },
  {
    title: "Uitvoering van diensten",
    paragraphs: [
      "Vancoillie Studio voert opdrachten uit naar best vermogen en op basis van de informatie die door de klant wordt aangeleverd.",
      "De klant blijft verantwoordelijk voor het tijdig bezorgen van correcte inhoud, feedback, toegang en goedkeuringen die nodig zijn voor de uitvoering van het project.",
    ],
  },
  {
    title: "Betaling",
    paragraphs: [
      "Facturen zijn betaalbaar binnen de vervaldatum die op de factuur vermeld staat, tenzij schriftelijk anders werd overeengekomen.",
      "Bij laattijdige betaling kunnen wettelijke intresten en invorderingskosten worden aangerekend.",
    ],
  },
  {
    title: "Intellectuele eigendom",
    paragraphs: [
      "Ontwerpen, code, concepten en andere geleverde materialen blijven eigendom van Vancoillie Studio tot de volledige betaling van de facturen is ontvangen.",
      "Na volledige betaling krijgt de klant het gebruiksrecht zoals afgesproken binnen het project, tenzij onderdelen afhankelijk zijn van externe licenties of tools.",
    ],
  },
  {
    title: "Aansprakelijkheid",
    paragraphs: [
      "Vancoillie Studio is niet aansprakelijk voor indirecte schade, gevolgschade, winstderving of schade door foutieve of onvolledige informatie die door de klant werd aangeleverd.",
      "Onze aansprakelijkheid blijft in elk geval beperkt tot het bedrag van de betrokken opdracht of factuur.",
    ],
  },
  {
    title: "Beëindiging",
    paragraphs: [
      "Beide partijen kunnen een samenwerking schriftelijk beëindigen. Reeds uitgevoerde prestaties en gemaakte kosten blijven in dat geval verschuldigd.",
      "Bij stopzetting van een project kunnen tussentijdse opleveringen of onafgewerkte bestanden enkel worden overgedragen in de staat waarin ze zich bevinden op dat moment.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <LegalPage
        title="Algemene voorwaarden"
        updatedAt="Laatst bijgewerkt: 24 maart 2026"
        intro="Deze pagina beschrijft de algemene voorwaarden die van toepassing zijn op onze diensten, offertes, leveringen en samenwerkingen."
        sections={sections}
      />
    </>
  );
}
