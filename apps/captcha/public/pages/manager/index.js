'use strict'

import { h, render } from 'preact'
import htm from 'htm'

import { ManagerPage } from './components/ManagerPage.js'

const html = htm.bind(h)

render(html`<${ManagerPage}/>`, document.getElementById('root'))
