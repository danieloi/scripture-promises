import { SSTConfig } from 'sst'
import { NextjsSite, Api, Function } from 'sst/constructs'

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
    app.stack(function SearchFunctionWithDockerizedML({ stack }) {
      const handler = new Function(stack, 'SearchFunction', {
        runtime: 'container',
        handler: 'sst/functions',
        memorySize: '3 GB',
        // important if you're on M1 Mac
        architecture: 'arm_64',
        container: {
          cmd: ['search.handler'],
        },
      })

      // Create a HTTP API
      const api = new Api(stack, 'Api', {
        customDomain: {
          hostedZone: HOSTED_ZONE_DOMAIN_NAME,
          domainName: getApiDomain(stack.stage),
        },
        routes: {
          'POST /search': {
            function: handler,
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
