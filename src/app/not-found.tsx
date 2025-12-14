import { ApplicationLayout } from '@/library';
import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  description: '404 | Page not found',
};

export default function NotFound() {
  return (
    <ApplicationLayout width="regular" className="py-20">
      <h1 className="typography-heading-sm-bold text-center md:text-left">404</h1>
      <p className="typography-long-sm-regular text-subtle mt-2 text-center md:text-left">
        I am not the page you are looking for.
      </p>
    </ApplicationLayout>
  );
}
