export type Language = "en" | "es";

/** String localizado con fallback */
export type LStr = Partial<Record<Language, string>> & { es?: string; en?: string };

export type ContentBlock =
    | { type: "h1"; text: string | LStr }
    | { type: "h2"; text: string | LStr }
    | { type: "h3"; text: string | LStr }
    | { type: "p"; text: string | LStr }
    | { type: "img"; src: string; alt?: string | LStr }
    | { type: "cta"; text: string | LStr };

export interface ArticleView {
    slug: string;
    date: string;
    dateMs: number;
    cover: string;
    /** Imagen preferida para OG/Twitter */
    ogImage?: string;
    title: LStr | string;
    subtitle: LStr | string;
    excerpt: LStr | string;
    category: LStr | string;
    content: ContentBlock[];
}

export interface ArticleMeta {
    slug: string;
    date: string;
    dateMs: number;
    cover: string;
    title: LStr | string;
    subtitle: LStr | string;
    excerpt: LStr | string;
    category: LStr | string;
}
