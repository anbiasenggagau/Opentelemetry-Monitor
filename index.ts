import express, { Express } from 'express'
import winston from 'winston';
import LokiTransport from 'winston-loki'

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new LokiTransport({
            host: 'http://localhost:3100',
            json: true,
            batching: true,
            labels: { service_name: "Logs Telemetry" },
            onConnectionError(error) {
                console.log(error)
            },
        })
    ]
})

const PORT: number = parseInt(process.env.PORT || '80');
const app: Express = express();

function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

app.get('/', (req, res) => {
    logger.info(`Dice Rolled`);
    res.send(getRandomNumber(1, 6).toString());
});

app.listen(PORT, () => {
    logger.info(`Listening for requests on http://localhost:${PORT}`);
});
