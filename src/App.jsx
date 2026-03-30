import { BrowserRouter, Routes, Route } from "react-router-dom";
import TitleFront from "./components/Title";
import Feature from "./components/feature";
import Gallery from "./components/gallery";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <TitleFront/>
            <Feature/>
          </>
        } />
        <Route path="/gallery" element={<Gallery/>} />
      </Routes>
    </BrowserRouter>
  );
}