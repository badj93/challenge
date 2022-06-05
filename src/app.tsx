import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Breadcrumbs, Navigation } from './common';
import { Card, Cards, Transaction, Transactions, Filters } from './modules';

export const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter basename='/home'>
        <Navigation
          routes={[
            { name: 'Transactions', to: '/transactions' },
            { name: 'Cards', to: '/cards' },
          ]}
        />
        <Breadcrumbs />
        <Filters />
        <Routes>
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/transactions/:transactionID' element={<Transaction />} />
          <Route path='/transactions/:transactionID/:cardID' element={<Card />} />
          <Route path='/cards' element={<Cards />} />
          <Route path='/cards/:cardID' element={<Card />} />
          <Route path='/cards/:cardID/transactions' element={<Transactions />} />
          <Route path='/cards/:cardID/transactions/:transactionID' element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};
