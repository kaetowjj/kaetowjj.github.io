export const normalizeTag = tag => typeof tag === 'string' ? tag.trim().toLowerCase() : '';
export const canonicalTags = tags => [...new Set((Array.isArray(tags) ? tags : []).map(normalizeTag).filter(Boolean))];
export const matchesTag = (tags, tag) => !normalizeTag(tag) || canonicalTags(tags).includes(normalizeTag(tag));
export function tagURL(value, tag) {
  const url = new URL(value), key = normalizeTag(tag);
  if (key) url.searchParams.set('tag', key); else url.searchParams.delete('tag');
  return url.href;
}

// Resolve query spelling against build-time canonical keys, including Unicode case pairs.
export function resolveTag(value, keys) {
  const fold = tag => typeof tag === 'string' ? tag.normalize('NFKC').replace(/^[\s\u0085]+|[\s\u0085]+$/g, '').toUpperCase() : '';
  const lookup = fold(value);
  return keys.find(key => fold(key) === lookup) ?? normalizeTag(value);
}
