/**
 * Get element from dom by selector string
 * @template {Element} [T=HTMLElement]
 * @param {string} selector
 * @param {Document} context by default is document
 * @returns {T | null}
 * @example
 * ```
 * const $elementClass = $('.myClass')
 * const $elementId = $('.myId')
 * ```
 */
export const $ = <T extends HTMLElement>(selector: string, context: Document | HTMLElement = document): T | null =>
  context.querySelector<T>(selector)
