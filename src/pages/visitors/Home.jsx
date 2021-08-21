import React from "react";

import VisitorLayout from "../../components/visitor/layouts/VisitorLayout";
import HomeMain from "../../components/visitor/home/HomeMain";

import "../../sass/style.css";

function Home() {
  return (
    <VisitorLayout>
      <HomeMain />
    </VisitorLayout>
  );
}

export default Home;
