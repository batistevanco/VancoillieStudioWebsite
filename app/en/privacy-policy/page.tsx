import { Header } from "@/components/ui/header-2";
import { LegalPage } from "@/components/ui/legal-page";

const sections = [
  {
    title: "What data we process",
    paragraphs: [
      "When you contact us through our website, we may process personal data such as your name, email address, and the content of your message.",
      "Depending on the collaboration, we may also process additional data needed for quotations, communication, invoicing, or project follow-up.",
    ],
  },
  {
    title: "Why we use this data",
    paragraphs: [
      "We use personal data to respond to enquiries, deliver projects, prepare quotations, manage client relationships, and provide our services correctly.",
      "Data is not used for purposes other than what is reasonably necessary within the collaboration or communication.",
    ],
  },
  {
    title: "Sharing data",
    paragraphs: [
      "We do not share personal data with third parties except where this is necessary to deliver our services, provide technical support, handle accounting, or comply with legal obligations.",
      "Where needed, we may use external tools or service providers who process data on our behalf.",
    ],
  },
  {
    title: "Retention",
    paragraphs: [
      "Personal data is not stored longer than necessary for the purpose for which it was collected unless a longer retention period is legally required.",
      "Communication and invoicing data may be retained as long as needed for administration, follow-up, and legal obligations.",
    ],
  },
  {
    title: "Security",
    paragraphs: [
      "We take reasonable technical and organisational measures to protect personal data against loss, misuse, or unauthorised access.",
      "No system is completely risk-free, but we aim to handle all data we receive with appropriate care.",
    ],
  },
  {
    title: "Your rights",
    paragraphs: [
      "You have the right to request access to your personal data, correct inaccurate information, and in certain cases request deletion or restriction of processing.",
      "For privacy questions or requests related to data processing, you can contact support@vancoilliestudio.be.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <LegalPage
        title="Privacy Policy"
        updatedAt="Last updated: March 24, 2026"
        intro="This page explains which personal data Vancoillie Studio processes, why we do so, and how we handle that information."
        sections={sections}
      />
    </>
  );
}
