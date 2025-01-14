import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/redux/store.ts';
import { initHistory } from './utils/history.ts';

const root = createRoot(document.getElementById('root')!);

root.render(
    <StrictMode>
        <Provider store={store}>
            <App history={initHistory(store)} />
        </Provider>
    </StrictMode>,
)