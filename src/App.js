
import { Routes, Route } from "react-router-dom";
import ObjectPassportCard from './components/OwnerPassport';
import CertifierCard from './components/CertiffierPassport';
import MaintenanceCard from './components/MaintanancePassport';
import AuraPassportPage from "./components/Login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuraPassportPage />} />
        <Route path="/o" element={<ObjectPassportCard />}/>
        <Route path="/m" element={<MaintenanceCard />} />
        <Route path="/c" element={<CertifierCard />} />
      </Routes>
    </div>
  );
}

export default App;
