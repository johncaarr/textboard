import MarkdownJSX from 'markdown-to-jsx'

// TODO: Remove image tag

export type MarkdownFC = typeof MarkdownJSX

export const Markdown: MarkdownFC = ({ children, options }) => {
  return <MarkdownJSX options={options}>{children}</MarkdownJSX>
}

export default Markdown

