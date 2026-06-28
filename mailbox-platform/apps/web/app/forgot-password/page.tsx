import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-6">
      <section className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/60 p-8 shadow-soft-panel backdrop-blur-xl">
        <p className="text-sm font-medium text-slate-500">Account recovery</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          Wachtwoord herstellen
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          Deze flow ontwerpen we bewust later, met rate limiting, audit logging
          en veilige recovery tokens. Voor nu staat de route klaar.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Terug naar login
        </Link>
      </section>
    </main>
  );
}
