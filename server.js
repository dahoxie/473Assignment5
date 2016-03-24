var express = require("express"),
    http = require("http"),
    app = express(),
    total_wins = 0,
    total_losses = 0;

app.use(express.bodyParser());
app.use(express.urlencoded());

http.createServer(app).listen(3000);

app.post("/flip", function(req, res) {
    "use strict";
    var resultMessage,
        randomSide;
    if (Math.random() >= 0.5) {
        randomSide = "tails";
    } else {
        randomSide = "heads";
    }
    if (randomSide === req.body.call) {
        total_wins = total_wins + 1;
        resultMessage = "win";
    } else {
        total_losses = total_losses + 1;
        resultMessage = "lose";
    }

    res.json({
        "result": resultMessage,
    });
});

app.get("/stats", function(req, res) {
    "use strict";
    res.json({
        wins: total_wins,
        losses: total_losses
    });
});
