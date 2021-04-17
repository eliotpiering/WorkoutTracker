import { Lift, RestBlock } from "./Lift";
export interface Superset {
  name: string;
  lifts: Array<Lift | RestBlock>;
}
