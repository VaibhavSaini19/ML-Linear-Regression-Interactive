class LinearRegression {

  constructor(lr = 0.0000000001) {
    this.lr = lr;
    this.m = 0//Math.random();
    this.c = 0//Math.random() * 400;
    this.num_samples = 0;
  }

  fit(points) {
    this.points = points;
    this.num_samples = points.length;
    if (this.num_samples > 1) {
      let error, prevError = this.J_cost();
      let c_temp = 0, m_temp = 0, iters = 0;
      for(let i=0; i<100; i++){
        let hypo = this.hypothesis();
        for (let i = 0; i < this.num_samples; i++) {
          c_temp += -(this.points[i].y - hypo[i]);
          m_temp += -(this.points[i].y - hypo[i]) * this.points[i].x;
        }
        this.c -= (0.001) * c_temp;
        this.m -= (this.lr / this.num_samples) * m_temp;
        error = this.J_cost();
        if (error > prevError) break;
        prevError = error;
        iters += 1;
      }
      // console.log(error);
    }
  }

  hypothesis() {
    let hypo = [];
    for (let pt of this.points) {
      hypo.push(this.m * pt.x + this.c);
    }
    return hypo;
  }

  J_cost() {
    let hypo = this.hypothesis();
    let summ = 0;
    for (let i = 0; i < this.num_samples; i++) {
      summ += Math.pow(this.points[i].y - hypo[i], 2);
    }
    return (summ) / (2 * this.num_samples);
  }


  show() {
    strokeWeight(4);
    for (let pt of points)
      point(pt.x, pt.y);
    strokeWeight(1);
    if (this.num_samples > 1)
      line(0, this.c, width, (this.m * width + this.c));
  }
}