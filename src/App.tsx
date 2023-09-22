import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { pages } from './constants/menus';
import Header from './layout/Header';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {pages.map(({ path, Component, pages }) => {
            if (Array.isArray(pages) && pages.length > 0) {
              return (
                <Route path={path} element={Component && <Component />}>
                  {pages.map(({ path, Component, pages }) => {
                    if (Array.isArray(pages) && pages.length > 0) {
                      return (
                        <Route path={path} element={Component && <Component />}>
                          {pages.map(({ path, Component, pages }) => {
                            return (
                              <Route
                                path={path}
                                element={Component && <Component />}
                              />
                            );
                          })}
                        </Route>
                      );
                    }
                    return (
                      <Route path={path} element={Component && <Component />} />
                    );
                  })}
                </Route>
              );
            }
            return <Route path={path} element={Component && <Component />} />;
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
