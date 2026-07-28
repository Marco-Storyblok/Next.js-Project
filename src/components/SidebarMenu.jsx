"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SidebarMenu({
  items,
  sidebarTitle,
  colorStyles,
  children,
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

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
            aria-label="Hide navigation"
            tabIndex={isOpen ? 0 : -1}
          >
            ×
          </button>
        </div>

        <nav className="sidebar__navigation" aria-label="Main navigation">
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`sidebar__link ${isActive ? "sidebar__link--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                tabIndex={isOpen ? 0 : -1}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="site-shell__content">
        {!isOpen && (
          <button
            type="button"
            className="sidebar__open"
            onClick={() => setIsOpen(true)}
            aria-label="Show navigation"
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
