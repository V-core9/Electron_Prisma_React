import DashboardLayout from '../../layouts/dashboard';
import Accordion from '../../components/Accordion';
import Tabs from '../../components/Tabs';

const settingsTabs = [
  {
    title: 'Tab #1',
    content: (
      <>
        <Accordion label="Section #1" defaultOpen={false}>
          <>Demo COntnet</>
        </Accordion>
        <Accordion label="Section #3" defaultOpen={false}>
          <>Demo COntnet</>
        </Accordion>
        <Accordion label="Section #1" defaultOpen={false}>
          <>Demo COntnet</>
        </Accordion>
        <Accordion label="Section #2" defaultOpen={false}>
          <>Demo COntnet</>
        </Accordion>
        <Accordion label="Section #3" defaultOpen={false}>
          <>Demo COntnet</>
        </Accordion>
      </>
    ),
  },
  {
    title: 'Tab #2',
    content: (
      <>
        <Accordion label="Section #1" defaultOpen={false}>
          <>Demo COntnet</>
        </Accordion>
        <Accordion label="Section #2" defaultOpen={false}>
          <>Demo COntnet</>
        </Accordion>
        <Accordion label="Section #3" defaultOpen={false}>
          <>Demo COntnet</>
        </Accordion>
      </>
    ),
  },
  {
    title: 'Tab #3',
    content: (
      <>
        <Accordion label="Section #1" defaultOpen={false}>
          <>Demo COntnet</>
        </Accordion>
        <Accordion label="Section #1" defaultOpen={false}>
          <>Demo COntnet</>
        </Accordion>
        <Accordion label="Section #3" defaultOpen={false}>
          <>Demo COntnet</>
        </Accordion>
        <Accordion label="Section #3" defaultOpen={false}>
          <>Demo COntnet</>
        </Accordion>
      </>
    ),
  },
];

export default function Settings() {
  return (
    <DashboardLayout title="Home">
      <Tabs tabs={settingsTabs} selectedTabIndex={0} />
    </DashboardLayout>
  );
}
