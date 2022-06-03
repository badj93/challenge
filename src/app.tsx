import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Breadcrumbs } from './common';
import { Card, Cards, Transaction, Transactions } from './modules';

export const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter basename='/home'>
        <Breadcrumbs />
        <Routes>
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/transactions/:transactionID' element={<Transaction />} />
          <Route path='/cards' element={<Cards />} />
          <Route path='/cards/:cardID' element={<Card />} />
          <Route path='/cards/:cardID/transactions' element={<Transactions />} />
          <Route path='/cards/:cardID/transactions/:transactionID' element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};
