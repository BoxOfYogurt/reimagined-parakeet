import React, { useEffect } from "react";
import { Key } from "react-aria-components";
import { DisclosureGroupStateContext } from "./DisclosureGroupStateContext";

export type DisclosureGroupProps = {
  /** The unique identifier for the disclosure group. */
  id: string;
  /** Whether all items should be disabled. */
  isDisabled?: boolean;
  /** Callback function returning the expandedKeys. */
  onExpandedChange?: (expandedKeys: Key[]) => void;
  /** Whether multiple items can be expanded at the same time. */
  allowsMultipleExpanded?: boolean;
  children: React.ReactNode;
} & (
  | {
      /** A set of keys for items that are expanded. */
      expandedKeys?: Iterable<Key>;
      defaultExpandedKeys?: never;
    }
  | {
      expandedKeys?: never;
      /** A set of keys for items that are default expanded. */
      defaultExpandedKeys?: Iterable<Key>;
    }
);

export const DisclosureGroup = ({
  id,
  children,
  allowsMultipleExpanded = true,
  expandedKeys,
  isDisabled = false,
  defaultExpandedKeys,
  onExpandedChange,
}: DisclosureGroupProps) => {
  const isControlled = expandedKeys !== undefined;
  const isControlledRef = React.useRef(isControlled);

  const [internalState, setInternalState] = React.useState<Key[]>(
    () => (!isControlled && Array.from(defaultExpandedKeys || [])) || []
  );

  useEffect(() => {
    if (
      isControlledRef.current !== isControlled &&
      process.env.NODE_ENV === "development"
    ) {
      console.warn(
        `WARN: The DisclosureGroup with id "${id}" changed from ${
          isControlledRef.current ? "controlled" : "uncontrolled"
        } to ${isControlled ? "controlled" : "uncontrolled"}.`
      );
    }
  }, [isControlled, id]);

  const getNewState = (
    toggleKey: Key,
    previousState: Iterable<Key> = []
  ): Key[] => {
    const state = new Set(previousState);
    if (allowsMultipleExpanded) {
      if (state.has(toggleKey)) state.delete(toggleKey);
      else state.add(toggleKey);
      return Array.from(state);
    } else {
      return state.has(toggleKey) ? [] : [toggleKey];
    }
  };

  const toggleKey = (key: Key) => {
    if (isControlled) {
      const newState = getNewState(key, expandedKeys);
      onExpandedChange?.(newState);
      return;
    }

    setInternalState((previousState) => {
      const newState = getNewState(key, previousState);
      onExpandedChange?.(newState);
      return newState;
    });
  };

  return (
    <DisclosureGroupStateContext.Provider
      value={{
        allowsMultipleExpanded,
        expandedKeys: isControlled ? expandedKeys : internalState,
        isDisabled,
        toggleKey,
      }}
    >
      {children}
    </DisclosureGroupStateContext.Provider>
  );
};
