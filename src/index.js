import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationProvider';
import { CategoriesProvider } from './context/CategoriesProvider';
import { AuthorsProvider } from './context/AuthorsProvider';
import { CharactersProvider } from './context/CharacterProvider';
import { EpisodesProvider } from './context/EpisodesProvider';
import { MoviesProvider } from './context/MoviesProvider';
import { ActorsProvider } from './context/ActorsProvider';
import { PlanProvider } from './context/PlansProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <CategoriesProvider>
          <AuthorsProvider>
            <CharactersProvider>
              <EpisodesProvider>
                <MoviesProvider>
                  <ActorsProvider>
                    <PlanProvider>
                    <App />
                    </PlanProvider>
                  </ActorsProvider>
                </MoviesProvider>
              </EpisodesProvider>
            </CharactersProvider>
          </AuthorsProvider>
        </CategoriesProvider>
      </NotificationProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
