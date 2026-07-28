import "./globals.css";
import StoryblokProvider from "@/components/StoryblokProvider";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <StoryblokProvider>
      <html lang="es">
        <body>
          <Sidebar>{children}</Sidebar>
        </body>
      </html>
    </StoryblokProvider>
  );
}
