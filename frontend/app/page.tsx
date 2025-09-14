import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>ICN Todo - OpenAI Suggestions</h1>
      <p style={{ opacity: 0.85, marginBottom: 24 }}>Login to manage your todos and generate suggestions.</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </main>
  );
}
