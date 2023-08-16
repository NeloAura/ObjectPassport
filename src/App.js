
import { Routes, Route } from "react-router-dom";
import { SaasProvider } from '@saas-ui/react'
import ObjectPassportCard from './pages/OwnerPassport';
import CertifierCard from './pages/CertiffierPassport';
import MaintenanceCard from './pages/MaintanancePassport';
import AuraPassportPage from "./pages/Login";
import PassportEvent from "./pages/PassportEvent";

function App() {
  return (
    <SaasProvider> 
    <div className="App">
      <Routes>
        <Route path="/" element={<AuraPassportPage />} />
        <Route path="/o" element={<ObjectPassportCard />}/>
        <Route path="/m" element={<MaintenanceCard />} />
        <Route path="/c" element={<CertifierCard />} />
        <Route path="/p/:id" element={<PassportEvent />} /> 
      </Routes>
    </div>
    </SaasProvider>
  );
}

export default App;
