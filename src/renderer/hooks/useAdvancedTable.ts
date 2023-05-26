import { useState, useEffect } from 'react';
import { Domain } from '../../types/Domain.interface';

interface ListSelectExpandItem {
  id: string | number;
}

interface UseListSelectExpand {
  data: ListSelectExpandItem[];
  selected: unknown[];
  expanded: unknown[];
  perPage: number;
  currentPage: number;
  setPerPage: (n: number) => void;
  setCurrentPage: (n: number) => void;
  toggleSelected: (item: string | number) => Promise<void>;
  toggleExpanded: (item: string | number) => Promise<void>;
  setData: (val: ListSelectExpandItem[]) => void;

  resultCount: number;
  setResultCount: (item: number) => void;

  isLoadingList: boolean;
  setIsLoadingList: (item: boolean) => void;
}

function createToggler(toggleState: any, setState: any) {
  return async (item: string | number) => {
    const isActive = toggleState.indexOf(item) !== -1;
    setState(
      isActive
        ? toggleState.filter((i: unknown) => i !== item)
        : [...toggleState, item]
    );
  };
}

function useListSelectExpand(
  initialData: ListSelectExpandItem[] = []
): UseListSelectExpand {
  const [list, setList] = useState<ListSelectExpandItem[]>(initialData);
  const [selected, setSelected] = useState<unknown[]>([]);
  const [expanded, setExpanded] = useState<unknown[]>([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [resultCount, setResultCount] = useState<number>(0);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);

  const toggleSelected = createToggler(selected, setSelected);
  const toggleExpanded = createToggler(expanded, setExpanded);

  function setData(val: ListSelectExpandItem[]) {
    if (Array.isArray(val)) {
      setSelected([]);
      setExpanded([]);
      setList(val);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [perPage]);

  return {
    data: list,
    setData,

    selected,
    toggleSelected,

    expanded,
    toggleExpanded,

    currentPage,
    setCurrentPage,

    perPage,
    setPerPage,

    resultCount,
    setResultCount,

    isLoadingList,
    setIsLoadingList,
  };
}

export default useListSelectExpand;
