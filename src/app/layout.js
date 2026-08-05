import "./globals.css";
import StoryblokProvider from "@/components/StoryblokProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoryblokProvider>{children}</StoryblokProvider>
      </body>
    </html>
  );
}
