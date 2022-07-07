import './App.css';
import React from 'react';
import Spiner from './component/atoms/Spiner';
import { Routes, Route } from 'react-router-dom';
import {
  ProtectedRoute,
  ProtectedRouteLogRes,
} from './component/protected/ProtectedRoutes';
import UpdateCustomer from './component/pages/UpdateCustomer';
const Customers = React.lazy(() => import('./component/pages/Customers'));
const Halaman2 = React.lazy(() => import('./component/pages/Halaman2'));
const Halaman3 = React.lazy(() => import('./component/pages/Halaman3'));
const Halaman4 = React.lazy(() => import('./component/pages/Halaman4'));
const Login = React.lazy(() => import('./component/pages/Login'));
const CreateCustomer = React.lazy(() =>
  import('./component/pages/CreateCustomer')
);
function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <React.Suspense
                fallback={
                  <div>
                    <Spiner />
                  </div>
                }
              >
                <Customers />
              </React.Suspense>
            }
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/create"
            element={
              <React.Suspense
                fallback={
                  <div>
                    <Spiner />
                  </div>
                }
              >
                <CreateCustomer />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/update/:userId"
            element={
              <React.Suspense
                fallback={
                  <div>
                    <Spiner />
                  </div>
                }
              >
                <UpdateCustomer />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/halaman2"
            element={
              <React.Suspense
                fallback={
                  <div>
                    <Spiner />
                  </div>
                }
              >
                <Halaman2 />
              </React.Suspense>
            }
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/halaman3"
            element={
              <React.Suspense
                fallback={
                  <div>
                    <Spiner />
                  </div>
                }
              >
                <Halaman3 />
              </React.Suspense>
            }
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/halaman4"
            element={
              <React.Suspense
                fallback={
                  <div>
                    <Spiner />
                  </div>
                }
              >
                <Halaman4 />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRouteLogRes />}>
          <Route
            path="/login"
            element={
              <React.Suspense
                fallback={
                  <div>
                    <Spiner />
                  </div>
                }
              >
                <Login />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
