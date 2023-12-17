export const formatDate = (date: Date): string => {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);

  const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  if (daysDifference === 0) {
    return `Сегодня, ${formattedTime}`;
  } else if (daysDifference === 1) {
    return `Вчера, ${formattedTime}`;
  } else {
    if(daysDifference >= 5){
      return `${daysDifference} дней назад, ${formattedTime}`;
    }
    return `${daysDifference} дня назад, ${formattedTime}`;
  }
}
  
  