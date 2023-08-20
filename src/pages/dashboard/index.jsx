import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import supabase from "../auth/supabaseClient";

const Dashboard = () => {

  const [user, setUser] = useState({});

  useEffect(() => {
if (supabase.auth.getUser()) {
      setUser(supabase.auth.getUser());
    }
    console.log(user);
  }, []);

  return (
    <div>
      <Card title="Starter Kit">Your Dashboard</Card>
    </div>
  );
};

export default Dashboard;
