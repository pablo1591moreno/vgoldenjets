export type Language = "en" | "es";

/** String localizado con fallback */
export type LStr = Partial<Record<Language, string>> & { es?: string; en?: string };

export type ContentBlock =
    | { type: "h1"; text: string }
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "p"; text: string }
    | { type: "img"; src: string; alt?: string }
    | { type: "cta"; text: string };

export interface ArticleView {
    slug: string;
    date: string;
    dateMs: number;
    cover: string;
    /** Imagen preferida para OG/Twitter */
    ogImage?: string;
    title: string;
    subtitle: string;
    excerpt: string;
    category: string; // Added category
    content: ContentBlock[];
}

export interface ArticleMeta {
    slug: string;
    date: string;
    dateMs: number;
    cover: string;
    title: string;
    subtitle: string;
    excerpt: string;
    category: string;
}
