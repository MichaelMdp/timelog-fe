import moment from "moment";
import firstDayOfTheWeek from "../dateUtil"


describe('dateUtil', () => {
    it('returns firstday for a monday', () => {
        const firstDay = firstDayOfTheWeek(moment('2023-01-09')) 
        expect(firstDay.format('dddd')).toBe('Monday')
      }); 
      it('returns firstday for a tuesday', () => {
        const firstDay = firstDayOfTheWeek(moment('2023-01-10'))
    
        expect(firstDay.format('dddd')).toBe('Monday')
      });
      it('returns firstday for a sunday', () => {
        const firstDay = firstDayOfTheWeek(moment('2023-01-15'))
        expect(firstDay.format('dddd')).toBe('Monday')
        expect(firstDay.format('YYYY-MM-DD')).toBe('2023-01-09')
      });
});
