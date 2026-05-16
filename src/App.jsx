import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserData from "./components/UserData";
import Account from "./pages/Account";
import BusinessProfile from "./pages/BusinessProfile";
import Address from "./pages/AddressGeography";
import Owners from "./pages/Owners";
import ErrorPage from "./pages/ErrorPage";
import Review from "./pages/Review";
 
function App() {
  // ! TODO : add error page for unsupported urls. will have default page. its in Workoutwings code
  // ? save info of previous pages session storage in json format so u can show on review page
  // ! add back button and proper validations
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Account />}/>
        <Route path="/business" element={<BusinessProfile />}/>
        <Route path="/address" element={<Address />} />
        <Route path="/owners" element={<Owners />} />
         <Route path="/review" element={<Review />} />
         <Route path="*" element={<ErrorPage />} />
        
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;