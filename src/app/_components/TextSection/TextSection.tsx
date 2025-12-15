import { ApplicationLayout } from '@/library';

export type TextSectionProps = {
  id: string;
  title: string;
  /** NB! will render inside a paragraph. Avoid "nested paragraphs"! */
  text: React.ReactNode;
};

export const TextSection = ({ id, title, text }: TextSectionProps) => (
  <section aria-labelledby={id} className="mb-5 pt-5">
    <ApplicationLayout width="small">
      <h2
        id={id}
        className="typography-heading-sm-bold lg:typography-heading-base-bold text-heading my-5 scroll-mt-2"
      >
        {title}
      </h2>
      <p className="typography-long-lg-regular">{text}</p>
    </ApplicationLayout>
  </section>
);
