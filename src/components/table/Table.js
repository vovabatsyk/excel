import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.component'

export class Table extends ExcelComponent {
  static className = 'exel__table'

  toHTML() {
    return createTable(20)
  }
}
