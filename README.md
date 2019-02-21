# Random BJCP Style Selector

## Usage

See running example https://randomstyle.brewerymayhem.com/

## How to run

"static-site" -> Copy to S3 Static website bucket
"lambda" -> Create lambda function to host

Cloud Front Pool -> S3 Static website Bucket -> API Gateway -> Lambda Function

## Sources

BJCP JSON Sourced from https://github.com/gthmb/bjcp-2015-json

