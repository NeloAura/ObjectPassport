
import { Routes, Route } from "react-router-dom";
import ObjectPassportCard from './components/OwnerPassport';
import CertifierCard from './components/CertiffierPassport';
import MaintenanceCard from './components/MaintanancePassport';
// import Test from './components/Test';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ObjectPassportCard />} />
        <Route path="/m" element={<MaintenanceCard />} />
        <Route path="/c" element={<CertifierCard />} />
      </Routes>
    </div>
  );
}

export default App;
