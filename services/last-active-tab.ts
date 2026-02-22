export type NavTab = "overview" | "analysis" | "statistics" | "settings";

let lastActiveTab: NavTab = "overview";

export function getLastActiveTab(): NavTab {
  return lastActiveTab;
}

export function setLastActiveTab(tab: NavTab): void {
  lastActiveTab = tab;
}
