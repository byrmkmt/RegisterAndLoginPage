import "./assets/index.css";
import BasicTabs from './RegisterLoginTabs'
import { ErrorProvider } from './contexts/ErrorContext';

export default function App(props) {

  return (
    <>
    <div className="container" style= {{ height: "100vh" }}>
      <div className="login_registrar">
        <ErrorProvider>
          <BasicTabs></BasicTabs>
        </ErrorProvider>
      </div>
    </div>
    </>
  );
} 