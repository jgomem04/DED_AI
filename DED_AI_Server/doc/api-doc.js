const apiDoc = {
  swagger: "2.0",
  basePath: "/",
  info: {
    "title": "DED_AI API",
    "version": "1.0.0"
  },
  securityDefinitions: {
    passwordAuthentication: {
      type: "oauth2",
      flow: "password",
      tokenUrl: "https://ded-ai-api-server.onrender.com/auth",
      scopes: {
        "read": "Grants read access",
        "write": "Grants write access"
      }
    }
  },
  definitions: {
    Image: {
      type: "object",
      properties: {
        raw: {
          type: "string",
          format: "binary"
        }
      },
      required: [
        "raw"
      ]
    },
    Sample: {
      type: "object",
      properties: {
        _id: {
          type: "string"
        },
        fileName: {
          type: "string"
        },
        analysisResult: {
          type: "boolean"
        },
        analysisDate: {
          type: "string"
        },
        feedbackResult: {
          type: "boolean"
        }
      },
      required: [
        "_id", "fileName", "analysisResult", "analysisDate"
      ]
    },
    Token: {
      type: "object",
      properties: {
        accessToken: {
          type: "string"
        },
        accessTokenExpiresAt: {
          type: "string",
          format: "date"
        },
        client: {
          type: "object"
        },
        user: {
          type: "object"
        }
      },
      required: [
        "accessToken", "accessTokenExpiresAt", "client", "user"
      ]
    },
    User: {
      type: "object",
      properties: {
        _id: {
          type: "string"
        },
        username: {
          type: "string"
        },
        password: {
          type: "string"
        },
        email: {
          type: "string"
        }
      },
      required: [
        "username", "password"
      ]
    }
  },
  "paths": {}
};

module.exports = apiDoc;