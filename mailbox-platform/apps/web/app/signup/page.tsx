"use client";

import { AuthPage, type Testimonial } from "@/components/ui/auth-page";
import { useRouter } from "next/navigation";
import { useState } from "react";

const testimonials: Testimonial[] = [
  {
    avatarSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&q=80",
    name: "Lina",
    handle: "Operations",
    text: "Een inbox die prioriteit geeft aan focus, niet aan knoppen.",
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&q=80",
    name: "Jonas",
    handle: "Engineer",
    text: "De eerste mailervaring die echt modern voelt.",
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=160&q=80",
    name: "Amir",
    handle: "Consultant",
    text: "Alles wat ik nodig heb, zonder de rommel eromheen.",
  },
];

export default function SignupPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setStatusMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        setErrorMessage(result.message ?? "Account aanmaken is mislukt.");
        return;
      }

      setStatusMessage("Je account is aangemaakt. We openen de koppelingstap...");
      router.push("/connect-accounts");
    } catch {
      setErrorMessage("We konden de server niet bereiken. Probeer opnieuw.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPage
      mode="signup"
      title={
        <>
          Maak je nieuwe mailbox-account aan.
        </>
      }
      description="Start met je platformaccount. Providerkoppelingen zoals Gmail en Outlook voegen we pas toe nadat je account veilig bestaat."
      heroImageSrc="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=2160&q=80"
      testimonials={testimonials}
      errorMessage={errorMessage}
      statusMessage={statusMessage}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
}
