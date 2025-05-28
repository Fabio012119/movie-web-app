import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export function createMockRouter(
  overrides: Partial<NextRouter> = {},
): NextRouter {
  return {
    basePath: "",
    pathname: "/",
    route: "/",
    query: {} as ParsedUrlQuery,
    asPath: "/",
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    isFallback: false,
    isReady: true,
    isPreview: false,
    isLocaleDomain: false,
    locale: undefined,
    locales: undefined,
    defaultLocale: undefined,
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    ...overrides,
  };
}
