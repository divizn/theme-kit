import {
  children as resolveChildren,
  splitProps,
  type ComponentProps,
  type JSX,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { cn } from "./cn";

function moveTorch(event: PointerEvent) {
  const card = (event.target as Element).closest<HTMLElement>(".graph-card");
  if (!card) return;
  const box = card.getBoundingClientRect();
  card.style.setProperty("--tx", `${event.clientX - box.left}px`);
  card.style.setProperty("--ty", `${event.clientY - box.top}px`);
}

export function BentoGrid(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      class={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        local.class,
      )}
      onPointerMove={moveTorch}
      {...rest}
    />
  );
}

type BentoGridItemProps = Omit<ComponentProps<"a">, "title"> & {
  title: string;
  subtitle?: string;
  /** Heading level for `title`, so callers can keep a document's heading order sequential. Defaults to h3. */
  headingLevel?: "h2" | "h3" | "h4";
  icon?: (props: { class?: string }) => JSX.Element;
  children?: JSX.Element;
};

export function BentoGridItem(props: BentoGridItemProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "href",
    "title",
    "subtitle",
    "headingLevel",
    "icon",
    "children",
  ]);
  // Resolved once via Solid's `children` helper — accessing `local.children`
  // directly twice (once for the truthy check, once to render) would
  // re-invoke any component inside it (e.g. a <Show>) a second time,
  // producing a different DOM tree than SSR and breaking hydration.
  const resolvedChildren = resolveChildren(() => local.children);
  return (
    <Dynamic
      component={local.href ? "a" : "div"}
      href={local.href}
      class={cn(
        "graph-card group relative h-full sm:nth-[4n]:col-span-2 sm:nth-[4n+1]:col-span-2 lg:last:odd:col-span-full overflow-hidden rounded-xs border border-border bg-card p-6 hover:border-accent hover:shadow-[5px_5px_0_var(--accent)] focus-visible:border-accent focus-visible:shadow-[5px_5px_0_var(--accent)] motion-safe:hover:-translate-[3px] motion-safe:focus-visible:-translate-[3px]",
        local.class,
      )}
      {...rest}
    >
      <Dynamic
        component={local.headingLevel ?? "h3"}
        class="font-display flex justify-between gap-4 text-base font-semibold text-foreground group-hover:text-accent group-focus-visible:text-accent"
      >
        <span class="flex items-center gap-2">
          {local.icon && (
            <Dynamic component={local.icon} class="size-4 text-muted-foreground" />
          )}
          {local.title}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          class="graph-card-arrow mt-[0.15em] size-[0.85em] flex-none stroke-[2.5] text-muted-foreground group-hover:text-accent group-focus-visible:text-accent motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5"
        >
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      </Dynamic>
      {local.subtitle && (
        <p class="mt-1 text-sm text-muted-foreground">{local.subtitle}</p>
      )}
      {resolvedChildren() && (
        <div class="mt-3 text-sm text-muted-foreground">
          {resolvedChildren()}
        </div>
      )}
    </Dynamic>
  );
}
