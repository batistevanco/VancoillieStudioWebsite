"use client";

import { AuthPage, type Testimonial } from "@/components/ui/auth-page";
import { useRouter } from "next/navigation";
import { useState } from "react";

const testimonials: Testimonial[] = [
  {
    avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&q=80",
    name: "Elise",
    handle: "Founder",
    text: "Eindelijk een mailbox die rustig aanvoelt, zonder kracht te verliezen.",
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80",
    name: "Matthias",
    handle: "Product lead",
    text: "Snel, helder en precies genoeg. Zo hoort mail te voelen.",
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&q=80",
    name: "Noor",
    handle: "Designer",
    text: "De interface verdwijnt naar de achtergrond. Dat is de magie.",
  },
];

export default function LoginPage() {
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        setErrorMessage(result.message ?? "Inloggen is mislukt.");
        return;
      }

      setStatusMessage("Je bent ingelogd. We openen je mailbox...");
      router.push("/mailbox");
    } catch {
      setErrorMessage("We konden de server niet bereiken. Probeer opnieuw.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPage
      mode="login"
      title={
        <>
          Welkom terug bij je rustige inbox.
        </>
      }
      description="Log in op je Vancoillie Mailbox-account. Daarna koppel je veilig Gmail, Outlook, iCloud of je eigen IMAP-mailbox."
      heroImageSrc="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=2160&q=80"
      testimonials={testimonials}
      errorMessage={errorMessage}
      statusMessage={statusMessage}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
}
