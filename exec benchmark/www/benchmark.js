window.noop = function (execFunc, callback) {
  execFunc(callback, null, "com.phonegap.testing", "noop", []);
}

window.execNoop = function (callback) {
  noop(PhoneGap.exec, callback);
}

window.fastExecNoop = function (callback) {
  noop(PhoneGap.fastExec, callback);
}

window.measure = function (desc, func, numCommands, numAtATime, onDone) {
  var allCommandsLeft = numCommands;

  var runNextGroup = function () {
    if (allCommandsLeft == 0) {
      var after = new Date;
      var elapsed = after.getTime() - before.getTime();

      console.log(desc + ": " + elapsed + "ms.");
      onDone();
    } else {
      var i;
      var groupCommandsLeft = Math.min(numAtATime, allCommandsLeft);
      for (i=0; i < groupCommandsLeft; i++) {
        func(function () {
          groupCommandsLeft--;

          if (groupCommandsLeft == 0) {
            runNextGroup();
          }
        });
      }

      allCommandsLeft -= numAtATime;
    }
  }

  var before = new Date;
  runNextGroup();
}

window.onDeviceReady = function () {
  var benchmarks = [];

  benchmarks.push(function (onDone) {
    measure("exec() 1000 commands, 1 at a time", execNoop, 1000, 1, onDone);
  });
  benchmarks.push(function (onDone) {
    measure("exec() 1000 commands, 5 at a time", execNoop, 1000, 5, onDone);
  });
  benchmarks.push(function (onDone) {
    measure("exec() 1000 commands, 10 at a time", execNoop, 1000, 10, onDone);
  });
  benchmarks.push(function (onDone) {
    measure("exec() 1000 commands, 50 at a time", execNoop, 1000, 50, onDone);
  });
  benchmarks.push(function (onDone) {
    measure("exec() 1000 commands, 100 at a time", execNoop, 1000, 100, onDone);
  });

  benchmarks.push(function (onDone) {
    measure("fastExec() 1000 commands, 1 at a time", fastExecNoop, 1000, 1, onDone);
  });
  benchmarks.push(function (onDone) {
    measure("fastExec() 1000 commands, 5 at a time", fastExecNoop, 1000, 5, onDone);
  });
  benchmarks.push(function (onDone) {
    measure("fastExec() 1000 commands, 10 at a time", fastExecNoop, 1000, 10, onDone);
  });
  benchmarks.push(function (onDone) {
    measure("fastExec() 1000 commands, 50 at a time", fastExecNoop, 1000, 50, onDone);
  });
  benchmarks.push(function (onDone) {
    measure("fastExec() 1000 commands, 100 at a time", fastExecNoop, 1000, 100, onDone);
  });

  benchmarks.push(function (onDone) {
    PhoneGap.exec(onDone, null, "com.phonegap.testing", "benchmark", []);
  });

  runNextBenchmark = function () {
    benchmark = benchmarks.shift();

    if (benchmark) {
      benchmark(runNextBenchmark);
    }
  }

  runNextBenchmark();
}

