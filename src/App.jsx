import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import("./pages/dashboard"));
const Trustpilot = lazy(() => import("./pages/trustpilot"));
const Login = lazy(() => import("./pages/auth/Login"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const Error404 = lazy(() => import("./pages/404"));
const InvoiceDisplay = lazy(() => import("./pages/invoiceDisplay"));
const InvoiceAdd = lazy(() => import("./pages/invoiceAdd"));
const InvoiceEdit = lazy(() => import("./pages/inoviceEdit"));
const InvoicePreview = lazy(() => import("./pages/invoicePreview"));
const QuotationDisplay = lazy(() => import("./pages/quotationDisplay"));
const QuotationAdd = lazy(() => import("./pages/quotationAdd"));
const QuotationEdit = lazy(() => import("./pages/quotationEdit"));
const QuotationPreview = lazy(() => import("./pages/quotationPreview"));
import Layout from "./layout/Layout";
function App() {
  return (
    <main className="App  relative">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
            //hello world this is parrl]
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<Loading />}>
              <SignUp />
            </Suspense>
          }
        />

        <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route
            path="invoices"
            element={
              <Suspense>
                <InvoiceDisplay />
              </Suspense>
            }
          />
          <Route
            path="invoices/add"
            element={
              <Suspense>
                <InvoiceAdd />
              </Suspense>
            }
          />
          <Route
            path="invoices/edit/:id"
            element={
              <Suspense>
                <InvoiceEdit />
              </Suspense>
            }
          />
          <Route
            path="invoices/preview/:id"
            element={
              <Suspense>
                <InvoicePreview />
              </Suspense>
            }
          />
          <Route
            path="quotation"
            element={
              <Suspense>
                <QuotationDisplay />
              </Suspense>
            }
          />
          <Route
            path="quotation/add"
            element={
              <Suspense>
                <QuotationAdd />
              </Suspense>
            }
          />
          <Route
            path="quotation/edit/:id"
            element={
              <Suspense>
                <QuotationEdit />
              </Suspense>
            }
          />

          <Route
            path="quotation/preview/:id"
            element={
              <Suspense>
                <QuotationPreview />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>

        <Route
          path="/404"
          element={
            <Suspense fallback={<Loading />}>
              <Error404 />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
