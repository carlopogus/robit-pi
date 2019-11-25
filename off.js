const Gpio = require('pigpio').Gpio;

const motor = new Gpio(17, {mode: Gpio.OUTPUT});

motor.pwmWrite(100);

setTimeout(() => {
  motor.pwmWrite(0)
}, 1000)
