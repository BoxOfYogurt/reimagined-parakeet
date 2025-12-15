import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Disclosure,
  DisclosureTrigger,
  DisclosurePanel,
  type DisclosureProps,
} from '../Disclosure';
import { DisclosureGroup, DisclosureGroupProps } from './DisclosureGroup';

const DisclosureTestComponent = (props: DisclosureProps) => {
  const XORProps =
    props.expanded !== undefined
      ? { expanded: props.expanded }
      : { defaultExpanded: props.defaultExpanded };

  return (
    <Disclosure
      id={props.id}
      {...XORProps}
      isDisabled={props.isDisabled}
      onExpandedChange={props.onExpandedChange}
    >
      {props.children}
    </Disclosure>
  );
};

type SetupTestProps = Partial<
  Pick<
    DisclosureGroupProps,
    'allowsMultipleExpanded' | 'defaultExpandedKeys' | 'expandedKeys' | 'isDisabled'
  >
> & { disclosures?: DisclosureTestProps[] };

function setupTest(props: SetupTestProps = {}) {
  const mockedOnChangeFromGroup = vi.fn();
  const mockedOnChangeFromItem = vi.fn();

  const testDisclosures = props.disclosures || animalDisclosureData;

  /** to make TS happy due to the mutually exclusive props (XOR) */
  const XORProps =
    props.expandedKeys !== undefined
      ? { expandedKeys: props.expandedKeys }
      : { defaultExpandedKeys: props.defaultExpandedKeys };

  render(
    <DisclosureGroup
      id="disclosure-group-id"
      {...XORProps}
      allowsMultipleExpanded={props.allowsMultipleExpanded}
      isDisabled={props.isDisabled}
      onExpandedChange={mockedOnChangeFromGroup}
    >
      {testDisclosures.map(({ id, title, isDisabled, expanded, defaultExpanded, content }) => (
        <DisclosureTestComponent
          key={id}
          id={id}
          isDisabled={isDisabled}
          /** to make TS happy due to the mutually exclusive props (XOR) */
          {...(expanded !== undefined ? { expanded } : { defaultExpanded })}
          onExpandedChange={mockedOnChangeFromItem}
        >
          <DisclosureTrigger>
            <span>{title}</span>
          </DisclosureTrigger>
          <DisclosurePanel>
            <div>{content}</div>
          </DisclosurePanel>
        </DisclosureTestComponent>
      ))}
    </DisclosureGroup>,
  );

  return { mockedOnChangeFromGroup, mockedOnChangeFromItem };
}

test('renders a disclosureGroup with disclosures', async () => {
  setupTest();
  const disclosureTriggers = await screen.findAllByRole('button');

  expect(disclosureTriggers).toHaveLength(animalDisclosureData.length);

  expect(disclosureTriggers[0]).toHaveTextContent(wolfDisclosure.title);
  expect(disclosureTriggers[1]).toHaveTextContent(bearDisclosure.title);
  expect(disclosureTriggers[2]).toHaveTextContent(foxDisclosure.title);
});

test('renders a disclosureGroup where "wolf" disclosure is defaultExpanded', async () => {
  setupTest({ defaultExpandedKeys: ['wolf'] });
  const wolfDisclosurePanel = await screen.findByText(wolfDisclosure.content);
  expect(wolfDisclosurePanel).toBeVisible();
});

test('renders a disclosureGroup where "bear" disclosure is expanded', async () => {
  setupTest({ expandedKeys: ['bear'] });
  const bearDisclosurePanel = await screen.findByText(bearDisclosure.content);
  expect(bearDisclosurePanel).toBeVisible();
});

test('renders a disclosureGroup and toggle when "allowsMultipleExpanded" is true (DEFAULT)', async () => {
  const user = userEvent.setup();
  const { mockedOnChangeFromGroup, mockedOnChangeFromItem } = setupTest();

  const wolfTrigger = await screen.findByRole('button', { name: wolfDisclosure.title });
  const bearTrigger = await screen.findByRole('button', { name: bearDisclosure.title });
  const foxTrigger = await screen.findByRole('button', { name: foxDisclosure.title });

  const wolfDisclosurePanel = await screen.findByText(wolfDisclosure.content);
  const bearDisclosurePanel = await screen.findByText(bearDisclosure.content);
  const foxDisclosurePanel = await screen.findByText(foxDisclosure.content);

  // expand wolf
  await user.click(wolfTrigger);
  expect(wolfDisclosurePanel).toBeVisible();
  expect(bearDisclosurePanel).not.toBeVisible();
  expect(foxDisclosurePanel).not.toBeVisible();

  expect(mockedOnChangeFromGroup).toHaveBeenNthCalledWith(1, ['wolf']);

  // expand bear
  await user.click(bearTrigger);
  expect(wolfDisclosurePanel).toBeVisible();
  expect(bearDisclosurePanel).toBeVisible();
  expect(foxDisclosurePanel).not.toBeVisible();

  expect(mockedOnChangeFromGroup).toHaveBeenNthCalledWith(2, ['wolf', 'bear']);

  // expand fox
  await user.click(foxTrigger);
  expect(wolfDisclosurePanel).toBeVisible();
  expect(bearDisclosurePanel).toBeVisible();
  expect(foxDisclosurePanel).toBeVisible();

  expect(mockedOnChangeFromGroup).toHaveBeenNthCalledWith(3, ['wolf', 'bear', 'fox']);

  // collapse bear
  await user.click(bearTrigger);
  expect(wolfDisclosurePanel).toBeVisible();
  expect(bearDisclosurePanel).not.toBeVisible();
  expect(foxDisclosurePanel).toBeVisible();

  expect(mockedOnChangeFromGroup).toHaveBeenNthCalledWith(4, ['wolf', 'fox']);

  /* when group is controlling expanded state - the individual items should not trigger their own "onExpandedChange" */
  expect(mockedOnChangeFromItem).not.toHaveBeenCalled();
});

test('renders a disclosureGroup and toggle when "allowsMultipleExpanded" is false', async () => {
  const user = userEvent.setup();
  const { mockedOnChangeFromGroup, mockedOnChangeFromItem } = setupTest({
    allowsMultipleExpanded: false,
  });

  const wolfTrigger = await screen.findByRole('button', { name: wolfDisclosure.title });
  const bearTrigger = await screen.findByRole('button', { name: bearDisclosure.title });
  const foxTrigger = await screen.findByRole('button', { name: foxDisclosure.title });

  const wolfDisclosurePanel = await screen.findByText(wolfDisclosure.content);
  const bearDisclosurePanel = await screen.findByText(bearDisclosure.content);
  const foxDisclosurePanel = await screen.findByText(foxDisclosure.content);

  // expand wolf
  await user.click(wolfTrigger);
  expect(wolfDisclosurePanel).toBeVisible();
  expect(bearDisclosurePanel).not.toBeVisible();
  expect(foxDisclosurePanel).not.toBeVisible();

  expect(mockedOnChangeFromGroup).toHaveBeenNthCalledWith(1, ['wolf']);

  // expand bear
  await user.click(bearTrigger);
  expect(wolfDisclosurePanel).not.toBeVisible();
  expect(bearDisclosurePanel).toBeVisible();
  expect(foxDisclosurePanel).not.toBeVisible();

  expect(mockedOnChangeFromGroup).toHaveBeenNthCalledWith(2, ['bear']);

  // expand fox
  await user.click(foxTrigger);
  expect(wolfDisclosurePanel).not.toBeVisible();
  expect(bearDisclosurePanel).not.toBeVisible();
  expect(foxDisclosurePanel).toBeVisible();

  expect(mockedOnChangeFromGroup).toHaveBeenNthCalledWith(3, ['fox']);

  /* when group is controlling expanded state - the individual items should not trigger their own "onExpandedChange" */
  expect(mockedOnChangeFromItem).not.toHaveBeenCalled();
});

test('renders a disclosureGroup where "fox" "expanded" state is overruled by group "expandedKeys"', async () => {
  const disclosures = [wolfDisclosure, bearDisclosure, { ...foxDisclosure, expanded: true }];
  setupTest({ expandedKeys: ['wolf'], disclosures });

  const foxDisclosurePanel = await screen.findByText(foxDisclosure.content);
  expect(foxDisclosurePanel).not.toBeVisible();
});

test('renders a disclosureGroup where "fox" "defaultExpanded" state is overruled by group "expandedKeys"', async () => {
  const disclosures = [wolfDisclosure, bearDisclosure, { ...foxDisclosure, defaultExpanded: true }];
  setupTest({ expandedKeys: ['wolf'], disclosures });

  const foxDisclosurePanel = await screen.findByText(foxDisclosure.content);
  expect(foxDisclosurePanel).not.toBeVisible();
});

test('renders a disclosureGroup where "fox" "expanded" state is overruled by group "defaultExpandedKeys"', async () => {
  const disclosures = [wolfDisclosure, bearDisclosure, { ...foxDisclosure, expanded: true }];
  setupTest({ defaultExpandedKeys: ['wolf'], disclosures });

  const foxDisclosurePanel = await screen.findByText(foxDisclosure.content);
  expect(foxDisclosurePanel).not.toBeVisible();
});

test('renders a disclosureGroup where "fox" "isDisabled" state is overruled by group "isDisabled"', async () => {
  const user = userEvent.setup();
  const disclosures = [wolfDisclosure, bearDisclosure, { ...foxDisclosure, isDisabled: false }];

  const { mockedOnChangeFromGroup, mockedOnChangeFromItem } = setupTest({
    isDisabled: true,
    disclosures,
  });

  const foxTrigger = await screen.findByRole('button', { name: foxDisclosure.title });
  expect(foxTrigger).toBeInTheDocument();
  expect(foxTrigger).toBeDisabled();

  await user.click(foxTrigger);
  /** expect the panel to still be "not-visible" because the disclosure is disabled */
  const foxDisclosurePanel = screen.getByText(foxDisclosure.content);
  expect(foxDisclosurePanel).not.toBeVisible();

  expect(mockedOnChangeFromGroup).not.toHaveBeenCalled();
  expect(mockedOnChangeFromItem).not.toHaveBeenCalled();
});

/* MOCK_DATA - CHANGING THIS MIGHT AFFECT TESTS */

type DisclosureChildrenProps = {
  title: string;
  content: string;
};

type DisclosureTestProps = Pick<
  DisclosureProps,
  'id' | 'defaultExpanded' | 'expanded' | 'isDisabled'
> &
  DisclosureChildrenProps;

const wolfDisclosure: DisclosureTestProps = {
  id: 'wolf',
  title: 'The Wolf is a pack animal',
  content: 'Wolves live and hunt in packs, relying on teamwork.',
};

const bearDisclosure: DisclosureTestProps = {
  id: 'bear',
  title: 'The Bear is strong',
  content: 'Bears are powerful animals with a keen sense of smell.',
};

const foxDisclosure: DisclosureTestProps = {
  id: 'fox',
  title: 'The Fox is sneaky',
  content: 'The fox is known for its cunning and agility.',
};

const animalDisclosureData: DisclosureTestProps[] = [wolfDisclosure, bearDisclosure, foxDisclosure];
