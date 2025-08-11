<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const props = defineProps({
  src: { type: String, default: '' },
  content: { type: String, default: '' },
  sanitize: { type: Boolean, default: true },
})

const loading = ref(false)
const text = ref(props.content)

const renderer = new marked.Renderer()
const renderLink = renderer.link.bind(renderer)
renderer.link = (href, title, text) => {
  const html = renderLink(href, title, text)
  return html.replace('<a ', '<a target="_blank" rel="noopener noreferrer" ')
}
marked.setOptions({ gfm: true, breaks: false, renderer })

watch(
  () => props.content,
  (v) => (text.value = v),
)
watch(
  () => props.src,
  () => {
    if (props.src) fetchSrc()
  },
)

async function fetchSrc() {
  loading.value = true
  try {
    const res = await fetch(props.src)
    if (!res.ok) throw new Error(`Failed to load ${props.src}`)
    text.value = await res.text()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (props.src) fetchSrc()
})

const html = computed(() => {
  const raw = text.value || ''
  const out = marked.parse(raw)
  return props.sanitize ? DOMPurify.sanitize(out, { ADD_ATTR: ['target', 'rel'] }) : out
})
</script>

<template>
  <article class="md-display" :aria-busy="loading">
    <div v-if="loading" class="md-display__loading">Loading…</div>
    <div v-else class="markdown-body" v-html="html"></div>
  </article>
</template>

<style scoped>
.md-display {
  background: var(--color-background);
  color: var(--color-heading);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 12px 14px;
}

.md-display__loading {
  color: var(--color-text);
  opacity: 0.85;
}

/* Markdown styles (match your theme) */
.markdown-body {
  font-size: 1rem;
  color: var(--color-heading);
  line-height: 1.7;
  word-wrap: break-word;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin: 0.8em 0 0.4em;
  line-height: 1.3;
}

.markdown-body p,
.markdown-body ul,
.markdown-body ol {
  margin: 0.6em 0;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 1.4em;
}

.markdown-body a {
  color: var(--color-primary);
  text-decoration: none;
}
.markdown-body a:hover {
  text-decoration: underline;
}

.markdown-body code {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  padding: 0.15em 0.4em;
  border-radius: 6px;
}
.markdown-body pre {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  padding: 10px 12px;
  border-radius: 10px;
  overflow: auto;
}
.markdown-body pre code {
  background: transparent;
  border: 0;
  padding: 0;
}

.markdown-body blockquote {
  border-left: 4px solid var(--color-gold);
  background: var(--color-background-soft);
  padding: 8px 12px;
  margin: 0.8em 0;
  border-radius: 8px;
}

.markdown-body table {
  border-collapse: collapse;
  width: 100%;
  margin: 0.6em 0;
}
.markdown-body th,
.markdown-body td {
  border: 1px solid var(--color-border);
  padding: 6px 8px;
}
.markdown-body th {
  background: var(--color-background-mute);
}

.markdown-body img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
