import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Disclosure, DisclosureTrigger, DisclosurePanel, type DisclosureProps } from './Disclosure';

type SetupTestProps = Partial<Pick<DisclosureProps, 'expanded' | 'defaultExpanded' | 'isDisabled'>>;

function setupTest(props: SetupTestProps = {}) {
  const mockedOnChange = vi.fn();

  /** to make TS happy due to the mutually exclusive props (XOR) */
  const XORProps =
    props.expanded !== undefined
      ? { expanded: props.expanded }
      : { defaultExpanded: props.defaultExpanded };

  render(
    <Disclosure
      id="item-1"
      {...XORProps}
      isDisabled={props.isDisabled}
      onExpandedChange={mockedOnChange}
    >
      <DisclosureTrigger>
        <span>Trigger</span>
      </DisclosureTrigger>
      <DisclosurePanel>
        <div>Panel content</div>
      </DisclosurePanel>
    </Disclosure>,
  );

  return { mockedOnChange };
}

test('renders a disclosure with "defaultExpanded" false (Default)', async () => {
  setupTest();
  const trigger = await screen.findByRole('button');
  expect(trigger).toBeInTheDocument();

  const panel = screen.queryByText('Panel content');
  expect(panel).not.toBeVisible();
});

test('renders a disclosure with "defaultExpanded" true', async () => {
  setupTest({ defaultExpanded: true });
  const panel = await screen.findByText('Panel content');
  expect(panel).toBeVisible();
});

test('renders a disclosure, and toggles panel visibility (uncontrolled)', async () => {
  const user = userEvent.setup();
  const { mockedOnChange } = setupTest();

  const trigger = await screen.findByRole('button');
  // expand
  await user.click(trigger);
  expect(screen.getByText('Panel content')).toBeVisible();
  expect(mockedOnChange).toHaveBeenNthCalledWith(1, true);

  // collapse
  await user.click(trigger);
  expect(screen.getByText('Panel content')).not.toBeVisible();
  expect(mockedOnChange).toHaveBeenNthCalledWith(2, false);
});

test('renders a disclosure with "expanded" true (Controlled)', async () => {
  const user = userEvent.setup();
  const { mockedOnChange } = setupTest({ expanded: true });

  expect(screen.getByText('Panel content')).toBeVisible();

  const trigger = await screen.findByRole('button');
  await user.click(trigger);

  expect(mockedOnChange).toHaveBeenNthCalledWith(1, false);

  /** expect the panel to still be visible because it's controlled */
  expect(screen.getByText('Panel content')).toBeVisible();
});

test('renders a disclosure with "expanded" false (Controlled)', async () => {
  const user = userEvent.setup();
  const { mockedOnChange } = setupTest({ expanded: false });

  expect(screen.queryByText('Panel content')).not.toBeVisible();

  const trigger = await screen.findByRole('button');
  await user.click(trigger);

  expect(mockedOnChange).toHaveBeenNthCalledWith(1, true);

  /** expect the panel to still be "not-visible" because it's controlled */
  expect(screen.queryByText('Panel content')).not.toBeVisible();
});

test('renders a disclosure with "isDisabled" true', async () => {
  const user = userEvent.setup();
  const { mockedOnChange } = setupTest({ isDisabled: true });

  const trigger = await screen.findByRole('button');

  expect(trigger).toBeDisabled();
  await user.click(trigger);

  /** expect the panel to still be "not-visible" because the disclosure is disabled */
  expect(screen.getByText('Panel content')).not.toBeVisible();
  expect(mockedOnChange).not.toHaveBeenCalled();
});
