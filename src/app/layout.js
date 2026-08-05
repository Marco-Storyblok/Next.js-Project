import "./globals.css";
import StoryblokProvider from "@/components/StoryblokProvider";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <StoryblokProvider>
          <Sidebar>{children}</Sidebar>
        </StoryblokProvider>
      </body>
    </html>
  );
}