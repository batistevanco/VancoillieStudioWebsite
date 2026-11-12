/** Componenten praten met elkaar via window-events in plaats van gedeelde state. */
export const ISLAND_EVENT = "studio:island";

export type IslandIcon = "check" | "mail" | "download" | "error";

export interface IslandMessage {
  text: string;
  icon?: IslandIcon;
}

export function notifyIsland(text: string, icon: IslandIcon = "check") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<IslandMessage>(ISLAND_EVENT, { detail: { text, icon } }));
}
