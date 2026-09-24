import React from "react";
import Navigation from "./components/Navigation.jsx";
import GlobalGrid from "./components/GlobalGrid.jsx";
import HeroStory from "./components/HeroStory.jsx";
import SessionIntro from "./components/SessionIntro.jsx";
import SessionStory from "./components/SessionStory.jsx";
import SessionDetail from "./components/SessionDetail.jsx";
import SectionTransition from "./components/SectionTransition.jsx";
import EndTransition from "./components/EndTransition.jsx";
import ArrangementSection from "./components/ArrangementSection.jsx";
import ShapeSection from "./components/ShapeSection.jsx";
import PerformSection from "./components/PerformSection.jsx";
import LiveSection from "./components/LiveSection.jsx";
import FinalCTA from "./components/FinalCTA.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Navigation />
      <GlobalGrid />
      <main id="top">
        <HeroStory />
        <SectionTransition />
        <SessionIntro />
        <SessionStory />
        <SessionDetail />
        <EndTransition />
        <ArrangementSection />
        <ShapeSection />
        <PerformSection />
        <LiveSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
