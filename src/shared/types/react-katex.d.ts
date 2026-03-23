declare module "react-katex" {
  import type { ReactElement } from "react";

  export function BlockMath(props: { math: string }): ReactElement;
  export function InlineMath(props: { math: string }): ReactElement;
}
