# challenge-audit

Audit DIY challenges for crispiness and other obscure factors.

This was built quickly during our first `Hack-a-Thing` day as a first step
towards authoring better skills and challenges. It's pretty weak right now, but
should server as a decent framework.

# Usage

```
make
```

Will build `dist/report.csv`.

# Crispyness

Each challenge gets a calculated `crispy` score based on things like
challenge description length and number of examples. These are all
subject to change as needed.

To see how score is calculated see [lib/calculate-crispyness.js]().

# Contributing

If just contributing to the crispyness calculations you don't really need much
other than to editing [lib/calculate-crispyness.js]() and [lib/reports.js]().

## make build-data

This is run internally as it connects to read replicas to easily create `data/*`.
`data/*` will be updated periodically.

Create a `.env` file with db credentials before running `make build-data`.

```
MYSQL_HOST=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASS=
MYSQL_BASE=
```
