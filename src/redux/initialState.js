import {storage} from '../core/utils'
import { defaultStyles, defaultTitle } from '@/constants'
const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  stylesState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState
