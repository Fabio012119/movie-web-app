import "@testing-library/jest-dom";
import React from "react";
import type { ImageProps } from "next/image";

jest.mock("@/context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("next/link", () => {
  return function MockLink(props: { href: string; children: React.ReactNode }) {
    return React.createElement("a", { href: props.href }, props.children);
  };
});

jest.mock("next/image", () => {
  return function MockNextImage(props: ImageProps) {
    return React.createElement("img", { ...props });
  };
});

jest.useFakeTimers();
