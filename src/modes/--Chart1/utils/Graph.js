class Graph {
    constructor(name, background, color, borderWidth, data) {
        this.label = name;
        this.fill = !!background;
        this.backgroundColor = background || 'white';
        this.borderColor = color;
        this.borderWidth = borderWidth;
        this.pointRadius = 0;
        this.data = data;
    }
};

export default Graph;