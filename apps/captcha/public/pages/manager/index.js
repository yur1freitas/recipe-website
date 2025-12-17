'use strict'

import htm from 'htm'

import { h, render } from 'preact'

import { ManagerPage } from './components/ManagerPage.js'

const html = htm.bind(h)

render(html`<${ManagerPage}/>`, document.getElementById('root'))
