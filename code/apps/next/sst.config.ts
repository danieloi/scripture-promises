import { SSTConfig } from 'sst'
import { NextjsSite } from 'sst/constructs'

const DOMAIN_NAME = 'promises.skry.be'
const HOSTED_ZONE_D9MAIN_NAME = 'skry.be'

function getDomain(stage: string) {
  return stage === 'prod' ? DOMAIN_NAME : `${stage}.${DOMAIN_NAME}`
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
          hostedZone: HOSTED_ZONE_D9MAIN_NAME,
        },
      })

      stack.addOutputs({
        SiteUrl: site.url,
        deployedUrl: site.customDomainUrl as string,
      })
    })
  },
} satisfies SSTConfig
