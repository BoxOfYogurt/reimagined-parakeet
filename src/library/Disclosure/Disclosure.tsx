'use client';

import React, { useContext } from 'react';
import {
  Key,
  Disclosure as RacDisclosure,
  Heading as RacHeading,
  Button as RacButton,
  DisclosurePanel as RacDisclosurePanel,
} from 'react-aria-components';
import { cx } from 'classix';
import { DisclosureGroupStateContext } from '../DisclosureGroup';

export type DisclosureProps = {
  id: Key;
  defaultExpanded?: boolean;
  /** will not emit the change if the component is controlled by the group */
  onExpandedChange?: (isExpanded: boolean) => void;
  children: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
} & (
  | {
      expanded?: boolean;
      defaultExpanded?: never;
    }
  | {
      expanded?: never;
      defaultExpanded?: boolean;
    }
);

export const Disclosure = ({
  id,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  children,
  isDisabled: isDisabledFromProps,
  className,
}: DisclosureProps) => {
  const groupState = useContext(DisclosureGroupStateContext);
  const isGroupControlled = groupState !== undefined;
  const isPropControlled = expanded !== undefined;

  /** The expanded state is controlled by the group if present, otherwise by the prop if present, otherwise uncontrolled */
  const isExpanded = isGroupControlled
    ? new Set(groupState.expandedKeys).has(id)
    : isPropControlled
      ? expanded
      : undefined;

  /** the isDisabled state can be set by either the group or the prop */
  const isDisabled =
    groupState?.isDisabled !== undefined ? groupState.isDisabled : isDisabledFromProps;

  const handleExpandedChange = (isExpanded: boolean) => {
    if (isGroupControlled) {
      groupState.toggleKey(id);
      return;
    }

    /** Only call onExpandedChange if not controlled by group */
    onExpandedChange?.(isExpanded);
  };

  return (
    <RacDisclosure
      defaultExpanded={defaultExpanded}
      isExpanded={isExpanded}
      isDisabled={isDisabled}
      onExpandedChange={handleExpandedChange}
      className={cx('group/disclosure-root', className)}
    >
      {children}
    </RacDisclosure>
  );
};

type DisclosureTriggerProps = {
  children: React.ReactNode;
  className?: string;
  level?: number;
};

export const DisclosureTrigger = ({ children, className, level = 3 }: DisclosureTriggerProps) => {
  return (
    <RacHeading level={level}>
      <RacButton
        slot="trigger"
        className={cx(
          'group/disclosure-trigger',
          'cursor-pointer group-data-[disabled=true]/disclosure-root:cursor-default',
          className,
        )}
      >
        {children}
      </RacButton>
    </RacHeading>
  );
};

type DisclosurePanelProps = {
  children: React.ReactNode;
  disableDefaultAnimation?: boolean;
  className?: string;
};

export const DisclosurePanel = ({
  children,
  disableDefaultAnimation = false,
  className,
}: DisclosurePanelProps) => {
  return (
    <RacDisclosurePanel
      className={cx(
        !disableDefaultAnimation && 'h-(--disclosure-panel-height) overflow-clip transition-all',
        className,
      )}
    >
      {children}
    </RacDisclosurePanel>
  );
};
