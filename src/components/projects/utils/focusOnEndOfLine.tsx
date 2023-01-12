const focusOnEndOfLine = (
  paragraphRef: React.RefObject<HTMLParagraphElement>
) => {
  const selection = window.getSelection();
  selection?.removeAllRanges();
  const range = document.createRange();
  range.selectNodeContents(paragraphRef.current!);
  range.collapse(false);
  selection?.addRange(range);
  paragraphRef.current?.focus();
};
export default focusOnEndOfLine;
