import type { Metadata } from 'next';
import { Orbitron, IBM_Plex_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ThreeBackground } from '@/components/ThreeBackground';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portfolio | Automatización Inteligente con IA',
  description: 'Experto en automatización de datos con n8n, Power BI, Python y LLMs',
  keywords: ['n8n', 'Power BI', 'Python', 'SQL Server', 'IA', 'Automatización', 'LLM'],
  authors: [{ name: 'Pedro Quintana' }],
};

export const viewport = {
  themeColor: '#0f172a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${orbitron.variable} ${ibmPlexMono.variable} font-sans antialiased bg-background text-foreground min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          {/* Fondo Three.js */}
          <ThreeBackground />
        </ThemeProvider>
      </body>
    </html>
  );
}
