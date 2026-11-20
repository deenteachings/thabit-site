"use client";

import { useSyncExternalStore } from "react";
import { greetingFor } from "@/components/site/data";

const subscribe = () => () => {};

// The app's own greeting for the reader's local hour ("Still awake" after
// midnight). Rendered on the client only, so the server's clock never shows.
export default function Greeting() {
  const greeting = useSyncExternalStore(
    subscribe,
    () => greetingFor(new Date().getHours()),
    () => null,
  );
  return (
    <span className="greeting" data-ready={greeting ? "" : undefined}>
      {greeting ?? " "}
    </span>
  );
}
