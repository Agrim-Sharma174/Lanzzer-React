import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import supabase from "../auth/supabaseClient";

const Dashboard = () => {

  const [user, setUser] = useState({});



  return (
    <div>
      <Card title="Dashboard Coming Soon!!"></Card>
    </div>
  );
};

export default Dashboard;
