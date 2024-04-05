÷ from https://www.npmjs.com/package/aws-lambda-ric?activeTab=readme#local-testing
docker run -d -v ~/.aws-lambda-rie:/aws-lambda -p 9000:8080 \
    --entrypoint /aws-lambda/aws-lambda-rie \
    scripturesearch:latest \
        /usr/local/bin/npx aws-lambda-ric search.handler


curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"body": {"query": "places", "type": "subcategories"}}'

