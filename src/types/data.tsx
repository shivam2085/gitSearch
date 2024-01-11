export interface cardData {
  name: string;
  owner?: {
    avatar_url?: string;
  };
  language: string;
  description: string;
  stargazers_count: number;
}
export interface DropDownOption {
  label: string;
  id: string;
}

export const dropDownJson = [
  { label: "Most stars", id: "stargazers_count" },
  { label: "Most Watchers", id: "watchers_count" },
  { label: "Score", id: "score" },
  { label: "New", id: "created_at" },
  { label: "Recently updated", id: "updated_at" },
];
