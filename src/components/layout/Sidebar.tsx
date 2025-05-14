const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-dark p-4">
      <h2 className="text-emerald text-lg font-rpg">GTD Quest</h2>
      <ul className="mt-4">
        <li className="text-white hover:text-emerald">Dashboard</li>
        <li className="text-white hover:text-emerald">Capture</li>
        <li className="text-white hover:text-emerald">Clarify</li>
        <li className="text-white hover:text-emerald">Organize</li>
        <li className="text-white hover:text-emerald">Reflect</li>
        <li className="text-white hover:text-emerald">Engage</li>
      </ul>
    </div>
  );
};

export default Sidebar;