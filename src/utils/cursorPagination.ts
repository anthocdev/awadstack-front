import { keyframes } from "@chakra-ui/system";
import { stringifyVariables } from "@urql/core";
import { Resolver } from "@urql/exchange-graphcache";

export const movieCursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter(
      (info: any) => info.fieldName === fieldName
    );
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const inCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "movies"
    );
    info.partial = !inCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi: any) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "movies") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return { __typename: "PaginatedMovies", hasMore, movies: results };
  };
};

export const commentCursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter(
      (info: any) => info.fieldName === fieldName
    );
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const inCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "comments"
    );
    info.partial = !inCache;
    let hasMore = true;
    const results: string[] = [];
    let id = 0;
    fieldInfos.forEach((fi: any) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "comments") as string[];
      id = cache.resolve(key, "id") as number;
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedComments",
      hasMore,
      id,
      comments: results,
    };
  };
};
