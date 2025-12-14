import React from "react";

export const RichTextRenderer: React.FC<{
  content?: string;
}> = ({ content }) => {
  if (!content) return null;

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // TABLE
    if (
      line.startsWith("|") &&
      lines[i + 1]?.includes("---")
    ) {
      const tableLines = [line, lines[i + 1]];
      i += 2;

      while (lines[i]?.startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }

      elements.push(parseTable(tableLines));
      i--;
      continue;
    }

    // HEADINGS
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="mt-4 text-lg font-semibold">
          {parseInline(line.slice(4))}
        </h3>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="mt-6 text-xl font-semibold">
          {parseInline(line.slice(3))}
        </h2>
      );
      continue;
    }

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="mt-8 text-2xl font-bold">
          {parseInline(line.slice(2))}
        </h1>
      );
      continue;
    }

    // EMPTY LINE
    if (!line.trim()) {
      elements.push(<div key={i} className="h-4" />);
      continue;
    }

    // PARAGRAPH
    elements.push(
      <p key={i} className="leading-relaxed">
        {parseInline(line)}
      </p>
    );
  }

  return <div className="space-y-2">{elements}</div>;
};

function parseTable(lines: string[]) {
  const rows = lines.map((line) =>
    line
      .trim()
      .slice(1, -1)
      .split("|")
      .map((cell) => cell.trim())
  );

  const [header, , ...body] = rows;

  return (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border border-[color:var(--color-bg-primary)] text-sm">
        <thead>
          <tr>
            {header?.map((cell, i) => (
              <th
                key={i}
                className="border px-3 py-2 text-left font-semibold"
              >
                {parseInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body?.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="border px-3 py-2">
                  {parseInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];

  let remaining = text;

  while (remaining.length) {
    const bold = remaining.match(/\*\*(.*?)\*\*/);
    const italic = remaining.match(/\*(.*?)\*/);
    const code = remaining.match(/`(.*?)`/);

    const match = [bold, italic, code]
      .filter(Boolean)
      .sort((a, b) => a!.index! - b!.index!)[0];

    if (!match) {
      parts.push(remaining);
      break;
    }

    if (match.index! > 0) {
      parts.push(remaining.slice(0, match.index));
    }

    const content = match[1];

    if (match[0].startsWith("**")) {
      parts.push(
        <strong key={parts.length}>{content}</strong>
      );
    } else if (match[0].startsWith("*")) {
      parts.push(<em key={parts.length}>{content}</em>);
    } else {
      parts.push(
        <code
          key={parts.length}
          className="rounded px-1 text-sm font-mono"
        >
          {content}
        </code>
      );
    }

    remaining = remaining.slice(
      match.index! + match[0].length
    );
  }

  return parts;
}
