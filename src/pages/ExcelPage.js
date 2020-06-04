import { Page } from '@core/Page'
import { rootReducer } from '../redux/rootReducer'
import { normalizeInitialState } from '../redux/initialState'
import { debounce, storage } from '../core/utils'
import { createStore } from '../core/createStore'
import { Excel } from '../components/excel/Excel'
import { Table } from '../components/table/Table'
import { Header } from '../components/header/Header'
import { Formula } from '../components/formula/Formula'
import { Toolbar } from '../components/toolbar/Toolbar'

function storageName(param) {
  return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()

    const state = storage(storageName(params))
    const initialState = normalizeInitialState(state)
    const store = createStore(rootReducer, initialState)

    const stateListeners = debounce(state => {
      storage(storageName(params), state)
    }, 300)

    store.subscribe(stateListeners)

     this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
