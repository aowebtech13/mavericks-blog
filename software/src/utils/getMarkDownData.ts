import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Read all markdown files from a directory and return parsed frontmatter + content.
 *
 * @param folder - Relative path from project root (e.g. 'src/data/blog')
 * @param recursive - Whether to search subdirectories recursively
 * @param sortBy - (Optional) A frontmatter field to sort by (ascending)
 */
export function getMarkDownData<T extends { slug: string; content: string }>(
  folder: string,
  recursive: boolean = false,
  sortBy?: string,
): T[] {
  const dirPath = path.join(process.cwd(), folder);

  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const items: T[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory() && recursive) {
      const subfolder = path.join(folder, entry.name);
      items.push(...getMarkDownData<T>(subfolder, recursive, sortBy));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const { data, content: body } = matter(content);
      const slug = entry.name.replace(/\.md$/, '');
      items.push({ ...data, slug, content: body } as unknown as T);
    }
  }

  if (sortBy && items.length > 0) {
    const key = sortBy as keyof T;
    items.sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return aVal - bVal;
      }
      return 0;
    });
  }

  return items;
}

export default getMarkDownData;

