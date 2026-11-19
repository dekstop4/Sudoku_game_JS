export function createHeader(): HTMLElement {
  const header = document.createElement('header')
  header.className = 'site-header'
  const inner = document.createElement('div')
  inner.className = 'header-inner'
  const brand = document.createElement('a')
  brand.className = 'brand'
  brand.href = '/'
  brand.innerHTML = '<span class="brand-mark" aria-hidden="true">9</span><span>Судоку</span>'

  const nav = document.createElement('nav')
  nav.className = 'site-nav'
  nav.setAttribute('aria-label', 'Основная навигация')
  for (const [label, href] of [
    ['Главная', '/'],
    ['Играть', '/game/easy'],
    ['Правила', '/rules'],
    ['О проекте', '/about']
  ]) {
    const link = document.createElement('a')
    link.href = href
    link.textContent = label
    nav.append(link)
  }
  inner.append(brand, nav)
  header.append(inner)
  return header
}
