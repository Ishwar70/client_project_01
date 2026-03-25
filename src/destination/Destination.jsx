import { useState } from "react";
import DestinationHero from "../destination/DestinationHero";
import DestinationStats from "../destination/DestinationStats";
import DestinationGrid from "../destination/DestinationGrid";
import DestinationMap from "../destination/DestinationMap";
import DestinationCTA from "../destination/DestinationCTA";

export default function Destination() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="w-full overflow-x-hidden">
      <DestinationHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <DestinationStats />
      <DestinationGrid searchQuery={searchQuery} />
      <DestinationMap />
      {/* <DestinationCTA /> */}
    </main>
  );
}
