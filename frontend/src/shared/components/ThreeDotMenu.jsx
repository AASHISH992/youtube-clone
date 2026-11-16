import { useState, useEffect, useRef } from "react";
import { EllipsisVertical } from "lucide-react";
import { createPortal } from "react-dom";

export default function DynamicMenu({ items, onOpenChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  function updatePosition() {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      setCoords({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      });
    }
  }

  function handleToggle() {
    const nextState = !isOpen;
    if (nextState) {
      updatePosition();
      setActiveSubmenu(null);
    }
    setIsOpen(nextState);
    onOpenChange?.(nextState);
  }
  function handleClose() {
    setIsOpen(false);
    setActiveSubmenu(null);
    onOpenChange?.(false);
  }

  // Close the menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        handleClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleClose, { passive: true });
      window.addEventListener("resize", handleClose);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleClose);
      window.removeEventListener("resize", handleClose);
    };
  }, [isOpen]);

  return (
    <div className=" relative inline-block text-left" ref={menuRef}>
      {/* Three Dots Button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors focus:outline-none"
        aria-label="Options"
      >
        <EllipsisVertical className="w-5 h-5" />
      </button>

      {/* Dynamic Dropdown Menu */}
      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              right: `${coords.right}px`,
              zIndex: 9999,
            }}
            className="rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 focus:outline-none overflow-hidden transition-all duration-150"
          >
            {activeSubmenu ? (
              activeSubmenu({ onClose: handleClose })
            ) : (
              <div className="w-48  py-1">
                {items.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (item.submenu) {
                        setActiveSubmenu(() => item.submenu);
                      } else {
                        item.onClick?.();
                        handleClose();
                      }
                    }}
                    className={`flex w-full items-center px-4 py-2 text-sm transition-colors text-left
                  ${
                    item.isDanger
                      ? "text-red-600 hover:bg-red-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  >
                    {item.icon && item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
