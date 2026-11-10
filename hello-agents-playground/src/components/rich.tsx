export function RichText({ text }: { text: string }) {
  const nodes: Array<{ bold: boolean; text: string }> = []
  const pattern = /<b>(.*?)<\/b>/g
  let last = 0
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0
    if (index > last) nodes.push({ bold: false, text: text.slice(last, index) })
    nodes.push({ bold: true, text: match[1] ?? "" })
    last = index + match[0].length
  }
  if (last < text.length) nodes.push({ bold: false, text: text.slice(last) })
  return (
    <>
      {nodes.map((node, index) =>
        node.bold ? <b key={index}>{node.text}</b> : <span key={index}>{node.text}</span>
      )}
    </>
  )
}
