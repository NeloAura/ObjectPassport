
import { Routes, Route } from "react-router-dom";
import { SaasProvider } from '@saas-ui/react'
import ObjectPassportCard from './components/OwnerPassport';
import CertifierCard from './components/CertiffierPassport';
import MaintenanceCard from './components/MaintanancePassport';
import AuraPassportPage from "./components/Login";
import PassportEvent from "./components/PassportEvent";

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
