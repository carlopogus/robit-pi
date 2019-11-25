const Gpio = require('pigpio').Gpio;

class Controller {
  constructor(pins) {
    this.pins = pins;
    this.lf = new Gpio(14, {mode: Gpio.OUTPUT});
    this.lb = new Gpio(15, {mode: Gpio.OUTPUT});
    this.rf = new Gpio(18, {mode: Gpio.OUTPUT});
    this.rb = new Gpio(23, {mode: Gpio.OUTPUT});
    this.speed = 255;
    this.turnSpeed = 190;
    this.stop();
  }
  
  forward() {
    this.lf.pwmWrite(this.speed);
    this.rf.pwmWrite(this.speed);
    this.lb.pwmWrite(0);
    this.rb.pwmWrite(0);
    return this;
  }
  
  stop() {
    this.lf.pwmWrite(0);
    this.rf.pwmWrite(0);
    this.lb.pwmWrite(0);
    this.rb.pwmWrite(0);
    return this;
  }
  
  back() {
    this.lf.pwmWrite(0);
    this.rf.pwmWrite(0);
    this.lb.pwmWrite(this.speed);
    this.rb.pwmWrite(this.speed);
    return this;
  }
  
  turnLeft() {
    let speed = Math.round(this.speed * .75);
    this.lf.pwmWrite(0);
    this.rf.pwmWrite(this.speed);
    this.lb.pwmWrite(this.speed);
    this.rb.pwmWrite(0);
    return this;
  }
  
  turnRight() {
    let speed = Math.round(this.speed * .75);
    this.lf.pwmWrite(this.speed);
    this.rf.pwmWrite(0);
    this.lb.pwmWrite(0);
    this.rb.pwmWrite(this.speed);
    return this;
  }
}

module.exports.Controller = Controller;
