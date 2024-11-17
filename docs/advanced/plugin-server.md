---
icon: asterisk
---

# Plugin server

The SDK wraps a plugin with a plugin server, a web service with a standardized REST API that allows actions to be used in the same way across all the plugins.

Once the plugin server is running, you can access it directly from your browser at [localhost:4201](http://localhost:4201).

## Configuration

Plugin server configuration is done through environment variables.&#x20;

During the development, you can set them in the `.env` file.

### API\_KEY <a href="#api_key" id="api_key"></a>

Required: Yes

Default: `123456` (set by the [`connery dev init`](../cli-reference/connery-dev-init.md) command)

The API key that the plugin server will use to validate incoming requests. Provide the API key in the `x-api-key` header of the API request to authenticate it.

For security reasons, we strongly recommend changing the default value before deploying the code to production.

### HOSTING\_MODE <a href="#hosting_mode" id="hosting_mode"></a>

Required: No

Default: `STANDARD`

Available values:

* `STANDARD` - Use this mode to run the plugin server as a standalone application or in a container.
* `AWS_LAMBDA` - Use this mode to run the plugin server in AWS Lambda.

The hosting mode adjusts the behavior of the plugin server to the specific environment where it is running.

## REST API

The SDK generates an OpepenAPI specification for the plugin, including the interactive docs based on Swagger UI.

### Interactive OpenAPI docs <a href="#interactive-openapi-docs" id="interactive-openapi-docs"></a>

You can access the Swagger UI at [localhost:4201/api](http://localhost:4201/api) while the plugin server is running.

To interact with the API, you must authenticate the request using the [API Key](plugin-server.md#api\_key).

### OpenAPI specification <a href="#openapi-specification" id="openapi-specification"></a>

In case you need to access a raw OpenAPI specification, you can find it in the following formats:

* JSON: [localhost:4201/api-json](http://localhost:4201/api-json)
* YAML: [localhost:4201/api-yaml](http://localhost:4201/api-yaml)
