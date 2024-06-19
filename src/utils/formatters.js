function ukrainianDate(date, hideDay) {
    const options = {
        // weekday: hideDay ? null : 'short',
        month: 'short',
        day: 'numeric'
    };

    if(!hideDay) {
        options.weekday = 'short';
    }
    
    return (new Date(date)).toLocaleDateString('uk-ua', options);
};

export { ukrainianDate };