import moment from "moment";
import { WorkEntry } from "../components/Calendar";

export default class LocalStorageUtil {
  private static LOCALSTORAGE_KEY = "entries";

  static getEntries(): WorkEntry[] | null {
    const item = localStorage.getItem(LocalStorageUtil.LOCALSTORAGE_KEY);
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
      LocalStorageUtil.LOCALSTORAGE_KEY,
      JSON.stringify(value)
    );
  }
}
