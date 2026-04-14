import './globals.css';

const themeInitScript = `
  (() => {
    const savedTheme = window.localStorage.getItem('theme');
    const theme = savedTheme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  })();
`;

export const metadata = {
  metadataBase: new URL('https://shantnukaushal.com'),
  title: 'Shantnu Kaushal',
  description:
    'Portfolio site for Shantnu Kaushal, featuring selected engineering work, professional experience, and contact details.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Shantnu Kaushal',
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
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}
