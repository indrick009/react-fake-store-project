import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface OwnProps {
  initialLimit?: number;
  initialPage?: number;
  callback?: (page: number, limit: number) => void;
  total?: number;
}

export const useQueryPagination = (
  { initialLimit, initialPage, callback, total }: OwnProps = {
    initialPage: 1,
    initialLimit: 20,
    total: 0,
  },
) => {
  const params = Object.fromEntries(
    new URLSearchParams(location.search.split("?")[1] ?? ""),
  );
  const [page, setPage] = useState<number>(
    Number(params.page ?? initialPage ?? 1),
  );
  const [limit, setLimit] = useState(
    Number(params.limit ?? initialLimit ?? 20),
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") ?? "";

  const handleQueryPagination = (value: string) => {
    const paginatorParams = value.split("/");
    const l = parseInt(paginatorParams[0]);
    const p = parseInt(paginatorParams[1]);
    if (p === page && l === limit) return;
    callback?.(p, l);
    setLimit(l);
    setPage(p);
  };

  const handleQueryPaginationData = (p: number, l: number) => {
    if (p === page && l === limit) return;
    callback?.(p, l);
    setLimit(l);
    setPage(p);
    updateQueryParams({
      page: p.toString(),
      limit: l.toString(),
    });
  };

  useEffect(() => {
    if (!!initialPage) setPage(initialPage);
    if (!!initialLimit) setLimit(initialLimit);
  }, [initialLimit, initialPage]);

  const updateQueryParams = (params: Record<string, string>) => {
    const oldQuery = Object.fromEntries(searchParams.entries());
    const nextQuery = {
      ...oldQuery,
      ...params,
    };

    Object.keys(nextQuery).forEach((key) => {
      if (!nextQuery[key]) {
        delete nextQuery[key];
      }
    });

    setSearchParams(nextQuery);
  };

  const setCategories = (value: string) => {
    updateQueryParams({
      category: value,
      page: "1",
      // total:"100"
    });
  };

  return {
    limit,
    page,
    handleQueryPagination,
    handleChangedPage: setPage,
    handleChangedLimit: setLimit,
    handleQueryPaginationData,
    total: total || 0,
    updateQueryParams,
    setCategories,
    selectedCategory,
  };
};

export type QueryPaginationBehavior = ReturnType<typeof useQueryPagination>;
