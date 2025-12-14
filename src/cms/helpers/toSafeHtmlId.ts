export function toSafeHtmlId(text: string) {
  return text.replace(/ /g, '-').toLocaleLowerCase();
}
