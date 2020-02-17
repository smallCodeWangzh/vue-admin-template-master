import defaultSettings from '@/settings'

const title = defaultSettings.title || '看点咨询后台管理'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
