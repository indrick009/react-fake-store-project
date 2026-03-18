import {afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";


afterEach(() => {
    cleanup();
});

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock ResizeObserver
class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

Object.defineProperty(window, "ResizeObserver", {
    writable: true,
    value: ResizeObserverMock,
});

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock PointerEvent (nécessaire pour certains composants Radix)
if (!window.PointerEvent) {
    class PointerEvent extends MouseEvent {
        constructor(type: string, params: PointerEventInit = {}) {
            super(type, params);
        }
    }
    // @ts-ignore
    window.PointerEvent = PointerEvent;
}
