import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React from 'react';
import ExpenseTable from './ExpenseTable';
import DoughnutChart from './DoughnutChart';
// eslint-disable-next-line react/function-component-definition
const CustomTabs = () => (
  <Tabs position="relative" variant="unstyled">
    <TabList>
      <Tab>Expense List</Tab>
      <Tab>Expense Chart</Tab>
    </TabList>
    <TabIndicator
      mt="-1.5px"
      height="4px"
      bg="green.500"
      borderRadius="50px"
    />
    <TabPanels>
      <TabPanel>
        <ExpenseTable />
      </TabPanel>
      <TabPanel>
        <DoughnutChart />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default CustomTabs;
