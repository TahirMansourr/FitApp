export const getDaysOfTheWeek = () => {
 
    const  today = new Date()
    const PastWeek = [];
   
    for( let i = 6 ; i>=0 ; i--){
        const PastDate = new Date(today)
        PastDate.setDate(today.getDate() - i)
        PastWeek.push(PastDate)
    }
    
    return PastWeek.reverse();
 }

 export const areDatesEqual = (date1 : Date , date2 : Date) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
  }