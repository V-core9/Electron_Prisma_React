import { Dispatch, SetStateAction, useState } from 'react';
import { shallowEqual } from '../../utils';

interface UseListSelectExpand {
  state: unknown[];
  toggleSelected: (item: unknown) => void;
  toggleExpanded: (item: unknown) => void;
  setState: Dispatch<SetStateAction<unknown[]>>;
  selectedCount: number;
}

// interface UseListSelectExpandOptions {
//  nestData?: boolean;
// }

function useListSelectExpand(
  initialData: unknown[]
  // options: UseListSelectExpandOptions = {}
): UseListSelectExpand {
  const [state, setState] = useState(initialData);
  const [selectedCount, setSelectedCount] = useState(0);

  //! This creates toggler function that will toggle boolean value at "propertyName" specified
  const createToggler = (propertyName: string) => {
    const handler = (item: unknown) => {
      const newState: unknown[] = [];
      let counter = 0;
      state?.forEach((d) => {
        const expand = {};
        if (shallowEqual(d, item)) item[propertyName] = !d[propertyName];
        counter += !item[propertyName] ? 0 : 1;
        newState.push({
          ...(d ?? d),
          ...(shallowEqual(d, item) && expand),
        });
      });
      setSelectedCount(counter);
      setState(newState);
    };
    return handler;
  };

  const toggleSelected = createToggler('selected');
  const toggleExpanded = createToggler('expanded');

  return { selectedCount, state, setState, toggleSelected, toggleExpanded };
}

export default useListSelectExpand;
