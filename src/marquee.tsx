import { For, splitProps, type ComponentProps } from "solid-js";
import { cn } from "./cn";

type MarqueeProps = ComponentProps<"div"> & { reverse?: boolean | undefined; duration?: number | undefined };

export function Marquee(props: MarqueeProps) {
  const [local, rest] = splitProps(props, ["class", "children", "reverse", "duration"]);
  return (
    <div
      class={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:[mask-image:none]",
        local.class,
      )}
      style={{ "--duration": `${local.duration ?? 40}s` }}
      {...rest}
    >
      <For each={[false, true]}>
        {(copy) => (
          <div
            aria-hidden={copy || undefined}
            class={cn(
              "flex shrink-0 animate-marquee items-center gap-3 pr-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none",
              local.reverse && "[animation-direction:reverse]",
              copy ? "motion-reduce:hidden" : "motion-reduce:shrink motion-reduce:flex-wrap",
            )}
          >
            {local.children}
          </div>
        )}
      </For>
    </div>
  );
}
