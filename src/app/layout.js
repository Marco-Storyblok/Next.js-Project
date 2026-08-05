import "./globals.css";
import StoryblokProvider from "@/app/components/StoryblokProvider";
import Sidebar from "@/app/components/Sidebar";

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
