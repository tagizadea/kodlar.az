import type { ImageMetadata } from "astro";
import parsedData from "./authors.toml";

// Import all author images
const authorImages = import.meta.glob<{ default: ImageMetadata }>(
  "../images/authors/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

export interface AuthorLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string | ImageMetadata;
  bio: string;
  links?: AuthorLinks;
}

type RawAuthorData = Record<
  string,
  {
    name: string;
    avatar: string;
    bio: string;
    links?: AuthorLinks;
  }
>;

function normalizeGitHubLink(link: string): string {
  if (link.startsWith("http://") || link.startsWith("https://")) {
    return link;
  }
  return `https://github.com/${link}`;
}

function normalizeLinkedInLink(link: string): string {
  if (link.startsWith("http://") || link.startsWith("https://")) {
    return link;
  }
  return `https://linkedin.com/in/${link}`;
}

function buildAuthors(): Record<string, Author> {
  const authors: Record<string, Author> = {};

  for (const [id, authorData] of Object.entries(
    parsedData as unknown as RawAuthorData,
  )) {
    const avatarPath = `../images/authors/${authorData.avatar}`;
    const avatarImage = authorImages[avatarPath]?.default;

    const normalizedLinks = authorData.links
      ? {
          ...authorData.links,
          github: authorData.links.github
            ? normalizeGitHubLink(authorData.links.github)
            : undefined,
          linkedin: authorData.links.linkedin
            ? normalizeLinkedInLink(authorData.links.linkedin)
            : undefined,
        }
      : undefined;

    authors[id] = {
      id,
      ...authorData,
      avatar: avatarImage || authorData.avatar,
      links: normalizedLinks,
    };
  }

  return authors;
}

const authors = buildAuthors();

export function getAuthor(id: string): Author | undefined {
  return authors[id];
}

export function getAllAuthors(): Author[] {
  return Object.values(authors);
}

export function getAuthorIds(): string[] {
  return Object.keys(authors);
}
