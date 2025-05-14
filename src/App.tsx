import Sidebar from "./components/layout/Sidebar";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl text-emerald font-rpg">Welcome to GTD Quest</h1>
      </div>
    </div>
  );
}

export default App;