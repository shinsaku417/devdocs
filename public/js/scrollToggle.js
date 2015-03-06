var ScrollToggle = function (top, callbackShow, callbackHide) {
    this.ontop = 0;
    this.hontop = 0;
    this.top = top;

    this.onbot = 0;
    this.honbot = 1;
    this.bot = top + 20;

    this.show = callbackShow;
    this.hide = callbackHide;
    var self = this;

    (function () {
        $('.documentation').scroll(function (event) {
            var y = $('.documentation').scrollTop();

            if (y - self.top >= -70 && y - self.top <= 30)
                self.ontop = 1;
            else
                self.ontop = 0;

            if (self.ontop !== self.hontop) {
                if (self.ontop) {
                    self.show();
                }
                else {
                    self.hide();
                }
            }
            self.hontop = (self.ontop * 1);

            if (y <= self.onbot)
              self.onbot = 1;
            else
              self.onbot = 0;

            if (self.onbot !== self.onbot) {
                if (self.onbot) {
                    self.show();
                }
                else {
                    self.hide();
                }
            }
            self.onbot = (self.onbot * 1);
        });
    })();
};
