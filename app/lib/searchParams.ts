import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const searchParamsParsers = {
  query: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);