# Service Provider App

Node.js and React.js service provider app.

## About

**My service corner app** is a place where a service provider can apply to client requests related to the provider's skills.

## Getting Started

1. Start the server on `api` folder:

```bash
npm start
```

Once started, it can now be accessed via `localhost:4040`

2. Run the app on `app` folder:

```bash
npm start
```

Open it with `localhost:3000` in the browser

## Tests

Run on `api` folder:

```bash
npm test
```

## Notes

**Considerations:**

The app emulates the acceptance or rejection of works offered by third parties by the provider.

No security is required.

No real persistence is expected. No DB integrations were made.

**Must have:**

1. Only five sample requests must be returned by the backend.
2. Client requests must match at least one of the provider's skills and respective experience.
3. Two of the clients requests must have conflicting dates (same start date).
4. The provider can only select one task (request) at a time.
5. Any attempt to accept a request with conflicting dates must be rejected.
6. Once a task has been accepted it cannot be rejected.
7. Default values should be set for the skills to be listed and the respective difficulty scales.
8. Minimal scope of operations required: `GET /skills`, `GET /skills/levels`, `GET /clients/requests`, `POST /services/`. 

**TODO:**

1. Backend: Save the provider profile info
2. UI: block access to next step in stepper component if all required data was not completed.
3. UI: implement "refresh" botton to load new requests samples.

## License

MIT
