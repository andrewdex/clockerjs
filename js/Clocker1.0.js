/*
ClokerJS Customized-Clock Library [Pure JavaScript] 
Author:  Dilusha Gonagala
License:  MIT
Version : 1.0
*/


(function (window, undefined) {


    // Use the correct document accordingly with window argument (sandbox)
    var document = window.document;

    //Global Namespace


    window.Clocker = {

        valid: {

            stat: true
        }

       
    };

  
    if (window.Clocker === undefined || window.Clocker === null) {

        throw new Error('Please check and make sure Clocker.js is included in the page and is loaded prior to this script.');

    }



    //Global Variables
    var timeDiffD, timeoutD, timeDiffD2, timeoutD2;



    //Global Object For ClockerJs

    window.Clocker = {

        //Options
        //Default Options
        Options: {
            Border: true,
            BorderColor: "#000000",
            Clocks: '1',
            Background: "#FFFFFF",
            StrokeWidth: "5",
            HourStroke: "#000000",
            MinuteStroke: "#000000",
            SecondStroke: "#000000"
        },

        //
        About: {

            author: "Dilusha Gonagala",
            version: "1.0"
        },

        //Theme Name Options
        Theme: {

            ThemeName: "default"

        },

        //Themes

        //Default Theme
        Theme_Default: {
            Border: true,
            BorderColor: "#000000",
            Clocks: '1',
            Background: "#FFFFFF",
            StrokeWidth: "5",
            HourStroke: "#000000",
            MinuteStroke: "#000000",
            SecondStroke: "#000000"
        },

        //Theme Pinky
        Theme_Pinky: {

            Border: true,
            BorderColor: "#000000",
            Clocks: '1',
            Background: "#990099",
            StrokeWidth: "5",
            HourStroke: "#FFFFFF",
            MinuteStroke: "#FFFFFF",
            SecondStroke: "#FFFFFF"

        },


        //Theme Aqua
        Theme_Blue: {

            Border: true,
            BorderColor: "#000000",
            Clocks: '1',
            Background: "#0066CC",
            StrokeWidth: "5",
            HourStroke: "#FFFFFF",
            MinuteStroke: "#FFFFFF",
            SecondStroke: "#FFFFFF"

        },

        //Theme Green
        Theme_Green: {

            Border: true,
            BorderColor: "#000000",
            Clocks: '1',
            Background: "#006666",
            StrokeWidth: "5",
            HourStroke: "#FFFFFF",
            MinuteStroke: "#FFFFFF",
            SecondStroke: "#FFFFFF"

        },



        //Global Option Setter
        SetOptions: function (newOptions) {



            if (typeof newOptions === "object") {

                this.Options = newOptions;

                if (!this.Options.BorderColor) {

                    this.Options.BorderColor = "#000000";

                }

                if (!this.Options.Background) {

                    this.Options.Background = "#FFFFFF";

                }

                if (!this.Options.HourStroke) {

                    this.Options.HourStroke = "#000000";

                }

                if (!this.Options.MinuteStroke) {

                    this.Options.MinuteStroke = "#000000";

                }

                if (!this.Options.SecondStroke) {

                    this.Options.SecondStroke = "#000000";

                }

                if (!this.Options.StrokeWidth) {

                    this.Options.StrokeWidth = "5";

                }

                if (!this.Options.Val) {

                    this.Options.Val = "def";

                }


            }
        },

        //Theme Setter

        SetTheme: function (newOptions) {



            if (typeof newOptions === "object") {

                this.Theme = newOptions;

                if (this.Theme.ThemeName === "default") {

                    this.Options = Clocker.Theme_Default;
                }

                if (this.Theme.ThemeName === "pinky") {

                    this.Options = Clocker.Theme_Pinky;
                }

                if (this.Theme.ThemeName === "blue") {

                    this.Options = Clocker.Theme_Blue;
                }
                if (this.Theme.ThemeName === "green") {

                    this.Options = Clocker.Theme_Green;
                }

            }

        },

        //Clock Canvas And Math Calculations
        //Drawing function for clock
        CurrentClock: function (clock) {



            canvas = Raphael(clock, 200, 200);
            clock = canvas.circle(100, 100, 95);
            clock.attr({
                "fill": "#f5f5f5",
                "stroke": "#444444",
                "stroke-width": "5"
            });
            var hour_sign;
            for (i = 0; i < 12; i++) {
                var start_x = 100 + Math.round(80 * Math.cos(30 * i * Math.PI / 180));
                var start_y = 100 + Math.round(80 * Math.sin(30 * i * Math.PI / 180));
                var end_x = 100 + Math.round(90 * Math.cos(30 * i * Math.PI / 180));
                var end_y = 100 + Math.round(90 * Math.sin(30 * i * Math.PI / 180));
                hour_sign = canvas.path("M" + start_x + " " + start_y + "L" + end_x + " " + end_y);
            }
            hour_hand = canvas.path("M100 100L100 50");
            hour_hand.attr({
                stroke: "#444444",
                "stroke-width": 6
            });
            minute_hand = canvas.path("M100 100L100 40");
            minute_hand.attr({
                stroke: "#444444",
                "stroke-width": 4
            });
            second_hand = canvas.path("M100 110L100 25");
            second_hand.attr({
                stroke: "#444444",
                "stroke-width": 2
            });
            var pin = canvas.circle(100, 100, 5);
            pin.attr("fill", "#000000");
            Clocker.updateCurrent();
            setInterval("Clocker.updateCurrent()", 1000);

        },

        //update function for the clock interval
        updateCurrent: function () {

            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();
            hour_hand.rotate(30 * hours + (minutes / 2.5), 100, 100);
            minute_hand.rotate(6 * minutes, 100, 100);
            second_hand.rotate(6 * seconds, 100, 100);

        },


        //Custom Clock Handlers
        addZD: function (n) {
            return (n < 10 ? '0' : '') + n;
        },

        //Format Time parssed
        formatTimeD: function (d) {
            return Clocker.addZD(d.getHours()) + ':' +
                Clocker.addZD(d.getMinutes()) + ':' +
                Clocker.addZD(d.getSeconds());
        },

        //Custom Clock
        CustomClock: function (clock) {

            if (clock != "") {

                canvas = Raphael(clock, 200, 200);
                clock = canvas.circle(100, 100, 95);
                clock.attr({
                    "fill": Clocker.Options.Background,
                    "stroke": Clocker.Options.BorderColor,
                    "stroke-width": Clocker.Options.StrokeWidth
                });
                var hour_sign;
                for (i = 0; i < 12; i++) {
                    var start_x = 100 + Math.round(80 * Math.cos(30 * i * Math.PI / 180));
                    var start_y = 100 + Math.round(80 * Math.sin(30 * i * Math.PI / 180));
                    var end_x = 100 + Math.round(90 * Math.cos(30 * i * Math.PI / 180));
                    var end_y = 100 + Math.round(90 * Math.sin(30 * i * Math.PI / 180));
                    hour_sign = canvas.path("M" + start_x + " " + start_y + "L" + end_x + " " + end_y);
                }

                hour_hand1 = canvas.path("M100 100L100 50");
                hour_hand1.attr({
                    stroke: Clocker.Options.HourStroke,
                    "stroke-width": 6
                });
                minute_hand1 = canvas.path("M100 100L100 40");
                minute_hand1.attr({
                    stroke: Clocker.Options.MinuteStroke,
                    "stroke-width": 4
                });
                second_hand1 = canvas.path("M100 110L100 25");
                second_hand1.attr({
                    stroke: Clocker.Options.SecondStroke,
                    "stroke-width": 2
                });
                var pin = canvas.circle(100, 100, 5);
                pin.attr("fill", "#000000");
                Clocker.setTime();
                setInterval("Clocker.setTime()", 1000);


            }


        },

        setTime: function (time) {

            var nowD = new Date();
            var thenD;

            // Set lag to just after next full second
            var lagD = 1015 - nowD.getMilliseconds();

            // Get the time difference if first run
            if (time) {
                time = time.split(':');
                thenD = new Date(nowD);
                thenD.setHours(+time[0], +time[1], +time[2], 0);
                Clocker.timeDiffD = nowD - thenD;
            }

            nowD = new Date(nowD - Clocker.timeDiffD);

            // var now = new Date();
            var hours1 = nowD.getHours();
            var minutes1 = nowD.getMinutes();
            var seconds1 = nowD.getSeconds();
            hour_hand1.rotate(30 * hours1 + (minutes1 / 2.5), 100, 100);
            minute_hand1.rotate(6 * minutes1, 100, 100);
            second_hand1.rotate(6 * seconds1, 100, 100);

            // document.getElementById('clock6').innerHTML = Clocker.formatTimeD(nowD);
            //  document.getElementById('clock2').innerHTML = formatTime(now); 
            Clocker.timeoutD = setTimeout(Clocker.setTime, lagD);
        },

        CustomClock1: function (clock) {
            // var lagD = 1015 - nowD.getMilliseconds();
            //  var clock;
            if (clock != "") {

                canvas = Raphael(clock, 200, 200);
                clock = canvas.circle(100, 100, 95);
                clock.attr({
                     "fill": Clocker.Options.Background,
                    "stroke": Clocker.Options.BorderColor,
                    "stroke-width": Clocker.Options.StrokeWidth
                });
                var hour_sign;
                for (i = 0; i < 12; i++) {
                    var start_x = 100 + Math.round(80 * Math.cos(30 * i * Math.PI / 180));
                    var start_y = 100 + Math.round(80 * Math.sin(30 * i * Math.PI / 180));
                    var end_x = 100 + Math.round(90 * Math.cos(30 * i * Math.PI / 180));
                    var end_y = 100 + Math.round(90 * Math.sin(30 * i * Math.PI / 180));
                    hour_sign = canvas.path("M" + start_x + " " + start_y + "L" + end_x + " " + end_y);
                }

                //  var ran = Clocker.Options.Clocks.split(",");
                //  var ranSize=ran.length;
                //  var ClockArray=[];

                // // for(var i=0;i<ran.length;i++){


                // //     ClockArray[i]="Clock"+i;
                // // }
                // alert(clockName);


                hour_hand2 = canvas.path("M100 100L100 50");
                hour_hand2.attr({
                    stroke: Clocker.Options.HourStroke,
                    "stroke-width": 6
                });

               // alert(hour_hand2);
                minute_hand2 = canvas.path("M100 100L100 40");
                minute_hand2.attr({
                    stroke: Clocker.Options.MinuteStroke,
                    "stroke-width": 4
                });
                second_hand2 = canvas.path("M100 110L100 25");
                second_hand2.attr({
                    stroke: Clocker.Options.SecondStroke,
                    "stroke-width": 2
                });
                var pin = canvas.circle(100, 100, 5);
                pin.attr("fill", "#000000");
                Clocker.setTime1();
                setInterval("Clocker.setTime1()", 1000);


            }


        },


        setTime1: function (time) {

            var nowD2 = new Date();
            var thenD2;
        
            // Set lag to just after next full second
            var lagD2 = 1015 - nowD2.getMilliseconds();

            // Get the time difference if first run
            if (time) {
                time = time.split(':');
                thenD2 = new Date(nowD2);
                thenD2.setHours(+time[0], +time[1], +time[2], 0);
                Clocker.timeDiffD2 = nowD2 - thenD2;
            }

            nowD2 = new Date(nowD2 - Clocker.timeDiffD2);

            var hours2 = nowD2.getHours();
            var minutes2 = nowD2.getMinutes();
            var seconds2 = nowD2.getSeconds();

            hour_hand2.rotate(30 * hours2 + (minutes2 / 2.5), 100, 100);
            minute_hand2.rotate(6 * minutes2, 100, 100);
            second_hand2.rotate(6 * seconds2, 100, 100);

            Clocker.timeoutD2 = setTimeout(Clocker.setTime1, lagD2);
        },




        random: function () {
            var d = Math.random();
            alert(d);

        },


        //Helper Functions
        applyColor: function (color) {

            if (color == "red") {

                return color = "#FF0000";

            }
            if (color == "green") {
                return color = "#008000";
            }

            if (color == "white") {
                return color = "#FFFFFF";
            }

        }
        

    };

})(window);