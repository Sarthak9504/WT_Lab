const http = require("http");
const url = require("url");
const PORT = 4444;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === "/calculate-cost") {
        const energyUsed = parsedUrl.query.units;
        let totalCost = 0;

        if (energyUsed > 250) {
            totalCost += (energyUsed - 250) * 6.5;
        }

        if (energyUsed > 150) {
            const slabUnits = energyUsed - 150 > 100 ? 100 : (energyUsed - 150);
            totalCost += slabUnits * 5.2;
        }

        if (energyUsed > 50) {
            const slabUnits = energyUsed - 50 > 100 ? 100 : (energyUsed - 50);
            totalCost += slabUnits * 4.0;
        }

        totalCost += energyUsed > 50 ? 50 * 3.5 : energyUsed * 3.5;

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ cost: totalCost }));
    }
});

server.listen(PORT, () => {
    console.log(`Power Usage Estimator server running on port ${PORT}`);
});
