export const truncateExcerpt = (excerpt: any[], charLimit: number) => {
  let charCount = 0;
  let truncatedExcerpt: any[] = [];

  for (const paragraph of excerpt) {
    const paragraphText = paragraph.children
      .map((child: any) => child.text)
      .join(" ");
    const remainingChars = charLimit - charCount;

    if (charCount + paragraphText.length <= charLimit) {
      truncatedExcerpt.push(paragraph);
      charCount += paragraphText.length;
    } else {
      const truncatedText = paragraphText.slice(0, remainingChars);
      truncatedExcerpt.push({
        ...paragraph,
        children: [{ type: "text", text: truncatedText }],
      });
      break;
    }
  }

  return truncatedExcerpt;
};