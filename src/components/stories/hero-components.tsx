"use client";

import type { ComponentType } from "react";

/**
 * Registry of React components usable as a story hero visual.
 *
 * To use one, set frontmatter:
 *
 *   heroMedia:
 *     type: component
 *     component: my-visual
 *
 * Or inside a story body:
 *
 *   <expand-media type="component" component="my-visual"></expand-media>
 *
 * Register new entries below. Keep visuals self-contained — they render
 * inside a full-bleed expandable container with no padding.
 */

export type HeroComponent = ComponentType;

export const HERO_COMPONENTS: Record<string, HeroComponent> = {};

export function getHeroComponent(name: string | undefined): HeroComponent | null {
  if (!name) return null;
  return HERO_COMPONENTS[name] ?? null;
}
