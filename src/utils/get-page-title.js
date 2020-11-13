import defaultSettings from '@/settings'

const title = defaultSettings.title || '莫斯文化馆'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
