/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLandingPage from './components/MainLandingPage';
import ContactLeadPage from './components/ContactLeadPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/contact" element={<ContactLeadPage />} />
      </Routes>
    </BrowserRouter>
  );
}
