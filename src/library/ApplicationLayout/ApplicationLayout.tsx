import { cx } from "classix";

export type ApplicationLayoutWidth = "small" | "large" | "regular";

export type ApplicationLayoutProps = {
  width?: ApplicationLayoutWidth;
  children: React.ReactNode;
  className?: string;
};

/** a component to easily manage application layout widths and gutters. */
export const ApplicationLayout = ({
  width = "regular",
  children,
  className,
}: ApplicationLayoutProps) => {
  const layoutWidthClasses: Record<ApplicationLayoutWidth, string> = {
    small: "[--application_layout_width:var(--spacing-layout-small)]",
    large: "[--application_layout_width:var(--spacing-layout-large)]",
    regular: "[--application_layout_width:var(--spacing-layout-regular)]",
  };

  const layoutGutterClasses: Record<ApplicationLayoutWidth, string> = {
    small:
      "px-layout-small-gutter xs:px-layout-small-gutter-xs sm:px-layout-small-gutter-sm md:px-layout-small-gutter-md lg:px-layout-small-gutter-lg",
    large:
      "px-layout-large-gutter xs:px-layout-large-gutter-xs sm:px-layout-large-gutter-sm md:px-layout-large-gutter-md lg:px-layout-large-gutter-lg",
    regular:
      "px-layout-regular-gutter xs:px-layout-regular-gutter-xs sm:px-layout-regular-gutter-sm md:px-layout-regular-gutter-md lg:px-layout-regular-gutter-lg",
  };

  return (
    <div
      className={cx(
        className,
        layoutWidthClasses[width],
        "grid grid-cols-[1fr_[content-start]_min(100%,var(--application_layout_width))_[content-end]_1fr]"
      )}
    >
      <div
        className={cx(
          layoutGutterClasses[width],
          "col-start-[content-start] col-end-[content-end] "
        )}
      >
        {children}
      </div>
    </div>
  );
};
