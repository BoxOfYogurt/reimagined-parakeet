'use client';

import { ApplicationLayout } from '@/library';

export default function Error() {
  return (
    <ApplicationLayout width="regular" className="py-10">
      <h1 className="typography-heading-sm-regular">This is embarrassing!</h1>
      <p className="typography-base-regular text-subtle">An unexpected error has occurred</p>
    </ApplicationLayout>
  );
}
