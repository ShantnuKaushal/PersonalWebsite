import { Outfit, Space_Grotesk } from 'next/font/google';
import './globals.css';

const themeInitScript = `
  (() => {
    const savedTheme = window.localStorage.getItem('theme');
    const theme = savedTheme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  })();
`;

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  metadataBase: new URL('https://shantnukaushal.com'),
  title: 'Shantnu Kaushal | Software Engineer',
  description:
    'Portfolio site for Shantnu Kaushal, featuring selected engineering work, professional experience, and contact details.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Shantnu Kaushal | Software Engineer',
    description:
      'Selected work, experience, and contact details for Shantnu Kaushal.',
    url: 'https://shantnukaushal.com',
    siteName: 'Shantnu Kaushal',
    type: 'website',
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${outfit.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}
