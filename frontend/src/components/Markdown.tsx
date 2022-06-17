import React from 'react'
import MarkdownJSX from 'markdown-to-jsx'

// TODO: Remove image tag

export interface MarkdownProps {
  children: string
}

export const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  return <MarkdownJSX>{children}</MarkdownJSX>
}

export default Markdown

