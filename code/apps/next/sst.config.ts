import { SSTConfig } from 'sst'
import { NextjsSite, Api } from 'sst/constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'

const DOMAIN_NAME = 'promises.skry.be'
const API_DOMAIN_NAME = 'api.promises.skry.be'
const HOSTED_ZONE_DOMAIN_NAME = 'skry.be'

function getDomain(stage: string) {
  return stage === 'prod' ? DOMAIN_NAME : `${stage}.${DOMAIN_NAME}`
}
function getApiDomain(stage: string) {
  return stage === 'prod' ? API_DOMAIN_NAME : `${stage}.${API_DOMAIN_NAME}`
}

export default {
  config(_input) {
    return {
      name: 'bible-promises',
      region: 'us-east-1',
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, 'bible-promises-site', {
        customDomain: {
          domainName: getDomain(stack.stage),
          domainAlias: `www.${getDomain(stack.stage)}`,
          hostedZone: HOSTED_ZONE_DOMAIN_NAME,
        },
      })

      stack.addOutputs({
        SiteUrl: site.url,
        deployedUrl: site.customDomainUrl as string,
      })
    })
    // Adding a new stack for the Lambda function with layers
    app.stack(function MyFunctionWithLayers({ stack }) {
      const sharpLayer = new lambda.LayerVersion(stack, 'SharpLayer', {
        code: lambda.Code.fromAsset('sst/layers/sharp'),
      })

      const onnxruntimeNodeLayer = new lambda.LayerVersion(
        stack,
        'OnnxRuntimeNodeLayer',
        {
          code: lambda.Code.fromAsset('sst/layers/onnxruntime-node'),
        }
      )

      const transformersLayer = new lambda.LayerVersion(
        stack,
        'TransformersLayer',
        {
          code: lambda.Code.fromAsset('sst/layers/@xenova/transformers'),
        }
      )

      // Create a HTTP API
      const api = new Api(stack, 'Api', {
        customDomain: {
          hostedZone: HOSTED_ZONE_DOMAIN_NAME,
          domainName: getApiDomain(stack.stage),
        },
        routes: {
          'POST /search': {
            function: {
              handler: 'sst/functions/search.handler',
              // Use 18.x here because in 14, 16 layers have some issue with using NODE_PATH
              runtime: 'nodejs18.x',
              // Load dependencies in layers
              layers: [sharpLayer, onnxruntimeNodeLayer, transformersLayer],
              // Exclude bundling it in the Lambda function
              nodejs: {
                // install: ['sharp', 'onnxruntime-node'],
                esbuild: {
                  external: [
                    'sharp',
                    'onnxruntime-node',
                    '@xenova/transformers',
                  ],
                },
              },
            },
          },
        },
      })
      stack.addOutputs({
        APIUrl: api.url,
        deployedUrl: api.customDomainUrl as string,
      })
    })
  },
} satisfies SSTConfig
