// Blog Dynamic Content Loader
// Uses axios to fetch data from the Laravel backend API

const API_BASE_URL = window.APP_CONFIG?.API_BASE_URL || 'http://localhost:8000/api';
const POSTS_PER_PAGE = window.APP_CONFIG?.POSTS_PER_PAGE || 6;

// Utility: Format date
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Utility: Get post slug from URL
function getPostSlug() {
  const path = window.location.pathname;
  const match = path.match(/blog-details\.html\?slug=([^&]+)/);
  if (match) return match[1];
  
  // Also check hash-based routing
  const hash = window.location.hash;
  if (hash && hash.startsWith('#/blog/')) {
    return hash.replace('#/blog/', '');
  }
  
  return null;
}

// Utility: Truncate text
function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

// ============================================
// INDEX.HTML - Blog Listing Page
// ============================================

async function loadBlogIndex() {
  const isIndexPage = window.location.pathname.endsWith('index.html') || 
                      window.location.pathname.endsWith('/') ||
                      window.location.pathname === '';
  
  if (!isIndexPage) return;
  
  try {
    // Fetch posts, categories, and tags in parallel
    const [postsRes, categoriesRes, tagsRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/posts?per_page=${POSTS_PER_PAGE}&all=true`),
      axios.get(`${API_BASE_URL}/categories`),
      axios.get(`${API_BASE_URL}/tags/popular`)
    ]);
    
    const posts = postsRes.data.data || postsRes.data;
    const categories = categoriesRes.data.data || categoriesRes.data;
    const tags = tagsRes.data.data || tagsRes.data;
    
    // Render blog posts grid
    renderBlogPosts(posts);
    
    // Render categories sidebar
    renderCategories(categories);
    
    // Render trending tags
    renderTrendingTags(tags);
    
    // Render recent articles
    renderRecentArticles(posts);
    
    // Render past records (archive dates)
    renderPastRecords(posts);
    
  } catch (error) {
    console.error('Error loading blog index:', error);
    const grid = document.getElementById('blog-posts-grid');
    if (grid) {
      grid.innerHTML = '<p class="text-tagline-2 col-span-12 text-center text-white/60">Unable to load articles. Please try again later.</p>';
    }
  }
}

function renderBlogPosts(posts) {
  // Find the blog posts grid container
  const container = document.getElementById('blog-posts-grid');
  if (!container) return;

  if (!posts.length) {
    container.innerHTML = '<p class="text-tagline-2 col-span-12 text-center text-white/60">No articles found.</p>';
    return;
  }
  
  container.innerHTML = posts.map((post, index) => {
    const delay = index % 2 === 0 ? '0.1' : '0.2';
    const imageUrl = post.featured_image || './images/opai-img-492.jpg';
    const date = formatDate(post.published_at);
    const categoryName = post.category?.name || 'Blog';
    const tagName = post.tags?.[0]?.name || 'Blog';
    
    return `
      <article
        data-opai-animate
        data-delay="${delay}"
        class="group underline-hover-effect col-span-12 md:col-span-6"
      >
        <figure class="max-w-full overflow-hidden rounded-lg xl:min-h-[430px]">
          <img
            src="${imageUrl}"
            alt="${post.title}"
            class="h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-104 group-hover:rotate-1"
          />
        </figure>
        <div class="pt-4 pl-3">
          <p class="text-tagline-4 font-normal text-white/80">${date}</p>
          <div class="mt-4 mb-2 flex items-center gap-x-2">
            <span
              class="text-tagline-3 inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-white/50"
            >
              ${categoryName}
            </span>
            <span
              class="text-tagline-3 inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-white/50"
            >
              ${tagName}
            </span>
          </div>
          <a href="./blog-details.html?slug=${post.slug}" class="blog-title block">
            <h3 class="text-sora-heading-6 block font-normal text-white/90">
              ${post.title}
            </h3>
          </a>
        </div>
      </article>
    `;
  }).join('');
}

function renderCategories(categories) {
  // Find the categories list in the sidebar (2nd space-y-[70px] div)
  const aside = document.querySelector('div.w-full.flex-auto > div:first-child > aside');
  if (!aside) return;
  
  const categoryLists = aside.querySelectorAll('ul');
  if (!categoryLists.length) return;
  
  // The categories list is typically the first ul after a "Categories" heading
  const categoryList = categoryLists[0];
  if (!categoryList || !categories.length) return;
  
  categoryList.innerHTML = categories.map(cat => `
    <li>
      <a
        href="#"
        class="hover:bg-background-7 hover:text-background-13 flex items-center justify-between rounded-md p-2 text-white/60 transition-all duration-500"
      >
        <span>${cat.name}</span>
        <span>(${cat.posts_count || 0})</span>
      </a>
    </li>
  `).join('');
}

function renderTrendingTags(tags) {
  // Find the trending tags container in the sidebar
  const aside = document.querySelector('div.w-full.flex-auto > div:first-child > aside');
  if (!aside) return;
  
  // Look for the flex-wrap container (trending tags)
  const tagContainer = aside.querySelector('.flex.flex-wrap');
  if (!tagContainer || !tags.length) return;
  
  tagContainer.innerHTML = tags.map(tag => `
    <a
      href="#"
      class="text-tagline-3 hover:text-background-5 border-stroke-3/25 rounded-full border px-5 py-[9px] font-normal text-white transition-all duration-500 hover:bg-white"
    >${tag.name}</a>
  `).join('');
}

function renderRecentArticles(posts) {
  // Find the recent articles container in the sidebar
  const aside = document.querySelector('div.w-full.flex-auto > div:first-child > aside');
  if (!aside) return;
  
  // Look for the space-y-4 container (recent articles)
  const recentContainer = aside.querySelector('.space-y-4');
  if (!recentContainer || !posts.length) return;
  
  const recentPosts = posts.slice(0, 3);
  
  recentContainer.innerHTML = recentPosts.map(post => {
    const imageUrl = post.featured_image || './images/opai-img-489.jpg';
    const date = formatDate(post.published_at);
    
    return `
      <article>
        <a
          href="./blog-details.html?slug=${post.slug}"
          class="border-stroke-3/25 flex items-center gap-x-3.5 rounded-md border pr-0.5"
        >
          <figure class="h-[90px] w-[110px] shrink-0 overflow-hidden rounded-md">
            <img
              src="${imageUrl}"
              alt="blog"
              class="h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-104 group-hover:rotate-1"
            />
          </figure>
          <div class="space-y-1">
            <p class="text-tagline-3 font-normal text-white/80">
              ${truncateText(post.title, 50)}
            </p>
            <p class="text-tagline-4 font-normal text-white/50">${date}</p>
          </div>
        </a>
      </article>
    `;
  }).join('');
}

function renderPastRecords(posts) {
  // Find the past records container in the sidebar
  const aside = document.querySelector('div.w-full.flex-auto > div:first-child > aside');
  if (!aside) return;
  
  // Look for the last ul in the aside (past records)
  const allLists = aside.querySelectorAll('ul');
  if (!allLists.length) return;
  
  const pastRecordsList = allLists[allLists.length - 1];
  if (!pastRecordsList || !posts.length) return;
  
  // Group posts by month/year
  const archiveMap = new Map();
  posts.forEach(post => {
    if (post.published_at) {
      const date = new Date(post.published_at);
      const key = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      if (!archiveMap.has(key)) {
        archiveMap.set(key, 0);
      }
      archiveMap.set(key, archiveMap.get(key) + 1);
    }
  });
  
  const archives = Array.from(archiveMap.entries()).slice(0, 4);
  
  pastRecordsList.innerHTML = archives.map(([date, count]) => `
    <li>
      <a
        href="#"
        class="hover:bg-background-7 hover:text-background-13 flex items-center justify-between rounded-md p-2 text-white/60 transition-all duration-500"
      >
        <span>${date}</span>
        <span>(${String(count).padStart(2, '0')})</span>
      </a>
    </li>
  `).join('');
}

// ============================================
// BLOG-DETAILS.HTML - Single Post Page
// ============================================

async function loadBlogDetails() {
  const isDetailsPage = window.location.pathname.endsWith('blog-details.html');
  if (!isDetailsPage) return;
  
  const slug = getPostSlug();
  if (!slug) {
    console.error('No post slug found in URL');
    return;
  }
  
  try {
    // Fetch post, categories, and tags in parallel
    const [postRes, categoriesRes, tagsRes, relatedRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/posts/${slug}`),
      axios.get(`${API_BASE_URL}/categories`),
      axios.get(`${API_BASE_URL}/tags/popular`),
      axios.get(`${API_BASE_URL}/posts?per_page=${POSTS_PER_PAGE}&all=true`)
    ]);
    
    const post = postRes.data.data || postRes.data;
    const categories = categoriesRes.data.data || categoriesRes.data;
    const tags = tagsRes.data.data || tagsRes.data;
    const relatedPosts = (relatedRes.data.data || relatedRes.data).filter(p => p.slug !== slug);
    
    // Update page title
    document.title = `${post.title} - Blog Details | MAVERICKS`;
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && post.excerpt) {
      metaDesc.setAttribute('content', post.excerpt);
    }
    
    // Render post content
    renderPostContent(post);
    
    // Render author info
    renderAuthorInfo(post);
    
    // Render related articles
    renderRelatedArticles(relatedPosts);
    
    // Render sidebar
    renderCategories(categories);
    renderTrendingTags(tags);
    renderRecentArticles(relatedRes.data.data || relatedRes.data);
    renderPastRecords(relatedRes.data.data || relatedRes.data);
    
  } catch (error) {
    console.error('Error loading blog details:', error);
    // Show error message
    const contentArea = document.querySelector('div.w-full.flex-auto');
    if (contentArea) {
      contentArea.innerHTML = `
        <div class="text-center py-20">
          <h2 class="text-sora-heading-4 text-white/90 mb-4">Post Not Found</h2>
          <p class="text-tagline-2 text-white/60 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <a href="./index.html" class="inline-flex items-center gap-2 bg-background-7 hover:border-stroke-3 text-background-5 px-6 py-3 rounded-full border border-transparent transition-all duration-300">
            Back to Blog
          </a>
        </div>
      `;
    }
  }
}

function renderPostContent(post) {
  // Find the post content container (first child of the main content area)
  const contentArea = document.querySelector('div.w-full.flex-auto');
  if (!contentArea) return;
  
  const firstChild = contentArea.querySelector(':scope > div:first-child');
  if (!firstChild) return;
  
  const imageUrl = post.featured_image || './images/opai-img-506.jpg';
  const date = formatDate(post.published_at);
  const categoryName = post.category?.name || 'Blog';
  
  firstChild.innerHTML = `
    <div class="space-y-6">
      <figure
        class="max-h-[400px] overflow-hidden rounded-lg"
        data-opai-animate
        data-delay="0.1"
      >
        <img src="${imageUrl}" alt="${post.title}" class="w-full" />
      </figure>
      <div data-opai-animate data-delay="0.2">
        <h2 class="lg:text-sora-heading-5 text-sora-heading-6 mb-1 font-normal text-white/90">
          ${post.title}
        </h2>
        <p class="text-tagline-2 mb-4 max-w-2xl font-normal text-white/60">
          ${post.excerpt || ''}
        </p>
        <div class="text-tagline-2 font-normal text-white/80 prose prose-invert max-w-none">
          ${post.content || ''}
        </div>
      </div>
    </div>
  `;
}

function renderAuthorInfo(post) {
  // Find the author info container (last child of the main content area)
  const contentArea = document.querySelector('div.w-full.flex-auto');
  if (!contentArea) return;
  
  const children = contentArea.querySelectorAll(':scope > div');
  if (children.length < 2) return;
  
  const lastChild = children[children.length - 1];
  if (!lastChild) return;
  
  const authorName = post.user?.name || 'Cody Fisher';
  const date = formatDate(post.published_at);
  const readTime = Math.max(1, Math.ceil((post.content?.length || 500) / 200)) + ' min read';
  const avatarUrl = post.user?.avatar || './images/opai-avatar-img-01.png';
  
  lastChild.innerHTML = `
    <div data-opai-animate data-delay="0.3">
      <p class="text-tagline-2 mb-4 font-normal text-white/80">Share this post</p>
      <div>
        <ul class="flex items-center gap-3.5">
          <li>
            <a href="#">
              <span class="sr-only">Facebook</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="white" stroke-opacity="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.75 8.25H14.25C13.6533 8.25 13.081 8.48705 12.659 8.90901C12.2371 9.33097 12 9.90326 12 10.5V21" stroke="white" stroke-opacity="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 13.5H15" stroke="white" stroke-opacity="0.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="sr-only">Instagram</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z" stroke="white" stroke-opacity="0.6" stroke-miterlimit="10"/>
                <path d="M16.125 3.375H7.875C5.38972 3.375 3.375 5.38972 3.375 7.875V16.125C3.375 18.6103 5.38972 20.625 7.875 20.625H16.125C18.6103 20.625 20.625 18.6103 20.625 16.125V7.875C20.625 5.38972 18.6103 3.375 16.125 3.375Z" stroke="white" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.875 8.25C17.4963 8.25 18 7.74632 18 7.125C18 6.50368 17.4963 6 16.875 6C16.2537 6 15.75 6.50368 15.75 7.125C15.75 7.74632 16.875 8.25" fill="white" fill-opacity="0.6"/>
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="sr-only">X</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19.2955 5L13.1929 11.2933M11.1136 13.4375L4.75 20M4.75 5L16.1136 20H19.75L8.38636 5H4.75Z" stroke="white" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="sr-only">LinkedIn</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19.5 3.75H4.5C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z" stroke="white" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.25 10.5V16.5" stroke="white" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.25 10.5V16.5" stroke="white" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.25 13.125C11.25 12.4288 11.5266 11.7611 12.0188 11.2688C12.5111 10.7766 13.1788 10.5 13.875 10.5C14.5712 10.5 15.2389 10.7766 15.7312 11.2688C16.2234 11.7611 16.5 12.4288 16.5 13.125V16.5" stroke="white" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.25 8.625C8.87132 8.625 9.375 8.12132 9.375 7.5C9.375 6.87868 8.87132 6.375 8.25 6.375C7.62868 6.375 7.125 6.87868 7.125 7.5C7.125 8.12132 8.25 8.625" fill="white" fill-opacity="0.6"/>
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="sr-only">Youtube</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22.5406 6.42C22.4218 5.94541 22.1799 5.51057 21.8392 5.15941C21.4986 4.80824 21.0713 4.55318 20.6006 4.42C18.8806 4 12.0006 4 12.0006 4C12.0006 4 5.12057 4 3.40057 4.46C2.92982 4.59318 2.50255 4.84824 2.16192 5.19941C1.82129 5.55057 1.57936 5.98541 1.46057 6.46C1.14579 8.20556 0.991808 9.97631 1.00057 11.75C0.989351 13.537 1.14334 15.3213 1.46057 17.08C1.59153 17.5398 1.83888 17.9581 2.17872 18.2945C2.51855 18.6308 2.93939 18.8738 3.40057 19C5.12057 19.46 12.0006 19.46 12.0006 19.46C12.0006 19.46 18.8806 19.46 20.6006 19C21.0713 18.8668 21.4986 18.6118 21.8392 18.2606C22.1799 17.9094 22.4218 17.4746 22.5406 17C22.8529 15.2676 23.0069 13.5103 23.0006 11.75C23.0118 9.96295 22.8578 8.1787 22.5406 6.42V6.42Z" stroke="white" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.75 15.0205L15.5 11.7505L9.75 8.48047V15.0205Z" stroke="white" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <hr class="border-t-stroke-3/25 my-6 h-px border-t" />
      <div class="flex items-center gap-3">
        <figure class="size-12 overflow-hidden rounded-full">
          <img
            src="${avatarUrl}"
            alt="blog"
            class="size-full object-cover"
          />
        </figure>
        <div>
          <p class="text-tagline-2 font-medium text-white/80">${authorName}</p>
          <p class="flex items-center gap-2">
            <span class="text-tagline-3 font-normal text-white/60">${date}</span>
            <span class="block size-1.5 rounded-full bg-white/60"></span>
            <span class="text-tagline-3 font-normal text-white/60">${readTime}</span>
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderRelatedArticles(posts) {
  // Find the related articles section
  const relatedSection = document.querySelector('section.pt-28.pb-39');
  if (!relatedSection) return;
  
  const gridContainer = relatedSection.querySelector('.grid.grid-cols-12');
  if (!gridContainer) return;
  
  if (!posts.length) {
    gridContainer.innerHTML = '<p class="text-tagline-2 text-white/60 col-span-12 text-center">No related articles found.</p>';
    return;
  }
  
  gridContainer.innerHTML = posts.map((post, index) => {
    const imageUrl = post.featured_image || `./images/opai-img-${500 + index}.jpg`;
    const date = formatDate(post.published_at);
    const categoryName = post.category?.name || 'Press';
    
    return `
      <article
        data-opai-animate
        data-delay="${index * 0.1}"
        class="group underline-hover-effect col-span-12 md:col-span-6 lg:col-span-4"
      >
        <figure class="max-w-full overflow-hidden rounded-lg xl:min-h-[430px]">
          <img
            src="${imageUrl}"
            alt="${post.title}"
            class="h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-104 group-hover:rotate-1"
          />
        </figure>
        <div class="pt-4 pl-3">
          <p class="text-tagline-4 font-normal text-white/80">${date}</p>
          <div class="mt-4 mb-2 flex items-center gap-x-2">
            <span
              class="text-tagline-3 inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-white/50"
            >
              ${categoryName}
            </span>
            <span
              class="text-tagline-3 inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-white/50"
            >
              Blog
            </span>
          </div>
          <a href="./blog-details.html?slug=${post.slug}" class="blog-title block">
            <h3 class="text-sora-heading-6 block font-normal text-white/90">
              ${post.title}
            </h3>
          </a>
        </div>
      </article>
    `;
  }).join('');
}

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Load axios if not already loaded
  if (typeof axios === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
    script.onload = () => {
      loadBlogIndex();
      loadBlogDetails();
    };
    document.head.appendChild(script);
  } else {
    loadBlogIndex();
    loadBlogDetails();
  }
});

// Export for potential external use
window.BlogLoader = {
  loadBlogIndex,
  loadBlogDetails,
  formatDate,
  truncateText
};
