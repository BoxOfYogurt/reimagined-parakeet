"use client";

import React, { Key } from "react";

export type DisclosureGroupState = {
  /** Whether multiple items can be expanded at the same time. */
  readonly allowsMultipleExpanded: boolean;
  /** Whether all items are disabled. */
  readonly isDisabled: boolean | undefined;
  /** A set of keys for items that are expanded. */
  readonly expandedKeys: Iterable<Key>;
  /** Toggles the expanded state for an item by its key. */
  toggleKey(key: Key): void;
};

export const DisclosureGroupStateContext = React.createContext<
  undefined | DisclosureGroupState
>(undefined);
