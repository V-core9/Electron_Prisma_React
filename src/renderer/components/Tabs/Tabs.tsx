import PropTypes from 'prop-types';
import React, { useState } from 'react';

import './Tabs.scss';

interface TabContent {
  title: string;
  content: JSX.Element;
}

interface TabsProps {
  tabs: TabContent[];
  selectedTabIndex?: number;
}

const Tabs = ({ tabs, selectedTabIndex = 0 }: TabsProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState(selectedTabIndex);

  return (
    <div className="tabs">
      <div className="tabsTitle">
        {tabs?.map((tab, index) => {
          return (
            <button
              key={tab.title}
              type="button"
              onClick={() => setSelectedTab(index)}
              style={{
                padding: '.5em',
                color: selectedTab === index ? 'blue' : 'gray',
                cursor: 'pointer',
              }}
            >
              {tab.title}
            </button>
          );
        })}
      </div>
      <div className="tabContent">{tabs[selectedTab].content}</div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  selectedTabIndex: PropTypes.number,
};

Tabs.defaultProps = {
  selectedTabIndex: 0,
};

export default Tabs;
