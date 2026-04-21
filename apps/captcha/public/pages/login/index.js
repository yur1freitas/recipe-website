'use strict'

import { h, render } from 'preact'
import htm from 'htm'

import { Login } from './components/Login.js'

const html = htm.bind(h)

render(html`<${Login} />`, document.getElementById('root'))
