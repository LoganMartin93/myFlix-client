import { createRoot } from "react-dom/client";
import { MainView } from "./components/MainView/main-view";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
    return (
      <BrowserRouter>
          <div className="my-flix">
            <MainView/>
          </div>
      </BrowserRouter>
    );
  };
  
  // Finds the root of your app
  const container = document.querySelector("#root");
  const root = createRoot(container);
  
  // Tells React to render your app in the root DOM element
  root.render(<MyFlixApplication />);