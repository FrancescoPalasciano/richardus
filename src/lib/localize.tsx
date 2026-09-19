import {
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from "react";
import { localizeHref, type Locale } from "./locale";
import type { Translator } from "./translate";

/** Translate renderable copy before SSR; behavior, IDs and business data stay intact. */
export function localizeTree(
  node: ReactNode,
  locale: Locale,
  t: Translator,
): ReactNode {
  if (locale === "it") return node;
  if (typeof node === "string") return t(node);
  if (Array.isArray(node))
    return Children.map(node, (child) => localizeTree(child, locale, t));
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string, unknown>>;
  if (element.props.lang === "it") return node;
  const props: Record<string, unknown> = {};
  for (const key of [
    "children",
    "title",
    "description",
    "eyebrow",
    "hint",
    "label",
    "alt",
    "aria-label",
    "aria-roledescription",
    "placeholder",
  ]) {
    const value = element.props[key];
    if (typeof value === "string") props[key] = t(value);
    else if (isValidElement(value) || Array.isArray(value))
      props[key] = localizeTree(value as ReactNode, locale, t);
  }
  if (typeof element.props.href === "string")
    props.href = localizeHref(element.props.href, locale);
  return cloneElement(element, props);
}
