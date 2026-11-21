import './styles.css'
import { mountRouter } from './router'

const app = document.querySelector<HTMLElement>('#app')

if (app) {
  mountRouter(app)
}
