if (document.getElementById("typed") !== null) {
    var typed = new Typed("#typed", {
      strings: ["I'm a web developer ^1000", "I'm a Software engineer ^1000", "and i do automation"],
      smartBackspace: true, // Default value,
      typeSpeed: 50,
      startDelay: 3000,
      loop: true,
    });
  }