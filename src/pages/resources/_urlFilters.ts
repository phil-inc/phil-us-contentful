import { TOPICS, TYPES, type ResourceItem } from "./_data";

/**
 * A sanitized filter selection for the Resources page.
 *
 * An empty string (`""`) means "no filter" for that dimension. `topic` and
 * `type`, when non-empty, are guaranteed to be valid keys (members of
 * {@link TOPIC_KEYS} / {@link TYPE_KEYS}). `search` is free text and is not
 * validated against any key set.
 */
export type FilterSelection = {
  /** `""` for no topic filter, otherwise a valid Topic_Key. */
  topic: string;
  /** `""` for no type filter, otherwise a valid Type_Key. */
  type: string;
  /** `""` for no search, otherwise the free-text search query. */
  search: string;
  /** The 1-based pagination page. `1` is the default and is omitted from the URL. */
  page: number;
};

/**
 * The valid Topic_Keys, derived from the canonical {@link TOPICS} source of
 * truth in `_data.ts`. This is the single definition of "what is a valid topic"
 * used for URL validation.
 */
export const TOPIC_KEYS: readonly string[] = TOPICS.map((topic) => topic.key);

/**
 * The valid Type_Keys, derived from the canonical {@link TYPES} source of truth
 * in `_data.ts`. This is the single definition of "what is a valid type" used
 * for URL validation.
 */
export const TYPE_KEYS: readonly string[] = TYPES.map((type) => type.key);

/**
 * Parse a raw `location.search` string into a sanitized {@link FilterSelection}.
 *
 * - Tolerates a leading `"?"` (or its absence) and any malformed query string.
 * - Validates `topic` against {@link TOPIC_KEYS} and `type` against
 *   {@link TYPE_KEYS} independently, so a junk value in one dimension never
 *   discards a valid value in the other.
 * - Any topic/type value not in the valid set (including `""`, whitespace-only,
 *   or unknown strings) collapses to `""` (no filter for that dimension).
 * - `search` is free text: it is taken as-is (trimmed), with no key validation.
 *   A missing or whitespace-only `search` becomes `""`.
 * - `page` is parsed as a positive integer; anything missing, non-numeric, less
 *   than 1, or non-integer collapses to `1` (the default first page).
 * - Never throws for any input string.
 */
export function parseFiltersFromSearch(search: string): FilterSelection {
  const params = toSearchParams(search);

  return {
    topic: sanitizeValue(params.get("topic"), TOPIC_KEYS),
    type: sanitizeValue(params.get("type"), TYPE_KEYS),
    search: sanitizeSearch(params.get("search")),
    page: sanitizePage(params.get("page")),
  };
}

/**
 * Serialize a {@link FilterSelection} into a canonical search string.
 *
 * - Emits only non-empty fields, always in the fixed order `topic`, `type`,
 *   `search`, then `page`, so output is deterministic / byte-for-byte stable
 *   for a given selection.
 * - `topic`/`type` are only emitted when they are valid keys; `search` is
 *   emitted when non-empty (after trimming) and is URL-encoded; `page` is
 *   emitted only when greater than 1 (the default first page is omitted).
 * - Returns `""` for the no-filter (base) view.
 * - Otherwise returns a leading-`"?"` form such as `?topic=direct`,
 *   `?topic=direct&type=casestudy`, or `?search=adherence&page=2`.
 */
export function serializeFiltersToSearch(selection: FilterSelection): string {
  const parts: string[] = [];

  if (isValidKey(selection.topic, TOPIC_KEYS)) {
    parts.push(`topic=${selection.topic}`);
  }

  if (isValidKey(selection.type, TYPE_KEYS)) {
    parts.push(`type=${selection.type}`);
  }

  const trimmedSearch = typeof selection.search === "string" ? selection.search.trim() : "";
  if (trimmedSearch !== "") {
    parts.push(`search=${encodeURIComponent(trimmedSearch)}`);
  }

  if (Number.isInteger(selection.page) && selection.page > 1) {
    parts.push(`page=${selection.page}`);
  }

  if (parts.length === 0) {
    return "";
  }

  return `?${parts.join("&")}`;
}

/**
 * Combine a pathname with the serialized search for a selection.
 *
 * If the serialized search is `""` (the base/no-filter view), the pathname is
 * returned unchanged.
 */
export function buildFilterUrl(pathname: string, selection: FilterSelection): string {
  const search = serializeFiltersToSearch(selection);

  if (search === "") {
    return pathname;
  }

  return `${pathname}${search}`;
}

/**
 * Build a `URLSearchParams` defensively from a raw search string.
 *
 * `URLSearchParams` accepts a value with or without a leading `"?"`, but it
 * treats a leading `"?"` as part of the first key, so we strip it first. This
 * helper never throws.
 */
function toSearchParams(search: string): URLSearchParams {
  const normalized = typeof search === "string" ? search.replace(/^\?/, "") : "";

  try {
    return new URLSearchParams(normalized);
  } catch {
    return new URLSearchParams();
  }
}

/**
 * Collapse a raw query value to `""` unless it is exactly a valid key.
 */
function sanitizeValue(value: string | null, validKeys: readonly string[]): string {
  return isValidKey(value, validKeys) ? (value as string) : "";
}

/**
 * Normalize a raw `search` query value. Free text, so no key validation — we
 * only trim surrounding whitespace and treat a missing/whitespace-only value
 * as `""` (no search). `URLSearchParams.get` has already percent-decoded the
 * value, so no manual decoding is needed here.
 */
function sanitizeSearch(value: string | null): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Normalize a raw `page` query value to a 1-based page number. Anything missing,
 * non-numeric, non-integer, or less than 1 collapses to `1` (the default first
 * page). Never throws.
 */
function sanitizePage(value: string | null): number {
  if (typeof value !== "string" || value.trim() === "") {
    return 1;
  }
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }
  return parsed;
}

/**
 * Whether a value is a non-empty member of the supplied key set.
 */
function isValidKey(value: string | null | undefined, validKeys: readonly string[]): boolean {
  return typeof value === "string" && value !== "" && validKeys.includes(value);
}

/* ──────────────────────────────────────────────────────────────────────────
 * Metadata helpers
 *
 * `titleForSelection` / `descriptionForSelection` derive the document title and
 * meta description for a sanitized {@link FilterSelection}, applying the
 * topic-over-type precedence rule (R8.4): a valid topic always wins over a valid
 * type, and when neither is present the base defaults are used.
 * ──────────────────────────────────────────────────────────────────────── */

/**
 * The default page title for the base (no-filter) Resources view (R8.3, R8.7).
 */
export const BASE_TITLE = "Resources | PHIL";

/**
 * The default meta description for the base (no-filter) Resources view, matching
 * the existing static `Head` export in `index.tsx` (R8.3, R8.7).
 */
export const BASE_DESCRIPTION =
  "Explore PHIL's library of reports, webinars, blogs, and press coverage on patient access, direct-to-patient programs, and pharmaceutical commercialization.";

/**
 * The user-facing display name for the Case_Studies_View (the `casestudy`
 * Type_Key). Used in place of the canonical "Case Studies" type label so the
 * title/description read as the marketing-facing "Customer Success Stories".
 */
export const CASE_STUDIES_VIEW_NAME = "Customer Success Stories";

/**
 * Resolve the human-readable display label for a selection, applying
 * topic-over-type precedence:
 *
 * - A valid Topic_Key → that topic's display name.
 * - Else a valid Type_Key → that type's name (the {@link CASE_STUDIES_VIEW_NAME}
 *   for `casestudy`, otherwise the canonical type label).
 * - Else → `null` (base/no-filter view).
 */
function labelForSelection(selection: Pick<FilterSelection, "topic" | "type">): string | null {
  if (isValidKey(selection.topic, TOPIC_KEYS)) {
    const topic = TOPICS.find((t) => t.key === selection.topic);
    if (topic) {
      return topic.label;
    }
  }

  if (isValidKey(selection.type, TYPE_KEYS)) {
    if (selection.type === "casestudy") {
      return CASE_STUDIES_VIEW_NAME;
    }
    const type = TYPES.find((t) => t.key === selection.type);
    if (type) {
      return type.label;
    }
  }

  return null;
}

/**
 * Produce the document title for a selection.
 *
 * Returns exactly one title, with a valid topic taking precedence over a valid
 * type (R8.4). The returned string always CONTAINS the topic/type display name
 * (R8.1, R8.2). When no valid filter is present, returns {@link BASE_TITLE}
 * (R8.3, R8.7).
 */
export function titleForSelection(selection: Pick<FilterSelection, "topic" | "type">): string {
  const label = labelForSelection(selection);

  if (label === null) {
    return BASE_TITLE;
  }

  return `${label} Resources | PHIL`;
}

/**
 * Produce the meta description for a selection.
 *
 * Returns exactly one description that references the selected topic/type
 * display name (R8.5, R8.6), with a valid topic taking precedence over a valid
 * type (R8.4). When no valid filter is present, returns
 * {@link BASE_DESCRIPTION} (R8.3, R8.7).
 */
export function descriptionForSelection(selection: Pick<FilterSelection, "topic" | "type">): string {
  const label = labelForSelection(selection);

  if (label === null) {
    return BASE_DESCRIPTION;
  }

  return `Explore PHIL's ${label} resources on patient access, direct-to-patient programs, and pharmaceutical commercialization.`;
}

/* ──────────────────────────────────────────────────────────────────────────
 * Pure filtering predicate
 * ──────────────────────────────────────────────────────────────────────── */

/**
 * Filter a list of {@link ResourceItem}s by an active topic, type, and search
 * value. This is the single, pure predicate shared by the Resources page and
 * the Property 3 test, so the two never drift.
 *
 * An empty string (`""`) for any dimension means "no filter" for that
 * dimension. A returned item satisfies every active predicate simultaneously:
 * - `topic` set → `item.topics.includes(topic)`
 * - `type` set → `item.type === type`
 * - `search` set → `item.title` contains `search` as a case-insensitive substring
 */
export function filterResources(
  data: ResourceItem[],
  sel: { topic: string; type: string; search: string },
): ResourceItem[] {
  const { topic, type, search } = sel;
  const normalizedSearch = search.toLowerCase();

  return data.filter((item) => {
    if (topic && !item.topics.includes(topic)) {
      return false;
    }
    if (type && item.type !== type) {
      return false;
    }
    if (search && !item.title.toLowerCase().includes(normalizedSearch)) {
      return false;
    }
    return true;
  });
}
