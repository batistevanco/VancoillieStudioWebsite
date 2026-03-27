import { Header } from "@/components/ui/header-2";
import { LegalPage } from "@/components/ui/legal-page";

const sections = [
  {
    title: "Scope",
    paragraphs: [
      "These terms and conditions apply to all offers, services, projects, and collaborations provided by Vancoillie Studio unless agreed otherwise in writing.",
      "By using our services, the client agrees to these terms.",
    ],
  },
  {
    title: "Offers and agreements",
    paragraphs: [
      "Offers are indicative and valid for the period stated in the proposal. A collaboration starts once a quote, proposal, or assignment is confirmed in writing.",
      "Additional work outside the agreed scope may be billed separately.",
    ],
  },
  {
    title: "Execution of services",
    paragraphs: [
      "Vancoillie Studio performs its work to the best of its ability and based on the information supplied by the client.",
      "The client remains responsible for providing correct content, feedback, access, and approvals required for the project in a timely manner.",
    ],
  },
  {
    title: "Payment",
    paragraphs: [
      "Invoices are payable within the due date stated on the invoice unless agreed otherwise in writing.",
      "Late payments may result in statutory interest and recovery costs.",
    ],
  },
  {
    title: "Intellectual property",
    paragraphs: [
      "Designs, code, concepts, and other deliverables remain the property of Vancoillie Studio until all invoices have been paid in full.",
      "After full payment, the client receives the usage rights agreed within the project, except where third-party licenses or external tools apply.",
    ],
  },
  {
    title: "Liability",
    paragraphs: [
      "Vancoillie Studio is not liable for indirect damage, consequential damage, loss of profit, or issues caused by incorrect or incomplete information supplied by the client.",
      "Our liability is in all cases limited to the amount of the relevant assignment or invoice.",
    ],
  },
  {
    title: "Termination",
    paragraphs: [
      "Both parties may terminate a collaboration in writing. Work already performed and costs already incurred remain payable.",
      "If a project is stopped, interim deliverables or unfinished files may only be transferred in their current state.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <LegalPage
        title="Terms and Conditions"
        updatedAt="Last updated: March 24, 2026"
        intro="This page outlines the general terms and conditions that apply to our services, offers, deliverables, and collaborations."
        sections={sections}
      />
    </>
  );
}
