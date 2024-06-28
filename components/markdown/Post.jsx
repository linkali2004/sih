import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const Post = ({ words }) => {
  useEffect(() => {
    window.scrollBy({
      top: 500,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="bg-black text-white p-4 rounded-2xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mb-4 text-[#FFDAB9] bg-gray-900 p-2 rounded-lg">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold mb-3 text-[#FFDAB9] bg-gray-900 p-2 rounded-lg">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-medium mb-2 text-[#FFDAB9]">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 text-gray-300 font-light">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc ml-6">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-6">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-2">{children}</li>,
          table: ({ children }) => (
            <table className="table-auto mb-4 text-white bg-gray-800 rounded-lg">
              {children}
            </table>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-700 text-yellow-400">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="bg-gray-800">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="bg-gray-700 hover:bg-gray-600">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 bg-gray-700">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 bg-gray-800 text-gray-200">{children}</td>
          ),
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
              <code
                className={`${className} bg-gray-800 text-[#FFDAB9] p-1 rounded`}
                {...props}
              >
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
