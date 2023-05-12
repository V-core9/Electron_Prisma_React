import { Dispatch, SetStateAction } from 'react';
import { shallowEqual } from '../../utils';

interface UseListSelectExpand {
  toggleSelected: (item: any) => void;
  toggleExpanded: (item: any) => void;
}

function useListSelectExpand(
  dataList: any[],
  setState: Dispatch<SetStateAction<any>>
): UseListSelectExpand {
  //! This creates toggler function that will toggle boolean value at "propertyName" specified
  const createToggler = (propertyName: string) => {
    const handler = (item: any) => {
      const newState: any[] = [];
      dataList?.forEach((d) => {
        const expand = {};
        if (shallowEqual(d, item)) item[propertyName] = !d[propertyName];

        newState.push({
          ...(d ?? d),
          ...(shallowEqual(d, item) && expand),
        });
      });

      setState(newState);
    };
    return handler;
  };

  const toggleSelected = createToggler('selected');
  const toggleExpanded = createToggler('expanded');

  return { toggleSelected, toggleExpanded };
}

export default useListSelectExpand;
