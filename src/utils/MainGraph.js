function getTheValue(obj, path) {
    return path.reduce((step, key) => step[key], obj);
}

class Graph {
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

export default Graph;