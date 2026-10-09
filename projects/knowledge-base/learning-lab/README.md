# Web foundations learning lab

Six runnable beginner applications: calculator, todo with undo, quiz, weather, local notes, and expense tracker. Source is dependency-free HTML/CSS/JavaScript; todo transitions reuse the tested UI-lab reducer instead of copying it.

## Run

From the repository root, run `python -m http.server 8000` and open `http://localhost:8000/projects/knowledge-base/learning-lab/`. Run `npm test --prefix projects/knowledge-base/learning-lab` with Node 22+ for model tests. Serve over HTTP so modules load consistently.

## Features and architecture

`index.html` defines labeled forms and live feedback; `style.css` provides responsive layout and focus styles; `app.js` owns browser interaction; `model.js` provides pure calculation, money, quiz, coordinate, saved-data, and weather response contracts. `model.test.js` tests invalid inputs, exact totals, stored-data shape, and remote response failures.

Todo, quiz, weather, and expenses use in-memory state. Notes persist only in this browser and can be exported as JSON. The weather demo is deliberately illustrative. Live mode makes a browser request to [Open-Meteo](https://open-meteo.com/en/docs) for coordinates you manually enter, with a timeout and latest-request guard. It does not request geolocation. Provider terms, attribution, availability, and deployment limits must be reviewed for public use; no live provider availability is guaranteed by fixture tests.

## Boundaries and limitations

Calculator uses ordinary floating-point numbers and explicit operators; it never evaluates an input expression. Expense calculations use safe positive integer cents for one two-decimal currency unit, without conversion. Notes are plain text, capped at 100 records, and storage failures produce an export warning. The lab has no accounts, server, database, or multi-device synchronization. It is a learning implementation, not a production personal-data service.

## Practice and deployment

See the [project packets](../../../knowledge-base/projects/README.md) for requirements and acceptance. First verify behavior at narrow width and with a keyboard, then add a useful feature with its failure path. Static hosting can serve the lab; production handling of sensitive data requires the [production gate](../../../knowledge-base/projects/PRODUCTION_GATE.md). Browser smoke checks are documented in the knowledge-base verification report.
