function ukrainianDate(string) {
    return (new Date(string))
        .toLocaleDateString('uk-ua', { weekday: 'long', month: 'long', day: 'numeric' });
};

export { ukrainianDate };