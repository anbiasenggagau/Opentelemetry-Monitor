import * as opentelemetry from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'

const sdk = new opentelemetry.NodeSDK({
    serviceName: "Testing Opentelemetry SDK Using Grafana Tempo",
    traceExporter: new OTLPTraceExporter({
        url: 'http://localhost:4318/v1/traces'
    }),
    instrumentations: [getNodeAutoInstrumentations()],
})

sdk.start()
