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