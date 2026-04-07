import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

// Custom rich text renderer to bypass potential React 19 / Astro SSR issues with TinaMarkdown
function renderNode(node: any, index: number): React.ReactNode {
  if (!node) return null;
  if (typeof node === 'string') return node;
  
  if (node.type === 'text') {
    let text = node.text || '';
    if (node.bold) text = <strong key={index}>{text}</strong>;
    if (node.italic) text = <em key={index}>{text}</em>;
    return text;
  }
  
  const children = node.children ? node.children.map((child: any, i: number) => renderNode(child, i)) : null;
  
  switch (node.type) {
    case 'p': return <p key={index}>{children}</p>;
    case 'h1': return <h1 key={index}>{children}</h1>;
    case 'h2': return <h2 key={index}>{children}</h2>;
    case 'h3': return <h3 key={index}>{children}</h3>;
    case 'h4': return <h4 key={index}>{children}</h4>;
    case 'h5': return <h5 key={index}>{children}</h5>;
    case 'h6': return <h6 key={index}>{children}</h6>;
    case 'ul': return <ul key={index}>{children}</ul>;
    case 'ol': return <ol key={index}>{children}</ol>;
    case 'li': return <li key={index}>{children}</li>;
    case 'a': return <a key={index} href={node.url}>{children}</a>;
    case 'root': return <React.Fragment key={index}>{children}</React.Fragment>;
    default: return children; // fallback
  }
}

export default function RichText({ content, className = '' }: { content: any, className?: string }) {
  if (!content) return null;
  
  let innerContent;
  if (typeof content === 'string') {
    innerContent = <p>{content}</p>;
  } else if (content?.type === 'root') {
    innerContent = renderNode(content, 0);
  } else {
    // If it's somehow an unrecognized object format, stringify it instead of crashing or showing [object Object]
    try {
      innerContent = <p>{JSON.stringify(content)}</p>;
    } catch {
      innerContent = null;
    }
  }
    
  return (
    <div className={`[&>p]:mb-4 [&>p:last-child]:mb-0 [&_strong]:font-bold [&_em]:italic [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ml-6 [&_ol]:ml-6 [&_a]:underline hover:[&_a]:text-blue-500 ${className}`}>
      {innerContent}
    </div>
  );
}
