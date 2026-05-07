/**
 * Mahber utility functions for sorting fellowship/service group entries.
 * Used by the Mahber page.
 */

import type { ImageMetadata } from "astro";

export interface Mahber {
  name: string;
  description: string;
  schedule: string;
  contactName: string;
  contactEmail?: string;
  image?: ImageMetadata;
  order: number;
}

/**
 * Sorts mahber entries in ascending order by the order field.
 */
export function sortMahberByOrder(entries: Mahber[]): Mahber[] {
  return [...entries].sort((a, b) => a.order - b.order);
}
