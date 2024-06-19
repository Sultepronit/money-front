function getTheValue(obj, path) {
    return path.reduce((step, key) => step[key], obj);
}

class LineSet {
    constructor(name, background, color, borderWidth, data, valuePath) {
        this.label = name;
        this.fill = !!background;
        this.backgroundColor = background || 'white';
        this.borderColor = color;
        this.borderWidth = borderWidth;
        this.pointRadius = 0;
        this.data = data.value.map(entry => [
            entry.date,
            getTheValue(entry, valuePath)
        ]);
    }
};

class BarSet {
    constructor(name, background, color, borderWidth, data, category, reverse) {
        this.label = name;
        this.backgroundColor = background;
        this.borderColor = color;
        this.borderWidth = borderWidth;
        // this.barThickness = 10;
        // this.pointRadius = 0;
        this.data = data.map(entry => {
            return {
                x: entry.date,
                y: reverse ? reverse * entry[category] : entry[category]
            }
        });
    }
};

export { LineSet, BarSet };