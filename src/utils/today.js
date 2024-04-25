export function getTodayWeekday() {
    const today = new Date();
    const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    let dayOfWeek = today.getDay();
    return daysOfWeek[dayOfWeek];
}