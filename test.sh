# This is a bash script to help in manually testing this package.

echo "\n========== Scenario 1 =========="
./bin/cli.js sample.json

echo "\n========== Scenario 2 =========="
cat sample.json | ./bin/cli.js

echo "\n========== Scenario 3 =========="
./bin/cli.js sample.json --indent=8

echo "\n========== Scenario 4 =========="
cat sample.json | ./bin/cli.js --indent=8
