function ukrainianDate(string) {
    return (new Date(string))
        .toLocaleDateString('uk-ua', { weekday: 'short', month: 'short', day: 'numeric' });
};

export { ukrainianDate };