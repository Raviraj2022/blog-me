import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPost from "../components/DashPost";
import DashUser from "../components/DashUser";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    // console.log(tabFormUrl);
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className=" md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/*  profile... */}

      {tab === "profile" && <DashProfile />}
      {/* Posts */}
      {tab === "posts" && <DashPost />}
      {/* {Users} */}
      {tab === "users" && <DashUser />}
    </div>
  );
};

export default Dashboard;
