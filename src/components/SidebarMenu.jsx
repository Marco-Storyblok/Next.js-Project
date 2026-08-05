"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LocalizedLink,
  useLanguage,
} from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function SidebarMenu({
  items,
  sidebarTitle,
  colorStyles,
  children,
}) {
  const pathname = usePathname();
  const language = useLanguage();
  const [isOpen, setIsOpen] = useState(true);
  const labels = language === "es"
    ? {
        hide: "Ocultar navegación",
        show: "Mostrar navegación",
        navigation: "Navegación principal",
      }
    : {
        hide: "Hide navigation",
        show: "Show navigation",
        navigation: "Main navigation",
      };

  return (
    <div
      className={`site-shell ${isOpen ? "sidebar-is-open" : "sidebar-is-closed"}`}
      style={colorStyles}
    >
      <aside className="sidebar" aria-hidden={!isOpen}>
        <div className="sidebar__header">
          {sidebarTitle && <span className="sidebar__title">{sidebarTitle}</span>}
          <button
            type="button"
            className="sidebar__close"
            onClick={() => setIsOpen(false)}
            aria-label={labels.hide}
            tabIndex={isOpen ? 0 : -1}
          >
            ×
          </button>
        </div>

        <nav className="sidebar__navigation" aria-label={labels.navigation}>
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <LocalizedLink
                key={item.id}
                href={item.href}
                className={`sidebar__link ${isActive ? "sidebar__link--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                tabIndex={isOpen ? 0 : -1}
              >
                {item.label}
              </LocalizedLink>
            );
          })}
        </nav>
        <LanguageSwitcher />
      </aside>

      <div className="site-shell__content">
        {!isOpen && (
          <button
            type="button"
            className="sidebar__open"
            onClick={() => setIsOpen(true)}
            aria-label={labels.show}
            aria-expanded="false"
          >
            ☰
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
