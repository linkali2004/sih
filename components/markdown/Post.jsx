import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const Post = ({ words }) => {
  useEffect(() => {
    window.scrollBy({
      top: 800,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="post-container">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-3xl font-bold mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-2xl font-bold mb-2">{children}</h3>,
          p: ({ children }) => <p className="mb-4">{children}</p>,
          table: ({ children }) => <table className="table-auto mb-4">{children}</table>,
          thead: ({ children }) => <thead>{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr>{children}</tr>,
          th: ({ children }) => <th className="px-4 py-2">{children}</th>,
          td: ({ children }) => <td className="border px-4 py-2">{children}</td>,
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={atomDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {words}
      </ReactMarkdown>
    </div>
  );
};

export default Post;