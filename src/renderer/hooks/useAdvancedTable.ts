import { Dispatch, SetStateAction, useState } from 'react';
import { Domain } from '../../types/Domain.interface';

interface UseListSelectExpand {
  data: Domain[];
  selected: unknown[];
  expanded: unknown[];
  perPage: number;
  currentPage: number;
  setPerPage: (n: number) => void;
  setCurrentPage: (n: number) => void;
  toggleSelected: (item: Domain) => Promise<void>;
  toggleExpanded: (item: Domain) => Promise<void>;
  setData: (val: Domain[]) => void;
}

// interface UseListSelectExpandOptions {
//  observeIntersections?: boolean;
// }

function useListSelectExpand(
  initialData: Domain[] = []
  // options: UseListSelectExpandOptions = {}
): UseListSelectExpand {
  const [list, setList] = useState<Domain[]>(initialData);
  const [selected, setSelected] = useState<unknown[]>([]);
  const [expanded, setExpanded] = useState<unknown[]>([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  function createToggler(listData: Domain[], toggleState: any, setState: any) {
    return async (item: Domain) => {
      const index = listData?.indexOf(item);
      const isActive = toggleState.indexOf(index) !== -1;
      setState(
        isActive
          ? toggleState.filter((i) => i !== index)
          : [...toggleState, index]
      );
    };
  }

  const toggleSelected = createToggler(list, selected, setSelected);
  const toggleExpanded = createToggler(list, expanded, setExpanded);

  function setData(val: Domain[]) {
    if (Array.isArray(val)) {
      setSelected([]);
      setExpanded([]);
      setList(val);
    }
  }

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
  };
}

export default useListSelectExpand;
