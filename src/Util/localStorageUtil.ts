import moment from "moment";
import { WorkEntry } from "../components/Calendar";

export default class LocalStorageUtil {
  private static LOCALSTORAGE_KEY = "entries";

  static getEntries(): WorkEntry[] | null {
    const item = localStorage.getItem(this.LOCALSTORAGE_KEY);
    if (item) {
      const parsedValues = JSON.parse(item, (key, value) => {
        if (key === "startTime") {
          return moment(value);
        }
        return value;
      });
      return parsedValues as WorkEntry[];
    }
    return null;
  }

  static storeEntries(value: WorkEntry[]): void {
    localStorage.setItem(
      this.LOCALSTORAGE_KEY,
      JSON.stringify(value)
    );
  }

  static ClearEntries(): void {
    localStorage.removeItem(this.LOCALSTORAGE_KEY)
  }
}
