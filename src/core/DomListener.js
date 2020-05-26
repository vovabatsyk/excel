import { capitalize } from './utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) throw new Error(`No $root provided from DomListener`)
    this.$root = $root
    this.listeners = listeners
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
          `Method ${method} is not implemented in ${this.name} Component`
        )
      }
      // addEventListener
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
