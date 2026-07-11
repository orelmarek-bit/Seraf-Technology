import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: (props) => <h2 className="mt-10 text-h3 font-semibold text-foreground" {...props} />,
  h3: (props) => <h3 className="mt-8 text-lg font-semibold text-foreground" {...props} />,
  p: (props) => <p className="mt-4 leading-relaxed text-muted-foreground" {...props} />,
  ul: (props) => <ul className="mt-4 space-y-2 pl-1" {...props} />,
  li: (props) => (
    <li className="flex gap-2.5 text-muted-foreground before:mt-2.5 before:size-1.5 before:shrink-0 before:rounded-full before:bg-primary" {...props} />
  ),
  a: (props) => <a className="text-primary underline underline-offset-4" {...props} />,
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
};

export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
