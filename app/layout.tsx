import React from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="uk">
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
