import './index.css'
import { Routes } from '@generouted/react-router'
import dayjs from 'dayjs'
import { createRoot } from 'react-dom/client'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const root = createRoot(document.getElementById('root')!)

root.render(<Routes />)
