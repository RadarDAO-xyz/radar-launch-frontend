const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    VITE_WEB3AUTH_CLIENT_ID: process.env.VITE_WEB3AUTH_CLIENT_ID,
    VITE_INFURA_KEY: process.env.VITE_INFURA_KEY,
    BACKEND_URL: process.env.BACKEND_URL,
    WHITELISTED_ADDRESSES: process.env.WHITELISTED_ADDRESSES,
    TINYMCE_API_KEY: process.env.TINYMCE_API_KEY,
    FEATURED_PROJECT_ID: process.env.FEATURED_PROJECT_ID,
    LIVEPEER_API_KEY: process.env.LIVEPEER_API_KEY,
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
  // see https://github.com/vercel/next.js/pull/53483/files
  // modularizeImports: {
  //   "lucide-react": {
  //     // Note that we need to first resolve to the base path (`lucide-react`) and join the subpath,
  //     // instead of just resolving `lucide-react/esm/icons/{{kebabCase member}}` because this package
  //     // doesn't have proper `exports` fields for individual icons in its package.json.
  //     transform: {
  //       // Special aliases
  //       "(SortAsc|LucideSortAsc|SortAscIcon)":
  //         "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/arrow-up-narrow-wide!lucide-react",
  //       "(SortDesc|LucideSortDesc|SortDescIcon)":
  //         "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/arrow-down-wide-narrow!lucide-react",
  //       "(Verified|LucideVerified|VerifiedIcon)":
  //         "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/badge-check!lucide-react",
  //       "(Slash|LucideSlash|SlashIcon)":
  //         "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/ban!lucide-react",
  //       "(CurlyBraces|LucideCurlyBraces|CurlyBracesIcon)":
  //         "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/braces!lucide-react",
  //       "(CircleSlashed|LucideCircleSlashed|CircleSlashedIcon)":
  //         "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/circle-slash-2!lucide-react",
  //       "(SquareGantt|LucideSquareGantt|SquareGanttIcon)":
  //         "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/gantt-chart-square!lucide-react",
  //       "(SquareKanbanDashed|LucideSquareKanbanDashed|SquareKanbanDashedIcon)":
  //         "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/kanban-square-dashed!lucide-react",
  //       "(SquareKanban|LucideSquareKanban|SquareKanbanIcon)":
  //         "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/kanban-square!lucide-react",
  //       "(Edit3|LucideEdit3|Edit3Icon)":
  //         "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/pen-line!lucide-react",
  //       "(Edit|LucideEdit|EditIcon|PenBox|LucidePenBox|PenBoxIcon)":
  //         "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/pen-square!lucide-react",
  //       "(Edit2|LucideEdit2|Edit2Icon)":
  //         "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/pen!lucide-react",
  //       "(Stars|LucideStars|StarsIcon)":
  //         "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/sparkles!lucide-react",
  //       "(TextSelection|LucideTextSelection|TextSelectionIcon)":
  //         "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/text-select!lucide-react",
  //       // General rules
  //       "Lucide(.*)":
  //         "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/{{ kebabCase memberMatches.[1] }}!lucide-react",
  //       "(.*)Icon":
  //         "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/{{ kebabCase memberMatches.[1] }}!lucide-react",
  //       "*": "modularize-import-loader?name={{ member }}&from=default&as=default&join=./icons/{{ kebabCase member }}!lucide-react",
  //     },
  //   },
  // },
};

module.exports = withBundleAnalyzer(nextConfig);
