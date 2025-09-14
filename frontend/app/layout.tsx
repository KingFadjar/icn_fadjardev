export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Inter, system-ui, Arial', background: '#0b1220', color: '#f2f5f9' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>{children}</div>
      </body>
    </html>
  );
}
