import "./App.css";
import Layout from "./components/Layout/Layout";
import Calendar from "./components/Calendar";

function App() {
  return (
    <div className="App">
      <Layout>
        <Calendar />
      </Layout>
    </div>
  );
}

export default App;
