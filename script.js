!function (e) {
    var t = {};
    function r(n) {
        if (t[n]) return t[n].exports;
        var a = t[n] = { i: n, l: !1, exports: {} };
        return e[n].call(a.exports, a, a.exports, r),
            a.l = !0, a.exports
    } r.m = e, r.c = t,
        r.d = function (e, t, n) {
            r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n })
        },
        r.r = function (e) {
            "undefined" != typeof Symbol
                && Symbol.toStringTag
                && Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                }),
                Object.defineProperty(e, "__esModule", { value: !0 })
        },
        r.t = function (e, t) {
            if (1 & t && (e = r(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (r.r(n),
                Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t
                && "string" != typeof e) for (var a in e)
                    r.d(n, a, function (t) { return e[t] }.bind(null, a));
            return n
        }, r.n = function (e) {
            var t = e && e.__esModule ? function () { return e.default } :
                function () { return e };
            return r.d(t, "a", t), t
        }, r.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        },
        r.p = "", r(r.s = 0)
}([function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = r(1),
        a = function (e) {
            var r = document.createElement("caption");
                r.classList.add("team-table-caption"), 
                r.innerText = "";
            var t = document.createElement("table");
                t.classList.add("table", "table-bordered");
           
            var n = i(e), a = o(e);
         return t.append(r, n, a), t
        },
        o = function (e) {
            for (var t = document.createElement("tbody"),
                r = 1; r <= 10; r++) {
            var n = c(r, e); t.append(n)
            } 
         return t
        },
        c = function (e, t) {
            for (var r = document.createElement("tr"), n = 0; n < 8; n++) {
             var a = 0 == n ? "th" : "td", o = document.createElement(a);
             "th" == a && (o.scope = "row"),
                 0 == n ? o.innerText = "Player " + e : o.innerHTML = 
                                    '<span id="' + (t + (e - 1).toString() + (n - 1).toString()) + '"></span>',
                    r.append(o)
            } return r
        },
        i = function (e) {
            for (var t = document.createElement("thead"),
                r = document.createElement("tr"),
                n = 0; n < 8; n++) {
                var a = document.createElement("th");
                a.scope = "col", a.innerText = 0 == n ? e : 7 == n ? "TOTAL" : "B" + n,
                    r.append(a)
            }
            return t.append(r), t
        }, l = !1, s = function (e, t) {
            alert("Start Batting : "+t);
            var r = 60, n = setInterval(
                (function () {
                    (r < 0 || l) && (l = !1, clearInterval(n), "Player 2" !== t ? (
                        document.getElementById("team1").disabled = !0,
                        document.getElementById("team2").disabled = !1,
                        s(e, "Player 2")) : (u(), alert("End Of Both Innings!"))), -1 != r && (e.innerText = r.toString()), 
                        r--
                }), 
                1e3)
        },
        u = function () {
            document.getElementById("team2").disabled = !0, y.disabled = !1
        },
        m = function () { return Math.floor(7 * Math.random() + 0) },
        d = document.getElementById("start"),
        p = document.getElementsByClassName("timer")[0],
        y = document.getElementsByClassName("result")[0],
        h = document.getElementById("team1"),
        f = document.getElementById("team2"),
        v = document.getElementById("team-1-score"),
        b = document.getElementById("team-2-score"),
        g = document.getElementsByClassName("match-scores")[0],
        S = document.getElementsByClassName("bestPlayer")[0];
    d.addEventListener("click", (function (e) {
        d.classList.add("none"), p.classList.remove("none"),
            s(p.querySelector("p"), "Player 1"),
            document.getElementById("team1").disabled = !1, g.innerText = "Match Won By", S.innerHTML = "Man Of The Match ",
            document.getElementsByClassName("scoreBoard-1")[0].children.length && E()
        })),
        y.addEventListener("click", (function () {
            var e, t; p.classList.add("none"),
                d.classList.remove("none"),
                e = T.chennai.teamScore > T.mumbai.teamScore ? T.chennai : T.mumbai,
                t = e.name.toUpperCase(), g.innerHTML = "Match Won By <p> " + t + " </p>",
                S.innerHTML = "Man Of The Match <p>by " + e.maxScore.player + "</p> <p>" + t + "</p> <p> Score :" + e.maxScore.score + "</p>",
                y.disabled = !0
        })), 
        h.addEventListener("click",
            (function () {
                var e = m(),
                t = T.chennai.updateTeamScore(e);
                v.innerText = T.chennai.teamScore.toString(), t || (l = !0)
        })),
        f.addEventListener("click",
            (function () {
                var e = m(),
                t = T.mumbai.updateTeamScore(e);
                b.innerText = T.mumbai.teamScore.toString(), t || (l = !0)
        }));
    var E = function () {
        for (var e = a("Team 1"), t = document.getElementsByClassName("scoreBoard-1")[0];
         t.children.length;)t.removeChild(t.firstElementChild);
         t.append(e);
        for (var r = a("Team 2"), o = document.getElementsByClassName("scoreBoard-2")[0];
        o.children.length;)o.removeChild(o.firstElementChild); 
        o.append(r), 
        T = new n.Cricket
    };
    E();
    var T = new n.Cricket
},
function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.Cricket = void 0;
    var n = function () { this.chennai = new a("Team 1"), this.mumbai = new a("Team 2"), this.currentTeam = this.chennai };
    t.Cricket = n; var a = function () {
        function e(e) {
            this.players = [];
            for (var t = 0; t < 10; t++)
                this.players[t] = new o;
            this.currentPlayer = 0,
                this.teamScore = 0,
                this.name = e,
                this.maxScore = { player: "player 0", score: 0 }
        }
        return e.prototype.updateTeamScore = function (e) {
            this.teamScore += e; var t = this.players[this.currentPlayer].updatePlayerScore(e, this.currentPlayer, this.name);
            return this.maxScore.score < this.players[this.currentPlayer].playerScore
                && (this.maxScore = { player: "Player " + (this.currentPlayer + 1), score: this.players[this.currentPlayer].playerScore }), t
                && this.currentPlayer++, 10 == this.currentPlayer ? 0 : 1
        }, e
    }(), o = function () {
        function e() {
            this.balls = [];
            for (var e = 0; e < 6; e++)
                this.balls[e] = new c;
            this.currentBall = 0,
                this.playerScore = 0
        }
        return e.prototype.updatePlayerScore =
            function (e, t, r) {
                try {
                    return this.balls[this.currentBall].score = e,
                        this.playerScore += e,
                        document.getElementById(r + t.toString() + this.currentBall.toString()).innerText = e.toString(),
                        document.getElementById(r + t.toString() + "6").innerText = this.playerScore.toString(),
                        this.currentBall++, 6 === this.currentBall || 0 === e ? 1 : 0
                } catch (e) {
                    console.log(e)
                }
            }, e
    }(),
        c = function () { this.score = 0 }
}
]);
