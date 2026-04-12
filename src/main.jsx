import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import './index.css'
import './font/iconfont.css'
import App from './App.jsx'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import {Provider} from 'react-redux'
import store from '@/redux/store.js'
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <ConfigProvider locale={zhCN}>
                <App />
            </ConfigProvider>
        </BrowserRouter>
    </Provider>
)
